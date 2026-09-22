import { spawn } from 'node:child_process';
import { CompositeDisposable } from 'atom';
import { AutoLanguageClient, type LanguageServerProcess } from 'atom-languageclient';
import { install } from 'atom-package-deps';
import { registerBuildCommands } from './build/index.ts';
import { type ConsolePanel, output } from './build/output.ts';
import { type Configuration, mapConfiguration, PACKAGE_NAME } from './config.ts';
import { resetCompilerState } from './makensis.ts';
import { migrateSettings } from './migrate.ts';
import { convertLanguageFile } from './nlf.ts';
import { resolveServer } from './server.ts';

export class NSISLanguageClient extends AutoLanguageClient {
	private commands = new CompositeDisposable();

	override activate(): void {
		// Runs before the client starts, so the server is initialised with the
		// migrated values rather than the defaults the old keys fell back to.
		migrateSettings();

		super.activate();

		// The `package-deps` field is inert without this call.
		void install(PACKAGE_NAME, true);

		this.commands.add(
			registerBuildCommands(),

			atom.commands.add('atom-workspace', {
				'NSIS:convert-language-file': async () => await convertLanguageFile(),
			}),

			// The compiler path is warned about once; a corrected setting should
			// warn again rather than stay silent.
			atom.config.onDidChange(`${PACKAGE_NAME}.makensis.path`, resetCompilerState),
			atom.config.onDidChange(`${PACKAGE_NAME}.wine`, resetCompilerState),
		);
	}

	override async deactivate(): Promise<void> {
		this.commands.dispose();
		this.commands = new CompositeDisposable();

		return await super.deactivate();
	}

	/**
	 * The `console` package's panel, which the build system logs to. Optional:
	 * without it the compiler output falls back to the developer console.
	 */
	consumeConsolePanel(consolePanel: ConsolePanel): void {
		this.commands.add(output.consume(consolePanel));
	}

	override getGrammarScopes(): string[] {
		return ['source.nsis'];
	}

	override getLanguageName(): string {
		return 'NSIS';
	}

	override getServerName(): string {
		return 'nsis-lsp';
	}

	override getRootConfigurationKey(): string {
		return PACKAGE_NAME;
	}

	/**
	 * The server replaces its settings wholesale on `didChangeConfiguration` and
	 * expects them shaped like `initializationOptions`, so the mapped object is
	 * returned here rather than the raw configuration section.
	 */
	override mapConfigurationObject(configuration: Configuration = {}): Record<string, unknown> {
		return mapConfiguration(configuration);
	}

	/**
	 * `atom-languageclient` sends no `initializationOptions`, but the server reads
	 * its settings on `initialize`; without this, the first `didChangeConfiguration`
	 * would be the earliest it heard about them.
	 */
	override getInitializeParams(projectPath: string, lsProcess: LanguageServerProcess) {
		return {
			...super.getInitializeParams(projectPath, lsProcess),
			initializationOptions: this.mapConfigurationObject(atom.config.get(PACKAGE_NAME)),
		};
	}

	override async startServerProcess(projectPath: string): Promise<LanguageServerProcess> {
		const binary = await resolveServer();

		if (!binary) {
			atom.notifications.addError('The nsis-lsp language server could not be found', {
				description:
					'Install it with `cargo install nsis-lsp`, or point the **Server Path** setting at an existing binary.',
				dismissable: true,
			});

			throw new Error('No nsis-lsp binary could be found');
		}

		this.logger.info(`Using ${binary.version} at ${binary.path} (${binary.source})`);

		return spawn(binary.path, [], { cwd: projectPath }) as LanguageServerProcess;
	}
}
