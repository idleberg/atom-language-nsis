module.exports = NsisConf =
  runner: null
    
################################################################################
# atom-runner
# https://github.com/lsegal/atom-runner
# 
  setRunner: ->
    @checkRunner()

    if (typeof @runner.path != 'undefined') and (@runner.active == true)
      atom.confirm
        message: 'Set default runner for NSIS'
        detailedMessage: 'To compile NSIS scripts inside Atom, you need to define a runner. Do you want to use makensis as default runner?'
        buttons:
          "Use makensis": ->
            atom.notifications.addSuccess("**language-nsis**: Set `runner.scopes.nsis` to 'makensis -'", dismissable: false)
            atom.config.set('runner.scopes.nsis','makensis -')
          "Cancel": ->
            atom.notifications.addWarning("**language-nsis**: Cancelled setting default runner", dismissable: false)
            return
    else
      @missingRunner()

  removeRunner: ->
    @checkRunner()

    if (typeof @runner.path != 'undefined') and (@runner.active == true)
      atom.notifications.addSuccess("**language-nsis**: Unset `runner.scopes.nsis`", dismissable: false)
      atom.config.unset('runner.scopes.nsis')
    else
      @missingRunner()

  missingRunner: ->
    atom.notifications.addWarning("**language-nsis**: [atom-runner](https://atom.io/packages/atom-runner) is not installed", dismissable: false)

  checkRunner: ->
    @runner =
        path: atom.packages.resolvePackagePath('atom-runner')
        active: atom.packages.isPackageLoaded('atom-runner')


################################################################################
# atom-build
# https://github.com/mirhec/atom-build
# 
  createBuildFile: ->
    fs = require 'fs'
    path = require 'path'

    buildFile =
        name: 'makensis',
        cmd: "makensis",
        args: [ "{FILE_ACTIVE}" ],
        sh: false,
        cwd: "{FILE_ACTIVE_PATH}"
    createFile = false
    currentFile = atom.workspace.getActivePaneItem().getPath()

    if typeof currentFile is "undefined"
      atom.confirm
        message: 'File not saved'
        detailedMessage: 'You need to save this file before you can create a build-file'
        buttons:
          "OK": -> return

    else
      successMsg = null
      currentPath = path.dirname(currentFile)
      buildFilePath = path.join(currentPath, ".atom-build.json")
     
      fs.exists "#{buildFilePath}", (exists) ->
        if exists is true
          atom.confirm
            message: 'File exists'
            detailedMessage: 'Do you really want to overwrite your existing build file?'
            buttons:
              "Overwrite": ->
                successMsg = "Overwriting existing file"
                createFile = true
              "Abort": ->
                return
        else
          successMsg = "Saving file"
          createFile = true

        if createFile is true
          console.log buildFile
          console.log buildFilePath
          # Save build file
          fs.writeFile buildFilePath, JSON.stringify(buildFile, null, 4), (error) ->
            if error
              atom.notifications.addError(".atom-build.json", detail: error, dismissable: false)
            else
              atom.notifications.addInfo(".atom-build.json", detail: successMsg, dismissable: false)
              atom.workspace.open(buildFilePath)
