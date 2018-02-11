# build - https://atom.io/packages/build
module.exports = Build =
  createFile: (wine) ->
    fs = require "fs"
    path = require "path"
    { getConfig } = require "./util"

    editor = atom.workspace.getActiveTextEditor()

    unless editor?
      atom.notifications.addWarning("**language-nsis**: No active editor", dismissable: false)
      return

    if editor.getGrammar().scopeName isnt "source.nsis"
      atom.beep()
      return

    createFile = false
    currentPath = atom.workspace.getActivePaneItem().getPath()
    currentFile = path.basename(currentPath)

    if typeof currentPath is "undefined"
      atom.confirm
        message: "File not saved"
        detailedMessage: "You need to save this file before you can create a build-file"
        buttons:
          "OK": -> return

    else
      successMsg = null
      currentPath = path.dirname(currentPath)
      buildFileSyntax = getConfig("buildFileSyntax")

      if wine is true
        require("./ga").sendEvent "build", "Create .atom Build File for Wine (#{buildFileSyntax})"
      else
        require("./ga").sendEvent "build", "Create .atom Build File (#{buildFileSyntax})"

      if buildFileSyntax is "CSON"
        buildFileBase = ".atom-build.cson"
      else if buildFileSyntax is "YAML"
        buildFileBase = ".atom-build.yml"
      else
        buildFileBase = ".atom-build.json"

      buildFilePath = path.join(currentPath, buildFileBase)

      fs.access "#{buildFilePath}", fs.constants.R_OK, (error) ->
        if error is null
          atom.confirm
            message: "File exists"
            detailedMessage: "Do you really want to overwrite your existing build file?"
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
          if wine isnt true
            makeNsis ="makensis"
            sh = false
          else
            pathToScript = atom.config.get("build-makensis-wine.pathToScript")
            packageDir = atom.packages.getPackageDirPaths().toString()
            makeNsis = if pathToScript then "\"#{pathToScript}\"" else path.join(packageDir, "build-makensis-wine", "lib", "makensis-wine.sh")
            sh = true

          buildFile =
            name: "#{currentFile}",
            cmd: makeNsis,
            args: [ "{FILE_ACTIVE}" ],
            sh: sh,
            cwd: "{FILE_ACTIVE_PATH}",
            errorMatch: "(\\r?\\n)(?<message>.+)(\\r?\\n)Error in script \"(?<file>[^\"]+)\" on line (?<line>\\d+) -- aborting creation process",
            warningMatch: "[^!]warning: (?<message>.*) \\((?<file>(\\w{1}:)?[^:]+):(?<line>\\d+)\\)"

          if buildFileSyntax is "CSON"
            CSON = require "cson"
            stringify = CSON.stringify(buildFile, null, 2)
          if buildFileSyntax is "YAML"
            YAML = require "yaml-js"
            stringify = YAML.dump(buildFile)
          else
            stringify = JSON.stringify(buildFile, null, 2)

          # Save build file
          fs.writeFile buildFilePath, stringify, (error) ->
            if error
              atom.notifications.addError(buildFileBase, detail: error, dismissable: false)
            else
              atom.notifications.addInfo(buildFileBase, detail: successMsg, dismissable: false)
              atom.workspace.open(buildFilePath)
