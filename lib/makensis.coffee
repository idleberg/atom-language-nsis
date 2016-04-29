{exec} = require 'child_process'

module.exports = NsisBuild =
  which: null
  prefix: null

  buildScript: ->
    editor = atom.workspace.getActiveTextEditor()
    script = editor.getPath()
    scope  = editor.getGrammar().scopeName

    if script? and scope.startsWith 'source.nsis'
      editor.save()

      @getPath (stdout) ->
        args      = atom.config.get('language-nsis.compilerArguments')
        makensis  = atom.config.get('language-nsis.pathToMakensis')

        exec "\"#{makensis}\" #{args} \"#{script}\"", (error, stdout, stderr) ->
          if error isnt null
            # makensis error from stdout, not error!
            atom.notifications.addError(script, detail: stdout, dismissable: true)
          else
            atom.notifications.addSuccess("Compiled successfully", detail: stdout, dismissable: false)
    else
      # Something went wrong
      atom.beep()

  getPath: (callback) ->
    @getPlatform()

    # If undefined, set default arguments
    if not atom.config.get('language-nsis.compilerArguments')?
      atom.config.set('language-nsis.compilerArguments', "#{@prefix}V2")

    # If stored, return pathToMakensis
    pathToMakensis = atom.config.get('language-nsis.pathToMakensis')
    if pathToMakensis?
      callback pathToMakensis
      return

    # Find makensis
    exec "\"#{@which}\" makensis", (error, stdout, stderr) ->
      if error isnt null
        atom.notifications.addError("**language-nsis**: makensis is not in your `PATH` [environmental variable](http://superuser.com/a/284351/195953)", dismissable: false)
      else
        atom.config.set('language-nsis.pathToMakensis', stdout.trim())
        callback stdout
      return

  getPlatform: ->
    os = require 'os'

    if os.platform() is 'win32'
      @which  = "where"
      @prefix = "/"
    else
      @which  = "which"
      @prefix = "-"
