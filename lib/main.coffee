Config = require './config'
meta = require '../package.json'

os = require 'os'
{spawn} = require 'child_process'

if os.platform() is 'win32'
  prefix = "/"
else
  prefix = "-"

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
      default: "#{prefix}V3"
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
      default: "JSON",
      type: "string",
      enum: [
        "CSON",
        "JSON",
        "YAML"
      ],
      order: 5
    manageDependencies:
      title: "Manage Dependencies"
      description: "When enabled, this will automatically install third-party dependencies"
      type: "boolean"
      default: true
      order: 6
  subscriptions: null

  activate: (state) ->
    {CompositeDisposable} = require 'atom'

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register commands
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:save-&-compile': => @buildScript(false, @consolePanel)
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:save-&-compile-strict': => @buildScript(true, @consolePanel)
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:show-version': => @showVersion()
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:setup-package-dependencies': => @setupPackageDeps()
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:create-.atom–build-file': -> Config.createBuildFile(false)
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:create-.atom–build-file-for-wine': -> Config.createBuildFile(true)
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:set-default-runner': -> Config.setRunner()
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:remove-default-runner': -> Config.removeRunner()

    if atom.config.get('language-nsis.manageDependencies')
      @setupPackageDeps()

  deactivate: ->
    @subscriptions?.dispose()
    @subscriptions = null

  setupPackageDeps: () ->
    require('atom-package-deps').install(meta.name)

    for k, v of meta["package-deps"]
      if atom.packages.isPackageDisabled(v)
        console.log "Enabling package '#{v}'" if atom.inDevMode()
        atom.packages.enablePackage(v)

  consumeConsolePanel: (@consolePanel) ->

  buildScript: (strictMode, consolePanel) ->
    editor = atom.workspace.getActiveTextEditor()

    unless editor?
      atom.notifications.addWarning("**#{meta.name}**: No active editor", dismissable: false)
      return

    script = editor.getPath()
    scope  = editor.getGrammar().scopeName

    if script? and scope.startsWith 'source.nsis'
      editor.save() if editor.isModified()

      pathToMakensis = atom.config.get('language-nsis.pathToMakensis')
      compilerArguments = atom.config.get('language-nsis.compilerArguments').trim().split(" ")

      # only add WX flag if not already specified
      if strictMode == true and compilerArguments.indexOf(prefix + 'WX') == -1
        compilerArguments.push "#{prefix}WX"
      compilerArguments.push script

      try
        consolePanel.clear()
      catch
        console.clear() if atom.config.get('language-nsis.clearConsole')

      # Let's go
      makensis = spawn pathToMakensis, compilerArguments
      hasWarning = false

      makensis.stdout.on 'data', (data) ->
        if data.indexOf("warning: ") isnt -1
          hasWarning = true
          try
            consolePanel.warn(data.toString()) if atom.config.get('language-nsis.alwaysShowOutput')
          catch
            console.warn(data.toString())
        else
          try
            consolePanel.log(data.toString()) if atom.config.get('language-nsis.alwaysShowOutput')
          catch
            console.log(data.toString())

      makensis.stderr.on 'data', (data) ->
        try
          consolePanel.error(data.toString())
        catch
          console.error(data.toString())

      makensis.on 'close', ( errorCode ) ->
        if errorCode is 0
          if hasWarning is true
            return atom.notifications.addWarning("Compiled with warnings", dismissable: false) if atom.config.get('language-nsis.showBuildNotifications')
          else
            return atom.notifications.addSuccess("Compiled successfully", dismissable: false) if atom.config.get('language-nsis.showBuildNotifications')

        return atom.notifications.addError("Compile Error", dismissable: false) if atom.config.get('language-nsis.showBuildNotifications')
    else
      # Something went wrong
      atom.beep()

  showVersion: () ->
    pathToMakensis = atom.config.get('language-nsis.pathToMakensis')

    version = spawn pathToMakensis, ["#{prefix}VERSION"]
    version.stdout.on 'data', ( data ) ->
      atom.notifications.addInfo("**#{meta.name}**", detail: "makensis #{data} (#{pathToMakensis})", dismissable: true)

