import { basename } from 'path';
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

  if (Config.get('processHeaders') && isHeaderFile(script)) {
    const notification = atom.notifications.addWarning('Compiling header files is blocked by default. You can allow this in the package settings.', {
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
    const { compilerOutputHandler, compilerErrorHandler, compilerExitHandler } = await import('./handlers');

    NSIS.events.on('stdout', compilerOutputHandler);
    NSIS.events.on('stderr', compilerErrorHandler);
    NSIS.events.once('exit', async data => await compilerExitHandler(data));

    await NSIS.compile(
      script,
      {
        env: atom.project.getPaths()[0] || false,
        json: Config.get('showFlagsAsObject'),
        pathToMakensis: await getMakensisPath(),
        rawArguments: Config.get('compilerOptions.customArguments'),
        strict: strictMode || Config.get('compilerOptions.strictMode'),
        verbose: parseInt(String((Config.get('compilerOptions.verbosity'))))
      },
      await getSpawnEnv()
    );

    NSIS.events.removeAllListeners();

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
  const { versionHandler } = await import('./handlers');

  NSIS.events.once('stdout', (data) => versionHandler(data, pathToMakensis));

  await NSIS.version(
    {
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
  const { flagsHandler } = await import('./handlers');

  NSIS.events.once('exit', flagsHandler);

  await NSIS.headerInfo(
    {
      json: Config.get('showFlagsAsObject'),
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
