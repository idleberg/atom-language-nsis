import { basename } from 'path';
import { inRange } from './util';
import Config from './config';
import BusySignal from './services/busy-signal';

async function compile(strictMode: boolean): Promise<void> {
  const editor = atom.workspace.getActiveTextEditor();

  if (!editor) {
    atom.notifications.addWarning(`No active editor`, {
      dismissable: false,
    });
    return;
  }

  const script = editor.getPath();
  const scope = editor.getGrammar().scopeName;

  const { isHeaderFile } = await import('./util');

  if (isHeaderFile(script)) {
    const processHeaders = String(Config.get('processHeaders'));

    if (processHeaders === 'Disallow') {
      const notification = atom.notifications.addWarning('Compiling header files is blocked by default. You can allow this in the package settings, or mute this warning.', {
        dismissable: true,
        buttons: [
          {
            text: 'Open Settings',
            className: 'icon icon-gear',
            async onDidClick() {
              await atom.workspace.open(`atom://config/packages/language-nsis`, {
                pending: true,
                searchAllPanes: true,
              });

              notification.dismiss();

              return;
            }
          },
          {
            text: 'Cancel',
            onDidClick() {
              notification.dismiss();

              return;
            }
          }
        ]
      });

      atom.beep();
      return;
    } else if (processHeaders === 'Disallow & Never Ask Me') {
      atom.beep();
      return;
    }
  }

  if (script && scope.startsWith('source.nsis')) {
    try {
      await editor.save();
    } catch (error) {
      console.log(error);
      atom.beep();

      return;
    }

    const { clearConsole, getMakensisPath, getSpawnEnv, isLoadedAndActive } = await import('./util');
    clearConsole();

    if (isLoadedAndActive('busy-signal')) {
      await BusySignal.add(`Compiling ${basename(script)}`);
    }

    const NSIS = await import('makensis');
    const { compilerOutput, compilerError, compilerClose } = await import('./callbacks');

    const verbosity = parseInt(String((Config.get('compilerOptions.verbosity'))), 10);

    await NSIS.compile(
      script,
      {
        env: false,
        json: Boolean(Config.get('showFlagsAsObject')),
        pathToMakensis: await getMakensisPath(),
        onData: compilerError,
        onError: compilerOutput,
        onClose: compilerClose,
        rawArguments: String(Config.get('compilerOptions.customArguments')),
        strict: strictMode || Boolean(Config.get('compilerOptions.strictMode')),
        verbose: inRange(verbosity, { min: 0, max: 4 }) ? verbosity as 0 | 1 | 2 | 3 | 4 : 3
      },
      await getSpawnEnv()
    );

    if (isLoadedAndActive('busy-signal')) {
      await BusySignal.clear();
    }
  }
}

async function showVersion(): Promise<void> {
  const { clearConsole, getMakensisPath, getSpawnEnv, isLoadedAndActive} = await import('./util');

  if (isLoadedAndActive('busy-signal')) {
    await BusySignal.add(`Showing version`);
  }

  clearConsole();
  const pathToMakensis = await getMakensisPath();

  const NSIS = await import('makensis');
  const { versionCallback } = await import('./callbacks');

  await NSIS.version(
    {
      onData: data => versionCallback(data, pathToMakensis),
      pathToMakensis,
    },
    await getSpawnEnv()
  );

  if (isLoadedAndActive('busy-signal')) {
    await BusySignal.clear();
  }
}

async function showCompilerFlags(): Promise<void> {
  const { clearConsole, getMakensisPath, getSpawnEnv, isLoadedAndActive } = await import('./util');

  if (isLoadedAndActive('busy-signal')) {
    await BusySignal.add(`Showing compiler flags`);
  }

  clearConsole();

  const NSIS = await import('makensis');
  const { flagsCallback } = await import('./callbacks');

  await NSIS.headerInfo(
    {
      json: Boolean(Config.get('showFlagsAsObject')),
      onClose: flagsCallback,
      pathToMakensis: await getMakensisPath()
    },
    await getSpawnEnv()
  );

  if (isLoadedAndActive('busy-signal')) {
    await BusySignal.clear();
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function showHelp(selectListView: any): Promise<void> {
  const NSIS = await import('makensis');
  const { getMakensisPath, getSpawnEnv } = await import('./util');

  const output = await NSIS.commandHelp(
    '',
    {
      json: true,
      pathToMakensis: await getMakensisPath()
    },
    await getSpawnEnv()
  );

  selectListView.update({ items: Object.keys(output.stdout) });
}

export { compile, showCompilerFlags, showHelp, showVersion };
