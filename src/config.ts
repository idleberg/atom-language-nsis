export const PACKAGE_NAME = 'language-nsis-lsp';

/**
 * The Pulsar-facing settings. Everything the server understands is here, minus
 * indentation: the formatter takes `tabSize`/`insertSpaces` off each formatting
 * request, so there is nothing to configure.
 */
export const schema = {
	serverPath: {
		title: 'Server Path',
		description:
			'Path to the `nsis-lsp` binary. Leave empty to use the binary installed with this package, then your `PATH`.',
		type: 'string',
		default: '',
		order: 1,
	},
	makensis: {
		title: 'MakeNSIS',
		type: 'object',
		order: 2,
		properties: {
			path: {
				title: 'Path',
				description: 'Path to `makensis`. Leave empty to search your `PATH`.',
				type: 'string',
				default: '',
				order: 1,
			},
		},
	},
	compiler: {
		title: 'Compiler',
		type: 'object',
		order: 3,
		properties: {
			verbosity: {
				title: 'Verbosity',
				description: 'How much the compiler reports while building.',
				type: 'string',
				default: '3',
				enum: [
					{ value: '(default)', description: 'Leave the choice to makensis' },
					{ value: '0', description: '0: none' },
					{ value: '1', description: '1: no warnings' },
					{ value: '2', description: '2: no info' },
					{ value: '3', description: '3: no script' },
					{ value: '4', description: '4: all' },
				],
				order: 1,
			},
			strictMode: {
				title: 'Strict Mode',
				description: 'Treat compiler warnings as errors, as though every build used *NSIS: Compile Script (strict)*.',
				type: 'boolean',
				default: false,
				order: 2,
			},
			customArguments: {
				title: 'Custom Arguments',
				description: 'Additional arguments passed to `makensis`, for example `-DVERSION=1.0.0`.',
				type: 'array',
				default: [],
				items: { type: 'string' },
				order: 3,
			},
			processHeaders: {
				title: 'Process Headers',
				description: 'Whether header files can be compiled directly.',
				type: 'string',
				default: 'Disallow',
				enum: [
					{ value: 'Allow', description: 'Compile both scripts and header files' },
					{ value: 'Disallow', description: 'Ask before compiling a header file' },
					{ value: 'Disallow & Never Ask Me', description: 'Skip header files without asking' },
				],
				order: 4,
			},
			showNotifications: {
				title: 'Show Notifications',
				description: 'Show a notification indicating whether a build succeeded or failed.',
				type: 'boolean',
				default: true,
				order: 5,
			},
			showOutputView: {
				title: 'Show Output View',
				description: 'When to reveal the console with the compiler output.',
				type: 'string',
				default: 'On Errors',
				enum: [
					{ value: 'Always', description: 'Whenever a script is compiled' },
					{ value: 'On Warnings & Errors', description: 'Only when the build has warnings or errors' },
					{ value: 'On Errors', description: 'Only when the build has errors' },
					{ value: 'Never', description: 'Never' },
				],
				order: 6,
			},
			showFlagsAsObject: {
				title: 'Show Flags as Object',
				description: "Format the output of *Show Compiler Flags* as JSON rather than as the compiler's raw output.",
				type: 'boolean',
				default: true,
				order: 7,
			},
			showVersionAsNotification: {
				title: 'Show Version as Notification',
				description: 'Report *Show Compiler Version* as a notification rather than in the console.',
				type: 'boolean',
				default: false,
				order: 8,
			},
		},
	},
	wine: {
		title: 'Wine',
		type: 'object',
		order: 4,
		properties: {
			runWithWine: {
				title: 'Run with Wine',
				description: 'Run `makensis` through [Wine](https://www.winehq.org/). Ignored on Windows.',
				type: 'boolean',
				default: false,
				order: 1,
			},
			pathToWine: {
				title: 'Path to Wine',
				description:
					'Path to the `wine` binary, useful for alternatives such as `wine32` or `wine64`. Leave empty to search your `PATH`.',
				type: 'string',
				default: 'wine',
				order: 2,
			},
		},
	},
	diagnostics: {
		title: 'Diagnostics',
		type: 'object',
		order: 5,
		properties: {
			enabledOnSave: {
				title: 'Enabled on Save',
				description: 'Run compiler diagnostics when a script is saved.',
				type: 'boolean',
				default: true,
				order: 1,
			},
			preprocessMode: {
				title: 'Preprocess Mode',
				description: 'How the compiler is invoked for diagnostics.',
				type: 'string',
				default: 'ppo',
				enum: [
					{ value: 'ppo', description: 'Preprocess only' },
					{ value: 'safe_ppo', description: 'Preprocess only, without executing instructions' },
					{ value: 'none', description: 'Full compilation' },
				],
				order: 2,
			},
		},
	},
	formatter: {
		title: 'Formatter',
		type: 'object',
		order: 6,
		properties: {
			commentStyle: {
				title: 'Comment Style',
				description: 'Line comment style the formatter normalises to. Block comments are never rewritten.',
				type: 'string',
				default: '(preserve)',
				enum: [
					{ value: '(preserve)', description: 'Leave line comments as they are' },
					{ value: 'hash', description: 'Rewrite `; comment` as `# comment`' },
					{ value: 'semi', description: 'Rewrite `# comment` as `; comment`' },
				],
				order: 1,
			},
			endOfLine: {
				title: 'End of Line',
				description: 'End of line sequence for formatted output.',
				type: 'string',
				default: '(auto)',
				enum: [
					{ value: '(auto)', description: '(auto)' },
					{ value: 'lf', description: 'LF' },
					{ value: 'crlf', description: 'CRLF' },
				],
				order: 2,
			},
			printWidth: {
				title: 'Print Width',
				description: 'Line width before breaking with `\\` continuations. `0` disables wrapping.',
				type: 'number',
				default: 0,
				minimum: 0,
				order: 3,
			},
			singleQuote: {
				title: 'Single Quote',
				description: 'Prefer single quotes over double quotes.',
				type: 'boolean',
				default: false,
				order: 4,
			},
			trimEmptyLines: {
				title: 'Trim Empty Lines',
				description: 'Collapse runs of blank lines.',
				type: 'boolean',
				default: true,
				order: 5,
			},
		},
	},
};

