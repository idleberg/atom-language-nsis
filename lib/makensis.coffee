module.exports = Makensis =
  compile: (strictMode, consolePanel) ->
    { spawn } = require "child_process"
    { clearConsole, detectOutfile, getPath, getPrefix, isWindowsCompatible, notifyOnSuccess, notifyOnWarning } = require "./util"

    editor = atom.workspace.getActiveTextEditor()
    return atom.notifications.addWarning("**language-nsis**: No active editor", dismissable: false) unless editor?

    script = editor.getPath()
    scope  = editor.getGrammar().scopeName

    if script? and scope.startsWith "source.nsis"
      editor.save().then ->
        getPath (pathToMakensis) ->
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
            if line.indexOf("warning: ") isnt -1
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
    { clearConsole, getPath, getPrefix } = require "./util"

    getPath (pathToMakensis) ->
      clearConsole(consolePanel)

      prefix = getPrefix()
      version = spawn pathToMakensis, ["#{prefix}VERSION"]
      version.stdout.on "data", ( version ) ->

        if atom.config.get("language-nsis.compilerOutput") is "Console"
          try
            consolePanel.log("makensis #{version} (#{pathToMakensis})")
          catch
            console.info "makensis #{version} (#{pathToMakensis})"
            atom.getCurrentWindow().openDevTools()
        else
          atom.notifications.addInfo("**language-nsis**", detail: "makensis #{version} (#{pathToMakensis})", dismissable: true)

  showCompilerFlags: (consolePanel) ->
    { spawn } = require "child_process"
    { clearConsole, getPath, getPrefix } = require "./util"

    getPath (pathToMakensis) ->
      clearConsole(consolePanel)

      prefix = getPrefix()
      flags = spawn pathToMakensis, ["#{prefix}HDRINFO"]
      flags.stdout.on "data", ( data ) ->

        data = String(data)
        string = data.slice(0, data.indexOf("Defined symbols:")).trim()

        flags.raw = data.split("Defined symbols: ")[1]
        flags.array = flags.raw.split(",")
        flags.string = "#{string}\n\nDefined symbols:"
        flags.json = JSON.stringify(flags.array, null, 4)


        if atom.config.get("language-nsis.compilerOutput") is "Console"
          try
            consolePanel.raw("#{flags.string} #{flags.json}")
          catch
            console.info flags.string, flags.array
            atom.getCurrentWindow().openDevTools()
        else
          atom.notifications.addInfo("**language-nsis**", detail: "#{flags.string} #{flags.json}", dismissable: true)
