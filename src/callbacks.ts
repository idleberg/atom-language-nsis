import type { CompilerData, CompilerOutput } from 'makensis';
import Config from './config';
import ConsolePanel from './services/console-panel';

export function compilerOutput(data: CompilerData): void {
	const logLevel = data.hasWarning ? 'warn' : 'log';

	try {
		if (Config.get('alwaysShowOutput')) {
			ConsolePanel.show();
			ConsolePanel[logLevel](data.line);
		}
		// eslint-disable-next-line  @typescript-eslint/no-unused-vars
	} catch (_error) {
		console[logLevel](data.line);
	}
}

export function compilerError(data: string): void {
	try {
		ConsolePanel.error(data);
		// eslint-disable-next-line  @typescript-eslint/no-unused-vars
	} catch (_error) {
		console.error(data);
	}
}

export async function compilerClose(data: CompilerOutput): Promise<void> {
	if (Config.get('showBuildNotifications')) {
		if (data.status === 0) {
			const { notifyOnCompletion } = await import('./util');

			if (data.warnings) {
				notifyOnCompletion({
					level: 'warning',
					message: 'Compiled with warnings',
					outFile: data.outFile,
				});
			} else {
				notifyOnCompletion({
					level: 'success',
					message: 'Compiled successfully',
					outFile: data.outFile,
				});
			}
		} else {
			atom.notifications.addError('Compile Error', { dismissable: false });
		}
	}
}

export function flagsCallback(data: CompilerOutput): void {
	const output = data.stdout || data.stderr;

	if (String(Config.get('compilerOutput')).toLowerCase() === 'console') {
		try {
			ConsolePanel.show();
			ConsolePanel.log(JSON.stringify(output, null, 2));
			// eslint-disable-next-line  @typescript-eslint/no-unused-vars
		} catch (_error) {
			console.info(output);
			atom.openDevTools();
		}
	} else {
		atom.notifications.addInfo('Compiler Flags', {
			detail: JSON.stringify(output, null, 2),
			dismissable: true,
		});
	}
}

export function versionCallback(data: CompilerData, pathToMakensis: string): void {
	if (String(Config.get('compilerOutput')).toLowerCase() === 'console') {
		try {
			ConsolePanel.show();
			ConsolePanel.log(`makensis ${data.line} (${pathToMakensis})`);
			// eslint-disable-next-line  @typescript-eslint/no-unused-vars
		} catch (_error) {
			console.info(`makensis ${data.line} (${pathToMakensis})`);
			atom.openDevTools();
		}
	} else {
		atom.notifications.addInfo('NSIS Version', {
			detail: `makensis ${data.line} (${pathToMakensis})`,
			dismissable: true,
		});
	}
}
