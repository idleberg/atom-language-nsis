NLF = require "@nsis/nlf"

module.exports = NSISLanguageFile =
  convert: ->
    editor = atom.workspace.getActiveTextEditor()
    return atom.beep() unless editor?

    if editor.getGrammar().scopeName is "source.nlf"
      @convertNLF editor
    else if editor.getGrammar().scopeName is "source.json"
      @convertJSON editor
    else
      atom.beep()

  convertNLF: (editor) ->
    try
      input = editor.getText()
      output = NLF.parse(input, { stringify: true })
    catch e
      console.error e
      return atom.notifications.addError("Conversion Failed", detail: e, dismissable: true)

    @openNewFile(editor, output, "json")

  convertJSON: (editor) ->
    try
      input = editor.getText()
      output = NLF.stringify(input)
    catch e
      console.error e
      return atom.notifications.addError("Conversion Failed", detail: e, dismissable: true)

    @openNewFile(editor, output, "nlf")

  openNewFile: (editor, input, targetExt) ->
    { basename, extname } = require "path"

    fileName = editor.getFileName().toString()
    newFileName = basename(fileName, extname(fileName))

    atom.workspace.open("#{newFileName}.#{targetExt}", { pending: true })
      .then (newTab) ->
        newTab.setText(input)

      .catch (error) ->
        atom.notifications.addError(error, dismissable: true)
