module.exports = Makensis =
  compile: (strictMode, consolePanel) ->
    { spawn } = require "child_process"
    { clearConsole, detectOutfile, getMakensisPath, getPrefix, isWindowsCompatible, notifyOnSuccess, notifyOnWarning } = require "./util"

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
          compilerArguments = atom.config.get("language-nsis.compilerArguments")?.trim().split(" ")

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
                consolePanel.warn(line.toString()) if atom.config.get("language-nsis.alwaysShowOutput")
              catch
                console.warn(line.toString())
            else
              try
                consolePanel.log(line.toString()) if atom.config.get("language-nsis.alwaysShowOutput")
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
                return notifyOnWarning(openButton, outFile) if atom.config.get("language-nsis.showBuildNotifications")
              else
                return notifyOnSuccess(openButton, outFile) if atom.config.get("language-nsis.showBuildNotifications")

            return atom.notifications.addError("Compile Error", dismissable: false) if atom.config.get("language-nsis.showBuildNotifications")
    else
      # Something went wrong
      atom.beep()

  showVersion: (consolePanel) ->
    { spawn } = require "child_process"
    { clearConsole, getMakensisPath, getPrefix } = require "./util"
    { version } = require "makensis"

    require("./ga").sendEvent "makensis", "Show Version"

    getMakensisPath (pathToMakensis) ->
      clearConsole(consolePanel)

      version({pathToMakensis: pathToMakensis}).then((output) ->
        if atom.config.get("language-nsis.compilerOutput") is "Console"
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
    { clearConsole, getMakensisPath, getPrefix, logCompilerFlags } = require "./util"
    { hdrInfo } = require "makensis"

    require("./ga").sendEvent "makensis", "Show Compiler Flags"

    getMakensisPath (pathToMakensis) ->
      clearConsole(consolePanel)

      hdrInfo({pathToMakensis: pathToMakensis, json: true}).then((output) ->
        return logCompilerFlags(output, consolePanel)
      ).catch (output) ->
        # fallback for legacy NSIS
        return logCompilerFlags(output, consolePanel)
