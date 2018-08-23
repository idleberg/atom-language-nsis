NLF = require "@nsis/nlf"

counter = 0

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
      output = NLF.parse(input, true)
    catch e
      console.error e
      return atom.notifications.addError("Conversion Failed", detail: e, dismissable: true)

    @createNewTab(editor, output, "source.json")

  convertJSON: (editor) ->
    try
      input = editor.getText()
      output = NLF.stringify(input)
    catch e
      console.error e
      return atom.notifications.addError("Conversion Failed", detail: e, dismissable: true)

    @createNewTab(editor, output, "source.nlf")

  createNewTab: (editor, input, targetExt) ->
    atom.workspace.open(null, { pending: true })
      .then (newTab) ->
        newTab.setGrammar(atom.grammars.grammarForScopeName(targetExt))
        newTab.insertText(input)

      .catch (error) ->
        atom.notifications.addError(error, dismissable: true)
