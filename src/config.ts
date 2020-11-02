import { getPrefix } from './util';
import { platform } from 'os';

export default {
  pathToMakensis: {
    title: 'Path To MakeNSIS',
    description: 'Specify the full path to `makensis`',
    type: 'string',
    default: 'makensis',
    order: 0
  },
  compilerArguments: {
    title: 'Compiler Arguments',
    description: 'Specify the default arguments for `makensis`, separated by commas ([see documentation](http://nsis.sourceforge.net/Docs/Chapter3.html#usage))',
    type: 'array',
    default: [
      `${getPrefix()}V3`
    ],
    items: {
      type: 'string'
    },
    order: 1
  },
  alwaysShowOutput: {
    title: 'Always Show Output',
    description: 'Displays compiler output in console panel. When deactivated, it will only show on errors',
    type: 'boolean',
    default: true,
    order: 2
  },
  showBuildNotifications: {
    title: 'Show Build Notifications',
    description: 'Displays color-coded notifications that close automatically after 5 seconds',
    type: 'boolean',
    default: true,
    order: 3
  },
  clearConsole: {
    title: 'Clear Console',
    description: 'When `console-panel` isn\'t available, build logs will be printed using `console.log()`. This setting clears the console prior to building.',
    type: 'boolean',
    default: true,
    order: 4
  },
  processHeaders: {
    title: 'Process Headers',
    description: 'By default, you can only compile (and create build-files) for `.nsi` files. This setting enables support for `.nsh` files.',
    type: 'boolean',
    default: false,
    order: 5
  },
  showFlagsAsObject: {
    title: 'Show Flags as Object',
    description: 'Displays compiler flags as JSON',
    type: 'boolean',
    default: true,
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
    order: 8
  },
  useWineToRun: platform() !== 'win32' ? {
    title: 'Use Wine to run',
    description: 'When on a non-Windows platform, you can run compiled installers using [Wine](https://www.winehq.org/)',
    type: 'boolean',
    default: false,
    order: 9
  } : {},
  manageDependencies: {
    title: 'Manage Dependencies',
    description: 'When enabled, third-party dependencies will be installed automatically',
    type: 'boolean',
    default: true,
    order: 10
  }
};
