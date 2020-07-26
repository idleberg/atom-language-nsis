{ readManifestSync } = require("atom-read-manifest")
meta = readManifestSync()

module.exports = Util =
  clearConsole: (consolePanel) ->
    try
      consolePanel.clear()
    catch
      console.clear() if Util.getConfig("clearConsole")

  detectOutfile: (line) ->
    if line.indexOf("Output: \"") isnt -1
      regex = /Output: \"(.*\.exe)\"\r?\n/g
      result = regex.exec(line.toString())

      return result[1]

    return ""

  getConfig: (key = "") ->
    if key?
      return atom.config.get("#{meta.name}.#{key}")

    return atom.config.get("#{meta.name}")

  getMakensisPath: (callback) ->
    { spawn } = require "child_process"

    # If stored, return pathToMakensis
    pathToMakensis = Util.getConfig("pathToMakensis")
    if pathToMakensis.length > 0 and pathToMakensis isnt "makensis"
      return callback(pathToMakensis)

    # Find makensis
    which = spawn Util.which(), ["makensis"]

    which.stdout.on "data", ( data ) ->
      path = data.toString().trim()
      atom.config.set("#{meta.name}.pathToMakensis", path)
      return callback(path)

    which.on "close", ( errorCode ) ->
      if errorCode > 0
        atom.notifications.addError("**#{meta.name}**: makensis is not in your `PATH` [environmental variable](http://superuser.com/a/284351/195953)", dismissable: true)

  getPrefix: ->
    { platform } = require "os"

    if platform() is "win32"
      return "/"

    return "-"

  isWindowsCompatible: ->
    { platform } = require "os"

    if platform() is "win32" or Util.getConfig("useWineToRun") is true
      return true

    return false

  logCompilerFlags: (output, showFlagsAsObject, consolePanel) ->
    if showFlagsAsObject is true
      stdOut = JSON.stringify output.stdout, null, 2
    else
      stdOut = output.stdout

    if Util.getConfig("compilerOutput").toLowerCase() is "console"
      try
        consolePanel.raw(stdOut)
      catch
        console.info stdOut
        atom.getCurrentWindow().openDevTools()
    else
      atom.notifications.addInfo("**#{meta.name}**", detail: stdOut, dismissable: true)

  notifyOnCompletion: (type, openButton, outFile) ->
    buttons = []
    dismissable = false

    if outFile
      if openButton is "Run"
        dismissable = true

        openButton =
          text: openButton
          className: "icon icon-playback-play"
          onDidClick: ->
            notification.dismiss()
            Util.runInstaller outFile

        buttons.push openButton

      revealButton =
        text: "Reveal"
        className: "icon icon-location"

        onDidClick: ->
          notification.dismiss()
          Util.revealInstaller outFile

      cancelButton =
          text: "Cancel"

          onDidClick: ->
            notification.dismiss()

      buttons.push revealButton
      buttons.push cancelButton

    if type is "warning"
      notification = atom.notifications.addWarning(
        "Compiled with warnings",
        dismissable: dismissable,
        buttons: buttons
      )
    else
      notification = atom.notifications.addSuccess(
        "Compiled successfully",
        dismissable: dismissable,
        buttons: buttons
      )

  openSettings: ->
    options =
      pending: true
      searchAllPanes: true

    atom.workspace.open("atom://config/packages/#{meta.name}", options)

  openURL: (cmd) ->
    opn = require "open"
    opn "https://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Reference/#{cmd}.html?utm_source=atom&utm_content=reference", { url: true }

  revealInstaller: (outFile) ->
    { access, existsSync, F_OK } = require "fs"
    { shell } = require "electron"

    access outFile, F_OK, (error) ->
      return console.log error if error or outFile is ""

      shell.showItemInFolder(outFile)

  runInstaller: (outFile) ->
    { exec, spawn } = require "child_process"
    { platform } = require "os"

    if platform() is "win32"
      try
        exec "cmd /c \"#{outFile}\""
      catch error
        atom.notifications.addWarning("**#{meta.name}**", detail: error, dismissable: true)

    else if Util.getConfig("useWineToRun") is true
      try
        spawn "wine", [ outFile ]
      catch error
        atom.notifications.addWarning("**#{meta.name}**", detail: error, dismissable: true)

  which: ->
    { platform } = require "os"

    if platform() is "win32"
      return "where"

    return "which"