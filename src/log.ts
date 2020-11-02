function _console(type, ...args) {
  if (atom?.inDevMode()) {
    args.unshift('[language-nsis]')

    return (global).console[type](...args);
  }
}

export default {
  clear(...args: unknown[]): unknown {
    return _console('clear', ...args);
  },

  debug(...args: unknown[]): unknown {
    return _console('debug', ...args);
  },

  error(...args: unknown[]): unknown {
    return _console('error', ...args);
  },

  info(...args: unknown[]): unknown {
    return _console('info', ...args);
  },

  log(...args: unknown[]): unknown {
    return _console('log', ...args);
  },

  warn(...args: unknown[]): unknown {
    return _console('warn', ...args);
  }
}
