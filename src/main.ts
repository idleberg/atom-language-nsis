import { compile, showCompilerFlags, showVersion } from './makensis';
import { CompositeDisposable } from 'atom';
import { convert } from './nlf';
import commandReference from './reference';
import Config from './config';
import devConsole from './log';

// Services
import Browse from './services/browse';
import ConsolePanel from './services/console-panel';
import BusySignal from './services/busy-signal';

export default {
  config: Config.schema,
  subscriptions: new CompositeDisposable(),

  async activate(): Promise<void> {
    devConsole.log('Activating package');

    const { initDotEnv } = await import('./util');
    await initDotEnv();

    // Register commands
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:command-reference': async () => {
          await commandReference.init();
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
          const { isLoadedAndActive } = await import('./util');

          if (isLoadedAndActive('buildium') || isLoadedAndActive('build')) {
            const { createBuildFile } = await import('./build');
            await createBuildFile();
          } else {
            const { missingPackageWarning } = await import('./util');
            missingPackageWarning('buildium');
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
        'NSIS:satisfy-dependencies': async () => {
          const { manageDependencies } = await import('./util');
          await manageDependencies();
        }
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:set-default-runner': async () => {
          const { isLoadedAndActive } = await import('./util');

          if (isLoadedAndActive('atom-runner')) {
            const { setRunner } = await import('./runner');
            await setRunner();
          } else {
            const { missingPackageWarning } = await import('./util');
            missingPackageWarning('runner');
          }
        }
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:unset-default-runner': async () => {
          const { isLoadedAndActive } = await import('./util');

          if (isLoadedAndActive('atom-runner')) {
            const { unsetRunner } = await import('./runner');
            await unsetRunner();
          } else {
            const { missingPackageWarning } = await import('./util');
            missingPackageWarning('runner');
          }
        }
      })
    );

    if (Config.get('manageDependencies')) {
      const { manageDependencies } = await import('./util');
      await manageDependencies();
    }

    const { migrateConfig } = await import('./util');

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
