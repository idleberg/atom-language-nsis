import { spawn } from 'node:child_process';
import { shell } from 'electron';
import { getConfig } from '../config.ts';
import { isWindows, useWine } from '../makensis.ts';

/**
 * Runs the freshly built installer, detached so that it outlives Pulsar rather
 * than being killed along with it.
 */
export function runInstaller(outFile: string): void {
	if (!isWindows() && !useWine()) {
		atom.notifications.addWarning('Running the installer requires Windows, or Wine enabled in the settings');

		return;
	}

	const command = isWindows() ? outFile : getConfig('wine.pathToWine', 'wine');
	const args = isWindows() ? [] : [outFile];

	const installer = spawn(command, args, { detached: true, stdio: 'ignore' });

	// A failed spawn surfaces as an event, not as a thrown error.
	installer.on('error', (error) => {
		console.error('[language-nsis-lsp]', error);
		atom.notifications.addError('Failed to run the installer', { description: error.message, dismissable: true });
	});

	installer.unref();
}

/**
 * `shell.showItemInFolder` is Electron's own, and knows about every file manager
 * it supports, which beats guessing between `explorer`, `open` and `nautilus`.
 */
export function revealInstaller(outFile: string): void {
	shell.showItemInFolder(outFile);
}