/**
 * Reads one setting, with the schema default as the fallback for the case where
 * a setting predates the user's `config.cson` — Pulsar returns `undefined` for
 * a key it has never seen.
 */
export function getConfig<T>(key: string, fallback: T): T {
	return (atom.config.get(`${PACKAGE_NAME}.${key}`) as T | undefined) ?? fallback;
}

export type Configuration = {
	serverPath?: string;
	makensis?: { path?: string };
	diagnostics?: { enabledOnSave?: boolean; preprocessMode?: string };
	formatter?: {
		commentStyle?: string;
		endOfLine?: string;
		printWidth?: number;
		singleQuote?: boolean;
		trimEmptyLines?: boolean;
	};
};

/**
 * Maps the settings onto the server's `InitOptions`. Note the case change:
 * Pulsar settings are camelCase, the server reads snake_case. The placeholder
 * values `(auto)`, `(preserve)` and `none` become `null`, which is what the
 * server treats as "leave it alone".
 */
export function mapConfiguration(configuration: Configuration): Record<string, unknown> {
	const { diagnostics = {}, formatter = {}, makensis = {} } = configuration;

	return {
		diagnostics: {
			enabled_on_save: diagnostics.enabledOnSave ?? true,
			preprocess_mode: diagnostics.preprocessMode === 'none' ? null : (diagnostics.preprocessMode ?? 'ppo'),
		},
		formatter: {
			comment_style: formatter.commentStyle === '(preserve)' ? null : (formatter.commentStyle ?? null),
			end_of_line: formatter.endOfLine === '(auto)' ? null : (formatter.endOfLine ?? null),
			print_width: formatter.printWidth ?? 0,
			single_quote: formatter.singleQuote ?? false,
			trim_empty_lines: formatter.trimEmptyLines ?? true,
		},
		makensis: {
			path: makensis.path ?? '',
		},
	};
}
