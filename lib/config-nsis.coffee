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

    @runner =
        path: atom.packages.resolvePackagePath('atom-runner')
        active: atom.packages.isPackageLoaded('atom-runner')

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register commands
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:set-default-runner': => @setRunnerConf()
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:remove-default-runner': => @unsetRunnerConf()
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:create-.atom–build-file': => @createBuildFile()


################################################################################
# atom-runner
# https://github.com/lsegal/atom-runner
# 
  setRunnerConf: ->

    if (typeof @runner.path != 'undefined') and (@runner.active == true)
      atom.confirm
        message: 'Set default runner for NSIS'
        detailedMessage: 'To compile NSIS scripts inside Atom, you need to define a runner. Do you want to use makensis as default runner?'
        buttons:
          "Use makensis": ->
            atom.notifications.addSuccess("config-nsis", detail: "Set runner.scopes.nsis to 'makensis -'", dismissable: false)
            atom.config.set('runner.scopes.nsis','makensis -')
          "Cancel": ->
            atom.notifications.addWarning("config-nsis", detail: "Cancelled setting default runner", dismissable: false)
            return
    else
      @missingAtomRunner()

  unsetRunnerConf: ->

    if (typeof @runner.path != 'undefined') and (@runner.active == true)
      atom.notifications.addSuccess("config-nsis", detail: "Unset runner.scopes.nsis", dismissable: false)
      atom.config.unset('runner.scopes.nsis')
    else
      @missingAtomRunner()

  missingAtomRunner: ->
    atom.notifications.addWarning("config-nsis", detail: "atom-runner is not installed", dismissable: false)


################################################################################
# atom-build
# https://github.com/mirhec/atom-build
# 
  createBuildFile: ->

    buildFile =
        cmd: "makensis",
        args: [ "{FILE_ACTIVE}" ],
        sh: false,
        cwd: "{FILE_ACTIVE_PATH}"
    createFile = false
    currentFile = @workspace.getActivePaneItem().getPath()

    if typeof currentFile is "undefined"
      atom.confirm
        message: 'File not saved'
        detailedMessage: 'You need to save this file before you can create a build-file'
        buttons:
          "OK": -> return

    else
      successMsg = null
      currentPath = path.dirname(currentFile)
     
      fs.exists "#{currentPath}/.atom-build.json", (exists) ->
        if exists is true
          atom.confirm
                  message: 'File exists'
                  detailedMessage: 'Do you really want to overwrite your existing build file?'
                  buttons:
                    "Overwrite": ->
                      successMsg = "Overwriting existing build file"
                      createFile = true
                    "Abort": ->
                      return
        else
          successMsg = "Saving #{currentPath}/.atom-build.json"
          createFile = true

        if createFile is true
          fs.writeFile currentPath + "/.atom-build.json", JSON.stringify(buildFile, null, 4), (error) ->
            atom.notifications.addError("config-nsis", detail: error, dismissable: false) if error

      # Open file
      @workspace.open(currentPath + "/.atom-build.json")
