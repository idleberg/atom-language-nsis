import { compile, showCompilerFlags, showVersion } from './makensis';
import { CompositeDisposable } from 'atom';
import { convert } from './nlf';
import { createBuildFile } from './build';
import { getConfig, manageDependencies } from './util';
import commandReference from './reference';
import configSchema from './config';
import runner from './runner';

export default {
  config: configSchema,
  subscriptions: null,

  async activate(): Promise<void> {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

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
        'NSIS:compile': async () => await compile(false, this.consolePanel),
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:compile-strict': async () => await compile(true, this.consolePanel),
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:create-.atom–build-file': async () => await createBuildFile(),
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:convert-language-file': async () => await convert(),
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:show-compiler-flags': async () => await showCompilerFlags(this.consolePanel),
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:show-version': async () => await showVersion(this.consolePanel),
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:open-package-settings': () => {
          atom.workspace.open(`atom://config/packages/language-nsis`, {
            pending: true,
            searchAllPanes: true,
          });
        },
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:satisfy-dependencies': async () => await manageDependencies(),
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:set-default-runner': () => runner.set(),
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'NSIS:unset-default-runner': () => runner.unset(),
      })
    );

    if (getConfig('manageDependencies')) {
      await manageDependencies();
    }
  },

  deactivate(): void {
    this.subscriptions && this.subscriptions.dispose();
  },

  consumeConsolePanel(consolePanel: ConsolePanel): void {
    this.consolePanel = consolePanel;
  },
};
