{exec, spawn} = require 'child_process'
os = require 'os'

if os.platform() is 'win32'
  which  = "where"
  prefix = "/"
else
  which  = "which"
  prefix = "-"

module.exports = NsisBuild =

  buildScript: (strictMode) ->
    editor = atom.workspace.getActiveTextEditor()

    unless editor?
      atom.notifications.addWarning("**language-nsis**: No active editor", dismissable: false)
      return

    script = editor.getPath()
    scope  = editor.getGrammar().scopeName

    if script? and scope.startsWith 'source.nsis'
      editor.save() if editor.isModified()

      @getPath (pathToMakensis) ->
        compilerArguments = atom.config.get('language-nsis.compilerArguments')

        # only add WX flag if not already specified
        if strictMode is true and compilerArguments.indexOf("#{prefix}WX") is -1
          compilerArguments = "#{compilerArguments} #{prefix}WX"

        exec "\"#{pathToMakensis}\" #{compilerArguments} \"#{script}\"", (error, stdout, stderr) ->
          if error isnt null
            detail = unless stdout then error else stdout
            atom.notifications.addError("Compile Error", detail: detail, dismissable: true)
          else
            if stdout.indexOf("warning: ") isnt -1
              atom.notifications.addWarning("Compiled with warnings", detail: stdout, dismissable: true)
            else
              atom.notifications.addSuccess("Compiled successfully", detail: stdout, dismissable: false)
    else
      # Something went wrong
      atom.beep()

  getPath: (callback) ->
    # If stored, return pathToMakensis
    pathToMakensis = atom.config.get('language-nsis.pathToMakensis')
    if pathToMakensis.length > 0 and pathToMakensis isnt "makensis"
      return callback(pathToMakensis)

    # Find makensis
    which = spawn which, ["makensis"]

    which.stdout.on 'data', ( data ) ->
      path = data.toString().trim()
      atom.config.set('language-nsis.pathToMakensis', path)
      return callback(path)

    which.on 'close', ( errorCode ) ->
      if errorCode > 0
        atom.notifications.addError("**language-nsis**: makensis is not in your `PATH` [environmental variable](http://superuser.com/a/284351/195953)", dismissable: true)

  showVersion: ->
    pathToMakensis = atom.config.get('language-nsis.pathToMakensis') ? 'makensis'

    version = spawn pathToMakensis, ["#{prefix}VERSION"]
    version.stdout.on 'data', ( data ) ->
      atom.notifications.addInfo("**language-nsis**", detail: "makensis #{data} (#{pathToMakensis})", dismissable: true)
