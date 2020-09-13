/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Lookup;
const SelectListView = require("atom-select-list");

module.exports = (Lookup = {
  init() {
    this.selectListView = new SelectListView({
      emptyMessage: "No command matches your search.",
      items: [],

      filterKeyForItem(item) { return item; },

      elementForItem(item) {
        const element = document.createElement("li");
        const html = item;
        element.innerHTML = html;
        return element;
      },

      didConfirmSelection: item => {
        const { openURL } = require("./util");

        this.cancel();
        return openURL(item);
      },

      didCancelSelection: () => {
        return this.cancel();
      }
    });

    return this.selectListView.element.classList.add("nsis-command-list");
  },

  dispose() {
    this.cancel();
    return this.selectListView.destroy();
  },

  cancel() {
    if (this.panel != null) {
      this.panel.destroy();
    }

    this.panel = null;

    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
      return this.previouslyFocusedElement = null;
    }
  },

  attach() {
    this.previouslyFocusedElement = document.activeElement;

    if ((this.panel == null)) {
      this.panel = atom.workspace.addModalPanel({item: this.selectListView});
    }

    this.selectListView.focus();
    return this.selectListView.reset();
  },

  toggle() {
    if (this.panel != null) {
      return this.cancel();
    } else {
      const { showHelp } = require("./makensis");

      showHelp(this.selectListView);
      return this.attach();
    }
  }
});
