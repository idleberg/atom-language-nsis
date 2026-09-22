export type Migration = {
	from: string;
	to: string;
	/** Returns `undefined` to leave the stored value alone. */
	map?: (value: unknown) => unknown;
};

/**
 * The package these settings come from. Pulsar namespaces configuration by
 * package id, so `language-nsis` 11.x settings are invisible to this package
 * until they are copied across.
 */
export const SOURCE_PACKAGE = 'language-nsis';

/**
 * Settings renamed or revalued on the way over from `language-nsis` 11.x. The
 * names follow `vscode-nsis` 6.0.0, so the two integrations stay in step.
 *
 * Kept apart from `migrate.ts` so it can be checked against the schema without
 * pulling in the editor API.
 */
export const MIGRATIONS: Migration[] = [
	// `makensis` was the old default and meant "find it on the PATH", which an
	// empty string now means.
	{
		from: 'compilerOptions.pathToMakensis',
		to: 'makensis.path',
		map: (value) => (value === 'makensis' ? '' : value),
	},
	// The verbosity was a number, with `-1` for "leave it to makensis".
	{
		from: 'compilerOptions.verbosity',
		to: 'compiler.verbosity',
		map: (value) => (value === -1 ? '(default)' : /^[0-4]$/.test(String(value)) ? String(value) : undefined),
	},
	{ from: 'compilerOptions.strictMode', to: 'compiler.strictMode' },
	// Arguments were one string, and are now the array `makensis` reads anyway.
	{
		from: 'compilerOptions.customArguments',
		to: 'compiler.customArguments',
		map: (value) => (typeof value === 'string' && value.trim() ? value.trim().split(/\s+/) : undefined),
	},
	{ from: 'processHeaders', to: 'compiler.processHeaders' },
	{ from: 'showBuildNotifications', to: 'compiler.showNotifications' },
	{ from: 'showFlagsAsObject', to: 'compiler.showFlagsAsObject' },
	// A boolean became the four-way choice of when to reveal the output.
	{
		from: 'alwaysShowOutput',
		to: 'compiler.showOutputView',
		map: (value) => (value === true ? 'Always' : value === false ? 'On Errors' : undefined),
	},
	// `compilerOutput` chose where the informational commands reported; only the
	// version command still has that choice.
	{
		from: 'compilerOutput',
		to: 'compiler.showVersionAsNotification',
		map: (value) => (value === 'notification' ? true : value === 'console' ? false : undefined),
	},
	{ from: 'pathToWine', to: 'wine.pathToWine' },
	{ from: 'formatter.endOfLine', to: 'formatter.endOfLine' },
	{ from: 'formatter.trimLines', to: 'formatter.trimEmptyLines' },
];

/**
 * Deliberately not migrated, so no value is silently reinterpreted:
 *
 * - `useWineToRun` ran the *compiled installer* through Wine, where
 *   `wine.runWithWine` runs the *compiler* through it. Carrying the value over
 *   would route builds through Wine that never were.
 * - `clearConsole` and `manageDependencies` have no counterpart: the output is
 *   always cleared per build, and dependencies are `package-deps`' job.
 * - `formatter.formatOnSave` waits on the formatter (see `docs/PLAN.md`).
 * - `formatter.useTabs` and `formatter.indentSize` are editor-driven by design.
 */
export const DROPPED = [
	'useWineToRun',
	'clearConsole',
	'manageDependencies',
	'formatter.formatOnSave',
	'formatter.useTabs',
	'formatter.indentSize',
];
