import Config from './config';
import ConsolePanel from './services/console-panel';

function compilerOutput(data: unknown): void {
  const logLevel = data['hasWarning']
    ? 'warn'
    : 'log';

  try {
    if (Config.get('alwaysShowOutput')) {
      ConsolePanel.show();
      ConsolePanel[logLevel](data['line']);
    }
  } catch (error) {
    console[logLevel](data['line']);
  }
}

function compilerError(data: unknown): void {
  try {
    ConsolePanel.error(data['line']);
  } catch (error) {
    console.error(data['line']);
  }
}

async function compilerClose(data: unknown): Promise<void> {
  if (Config.get('showBuildNotifications')) {
    if (data['status'] === 0) {
      const { notifyOnCompletion } = await import('./util');

      if (data['warnings']) {
        notifyOnCompletion({
          level: 'warning',
          message: 'Compiled with warnings',
          outFile: data['outFile']
        });
      } else {
        notifyOnCompletion({
          level: 'success',
          message: 'Compiled successfully',
          outFile: data['outFile']
        });
      }
    } else {
      atom.notifications.addError('Compile Error', { dismissable: false });
    }
  }
}

function flagsCallback(data: unknown): void {
  const output = data['stdout'] || data['stderr'];

  if (String(Config.get('compilerOutput')).toLowerCase() === 'console') {
    try {
      ConsolePanel.show();
      ConsolePanel.log(JSON.stringify(output, null, 2));
    } catch (error) {
      console.info(output);
      atom.openDevTools();
    }
  } else {
    atom.notifications.addInfo(`Compiler Flags`, {
      detail: JSON.stringify(output, null, 2),
      dismissable: true
    });
  }
}
function versionCallback(data: unknown, pathToMakensis: string): void {
  if (String(Config.get('compilerOutput')).toLowerCase() === 'console') {
    try {
      ConsolePanel.show();
      ConsolePanel.log(`makensis ${data['line']} (${pathToMakensis})`);
    } catch (error) {
      console.info(`makensis ${data['line']} (${pathToMakensis})`);
      atom.openDevTools();
    }
  } else {
    atom.notifications.addInfo(`NSIS Version`, {
      detail: `makensis ${data['line']} (${pathToMakensis})`,
      dismissable: true
    });
  }
}

export {
  compilerClose,
  compilerError,
  compilerOutput,
  flagsCallback,
  versionCallback
};
