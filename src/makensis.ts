import type { SpawnOptions } from 'node:child_process';
import { shell } from 'electron';
import type { CompilerOptions } from 'makensis';
import { getConfig, PACKAGE_NAME } from './config.ts';
import { findOnPath, locate } from './util.ts';

const BINARY_NAME = isWindows() ? 'makensis.exe' : 'makensis';

let warnedAboutPath = false;

export function isWindows(): boolean {
	return process.platform === 'win32';
}

/**
 * Wine is how NSIS is compiled on macOS and Linux when only a Windows build of
 * `makensis` is available. It is never used on Windows itself, whatever the
 * setting says.
 */
export function useWine(): boolean {
	return !isWindows() && getConfig('wine.runWithWine', false);
}

/**
 * Resolves the `makensis` binary from the `makensis.path` setting — the same one
 * the server uses for diagnostics — falling back to the `PATH`. The configured
 * path is returned unresolved when it cannot be located, so that Wine prefix
 * paths, which mean nothing to this process, still reach the compiler.
 */
export function getMakensisPath(): string {
	const configured = stripQuotes(getConfig('makensis.path', '').trim());

	if (configured && configured !== 'makensis') {
		return locate(configured) ?? configured;
	}

	const found = findOnPath(BINARY_NAME);

	if (found) {
		return found;
	}

	// Under Wine the compiler lives inside a prefix and is never on the `PATH`,
	// so let it through and let the spawn fail with something more useful.
	if (!useWine()) {
		warnAboutMissingBinary();
	}

	return 'makensis';
}

/**
 * The options every `makensis` invocation shares: which binary to run, and
 * whether to run it through Wine.
 */
export function getCompilerOptions(): CompilerOptions {
	const pathToMakensis = getMakensisPath();

	return useWine()
		? { pathToMakensis, pathToWine: getConfig('wine.pathToWine', 'wine'), wine: true }
		: { pathToMakensis };
}

/**
 * `makensis` reads `NSISDIR` and `NSISCONFDIR` from the environment, which it
 * inherits from Pulsar's own. The locale is pinned because the compiler
 * otherwise mangles non-ASCII output.
 */
export function getSpawnEnv(): SpawnOptions {
	const env: NodeJS.ProcessEnv = { ...process.env };

	if (!isWindows()) {
		env.LANG ||= 'en_US.UTF-8';
		env.LANGUAGE ||= 'en_US.UTF-8';
		env.LC_ALL ||= 'en_US.UTF-8';
	}

	return { env };
}

/**
 * Drops everything derived from the compiler settings. Called when those change,
 * so a corrected path warns again rather than staying silent.
 */
export function resetCompilerState(): void {
	warnedAboutPath = false;
}

/**
 * Windows paths are routinely pasted into settings with their surrounding quotes
 * still attached.
 */
function stripQuotes(input: string): string {
	return input.startsWith('"') && input.endsWith('"') ? input.slice(1, -1).trim() : input;
}

function warnAboutMissingBinary(): void {
	if (warnedAboutPath) {
		return;
	}

	warnedAboutPath = true;

	atom.notifications.addWarning('makensis was not found in your PATH', {
		description: 'Install NSIS, or point the **MakeNSIS Path** setting at an existing compiler.',
		dismissable: true,
		buttons: [
			{
				text: 'Open Settings',
				onDidClick: () => void openPackageSettings(),
			},
			{
				text: 'Download NSIS',
				onDidClick: () => void shell.openExternal('https://nsis.sourceforge.io/Download'),
			},
		],
	});
}

export async function openPackageSettings(): Promise<void> {
	await atom.workspace.open(`atom://config/packages/${PACKAGE_NAME}`, {
		pending: true,
		searchAllPanes: true,
	});
}
