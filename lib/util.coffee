module.exports = Util =
  clearConsole: (consolePanel) ->
    try
      consolePanel.clear()
    catch
      console.clear() if atom.config.get("language-nsis.clearConsole")

  detectOutfile: (line) ->
    { existsSync } = require "fs"

    if line.indexOf('Output: "') isnt -1
      regex = /Output: \"(.*\.exe)\"\r?\n/g
      result = regex.exec(line.toString())
      doesExist = existsSync result[1]
      if doesExist is true
        return result[1]

    return ""

  getPath: (callback) ->
    { spawn } = require "child_process"

    # If stored, return pathToMakensis
    pathToMakensis = atom.config.get("language-nsis.pathToMakensis")
    if pathToMakensis.length > 0 and pathToMakensis isnt "makensis"
      return callback(pathToMakensis)

    # Find makensis
    which = spawn Util.which(), ["makensis"]

    which.stdout.on "data", ( data ) ->
      path = data.toString().trim()
      atom.config.set("language-nsis.pathToMakensis", path)
      return callback(path)

    which.on "close", ( errorCode ) ->
      if errorCode > 0
        atom.notifications.addError("**language-nsis**: makensis is not in your `PATH` [environmental variable](http://superuser.com/a/284351/195953)", dismissable: true)

  getPrefix: ->
    { platform } = require "os"

    if platform() is "win32"
      return "/"

    return "-"

  isWindowsCompatible: ->
    { platform } = require "os"

    if platform() is "win32" or atom.config.get("language-nsis.useWineToRun") is true
      return true

    return false

  notifyOnSuccess: (openButton, outFile) ->
    if openButton is "Run"
      buttons = [
        {
          text: openButton
          onDidClick: ->
            notification.dismiss()
            Util.runInstaller outFile

        }
        {
          text: "Cancel"
          onDidClick: ->
            notification.dismiss()
        }
      ]
      dismissable = true
    else
      dismissable = false
      buttons = null

    notification = atom.notifications.addSuccess(
      "Compiled successfully",
      dismissable: dismissable,
      buttons: buttons
    )

  notifyOnWarning: (openButton, outFile) ->
    if openButton is "Run"
      buttons = [
        {
          text: openButton
          onDidClick: ->
            notification.dismiss()
            Util.runInstaller(outFile)

        }
        {
          text: "Cancel"
          onDidClick: ->
            notification.dismiss()
        }
      ]
      dismissable = true
    else
      buttons = null
      dismissable = false

    notification = atom.notifications.addWarning(
      "Compiled with warnings",
      dismissable: dismissable,
      buttons: buttons
    )

  openSettings: ->
    require("./ga").sendEvent "util", "Open Settings"

    options =
      pending: true
      searchAllPanes: true

    atom.workspace.open("atom://config/packages/language-nsis", options)

  runInstaller: (outFile) ->
    { spawn } = require "child_process"
    { platform } = require "os"

    require("./ga").sendEvent "util", "Run Installer"

    if platform() is "win32"
      try
        spawn outFile
      catch error
        atom.notifications.addWarning("**language-nsis**", detail: error, dismissable: true)

    else if atom.config.get("language-nsis.useWineToRun") is true
      try
        spawn "wine", [ outFile ]
      catch error
        atom.notifications.addWarning("**language-nsis**", detail: error, dismissable: true)

  satisfyDependencies: (autoRun = false) ->
    meta = require "../package.json"

    if autoRun is true
      require("./ga").sendEvent "util", "Satisfy Dependencies (auto)"
    else
      require("./ga").sendEvent "util", "Satisfy Dependencies (manual)"

    require("atom-package-deps").install(meta.name, true)

    for k, v of meta["package-deps"]
      if atom.packages.isPackageDisabled(v)
        console.log "Enabling package '#{v}'" if atom.inDevMode()
        atom.packages.enablePackage(v)

  which: ->
    { platform } = require "os"

    if platform() is "win32"
      return "where"

    return "which"
