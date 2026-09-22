import { headerInfo, version } from 'makensis';
import { getConfig } from '../config.ts';
import { getCompilerOptions, getMakensisPath, getSpawnEnv } from '../makensis.ts';
import { output } from './output.ts';

/**
 * Reports the compiler's version, either as a notification or in the console
 * alongside the path it was resolved from.
 */
export async function showCompilerVersion(): Promise<void> {
	const options = getCompilerOptions();
	const pathToMakensis = getMakensisPath();

	let compilerVersion: string;

	try {
		const { stdout } = await version({ ...options, json: true }, getSpawnEnv());

		compilerVersion = String((stdout as { version?: string })?.version ?? '(unknown)');
	} catch (error) {
		reportFailure('read the compiler version', error);

		return;
	}

	if (getConfig('compiler.showVersionAsNotification', false)) {
		atom.notifications.addInfo(`makensis ${compilerVersion}`, { description: pathToMakensis });

		return;
	}

	write(JSON.stringify({ version: compilerVersion, path: pathToMakensis }, null, 2));
}

/**
 * Reports the options `makensis` itself was built with, as either its raw
 * `-HDRINFO` output or the structured form of it.
 */
export async function showCompilerFlags(): Promise<void> {
	const asObject = getConfig('compiler.showFlagsAsObject', true);
	const options = getCompilerOptions();

	try {
		if (asObject) {
			const { stdout } = await headerInfo({ ...options, json: true }, getSpawnEnv());

			write(JSON.stringify(stdout, null, 2));
		} else {
			const { stdout, stderr } = await headerInfo(options, getSpawnEnv());

			write(String(stdout || stderr || ''));
		}
	} catch (error) {
		reportFailure('read the compiler flags', error);
	}
}

function write(message: string): void {
	output.clear();
	output.log(message);
	output.show();
}

function reportFailure(action: string, error: unknown): void {
	// `makensis` rejects with the raw stderr when the compiler cannot be started.
	console.error('[language-nsis-lsp]', error);

	atom.notifications.addError(`Failed to ${action}`, {
		description: error instanceof Error ? error.message : String(error || 'makensis could not be started.'),
		dismissable: true,
	});
}
