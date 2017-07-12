Build = require "./build"
Makensis = require "./makensis"
Runner = require "./runner"
{ getPrefix, openSettings, satisfyDependencies } = require "./util"

module.exports = NsisCore =
  config:
    pathToMakensis:
      title: "Path To MakeNSIS"
      description: "Specify the full path to `makensis`"
      type: "string"
      default: "makensis"
      order: 0
    compilerArguments:
      title: "Compiler Arguments"
      description: "Specify the default arguments for `makensis` ([see documentation](http://nsis.sourceforge.net/Docs/Chapter3.html#usage))"
      type: "string"
      default: "#{getPrefix()}V3"
      order: 1
    alwaysShowOutput:
      title: "Always Show Output"
      description: "Displays compiler output in console panel. When deactivated, it will only show on errors"
      type: "boolean"
      default: true
      order: 2
    showBuildNotifications:
      title: "Show Build Notifications"
      description: "Displays color-coded notifications that close automatically after 5 seconds"
      type: "boolean"
      default: true
      order: 3
    clearConsole:
      title: "Clear Console"
      description: "When `console-panel` isn't available, build logs will be printed using `console.log()`. This setting clears the console prior to building."
      type: "boolean"
      default: true
      order: 4
    buildFileSyntax:
      title: "Build File Syntax"
      description: "Specify the default syntax for your build file ([requires build](https://atom.io/packages/build))"
      type: "string",
      default: "JSON",
      enum: [
        "CSON",
        "JSON",
        "YAML"
      ],
      order: 5
    compilerOutput:
      title: "Compiler Output"
      description: "Specify whether `makensis` outputs its version or compiler flags to notifications the console"
      type: "string",
      default: "Notification",
      enum: [
        "Notification",
        "Console"
      ],
      order: 6
    useWineToRun:
      title: "Use Wine to run"
      description: "When on a non-Windows platform, you can run compiled installers using [Wine](https://www.winehq.org/)"
      type: "boolean"
      default: false
      order: 7
    manageDependencies:
      title: "Manage Dependencies"
      description: "When enabled, third-party dependencies will be installed automatically"
      type: "boolean"
      default: true
      order: 8
  subscriptions: null

  activate: (state) ->
    {CompositeDisposable} = require "atom"

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register commands
    @subscriptions.add atom.commands.add "atom-workspace", "NSIS:save-&-compile": => Makensis.compile(false, @consolePanel)
    @subscriptions.add atom.commands.add "atom-workspace", "NSIS:save-&-compile-strict": => Makensis.compile(true, @consolePanel)
    @subscriptions.add atom.commands.add "atom-workspace", "NSIS:show-version": => Makensis.showVersion(@consolePanel)
    @subscriptions.add atom.commands.add "atom-workspace", "NSIS:show-compiler-flags": => Makensis.showCompilerFlags(@consolePanel)
    @subscriptions.add atom.commands.add "atom-workspace", "NSIS:open-package-settings": -> openSettings()
    @subscriptions.add atom.commands.add "atom-workspace", "NSIS:satisfy-package-dependencies": -> satisfyDependencies()
    @subscriptions.add atom.commands.add "atom-workspace", "NSIS:create-.atom–build-file": -> Build.createFile(false)
    @subscriptions.add atom.commands.add "atom-workspace", "NSIS:create-.atom–build-file-for-wine": -> Build.createFile(true)
    @subscriptions.add atom.commands.add "atom-workspace", "NSIS:set-default-runner": -> Runner.set()
    @subscriptions.add atom.commands.add "atom-workspace", "NSIS:remove-default-runner": -> Runner.remove()

    satisfyDependencies() if atom.config.get("language-nsis.manageDependencies") is true

  deactivate: ->
    @subscriptions?.dispose()
    @subscriptions = null

  consumeConsolePanel: (@consolePanel) ->
