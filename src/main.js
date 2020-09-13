/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let NsisCore;
const { getConfig, getPrefix, openSettings } = require("./util");
const { readManifestSync } = require("atom-read-manifest");
const { satisfyDependencies } = require("atom-satisfy-dependencies");

const meta = readManifestSync();

module.exports = (NsisCore = {
  config: {
    pathToMakensis: {
      title: "Path To MakeNSIS",
      description: "Specify the full path to `makensis`",
      type: "string",
      default: "makensis",
      order: 0
    },
    compilerArguments: {
      title: "Compiler Arguments",
      description: "Specify the default arguments for `makensis`, separated by commas ([see documentation](http://nsis.sourceforge.net/Docs/Chapter3.html#usage))",
      type: "array",
      default: [
        `${getPrefix()}V3`
      ],
      items: {
        type: "string"
      },
      order: 1
    },
    alwaysShowOutput: {
      title: "Always Show Output",
      description: "Displays compiler output in console panel. When deactivated, it will only show on errors",
      type: "boolean",
      default: true,
      order: 2
    },
    showBuildNotifications: {
      title: "Show Build Notifications",
      description: "Displays color-coded notifications that close automatically after 5 seconds",
      type: "boolean",
      default: true,
      order: 3
    },
    clearConsole: {
      title: "Clear Console",
      description: "When `console-panel` isn't available, build logs will be printed using `console.log()`. This setting clears the console prior to building.",
      type: "boolean",
      default: true,
      order: 4
    },
    allowHeaderCompilation: {
      title: "Allow Header Compilation",
      description: "By default, only `.nsi` files will be compiled. This setting enables compilation for `.nsh` files as well.",
      type: "boolean",
      default: false,
      order: 5
    },
    showFlagsAsObject: {
      title: "Show Flags as Object",
      description: "Displays compiler flags as JSON",
      type: "boolean",
      default: true,
      order: 6
    },
    buildFileSyntax: {
      title: "Build File Syntax",
      description: "Specify the default syntax for your build file (requires [build](https://atom.io/packages/build))",
      type: "string",
      default: "json",
      enum: [
        {
          value: "cson",
          description: "CSON"
        },
        {
          value: "json",
          description: "JSON"
        },
        {
          value: "yaml",
          description: "YAML"
        }
      ],
      order: 7
    },
    compilerOutput: {
      title: "Compiler Output",
      description: "Specify whether `makensis` outputs its version or compiler flags to notifications the console",
      type: "string",
      default: "notification",
      enum: [
        {
          value: "notification",
          description: "Notification"
        },
        {
          value: "console",
          description: "Console"
        }
      ],
      order: 8
    },
    useWineToRun: {
      title: "Use Wine to run",
      description: "When on a non-Windows platform, you can run compiled installers using [Wine](https://www.winehq.org/)",
      type: "boolean",
      default: false,
      order: 9
    },
    manageDependencies: {
      title: "Manage Dependencies",
      description: "When enabled, third-party dependencies will be installed automatically",
      type: "boolean",
      default: true,
      order: 10
    }
  },
  subscriptions: null,

  activate(state) {
    const { CompositeDisposable } = require("atom");
    const Build = require("./build");
    const Lookup = require("./lookup");
    const Makensis = require("./makensis");
    const NLF = require("./nlf");
    const Runner = require("./runner");

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable;

    // Register commands
    this.subscriptions.add(atom.commands.add("atom-workspace", {"NSIS:save-&-compile": () => Makensis.compile(false, this.consolePanel)}));
    this.subscriptions.add(atom.commands.add("atom-workspace", {"NSIS:save-&-compile-strict": () => Makensis.compile(true, this.consolePanel)}));
    this.subscriptions.add(atom.commands.add("atom-workspace", {"NSIS:show-version": () => Makensis.showVersion(this.consolePanel)}));
    this.subscriptions.add(atom.commands.add("atom-workspace", {"NSIS:show-compiler-flags": () => Makensis.showCompilerFlags(this.consolePanel)}));
    this.subscriptions.add(atom.commands.add("atom-workspace", {"NSIS:open-package-settings"() { return openSettings(); }}));
    this.subscriptions.add(atom.commands.add("atom-workspace", {"NSIS:satisfy-package-dependencies"() { return satisfyDependencies(meta.name); }}));
    this.subscriptions.add(atom.commands.add("atom-workspace", {"NSIS:create-.atom–build-file"() { return Build.createFile(false); }}));
    this.subscriptions.add(atom.commands.add("atom-workspace", {"NSIS:create-.atom–build-file-for-wine"() { return Build.createFile(true); }}));
    this.subscriptions.add(atom.commands.add("atom-workspace", {"NSIS:set-default-runner"() { return Runner.set(); }}));
    this.subscriptions.add(atom.commands.add("atom-workspace", {"NSIS:remove-default-runner"() { return Runner.remove(); }}));
    this.subscriptions.add(atom.commands.add("atom-workspace", { "NSIS:command-reference"() {
      Lookup.init();
      return Lookup.toggle();
    }
  }
    )
    );
    this.subscriptions.add(atom.commands.add("atom-workspace", {"NSIS:convert-language-file"() { return NLF.convert(); }}));

    if (getConfig("manageDependencies") === true) { return satisfyDependencies(meta.name, { showPrompt: true }); }
  },

  deactivate() {
    if (this.subscriptions != null) {
      this.subscriptions.dispose();
    }
    return this.subscriptions = null;
  },

  consumeConsolePanel(consolePanel) {
    this.consolePanel = consolePanel;
  }
});
