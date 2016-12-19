Config = require './config'
meta = require '../package.json'

os = require 'os'
{spawn} = require 'child_process'

if os.platform() is 'win32'
  which  = "where"
  prefix = "/"
else
  which  = "which"
  prefix = "-"

module.exports = NsisCore =
  config:
    pathToMakensis:
      title: "Path To MakeNSIS"
      description: "Specify the full path to `makensis`. On first compile, the package will run `#{which} makensis` in order to detect it."
      type: "string"
      default: "makensis"
      order: 0
    compilerArguments:
      title: "Compiler Arguments"
      description: "Specify the default arguments for `makensis` ([see documentation](http://nsis.sourceforge.net/Docs/Chapter3.html#usage))"
      type: "string"
      default: "#{prefix}V3"
      order: 1
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
      order: 2
    showBuildNotifications:
      title: "Show Build Notifications"
      type: "boolean"
      default: true
      order: 3
  subscriptions: null

  activate: (state) ->
    {CompositeDisposable} = require 'atom'

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register commands
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:save-&-compile': => @buildScript(false, @consolePanel)
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:save-&-compile-strict': => @buildScript(true, @consolePanel)
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:show-version': => @showVersion()
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:create-.atom–build-file': -> Config.createBuildFile(false)
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:create-.atom–build-file-for-wine': -> Config.createBuildFile(true)
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:set-default-runner': -> Config.setRunner()
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:remove-default-runner': -> Config.removeRunner()

    require('atom-package-deps').install(meta.name)

  deactivate: ->
    @subscriptions?.dispose()
    @subscriptions = null

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
      showBuildNotifications = atom.config.get('language-nsis.showBuildNotifications')

      # only add WX flag if not already specified
      if strictMode == true and compilerArguments.indexOf(prefix + 'WX') == -1
        compilerArguments.push "#{prefix}WX"
      compilerArguments.push script

      consolePanel.clear()

      # Find makensis
      makensis = spawn pathToMakensis, compilerArguments
      hasWarning = false
      stdOut = ""

      makensis.stdout.on 'data', (data) ->
        stdOut += "\n#{data}";
        if data.indexOf("warning: ") isnt -1
          hasWarning = true
          consolePanel.raw(data.toString(), level="warn", lineEnding="\n")
        else
          consolePanel.log(data.toString(), lineEnding="\n")

      makensis.stderr.on 'data', (data) ->
        consolePanel.error(data.toString())

      makensis.on 'close', ( errorCode ) ->
        if errorCode is 0
          if hasWarning is true
            return atom.notifications.addWarning("Compiled with warnings", dismissable: false) if showBuildNotifications
          else
            return atom.notifications.addSuccess("Compiled successfully", dismissable: false) if showBuildNotifications

        return atom.notifications.addError("Compile Error", dismissable: false) if showBuildNotifications
    else
      # Something went wrong
      atom.beep()

  showVersion: () ->
    pathToMakensis = atom.config.get('language-nsis.pathToMakensis')

    version = spawn pathToMakensis, ["#{prefix}VERSION"]
    version.stdout.on 'data', ( data ) ->
      atom.notifications.addInfo("**#{meta.name}**", detail: "makensis #{data} (#{pathToMakensis})", dismissable: true)

