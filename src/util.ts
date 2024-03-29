import { constants, promises as fs } from 'fs';
import { exec } from 'child_process';
import { name } from '../package.json';
import { platform } from 'os';
import { resolve } from 'path';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import Browse from './services/browse';
import Config from './config';
import ConsolePanel from './services/console-panel';

interface NotificationParams {
  dismissable?: boolean;
  level?: string;
  message: string;
  outFile?: string;
  type?: string;
}

function clearConsole(): void {
  try {
    ConsolePanel.clear();
  } catch (error) {
    if (Config.get('clearConsole')) {
      console.clear();
    }
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath, constants.F_OK);
  } catch (error) {
    return false;
  }

  return true;
}

async function findPackagePath(packageName: string): Promise<string[]> {
  const packageDirPaths = atom.packages.getPackageDirPaths();

  return (await Promise.all(packageDirPaths.map(async packageDirPath => {
    const packageDir = resolve(packageDirPath, packageName);

    if (await fileExists(resolve(packageDir, 'package.json'))) {
      return packageDir;
    }

    return undefined;
  }))).filter(item => item);
}

async function getMakensisPath(): Promise<string> {
  // If stored, return pathToMakensis
  const pathToMakensis = String(Config.get('compilerOptions.pathToMakensis'));

  if (pathToMakensis?.length && pathToMakensis !== 'makensis') {
    return pathToMakensis;
  }

  const which =(await import('which')).default;

  return String(await which('makensis')) || 'makensis';
}

async function getSpawnEnv(): Promise<unknown> {
  return {
    env: {
      NSISDIR: process.env.NSISDIR || undefined,
      NSISCONFDIR: process.env.NSISCONFDIR || undefined,
      LANGUAGE: !isWindows() && !process.env.LANGUAGE ? 'en_US.UTF-8' : undefined,
      LC_ALL: !isWindows() && !process.env.LC_ALL ? 'en_US.UTF-8' : undefined,
    }
  };
}

function isHeaderFile(filePath: string): boolean {
  const headerFiles = [
    '.bnsh',
    '.nsh'
  ];

  return Boolean(headerFiles.filter(fileExt => filePath?.endsWith(fileExt)).length);
}

function isLoadedAndActive(packageName: string): boolean {
  return atom.packages.isPackageLoaded(packageName) && atom.packages.isPackageActive(packageName);
}

function isWindows(): boolean {
  return platform() === 'win32'
}

function isWindowsCompatible(): boolean {
  return isWindows() || Config.get('useWineToRun')
    ? true
    : false;
}

async function manageDependencies(): Promise<void> {
  await satisfyDependencies(name);
}
function missingPackageWarning(packageName: string): void {
  const notification = atom.notifications.addWarning(`This command requires the \`${packageName}\` package to be installed and enabled`, {
    dismissable: true,
    buttons: [
      {
        text: 'Show Package',
        async onDidClick() {
          notification.dismiss();

          await atom.workspace.open(`atom://config/packages/${packageName}`, {
            pending: true,
            searchAllPanes: true,
          });

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
}

function getNotificationLevel(level: string): string {
  switch(level.toLowerCase()) {
    case 'success':
       return 'addSuccess';

    case 'warning':
       return 'addWarning';

    case 'error':
       return 'addError';

    case 'fatal':
    case 'fatalerror':
       return 'addFatalError';

    default:
      return 'addInfo';
  }
}

function notifyOnCompletion(params: NotificationParams): void {
  const type = getNotificationLevel(params.level);

  const notification = atom.notifications[type](params.message, {
    dismissable: params.dismissable || true,
    buttons: params.outFile ? [
      isWindowsCompatible() ? {
        text: 'Run',
        className: 'icon icon-playback-play',
        async onDidClick() {
          notification.dismiss();
          await runInstaller(params.level);

          return;
        },
      } : undefined,
      isLoadedAndActive('browse') ? {
        text: 'Reveal',
        className: 'icon icon-location',

        onDidClick() {
          notification.dismiss();
          Browse.reveal(params.outFile);

          return;
        },
      } : undefined,
      {
        text: 'Cancel',

        onDidClick() {
          notification.dismiss();

          return;
        },
      }
    ].filter(item => item) : [],
  });
}

async function openURL(nsisCommand: string): Promise<void> {
  const open = (await import('open')).default;
  open(`https://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Commands/${nsisCommand}.html?utm_source=atom&utm_content=reference`);
}

async function runInstaller(outFile) {

  if (isWindows()) {
    try {
      exec(`cmd /c "${outFile}"`);
    } catch (error) {
      console.error(error);
    }

    return;
  } else if (Config.get('useWineToRun')) {
    const execa = (await import('execa')).default;
    const pathToWine = String(Config.get('pathToWine')) || 'wine';

    try {
      await execa(pathToWine, [ outFile ]);
    } catch (error) {
      console.error(error);
    }
  }
}

function inRange(value: number, options: {min: number, max: number}): boolean {
  return value >= options.min && value <= options.max;
}

export {
  clearConsole,
  fileExists,
  findPackagePath,
  getMakensisPath,
  getSpawnEnv,
  inRange,
  isHeaderFile,
  isLoadedAndActive,
  isWindows,
  isWindowsCompatible,
  manageDependencies,
  missingPackageWarning,
  notifyOnCompletion,
  openURL
}
