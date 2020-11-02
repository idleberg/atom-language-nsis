function __console(type: string, ...args: unknown[]): void {
  if (atom?.inDevMode()) {
    args.unshift('[language-nsis]')

    global.console[type](...args);
  }
}

export default {
  clear(...args: unknown[]): void {
    __console('clear', ...args);
  },

  debug(...args: unknown[]): void {
    __console('debug', ...args);
  },

  error(...args: unknown[]): void {
    __console('error', ...args);
  },

  info(...args: unknown[]): void {
    __console('info', ...args);
  },

  log(...args: unknown[]): void {
    __console('log', ...args);
  },

  warn(...args: unknown[]): void {
    __console('warn', ...args);
  }
}
