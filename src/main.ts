import { CompositeDisposable } from 'atom';
import Config from './config';
import devConsole from './log';
import { compile, showCompilerFlags, showVersion } from './makensis';
import { convert } from './nlf';
import { featureNotifier } from './notifier';
import commandReference from './reference';

// Services
import Browse from './services/browse';
import BusySignal from './services/busy-signal';
import ConsolePanel from './services/console-panel';
import { isLoadedAndActive, manageDependencies, missingPackageWarning } from './util';

export default {
	config: Config.schema,
	subscriptions: new CompositeDisposable(),

	async activate(): Promise<void> {
		devConsole.log('Activating package');

		// Register commands
		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'NSIS:command-reference': async () => {
					await commandReference.init();
					commandReference.toggle();
				},
			}),
		);

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'NSIS:compile': async () => await compile(false),
			}),
		);

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'NSIS:compile-strict': async () => await compile(true),
			}),
		);

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'NSIS:create-.atom–build-file': async () => {
					if (isLoadedAndActive('buildium') || isLoadedAndActive('build')) {
						const { createBuildFile } = await import('./build');
						await createBuildFile();
					} else {
						missingPackageWarning('buildium');
					}
				},
			}),
		);

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'NSIS:convert-language-file': async () => await convert(),
			}),
		);

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'NSIS:show-compiler-flags': async () => await showCompilerFlags(),
			}),
		);

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'NSIS:show-version': async () => await showVersion(),
			}),
		);

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'NSIS:open-package-settings': async () => {
					await atom.workspace.open('atom://config/packages/language-nsis', {
						pending: true,
						searchAllPanes: true,
					});
				},
			}),
		);

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'NSIS:satisfy-dependencies': async () => {
					await manageDependencies();
				},
			}),
		);

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'NSIS:format-document': () => {
					const { formatDocument } = require('./formatter');
					formatDocument();
				},
			}),
		);

		this.subscriptions.add(
			atom.workspace.observeTextEditors((editor) => {
				const { isNsisEditor, applyFormatter } = require('./formatter');

				if (isNsisEditor(editor)) {
					const buffer = editor.getBuffer();

					this.subscriptions.add(
						buffer.onWillSave(() => {
							if (Config.get('formatter.formatOnSave')) {
								applyFormatter(editor);
							}
						}),
					);
				}
			}),
		);

		if (Config.get('manageDependencies')) {
			await manageDependencies();
		}

		featureNotifier();
	},

	deactivate(): void {
		devConsole.log('Deactivating package');

		this.subscriptions?.dispose();
	},

	consumeConsolePanel(consolePanel: unknown): void {
		devConsole.log('Consuming Console Panel service');

		ConsolePanel.consumer(consolePanel);
	},

	consumeBrowse(browse: unknown): void {
		devConsole.log('Consuming Browse service');

		Browse.consumer(browse);
	},

	consumeSignal(registry: unknown): void {
		devConsole.log('Consuming Busy Signal service');

		BusySignal.consumer(registry);
	},
};
