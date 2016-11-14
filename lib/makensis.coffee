{exec} = require 'child_process'
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

        exec "\"#{pathToMakensis.trim()}\" #{compilerArguments} \"#{script}\"", (error, stdout, stderr) ->
          if error isnt null
            # makensis error from stdout, not error!
            atom.notifications.addError("Compile Error", detail: stdout, dismissable: true)
          else
            if stdout.indexOf("warning: ") isnt -1
              atom.notifications.addWarning("Compiled successfully", detail: stdout, dismissable: false)
            else
              atom.notifications.addSuccess("Compiled successfully", detail: stdout, dismissable: false)
    else
      # Something went wrong
      atom.beep()

  getPath: (callback) ->
    # If stored, return pathToMakensis
    pathToMakensis = atom.config.get('language-nsis.pathToMakensis')
    if pathToMakensis is not "makensis"
      callback pathToMakensis
      return

    # Find makensis
    exec "\"#{which}\" makensis", (error, stdout, stderr) ->
      if error isnt null
        atom.notifications.addError("**language-nsis**: makensis is not in your `PATH` [environmental variable](http://superuser.com/a/284351/195953)", dismissable: false)
      else
        atom.config.set('language-nsis.pathToMakensis', stdout.trim())
        callback stdout
      return

  showVersion: ->
    pathToMakensis = atom.config.get('language-nsis.pathToMakensis') ? 'makensis'

    exec "\"#{pathToMakensis}\" #{prefix}VERSION", (error, stdout, stderr) ->
      if error is null
        atom.notifications.addInfo("**language-nsis**", detail: "makensis #{stdout} (#{pathToMakensis})", dismissable: true)
