import { config as dotenvConfig } from 'dotenv';
import { constants, promises as fs } from 'fs';
import { exec } from 'child_process';
import { name } from '../package.json';
import { platform } from 'os';
import { resolve } from 'path';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import Browse from './services/browse';
import Config from './config';
import ConsolePanel from './services/console-panel';
import devConsole from './log';

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

async function findEnvFile() {
  let envFile = undefined;
  const projectPath: string = atom.project.getPaths()[0];

  if (projectPath) {
    switch (true) {
      case (await fileExists(resolve(projectPath, '.env.local'))):
        envFile = resolve(projectPath, '.env.local');
        break;

      case (process.env.NODE_ENV && await fileExists(resolve(projectPath, `.env.[${process.env.NODE_ENV}]`))):
        envFile = resolve(projectPath, `.env.[${process.env.NODE_ENV}]`);
        break;

      case (await fileExists(resolve(projectPath, '.env'))):
        envFile = resolve(projectPath, '.env');
        break;

      default:
        break;
    }

    if (envFile) devConsole.log(`Found DotEnv file ${envFile}`);
  }

  return envFile;
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

async function initDotEnv(): Promise<void> {
  const dotenvExpand = (await import('dotenv-expand')).default;
  const envFile =  await findEnvFile();

  dotenvExpand(
    dotenvConfig({
      path: envFile
    })
  );

  if (envFile) devConsole.log('Loading environment variables', Object.entries(process.env).filter(([key]) => key.startsWith('NSIS_APP_')))
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

function mapDefinitions(): unknown {
  const definitions = {};
  const prefix = 'NSIS_APP_';

  Object.keys(process.env).map(item => {
    if (item.length && new RegExp(`${prefix}[a-z0-9]+`, 'gi').test(item)) {
      definitions[item] = process.env[item];
    }
  });

  return Object.keys(definitions).length
    ? definitions
    : undefined;
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

function notifyOnCompletion(type: string, messageText: string, outFile: string): void {
  const notification = atom.notifications[type](messageText, {
    dismissable: true,
    buttons: outFile ? [
      isWindowsCompatible() ? {
        text: 'Run',
        className: 'icon icon-playback-play',
        async onDidClick() {
          notification.dismiss();
          await runInstaller(outFile);

          return;
        },
      } : undefined,
      isLoadedAndActive('browse') ? {
        text: 'Reveal',
        className: 'icon icon-location',

        onDidClick() {
          notification.dismiss();
          Browse.reveal(outFile);

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
  open(`https://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Reference/${nsisCommand}.html?utm_source=atom&utm_content=reference`);
}

async function runInstaller(outFile) {

  if (isWindows()) {
    try {
      exec(`cmd /c "${outFile}"`);
    } catch (error) {
      console.error(error);
      atom.notifications.addWarning('Failed to run installer, see console for details', {
        dismissable: true
      });
    }

    return;
  } else if (Config.get('useWineToRun')) {
    const execa = (await import('execa')).default;

    try {
      await execa('wine', [ outFile ]);
    } catch (error) {
      atom.notifications.addWarning('Failed to run installer, see console for details', {
        dismissable: true
      });
      console.error(error);
    }
  }
}

export {
  clearConsole,
  fileExists,
  findPackagePath,
  getMakensisPath,
  getSpawnEnv,
  initDotEnv,
  isHeaderFile,
  isLoadedAndActive,
  isWindows,
  isWindowsCompatible,
  manageDependencies,
  mapDefinitions,
  missingPackageWarning,
  notifyOnCompletion,
  openURL
}
