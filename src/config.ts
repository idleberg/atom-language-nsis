import { ConfigValues } from 'atom';
import { isWindows } from './util';
import { name } from '../package.json';

export default {
  schema: {
    compilerOptions: {
      title: 'Compiler Options',
      type: 'object',
      order: 1,
      properties: {
        pathToMakensis: {
          title: 'Path To MakeNSIS',
          description: 'Specify the full path to `makensis`',
          type: 'string',
          default: 'makensis',
          order: 1
        },
        verbosity: {
          title: 'Verbosity',
          description: 'Specify the default verbosity for `makensis`',
          type: 'number',
          default: 3,
          enum: [
            {
              value: -1,
              description: '(not set)'
            },
            {
              value: 0,
              description: '0: none'
            },
            {
              value: 1,
              description: '1: no warnings'
            },
            {
              value: 2,
              description: '2: no info'
            },
            {
              value: 3,
              description: '3: no script'
            },
            {
              value: 4,
              description: '4: all'
            }
          ],
          order: 2
        },
        strictMode: {
          title: 'Strict Mode',
          description: 'Enabling strict mode will treat warnings as errors. Note that when disabled, running *NSIS: Compile Strict* will ignore the setting',
          type: 'boolean',
          default: false,
          order: 3
        },
        customArguments: {
          title: 'Custom Arguments',
          description: 'Specify any of the default [compiler arguments](http://nsis.sourceforge.net/Docs/Chapter3.html#usage). Note that these will have precedence over the settings above',
          type: 'string',
          default: '',
          order: 4
        }
      },
    },
    processHeaders: {
      title: 'Process Headers',
      description: 'By default, you can only compile (and create build-files) for `.nsi` files. This setting enables support for `.nsh` files.',
      type: 'string',
      enum: [
        'Allow',
        'Disallow',
        'Disallow & Never Ask Me'
      ],
      default: 'Disallow',
      order: 1
    },
    showBuildNotifications: {
      title: 'Show Build Notifications',
      description: 'Displays color-coded notifications that close automatically after 5 seconds',
      type: 'boolean',
      default: true,
      order: 2
    },
    showFlagsAsObject: {
      title: 'Show Flags as Object',
      description: 'Displays compiler flags as JSON',
      type: 'boolean',
      default: true,
      order: 3
    },
    alwaysShowOutput: {
      title: 'Always Show Output',
      description: 'Displays compiler output in console panel. When deactivated, it will only show on errors',
      type: 'boolean',
      default: true,
      order: 4
    },
    clearConsole: {
      title: 'Clear Console',
      description: 'When `console-panel` isn\'t available, build logs will be printed using `console.log()`. This setting clears the console prior to building.',
      type: 'boolean',
      default: true,
      order: 5
    },
    compilerOutput: {
      title: 'Compiler Output',
      description: 'Specify whether `makensis` outputs its version or compiler flags to notifications the console',
      type: 'string',
      default: 'console',
      enum: [
        {
          value: 'notification',
          description: 'Notification'
        },
        {
          value: 'console',
          description: 'Console'
        }
      ],
      order: 6
    },
    buildFileSyntax: {
      title: 'Build File Syntax',
      description: 'Specify the default syntax for your build file (requires [build](https://atom.io/packages/build))',
      type: 'string',
      default: 'json',
      enum: [
        {
          value: 'json',
          description: 'JSON'
        },
        {
          value: 'yaml',
          description: 'YAML'
        }
      ],
      order: 7
    },
    useWineToRun: !isWindows() ? {
      title: 'Run with Wine',
      description: 'When on a non-Windows platform, you can run compiled installers using [Wine](https://www.winehq.org/)',
      type: 'boolean',
      default: false,
      order: 8
    } : {},
    pathToWine: !isWindows() ? {
      title: 'Path To Wine',
      description: 'Specifies a custom path to `wine`, useful when relying on alternatives such as `wine32` or [`wine32on64`](https://github.com/Gcenx/homebrew-wine)',
      type: 'string',
      default: 'wine',
      order: 9
    } : {},
    manageDependencies: {
      title: 'Manage Dependencies',
      description: 'When enabled, third-party dependencies will be installed automatically',
      type: 'boolean',
      default: true,
      order: 10
    }
  },

  get(key = ''): ConfigValues {
    return key?.length ? atom.config.get(`${name}.${key}`) : atom.config.get(`${name}`);
  },

  migrate(oldKey: string, newKey: string): void {
    if (!atom.config.get(`${name}.${oldKey}`) || atom.config.get(`${name}.${newKey}`)) {
      return;
    }

    try {
      atom.config.set(`${name}.${newKey}`, atom.config.get(`${name}.${oldKey}`));
    } catch (error) {
      atom.notifications.addWarning(`Failed to migrate configuration, see console for details`);

      return;
    }

    atom.config.unset(`${name}.${oldKey}`);
  },

  unset(key = ''): void {
    const unsetKey = key?.length ? `${name}.${key}` : name;

    atom.config.unset(unsetKey);
  },

  async open(options = {}): Promise<void> {
    options = {
      pending: true,
      searchAllPanes: true,
      ...options,
    };

    await atom.workspace.open(`atom://config/packages/${name}`, options);
  }
};
