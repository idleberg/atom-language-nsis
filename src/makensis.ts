import { clearConsole, detectOutfile, getConfig, getMakensisPath, getPrefix, getSpawnEnv, isHeaderFile, notifyOnCompletion } from './util';
import { spawn } from 'child_process';
import * as NSIS from 'makensis';

async function compile(strictMode: boolean, consolePanel: ConsolePanel): Promise<void> {
  const editor = atom.workspace.getActiveTextEditor();

  if (!editor) {
    atom.notifications.addWarning(`No active editor`, {
      dismissable: false,
    });
    return;
  }

  const script = editor.getPath();
  const scope = editor.getGrammar().scopeName;

  if (getConfig('allowHeaderCompilation') === false && isHeaderFile(script)) {
    const notification = atom.notifications.addWarning('Compiling header files is blocked by default. You can allow it in the package settings.', {
      dismissable: true,
      buttons: [
        {
          text: 'Open Settings',
          className: 'icon icon-gear',
          onDidClick() {
            // openPackageSettings();
            atom.workspace.open(`atom://config/packages/language-nsis`, {
              pending: true,
              searchAllPanes: true,
            });

            notification.dismiss();

            return;
          },
        },
        {
          text: 'Cancel',
          onDidClick() {
            notification.dismiss();

            return;
          },
        },
      ],
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

    const pathToMakensis = await getMakensisPath();
    const prefix = getPrefix();
    const compilerArguments: string[] = Array(getConfig('compilerArguments'));

    // only add WX flag if not already specified
    if (strictMode === true && !compilerArguments.includes('-WX') && !compilerArguments.includes('/WX')) {
      compilerArguments.push(`${prefix}WX`);
    }
    compilerArguments.push(script);

    clearConsole(consolePanel);

    // Let's go
    const makensis = spawn(pathToMakensis, compilerArguments, await getSpawnEnv());
    let hasWarning = false;
    let outFile = '';

    makensis.stdout.on('data', (line) => {
      const lineString = line.toString();

      if (hasWarning === false && line.indexOf('warning: ') !== -1) {
        hasWarning = true;

        try {
          if (getConfig('alwaysShowOutput')) {
            consolePanel.warn(lineString);
          }
        } catch (error) {
          console.warn(lineString);
        }
      } else {
        try {
          if (getConfig('alwaysShowOutput')) {
            consolePanel.log(lineString);
          }
        } catch (error) {
          console.log(lineString);
        }
      }

      if (outFile === '') {
        return (outFile = detectOutfile(line));
      }
    });

    makensis.stderr.on('data', (line) => {
      const lineString = line.toString();

      try {
        consolePanel.error(lineString);
      } catch (error) {
        console.error(lineString);
      }

      return;
    });

    makensis.on('close', function (errorCode) {
      if (errorCode === 0) {
        if (hasWarning && getConfig('showBuildNotifications')) {
          notifyOnCompletion('addWarning', outFile);
        } else if (getConfig('showBuildNotifications')) {
          notifyOnCompletion('addSuccess', outFile);
        }
      } else if (getConfig('showBuildNotifications')) {
        atom.notifications.addError('Compile Error', { dismissable: false });
      }
    });

    // consolePanel.log(output.stdout);
    return;
  }
}

async function showVersion(consolePanel: ConsolePanel): Promise<void> {
  const pathToMakensis = await getMakensisPath();
  const output = await NSIS.version(
    {
      pathToMakensis,
    },
    await getSpawnEnv()
  );

  clearConsole(consolePanel);

  if (String(getConfig('compilerOutput')).toLowerCase() === 'console') {
    try {
      consolePanel.log(`makensis ${output.stdout} (${pathToMakensis})`);
    } catch (error) {
      console.info(`makensis ${output.stdout} (${pathToMakensis})`);
      atom.openDevTools();
    }
  } else {
    atom.notifications.addInfo(`NSIS Version`, { detail: `makensis ${output.stdout} (${pathToMakensis})`, dismissable: true });
  }
}

async function showCompilerFlags(consolePanel: ConsolePanel): Promise<void> {
  const pathToMakensis = await getMakensisPath();
  const showFlagsAsObject = getConfig('showFlagsAsObject');

  const output = await NSIS.hdrInfo(
    {
      pathToMakensis,
      json: showFlagsAsObject,
    },
    await getSpawnEnv()
  );

  clearConsole(consolePanel);

  if (String(getConfig('compilerOutput')).toLowerCase() === 'console') {
    try {
      consolePanel.log(JSON.stringify(output.stdout || output.stderr, null, 2));
    } catch (error) {
      console.info(output.stdout || output.stderr);
      atom.openDevTools();
    }
  } else {
    atom.notifications.addInfo(`Compiler Flags`, { detail: JSON.stringify(output.stdout || output.stderr, null, 2), dismissable: true });
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function showHelp(selectListView: any): Promise<void> {
  const pathToMakensis = await getMakensisPath();
  const output = await NSIS.cmdHelp(
    '',
    {
      json: true,
      pathToMakensis,
    },
    await getSpawnEnv()
  );

  selectListView.update({ items: Object.keys(output.stdout) });
}

export { compile, showCompilerFlags, showHelp, showVersion };
