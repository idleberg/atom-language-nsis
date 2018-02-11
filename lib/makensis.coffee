module.exports = Makensis =
  compile: (strictMode, consolePanel) ->
    { spawn } = require "child_process"
    { clearConsole, detectOutfile, getConfig, getMakensisPath, getPrefix, isWindowsCompatible, notifyOnSuccess, notifyOnWarning } = require "./util"

    if strictMode is true
      require("./ga").sendEvent "makensis", "Save & Compile (strict)"
    else
      require("./ga").sendEvent "makensis", "Save & Compile"

    editor = atom.workspace.getActiveTextEditor()
    return atom.notifications.addWarning("**language-nsis**: No active editor", dismissable: false) unless editor?

    script = editor.getPath()
    scope  = editor.getGrammar().scopeName

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
                console.warn(line.toString())
            else
              try
                consolePanel.log(line.toString()) if getConfig("alwaysShowOutput")
              catch
                console.log(line.toString())

            if outFile is ""
              outFile = detectOutfile(line)

          makensis.stderr.on "data", (line) ->
            try
              consolePanel.error(line.toString())
            catch
              console.error(line.toString())

          makensis.on "close", ( errorCode ) ->
            openButton = if isWindowsCompatible() is true then "Run" else ""
            if errorCode is 0
              if hasWarning is true
                return notifyOnWarning(openButton, outFile) if getConfig("showBuildNotifications")
              else
                return notifyOnSuccess(openButton, outFile) if getConfig("showBuildNotifications")

            return atom.notifications.addError("Compile Error", dismissable: false) if getConfig("showBuildNotifications")
    else
      # Something went wrong
      atom.beep()

  showVersion: (consolePanel) ->
    { spawn } = require "child_process"
    { clearConsole, getConfig, getMakensisPath, getPrefix } = require "./util"
    { version } = require "makensis"

    require("./ga").sendEvent "makensis", "Show Version"

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

    showFlagsAsObject = getConfig("showFlagsAsObject")
    flagFormat = " (JSON)" if showFlagsAsObject

    require("./ga").sendEvent "makensis", "Show Compiler Flags#{flagFormat}"

    getMakensisPath (pathToMakensis) ->
      clearConsole(consolePanel)

      hdrInfo({pathToMakensis: pathToMakensis, json: showFlagsAsObject}).then((output) ->
        return logCompilerFlags(output, showFlagsAsObject, consolePanel)
      ).catch (output) ->
        # fallback for legacy NSIS
        return logCompilerFlags(output, showFlagsAsObject, consolePanel)
