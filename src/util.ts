import { config as dotenvConfig } from 'dotenv';
import { constants, promises as fs } from 'fs';
import { exec } from 'child_process';
import { platform } from 'os';
import { resolve } from 'path';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import Browse from './services/browse';
import ConsolePanel from './services/console-panel';
import devConsole from './log';
import execa from 'execa';
import open from 'open';
import which from 'which';

function clearConsole(): void {
  try {
    ConsolePanel.clear();
  } catch (error) {
    if (getConfig('clearConsole')) {
      console.clear();
    }
  }
}

function detectOutfile(str: string): string {
  if (str.includes('Output: "')) {
    const regex = /Output: "(.*\.exe)"\r?\n/g;
    const result = regex.exec(str.toString());

    if (typeof result === 'object') {
      try {
        return result['1'];
      } catch (e) {
        return '';
      }
    }
  }

  return '';
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

function getConfig(key: string): any {
    return key
      ? atom.config.get(`language-nsis.${key}`)
      : atom.config.get(`language-nsis`);
}

async function getMakensisPath(): Promise<string> {

  // If stored, return pathToMakensis
  const pathToMakensis = String(getConfig('pathToMakensis'));

  if (pathToMakensis?.length && pathToMakensis !== 'makensis') {
    return pathToMakensis;
  }

  return String(await which('makensis')) || 'makensis';
}

function getPrefix(): string {
  return platform() === 'win32'
    ? '/'
    : '-';
}

async function getSpawnEnv(): Promise<unknown> {
  return {
    env: {
      NSISDIR: process.env.NSISDIR || undefined,
      NSISCONFDIR: process.env.NSISCONFDIR || undefined,
    }
  };
}

async function initDotEnv(): Promise<void> {
  dotenvConfig({
    path: await findEnvFile()
  });
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

function isWindowsCompatible(): boolean {
  return platform() === 'win32' || getConfig('useWineToRun')
    ? true
    : false;
}

async function manageDependencies(): Promise<void> {
  await satisfyDependencies('language-nsis');
}

function mapDefinitions(): string[] {
  const prefix = 'NSIS_APP_';

  return Object.keys(process.env).map(item => {
    if (item.length && new RegExp(`${prefix}[a-z0-9]+`, 'gi').test(item)) {
      return `${getPrefix()}D${item}=${process.env[item]}`;
    }
  }).filter(item => item);
}

function migrateConfig(oldKey: string, newKey: string): void {
  if (atom.config.get(`language-nsis.${newKey}`)) {
    devConsole.warn(`Setting '${newKey}' already exists, skipping migration`);
    return;
  }

  try {
    atom.config.set(`language-nsis.${newKey}`, atom.config.get(`language-nsis.${oldKey}`));
  } catch (error) {
    console.log(error);
    atom.notifications.addWarning(`Failed to migrate configuration, see console for details`);

    return;
  }

  devConsole.warn(`Setting '${oldKey}' migrated successfully to '${newKey}'`);
  atom.config.unset(`language-nsis.${oldKey}`);
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

function openURL(nsisCommand: string): void {
  open(`https://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Reference/${nsisCommand}.html?utm_source=atom&utm_content=reference`, {
    url: true
  });
}

async function runInstaller(outFile) {

  if (platform() === 'win32') {
    try {
      exec(`cmd /c "${outFile}"`);
    } catch (error) {
      console.error(error);
      atom.notifications.addWarning('Failed to run installer, see console for details', {
        dismissable: true
      });
    }

    return;
  } else if (getConfig('useWineToRun') === true) {
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
  detectOutfile,
  fileExists,
  findPackagePath,
  getConfig,
  getMakensisPath,
  getPrefix,
  getSpawnEnv,
  initDotEnv,
  isHeaderFile,
  isLoadedAndActive,
  isWindowsCompatible,
  manageDependencies,
  mapDefinitions,
  migrateConfig,
  missingPackageWarning,
  notifyOnCompletion,
  openURL
}
