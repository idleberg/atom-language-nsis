import { basename } from 'path';
import { clearConsole, getConfig, getMakensisPath, getSpawnEnv, isHeaderFile, isLoadedAndActive, mapDefinitions } from './util';
import { compilerErrorHandler, compilerExitHandler, compilerOutputHandler, flagsHandler, versionHandler } from './handlers';
import * as NSIS from 'makensis';

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

  if (getConfig('processHeaders') === false && isHeaderFile(script)) {
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

    clearConsole();

    if (isLoadedAndActive('busy-signal')) {
      BusySignal.add(`Compiling ${basename(script)}`);
    }

    NSIS.events.on('stdout', compilerOutputHandler);
    NSIS.events.on('stderr', compilerErrorHandler);
    NSIS.events.once('exit', compilerExitHandler);

    await NSIS.compile(
      script,
      {
        define: mapDefinitions(),
        json: getConfig('showFlagsAsObject'),
        pathToMakensis: await getMakensisPath(),
        rawArguments: getConfig('compilerOptions.customArguments'),
        strict: strictMode || getConfig('compilerOptions.strictMode'),
        verbose: parseInt(getConfig('compilerOptions.verbosity'))
      },
      await getSpawnEnv()
    );

    NSIS.events.removeAllListeners();

    if (isLoadedAndActive('busy-signal')) {
      BusySignal.clear();
    }
  }
}

async function showVersion(): Promise<void> {
  if (isLoadedAndActive('busy-signal')) {
    BusySignal.add(`Showing version`);
  }

  clearConsole();
  const pathToMakensis = await getMakensisPath();

  NSIS.events.once('stdout', (data) => versionHandler(data, pathToMakensis));

  await NSIS.version(
    {
      pathToMakensis,
    },
    await getSpawnEnv()
  );

  if (isLoadedAndActive('busy-signal')) {
    BusySignal.clear();
  }
}

async function showCompilerFlags(): Promise<void> {
  if (isLoadedAndActive('busy-signal')) {
    BusySignal.add(`Showing compiler flags`);
  }

  clearConsole();

  NSIS.events.once('exit', flagsHandler);

  await NSIS.headerInfo(
    {
      json: getConfig('showFlagsAsObject'),
      pathToMakensis: await getMakensisPath()
    },
    await getSpawnEnv()
  );

  if (isLoadedAndActive('busy-signal')) {
    BusySignal.clear();
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function showHelp(selectListView: any): Promise<void> {

  const output = await NSIS.cmdHelp(
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
