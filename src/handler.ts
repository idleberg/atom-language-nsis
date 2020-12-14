import { getConfig } from './util';
import ConsolePanel from './services/console-panel';

function flagHandler(data: unknown): void {
  const output = data['stdout'] || data['stderr'];

  if (String(getConfig('compilerOutput')).toLowerCase() === 'console') {
    try {
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
  if (String(getConfig('compilerOutput')).toLowerCase() === 'console') {
    try {
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
  flagHandler,
  versionHandler
};
