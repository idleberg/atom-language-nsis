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
      output = NLF.parse input
    catch e
      return atom.notifications.addError("Conversion Failed", detail: e, dismissable: true)

    input = editor.getText()
    output = NLF.parse input

    editor.setText JSON.stringify output, null, 2
    editor.setGrammar(atom.grammars.grammarForScopeName('source.json'))

  convertJSON: (editor) ->
    try
      input = editor.getText()
      output = NLF.stringify input
    catch e
      return atom.notifications.addError("Conversion Failed", detail: e, dismissable: true)

    editor.setText output
    editor.setGrammar(atom.grammars.grammarForScopeName('source.nlf'))
