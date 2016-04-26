module.exports = NsisBuild =
  which: null
  prefix: null

  buildScript: ->
    {exec} = require 'child_process'

    editor = atom.workspace.getActiveTextEditor()
    script = editor.getPath()

    if script?
      editor.save()
      makensis = @getMakensisPath()

      # Output makensis version
      exec "\"#{makensis}\" #{@prefix}VERSION", (error, stdout, stderr) ->
        if error is null
          console.log "makensis #{stdout}"

      # custom makensis arguments (http://nsis.sourceforge.net/Docs/Chapter3.html#usagereference)
      args = atom.config.get('language-nsis.compilerArgs') || "#{@prefix}V2";

      # Compile script
      exec "\"#{makensis}\" #{args} \"#{script}\"", (error, stdout, stderr) ->
        if error isnt null
          atom.notifications.addError(script, detail: stdout, dismissable: true)
        else
          atom.notifications.addSuccess("Compiled successfully", detail: stdout, dismissable: false)

    else
      # Something went wrong
      atom.beep()

  getMakensisPath: ->
    {exec} = require 'child_process'

    @setPlatformSpecs()

    pathToMakensis = atom.config.get('language-nsis.pathToMakensis')

    if pathToMakensis?
      return pathToMakensis

     exec "#{@which} makensis", (error, stdout, stderr) ->
       if error isnt null
         atom.notifications.addError("language-nsis", detail: "makensis is not in your PATH environmental variable", dismissable: false)
         return false
       else
         pathToMakensis = stdout.trim()
         atom.config.set('language-nsis.pathToMakensis', pathToMakensis)
         return pathToMakensis

  setPlatformSpecs: ->
    os = require 'os'

    if os.platform() is 'win32'
     @which = "where"
     @prefix = "/"
    else
     @which = "which"
     @prefix = "-"
