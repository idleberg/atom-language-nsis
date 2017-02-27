Config = require './config'
meta = require '../package.json'

{ platform } = require 'os'
{ spawn } = require 'child_process'

if platform() is 'win32'
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
      description: "When enabled, third-party dependencies will be installed automatically"
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
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:open-package-settings': => @openSettings()
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:satisfy-package-dependencies': => @satisfyDependencies()
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:create-.atom–build-file': -> Config.createBuildFile(false)
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:create-.atom–build-file-for-wine': -> Config.createBuildFile(true)
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:set-default-runner': -> Config.setRunner()
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:remove-default-runner': -> Config.removeRunner()

    if atom.config.get('language-nsis.manageDependencies')
      @satisfyDependencies()

  deactivate: ->
    @subscriptions?.dispose()
    @subscriptions = null

  satisfyDependencies: () ->
    require('atom-package-deps').install(meta.name, true)

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

      @getPath (pathToMakensis) ->
        compilerArguments = atom.config.get('language-nsis.compilerArguments').trim().split(" ")

        # only add WX flag if not already specified
        if strictMode == true and compilerArguments.indexOf("#{prefix}WX") == -1
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

  getPath: (callback) ->
    # If stored, return pathToMakensis
    pathToMakensis = atom.config.get('language-nsis.pathToMakensis')
    if pathToMakensis.length > 0 and pathToMakensis isnt "makensis"
      return callback(pathToMakensis)

    # Find makensis
    which = spawn @which(), ["makensis"]

    which.stdout.on 'data', ( data ) ->
      path = data.toString().trim()
      atom.config.set('language-nsis.pathToMakensis', path)
      return callback(path)

    which.on 'close', ( errorCode ) ->
      if errorCode > 0
        atom.notifications.addError("**language-nsis**: makensis is not in your `PATH` [environmental variable](http://superuser.com/a/284351/195953)", dismissable: true)

  showVersion: () ->
    @getPath (pathToMakensis) ->

      version = spawn pathToMakensis, ["#{prefix}VERSION"]
      version.stdout.on 'data', ( version ) ->
        atom.notifications.addInfo("**#{meta.name}**", detail: "makensis #{version} (#{pathToMakensis})", dismissable: true)

  openSettings: ->
    atom.workspace.open("atom://config/packages/#{meta.name}")

  which: ->
    if platform() is "win32"
      return "where"

    return "which"
