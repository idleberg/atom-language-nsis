import { platform } from 'os';

export default {
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
            value: 0,
            description: '0 - none'
          },
          {
            value: 1,
            description: '1 - no warnings'
          },
          {
            value: 2,
            description: '2 - no info'
          },
          {
            value: 3,
            description: '3 - no script'
          },
          {
            value: 4,
            description: '4 - all'
          }
        ],
        order: 2
      },
      strictMode: {
        title: 'Strict Mode',
        description: 'Enabling strict mode will treat warnings as errors. Note that when disabled, running *NSIS: Compile Strict* will override the setting',
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
    type: 'boolean',
    default: false,
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
  useWineToRun: platform() !== 'win32' ? {
    title: 'Use Wine to run',
    description: 'When on a non-Windows platform, you can run compiled installers using [Wine](https://www.winehq.org/)',
    type: 'boolean',
    default: false,
    order: 8
  } : {},
  manageDependencies: {
    title: 'Manage Dependencies',
    description: 'When enabled, third-party dependencies will be installed automatically',
    type: 'boolean',
    default: true,
    order: 9
  }
};
