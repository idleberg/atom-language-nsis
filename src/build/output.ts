import { Disposable } from 'atom';

/**
 * The `console-panel` service, as provided by the `console` package. Its types
 * are not published, so the shape used here is declared rather than imported.
 */
export type ConsolePanel = {
	show(): void;
	hide(): void;
	toggle(): void;
	clear(): void;
	log(...message: unknown[]): void;
	warn(...message: unknown[]): void;
	error(...message: unknown[]): void;
};

let consolePanel: ConsolePanel | undefined;

/**
 * Compiler output goes to the `console` package's panel, the closest Pulsar has
 * to VS Code's output channels. It is an optional dependency of this package
 * rather than a hard one, so every call degrades to the developer console — the
 * build still runs and its output is still readable, just less conveniently.
 */
export const output = {
	consume(panel: ConsolePanel): Disposable {
		consolePanel = panel;

		return new Disposable(() => {
			consolePanel = undefined;
		});
	},

	clear(): void {
		consolePanel?.clear();
	},

	show(): void {
		consolePanel?.show();
	},

	/** The compiler writes whole chunks, not lines, so they are passed through as they arrive. */
	log(message: string): void {
		consolePanel ? consolePanel.log(message) : console.log(message);
	},

	warn(message: string): void {
		consolePanel ? consolePanel.warn(message) : console.warn(message);
	},

	error(message: string): void {
		consolePanel ? consolePanel.error(message) : console.error(message);
	},
};
