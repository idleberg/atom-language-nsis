import { type CompilerOptions, type CompilerOutput, compile as compileScript } from 'makensis';
import { getConfig } from '../config.ts';
import { getCompilerOptions, getSpawnEnv, isWindows, openPackageSettings, useWine } from '../makensis.ts';
import { fileExists } from '../util.ts';
import { revealInstaller, runInstaller } from './installer.ts';
import { output } from './output.ts';

type ShowOutputView = 'Always' | 'On Warnings & Errors' | 'On Errors' | 'Never';

const HEADER_EXTENSIONS = ['.nsh', '.bnsh', '.nsdinc'];

/**
 * Saves the active script and compiles it, streaming the compiler's output into
 * the console.
 */
export async function compile(strict: boolean): Promise<void> {
	const editor = atom.workspace.getActiveTextEditor();

	if (editor?.getGrammar().scopeName !== 'source.nsis') {
		atom.notifications.addError('This command is only available for NSIS scripts');

		return;
	}

	const filePath = editor.getPath();

	if (!filePath) {
		atom.notifications.addError('Save the script to disk before compiling it');

		return;
	}

	if (isHeaderFile(filePath) && !(await confirmHeaderCompile())) {
		return;
	}

	try {
		await editor.save();
	} catch (error) {
		reportFailure('save the script', error);

		return;
	}

	const showOutputView = getConfig<ShowOutputView>('compiler.showOutputView', 'On Errors');

	output.clear();

	if (showOutputView === 'Always') {
		output.show();
	}

	let result: CompilerOutput;

	try {
		result = await compileScript(
			filePath,
			{
				...getCompilerOptions(),
				...getVerbosityOptions(),
				// Forwarding NSIS_APP_* variables as `-D` defines is opt-in upstream,
				// and was never opted into here.
				env: false,
				onData: ({ line }) => output.log(line),
				onError: (line) => output.error(line),
				strict: strict || getConfig('compiler.strictMode', false),
			},
			getSpawnEnv(),
		);
	} catch (error) {
		// A compiler that never started rejects with the raw stderr, not an `Error`.
		output.error(String(error || 'makensis could not be started.'));
		output.show();

		atom.notifications.addError('Failed to run makensis', {
			description: 'See the console output for details.',
			dismissable: true,
		});

		return;
	}

	await reportResult(result, showOutputView);
}

function isHeaderFile(filePath: string): boolean {
	return HEADER_EXTENSIONS.some((extension) => filePath.toLowerCase().endsWith(extension));
}

/**
 * Header files are meant to be included, not compiled, so compiling one is
 * assumed to be a mistake until the user says otherwise.
 */
async function confirmHeaderCompile(): Promise<boolean> {
	const processHeaders = getConfig<string>('compiler.processHeaders', 'Disallow');

	if (processHeaders === 'Allow') {
		return true;
	}

	if (processHeaders === 'Disallow & Never Ask Me') {
		return false;
	}

	return await new Promise<boolean>((resolve) => {
		const notification = atom.notifications.addWarning('Compiling header files is blocked by default', {
			description: 'You can compile this one anyway, or change the **Process Headers** setting.',
			dismissable: true,
			buttons: [
				{
					text: 'Compile Anyway',
					onDidClick: () => {
						resolve(true);
						notification.dismiss();
					},
				},
				{
					text: 'Open Settings',
					onDidClick: () => {
						resolve(false);
						notification.dismiss();
						void openPackageSettings();
					},
				},
			],
		});

		// Dismissing the notification is an answer too, and without this the
		// promise would never settle.
		notification.onDidDismiss(() => resolve(false));
	});
}

/**
 * `makensis` drops a falsy `verbose`, so `-V0` — the one level that is falsy —
 * has to travel as a raw argument instead.
 */
function getVerbosityOptions(): Pick<CompilerOptions, 'rawArguments' | 'verbose'> {
	const custom = getConfig<string[]>('compiler.customArguments', []);
	const verbosity = getConfig<string>('compiler.verbosity', '3');

	return {
		rawArguments: verbosity === '0' ? ['-V0', ...custom] : custom,
		verbose: /^[1-4]$/.test(verbosity) ? (Number(verbosity) as 1 | 2 | 3 | 4) : undefined,
	};
}

async function reportResult(result: CompilerOutput, showOutputView: ShowOutputView): Promise<void> {
	const failed = result.status !== 0;
	const { warnings } = result;

	if (shouldShowOutputView(showOutputView, failed, warnings > 0)) {
		output.show();
	}

	if (!getConfig('compiler.showNotifications', true)) {
		return;
	}

	if (failed) {
		atom.notifications.addError('Compilation failed', {
			description: 'See the console output for details.',
			dismissable: true,
			buttons: [{ text: 'Show Output', onDidClick: () => output.show() }],
		});

		return;
	}

	const buttons = await getResultButtons(result.outFile);
	const options = { buttons, dismissable: warnings > 0 };

	if (warnings) {
		atom.notifications.addWarning(`Compiled with ${warnings === 1 ? '1 warning' : `${warnings} warnings`}`, options);
	} else {
		atom.notifications.addSuccess('Compiled successfully', options);
	}
}

function shouldShowOutputView(setting: ShowOutputView, failed: boolean, hasWarnings: boolean): boolean {
	switch (setting) {
		case 'Always':
			return true;

		case 'On Warnings & Errors':
			return failed || hasWarnings;

		case 'On Errors':
			return failed;

		default:
			return false;
	}
}

async function getResultButtons(outFile: string | undefined): Promise<{ text: string; onDidClick: () => void }[]> {
	// `outFile` is scraped from the compiler's own output, so it can name a file
	// that a `/NOCD`-style setup wrote somewhere else entirely.
	if (!outFile || !(await fileExists(outFile))) {
		return [];
	}

	const buttons = [{ text: 'Reveal', onDidClick: () => revealInstaller(outFile) }];

	return isWindows() || useWine() ? [{ text: 'Run', onDidClick: () => runInstaller(outFile) }, ...buttons] : buttons;
}

function reportFailure(action: string, error: unknown): void {
	console.error('[language-nsis-lsp]', error);

	atom.notifications.addError(`Failed to ${action}`, {
		description: error instanceof Error ? error.message : String(error),
		dismissable: true,
	});
}
