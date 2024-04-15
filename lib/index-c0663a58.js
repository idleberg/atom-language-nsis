'use strict';

var main = require('./main-08be6ca1.js');
var index$2 = require('./index-125c3c61.js');
var require$$0 = require('path');

function _mergeNamespaces(n, m) {
  m.forEach(function (e) {
    e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
      if (k !== 'default' && !(k in n)) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  });
  return Object.freeze(n);
}

const isexe = index$2.isexe_1;
const { join, delimiter, sep, posix } = require$$0;

const isWindows = process.platform === 'win32';

// used to check for slashed in commands passed in. always checks for the posix
// seperator on all platforms, and checks for the current separator when not on
// a posix platform. don't use the isWindows check for this since that is mocked
// in tests but we still need the code to actually work when called. that is also
// why it is ignored from coverage.
/* istanbul ignore next */
const rSlash = new RegExp(`[${posix.sep}${sep === posix.sep ? '' : sep}]`.replace(/(\\)/g, '\\$1'));
const rRel = new RegExp(`^\\.${rSlash.source}`);

const getNotFoundError = (cmd) =>
  Object.assign(new Error(`not found: ${cmd}`), { code: 'ENOENT' });

const getPathInfo = (cmd, {
  path: optPath = process.env.PATH,
  pathExt: optPathExt = process.env.PATHEXT,
  delimiter: optDelimiter = delimiter,
}) => {
  // If it has a slash, then we don't bother searching the pathenv.
  // just check the file itself, and that's it.
  const pathEnv = cmd.match(rSlash) ? [''] : [
    // windows always checks the cwd first
    ...(isWindows ? [process.cwd()] : []),
    ...(optPath || /* istanbul ignore next: very unusual */ '').split(optDelimiter),
  ];

  if (isWindows) {
    const pathExtExe = optPathExt ||
      ['.EXE', '.CMD', '.BAT', '.COM'].join(optDelimiter);
    const pathExt = pathExtExe.split(optDelimiter).reduce((acc, item) => {
      acc.push(item);
      acc.push(item.toLowerCase());
      return acc
    }, []);
    if (cmd.includes('.') && pathExt[0] !== '') {
      pathExt.unshift('');
    }
    return { pathEnv, pathExt, pathExtExe }
  }

  return { pathEnv, pathExt: [''] }
};

const getPathPart = (raw, cmd) => {
  const pathPart = /^".*"$/.test(raw) ? raw.slice(1, -1) : raw;
  const prefix = !pathPart && rRel.test(cmd) ? cmd.slice(0, 2) : '';
  return prefix + join(pathPart, cmd)
};

const which = async (cmd, opt = {}) => {
  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
  const found = [];

  for (const envPart of pathEnv) {
    const p = getPathPart(envPart, cmd);

    for (const ext of pathExt) {
      const withExt = p + ext;
      const is = await isexe(withExt, { pathExt: pathExtExe, ignoreErrors: true });
      if (is) {
        if (!opt.all) {
          return withExt
        }
        found.push(withExt);
      }
    }
  }

  if (opt.all && found.length) {
    return found
  }

  if (opt.nothrow) {
    return null
  }

  throw getNotFoundError(cmd)
};

const whichSync = (cmd, opt = {}) => {
  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
  const found = [];

  for (const pathEnvPart of pathEnv) {
    const p = getPathPart(pathEnvPart, cmd);

    for (const ext of pathExt) {
      const withExt = p + ext;
      const is = isexe.sync(withExt, { pathExt: pathExtExe, ignoreErrors: true });
      if (is) {
        if (!opt.all) {
          return withExt
        }
        found.push(withExt);
      }
    }
  }

  if (opt.all && found.length) {
    return found
  }

  if (opt.nothrow) {
    return null
  }

  throw getNotFoundError(cmd)
};

var lib = which;
which.sync = whichSync;

var index = /*@__PURE__*/main.getDefaultExportFromCjs(lib);

var index$1 = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  default: index
}, [lib]);

exports.index = index$1;
//# sourceMappingURL=index-c0663a58.js.map
