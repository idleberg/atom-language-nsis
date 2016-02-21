# Dependencies
{CompositeDisposable} = require 'atom'

fs = require 'fs'
path = require 'path'

# NsisConfig
module.exports = NsisConfig =
  runner: null,
  subscriptions: null,
  workspace: atom.workspace

  # Ask user whether to set default runner
  activate: (state) ->

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register commands
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS: Set build command for atom–runner': => @setRunnerConf()
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS: Remove build command for atom–runner': => @unsetRunnerConf()
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS: Create .atom–build file': => @createBuildFile()


################################################################################
# atom-runner
# https://github.com/lsegal/atom-runner
# 
  setRunnerConf: ->

    @runner =
        path: atom.packages.resolvePackagePath('atom-runner')
        active: atom.packages.isPackageLoaded('atom-runner')

    if (typeof @runner.path != 'undefined') and (@runner.active == true)
      atom.confirm
        message: 'Set default runner for NSIS'
        detailedMessage: 'To compile NSIS scripts inside Atom, you need to define a runner. Do you want to use makensis as default runner?'
        buttons:
          "Use makensis": ->
            console.log "config-nsis: Set runner.scopes.nsis to 'makensis -'"
            atom.config.set('runner.scopes.nsis','makensis -')
          "Cancel": ->
            console.log "config-nsis: Cancelled setting default runner"
            return

  unsetRunnerConf: ->

    console.log "config-nsis: Unset runner.scopes.nsis"
    atom.config.unset('runner.scopes.nsis')


################################################################################
# atom-build
# https://github.com/mirhec/atom-build
# 
  createBuildFile: ->

    buildFile =
        cmd: "makensis",
        args: [ "{FILE_ACTIVE}" ],
        sh: false,
        cwd: "{PROJECT_PATH}"
        # env:
          # VARIABLE1: "VALUE1"
        # errorMatch: "^regexp$"

    currentFile = @workspace.getActivePaneItem().getPath()

    unless typeof currentFile is "undefined"

      currentPath = path.dirname(currentFile) + "/"

      console.log "config-nsis: Saving " + currentPath + ".atom-build.json"
      
      fs.writeFile currentPath + "/.atom-build.json", JSON.stringify(buildFile, null, 4), (error) ->
        console.error("config-nsis: Error writing file", error) if error

    else

      atom.confirm
        message: 'File not saved'
        detailedMessage: 'You need to save this file before you can create a build-file'
        buttons:
          "OK": -> return
