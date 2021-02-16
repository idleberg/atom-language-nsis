import { Disposable } from 'atom';

export default {
  consolePanel: null,

  consumer(consolePanel: unknown): Disposable {
    this.consolePanel = consolePanel;

    return new Disposable(() => {
      this.consolePanel = null;
    });
  },

  show(clear = false): void {
    if (clear) this.consolePanel.clear();
    this.consolePanel.show();
  },

  hide(): void {
    this.consolePanel.hide();
  },

  toggle(): void {
    this.consolePanel.toggle();
  },

  clear(): void {
    this.consolePanel.clear();
  },

  log(...message: unknown[]): void {
    this.consolePanel.log(...message);
  },

  error(...message: unknown[]): void {
    this.consolePanel.error(...message);
  },

  warn(...message: unknown[]): void {
    this.consolePanel.warn(...message);
  }
};
