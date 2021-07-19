import Config from './config';
import ConsolePanel from './services/console-panel';

function compilerOutputHandler(data: unknown): void {
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

function compilerErrorHandler(data: unknown): void {
  try {
    ConsolePanel.error(data['line']);
  } catch (error) {
    console.error(data['line']);
  }
}

async function compilerExitHandler(data: unknown): Promise<void> {
  if (data['status'] === 0) {
    const { notifyOnCompletion } = await import('./util');

    if (data['warnings'] && Config.get('showBuildNotifications')) {
      notifyOnCompletion('addWarning', 'Compiled with warnings', data['outFile']);
    } else if (Config.get('showBuildNotifications')) {
      notifyOnCompletion('addSuccess', 'Compiled successfully', data['outFile']);
    }
  } else if (Config.get('showBuildNotifications')) {
    atom.notifications.addError('Compile Error', { dismissable: false });
  }
}

function flagsHandler(data: unknown): void {
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
function versionHandler(data: unknown, pathToMakensis: string): void {
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
  compilerErrorHandler,
  compilerExitHandler,
  compilerOutputHandler,
  flagsHandler,
  versionHandler
};
