module.exports = Makensis =
  compile: (strictMode, consolePanel) ->
    { spawn } = require "child_process"
    { clearConsole, detectOutfile, getConfig, getMakensisPath, getPrefix, isWindowsCompatible, notifyOnCompletion } = require "./util"
    ga = require "./ga"

    if strictMode is true
      ga.sendEvent "makensis", "Save & Compile (strict)"
    else
      ga.sendEvent "makensis", "Save & Compile"

    editor = atom.workspace.getActiveTextEditor()
    return atom.notifications.addWarning("**language-nsis**: No active editor", dismissable: false) unless editor?

    script = editor.getPath()
    scope  = editor.getGrammar().scopeName

    if getConfig("allowHeaderCompilation") is false and !script.endsWith "nsi"
      notification = atom.notifications.addWarning(
        "Compiling header files is blocked by default. You can allow it in the package settings.",
        dismissable: true,
        buttons: [
          {
            text: "Open Settings"
            className: "icon icon-gear"
            onDidClick: ->
              require("./ga").sendEvent "util", "Open Settings"
              atom.workspace.open("atom://config/packages/language-nsis", {pending: true, searchAllPanes: true})
              notification.dismiss()
          }
          {
            text: "Cancel",
            onDidClick: ->
              notification.dismiss()
          }
        ]
      )

      return atom.beep()

    if script? and scope.startsWith "source.nsis"
      editor.save().then ->
        getMakensisPath (pathToMakensis) ->
          prefix = getPrefix()
          compilerArguments = getConfig("compilerArguments")?.trim().split(" ")

          # only add WX flag if not already specified
          if strictMode is true and compilerArguments.indexOf("#{prefix}WX") is -1
            compilerArguments.push "#{prefix}WX"
          compilerArguments.push script

          clearConsole(consolePanel)

          # Let's go
          makensis = spawn pathToMakensis, compilerArguments
          hasWarning = false
          outFile = ""

          makensis.stdout.on "data", (line) ->
            if hasWarning is false and line.indexOf("warning: ") isnt -1
              hasWarning = true

              try
                consolePanel.warn(line.toString()) if getConfig("alwaysShowOutput")
              catch
                console.warn line.toString()
            else
              try
                consolePanel.log(line.toString()) if getConfig("alwaysShowOutput")
              catch
                console.log line.toString()

            if outFile is ""
              outFile = detectOutfile line

          makensis.stderr.on "data", (line) ->
            try
              consolePanel.error line.toString()
            catch
              console.error line.toString()

          makensis.on "close", ( errorCode ) ->
            if errorCode is 0
              openButton = if isWindowsCompatible() is true then "Run" else ""

              if hasWarning is true
                return notifyOnCompletion("warning", openButton, outFile) if getConfig("showBuildNotifications")

              return notifyOnCompletion("success", openButton, outFile) if getConfig("showBuildNotifications")

            return atom.notifications.addError("Compile Error", dismissable: false) if getConfig("showBuildNotifications")
    else
      # Something went wrong
      atom.beep()

  showVersion: (consolePanel) ->
    { spawn } = require "child_process"
    { clearConsole, getConfig, getMakensisPath, getPrefix } = require "./util"
    { version } = require "makensis"
    ga = require "./ga"

    ga.sendEvent "makensis", "Show Version"

    getMakensisPath (pathToMakensis) ->
      clearConsole(consolePanel)

      version({pathToMakensis: pathToMakensis}).then((output) ->
        if getConfig("compilerOutput") is "Console"
          try
            consolePanel.log("makensis #{output.stdout} (#{pathToMakensis})")
          catch
            console.info "makensis #{output.stdout} (#{pathToMakensis})"
            atom.getCurrentWindow().openDevTools()
        else
          atom.notifications.addInfo("**language-nsis**", detail: "makensis #{output.stdout} (#{pathToMakensis})", dismissable: true)

        return
      ).catch (output) ->
        return console.error output

  showCompilerFlags: (consolePanel) ->
    { spawn } = require "child_process"
    { clearConsole, getConfig, getMakensisPath, getPrefix, logCompilerFlags } = require "./util"
    { hdrInfo } = require "makensis"
    ga = require "./ga"

    showFlagsAsObject = getConfig("showFlagsAsObject")
    flagFormat = " (JSON)" if showFlagsAsObject

    ga.sendEvent "makensis", "Show Compiler Flags#{flagFormat}"

    getMakensisPath (pathToMakensis) ->
      clearConsole(consolePanel)

      hdrInfo({pathToMakensis: pathToMakensis, json: showFlagsAsObject}).then((output) ->
        return logCompilerFlags(output, showFlagsAsObject, consolePanel)
      ).catch (output) ->
        # fallback for legacy NSIS
        return logCompilerFlags(output, showFlagsAsObject, consolePanel)

  showHelp: (selectListView) ->
    { spawn } = require "child_process"
    { clearConsole, getConfig, getMakensisPath, getPrefix, logCompilerFlags } = require "./util"
    { cmdHelp } = require "makensis"
    ga = require "./ga"

    ga.sendEvent "makensis", "Command Reference"

    getMakensisPath (pathToMakensis) ->
      cmdHelp('', {pathToMakensis: pathToMakensis, json: true}).then((output) ->
        selectListView.update({items: Object.keys output.stdout})
      ).catch (output) ->
        # fallback for legacy NSIS
        selectListView.update({items: Object.keys output.stdout})
