import { constants, promises as fs } from 'fs';
import { exec } from 'child_process';
import { name } from '../package.json';
import { platform } from 'os';
import { resolve } from 'path';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import Browse from './services/browse';
import Config from './config';
import ConsolePanel from './services/console-panel';

interface NotificationParams {
	dismissable?: boolean;
	level?: string;
	message: string;
	outFile?: string;
	type?: string;
}

export function clearConsole(): void {
	try {
		ConsolePanel.clear();

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		if (Config.get('clearConsole')) {
			console.clear();
		}
	}
}

export async function fileExists(filePath: string): Promise<boolean> {
	try {
		await fs.access(filePath, constants.F_OK);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return false;
	}

	return true;
}

export async function findPackagePath(packageName: string): Promise<string[]> {
	const packageDirPaths = atom.packages.getPackageDirPaths();

	return (
		await Promise.all(
			packageDirPaths.map(async (packageDirPath) => {
				const packageDir = resolve(packageDirPath, packageName);

				if (await fileExists(resolve(packageDir, 'package.json'))) {
					return packageDir;
				}

				return undefined;
			}),
		)
	).filter((item) => item);
}

export async function getMakensisPath(): Promise<string> {
	// If stored, return pathToMakensis
	const pathToMakensis = String(Config.get('compilerOptions.pathToMakensis'));

	if (pathToMakensis?.length && pathToMakensis !== 'makensis') {
		return pathToMakensis;
	}

	const which = (await import('which')).default;

	return String(await which('makensis')) || 'makensis';
}

export async function getSpawnEnv(): Promise<unknown> {
	return {
		env: {
			// start with calling process env (this provides e.g. %PATH% on Windows)
			...process.env,
			NSISDIR: process.env.NSISDIR || undefined,
			NSISCONFDIR: process.env.NSISCONFDIR || undefined,
			LANGUAGE: !isWindows() && !process.env.LANGUAGE ? 'en_US.UTF-8' : undefined,
			LC_ALL: !isWindows() && !process.env.LC_ALL ? 'en_US.UTF-8' : undefined,
		},
	};
}

export function isHeaderFile(filePath: string): boolean {
	const headerFiles = ['.bnsh', '.nsh'];

	return Boolean(headerFiles.filter((fileExt) => filePath?.endsWith(fileExt)).length);
}

export function isLoadedAndActive(packageName: string): boolean {
	return atom.packages.isPackageLoaded(packageName) && atom.packages.isPackageActive(packageName);
}

export function isWindows(): boolean {
	return platform() === 'win32';
}

function isWindowsCompatible(): boolean {
	return isWindows() || Config.get('useWineToRun') ? true : false;
}

export async function manageDependencies(): Promise<void> {
	await satisfyDependencies(name);
}

export function missingPackageWarning(packageName: string): void {
	const notification = atom.notifications.addWarning(
		`This command requires the \`${packageName}\` package to be installed and enabled`,
		{
			dismissable: true,
			buttons: [
				{
					text: 'Show Package',
					async onDidClick() {
						notification.dismiss();

						await atom.workspace.open(`atom://config/packages/${packageName}`, {
							pending: true,
							searchAllPanes: true,
						});

						return;
					},
				},
				{
					text: 'Cancel',
					onDidClick() {
						notification.dismiss();

						return;
					},
				},
			],
		},
	);
}

function getNotificationLevel(level: string): string {
	switch (level.toLowerCase()) {
		case 'success':
			return 'addSuccess';

		case 'warning':
			return 'addWarning';

		case 'error':
			return 'addError';

		case 'fatal':
		case 'fatalerror':
			return 'addFatalError';

		default:
			return 'addInfo';
	}
}

export function notifyOnCompletion(params: NotificationParams): void {
	const type = getNotificationLevel(params.level);

	const notification = atom.notifications[type](params.message, {
		dismissable: params.dismissable || true,
		buttons: params.outFile
			? [
					isWindowsCompatible()
						? {
								text: 'Run',
								className: 'icon icon-playback-play',
								async onDidClick() {
									notification.dismiss();
									await runInstaller(params.level);

									return;
								},
							}
						: undefined,
					isLoadedAndActive('browse')
						? {
								text: 'Reveal',
								className: 'icon icon-location',

								onDidClick() {
									notification.dismiss();
									Browse.reveal(params.outFile);

									return;
								},
							}
						: undefined,
					{
						text: 'Cancel',

						onDidClick() {
							notification.dismiss();

							return;
						},
					},
				].filter((item) => item)
			: [],
	});
}

export async function openURL(nsisCommand: string): Promise<void> {
	const open = (await import('open')).default;
	open(
		`https://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Commands/${nsisCommand}.html?utm_source=atom&utm_content=reference`,
	);
}

async function runInstaller(outFile) {
	if (isWindows()) {
		try {
			exec(`cmd /c "${outFile}"`);
		} catch (error) {
			console.error(error);
		}

		return;
	} else if (Config.get('useWineToRun')) {
		const execa = (await import('execa')).default;
		const pathToWine = String(Config.get('pathToWine')) || 'wine';

		try {
			await execa(pathToWine, [outFile]);
		} catch (error) {
			console.error(error);
		}
	}
}

export function inRange(value: number, options: { min: number; max: number }): boolean {
	return value >= options.min && value <= options.max;
}
