import { openURL } from './util';
import { showHelp } from './makensis';
import SelectListView from 'atom-select-list';

export default {
  init(): void {
    this.selectListView = new SelectListView({
      emptyMessage: 'No command matches your search.',
      items: [],

      filterKeyForItem(item) { return item; },

      elementForItem(item) {
        const element = document.createElement('li');
        const html = item;
        element.innerHTML = html;

        return element;
      },

      didConfirmSelection: item => {
        this.cancel();
        openURL(item);
      },

      didCancelSelection: () => {
        this.cancel();
      }
    });

    this.selectListView.element.classList.add('nsis-command-list');
  },

  dispose(): void {
    this.cancel();
    this.selectListView.destroy();
  },

  cancel(): void {
    if (this.panel != null) {
      this.panel.destroy();
    }

    this.panel = null;

    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
      this.previouslyFocusedElement = null;
    }
  },

  attach(): void {
    this.previouslyFocusedElement = document.activeElement;

    if ((this.panel == null)) {
      this.panel = atom.workspace.addModalPanel({item: this.selectListView});
    }

    this.selectListView.focus();
    this.selectListView.reset();
  },

  async toggle(): Promise<void>{
    if (this.panel != null) {
      this.cancel();
    } else {
      await showHelp(this.selectListView);
      this.attach();
    }
  }
};
