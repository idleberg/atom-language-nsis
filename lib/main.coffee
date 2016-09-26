Makensis = require './makensis'
Config = require './config'

os = require 'os'

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
      default: "#{prefix}V2"
      order: 1
    buildFileSyntax:
      title: "Build File Syntax"
      description: "Specify the default syntax for your `build` file"
      default: "JSON",
      type: "string",
      enum: [
        "CSON",
        "JSON",
        "YAML"
      ],
      order: 2
  subscriptions: null

  activate: (state) ->
    {CompositeDisposable} = require 'atom'

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register commands
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:save-&-compile': => Makensis.buildScript()
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:show-version': => Makensis.showVersion()
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:create-.atom–build-file': => Config.createBuildFile(false)
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:create-.atom–build-file-for-wine': => Config.createBuildFile(true)
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:set-default-runner': => Config.setRunner()
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:remove-default-runner': => Config.removeRunner()

  deactivate: ->
    @subscriptions?.dispose()
    @subscriptions = null
