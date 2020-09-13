/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let NSISLanguageFile;
const NLF = require("@nsis/nlf");

module.exports = (NSISLanguageFile = {
  convert() {
    const editor = atom.workspace.getActiveTextEditor();
    if (editor == null) { return atom.beep(); }

    if (editor.getGrammar().scopeName === "source.nlf") {
      return this.convertNLF(editor);
    } else if (editor.getGrammar().scopeName === "source.json") {
      return this.convertJSON(editor);
    } else {
      return atom.beep();
    }
  },

  convertNLF(editor) {
    let output;
    try {
      const input = editor.getText();
      output = NLF.parse(input, { stringify: true });
    } catch (e) {
      console.error(e);
      return atom.notifications.addError("Conversion Failed", {detail: e, dismissable: true});
    }

    return this.openNewFile(editor, output, "json");
  },

  convertJSON(editor) {
    let output;
    try {
      const input = editor.getText();
      output = NLF.stringify(input);
    } catch (e) {
      console.error(e);
      return atom.notifications.addError("Conversion Failed", {detail: e, dismissable: true});
    }

    return this.openNewFile(editor, output, "nlf");
  },

  openNewFile(editor, input, targetExt) {
    const { basename, extname } = require("path");

    const fileName = editor.getFileName().toString();
    const newFileName = basename(fileName, extname(fileName));

    return atom.workspace.open(`${newFileName}.${targetExt}`, { pending: true })
      .then(newTab => newTab.setText(input)).catch(error => atom.notifications.addError(error, {dismissable: true}));
  }
});
