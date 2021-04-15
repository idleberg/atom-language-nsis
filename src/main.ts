import { compile, showCompilerFlags, showVersion } from './makensis';
import { CompositeDisposable } from 'atom';
import { convert } from './nlf';
import { getConfig, initDotEnv, isLoadedAndActive, manageDependencies, migrateConfig, missingPackageWarning } from './util';
import commandReference from './reference';
import configSchema from './config';
import devConsole from './log';

// Services
import Browse from './services/browse';
import ConsolePanel from './services/console-panel';
import BusySignal from './services/busy-signal';

export default {
  config: configSchema,
  subscriptions: new CompositeDisposable(),

  async activate(): Promise<void> {
    devConsole.log('Activating package');

    await initDotEnv();

    // Register commands
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:command-reference': async () => {
          commandReference.init();
          commandReference.toggle();
        },
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:compile': async () => await compile(false)
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:compile-strict': async () => await compile(true)
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:create-.atom–build-file': async () => {
          if (isLoadedAndActive('build')) {
            const { createBuildFile } = await import('./build');
            await createBuildFile();
          } else {
            missingPackageWarning('build');
          }
        },
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:convert-language-file': async () => await convert()
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:show-compiler-flags': async () => await showCompilerFlags()
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:show-version': async () => await showVersion()
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:open-package-settings': async () => {
          await atom.workspace.open(`atom://config/packages/language-nsis`, {
            pending: true,
            searchAllPanes: true,
          });
        },
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:satisfy-dependencies': async () => await manageDependencies()
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:set-default-runner': async () => {
          if (isLoadedAndActive('atom-runner')) {
            const { setRunner } = await import('./runner');
            await setRunner();
          } else {
            missingPackageWarning('runner');
          }
        }
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:unset-default-runner': async () => {
          if (isLoadedAndActive('atom-runner')) {
            const { unsetRunner } = await import('./runner');
            await unsetRunner();
          } else {
            missingPackageWarning('runner');
          }
        }
      })
    );

    if (getConfig('manageDependencies')) {
      await manageDependencies();
    }

    migrateConfig('allowHeaderCompilation', 'processHeaders');
    migrateConfig('compilerArguments', 'compilerOptions.customArguments');
    migrateConfig('compilerVerbosity', 'compilerOptions.verbosity');
    migrateConfig('pathToMakensis', 'compilerOptions.pathToMakensis');
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
  }
};
