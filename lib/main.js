'use strict';

var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');
var os = require('os');
var electron = require('electron');
var assert = require('assert');
var require$$1 = require('events');
var require$$0$1 = require('buffer');
var require$$0 = require('stream');
var require$$0$2 = require('util');
var require$$0$3 = require('atom');
var YAML = require('yaml-js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var childProcess__default = /*#__PURE__*/_interopDefaultLegacy(childProcess);
var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
var assert__default = /*#__PURE__*/_interopDefaultLegacy(assert);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
var require$$0__default$3 = /*#__PURE__*/_interopDefaultLegacy(require$$0$3);
var YAML__default = /*#__PURE__*/_interopDefaultLegacy(YAML);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/* @flow */
/*::

type DotenvParseOptions = {
  debug?: boolean
}

// keys and values from src
type DotenvParseOutput = { [string]: string }

type DotenvConfigOptions = {
  path?: string, // path to .env file
  encoding?: string, // encoding of .env file
  debug?: string // turn on logging for debugging purposes
}

type DotenvConfigOutput = {
  parsed?: DotenvParseOutput,
  error?: Error
}

*/




function log (message /*: string */) {
  console.log(`[dotenv][DEBUG] ${message}`);
}

const NEWLINE = '\n';
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
const RE_NEWLINES = /\\n/g;
const NEWLINES_MATCH = /\n|\r|\r\n/;

// Parses src into an Object
function parse (src /*: string | Buffer */, options /*: ?DotenvParseOptions */) /*: DotenvParseOutput */ {
  const debug = Boolean(options && options.debug);
  const obj = {};

  // convert Buffers before splitting into lines and processing
  src.toString().split(NEWLINES_MATCH).forEach(function (line, idx) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(RE_INI_KEY_VAL);
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1];
      // default undefined or missing values to empty string
      let val = (keyValueArr[2] || '');
      const end = val.length - 1;
      const isDoubleQuoted = val[0] === '"' && val[end] === '"';
      const isSingleQuoted = val[0] === "'" && val[end] === "'";

      // if single or double quoted, remove quotes
      if (isSingleQuoted || isDoubleQuoted) {
        val = val.substring(1, end);

        // if double quoted, expand newlines
        if (isDoubleQuoted) {
          val = val.replace(RE_NEWLINES, NEWLINE);
        }
      } else {
        // remove surrounding whitespace
        val = val.trim();
      }

      obj[key] = val;
    } else if (debug) {
      log(`did not match key and value when parsing line ${idx + 1}: ${line}`);
    }
  });

  return obj
}

// Populates process.env from .env file
function config (options /*: ?DotenvConfigOptions */) /*: DotenvConfigOutput */ {
  let dotenvPath = path__default['default'].resolve(process.cwd(), '.env');
  let encoding /*: string */ = 'utf8';
  let debug = false;

  if (options) {
    if (options.path != null) {
      dotenvPath = options.path;
    }
    if (options.encoding != null) {
      encoding = options.encoding;
    }
    if (options.debug != null) {
      debug = true;
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    const parsed = parse(fs__default['default'].readFileSync(dotenvPath, { encoding }), { debug });

    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key];
      } else if (debug) {
        log(`"${key}" is already defined in \`process.env\` and will not be overwritten`);
      }
    });

    return { parsed }
  } catch (e) {
    return { error: e }
  }
}

var config_1 = config;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });






function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var os__default$1 = /*#__PURE__*/_interopDefaultLegacy(os__default['default']);
var fs__default$1 = /*#__PURE__*/_interopDefaultLegacy(fs__default['default']);
var path__default$1 = /*#__PURE__*/_interopDefaultLegacy(path__default['default']);

var indentString = (string, count = 1, options) => {
	options = {
		indent: ' ',
		includeEmptyLines: false,
		...options
	};

	if (typeof string !== 'string') {
		throw new TypeError(
			`Expected \`input\` to be a \`string\`, got \`${typeof string}\``
		);
	}

	if (typeof count !== 'number') {
		throw new TypeError(
			`Expected \`count\` to be a \`number\`, got \`${typeof count}\``
		);
	}

	if (typeof options.indent !== 'string') {
		throw new TypeError(
			`Expected \`options.indent\` to be a \`string\`, got \`${typeof options.indent}\``
		);
	}

	if (count === 0) {
		return string;
	}

	const regex = options.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;

	return string.replace(regex, options.indent.repeat(count));
};

const extractPathRegex = /\s+at.*(?:\(|\s)(.*)\)?/;
const pathRegex = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)\.js:\d+:\d+)|native)/;
const homeDir = typeof os__default$1['default'].homedir === 'undefined' ? '' : os__default$1['default'].homedir();

var cleanStack = (stack, options) => {
	options = Object.assign({pretty: false}, options);

	return stack.replace(/\\/g, '/')
		.split('\n')
		.filter(line => {
			const pathMatches = line.match(extractPathRegex);
			if (pathMatches === null || !pathMatches[1]) {
				return true;
			}

			const match = pathMatches[1];

			// Electron
			if (
				match.includes('.app/Contents/Resources/electron.asar') ||
				match.includes('.app/Contents/Resources/default_app.asar')
			) {
				return false;
			}

			return !pathRegex.test(match);
		})
		.filter(line => line.trim() !== '')
		.map(line => {
			if (options.pretty) {
				return line.replace(extractPathRegex, (m, p1) => m.replace(p1, p1.replace(homeDir, '~')));
			}

			return line;
		})
		.join('\n');
};

const cleanInternalStack = stack => stack.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, '');

class AggregateError extends Error {
	constructor(errors) {
		if (!Array.isArray(errors)) {
			throw new TypeError(`Expected input to be an Array, got ${typeof errors}`);
		}

		errors = [...errors].map(error => {
			if (error instanceof Error) {
				return error;
			}

			if (error !== null && typeof error === 'object') {
				// Handle plain error objects with message property and/or possibly other metadata
				return Object.assign(new Error(error.message), error);
			}

			return new Error(error);
		});

		let message = errors
			.map(error => {
				// The `stack` property is not standardized, so we can't assume it exists
				return typeof error.stack === 'string' ? cleanInternalStack(cleanStack(error.stack)) : String(error);
			})
			.join('\n');
		message = '\n' + indentString(message, 4);
		super(message);

		this.name = 'AggregateError';

		Object.defineProperty(this, '_errors', {value: errors});
	}

	* [Symbol.iterator]() {
		for (const error of this._errors) {
			yield error;
		}
	}
}

var aggregateError = AggregateError;

var pMap = async (
	iterable,
	mapper,
	{
		concurrency = Infinity,
		stopOnError = true
	} = {}
) => {
	return new Promise((resolve, reject) => {
		if (typeof mapper !== 'function') {
			throw new TypeError('Mapper function is required');
		}

		if (!((Number.isSafeInteger(concurrency) || concurrency === Infinity) && concurrency >= 1)) {
			throw new TypeError(`Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${concurrency}\` (${typeof concurrency})`);
		}

		const result = [];
		const errors = [];
		const iterator = iterable[Symbol.iterator]();
		let isRejected = false;
		let isIterableDone = false;
		let resolvingCount = 0;
		let currentIndex = 0;

		const next = () => {
			if (isRejected) {
				return;
			}

			const nextItem = iterator.next();
			const index = currentIndex;
			currentIndex++;

			if (nextItem.done) {
				isIterableDone = true;

				if (resolvingCount === 0) {
					if (!stopOnError && errors.length !== 0) {
						reject(new aggregateError(errors));
					} else {
						resolve(result);
					}
				}

				return;
			}

			resolvingCount++;

			(async () => {
				try {
					const element = await nextItem.value;
					result[index] = await mapper(element, index);
					resolvingCount--;
					next();
				} catch (error) {
					if (stopOnError) {
						isRejected = true;
						reject(error);
					} else {
						errors.push(error);
						resolvingCount--;
						next();
					}
				}
			})();
		};

		for (let i = 0; i < concurrency; i++) {
			next();

			if (isIterableDone) {
				break;
			}
		}
	});
};

const pMap$1 = (iterable, mapper, options) => new Promise((resolve, reject) => {
	options = Object.assign({
		concurrency: Infinity
	}, options);

	if (typeof mapper !== 'function') {
		throw new TypeError('Mapper function is required');
	}

	const {concurrency} = options;

	if (!(typeof concurrency === 'number' && concurrency >= 1)) {
		throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${concurrency}\` (${typeof concurrency})`);
	}

	const ret = [];
	const iterator = iterable[Symbol.iterator]();
	let isRejected = false;
	let isIterableDone = false;
	let resolvingCount = 0;
	let currentIndex = 0;

	const next = () => {
		if (isRejected) {
			return;
		}

		const nextItem = iterator.next();
		const i = currentIndex;
		currentIndex++;

		if (nextItem.done) {
			isIterableDone = true;

			if (resolvingCount === 0) {
				resolve(ret);
			}

			return;
		}

		resolvingCount++;

		Promise.resolve(nextItem.value)
			.then(element => mapper(element, i))
			.then(
				value => {
					ret[i] = value;
					resolvingCount--;
					next();
				},
				error => {
					isRejected = true;
					reject(error);
				}
			);
	};

	for (let i = 0; i < concurrency; i++) {
		next();

		if (isIterableDone) {
			break;
		}
	}
});

var pMap_1 = pMap$1;
// TODO: Remove this for the next major release
var _default = pMap$1;
pMap_1.default = _default;

const pFilter = async (iterable, filterer, options) => {
	const values = await pMap_1(
		iterable,
		(element, index) => Promise.all([filterer(element, index), element]),
		options
	);
	return values.filter(value => Boolean(value[0])).map(value => value[1]);
};

var pFilter_1 = pFilter;
// TODO: Remove this for the next major release
var _default$1 = pFilter;
pFilter_1.default = _default$1;

const IS_ATOM = typeof atom !== 'undefined';
const IS_DEV = typeof atom !== 'undefined' && (atom.inDevMode() || atom.inSpecMode());
const IGNORED_CONFIG_NAME = 'atom-package-deps.ignored';

/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */

/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Module exports.
 * @public
 */

var escapeHtml_1 = escapeHtml;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}

async function spawnInternal(command, args, options) {
    const spawnedProcess = childProcess__default['default'].spawn(command, args, options);
    const promise = new Promise((resolve, reject) => {
        const output = {
            stdout: spawnedProcess.stdout ? [] : null,
            stderr: spawnedProcess.stderr ? [] : null,
        };
        spawnedProcess.on('error', reject);
        if (spawnedProcess.stdout) {
            spawnedProcess.stdout.on('data', function (chunk) {
                output.stdout.push(chunk);
                if (options.handleStdout) {
                    options.handleStdout(chunk);
                }
            });
        }
        if (spawnedProcess.stderr) {
            spawnedProcess.stderr.on('data', function (chunk) {
                output.stderr.push(chunk);
                if (options.handleStderr) {
                    options.handleStderr(chunk);
                }
            });
        }
        spawnedProcess.on('close', code => {
            let outputStdout = null;
            if (output.stdout != null) {
                outputStdout =
                    options.encoding === null || options.encoding === 'buffer'
                        ? Buffer.concat(output.stdout)
                        : output.stdout.join('');
            }
            let outputStderr = null;
            if (output.stderr != null) {
                outputStderr =
                    options.encoding === null || options.encoding === 'buffer'
                        ? Buffer.concat(output.stderr)
                        : output.stderr.join('');
            }
            resolve({
                exitCode: code,
                stdout: outputStdout,
                stderr: outputStderr,
            });
        });
    });
    options.handleChildProcess(spawnedProcess);
    return promise;
}
function spawn(command, args, options) {
    let spawnedProcess;
    const promise = spawnInternal(command, args, {
        ...options,
        handleChildProcess(_spawnedProcess) {
            spawnedProcess = _spawnedProcess;
        },
    });
    promise.kill = function (signal) {
        // TODO: kill all subprocesses on windows with wmic?
        return spawnedProcess.kill(signal);
    };
    return promise;
}

var semverCompare = function cmp (a, b) {
    var pa = a.split('.');
    var pb = b.split('.');
    for (var i = 0; i < 3; i++) {
        var na = Number(pa[i]);
        var nb = Number(pb[i]);
        if (na > nb) return 1;
        if (nb > na) return -1;
        if (!isNaN(na) && isNaN(nb)) return 1;
        if (isNaN(na) && !isNaN(nb)) return -1;
    }
    return 0;
};

async function getDependencies(packageName) {
  const packageModule = atom.packages.getLoadedPackage(packageName);
  const packageDependencies = packageModule && packageModule.metadata['package-deps'];
  return Array.isArray(packageDependencies) ? packageDependencies : [];
}
async function resolveDependencyPath(packageName) {
  return atom.packages.resolvePackagePath(packageName);
}
async function getInstalledDependencyVersion(dependency) {
  var _packageModule$metada;

  const packageModule = atom.packages.getLoadedPackage(dependency.name);
  return packageModule == null ? null : (_packageModule$metada = packageModule.metadata.version) !== null && _packageModule$metada !== void 0 ? _packageModule$metada : null;
}

async function getDependencies$1(packageName) {
  let packageStats = null;

  try {
    packageStats = await fs__default$1['default'].promises.stat(packageName);
  } catch (_) {// No Op
  }

  if (packageStats == null || !packageStats.isDirectory()) {
    throw new Error(`[Package-Deps] Expected packageName to be a readable directory in Node.js invocation`);
  }

  let parsed = null;

  try {
    const contents = await fs__default$1['default'].promises.readFile(path__default$1['default'].join(packageName, 'package.json'), 'utf8');
    parsed = JSON.parse(contents);
  } catch (_) {// Ignore JSON read errors and such
  }

  const packageDependencies = parsed == null || typeof parsed !== 'object' ? [] : parsed['package-deps'];
  return Array.isArray(packageDependencies) ? packageDependencies : [];
}
async function resolveDependencyPath$1(packageName) {
  var _process$env$ATOM_HOM;

  const packageDirectory = path__default$1['default'].join((_process$env$ATOM_HOM = process.env.ATOM_HOME) !== null && _process$env$ATOM_HOM !== void 0 ? _process$env$ATOM_HOM : path__default$1['default'].join(os__default$1['default'].homedir(), '.atom'), 'packages', packageName);

  try {
    await fs__default$1['default'].promises.access(packageDirectory, fs__default$1['default'].constants.R_OK);
    return packageDirectory;
  } catch (_) {
    return null;
  }
}
async function getInstalledDependencyVersion$1(dependency) {
  var _manifest$version, _manifest;

  const {
    directory
  } = dependency;

  if (directory == null) {
    // Not possible to get version without resolved directory in Node.js version
    return null;
  }

  let manifest = null;

  try {
    manifest = JSON.parse(await fs__default$1['default'].promises.readFile(path__default$1['default'].join(directory, 'package.json'), 'utf8'));
  } catch (_) {
    return null;
  }

  return (_manifest$version = (_manifest = manifest) === null || _manifest === void 0 ? void 0 : _manifest.version) !== null && _manifest$version !== void 0 ? _manifest$version : null;
}

/**
 * Internal helpers
 */

async function getInstalledDependencyVersion$2(dependency) {
  if (IS_ATOM) {
    const atomPackageVersion = await getInstalledDependencyVersion(dependency);

    if (atomPackageVersion) {
      return atomPackageVersion;
    } // If the package isn't activated, it won't be loaded, so fallback to reading manifest file instead

  }

  return getInstalledDependencyVersion$1(dependency);
}
/**
 * Exported helpers
 */


const resolveDependencyPath$2 = IS_ATOM ? resolveDependencyPath : resolveDependencyPath$1;
function invariant(condition, message) {
  if (!condition) {
    throw new Error(message !== null && message !== void 0 ? message : 'Invariant violation');
  }
}
async function getDependencies$2(name) {
  const dependencies = await (IS_ATOM ? getDependencies(name) : getDependencies$1(name));

  if (IS_DEV) {
    invariant(Array.isArray(dependencies), `Dependencies for ${name} are not a valid array`);
    dependencies.forEach((item, index) => {
      if (Array.isArray(item)) {
        item.forEach((subitem, subindex) => {
          const invalidMessage = `Dependency#${index}#${subindex} for ${name} is invalid`;
          invariant(typeof subitem.name === 'string' && subitem.name.length > 0, invalidMessage);
          invariant(subitem.minimumVersion == null || typeof subitem.minimumVersion === 'string' && subitem.minimumVersion.length > 0, invalidMessage);
        });
        invariant(item.length > 0, `Dependency#${index} for ${name} has no group items`);
      } else {
        const invalidMessage = `Dependency#${index} for ${name} is invalid`;
        invariant(typeof item.name === 'string' && item.name.length > 0, invalidMessage);
        invariant(item.minimumVersion == null || typeof item.minimumVersion === 'string' && item.minimumVersion.length > 0, invalidMessage);
      }
    });
  }

  return dependencies;
}
async function shouldInstallDependency(dependency) {
  if (dependency.directory == null) {
    // Not installed, so install
    return true;
  }

  if (dependency.minimumVersion == null) {
    // Already installed and no version defined, so skip
    return false;
  }

  const version = await getInstalledDependencyVersion$2(dependency);

  if (version == null) {
    // Unable to get current version, so install
    return true;
  }

  return semverCompare(dependency.minimumVersion, version) === 1;
}
function isPackageIgnored(name) {
  var _atom$config$get;

  if (!IS_ATOM) {
    // Never ignored in CLI
    return false;
  }

  const ignoredPackages = (_atom$config$get = atom.config.get(IGNORED_CONFIG_NAME)) !== null && _atom$config$get !== void 0 ? _atom$config$get : [];

  if (ignoredPackages.includes(name)) {
    return true;
  } // If Atom "notifications" package is disabled, treat the whole thing as ignored


  if (atom.packages.isPackageDisabled('notifications')) {
    console.warn(`Enable notifications to install dependencies for ${name}`);
    return true;
  }

  return false;
}
function markPackageAsIgnored(name) {
  var _atom$config$get2;

  if (!IS_ATOM) {
    // No op in CLI
    return;
  }

  const ignoredPackages = new Set((_atom$config$get2 = atom.config.get(IGNORED_CONFIG_NAME)) !== null && _atom$config$get2 !== void 0 ? _atom$config$get2 : []);
  ignoredPackages.add(name);
  atom.config.set(IGNORED_CONFIG_NAME, Array.from(ignoredPackages));
}
const INSTALL_VALID_TICKS = new Set(['✓', 'done']);
const INSTALL_VALIDATION_REGEXP = /(?:Installing|Moving) (.*?) to .* (.*)/; // Example success output: Uninstalling linter-ui-default ✓

async function installPackage(dependency) {
  const apmPath = IS_ATOM ? atom.packages.getApmPath() : 'apm';
  const {
    stdout,
    stderr
  } = await spawn(apmPath, ['install', dependency.name, '--production', '--color', 'false']);
  const match = INSTALL_VALIDATION_REGEXP.exec(stdout.trim());

  if (match != null && INSTALL_VALID_TICKS.has(match[2])) {
    // Installation complete and verified
    return;
  }

  const error = new Error(`Error installing dependency: ${dependency.name}`);
  error.stack = stderr.trim();
  throw error;
}

let showResetInstruction = true;
function confirmPackagesToInstall({
  packageName,
  dependencies
}) {
  return new Promise(resolve => {
    const ungroupedDependencies = dependencies.filter(item => !Array.isArray(item));
    const groupedDependencies = dependencies.filter(item => Array.isArray(item));
    const skipGroups = groupedDependencies.length === 0;
    const detail = skipGroups ? ungroupedDependencies.map(item => item.name).join(', ') : 'Something went wrong. Check your developer console';
    const groupChoices = groupedDependencies.map(item => item[0]);
    const notification = atom.notifications.addInfo(`${packageName} needs to install dependencies`, {
      dismissable: true,
      icon: 'cloud-download',
      detail,
      description: `Install dependenc${dependencies.length === 1 ? 'y' : 'ies'}?`,
      buttons: [{
        text: 'Yes',
        onDidClick: () => {
          if (skipGroups) {
            resolve([]);
          } else {
            resolve(ungroupedDependencies.concat(groupChoices));
          }

          notification.dismiss();
        }
      }, {
        text: 'No Thanks',
        onDidClick: () => {
          notification.dismiss();
        }
      }, {
        text: 'Never',
        onDidClick: () => {
          markPackageAsIgnored(packageName);

          if (showResetInstruction) {
            showResetInstruction = false;
            atom.notifications.addInfo('How to reset package-deps memory', {
              dismissable: true,
              description: "To modify the list of ignored files invoke 'Application: Open Your Config' and change the 'atom-package-deps' section"
            });
          }

          notification.dismiss();
        }
      }]
    });
    notification.onDidDismiss(() => resolve([]));

    if (skipGroups) {
      return;
    } // Handle groups


    try {
      var _notificationView$ele;

      const notificationView = atom.views.getView(notification);
      const notificationElement = (_notificationView$ele = notificationView === null || notificationView === void 0 ? void 0 : notificationView.element) !== null && _notificationView$ele !== void 0 ? _notificationView$ele : null;

      if (notificationElement == null) {
        throw new Error('Unable to get notification element from view');
      }

      const notificationContent = notificationElement.querySelector('.detail-content');

      if (notificationContent == null) {
        throw new Error('Content detail container not found inside the notification');
      } // Clear the contents and add some skel


      notificationContent.innerHTML = ''; // Add list of ungroup dependencies to the top of the notification

      if (ungroupedDependencies.length > 0) {
        const ungroupedLine = document.createElement('div');
        ungroupedLine.innerHTML = `Packages without choices: <br /><ul><li>${ungroupedDependencies.map(item => escapeHtml_1(item.name)).join('</li><li>')}</li></ul>`;
        notificationContent.appendChild(ungroupedLine);
      } // Create a label line for groups


      const groupLabelLine = document.createElement('div');
      groupLabelLine.innerHTML = `Packages with choices:`;
      notificationContent.appendChild(groupLabelLine); // Create one line per group with a select inside

      const groupedList = document.createElement('ul');
      groupedDependencies.forEach((item, index) => {
        const listItem = document.createElement('li');
        const select = document.createElement('select');
        select.innerHTML = item.map(subitem => `<option>${escapeHtml_1(subitem.name)}</option>`).join('\n');
        select.addEventListener('change', () => {
          // Change the selected value for this index for resolve to use
          const subitem = item.find(entry => entry.name === select.value);

          if (subitem != null) {
            groupChoices[index] = subitem;
          }
        });
        listItem.style.marginTop = '5px';
        listItem.appendChild(select);
        groupedList.appendChild(listItem);
      });
      notificationContent.appendChild(groupedList);
    } catch (err) {
      console.error('[Package-Deps] Error during showing package choices to user', err);
    }
  });
}
function getView({
  packageName,
  dependencies
}) {
  const failed = [];
  const notification = atom.notifications.addInfo(`Installing ${packageName} dependencies`, {
    detail: `Installing ${dependencies.map(item => item.name).join(', ')}`,
    dismissable: true
  });
  const progress = document.createElement('progress');
  progress.max = dependencies.length;
  progress.style.width = '100%';

  try {
    var _notificationView$ele2;

    const notificationView = atom.views.getView(notification);
    const notificationElement = (_notificationView$ele2 = notificationView === null || notificationView === void 0 ? void 0 : notificationView.element) !== null && _notificationView$ele2 !== void 0 ? _notificationView$ele2 : null;

    if (notificationElement == null) {
      throw new Error('Unable to get notification element from view');
    }

    const notificationContent = notificationElement.querySelector('.detail-content');

    if (notificationContent == null) {
      throw new Error('Content detail container not found inside the notification');
    }

    notificationContent.appendChild(progress);
  } catch (err) {
    console.error('[Package-Deps] Error during showing installation progress to user', err);
  }

  return {
    handleFailure({
      dependency,
      error
    }) {
      var _error$stack;

      failed.push(dependency.name);
      progress.value += 1;
      console.error(`[Package-Deps] Unable to install ${dependency.name}, Error:`, (_error$stack = error === null || error === void 0 ? void 0 : error.stack) !== null && _error$stack !== void 0 ? _error$stack : error);
    },

    handleDependencyInstalled(dependency) {
      progress.value += 1;
    },

    handleComplete() {
      notification.dismiss();

      if (failed.length > 0) {
        atom.notifications.addWarning(`Failed to install ${packageName} dependencies`, {
          detail: `These packages were not installed, check your console\nfor more info.\n${failed.join('\n')}`,
          dismissable: true
        });
      } else {
        atom.notifications.addSuccess(`Installed ${packageName} dependencies`, {
          detail: `Installed ${dependencies.map(item => item.name).join(', ')}`
        });
      }

      Promise.all(dependencies.map(item => {
        if (!failed.includes(item.name)) {
          return atom.packages.activatePackage(item.name);
        }

        return null;
      })).catch(err => {
        console.error(`[Package-Deps] Error activating installed packages for ${packageName}`, err);
      });
    }

  };
}

async function confirmPackagesToInstall$1({
  dependencies
}) {
  // No user interaction on the CLI. Install the first (aka "default" choice) package
  return dependencies.map(item => Array.isArray(item) ? item[0] : item);
}
function getView$1({
  dependencies
}) {
  let failed = false;
  console.log(`Installing dependencies:\n${dependencies.map(item => `  - ${item.name}`).join('\n')}`);
  return {
    handleFailure({
      dependency,
      error
    }) {
      var _error$stack;

      failed = true;
      console.error(`Unable to install ${dependency.name}, Error:`, (_error$stack = error === null || error === void 0 ? void 0 : error.stack) !== null && _error$stack !== void 0 ? _error$stack : error);
    },

    handleDependencyInstalled(dependency) {
      console.log('Successfully installed', dependency.name);
    },

    handleComplete() {
      console.log('Installation complete');

      if (failed) {
        // Fail the invocation
        process.exitCode = 1;
      }
    }

  };
}

const getView$2 = IS_ATOM ? getView : getView$1;
const confirmPackagesToInstall$2 = IS_ATOM ? confirmPackagesToInstall : confirmPackagesToInstall$1;

async function install(packageName) {
  invariant(typeof packageName === 'string' && packageName.length > 0, '[Package-Deps] Package name is required');

  if (isPackageIgnored(packageName)) {
    // User ignored this package
    return;
  } // Get list of relevant dependencies


  const dependencies = await getDependencies$2(packageName);

  if (dependencies.length === 0) {
    // Short-circuit
    return;
  } // Resolve directories of relevant dependencies


  const resolvedDependencies = await Promise.all(dependencies.map(async item => {
    if (Array.isArray(item)) {
      return Promise.all(item.map(async subitem => ({ ...subitem,
        directory: await resolveDependencyPath$2(subitem.name)
      })));
    }

    return { ...item,
      directory: await resolveDependencyPath$2(item.name)
    };
  })); // Filter out already installed, in range dependencies
  // If one dependency from a group is already installed, whole group is ignored

  const dependenciesToInstall = await pFilter_1(resolvedDependencies, async function (item) {
    if (Array.isArray(item)) {
      return (await Promise.all(item.map(subitem => shouldInstallDependency(subitem)))).every(Boolean);
    }

    return shouldInstallDependency(item);
  });

  if (dependenciesToInstall.length === 0) {
    // Short-circuit if all have been skipped
    return;
  }

  const chosenDependencies = await confirmPackagesToInstall$2({
    packageName,
    dependencies: dependenciesToInstall
  });

  if (chosenDependencies.length === 0) {
    // Short-circuit if user interaction cancelled all
    return;
  }

  const view = getView$2({
    packageName,
    dependencies: chosenDependencies
  });
  await pMap(chosenDependencies, async function (dependency) {
    try {
      await installPackage(dependency);
      view.handleDependencyInstalled(dependency);
    } catch (err) {
      view.handleFailure({
        dependency,
        error: err
      });
    }
  }, {
    concurrency: 2
  });
  view.handleComplete();
}

exports.install = install;
});

const callsites = () => {
	const _prepareStackTrace = Error.prepareStackTrace;
	Error.prepareStackTrace = (_, stack) => stack;
	const stack = new Error().stack.slice(1);
	Error.prepareStackTrace = _prepareStackTrace;
	return stack;
};

var callsites_1 = callsites;
// TODO: Remove this for the next major release
var _default = callsites;
callsites_1.default = _default;

var callerCallsite = ({depth = 0} = {}) => {
	const callers = [];
	const callerFileSet = new Set();

	for (const callsite of callsites_1()) {
		const fileName = callsite.getFileName();
		const hasReceiver = callsite.getTypeName() !== null && fileName !== null;

		if (!callerFileSet.has(fileName)) {
			callerFileSet.add(fileName);
			callers.unshift(callsite);
		}

		if (hasReceiver) {
			return callers[depth];
		}
	}
};

var lib$1 = createCommonjsModule(function (module, exports) {
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readManifestSync = exports.readManifest = void 0;
var resolve = path__default['default'].resolve, sep = path__default['default'].sep;
var fs = fs__default['default'].promises, readFileSync = fs__default['default'].readFileSync;

function readManifest(packageName) {
    if (packageName === void 0) { packageName = ''; }
    return __awaiter(this, void 0, void 0, function () {
        var filePath, fileContents, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filePath = resolveFilePath(packageName);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs.readFile(filePath, 'utf8')];
                case 2:
                    fileContents = _a.sent();
                    return [2 /*return*/, JSON.parse(fileContents)];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.readManifest = readManifest;
function readManifestSync(packageName) {
    if (packageName === void 0) { packageName = ''; }
    var filePath = resolveFilePath(packageName);
    try {
        var fileContents = readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    }
    catch (err) {
        return null;
    }
}
exports.readManifestSync = readManifestSync;
function resolveFilePath(packageName) {
    packageName = (packageName === null || packageName === void 0 ? void 0 : packageName.length) ? packageName : getPackageName();
    var packagePath = atom.packages.resolvePackagePath(packageName);
    var filePath = resolve(packagePath, 'package.json');
    return filePath;
}
function getPackageName() {
    var callerPath = callerCallsite().getFileName();
    var packageDirPaths = atom.packages.getPackageDirPaths();
    var intersection = packageDirPaths.filter(function (packageDirPath) {
        return callerPath.startsWith(packageDirPath);
    });
    if (intersection === null || intersection === void 0 ? void 0 : intersection.length) {
        return callerPath
            .replace(intersection[0], '')
            .split(sep)
            .filter(function (fragment) { return fragment; })[0] || '';
    }
    return '';
}

});

var lib$2 = createCommonjsModule(function (module, exports) {
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.satisfyDependencies = void 0;


var defaultOptions = {
    logger: console.log
};
/**
 * Installs and optionally enables package dependencies
 * @param {string} identifier
 * @param {Object} options
 */
function satisfyDependencies(identifier, userOptions) {
    if (userOptions === void 0) { userOptions = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var options, manifest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = __assign(__assign({}, defaultOptions), userOptions);
                    return [4 /*yield*/, lib$1.readManifest(identifier)];
                case 1:
                    manifest = _a.sent();
                    return [4 /*yield*/, lib.install(manifest['name'])];
                case 2:
                    _a.sent();
                    enableDependencies(manifest['package-deps'], options);
                    return [2 /*return*/];
            }
        });
    });
}
exports.satisfyDependencies = satisfyDependencies;
/**
 * Enables packages dependencies
 * @param {Object} manifest
 * @param {Object} options
 */
function enableDependencies(manifest, options) {
    if (options.enableDependencies) {
        manifest['package-deps'].map(function (packageDependency) {
            if (atom.packages.isPackageDisabled(packageDependency)) {
                if (atom.inDevMode()) {
                    options.logger("[" + manifest.name + "] Enabling package dependency '" + packageDependency + "'");
                }
                atom.packages.enablePackage(packageDependency);
            }
        });
    }
}

});

var windows = isexe;
isexe.sync = sync;



function checkPathExt (path, options) {
  var pathext = options.pathExt !== undefined ?
    options.pathExt : process.env.PATHEXT;

  if (!pathext) {
    return true
  }

  pathext = pathext.split(';');
  if (pathext.indexOf('') !== -1) {
    return true
  }
  for (var i = 0; i < pathext.length; i++) {
    var p = pathext[i].toLowerCase();
    if (p && path.substr(-p.length).toLowerCase() === p) {
      return true
    }
  }
  return false
}

function checkStat (stat, path, options) {
  if (!stat.isSymbolicLink() && !stat.isFile()) {
    return false
  }
  return checkPathExt(path, options)
}

function isexe (path, options, cb) {
  fs__default['default'].stat(path, function (er, stat) {
    cb(er, er ? false : checkStat(stat, path, options));
  });
}

function sync (path, options) {
  return checkStat(fs__default['default'].statSync(path), path, options)
}

var mode = isexe$1;
isexe$1.sync = sync$1;



function isexe$1 (path, options, cb) {
  fs__default['default'].stat(path, function (er, stat) {
    cb(er, er ? false : checkStat$1(stat, options));
  });
}

function sync$1 (path, options) {
  return checkStat$1(fs__default['default'].statSync(path), options)
}

function checkStat$1 (stat, options) {
  return stat.isFile() && checkMode(stat, options)
}

function checkMode (stat, options) {
  var mod = stat.mode;
  var uid = stat.uid;
  var gid = stat.gid;

  var myUid = options.uid !== undefined ?
    options.uid : process.getuid && process.getuid();
  var myGid = options.gid !== undefined ?
    options.gid : process.getgid && process.getgid();

  var u = parseInt('100', 8);
  var g = parseInt('010', 8);
  var o = parseInt('001', 8);
  var ug = u | g;

  var ret = (mod & o) ||
    (mod & g) && gid === myGid ||
    (mod & u) && uid === myUid ||
    (mod & ug) && myUid === 0;

  return ret
}

var core;
if (process.platform === 'win32' || commonjsGlobal.TESTING_WINDOWS) {
  core = windows;
} else {
  core = mode;
}

var isexe_1 = isexe$2;
isexe$2.sync = sync$2;

function isexe$2 (path, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (!cb) {
    if (typeof Promise !== 'function') {
      throw new TypeError('callback not provided')
    }

    return new Promise(function (resolve, reject) {
      isexe$2(path, options || {}, function (er, is) {
        if (er) {
          reject(er);
        } else {
          resolve(is);
        }
      });
    })
  }

  core(path, options || {}, function (er, is) {
    // ignore EACCES because that just means we aren't allowed to run it
    if (er) {
      if (er.code === 'EACCES' || options && options.ignoreErrors) {
        er = null;
        is = false;
      }
    }
    cb(er, is);
  });
}

function sync$2 (path, options) {
  // my kingdom for a filtered catch
  try {
    return core.sync(path, options || {})
  } catch (er) {
    if (options && options.ignoreErrors || er.code === 'EACCES') {
      return false
    } else {
      throw er
    }
  }
}

const isWindows = process.platform === 'win32' ||
    process.env.OSTYPE === 'cygwin' ||
    process.env.OSTYPE === 'msys';


const COLON = isWindows ? ';' : ':';


const getNotFoundError = (cmd) =>
  Object.assign(new Error(`not found: ${cmd}`), { code: 'ENOENT' });

const getPathInfo = (cmd, opt) => {
  const colon = opt.colon || COLON;

  // If it has a slash, then we don't bother searching the pathenv.
  // just check the file itself, and that's it.
  const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? ['']
    : (
      [
        // windows always checks the cwd first
        ...(isWindows ? [process.cwd()] : []),
        ...(opt.path || process.env.PATH ||
          /* istanbul ignore next: very unusual */ '').split(colon),
      ]
    );
  const pathExtExe = isWindows
    ? opt.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM'
    : '';
  const pathExt = isWindows ? pathExtExe.split(colon) : [''];

  if (isWindows) {
    if (cmd.indexOf('.') !== -1 && pathExt[0] !== '')
      pathExt.unshift('');
  }

  return {
    pathEnv,
    pathExt,
    pathExtExe,
  }
};

const which = (cmd, opt, cb) => {
  if (typeof opt === 'function') {
    cb = opt;
    opt = {};
  }
  if (!opt)
    opt = {};

  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
  const found = [];

  const step = i => new Promise((resolve, reject) => {
    if (i === pathEnv.length)
      return opt.all && found.length ? resolve(found)
        : reject(getNotFoundError(cmd))

    const ppRaw = pathEnv[i];
    const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;

    const pCmd = path__default['default'].join(pathPart, cmd);
    const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd
      : pCmd;

    resolve(subStep(p, i, 0));
  });

  const subStep = (p, i, ii) => new Promise((resolve, reject) => {
    if (ii === pathExt.length)
      return resolve(step(i + 1))
    const ext = pathExt[ii];
    isexe_1(p + ext, { pathExt: pathExtExe }, (er, is) => {
      if (!er && is) {
        if (opt.all)
          found.push(p + ext);
        else
          return resolve(p + ext)
      }
      return resolve(subStep(p, i, ii + 1))
    });
  });

  return cb ? step(0).then(res => cb(null, res), cb) : step(0)
};

const whichSync = (cmd, opt) => {
  opt = opt || {};

  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
  const found = [];

  for (let i = 0; i < pathEnv.length; i ++) {
    const ppRaw = pathEnv[i];
    const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;

    const pCmd = path__default['default'].join(pathPart, cmd);
    const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd
      : pCmd;

    for (let j = 0; j < pathExt.length; j ++) {
      const cur = p + pathExt[j];
      try {
        const is = isexe_1.sync(cur, { pathExt: pathExtExe });
        if (is) {
          if (opt.all)
            found.push(cur);
          else
            return cur
        }
      } catch (ex) {}
    }
  }

  if (opt.all && found.length)
    return found

  if (opt.nothrow)
    return null

  throw getNotFoundError(cmd)
};

var which_1 = which;
which.sync = whichSync;

const pathKey = (options = {}) => {
	const environment = options.env || process.env;
	const platform = options.platform || process.platform;

	if (platform !== 'win32') {
		return 'PATH';
	}

	return Object.keys(environment).reverse().find(key => key.toUpperCase() === 'PATH') || 'Path';
};

var pathKey_1 = pathKey;
// TODO: Remove this for the next major release
var _default$1 = pathKey;
pathKey_1.default = _default$1;

function resolveCommandAttempt(parsed, withoutPathExt) {
    const env = parsed.options.env || process.env;
    const cwd = process.cwd();
    const hasCustomCwd = parsed.options.cwd != null;
    // Worker threads do not have process.chdir()
    const shouldSwitchCwd = hasCustomCwd && process.chdir !== undefined && !process.chdir.disabled;

    // If a custom `cwd` was specified, we need to change the process cwd
    // because `which` will do stat calls but does not support a custom cwd
    if (shouldSwitchCwd) {
        try {
            process.chdir(parsed.options.cwd);
        } catch (err) {
            /* Empty */
        }
    }

    let resolved;

    try {
        resolved = which_1.sync(parsed.command, {
            path: env[pathKey_1({ env })],
            pathExt: withoutPathExt ? path__default['default'].delimiter : undefined,
        });
    } catch (e) {
        /* Empty */
    } finally {
        if (shouldSwitchCwd) {
            process.chdir(cwd);
        }
    }

    // If we successfully resolved, ensure that an absolute path is returned
    // Note that when a custom `cwd` was used, we need to resolve to an absolute path based on it
    if (resolved) {
        resolved = path__default['default'].resolve(hasCustomCwd ? parsed.options.cwd : '', resolved);
    }

    return resolved;
}

function resolveCommand(parsed) {
    return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
}

var resolveCommand_1 = resolveCommand;

// See http://www.robvanderwoude.com/escapechars.php
const metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;

function escapeCommand(arg) {
    // Escape meta chars
    arg = arg.replace(metaCharsRegExp, '^$1');

    return arg;
}

function escapeArgument(arg, doubleEscapeMetaChars) {
    // Convert to string
    arg = `${arg}`;

    // Algorithm below is based on https://qntm.org/cmd

    // Sequence of backslashes followed by a double quote:
    // double up all the backslashes and escape the double quote
    arg = arg.replace(/(\\*)"/g, '$1$1\\"');

    // Sequence of backslashes followed by the end of the string
    // (which will become a double quote later):
    // double up all the backslashes
    arg = arg.replace(/(\\*)$/, '$1$1');

    // All other backslashes occur literally

    // Quote the whole thing:
    arg = `"${arg}"`;

    // Escape meta chars
    arg = arg.replace(metaCharsRegExp, '^$1');

    // Double escape meta chars if necessary
    if (doubleEscapeMetaChars) {
        arg = arg.replace(metaCharsRegExp, '^$1');
    }

    return arg;
}

var command = escapeCommand;
var argument = escapeArgument;

var _escape = {
	command: command,
	argument: argument
};

var shebangRegex = /^#!(.*)/;

var shebangCommand = (string = '') => {
	const match = string.match(shebangRegex);

	if (!match) {
		return null;
	}

	const [path, argument] = match[0].replace(/#! ?/, '').split(' ');
	const binary = path.split('/').pop();

	if (binary === 'env') {
		return argument;
	}

	return argument ? `${binary} ${argument}` : binary;
};

function readShebang(command) {
    // Read the first 150 bytes from the file
    const size = 150;
    const buffer = Buffer.alloc(size);

    let fd;

    try {
        fd = fs__default['default'].openSync(command, 'r');
        fs__default['default'].readSync(fd, buffer, 0, size, 0);
        fs__default['default'].closeSync(fd);
    } catch (e) { /* Empty */ }

    // Attempt to extract shebang (null is returned if not a shebang)
    return shebangCommand(buffer.toString());
}

var readShebang_1 = readShebang;

const isWin = process.platform === 'win32';
const isExecutableRegExp = /\.(?:com|exe)$/i;
const isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;

function detectShebang(parsed) {
    parsed.file = resolveCommand_1(parsed);

    const shebang = parsed.file && readShebang_1(parsed.file);

    if (shebang) {
        parsed.args.unshift(parsed.file);
        parsed.command = shebang;

        return resolveCommand_1(parsed);
    }

    return parsed.file;
}

function parseNonShell(parsed) {
    if (!isWin) {
        return parsed;
    }

    // Detect & add support for shebangs
    const commandFile = detectShebang(parsed);

    // We don't need a shell if the command filename is an executable
    const needsShell = !isExecutableRegExp.test(commandFile);

    // If a shell is required, use cmd.exe and take care of escaping everything correctly
    // Note that `forceShell` is an hidden option used only in tests
    if (parsed.options.forceShell || needsShell) {
        // Need to double escape meta chars if the command is a cmd-shim located in `node_modules/.bin/`
        // The cmd-shim simply calls execute the package bin file with NodeJS, proxying any argument
        // Because the escape of metachars with ^ gets interpreted when the cmd.exe is first called,
        // we need to double escape them
        const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);

        // Normalize posix paths into OS compatible paths (e.g.: foo/bar -> foo\bar)
        // This is necessary otherwise it will always fail with ENOENT in those cases
        parsed.command = path__default['default'].normalize(parsed.command);

        // Escape command & arguments
        parsed.command = _escape.command(parsed.command);
        parsed.args = parsed.args.map((arg) => _escape.argument(arg, needsDoubleEscapeMetaChars));

        const shellCommand = [parsed.command].concat(parsed.args).join(' ');

        parsed.args = ['/d', '/s', '/c', `"${shellCommand}"`];
        parsed.command = process.env.comspec || 'cmd.exe';
        parsed.options.windowsVerbatimArguments = true; // Tell node's spawn that the arguments are already escaped
    }

    return parsed;
}

function parse$1(command, args, options) {
    // Normalize arguments, similar to nodejs
    if (args && !Array.isArray(args)) {
        options = args;
        args = null;
    }

    args = args ? args.slice(0) : []; // Clone array to avoid changing the original
    options = Object.assign({}, options); // Clone object to avoid changing the original

    // Build our parsed object
    const parsed = {
        command,
        args,
        options,
        file: undefined,
        original: {
            command,
            args,
        },
    };

    // Delegate further parsing to shell or non-shell
    return options.shell ? parsed : parseNonShell(parsed);
}

var parse_1 = parse$1;

const isWin$1 = process.platform === 'win32';

function notFoundError(original, syscall) {
    return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
        code: 'ENOENT',
        errno: 'ENOENT',
        syscall: `${syscall} ${original.command}`,
        path: original.command,
        spawnargs: original.args,
    });
}

function hookChildProcess(cp, parsed) {
    if (!isWin$1) {
        return;
    }

    const originalEmit = cp.emit;

    cp.emit = function (name, arg1) {
        // If emitting "exit" event and exit code is 1, we need to check if
        // the command exists and emit an "error" instead
        // See https://github.com/IndigoUnited/node-cross-spawn/issues/16
        if (name === 'exit') {
            const err = verifyENOENT(arg1, parsed);

            if (err) {
                return originalEmit.call(cp, 'error', err);
            }
        }

        return originalEmit.apply(cp, arguments); // eslint-disable-line prefer-rest-params
    };
}

function verifyENOENT(status, parsed) {
    if (isWin$1 && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, 'spawn');
    }

    return null;
}

function verifyENOENTSync(status, parsed) {
    if (isWin$1 && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, 'spawnSync');
    }

    return null;
}

var enoent = {
    hookChildProcess,
    verifyENOENT,
    verifyENOENTSync,
    notFoundError,
};

function spawn(command, args, options) {
    // Parse the arguments
    const parsed = parse_1(command, args, options);

    // Spawn the child process
    const spawned = childProcess__default['default'].spawn(parsed.command, parsed.args, parsed.options);

    // Hook into child process "exit" event to emit an error if the command
    // does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    enoent.hookChildProcess(spawned, parsed);

    return spawned;
}

function spawnSync(command, args, options) {
    // Parse the arguments
    const parsed = parse_1(command, args, options);

    // Spawn the child process
    const result = childProcess__default['default'].spawnSync(parsed.command, parsed.args, parsed.options);

    // Analyze if the command does not exist, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);

    return result;
}

var crossSpawn = spawn;
var spawn_1 = spawn;
var sync$3 = spawnSync;

var _parse = parse_1;
var _enoent = enoent;
crossSpawn.spawn = spawn_1;
crossSpawn.sync = sync$3;
crossSpawn._parse = _parse;
crossSpawn._enoent = _enoent;

var stripFinalNewline = input => {
	const LF = typeof input === 'string' ? '\n' : '\n'.charCodeAt();
	const CR = typeof input === 'string' ? '\r' : '\r'.charCodeAt();

	if (input[input.length - 1] === LF) {
		input = input.slice(0, input.length - 1);
	}

	if (input[input.length - 1] === CR) {
		input = input.slice(0, input.length - 1);
	}

	return input;
};

var npmRunPath_1 = createCommonjsModule(function (module) {



const npmRunPath = options => {
	options = {
		cwd: process.cwd(),
		path: process.env[pathKey_1()],
		execPath: process.execPath,
		...options
	};

	let previous;
	let cwdPath = path__default['default'].resolve(options.cwd);
	const result = [];

	while (previous !== cwdPath) {
		result.push(path__default['default'].join(cwdPath, 'node_modules/.bin'));
		previous = cwdPath;
		cwdPath = path__default['default'].resolve(cwdPath, '..');
	}

	// Ensure the running `node` binary is used
	const execPathDir = path__default['default'].resolve(options.cwd, options.execPath, '..');
	result.push(execPathDir);

	return result.concat(options.path).join(path__default['default'].delimiter);
};

module.exports = npmRunPath;
// TODO: Remove this for the next major release
module.exports.default = npmRunPath;

module.exports.env = options => {
	options = {
		env: process.env,
		...options
	};

	const env = {...options.env};
	const path = pathKey_1({env});

	options.path = env[path];
	env[path] = module.exports(options);

	return env;
};
});

const mimicFn = (to, from) => {
	for (const prop of Reflect.ownKeys(from)) {
		Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
	}

	return to;
};

var mimicFn_1 = mimicFn;
// TODO: Remove this for the next major release
var _default$2 = mimicFn;
mimicFn_1.default = _default$2;

const calledFunctions = new WeakMap();

const onetime = (function_, options = {}) => {
	if (typeof function_ !== 'function') {
		throw new TypeError('Expected a function');
	}

	let returnValue;
	let callCount = 0;
	const functionName = function_.displayName || function_.name || '<anonymous>';

	const onetime = function (...arguments_) {
		calledFunctions.set(onetime, ++callCount);

		if (callCount === 1) {
			returnValue = function_.apply(this, arguments_);
			function_ = null;
		} else if (options.throw === true) {
			throw new Error(`Function \`${functionName}\` can only be called once`);
		}

		return returnValue;
	};

	mimicFn_1(onetime, function_);
	calledFunctions.set(onetime, callCount);

	return onetime;
};

var onetime_1 = onetime;
// TODO: Remove this for the next major release
var _default$3 = onetime;

var callCount = function_ => {
	if (!calledFunctions.has(function_)) {
		throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
	}

	return calledFunctions.get(function_);
};
onetime_1.default = _default$3;
onetime_1.callCount = callCount;

var core$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.SIGNALS=void 0;

const SIGNALS=[
{
name:"SIGHUP",
number:1,
action:"terminate",
description:"Terminal closed",
standard:"posix"},

{
name:"SIGINT",
number:2,
action:"terminate",
description:"User interruption with CTRL-C",
standard:"ansi"},

{
name:"SIGQUIT",
number:3,
action:"core",
description:"User interruption with CTRL-\\",
standard:"posix"},

{
name:"SIGILL",
number:4,
action:"core",
description:"Invalid machine instruction",
standard:"ansi"},

{
name:"SIGTRAP",
number:5,
action:"core",
description:"Debugger breakpoint",
standard:"posix"},

{
name:"SIGABRT",
number:6,
action:"core",
description:"Aborted",
standard:"ansi"},

{
name:"SIGIOT",
number:6,
action:"core",
description:"Aborted",
standard:"bsd"},

{
name:"SIGBUS",
number:7,
action:"core",
description:
"Bus error due to misaligned, non-existing address or paging error",
standard:"bsd"},

{
name:"SIGEMT",
number:7,
action:"terminate",
description:"Command should be emulated but is not implemented",
standard:"other"},

{
name:"SIGFPE",
number:8,
action:"core",
description:"Floating point arithmetic error",
standard:"ansi"},

{
name:"SIGKILL",
number:9,
action:"terminate",
description:"Forced termination",
standard:"posix",
forced:true},

{
name:"SIGUSR1",
number:10,
action:"terminate",
description:"Application-specific signal",
standard:"posix"},

{
name:"SIGSEGV",
number:11,
action:"core",
description:"Segmentation fault",
standard:"ansi"},

{
name:"SIGUSR2",
number:12,
action:"terminate",
description:"Application-specific signal",
standard:"posix"},

{
name:"SIGPIPE",
number:13,
action:"terminate",
description:"Broken pipe or socket",
standard:"posix"},

{
name:"SIGALRM",
number:14,
action:"terminate",
description:"Timeout or timer",
standard:"posix"},

{
name:"SIGTERM",
number:15,
action:"terminate",
description:"Termination",
standard:"ansi"},

{
name:"SIGSTKFLT",
number:16,
action:"terminate",
description:"Stack is empty or overflowed",
standard:"other"},

{
name:"SIGCHLD",
number:17,
action:"ignore",
description:"Child process terminated, paused or unpaused",
standard:"posix"},

{
name:"SIGCLD",
number:17,
action:"ignore",
description:"Child process terminated, paused or unpaused",
standard:"other"},

{
name:"SIGCONT",
number:18,
action:"unpause",
description:"Unpaused",
standard:"posix",
forced:true},

{
name:"SIGSTOP",
number:19,
action:"pause",
description:"Paused",
standard:"posix",
forced:true},

{
name:"SIGTSTP",
number:20,
action:"pause",
description:"Paused using CTRL-Z or \"suspend\"",
standard:"posix"},

{
name:"SIGTTIN",
number:21,
action:"pause",
description:"Background process cannot read terminal input",
standard:"posix"},

{
name:"SIGBREAK",
number:21,
action:"terminate",
description:"User interruption with CTRL-BREAK",
standard:"other"},

{
name:"SIGTTOU",
number:22,
action:"pause",
description:"Background process cannot write to terminal output",
standard:"posix"},

{
name:"SIGURG",
number:23,
action:"ignore",
description:"Socket received out-of-band data",
standard:"bsd"},

{
name:"SIGXCPU",
number:24,
action:"core",
description:"Process timed out",
standard:"bsd"},

{
name:"SIGXFSZ",
number:25,
action:"core",
description:"File too big",
standard:"bsd"},

{
name:"SIGVTALRM",
number:26,
action:"terminate",
description:"Timeout or timer",
standard:"bsd"},

{
name:"SIGPROF",
number:27,
action:"terminate",
description:"Timeout or timer",
standard:"bsd"},

{
name:"SIGWINCH",
number:28,
action:"ignore",
description:"Terminal window size changed",
standard:"bsd"},

{
name:"SIGIO",
number:29,
action:"terminate",
description:"I/O is available",
standard:"other"},

{
name:"SIGPOLL",
number:29,
action:"terminate",
description:"Watched event",
standard:"other"},

{
name:"SIGINFO",
number:29,
action:"ignore",
description:"Request for process information",
standard:"other"},

{
name:"SIGPWR",
number:30,
action:"terminate",
description:"Device running out of power",
standard:"systemv"},

{
name:"SIGSYS",
number:31,
action:"core",
description:"Invalid system call",
standard:"other"},

{
name:"SIGUNUSED",
number:31,
action:"terminate",
description:"Invalid system call",
standard:"other"}];exports.SIGNALS=SIGNALS;

});

var realtime = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.SIGRTMAX=exports.getRealtimeSignals=void 0;
const getRealtimeSignals=function(){
const length=SIGRTMAX-SIGRTMIN+1;
return Array.from({length},getRealtimeSignal);
};exports.getRealtimeSignals=getRealtimeSignals;

const getRealtimeSignal=function(value,index){
return {
name:`SIGRT${index+1}`,
number:SIGRTMIN+index,
action:"terminate",
description:"Application-specific signal (realtime)",
standard:"posix"};

};

const SIGRTMIN=34;
const SIGRTMAX=64;exports.SIGRTMAX=SIGRTMAX;

});

var signals = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.getSignals=void 0;






const getSignals=function(){
const realtimeSignals=(0, realtime.getRealtimeSignals)();
const signals=[...core$1.SIGNALS,...realtimeSignals].map(normalizeSignal);
return signals;
};exports.getSignals=getSignals;







const normalizeSignal=function({
name,
number:defaultNumber,
description,
action,
forced=false,
standard})
{
const{
signals:{[name]:constantSignal}}=
os__default['default'].constants;
const supported=constantSignal!==undefined;
const number=supported?constantSignal:defaultNumber;
return {name,number,description,supported,action,forced,standard};
};

});

var main = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.signalsByNumber=exports.signalsByName=void 0;






const getSignalsByName=function(){
const signals$1=(0, signals.getSignals)();
return signals$1.reduce(getSignalByName,{});
};

const getSignalByName=function(
signalByNameMemo,
{name,number,description,supported,action,forced,standard})
{
return {
...signalByNameMemo,
[name]:{name,number,description,supported,action,forced,standard}};

};

const signalsByName=getSignalsByName();exports.signalsByName=signalsByName;




const getSignalsByNumber=function(){
const signals$1=(0, signals.getSignals)();
const length=realtime.SIGRTMAX+1;
const signalsA=Array.from({length},(value,number)=>
getSignalByNumber(number,signals$1));

return Object.assign({},...signalsA);
};

const getSignalByNumber=function(number,signals){
const signal=findSignalByNumber(number,signals);

if(signal===undefined){
return {};
}

const{name,description,supported,action,forced,standard}=signal;
return {
[number]:{
name,
number,
description,
supported,
action,
forced,
standard}};


};



const findSignalByNumber=function(number,signals){
const signal=signals.find(({name})=>os__default['default'].constants.signals[name]===number);

if(signal!==undefined){
return signal;
}

return signals.find(signalA=>signalA.number===number);
};

const signalsByNumber=getSignalsByNumber();exports.signalsByNumber=signalsByNumber;

});

const {signalsByName} = main;

const getErrorPrefix = ({timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled}) => {
	if (timedOut) {
		return `timed out after ${timeout} milliseconds`;
	}

	if (isCanceled) {
		return 'was canceled';
	}

	if (errorCode !== undefined) {
		return `failed with ${errorCode}`;
	}

	if (signal !== undefined) {
		return `was killed with ${signal} (${signalDescription})`;
	}

	if (exitCode !== undefined) {
		return `failed with exit code ${exitCode}`;
	}

	return 'failed';
};

const makeError = ({
	stdout,
	stderr,
	all,
	error,
	signal,
	exitCode,
	command,
	timedOut,
	isCanceled,
	killed,
	parsed: {options: {timeout}}
}) => {
	// `signal` and `exitCode` emitted on `spawned.on('exit')` event can be `null`.
	// We normalize them to `undefined`
	exitCode = exitCode === null ? undefined : exitCode;
	signal = signal === null ? undefined : signal;
	const signalDescription = signal === undefined ? undefined : signalsByName[signal].description;

	const errorCode = error && error.code;

	const prefix = getErrorPrefix({timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled});
	const execaMessage = `Command ${prefix}: ${command}`;
	const isError = Object.prototype.toString.call(error) === '[object Error]';
	const shortMessage = isError ? `${execaMessage}\n${error.message}` : execaMessage;
	const message = [shortMessage, stderr, stdout].filter(Boolean).join('\n');

	if (isError) {
		error.originalMessage = error.message;
		error.message = message;
	} else {
		error = new Error(message);
	}

	error.shortMessage = shortMessage;
	error.command = command;
	error.exitCode = exitCode;
	error.signal = signal;
	error.signalDescription = signalDescription;
	error.stdout = stdout;
	error.stderr = stderr;

	if (all !== undefined) {
		error.all = all;
	}

	if ('bufferedData' in error) {
		delete error.bufferedData;
	}

	error.failed = true;
	error.timedOut = Boolean(timedOut);
	error.isCanceled = isCanceled;
	error.killed = killed && !timedOut;

	return error;
};

var error = makeError;

const aliases = ['stdin', 'stdout', 'stderr'];

const hasAlias = opts => aliases.some(alias => opts[alias] !== undefined);

const normalizeStdio = opts => {
	if (!opts) {
		return;
	}

	const {stdio} = opts;

	if (stdio === undefined) {
		return aliases.map(alias => opts[alias]);
	}

	if (hasAlias(opts)) {
		throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${aliases.map(alias => `\`${alias}\``).join(', ')}`);
	}

	if (typeof stdio === 'string') {
		return stdio;
	}

	if (!Array.isArray(stdio)) {
		throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
	}

	const length = Math.max(stdio.length, aliases.length);
	return Array.from({length}, (value, index) => stdio[index]);
};

var stdio = normalizeStdio;

// `ipc` is pushed unless it is already present
var node = opts => {
	const stdio = normalizeStdio(opts);

	if (stdio === 'ipc') {
		return 'ipc';
	}

	if (stdio === undefined || typeof stdio === 'string') {
		return [stdio, stdio, stdio, 'ipc'];
	}

	if (stdio.includes('ipc')) {
		return stdio;
	}

	return [...stdio, 'ipc'];
};
stdio.node = node;

var signals$1 = createCommonjsModule(function (module) {
// This is not the set of all possible signals.
//
// It IS, however, the set of all signals that trigger
// an exit on either Linux or BSD systems.  Linux is a
// superset of the signal names supported on BSD, and
// the unknown signals just fail to register, so we can
// catch that easily enough.
//
// Don't bother with SIGKILL.  It's uncatchable, which
// means that we can't fire any callbacks anyway.
//
// If a user does happen to register a handler on a non-
// fatal signal like SIGWINCH or something, and then
// exit, it'll end up firing `process.emit('exit')`, so
// the handler will be fired anyway.
//
// SIGBUS, SIGFPE, SIGSEGV and SIGILL, when not raised
// artificially, inherently leave the process in a
// state from which it is not safe to try and enter JS
// listeners.
module.exports = [
  'SIGABRT',
  'SIGALRM',
  'SIGHUP',
  'SIGINT',
  'SIGTERM'
];

if (process.platform !== 'win32') {
  module.exports.push(
    'SIGVTALRM',
    'SIGXCPU',
    'SIGXFSZ',
    'SIGUSR2',
    'SIGTRAP',
    'SIGSYS',
    'SIGQUIT',
    'SIGIOT'
    // should detect profiler and enable/disable accordingly.
    // see #21
    // 'SIGPROF'
  );
}

if (process.platform === 'linux') {
  module.exports.push(
    'SIGIO',
    'SIGPOLL',
    'SIGPWR',
    'SIGSTKFLT',
    'SIGUNUSED'
  );
}
});

// Note: since nyc uses this module to output coverage, any lines
// that are in the direct sync flow of nyc's outputCoverage are
// ignored, since we can never get coverage for them.

var signals$2 = signals$1;
var isWin$2 = /^win/i.test(process.platform);

var EE = require$$1__default['default'];
/* istanbul ignore if */
if (typeof EE !== 'function') {
  EE = EE.EventEmitter;
}

var emitter;
if (process.__signal_exit_emitter__) {
  emitter = process.__signal_exit_emitter__;
} else {
  emitter = process.__signal_exit_emitter__ = new EE();
  emitter.count = 0;
  emitter.emitted = {};
}

// Because this emitter is a global, we have to check to see if a
// previous version of this library failed to enable infinite listeners.
// I know what you're about to say.  But literally everything about
// signal-exit is a compromise with evil.  Get used to it.
if (!emitter.infinite) {
  emitter.setMaxListeners(Infinity);
  emitter.infinite = true;
}

var signalExit = function (cb, opts) {
  assert__default['default'].equal(typeof cb, 'function', 'a callback must be provided for exit handler');

  if (loaded === false) {
    load();
  }

  var ev = 'exit';
  if (opts && opts.alwaysLast) {
    ev = 'afterexit';
  }

  var remove = function () {
    emitter.removeListener(ev, cb);
    if (emitter.listeners('exit').length === 0 &&
        emitter.listeners('afterexit').length === 0) {
      unload();
    }
  };
  emitter.on(ev, cb);

  return remove
};

var unload_1 = unload;
function unload () {
  if (!loaded) {
    return
  }
  loaded = false;

  signals$2.forEach(function (sig) {
    try {
      process.removeListener(sig, sigListeners[sig]);
    } catch (er) {}
  });
  process.emit = originalProcessEmit;
  process.reallyExit = originalProcessReallyExit;
  emitter.count -= 1;
}

function emit (event, code, signal) {
  if (emitter.emitted[event]) {
    return
  }
  emitter.emitted[event] = true;
  emitter.emit(event, code, signal);
}

// { <signal>: <listener fn>, ... }
var sigListeners = {};
signals$2.forEach(function (sig) {
  sigListeners[sig] = function listener () {
    // If there are no other listeners, an exit is coming!
    // Simplest way: remove us and then re-send the signal.
    // We know that this will kill the process, so we can
    // safely emit now.
    var listeners = process.listeners(sig);
    if (listeners.length === emitter.count) {
      unload();
      emit('exit', null, sig);
      /* istanbul ignore next */
      emit('afterexit', null, sig);
      /* istanbul ignore next */
      if (isWin$2 && sig === 'SIGHUP') {
        // "SIGHUP" throws an `ENOSYS` error on Windows,
        // so use a supported signal instead
        sig = 'SIGINT';
      }
      process.kill(process.pid, sig);
    }
  };
});

var signals_1 = function () {
  return signals$2
};

var load_1 = load;

var loaded = false;

function load () {
  if (loaded) {
    return
  }
  loaded = true;

  // This is the number of onSignalExit's that are in play.
  // It's important so that we can count the correct number of
  // listeners on signals, and don't wait for the other one to
  // handle it instead of us.
  emitter.count += 1;

  signals$2 = signals$2.filter(function (sig) {
    try {
      process.on(sig, sigListeners[sig]);
      return true
    } catch (er) {
      return false
    }
  });

  process.emit = processEmit;
  process.reallyExit = processReallyExit;
}

var originalProcessReallyExit = process.reallyExit;
function processReallyExit (code) {
  process.exitCode = code || 0;
  emit('exit', process.exitCode, null);
  /* istanbul ignore next */
  emit('afterexit', process.exitCode, null);
  /* istanbul ignore next */
  originalProcessReallyExit.call(process, process.exitCode);
}

var originalProcessEmit = process.emit;
function processEmit (ev, arg) {
  if (ev === 'exit') {
    if (arg !== undefined) {
      process.exitCode = arg;
    }
    var ret = originalProcessEmit.apply(this, arguments);
    emit('exit', process.exitCode, null);
    /* istanbul ignore next */
    emit('afterexit', process.exitCode, null);
    return ret
  } else {
    return originalProcessEmit.apply(this, arguments)
  }
}
signalExit.unload = unload_1;
signalExit.signals = signals_1;
signalExit.load = load_1;

const DEFAULT_FORCE_KILL_TIMEOUT = 1000 * 5;

// Monkey-patches `childProcess.kill()` to add `forceKillAfterTimeout` behavior
const spawnedKill = (kill, signal = 'SIGTERM', options = {}) => {
	const killResult = kill(signal);
	setKillTimeout(kill, signal, options, killResult);
	return killResult;
};

const setKillTimeout = (kill, signal, options, killResult) => {
	if (!shouldForceKill(signal, options, killResult)) {
		return;
	}

	const timeout = getForceKillAfterTimeout(options);
	const t = setTimeout(() => {
		kill('SIGKILL');
	}, timeout);

	// Guarded because there's no `.unref()` when `execa` is used in the renderer
	// process in Electron. This cannot be tested since we don't run tests in
	// Electron.
	// istanbul ignore else
	if (t.unref) {
		t.unref();
	}
};

const shouldForceKill = (signal, {forceKillAfterTimeout}, killResult) => {
	return isSigterm(signal) && forceKillAfterTimeout !== false && killResult;
};

const isSigterm = signal => {
	return signal === os__default['default'].constants.signals.SIGTERM ||
		(typeof signal === 'string' && signal.toUpperCase() === 'SIGTERM');
};

const getForceKillAfterTimeout = ({forceKillAfterTimeout = true}) => {
	if (forceKillAfterTimeout === true) {
		return DEFAULT_FORCE_KILL_TIMEOUT;
	}

	if (!Number.isFinite(forceKillAfterTimeout) || forceKillAfterTimeout < 0) {
		throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${forceKillAfterTimeout}\` (${typeof forceKillAfterTimeout})`);
	}

	return forceKillAfterTimeout;
};

// `childProcess.cancel()`
const spawnedCancel = (spawned, context) => {
	const killResult = spawned.kill();

	if (killResult) {
		context.isCanceled = true;
	}
};

const timeoutKill = (spawned, signal, reject) => {
	spawned.kill(signal);
	reject(Object.assign(new Error('Timed out'), {timedOut: true, signal}));
};

// `timeout` option handling
const setupTimeout = (spawned, {timeout, killSignal = 'SIGTERM'}, spawnedPromise) => {
	if (timeout === 0 || timeout === undefined) {
		return spawnedPromise;
	}

	if (!Number.isFinite(timeout) || timeout < 0) {
		throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
	}

	let timeoutId;
	const timeoutPromise = new Promise((resolve, reject) => {
		timeoutId = setTimeout(() => {
			timeoutKill(spawned, killSignal, reject);
		}, timeout);
	});

	const safeSpawnedPromise = spawnedPromise.finally(() => {
		clearTimeout(timeoutId);
	});

	return Promise.race([timeoutPromise, safeSpawnedPromise]);
};

// `cleanup` option handling
const setExitHandler = async (spawned, {cleanup, detached}, timedPromise) => {
	if (!cleanup || detached) {
		return timedPromise;
	}

	const removeExitHandler = signalExit(() => {
		spawned.kill();
	});

	return timedPromise.finally(() => {
		removeExitHandler();
	});
};

var kill = {
	spawnedKill,
	spawnedCancel,
	setupTimeout,
	setExitHandler
};

const isStream = stream =>
	stream !== null &&
	typeof stream === 'object' &&
	typeof stream.pipe === 'function';

isStream.writable = stream =>
	isStream(stream) &&
	stream.writable !== false &&
	typeof stream._write === 'function' &&
	typeof stream._writableState === 'object';

isStream.readable = stream =>
	isStream(stream) &&
	stream.readable !== false &&
	typeof stream._read === 'function' &&
	typeof stream._readableState === 'object';

isStream.duplex = stream =>
	isStream.writable(stream) &&
	isStream.readable(stream);

isStream.transform = stream =>
	isStream.duplex(stream) &&
	typeof stream._transform === 'function' &&
	typeof stream._transformState === 'object';

var isStream_1 = isStream;

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
var wrappy_1 = wrappy;
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k];
  });

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    var ret = fn.apply(this, args);
    var cb = args[args.length-1];
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k];
      });
    }
    return ret
  }
}

var once_1 = wrappy_1(once);
var strict = wrappy_1(onceStrict);

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  });

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  });
});

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true;
    return f.value = fn.apply(this, arguments)
  };
  f.called = false;
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true;
    return f.value = fn.apply(this, arguments)
  };
  var name = fn.name || 'Function wrapped with `once`';
  f.onceError = name + " shouldn't be called more than once";
  f.called = false;
  return f
}
once_1.strict = strict;

var noop = function() {};

var isRequest = function(stream) {
	return stream.setHeader && typeof stream.abort === 'function';
};

var isChildProcess = function(stream) {
	return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3
};

var eos = function(stream, opts, callback) {
	if (typeof opts === 'function') return eos(stream, null, opts);
	if (!opts) opts = {};

	callback = once_1(callback || noop);

	var ws = stream._writableState;
	var rs = stream._readableState;
	var readable = opts.readable || (opts.readable !== false && stream.readable);
	var writable = opts.writable || (opts.writable !== false && stream.writable);
	var cancelled = false;

	var onlegacyfinish = function() {
		if (!stream.writable) onfinish();
	};

	var onfinish = function() {
		writable = false;
		if (!readable) callback.call(stream);
	};

	var onend = function() {
		readable = false;
		if (!writable) callback.call(stream);
	};

	var onexit = function(exitCode) {
		callback.call(stream, exitCode ? new Error('exited with error code: ' + exitCode) : null);
	};

	var onerror = function(err) {
		callback.call(stream, err);
	};

	var onclose = function() {
		process.nextTick(onclosenexttick);
	};

	var onclosenexttick = function() {
		if (cancelled) return;
		if (readable && !(rs && (rs.ended && !rs.destroyed))) return callback.call(stream, new Error('premature close'));
		if (writable && !(ws && (ws.ended && !ws.destroyed))) return callback.call(stream, new Error('premature close'));
	};

	var onrequest = function() {
		stream.req.on('finish', onfinish);
	};

	if (isRequest(stream)) {
		stream.on('complete', onfinish);
		stream.on('abort', onclose);
		if (stream.req) onrequest();
		else stream.on('request', onrequest);
	} else if (writable && !ws) { // legacy streams
		stream.on('end', onlegacyfinish);
		stream.on('close', onlegacyfinish);
	}

	if (isChildProcess(stream)) stream.on('exit', onexit);

	stream.on('end', onend);
	stream.on('finish', onfinish);
	if (opts.error !== false) stream.on('error', onerror);
	stream.on('close', onclose);

	return function() {
		cancelled = true;
		stream.removeListener('complete', onfinish);
		stream.removeListener('abort', onclose);
		stream.removeListener('request', onrequest);
		if (stream.req) stream.req.removeListener('finish', onfinish);
		stream.removeListener('end', onlegacyfinish);
		stream.removeListener('close', onlegacyfinish);
		stream.removeListener('finish', onfinish);
		stream.removeListener('exit', onexit);
		stream.removeListener('end', onend);
		stream.removeListener('error', onerror);
		stream.removeListener('close', onclose);
	};
};

var endOfStream = eos;

// we only need fs to get the ReadStream and WriteStream prototypes

var noop$1 = function () {};
var ancient = /^v?\.0/.test(process.version);

var isFn = function (fn) {
  return typeof fn === 'function'
};

var isFS = function (stream) {
  if (!ancient) return false // newer node version do not need to care about fs is a special way
  if (!fs__default['default']) return false // browser
  return (stream instanceof (fs__default['default'].ReadStream || noop$1) || stream instanceof (fs__default['default'].WriteStream || noop$1)) && isFn(stream.close)
};

var isRequest$1 = function (stream) {
  return stream.setHeader && isFn(stream.abort)
};

var destroyer = function (stream, reading, writing, callback) {
  callback = once_1(callback);

  var closed = false;
  stream.on('close', function () {
    closed = true;
  });

  endOfStream(stream, {readable: reading, writable: writing}, function (err) {
    if (err) return callback(err)
    closed = true;
    callback();
  });

  var destroyed = false;
  return function (err) {
    if (closed) return
    if (destroyed) return
    destroyed = true;

    if (isFS(stream)) return stream.close(noop$1) // use close for fs streams to avoid fd leaks
    if (isRequest$1(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want

    if (isFn(stream.destroy)) return stream.destroy()

    callback(err || new Error('stream was destroyed'));
  }
};

var call = function (fn) {
  fn();
};

var pipe = function (from, to) {
  return from.pipe(to)
};

var pump = function () {
  var streams = Array.prototype.slice.call(arguments);
  var callback = isFn(streams[streams.length - 1] || noop$1) && streams.pop() || noop$1;

  if (Array.isArray(streams[0])) streams = streams[0];
  if (streams.length < 2) throw new Error('pump requires two streams per minimum')

  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return
      destroys.forEach(call);
      callback(error);
    })
  });

  return streams.reduce(pipe)
};

var pump_1 = pump;

const {PassThrough: PassThroughStream} = require$$0__default['default'];

var bufferStream = options => {
	options = {...options};

	const {array} = options;
	let {encoding} = options;
	const isBuffer = encoding === 'buffer';
	let objectMode = false;

	if (array) {
		objectMode = !(encoding || isBuffer);
	} else {
		encoding = encoding || 'utf8';
	}

	if (isBuffer) {
		encoding = null;
	}

	const stream = new PassThroughStream({objectMode});

	if (encoding) {
		stream.setEncoding(encoding);
	}

	let length = 0;
	const chunks = [];

	stream.on('data', chunk => {
		chunks.push(chunk);

		if (objectMode) {
			length = chunks.length;
		} else {
			length += chunk.length;
		}
	});

	stream.getBufferedValue = () => {
		if (array) {
			return chunks;
		}

		return isBuffer ? Buffer.concat(chunks, length) : chunks.join('');
	};

	stream.getBufferedLength = () => length;

	return stream;
};

const {constants: BufferConstants} = require$$0__default$1['default'];



class MaxBufferError extends Error {
	constructor() {
		super('maxBuffer exceeded');
		this.name = 'MaxBufferError';
	}
}

async function getStream(inputStream, options) {
	if (!inputStream) {
		return Promise.reject(new Error('Expected a stream'));
	}

	options = {
		maxBuffer: Infinity,
		...options
	};

	const {maxBuffer} = options;

	let stream;
	await new Promise((resolve, reject) => {
		const rejectPromise = error => {
			// Don't retrieve an oversized buffer.
			if (error && stream.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
				error.bufferedData = stream.getBufferedValue();
			}

			reject(error);
		};

		stream = pump_1(inputStream, bufferStream(options), error => {
			if (error) {
				rejectPromise(error);
				return;
			}

			resolve();
		});

		stream.on('data', () => {
			if (stream.getBufferedLength() > maxBuffer) {
				rejectPromise(new MaxBufferError());
			}
		});
	});

	return stream.getBufferedValue();
}

var getStream_1 = getStream;
// TODO: Remove this for the next major release
var _default$4 = getStream;
var buffer = (stream, options) => getStream(stream, {...options, encoding: 'buffer'});
var array = (stream, options) => getStream(stream, {...options, array: true});
var MaxBufferError_1 = MaxBufferError;
getStream_1.default = _default$4;
getStream_1.buffer = buffer;
getStream_1.array = array;
getStream_1.MaxBufferError = MaxBufferError_1;

const { PassThrough } = require$$0__default['default'];

var mergeStream = function (/*streams...*/) {
  var sources = [];
  var output  = new PassThrough({objectMode: true});

  output.setMaxListeners(0);

  output.add = add;
  output.isEmpty = isEmpty;

  output.on('unpipe', remove);

  Array.prototype.slice.call(arguments).forEach(add);

  return output

  function add (source) {
    if (Array.isArray(source)) {
      source.forEach(add);
      return this
    }

    sources.push(source);
    source.once('end', remove.bind(null, source));
    source.once('error', output.emit.bind(output, 'error'));
    source.pipe(output, {end: false});
    return this
  }

  function isEmpty () {
    return sources.length == 0;
  }

  function remove (source) {
    sources = sources.filter(function (it) { return it !== source });
    if (!sources.length && output.readable) { output.end(); }
  }
};

// `input` option
const handleInput = (spawned, input) => {
	// Checking for stdin is workaround for https://github.com/nodejs/node/issues/26852
	// TODO: Remove `|| spawned.stdin === undefined` once we drop support for Node.js <=12.2.0
	if (input === undefined || spawned.stdin === undefined) {
		return;
	}

	if (isStream_1(input)) {
		input.pipe(spawned.stdin);
	} else {
		spawned.stdin.end(input);
	}
};

// `all` interleaves `stdout` and `stderr`
const makeAllStream = (spawned, {all}) => {
	if (!all || (!spawned.stdout && !spawned.stderr)) {
		return;
	}

	const mixed = mergeStream();

	if (spawned.stdout) {
		mixed.add(spawned.stdout);
	}

	if (spawned.stderr) {
		mixed.add(spawned.stderr);
	}

	return mixed;
};

// On failure, `result.stdout|stderr|all` should contain the currently buffered stream
const getBufferedData = async (stream, streamPromise) => {
	if (!stream) {
		return;
	}

	stream.destroy();

	try {
		return await streamPromise;
	} catch (error) {
		return error.bufferedData;
	}
};

const getStreamPromise = (stream, {encoding, buffer, maxBuffer}) => {
	if (!stream || !buffer) {
		return;
	}

	if (encoding) {
		return getStream_1(stream, {encoding, maxBuffer});
	}

	return getStream_1.buffer(stream, {maxBuffer});
};

// Retrieve result of child process: exit code, signal, error, streams (stdout/stderr/all)
const getSpawnedResult = async ({stdout, stderr, all}, {encoding, buffer, maxBuffer}, processDone) => {
	const stdoutPromise = getStreamPromise(stdout, {encoding, buffer, maxBuffer});
	const stderrPromise = getStreamPromise(stderr, {encoding, buffer, maxBuffer});
	const allPromise = getStreamPromise(all, {encoding, buffer, maxBuffer: maxBuffer * 2});

	try {
		return await Promise.all([processDone, stdoutPromise, stderrPromise, allPromise]);
	} catch (error) {
		return Promise.all([
			{error, signal: error.signal, timedOut: error.timedOut},
			getBufferedData(stdout, stdoutPromise),
			getBufferedData(stderr, stderrPromise),
			getBufferedData(all, allPromise)
		]);
	}
};

const validateInputSync = ({input}) => {
	if (isStream_1(input)) {
		throw new TypeError('The `input` option cannot be a stream in sync mode');
	}
};

var stream = {
	handleInput,
	makeAllStream,
	getSpawnedResult,
	validateInputSync
};

const nativePromisePrototype = (async () => {})().constructor.prototype;
const descriptors = ['then', 'catch', 'finally'].map(property => [
	property,
	Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property)
]);

// The return value is a mixin of `childProcess` and `Promise`
const mergePromise = (spawned, promise) => {
	for (const [property, descriptor] of descriptors) {
		// Starting the main `promise` is deferred to avoid consuming streams
		const value = typeof promise === 'function' ?
			(...args) => Reflect.apply(descriptor.value, promise(), args) :
			descriptor.value.bind(promise);

		Reflect.defineProperty(spawned, property, {...descriptor, value});
	}

	return spawned;
};

// Use promises instead of `child_process` events
const getSpawnedPromise = spawned => {
	return new Promise((resolve, reject) => {
		spawned.on('exit', (exitCode, signal) => {
			resolve({exitCode, signal});
		});

		spawned.on('error', error => {
			reject(error);
		});

		if (spawned.stdin) {
			spawned.stdin.on('error', error => {
				reject(error);
			});
		}
	});
};

var promise = {
	mergePromise,
	getSpawnedPromise
};

const SPACES_REGEXP = / +/g;

const joinCommand = (file, args = []) => {
	if (!Array.isArray(args)) {
		return file;
	}

	return [file, ...args].join(' ');
};

// Handle `execa.command()`
const parseCommand = command => {
	const tokens = [];
	for (const token of command.trim().split(SPACES_REGEXP)) {
		// Allow spaces to be escaped by a backslash if not meant as a delimiter
		const previousToken = tokens[tokens.length - 1];
		if (previousToken && previousToken.endsWith('\\')) {
			// Merge previous token with current one
			tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}`;
		} else {
			tokens.push(token);
		}
	}

	return tokens;
};

var command$1 = {
	joinCommand,
	parseCommand
};

const {spawnedKill: spawnedKill$1, spawnedCancel: spawnedCancel$1, setupTimeout: setupTimeout$1, setExitHandler: setExitHandler$1} = kill;
const {handleInput: handleInput$1, getSpawnedResult: getSpawnedResult$1, makeAllStream: makeAllStream$1, validateInputSync: validateInputSync$1} = stream;
const {mergePromise: mergePromise$1, getSpawnedPromise: getSpawnedPromise$1} = promise;
const {joinCommand: joinCommand$1, parseCommand: parseCommand$1} = command$1;

const DEFAULT_MAX_BUFFER = 1000 * 1000 * 100;

const getEnv = ({env: envOption, extendEnv, preferLocal, localDir, execPath}) => {
	const env = extendEnv ? {...process.env, ...envOption} : envOption;

	if (preferLocal) {
		return npmRunPath_1.env({env, cwd: localDir, execPath});
	}

	return env;
};

const handleArguments = (file, args, options = {}) => {
	const parsed = crossSpawn._parse(file, args, options);
	file = parsed.command;
	args = parsed.args;
	options = parsed.options;

	options = {
		maxBuffer: DEFAULT_MAX_BUFFER,
		buffer: true,
		stripFinalNewline: true,
		extendEnv: true,
		preferLocal: false,
		localDir: options.cwd || process.cwd(),
		execPath: process.execPath,
		encoding: 'utf8',
		reject: true,
		cleanup: true,
		all: false,
		windowsHide: true,
		...options
	};

	options.env = getEnv(options);

	options.stdio = stdio(options);

	if (process.platform === 'win32' && path__default['default'].basename(file, '.exe') === 'cmd') {
		// #116
		args.unshift('/q');
	}

	return {file, args, options, parsed};
};

const handleOutput = (options, value, error) => {
	if (typeof value !== 'string' && !Buffer.isBuffer(value)) {
		// When `execa.sync()` errors, we normalize it to '' to mimic `execa()`
		return error === undefined ? undefined : '';
	}

	if (options.stripFinalNewline) {
		return stripFinalNewline(value);
	}

	return value;
};

const execa = (file, args, options) => {
	const parsed = handleArguments(file, args, options);
	const command = joinCommand$1(file, args);

	let spawned;
	try {
		spawned = childProcess__default['default'].spawn(parsed.file, parsed.args, parsed.options);
	} catch (error$1) {
		// Ensure the returned error is always both a promise and a child process
		const dummySpawned = new childProcess__default['default'].ChildProcess();
		const errorPromise = Promise.reject(error({
			error: error$1,
			stdout: '',
			stderr: '',
			all: '',
			command,
			parsed,
			timedOut: false,
			isCanceled: false,
			killed: false
		}));
		return mergePromise$1(dummySpawned, errorPromise);
	}

	const spawnedPromise = getSpawnedPromise$1(spawned);
	const timedPromise = setupTimeout$1(spawned, parsed.options, spawnedPromise);
	const processDone = setExitHandler$1(spawned, parsed.options, timedPromise);

	const context = {isCanceled: false};

	spawned.kill = spawnedKill$1.bind(null, spawned.kill.bind(spawned));
	spawned.cancel = spawnedCancel$1.bind(null, spawned, context);

	const handlePromise = async () => {
		const [{error: error$1, exitCode, signal, timedOut}, stdoutResult, stderrResult, allResult] = await getSpawnedResult$1(spawned, parsed.options, processDone);
		const stdout = handleOutput(parsed.options, stdoutResult);
		const stderr = handleOutput(parsed.options, stderrResult);
		const all = handleOutput(parsed.options, allResult);

		if (error$1 || exitCode !== 0 || signal !== null) {
			const returnedError = error({
				error: error$1,
				exitCode,
				signal,
				stdout,
				stderr,
				all,
				command,
				parsed,
				timedOut,
				isCanceled: context.isCanceled,
				killed: spawned.killed
			});

			if (!parsed.options.reject) {
				return returnedError;
			}

			throw returnedError;
		}

		return {
			command,
			exitCode: 0,
			stdout,
			stderr,
			all,
			failed: false,
			timedOut: false,
			isCanceled: false,
			killed: false
		};
	};

	const handlePromiseOnce = onetime_1(handlePromise);

	crossSpawn._enoent.hookChildProcess(spawned, parsed.parsed);

	handleInput$1(spawned, parsed.options.input);

	spawned.all = makeAllStream$1(spawned, parsed.options);

	return mergePromise$1(spawned, handlePromiseOnce);
};

var execa_1 = execa;

var sync$4 = (file, args, options) => {
	const parsed = handleArguments(file, args, options);
	const command = joinCommand$1(file, args);

	validateInputSync$1(parsed.options);

	let result;
	try {
		result = childProcess__default['default'].spawnSync(parsed.file, parsed.args, parsed.options);
	} catch (error$1) {
		throw error({
			error: error$1,
			stdout: '',
			stderr: '',
			all: '',
			command,
			parsed,
			timedOut: false,
			isCanceled: false,
			killed: false
		});
	}

	const stdout = handleOutput(parsed.options, result.stdout, result.error);
	const stderr = handleOutput(parsed.options, result.stderr, result.error);

	if (result.error || result.status !== 0 || result.signal !== null) {
		const error$1 = error({
			stdout,
			stderr,
			error: result.error,
			signal: result.signal,
			exitCode: result.status,
			command,
			parsed,
			timedOut: result.error && result.error.code === 'ETIMEDOUT',
			isCanceled: false,
			killed: result.signal !== null
		});

		if (!parsed.options.reject) {
			return error$1;
		}

		throw error$1;
	}

	return {
		command,
		exitCode: 0,
		stdout,
		stderr,
		failed: false,
		timedOut: false,
		isCanceled: false,
		killed: false
	};
};

var command$2 = (command, options) => {
	const [file, ...args] = parseCommand$1(command);
	return execa(file, args, options);
};

var commandSync = (command, options) => {
	const [file, ...args] = parseCommand$1(command);
	return execa.sync(file, args, options);
};

var node$1 = (scriptPath, args, options = {}) => {
	if (args && !Array.isArray(args) && typeof args === 'object') {
		options = args;
		args = [];
	}

	const stdio$1 = stdio.node(options);
	const defaultExecArgv = process.execArgv.filter(arg => !arg.startsWith('--inspect'));

	const {
		nodePath = process.execPath,
		nodeOptions = defaultExecArgv
	} = options;

	return execa(
		nodePath,
		[
			...nodeOptions,
			scriptPath,
			...(Array.isArray(args) ? args : [])
		],
		{
			...options,
			stdin: undefined,
			stdout: undefined,
			stderr: undefined,
			stdio: stdio$1,
			shell: false
		}
	);
};
execa_1.sync = sync$4;
execa_1.command = command$2;
execa_1.commandSync = commandSync;
execa_1.node = node$1;

let isDocker;

function hasDockerEnv() {
	try {
		fs__default['default'].statSync('/.dockerenv');
		return true;
	} catch (_) {
		return false;
	}
}

function hasDockerCGroup() {
	try {
		return fs__default['default'].readFileSync('/proc/self/cgroup', 'utf8').includes('docker');
	} catch (_) {
		return false;
	}
}

var isDocker_1 = () => {
	if (isDocker === undefined) {
		isDocker = hasDockerEnv() || hasDockerCGroup();
	}

	return isDocker;
};

var isWsl_1 = createCommonjsModule(function (module) {




const isWsl = () => {
	if (process.platform !== 'linux') {
		return false;
	}

	if (os__default['default'].release().toLowerCase().includes('microsoft')) {
		if (isDocker_1()) {
			return false;
		}

		return true;
	}

	try {
		return fs__default['default'].readFileSync('/proc/version', 'utf8').toLowerCase().includes('microsoft') ?
			!isDocker_1() : false;
	} catch (_) {
		return false;
	}
};

if (process.env.__IS_WSL_TEST__) {
	module.exports = isWsl;
} else {
	module.exports = isWsl();
}
});

const {promisify} = require$$0__default$2['default'];






const pAccess = promisify(fs__default['default'].access);
const pExecFile = promisify(childProcess__default['default'].execFile);

// Path to included `xdg-open`.
const localXdgOpenPath = path__default['default'].join(__dirname, 'xdg-open');

// Convert a path from WSL format to Windows format:
// `/mnt/c/Program Files/Example/MyApp.exe` → `C:\Program Files\Example\MyApp.exe`
const wslToWindowsPath = async path => {
	const {stdout} = await pExecFile('wslpath', ['-w', path]);
	return stdout.trim();
};

// Convert a path from Windows format to WSL format
const windowsToWslPath = async path => {
	const {stdout} = await pExecFile('wslpath', [path]);
	return stdout.trim();
};

// Get an environment variable from Windows
const wslGetWindowsEnvVar = async envVar => {
	const {stdout} = await pExecFile('wslvar', [envVar]);
	return stdout.trim();
};

var open = async (target, options) => {
	if (typeof target !== 'string') {
		throw new TypeError('Expected a `target`');
	}

	options = {
		wait: false,
		background: false,
		allowNonzeroExitCode: false,
		...options
	};

	let command;
	let {app} = options;
	let appArguments = [];
	const cliArguments = [];
	const childProcessOptions = {};

	if (Array.isArray(app)) {
		appArguments = app.slice(1);
		app = app[0];
	}

	if (process.platform === 'darwin') {
		command = 'open';

		if (options.wait) {
			cliArguments.push('--wait-apps');
		}

		if (options.background) {
			cliArguments.push('--background');
		}

		if (app) {
			cliArguments.push('-a', app);
		}
	} else if (process.platform === 'win32' || (isWsl_1 && !isDocker_1())) {
		const windowsRoot = isWsl_1 ? await wslGetWindowsEnvVar('systemroot') : process.env.SYSTEMROOT;
		command = String.raw`${windowsRoot}\System32\WindowsPowerShell\v1.0\powershell${isWsl_1 ? '.exe' : ''}`;
		cliArguments.push(
			'-NoProfile',
			'-NonInteractive',
			'–ExecutionPolicy',
			'Bypass',
			'-EncodedCommand'
		);

		if (isWsl_1) {
			command = await windowsToWslPath(command);
		} else {
			childProcessOptions.windowsVerbatimArguments = true;
		}

		const encodedArguments = ['Start'];

		if (options.wait) {
			encodedArguments.push('-Wait');
		}

		if (app) {
			if (isWsl_1 && app.startsWith('/mnt/')) {
				const windowsPath = await wslToWindowsPath(app);
				app = windowsPath;
			}

			// Double quote with double quotes to ensure the inner quotes are passed through.
			// Inner quotes are delimited for PowerShell interpretation with backticks.
			encodedArguments.push(`"\`"${app}\`""`, '-ArgumentList');
			appArguments.unshift(target);
		} else {
			encodedArguments.push(`"\`"${target}\`""`);
		}

		if (appArguments.length > 0) {
			appArguments = appArguments.map(arg => `"\`"${arg}\`""`);
			encodedArguments.push(appArguments.join(','));
		}

		// Using Base64-encoded command, accepted by PowerShell, to allow special characters.
		target = Buffer.from(encodedArguments.join(' '), 'utf16le').toString('base64');
	} else {
		if (app) {
			command = app;
		} else {
			// When bundled by Webpack, there's no actual package file path and no local `xdg-open`.
			const isBundled = !__dirname || __dirname === '/';

			// Check if local `xdg-open` exists and is executable.
			let exeLocalXdgOpen = false;
			try {
				await pAccess(localXdgOpenPath, fs__default['default'].constants.X_OK);
				exeLocalXdgOpen = true;
			} catch (_) {}

			const useSystemXdgOpen = process.versions.electron ||
				process.platform === 'android' || isBundled || !exeLocalXdgOpen;
			command = useSystemXdgOpen ? 'xdg-open' : localXdgOpenPath;
		}

		if (appArguments.length > 0) {
			cliArguments.push(...appArguments);
		}

		if (!options.wait) {
			// `xdg-open` will block the process unless stdio is ignored
			// and it's detached from the parent even if it's unref'd.
			childProcessOptions.stdio = 'ignore';
			childProcessOptions.detached = true;
		}
	}

	cliArguments.push(target);

	if (process.platform === 'darwin' && appArguments.length > 0) {
		cliArguments.push('--args', ...appArguments);
	}

	const subprocess = childProcess__default['default'].spawn(command, cliArguments, childProcessOptions);

	if (options.wait) {
		return new Promise((resolve, reject) => {
			subprocess.once('error', reject);

			subprocess.once('close', exitCode => {
				if (options.allowNonzeroExitCode && exitCode > 0) {
					reject(new Error(`Exited with code ${exitCode}`));
					return;
				}

				resolve(subprocess);
			});
		});
	}

	subprocess.unref();

	return subprocess;
};

function clearConsole(consolePanel) {
    try {
        consolePanel.clear();
    }
    catch (error) {
        if (getConfig('clearConsole')) {
            console.clear();
        }
    }
}
function detectOutfile(line) {
    if (line.includes('Output: "')) {
        var regex = /Output: "(.*\.exe)"\r?\n/g;
        var result = regex.exec(line.toString());
        return result[1];
    }
    return '';
}
function fileExists(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs.promises.access(filePath, fs.constants.F_OK)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/, true];
            }
        });
    });
}
function findEnvFile() {
    return __awaiter(this, void 0, void 0, function () {
        var envFile, projectPath, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    envFile = undefined;
                    projectPath = atom.project.getPaths()[0];
                    _a = true;
                    return [4 /*yield*/, fileExists(path.resolve(projectPath, '.env.local'))];
                case 1:
                    switch (_a) {
                        case (_c.sent()): return [3 /*break*/, 5];
                    }
                    _b = process.env.NODE_ENV;
                    if (!_b) return [3 /*break*/, 3];
                    return [4 /*yield*/, fileExists(path.resolve(projectPath, ".env.[" + process.env.NODE_ENV + "]"))];
                case 2:
                    _b = (_c.sent());
                    _c.label = 3;
                case 3:
                    switch (_a) {
                        case (_b): return [3 /*break*/, 6];
                    }
                    return [4 /*yield*/, fileExists(path.resolve(projectPath, '.env'))];
                case 4:
                    switch (_a) {
                        case (_c.sent()): return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 8];
                case 5:
                    envFile = path.resolve(projectPath, '.env.local');
                    return [3 /*break*/, 9];
                case 6:
                    envFile = path.resolve(projectPath, ".env.[" + process.env.NODE_ENV + "]");
                    return [3 /*break*/, 9];
                case 7:
                    envFile = path.resolve(projectPath, '.env');
                    return [3 /*break*/, 9];
                case 8:
                    envFile = undefined;
                    return [3 /*break*/, 9];
                case 9:
                    if (envFile)
                        console.log("Found DotEnv file " + envFile);
                    return [2 /*return*/, envFile];
            }
        });
    });
}
function getConfig(key) {
    return key
        ? atom.config.get("language-nsis." + key)
        : atom.config.get("language-nsis");
}
function getMakensisPath() {
    return __awaiter(this, void 0, void 0, function () {
        var pathToMakensis, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pathToMakensis = String(getConfig('pathToMakensis'));
                    if ((pathToMakensis === null || pathToMakensis === void 0 ? void 0 : pathToMakensis.length) && pathToMakensis !== 'makensis') {
                        return [2 /*return*/, pathToMakensis];
                    }
                    _a = String;
                    return [4 /*yield*/, which_1('makensis')];
                case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()]) || 'makensis'];
            }
        });
    });
}
function getPrefix() {
    return os.platform() === 'win32'
        ? '/'
        : '-';
}
function getSpawnEnv() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, initDotEnv()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, {
                            env: {
                                NSISDIR: process.env.NSISDIR || undefined,
                                NSISCONFDIR: process.env.NSISCONFDIR || undefined
                            }
                        }];
            }
        });
    });
}
function initDotEnv() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = config_1;
                    _b = {};
                    return [4 /*yield*/, findEnvFile()];
                case 1:
                    _a.apply(void 0, [(_b.path = _c.sent(),
                            _b)]);
                    return [2 /*return*/];
            }
        });
    });
}
function isHeaderFile(filePath) {
    var headerFiles = [
        '.bnsh',
        '.nsh'
    ];
    return Boolean(headerFiles.filter(function (fileExt) { return filePath === null || filePath === void 0 ? void 0 : filePath.endsWith(fileExt); }).length);
}
function isWindowsCompatible() {
    return os.platform() === 'win32' || getConfig('useWineToRun')
        ? true
        : false;
}
function manageDependencies() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lib$2.satisfyDependencies('language-nsis')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function notifyOnCompletion(type, outFile) {
    var notification = atom.notifications[type]('Compiled successfully', {
        dismissable: true,
        buttons: outFile ? [
            isWindowsCompatible() ? {
                text: 'Run',
                className: 'icon icon-playback-play',
                onDidClick: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, runInstaller(outFile)];
                                case 1:
                                    _a.sent();
                                    notification.dismiss();
                                    return [2 /*return*/];
                            }
                        });
                    });
                }
            } : undefined,
            {
                text: 'Reveal',
                className: 'icon icon-location',
                onDidClick: function () {
                    revealInstaller(outFile);
                    notification.dismiss();
                    return;
                }
            },
            {
                text: 'Cancel',
                onDidClick: function () {
                    notification.dismiss();
                    return;
                }
            }
        ].filter(function (item) { return item; }) : []
    });
}
function openURL(nsisCommand) {
    open("https://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Reference/" + nsisCommand + ".html?utm_source=atom&utm_content=reference", {
        url: true
    });
}
function revealInstaller(outFile) {
    if (fileExists(outFile)) {
        electron.shell.showItemInFolder(outFile);
    }
}
function runInstaller(outFile) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(os.platform() === 'win32')) return [3 /*break*/, 1];
                    try {
                        childProcess.exec("cmd /c \"" + outFile + "\"");
                    }
                    catch (error) {
                        console.error(error);
                        atom.notifications.addWarning('Failed to run installer, see console for details', {
                            dismissable: true
                        });
                    }
                    return [2 /*return*/];
                case 1:
                    if (!(getConfig('useWineToRun') === true)) return [3 /*break*/, 5];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, execa_1('wine', [outFile])];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    atom.notifications.addWarning('Failed to run installer, see console for details', {
                        dismissable: true
                    });
                    console.error(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}

var makensis = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });




/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var Afrikaans = {
	id: 1078,
	code_page: 1252,
	rtl: false,
	english: "Afrikaans",
	native: "Afrikaans",
	native_ascii: "Afrikaans"
};
var Albanian = {
	id: 1052,
	code_page: 1250,
	rtl: false,
	english: "Albanian",
	native: "Shqip",
	native_ascii: "Shqip"
};
var Arabic = {
	id: 1025,
	code_page: 1256,
	rtl: true,
	english: "Arabic",
	native: "العربية",
	native_ascii: "Al-Arabiyyah"
};
var Armenian = {
	id: 1067,
	code_page: 1200,
	rtl: false,
	english: "Armenian",
	native: "Հայերեն",
	native_ascii: "Hayeren"
};
var Asturian = {
	id: 9997,
	code_page: 1252,
	rtl: false,
	english: "Asturian",
	native: "Asturies",
	native_ascii: "Asturies"
};
var Basque = {
	id: 1069,
	code_page: 1252,
	rtl: false,
	english: "Basque",
	native: "Euskera",
	native_ascii: "Euskera"
};
var Belarusian = {
	id: 1059,
	code_page: 1251,
	rtl: false,
	english: "Belarusian",
	native: "Беларуская",
	native_ascii: "Bielaruskaja"
};
var Bosnian = {
	id: 5146,
	code_page: 1250,
	rtl: false,
	english: "Bosnian",
	native: "Bosanski",
	native_ascii: "Bosanski"
};
var Breton = {
	id: 1150,
	code_page: 1252,
	rtl: false,
	english: "Breton",
	native: "Brezhoneg",
	native_ascii: "Brezhoneg"
};
var Bulgarian = {
	id: 1026,
	code_page: 1251,
	rtl: false,
	english: "Bulgarian",
	native: "Български",
	native_ascii: "Balgarski"
};
var Catalan = {
	id: 1027,
	code_page: 1252,
	rtl: false,
	english: "Catalan",
	native: "Català",
	native_ascii: "Catala"
};
var Corsican = {
	id: 1155,
	code_page: 1252,
	rtl: false,
	english: "Corsican",
	native: "Corsu",
	native_ascii: "Corsu"
};
var Croatian = {
	id: 1050,
	code_page: 1250,
	rtl: false,
	english: "Croatian",
	native: "Hrvatski",
	native_ascii: "Hrvatski"
};
var Czech = {
	id: 1029,
	code_page: 1250,
	rtl: false,
	english: "Czech",
	native: "Čeština",
	native_ascii: "Cestina"
};
var Danish = {
	id: 1030,
	code_page: 1252,
	rtl: false,
	english: "Danish",
	native: "Dansk",
	native_ascii: "Dansk"
};
var Dutch = {
	id: 1043,
	code_page: 1252,
	rtl: false,
	english: "Dutch",
	native: "Nederlands",
	native_ascii: "Nederlands"
};
var English = {
	id: 1033,
	code_page: null,
	rtl: false,
	english: "English",
	native: "English",
	native_ascii: "English"
};
var Esperanto = {
	id: 9998,
	code_page: null,
	rtl: false,
	english: "Esperanto",
	native: "Esperanto",
	native_ascii: "Esperanto"
};
var Estonian = {
	id: 1061,
	code_page: 1257,
	rtl: false,
	english: "Estonian",
	native: "Eesti keel",
	native_ascii: "Eesti keel"
};
var Farsi = {
	id: 1065,
	code_page: 1256,
	rtl: true,
	english: "Persian",
	native: "فارسی",
	native_ascii: "Farsi"
};
var Finnish = {
	id: 1035,
	code_page: 1252,
	rtl: false,
	english: "Finnish",
	native: "Suomi",
	native_ascii: "Suomi"
};
var French = {
	id: 1036,
	code_page: 1252,
	rtl: false,
	english: "French",
	native: "Français",
	native_ascii: "Francais"
};
var Galician = {
	id: 1110,
	code_page: 1252,
	rtl: false,
	english: "Galician",
	native: "Galego",
	native_ascii: "Galego"
};
var Georgian = {
	id: 1079,
	code_page: 1200,
	rtl: false,
	english: "Georgian",
	native: "ქართული",
	native_ascii: "Kartuli"
};
var German = {
	id: 1031,
	code_page: 1252,
	rtl: false,
	english: "German",
	native: "Deutsch",
	native_ascii: "Deutsch"
};
var Greek = {
	id: 1032,
	code_page: 1253,
	rtl: false,
	english: "Greek",
	native: "Ελληνικά",
	native_ascii: "Ellinika"
};
var Hebrew = {
	id: 1037,
	code_page: 1255,
	rtl: true,
	english: "Hebrew",
	native: "עברית",
	native_ascii: "Ivrit"
};
var Hindi = {
	id: 1081,
	code_page: 1200,
	rtl: false,
	english: "Hindi",
	native: "हिन्दी",
	native_ascii: "Hindi"
};
var Hungarian = {
	id: 1038,
	code_page: 1250,
	rtl: false,
	english: "Hungarian",
	native: "Magyar",
	native_ascii: "Magyar"
};
var Icelandic = {
	id: 1039,
	code_page: 1252,
	rtl: false,
	english: "Icelandic",
	native: "Íslenska",
	native_ascii: "Islenska"
};
var Indonesian = {
	id: 1057,
	code_page: 1252,
	rtl: false,
	english: "Indonesian",
	native: "Bahasa Indonesia",
	native_ascii: "Bahasa Indonesia"
};
var Irish = {
	id: 2108,
	code_page: 1252,
	rtl: false,
	english: "Irish",
	native: "Gaeilge",
	native_ascii: "Gaeilge"
};
var Italian = {
	id: 1040,
	code_page: 1252,
	rtl: false,
	english: "Italian",
	native: "Italiano",
	native_ascii: "Italiano"
};
var Japanese = {
	id: 1041,
	code_page: 932,
	rtl: false,
	english: "Japanese",
	native: "日本語",
	native_ascii: "Nihongo"
};
var Korean = {
	id: 1042,
	code_page: 949,
	rtl: false,
	english: "Korean",
	native: "한국어",
	native_ascii: "Hangugeo"
};
var Kurdish = {
	id: 9999,
	code_page: 1254,
	rtl: false,
	english: "Kurdish",
	native: "Kurdî",
	native_ascii: "Kurdi"
};
var Latvian = {
	id: 1062,
	code_page: 1257,
	rtl: false,
	english: "Latvian",
	native: "Latviešu",
	native_ascii: "Latviesu"
};
var Lithuanian = {
	id: 1063,
	code_page: 1257,
	rtl: false,
	english: "Lithuanian",
	native: "Lietuvių",
	native_ascii: "Lietuviu"
};
var Luxembourgish = {
	id: 4103,
	code_page: 1252,
	rtl: false,
	english: "Luxembourgish",
	native: "Lëtzebuergesch",
	native_ascii: "Letzebuergesch"
};
var Macedonian = {
	id: 1071,
	code_page: 1251,
	rtl: false,
	english: "Macedonian",
	native: "Македонски",
	native_ascii: "Makedonski"
};
var Malay = {
	id: 1086,
	code_page: 1252,
	rtl: false,
	english: "Malay",
	native: "Bahasa Melayu",
	native_ascii: "Bahasa Melayu"
};
var Mongolian = {
	id: 1104,
	code_page: 1251,
	rtl: false,
	english: "Mongolian (Cyrillic)",
	native: "Монгол Кирилл",
	native_ascii: "Mongol kirill"
};
var Norwegian = {
	id: 1044,
	code_page: 1252,
	rtl: false,
	english: "Norwegian",
	native: "Norsk",
	native_ascii: "Norsk"
};
var NorwegianNynorsk = {
	id: 2068,
	code_page: 1252,
	rtl: false,
	english: "Norwegian (Nynorsk)",
	native: "Norsk (nynorsk)",
	native_ascii: "Norsk (nynorsk)"
};
var Pashto = {
	id: 1123,
	code_page: 1256,
	rtl: true,
	english: "Pashto",
	native: "پښتو",
	native_ascii: "Pashto"
};
var Polish = {
	id: 1045,
	code_page: 1250,
	rtl: false,
	english: "Polish",
	native: "Polski",
	native_ascii: "Polski"
};
var Portuguese = {
	id: 2070,
	code_page: 1252,
	rtl: false,
	english: "Portuguese",
	native: "Português",
	native_ascii: "Portugues"
};
var PortugueseBR = {
	id: 1046,
	code_page: 1252,
	rtl: false,
	english: "Brazilian Portuguese",
	native: "Português Brasileiro",
	native_ascii: "Portugues Brasileiro"
};
var Romanian = {
	id: 1048,
	code_page: 1250,
	rtl: false,
	english: "Romanian",
	native: "Română",
	native_ascii: "Romana"
};
var Russian = {
	id: 1049,
	code_page: 1251,
	rtl: false,
	english: "Russian",
	native: "Русский",
	native_ascii: "Russkij"
};
var ScotsGaelic = {
	id: 1169,
	code_page: 1252,
	rtl: false,
	english: "Scottish Gaelic",
	native: "Gàidhlig",
	native_ascii: "Gaidhlig"
};
var Serbian = {
	id: 3098,
	code_page: 1251,
	rtl: false,
	english: "Serbian (Cyrillic)",
	native: "Српски",
	native_ascii: "Srpski (Cyrillic)"
};
var SerbianLatin = {
	id: 2074,
	code_page: 1250,
	rtl: false,
	english: "Serbian (Latin)",
	native: "Srpski",
	native_ascii: "Srpski"
};
var SimpChinese = {
	id: 2052,
	code_page: 936,
	rtl: false,
	english: "Chinese (Simplified)",
	native: "中文(简体)",
	native_ascii: "Hanyu (Jiantizi)"
};
var Slovak = {
	id: 1051,
	code_page: 1250,
	rtl: false,
	english: "Slovak",
	native: "Slovenčina",
	native_ascii: "Slovencina"
};
var Slovenian = {
	id: 1060,
	code_page: 1250,
	rtl: false,
	english: "Slovenian",
	native: "Slovenski",
	native_ascii: "Slovenski"
};
var Spanish = {
	id: 1034,
	code_page: 1252,
	rtl: false,
	english: "Spanish",
	native: "Español",
	native_ascii: "Espanol"
};
var SpanishInternational = {
	id: 3082,
	code_page: 1252,
	rtl: false,
	english: "Spanish (International)",
	native: "Español (Alfabetización Internacional)",
	native_ascii: "Espanol (Alfabetizacion Internacional)"
};
var Swedish = {
	id: 1053,
	code_page: 1252,
	rtl: false,
	english: "Swedish",
	native: "Svenska",
	native_ascii: "Svenska"
};
var Tatar = {
	id: 1092,
	code_page: 1251,
	rtl: false,
	english: "Tatar",
	native: "Татарча",
	native_ascii: "Tatarcha"
};
var Thai = {
	id: 1054,
	code_page: 874,
	rtl: false,
	english: "Thai",
	native: "ไทย",
	native_ascii: "Thai"
};
var TradChinese = {
	id: 1028,
	code_page: 950,
	rtl: false,
	english: "Chinese (Traditional)",
	native: "中文(繁體)",
	native_ascii: "Hanyu (Fantizi)"
};
var Turkish = {
	id: 1055,
	code_page: 1254,
	rtl: false,
	english: "Turkish",
	native: "Türkçe",
	native_ascii: "Turkce"
};
var Ukrainian = {
	id: 1058,
	code_page: 1251,
	rtl: false,
	english: "Ukrainian",
	native: "Українська",
	native_ascii: "Ukrayins'ka"
};
var Uzbek = {
	id: 1091,
	code_page: 1252,
	rtl: false,
	english: "Uzbek",
	native: "O‘zbek",
	native_ascii: "O'zbek"
};
var Vietnamese = {
	id: 1066,
	code_page: 1258,
	rtl: false,
	english: "Vietnamese",
	native: "Tiếng Việt",
	native_ascii: "Tieng Viet"
};
var Welsh = {
	id: 1106,
	code_page: 1252,
	rtl: false,
	english: "Welsh",
	native: "Cymraeg",
	native_ascii: "Cymraeg"
};
var meta = {
	Afrikaans: Afrikaans,
	Albanian: Albanian,
	Arabic: Arabic,
	Armenian: Armenian,
	Asturian: Asturian,
	Basque: Basque,
	Belarusian: Belarusian,
	Bosnian: Bosnian,
	Breton: Breton,
	Bulgarian: Bulgarian,
	Catalan: Catalan,
	Corsican: Corsican,
	Croatian: Croatian,
	Czech: Czech,
	Danish: Danish,
	Dutch: Dutch,
	English: English,
	Esperanto: Esperanto,
	Estonian: Estonian,
	Farsi: Farsi,
	Finnish: Finnish,
	French: French,
	Galician: Galician,
	Georgian: Georgian,
	German: German,
	Greek: Greek,
	Hebrew: Hebrew,
	Hindi: Hindi,
	Hungarian: Hungarian,
	Icelandic: Icelandic,
	Indonesian: Indonesian,
	Irish: Irish,
	Italian: Italian,
	Japanese: Japanese,
	Korean: Korean,
	Kurdish: Kurdish,
	Latvian: Latvian,
	Lithuanian: Lithuanian,
	Luxembourgish: Luxembourgish,
	Macedonian: Macedonian,
	Malay: Malay,
	Mongolian: Mongolian,
	Norwegian: Norwegian,
	NorwegianNynorsk: NorwegianNynorsk,
	Pashto: Pashto,
	Polish: Polish,
	Portuguese: Portuguese,
	PortugueseBR: PortugueseBR,
	Romanian: Romanian,
	Russian: Russian,
	ScotsGaelic: ScotsGaelic,
	Serbian: Serbian,
	SerbianLatin: SerbianLatin,
	SimpChinese: SimpChinese,
	Slovak: Slovak,
	Slovenian: Slovenian,
	Spanish: Spanish,
	SpanishInternational: SpanishInternational,
	Swedish: Swedish,
	Tatar: Tatar,
	Thai: Thai,
	TradChinese: TradChinese,
	Turkish: Turkish,
	Ukrainian: Ukrainian,
	Uzbek: Uzbek,
	Vietnamese: Vietnamese,
	Welsh: Welsh
};

var header = "NLF v6";
var id = 1078;
var font = {
	name: null,
	size: null
};
var code_page = 1252;
var rtl = false;
var strings = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) Installasie",
	UninstallCaption: "$(^Name) Verwydering",
	LicenseSubCaption: ": Lisensie-ooreenkoms",
	ComponentsSubCaption: ": Installasiekeuses",
	DirSubCaption: ": Installasiegids",
	InstallingSubCaption: ": Installeer tans",
	CompletedSubCaption: ": Voltooid",
	UnComponentsSubCaption: ": Verwyderingkeuses",
	UnDirSubCaption: ": Verwyderinggids",
	ConfirmSubCaption: ": Bevestiging",
	UninstallingSubCaption: ": Verwyder tans",
	UnCompletedSubCaption: ": Voltooid",
	BackBtn: "< V&orige",
	NextBtn: "&Volgende >",
	AgreeBtn: "&Regso",
	AcceptBtn: "Ek &aanvaar die ooreenkoms",
	DontAcceptBtn: "Ek aan vaar &nie die ooreenkoms nie",
	InstallBtn: "&Installeer",
	UninstallBtn: "&Verwyder",
	CancelBtn: "Kanselleer",
	CloseBtn: "&Sluit af",
	BrowseBtn: "&Blaai...",
	ShowDetailsBtn: "&Wys detail",
	ClickNext: "Klik op Volgende om verder te gaan.",
	ClickInstall: "Klik op Installeer om die installasie te begin.",
	ClickUninstall: "Klik op Verwyder om die verwydering te begin.",
	Name: "Naam",
	Completed: "Voltooid",
	LicenseText: "Lees die lisensieooreenkoms voordat u $(^NameDA) installeer. Klik op Regso as u die ooreenkoms aanvaar.",
	LicenseTextCB: "Lees die lisensieooreenkoms voordat u $(^NameDA) installeer. Merk die blokkie hieronder as u die ooreenkoms aanvaar. $_CLICK",
	LicenseTextRB: "Lees die lisensieooreenkoms voordat u $(^NameDA) installeer. Kies die eerste keuse hieronder as u die ooreenkoms aanvaar. $_CLICK",
	UnLicenseText: "Lees die lisensieooreenkoms voordat u $(^NameDA) verwyder. Klik op Regso als u die ooreenkoms aanvaar.",
	UnLicenseTextCB: "Lees die lisensieooreenkoms voordat u $(^NameDA) verwyder. Merk die blokkie hieronder as u die ooreenkoms aanvaar. $_CLICK",
	UnLicenseTextRB: "Lees die lisensieooreenkoms voordat u $(^NameDA) verwyder. KIes die eerste keuse hieronder as u die ooreenkoms aanvaar. $_CLICK",
	Custom: "Aangepast",
	ComponentsText: "Kies die komponente wat u wil installeer en deselekteer dié wat u nie wil installeer nie. $_CLICK",
	ComponentsSubText1: "Kies die installasietipe:",
	ComponentsSubText2_NoInstTypes: "Kies die komponente wat geïnstalleer moet word:",
	ComponentsSubText2: "Of kies die komponente wat geïnstalleer moet word:",
	UnComponentsText: "Kies die komponente wat u wil verwyder en deselekteer dié wat u nie wil verwyder nie. $_CLICK",
	UnComponentsSubText1: "Kies die verwyderingstipe:",
	UnComponentsSubText2_NoInstTypes: "Kies die komponente wat verwyder moet word:",
	UnComponentsSubText2: "Of kies die komponente wat verwyder moet word:",
	DirText: "$(^NameDA) sal in die volgende gids geïnstalleer word. Om elders te installeer, klik op Blaai en kies 'n ander een. $_CLICK",
	DirSubText: "Installasiegids",
	DirBrowseText: "Kies die gids om $(^NameDA) in te installeer:",
	UnDirText: "$(^NameDA) gaan uit die volgende gids verwyder word. Om van elders af te verwyder, klik op Blaai en kies 'n ander gids. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Kies die gids om $(^NameDA) uit te verwyder:",
	SpaceAvailable: "\"Beskikbare spasie: \"",
	SpaceRequired: "\"Vereiste spasie: \"",
	UninstallingText: "$(^NameDA) sal uit die volgende gids verwyder word. $_CLICK",
	UninstallingSubText: "Verwydering uit:",
	FileError: "Fout met skryf na lêer: \\r\\n\\r\\n$0\\r\\n\\r\\nKlik Staak om de installasie te stop,\\r\\nProbeer weer om weer te probeer of\\r\\nIgnoreer om dié lêer oor te slaan.",
	FileError_NoIgnore: "Fout met skryf na lêer: \\r\\n\\r\\n$0\\r\\n\\r\\nKlik Probeer weer om op nuut te probeer, of \\r\\nKanselleer om die installasie te stop.",
	CantWrite: "\"Kon nie skyf nie: \"",
	CopyFailed: "Kopiëring het misluk",
	CopyTo: "\"Kopieer na \"",
	Registering: "\"Registreer tans: \"",
	Unregistering: "\"Deregistreer tans: \"",
	SymbolNotFound: "\"Kon nie simbool vind nie: \"",
	CouldNotLoad: "\"Kon nie laai nie: \"",
	CreateFolder: "\"Skep gids: \"",
	CreateShortcut: "\"Maak kortpad: \"",
	CreatedUninstaller: "\"Verwyderingsprogram gemaak: \"",
	Delete: "\"Verwyder lêer: \"",
	DeleteOnReboot: "\"Verwyder na herbegin van rekenaar: \"",
	ErrorCreatingShortcut: "\"Fout met maak van kortpad: \"",
	ErrorCreating: "\"Fout met skep: \"",
	ErrorDecompressing: "Fout met uitpak van data! Korrupte installasielêer?",
	ErrorRegistering: "Fout met registrasie van DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Voer uit: \"",
	Extract: "\"Pak uit: \"",
	ErrorWriting: "\"Uitpak: fout met skryf na lêer \"",
	InvalidOpcode: "Installasieprogram korrup: ongeldige opcode",
	NoOLE: "\"Geen OLE vir: \"",
	OutputFolder: "\"Afvoergids: \"",
	RemoveFolder: "\"Verwyder gids: \"",
	RenameOnReboot: "\"Hernoem na herbegin van rekenaar: \"",
	Rename: "\"Hernoem: \"",
	Skipped: "\"Oorgeslaan: \"",
	CopyDetails: "Kopieer detail na knipbord",
	LogInstall: "Boekstaaf die installasieproses",
	Byte: "G",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Afrikaans$1 = {
	header: header,
	id: id,
	font: font,
	code_page: code_page,
	rtl: rtl,
	strings: strings
};

var header$1 = "NLF v6";
var id$1 = 1052;
var font$1 = {
	name: null,
	size: null
};
var code_page$1 = 1250;
var rtl$1 = false;
var strings$1 = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Rregullimi i $(^Name)",
	UninstallCaption: "Çinstalimi i $(^Name)",
	LicenseSubCaption: ": Marrëveshje Licence",
	ComponentsSubCaption: ": Mundësi Instalimi",
	DirSubCaption: ": Dosje Instalimi",
	InstallingSubCaption: ": Po instalohet",
	CompletedSubCaption: ": U plotësua",
	UnComponentsSubCaption: ": Mundësi Çinstalimi",
	UnDirSubCaption: ": Dosje Çinstalimi",
	ConfirmSubCaption: ": Ripohim",
	UninstallingSubCaption: ": Po çinstalohet",
	UnCompletedSubCaption: ": U plotësua",
	BackBtn: "< &Mbrapsht",
	NextBtn: "&Tjetri >",
	AgreeBtn: "&Pajtohem",
	AcceptBtn: "&I pranoj kushtet e Marrëveshjes së Licensës",
	DontAcceptBtn: "&Nuk i pranoj kushtet e Marrëveshjes së Licensës",
	InstallBtn: "&Instaloje",
	UninstallBtn: "&Çinstaloje",
	CancelBtn: "Anuloje",
	CloseBtn: "&Mbylle",
	BrowseBtn: "Sh&fletoni...",
	ShowDetailsBtn: "Shfaq &hollësi",
	ClickNext: "Klikoni Tjetri për të vazhduar.",
	ClickInstall: "Për të filluar instalimin klikoni Instaloje.",
	ClickUninstall: "Për të filluar çinstalimin klikoni Çinstaloje.",
	Name: "Emër",
	Completed: "U plotësua",
	LicenseText: "Ju lutem, para instalimit të $(^NameDA), shqyrtoni marrëveshjen e licencës. Nëse i pranoni tërë kushtet e marrëveshjes, klikoni Pajtohem.",
	LicenseTextCB: "Ju lutem, para instalimit të $(^NameDA), shqyrtoni marrëveshjen e licensës. Nëse i pranoni tërë kushtet e marrëveshjes, klikoni kutizën më poshtë. $_CLICK",
	LicenseTextRB: "Ju lutem, para instalimit të $(^NameDA), shqyrtoni marrëveshjen e licensës. Nëse i pranoni tërë kushtet e marrëveshjes, përzgjidhni mundësinë e parë më poshtë. $_CLICK",
	UnLicenseText: "Ju lutem, para çinstalimit të $(^NameDA), shqyrtoni marrëveshjen e licensës. Nëse i pranoni tërë kushtet e marrëveshjes, klikoni Pajtohem.",
	UnLicenseTextCB: "Ju lutem, para çinstalimit të $(^NameDA), shqyrtoni marrëveshjen e licensës. Nëse i pranoni tërë kushtet e marrëveshjes, klikoni kutizën më poshtë. $_CLICK",
	UnLicenseTextRB: "Ju lutem, para çinstalimit të $(^NameDA), shqyrtoni marrëveshjen e licensës. Nëse i pranoni tërë kushtet e marrëveshjes, përzgjidhni mundësinë e parë më poshtë. $_CLICK",
	Custom: "Vetjake",
	ComponentsText: "U vini shenjë përbërësve që doni të instalohen dhe hiquani shenjën  përbërësvet që nuk doni të instalohen. $_CLICK",
	ComponentsSubText1: "Përzgjidhni llojin e instalimit:",
	ComponentsSubText2_NoInstTypes: "Përzgjidhni përbërësit për instalim:",
	ComponentsSubText2: "Ose, përzgjidhni përbërësit e mundshëm që doni të instalohen:",
	UnComponentsText: "U vini shenjë përbërësve që doni të çinstalohen dhe hiquni shenjën përbërësve që nuk doni të çinstalohen. $_CLICK",
	UnComponentsSubText1: "Përzgjidhni llojin e çinstalimit:",
	UnComponentsSubText2_NoInstTypes: "Përzgjidhni përbërësit për çinstalim:",
	UnComponentsSubText2: "Ose, përzgjidhni përbërësit e mundshëm që doni të çinstalohen:",
	DirText: "Rregullimi do ta instalojë $(^NameDA) në dosjen vijuese. Për instalim në një dosje tjetër, klikoni Shfletoni dhe përzgjidhni një tjetër dosje. $_CLICK",
	DirSubText: "Dosje Vendmbërritje",
	DirBrowseText: "Përzgjidhni dosjen ku të instalohet $(^NameDA):",
	UnDirText: "Rregullimi do të çinstalojë $(^NameDA) prej dosjes vijuese. Për çinstalim prej një dosjeje tjetër, klikoni Shfletoni dhe përzgjidhni një tjetër dosje. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Përzgjidhni dosjen prej nga ku të çinstalohet $(^NameDA):",
	SpaceAvailable: "\"Hapësirë e mundshme: \"",
	SpaceRequired: "\"Hapësirë e nevojshme: \"",
	UninstallingText: "$(^NameDA) do të çinstalohet prej dosjes vijuese. $_CLICK",
	UninstallingSubText: "Po çinstalohet prej:",
	FileError: "Gabim në hapje kartele për shkrim: \\r\\n\\r\\n$0\\r\\n\\r\\nKlikoni Ndërprite për të ndalur instalimin,\\r\\nRiprovo për të provuar sërish, ose\\r\\nShpërfille për të sanashkaluar këtë kartelë.",
	FileError_NoIgnore: "Gabim në hapje kartele për shkrim: \\r\\n\\r\\n$0\\r\\n\\r\\nKlikoni Riprovo për të provuar sërish, ose\\r\\nAnulo për të ndalur instalimin.",
	CantWrite: "\"S'shkruaj dot: \"",
	CopyFailed: "Kopjimi dështoi",
	CopyTo: "\"Kopjo tek \"",
	Registering: "\"Regjistrim: \"",
	Unregistering: "\"Çregjistrim: \"",
	SymbolNotFound: "\"S'u gjet dot simbol: \"",
	CouldNotLoad: "\"S'u ngarkua dot: \"",
	CreateFolder: "\"Krijo dosje: \"",
	CreateShortcut: "\"Krijo shkurtore: \"",
	CreatedUninstaller: "\"Krijo çinstalues: \"",
	Delete: "\"Fshi kartelë: \"",
	DeleteOnReboot: "\"Fshi gjatë rinisjes: \"",
	ErrorCreatingShortcut: "\"Gabim në krijim shkurtoresh: \"",
	ErrorCreating: "\"Gabim në krijimin e: \"",
	ErrorDecompressing: "Gabim në çngjeshje të dhënash! Instalues i dëmtuar?",
	ErrorRegistering: "Gabim në regjistrim DLL-je",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Ekzekuto: \"",
	Extract: "\"Përfto: \"",
	ErrorWriting: "\"Përftim: gabim në shkrim te kartela \"",
	InvalidOpcode: "Instalues i dëmtuar: opcode i pavlefshëm",
	NoOLE: "\"Pa OLE për: \"",
	OutputFolder: "\"Dosje përfundimesh: \"",
	RemoveFolder: "\"Hiq dosjen: \"",
	RenameOnReboot: "\"Riemërtoje gjatë rinisjes: \"",
	Rename: "\"Riemërtoje: \"",
	Skipped: "\"U anashkalua: \"",
	CopyDetails: "Kopjo Hollësira Te Clipboard",
	LogInstall: "Regjistro procesin e instalimit",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Albanian$1 = {
	header: header$1,
	id: id$1,
	font: font$1,
	code_page: code_page$1,
	rtl: rtl$1,
	strings: strings$1
};

var header$2 = "NLF v6";
var id$2 = 1025;
var font$2 = {
	name: null,
	size: null
};
var code_page$2 = 1256;
var rtl$2 = true;
var strings$2 = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "تنصيب $(^Name)",
	UninstallCaption: "إزالة $(^Name)",
	LicenseSubCaption: "إتفاقية‏ الترخيص :",
	ComponentsSubCaption: "خيارات التنصيب :",
	DirSubCaption: "مجلد التنصيب :",
	InstallingSubCaption: "تنصيب :",
	CompletedSubCaption: "إنتهى :",
	UnComponentsSubCaption: "خيارات الإزالة :",
	UnDirSubCaption: "مجلد الإزالة :",
	ConfirmSubCaption: "تأكيد :",
	UninstallingSubCaption: "إزالة :",
	UnCompletedSubCaption: "إنتهى :",
	BackBtn: "< ال&سابق",
	NextBtn: "ال&تالي >",
	AgreeBtn: "موافق&",
	AcceptBtn: "&أوافق على شروط اتفاقية الترخيص",
	DontAcceptBtn: "&لا أوافق على شروط اتفاقية الترخيص",
	InstallBtn: "&تنصيب",
	UninstallBtn: "&إزالة",
	CancelBtn: "إلغاء",
	CloseBtn: "إ&غلاق",
	BrowseBtn: "&عرض...",
	ShowDetailsBtn: "إ&ظهار التفاصيل",
	ClickNext: "إضغط على التالي للمتابعة.",
	ClickInstall: "إضغط على تنصيب لتشغيل التنصيب.",
	ClickUninstall: "إضغط على إزالة لتشغيل الإزالة.",
	Name: "الإسم",
	Completed: "إنتهى",
	LicenseText: "الرجاء مراجعة إتفاقية الترخيص قبل تنصيب $(^NameDA). عند الموافقة على جميع شروط الإتفاقية، إضغط موافق.",
	LicenseTextCB: "الرجاء مراجعة إتفاقية الترخيص قبل تنصيب $(^NameDA). عند الموافقة على جميع شروط الإتفاقية، إضغط على مربع المؤشر التالي. $_CLICK.",
	LicenseTextRB: "الرجاء مراجعة إتفاقية الترخيص قبل تنصيب $(^NameDA). عند الموافقة على جميع شروط الإتفاقية، إختر الخيار الأول التالي. $_CLICK",
	UnLicenseText: "الرجاء مراجعة إتفاقية الترخيص قبل إزالة $(^NameDA). عند الموافقة على جميع شروط الإتفاقية، إضغط موافق.",
	UnLicenseTextCB: "الرجاء مراجعة إتفاقية الترخيص قبل إزالة $(^NameDA). عند الموافقة على جميع شروط الإتفاقية، اضغط على مربع المؤشر التالي. $_CLICK",
	UnLicenseTextRB: "الرجاء مراجعة إتفاقية الترخيص قبل إزالة $(^NameDA). عند الموافقة على جميع شروط الإتفاقية، إختر الخيار الأول التالي. $_CLICK",
	Custom: "إختياري",
	ComponentsText: "علّم المكونات المراد تنصيبها وإزل العلامة عن المكونات الغير مراد تنصيبها. $_CLICK",
	ComponentsSubText1: "إختر نوع التنصيب:",
	ComponentsSubText2_NoInstTypes: "إختر المكونات للتنصيب:",
	ComponentsSubText2: "أو، قم بإختيار المكونات الإختيارية المراد تنصيبها:",
	UnComponentsText: "علّم المكونات المراد إزالتها وأزل العلامة عن المكونات الغير مراد إزالتها. $_CLICK",
	UnComponentsSubText1: "إختر نوع الإزالة:",
	UnComponentsSubText2_NoInstTypes: "إختر المكونات للإزالة:",
	UnComponentsSubText2: "أو، إختر المكونات الإختيارية المراد إزالتها:",
	DirText: "سيتم تنصيب $(^NameDA) في المجلد التالي. للتنصيب في مجلد آخر، إضغط عرض وإختر مجلد آخر. $_CLICK",
	DirSubText: "مجلد الهدف",
	DirBrowseText: "إختر المجلد لتنصيب $(^NameDA) فيه:",
	UnDirText: "سيتم إزالة $(^NameDA) من المجلد التالي. للإزالة من مجلد آخر، إضغط عرض وأختر مجلد آخر. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "إختر المجلد لإزالة $(^NameDA) منه:",
	SpaceAvailable: "\"المساحة المتوفرة: \"",
	SpaceRequired: "\"المساحة المطلوبة: \"",
	UninstallingText: "سيتم إزالة $(^NameDA) من المجلد التالي. $_CLICK",
	UninstallingSubText: "إزالة من:",
	FileError: "حدث خلل أثناء فتح ملف للكتابة: \\r\\n\\t\\\"$0\\\"\\r\\nإضغط إلغاء لإلغاء التنصيب،\\r\\nمحاولة لإعادة محاولة كتابة الملف،\\r\\n تجاهل لتخطي الملف",
	FileError_NoIgnore: "حدث خلل أثناء فتح ملف للكتابة: \\r\\n\\t\\\"$0\\\"\\r\\nإضغط محاولة لإعادة محاولة كتابة الملف، أو\\r\\nإلغاء لإلغاء التنصيب",
	CantWrite: "\"لا يستطيع الكتابة: \"",
	CopyFailed: "فشل النسخ",
	CopyTo: "\"نسخ إلى\"",
	Registering: "\"تسجيل: \"",
	Unregistering: "\"إلغاء تسجيل: \"",
	SymbolNotFound: "\"لم يتمكن من إيجاد الرمز :\"",
	CouldNotLoad: "\"لم يتمكن من تحميل :\"",
	CreateFolder: "\"إنشاء مجلد\"",
	CreateShortcut: "\"إنشاء إختصار: \"",
	CreatedUninstaller: "\"إنشاء مزيل: \"",
	Delete: "\"حذف ملف: \"",
	DeleteOnReboot: "\"حذف بعد إعادة التشغيل: \"",
	ErrorCreatingShortcut: "\"خلل أثناء إنشاء إختصار: \"",
	ErrorCreating: "\"خلل أثناء إنشاء :\"",
	ErrorDecompressing: "خلل أثناء فتح البيانات المضغوطة! منصب تالف؟",
	ErrorRegistering: "خلل أثناء تسجيل DLL",
	ExecShell: "\"تنفيذ ExecShell:\"",
	Exec: "\"تنفيذ: \"",
	Extract: "\"إستخراج: \"",
	ErrorWriting: "\"إستخراج: خلل أثناء الكتابة إلى ملف \"",
	InvalidOpcode: "المنصّب تالف: شفرة غير صالحة",
	NoOLE: "\"لا توجد OLE لـِ: \"",
	OutputFolder: "\"مجلد الإخراج: \"",
	RemoveFolder: "\"إزالة مجلد: \"",
	RenameOnReboot: "\"إعادة تسمية بعد إعادة التشغيل: \"",
	Rename: "\"إعادة تسمية: \"",
	Skipped: "\"تخطى: \"",
	CopyDetails: "نسخ التفاصيل إلى الذاكرة",
	LogInstall: "سجّل عملية التنصيب",
	Byte: "بايت",
	Kilo: " كيلو",
	Mega: " ميغا",
	Giga: " جيغا"
};
var Arabic$1 = {
	header: header$2,
	id: id$2,
	font: font$2,
	code_page: code_page$2,
	rtl: rtl$2,
	strings: strings$2
};

var header$3 = "NLF v6";
var id$3 = 1067;
var font$3 = {
	name: null,
	size: null
};
var code_page$3 = 1200;
var rtl$3 = false;
var strings$3 = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Տեղակայել $(^Name)-ը",
	UninstallCaption: "Ջնջել $(^Name)-ը",
	LicenseSubCaption: ": Արտոնագրային համաձայնություն",
	ComponentsSubCaption: ": Տեղակայելու ընտրանքները",
	DirSubCaption: ": Տեղակայելու թղթապանակը",
	InstallingSubCaption: ": Ֆայլերը պատճենվում են",
	CompletedSubCaption: ": Գործողությունը ավարտվեց",
	UnComponentsSubCaption: ": Տեղակայելու ընտրությունը",
	UnDirSubCaption: ": Ջնջվող թղթապանակը",
	ConfirmSubCaption: ": Հաստատեք",
	UninstallingSubCaption: ": Ֆայլերը ջնջվում են",
	UnCompletedSubCaption: ": Գործողությունը ավարտվեց",
	BackBtn: "« &Նախորդը",
	NextBtn: "&Հաջորդը »",
	AgreeBtn: "Համաձայն& եմ",
	AcceptBtn: "Ես &ընդունում եմ համաձայնագրի պայմանները",
	DontAcceptBtn: "Ես &չեմ ընդունում համաձայնագրի պայմանները",
	InstallBtn: "&Տեղակայել",
	UninstallBtn: "Ջն&ջել",
	CancelBtn: "Չեղարկել",
	CloseBtn: "&Փակել",
	BrowseBtn: "Դ&իտել ...",
	ShowDetailsBtn: "&Մանրամասն...",
	ClickNext: "Շարունակելու համար սեղմեք 'Առաջ'։",
	ClickInstall: "Տեղակայելու համար սեղմեք 'Տեղակայել'։",
	ClickUninstall: "Ծրագիրը ջնջելու համար սեղմեք 'Ջնջել'։",
	Name: "Անունը",
	Completed: "Պատրաստ է",
	LicenseText: "$(^NameDA)-ը տեղակայելուց առաջ ծանոթացեք արտոնագրային համաձայնությանը։ Եթե ընդունում եք այն՝ սեղմեք 'Համաձայն եմ'։",
	LicenseTextCB: "$(^NameDA)-ը տեղակայելուց առաջ ծանոթացեք արտոնագրային համաձայնությանը։ Եթե ընդունում եք այն՝ դրեք նիշը ներքևում։ $_CLICK",
	LicenseTextRB: "$(^NameDA)-ը տեղակայելուց առաջ ծանոթացեք արտոնագրային համաձայնությանը։ Եթե ընդունում եք այն՝ ընտրեք ներքոնշյալներից առաջինը։ $_CLICK",
	UnLicenseText: "$(^NameDA)-ը ջնջելուց առաջ ծանոթացեք արտոնագրային համաձայնությանը։ Եթե ընդունում եք այն՝ սեղմեք 'Համաձայն եմ'։",
	UnLicenseTextCB: "$(^NameDA)-ը ջնջելուց առաջ ծանոթացեք արտոնագրային համաձայնությանը։ Եթե ընդունում եք այն՝ դրեք նիշը ներքևում։ $_CLICK",
	UnLicenseTextRB: "$(^NameDA)-ը ջնջելուց առաջ ծանոթացեք արտոնագրային համաձայնությանը։ Եթե ընդունում եք այն՝ ընտրեք ներքոնշյալներից առաջինը։ $_CLICK",
	Custom: "Հարմարեցված",
	ComponentsText: "Ընտրեք այն բաղադրիչները, որոնք ցանկանում եք տեղակայել։ $_CLICK",
	ComponentsSubText1: "Ընտրեք տեղակայելու եղանակը.",
	ComponentsSubText2_NoInstTypes: "Տեղակայելու համար ընտրեք բաղադրիչները.",
	ComponentsSubText2: "կամ ընտրեք լրացուցիչ բաղադրիչներ.",
	UnComponentsText: "Ջնջելու համար ընտրեք բաղադրիչները։ $_CLICK",
	UnComponentsSubText1: "Ընտրեք ջնջելու եղանակը.",
	UnComponentsSubText2_NoInstTypes: "Ընտրեք ջնջելու բաղադրիչները.",
	UnComponentsSubText2: "կամ ջնջելու համար ընտրեք լրացուցիչ բաղադրիչներ։",
	DirText: "Ծրագիրը կտեղակայի $(^NameDA)-ը նշված թղթապանակում։ Այլ թղթապանակում տեղակայելու համար սեղմեք 'Ընտրել' և ընտրեք այն։ $_CLICK",
	DirSubText: "Տեղակայելու թղթապանկը",
	DirBrowseText: "Նշեք $(^NameDA)-ի տեղակայելու թղթապանակը.",
	UnDirText: "Ծրագիրը կջնջի $(^NameDA)-ը նշված թղթապանակից։ Այլ թղթապանակից ջնջելու համար սեղմեք 'Ընտրել' և ընտրեք այն։ $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Ընտրեք թղթապանակը, որից պետք է ջնջել $(^NameDA)-ը.",
	SpaceAvailable: "\"Հասանելի է. \"",
	SpaceRequired: "\"Պահանջվում է. \"",
	UninstallingText: "$(^NameDA) ծրագիրը կջնջվի Ձեր համակարգչից։ $_CLICK",
	UninstallingSubText: "Ջնջվում է՝",
	FileError: "Հնարավոր չէ բացել ֆայլը՝ գրանցելու համար։ \\r\\n\\t\"$0\"\\r\\n'Դադարեցնել'՝ ընդհատել տեղակայումը,\\r\\n\"Կրկնել\"՝ կրկին փորձել,\\r\\n\"Բաց թողնել\"՝ բաց թողնել գործողությունը։",
	FileError_NoIgnore: "Հնարավոր չէ բացել ֆայլը՝ գրանցելու համար։ \\r\\n\\t\"$0\"\\r\\n'Կրկնել'՝ կրկին փորձել,\\r\\n'Դադարեցնել'՝ ընդհատել տեղակայումը։",
	CantWrite: "\"Հնարավոր չէ գրանցել \"",
	CopyFailed: "Սխալ՝ պատճենելու ժամանակ",
	CopyTo: "\"Պատճենել՝ \"",
	Registering: "\"Գրանցում. \"",
	Unregistering: "\"Վերագրանցում. \"",
	SymbolNotFound: "\"Հնարավոր չէ գտնել՝ \"",
	CouldNotLoad: "\"Հնարավոր չէ բացել. \"",
	CreateFolder: "\"Ստեղծվում է թղթապանակ \"",
	CreateShortcut: "\"Ստեղծվում են պիտակներ.\"",
	CreatedUninstaller: "\"Ստեղծվում ջնջման ծրագիրը. \"",
	Delete: "\"Ֆայլերի ջնջում. \"",
	DeleteOnReboot: "\"Կջնջվի վերագործարկելուց հետո. \"",
	ErrorCreatingShortcut: "\"Սխալ՝ պիտակը ստեղծելիս. \" ",
	ErrorCreating: "\"Սխալ. \"",
	ErrorDecompressing: "Սխալ՝ տվյալները բացելու ժամանակ։",
	ErrorRegistering: "Հնարավոր չէ գրանցել գրադարանը(DLL)",
	ExecShell: "\"Ֆայլի կիրառում. \" ",
	Exec: "\"Կատարվում է. \"",
	Extract: "\"Հանում է. \"",
	ErrorWriting: "\"Ֆայլերը գրելու սխալ. \"",
	InvalidOpcode: "Տեղակայիչը վնասված է.",
	NoOLE: "\"Չկա OLE՝\" ",
	OutputFolder: "\"Տեղակայելու թղթապանակը. \"",
	RemoveFolder: "\"Թղթապանակի ջնջում. \"",
	RenameOnReboot: "\"Կանվանափոխվի վերագործարկելուց հետո. \"",
	Rename: "\"Անվանափոխում. \"",
	Skipped: "\"Բաց թողնած. \"",
	CopyDetails: "Պատճենել տվյալները ",
	LogInstall: "Տեղակայման հաշվետվություն",
	Byte: "բայթ",
	Kilo: " Կ",
	Mega: " Մ",
	Giga: " Գ"
};
var Armenian$1 = {
	header: header$3,
	id: id$3,
	font: font$3,
	code_page: code_page$3,
	rtl: rtl$3,
	strings: strings$3
};

var header$4 = "NLF v6";
var id$4 = 9997;
var font$4 = {
	name: null,
	size: null
};
var code_page$4 = 1252;
var rtl$4 = false;
var strings$4 = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Instalación de $(^Name)",
	UninstallCaption: "Desinstalación de $(^Name)",
	LicenseSubCaption: ": Alcuerdu de Llicencia",
	ComponentsSubCaption: ": Opciones d'Instalación",
	DirSubCaption: ": Direutoriu d'Instalación",
	InstallingSubCaption: ": Instalando",
	CompletedSubCaption: ": Completáu",
	UnComponentsSubCaption: ": Opciones de Desinstalación",
	UnDirSubCaption: ": Direutoriu de Desinstalación",
	ConfirmSubCaption: ": Confirmación",
	UninstallingSubCaption: ": Desinstalando",
	UnCompletedSubCaption: ": Completáu",
	BackBtn: "< &Atrás",
	NextBtn: "&Siguiente >",
	AgreeBtn: "A&ceuto",
	AcceptBtn: "A&ceuto los términos de la llicencia",
	DontAcceptBtn: "&Non aceuto los términos de la llicencia",
	InstallBtn: "&Instalar",
	UninstallBtn: "&Desinstalar",
	CancelBtn: "Encaboxar",
	CloseBtn: "&Zarrar",
	BrowseBtn: "&Restolar...",
	ShowDetailsBtn: "Ver &detalles",
	ClickNext: "Calca Siguiente pa siguir.",
	ClickInstall: "Calca Instalar pa entamar la instalación.",
	ClickUninstall: "Calca Desinstalar pa entamar la desinstalación.",
	Name: "Nome",
	Completed: "Completáu",
	LicenseText: "Por favor, revisa l'acuerdu de llicencia enantes d'instalar $(^NameDA). Si aceutes tolos términos del alcuerdu, calca Aceuto.",
	LicenseTextCB: "Por favor, revisa l'alcuerdu de llicencia enantes d'instalar $(^NameDA). Si aceutes tolos términos del alcuerdu, marca embaxo la caxella. $_CLICK",
	LicenseTextRB: "Por favor, revisa l'alcuerdu de llicencia enantes d'instalar $(^NameDA). Si aceutes tolos términos del alcuerdu, seleiciona embaxo la primer opción. $_CLICK",
	UnLicenseText: "Por favor, revisa l'alcuerdu de llicencia enantes de desinstalar $(^NameDA). Si aceutes tolos términos del alcuerdu, calca Aceuto.",
	UnLicenseTextCB: "Por favor, revisa l'alcuerdu de llicencia enantes de desinstalar $(^NameDA). Si aceutes tolos términos del alcuerdu, marca embaxo la caxella. $_CLICK.",
	UnLicenseTextRB: "Por favor, revisa l'alcuerdu de llicencia enantes de desinstalar $(^NameDA). Si aceutes tolos términos del alcuerdu, seleiciona embaxo la primer opción. $_CLICK",
	Custom: "Personalizada",
	ComponentsText: "Conseña los componentes que deseyes instalar y desconseña los componentes que nun quies instalar. $_CLICK",
	ComponentsSubText1: "Tipos d'instalación:",
	ComponentsSubText2_NoInstTypes: "Seleiciona los componentes a instalar:",
	ComponentsSubText2: "O selecciona los componentes opcionales que deseyes instalar:",
	UnComponentsText: "Conseña los componentes que deseyes desinstalar y desconseña los componentes que nun quieras desinstalar. $_CLICK",
	UnComponentsSubText1: "Tipos de desinstalación:",
	UnComponentsSubText2_NoInstTypes: "Seleiciona los componentes a desinstalar:",
	UnComponentsSubText2: "O seleiciona los componentes opcionales que deseyes desinstalar:",
	DirText: "El programa d'instalación instalará $(^NameDA) nel siguiente direutoriu. Pa instalar nun direutoriu distintu, calca Restolar y seleiciona otru direutoriu. $_CLICK",
	DirSubText: "Direutoriu de Destín",
	DirBrowseText: "Seleiciona'l direutoriu nel qu'instalará $(^NameDA):",
	UnDirText: "El programa d'instalación desinstalará $(^NameDA) del siguiente direutoriu. Pa desinstalar d'un direutoriu distintu, calca Restolar y seleiciona otru direutoriu. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Seleiciona'l direutoriu dende'l cual desinstalará $(^NameDA):",
	SpaceAvailable: "Espaciu disponible: ",
	SpaceRequired: "Espaciu requeríu: ",
	UninstallingText: "$(^NameDA) sedrá desinstaláu del siguiente direutoriu. $_CLICK",
	UninstallingSubText: "Desinstalando dende:",
	FileError: "Error abriendo ficheru pa escritura: \\r\\n\\t\"$0\"\\r\\nCalca albortar p'anular la instalación,\\r\\nreintentar pa volver a intentar escribir el ficheru, u\\r\\nomitir pa inorar esti ficheru",
	FileError_NoIgnore: "Error abriendo ficheru pa escritura: \\r\\n\\t\"$0\"\\r\\nCalca reintentar pa volver a intentar escribir el ficheru, o\\r\\nencaboxar p'anular la instalación",
	CantWrite: "\"Nun pudo escribise: \"",
	CopyFailed: "Falló la copia",
	CopyTo: "\"Copiar a \"",
	Registering: "\"Rexistrando: \"",
	Unregistering: "\"Desaniciando rexistru: \"",
	SymbolNotFound: "\"Nun pudo atopase símbolu: \"",
	CouldNotLoad: "\"Nun pudo cargase: \"",
	CreateFolder: "\"Criar direutoriu: \"",
	CreateShortcut: "\"Criar accesu direutu: \"",
	CreatedUninstaller: "\"Criar desinstalador: \"",
	Delete: "\"Desaniciar ficheru: \"",
	DeleteOnReboot: "\"Desaniciar al reaniciu: \"",
	ErrorCreatingShortcut: "\"Fallu criando accesu direutu: \"",
	ErrorCreating: "\"Fallu criando: \"",
	ErrorDecompressing: "¡Error descomprimiendo datos! ¿Instalador corruptu?",
	ErrorRegistering: "Fallu rexistrando DLL",
	ExecShell: "\"Executar comandu: \"",
	Exec: "\"Executar: \"",
	Extract: "\"Estrayer: \"",
	ErrorWriting: "\"Extrayer: fallu escribiendo al ficheru \"",
	InvalidOpcode: "Instalador corruptu: códigu d'operación non válidu",
	NoOLE: "\"Ensin OLE pa: \"",
	OutputFolder: "\"Direutoriu de salida: \"",
	RemoveFolder: "\"Desaniciar direutoriu: \"",
	RenameOnReboot: "\"Renomar al reaniciu: \"",
	Rename: "\"Renomar: \"",
	Skipped: "\"Omitíu: \"",
	CopyDetails: "Copiar Detalles al Cartafueyu",
	LogInstall: "Rexistrar procesu d'instalación ",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Asturian$1 = {
	header: header$4,
	id: id$4,
	font: font$4,
	code_page: code_page$4,
	rtl: rtl$4,
	strings: strings$4
};

var header$5 = "NLF v6";
var id$5 = 1069;
var font$5 = {
	name: null,
	size: null
};
var code_page$5 = 1252;
var rtl$5 = false;
var strings$5 = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) -ren Instalazioa",
	UninstallCaption: "$(^Name) -ren Ezabaketa",
	LicenseSubCaption: ": Lizentzia hitzarmen agiria",
	ComponentsSubCaption: ": Instalazio aukerak",
	DirSubCaption: ": Instalazio karpeta",
	InstallingSubCaption: ": Instalatzen",
	CompletedSubCaption: ": Instalazioa burututa",
	UnComponentsSubCaption: ": Ezabaketa aukerak",
	UnDirSubCaption: ": Ezabaketa direktorioa",
	ConfirmSubCaption: ": Berretsi ezabaketa",
	UninstallingSubCaption: ": Ezabatzen",
	UnCompletedSubCaption: ": Ezabaketa burututa",
	BackBtn: "< &Atzera",
	NextBtn: "&Aurrera >",
	AgreeBtn: "Onartu",
	AcceptBtn: "Lizentzia hitzarmenaren baldintzak onartzen ditut.",
	DontAcceptBtn: "Ez ditut lizentzia hitzarmenaren baldintzak onartzen.",
	InstallBtn: "&Instalatu",
	UninstallBtn: "&Ezabatu",
	CancelBtn: "Ezeztatu",
	CloseBtn: "&Itxi",
	BrowseBtn: "&Arakatu...",
	ShowDetailsBtn: "Ikusi &zehaztasunak",
	ClickNext: "Sakatu Aurrera jarraitzeko.",
	ClickInstall: "Sakatu Instalatu instalazioarekin hasteko.",
	ClickUninstall: "Sakatu Ezabatu ezabaketarekin hasteko.",
	Name: "Izena",
	Completed: "Osatuta",
	LicenseText: "Mesedez, aztertu lizentzia hitzarmena $(^NameDA) instalatu aurretik. Baldintza guztiak onartzen badituzu, sakatu Onartu.",
	LicenseTextCB: "Mesedez, aztertu lizentzia hitzarmena $(^NameDA) instalatu aurretik. Baldintza guztiak onartzen badituzu, nabarmendu azpiko laukitxoa. $_CLICK",
	LicenseTextRB: "Mesedez, aztertu lizentzia hitzarmena $(^NameDA) instalatu aurretik. Baldintza guztiak onartzen badituzu, hautatu azpian lehen aukera. $_CLICK",
	UnLicenseText: "Mesedez, aztertu lizentzia hitzarmena $(^NameDA) ezabatu aurretik. Baldintza guztiak onartzen badituzu, sakatu Onartu.",
	UnLicenseTextCB: "Mesedez, aztertu lizentzia hitzarmena $(^NameDA) ezabatu aurretik. Baldintza guztiak onartzen badituzu, nabarmendu azpiko laukitxoa. $_CLICK.",
	UnLicenseTextRB: "Mesedez, aztertu lizentzia hitzarmena $(^NameDA) ezabatu aurretik. Baldintza guztiak onartzen badituzu, hautatu azpian lehen aukera. $_CLICK",
	Custom: "Norberaren nahien arabera",
	ComponentsText: "Nabarmendu instalatu nahi diren osagaiak, eta utzi zuri instalatu nahi ez direnak. $_CLICK",
	ComponentsSubText1: "Hautatu instalazio mota:",
	ComponentsSubText2_NoInstTypes: "Hautatu instalatu beharreko osagaiak:",
	ComponentsSubText2: "Edo hautatu instalatu beharreko aukerazko osagaiak:",
	UnComponentsText: "Nabarmendu ezabatu nahi diren osagaiak, eta utzi zuri ezabatu nahi ez direnak. $_CLICK",
	UnComponentsSubText1: "Hautatu ezabaketa mota:",
	UnComponentsSubText2_NoInstTypes: "Hautatu ezabatu beharreko osagaiak:",
	UnComponentsSubText2: "Edo hautatu ezabatu beharreko aukerazko osagaiak:",
	DirText: "Instalazio programak $(^NameDA) honako karpetan instalatuko du. Beste karpeta batean instalatzeko, sakatu Arakatu eta aukeratu beste bat. $_CLICK",
	DirSubText: "Helburu karpeta",
	DirBrowseText: "Aukeratu $(^NameDA) instalatuko den karpeta:",
	UnDirText: "Instalazio programak $(^NameDA) honako karpetatik ezabatuko du. Beste karpeta batetik ezabatzeko, sakatu Arakatu eta aukeratu beste bat. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Aukeratu $(^NameDA) zein karpetatik ezabatuko den:",
	SpaceAvailable: "Leku erabilgarria:",
	SpaceRequired: "Behar den lekua:",
	UninstallingText: "$(^NameDA) ondorengo karpetan instalatuko da. $_CLICK",
	UninstallingSubText: "Ezabatzen honako karpetatik:",
	FileError: "Hutsegitea idazteko fitxategia irekitzean: \\r\\n\\t\"$0\"\\r\\nSakatu Irten instalazioa ,\\r\\nsaiatu berriz fitxategi hau berriz idazten saiatzeko, u\\r\\njarraitu fitxategi hau alde batera utzita aurrera egiteko",
	FileError_NoIgnore: "Hutsegitea idazteko fitxategia irekitzean: \\r\\n\\t\"$0\"\\r\\nsaiatu berriz fitxategi hau berriz idazten saiatzeko ,\\r\\nSakatu Irten instalazioa",
	CantWrite: "\"Ezin izan da idatzi: \"",
	CopyFailed: "Kopiatzeak hutsegin du",
	CopyTo: "\"Kopiatu hona \"",
	Registering: "\"Erregistratzen: \"",
	Unregistering: "\"Erregistroa ezabatzen: \"",
	SymbolNotFound: "\"Ikurra ezin izan da aurkitu: \"",
	CouldNotLoad: "\"Ezin izan da kargatu: \"",
	CreateFolder: "\"Sortu karpeta: \"",
	CreateShortcut: "\"Sortu lasterbidea: \"",
	CreatedUninstaller: "\"Sortu ezabatzailea: \"",
	Delete: "\"Ezabatu fitxategia: \"",
	DeleteOnReboot: "\"Ezabatu berrabiarazitakoan: \"",
	ErrorCreatingShortcut: "\"Hutsegitea lasterbidea sortzerakoan: \"",
	ErrorCreating: "\"Hutsegitea sortzerakoan: \"",
	ErrorDecompressing: "¡Hutsegitea datuak deskomprimatzean! Instalatzailea okerra?",
	ErrorRegistering: "Hutsegitea DLL erregistratzerakoan",
	ExecShell: "\"Exekutatu agindua: \"",
	Exec: "\"Exekutatu: \"",
	Extract: "\"Kanporatu: \"",
	ErrorWriting: "\"Kanporaketa: hutsegitea fitxategira idazterakoan \"",
	InvalidOpcode: "Instalatzailea okerra: ekintza kodea ez da baliozkoa",
	NoOLE: "\"OLE-rik ez honentzako: \"",
	OutputFolder: "\"Irteera karpeta: \"",
	RemoveFolder: "\"Ezabatu karpeta: \"",
	RenameOnReboot: "\"Berrizendatu berrabiarazitakoan: \"",
	Rename: "\"Berrizendatu: \"",
	Skipped: "\"Alde batera utzitakoa: \"",
	CopyDetails: "Kopiatu xehetasunak arbelera",
	LogInstall: "Instalazio prozesuaren erregistroa gorde",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Basque$1 = {
	header: header$5,
	id: id$5,
	font: font$5,
	code_page: code_page$5,
	rtl: rtl$5,
	strings: strings$5
};

var header$6 = "NLF v6";
var id$6 = 1059;
var font$6 = {
	name: null,
	size: null
};
var code_page$6 = 1251;
var rtl$6 = false;
var strings$6 = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Усталяванне $(^Name)",
	UninstallCaption: "Выдаленне $(^Name)",
	LicenseSubCaption: ": Ліцэнзійнае пагадненне",
	ComponentsSubCaption: ": Параметры ўсталявання",
	DirSubCaption: ": Папка ўсталявання",
	InstallingSubCaption: ": Капіяванне файлаў",
	CompletedSubCaption: ": Працэдура завершена",
	UnComponentsSubCaption: ": Параметры выдалення",
	UnDirSubCaption: ": Папка выдалення",
	ConfirmSubCaption: ": Пацвярджэнне",
	UninstallingSubCaption: ": Выдаленне файлаў",
	UnCompletedSubCaption: ": Працэдура завершана",
	BackBtn: "< &Назад",
	NextBtn: "&Далей >",
	AgreeBtn: "&Прыняць",
	AcceptBtn: "Я &прымаю ўмовы Ліцэнзійнага пагаднення",
	DontAcceptBtn: "Я н&е прымаю ўмовы Ліцэнзійнага пагаднення",
	InstallBtn: "&Усталяваць",
	UninstallBtn: "Выд&аліць",
	CancelBtn: "Скасаваць",
	CloseBtn: "За&крыць",
	BrowseBtn: "А&гляд ...",
	ShowDetailsBtn: "Падра&бязнасці...",
	ClickNext: "Націсніце кнопку \"Далей\", каб працягнуць усталяванне праграмы.",
	ClickInstall: "Націсніце кнопку \"Усталяваць\", каб пачаць працэс ўсталявання праграмы.",
	ClickUninstall: "Націсніце кнопку \"Выдаліць\", каб пачаць працэс выдалення праграмы.",
	Name: "Імя",
	Completed: "Завершана",
	LicenseText: "Калі ласка, прачытайце ўмовы Ліцэнзійнага пагаднення перад пачаткам усталявання $(^NameDA). Калі Вы прымаеце ўмовы Ліцэнзійнага пагаднення, націсніце кнопку \"Прыняць\".",
	LicenseTextCB: "Калі ласка, прачытайце ўмовы Ліцэнзійнага пагаднення перад пачаткам усталявання $(^NameDA). Калі Вы прымаеце ўмовы Ліцэнзійнага пагаднення, націсніце на сцяжок ніжэй. $_CLICK",
	LicenseTextRB: "Калі ласка, прачытайце ўмовы Ліцэнзійнага пагаднення перад пачаткам усталявання $(^NameDA). Калі Вы прымаеце ўмовы Ліцэнзійнага пагаднення, выберыце першы варыянт з прапанаваных нiжэй. $_CLICK",
	UnLicenseText: "Калі ласка, прачытайце ўмовы Ліцэнзійнага пагаднення перад пачаткам выдалення $(^NameDA). Калі Вы прымаеце ўмовы Ліцэнзійнага пагаднення, нацiснiце кнопку \"Прыняць\".",
	UnLicenseTextCB: "Калі ласка, прачытайце ўмовы Ліцэнзійнага пагаднення перад пачаткам выдалення $(^NameDA). Калі Вы прымаеце ўмовы Ліцэнзійнага пагаднення, націсніце на сцяжок ніжэй. $_CLICK",
	UnLicenseTextRB: "Калі ласка, прачытайце ўмовы Ліцэнзійнага пагаднення перад пачаткам выдалення $(^NameDA). Калі Вы прымаеце ўмовы Ліцэнзійнага пагаднення, выберыце першы варыянт з прапанаваных нiжэй. $_CLICK",
	Custom: "Выбарачна",
	ComponentsText: "Выберыце кампаненты праграмы, якiя Вы жадаеце ўсталяваць. $_CLICK",
	ComponentsSubText1: "Выберыце тып усталявання:",
	ComponentsSubText2_NoInstTypes: "Выберыце кампаненты праграмы, каб усталяваць iх:",
	ComponentsSubText2: "або выберыце кампаненты праграмы, каб усталяваць iх па свайму жаданню:",
	UnComponentsText: "Выберыце кампаненты, якiя Вы жадаеце выдалiць, i знiмiце сцяжкі, выбраныя для тых кампанентаў, якiя не трэба выдаляць. $_CLICK",
	UnComponentsSubText1: "Выберыце тып выдалення:",
	UnComponentsSubText2_NoInstTypes: "Выберыце кампаненты для выдалення:",
	UnComponentsSubText2: "або выберыце кампаненты праграмы для выдалення:",
	DirText: "Праграма ўсталюе $(^NameDA) у выбраную папку. Каб усталяваць праграму ў iншай папкі, нацiснiце кнопку \"Агляд\" i выберыце патрэбную папку. $_CLICK",
	DirSubText: "Папка ўсталявання",
	DirBrowseText: "Выберыце папку для ўсталявання $(^NameDA):",
	UnDirText: "Праграма выдалiць $(^NameDA) з выбранай папкі. Каб выдаліць праграму з iншай папкі, нацiснiце кнопку \"Агляд\" i выберыце патрэбную папку. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Выберыце папку, з якой Вы жадаеце выдалiць $(^NameDA):",
	SpaceAvailable: "\"Даступна на дыску: \"",
	SpaceRequired: "\"Патрэбна месца на дыску: \"",
	UninstallingText: "Праграма выдалiць $(^NameDA) з Вашага камп'ютара. $_CLICK",
	UninstallingSubText: "Выдаленне з:",
	FileError: "Немагчыма адкрыць файл для запiсу: \\r\\n\\r\\n$0\\r\\n\\r\\nНацiснiце кнопку \"Перапынiць\", каб перапынiць усталяванне;\\r\\n\"Паўтарыць\", каб паўтарыць спробу запiсу ў файл;\\r\\n\"Ігнараваць\", каб прапусцiць гэта дзеянне.",
	FileError_NoIgnore: "Немагчыма адкрыць файл для запiсу: \\r\\n\\r\\n$0\\r\\n\\r\\nНацiснiце кнопку \"Паўтарыць\", каб паўтарыць спробу запiсу ў файл;\\r\\n\"Скасаваць\", каб перапынiць усталяванне.",
	CantWrite: "\"Немагчыма запiсаць: \"",
	CopyFailed: "Памылка пры капіяванні",
	CopyTo: "\"Капіяванне ў \"",
	Registering: "\"Рэгiстрацыя: \"",
	Unregistering: "\"Выдаленне рэгiстрацыi: \"",
	SymbolNotFound: "\"Немагчыма знайсці сiмвал: \"",
	CouldNotLoad: "\"Немагчыма загрузiць: \"",
	CreateFolder: "\"Стварэнне папкі: \"",
	CreateShortcut: "\"Стварэнне ярлыка: \"",
	CreatedUninstaller: "\"Стварэнне праграмы выдалення: \"",
	Delete: "\"Выдаленне файла: \"",
	DeleteOnReboot: "\"Выдаленне пасля перазапуску камп'ютара: \"",
	ErrorCreatingShortcut: "\"Памылка стварэння ярлыка: \" ",
	ErrorCreating: "\"Памылка стварэння: \"",
	ErrorDecompressing: "Немагчыма выцягнуць дадзеныя. Магчыма пашкоджаны дыстрыбутыў.",
	ErrorRegistering: "Немагчыма зарэгістраваць бібліятэку (DLL)",
	ExecShell: "\"Выкананне каманды абалонкі: \" ",
	Exec: "\"Выкананне: \"",
	Extract: "\"Выманне: \"",
	ErrorWriting: "\"Выманне: памылка запiсу файла\"",
	InvalidOpcode: "дыстрыбутыў пашкоджаны: код памылкi",
	NoOLE: "\"Няма OLE для: \" ",
	OutputFolder: "\"Папка усталявання: \"",
	RemoveFolder: "\"Выдаленне папкі: \"",
	RenameOnReboot: "\"Перайменаванне пасля перазапуску камп'ютара: \"",
	Rename: "\"Перайменаванне: \"",
	Skipped: "\"Прапушчана: \"",
	CopyDetails: "Капіяваць звесткi ў буфер абмена ",
	LogInstall: "Запiсваць у лог працэс усталявання",
	Byte: "Б",
	Kilo: " К",
	Mega: " М",
	Giga: " Г"
};
var Belarusian$1 = {
	header: header$6,
	id: id$6,
	font: font$6,
	code_page: code_page$6,
	rtl: rtl$6,
	strings: strings$6
};

var header$7 = "NLF v6";
var id$7 = 5146;
var font$7 = {
	name: null,
	size: null
};
var code_page$7 = 1250;
var rtl$7 = false;
var strings$7 = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) Instalacija",
	UninstallCaption: "$(^Name) Uklanjanje",
	LicenseSubCaption: ": Licencno pravo korištenja",
	ComponentsSubCaption: ": Opcije instalacije",
	DirSubCaption: ": Izbor mape za instalaciju",
	InstallingSubCaption: ": Instaliranje",
	CompletedSubCaption: ": Završeno",
	UnComponentsSubCaption: ": Opcije uklanjanja",
	UnDirSubCaption: ": Mapa uklanjanja",
	ConfirmSubCaption: ": Potvrda",
	UninstallingSubCaption: ": Uklanjanje",
	UnCompletedSubCaption: ": Završeno uklanjanje",
	BackBtn: "< &Nazad",
	NextBtn: "&Dalje >",
	AgreeBtn: "&Prihvatam",
	AcceptBtn: "&Prihvatam uvjete licencnog ugovora",
	DontAcceptBtn: "&Ne prihvatam uvjete licencnog ugovora",
	InstallBtn: "&Instaliraj",
	UninstallBtn: "&Ukloni",
	CancelBtn: "Odustani",
	CloseBtn: "&Zatvori",
	BrowseBtn: "&Pregledaj...",
	ShowDetailsBtn: "Prikaži &detalje",
	ClickNext: "Pritisnite dugme 'Dalje' za nastavak.",
	ClickInstall: "Pritisnite dugme 'Instaliraj' za početak instalacije.",
	ClickUninstall: "Pritisnite dugme 'Ukloni' za početak uklanjanja.",
	Name: "Ime",
	Completed: "Završeno",
	LicenseText: "Molim pročitajte licencu prije instaliranja programa $(^NameDA). Ukoliko prihvatate sve uvjete ugovora, odaberite 'Prihvatam'.",
	LicenseTextCB: "Molim pročitajte licencu prije instaliranja programa $(^NameDA). Ukoliko prihvatate sve uvjete ugovora, označite donji kvadratić. $_CLICK",
	LicenseTextRB: "Molim pročitajte licencu prije instaliranja programa $(^NameDA). Ukoliko prihvatate sve uvjete ugovora, odaberite prvu donju opciju. $_CLICK",
	UnLicenseText: "Molim pročitajte licencu prije uklanjanja programa $(^NameDA). Ukoliko prihvatate sve uvjete ugovora, odaberite 'Prihvatam'.",
	UnLicenseTextCB: "Molim pročitajte licencu prije uklanjanja programa $(^NameDA). Ako prihvatate sve uvjete ugovora, obilježite donji kvadratić. $_CLICK",
	UnLicenseTextRB: "Molim pročitajte licencu prije uklanjanja programa $(^NameDA). Ukoliko prihvatate sve uvjete ugovora, odaberite prvu opciju ispod. $_CLICK",
	Custom: "Podešavanje",
	ComponentsText: "Označite komponente koje želite instalirati. Instaliraju se samo označene komponente. Uklonite oznaku sa onih koje ne želite instalirati. $_CLICK",
	ComponentsSubText1: "Izaberite tip instalacije:",
	ComponentsSubText2_NoInstTypes: "Odaberite komponente za instalaciju:",
	ComponentsSubText2: "Ili po izboru označite komponente koje želite instalirati:",
	UnComponentsText: "Označite komponente koje želite ukloniti. Uklonite oznaku sa onih koje ne želite ukloniti. $_CLICK",
	UnComponentsSubText1: "Izaberite tip uklanjanja:",
	UnComponentsSubText2_NoInstTypes: "Izaberite komponente za uklanjanje:",
	UnComponentsSubText2: "Ili po izboru odaberite komponente koje želite da uklonite:",
	DirText: "Program $(^NameDA) će biti instaliran u sljedeću mapu. Za instalaciju na neku drugu mapu odaberite 'Pregledaj...' i odaberite drugu mapu. $_CLICK",
	DirSubText: "Odredišna mapa",
	DirBrowseText: "Izaberite mapu u koju želite instalirati program $(^NameDA):",
	UnDirText: "Program $(^NameDA) će biti uklonjen iz navedene mape. Za uklanjanje iz druge mape odaberite 'Pregledaj...' i označite drugu mapu. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Izaberite mapu iz koje ćete program $(^NameDA) ukloniti:",
	SpaceAvailable: "\"Slobodno prostora na disku: \"",
	SpaceRequired: "\"Potrebno prostora na disku: \"",
	UninstallingText: "Program $(^NameDA) će biti uklonjen iz sljedeće mape. $_CLICK",
	UninstallingSubText: "Uklanjanje iz:",
	FileError: "Greška prilikom otvaranja datoteke za upisivanje: \\r\\n\\t\"$0\"\\r\\n\\\"Odustani\\\" za prekid instalacije,\\r\\n\\\"Ponovi\\\" za ponovni pokušaj upisivanja, ili\\r\\n\\\"Ignoriši\\\" za zanemarenje te datoteke",
	FileError_NoIgnore: "Greška prilikom otvaranja datoteke za upisivanje: \\r\\n\\t\"$0\"\\r\\n\\\"Ponovi\\\" za ponovni pokušaj zapisivanja, ili\\r\\n\\\"Odustani\\\" za prekid instalacije",
	CantWrite: "\"Nemoguće upisati: \"",
	CopyFailed: "Greška prilikom kopiranja",
	CopyTo: "\"Kopiraj u \"",
	Registering: "\"Prijava: \"",
	Unregistering: "\"Odjava: \"",
	SymbolNotFound: "\"Nemoguće naći simbol: \"",
	CouldNotLoad: "\"Nemoguće učitavanje: \"",
	CreateFolder: "\"Napravi mapu: \"",
	CreateShortcut: "\"Napravi prečicu: \"",
	CreatedUninstaller: "\"Program za uklanjanje: \"",
	Delete: "\"Obriši datoteku: \"",
	DeleteOnReboot: "\"Obriši prilikom ponovnog pokretanja: \"",
	ErrorCreatingShortcut: "\"Greška prilikom kreiranja prečica: \"",
	ErrorCreating: "\"Greška prilikom kreiranja: \"",
	ErrorDecompressing: "Greška prilikom otpakivanja podataka! Oštećen instalacijski program?",
	ErrorRegistering: "Greška prilikom prijavljivanja DLLa",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Izvrši: \"",
	Extract: "\"Otpakuj: \"",
	ErrorWriting: "\"Otpakivanje: greška upisivanja u datoteku \"",
	InvalidOpcode: "Oštećena instalacijska datoteka: neispravna opkoda",
	NoOLE: "\"Nema OLE za: \"",
	OutputFolder: "\"Izlazna mapa: \"",
	RemoveFolder: "\"Obriši mapu: \"",
	RenameOnReboot: "\"Preimenuj prilikom ponovnog startovanja: \"",
	Rename: "\"Preimenuj: \"",
	Skipped: "\"Preskočeno: \"",
	CopyDetails: "Kopiraj detalje na Klembord",
	LogInstall: "Logiraj zapisnik procesa instalacije",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Bosnian$1 = {
	header: header$7,
	id: id$7,
	font: font$7,
	code_page: code_page$7,
	rtl: rtl$7,
	strings: strings$7
};

var header$8 = "NLF v6";
var id$8 = 1150;
var font$8 = {
	name: null,
	size: null
};
var code_page$8 = 1252;
var rtl$8 = false;
var strings$8 = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Staliañ ha kefluniañ $(^Name)",
	UninstallCaption: "Distaliañ $(^Name)",
	LicenseSubCaption: ": Aotre arverañ",
	ComponentsSubCaption: ": Dibaboù staliañ",
	DirSubCaption: ": Kavlec'h staliañ",
	InstallingSubCaption: ": O staliañ ar restroù",
	CompletedSubCaption: ": Echu eo",
	UnComponentsSubCaption: ": Dibaboù distaliañ",
	UnDirSubCaption: ": Kavlec'h distaliañ",
	ConfirmSubCaption: ": Kadarnañ",
	UninstallingSubCaption: ": O tistaliañ ar restroù",
	UnCompletedSubCaption: ": Echu eo",
	BackBtn: "< &Kent",
	NextBtn: "&War-lerc'h >",
	AgreeBtn: "&A-du emaon",
	AcceptBtn: "&Degemer holl dermoù al lañvaz emglev",
	DontAcceptBtn: "&Chom hep degemer termoù al lañvaz emglev",
	InstallBtn: "&Staliañ",
	UninstallBtn: "&Distaliañ",
	CancelBtn: "Nullañ",
	CloseBtn: "&Serriñ",
	BrowseBtn: "F&urchal...",
	ShowDetailsBtn: "Muioc'h a &ditouroù",
	ClickNext: "Klikit war « War-lerc'h » evit mont war-raok.",
	ClickInstall: "Klikit war « Staliañ » evit kregiñ gant ar staliadur.",
	ClickUninstall: "Klikit war « Distaliañ » evit kregiñ gant an distaliadur.",
	Name: "Anv",
	Completed: "Echu eo",
	LicenseText: "Bezit aketus en ur lenn an aotre arverañ a-raok staliañ $(^NameDA) mar plij. Mar degemerit pep term eus an aotre, klikit war « A-du emaon ».",
	LicenseTextCB: "Bezit aketus en ur lenn an aotre arverañ a-raok staliañ $(^NameDA) mar plij. Mar degemerit pep term eus an aotre, klikit war al log a-zindan. $_CLICK",
	LicenseTextRB: "Bezit aketus en ur lenn an aotre arverañ a-raok staliañ $(^NameDA) mar plij. Mar degemerit pep term eus an aotre, dizuzit an dibab kentañ a-zindan. $_CLICK",
	UnLicenseText: "Bezit aketus en ur lenn an aotre arverañ a-raok distaliañ $(^NameDA) mar plij. Mar degemerit pep term eus an aotre, klikit war « A-du emaon ».",
	UnLicenseTextCB: "Bezit aketus en ur lenn an aotre arverañ a-raok distaliañ $(^NameDA) mar plij. Mar degemerit pep term eus an aotre, klikit war al log a-zindan. $_CLICK",
	UnLicenseTextRB: "Bezit aketus en ur lenn an aotre arverañ a-raok distaliañ $(^NameDA) mar plij. Mar degemerit pep term eus an aotre, diuzit an dibab kentañ a-zindan. $_CLICK",
	Custom: "Diouzh ho kiz",
	ComponentsText: "Dibabit an elfennoù a fell deoc'h staliañ pe diziuzit an elfennoù a fell deoc'h leuskel a-gostez. $_CLICK",
	ComponentsSubText1: "Dibabit pe seurt staliañ a vo :",
	ComponentsSubText2_NoInstTypes: "Dibabit an elfennoù da staliañ :",
	ComponentsSubText2: "Pe dibabit an elfennoù diret a fell deoc'h staliañ :",
	UnComponentsText: "Dibabit an elfennoù a fell deoc'h distaliañ pe diziuzit an elfennoù a fell deoc'h mirout. $_CLICK",
	UnComponentsSubText1: "Dibabit peseurt distaliañ a vo :",
	UnComponentsSubText2_NoInstTypes: "Dibabit an elfennoù da zistaliañ :",
	UnComponentsSubText2: "Pe dibabit an elfennoù diret a fell deoc'h distaliañ :",
	DirText: "Staliet e vo $(^NameDA) gant ar goulev-mañ er c'havlec'h da-heul. Mar fell deoc'h dibab ur c'havlec'h all, klikit war « Furchal » ha dibabit ur c'havlec'h all. $_CLICK",
	DirSubText: "Kavlec'h bukenn",
	DirBrowseText: "Dibabit ar c'havlec'h e vo diazezet $(^NameDA) ennañ :",
	UnDirText: "Distaliet e vo $(^NameDA) gant ar goulev-mañ adalek ar c'havlec'h da heul. Ma fell deoc'h distaliañ adalek ur c'havlec'h all, klikit war « Furchal » ha diuzit ur c'havlec'h all. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Diuzit ar c'havlec'h evit distaliañ $(^NameDA) adalek :",
	SpaceAvailable: "\"Egor kantenn vak : \"",
	SpaceRequired: "\"Egor kantenn rekis : \"",
	UninstallingText: "Distaliet e vo $(^NameDA) adalek ar c'havelec'h da-heul. $_CLICK",
	UninstallingSubText: "Distaliañ adalek :",
	FileError: "Fazi en ur zigeriñ ur restr evit skrivañ : \\r\\n\\r\\n$0\\r\\n\\r\\nKlikit war « Paouez » evit paouez gant ar staliañ,\\r\\n« Adober » evit eseañ en-dro, pe\\r\\n« Tremen » evit leuskel a-gostez ar restr-mañ.",
	FileError_NoIgnore: "Fazi en ur zigeriñ ur restr a-benn skrivañ : \\r\\n\\r\\n$0\\r\\n\\r\\nKlikit war « Adober » evit esaeañ en-dro, pe\\r\\nwar « Nullañ » evit paouez gant ar staliañ.",
	CantWrite: "\"N'haller ket skrivañ : \"",
	CopyFailed: "Kopiañ faziet",
	CopyTo: "\"Kopiañ da \"",
	Registering: "\"Oc'h enskrivañ : \"",
	Unregistering: "\"O tienskrivañ : \"",
	SymbolNotFound: "\"N'haller ket kavout ur simbolenn : \"",
	CouldNotLoad: "\"N'haller ket kargañ : \"",
	CreateFolder: "\"Krouiñ kavlec'h : \"",
	CreateShortcut: "\"Krouiñ berradenn : \"",
	CreatedUninstaller: "\"Skoazeller distaliañ krouet : \"",
	Delete: "\"Dilemel restr : \"",
	DeleteOnReboot: "\"Dilemel en ur adloc'hañ : \"",
	ErrorCreatingShortcut: "\"Fazi en ur grouiñ berradenn : \"",
	ErrorCreating: "\"Fazi en ur grouiñ : \"",
	ErrorDecompressing: "Fazi en ur ziwaskañ stlenn ! Skoazeller staliañ gwastet ?",
	ErrorRegistering: "Fazi en ur enskrivañ an DLL",
	ExecShell: "\"ExecShell : \"",
	Exec: "\"Lañsañ : \"",
	Extract: "\"Eztennañ : \"",
	ErrorWriting: "\"Eztennañ : fazi en ur skrivañ restr \"",
	InvalidOpcode: "Skoazeller staliañ gwastet : opcode direizh",
	NoOLE: "\"OLE ebet evit : \"",
	OutputFolder: "\"Kavlec'h ec'hank : \"",
	RemoveFolder: "\"Dilemel ar c'havlec'h : \"",
	RenameOnReboot: "\"Adenvel pa vez adloc'het : \"",
	Rename: "\"Adenvel : \"",
	Skipped: "\"Laosket a-gostez: \"",
	CopyDetails: "Kopiañ ar munudoù er golver",
	LogInstall: "Tresañ an argerzh staliañ",
	Byte: "E",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Breton$1 = {
	header: header$8,
	id: id$8,
	font: font$8,
	code_page: code_page$8,
	rtl: rtl$8,
	strings: strings$8
};

var header$9 = "NLF v6";
var id$9 = 1026;
var font$9 = {
	name: null,
	size: null
};
var code_page$9 = 1251;
var rtl$9 = false;
var strings$9 = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Инсталиране на $(^Name) ",
	UninstallCaption: "Изтриване на $(^Name) ",
	LicenseSubCaption: ": Лицензионно споразумение",
	ComponentsSubCaption: ": Опции за инсталиране",
	DirSubCaption: ": Инсталиране в папка",
	InstallingSubCaption: ": Инсталиране",
	CompletedSubCaption: ": Завършване",
	UnComponentsSubCaption: ": Опции за изтриване",
	UnDirSubCaption: ": Изтриване от папка",
	ConfirmSubCaption: ": Потвърждение",
	UninstallingSubCaption: ": Изтриване",
	UnCompletedSubCaption: ": Завършване",
	BackBtn: "< &Назад",
	NextBtn: "Н&апред >",
	AgreeBtn: "&Съгласен",
	AcceptBtn: "&Съгласен съм с условията на Лицензионното споразумение.",
	DontAcceptBtn: "&Не съм съгласен с условията на Лицензионното споразумение.",
	InstallBtn: "&Инсталирай",
	UninstallBtn: "&Изтрий",
	CancelBtn: "&Отказ",
	CloseBtn: "&Затвори",
	BrowseBtn: "П&реглед...",
	ShowDetailsBtn: "&Детайли",
	ClickNext: "Натиснете \"Напред\", за да продължите.",
	ClickInstall: "Натиснете \"Инсталирай\", за да започне инсталирането.",
	ClickUninstall: "Натиснете \"Изтрий\", за да започне изтриването.",
	Name: "Име",
	Completed: "Край",
	LicenseText: "Моля прочетете Лицензионното споразумение преди да инсталирате $(^NameDA). Ако приемате всички условия на споразумението, натиснете \"Съгласен\".",
	LicenseTextCB: "Моля прочетете Лицензионното споразумение преди да инсталирате $(^NameDA). Ако приемате всички условия на споразумението, сложете отметка в полето по-долу. $_CLICK",
	LicenseTextRB: "Моля прочетете Лицензионното споразумение преди да инсталирате $(^NameDA). Ако приемате всички условия на споразумението, изберете първата опция по-долу. $_CLICK",
	UnLicenseText: "Моля прочетете Лицензионното споразумение преди да изтриете $(^NameDA). Ако приемате всички условия на споразумението, натиснете \"Съгласен\".",
	UnLicenseTextCB: "Моля прочетете Лицензионното споразумение преди да изтриете $(^NameDA). Ако приемате всички условия на споразумението, сложете отметка в полето по-долу. $_CLICK",
	UnLicenseTextRB: "Моля прочетете Лицензионното споразумение преди да изтриете $(^NameDA). Ако приемате всички условия на споразумението, изберете първата опция по-долу. $_CLICK",
	Custom: "Инсталиране по избор",
	ComponentsText: "Изберете компонентите, които искате да бъдат инсталирани. $_CLICK",
	ComponentsSubText1: "Изберете тип инсталиране:",
	ComponentsSubText2_NoInstTypes: "Изберете компоненти:",
	ComponentsSubText2: "Или изберете компонентите, които искате да бъдат инсталирани:",
	UnComponentsText: "Сложете отметка пред компонентите, които искате да изтриете, а тези които не искате да изтриете оставете без отметка. $_CLICK",
	UnComponentsSubText1: "Изберете типа на изтриване:",
	UnComponentsSubText2_NoInstTypes: "Изберете компонентите за изтриване:",
	UnComponentsSubText2: "Или, изберете допълнителни компоненти за изтриване:",
	DirText: "Програмата ще инсталира $(^NameDA) в посочената папка. За да инсталирате в друга папка, натиснете \"Преглед\" и изберете друга папка. $_CLICK",
	DirSubText: "Целева папка",
	DirBrowseText: "Изберете папка, в която да се инсталира $(^NameDA):",
	UnDirText: "Програмата ще изтрие $(^NameDA) от следната папка. За да изтриете от друга папка, натиснете \"Преглед\" и изберете друга папка. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Изберете папката от която да се изтрие $(^NameDA):",
	SpaceAvailable: "\"Свободно пространство: \"",
	SpaceRequired: "\"Необходимо пространство: \"",
	UninstallingText: "$(^NameDA) ще бъде изтрита от следната папка. $_CLICK",
	UninstallingSubText: "Изтриване от:",
	FileError: "Грешка при отваряне на файла за запис: \\r\\n\\t\"$0\"\\r\\nНатиснете \"Прекрати\", за да прекратите инсталирането, \"Повтори\", за да опитате отново или \"Игнорирай\", за да пропуснете този файл",
	FileError_NoIgnore: "Грешка при отваряне на файла за запис: \\r\\n\\t\"$0\"\\r\\nНатиснете \"Повтори\", за да опитате отново или \"Прекрати\", за да прекратите инсталирането.",
	CantWrite: "\"Неуспешно записване на: \"",
	CopyFailed: "Копирането неуспешно",
	CopyTo: "\"Копиране на \"",
	Registering: "\"Регистриране на: \"",
	Unregistering: "\"Дерегистриране на: \"",
	SymbolNotFound: "\"Символът не е намерен: \"",
	CouldNotLoad: "\"Неуспешно зареждане на: \"",
	CreateFolder: "\"Създаване на папка: \"",
	CreateShortcut: "\"Създаване на пряк път: \"",
	CreatedUninstaller: "\"Създаване на програма за изтриване: \"",
	Delete: "\"Изтриване на: \"",
	DeleteOnReboot: "\"Изтриване след рестарт: \"",
	ErrorCreatingShortcut: "\"Грешка при създаване на прекия път: \"",
	ErrorCreating: "\"Грешка при създаване на: \"",
	ErrorDecompressing: "Грешка при декомпресиране на данните! Вероятно инсталационния пакет е повреден.",
	ErrorRegistering: "Грешка при регистриране на DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Изпълнение на: \"",
	Extract: "\"Извличане на: \"",
	ErrorWriting: "\"Извличане на: грешка при запис във файл \"",
	InvalidOpcode: "Пакета е повреден: грешен код на операция",
	NoOLE: "\"Няма OLE за: \"",
	OutputFolder: "\"Инсталиране в папка: \"",
	RemoveFolder: "\"Изтриване на папка: \"",
	RenameOnReboot: "\"Преименуване при рестарт: \"",
	Rename: "\"Преименуване на: \"",
	Skipped: "\"Пропускане на: \"",
	CopyDetails: "Копиране на данните в буфера",
	LogInstall: "Записване на отчет за инсталирането",
	Byte: "Б",
	Kilo: " К",
	Mega: " М",
	Giga: " Г"
};
var Bulgarian$1 = {
	header: header$9,
	id: id$9,
	font: font$9,
	code_page: code_page$9,
	rtl: rtl$9,
	strings: strings$9
};

var header$a = "NLF v6";
var id$a = 1027;
var font$a = {
	name: null,
	size: null
};
var code_page$a = 1252;
var rtl$a = false;
var strings$a = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Instal·lació de l'aplicació $(^Name)",
	UninstallCaption: "Desinstal·lació de l'aplicació $(^Name)",
	LicenseSubCaption: ": Acord de llicència",
	ComponentsSubCaption: ": Opcions d'instal·lació",
	DirSubCaption: ": Carpeta d'instal·lació",
	InstallingSubCaption: ": S'està instal·lant",
	CompletedSubCaption: ": S'ha acabat",
	UnComponentsSubCaption: ": Opcions de desinstal·lació",
	UnDirSubCaption: ": Carpeta de desinstal·lació",
	ConfirmSubCaption: ": Confirmació",
	UninstallingSubCaption: ": S'està desinstal·lant",
	UnCompletedSubCaption: ": No s'ha acabat",
	BackBtn: "< En&rere",
	NextBtn: "En&davant >",
	AgreeBtn: "Hi estic d'a&cord",
	AcceptBtn: "&Accepto els termes de l'acord de llicència",
	DontAcceptBtn: "&No accepto els termes de l'acord de llicència",
	InstallBtn: "&Instal·la",
	UninstallBtn: "&Desinstal·la",
	CancelBtn: "&Cancel·la",
	CloseBtn: "&Tanca",
	BrowseBtn: "&Navega...",
	ShowDetailsBtn: "&Mostra els detalls",
	ClickNext: "Feu clic a Endavant per a continuar.",
	ClickInstall: "Feu clic a Instal·la per a iniciar la instal·lació.",
	ClickUninstall: "Feu clic a Desinstal·la per a iniciar la desinstal·lació.",
	Name: "Nom",
	Completed: "S'ha acabat",
	LicenseText: "Reviseu l'acord de llicència abans d'instal·lar l'aplicació $(^NameDA). Si accepteu tots els termes de l'acord, feu clic a Hi estic d'acord.",
	LicenseTextCB: "Reviseu l'acord de llicència abans d'instal·lar l'aplicació $(^NameDA). Si accepteu tots els termes de l'acord, activeu la casella de sota. $_CLICK",
	LicenseTextRB: "Reviseu l'acord de llicència abans d'instal·lar l'aplicació $(^NameDA). Si accepteu tots els termes de l'acord, seleccioneu la primera opció de sota. $_CLICK",
	UnLicenseText: "Reviseu l'acord de llicència abans de desinstal·lar l'aplicació $(^NameDA). Si accepteu tots els termes de l'acord, feu clic a Hi estic d'acord.",
	UnLicenseTextCB: "Reviseu l'acord de llicència abans de desinstal·lar l'aplicació $(^NameDA). Si accepteu tots els termes de l'acord, activeu la la casella de sota. $_CLICK",
	UnLicenseTextRB: "Reviseu l'acord de llicència abans de desinstal·lar l'aplicació $(^NameDA). Si accepteu tots els termes de l'acord, seleccioneu la primera opció de sota. $_CLICK",
	Custom: "Personalitzada",
	ComponentsText: "Activeu els components que voleu instal·lar i desactiveu els que no. $_CLICK",
	ComponentsSubText1: "Seleccioneu el tipus d'instal·lació:",
	ComponentsSubText2_NoInstTypes: "Seleccioneu els components per instal·lar:",
	ComponentsSubText2: "O bé, seleccioneu els components opcionals que desitgéssiu instal·lar:",
	UnComponentsText: "Activeu els components que voleu desinstal·lar i desactiveu els que no. $_CLICK",
	UnComponentsSubText1: "Seleccioneu el tipus de desinstal·lació:",
	UnComponentsSubText2_NoInstTypes: "Seleccioneu els components per desinstal·lar:",
	UnComponentsSubText2: "O bé, seleccioneu els components opcionals per desinstal·lar:",
	DirText: "El programa d'instal·lació instal·larà l'aplicació $(^NameDA) en la següent carpeta. Per a instal·lar-lo en una carpeta diferent, feu clic a Navega i seleccioneu-ne una altra. $_CLICK",
	DirSubText: "Carpeta de destinació",
	DirBrowseText: "Seleccioneu la carpeta on s'instal·larà l'aplicació $(^NameDA):",
	UnDirText: "El programa d'instal·lació desinstal·larà l'aplicació $(^NameDA) de la següent carpeta. Per a desinstal·lar-lo d'una carpeta diferent, feu clic a Navega i seleccioneu-ne una altra. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Seleccioneu la carpeta des d'on es desinstal·larà l'aplicació $(^NameDA):",
	SpaceAvailable: "\"Espai lliure: \"",
	SpaceRequired: "\"Espai necessari: \"",
	UninstallingText: "Es desinstal·larà l'aplicació $(^NameDA) de la següent carpeta. $_CLICK",
	UninstallingSubText: "S'està desinstal·lant de:",
	FileError: "S'ha produït un error en obrir el fitxer en mode d'escriptura: \\r\\n\\t\"$0\"\\r\\nFeu clic a Abandona per a aturar la instal·lació,\\r\\nReintenta per a tornar-ho a provar, o\\r\\Ignora per a ometre aquest fitxer.",
	FileError_NoIgnore: "S'ha produït un error en obrir el fitxer en mode d'escriptura: \\r\\n\\t\"$0\"\\r\\nFeu clic a Reintenta per a tornar-ho a provar, o\\r\\Cancel·la per a aturar la instal·lació.",
	CantWrite: "\"No s'ha pogut escriure: \"",
	CopyFailed: "Ha fallat la còpia",
	CopyTo: "\"Copia a \"",
	Registering: "\"S'esta registrant:\"",
	Unregistering: "\"S'està suprimint el registre: \"",
	SymbolNotFound: "\"No s'ha trobat el símbol: \"",
	CouldNotLoad: "\"No s'ha pogut carregar: \"",
	CreateFolder: "\"Crea la carpeta: \"",
	CreateShortcut: "\"Crea la drecera: \"",
	CreatedUninstaller: "\"S'ha creat el desinstal·lador: \"",
	Delete: "\"S'ha suprimit el fitxer: \"",
	DeleteOnReboot: "\"Suprimeix en reiniciar: \"",
	ErrorCreatingShortcut: "\"S'ha produït un error en crear la drecera: \"",
	ErrorCreating: "S'ha produït un error en crear:",
	ErrorDecompressing: "S'ha produït un error en descomprimir les dades! L'instal·lador està corrupte?",
	ErrorRegistering: "S'ha produït un error en registrar una DLL",
	ExecShell: "\"Executa l'ordre: \"",
	Exec: "\"Executa:\"",
	Extract: "\"Extreu: \"",
	ErrorWriting: "\"Extreu: s'ha produït un error en escriure el fitxer \"",
	InvalidOpcode: "L'instal·lador està corrupte: el codi d'operació no és vàlid",
	NoOLE: "\"No hi ha OLE per a: \"",
	OutputFolder: "\"Carpeta de sortida: \"",
	RemoveFolder: "\"Suprimeix la carpeta: \"",
	RenameOnReboot: "\"Reanomena en reiniciar: \"",
	Rename: "\"Reanomena: \"",
	Skipped: "\"S'ha omès: \"",
	CopyDetails: "Copia els detalls al porta-retalls",
	LogInstall: "Registra el procés d'instal·lació",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Catalan$1 = {
	header: header$a,
	id: id$a,
	font: font$a,
	code_page: code_page$a,
	rtl: rtl$a,
	strings: strings$a
};

var header$b = "NLF v6";
var id$b = 1155;
var font$b = {
	name: null,
	size: null
};
var code_page$b = 1252;
var rtl$b = false;
var strings$b = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Assistente d'Installazione di $(^Name)",
	UninstallCaption: "Disinstallazione di $(^Name)",
	LicenseSubCaption: ": Cuntrattu d'Utilizazione",
	ComponentsSubCaption: ": Ozzioni d'Installazione",
	DirSubCaption: ": Cartulare d'Installazione",
	InstallingSubCaption: ": Installazione in corsu",
	CompletedSubCaption: ": Compiu",
	UnComponentsSubCaption: ": Ozzioni di Disinstallazione",
	UnDirSubCaption: ": Cartulare di Disinstallazione",
	ConfirmSubCaption: ": Cunfirmazione",
	UninstallingSubCaption: ": Disinstallazione in corsu",
	UnCompletedSubCaption: ": Compiu",
	BackBtn: "< &Precedente",
	NextBtn: "&Seguente >",
	AgreeBtn: "&Accunsentu",
	AcceptBtn: "Sò d'&accunsentu cù i termini di u Cuntrattu di Licenza",
	DontAcceptBtn: "Ùn sò &micca d'accunsentu cù i termini di u Cuntrattu di Licenza",
	InstallBtn: "&Installà",
	UninstallBtn: "&Disinstallà",
	CancelBtn: "Abbandunà",
	CloseBtn: "&Chjode",
	BrowseBtn: "&Sfuglià...",
	ShowDetailsBtn: "Affissà i &ditaglii",
	ClickNext: "Sceglie Seguente per cuntinuà.",
	ClickInstall: "Sceglie Installà per principià l'installazione.",
	ClickUninstall: "Sceglie Disinstallà per principià a disinstallazione.",
	Name: "Nome",
	Completed: "Compiu",
	LicenseText: "Ci vole à leghje u cuntrattu di licenza nanzu d'installà $(^NameDA). S'è voi site d'accunsentu cù tutti i termini di u cuntrattu, sceglie Accunsentu.",
	LicenseTextCB: "Ci vole à leghje u cuntrattu di licenza nanzu d'installà $(^NameDA). S'è voi site d'accunsentu cù tutti i termini di u cuntrattu, sceglie a casella inghjò. $_CLICK",
	LicenseTextRB: "Ci vole à leghje u cuntrattu di licenza nanzu d'installà $(^NameDA). S'è voi site d'accunsentu cù tutti i termini di u cuntrattu, sceglie a prima ozzione inghjò. $_CLICK",
	UnLicenseText: "Ci vole à leghje u cuntrattu di licenza nanzu di disinstallà $(^NameDA). S'è voi site d'accunsentu cù tutti i termini di u cuntrattu, sceglie Accunsentu.",
	UnLicenseTextCB: "Ci vole à leghje u cuntrattu di licenza nanzu di disinstallà $(^NameDA). S'è voi site d'accunsentu cù tutti i termini di u cuntrattu, sceglie a casella inghjò. $_CLICK",
	UnLicenseTextRB: "Ci vole à leghje u cuntrattu di licenza nanzu di disinstallà $(^NameDA). S'è voi site d'accunsentu cù tutti i termini di u cuntrattu, sceglie a prima ozzione inghjò. $_CLICK",
	Custom: "Persunalizatu",
	ComponentsText: "Selezziunà i cumpunenti chì voi vulete installà è viutà a casella di quelli ch'ellu ùn ci vole à installà. $_CLICK",
	ComponentsSubText1: "Selezziunà u tipu d'installazione :",
	ComponentsSubText2_NoInstTypes: "Selezziunà i cumpunenti à installà :",
	ComponentsSubText2: "Osinnò, selezziunà i cumpunenti addizziunali chì voi vulete installà :",
	UnComponentsText: "Selezziunà i cumpunenti chì voi vulete disinstallà è viutà a casella di quelli ch'ellu ùn ci vole à disinstallà. $_CLICK",
	UnComponentsSubText1: "Selezziunà u tipu di disinstallazione :",
	UnComponentsSubText2_NoInstTypes: "Selezziunà i cumpunenti à disinstallà :",
	UnComponentsSubText2: "Osinnò, selezziunà i cumpunenti addizziunali chì voi vulete disinstallà :",
	DirText: "L'Assistente hà da installà $(^NameDA) in quessu cartulare. Per installà in un altru cartulare, sceglie Sfuglià è selezziunà un altru cartulare. $_CLICK",
	DirSubText: "Cartulare di Destinazione",
	DirBrowseText: "Selezziunà u cartulare d'installazione di $(^NameDA) :",
	UnDirText: "L'Assistente hà da disinstallà $(^NameDA) da quessu cartulare. Per disinstallà da un altru cartulare, sceglie Sfuglià è selezziunà un altru cartulare. $_CLICK",
	UnDirSubText: "Cartulare d'Installazione",
	UnDirBrowseText: "Selezziunà u cartulare di disinstallazione di $(^NameDA) :",
	SpaceAvailable: "Spaziu dispunibule : ",
	SpaceRequired: "Spaziu richiestu : ",
	UninstallingText: "$(^NameDA) serà disinstallatu da quessu cartulare. $_CLICK",
	UninstallingSubText: "Disinstallazione da :",
	FileError: "Sbagliu durante l'accessu in scrittura di u schedariu : \\r\\n\\r\\n$0\\r\\n\\r\\nSceglie Interrompe per piantà l'installazione,\\r\\nTorna per pruvà torna, o\\r\\nIgnurà per ignurà u schedariu.",
	FileError_NoIgnore: "Sbagliu durante l'accessu in scrittura di u schedariu : \\r\\n\\r\\n$0\\r\\n\\r\\nSceglie Torna per pruvà torna, o\\r\\nAbbandunà per piantà l'installazione.",
	CantWrite: "Ùn pò micca scrive : ",
	CopyFailed: "Fiascu di copia",
	CopyTo: "Cupià ver di ",
	Registering: "Arregistramentu : ",
	Unregistering: "Disarregistramentu : ",
	SymbolNotFound: "Ùn pò micca truvà di simbolu : ",
	CouldNotLoad: "Ùn pò micca caricà : ",
	CreateFolder: "Creazione di u cartulare : ",
	CreateShortcut: "Creazione di l'accurtatoghju : ",
	CreatedUninstaller: "Assistente di disinstallazione creatu : ",
	Delete: "Squassatura di schedariu : ",
	DeleteOnReboot: "Squassatura à l'avviu di l'urdinatore : ",
	ErrorCreatingShortcut: "Sbagliu durante a creazione di l'accurtatoghju : ",
	ErrorCreating: "Sbagliu durante a creazione di : ",
	ErrorDecompressing: "Sbagliu durante a scumprezzione di dati : Stalladore alteratu ?",
	ErrorRegistering: "Sbagliu durante l'arregistramentu di DLL",
	ExecShell: "ExecShell : ",
	Exec: "Eseguisce : ",
	Extract: "Estrae : ",
	ErrorWriting: "Estrae : sbagliu di scrittura ver di u schedariu ",
	InvalidOpcode: "Stalladore alteratu : opcode micca accettevule",
	NoOLE: "Alcunu OLE per : ",
	OutputFolder: "Cartulare di destinazione : ",
	RemoveFolder: "Caccià u cartulare : ",
	RenameOnReboot: "Rinumà à l'avviu di l'urdinatore : ",
	Rename: "Rinumà : ",
	Skipped: "Tralasciatu : ",
	CopyDetails: "Cupià i Ditaglii ver di u Preme'Papei",
	LogInstall: "Arregistrà u ghjurnale d'installazione",
	Byte: "o",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Corsican$1 = {
	header: header$b,
	id: id$b,
	font: font$b,
	code_page: code_page$b,
	rtl: rtl$b,
	strings: strings$b
};

var header$c = "NLF v6";
var id$c = 1050;
var font$c = {
	name: null,
	size: null
};
var code_page$c = 1250;
var rtl$c = false;
var strings$c = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Instalacija programa $(^Name)",
	UninstallCaption: "Uklanjanje programa $(^Name)",
	LicenseSubCaption: ": Uvjeti Ugovora o licenci",
	ComponentsSubCaption: ": Instalacijske opcije",
	DirSubCaption: ": Instalacijska mapa",
	InstallingSubCaption: ": Instaliranje",
	CompletedSubCaption: ": Završeno",
	UnComponentsSubCaption: ": Opcije uklanjanja",
	UnDirSubCaption: ": Mapa uklanjanja",
	ConfirmSubCaption: ": Potvrda",
	UninstallingSubCaption: ": Uklanjanje",
	UnCompletedSubCaption: ": Završeno",
	BackBtn: "< &Natrag",
	NextBtn: "&Dalje >",
	AgreeBtn: "&Prihvaćam",
	AcceptBtn: "&Prihvaćam uvjete Ugovora o licenci",
	DontAcceptBtn: "&Ne prihvaćam uvjete Ugovora o licenci",
	InstallBtn: "&Instaliraj",
	UninstallBtn: "&Ukloni",
	CancelBtn: "Odustani",
	CloseBtn: "&Zatvori",
	BrowseBtn: "&Pregledaj...",
	ShowDetailsBtn: "Prikaži &detalje",
	ClickNext: "Za nastavak odaberite 'Dalje'.",
	ClickInstall: "Za početak instalacije odaberite 'Instaliraj'.",
	ClickUninstall: "Za početak uklanjanja odaberite 'Ukloni'.",
	Name: "Ime",
	Completed: "Završeno",
	LicenseText: "Pročitajte licencu prije instalacije programa $(^NameDA). Ukoliko prihvaćate sve uvjete ugovora, odaberite 'Prihvaćam'.",
	LicenseTextCB: "Pročitajte licencu prije instalacije programa $(^NameDA). Ukoliko prihvaćate sve uvjete ugovora, označite donji kvadratić. $_CLICK",
	LicenseTextRB: "Pročitajte licencu prije instalacije programa $(^NameDA). Ukoliko prihvaćate sve uvjete ugovora, odaberite prvu donju opciju. $_CLICK",
	UnLicenseText: "Pročitajte licencu prije uklanjanja programa $(^NameDA). Ukoliko prihvaćate sve uvjete ugovora, odaberite 'Prihvaćam'.",
	UnLicenseTextCB: "Pročitajte licencu prije uklanjanja programa $(^NameDA). Ukoliko prihvaćate sve uvjete ugovora, označite donji kvadratić. $_CLICK",
	UnLicenseTextRB: "Pročitajte licencu prije uklanjanja programa $(^NameDA). Ukoliko prihvaćate sve uvjete ugovora, odaberite prvu donju opciju. $_CLICK",
	Custom: "Posebna",
	ComponentsText: "Označite komponente koje želite instalirati i uklonite oznaku s onih koje ne želite instalirati. $_CLICK",
	ComponentsSubText1: "Izaberite tip instalacije:",
	ComponentsSubText2_NoInstTypes: "Odaberite komponente za instalaciju:",
	ComponentsSubText2: "Ili po izboru označite komponente koje želite instalirati:",
	UnComponentsText: "Označite komponente koje želite ukloniti i uklonite oznaku s onih koje ne želite ukloniti. $_CLICK",
	UnComponentsSubText1: "Izaberite tip uklanjanja:",
	UnComponentsSubText2_NoInstTypes: "Odaberite komponente za uklanjanje:",
	UnComponentsSubText2: "Ili po izboru označite komponente koje želite ukloniti:",
	DirText: "Program $(^NameDA) bit će instaliran u sljedeću mapu. Ako želite promijeniti odredište, pritisnite dugme za traženje mape i označite drugu mapu. $_CLICK",
	DirSubText: "Odredišna mapa",
	DirBrowseText: "Odaberite mapu u koju želite instalirati program $(^NameDA):",
	UnDirText: "Program $(^NameDA) bit će uklonjen iz sljedeće mape. Za uklanjanje s drugog mjesta odaberite 'Pregledaj' i označite drugu mapu. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Mapa iz koje će program $(^NameDA) biti uklonjen:",
	SpaceAvailable: "\"Slobodno prostora na disku: \"",
	SpaceRequired: "\"Potrebno prostora na disku: \"",
	UninstallingText: "Program $(^NameDA) bit će uklonjen iz sljedeće mape. $_CLICK",
	UninstallingSubText: "Uklanjam iz:",
	FileError: "Greška prilikom otvaranja datoteke za zapisivanje: \\r\\n\\r\\n$0\\r\\n\\r\\nPritisnite \"Abort\" ako želite prekinuti instalaciju,\\r\\n\"Retry\" ako želite pokušati ponovno, ili\\r\\n\"Ignore\" ako želite zanemariti tu datoteku",
	FileError_NoIgnore: "Greška prilikom otvaranja datoteke za zapisivanje: \\r\\n\\r\\n$0\\r\\n\\r\\nPritisnite \"Retry\" za ponovni pokušaj zapisivanja, ili\\r\\n\"Cancel\" za prekid instalacije",
	CantWrite: "\"Ne mogu zapisati: \"",
	CopyFailed: "Greška prilikom kopiranja",
	CopyTo: "\"Kopiraj u \"",
	Registering: "\"Prijava: \"",
	Unregistering: "\"Odjava: \"",
	SymbolNotFound: "\"Ne mogu naći simbol: \"",
	CouldNotLoad: "\"Ne mogu učitati: \"",
	CreateFolder: "\"Stvori mapu: \"",
	CreateShortcut: "\"Stvori prečac: \"",
	CreatedUninstaller: "\"Program za uklanjanje: \"",
	Delete: "\"Izbriši datoteku: \"",
	DeleteOnReboot: "\"Izbriši prilikom ponovnog pokretanja: \"",
	ErrorCreatingShortcut: "\"Greška prilikom stvaranja prečaca: \"",
	ErrorCreating: "\"Greška prilikom stvaranja: \"",
	ErrorDecompressing: "Greška dekompresije podataka! Oštećena instalacijska datoteka?",
	ErrorRegistering: "Greška prilikom prijavljivanja DLL-a",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Izvrši: \"",
	Extract: "\"Otpakiraj: \"",
	ErrorWriting: "\"Otpakiranje: greška zapisivanja u datoteku \"",
	InvalidOpcode: "Oštećena instalacijska datoteka: neispravan opkod",
	NoOLE: "\"Nema OLE za: \"",
	OutputFolder: "\"Izlazna mapa: \"",
	RemoveFolder: "\"Izbriši mapu: \"",
	RenameOnReboot: "\"Preimenuj prilikom ponovnog pokretanja: \"",
	Rename: "\"Preimenuj: \"",
	Skipped: "\"Preskočeno: \"",
	CopyDetails: "Kopiraj detalje u međuspremnik",
	LogInstall: "Logiraj instalacijski proces",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Croatian$1 = {
	header: header$c,
	id: id$c,
	font: font$c,
	code_page: code_page$c,
	rtl: rtl$c,
	strings: strings$c
};

var header$d = "NLF v6";
var id$d = 1029;
var font$d = {
	name: null,
	size: null
};
var code_page$d = 1250;
var rtl$d = false;
var strings$d = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Instalace $(^Name)",
	UninstallCaption: "Odinstalace $(^Name)",
	LicenseSubCaption: ": Licenční smlouva",
	ComponentsSubCaption: ": Možnosti instalace",
	DirSubCaption: ": Instalační složka",
	InstallingSubCaption: ": Instalace",
	CompletedSubCaption: ": Dokončeno",
	UnComponentsSubCaption: ": Možnosti odinstalace",
	UnDirSubCaption: ": Odinstalační složka",
	ConfirmSubCaption: ": Potvrzení",
	UninstallingSubCaption: ": Odinstalace",
	UnCompletedSubCaption: ": Dokončeno",
	BackBtn: "< &Zpět",
	NextBtn: "&Další >",
	AgreeBtn: "Souhl&asím",
	AcceptBtn: "Souhl&asím s podmínkami licenční smlouvy",
	DontAcceptBtn: "&Nesouhlasím s podmínkami licenční smlouvy",
	InstallBtn: "&Instalovat",
	UninstallBtn: "&Odinstalovat",
	CancelBtn: "Storno",
	CloseBtn: "&Zavřít",
	BrowseBtn: "P&rocházet...",
	ShowDetailsBtn: "&Podrobnosti",
	ClickNext: "Pokračujte kliknutím na tlačítko Další.",
	ClickInstall: "Instalaci spustíte kliknutím na tlačítko Instalovat.",
	ClickUninstall: "Odinstalaci spustíte kliknutím na tlačítko Odinstalovat.",
	Name: "Název",
	Completed: "Dokončeno",
	LicenseText: "Před instalací programu $(^NameDA) si prosím přečtěte licenční smlouvu. Jestliže souhlasíte s podmínkami této smlouvy, klikněte na tlačítko Souhlasím.",
	LicenseTextCB: "Před instalací programu $(^NameDA) si prosím přečtěte licenční smlouvu. Jestliže souhlasíte s podmínkami této smlouvy, zaškrtněte políčko níže. $_CLICK",
	LicenseTextRB: "Před instalací programu $(^NameDA) si prosím přečtěte licenční smlouvu. Jestliže souhlasíte s podmínkami této smlouvy, vyberte níže první možnost. $_CLICK",
	UnLicenseText: "Před odinstalací programu $(^NameDA) si prosím přečtěte licenční smlouvu. Jestliže souhlasíte s podmínkami této smlouvy, klikněte na tlačítko Souhlasím.",
	UnLicenseTextCB: "Před odinstalací programu $(^NameDA) si prosím přečtěte licenční smlouvu. Jestliže souhlasíte s podmínkami této smlouvy, zaškrtněte políčko níže. $_CLICK",
	UnLicenseTextRB: "Před odinstalací programu $(^NameDA) si prosím přečtěte licenční smlouvu. Jestliže souhlasíte s podmínkami této smlouvy, vyberte níže první možnost. $_CLICK",
	Custom: "Vlastní",
	ComponentsText: "Zaškrtněte součásti, které chcete nainstalovat a zrušte zaškrtnutí součástí, které nechcete nainstalovat. $_CLICK",
	ComponentsSubText1: "Zvolte způsob instalace:",
	ComponentsSubText2_NoInstTypes: "Vyberte součásti, které chcete nainstalovat.",
	ComponentsSubText2: "Nebo vyberte volitelné součásti, které chcete nainstalovat.",
	UnComponentsText: "Zaškrtněte součásti, které chcete odinstalovat a zrušte zaškrtnutí součástí, které nechcete odinstalovat. $_CLICK",
	UnComponentsSubText1: "Zvolte způsob odinstalace:",
	UnComponentsSubText2_NoInstTypes: "Vyberte součásti, které chcete odinstalovat.",
	UnComponentsSubText2: "Nebo vyberte volitelné součásti, které chcete odinstalovat.",
	DirText: "Instalační program nainstaluje program $(^NameDA) do následující složky. Chcete-li instalovat do jiné složky, klikněte na tlačítko Procházet a vyberte jinou složku. $_CLICK",
	DirSubText: "Cílová složka",
	DirBrowseText: "Výběr instalační složky programu $(^NameDA).",
	UnDirText: "Odinstalační program odinstaluje program $(^NameDA) z následující složky. Chcete-li odinstalovat z jiné složky, klikněte na tlačítko Procházet a vyberte jinou složku. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Vyberte odinstalační složku programu $(^NameDA):",
	SpaceAvailable: "\"Volné místo: \"",
	SpaceRequired: "\"Požadované místo: \"",
	UninstallingText: "Program $(^NameDA) bude odinstalován z následující složky. $_CLICK",
	UninstallingSubText: "Odinstalovat z:",
	FileError: "Soubor nelze otevřít pro zápis: \\r\\n\\t\"$0\"\\r\\nKlikněte na tlačítko Přerušit k ukončení instalace,\\r\\nnebo na tlačítko Opakovat k zopakování akce, nebo\\r\\n na tlačítko Ignorovat k přeskočení souboru.",
	FileError_NoIgnore: "Soubor nelze otevřít pro zápis: \\r\\n\\t\"$0\"\\r\\nKlikněte na tlačítko Opakovat k zopakování akce, nebo\\r\\n na tlačítko Storno k ukončení instalace.",
	CantWrite: "\"Nelze zapsat: \"",
	CopyFailed: "Kopírování se nezdařilo.",
	CopyTo: "\"Kopírování do \"",
	Registering: "\"Registrace: \"",
	Unregistering: "\"Rušení registrace: \"",
	SymbolNotFound: "\"Nelze najít symbol: \"",
	CouldNotLoad: "\"Nelze načíst: \"",
	CreateFolder: "\"Vytváření složky: \"",
	CreateShortcut: "\"Vytváření zástupce: \"",
	CreatedUninstaller: "\"Vytváření odinstalačního programu: \"",
	Delete: "\"Odstraňování souboru: \"",
	DeleteOnReboot: "\"Odstranit při restartování: \"",
	ErrorCreatingShortcut: "\"Při vytváření zástupce došlo k chybě: \"",
	ErrorCreating: "\"Při vytváření došlo k chybě: \"",
	ErrorDecompressing: "Při dekompresi dat došlo k chybě. Byl poškozen instalační program?",
	ErrorRegistering: "Při registraci souborů DLL došlo k chybě.",
	ExecShell: "\"Spouštění prostředí: \"",
	Exec: "\"Spouštění: \"",
	Extract: "\"Extrahování: \"",
	ErrorWriting: "\"Extrakce: Při zápisu souboru došlo k chybě \"",
	InvalidOpcode: "Instalační program byl poškozen: neplatný operační kód.",
	NoOLE: "\"Nedostupné OLE pro: \"",
	OutputFolder: "\"Výstupní složka: \"",
	RemoveFolder: "\"Odstraňování složky: \"",
	RenameOnReboot: "\"Přejmenovat při restartování: \"",
	Rename: "\"Přejmenováno: \"",
	Skipped: "\"Přeskočeno: \"",
	CopyDetails: "Zkopírovat podrobnosti do schránky",
	LogInstall: "Protokolovat proces instalace",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Czech$1 = {
	header: header$d,
	id: id$d,
	font: font$d,
	code_page: code_page$d,
	rtl: rtl$d,
	strings: strings$d
};

var header$e = "NLF v6";
var id$e = 1030;
var font$e = {
	name: null,
	size: null
};
var code_page$e = 1252;
var rtl$e = false;
var strings$e = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) Installation",
	UninstallCaption: "$(^Name) Afinstallation",
	LicenseSubCaption: ": Licensaftale",
	ComponentsSubCaption: ": Installationsvalgmuligheder",
	DirSubCaption: ": Installationsmappe",
	InstallingSubCaption: ": Installerer",
	CompletedSubCaption: ": Gennemført",
	UnComponentsSubCaption: ": Afinstallationsvalgmuligheder",
	UnDirSubCaption: ": Afinstallationsmappe",
	ConfirmSubCaption: ": Bekræft",
	UninstallingSubCaption: ": Afinstallerer",
	UnCompletedSubCaption: ": Gennemført",
	BackBtn: "< &Tilbage",
	NextBtn: "&Næste >",
	AgreeBtn: "Jeg &accepterer",
	AcceptBtn: "Jeg &accepterer vilkårene i licensaftalen",
	DontAcceptBtn: "Jeg &accepterer ikke vilkårene i licensaftalen",
	InstallBtn: "&Installer",
	UninstallBtn: "&Afinstaller",
	CancelBtn: "Annuller",
	CloseBtn: "&Luk",
	BrowseBtn: "G&ennemse...",
	ShowDetailsBtn: "Vis &detaljer",
	ClickNext: "Tryk på Næste for at fortsætte.",
	ClickInstall: "Tryk på Installer for at starte installationen.",
	ClickUninstall: "Tryk på Afinstaller for at starte afinstallationen.",
	Name: "Navn",
	Completed: "Gennemført",
	LicenseText: "Gennemlæs venligst licensaftalen før installationen af $(^NameDA). Hvis du accepterer alle vilkår i aftalen, skal du klikke på Jeg accepterer.",
	LicenseTextCB: "Gennemlæs venligst licensaftalen før installationen af $(^NameDA). Hvis du accepterer alle vilkår i aftalen, skal du klikke på afkrydsningsfeltet nedenfor. $_CLICK",
	LicenseTextRB: "Gennemlæs venligst licensaftalen før installationen af $(^NameDA). Hvis du accepterer alle vilkår i aftalen, skal du vælge den første valgmulighed nedenfor. $_CLICK",
	UnLicenseText: "Gennemlæs venligst licensaftalen før afinstallationen af $(^NameDA). Hvis du accepterer alle vilkår i aftalen, skal du trykke på Jeg accepterer.",
	UnLicenseTextCB: "Gennemlæs venligst licensaftalen før afinstallationen af $(^NameDA). Hvis du accepterer alle vilkår i aftalen, skal du klikke på afkrydsningsfeltet nedenfor. $_CLICK",
	UnLicenseTextRB: "Gennemlæs venligst licensaftalen før afinstallationen af $(^NameDA). Hvis du accepterer alle vilkår i aftalen, skal du vælge den første valgmulighed nedenfor. $_CLICK",
	Custom: "Brugerdefineret",
	ComponentsText: "Tilvælg de komponenter du vil installere, og fravælg de komponenter du ikke vil installere. $_CLICK",
	ComponentsSubText1: "Vælg installationstype:",
	ComponentsSubText2_NoInstTypes: "Vælg de komponenter der skal installeres:",
	ComponentsSubText2: "Eller vælg de valgfrie komponenter du ønsker at installere:",
	UnComponentsText: "Tilvælg de komponenter du vil afinstallere, og fravælg de komponenter du ikke vil afinstallere. $_CLICK",
	UnComponentsSubText1: "Vælg afinstallationstype:",
	UnComponentsSubText2_NoInstTypes: "Vælg de komponenter der skal afinstalleres:",
	UnComponentsSubText2: "Eller vælg de valgfrie komponenter du ønsker at afinstallere:",
	DirText: "Installationsguiden vil installere $(^NameDA) i følgende mappe. For at installere i en anden mappe, tryk på Gennemse og vælg en anden mappe. $_CLICK",
	DirSubText: "Destinationsmappe",
	DirBrowseText: "Vælg den mappe hvori $(^NameDA) skal installeres:",
	UnDirText: "Installationsguiden vil afinstallere $(^NameDA) fra følgende mappe. For at afinstallere fra en anden mappe, tryk på Gennemse og vælg en anden mappe. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Vælg den mappe hvorfra $(^NameDA) skal afinstalleres:",
	SpaceAvailable: "\"Ledig plads: \"",
	SpaceRequired: "\"Nødvendig plads: \"",
	UninstallingText: "$(^NameDA) vil blive afinstalleret fra følgende mappe. $_CLICK",
	UninstallingSubText: "Afinstallerer fra:",
	FileError: "Fejl ved skrivning af fil til skrivning: \\r\\n\\r\\n$0\\r\\n\\r\\nTryk på Annuller for at stoppe installationen,\\r\\nPrøv igen for at prøve igen, eller\\r\\nIgnorer for at springe over denne fil.",
	FileError_NoIgnore: "Fejl ved åbning af fil til skrivning: \\r\\n\\r\\n$0\\r\\n\\r\\nTryk på Prøv igen for at prøve igen, eller\\r\\nAnnuller for at stoppe installationen.",
	CantWrite: "\"Kan ikke skrive: \"",
	CopyFailed: "Kopiering mislykkedes",
	CopyTo: "\"Kopier til \"",
	Registering: "\"Registrerer: \"",
	Unregistering: "\"Afregisterer: \"",
	SymbolNotFound: "\"Kunne ikke finde symbol: \"",
	CouldNotLoad: "\"Kunne ikke indlæse: \"",
	CreateFolder: "\"Opret mappe: \"",
	CreateShortcut: "\"Opret genvej: \"",
	CreatedUninstaller: "\"Afinstallationsguide oprettet: \"",
	Delete: "\"Slet fil: \"",
	DeleteOnReboot: "\"Slet ved genstart: \"",
	ErrorCreatingShortcut: "\"Fejl ved oprettelse af genvej: \"",
	ErrorCreating: "\"Fejl ved oprettelse: \"",
	ErrorDecompressing: "Fejl ved udpakning af data! Beskadiget installationsguide?",
	ErrorRegistering: "Fejl ved registrering af DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Kør: \"",
	Extract: "\"Udpak: \"",
	ErrorWriting: "\"Udpak: fejl ved skrivning til fil \"",
	InvalidOpcode: "Beskadiget installationsguide: ugyldig opcode",
	NoOLE: "\"Ingen OLE for: \"",
	OutputFolder: "\"Outputmappe: \"",
	RemoveFolder: "\"Slet mappe: \"",
	RenameOnReboot: "\"Omdøb ved genstart: \"",
	Rename: "\"Omdøb: \"",
	Skipped: "\"Sprunget over: \"",
	CopyDetails: "Kopier detaljer til udklipsholderen",
	LogInstall: "Log installationsproces",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Danish$1 = {
	header: header$e,
	id: id$e,
	font: font$e,
	code_page: code_page$e,
	rtl: rtl$e,
	strings: strings$e
};

var header$f = "NLF v6";
var id$f = 1043;
var font$f = {
	name: null,
	size: null
};
var code_page$f = 1252;
var rtl$f = false;
var strings$f = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name)-installatie",
	UninstallCaption: "$(^Name)-deïnstallatie",
	LicenseSubCaption: ": Licentieovereenkomst",
	ComponentsSubCaption: ": Installatieopties",
	DirSubCaption: ": Installatiemap",
	InstallingSubCaption: ": Bezig met installeren",
	CompletedSubCaption: ": Voltooid",
	UnComponentsSubCaption: ": Verwijderingsopties",
	UnDirSubCaption: ": Te verwijderen map",
	ConfirmSubCaption: ": Bevestiging",
	UninstallingSubCaption: ": Bezig met verwijderen",
	UnCompletedSubCaption: ": Voltooid",
	BackBtn: "< V&orige",
	NextBtn: "&Volgende >",
	AgreeBtn: "&Akkoord",
	AcceptBtn: "Ik &accepteer de overeenkomst",
	DontAcceptBtn: "Ik accepteer de overeenkomst &niet",
	InstallBtn: "&Installeren",
	UninstallBtn: "&Verwijderen",
	CancelBtn: "Annuleren",
	CloseBtn: "&Afsluiten",
	BrowseBtn: "&Bladeren...",
	ShowDetailsBtn: "&Details tonen",
	ClickNext: "Klik op Volgende om verder te gaan.",
	ClickInstall: "Klik op Installeren om de installatie te beginnen.",
	ClickUninstall: "Klik op Verwijderen om de deïnstallatie te beginnen.",
	Name: "Naam",
	Completed: "Voltooid",
	LicenseText: "Lees de licentieovereenkomst voordat u $(^NameDA) installeert. Klik op Akkoord als u de overeenkomst accepteert.",
	LicenseTextCB: "Lees de licentieovereenkomst voordat u $(^NameDA) installeert. Schakel het selectievakje hieronder in als u de overeenkomst accepteert. $_CLICK",
	LicenseTextRB: "Lees de licentieovereenkomst voordat u $(^NameDA) installeert. Selecteer de eerste optie hieronder als u de overeenkomst accepteert. $_CLICK",
	UnLicenseText: "Lees de licentieovereenkomst voordat u $(^NameDA) verwijdert. Klik op Akkoord als u de overeenkomst accepteert.",
	UnLicenseTextCB: "Lees de licentieovereenkomst voordat u $(^NameDA) verwijdert. Schakel het selectievakje hieronder in als u de overeenkomst accepteert. $_CLICK",
	UnLicenseTextRB: "Lees de licentieovereenkomst voordat u $(^NameDA) verwijdert. Selecteer de eerste optie hieronder als u de overeenkomst accepteert. $_CLICK",
	Custom: "Aangepast",
	ComponentsText: "Selecteer de onderdelen die u wilt installeren en deselecteer welke u niet wilt installeren. $_CLICK",
	ComponentsSubText1: "Selecteer het installatietype:",
	ComponentsSubText2_NoInstTypes: "Selecteer de onderdelen die moeten worden geïnstalleerd:",
	ComponentsSubText2: "Of selecteer de optionele onderdelen die moeten worden geïnstalleerd:",
	UnComponentsText: "Selecteer de onderdelen die u wilt verwijderen en deselecteer welke u niet wilt verwijderen. $_CLICK",
	UnComponentsSubText1: "Selecteer het type verwijdering:",
	UnComponentsSubText2_NoInstTypes: "Selecteer de onderdelen die moeten worden verwijderd:",
	UnComponentsSubText2: "Of selecteer de optionele onderdelen die moeten worden verwijderd:",
	DirText: "Setup zal $(^NameDA) in de volgende map installeren. Klik op Bladeren als u $(^NameDA) in een andere map wilt installeren en selecteer deze. $_CLICK",
	DirSubText: "Installatiemap",
	DirBrowseText: "Selecteer de map om $(^NameDA) in te installeren:",
	UnDirText: "Setup zal $(^NameDA) uit de volgende map verwijderen. Klik op Bladeren als u $(^NameDA) uit een andere map wilt verwijderen en selecteer deze. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Selecteer de map om $(^NameDA) uit te verwijderen:",
	SpaceAvailable: "\"Beschikbare ruimte: \"",
	SpaceRequired: "\"Vereiste ruimte: \"",
	UninstallingText: "$(^NameDA) zal uit de volgende map worden verwijderd. $_CLICK",
	UninstallingSubText: "Verwijderen uit:",
	FileError: "Fout bij het schrijven naar bestand: \\r\\n\\r\\n$0\\r\\n\\r\\nKlik op Afbreken om de installatie te stoppen,\\r\\nOpnieuw om het opnieuw te proberen of\\r\\nNegeren om dit bestand over te slaan.",
	FileError_NoIgnore: "Fout bij het schrijven naar bestand: \\r\\n\\r\\n$0\\r\\n\\r\\nKlik op Opnieuw om het opnieuw te proberen of \\r\\nAnnuleren om de installatie te stoppen.",
	CantWrite: "\"Kon niet schrijven: \"",
	CopyFailed: "Kopiëren mislukt",
	CopyTo: "\"Kopiëren naar \"",
	Registering: "\"Registreren: \"",
	Unregistering: "\"Deregistreren: \"",
	SymbolNotFound: "\"Kon symbool niet vinden: \"",
	CouldNotLoad: "\"Kon niet laden: \"",
	CreateFolder: "\"Map maken: \"",
	CreateShortcut: "\"Snelkoppeling maken: \"",
	CreatedUninstaller: "\"Deïnstallatieprogramma gemaakt: \"",
	Delete: "\"Bestand verwijderen: \"",
	DeleteOnReboot: "\"Verwijderen na opnieuw opstarten: \"",
	ErrorCreatingShortcut: "\"Fout bij maken snelkoppeling: \"",
	ErrorCreating: "\"Fout bij maken: \"",
	ErrorDecompressing: "Fout bij uitpakken van gegevens! Gegevens beschadigd?",
	ErrorRegistering: "Fout bij registreren DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Uitvoeren: \"",
	Extract: "\"Uitpakken: \"",
	ErrorWriting: "\"Uitpakken: fout bij schrijven naar bestand \"",
	InvalidOpcode: "Installatieprogramma beschadigd: ongeldige opcode",
	NoOLE: "\"Geen OLE voor: \"",
	OutputFolder: "\"Uitvoermap: \"",
	RemoveFolder: "\"Map verwijderen: \"",
	RenameOnReboot: "\"Hernoemen na opnieuw opstarten: \"",
	Rename: "\"Hernoemen: \"",
	Skipped: "\"Overgeslagen: \"",
	CopyDetails: "Details kopiëren naar klembord",
	LogInstall: "Gegevens over installatie bewaren",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Dutch$1 = {
	header: header$f,
	id: id$f,
	font: font$f,
	code_page: code_page$f,
	rtl: rtl$f,
	strings: strings$f
};

var header$g = "NLF v6";
var id$g = 1033;
var font$g = {
	name: null,
	size: null
};
var code_page$g = null;
var rtl$g = false;
var strings$g = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) Setup",
	UninstallCaption: "$(^Name) Uninstall",
	LicenseSubCaption: ": License Agreement",
	ComponentsSubCaption: ": Installation Options",
	DirSubCaption: ": Installation Folder",
	InstallingSubCaption: ": Installing",
	CompletedSubCaption: ": Completed",
	UnComponentsSubCaption: ": Uninstallation Options",
	UnDirSubCaption: ": Uninstallation Folder",
	ConfirmSubCaption: ": Confirmation",
	UninstallingSubCaption: ": Uninstalling",
	UnCompletedSubCaption: ": Completed",
	BackBtn: "< &Back",
	NextBtn: "&Next >",
	AgreeBtn: "I &Agree",
	AcceptBtn: "I &accept the terms of the License Agreement",
	DontAcceptBtn: "I &do not accept the terms of the License Agreement",
	InstallBtn: "&Install",
	UninstallBtn: "&Uninstall",
	CancelBtn: "Cancel",
	CloseBtn: "&Close",
	BrowseBtn: "B&rowse...",
	ShowDetailsBtn: "Show &details",
	ClickNext: "Click Next to continue.",
	ClickInstall: "Click Install to start the installation.",
	ClickUninstall: "Click Uninstall to start the uninstallation.",
	Name: "Name",
	Completed: "Completed",
	LicenseText: "Please review the license agreement before installing $(^NameDA). If you accept all terms of the agreement, click I Agree.",
	LicenseTextCB: "Please review the license agreement before installing $(^NameDA). If you accept all terms of the agreement, click the check box below. $_CLICK",
	LicenseTextRB: "Please review the license agreement before installing $(^NameDA). If you accept all terms of the agreement, select the first option below. $_CLICK",
	UnLicenseText: "Please review the license agreement before uninstalling $(^NameDA). If you accept all terms of the agreement, click I Agree.",
	UnLicenseTextCB: "Please review the license agreement before uninstalling $(^NameDA). If you accept all terms of the agreement, click the check box below. $_CLICK",
	UnLicenseTextRB: "Please review the license agreement before uninstalling $(^NameDA). If you accept all terms of the agreement, select the first option below. $_CLICK",
	Custom: "Custom",
	ComponentsText: "Check the components you want to install and uncheck the components you don't want to install. $_CLICK",
	ComponentsSubText1: "Select the type of install:",
	ComponentsSubText2_NoInstTypes: "Select components to install:",
	ComponentsSubText2: "Or, select the optional components you wish to install:",
	UnComponentsText: "Check the components you want to uninstall and uncheck the components you don't want to uninstall. $_CLICK",
	UnComponentsSubText1: "Select the type of uninstall:",
	UnComponentsSubText2_NoInstTypes: "Select components to uninstall:",
	UnComponentsSubText2: "Or, select the optional components you wish to uninstall:",
	DirText: "Setup will install $(^NameDA) in the following folder. To install in a different folder, click Browse and select another folder. $_CLICK",
	DirSubText: "Destination Folder",
	DirBrowseText: "Select the folder to install $(^NameDA) in:",
	UnDirText: "Setup will uninstall $(^NameDA) from the following folder. To uninstall from a different folder, click Browse and select another folder. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Select the folder to uninstall $(^NameDA) from:",
	SpaceAvailable: "\"Space available: \"",
	SpaceRequired: "\"Space required: \"",
	UninstallingText: "$(^NameDA) will be uninstalled from the following folder. $_CLICK",
	UninstallingSubText: "Uninstalling from:",
	FileError: "Error opening file for writing: \\r\\n\\r\\n$0\\r\\n\\r\\nClick Abort to stop the installation,\\r\\nRetry to try again, or\\r\\nIgnore to skip this file.",
	FileError_NoIgnore: "Error opening file for writing: \\r\\n\\r\\n$0\\r\\n\\r\\nClick Retry to try again, or\\r\\nCancel to stop the installation.",
	CantWrite: "\"Can't write: \"",
	CopyFailed: "Copy failed",
	CopyTo: "\"Copy to \"",
	Registering: "\"Registering: \"",
	Unregistering: "\"Unregistering: \"",
	SymbolNotFound: "\"Could not find symbol: \"",
	CouldNotLoad: "\"Could not load: \"",
	CreateFolder: "\"Create folder: \"",
	CreateShortcut: "\"Create shortcut: \"",
	CreatedUninstaller: "\"Created uninstaller: \"",
	Delete: "\"Delete file: \"",
	DeleteOnReboot: "\"Delete on reboot: \"",
	ErrorCreatingShortcut: "\"Error creating shortcut: \"",
	ErrorCreating: "\"Error creating: \"",
	ErrorDecompressing: "Error decompressing data! Corrupted installer?",
	ErrorRegistering: "Error registering DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Execute: \"",
	Extract: "\"Extract: \"",
	ErrorWriting: "\"Extract: error writing to file \"",
	InvalidOpcode: "Installer corrupted: invalid opcode",
	NoOLE: "\"No OLE for: \"",
	OutputFolder: "\"Output folder: \"",
	RemoveFolder: "\"Remove folder: \"",
	RenameOnReboot: "\"Rename on reboot: \"",
	Rename: "\"Rename: \"",
	Skipped: "\"Skipped: \"",
	CopyDetails: "Copy Details To Clipboard",
	LogInstall: "Log install process",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var English$1 = {
	header: header$g,
	id: id$g,
	font: font$g,
	code_page: code_page$g,
	rtl: rtl$g,
	strings: strings$g
};

var header$h = "NLF v6";
var id$h = 9998;
var font$h = {
	name: null,
	size: null
};
var code_page$h = null;
var rtl$h = false;
var strings$h = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Instalado de $(^Name)",
	UninstallCaption: "Malinstalado de $(^Name)",
	LicenseSubCaption: ": Permes-Kontrakto",
	ComponentsSubCaption: ": Instaladaj Opcioj",
	DirSubCaption: ": Instalada Dosierujo",
	InstallingSubCaption: ": Oni Instalas Dosierojn",
	CompletedSubCaption: ": Kompletite",
	UnComponentsSubCaption: ": Malinstaladaj Opcioj",
	UnDirSubCaption: ": Malinstalada Dosierujo",
	ConfirmSubCaption: ": Konfirmo",
	UninstallingSubCaption: ": Oni malinstalas",
	UnCompletedSubCaption: ": Kompletite",
	BackBtn: "< &Antauxe",
	NextBtn: "&Sekve >",
	AgreeBtn: "&Akceptite",
	AcceptBtn: "Mi &akceptas la kondicxojn de la Permes-Kontrakto",
	DontAcceptBtn: "Mi &ne akceptas la kondicxojn de la Permes-Kontrakto",
	InstallBtn: "&Instali",
	UninstallBtn: "&Malinstali",
	CancelBtn: "Nuligi",
	CloseBtn: "&Fermi",
	BrowseBtn: "&Sercxi...",
	ShowDetailsBtn: "Vidi &Detalojn",
	ClickNext: "Musklaku en 'Sekve' por dauxrigi.",
	ClickInstall: "Musklaku en 'Instali' por ekigi la instaladon.",
	ClickUninstall: "Musklaku en 'Malinstali' por ekigi la malinstaladon.",
	Name: "Nomo",
	Completed: "Kompletite",
	LicenseText: "Bonvole revidu la permes-akordon antaux ol instali $(^NameDA). Se vi konsentas kun cxiuj kondicxoj de la permeso, musklaku en 'Akceptite'.",
	LicenseTextCB: "Bonvole revidu la permes-akordon antaux ol instali $(^NameDA). Se vi konsentas kun cxiuj kondicxoj de la permeso, musklaku en la suba elekt-skatolo. $_CLICK",
	LicenseTextRB: "Bonvole revidu la permes-akordon antaux ol instali $(^NameDA). Se vi konsentas kun cxiuj kondicxoj de la permeso, elektu la unuan opcion sube. $_CLICK",
	UnLicenseText: "Bonvole revidu la permes-akordon antaux ol malinstali $(^NameDA). Se vi konsentas kun cxiuj kondicxoj de la permeso, musklaku en 'Akceptite'.",
	UnLicenseTextCB: "Bonvole revidu la permes-akordon antaux ol malinstali $(^NameDA). Se vi konsentas kun cxiuj kondicxoj de la permeso, musklaku en la suba elekt-skatolo. $_CLICK",
	UnLicenseTextRB: "Bonvole revidu la permes-akordon antaux ol malinstali $(^NameDA). Se vi konsentas kun cxiuj kondicxoj de la permeso, elektu la unuan opcion sube. $_CLICK",
	Custom: "Personigite",
	ComponentsText: "Marku la konsisterojn, kiujn vi deziras instali kaj malmarku tiujn, kiujn vi ne deziras instali. $_CLICK",
	ComponentsSubText1: "Elektu la tipon de instalado:",
	ComponentsSubText2_NoInstTypes: "Elektu la konsisterojn por instali:",
	ComponentsSubText2: "Aux, elektu la nedevigajn konsisterojn, kiujn vi deziras instali:",
	UnComponentsText: "Marku la konsisterojn, kiujn vi volas malinstali aux male. $_CLICK ",
	UnComponentsSubText1: "Elektu la tipon de malinstalado:",
	UnComponentsSubText2_NoInstTypes: "Elektu la konsisterojn por malinstali:",
	UnComponentsSubText2: "Aux, elektu la nedevigajn konsisterojn, kiujn vi deziras malinstali:",
	DirText: "$(^NameDA) estos instalita en la jena dosierujo. Por instali en alia dosierujo, musklaku en 'Sercxi...' kaj elektu gxin. $_CLICK",
	DirSubText: "Celota Dosierujo",
	DirBrowseText: "Elektu dosierujon por instali $(^NameDA):",
	UnDirText: "$(^NameDA) estos malinstalita el la jena dosierujo. Por malinstali en alia dosierujo, musklaku en 'Sercxi...' kaj elektu gxin. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Elektu dosierujon el kie $(^NameDA) estos malinstalita:",
	SpaceAvailable: "\"Disponebla spaco: \"",
	SpaceRequired: "\"Postulata spaco: \"",
	UninstallingText: "$(^NameDA) estos malinstalita el la jena dosierujo. $_CLICK",
	UninstallingSubText: "Malinstalado el:",
	FileError: "Eraro dum malfermo de dosiero por skribi: \\r\\n\\t\"$0\"\\r\\nMusklaku en Cxesigi por finigi la instaladon,\\r\\Ripeti por provi refoje skribi sur la dosiero, aux\\r\\nPreteratenti por preteratenti tiun cxi dosieron.",
	FileError_NoIgnore: "Eraro dum malfermo de dosierujo por skribi: \\r\\n\\t\"$0\"\\r\\nMusklaku en Ripeti por provi refoje skribi sur la dosiero, aux\\r\\nNuligi por cxesigi la instaladon.",
	CantWrite: "\"Ne eblis skribi: \"",
	CopyFailed: "Malsukceso dum kopio",
	CopyTo: "\"Kopii al \"",
	Registering: "\"Oni registras: \"",
	Unregistering: "\"Oni malregistras: \"",
	SymbolNotFound: "\"Ne trovita simbolo: \"",
	CouldNotLoad: "\"Ne eblis sxargi: \"",
	CreateFolder: "\"Oni kreas subdosierujon: \"",
	CreateShortcut: "\"Oni kreas lancxilon: \"",
	CreatedUninstaller: "\"Oni kreas malinstalilon: \"",
	Delete: "\"Oni forigas dosieron: \"",
	DeleteOnReboot: "\"Forigi je restarto: \"",
	ErrorCreatingShortcut: "\"Eraro dum kreo de lancxilo: \"",
	ErrorCreating: "\"Eraro dum kreo: \"",
	ErrorDecompressing: "Eraro dum malkompaktigo de datumaro! Cxu misrompita instalilo?",
	ErrorRegistering: "Eraru dum registro de DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Lancxi: \"",
	Extract: "\"Eltiri: \"",
	ErrorWriting: "\"Eltirado: eraro dum skribo de dosiero \"",
	InvalidOpcode: "Misrompita instalilo: malvalida operaci-kodo",
	NoOLE: "\"Sen OLE por: \"",
	OutputFolder: "\"Celota dosierujo: \"",
	RemoveFolder: "\"Oni forigas la dosierujon: \"",
	RenameOnReboot: "\"Renomigi je restarto: \"",
	Rename: "\"Oni renomigas: \"",
	Skipped: "\"Preterpasita: \"",
	CopyDetails: "Kopii detalojn al la tondejo",
	LogInstall: "Registri instalad-procezo",
	Byte: "B",
	Kilo: " k",
	Mega: " M",
	Giga: " G"
};
var Esperanto$1 = {
	header: header$h,
	id: id$h,
	font: font$h,
	code_page: code_page$h,
	rtl: rtl$h,
	strings: strings$h
};

var header$i = "NLF v6";
var id$i = 1061;
var font$i = {
	name: null,
	size: null
};
var code_page$i = 1257;
var rtl$i = false;
var strings$i = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) Paigaldamine",
	UninstallCaption: "$(^Name) Eemaldamine",
	LicenseSubCaption: ": Litsentsileping",
	ComponentsSubCaption: ": Paigaldusvalikud",
	DirSubCaption: ": Paigalduskaust",
	InstallingSubCaption: ": Paigaldan\t\t\t",
	CompletedSubCaption: ": Valmis",
	UnComponentsSubCaption: ": Eemaldusvalikud",
	UnDirSubCaption: ": Eemalduskaust",
	ConfirmSubCaption: ": Kinnitus",
	UninstallingSubCaption: ": Eemaldan",
	UnCompletedSubCaption: ": Valmis",
	BackBtn: "< Tagasi",
	NextBtn: "Edasi >",
	AgreeBtn: "Nõustun",
	AcceptBtn: "Nõustun litsentsilepingu tingimustega",
	DontAcceptBtn: "Ei nõustu litsentsilepingu tingimustega",
	InstallBtn: "Paigalda",
	UninstallBtn: "Eemalda",
	CancelBtn: "Loobu",
	CloseBtn: "Sule",
	BrowseBtn: "Sirvi...",
	ShowDetailsBtn: "Detailid",
	ClickNext: "Jätkamiseks vajuta Edasi.",
	ClickInstall: "Paigaldamise alustamiseks vajuta Paigalda.",
	ClickUninstall: "Eemaldamise alustamiseks vajuta Eemalda.",
	Name: "Nimi",
	Completed: "Valmis",
	LicenseText: "Enne $(^NameDA) paigaldamist vaata palun litsentsileping üle. Kui sa nõustud kõigi lepingu tingimustega, vajuta Nõustun.",
	LicenseTextCB: "Enne $(^NameDA) paigaldamist vaata palun litsentsileping üle. Kui sa nõustud kõigi lepingu tingimustega, vali allolev märkeruut. $_CLICK",
	LicenseTextRB: "Enne $(^NameDA) paigaldamist vaata palun litsentsileping üle. Kui sa nõustud kõigi lepingu tingimustega, märgi allpool esimene valik. $_CLICK",
	UnLicenseText: "Enne $(^NameDA) eemaldamist vaata palun litsentsileping üle. Kui sa nõustud kõigi lepingu tingimustega, vajuta Nõustun.",
	UnLicenseTextCB: "Enne $(^NameDA) eemaldamist vaata palun litsentsileping üle. Kui sa nõustud kõigi lepingu tingimustega, vali allolev märkeruut. $_CLICK",
	UnLicenseTextRB: "Enne $(^NameDA) eemaldamist vaata palun litsentsileping üle. Kui sa nõustud kõigi lepingu tingimustega, märgi allpool esimene valik. $_CLICK",
	Custom: "Kohandatud",
	ComponentsText: "Märgista komponendid mida soovid paigaldada ja eemalda märgistus neilt, mida ei soovi paigaldada. $_CLICK",
	ComponentsSubText1: "Vali paigalduse tüüp:",
	ComponentsSubText2_NoInstTypes: "Vali paigaldatavad komponendid:",
	ComponentsSubText2: "või vali lisakomponendid mida soovid paigaldada:",
	UnComponentsText: "Märgista komponendid mida soovid eemaldada ja eemalda märgistus neilt, mida ei soovi eemaldada. $_CLICK",
	UnComponentsSubText1: "Vali eemalduse tüüp:",
	UnComponentsSubText2_NoInstTypes: "Vali eemaldatavad komponendid:",
	UnComponentsSubText2: "või vali lisakomponendid mida soovid eemaldada:",
	DirText: "$(^NameDA) paigaldatakse järgmisse kausta. Et mujale paigaldada, vajuta sirvi ja vali teine kaust. $_CLICK",
	DirSubText: "Sihtkaust",
	DirBrowseText: "Vali kaust kuhu $(^NameDA) paigaldada:",
	UnDirText: "$(^NameDA) eemaldatakse järgmisest kaustast. Et mujalt eemaldada, vajuta sirvi ja vali teine kaust. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Vali kaust kust $(^NameDA) eemaldada:",
	SpaceAvailable: "\"Vaba ruum: \"",
	SpaceRequired: "\"Vajalik ruum: \"",
	UninstallingText: "$(^NameDA) eemaldatakse järgmisest kaustast. $_CLICK",
	UninstallingSubText: "Eemaldan sealt:",
	FileError: "Tõrge faili avamisel kirjutamiseks: \\r\\n\\t\"$0\"\\r\\nPaigalduse katkestamiseks vajuta Katkesta,\\r\\nvajuta Ürita uuesti, et faili kirjutamist uuesti proovida, või\\r\\nIgnoreeri, et see fail vahele jätta.",
	FileError_NoIgnore: "Tõrge faili avamisel kirjutamiseks: \\r\\n\\t\"$0\"\\r\\nVajuta Ürita uuesti, et faili kirjutamist uuesti proovida, või\\r\\nLoobu, et paigaldamine katkestada",
	CantWrite: "\"Ei saa kirjutada: \"",
	CopyFailed: "Kopeerimine ebaõnnestus",
	CopyTo: "\"Kopeeri sinna \"",
	Registering: "\"Registreerin: \"",
	Unregistering: "\"Deregistreerin: \"",
	SymbolNotFound: "\"Ei leidnud sümbolit: \"",
	CouldNotLoad: "\"Ei saanud laadida: \"",
	CreateFolder: "\"Loo kaust: \"",
	CreateShortcut: "\"Loo otsetee: \"",
	CreatedUninstaller: "\"Loodud eemaldaja: \"",
	Delete: "\"Kustuta fail: \"",
	DeleteOnReboot: "\"Kustuta taaskäivitamisel: \"",
	ErrorCreatingShortcut: "\"Tõrge otsetee loomisel: \"",
	ErrorCreating: "\"Tõrge loomisel: \"",
	ErrorDecompressing: "Tõrge andmete lahtipakkimisel! Vigane paigaldaja?",
	ErrorRegistering: "Tõrge DLL-i registreerimisel",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Käivita: \"",
	Extract: "\"Paki lahti: \"",
	ErrorWriting: "\"Paki lahti: viga faili kirjutamisel \"",
	InvalidOpcode: "Paigaldaja kõlbmatu: vigane opkood",
	NoOLE: "\"No OLE for: \"",
	OutputFolder: "\"Väljastatav kaust: \"",
	RemoveFolder: "\"Eemalda kaust: \"",
	RenameOnReboot: "\"Taaskäivitusel nimeta ümber: \"",
	Rename: "\"Nimeta ümber: \"",
	Skipped: "\"Vahele jäetud: \"",
	CopyDetails: "Kopeeri detailid lõikelauale",
	LogInstall: "Logi paigaldusprotsess",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Estonian$1 = {
	header: header$i,
	id: id$i,
	font: font$i,
	code_page: code_page$i,
	rtl: rtl$i,
	strings: strings$i
};

var header$j = "NLF v6";
var id$j = 1065;
var font$j = {
	name: null,
	size: null
};
var code_page$j = 1256;
var rtl$j = true;
var strings$j = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "نصب $(^Name) ",
	UninstallCaption: "حذف $(^Name) ",
	LicenseSubCaption: ": مجوز نصب",
	ComponentsSubCaption: ": گزینه‌های نصب",
	DirSubCaption: ": پوشه نصب",
	InstallingSubCaption: ": در حال نصب",
	CompletedSubCaption: ": پایان یافت",
	UnComponentsSubCaption: ": گزینه‌های حذف",
	UnDirSubCaption: ": پوشه‌ی حذف",
	ConfirmSubCaption: ": تأیید",
	UninstallingSubCaption: ": در حال حذف",
	UnCompletedSubCaption: ": پایان یافت",
	BackBtn: "&قبل ",
	NextBtn: "&بعد",
	AgreeBtn: "&موافقم",
	AcceptBtn: "من همه‌ی بندهای مجوز را قبول &دارم",
	DontAcceptBtn: "من بندهای مجوز را قبول &ندارم",
	InstallBtn: "&نصب",
	UninstallBtn: "&حذف",
	CancelBtn: "انصراف",
	CloseBtn: "&بستن",
	BrowseBtn: "&مرور...",
	ShowDetailsBtn: "نمایش جزئیات",
	ClickNext: "برای ادامه روی دکمه‌ی بعد کلیک کنید.",
	ClickInstall: "برای شروع نصب روی دکمه‌ی نصب کلیک کنید.",
	ClickUninstall: "برای شروع حذف روی دکمه‌ی حذف کلیک کنید.",
	Name: "نام",
	Completed: "پایان یافت",
	LicenseText: "لطفاً قبل از نصب $(^NameDA) متن مجوز را بخوانید. اگر همه‌ی بندهای آن را قبول دارید روی دکمه‌ی موافقم کلیک کنید.",
	LicenseTextCB: "لطفاً قبل از نصب $(^NameDA) متن مجوز را بخوانید. اگر همه‌ی بندهای آن را قبول دارید روی جعبه نشانه‌زنی زیر کلیک کنید. $_CLICK",
	LicenseTextRB: "لطفاً قبل از نصب $(^NameDA) متن مجوز را بخوانید. اگر همه‌ی بندهای آن را قبول دارید گزینه‌ی اول را انتخاب کنید. $_CLICK",
	UnLicenseText: "لطفاً قبل از حذف $(^NameDA) متن مجوز را بخوانید. اگر همه‌ی بندهای آن را قبول دارید روی دکمه‌ی موافقم کلیک کنید.",
	UnLicenseTextCB: "لطفاً قبل از حذف $(^NameDA) متن مجوز را بخوانید. اگر همه‌ی بندهای آن را قبول دارید روی جعبه نشانه‌زنی زیر کلیک کنید. $_CLICK",
	UnLicenseTextRB: "لطفاً قبل از حذف $(^NameDA) متن مجوز را بخوانید. اگر همه‌ی بندهای آن را قبول دارید گزینه‌ی اول را انتخاب کنید. $_CLICK",
	Custom: "سفارشی",
	ComponentsText: "کنار بخش‌هایی که می‌خواهید نصب شوند نشانه بزنید و نشانه بخش‌هایی را که نمی‌خواهید نصب شوند بردارید. $_CLICK",
	ComponentsSubText1: "نوع نصب را مشخص کنید: ",
	ComponentsSubText2_NoInstTypes: "بخش‌هایی را که می‌خواهید نصب شوند انتخاب کنید:",
	ComponentsSubText2: "یا، بخش‌های اختیاری را که می‌خواهید نصب شوند انتخاب کنید: ",
	UnComponentsText: "کنار بخش‌هایی که می‌خواهید حذف شوند نشانه بزنید و نشانه بخش‌هایی را که نمی‌خواهید حذف شوند بردارید. $_CLICK",
	UnComponentsSubText1: "نوع حذف را انتخاب کنید: ",
	UnComponentsSubText2_NoInstTypes: "بخش‌هایی را که می‌خواهید حذف شوند انتخاب کنید:",
	UnComponentsSubText2: "یا، بخش‌های اختیاری را که می‌خواهید حذف شوند انتخاب کنید: ",
	DirText: "برنامه نصب، $(^NameDA) را در پوشه‌ی زیر نصب خواهد کرد. برای نصب در پوشه‌ی دیگر روی دکمه مرور کلیک کنید و پوشه‌ی دیگری انتخاب کنید. $_CLICK",
	DirSubText: "پوشه‌ی مقصد",
	DirBrowseText: "انتخاب پوشه برای نصب $(^NameDA):",
	UnDirText: "برنامه نصب، $(^NameDA) را از پوشه‌ی زیر حذف خواهد کرد. برای نصب در پوشه‌ی دیگر روی دکمه مرور کلیک کنید و پوشه‌ی دیگری انتخاب کنید. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "انتخاب پوشه برای حذف $(^NameDA):",
	SpaceAvailable: "\"فضای موجود: \"",
	SpaceRequired: "\"فضای مورد نیاز: \"",
	UninstallingText: "$(^NameDA) از پوشه‌ی زیر حذف خواهد شد. $_CLICK",
	UninstallingSubText: "حذف از: ",
	FileError: "خطا هنگام باز کردن پرونده برای نوشتن: \\r\\n\\r\\n$0\\r\\n\\n برای توقف نصب روی Abort \\r\\n برای تلاش مجدد روی Retry \\r\\n و برای صرف‌نظر از این پرونده روی Ignore کلیک کنید.",
	FileError_NoIgnore: "خطا هنگام باز کردن پرونده برای نوشتن: \\r\\n\\r\\n$0\\r\\n\\nبرای تلاش مجدد روی Retry\\r\\nو برای انصراف روی Cancel کلیک کنید.",
	CantWrite: "\"نوشتن ممکن نیست: \"",
	CopyFailed: "نسخه‌برداری ناموفق بود.",
	CopyTo: "\"نسخه‌برداری در: \"",
	Registering: "\"در حال ثبت: \"",
	Unregistering: "\"در حال حذف ثبت: \"",
	SymbolNotFound: "\"علامت پیدا نشد: \"",
	CouldNotLoad: "\"بارگذاری ممکن نیست: \"",
	CreateFolder: "\"ایجاد پوشه: \"",
	CreateShortcut: "\"ایجاد میان‌بُر: \"",
	CreatedUninstaller: "\"حذف‌کننده ایجاد شد: \"",
	Delete: "\"حذف پرونده: \"",
	DeleteOnReboot: "\"حذف هنگام راه اندازی مجدد: \"",
	ErrorCreatingShortcut: "\"خطا هنگام ایجاد میان‌بُر: \"",
	ErrorCreating: "\"خطا هنگام ایجاد: \"",
	ErrorDecompressing: "خطا هنگام باز کردن اطلاعات! نصب‌کننده خراب است؟",
	ErrorRegistering: "خطا هنگام ثبت DLL",
	ExecShell: "\"پوسته اجرایی: \"",
	Exec: "\"اجرا: \"",
	Extract: "\"استخراج: \"",
	ErrorWriting: "\"استخراج: خطا هنگام نوشتن در پرونده\"",
	InvalidOpcode: "نصب‌کننده خراب است: کد عملیاتی نامعتبر.",
	NoOLE: "\"‏OLE وجود ندارد: \"",
	OutputFolder: "\"پوشه‌ی خروجی: \"",
	RemoveFolder: "\"حذف پوشه: \"",
	RenameOnReboot: "\"تغییر نام هنگام راه اندازی مجدد: \"",
	Rename: "\"تغییر نام: \"",
	Skipped: "\"چشم پوشی شد: \"",
	CopyDetails: "نسخه‌برداری جزئیات در کلیپ‌برد",
	LogInstall: "ثبت روند نصب",
	Byte: " بایت",
	Kilo: " کیلو",
	Mega: " مگا",
	Giga: " گیگا"
};
var Farsi$1 = {
	header: header$j,
	id: id$j,
	font: font$j,
	code_page: code_page$j,
	rtl: rtl$j,
	strings: strings$j
};

var header$k = "NLF v6";
var id$k = 1035;
var font$k = {
	name: null,
	size: null
};
var code_page$k = 1252;
var rtl$k = false;
var strings$k = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) -ohjelman asennus",
	UninstallCaption: "$(^Name) -ohjelman poisto",
	LicenseSubCaption: ": Lisenssisopimus",
	ComponentsSubCaption: ": Asennusvaihtoehdot",
	DirSubCaption: ": Asennuskansio",
	InstallingSubCaption: ": Asennetaan",
	CompletedSubCaption: ": Valmis",
	UnComponentsSubCaption: ": Poistovaihtoehdot",
	UnDirSubCaption: ": Poistokansio",
	ConfirmSubCaption: ": Varmistus",
	UninstallingSubCaption: ": Poistetaan",
	UnCompletedSubCaption: ": Valmis",
	BackBtn: "< &Takaisin",
	NextBtn: "&Seuraava >",
	AgreeBtn: "&Hyväksyn",
	AcceptBtn: "Hyväksyn lisenssisopimuksen ehdot",
	DontAcceptBtn: "En hyväksy sopimuksen ehtoja",
	InstallBtn: "&Asenna",
	UninstallBtn: "&Poista",
	CancelBtn: "Peruuta",
	CloseBtn: "&Sulje",
	BrowseBtn: "S&elaa...",
	ShowDetailsBtn: "&Näytä tiedot",
	ClickNext: "Valitse Seuraava jatkaaksesi.",
	ClickInstall: "Valitse Asenna aloittaaksesi asennuksen.",
	ClickUninstall: "Valitse Poista poistaaksesi asennuksen.",
	Name: "Nimi",
	Completed: "Valmis",
	LicenseText: "Lue lisenssisopimus ennen asentamista. Jos hyväksyt sopimuksen kaikki ehdot, valitse Hyväksyn.",
	LicenseTextCB: "Lue lisenssisopimus ennen asentamista. Jos hyväksyt sopimuksen kaikki ehdot, laita rasti ruutuun. $_CLICK",
	LicenseTextRB: "Lue lisenssisopimus ennen asentamista. Jos hyväksyt sopimuksen kaikki ehdot, valitse ensimmäinen vaihtoehto alapuolelta. $_CLICK",
	UnLicenseText: "Lue lisenssisopimus ennen poistamista. Jos hyväksyt sopimuksen kaikki ehdot, valitse Hyväksyn.",
	UnLicenseTextCB: "Lue lisenssisopimus ennen poistamista. Jos hyväksyt sopimuksen kaikki ehdot, laita rasti ruutuun. $_CLICK",
	UnLicenseTextRB: "Lue lisenssisopimus ennen poistamista. Jos hyväksyt sopimuksen kaikki ehdot, valitse ensimmäinen vaihtoehto alapuolelta. $_CLICK",
	Custom: "Oma",
	ComponentsText: "Valitse komponentit, jotka haluat asentaa, ja poista valinta komponenteista, joita et halua asentaa. $_CLICK",
	ComponentsSubText1: "Valitse asennustyyppi:",
	ComponentsSubText2_NoInstTypes: "Valitse asennettavat komponentit:",
	ComponentsSubText2: "Tai, valitse valinnaiset komponentit, jotka haluat asentaa:",
	UnComponentsText: "Valitse komponentit, jotka haluat poistaa, ja poista valinta komponenteista, joita et haluat poistaa. $_CLICK",
	UnComponentsSubText1: "Valitse poistotyyppi:",
	UnComponentsSubText2_NoInstTypes: "Valitse poistettavat komponentit:",
	UnComponentsSubText2: "Tai, valitse valinnaiset komponentit, jotka haluat poistaa",
	DirText: "$(^NameDA) -ohjelma asennetaan seuraavaan kansioon. Jos haluat asentaa sen johonkin muuhun kansioon, valitse Selaa, ja valitse toinen kansio. $_CLICK",
	DirSubText: "Kohdekansio",
	DirBrowseText: "Valitse kansio, johon haluat asentaa ohjelman $(^NameDA):",
	UnDirText: "Poistetaan ohjelman $(^NameDA) seuraavasta kansiosta. Jos haluat poistaa sen jostakin muusta kansiosta, valitse Selaa, ja valitse toinen kansio. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Valitse kansio, josta haluat poistaa ohjelman $(^NameDA):",
	SpaceAvailable: "\"Tilaa vapaana: \"",
	SpaceRequired: "\"Tarvittava tila: \"",
	UninstallingText: "Tämä ohjelma poistaa ohjelman $(^NameDA) tietokoneelta. $_CLICK",
	UninstallingSubText: "Poistetaan kansiosta:",
	FileError: "Tiedostoon ei voitu kirjoittaa: \\r\\n\\t\"$0\"\\r\\nLopeta asennus valitsemalla Hylkää,\\r\\nyritä uudelleen valitsemalla Uudelleen, tai\\r\\nohita tiedosto valitsemalla Ohita",
	FileError_NoIgnore: "Tiedostoon ei voitu kirjoittaa: \\r\\n\\t\"$0\"\\r\\nYritä uudelleen valitsemalla Uudelleen, tai\\r\\nlopeta asennus valitsemalla Hylkää",
	CantWrite: "\"Ei voi kirjoittaa: \"",
	CopyFailed: "Kopiointi epäonnistui",
	CopyTo: "\"Kopioidaan kohteeseen \"",
	Registering: "\"Rekisteröidään: \"",
	Unregistering: "\"Poistetaan rekisteröinti: \"",
	SymbolNotFound: "\"Symbolia ei löytynyt: \"",
	CouldNotLoad: "\"Ei voitu ladata: \"",
	CreateFolder: "\"Luo kansio: \"",
	CreateShortcut: "\"Luo pikakuvake: \"",
	CreatedUninstaller: "\"Poisto-ohjelma luotiin: \"",
	Delete: "\"Poista: \"",
	DeleteOnReboot: "\"Poista käynnistyksen yhteydessä: \"",
	ErrorCreatingShortcut: "\"Virhe luotaessa pikakuvaketta: \"",
	ErrorCreating: "\"Virhe luotaessa: \"",
	ErrorDecompressing: "Pakettia ei voitu purkaa. Korruptoitunut asennusohjelma?",
	ErrorRegistering: "Virhe rekisteröidessä DLL-tiedostoa",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Suorita: \"",
	Extract: "\"Pura: \"",
	ErrorWriting: "\"Pura: tiedostoon ei voitu kirjoittaa \"",
	InvalidOpcode: "Asennuspaketti on vioittunut: virheellinen opcode",
	NoOLE: "\"Ei OLEa: \"",
	OutputFolder: "\"Kansio: \"",
	RemoveFolder: "\"Poista kansio: \"",
	RenameOnReboot: "\"Muuta nimi uudelleenkäynnistyksen yhteydessä: \"",
	Rename: "\"Muuta nimi: \"",
	Skipped: "\"Ohitettiin: \"",
	CopyDetails: "Kopioi tiedot leikepöydälle",
	LogInstall: "Tallenna asennusloki",
	Byte: "t",
	Kilo: " k",
	Mega: " M",
	Giga: " G"
};
var Finnish$1 = {
	header: header$k,
	id: id$k,
	font: font$k,
	code_page: code_page$k,
	rtl: rtl$k,
	strings: strings$k
};

var header$l = "NLF v6";
var id$l = 1036;
var font$l = {
	name: null,
	size: null
};
var code_page$l = 1252;
var rtl$l = false;
var strings$l = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Installation de $(^Name)",
	UninstallCaption: "Désinstallation de $(^Name)",
	LicenseSubCaption: ": Licence",
	ComponentsSubCaption: ": Options d'installation",
	DirSubCaption: ": Dossier d'installation",
	InstallingSubCaption: ": Installation des fichiers",
	CompletedSubCaption: ": Terminé",
	UnComponentsSubCaption: ": Options de désinstallation",
	UnDirSubCaption: ": Dossier de désinstallation",
	ConfirmSubCaption: ": Confirmation",
	UninstallingSubCaption: ": Désinstallation des fichiers",
	UnCompletedSubCaption: ": Terminé",
	BackBtn: "< &Précédent",
	NextBtn: "&Suivant >",
	AgreeBtn: "J'a&ccepte",
	AcceptBtn: "J'a&ccepte les termes de la licence",
	DontAcceptBtn: "Je &n'accepte pas les termes de la licence",
	InstallBtn: "&Installer",
	UninstallBtn: "&Désinstaller",
	CancelBtn: "Annuler",
	CloseBtn: "&Fermer",
	BrowseBtn: "P&arcourir...",
	ShowDetailsBtn: "P&lus d'infos",
	ClickNext: "Cliquez sur Suivant pour continuer.",
	ClickInstall: "Cliquez sur Installer pour démarrer l'installation.",
	ClickUninstall: "Cliquez sur Désinstaller pour démarrer la désinstallation.",
	Name: "Nom",
	Completed: "Terminé",
	LicenseText: "Veuillez examiner le contrat de licence avant d'installer $(^NameDA). Si vous acceptez tous les termes du contrat, cliquez sur J'accepte.",
	LicenseTextCB: "Veuillez examiner le contrat de licence avant d'installer $(^NameDA). Si vous acceptez tous les termes du contrat, cochez la boîte de contrôle ci-dessous. $_CLICK",
	LicenseTextRB: "Veuillez examiner le contrat de licence avant d'installer $(^NameDA). Si vous acceptez tous les termes du contrat, sélectionnez la première option ci-dessous. $_CLICK",
	UnLicenseText: "Veuillez examiner le contrat de licence avant de désinstaller $(^NameDA). Si vous acceptez tous les termes du contrat, cliquez sur J'accepte.",
	UnLicenseTextCB: "Veuillez examiner le contrat de licence avant de désinstaller $(^NameDA). Si vous acceptez tous les termes du contrat, cochez la boîte de contrôle ci-dessous. $_CLICK",
	UnLicenseTextRB: "Veuillez examiner le contrat de licence avant de désinstaller $(^NameDA). Si vous acceptez tous les termes du contrat, sélectionnez la première option ci-dessous. $_CLICK",
	Custom: "Personnalisée",
	ComponentsText: "Cochez les composants que vous désirez installer et décochez ceux que vous ne désirez pas installer. $_CLICK",
	ComponentsSubText1: "Type d'installation :",
	ComponentsSubText2_NoInstTypes: "Sélectionnez les composants à installer :",
	ComponentsSubText2: "Ou, sélectionnez les composants optionnels que vous voulez installer :",
	UnComponentsText: "Cochez les composants que vous désirez désinstaller et décochez ceux que vous ne désirez pas désinstaller. $_CLICK",
	UnComponentsSubText1: "Sélectionnez le type de désinstallation :",
	UnComponentsSubText2_NoInstTypes: "Sélectionnez les composants à désinstaller :",
	UnComponentsSubText2: "Ou, sélectionnez les composants optionnels que vous voulez désinstaller :",
	DirText: "Ceci installera $(^NameDA) dans le dossier suivant. Pour installer dans un autre dossier, cliquez sur Parcourir et choisissez un autre dossier. $_CLICK",
	DirSubText: "Dossier d'installation",
	DirBrowseText: "Sélectionnez le dossier d'installation pour $(^NameDA) :",
	UnDirText: "Ceci désinstallera $(^NameDA) du dossier suivant. Pour désinstaller d'un autre dossier, cliquez sur Parcourir et choisissez un autre dossier. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Sélectionnez le dossier de désinstallation pour $(^NameDA) :",
	SpaceAvailable: "\"Espace disponible : \"",
	SpaceRequired: "\"Espace requis : \"",
	UninstallingText: "Ce programme désinstallera $(^NameDA) de votre ordinateur. $_CLICK",
	UninstallingSubText: "Désinstallation à partir de :",
	FileError: "Erreur lors de l'ouverture du fichier en écriture : \\r\\n\\t\"$0\"\\r\\nAppuyez sur Abandonner pour annuler l'installation,\\r\\nRéessayer pour réessayer l'écriture du fichier, ou\\r\\nIgnorer pour passer ce fichier",
	FileError_NoIgnore: "Erreur lors de l'ouverture du fichier en écriture : \\r\\n\\t\"$0\"\\r\\nAppuyez sur Réessayez pour re-écrire le fichier, ou\\r\\nAnnuler pour abandonner l'installation",
	CantWrite: "\"Impossible d'écrire : \"",
	CopyFailed: "Échec de la copie",
	CopyTo: "\"Copier vers \"",
	Registering: "\"Enregistrement : \"",
	Unregistering: "\"Suppression de l'enregistrement : \"",
	SymbolNotFound: "\"Impossible de trouver un symbole : \"",
	CouldNotLoad: "\"Impossible de charger : \"",
	CreateFolder: "\"Création du dossier : \"",
	CreateShortcut: "\"Création du raccourci : \"",
	CreatedUninstaller: "\"Création de la désinstallation : \"",
	Delete: "\"Suppression : \"",
	DeleteOnReboot: "\"Suppression au redémarrage : \"",
	ErrorCreatingShortcut: "\"Erreur lors de la création du raccourci : \"",
	ErrorCreating: "\"Erreur de la création : \"",
	ErrorDecompressing: "Erreur lors de la décompression des données ! Installation corrompue ?",
	ErrorRegistering: "Erreur lors de l'enregistrement de la DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Exécution : \"",
	Extract: "\"Extraction : \"",
	ErrorWriting: "\"Extraction : erreur d'écriture du fichier \"",
	InvalidOpcode: "Installation corrompue : opcode incorrect",
	NoOLE: "\"Pas de OLE pour : \"",
	OutputFolder: "\"Destination : \"",
	RemoveFolder: "\"Suppression du dossier : \"",
	RenameOnReboot: "\"Renommer au redémarrage : \"",
	Rename: "\"Renommer : \"",
	Skipped: "\"Passé : \"",
	CopyDetails: "Copier les Détails dans le Presse-papier",
	LogInstall: "Enregistrer le déroulement de l'installation",
	Byte: "o",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var French$1 = {
	header: header$l,
	id: id$l,
	font: font$l,
	code_page: code_page$l,
	rtl: rtl$l,
	strings: strings$l
};

var header$m = "NLF v6";
var id$m = 1110;
var font$m = {
	name: null,
	size: null
};
var code_page$m = 1252;
var rtl$m = false;
var strings$m = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Instalación de $(^Name)",
	UninstallCaption: "Desinstalación de $(^Name)",
	LicenseSubCaption: ": Contrato de licenza",
	ComponentsSubCaption: ": Opcións de instalación",
	DirSubCaption: ": Diretória de instalación",
	InstallingSubCaption: ": Instalando ficheiros",
	CompletedSubCaption: ": Concluído",
	UnComponentsSubCaption: ": Opcións de desinstalación",
	UnDirSubCaption: ": Cartafol de desinstalación",
	ConfirmSubCaption: ": Confirmación",
	UninstallingSubCaption: ": Desinstalando",
	UnCompletedSubCaption: ": Concluído",
	BackBtn: "< &Anterior",
	NextBtn: "&Seguinte >",
	AgreeBtn: "&Aceito",
	AcceptBtn: "Eu &aceito os termos do Contrato de licenza",
	DontAcceptBtn: "Eu &non aceito os termos do Contrato de licenza",
	InstallBtn: "&Instalar",
	UninstallBtn: "&Desinstalar",
	CancelBtn: "Cancelar",
	CloseBtn: "&Fechar",
	BrowseBtn: "&Procurar...",
	ShowDetailsBtn: "Ver &Detalles",
	ClickNext: "Clique en 'Seguinte' para continuar.",
	ClickInstall: "Clique en 'Instalar' para iniciar a instalación.",
	ClickUninstall: "Clique en 'Desinstalar' para iniciar a desinstalación.",
	Name: "Nome",
	Completed: "Concluído",
	LicenseText: "Por favor revexa o acordo de licenza antes de instalar $(^NameDA). Se concordar con todos os termos da licenza, clique em 'Aceito'.",
	LicenseTextCB: "Por favor reveja o acordo de licenza antes de instalar $(^NameDA). Se concordar con todos os termos da licenza, clique na caixa de selección abaixo. $_CLICK",
	LicenseTextRB: "Por favor revexa o acordo de licenza antes de instalar $(^NameDA). Se concordar con todos os termos da licenza, escolla a primeira opción abaixo. $_CLICK",
	UnLicenseText: "Por favor revexa o acordo de licenza antes de desinstalar $(^NameDA). Se concordar con todos os termos da licenza, clique em 'Aceito'.",
	UnLicenseTextCB: "Por favor reveja o acordo de licenza antes de desinstalar $(^NameDA). Se concordar con todos os termos da licenza, clique na caixa de selección abaixo. $_CLICK",
	UnLicenseTextRB: "Por favor revexa o acordo de licenza antes de desinstalar $(^NameDA). Se concordar con todos os termos da licenza, escolla a primeira opción abaixo. $_CLICK",
	Custom: "Personalizado",
	ComponentsText: "Marque os componentes que desexa instalar e desmarque os componentes que non desexa instalar. $_CLICK",
	ComponentsSubText1: "Escolla o tipo de instalación:",
	ComponentsSubText2_NoInstTypes: "Escolla os componentes para instalar:",
	ComponentsSubText2: "Ou, escolla os componentes opcionais que desexa instalar:",
	UnComponentsText: "Marque os componentes que queira desinstalar e vice versa. $_CLICK",
	UnComponentsSubText1: "Escolla o tipo de desinstalación:",
	UnComponentsSubText2_NoInstTypes: "Escolla os componentes para desinstalar:",
	UnComponentsSubText2: "Ou, escolla os componentes opcionais que queira desinstalar:",
	DirText: "O $(^NameDA) será instalado na seguinte directória. Para instalar nunha directória diferente, clique en 'Procurar...' e escolla outra directória. $_CLICK",
	DirSubText: "Directória de destino",
	DirBrowseText: "Escolla unha directória para instalar o $(^NameDA):",
	UnDirText: "O $(^NameDA) será desinstalado da seguinte directória. Para desinstalar dunha pasta diferente, clique en 'Procurar...' e escolla outra directória. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Escolla a directória de onde vai ser desinstalado o $(^NameDA):",
	SpaceAvailable: "\"Espazo disponíbel: \"",
	SpaceRequired: "\"Espazo necesário: \"",
	UninstallingText: "$(^NameDA) vai ser desinstalado da seguinte directória. $_CLICK",
	UninstallingSubText: "Desinstalando de:",
	FileError: "Erro ao abrir ficheiro para escrita: \\r\\n\\t\"$0\"\\r\\nClique en Abortar para abortar a instalación,\\r\\nRepetir para tentar novamente a escrita do ficheiro, ou\\r\\nIgnorar para ignorar este ficheiro.",
	FileError_NoIgnore: "Erro ao abrir ficheiro para escrita: \\r\\n\\t\"$0\"\\r\\nClique en Repetir para tentar novamente a gravación do ficheiro, ou\\r\\nCancelar para abortar a instalación.",
	CantWrite: "\"Non foi posíbel escreber: \"",
	CopyFailed: "Falla ao copiar",
	CopyTo: "\"Copiar para \"",
	Registering: "\"Rexistando: \"",
	Unregistering: "\"Desrexistando: \"",
	SymbolNotFound: "\"Símbolo non achado: \"",
	CouldNotLoad: "\"Non foi posíbel carregar: \"",
	CreateFolder: "\"Criando diretória: \"",
	CreateShortcut: "\"Criando atallo: \"",
	CreatedUninstaller: "\"Criando desinstalador: \"",
	Delete: "\"Eliminando ficheiro: \"",
	DeleteOnReboot: "\"Eliminar ao reiniciar: \"",
	ErrorCreatingShortcut: "\"Erro ao criar atallo: \"",
	ErrorCreating: "\"Erro ao criar: \"",
	ErrorDecompressing: "Erro ao descomprimir dados! Instalador corrompido?",
	ErrorRegistering: "Erro ao rexistar DLL",
	ExecShell: "\"Executando polo Shell: \"",
	Exec: "\"Executando: \"",
	Extract: "\"Extraindo: \"",
	ErrorWriting: "\"Extraindo: erro ao escreber ficheiro \"",
	InvalidOpcode: "Instalador corrompido: código de operación inválido",
	NoOLE: "\"Sen OLE para: \"",
	OutputFolder: "\"Cartafol de destino: \"",
	RemoveFolder: "\"Removendo cartafol: \"",
	RenameOnReboot: "\"Renomear ao reiniciar: \"",
	Rename: "\"Renomeando: \"",
	Skipped: "\"Ignorado: \"",
	CopyDetails: "Copiar detalles para a Área de transférencia",
	LogInstall: "Rexistar proceso de instalación",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Galician$1 = {
	header: header$m,
	id: id$m,
	font: font$m,
	code_page: code_page$m,
	rtl: rtl$m,
	strings: strings$m
};

var header$n = "NLF v6";
var id$n = 1079;
var font$n = {
	name: null,
	size: null
};
var code_page$n = 1200;
var rtl$n = false;
var strings$n = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "ჩატვირთვა $(^Name)",
	UninstallCaption: "$(^Name)–ის წაშლა",
	LicenseSubCaption: ": სალიცენზიო შეთანხმება",
	ComponentsSubCaption: ": ჩატვირთვის მონაცემები",
	DirSubCaption: ": საინსტალაციო ფოლდერი",
	InstallingSubCaption: ": ფაილების კოპირება",
	CompletedSubCaption: ": ოპერაცია დასრულებულია",
	UnComponentsSubCaption: ": წაშლის მონაცემები",
	UnDirSubCaption: ": წაშლის ფოულდერი",
	ConfirmSubCaption: ": თანხმობა",
	UninstallingSubCaption: ": ფაილების წაშლა",
	UnCompletedSubCaption: ": ოპერაცია დასრულებულია",
	BackBtn: "< &უკან",
	NextBtn: "&შემდეგ >",
	AgreeBtn: "ვეთანხმე&ბი",
	AcceptBtn: "&ვეთანხმები სალიცენზიო პირობებს",
	DontAcceptBtn: "&არ ვეთანხმები სალიცენზიო პირობებს",
	InstallBtn: "&ჩატვირთვა",
	UninstallBtn: "წაშ&ლა",
	CancelBtn: "უარი",
	CloseBtn: "&დახურვა",
	BrowseBtn: "დათ&ვალიერება...",
	ShowDetailsBtn: "&დეტალები...",
	ClickNext: "გასაგრძელებლად დააწკაპუნეთ ღილაკზე 'შემდეგ'.",
	ClickInstall: "დააწკაპუნეთ ღილაკზე 'ჩატვირთვა', პროგრამის ჩასატვირთად.",
	ClickUninstall: "დააწკაპუნეთ ღილაკზე 'წაშლა', პროგრამის წასაშლელად.",
	Name: "სახელი",
	Completed: "ჩაიტვირთა",
	LicenseText: "სანამ ჩაიტვირთება $(^NameDA) გაეცანით სალიცენზიო ხელშეკრულებას. თუ ეთანხმებით პირობებს დააწკაპუნეთ ღილაკზე 'თანხმობა'.",
	LicenseTextCB: "სანამ ჩაიტვირთება $(^NameDA) გაეცანით სალიცენზიო ხელშეკრულებას. თუ ეთანხმებით პირობებს მონიშნეთ ფანჯარა ქვემოთ. $_CLICK",
	LicenseTextRB: "სანამ ჩაიტვირთება $(^NameDA) გაეცანით სალიცენზიო ხელშეკრულებას. თუ ეთანხმებით პირობებს მონიშნეთ ქვემოთ მოცემული პირველი ვარიანტი. $_CLICK",
	UnLicenseText: "სანამ წაშლით $(^NameDA) გაეცანით სალიცენზიო ხელშეკრულებას. თუ ეთანხმებით პირობებს დააწკაპუნეთ ღილაკზე 'თანხმობა'.",
	UnLicenseTextCB: "სანამ წაშლით $(^NameDA) გაეცანით სალიცენზიო ხელშეკრულებას. თუ ეთანხმებით პირობებს მონიშნეთ ფანჯარა ქვემოთ. $_CLICK",
	UnLicenseTextRB: "სანამ წაშლით $(^NameDA) გაეცანით სალიცენზიო ხელშეკრულებას. თუ ეთანხმებით პირობებს მონიშნეთ ქვემოთ მოცემული პირველი ვარიანტი. $_CLICK",
	Custom: "სტანდარტული",
	ComponentsText: "აირჩიეთ ის კომპონენტები, რომლის ჩატვირთვაც გსურთ. $_CLICK",
	ComponentsSubText1: "აირჩიეთ ჩატვირთვის მეთოდი:",
	ComponentsSubText2_NoInstTypes: "ჩასატვირთად აირჩიეთ პროგრამის კომპონენტები:",
	ComponentsSubText2: "ან ჩასატვირთად აირჩიეთ პროგრამის დამატებითი კომპონენტები:",
	UnComponentsText: "აირჩიეთ ის კომპონენტები, რომლის წაშლაც გსურთ. $_CLICK",
	UnComponentsSubText1: "აირჩიეთ წაშლის მეთოდი:",
	UnComponentsSubText2_NoInstTypes: "წასაშლელად აირჩიეთ პროგრამის კომპონენტები:",
	UnComponentsSubText2: "ან წასაშლელად აირჩიეთ პროგრამის დამატებითი კომპონენტები:",
	DirText: "პროგრამა ჩაგიტვირთავთ $(^NameDA)–ის მითითებულ ფოლდერში. სხვა ადგილზე ჩასატვირთად დააწკაპუნეთ ღილაკზე 'დათვალიერება' და მიუთითეთ ადგილი. $_CLICK",
	DirSubText: "ჩატვირთვის ფოლდერი",
	DirBrowseText: "მითითეთ ფოლდერი სადაც უნდა ჩაიტვირთოს $(^NameDA):",
	UnDirText: "პროგრამა წაშლის $(^NameDA)–ის მითითებული ფოლდერიდან. სხვა ფოლდერიდან წასაშლელად დააწკაპუნეთ ღილაკზე 'დათვალიერება' და მიუთითეთ ადგილი. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "მიუთითეთ ფოლდერი საიდანაც უნდა წაიშალოს $(^NameDA):",
	SpaceAvailable: "\"Доступно на диске: \"",
	SpaceRequired: "\"Требуется на диске: \"",
	UninstallingText: "პროგრამა $(^NameDA) წაიშლება თქვენი კომპიუტერიდან. $_CLICK",
	UninstallingSubText: "წაშლა:",
	FileError: "არ იხსნება ფაილები ჩასაწერად: \\r\\n\\t\"$0\"\\r\\n'შეჩერება': შეჩერდეს ჩატვირთვა;\\r\\n\"გამეორება\": მცდელობის გამეორება;\\r\\n\"გამოტოვება\": ამ მოქმედების გამოტოვება.",
	FileError_NoIgnore: "არ იხსნება ფაილეი ჩასაწერად: \\r\\n\\t\"$0\"\\r\\n'გამეორება': მცდელობის გამეორება;\\r\\n'უარი': ჩატვირთვის პროცესის შეწყვეტა.",
	CantWrite: "\"არ იწერება: \"",
	CopyFailed: "შეცდომა ჩაწერის დროს",
	CopyTo: "\"კოპირება: \"",
	Registering: "\"რეგისტრირება: \"",
	Unregistering: "\"რეგისტრირებიდან მოხსნა: \"",
	SymbolNotFound: "\"ვერ მოიძებნა სიმბოლო: \"",
	CouldNotLoad: "\"ჩატვირთვა შეუძლებელია: \"",
	CreateFolder: "\"ფოლდერის შექმნა: \"",
	CreateShortcut: "\"იარლიყის შექმნა: \"",
	CreatedUninstaller: "\"წაშლის პროგრამის შექმნა: \"",
	Delete: "\"ფაილის წაშლა: \"",
	DeleteOnReboot: "\"წაიშლება კომპიუტერის გადატვირთვის დროს: \"",
	ErrorCreatingShortcut: "\"იარლიყის შექმნისას დაშვებულია შეცდომა: \" ",
	ErrorCreating: "\"შექმნისას დაშვებულია შეცდომა: \"",
	ErrorDecompressing: "შეცდომა მონაცემების გახსნისას! შესაძლოა საინსტალაციო პროგრამაა დაზიანებული.",
	ErrorRegistering: "არ რეგისტრირდება (DLL)",
	ExecShell: "\"ExecShell: \" ",
	Exec: "\"შესრულება: \"",
	Extract: "\"ამონაწერი: \"",
	ErrorWriting: "\"ამონაწერი: შეცდომაა დაშვებული ფაილის ჩაწერისას \"",
	InvalidOpcode: "საინსტალაციო პროგრამა დაზიანებულია: კოდი არ არსებობს",
	NoOLE: "\"OLE არ არის: \" ",
	OutputFolder: "\"ჩატვირთვის ფოლდერი: \"",
	RemoveFolder: "\"ფოლდერის წაშლა: \"",
	RenameOnReboot: "\"სახელის შეცვლა კომპიუტერის გადავირთვისას: \"",
	Rename: "\"სახელის შეცვლა: \"",
	Skipped: "\"გამოტოვა: \"",
	CopyDetails: "მონაცემების ბუფერში კოპირება ",
	LogInstall: "ჩატვირთვის აღწერა",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Georgian$1 = {
	header: header$n,
	id: id$n,
	font: font$n,
	code_page: code_page$n,
	rtl: rtl$n,
	strings: strings$n
};

var header$o = "NLF v6";
var id$o = 1031;
var font$o = {
	name: null,
	size: null
};
var code_page$o = 1252;
var rtl$o = false;
var strings$o = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Installation von $(^Name)",
	UninstallCaption: "Deinstallation von $(^Name)",
	LicenseSubCaption: ": Lizenzabkommen",
	ComponentsSubCaption: ": Installationsoptionen",
	DirSubCaption: ": Zielverzeichnis",
	InstallingSubCaption: ": Wird installiert",
	CompletedSubCaption: ": Fertig",
	UnComponentsSubCaption: ": Deinstallationsoptionen",
	UnDirSubCaption: ": Quellverzeichnis",
	ConfirmSubCaption: ": Bestätigung",
	UninstallingSubCaption: ": Wird entfernt",
	UnCompletedSubCaption: ": Fertig",
	BackBtn: "< &Zurück",
	NextBtn: "&Weiter >",
	AgreeBtn: "&Annehmen",
	AcceptBtn: "Lizenzabkommen &akzeptieren",
	DontAcceptBtn: "Lizenzabkommen ab&lehnen",
	InstallBtn: "&Installieren",
	UninstallBtn: "&Deinstallieren",
	CancelBtn: "Abbrechen",
	CloseBtn: "&Beenden",
	BrowseBtn: "&Durchsuchen ...",
	ShowDetailsBtn: "&Details anzeigen",
	ClickNext: "Klicken Sie auf Weiter, um fortzufahren.",
	ClickInstall: "Klicken Sie auf Installieren, um die Installation zu starten.",
	ClickUninstall: "Klicken Sie auf Deinstallieren, um die Deinstallation zu starten.",
	Name: "Name",
	Completed: "Fertig",
	LicenseText: "Bitte lesen Sie das Lizenzabkommen, bevor Sie $(^NameDA) installieren. Wenn Sie alle Bedingungen des Abkommens akzeptieren, klicken Sie auf Annehmen.",
	LicenseTextCB: "Bitte lesen Sie das Lizenzabkommen, bevor Sie $(^NameDA) installieren. Wenn Sie alle Bedingungen des Abkommens akzeptieren, aktivieren Sie das Kontrollkästchen. $_CLICK",
	LicenseTextRB: "Bitte lesen Sie das Lizenzabkommen, bevor Sie $(^NameDA) installieren. Wenn Sie alle Bedingungen des Abkommens akzeptieren, wählen Sie die entsprechende Option. $_CLICK",
	UnLicenseText: "Bitte lesen Sie das Lizenzabkommen, bevor Sie $(^NameDA) entfernen. Wenn Sie alle Bedingungen des Abkommens akzeptieren, klicken Sie auf Annehmen.",
	UnLicenseTextCB: "Bitte lesen Sie das Lizenzabkommen, bevor Sie $(^NameDA) entfernen. Wenn Sie alle Bedingungen des Abkommens akzeptieren, aktivieren Sie das Kontrollkästchen. $_CLICK",
	UnLicenseTextRB: "Bitte lesen Sie das Lizenzabkommen, bevor Sie $(^NameDA) entfernen. Wenn Sie alle Bedingungen des Abkommens akzeptieren, wählen Sie die entsprechende Option. $_CLICK",
	Custom: "Benutzerdefiniert",
	ComponentsText: "Wählen Sie die Komponenten, welche Sie installieren wollen. $_CLICK",
	ComponentsSubText1: "Installationstyp bestimmen:",
	ComponentsSubText2_NoInstTypes: "Wählen Sie die zu installierenden Komponenten:",
	ComponentsSubText2: "oder wählen Sie zusätzliche zu installierende Komponenten:",
	UnComponentsText: "Wählen Sie die Komponenten, welche Sie entfernen wollen. $_CLICK",
	UnComponentsSubText1: "Deinstallationstyp bestimmen:",
	UnComponentsSubText2_NoInstTypes: "Wählen Sie die zu entfernenden Komponenten:",
	UnComponentsSubText2: "oder wählen Sie zusätzliche Komponenten, welche Sie entfernen möchten:",
	DirText: "$(^NameDA) wird in das unten angegebene Verzeichnis installiert. Falls Sie in ein anderes Verzeichnis installieren möchten, klicken Sie auf Durchsuchen und wählen Sie ein anderes Verzeichnis aus. $_CLICK",
	DirSubText: "Zielverzeichnis",
	DirBrowseText: "Wählen Sie das Verzeichnis aus, in das Sie $(^NameDA) installieren möchten:",
	UnDirText: "$(^NameDA) wird aus dem unten angegebenen Verzeichnis entfernt. Falls sich $(^NameDA) in einem anderen Verzeichnis befindet, klicken Sie auf Durchsuchen und wählen Sie das richtige Verzeichnis aus. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Wählen Sie das Verzeichnis aus, in dem sich $(^NameDA) befindet:",
	SpaceAvailable: "\"Verfügbarer Speicher: \"",
	SpaceRequired: "\"Benötigter Speicher: \"",
	UninstallingText: "$(^NameDA) wird aus dem unten angegebenen Verzeichnis entfernt. $_CLICK",
	UninstallingSubText: "Wird entfernt aus:",
	FileError: "Fehler beim Überschreiben der Datei: \\r\\n\\t\"$0\"\\r\\nKlicken Sie auf Abbrechen, um abzubrechen,\\r\\nauf Wiederholen, um den Schreibvorgang erneut zu versuchen,\\r\\noder auf Ignorieren, um diese Datei zu überspringen.",
	FileError_NoIgnore: "Fehler beim Überschreiben der Datei: \\r\\n\\t\"$0\"\\r\\nKlicken Sie auf Wiederholen, um den Schreibvorgang erneut zu versuchen,\\r\\noder auf Abbrechen, um die Installation zu beenden.",
	CantWrite: "\"Fehler beim Schreiben: \"",
	CopyFailed: "Kopieren fehlgeschlagen",
	CopyTo: "\"Wird kopiert nach \"",
	Registering: "\"Wird registriert: \"",
	Unregistering: "\"Wird deregistriert: \"",
	SymbolNotFound: "\"Symbol ist nicht vorhanden: \"",
	CouldNotLoad: "\"Fehler beim Laden von \"",
	CreateFolder: "\"Verzeichnis wird erstellt: \"",
	CreateShortcut: "\"Verknüpfung wird erstellt: \"",
	CreatedUninstaller: "\"Deinstallationsprogramm wird erstellt: \"",
	Delete: "\"Datei wird gelöscht: \"",
	DeleteOnReboot: "\"Datei wird nach Neustart gelöscht: \"",
	ErrorCreatingShortcut: "\"Fehler beim Erstellen der Verknüpfung: \"",
	ErrorCreating: "\"Fehler beim Erstellen: \"",
	ErrorDecompressing: "Fehler beim Entpacken. Ist das Installationsprogramm beschädigt?",
	ErrorRegistering: "Fehler beim Registrieren der DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Wird gestartet: \"",
	Extract: "\"Wird entpackt: \"",
	ErrorWriting: "\"Entpacken: Fehler beim Schreiben der Datei \"",
	InvalidOpcode: "Beschädigtes Installationsprogramm: ungültiger Befehlscode",
	NoOLE: "\"Kein OLE für: \"",
	OutputFolder: "\"Zielverzeichnis: \"",
	RemoveFolder: "\"Verzeichnis wird entfernt: \"",
	RenameOnReboot: "\"Umbenennen nach Neustart: \"",
	Rename: "\"Umbenennen: \"",
	Skipped: "\"Übersprungen: \"",
	CopyDetails: "Details in die Zwischenablage kopieren",
	LogInstall: "Installationsverlauf protokollieren",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var German$1 = {
	header: header$o,
	id: id$o,
	font: font$o,
	code_page: code_page$o,
	rtl: rtl$o,
	strings: strings$o
};

var header$p = "NLF v6";
var id$p = 1032;
var font$p = {
	name: null,
	size: null
};
var code_page$p = 1253;
var rtl$p = false;
var strings$p = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Εγκατάσταση του '$(^Name)'",
	UninstallCaption: "Απεγκατάσταση του '$(^Name)'",
	LicenseSubCaption: ": Συμφωνία Άδειας Χρήσης",
	ComponentsSubCaption: ": Επιλογές Εγκατάστασης",
	DirSubCaption: ": Φάκελος Εγκατάστασης",
	InstallingSubCaption: ": Εγκατάσταση σε εξέλιξη",
	CompletedSubCaption: ": Ολοκληρώθηκε",
	UnComponentsSubCaption: ": Επιλογές Απεγκατάστασης",
	UnDirSubCaption: ": Φάκελος Απεγκατάστασης",
	ConfirmSubCaption: ": Επιβεβαίωση",
	UninstallingSubCaption: ": Απεγκατάσταση σε εξέλιξη",
	UnCompletedSubCaption: ": Ολοκληρώθηκε",
	BackBtn: "< &Πίσω",
	NextBtn: "&Επόμενο >",
	AgreeBtn: "&Συμφωνώ",
	AcceptBtn: "&Αποδέχομαι τους όρους της άδειας χρήσης",
	DontAcceptBtn: "&Δεν αποδέχομαι τους όρους της άδειας χρήσης",
	InstallBtn: "&Εγκατάσταση",
	UninstallBtn: "Απε&γκατάστ.",
	CancelBtn: "Άκυρο",
	CloseBtn: "&Κλείσιμο",
	BrowseBtn: "Α&ναζήτηση...",
	ShowDetailsBtn: "&Λεπτομέρειες",
	ClickNext: "Κάντε κλικ στο Επόμενο για να συνεχίσετε.",
	ClickInstall: "Κάντε κλικ στο Εγκατάσταση για να αρχίσετε την εγκατάσταση.",
	ClickUninstall: "Κάντε κλικ στο Απεγκατάσταση για να αρχίσετε την απεγκατάσταση.",
	Name: "Όνομα",
	Completed: "Ολοκληρώθηκε",
	LicenseText: "Ελέγξτε την άδεια χρήσης πριν εγκαταστήσετε το '$(^NameDA)'. Εάν αποδέχεστε όλους τους όρους, κάντε κλικ στο Συμφωνώ.",
	LicenseTextCB: "Ελέγξτε την άδεια χρήσης πριν εγκαταστήσετε το '$(^NameDA)'. Εάν αποδέχεστε όλους τους όρους, κάντε κλικ στην επιλογή παρακάτω. $_CLICK",
	LicenseTextRB: "Ελέγξτε την άδεια χρήσης πριν εγκαταστήσετε το '$(^NameDA)'. Εάν αποδέχεστε όλους τους όρους, κάντε κλικ στην πρώτη επιλογή παρακάτω. $_CLICK",
	UnLicenseText: "Ελέγξτε την άδεια χρήσης πριν απεγκαταστήσετε το '$(^NameDA)'. Εάν αποδέχεστε όλους τους όρους, κάντε κλικ στο Συμφωνώ.",
	UnLicenseTextCB: "Ελέγξτε την άδεια χρήσης πριν απεγκαταστήσετε το '$(^NameDA)'. Εάν αποδέχεστε όλους τους όρους, κάντε κλικ στην επιλογή παρακάτω. $_CLICK",
	UnLicenseTextRB: "Ελέγξτε την άδεια χρήσης πριν απεγκαταστήσετε το '$(^NameDA)'. Εάν αποδέχεστε όλους τους όρους, κάντε κλικ στην πρώτη επιλογή παρακάτω. $_CLICK",
	Custom: "Προσαρμοσμένη",
	ComponentsText: "Επιλέξτε τα στοιχεία που θέλετε να εγκαταστήσετε και αποεπιλέξτε τα στοιχεία που δε θέλετε να εγκαταστήσετε. $_CLICK",
	ComponentsSubText1: "Επιλέξτε τύπο εγκατάστασης:",
	ComponentsSubText2_NoInstTypes: "Επιλέξτε τα στοιχεία που θέλετε να εγκαταστήσετε:",
	ComponentsSubText2: "Ή, επιλέξτε τα προαιρετικά στοιχεία που θέλετε να εγκαταστήσετε:",
	UnComponentsText: "Επιλέξτε τα στοιχεία που θέλετε να απεγκαταστήσετε και αποεπιλέξτε τα στοιχεία που δε θέλετε να απεγκαταστήσετε. $_CLICK",
	UnComponentsSubText1: "Επιλέξτε τύπο απεγκατάστασης:",
	UnComponentsSubText2_NoInstTypes: "Επιλέξτε τα στοιχεία που θέλετε να απεγκαταστήσετε:",
	UnComponentsSubText2: "Ή, επιλέξτε τα προαιρετικά στοιχεία που θέλετε να απεγκαταστήσετε:",
	DirText: "Το πρόγραμμα εγκατάστασης θα εγκαταστήσει το '$(^NameDA)' στον παρακάτω φάκελο. Για να το εγκαταστήσετε σε έναν άλλο φάκελο, κάντε κλικ στο Αναζήτηση και επιλέξτε κάποιον άλλο φάκελο. $_CLICK",
	DirSubText: "Φάκελος Εγκατάστασης",
	DirBrowseText: "Επιλέξτε το φάκελο εγκατάστασης για το '$(^NameDA)':",
	UnDirText: "Το πρόγραμμα εγκατάστασης θα απεγκαταστήσει το '$(^NameDA)' από τον παρακάτω φάκελο. Για να απεγκαταστήσετε από έναν άλλο φάκελο, κάντε κλικ στο Αναζήτηση και επιλέξτε κάποιον άλλο φάκελο. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Επιλέξτε το φάκελο απεγκατάστασης για το '$(^NameDA)':",
	SpaceAvailable: "\"Διαθέσιμος χώρος: \"",
	SpaceRequired: "\"Απαιτούμενος χώρος: \"",
	UninstallingText: "Το '$(^NameDA)' θα απεγκατασταθεί από τον ακόλουθο φάκελο. $_CLICK",
	UninstallingSubText: "Απεγκατάστ. από:",
	FileError: "Σφάλμα κατά το άνοιγμα αρχείου για εγγραφή: \\r\\n\\t\"$0\"\\r\\nΕπιλέξτε ματαίωση για να ματαιώσετε την εγκατάσταση,\\r\\nεπανάληψη για να δοκιμάσετε να γράψετε το αρχείο πάλι, ή\\r\\nπαράβλεψη για να παραλείψετε αυτό το αρχείο.",
	FileError_NoIgnore: "Σφάλμα κατά το άνοιγμα αρχείου για εγγραφή: \\r\\n\\t\"$0\"\\r\\nΕπιλέξτε επανάληψη για να δοκιμάσετε να γράψετε το αρχείο πάλι, ή\\r\\nματαίωση για να ματαιώσετε την εγκατάσταση.",
	CantWrite: "\"Αδυναμία εγγραφής: \"",
	CopyFailed: "Αντιγραφή απέτυχε",
	CopyTo: "\"Αντιγραφή στο \"",
	Registering: "\"Καταχώρηση: \"",
	Unregistering: "\"Κατάργηση καταχώρησης: \"",
	SymbolNotFound: "\"Αδυναμία εύρεσης συμβόλου: \"",
	CouldNotLoad: "\"Αδυναμία φόρτωσης: \"",
	CreateFolder: "\"Δημιουργία φακέλου: \"",
	CreateShortcut: "\"Δημιουργία συντόμευσης: \"",
	CreatedUninstaller: "\"Δημιουργία προγράμματος απεγκατάστασης: \"",
	Delete: "\"Διαγραφή αρχείου: \"",
	DeleteOnReboot: "\"Διαγραφή στην επανεκκίνηση: \"",
	ErrorCreatingShortcut: "\"Σφάλμα στη δημιουργία συντόμευσης: \"",
	ErrorCreating: "\"Σφάλμα στη δημιουργία: \"",
	ErrorDecompressing: "Σφάλμα στην αποσυμπίεση δεδομένων! Κατεστραμμένο πρόγραμμα εγκατάστασης;",
	ErrorRegistering: "Σφάλμα καταχώρησης του DLL",
	ExecShell: "\"Εκτέλεση (ExecShell): \"",
	Exec: "\"Εκτέλεση: \"",
	Extract: "\"Αποσυμπίεση: \"",
	ErrorWriting: "\"Αποσυμπίεση: σφάλμα εγγραφής στο αρχείο \"",
	InvalidOpcode: "Εγκατάσταση κατεστραμμένη: μη-έγκυρο opcode",
	NoOLE: "\"Όχι OLE για το: \"",
	OutputFolder: "\"Φάκελος εξόδου: \"",
	RemoveFolder: "\"Διαγραφή φακέλου: \"",
	RenameOnReboot: "\"Μετονομασία στην επανεκκίνηση: \"",
	Rename: "\"Μετονομασία: \"",
	Skipped: "\"Παραλείφθηκε: \"",
	CopyDetails: "Αντιγραφή λεπτομερειών στο Πρόχειρο",
	LogInstall: "Καταγραφή διαδικασίας εγκατάστασης",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Greek$1 = {
	header: header$p,
	id: id$p,
	font: font$p,
	code_page: code_page$p,
	rtl: rtl$p,
	strings: strings$p
};

var header$q = "NLF v6";
var id$q = 1037;
var font$q = {
	name: null,
	size: null
};
var code_page$q = 1255;
var rtl$q = true;
var strings$q = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "התקנת $(^Name)",
	UninstallCaption: "הסרת $(^Name)",
	LicenseSubCaption: ": הסכם רישוי",
	ComponentsSubCaption: ": אפשרויות התקנה",
	DirSubCaption: ": תיקיית התקנה",
	InstallingSubCaption: ": מתקין",
	CompletedSubCaption: ": ההתקנה הושלמה",
	UnComponentsSubCaption: ": אפשרויות הסרה",
	UnDirSubCaption: ": תיקייה להסרה",
	ConfirmSubCaption: ": אישור הסרה",
	UninstallingSubCaption: ": מסיר",
	UnCompletedSubCaption: ": ההסרה הושלמה",
	BackBtn: "< ה&קודם",
	NextBtn: "ה&בא >",
	AgreeBtn: "אני &מסכים",
	AcceptBtn: "אני &מסכים לתנאי הסכם הרישוי",
	DontAcceptBtn: "אני &לא מסכים לתנאי הסכם הרישוי",
	InstallBtn: "&התקן",
	UninstallBtn: "&הסר",
	CancelBtn: "ביטול",
	CloseBtn: "סגור&",
	BrowseBtn: "&עיין...",
	ShowDetailsBtn: "ה&צג פרטים",
	ClickNext: "לחץ על הבא כדי להמשיך.",
	ClickInstall: "לחץ על התקן כדי להתחיל את ההתקנה.",
	ClickUninstall: "לחץ על הסר כדי להתחיל את ההסרה.",
	Name: "שם",
	Completed: "הפעולה הושלמה",
	LicenseText: "אנא סקור את הסכם הרישוי לפני התקנת $(^NameDA). אם הינך מקבל את כל תנאי ההסכם, לחץ 'אני מסכים'.",
	LicenseTextCB: "אנא סקור את הסכם הרישוי לפני התקנת $(^NameDA). אם הינך מקבל את כל תנאי ההסכם, סמן את תיבת הסימון שלהלן. $_CLICK",
	LicenseTextRB: "אנא סקור את הסכם הרישוי לפני התקנת $(^NameDA). אם הינך מקבל את כל תנאי ההסכם, בחר באפשרות הראשונה שלהלן. $_CLICK",
	UnLicenseText: "אנא סקור את הסכם הרישוי לפני הסרת $(^NameDA). אם הינך מסכים לכל תנאי ההסכם, לחץ 'אני מסכים'.",
	UnLicenseTextCB: "אנא סקור את הסכם הרישוי לפני הסרת $(^NameDA). אם הינך מסכים לכל תנאי ההסכם, סמן את תיבת הסימון שלהלן. $_CLICK",
	UnLicenseTextRB: "אנא סקור את הסכם הרישוי לפני הסרת $(^NameDA). אם הינך מסכים לכל תנאי ההסכם, בחר באפשרות הראשונה שלהלן. $_CLICK",
	Custom: "מותאם אישית",
	ComponentsText: "סמן את הרכיבים שברצונך להתקין ובטל את הסימון של רכיבים שאין ברצונך להתקין. $_CLICK",
	ComponentsSubText1: "בחר סוג התקנה:",
	ComponentsSubText2_NoInstTypes: "בחר רכיבים להתקנה:",
	ComponentsSubText2: "או, בחר רכיבי רשות להתקנה:",
	UnComponentsText: "סמן את הרכיבים שברצונך להסיר ובטל את הסימון של רכיבים שאין ברצונך להסיר. $_CLICK",
	UnComponentsSubText1: "בחר סוג הסרה:",
	UnComponentsSubText2_NoInstTypes: "בחר רכיבים להסרה:",
	UnComponentsSubText2: "או, בחר רכיבי רשות להסרה:",
	DirText: "תוכנית זו תתקין את $(^NameDA) לתיקייה שלהלן. כדי להתקין לתיקייה אחרת, לחץ על 'עיין' ובחר תיקייה אחרת. $_CLICK",
	DirSubText: "תיקיית יעד",
	DirBrowseText: "בחר תיקייה להתקנת $(^NameDA):",
	UnDirText: "תוכנית זו תסיר את $(^NameDA) מהתיקייה שלהלן. כדי להסיר מתיקייה אחרת, לחץ על 'עיין' ובחר תיקייה אחרת. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "בחר תיקייה ממנה תוסר $(^NameDA):",
	SpaceAvailable: "\"מקום פנוי: \"",
	SpaceRequired: "\"מקום דרוש: \"",
	UninstallingText: "הסרת $(^NameDA) תתבצע מהתיקייה שלהלן. $_CLICK",
	UninstallingSubText: "מסיר מ:",
	FileError: "ארעה שגיאה בעת פתיחת קובץ לכתיבה:\\r\\n\\t\"$0\"\\r\\nלחץ על ביטול כדי לבטל את ההתקנה,\\r\\nנסה שנית כדי לנסות לפתוח את הקובץ שוב, או\\r\\nהתעלם כדי לדלג על הקובץ",
	FileError_NoIgnore: "ארעה שגיאה בעת פתיחת קובץ לכתיבה:\\r\\n\\t\"$0\"\\r\\nלחץ על נסה שנית כדי לנסות לפתוח את הקובץ  שוב, או\\r\\nביטול כדי לבטל את התתקנה",
	CantWrite: "\"לא ניתן לכתוב: \"",
	CopyFailed: "ההעתקה נכשלה",
	CopyTo: "העתק ל-",
	Registering: "\"רושם: \"",
	Unregistering: "\"ביטול רישום: \"",
	SymbolNotFound: "\"סמל לא נמצא: \"",
	CouldNotLoad: "\"לא ניתן לטעון: \"",
	CreateFolder: "\"צור תיקייה: \"",
	CreateShortcut: "\"צור קיצור דרך: \"",
	CreatedUninstaller: "\"מסיר התקנה נוצר: \"",
	Delete: "\"מחק קובץ: \"",
	DeleteOnReboot: "\"מחק אחרי אתחול: \"",
	ErrorCreatingShortcut: "\"שגיאה בעת יצירת קיצור דרך: \"",
	ErrorCreating: "\"שגיאה בעת יצירת: \"",
	ErrorDecompressing: "שגיאה בעת פרישת מידע! התקנה פגומה?",
	ErrorRegistering: "שגיאה בעת רישום DLL",
	ExecShell: "\"בצע פעולת-קובץ: \"",
	Exec: "\"בצע: \"",
	Extract: "\"פרוש: \"",
	ErrorWriting: "\"פרוש: שגיאה בעת כתיבה לקובץ \"",
	InvalidOpcode: "התקנה פגומה! פקודת ביצוע שגויה",
	NoOLE: "\"אין OLE ל: \"",
	OutputFolder: "\"תיקיית פלט: \"",
	RemoveFolder: "\"הסר תיקייה: \"",
	RenameOnReboot: "\"שנה שם לאחר אתחול: \"",
	Rename: "\"שנה שם: \"",
	Skipped: "\"דלג: \"",
	CopyDetails: "העתק פרטים ללוח",
	LogInstall: "שמור רישום פעילויות ההתקנה",
	Byte: "\"ב",
	Kilo: "\" ק\"",
	Mega: "\" מ\"",
	Giga: "\" ג\""
};
var Hebrew$1 = {
	header: header$q,
	id: id$q,
	font: font$q,
	code_page: code_page$q,
	rtl: rtl$q,
	strings: strings$q
};

var header$r = "NLF v6";
var id$r = 1081;
var font$r = {
	name: null,
	size: null
};
var code_page$r = 1200;
var rtl$r = false;
var strings$r = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) सेटअप",
	UninstallCaption: "$(^Name) अनइनस्टॉल करें",
	LicenseSubCaption: ": लाइसेंस समझौता",
	ComponentsSubCaption: ": इंस्टालेशन के विकल्प",
	DirSubCaption: ": इंस्टालेशन फोल्डर",
	InstallingSubCaption: ": इनस्टॉल कर रहे हैं",
	CompletedSubCaption: ": संपन्न",
	UnComponentsSubCaption: ": अनइंस्टालेशन के विकल्प",
	UnDirSubCaption: ": अनइंस्टालेशन फोल्डर",
	ConfirmSubCaption: ": पुष्टिकरण",
	UninstallingSubCaption: ": अनइनस्टॉल कर रहे हैं",
	UnCompletedSubCaption: ": सम्पन्न",
	BackBtn: "< &पीछे",
	NextBtn: "&आगे >",
	AgreeBtn: "मैं &सहमत हूँ",
	AcceptBtn: "मैं लाइसेंस समझौते की शर्तें &स्वीकार करता हूँ",
	DontAcceptBtn: "मैं लाइसेंस समझौते की शर्तें स्वीकार नहीं &करता हूँ",
	InstallBtn: "&इनस्टॉल करें",
	UninstallBtn: "&अनइनस्टॉल करें",
	CancelBtn: "रद्द करें",
	CloseBtn: "&बंद करें",
	BrowseBtn: "ब्रा&उज करें...",
	ShowDetailsBtn: "&विवरण दिखाएं",
	ClickNext: "जारी रखने के लिए आगे पर क्लिक करें।",
	ClickInstall: "इंस्टालेशन शुरू करने के लिए इनस्टॉल करें पर क्लिक करें।",
	ClickUninstall: "अनइंस्टालेशन शुरू करने के लिए अनइनस्टॉल करें पर क्लिक करें।",
	Name: "म",
	Completed: "सम्पन्न",
	LicenseText: "$(^NameDA) इनस्टॉल करने से पहले लाइसेंस समझौते की समीक्षा करें। यदि आप समझौते की सभी शर्तें स्वीकार करते हैं तो मैं सहमत हूँ पर क्लिक करें।",
	LicenseTextCB: "$(^NameDA) इनस्टॉल करने से पहले लाइसेंस समझौते की समीक्षा करें। यदि आप समझौते की सभी शर्तें स्वीकार करते हैं तो नीचे दिए गए चेक बॉक्स पर क्लिक करें। $_CLICK",
	LicenseTextRB: "$(^NameDA) इनस्टॉल करने से पहले लाइसेंस समझौते की समीक्षा करें। यदि आप समझौते की सभी शर्तें स्वीकार करते हैं तो नीचे दिए गए पहले विकल्प का चयन करें। $_CLICK",
	UnLicenseText: "$(^NameDA) अनइनस्टॉल करने से पहले लाइसेंस समझौते की समीक्षा करें। यदि आप समझौते की सभी शर्तें स्वीकार करते हैं तो मैं सहमत हूँ पर क्लिक करें।",
	UnLicenseTextCB: "$(^NameDA) अनइनस्टॉल करने से पहले लाइसेंस समझौते की समीक्षा करें। यदि आप समझौते की सभी शर्तें स्वीकार करते हैं तो नीचे दिए गए चेक बॉक्स पर क्लिक करें। $_CLICK",
	UnLicenseTextRB: "$(^NameDA) अनइनस्टॉल करने से पहले लाइसेंस समझौते की समीक्षा करें। यदि आप समझौते की सभी शर्तें स्वीकार करते हैं तो नीचे दिए गए पहले विकल्प का चयन करें। $_CLICK",
	Custom: "कस्टम",
	ComponentsText: "आप जो घटक इनस्टॉल करना चाहते हैं उन्हें चेक करें और आप जो घटक इनस्टॉल नहीं करना चाहते हैं उन्हें अनचेक करें। $_CLICK",
	ComponentsSubText1: "इनस्टॉल के प्रकार का चयन करें:",
	ComponentsSubText2_NoInstTypes: "इनस्टॉल करने के लिए घटकों का चयन करें:",
	ComponentsSubText2: "या उन वैकल्पिक घटकों का चयन करें जिन्हें आप इनस्टॉल करना चाहते हैं:",
	UnComponentsText: "आप जो घटक अनइनस्टॉल करना चाहते हैं उन्हें चेक करें और आप जो घटक अनइनस्टॉल नहीं करना चाहते हैं उन्हें अनचेक करें। $_CLICK",
	UnComponentsSubText1: "अनइनस्टॉल के प्रकार का चयन करें:",
	UnComponentsSubText2_NoInstTypes: "अनइनस्टॉल करने के लिए घटकों का चयन करें:",
	UnComponentsSubText2: "या उन वैकल्पिक घटकों का चयन करें जिन्हें आप अनइनस्टॉल करना चाहते हैं:",
	DirText: "सेटअप $(^NameDA) को निम्नलिखित फोल्डर में इनस्टॉल करेगा। किसी भिन्न फोल्डर में इनस्टॉल करने के लिए ब्राउज करें पर क्लिक करें और किसी अन्य फोल्डर का चयन करें। $_CLICK",
	DirSubText: "गंतव्य फोल्डर",
	DirBrowseText: "$(^NameDA) को जिस फोल्डर में इनस्टॉल करना है उसका चयन करें:",
	UnDirText: "सेटअप $(^NameDA) को निम्नलिखित फोल्डर से अनइनस्टॉल करेगा। किसी भिन्न फोल्डर से अनइनस्टॉल करने के लिए ब्राउज करें पर क्लिक करें और किसी अन्य फोल्डर का चयन करें। $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "$(^NameDA) को जिस फोल्डर से अनइनस्टॉल करना है उसका चयन करें:",
	SpaceAvailable: "\"उपलब्ध जगह: \"",
	SpaceRequired: "\"अपेक्षित जगह: \"",
	UninstallingText: "$(^NameDA) को निम्नलिखित फोल्डर से अनइनस्टॉल किया जाएगा। $_CLICK",
	UninstallingSubText: "इस से अनइनस्टॉल कर रहे हैं:",
	FileError: "लिखने के लिए फ़ाइल खोलने में त्रुटि: \\r\\n\\r\\n$0\\r\\n\\r\\nइंस्टालेशन रोकने के लिए निरस्त करें पर क्लिक करें,\\r\\nफिर से प्रयास करने के लिए पुनः प्रयास करें, या\\r\\nइस फाइल को छोड़ने के लिए नजरंदाज करें।",
	FileError_NoIgnore: "लिखने के लिए फ़ाइल खोलने में त्रुटि: \\r\\n\\r\\n$0\\r\\n\\r\\nफिर से प्रयास करने के लिए पुनः प्रयास करें पर क्लिक करें, या\\r\\nइंस्टालेशन रोकने के लिए रद्द करें।",
	CantWrite: "\"नहीं लिख सकते: \"",
	CopyFailed: "कॉपी करना विफल रहा",
	CopyTo: "\"में कॉपी करें \"",
	Registering: "\"पंजीकृत कर रहे हैं: \"",
	Unregistering: "\"पंजीकरण रद्द कर रहे हैं: \"",
	SymbolNotFound: "\"प्रतीक नहीं ढूंढ सके: \"",
	CouldNotLoad: "\"लोड नहीं कर सके: \"",
	CreateFolder: "\"फोल्डर बनाएं: \"",
	CreateShortcut: "\"शॉर्टकट बनाएं: \"",
	CreatedUninstaller: "\"अनइंस्टालर बनाया: \"",
	Delete: "\"फाइल हटाएं: \"",
	DeleteOnReboot: "\"रीबूट करने पर हटाएं: \"",
	ErrorCreatingShortcut: "\"शॉर्टकट बनाने में त्रुटि: \"",
	ErrorCreating: "\"बनाने में त्रुटि: \"",
	ErrorDecompressing: "डेटा असंपीड़ित करने पर त्रुटि! दूषित इंस्टालर?",
	ErrorRegistering: "DLL पंजीकृत करने पर त्रुटि",
	ExecShell: "\"शेल निष्पादित करें: \"",
	Exec: "निष्पादित करें: \"",
	Extract: "\"निकालें: \"",
	ErrorWriting: "\"निकालें: फाइल में लिखते समय त्रुटि \"",
	InvalidOpcode: "इंस्टालर दूषित: अवैध ऑपकोड",
	NoOLE: "\"इसके लिए कोई OLE नहीं: \"",
	OutputFolder: "\"आउटपुट फोल्डर: \"",
	RemoveFolder: "\"फोल्डर निकालें: \"",
	RenameOnReboot: "\"रीबूट करने पर नाम बदलें: \"",
	Rename: "\"नाम बदलें: \"",
	Skipped: "\"छोड़ा गया: \"",
	CopyDetails: "क्लिपबोर्ड पर विवरण कॉपी करें",
	LogInstall: "लॉग इनस्टॉल प्रक्रिया",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Hindi$1 = {
	header: header$r,
	id: id$r,
	font: font$r,
	code_page: code_page$r,
	rtl: rtl$r,
	strings: strings$r
};

var header$s = "NLF v6";
var id$s = 1038;
var font$s = {
	name: null,
	size: null
};
var code_page$s = 1250;
var rtl$s = false;
var strings$s = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) Telepítő",
	UninstallCaption: "$(^Name) Eltávolító",
	LicenseSubCaption: ": Licencszerződés",
	ComponentsSubCaption: ": Telepítési lehetőségek",
	DirSubCaption: ": Célmappa",
	InstallingSubCaption: ": Fájlok telepítése",
	CompletedSubCaption: ": Kész",
	UnComponentsSubCaption: ": Eltávolítási lehetőségek",
	UnDirSubCaption: ": Eltávolítás mappája",
	ConfirmSubCaption: ": Megerősítés",
	UninstallingSubCaption: ": Fájlok eltávolítása",
	UnCompletedSubCaption: ": Kész",
	BackBtn: "< &Vissza",
	NextBtn: "&Tovább >",
	AgreeBtn: "&Elfogadom",
	AcceptBtn: "&Elfogadom a Licencszerződés feltételeit",
	DontAcceptBtn: "&Nem fogadom el a Licencszerződés feltételeit",
	InstallBtn: "&Telepítés",
	UninstallBtn: "&Eltávolítás",
	CancelBtn: "&Mégse",
	CloseBtn: "&Bezárás",
	BrowseBtn: "&Tallózás...",
	ShowDetailsBtn: "&Részletek",
	ClickNext: "Kattintson a Tovább-ra a folytatáshoz.",
	ClickInstall: "Kattintson a Telepítésre a telepítéshez.",
	ClickUninstall: "Kattintson az Eltávolításra az eltávolításhoz.",
	Name: "Név",
	Completed: "Kész",
	LicenseText: "A(z) $(^NameDA) telepítése előtt tekintse át a szerződés feltételeit. Ha elfogadja a szerződés valamennyi feltételét, az Elfogadom gombbal folytathatja.",
	LicenseTextCB: "A(z) $(^NameDA) telepítése előtt tekintse át a szerződés feltételeit. Ha elfogadja a szerződés valamennyi feltételét, jelölje be a Jelölőnégyzeten. $_CLICK",
	LicenseTextRB: "A(z) $(^NameDA) telepítése előtt tekintse át a szerződés feltételeit. Ha elfogadja a szerződés valamennyi feltételét, válassza az első lehetőséget. $_CLICK",
	UnLicenseText: "A(z) $(^NameDA) eltávolítása előtt tekintse át a szerződés feltételeit. Ha elfogadja a szerződés valamennyi feltételét, az Elfogadom gombbal folytathatja.",
	UnLicenseTextCB: "A(z) $(^NameDA) eltávolítása előtt tekintse át a szerződés feltételeit. Ha elfogadja a szerződés valamennyi feltételét, jelölje be a Jelölőnégyzeten. $_CLICK",
	UnLicenseTextRB: "A(z) $(^NameDA) eltávolítása előtt tekintse át a szerződés feltételeit. Ha elfogadja a szerződés valamennyi feltételét, válassza az első lehetőséget. $_CLICK",
	Custom: "Egyéni",
	ComponentsText: "Jelölje be azokat az összetevőket amelyeket telepíteni kíván és törölje a jelölést a nem kívánt összetevőknél. $_CLICK",
	ComponentsSubText1: "Válassza ki a telepítés típusát:",
	ComponentsSubText2_NoInstTypes: "Válassza ki a telepítendő összetevőket:",
	ComponentsSubText2: "vagy, jelölje ki a választható összetevők közül a telepíteni kívánta(ka)t:",
	UnComponentsText: "Jelölje be azokat az összetevőket amelyeket el kíván távolítani és törölje a jelölést az eltávolítani nem kívánt összetevőknél. $_CLICK",
	UnComponentsSubText1: "Válassza ki az Eltávolítás típusát:",
	UnComponentsSubText2_NoInstTypes: "Válassza ki az eltávolítandó összetevőket:",
	UnComponentsSubText2: "vagy, jelölje ki a választható összetevők közül az eltávolítani kívánta(ka)t:",
	DirText: "A $(^NameDA) a következő mappába kerül. Másik mappa választásához kattintson a Tallózás gombra. $_CLICK",
	DirSubText: "Telepítés helye",
	DirBrowseText: "A(z) $(^NameDA) telepítési helyének kiválasztása:",
	UnDirText: "A(z) $(^NameDA) eltávolítása a következő mappából. Másik mappa választásához kattintson a Tallózás gombra. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Válassza ki, hogy a $(^NameDA) melyik mappából kerüljön eltávolításra:",
	SpaceAvailable: "\"Szabad terület: \"",
	SpaceRequired: "\"Helyigény: \"",
	UninstallingText: "A(z) $(^NameDA) eltávolítása következik a számítógépről. $_CLICK",
	UninstallingSubText: "Eltávolítás helye:",
	FileError: "Hiba történt a fájl írásra történő megnyitásakor: \\r\\n\\t\"$0\"\\r\\nA Mégse gomb megnyomásával megszakíthatja a telepítést,\\r\\naz Ismét gombbal megismételheti a fájl írását,\\r\\na Kihagyás gombbal kihagyhatja ezt a fájlt.",
	FileError_NoIgnore: "Hiba történt a fájl írásra történő megnyitásakor:  \\r\\n\\t\"$0\"\\r\\nAz Újra gomb megnyomásával megismételheti a műveletet, vagy \\r\\na Mégse gombbal megszakíthatja a telepítést.",
	CantWrite: "\"Nem írható: \"",
	CopyFailed: "A másolás megszakadt",
	CopyTo: "\"Másolás ide: \"",
	Registering: "\"Bejegyzés: \"",
	Unregistering: "\"Eltávolítás: \"",
	SymbolNotFound: "\"A következő szimbólum nem található: \"",
	CouldNotLoad: "\"Nem tölthető be: \"",
	CreateFolder: "\"Mappa létrehozás: \"",
	CreateShortcut: "\"Parancsikon létrehozása: \"",
	CreatedUninstaller: "\"Létrehozott eltávolító: \"",
	Delete: "\"Törölt fájl: \"",
	DeleteOnReboot: "\"Rendszerindításkor törlendő: \"",
	ErrorCreatingShortcut: "\"Hiba a parancsikon létrehozásakor: \"",
	ErrorCreating: "\"Hiba a létrehozáskor: \"",
	ErrorDecompressing: "Hiba az adatok kibontásakor! Megsérült a Telepítő?",
	ErrorRegistering: "Hiba a DLL regisztrálásakor",
	ExecShell: "\"Végrehajtás a hozzárendeléseken keresztül: \"",
	Exec: "\"Végrehajtás: \"",
	Extract: "\"Kibontás: \"",
	ErrorWriting: "\"Kibontás: Hiba a fájl írásakor \"",
	InvalidOpcode: "Sérült a telepítő: hibás utasítás",
	NoOLE: "\"Nincs OLE: \"",
	OutputFolder: "\"Kimeneti mappa: \"",
	RemoveFolder: "\"Mappa eltávolítása: \"",
	RenameOnReboot: "\"Átnevezés rendszerindításkor: \"",
	Rename: "\"Átnevezés: \"",
	Skipped: "\"Kihagyott: \"",
	CopyDetails: "Adatok vágólapra másolása",
	LogInstall: "Telepítő ellenőrzőlista",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Hungarian$1 = {
	header: header$s,
	id: id$s,
	font: font$s,
	code_page: code_page$s,
	rtl: rtl$s,
	strings: strings$s
};

var header$t = "NLF v6";
var id$t = 1039;
var font$t = {
	name: null,
	size: null
};
var code_page$t = 1252;
var rtl$t = false;
var strings$t = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) Uppsetning",
	UninstallCaption: "$(^Name) Fjarlæging",
	LicenseSubCaption: ": Notandaleyfissamningur",
	ComponentsSubCaption: ": Uppsetningarvalmöguleikar",
	DirSubCaption: ": Uppsetningarskráarsafn",
	InstallingSubCaption: ": Set upp",
	CompletedSubCaption: ": Lokið",
	UnComponentsSubCaption: ": Fjarlægingarvalmöguleikar",
	UnDirSubCaption: ": Fjarlægingarskráarsafn",
	ConfirmSubCaption: ": Staðfesting",
	UninstallingSubCaption: ": Fjarlægi",
	UnCompletedSubCaption: ": Lokið",
	BackBtn: "< &Til baka",
	NextBtn: "&Áfram >",
	AgreeBtn: "Ég &Samþykki",
	AcceptBtn: "Ég &samþykki skilmála leyfissamningsins",
	DontAcceptBtn: "Ég samþykki &ekki skilmála leyfissamningsins",
	InstallBtn: "&Setja upp",
	UninstallBtn: "&Fjarlægja",
	CancelBtn: "Hætta við",
	CloseBtn: "&Loka",
	BrowseBtn: "&Vafra...",
	ShowDetailsBtn: "Sýna &upplýsingar",
	ClickNext: "Smelltu á 'Áfram' til að halda áfram.",
	ClickInstall: "Smelltu á 'Setja upp' til þess að hefja uppsetninguna.",
	ClickUninstall: "Smelltu á 'Fjarlægja' til að hefja fjarlægingar ferlið.",
	Name: "Nafn",
	Completed: "Lokið",
	LicenseText: "Vinsamlegast skoðaðu notandaleyfissamninginn vel áður en uppsetning á $(^NameDA) hefst. Ef þú samþykkir skilmála samningsins, smelltu þá á 'Ég samþykki'.",
	LicenseTextCB: "Vinsamlegast skoðaðu notandaleyfissamninginn vel áður en uppsetning á $(^NameDA) hefst. Ef þú samþykkir skilmála samningsins, hakaðu þá í kassann hér að neðan. $_CLICK",
	LicenseTextRB: "Vinsamlegast skoðaðu notandaleyfissamninginn vel áður en uppsetning á $(^NameDA) hefst. Ef þú samþykkir skilmála samningsins, veldu þá fyrsta valmöguleikann hér að neðan. $_CLICK",
	UnLicenseText: "Vinsamlegast skoðaðu notandaleyfissamninginn vel áður en uppsetning á $(^NameDA) hefst. Ef þú samþykkir skilmála samningsins, smelltu þá á 'Ég samþykki'.",
	UnLicenseTextCB: "Vinsamlegast skoðaðu notandaleyfissamninginn vel áður en uppsetning á $(^NameDA) hefst. Ef þú samþykkir skilmála samningsins, hakaðu þá í kassann hér að neðan. $_CLICK",
	UnLicenseTextRB: "Vinsamlegast skoðaðu notandaleyfissamninginn vel áður en uppsetning á $(^NameDA) hefst. Ef þú samþykkir skilmála samningsins, veldu þá fyrsta valmöguleikann hér að neðan. $_CLICK",
	Custom: "Sjálfval",
	ComponentsText: "Hakaðu við þá íhluti sem þú vilt setja upp og taktu hakið af þeim íhlutum sem þú vilt ekki setja upp. $_CLICK",
	ComponentsSubText1: "Veldu tegund uppsetningar:",
	ComponentsSubText2_NoInstTypes: "Veldu þá íhluti sem á að setja upp:",
	ComponentsSubText2: "Eða, veldu valfrjálsa íhluti á að setja upp:",
	UnComponentsText: "Hakaðu við þá íhluti sem þú vilt fjarlægja og taktu hakið af þeim íhlutum sem þú vilt ekki fjarlægja. $_CLICK",
	UnComponentsSubText1: "Veldu tegund fjarlægingar:",
	UnComponentsSubText2_NoInstTypes: "Veldu íhluti sem á að fjarlægja:",
	UnComponentsSubText2: "Eða, veldu valfrjálsa íhluti sem á að fjarlægja:",
	DirText: "Uppsetningin mun setja $(^NameDA) upp í eftirfarandi skráarsafn. Til að setja forritið upp í annað skráarsafn, smelltu á 'Vafra...' og veldu annað skráarsafn. $_CLICK",
	DirSubText: "Uppsetningarskráarsafn",
	DirBrowseText: "Veldu það skráarsafn sem þú vilt setja $(^NameDA) upp í:",
	UnDirText: "Uppsetningin mun fjarlægja $(^NameDA) úr eftirfarandi skráarsafni. Til að fjarlægja forritið úr öðru skráarsafni, smelltu á 'Vafra...' og veldu annað skráarsafn. $_CLICK",
	UnDirSubText: "\"Fjarlægingarskráarsafn\"",
	UnDirBrowseText: "Veldu það skráarsafn sem þú vilt fjarlægja $(^NameDA) úr:",
	SpaceAvailable: "\"Tiltækt rými: \"",
	SpaceRequired: "\"Nauðsynlegt rými: \"",
	UninstallingText: "$(^NameDA) verður fjarlægt úr eftirfarandi skráarsafni. $_CLICK",
	UninstallingSubText: "Fjarlægi úr:",
	FileError: "Villa við að skrifa í skrá: \\r\\n\\r\\n$0\\r\\n\\r\\nSmelltu á 'Hætta við' til að stoppa uppsetninguna,\\r\\n'Reyna aftur' til að gera aðra tilraun, eða\\r\\n'Hunsa' til sleppa þessari skrá.",
	FileError_NoIgnore: "Villa við að skrifa í skrá: \\r\\n\\r\\n$0\\r\\n\\r\\nSmelltu á 'Reyna aftur' til að gera aðra tilraun, eða\\r\\n'Hætta við' til að stoppa uppsetninguna.",
	CantWrite: "\"Get ei skrifað: \"",
	CopyFailed: "Afritun mistókst",
	CopyTo: "\"Afrita til \"",
	Registering: "\"Skrásetja: \"",
	Unregistering: "\"Afskrá: \"",
	SymbolNotFound: "\"Fann ekki tákn: \"",
	CouldNotLoad: "\"Gat ekki hlaðið inn: \"",
	CreateFolder: "\"Búa til skráarsafn: \"",
	CreateShortcut: "\"Búa til flýtileið: \"",
	CreatedUninstaller: "\"Bjó til fjarlægingarhjálp: \"",
	Delete: "\"Eyða skrá: \"",
	DeleteOnReboot: "\"Eyða við endurræsingu: \"",
	ErrorCreatingShortcut: "\"Villa við gerð flýtileiðar: \"",
	ErrorCreating: "\"Villa við gerð: \"",
	ErrorDecompressing: "Villa við afþjöppun gagna! Biluð uppsetningarhjálp?",
	ErrorRegistering: "Villa við skrásetningu DLL",
	ExecShell: "\"Keyrslugluggi: \"",
	Exec: "\"Keyra: \"",
	Extract: "\"Færa út: \"",
	ErrorWriting: "\"Færa út: villa við að skrifa í skrá \"",
	InvalidOpcode: "Uppsetningarhjálp biluð: rangur stýrikóði",
	NoOLE: "\"Engin OLE fyrir: \"",
	OutputFolder: "\"Útskráarsafn: \"",
	RemoveFolder: "\"Fjarlægja skráarsafn: \"",
	RenameOnReboot: "\"Endurskíra við endurræsingu: \"",
	Rename: "\"Endurskíra: \"",
	Skipped: "\"Sleppt: \"",
	CopyDetails: "Afrita upplýsingar til skrifbrettis",
	LogInstall: "Skrá uppsetningarferli",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Icelandic$1 = {
	header: header$t,
	id: id$t,
	font: font$t,
	code_page: code_page$t,
	rtl: rtl$t,
	strings: strings$t
};

var header$u = "NLF v6";
var id$u = 1057;
var font$u = {
	name: null,
	size: null
};
var code_page$u = 1252;
var rtl$u = false;
var strings$u = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Instalasi Program $(^Name)",
	UninstallCaption: "Penghapusan Program $(^Name)",
	LicenseSubCaption: ": Perihal Lisensi",
	ComponentsSubCaption: ": Pilihan Instalasi",
	DirSubCaption: ": Lokasi Instalasi",
	InstallingSubCaption: ": Proses Instalasi",
	CompletedSubCaption: ": Selesai",
	UnComponentsSubCaption: ": Pilihan Penghapusan",
	UnDirSubCaption: ": Berkas Lokasi yang dihapus",
	ConfirmSubCaption: ": Konfirmasi",
	UninstallingSubCaption: ": Proses Penghapusan",
	UnCompletedSubCaption: ": Selesai",
	BackBtn: "< &Mundur",
	NextBtn: "&Lanjut >",
	AgreeBtn: "Saya &Setuju",
	AcceptBtn: "Saya s&etuju dengan Perihal Lisensi",
	DontAcceptBtn: "Saya &tidak setuju dengan Perihal Lisensi",
	InstallBtn: "&Instal",
	UninstallBtn: "&Hapus",
	CancelBtn: "Batalkan",
	CloseBtn: "&Tutup",
	BrowseBtn: "Ca&ri...",
	ShowDetailsBtn: "Lihat &perincian",
	ClickNext: "Tekan tombol Lanjut untuk melanjutkan.",
	ClickInstall: "Tekan tombol Instal untuk memulai instalasi.",
	ClickUninstall: "Tekan tombol Hapus untuk memulai penghapusan.",
	Name: "Nama",
	Completed: "Selesai",
	LicenseText: "Silahkan membaca lisensi berikut sebelum memulai instalasi $(^NameDA). Jika anda menyetujui dan menerima semua pernyataan, tekan tombol Saya Setuju.",
	LicenseTextCB: "Silahkan membaca lisensi berikut sebelum memulai instalasi $(^NameDA). Jika anda menyetujui dan menerima semua pernyataan, beri tanda centang. $_CLICK",
	LicenseTextRB: "Silahkan membaca lisensi berikut sebelum memulai instalasi $(^NameDA). Jika anda menyetujui dan menerima semua pernyataan, pilihlah salah satu item dibawah ini. $_CLICK",
	UnLicenseText: "Silahkan membaca lisensi berikut sebelum mulai menghapus $(^NameDA). Jika anda menyetujui dan menerima semua pernyataan, tekan tombol Saya Setuju.",
	UnLicenseTextCB: "Silahkan membaca lisensi berikut sebelum mulai menghapus $(^NameDA). Jika anda menyetujui dan menerima semua pernyataan, beri tanda centang. $_CLICK",
	UnLicenseTextRB: "Silahkan membaca lisensi berikut sebelum mulai menghapus $(^NameDA). Jika anda menyetujui dan menerima semua pernyataan, pilihlah salah satu item dibawah ini. $_CLICK",
	Custom: "Tentukan Sendiri",
	ComponentsText: "Beri tanda centang pada komponen yang akan di instal and hilangkan tanda centang pada komponen yang tidak perlu di instal. $_CLICK",
	ComponentsSubText1: "Pilih tipe instalasi:",
	ComponentsSubText2_NoInstTypes: "Pilih komponen-komponen yang akan di instal:",
	ComponentsSubText2: "Atau, pilih komponen tambahan yang akan di instal:",
	UnComponentsText: "Beri tanda centang pada komponen yang akan dihapus and hilangkan tanda centang pada komponen yang tidak ingin dihapus. $_CLICK",
	UnComponentsSubText1: "Pilih tipe penghapusan:",
	UnComponentsSubText2_NoInstTypes: "Pilih komponen-komponen yang ingin dihapus:",
	UnComponentsSubText2: "Atau, pilih komponen tambahan yang ingin dihapus:",
	DirText: "Program $(^NameDA) akan di instal pada lokasi berikut. Untuk memilih lokasi, tekan tombol Cari kemudian pilih lokasi yang anda kehendaki. $_CLICK",
	DirSubText: "Lokasi instalasi",
	DirBrowseText: "Pilih lokasi instalasi program $(^NameDA):",
	UnDirText: "Proses penghapusan program $(^NameDA) dari lokasi instalasi berikut. Untuk memilih lokasi lainnya, tekan tombol Cari kemudian pilih lokasi yang anda kehendaki. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Pilih lokasi instalasi program $(^NameDA) yang akan dihapus:",
	SpaceAvailable: "\"Ruang yang tersedia:   \"",
	SpaceRequired: "\"Ruang yang dibutuhkan: \"",
	UninstallingText: "$(^NameDA) akan dihapus dari lokasi berikut. $_CLICK",
	UninstallingSubText: "Proses penghapusan dari:",
	FileError: "Tidak dapat membuka berkas untuk menulis: \\r\\n\\t\"$0\"\\r\\nTekan tombol Abort untuk membatalkan instalasi,\\r\\nRetry untuk mencoba lagi, atau\\r\\nIgnore untuk melewati file ini.",
	FileError_NoIgnore: "Tidak dapat membuka berkas untuk menulis: \\r\\n\\t\"$0\"\\r\\nTekan tombol Retry untuk mencoba lagi, atau\\r\\nCancel untuk membatalkan instalasi.",
	CantWrite: "\"Tidak bisa menulis pada berkas: \"",
	CopyFailed: "Gagal menyalin berkas",
	CopyTo: "\"Menyalin ke \"",
	Registering: "\"Memasukkan dalam daftar: \"",
	Unregistering: "\"Menghapus dari daftar: \"",
	SymbolNotFound: "\"Tidak dapat menemukan simbol: \"",
	CouldNotLoad: "\"Tidak dapat memuat: \"",
	CreateFolder: "\"Membuat tempat menyimpan berkas: \"",
	CreateShortcut: "\"Membuat shortcut: \"",
	CreatedUninstaller: "\"Program penghapusan yang dibuat: \"",
	Delete: "\"Menghapus berkas: \"",
	DeleteOnReboot: "\"Akan dihapus saat reboot: \"",
	ErrorCreatingShortcut: "\"Tidak dapat membuat shortcut: \"",
	ErrorCreating: "\"Ada kesalahan saat membuat: \"",
	ErrorDecompressing: "Ada kesalahan saat membuka data! Program Instalasi tidak lengkap?",
	ErrorRegistering: "Ada kesalahan ketika mendaftarkan modul DLL",
	ExecShell: "\"Perintah: \"",
	Exec: "\"Menjalankan: \"",
	Extract: "\"Proses ekstraksi berkas: \"",
	ErrorWriting: "\"Ekstraksi: ada kesalahan saat menulis ke berkas \"",
	InvalidOpcode: "Program instalasi rusak: kode program tidak lengkap",
	NoOLE: "\"OLE tidak ditemukan: \"",
	OutputFolder: "\"Lokasi tujuan: \"",
	RemoveFolder: "\"Menghapus lokasi penyimpanan: \"",
	RenameOnReboot: "\"Memberi nama baru saat reboot: \"",
	Rename: "\"Memberi nama baru: \"",
	Skipped: "\"Dilewati: \"",
	CopyDetails: "Salin perincian ke Clipboard",
	LogInstall: "Catat proses instalasi",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Indonesian$1 = {
	header: header$u,
	id: id$u,
	font: font$u,
	code_page: code_page$u,
	rtl: rtl$u,
	strings: strings$u
};

var header$v = "NLF v6";
var id$v = 2108;
var font$v = {
	name: null,
	size: null
};
var code_page$v = 1252;
var rtl$v = false;
var strings$v = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Socrú $(^Name)",
	UninstallCaption: "Díshuiteáil $(^Name)",
	LicenseSubCaption: ": Comhaontú um Cheadúnas",
	ComponentsSubCaption: ": Roghanna Suiteála",
	DirSubCaption: ": Fillteán Suiteála",
	InstallingSubCaption: ": Suiteáil",
	CompletedSubCaption: ": Críochnaithe",
	UnComponentsSubCaption: ": Roghanna Díshuiteála",
	UnDirSubCaption: ": Fillteán Díshuiteála",
	ConfirmSubCaption: ": Deimhniú",
	UninstallingSubCaption: ": Díshuiteáil",
	UnCompletedSubCaption: ": Críochnaithe",
	BackBtn: "< Ar Ai&s",
	NextBtn: "Ar &Aghaidh >",
	AgreeBtn: "Gl&acaim Leis",
	AcceptBtn: "Táim toilteanach &glacadh le coinníollacha an Chomhaontú um Cheadúnas",
	DontAcceptBtn: "Nílim &toilteanach glacadh le coinníollacha an Chomhaontú um Cheadúnas",
	InstallBtn: "&Suiteáil",
	UninstallBtn: "&Díshuiteáil",
	CancelBtn: "Cealaigh",
	CloseBtn: "&Dún",
	BrowseBtn: "B&rabhsáil...",
	ShowDetailsBtn: "Taispeáin &sonraí",
	ClickNext: "Cliceáil \"Ar Aghaidh\" chun leanúint ar aghaidh.",
	ClickInstall: "Cliceáil \"Suiteáil\" chun tosú.",
	ClickUninstall: "Cliceáil \"Díshuiteáil\" chun tosú.",
	Name: "Ainm",
	Completed: "Críochnaithe",
	LicenseText: "Déan iniúchadh ar an gComhaontú um Cheadúnas sula suiteálann tú $(^NameDA). Má ghlacann tú le gach coinníoll den chomhaontú, cliceáil \"Glacaim Leis\".",
	LicenseTextCB: "Déan iniúchadh ar an gComhaontú um Cheadúnas sula suiteálann tú $(^NameDA). Má ghlacann tú le gach coinníoll den chomhaontú, cliceáil an ticbhosca thíos. $_CLICK",
	LicenseTextRB: "Déan iniúchadh ar an gComhaontú um Cheadúnas sula suiteálann tú $(^NameDA). Má ghlacann tú le gach coinníoll den chomhaontú, roghnaigh an chéad rogha thíos. $_CLICK",
	UnLicenseText: "Déan iniúchadh ar an gComhaontú um Cheadúnas sula ndíshuiteálann tú $(^NameDA). Má ghlacann tú le gach coinníoll den chomhaontú, cliceáil \"Glacaim Leis\".",
	UnLicenseTextCB: "Déan iniúchadh ar an gComhaontú um Cheadúnas sula ndíshuiteálann tú $(^NameDA). Má ghlacann tú le gach coinníoll den chomhaontú, cliceáil an ticbhosca thíos. $_CLICK",
	UnLicenseTextRB: "Déan iniúchadh ar an gComhaontú um Cheadúnas sula ndíshuiteálann tú $(^NameDA). Má ghlacann tú le gach coinníoll den chomhaontú, roghnaigh an chéad rogha thíos. $_CLICK",
	Custom: "Saincheaptha",
	ComponentsText: "Roghnaigh na comhpháirteanna is mian leat a shuiteáil, agus díroghnaigh na comhpháirteanna nach mian leat a shuiteáil. $_CLICK",
	ComponentsSubText1: "Roghnaigh cineál na suiteála:",
	ComponentsSubText2_NoInstTypes: "Roghnaigh na comhpháirteanna is mian leat a shuiteáil:",
	ComponentsSubText2: "Nó, roghnaigh na comhpháirteanna roghnacha is mian leat a shuiteáil:",
	UnComponentsText: "Roghnaigh na comhpháirteanna is mian leat a dhíshuiteáil, agus díroghnaigh na comhpháirteanna nach mian leat a dhíshuiteáil. $_CLICK",
	UnComponentsSubText1: "Roghnaigh cineál na díshuiteála:",
	UnComponentsSubText2_NoInstTypes: "Roghnaigh comhpháirteanna le díshuiteáil:",
	UnComponentsSubText2: "Nó, roghnaigh na comhpháirteanna roghnacha is mian leat a dhíshuiteáil:",
	DirText: "Cuirfidh an Suiteálaí $(^NameDA) san fhillteán seo a leanas. Más mian leat suiteáil i bhfillteán difriúil, cliceáil \"Brabhsáil\" agus roghnaigh fillteán eile. $_CLICK",
	DirSubText: "Sprioc-Fhillteán",
	DirBrowseText: "Roghnaigh an fillteán inar mian leat $(^NameDA) a shuiteáil:",
	UnDirText: "Bainfidh an Suiteálaí $(^NameDA) amach as an bhfillteán seo a leanas. Más mian leat é a dhíshuiteáil ó fhillteán difriúil, cliceáil \"Brabhsáil\" agus roghnaigh fillteán eile. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Roghnaigh an fillteán ar mian leat $(^NameDA) a dhíshuiteáil as:",
	SpaceAvailable: "\"Spás le fáil: \"",
	SpaceRequired: "\"Spás de dhíth: \"",
	UninstallingText: "Díshuiteálfar $(^NameDA) ón fhillteán seo a leanas. $_CLICK",
	UninstallingSubText: "Á dhíshuiteáil ó:",
	FileError: "Earráid agus comhad á scríobh: \\r\\n\\r\\n$0\\r\\n\\r\\nCliceáil \"Abort\" chun an tsuiteáil a stopadh,\\r\\n\"Retry\" chun iarracht eile a dhéanamh, nó\\r\\n\"Ignore\" chun neamhaird a dhéanamh den chomhad seo.",
	FileError_NoIgnore: "Earráid agus comhad á scríobh: \\r\\n\\r\\n$0\\r\\n\\r\\nCliceáil \"Retry\" chun iarracht eile a dhéanamh, nó\\r\\n\"Cancel\" chun an tsuiteáil a stopadh.",
	CantWrite: "\"Ní féidir scríobh: \"",
	CopyFailed: "Theip ar an gcóipeáil",
	CopyTo: "\"Cóipeáil go \"",
	Registering: "\"Clárú: \"",
	Unregistering: "\"Díchlárú: \"",
	SymbolNotFound: "\"Níorbh fhéidir siombail a aimsiú: \"",
	CouldNotLoad: "\"Níorbh fhéidir luchtú: \"",
	CreateFolder: "\"Cruthaigh fillteán: \"",
	CreateShortcut: "\"Cruthaigh aicearra: \"",
	CreatedUninstaller: "\"Cruthaíodh díshuiteálaí: \"",
	Delete: "\"Scrios comhad: \"",
	DeleteOnReboot: "\"Scrios ag am atosaithe: \"",
	ErrorCreatingShortcut: "\"Earráid agus aicearra á chruthú: \"",
	ErrorCreating: "\"Earráid le linn cruthaithe: \"",
	ErrorDecompressing: "Earráid agus sonraí á ndíchomhbhrú! Suiteálaí truaillithe?",
	ErrorRegistering: "Earráid agus DLL á chlárú",
	ExecShell: "\"Blaosc: \"",
	Exec: "\"Rith: \"",
	Extract: "\"Bain Amach: \"",
	ErrorWriting: "\"Extract: earráid le linn scríofa \"",
	InvalidOpcode: "Díshuiteálaí truaillithe: cód neamhbhailí oibríochta",
	NoOLE: "\"Gan OLE le haghaidh: \"",
	OutputFolder: "\"Fillteán aschurtha: \"",
	RemoveFolder: "\"Bain fillteán: \"",
	RenameOnReboot: "\"Athainmnigh ag am atosaithe: \"",
	Rename: "\"Athainmnigh: \"",
	Skipped: "\"Neamhaird déanta de: \"",
	CopyDetails: "Cóipeáil Sonraí go dtí an Ghearrthaisce",
	LogInstall: "Logáil an próiseas suiteála",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Irish$1 = {
	header: header$v,
	id: id$v,
	font: font$v,
	code_page: code_page$v,
	rtl: rtl$v,
	strings: strings$v
};

var header$w = "NLF v6";
var id$w = 1040;
var font$w = {
	name: null,
	size: null
};
var code_page$w = 1252;
var rtl$w = false;
var strings$w = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Installazione di $(^Name)",
	UninstallCaption: "Disinstallazione di $(^Name)",
	LicenseSubCaption: ": Accordo di licenza",
	ComponentsSubCaption: ": Opzioni installazione",
	DirSubCaption: ": Cartella installazione",
	InstallingSubCaption: ": Installazione",
	CompletedSubCaption: ": Installazione completata",
	UnComponentsSubCaption: ": Opzioni disinstallazione",
	UnDirSubCaption: ": Cartella disinstallazione",
	ConfirmSubCaption: ": Conferma",
	UninstallingSubCaption: ": Disinstallazione",
	UnCompletedSubCaption: ": Disisntallazione completata",
	BackBtn: "< &Indietro",
	NextBtn: "&Avanti >",
	AgreeBtn: "&Accetto",
	AcceptBtn: "&Accetto le condizioni della licenza",
	DontAcceptBtn: "&Non accetto le condizioni della licenza",
	InstallBtn: "Ins&talla",
	UninstallBtn: "&Disinstalla",
	CancelBtn: "Annulla",
	CloseBtn: "&Fine",
	BrowseBtn: "S&foglia...",
	ShowDetailsBtn: "Visualizza &dettagli",
	ClickNext: "Per proseguire, seleziona 'Avanti'.",
	ClickInstall: "Per avviare l'installazione, seleziona 'Installa'.",
	ClickUninstall: "Per avviare la disinstallazione, seleziona 'Disinstalla'.",
	Name: "Nome",
	Completed: "Installazione completata",
	LicenseText: "Leggi la licenza prima di procedere con l'installazione di $(^NameDA). Se accetti le condizioni della licenza, seleziona 'Accetto'.",
	LicenseTextCB: "Leggi licenza prima di procedere con l'installazione di $(^NameDA). Se accetti tutte le condizioni della licenza, seleziona la casella sottostante. $_CLICK",
	LicenseTextRB: "Leggi la licenza prima di procedere con l'installazione di $(^NameDA). Se accetti tutte le condizioni della licenza, seleziona la prima delle opzioni sottoindicate. $_CLICK",
	UnLicenseText: "Leggi la licenza prima di procedere con la disinstallazione di $(^NameDA). Se accetti tutte le condizioni della licenza, seleziona 'Accetto'. $_CLICK",
	UnLicenseTextCB: "Leggi la licenza prima di procedere con la disinstallazione di $(^NameDA). Se accetti tutte le condizioni della licenza, seleziona la casella sottostante. $_CLICK",
	UnLicenseTextRB: "Leggi la licenza prima di procedere con la disinstallazione di $(^NameDA). Se accetti tutte le condizioni della licenza, seleziona la prima delle opzioni sottoindicate. $_CLICK",
	Custom: "Personalizzata",
	ComponentsText: "Seleziona componenti da installare.",
	ComponentsSubText1: "Seleziona tipo installazione:",
	ComponentsSubText2_NoInstTypes: "Seleziona componenti da installare:",
	ComponentsSubText2: "Oppure, seleziona componenti opzionali da installare:",
	UnComponentsText: "Seleziona componenti da disinstallare.",
	UnComponentsSubText1: "Seleziona tipo disinstallazione:",
	UnComponentsSubText2_NoInstTypes: "Seleziona componenti da disinstallare:",
	UnComponentsSubText2: "Oppure, seleziona componenti opzionali da disinstallare :",
	DirText: "Questa procedura installerà $(^NameDA) in questa cartella.\\r\\nPer installare in una cartella diversa, seleziona 'Sfoglia' e scegli un'altra cartella.\\r\\n$_CLICK",
	DirSubText: "Cartella destinazione",
	DirBrowseText: "Seleziona la cartella dove installare $(^NameDA):",
	UnDirText: "Questa procedura disinstallerà $(^NameDA) da questa cartella.\\r\\nPer disinstallare da una cartella diversa, seleziona 'Sfoglia' e scegli un'altra cartella.\\r\\n$_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Seleziona la cartella dalla quale disinstallare $(^NameDA):",
	SpaceAvailable: "\"Spazio disponibile: \"",
	SpaceRequired: "\"Spazio richiesto: \"",
	UninstallingText: "$(^NameDA) verrà disinstallato da questa cartella.\\r\\n$_CLICK",
	UninstallingSubText: "Rimozione da:",
	FileError: "Errore nell'apertura del file per la scrittura: \\r\\n\\t\"$0\"\\r\\nSeleziona 'Termina' per interrompere l'installazione,\\r\\n'Riprova' per ritentare, oppure\\r\\n'Ignora' per saltare questo file.",
	FileError_NoIgnore: "Errore nell'apertura del file per la scrittura: \\r\\n\\t\"$0\"\\r\\nSeleziona 'Riprova' per ritentare, oppure\\r\\n'Termina' per interrompere l'installazione",
	CantWrite: "\"Impossibile scrivere: \"",
	CopyFailed: "Copia fallita",
	CopyTo: "\"Copia in \"",
	Registering: "\"Registrazione di: \"",
	Unregistering: "\"Deregistrazione di: \"",
	SymbolNotFound: "\"Impossibile trovare il simbolo: \"",
	CouldNotLoad: "\"Impossibile caricare: \"",
	CreateFolder: "\"Creazione cartella: \"",
	CreateShortcut: "\"Creazione collegamento: \"",
	CreatedUninstaller: "\"Creazione programma disinstallazione: \"",
	Delete: "\"Eliminazione file: \"",
	DeleteOnReboot: "\"Elimina al riavvio: \"",
	ErrorCreatingShortcut: "\"Errore nella creazione del collegamento: \"",
	ErrorCreating: "\"Errore nella creazione di: \"",
	ErrorDecompressing: "Errore nella decompressione dei dati! Probabile programma di installazione corrotto.",
	ErrorRegistering: "Errore nella registrazione della DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Esecuzione di: \"",
	Extract: "\"Estrazione di: \"",
	ErrorWriting: "\"Estrazione: errore nella scrittura nel file \"",
	InvalidOpcode: "Programma di installazione corrotto: opcode non valido",
	NoOLE: "\"Nessuna OLE per: \"",
	OutputFolder: "\"Cartella destinazione: \"",
	RemoveFolder: "\"Rimozione cartella: \"",
	RenameOnReboot: "\"Al riavvio rinomina: \"",
	Rename: "Rinomina ",
	Skipped: "\"Saltato: \"",
	CopyDetails: "Copia i dettagli negli Appunti",
	LogInstall: "Registro eventi processo installazione",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Italian$1 = {
	header: header$w,
	id: id$w,
	font: font$w,
	code_page: code_page$w,
	rtl: rtl$w,
	strings: strings$w
};

var header$x = "NLF v6";
var id$x = 1041;
var font$x = {
	name: "ＭＳ Ｐゴシック",
	size: 9
};
var code_page$x = 932;
var rtl$x = false;
var strings$x = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) セットアップ",
	UninstallCaption: "$(^Name) アンインストール",
	LicenseSubCaption: "：ライセンス契約書",
	ComponentsSubCaption: "：インストール オプション",
	DirSubCaption: "：インストール フォルダ",
	InstallingSubCaption: "：インストール",
	CompletedSubCaption: "：完了",
	UnComponentsSubCaption: ": アンインストール オプション",
	UnDirSubCaption: ": アンインストール フォルダ",
	ConfirmSubCaption: "：確認",
	UninstallingSubCaption: "：アンインストール",
	UnCompletedSubCaption: "：完了",
	BackBtn: "< 戻る(&B)",
	NextBtn: "次へ(&N) >",
	AgreeBtn: "同意する(&A)",
	AcceptBtn: "このライセンス契約書に同意します(&A)",
	DontAcceptBtn: "このライセンス契約書には同意できません(&D)",
	InstallBtn: "インストール",
	UninstallBtn: "ｱﾝｲﾝｽﾄｰﾙ(&U)",
	CancelBtn: "キャンセル",
	CloseBtn: "閉じる(&C)",
	BrowseBtn: "参照(&R)...",
	ShowDetailsBtn: "詳細を表示(&D)",
	ClickNext: "続けるには [次へ] をクリックして下さい。",
	ClickInstall: "インストールを始めるには [インストール] をクリックして下さい。",
	ClickUninstall: "アンインストールを始めるには [ｱﾝｲﾝｽﾄｰﾙ] をクリックして下さい。",
	Name: "アプリケーション",
	Completed: "完了",
	LicenseText: "$(^NameDA)をインストールする前に、ライセンス契約書を確認して下さい。契約書の全ての条件に同意するならば、[同意する] ボタンをクリックして下さい。",
	LicenseTextCB: "$(^NameDA)をインストールする前に、ライセンス契約書を確認して下さい。契約書の全ての条件に同意するならば、下のチェックボックスをクリックして下さい。 $_CLICK",
	LicenseTextRB: "$(^NameDA)をインストールする前に、ライセンス契約書を確認して下さい。契約書の全ての条件に同意するならば、下に表示されているオプションのうち、最初のものを選んで下さい。 $_CLICK",
	UnLicenseText: "$(^NameDA)をアンインストールする前に、ライセンス契約書を確認して下さい。契約書の全ての条件に同意するならば、[同意する] ボタンをクリックして下さい。",
	UnLicenseTextCB: "$(^NameDA)をアンインストールする前に、ライセンス契約書を確認して下さい。契約書の全ての条件に同意するならば、下のチェックボックスをクリックして下さい。 $_CLICK",
	UnLicenseTextRB: "$(^NameDA)をアンインストールする前に、ライセンス契約書を確認して下さい。契約書の全ての条件に同意するならば、下に表示されているオプションのうち、最初のものを選んで下さい。 $_CLICK",
	Custom: "カスタム",
	ComponentsText: "インストールしたいコンポーネントにチェックを付けて下さい。不要なものについては、チェックを外して下さい。 $_CLICK",
	ComponentsSubText1: "インストール タイプを選択：",
	ComponentsSubText2_NoInstTypes: "インストール コンポーネントを選択：",
	ComponentsSubText2: "または、インストール オプション コンポーネントを選択：",
	UnComponentsText: "アンインストールしたいコンポーネントにチェックを付けて下さい。そうでないものについては、チェックを外して下さい。 $_CLICK",
	UnComponentsSubText1: "アンインストール タイプを選択：",
	UnComponentsSubText2_NoInstTypes: "アンインストール コンポーネントを選択：",
	UnComponentsSubText2: "または、アンインストール オプション コンポーネントを選択：",
	DirText: "$(^NameDA)を以下のフォルダにインストールします。異なったフォルダにインストールするには、[参照] を押して、別のフォルダを選択してください。 $_CLICK",
	DirSubText: "インストール先 フォルダ",
	DirBrowseText: "$(^NameDA)をインストールするフォルダを選択してください：",
	UnDirText: "$(^NameDA)を以下のフォルダからアンインストールします。異なったフォルダからアンインストールするには、[参照] を押して、別のフォルダを選択してください。 $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "$(^NameDA)をアンインストールするフォルダを選択してください：",
	SpaceAvailable: "利用可能なディスクスペース： ",
	SpaceRequired: "必要なディスクスペース： ",
	UninstallingText: "$(^NameDA)は、以下のフォルダからアンインストールされます。 $_CLICK",
	UninstallingSubText: "アンインストール元：",
	FileError: "初期ファイルの作成エラー：\\r\\n\\t\"$0\"\\r\\nインストールを中止するには中止を,\\r\\n再びこのファイルの作成を試みるには再試行を, また\\r\\nこのファイルをスキップして続けるには無視を押してください",
	FileError_NoIgnore: "初期ファイルの作成エラー: \\r\\n\\t\"$0\"\\r\\n再びこのファイルの作成を試みるには再試行を, また\\r\\nインストールを中止するにはキャンセルを押して下さい",
	CantWrite: "作成できません：",
	CopyFailed: "コピーは失敗しました",
	CopyTo: "コピーします",
	Registering: "登録中:",
	Unregistering: "登録解除中:",
	SymbolNotFound: "シンボルを見つけることができません：",
	CouldNotLoad: "ロードすることができません：",
	CreateFolder: "フォルダの作成：",
	CreateShortcut: "ショートカットの作成：",
	CreatedUninstaller: "アンインストーラの作成：",
	Delete: "ファイルの削除：",
	DeleteOnReboot: "リブート時に削除：",
	ErrorCreatingShortcut: "ショートカットの作成エラー：",
	ErrorCreating: "作成エラー：",
	ErrorDecompressing: "データの抽出エラー\\r\\n\\r\\nインストーラが破損しています。",
	ErrorRegistering: "DLLの登録エラー",
	ExecShell: "拡張子の関連付け実行: ",
	Exec: "実行：",
	Extract: "抽出：",
	ErrorWriting: "抽出：ファイル作成エラー",
	InvalidOpcode: "インストールの不正：無効なopcode",
	NoOLE: "OLEがありません：",
	OutputFolder: "出力先フォルダ：",
	RemoveFolder: "フォルダの削除：",
	RenameOnReboot: "リブート時に名前の変更：",
	Rename: "名前の変更：",
	Skipped: "スキップ：",
	CopyDetails: "クリップボードへ詳細をコピー",
	LogInstall: "インストールプロセスをログヘ記録",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Japanese$1 = {
	header: header$x,
	id: id$x,
	font: font$x,
	code_page: code_page$x,
	rtl: rtl$x,
	strings: strings$x
};

var header$y = "NLF v6";
var id$y = 1042;
var font$y = {
	name: "굴림",
	size: 9
};
var code_page$y = 949;
var rtl$y = false;
var strings$y = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) 설치",
	UninstallCaption: "$(^Name) 제거",
	LicenseSubCaption: ": 사용권 계약 동의",
	ComponentsSubCaption: ": 설치 옵션",
	DirSubCaption: ": 폴더 지정",
	InstallingSubCaption: ": 파일 설치중",
	CompletedSubCaption: ": 설치 완료",
	UnComponentsSubCaption: ": 제거 옵션",
	UnDirSubCaption: ": 제거 폴더",
	ConfirmSubCaption: ": 확인 ",
	UninstallingSubCaption: ": 제거중",
	UnCompletedSubCaption: ": 제거 완료",
	BackBtn: "< 뒤로",
	NextBtn: "다음 >",
	AgreeBtn: "동의함",
	AcceptBtn: "위 사항에 동의합니다.",
	DontAcceptBtn: "동의하지 않습니다.",
	InstallBtn: "설치",
	UninstallBtn: "제거",
	CancelBtn: "취소",
	CloseBtn: "닫음",
	BrowseBtn: "찾아보기...",
	ShowDetailsBtn: "자세히 보기",
	ClickNext: "계속하시려면 '다음' 버튼을 눌러 주세요.",
	ClickInstall: "설치를 시작하시려면 '설치' 버튼을 눌러 주세요.",
	ClickUninstall: "'제거' 버튼을 누르면 제거가 시작됩니다.",
	Name: "이름",
	Completed: "완료",
	LicenseText: "$(^NameDA)(을)를 설치하기 전에 사용권 계약 내용을 살펴보시기 바랍니다. 내용에 동의하셨다면 '동의함'을 눌러 주세요.",
	LicenseTextCB: "$(^NameDA)(을)를 설치하기 전에 사용권 계약 내용을 살펴보시기 바랍니다. 내용에 동의하셨다면 아래 사항을 체크해 주세요. $_CLICK",
	LicenseTextRB: "$(^NameDA)(을)를 설치하기 전에 사용권 계약 내용을 살펴보시기 바랍니다. 내용에 동의하셨다면 아래 옵션을 선택해 주세요. $_CLICK",
	UnLicenseText: "$(^NameDA)(을)를 제거하기 전에 사용권 계약 내용을 살펴보시기 바랍니다. 내용에 동의하셨다면 '동의함'을 눌러 주세요.",
	UnLicenseTextCB: "$(^NameDA)(을)를 제거하기 전에 사용권 계약 내용을 살펴보시기 바랍니다. 내용에 동의하셨다면 아래 사항을 체크해 주세요. $_CLICK",
	UnLicenseTextRB: "$(^NameDA)(을)를 제거하기 전에 사용권 계약 내용을 살펴보시기 바랍니다. 내용에 동의하셨다면 아래 옵션을 선택해 주세요. $_CLICK",
	Custom: "사용자 정의",
	ComponentsText: "설치를 원하시는 구성 요소를 선택하여 주시기 바랍니다. $_CLICK",
	ComponentsSubText1: "설치 형태 선택:",
	ComponentsSubText2_NoInstTypes: "설치하려는 구성 요소 선택:",
	ComponentsSubText2: "구성요소 직접 선택:",
	UnComponentsText: "제거를 원하는 구성 요소를 체크해 주시기 바랍니다. $_CLICK",
	UnComponentsSubText1: "제거 형태 선택:",
	UnComponentsSubText2_NoInstTypes: "제거하려는 구성 요소 선택:",
	UnComponentsSubText2: "제거하려는 구성요소 직접 선택:",
	DirText: "$(^NameDA)(을)를 다음 폴더에 설치할 예정입니다. \\r\\n다른 폴더에 설치하고 싶으시면 '찾아보기' 버튼을 눌러서 다른 폴더를 선택해 주세요. $_CLICK",
	DirSubText: "설치 폴더",
	DirBrowseText: "$(^NameDA)(을)를 다음 폴더에 설치합니다:",
	UnDirText: "$(^NameDA)(을)를 다음 폴더에서 제거할 예정입니다. \\r\\n다른 폴더에서 제거하고 싶으시면 '찾아보기' 버튼을 눌러서 다른 폴더를 선택해 주세요. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "$(^NameDA)(을)를 다음 폴더에서 제거 합니다:",
	SpaceAvailable: "\"남은 디스크 공간: \"",
	SpaceRequired: "\"필요한 디스크 공간: \"",
	UninstallingText: "시스템에서 $(^NameDA)(을)를 제거 할 것입니다. $_CLICK",
	UninstallingSubText: "제거 대상:",
	FileError: "다음 파일을 열 수 없습니다.: \\r\\n\\t\"$0\"\\r\\n'중단'을 눌러 설치를 종료하거나,\\r'다시 시도'를 눌러 다시 시도해 보거나,\\r'무시'를 눌러 이 파일을 건너 뛰세요.",
	FileError_NoIgnore: "다음 파일을 열 수 없습니다.: \\r\\n\\t\"$0\"\\r\\n'다시 시도'를 눌러 다시 시도해 보거나,\\r'취소'를 눌러 설치를 종료하세요.",
	CantWrite: "\"기록할 수 없음: \"",
	CopyFailed: "복사 실패",
	CopyTo: "\"파일 복사 \"",
	Registering: "\"등록중: \"",
	Unregistering: "\"등록 해제중: \"",
	SymbolNotFound: "\"심볼을 찾을 수 없음: \"",
	CouldNotLoad: "\"불러올 수 없음: \"",
	CreateFolder: "\"폴더 생성: \"",
	CreateShortcut: "\"바로 가기 생성: \"",
	CreatedUninstaller: "\"언인스톨러 생성: \"",
	Delete: "\"파일 삭제: \"",
	DeleteOnReboot: "\"재부팅시 삭제: \"",
	ErrorCreatingShortcut: "\"바로 가기 생성 오류: \"",
	ErrorCreating: "\"생성 실패: \"",
	ErrorDecompressing: "압축 해제중 오류 발생! 설치 파일이 손상되었습니다.",
	ErrorRegistering: "DLL 등록 실패",
	ExecShell: "\"쉘 실행: \"",
	Exec: "\"실행: \"",
	Extract: "\"압축 해제: \"",
	ErrorWriting: "\"압축 해제: 파일을 기록하는 도중 오류 발생 \"",
	InvalidOpcode: "인스톨러 손상됨: 잘못된 실행코드",
	NoOLE: "\"OLE 정보 없음: \"",
	OutputFolder: "\"대상 폴더: \"",
	RemoveFolder: "\"폴더 삭제: \"",
	RenameOnReboot: "\"재부팅시 이름 변경: \"",
	Rename: "\"이름 변경: \"",
	Skipped: "\"건너뜀: \"",
	CopyDetails: "자세한 내용을 클립보드로 복사",
	LogInstall: "설치 로그 작성",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Korean$1 = {
	header: header$y,
	id: id$y,
	font: font$y,
	code_page: code_page$y,
	rtl: rtl$y,
	strings: strings$y
};

var header$z = "NLF v6";
var id$z = 9999;
var font$z = {
	name: null,
	size: null
};
var code_page$z = 1254;
var rtl$z = false;
var strings$z = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) Sazkirin",
	UninstallCaption: "$(^Name) Rakirin",
	LicenseSubCaption: ": Peymana Lîsansê",
	ComponentsSubCaption: ": Vebijêrkên Sazkirinê",
	DirSubCaption: ": Peldanka Sazkirinê",
	InstallingSubCaption: ": Tê Sazkirin",
	CompletedSubCaption: ": Qediya",
	UnComponentsSubCaption: ": Vebijêrkên Rakirinê",
	UnDirSubCaption: ": Peldanka Rakirinê",
	ConfirmSubCaption: ": Erêkirin",
	UninstallingSubCaption: ": Tê Rakirin",
	UnCompletedSubCaption: ": Qediya",
	BackBtn: "< &Vegere",
	NextBtn: "&Bidomîne >",
	AgreeBtn: "&Ez Dipejirînim",
	AcceptBtn: "Şertên Peymanê &Dipejirînim",
	DontAcceptBtn: "Şertên Peymanê Napejirînim",
	InstallBtn: "&Saz Bike",
	UninstallBtn: "&Rake",
	CancelBtn: "Betal",
	CloseBtn: "&Bigire",
	BrowseBtn: "&Çavlêgerîn...",
	ShowDetailsBtn: "Hûragahiyan &Nîşan Bide",
	ClickNext: "Ji bo berdewamê 'Bidomîne'yê bitikîne.",
	ClickInstall: "Ji bo destpêka sazkirinê 'Saz Bike'yê bitikîne.",
	ClickUninstall: "Ji bo destpêka rakirinê 'Rake' bitikîne.",
	Name: "nav",
	Completed: "Qediya",
	LicenseText: "Ji kerema xwe re berî tu bernameya $(^NameDA) saz bikî, çavekî li peymana lîsansê bigerîne. Heke tu hemû şertên peymanê dipejirînî, 'Ez Dipejirînim'ê bitikîne.",
	LicenseTextCB: "Ji kerema xwe re berî tu bernameya $(^NameDA) saz bikî, çavekî li peymana lîsansê bigerîne. Heke tu hemû şertan dipejirînî, zeviya erêkirinê ya jêrîn dagire. $_CLICK",
	LicenseTextRB: "Ji kerema xwe re berî tu bernameya $(^NameDA) saz bikî çavekî li peymana lîsansê bigerîne. Heke tu hemû şertên peymanê dipejirînî, zeviya vebijêrkê ya jêrîn dagire. $_CLICK",
	UnLicenseText: "Ji kerema xwe re berî tu bernameya $(^NameDA) rakî, çavekî li peymana lîsansê bigerîne. Heke tu hemû şertên peymanê dipejirînî, 'Ez Dipejirînim'ê bitikîn.",
	UnLicenseTextCB: "Ji kerema xwe re berî tu bernameya $(^NameDA) ji pergala xwe rakî, çavekî li peymana lîsansê bigerîne. Heke tu hemû şertên peymanê dipejirînî, zeviya jêrîn a erêkirinê dagire. $_CLICK",
	UnLicenseTextRB: "Ji kerema xwe re berî tu bernameya $(^NameDA) ji pergala xwe rakî, çavekî li peymana lîsansê bigerîne. Heke tu hemû şertên peymanê dipejirînî, zeviya vebijêrkê ya jêrîn dagire. $_CLICK",
	Custom: "Taybet",
	ComponentsText: "Beşên tu dixwazî saz bikî hilbijêre û niqirên 'check' beşên tu naxwazî werin sazkirin rake. $_CLICK",
	ComponentsSubText1: "Awayê sazkirinê hilbijêre:",
	ComponentsSubText2_NoInstTypes: "Beşên dê werin sazkirin hilbijêre:",
	ComponentsSubText2: "an jî, beşên beşên tu dixwazî werin sazkirin hilbijêre:",
	UnComponentsText: "Beşên tu dixwazî rakî hilbijêre, an jî niqira 'check'a ber beşên tu daxwazî were rakirin, rake. $_CLICK",
	UnComponentsSubText1: "Awayê rakirinê hilbijêre:",
	UnComponentsSubText2_NoInstTypes: "Beşên dê werin rakirin hilbijêre:",
	UnComponentsSubText2: "an jî beşên tu dixwazî werin rakirin hilbijêre:",
	DirText: "$(^NameDA) dê ji aliyê sazkirinê ve li peldanka jêrîn were sazkirin. Ji bo tu li peldankeke din saz bikî 'Çavlêgerîn'ê bitikîne û peldankeke din hilbijêre. $_CLICK",
	DirSubText: "Peldanka Armanckirî",
	DirBrowseText: "Peldanka tu dixwazî bernameya $(^NameDA) lê were sazkirin hilbijêre:",
	UnDirText: "$(^NameDA) dê ji aliyê sazkirinê ve ji peldanka jêrîn were rakirin. Ji bo tu ji peldankeke cuda rakî 'Çavlêgerîn'ê bitikîne û peldankeke din hilbijêre. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Peldanka tu dixwazî bernameya $(^NameDA) jê were rakirin hilbijêre:",
	SpaceAvailable: "\"Herêma vala ku dikare were bikaranîn: \"",
	SpaceRequired: "\"Herêma vala ya pêwist: \"",
	UninstallingText: "Bernameya $(^NameDA) dê ji peldanka jêrîn were rakirin. $_CLICK",
	UninstallingSubText: "tê rakirin:",
	FileError: "Dosya ji bo nivîsandinê venebû: \\r\\n\\t\"$0\"\\r\\nJi bo destjêberdana sazkirinê abort'ê bitikîne,\\r\\nji bo ceribandina ji nû ve  retry'ê , an jî\\r\\nji bo tu dosiyê tune bihesibînî û berdewam bikî ignore'yê bitikîne",
	FileError_NoIgnore: "Dosya ji bo nivîsandinê vebenebû: \\r\\n\\t\"$0\"\\r\\nJi bo nivîsandina ji nû ve retry'yê, an jî\\r\\nJi bo destjêberdana sazkirinê abort'ê hilbijêre",
	CantWrite: "\"Nehate Nivîsandin: \"",
	CopyFailed: "Çewtiya Jibergirtinê",
	CopyTo: "\"Ji Ber Bigire \"",
	Registering: "\"Tê Tomarkirin: \"",
	Unregistering: "\"Tomarî Tê Jêbirin: \"",
	SymbolNotFound: "\"Dawêr Nehate Dîtin: \"",
	CouldNotLoad: "\"Nehate Barkirin: \"",
	CreateFolder: "\"Peldankê Çêke: \"",
	CreateShortcut: "\"Kineriyê Çêke: \"",
	CreatedUninstaller: "\"Sêrbazê Rakirinê Hate Çêkirin: \"",
	Delete: "\"Dosyayê Jê Bibe: \"",
	DeleteOnReboot: "\"Dema ji nû ve dest pê kir dosiyê jê bibe: \"",
	ErrorCreatingShortcut: "\"Dema çêkirina kineriyê çewtî derket: \"",
	ErrorCreating: "\"Çewtiya çêkirinê: \"",
	ErrorDecompressing: "Di dema vekirina daneyan de çewtî derket! Sazkirina Çewt?",
	ErrorRegistering: "Çewtiya tomariya DLL",
	ExecShell: "\"Qalikê Xebatê: \"",
	Exec: "\"Bixebitîne: \"",
	Extract: "\"Veke: \"",
	ErrorWriting: "\"Veke: Dema li dosiyê hate nivîsîn çewtiyek derket \"",
	InvalidOpcode: "Sazkirina Xirabe: koda nerast pêkanînê",
	NoOLE: "\"OLE nehate dîtin: \"",
	OutputFolder: "\"Peldanka derketinê: \"",
	RemoveFolder: "\"Peldankê jê bibe: \"",
	RenameOnReboot: "\"Dema ji nû hate destpêkirin ji nû ve bi nav bike: \"",
	Rename: "\"Nav Biguhere: \"",
	Skipped: "\"Hate gavkirin: \"",
	CopyDetails: "Hûragahiyan li Pano'yê binivîse",
	LogInstall: "Pêkanîna sazkirinê li lênûska rewşê binivîse",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Kurdish$1 = {
	header: header$z,
	id: id$z,
	font: font$z,
	code_page: code_page$z,
	rtl: rtl$z,
	strings: strings$z
};

var header$A = "NLF v6";
var id$A = 1062;
var font$A = {
	name: null,
	size: null
};
var code_page$A = 1257;
var rtl$A = false;
var strings$A = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "'$(^Name)' Uzstādīšana",
	UninstallCaption: "'$(^Name)' Atinstalēšana",
	LicenseSubCaption: ": Licences līgums",
	ComponentsSubCaption: ": Uzstādīšanas opcijas",
	DirSubCaption: ": Uzstādīšanas mape",
	InstallingSubCaption: ": Notiek uzstādīšana",
	CompletedSubCaption: ": Uzstādīšana pabeigta.",
	UnComponentsSubCaption: ": Atinstalēšanas opcijas",
	UnDirSubCaption: ": Atinstalēšanas mape",
	ConfirmSubCaption: ": Apstiprināšana",
	UninstallingSubCaption: ": Notiek atinstalēšana",
	UnCompletedSubCaption: ": Atinstalēšana pabeigta",
	BackBtn: "< &Atpakaļ",
	NextBtn: "&Tālāk >",
	AgreeBtn: "Es &piekrītu",
	AcceptBtn: "Es &piekrītu licences līguma noteikumiem",
	DontAcceptBtn: "Es &nepiekrītu licences līguma noteikumiem",
	InstallBtn: "&Uzstādīt",
	UninstallBtn: "&Atinstalēt",
	CancelBtn: "Atcelt",
	CloseBtn: "Ai&zvērt",
	BrowseBtn: "Pā&rlūkot...",
	ShowDetailsBtn: "Parādīt &detaļas",
	ClickNext: "Spiediet 'Tālāk', lai turpinātu.",
	ClickInstall: "Spiediet 'Uzstādīt', lai sāktu uzstādīšanas procesu.",
	ClickUninstall: "Spiediet 'Atinstalēt', lai sāktu atinstalēšanas procesu.",
	Name: "Vārds",
	Completed: "Uzstādīšana pabeigta",
	LicenseText: "Lūdzu izlasiet licences līgumu pirms '$(^NameDA)' uzstādīšanas. Ja piekrītat licences līguma noteikumiem, tad spiediet 'Es piekrītu'.",
	LicenseTextCB: "Lūdzu izlasiet licences līgumu pirms '$(^NameDA)' uzstādīšanas. Ja piekrītat licences līguma noteikumiem, tad atzīmējiet izvēles rūtiņu. $_CLICK",
	LicenseTextRB: "Lūdzu izlasiet licences līgumu pirms '$(^NameDA)' uzstādīšanas. Ja piekrītat licences līguma noteikumiem, tad izvēlieties pirmo zemākesošo opciju. $_CLICK",
	UnLicenseText: "Lūdzu izlasiet licences līgumu pirms '$(^NameDA)' atinstalēšanas. Ja piekrītat licences līguma noteikumiem, tad spiediet 'Es piekrītu'.",
	UnLicenseTextCB: "Lūdzu izlasiet licences līgumu pirms '$(^NameDA)' atinstalēšanas. Ja piekrītat licences līguma noteikumiem, tad atzīmējiet izvēles rūtiņu. $_CLICK",
	UnLicenseTextRB: "Lūdzu izlasiet licences līgumu pirms '$(^NameDA)' atinstalēšanas. Ja piekrītat licences līguma noteikumiem, tad izvēlieties zemākesošo opciju. $_CLICK",
	Custom: "Pielāgots",
	ComponentsText: "Izvēlieties, kurus komponentus vēlaties uzstādīt un neiezīmējiet tos, kurus nevēlaties uzstādīt. $_CLICK",
	ComponentsSubText1: "Izvēlieties uzstādīšanas veidu:",
	ComponentsSubText2_NoInstTypes: "Izvēlieties uzstādāmos komponentus:",
	ComponentsSubText2: "Vai arī – izvēlieties tikai nepieciešamos komponentus, kurus vēlaties uzstādīt:",
	UnComponentsText: "Izvēlieties, kurus komponentus atinstalēt un neiezīmējiet tos, kurus nevēlaties atinstalēt. $_CLICK",
	UnComponentsSubText1: "Izvēlieties atinstalēšanas veidu:",
	UnComponentsSubText2_NoInstTypes: "Izvēlieties atinstalējamos komponentus:",
	UnComponentsSubText2: "Vai arī – izvēlieties tikai nepieciešamos komponentus, kurus vēlaties atinstalēt:",
	DirText: "'$(^NameDA)' tiks uzstādīta šajā mapē. Lai to uzstādītu citā mapē, nospiediet 'Pārlūkot' un izvēlieties citu mapi. $_CLICK",
	DirSubText: "Uzstādīšanas mape",
	DirBrowseText: "Izvēlieties mapi, kurā uzstādīt '$(^NameDA)':",
	UnDirText: "'$(^NameDA)' tiks atinstalēta no šīs mapes. Lai to atinstalētu no citas mapes, nospiediet 'Pārlūkot' un izvēlieties citu mapi. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Izvēlieties mapi, no kuras atinstalēt '$(^NameDA)':",
	SpaceAvailable: "\"Pieejamais diska apjoms: \"",
	SpaceRequired: "\"Nepieciešamais diska apjoms: \"",
	UninstallingText: "'$(^NameDA)' tiks atinstalēta no šīs mapes. $_CLICK",
	UninstallingSubText: "Atinstalēšana no:",
	FileError: "Kļūda atverot failu rakstīšanai: \\r\\n\\t\"$0\"\\r\\nNospiediet 'Atcelt', lai atceltu uzstādīšanas procesu,\\r\\n'Mēģināt vēlreiz', lai atkārtoti mēģinātu rakstīt failā vai\\r\\n'Ignorēt', lai izlaistu šī faila uzstādīšanu",
	FileError_NoIgnore: "Kļūda atverot failu rakstīšanai: \\r\\n\\t\"$0\"\\r\\nNospiediet 'Atcelt', lai pārtrauktu uzstādīšanas procesu",
	CantWrite: "\"Nevar ierakstīt: \"",
	CopyFailed: "Kopēšana neizdevās",
	CopyTo: "\"Kopē uz \"",
	Registering: "\"Reģistrē: \"",
	Unregistering: "\"Atreģistrē: \"",
	SymbolNotFound: "\"Simbols nav atrasts: \"",
	CouldNotLoad: "\"Nav iespējams ielādēt: \"",
	CreateFolder: "\"Izveido mapi: \"",
	CreateShortcut: "\"Izveido saīsni: \"",
	CreatedUninstaller: "\"Izveidots atinstalētājs: \"",
	Delete: "\"Dzēš failu: \"",
	DeleteOnReboot: "\"Dzēst pēc pārstartēšanas: \"",
	ErrorCreatingShortcut: "\"Kļūda veidojot saīsni: \"",
	ErrorCreating: "\"Kļūda veidojot: \"",
	ErrorDecompressing: "Kļūda atkompresējot datus! Bojāta instalācija?",
	ErrorRegistering: "Kļūda reģistrējot DLL failu",
	ExecShell: "\"Izpilda čaulā: \"",
	Exec: "\"Izpilda: \"",
	Extract: "\"Atspiež: \"",
	ErrorWriting: "\"Atspiešana: kļūda rakstot failā \"",
	InvalidOpcode: "Instalācija bojāta: nederīgs CRC kods",
	NoOLE: "\"Nav OLE priekš: \"",
	OutputFolder: "\"Izvades mape: \"",
	RemoveFolder: "\"Dzēš mapi: \"",
	RenameOnReboot: "\"Pārsaukt pēc pārstartēšanas: \"",
	Rename: "\"Pārsaukt: \"",
	Skipped: "\"Izlaists: \"",
	CopyDetails: "Iekopēt detaļas starpliktuvē",
	LogInstall: "Ierakstīt žurnāla failā uzstādīšanas procesu",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Latvian$1 = {
	header: header$A,
	id: id$A,
	font: font$A,
	code_page: code_page$A,
	rtl: rtl$A,
	strings: strings$A
};

var header$B = "NLF v6";
var id$B = 1063;
var font$B = {
	name: null,
	size: null
};
var code_page$B = 1257;
var rtl$B = false;
var strings$B = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) Įdiegimas",
	UninstallCaption: "$(^Name) Šalinti",
	LicenseSubCaption: ": Naudojimo sutartis",
	ComponentsSubCaption: ": Įdiegimo nustatymai",
	DirSubCaption: ": Įdiegimo katalogas",
	InstallingSubCaption: ": Įdiegiama",
	CompletedSubCaption: ": Baigta",
	UnComponentsSubCaption: ": Ištrinimo nustatymai",
	UnDirSubCaption: ": Ištrinimo katalogas",
	ConfirmSubCaption: ": Patvirtinimas",
	UninstallingSubCaption: ": Panaikinama",
	UnCompletedSubCaption: ": Baigta",
	BackBtn: "< &Atgal",
	NextBtn: "&Toliau >",
	AgreeBtn: "Aš &sutinku",
	AcceptBtn: "Aš &sutinku su naudojimo sutarties sąlygomis",
	DontAcceptBtn: "Aš &nesutinku su naudojimo sutarties sąlygomis",
	InstallBtn: "&Įdiegti",
	UninstallBtn: "&Panaikinti",
	CancelBtn: "Nutraukti",
	CloseBtn: "&Uždaryti",
	BrowseBtn: "P&asirinkti...",
	ShowDetailsBtn: "Parodyti &detales",
	ClickNext: "Paspauskite toliau",
	ClickInstall: "Paspauskite įdiegti",
	ClickUninstall: "Paspauskite ištrinti",
	Name: "Vardas",
	Completed: "Baigta",
	LicenseText: "Prašome perskaityti sutartį prieš įdiegdami $(^NameDA). Jei jūs sutinkate su nurodytomis sąlygomis, spauskite Sutinku.",
	LicenseTextCB: "Prašome perskaityti sutartį prieš įdiegdami $(^NameDA). Jei jūs sutinkate su nurodytomis sąlygomis, padėkite varnelę tam skirtame laukelyje. $_CLICK",
	LicenseTextRB: "Prašome perskaityti sutartį prieš įdiegdami $(^NameDA). Jei jūs sutinkate su nurodytomis sąlygomis, pasirinkite pirmą pasirinkimą esantį žemiau. $_CLICK",
	UnLicenseText: "Prašome perskaityti sutartį prieš ištrinant $(^NameDA). Jei jūs sutinkate su nurodytomis sąlygomis, spauskite Sutinku.",
	UnLicenseTextCB: "Prašome perskaityti sutartį prieš ištrinant $(^NameDA). Jei jūs sutinkate su nurodytomis sąlygomis, padėkite varnelę tam skirtame laukelyje. $_CLICK",
	UnLicenseTextRB: "Prašome perskaityti sutartį prieš ištrinant $(^NameDA). Jei jūs sutinkate su nurodytomis sąlygomis, pasirinkite pirmą pasirinkimą esantį žemiau.  $_CLICK",
	Custom: "Kitoks",
	ComponentsText: "Padėkite varneles laukeliuose komponentų kuriuos norite įdiegti ir nuimkite nuo kurių nenorite įdiegti. $_CLICK",
	ComponentsSubText1: "Pasirinkite įdiegimo būdą:",
	ComponentsSubText2_NoInstTypes: "Pasirinkite komponentus, kuriuos įdiegti:",
	ComponentsSubText2: "Arba, pasirinkite neprivalomus komponentus, kuriuos jūs norite įdiegti:",
	UnComponentsText: "Padėkite varneles laukeliuose komponentų kuriuos norite pašalinti ir nuimkite nuo kurių nenorite pašalinti. $_CLICK",
	UnComponentsSubText1: "Pasirinkite šalinimo būdą:",
	UnComponentsSubText2_NoInstTypes: "Pasirinkite komponentus, kuriuos šalinti:",
	UnComponentsSubText2: "Arba, pasirinkite neprivalomus komponentus, kuriuos jūs norite pašalinti:",
	DirText: "Įdiegimas dabar įdiegs $(^NameDA) šiame kataloge. Jeigu norite pakeisti šį katalogą, paspauskite Pasirinkti. $_CLICK",
	DirSubText: "Įdiegimo katalogas",
	DirBrowseText: "Pasirinkite katalogą, kur įdiegti $(^NameDA):",
	UnDirText: "Įdiegimas dabar pašalins $(^NameDA) iš šio katalogo. Jeigu norite pakeisti šį katalogą paspauskite Pasirinkti. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Pasirinkite katalogą iš kurio pašalinti $(^NameDA):",
	SpaceAvailable: "Yra vietos: ",
	SpaceRequired: "Reikia vietos: ",
	UninstallingText: "$(^NameDA) dabar bus pašalintas iš šio katalogo. $_CLICK",
	UninstallingSubText: "Trinama iš:",
	FileError: "Klaida atidarant failą įrašymui: \\r\\n\\t\"$0\"\\r\\nPaspauskite Nutraukti, jei norite nutraukti įdiegimą,\\r\\nPakartoti, jei norite pabandyti dar kartą įrašyti failą, ar\\r\\nIgnoruoti, jei norite praleisti šį failą",
	FileError_NoIgnore: "Klaida atidarant failą įrašymui: \\r\\n\\t\"$0\"\\r\\nPaspauskite Pakartoti, jei norite pabandyti dar kartą įrašyti failą, ar\\r\\nNutraukti, jei norite nutraukti įdiegimą.",
	CantWrite: "\"Negalima įrašyti: \"",
	CopyFailed: "Kopijavimas nepavyko",
	CopyTo: "Kopijuoti į ",
	Registering: "\"Užregistruojama: \"",
	Unregistering: "\"Išregistruojama: \"",
	SymbolNotFound: "Nerastas simbolis: ",
	CouldNotLoad: "Negaliu įkrauti: ",
	CreateFolder: "Sukurti katalogą: ",
	CreateShortcut: "Sukurti nuorodą: ",
	CreatedUninstaller: "Sukurti panaikinimo programą:",
	Delete: "Ištrinti failą: ",
	DeleteOnReboot: "\"Ištrinti perkraunant: \"",
	ErrorCreatingShortcut: "\"Klaida kuriant nuorodą: \"",
	ErrorCreating: "\"Klaida kuriant: \"",
	ErrorDecompressing: "Klaida išskleidžiant duomenis! Sugadintas įdiegimo failas?",
	ErrorRegistering: "Klaida užregistruojant DLL",
	ExecShell: "\"VykdytiShell: \"",
	Exec: "\"Vykdyti: \"",
	Extract: "\"Išskleisti: \"",
	ErrorWriting: "Išskleisti: klaida įrašant į failą",
	InvalidOpcode: "Įdiegimo failas sugadintas: neteisingas opkodas",
	NoOLE: "\"Nėra OLE dėl: \"",
	OutputFolder: "\"Paskirties katalogas: \"",
	RemoveFolder: "\"Panaikinti katalogą: \"",
	RenameOnReboot: "\"Pervardinti perkraunant: \"",
	Rename: "\"Pervardinti: \"",
	Skipped: "\"Praleista: \"",
	CopyDetails: "Kopijuoti detales į atmintį",
	LogInstall: "Įrašyti įdiegimo detales",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Lithuanian$1 = {
	header: header$B,
	id: id$B,
	font: font$B,
	code_page: code_page$B,
	rtl: rtl$B,
	strings: strings$B
};

var header$C = "NLF v6";
var id$C = 4103;
var font$C = {
	name: null,
	size: null
};
var code_page$C = 1252;
var rtl$C = false;
var strings$C = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) Installatioun",
	UninstallCaption: "$(^Name) Desinstallatioun",
	LicenseSubCaption: ": Lizenzofkommes",
	ComponentsSubCaption: ": Installatiouns-Optiounen",
	DirSubCaption: ": Zielverzeechnis",
	InstallingSubCaption: ": Installéieren",
	CompletedSubCaption: ": Färdeg",
	UnComponentsSubCaption: ": Desinstallatiuons-Optiounen",
	UnDirSubCaption: ": Quellverzeechnes",
	ConfirmSubCaption: ": Bestätegung",
	UninstallingSubCaption: ": Läschen",
	UnCompletedSubCaption: ": Färdeg",
	BackBtn: "< &Zréck",
	NextBtn: "&Weider >",
	AgreeBtn: "&Unhuelen",
	AcceptBtn: "Ech &huelen d'Lizenzofkommes un.",
	DontAcceptBtn: "Ech &lehnen d'Lizenzofkommes of.",
	InstallBtn: "&Installéieren",
	UninstallBtn: "&Desinstalléieren",
	CancelBtn: "Ofbriechen",
	CloseBtn: "&Zou maan",
	BrowseBtn: "&Duerchsichen...",
	ShowDetailsBtn: "&Details uweisen",
	ClickNext: "Klick op weider fir weiderzefueren",
	ClickInstall: "Klick op Installéieren, fir d'Installatioun unzefänken.",
	ClickUninstall: "Klick op Desinstalléieren, fir d'Desinstallatioun unzefänken.",
	Name: "Numm",
	Completed: "Färdeg",
	LicenseText: "W.e.g. d'Lizenzofkommes liesen, ierts de $(^NameDA) installéiers. Wanns de all Bedengungen vum Ofkommes akzeptéiers, klick op Unhuelen.",
	LicenseTextCB: "W.e.g. d'Lizenzofkommes liesen, ierts de $(^NameDA) installéiers. Wanns de all Bedengungen vum Ofkommes akzeptéiers, aktivéier d'Kontrollkeschtchen. $_CLICK",
	LicenseTextRB: "W.e.g. d'Lizenzofkommes liesen, ierts de $(^NameDA) installéiers. Wanns de all Bedengungen vum Ofkommes akzeptéiers, wiel d'entsprichend Optioun. $_CLICK",
	UnLicenseText: "W.e.g. d'Lizenzofkommes liesen, ierts de $(^NameDA) desinstalléiers. Wanns de all Bedengungen vum Ofkommes akzeptéiers, klick op Unhuelen.",
	UnLicenseTextCB: "W.e.g. d'Lizenzofkommes liesen, ierts de $(^NameDA) desinstalléiers. Wanns de all Bedengungen vum Ofkommes akzeptéiers, aktivéier d'Kontrollkeschtchen. $_CLICK",
	UnLicenseTextRB: "W.e.g. d'Lizenzoofkommes liesen, ierts de $(^NameDA) desinstalléiers. Wanns de all Bedengungen vum Oofkommes akzeptéiers, wiel d'entspriechend Optioun. $_CLICK",
	Custom: "Benutzerdefiniert",
	ComponentsText: "Wiel d'Komponenten aus, déis de wëlls installéieren an wiel déijéineg of, déis de net installéieren wëlls. $_CLICK",
	ComponentsSubText1: "Installatiouns-Typ bestëmmen:",
	ComponentsSubText2_NoInstTypes: "Wiel d'Komponenten aus, déis de installéieren wëlls:",
	ComponentsSubText2: "oder wiel zousätzlech Komponenten aus déis de installéieren wëlls:",
	UnComponentsText: "Wiel d'Komponenten aus déis de desinstalléieren wëlls an wiel déijéineg of, déis de net desinstalléieren wëlls. $_CLICK",
	UnComponentsSubText1: "Deinstallatiouns-Typ bestëmmen:",
	UnComponentsSubText2_NoInstTypes: "Wiel d'Komponenten aus, déis de desinstalléieren wëlls:",
	UnComponentsSubText2: "oder wiel zusätzlech Komponenten aus, déis de desinstalléieren wëlls:",
	DirText: "$(^NameDA) gëtt an den Dossier installéiert deen fierginn gouf. Wanns de et an een aneren Dossier installéieren wëlls, klick op Duechsichen an wiel een aneren Dossier aus. $_CLICK",
	DirSubText: "Zielverzeechnes",
	DirBrowseText: "Wiel en Dossier aus wuers de $(^NameDA) installéieren wëlls:",
	UnDirText: "$(^NameDA) gëtt an deem Dossier desinstalléiert, deen uginn gouf. Wann $(^NameDA) an engem aneren Dossier ass, klick op Duechsichen an wiel een aneren Dossier aus. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Wiel den Dossier aus wou $(^NameDA) dran installéiert ass:",
	SpaceAvailable: "\"Verfügbaren Späicher: \"",
	SpaceRequired: "\"Gebrauchten Späicher: \"",
	UninstallingText: "$(^NameDA) gëtt aus dem ausgewielten Dossier desinstalléiert. $_CLICK",
	UninstallingSubText: "Desinstalléieren aus:",
	FileError: "Fehler beim Iwwerschreiwen vun der Datei: \\r\\n\\t\"$0\"\\r\\nKlick op ofbriechen fir den Setup ze verloossen,\\r\\nop Widderhuelen fir den Setup nach eng Kéier duechzeféieren\\r\\n oder op Ignoréieren fir des Datei ze iwwersprengen an weiderzefueren.",
	FileError_NoIgnore: "Fehler beim Iwwerschreiwen vun der Datei: \\r\\n\\t\"$0\"\\r\\nKlick op Widderhuelen fir den Setup nach eng Kéier duechzeféieren,\\r\\noder op ofbriechen fir den Setup ze verloossen.",
	CantWrite: "\"Fehler beim Schreiwen: \"",
	CopyFailed: "Kopéieren fehlgeschloen",
	CopyTo: "\"Kopéiere an \"",
	Registering: "\"Registréieren: \"",
	Unregistering: "\"Deregistréieren: \"",
	SymbolNotFound: "\"Symbol ass net do: \"",
	CouldNotLoad: "\"Fehler beim Lueden vun: \"",
	CreateFolder: "\"Maan Dossier: \"",
	CreateShortcut: "\"Maan Oofkierzung: \"",
	CreatedUninstaller: "\"Man Desinstallatiouns-Programm: \"",
	Delete: "\"Läschen Datei: \"",
	DeleteOnReboot: "\"Läschen Datei no engem Neistart: \"",
	ErrorCreatingShortcut: "\"Fehler beim man vun enger Oofkierzung: \"",
	ErrorCreating: "\"Fehler beim maan: \"",
	ErrorDecompressing: "Fehler beim Dekompriméieren. Installations-Programm beschiedegt?",
	ErrorRegistering: "Fehler beim Registréieren vun der DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Starten: \"",
	Extract: "\"Dekompriméieren: \"",
	ErrorWriting: "\"Dekompriméierung: Fehler beim Schreiwen vun der Datei \"",
	InvalidOpcode: "Installations-Programm Beschiedegt: net zoulässegen Befehlscode",
	NoOLE: "\"Keen OLE fier: \"",
	OutputFolder: "\"Zieldossier: \"",
	RemoveFolder: "\"Läschen Dossier: \"",
	RenameOnReboot: "\"Gett no Neistart embenannt: \"",
	Rename: "\"Embenennen: \"",
	Skipped: "\"Iwwersprongen: \"",
	CopyDetails: "Detailler an d'Zwëschenooflag kopéieren",
	LogInstall: "Installatioun protokolléieren",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Luxembourgish$1 = {
	header: header$C,
	id: id$C,
	font: font$C,
	code_page: code_page$C,
	rtl: rtl$C,
	strings: strings$C
};

var header$D = "NLF v6";
var id$D = 1071;
var font$D = {
	name: null,
	size: null
};
var code_page$D = 1251;
var rtl$D = false;
var strings$D = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Инсталирање на $(^Name)",
	UninstallCaption: "Деинсталирање на $(^Name)",
	LicenseSubCaption: ": Лиценцен Договор",
	ComponentsSubCaption: ": Инсталациони Опции",
	DirSubCaption: ": Инсталационен Директориум",
	InstallingSubCaption: ": Инсталира",
	CompletedSubCaption: ": Завршено",
	UnComponentsSubCaption: ": Деинсталациони Опции",
	UnDirSubCaption: ": Деинсталационен Директориум",
	ConfirmSubCaption: ": Потврда",
	UninstallingSubCaption: ": Деинсталира",
	UnCompletedSubCaption: ": Завршено",
	BackBtn: "< &Назад",
	NextBtn: "Н&апред >",
	AgreeBtn: "&Да",
	AcceptBtn: "&Ги прифаќам условите од Лиценцниот Договор",
	DontAcceptBtn: "Н&е ги прифаќам условите од Лиценцниот Договор",
	InstallBtn: "&Инсталирај",
	UninstallBtn: "&Деинсталирај",
	CancelBtn: "Откажи",
	CloseBtn: "&Затвори",
	BrowseBtn: "&Пребарувај...",
	ShowDetailsBtn: "П&окажи Детали",
	ClickNext: "Притиснете 'Напред' за да продолжите.",
	ClickInstall: "Притиснете 'Инсталирај' за да се инсталира.",
	ClickUninstall: "Притиснете 'Деинсталирај' за да се деинсталира.",
	Name: "Име",
	Completed: "Завршено",
	LicenseText: "Ве молиме прочитајте го Лиценцниот Договор пред да се инсталира $(^NameDA). Ако ги прифаќате сите услови, притиснете 'Да'.",
	LicenseTextCB: "Ве молиме прочитајте го Лиценцниот Договор пред да се инсталира $(^NameDA). Ако ги прифаќате сите услови, притиснете го Check box-от подоле. $_CLICK",
	LicenseTextRB: "Ве молиме прочитајте го Лиценцниот Договор пред да се инсталира $(^NameDA). Ако ги прифаќате сите услови, одберете ја првата опција подоле. $_CLICK",
	UnLicenseText: "Ве молиме прочитајте го Лиценцниот Договор пред да се деинсталира $(^NameDA). Ако ги прифаќате сите услови, притиснете 'Да'.",
	UnLicenseTextCB: "Ве молиме прочитајте го Лиценцниот Договор пред да се деинсталира $(^NameDA). Ако ги прифаќате сите услови, притиснете го Check box-от подоле. $_CLICK",
	UnLicenseTextRB: "Ве молиме прочитајте го Лиценцниот Договор пред да се деинсталира $(^NameDA). Ако ги прифаќате сите услови, одберете ја првата опција подоле. $_CLICK",
	Custom: "Подесено",
	ComponentsText: "Чекирајте ги компонентите што сакате да се инсталираат или дечекирајте ги тие што не сакате да се инсталираат. $_CLICK ",
	ComponentsSubText1: "Одберете вид на инсталација:",
	ComponentsSubText2_NoInstTypes: "Одберете ги компонентите што ќе се инсталираат:",
	ComponentsSubText2: "или, одберете други компоненти што сакате да се инсталираат:",
	UnComponentsText: "Чекирајте ги компонентите што сакате да се деинсталираат или дечекирајте ги тие што не сакате да се деинсталираат. $_CLICK",
	UnComponentsSubText1: "Одберете го видот на деинсталацијата:",
	UnComponentsSubText2_NoInstTypes: "Одберете ги компонентите што ќе се деинсталираат:",
	UnComponentsSubText2: "или, одберете други компоненти што сакате да се деинсталираат:",
	DirText: "Инсталациониот програм ќе го инсталира $(^NameDA) во следниов директориум. За да инсталирате во друг, притиснете 'Пребарувај' и одберете друг директориум. $_CLICK",
	DirSubText: "Директориум каде што ќе се инсталира",
	DirBrowseText: "Одберете директориум за инсталирање на $(^NameDA):",
	UnDirText: "Инсталациониот програм ќе го деинсталира $(^NameDA) од следниов директориум. За да деинсталирате од друг, притиснете 'Пребарувај' и одберете друг директориум. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Одберете го директориумот за деинсталирање на $(^NameDA):",
	SpaceAvailable: "\"Слободен простор: \"",
	SpaceRequired: "\"Потребен простор: \"",
	UninstallingText: "$(^NameDA) ќе биде деинсталиран од следниов директориум. $_CLICK",
	UninstallingSubText: "Деинсталира од:",
	FileError: "Грешка при отварањето на датотеката за запишување: \\r\\n\\t\"$0\"\\r\\nПритиснете 'Откажи' за да ја откажете инсталацијата,\\r\\n'Пробај' за да проба да ја запише датотеката, или\\r\\n'Игнорирај' за да ја прерипа датотеката",
	FileError_NoIgnore: "Грешка при отварањето на датотеката за запишување: \\r\\n\\t\"$0\"\\r\\nПритиснете 'Пробај' за да проба да ја запише датотеката, или\\r\\n'Откажи' за да ја откаже инсталацијата",
	CantWrite: "\"Не може да запише: \"",
	CopyFailed: "Копирањето не успеа",
	CopyTo: "\"Копирај до \"",
	Registering: "\"Регистрира: \"",
	Unregistering: "\"Дерегистрира: \"",
	SymbolNotFound: "\"Не може да го најде симболот: \"",
	CouldNotLoad: "\"Не може да лоадира: \"",
	CreateFolder: "\"Создади директориум: \"",
	CreateShortcut: "\"Создади кратеница: \"",
	CreatedUninstaller: "\"Создаден деинсталатор: \"",
	Delete: "\"Избришана датотека: \"",
	DeleteOnReboot: "\"Избриши после рестартирање: \"",
	ErrorCreatingShortcut: "\"Грешка при создавањето на скратеницата: \"",
	ErrorCreating: "\"Грешка при создавањето: \"",
	ErrorDecompressing: "Грешка при отпакувањето на податоците! Расипан инсталационен програм?",
	ErrorRegistering: "Грешка при регистрирањето на DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Покрени: \"",
	Extract: "\"Отпакувано: \"",
	ErrorWriting: "\"Отпакувај: грешка при снимањето во датотеката \"",
	InvalidOpcode: "Расипан инсталационен програм: погрешен код",
	NoOLE: "\"Нема OLE за: \"",
	OutputFolder: "\"Инсталационен директориум: \"",
	RemoveFolder: "\"Избришан директориум: \"",
	RenameOnReboot: "\"Преименувај после рестартирање: \"",
	Rename: "\"Преименувај: \"",
	Skipped: "\"Прерипано: \"",
	CopyDetails: "Копирај ги Деталите во Clipboard-от",
	LogInstall: "Сними лог за инсталационите процеси",
	Byte: "б",
	Kilo: " К",
	Mega: " М",
	Giga: " Г"
};
var Macedonian$1 = {
	header: header$D,
	id: id$D,
	font: font$D,
	code_page: code_page$D,
	rtl: rtl$D,
	strings: strings$D
};

var header$E = "NLF v6";
var id$E = 1086;
var font$E = {
	name: null,
	size: null
};
var code_page$E = 1252;
var rtl$E = false;
var strings$E = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Setup $(^Name)",
	UninstallCaption: "Uninstall $(^Name)",
	LicenseSubCaption: ": Perlesenan",
	ComponentsSubCaption: ": Pilihan kemasukan",
	DirSubCaption: ": Folder kemasukan",
	InstallingSubCaption: ": Memasang",
	CompletedSubCaption: ": Selesai",
	UnComponentsSubCaption: ": Pilihan membuang",
	UnDirSubCaption: ": Folder Uninstal",
	ConfirmSubCaption: ": Kepastian",
	UninstallingSubCaption: ": Membuang",
	UnCompletedSubCaption: ": Tidak Selesai",
	BackBtn: "< &Ke Belakang",
	NextBtn: "&Ke Depan >",
	AgreeBtn: "Saya &setuju",
	AcceptBtn: "Saya s&etuju dengan Perlesenan",
	DontAcceptBtn: "Saya &tidak setuju dengan Perlesenan",
	InstallBtn: "&Masukkan",
	UninstallBtn: "&Buang",
	CancelBtn: "Batal",
	CloseBtn: "&Tutup",
	BrowseBtn: "S&elusur...",
	ShowDetailsBtn: "Buka &lagi",
	ClickNext: "Klik Ke Depan untuk teruskan.",
	ClickInstall: "Klik Masukkan untuk kemasukkan.",
	ClickUninstall: "Klik Uninstall untuk membuang.",
	Name: "Nama",
	Completed: "Selesai",
	LicenseText: "Sila baca lesen sebelum memasukkan $(^NameDA). Jika anda terima perlesenan, klik Saya setuju.",
	LicenseTextCB: "Sila baca lesen sebelum memasukkan $(^NameDA). Jika terima, beri tanda dicheckbox. $_CLICK",
	LicenseTextRB: "Sila baca lesen sebelum sebelum membuang $(^NameDA). Jika anda terima perlesenan, pilihlah salah satu item dibawah ini. $_CLICK",
	UnLicenseText: "Sila baca lesen sebelum sebelum membuang $(^NameDA). Jika anda terima perlesenan, klik Saya setuju.",
	UnLicenseTextCB: "Sila baca lesen sebelum memasukkan $(^NameDA). Jika terima, beri tanda dicheckbox. $_CLICK",
	UnLicenseTextRB: "Sila baca lesen sebelum sebelum membuang $(^NameDA).Jika anda terima perlesenan, pilihlah salah satu item dibawah ini. $_CLICK",
	Custom: "Custom",
	ComponentsText: "Beri tanda dicheckbox pada komponen yang ingin dimasukkan and hilangkan tanda pada komponen yang tidak perlu dimasukkan. $_CLICK",
	ComponentsSubText1: "Pilih kemasukan:",
	ComponentsSubText2_NoInstTypes: "Pilih komponen-komponen untuk dimasukkan:",
	ComponentsSubText2: "Atau, pilih komponen berikut untuk dimasukkan:",
	UnComponentsText: "Beri tanda dicheckbox pada komponen yang ingin dimasukkan and hilangkan tanda pada komponen yang tidak perlu dimasukkan. $_CLICK",
	UnComponentsSubText1: "Pilih tipe un-kemasukan:",
	UnComponentsSubText2_NoInstTypes: "Pilih komponen-komponen untuk di buang:",
	UnComponentsSubText2: "Atau, pilih komponen berikut untuk di buang:",
	DirText: "Setup akan memasukkan $(^NameDA) pada folder berikut. Untuk memilih folder lainnya, klik Selusur dan pilih folder pilihan anda. $_CLICK",
	DirSubText: "Folder tujuan",
	DirBrowseText: "Pilih folder untuk memasukkan $(^NameDA):",
	UnDirText: "Setup akan membuang $(^NameDA) dari folder berikut. Untuk memilih folder lainnya, klik Selusur dan pilih folder pilihan anda. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Pilih folder untuk dibuang $(^NameDA):",
	SpaceAvailable: "\"Ruang cakera keras yang ada: \"",
	SpaceRequired: "\"Ruang cakera keras yang diperlukan: \"",
	UninstallingText: "$(^NameDA) akan buang dari folder berikut. $_CLICK",
	UninstallingSubText: "Membuang:",
	FileError: "Tidak dapat menulis pada fail: \\r\\n\\t\"$0\"\\r\\nKlik abort untuk membatalkan kemasukan,\\r\\nretry untuk cuba lagi, atau\\r\\nignore untuk abaikan fail ini.",
	FileError_NoIgnore: "Tidak dapat menulis pada fail: \\r\\n\\t\"$0\"\\r\\nKlik retry untuk cuba lagi, atau\\r\\ncancel untuk batalkan kemasukan",
	CantWrite: "\"Gagal menulis pada: \"",
	CopyFailed: "Gagal menyalin",
	CopyTo: "\"Menyalin ke \"",
	Registering: "\"Mendaftarkan modul: \"",
	Unregistering: "\"Melepaskan modul: \"",
	SymbolNotFound: "\"Symbol tidak jumpa : \"",
	CouldNotLoad: "\"Tidak dapat membuka: \"",
	CreateFolder: "\"Membuat folder: \"",
	CreateShortcut: "\"Membuat pintasan: \"",
	CreatedUninstaller: "\"Membuat program unistall: \"",
	Delete: "\"Memadam fail: \"",
	DeleteOnReboot: "\"Akan dipadam ketika reboot: \"",
	ErrorCreatingShortcut: "\"Tidak dapat membuat pintasan: \"",
	ErrorCreating: "\"Ralat penciptaan: \"",
	ErrorDecompressing: "Ralat ketika membuka data! Program Installer rosak",
	ErrorRegistering: "Ralat mendaftarkan modul DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Menjalankan: \"",
	Extract: "\"Mengekstrak: \"",
	ErrorWriting: "\"Ekstrak: ralat ketika menulis ke fail \"",
	InvalidOpcode: "Installer rosak: opcode tidak lengkap",
	NoOLE: "\"OLE tidak ditemukan: \"",
	OutputFolder: "\"Folder tujuan: \"",
	RemoveFolder: "\"Menghapuskan folder: \"",
	RenameOnReboot: "\"Menamakan semula pada reboot: \"",
	Rename: "\"Menamakan semula: \"",
	Skipped: "\"Diabaikan: \"",
	CopyDetails: "Salin terperinci ke clipboard",
	LogInstall: "Catat proses kemasukan",
	Byte: "Bait",
	Kilo: " Kilo",
	Mega: " Mega",
	Giga: " Giga"
};
var Malay$1 = {
	header: header$E,
	id: id$E,
	font: font$E,
	code_page: code_page$E,
	rtl: rtl$E,
	strings: strings$E
};

var header$F = "NLF v6";
var id$F = 1104;
var font$F = {
	name: null,
	size: null
};
var code_page$F = 1251;
var rtl$F = false;
var strings$F = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) Суулгац",
	UninstallCaption: "$(^Name) Суулгасныг устгах",
	LicenseSubCaption: ": Лицензийн зөвшөөрөл",
	ComponentsSubCaption: ": Суулгах сонголт",
	DirSubCaption: ": Суулгах Хавтас",
	InstallingSubCaption: ":Суулгаж байна",
	CompletedSubCaption: ": Дууслаа",
	UnComponentsSubCaption: ": Суулгасныг устгахын Сонголт",
	UnDirSubCaption: ": Суулгасныг устгах Хавтас",
	ConfirmSubCaption: ": Батламж",
	UninstallingSubCaption: ": Суулгасныг устгаж байна",
	UnCompletedSubCaption: ": Дууслаа",
	BackBtn: "< &Буцах",
	NextBtn: "&Цааш>",
	AgreeBtn: "&Зөвшөөрлөө",
	AcceptBtn: "Би Лицензийн Зөвшөөрлийн зүйлүүдийг  &зөвшөөрч байна",
	DontAcceptBtn: "Би Лицензийн Зөвшөөрлийн зүйлүүдийг  &зөвшөөрөхгүй байна",
	InstallBtn: "&Суулга",
	UninstallBtn: "&Устга",
	CancelBtn: "Болих",
	CloseBtn: "&Xaax",
	BrowseBtn: "Х&өтлөх...",
	ShowDetailsBtn: "&Дэлгэрэнгүй",
	ClickNext: "Цааш дээр дарвал үргэлжилнэ.",
	ClickInstall: "Суулга дээр дарвал суулгац эхэлнэ.",
	ClickUninstall: "Устга дээр дарвал суулгацын устгалт эхэлнэ.",
	Name: "Нэр",
	Completed: "Дууслаа",
	LicenseText: "$(^NameDA)-г суулгахын өмнө Лицензийн Зөвшөөрлийг уншина уу. Хэрэв та зөвшилцлийн зүйлүүдийг зөвшөөрч байвал, Зөвшөөрлөө-г дарна уу.",
	LicenseTextCB: "$(^NameDA)-г суулгахын өмнө Лицензийн Зөвшөөрлийг уншина уу. Хэрэв та зөвшилцлийн зүйлүүдийг зөвшөөрч байвал, доорх нүдийг чагтална уу. $_CLICK",
	LicenseTextRB: "$(^NameDA)-г суулгахын өмнө Лицензийн Зөвшөөрлийг уншина уу. Хэрэв та зөвшилцлийн зүйлүүдийг зөвшөөрч байвал, доорх эхний сонголтыг сонгоно уу. $_CLICK",
	UnLicenseText: "$(^NameDA)-г суулгахын өмнө Лицензийн Зөвшөөрлийг уншина уу. Хэрэв та зөвшилцлийн зүйлүүдийг зөвшөөрч байвал, Зөвшөөрлөө-г дарна уу.",
	UnLicenseTextCB: "$(^NameDA)-г суулгахын өмнө Лицензийн Зөвшөөрлийг уншина уу. Хэрэв та зөвшилцлийн зүйлүүдийг зөвшөөрч байвал, доорх нүдийг чагтална уу. $_CLICK",
	UnLicenseTextRB: "$(^NameDA)-г суулгахын өмнө Лицензийн Зөвшөөрлийг уншина уу. Хэрэв та зөвшилцлийн зүйлүүдийг зөвшөөрч байвал, доорх эхний сонголтыг сонгоно уу. $_CLICK",
	Custom: "Бусад",
	ComponentsText: "Суулгахыг хүссэн нэгдлээ чагтлаад, суулгахыг хүсэхгүй буйгаа бүү чагтлаарай. $_CLICK",
	ComponentsSubText1: "Суулгах төрлийг сонгоно уу:",
	ComponentsSubText2_NoInstTypes: "Суулгах нэгдлийг сонгоно уу:",
	ComponentsSubText2: "Эсвэл, заавал суулгахгүй байх нэгдлүүдийг сонго:",
	UnComponentsText: "Устгахыг хүссэн нэгдлээ чагтлаад, устгахыг хүсэхгүй байгаагаа бүү чагтлаарай. $_CLICK",
	UnComponentsSubText1: "Устгах төрлийг сонгоно уу:",
	UnComponentsSubText2_NoInstTypes: "Устгах нэгдлүүдийг сонгоно ууl:",
	UnComponentsSubText2: "Эсвэл, заавал устгахгүй байх нэгдлүүдийг сонго:",
	DirText: "$(^NameDA) нь дараах хавтсанд сууна. Өөр газар суулгахыг хүсвэл Хөтлөх товч дээр даран өөр хавтас сонгоно уу. $_CLICK",
	DirSubText: "Зорилтот Хавтас",
	DirBrowseText: "$(^NameDA)-ыг суулгах хавтсыг сонгох:",
	UnDirText: "$(^NameDA)-г уг хавтаснаас устгана. Өөр газраас устгахыг хүсвэл Хөтлөх товч дээр даран өөр хавтас сонгоно уу. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "$(^NameDA)-г устгах хавтсыг сонгох:",
	SpaceAvailable: "\"Боломжит зай: \"",
	SpaceRequired: "\"Шаардагдах зай: \"",
	UninstallingText: "$(^NameDA) нь уг хавтаснаас устгагдлаа. $_CLICK",
	UninstallingSubText: "Устгагдах газар:",
	FileError: "Файл бичихээр нээхэд алдлаа: \\r\\n\\t\"$0\"\\r\\nТаслах дарвал суулгалт таслагдана,\\r\\nДахья дарвал файлыг бичихээр дахин оролдоно,\\r\\nэсвэл Үл тоох дарвал уг файлыг алгасна",
	FileError_NoIgnore: "Файл бичихээр нээхэд алдлаа: \\r\\n\\t\"$0\"\\r\\nДахия дарвал файлыг бичихээр дахин оролдоно, \\r\\nэсвэл болих дарвал суулгалт таслагдана",
	CantWrite: "\"Бичиж чадсангүй: \"",
	CopyFailed: "Хуулалт бүтсэнгүй",
	CopyTo: "\"Хуулах нь \"",
	Registering: "\"Бүртгэж байна: \"",
	Unregistering: "\"Бүртгэлийг арилгаж байна: \"",
	SymbolNotFound: "\"Тэмдэг хайгдсангүй: \"",
	CouldNotLoad: "\"Дуудагдсангүй: \"",
	CreateFolder: "\"Үүсгэх хавтас: \"",
	CreateShortcut: "\"Үүсгэх shortcut: \"",
	CreatedUninstaller: "\"Үүссэн uninstaller: \"",
	Delete: "\"Файл устгах: \"",
	DeleteOnReboot: "\"Д.ачаалахад устгах: \"",
	ErrorCreatingShortcut: "\"Shortcut үүсгэхэд алдлаа: \"",
	ErrorCreating: "\"Үүсгэх алдаа: \"",
	ErrorDecompressing: "Өгөгдөл задлахад алдлаа! Суулгац эвдэрчээ?",
	ErrorRegistering: "DLL бүртгүүлэхэд алдлаа",
	ExecShell: "\"Ажиллуулах команд(ExecShell): \"",
	Exec: "\"Ажиллуулах: \"",
	Extract: "\"Задлах: \"",
	ErrorWriting: "\"Задлалт:файл руу бичихэд алдаа \"",
	InvalidOpcode: "Суулгац эвдэрчээ: задлах код буруу",
	NoOLE: "\"OLE байхгүй: \"",
	OutputFolder: "\"Гаргах хавтас: \"",
	RemoveFolder: "\"Устгах хавтас: \"",
	RenameOnReboot: "\"Д.ачаалахад дахин нэрлэх: \"",
	Rename: "\"Дахин нэрлэх: \"",
	Skipped: "\"Алгассан: \"",
	CopyDetails: "Дэлгэрэнгүйг Clipboard руу хуулах",
	LogInstall: "Суулгах явцын баримт",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Mongolian$1 = {
	header: header$F,
	id: id$F,
	font: font$F,
	code_page: code_page$F,
	rtl: rtl$F,
	strings: strings$F
};

var header$G = "NLF v6";
var id$G = 1044;
var font$G = {
	name: null,
	size: null
};
var code_page$G = 1252;
var rtl$G = false;
var strings$G = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) installasjon",
	UninstallCaption: "$(^Name) avinstallasjon",
	LicenseSubCaption: ": Lisensavtale",
	ComponentsSubCaption: ": Installasjonsvalg",
	DirSubCaption: ": Installasjonsmappe",
	InstallingSubCaption: ": Installerer",
	CompletedSubCaption: ": Ferdig",
	UnComponentsSubCaption: ": Avinstallasjonsvalg",
	UnDirSubCaption: ": Avinstallasjonsmappe",
	ConfirmSubCaption: ": Bekreft",
	UninstallingSubCaption: ": Avinstallerer",
	UnCompletedSubCaption: ": Ferdig",
	BackBtn: "< &Tilbake",
	NextBtn: "&Neste >",
	AgreeBtn: "&Godta",
	AcceptBtn: "Jeg &godtar vilkårene i lisensavtalen",
	DontAcceptBtn: "Jeg godtar &ikke vilkårene i lisensavtalen",
	InstallBtn: "&Installer",
	UninstallBtn: "&Avinstaller",
	CancelBtn: "Avbryt",
	CloseBtn: "&Lukk",
	BrowseBtn: "Bla &gjennom...",
	ShowDetailsBtn: "Vis &detaljer",
	ClickNext: "Trykk Neste for å fortsette.",
	ClickInstall: "Trykk Installer for å starte installasjonen.",
	ClickUninstall: "Trykk Avinstaller for å starte avinstallasjonen.",
	Name: "Navn",
	Completed: "Ferdig",
	LicenseText: "Vennligst les gjennom lisensavtalen før du installerer $(^Name). Hvis du godtar vilkårene i avtalen, trykk på Godta.",
	LicenseTextCB: "Vennligst les gjennom lisensavtalen før du installerer $(^Name). Hvis du godtar vilkårene i avtalen, merk av under. $_CLICK",
	LicenseTextRB: "Vennligst les gjennom lisensavtalen før du installerer $(^Name). Hvis du godtar vilkårene i avtalen, velg det første alternativet. $_CLICK",
	UnLicenseText: "Vennligst les gjennom lisensavtalen før du avinstallerer $(^Name). Hvis du godtar vilkårene i avtalen, trykk på Godta.",
	UnLicenseTextCB: "Vennligst les gjennom lisensavtalen før du avinstallerer $(^Name). Hvis du godtar vilkårene i avtalen, merk av under. $_CLICK",
	UnLicenseTextRB: "Vennligst les gjennom lisensavtalen før du avinstallerer $(^Name). Hvis du godtar vilkårene i avtalen, velg det første alternativet. $_CLICK",
	Custom: "Egendefinert",
	ComponentsText: "Merk komponentene du vil installere og fjern merkingen for de du ikke vil installere. $_CLICK",
	ComponentsSubText1: "Velg hvilken måte du vil installere på:",
	ComponentsSubText2_NoInstTypes: "Merk komponenter du vil installere:",
	ComponentsSubText2: "Eller merk de valgfrie komponentene du ønsker å installere:",
	UnComponentsText: "Merk komponentene du vil avinstallere og fjern merkingen for de du vil beholde. $_CLICK",
	UnComponentsSubText1: "Velg hvilken måte du vil avinstallere på:",
	UnComponentsSubText2_NoInstTypes: "Merk komponenter du vil avinstallere:",
	UnComponentsSubText2: "Eller merk de valgfrie komponentene du ønsker å avinstallere:",
	DirText: "$(^Name) vil bli installert i følgende mappe. For å velge en annen mappe, trykk Bla gjennom. $_CLICK",
	DirSubText: "Målmappe",
	DirBrowseText: "Velg mappe du vil installere $(^Name) i:",
	UnDirText: "$(^Name) i følgende mappe vil bli avinstallert. For å velge en annen mappe, trykk Bla gjennom. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Velg mappe du vil avinstallere $(^Name) fra:",
	SpaceAvailable: "\"Ledig plass: \"",
	SpaceRequired: "\"Nødvendig plass: \"",
	UninstallingText: "Denne veiviseren vil avinstallere $(^Name) fra din datamaskin. $_CLICK",
	UninstallingSubText: "Avinstallerer fra:",
	FileError: "Feil under åpning av fil for skriving: \\r\\n\\t\\\"$0\\\"\\r\\nTrykk Avbryt for å avbryte installasjonen,\\r\\nPrøv igjen for å prøve igjen, eller\\r\\nIgnorer for å hoppe over denne filen",
	FileError_NoIgnore: "Feil under åpning av fil for skriving: \\r\\n\\t\\\"$0\\\"\\r\\nTrykk Prøv igjen for å prøve igjen, or\\r\\neller Avbryt for å avbryte installasjonen",
	CantWrite: "\"Kan ikke skrive: \"",
	CopyFailed: "Kopiering mislyktes",
	CopyTo: "\"Kopier til \"",
	Registering: "\"Registrerer: \"",
	Unregistering: "\"\"Avregistrerer: \"",
	SymbolNotFound: "\"Kunne ikke finne symbol: \"",
	CouldNotLoad: "\"Kunne ikke laste: \"",
	CreateFolder: "\"Lag mappe: \"",
	CreateShortcut: "\"Lag snarvei: \"",
	CreatedUninstaller: "\"Avinstallasjon laget: \"",
	Delete: "\"Slett fil: \"",
	DeleteOnReboot: "\"Slett ved omstart: \"",
	ErrorCreatingShortcut: "\"Feil under opprettelse av snarvei: \"",
	ErrorCreating: "\"Feil under opprettelse av: \"",
	ErrorDecompressing: "Feil under utpakking av data! Installasjonsprogrammet kan være skadet.",
	ErrorRegistering: "Feil under registrering av DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Kjøre: \"",
	Extract: "\"Pakk ut: \"",
	ErrorWriting: "\"Pakk ut: Feil under skriving til fil \"",
	InvalidOpcode: "Installasjonsprogrammet er skadet: ukjent kode",
	NoOLE: "\"Ingen OLE for: \"",
	OutputFolder: "\"Ut-mappe: \"",
	RemoveFolder: "\"Fjern mappe: \"",
	RenameOnReboot: "\"Gi nytt navn ved omstart: \"",
	Rename: "\"Gi nytt navn: \"",
	Skipped: "\"Hoppet over: \"",
	CopyDetails: "Kopier detaljer til utklippstavlen",
	LogInstall: "Loggfør installasjonsprosessen",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Norwegian$1 = {
	header: header$G,
	id: id$G,
	font: font$G,
	code_page: code_page$G,
	rtl: rtl$G,
	strings: strings$G
};

var header$H = "NLF v6";
var id$H = 2068;
var font$H = {
	name: null,
	size: null
};
var code_page$H = 1252;
var rtl$H = false;
var strings$H = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) installasjon",
	UninstallCaption: "$(^Name) avinstallasjon",
	LicenseSubCaption: ": Lisensavtale",
	ComponentsSubCaption: ": Installasjonsval",
	DirSubCaption: ": Installasjonsmappe",
	InstallingSubCaption: ": Installerer",
	CompletedSubCaption: ": Ferdig",
	UnComponentsSubCaption: ": Avinstallasjonsval",
	UnDirSubCaption: ": Avinstallasjonsmappe",
	ConfirmSubCaption: ": Stadfest",
	UninstallingSubCaption: ": Avinstallerer",
	UnCompletedSubCaption: ": Ferdig",
	BackBtn: "< &Attende",
	NextBtn: "&Neste >",
	AgreeBtn: "&Godta",
	AcceptBtn: "Eg &godtek vilkåra i lisensavtalen",
	DontAcceptBtn: "Eg godtek &ikkje vilkåra i lisensavtalen",
	InstallBtn: "&Installer",
	UninstallBtn: "&Avinstaller",
	CancelBtn: "Avbryt",
	CloseBtn: "&Lat att",
	BrowseBtn: "Bla &gjennom ...",
	ShowDetailsBtn: "Syn &detaljar",
	ClickNext: "Trykk Neste for å halda fram.",
	ClickInstall: "Trykk Installer for å starta installasjonen.",
	ClickUninstall: "Trykk Avinstaller for å starta avinstallasjonen.",
	Name: "Namn",
	Completed: "Ferdig",
	LicenseText: "Ver grei og les gjennom lisensavtalen før du installerer $(^NameDA). Dersom du godtek vilkåra i avtalen, trykk på Godta.",
	LicenseTextCB: "Ver grei og les gjennom lisensavtalen før du installerer $(^NameDA). Dersom du godtek vilkåra i avtalen, merk av under. $_CLICK",
	LicenseTextRB: "Ver grei og les gjennom lisensavtalen før du installerer $(^NameDA). Dersom du godtek vilkåra i avtalen, vel det fyrste alternativet. $_CLICK",
	UnLicenseText: "Ver grei og les gjennom lisensavtalen før du avinstallerer $(^NameDA). Dersom du godtek vilkåra i avtalen, trykk på Godta.",
	UnLicenseTextCB: "Ver grei og les gjennom lisensavtalen før du avinstallerer $(^NameDA). Dersom du godtek vilkåra i avtalen, merk av under. $_CLICK",
	UnLicenseTextRB: "Ver grei og les gjennom lisensavtalen før du avinstallerer $(^NameDA). Dersom du godtek vilkåra i avtalen, vel det fyrste alternativet. $_CLICK",
	Custom: "Eigendefinert",
	ComponentsText: "Merk komponentane du vil installera og fjern merkinga for dei du ikkje vil installera. $_CLICK",
	ComponentsSubText1: "Vel kva måte du vil installera på:",
	ComponentsSubText2_NoInstTypes: "Merk komponentar du vil installera:",
	ComponentsSubText2: "Eller merk dei valfrie komponentane du ynskjer å installera:",
	UnComponentsText: "Merk komponentane du vil avinstallera og fjern merkinga for dei du vil ta vare på. $_CLICK",
	UnComponentsSubText1: "Vel kva måte du vil avinstallera på:",
	UnComponentsSubText2_NoInstTypes: "Merk komponentar du vil avinstallera:",
	UnComponentsSubText2: "Eller merk dei valfrie komponentane du ynskjer å avinstallera:",
	DirText: "$(^NameDA) vil verta installert i fylgjande mappe. For å velja ei anna mappe, trykk Bla gjennom. $_CLICK",
	DirSubText: "Målmappe",
	DirBrowseText: "Vel mappe du vil installera $(^NameDA) i:",
	UnDirText: "$(^NameDA) i fylgjande mappe vil verta avinstallert. For å velja ei anna mappe, trykk Bla gjennom. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Vel mappe du vil avinstallera $(^NameDA) frå:",
	SpaceAvailable: "\"Ledig plass: \"",
	SpaceRequired: "\"Naudsynt plass: \"",
	UninstallingText: "Denne vegvisaren vil avinstallera $(^NameDA) frå din datamaskin. $_CLICK",
	UninstallingSubText: "Avinstallerer frå:",
	FileError: "Feil under opning av fil for skriving: \\r\\n\\t\\\"$0\\\"\\r\\nTrykk Avbryt for å avbryta installasjonen,\\r\\nPrøv igjen for å prøva igjen, eller\\r\\nIgnorer for å hoppa over denne fila",
	FileError_NoIgnore: "Feil under opning av fil for skriving: \\r\\n\\t\\\"$0\\\"\\r\\nTrykk Prøv igjen for å prøva igjen, or\\r\\neller Avbryt for å avbryta installasjonen",
	CantWrite: "\"Kan ikkje skriva: \"",
	CopyFailed: "Kopiering mislukka",
	CopyTo: "\"Kopier til \"",
	Registering: "\"Registrerer: \"",
	Unregistering: "\"\"Avregistrerer: \"",
	SymbolNotFound: "\"Kunne ikkje finna symbol: \"",
	CouldNotLoad: "\"Kunne ikkje lasta: \"",
	CreateFolder: "\"Lag mappe: \"",
	CreateShortcut: "\"Lag snarveg: \"",
	CreatedUninstaller: "\"Avinstallasjon laga: \"",
	Delete: "\"Slett fil: \"",
	DeleteOnReboot: "\"Slett ved omstart: \"",
	ErrorCreatingShortcut: "\"Feil under oppretting av snarveg: \"",
	ErrorCreating: "\"Feil under oppretting av: \"",
	ErrorDecompressing: "Feil under utpakking av data! Installasjonsprogrammet kan vera skadd.",
	ErrorRegistering: "Feil under registrering av DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Køyra: \"",
	Extract: "\"Pakk ut: \"",
	ErrorWriting: "\"Pakk ut: Feil under skriving til fil \"",
	InvalidOpcode: "Installasjonsprogrammet er skadd: ukjend kode",
	NoOLE: "\"Ingen OLE for: \"",
	OutputFolder: "\"Ut-mappe: \"",
	RemoveFolder: "\"Fjern mappe: \"",
	RenameOnReboot: "\"Gje nytt namn ved omstart: \"",
	Rename: "\"Gje nytt namn: \"",
	Skipped: "\"Hoppa over: \"",
	CopyDetails: "Kopier detaljar til utklyppstavla",
	LogInstall: "Loggfør installasjonsprosessen",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var NorwegianNynorsk$1 = {
	header: header$H,
	id: id$H,
	font: font$H,
	code_page: code_page$H,
	rtl: rtl$H,
	strings: strings$H
};

var header$I = "NLF v6";
var id$I = 1123;
var font$I = {
	name: null,
	size: null
};
var code_page$I = 1256;
var rtl$I = true;
var strings$I = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "امسته $(^Name)",
	UninstallCaption: "نالګاو $(^Name)",
	LicenseSubCaption: ": منښتليک تړون",
	ComponentsSubCaption: ": لګاو غوراوي",
	DirSubCaption: ": لګاو پوښۍ",
	InstallingSubCaption: ": لګيږي",
	CompletedSubCaption: ": بشپړ",
	UnComponentsSubCaption: ": نالګاو غوراوي",
	UnDirSubCaption: ": نالګاو پوښۍ",
	ConfirmSubCaption: ": باورول",
	UninstallingSubCaption: ": نالګيږي",
	UnCompletedSubCaption: ": بشپړ",
	BackBtn: "< &وروسته",
	NextBtn: "&مخکښې >",
	AgreeBtn: "زه &منم",
	AcceptBtn: "زه &د منښتليک توکي منم",
	DontAcceptBtn: "زه &د منښتليک توکي نه منم",
	InstallBtn: "&لګول",
	UninstallBtn: "&نالګول",
	CancelBtn: "بندول",
	CloseBtn: "&بندول",
	BrowseBtn: "...چ&ڼل",
	ShowDetailsBtn: "خبرتياوې &ښودل",
	ClickNext: ".مخکښې تلو لپاره مخکښې ټک وهئ",
	ClickInstall: ".لګاو پېلولو لپاره لګول ټک وهئ",
	ClickUninstall: ".نالګاو پېلولو لپاره نالګول ټک وهئ",
	Name: "نوم",
	Completed: "بشپړ",
	LicenseText: ".د لګولو نه مخکښې منښتليک وګورئ. که چېرې تاسې د منښتليک ټول توکي منئ، زه منم ټک وهئ $(^NameDA) د",
	LicenseTextCB: "$_CLICK .د لګولو نه مخکښې منښتليک وګورئ. که چېرې تاسې د منښتليک ټول توکي منئ، لاندې خوښبکس ټک وهئ $(^NameDA) د",
	LicenseTextRB: "$_CLICK .د لګولو نه مخکښې منښتليک وګورئ. که چېرې تاسې د منښتليک ټول توکي منئ، لاندې لمړی غوراوی خوښ کړئ $(^NameDA) د",
	UnLicenseText: ".د نالګاو نه مخکښې منښتليک وګورئ. که چېرې تاسې د منښتليک ټول توکي منئ، زه منم ټک وهئ $(^NameDA) د",
	UnLicenseTextCB: "$_CLICK .د نالګاو نه مخکښې منښتليک وګورئ. که چېرې تاسې د منښتليک ټول توکي منئ، لاندې خوښبکس ټک وهئ $(^NameDA) د",
	UnLicenseTextRB: "$_CLICK .د نالګاو نه مخکښې منښتليک وګورئ. که چېرې تاسې د منښتليک ټول توکي منئ، لاندې لمړی غوراوي خوښ کړئ $(^NameDA) د",
	Custom: "دوديز",
	ComponentsText: "$_CLICK .کوم رغتوکي چې لګول غواړئ خوښ يې کړئ او کوم رغتوکي چې نه غواړئ ويې لګوئ مه يې خوښوئ",
	ComponentsSubText1: ":د لګاو ډول وټاکئ",
	ComponentsSubText2_NoInstTypes: ":د لګولو لپاره رغتوکي خوښ کړئ",
	ComponentsSubText2: ":يا، هغه غوراويز رغتوکي چې لګول يې غواړئ وټاکئ",
	UnComponentsText: "$_CLICK .کوم رغتوکي چې نالګول غواړئ خوښ يې کړئ او کوم رغتوکي چې نه غواړئ ويې نالګوئ مه يې خوښوئ",
	UnComponentsSubText1: ":د نالګاو ډول وټاکئ",
	UnComponentsSubText2_NoInstTypes: ":د نالګولو لپاره رغتوکي وټاکئ",
	UnComponentsSubText2: ":يا، هغه غوراويز رغتوکي چې نالګول يې غواړئ وټاکئ",
	DirText: "$_CLICK .په لاندې پوښۍ کښې ولګوي. په بلې پوښۍ کښې يې د لګولو لپاره، چڼل ټک وهئ او بله پوښۍ وټاکئ $(^NameDA) امسته به",
	DirSubText: "موخه پوښۍ",
	DirBrowseText: ":پکښې لګول غواړئ وټاکئ $(^NameDA) هغه پوښۍ چې",
	UnDirText: "$_CLICK .د لاندې پوښۍ نه ونالګوي. د بلې پوښۍ نې د نالګولو لپاره، چڼل ټک وهئ او بله پوښۍ وټاکئ $(^NameDA) امسته به",
	UnDirSubText: "\"\"",
	UnDirBrowseText: ":ترې نالګول غواړئ وټاکئ $(^NameDA) هغه پوښۍ چې",
	SpaceAvailable: "\" :شته تشه\"",
	SpaceRequired: "\" :اړينه تشه\"",
	UninstallingText: "$_CLICK .به د لاندې پوښۍ نه ونالګول شي $(^NameDA)",
	UninstallingSubText: ":نالګيږي له",
	FileError: ":د ليکلو لپاره د دوتنې پرانيستلو کښې ستونزه \\r\\n\\r\\n$0\\r\\n\\r\\n،د لګاو د بندولو لپاره بندول ټک وهئ\\r\\nبياهڅه د بيا هڅې کولو لپاره، يا\\r\\n.پرېږده د دې دوتنې پرېښودلو لپاره",
	FileError_NoIgnore: ":د ليکلو لپاره د دوتنې پرانيستلو کښې ستونزه \\r\\n\\r\\n$0\\r\\n\\r\\nد بيا هڅې کولو لپاره بياهڅه ټک وهئ، يا\\r\\n.بندول د لګاو د بندولو لپاره",
	CantWrite: "\" :نشي ليکلی\"",
	CopyFailed: "لمېسلو پاتېينه",
	CopyTo: "\"ته لمېسل \"",
	Registering: "\" :نومکښليږي\"",
	Unregistering: "\" :نانومکښليږي\"",
	SymbolNotFound: "\" :پېلام نشي پېدا کولی\"",
	CouldNotLoad: "\" :نشي راوستلی\"",
	CreateFolder: "\" :پوښۍ جوړول\"",
	CreateShortcut: "\" :لنډلاری جوړول\"",
	CreatedUninstaller: "\" :جوړ شوی نالګاند\"",
	Delete: "\" :دوتنې ړنګول\"",
	DeleteOnReboot: "\" :پر بياپېلات ړنګول\"",
	ErrorCreatingShortcut: "\" :د لنډاري جوړولو ستونزه\"",
	ErrorCreating: "\" :جوړولو ستونزه\"",
	ErrorDecompressing: "اومتوک نازېرلو ستونزه! اندرغل لګاند؟",
	ErrorRegistering: "د ډلل نومکښلو ستونزه",
	ExecShell: "\" :اکزک شل\"",
	Exec: "\" :پېلول\"",
	Extract: "\" :وېستل\"",
	ErrorWriting: "\"وېستل: دوتنې کښې ليکلو ستونزه \"",
	InvalidOpcode: "اندرغل لګاند: ناسم اپکوډ",
	NoOLE: "\"No OLE for: \"",
	OutputFolder: "\" :وتنې پوښۍ\"",
	RemoveFolder: "\" :پوښې ړنګول\"",
	RenameOnReboot: "\" :پر بياپېلات بيانومول\"",
	Rename: "\" :بيانومول\"",
	Skipped: "\" :پرېښودلي\"",
	CopyDetails: "خبرتياوې ټوټې ډړې ته لمېسل",
	LogInstall: "د لګاو بهير خبرالول",
	Byte: "ب",
	Kilo: " ک",
	Mega: " م",
	Giga: " ګ"
};
var Pashto$1 = {
	header: header$I,
	id: id$I,
	font: font$I,
	code_page: code_page$I,
	rtl: rtl$I,
	strings: strings$I
};

var header$J = "NLF v6";
var id$J = 1045;
var font$J = {
	name: null,
	size: null
};
var code_page$J = 1250;
var rtl$J = false;
var strings$J = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Instalator $(^Name)",
	UninstallCaption: "Deinstalator $(^Name)",
	LicenseSubCaption: ": Umowa licencyjna",
	ComponentsSubCaption: ": Opcje instalacji",
	DirSubCaption: ": Folder instalacyjny",
	InstallingSubCaption: ": Instalowanie plików",
	CompletedSubCaption: ": Zakończono",
	UnComponentsSubCaption: ": Opcje deinstalacji",
	UnDirSubCaption: ": Folder deinstalacyjny",
	ConfirmSubCaption: ": Potwierdzenie",
	UninstallingSubCaption: ": Deinstalowanie plików",
	UnCompletedSubCaption: ": Zakończono",
	BackBtn: "< &Wstecz",
	NextBtn: "&Dalej >",
	AgreeBtn: "&Zgadzam się",
	AcceptBtn: "&Akceptuję warunki umowy licencyjnej",
	DontAcceptBtn: "&Nie akceptuję warunków umowy licencyjnej",
	InstallBtn: "&Zainstaluj",
	UninstallBtn: "&Odinstaluj",
	CancelBtn: "Anuluj",
	CloseBtn: "&Zamknij",
	BrowseBtn: "&Przeglądaj...",
	ShowDetailsBtn: "Pokaż &szczegóły",
	ClickNext: "Kliknij przycisk 'Dalej', aby kontynuować.",
	ClickInstall: "Kliknij przycisk 'Zainstaluj', aby rozpocząć instalację.",
	ClickUninstall: "Kliknij przycisk 'Odinstaluj', aby rozpocząć deinstalację.",
	Name: "Nazwa",
	Completed: "Zakończono",
	LicenseText: "Przed instalacją $(^NameDA) zapoznaj się z warunkami licencji. Jeśli akceptujesz wszystkie warunki umowy, kliknij przycisk 'Zgadzam się'.",
	LicenseTextCB: "Przed instalacją $(^NameDA) zapoznaj się z warunkami licencji. Jeśli akceptujesz wszystkie warunki umowy, kliknij poniższe pole wyboru. $_CLICK.",
	LicenseTextRB: "Przed instalacją $(^NameDA) zapoznaj się z warunkami licencji. Jeśli akceptujesz wszystkie warunki umowy, wybierz pierwszą z poniższych opcji. $_CLICK.",
	UnLicenseText: "Przed deinstalacją $(^NameDA) zapoznaj się z warunkami licencji. Jeśli akceptujesz wszystkie warunki umowy, kliknij przycisk 'Zgadzam się'.",
	UnLicenseTextCB: "Przed deinstalacją $(^NameDA) zapoznaj się z warunkami licencji. Jeśli akceptujesz wszystkie warunki umowy, kliknij poniższe pole wyboru. $_CLICK.",
	UnLicenseTextRB: "Przed deinstalacją $(^NameDA) zapoznaj się z warunkami licencji. Jeśli akceptujesz wszystkie warunki umowy, wybierz pierwszą z poniższych opcji. $_CLICK.",
	Custom: "Użytkownika",
	ComponentsText: "Zaznacz komponenty, które chcesz zainstalować i odznacz te, których nie chcesz instalować. $_CLICK",
	ComponentsSubText1: "Wybierz typ instalacji:",
	ComponentsSubText2_NoInstTypes: "Wybierz komponenty do zainstalowania:",
	ComponentsSubText2: "Albo wybierz opcjonalne komponenty, które chcesz zainstalować:",
	UnComponentsText: "Zaznacz komponenty, które chcesz odinstalować i odznacz te, które nie zostaną odinstalowane. $_CLICK",
	UnComponentsSubText1: "Wybierz typ deinstalacji:",
	UnComponentsSubText2_NoInstTypes: "Wybierz komponenty do odinstalowania:",
	UnComponentsSubText2: "Albo wybierz opcjonalne komponenty, które chcesz odinstalować:",
	DirText: "Instalator zainstaluje $(^NameDA) w podanym poniżej folderze docelowym (możesz także kliknąć przycisk 'Przeglądaj...' i wybrać inny folder). $_CLICK",
	DirSubText: "Folder docelowy",
	DirBrowseText: "Wybierz folder instalacyjny $(^NameDA):",
	UnDirText: "Deinstalator usunie $(^NameDA) z następującego folderu. Aby odinstalować z innego folderu, kliknij przycisk 'Przeglądaj...' i wybierz folder. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Wybierz folder, z którego zostanie odinstalowany $(^NameDA):",
	SpaceAvailable: "\"Dostępne miejsce: \"",
	SpaceRequired: "\"Wymagane miejsce: \"",
	UninstallingText: "Ten kreator odinstaluje $(^NameDA) z Twojego komputera. $_CLICK",
	UninstallingSubText: "Deinstalacja z: ",
	FileError: "Błąd otwarcia pliku do zapisu: \\r\\n\\r\\n$0\\r\\n\\r\\nWybierz 'Anuluj', aby przerwać instalację,\\r\\n'Ponów', aby ponowić zapis do pliku lub\\r\\n'Ignoruj', aby pominąć ten plik.",
	FileError_NoIgnore: "Błąd otwarcia pliku do zapisu: \\r\\n\\r\\n$0\\r\\n\\r\\nWybierz 'Ponów', aby ponowić zapis do pliku lub\\r\\n'Anuluj', aby przerwać instalację.",
	CantWrite: "\"Nie można zapisać: \"",
	CopyFailed: "Błąd kopiowania",
	CopyTo: "\"Kopiuj do \"",
	Registering: "\"Rejestrowanie: \"",
	Unregistering: "\"Wyrejestrowywanie: \"",
	SymbolNotFound: "\"Nie można odnaleźć symbolu: \"",
	CouldNotLoad: "\"Nie można wczytać: \"",
	CreateFolder: "\"Utwórz folder: \"",
	CreateShortcut: "\"Utwórz skrót: \"",
	CreatedUninstaller: "\"Utworzono deinstalator: \"",
	Delete: "\"Usuń plik: \"",
	DeleteOnReboot: "\"Usuń przy ponownym uruchomieniu: \"",
	ErrorCreatingShortcut: "\"Błąd tworzenia skrótu: \"",
	ErrorCreating: "\"Błąd tworzenia: \"",
	ErrorDecompressing: "Błąd wyodrębniania danych! Uszkodzony instalator?",
	ErrorRegistering: "Błąd rejestracji pliku DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Uruchom: \"",
	Extract: "\"Wyodrębnij: \"",
	ErrorWriting: "\"Wyodrębnij: błąd zapisu do pliku \"",
	InvalidOpcode: "Instalator uszkodzony: nieprawidłowy kod operacji",
	NoOLE: "\"Brak OLE dla: \"",
	OutputFolder: "\"Folder wyjściowy: \"",
	RemoveFolder: "\"Usuń folder: \"",
	RenameOnReboot: "\"Zmień nazwę przy ponownym uruchomieniu: \"",
	Rename: "\"Zmień nazwę: \"",
	Skipped: "\"Pominięte: \"",
	CopyDetails: "Kopiuj szczegóły do schowka",
	LogInstall: "Rejestruj przebieg instalacji",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Polish$1 = {
	header: header$J,
	id: id$J,
	font: font$J,
	code_page: code_page$J,
	rtl: rtl$J,
	strings: strings$J
};

var header$K = "NLF v6";
var id$K = 2070;
var font$K = {
	name: null,
	size: null
};
var code_page$K = 1252;
var rtl$K = false;
var strings$K = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Instalação de $(^Name)",
	UninstallCaption: "Desinstalação de $(^Name)",
	LicenseSubCaption: ": Contrato de Licença",
	ComponentsSubCaption: ": Opções de instalação",
	DirSubCaption: ": Diretório de instalação",
	InstallingSubCaption: ": Instalando Ficheiros",
	CompletedSubCaption: ": Concluído",
	UnComponentsSubCaption: ": Opções de Desinstalação",
	UnDirSubCaption: ": Pasta de Desinstalação",
	ConfirmSubCaption: ": Confirmação",
	UninstallingSubCaption: ": Desinstalando",
	UnCompletedSubCaption: ": Concluído",
	BackBtn: "< &Anterior",
	NextBtn: "&Seguinte >",
	AgreeBtn: "&Aceito",
	AcceptBtn: "Eu &aceito os termos do Contrato de Licença",
	DontAcceptBtn: "Eu &não aceito os termos do Contrato de Licença",
	InstallBtn: "&Instalar",
	UninstallBtn: "&Desinstalar",
	CancelBtn: "Cancelar",
	CloseBtn: "&Fechar",
	BrowseBtn: "&Procurar...",
	ShowDetailsBtn: "Ver &Detalhes",
	ClickNext: "Clique em 'Seguinte' para continuar.",
	ClickInstall: "Clique em 'Instalar' para iniciar a instalação.",
	ClickUninstall: "Clique em 'Desinstalar' para iniciar a desinstalação.",
	Name: "Nome",
	Completed: "Concluído",
	LicenseText: "Por favor reveja o acordo de licença antes de instalar $(^NameDA). Se concorda com todos os termos da licença, clique em 'Aceito'.",
	LicenseTextCB: "Por favor reveja o acordo de licença antes de instalar $(^NameDA). Se concorda com todos os termos da licença, clique na caixa de seleção abaixo. $_CLICK",
	LicenseTextRB: "Por favor reveja o acordo de licença antes de instalar $(^NameDA). Se concorda com todos os termos da licença, escolha a primeira opção abaixo. $_CLICK",
	UnLicenseText: "Por favor reveja o acordo de licença antes de desinstalar $(^NameDA). Se concorda com todos os termos da licença, clique em 'Aceito'.",
	UnLicenseTextCB: "Por favor reveja o acordo de licença antes de desinstalar $(^NameDA). Se concorda com todos os termos da licença, clique na caixa de seleção abaixo. $_CLICK",
	UnLicenseTextRB: "Por favor reveja o acordo de licença antes de desinstalar $(^NameDA). Se concorda com todos os termos da licença, escolha a primeira opção abaixo. $_CLICK",
	Custom: "Personalizado",
	ComponentsText: "Marque os componentes que deseja instalar e desmarque os componentes que não deseja instalar. $_CLICK",
	ComponentsSubText1: "Escolha o tipo de instalação:",
	ComponentsSubText2_NoInstTypes: "Escolha os componentes para instalar:",
	ComponentsSubText2: "Ou, escolha os componentes opcionais que deseja instalar:",
	UnComponentsText: "Marque os componentes que queira desinstalar e vice versa. $_CLICK",
	UnComponentsSubText1: "Escolha o tipo de desinstalação: ",
	UnComponentsSubText2_NoInstTypes: "Escolha os componentes para desinstalar:",
	UnComponentsSubText2: "Ou, escolha os componentes opcionais que queira desinstalar:",
	DirText: "O $(^NameDA) será instalado na seguinte pasta. Para instalar numa pasta diferente, clique em 'Procurar...' e escolha outra pasta. $_CLICK",
	DirSubText: "Pasta de Destino",
	DirBrowseText: "Escolha uma pasta para instalar o $(^NameDA):",
	UnDirText: "O $(^NameDA) será desinstalado da seguinte pasta. Para desinstalar de uma pasta diferente, clique em 'Procurar...' e escolha outra pasta. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Escolha uma pasta de onde será desinstalado o $(^NameDA):",
	SpaceAvailable: "\"Espaço disponível: \"",
	SpaceRequired: "\"Espaço necessário: \"",
	UninstallingText: "$(^NameDA) será desinstalado da seguinte pasta. $_CLICK",
	UninstallingSubText: "Desinstalando de:",
	FileError: "Erro ao abrir ficheiro para escrita: \\r\\n\\t\"$0\"\\r\\nClique em Abortar para abortar a instalação,\\r\\nRepetir para tentar novamente a escrita do ficheiro, ou\\r\\nIgnorar para ignorar este ficheiro.",
	FileError_NoIgnore: "Erro ao abrir ficheiro para escrita: \\r\\n\\t\"$0\"\\r\\nClique em Repetir para tentar novamente a gravação do ficheiro, ou\\r\\nCancelar para abortar a instalação.",
	CantWrite: "\"Não foi possível escrever: \"",
	CopyFailed: "Falha ao copiar",
	CopyTo: "\"Copiar para \"",
	Registering: "\"Registando: \"",
	Unregistering: "\"Desregistando: \"",
	SymbolNotFound: "\"Símbolo não encontrado: \"",
	CouldNotLoad: "\"Não foi possível carregar: \"",
	CreateFolder: "\"Criando diretório: \"",
	CreateShortcut: "\"Criando atalho: \"",
	CreatedUninstaller: "\"Criando desinstalador: \"",
	Delete: "\"Apagando ficheiro: \"",
	DeleteOnReboot: "\"Apagar ao reiniciar: \"",
	ErrorCreatingShortcut: "\"Erro ao criar atalho: \"",
	ErrorCreating: "\"Erro ao criar: \"",
	ErrorDecompressing: "Erro ao descomprimir dados! Instalador corrompido?",
	ErrorRegistering: "Erro ao registar DLL",
	ExecShell: "\"Executando pelo Shell: \"",
	Exec: "\"Executando: \"",
	Extract: "\"Extraindo: \"",
	ErrorWriting: "\"Extraindo: erro ao escrever ficheiro \"",
	InvalidOpcode: "Instalador corrompido: código de operação inválido",
	NoOLE: "\"Sem OLE para: \"",
	OutputFolder: "\"Pasta de destino: \"",
	RemoveFolder: "\"Removendo pasta: \"",
	RenameOnReboot: "\"Renomear ao reiniciar: \"",
	Rename: "\"Renomeando: \"",
	Skipped: "\"Ignorado: \"",
	CopyDetails: "Copiar detalhes para a Área de Transfêrencia",
	LogInstall: "Registar processo de instalação",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Portuguese$1 = {
	header: header$K,
	id: id$K,
	font: font$K,
	code_page: code_page$K,
	rtl: rtl$K,
	strings: strings$K
};

var header$L = "NLF v6";
var id$L = 1046;
var font$L = {
	name: null,
	size: null
};
var code_page$L = 1252;
var rtl$L = false;
var strings$L = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Instalação do $(^Name)",
	UninstallCaption: "Desinstalação do $(^Name)",
	LicenseSubCaption: ": Acordo de licença",
	ComponentsSubCaption: ": Opções da Instalação",
	DirSubCaption: ": Pasta da Instalação",
	InstallingSubCaption: ": Instalando",
	CompletedSubCaption: ": Completado",
	UnComponentsSubCaption: ": Opções da Desinstalação",
	UnDirSubCaption: ": Pasta da Desinstalação",
	ConfirmSubCaption: ": Confirmação",
	UninstallingSubCaption: ": Desinstalando",
	UnCompletedSubCaption: ": Completado",
	BackBtn: "< &Voltar",
	NextBtn: "&Próximo >",
	AgreeBtn: "Eu &Concordo",
	AcceptBtn: "Eu &aceito os termos do Acordo de Licença",
	DontAcceptBtn: "Eu &não aceito os termos do Acordo de Licença",
	InstallBtn: "&Instalar",
	UninstallBtn: "&Desinstalar",
	CancelBtn: "Cancelar",
	CloseBtn: "&Fechar",
	BrowseBtn: "P&rocurar...",
	ShowDetailsBtn: "Mostrar &detalhes",
	ClickNext: "Clique em Próximo para continuar.",
	ClickInstall: "Clique em Instalar para iniciar a instalação.",
	ClickUninstall: "Clique em Desinstalar para iniciar a desinstalação.",
	Name: "Nome",
	Completed: "Completado",
	LicenseText: "Por favor, leia com atenção o acordo de licença antes de instalar o $(^NameDA). Se você aceita todos os termos do acordo, clique em Eu Concordo.",
	LicenseTextCB: "Por favor, leia com atenção o acordo de licença antes de instalar o $(^NameDA). Se você aceita todos os termos do acordo, clique na caixa de seleção abaixo. $_CLICK",
	LicenseTextRB: "Por favor, leia com atenção o acordo de licença antes de instalar o $(^NameDA). Se você aceita todos os termos do acordo, selecione a primeira opção abaixo. $_CLICK",
	UnLicenseText: "Por favor, leia com atenção o acordo de licença antes de desinstalar o $(^NameDA). Se você aceita todos os termos do acordo, clique em Eu Concordo.",
	UnLicenseTextCB: "Por favor, leia com atenção o acordo de licença antes de desinstalar o $(^NameDA). Se você aceita todos os termos do acordo, clique na caixa de seleção abaixo. $_CLICK",
	UnLicenseTextRB: "Por favor, leia com atenção o acordo de licença antes de desinstalar o $(^NameDA). Se você aceita todos os termos do acordo, selecione a primeira opção abaixo. $_CLICK",
	Custom: "Personalizado",
	ComponentsText: "Marque os componentes que você quer instalar e desmarque os componentes que você não quer instalar. $_CLICK",
	ComponentsSubText1: "Selecione o tipo de instalação:",
	ComponentsSubText2_NoInstTypes: "Selecione os componentes a instalar:",
	ComponentsSubText2: "Ou, selecione os componentes opcionais que você deseja instalar:",
	UnComponentsText: "Marque os componentes que você quer desinstalar e desmarque os componentes que você não quer desinstalar. $_CLICK",
	UnComponentsSubText1: "Selecione o tipo de desinstalação:",
	UnComponentsSubText2_NoInstTypes: "Selecione os componentes a desinstalar:",
	UnComponentsSubText2: "Ou, selecione os componentes opcionais que você deseja desinstalar:",
	DirText: "O $(^NameDA) será instalado na pasta a seguir. Para instalar em uma pasta diferente, clique em Procurar e selecione outra pasta. $_CLICK",
	DirSubText: "Pasta de Destino",
	DirBrowseText: "Selecione a pasta para instalar o $(^NameDA):",
	UnDirText: "O $(^NameDA) será desinstalado da pasta a seguir. Para desinstalar de uma pasta diferente, clique em Procurar e selecione outra pasta. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Selecione a pasta de onde desinstalar o $(^NameDA):",
	SpaceAvailable: "\"Espaço disponível: \"",
	SpaceRequired: "\"Espaço necessário: \"",
	UninstallingText: "O $(^NameDA) será desinstalado da pasta a seguir. $_CLICK",
	UninstallingSubText: "Desinstalando de:",
	FileError: "Erro ao abrir o arquivo para gravação: \\r\\n\\r\\n$0\\r\\n\\r\\nClique em Abortar para parar a instalação,\\r\\nRepetir para tentar de novo, ou\\r\\nIgnorar para pular este arquivo.",
	FileError_NoIgnore: "Erro ao abrir o arquivo para gravação: \\r\\n\\r\\n$0\\r\\n\\r\\nClique em Repetir para tentar de novo, ou\\r\\nCancelar para parar a instalação.",
	CantWrite: "\"Não foi possível gravar: \"",
	CopyFailed: "Falha ao copiar",
	CopyTo: "\"Copiar para \"",
	Registering: "\"Registrando: \"",
	Unregistering: "\"Desfazendo o registro: \"",
	SymbolNotFound: "\"Não foi possível localizar o símbolo: \"",
	CouldNotLoad: "\"Não foi possível carregar: \"",
	CreateFolder: "\"Criar pasta: \"",
	CreateShortcut: "\"Criar atalho: \"",
	CreatedUninstaller: "\"Desinstalador criado: \"",
	Delete: "\"Excluir o arquivo: \"",
	DeleteOnReboot: "\"Excluir ao reiniciar: \"",
	ErrorCreatingShortcut: "\"Erro ao criar atalho: \"",
	ErrorCreating: "\"Erro ao criar: \"",
	ErrorDecompressing: "Erro ao descomprimir os dados! Instalador corrompido?",
	ErrorRegistering: "Erro ao registar a DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Executar: \"",
	Extract: "\"Extrair: \"",
	ErrorWriting: "\"Extrair: erro ao gravar o arquivo \"",
	InvalidOpcode: "Instalador corrompido: opcode inválido",
	NoOLE: "\"Sem OLE para: \"",
	OutputFolder: "\"Pasta de saída: \"",
	RemoveFolder: "\"Excluir a pasta: \"",
	RenameOnReboot: "\"Renomear ao reiniciar: \"",
	Rename: "\"Renomear: \"",
	Skipped: "\"Ignorado: \"",
	CopyDetails: "Copiar os Detalhes para a Área de Transferência",
	LogInstall: "Registrar o processo de instalação",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var PortugueseBR$1 = {
	header: header$L,
	id: id$L,
	font: font$L,
	code_page: code_page$L,
	rtl: rtl$L,
	strings: strings$L
};

var header$M = "NLF v6";
var id$M = 1048;
var font$M = {
	name: null,
	size: null
};
var code_page$M = 1250;
var rtl$M = false;
var strings$M = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Instalare $(^Name)",
	UninstallCaption: "Dezinstalare $(^Name)",
	LicenseSubCaption: ": Contract de licenţă",
	ComponentsSubCaption: ": Opţiuni instalare",
	DirSubCaption: ": Directorul destinaţie",
	InstallingSubCaption: ": În curs de instalare",
	CompletedSubCaption: ": Instalare terminată",
	UnComponentsSubCaption: ": Opţiuni dezinstalare",
	UnDirSubCaption: ": Directorul de dezinstalare",
	ConfirmSubCaption: ": Confirmă",
	UninstallingSubCaption: ": În curs de dezinstalare",
	UnCompletedSubCaption: ": Termină",
	BackBtn: "< Îna&poi",
	NextBtn: "Îna&inte >",
	AgreeBtn: "&De acord",
	AcceptBtn: "&Accept termenii contractului de licenţă",
	DontAcceptBtn: "Nu accept termenii contractului de licenţă",
	InstallBtn: "&Instalează",
	UninstallBtn: "&Dezinstalează",
	CancelBtn: "&Renunţă",
	CloseBtn: "În&chide",
	BrowseBtn: "&Alege...",
	ShowDetailsBtn: "Arată &detalii",
	ClickNext: "Apăsaţi Înainte pentru a continua.",
	ClickInstall: "Apăsaţi Instalează pentru a începe instalarea.",
	ClickUninstall: "Apăsaţi Dezinstalează pentru a începe dezinstalarea.",
	Name: "Nume",
	Completed: "Terminat",
	LicenseText: "Citiţi cu atenţie contractul de licenţă înainte de a instala $(^NameDA). Dacă acceptaţi termenii contractului de licenţă, apăsaţi butonul De acord.",
	LicenseTextCB: "Citiţi cu atenţie contractul de licenţă înainte de a instala $(^NameDA). Dacă acceptaţi termenii contractului de licenţă, bifaţi căsuţa de mai jos. $_CLICK",
	LicenseTextRB: "Citiţi cu atenţie contractul de licenţă înainte de a instala $(^NameDA). Dacă acceptaţi termenii contractului de licenţă, selectaţi prima opţiune de mai jos. $_CLICK",
	UnLicenseText: "Citiţi cu atenţie contractul de licenţă înainte de a dezinstala $(^NameDA). Dacă acceptaţi termenii contractului de licenţă, apăsaţi butonul De acord.",
	UnLicenseTextCB: "Citiţi cu atenţie contractul de licenţă înainte de a dezinstala $(^NameDA). Dacă acceptaţi termenii contractului de licenţă, bifaţi căsuţa de mai jos. $_CLICK",
	UnLicenseTextRB: "Citiţi cu atenţie contractul de licenţă înainte de a dezinstala $(^NameDA). Dacă acceptaţi termenii contractului de licenţă, selectaţi prima opţiune de mai jos. $_CLICK",
	Custom: "Personalizată",
	ComponentsText: "Alegeţi componentele pe care doriţi să le instalaţi. $_CLICK",
	ComponentsSubText1: "Alegeţi tipul instalării:",
	ComponentsSubText2_NoInstTypes: "Alegeţi componentele ce urmează a fi instalate:",
	ComponentsSubText2: "Sau, alegeţi componentele opţionale pe care doriţi să le instalaţi:",
	UnComponentsText: "Alegeţi componentele pe care doriţi să le dezinstalaţi. $_CLICK",
	UnComponentsSubText1: "Alegeţi tipul de dezinstalare:",
	UnComponentsSubText2_NoInstTypes: "Alegeţi componentele ce urmează a fi dezinstalate:",
	UnComponentsSubText2: "Sau, alegeţi componentele opţionale pe care doriţi să le dezinstalaţi:",
	DirText: "$(^NameDA) se va instala în următorul director. Pentru a alege altă destinaţie, apăsaţi Alege şi alegeţi alt director. $_CLICK",
	DirSubText: "Director destinaţie",
	DirBrowseText: "Alegeţi directorul în care doriţi să instalaţi $(^NameDA):",
	UnDirText: "$(^NameDA) se va dezinstala din următorul director. Pentru a dezinstala din alt director, apăsaţi Alege şi alegeţi alt director. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Alegeţi directorul de dezinstalare al $(^NameDA):",
	SpaceAvailable: "\"Spaţiu disponibil: \"",
	SpaceRequired: "\"Spaţiu necesar: \"",
	UninstallingText: "Această aplicaţie va dezinstala $(^NameDA) din computerul Dv. $_CLICK",
	UninstallingSubText: "Dezinstalare din:",
	FileError: "Eroare la scrierea fişierului: \\r\\n\\t\"$0\"\\r\\nApăsaţi Abort pentru oprirea instalării,\\r\\nRetry pentru a mai încerca o dată scrierea fişierului, \\r\\nIgnore pentru a trece peste acest fişier.",
	FileError_NoIgnore: "Eroare la scrierea fişierului: \\r\\n\\t\"$0\"\\r\\nApăsaţi Retry pentru a mai încerca o dată, sau\\r\\nAbort pentru oprirea instalării.",
	CantWrite: "\"Nu am putut scrie: \"",
	CopyFailed: "Copierea a eşuat",
	CopyTo: "\"Copiere în \"",
	Registering: "\"Se înregistrează: \"",
	Unregistering: "\"Se dezînregistrează din registru: \"",
	SymbolNotFound: "\"Simbolul nu a fost găsit: \"",
	CouldNotLoad: "\"Nu am putut încărca: \"",
	CreateFolder: "\"Creare director: \"",
	CreateShortcut: "\"Creare comandă rapidă: \"",
	CreatedUninstaller: "\"S-a creat aplicaţia de dezinstalare: \"",
	Delete: "\"Ştergere fişier: \"",
	DeleteOnReboot: "\"Ştergere la repornire: \"",
	ErrorCreatingShortcut: "\"Eroare la crearea comenzii rapide: \"",
	ErrorCreating: "\"Eroare la creare: \"",
	ErrorDecompressing: "Eroare la dezarhivarea datelor! Aplicatia de instalare este defectă?",
	ErrorRegistering: "Eroare la Înregistrarea DLL-ului",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Executare: \"",
	Extract: "\"Extragere: \"",
	ErrorWriting: "\"Extragere: eroare la scriere în fişier \"",
	InvalidOpcode: "Aplicaţie de instalare defectă: opcode incorect",
	NoOLE: "\"Nu există OLE pentru: \"",
	OutputFolder: "\"Directorul destinaţie: \"",
	RemoveFolder: "\"Ştergere destinaţie: \"",
	RenameOnReboot: "\"Redenumire la repornirea computerului: \"",
	Rename: "\"Redenumire: \"",
	Skipped: "\"Sărite: \"",
	CopyDetails: "Copiere detalii în clipboard",
	LogInstall: "Jurnal proces instalare",
	Byte: "O",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Romanian$1 = {
	header: header$M,
	id: id$M,
	font: font$M,
	code_page: code_page$M,
	rtl: rtl$M,
	strings: strings$M
};

var header$N = "NLF v6";
var id$N = 1049;
var font$N = {
	name: null,
	size: null
};
var code_page$N = 1251;
var rtl$N = false;
var strings$N = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Установка $(^Name)",
	UninstallCaption: "Удаление $(^Name)",
	LicenseSubCaption: ": Лицензионное соглашение",
	ComponentsSubCaption: ": Параметры установки",
	DirSubCaption: ": Папка установки",
	InstallingSubCaption: ": Копирование файлов",
	CompletedSubCaption: ": Операция завершена",
	UnComponentsSubCaption: ": Параметры удаления",
	UnDirSubCaption: ": Папка удаления",
	ConfirmSubCaption: ": Подтверждение",
	UninstallingSubCaption: ": Удаление файлов",
	UnCompletedSubCaption: ": Операция завершена",
	BackBtn: "< &Назад",
	NextBtn: "&Далее >",
	AgreeBtn: "Принима&ю",
	AcceptBtn: "Я &принимаю условия соглашения",
	DontAcceptBtn: "Я &не принимаю условия соглашения",
	InstallBtn: "&Установить",
	UninstallBtn: "Уд&алить",
	CancelBtn: "Отмена",
	CloseBtn: "&Закрыть",
	BrowseBtn: "О&бзор ...",
	ShowDetailsBtn: "&Детали...",
	ClickNext: "Нажмите кнопку \"Далее\" для продолжения.",
	ClickInstall: "Нажмите кнопку \"Установить\", чтобы установить программу.",
	ClickUninstall: "Нажмите кнопку \"Удалить\", чтобы удалить программу.",
	Name: "Имя",
	Completed: "Готово",
	LicenseText: "Перед установкой $(^NameDA) ознакомьтесь с лицензионным соглашением. Если вы принимаете условия соглашения, нажмите кнопку \"Принимаю\".",
	LicenseTextCB: "Перед установкой $(^NameDA) ознакомьтесь с лицензионным соглашением. Если вы принимаете условия соглашения, установите флажок ниже. $_CLICK",
	LicenseTextRB: "Перед установкой $(^NameDA) ознакомьтесь с лицензионным соглашением. Если вы принимаете условия соглашения, выберите первый вариант из предложенных ниже. $_CLICK",
	UnLicenseText: "Перед установкой $(^NameDA) ознакомьтесь с лицензионным соглашением. Если вы принимаете условия соглашения, нажмите кнопку \"Принимаю\".",
	UnLicenseTextCB: "Перед установкой $(^NameDA) ознакомьтесь с лицензионным соглашением. Если вы принимаете условия соглашения, установите флажок ниже. $_CLICK",
	UnLicenseTextRB: "Перед установкой $(^NameDA) ознакомьтесь с лицензионным соглашением. Если вы принимаете условия соглашения, выберите первый вариант из предложенных ниже. $_CLICK",
	Custom: "По выбору",
	ComponentsText: "Выберите компоненты программы, которые вы хотите установить. $_CLICK",
	ComponentsSubText1: "Выберите тип установки:",
	ComponentsSubText2_NoInstTypes: "Выберите компоненты программы для установки:",
	ComponentsSubText2: "или выберите дополнительные компоненты для установки:",
	UnComponentsText: "Выберите компоненты, которые вы хотите удалить. $_CLICK",
	UnComponentsSubText1: "Выберите тип удаления:",
	UnComponentsSubText2_NoInstTypes: "Выберите компоненты для удаления:",
	UnComponentsSubText2: "или выберите дополнительные компоненты для удаления:",
	DirText: "Программа установит $(^NameDA) в указанную папку. Чтобы установить приложение в другую папку, нажмите кнопку \"Обзор\" и укажите ее. $_CLICK",
	DirSubText: "Папка установки",
	DirBrowseText: "Укажите папку для установки $(^NameDA):",
	UnDirText: "Программа удалит $(^NameDA) из указанной папки. Чтобы выполнить удаление из другой папки, нажмите кнопку \"Обзор\" и укажите ее. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Укажите папку, из которой нужно удалить $(^NameDA):",
	SpaceAvailable: "\"Доступно на диске: \"",
	SpaceRequired: "\"Требуется на диске: \"",
	UninstallingText: "Программа $(^NameDA) будет удалена из вашего ПК. $_CLICK",
	UninstallingSubText: "Удаление из:",
	FileError: "Невозможно открыть файл для записи: \\r\\n\\t\"$0\"\\r\\n\"Прервать\": остановить установку;\\r\\n\"Повтор\": повторить попытку;\\r\\n\"Пропуск\": пропустить это действие.",
	FileError_NoIgnore: "Невозможно открыть файл для записи: \\r\\n\\t\"$0\"\\r\\n\"Повтор\": повторить попытку;\\r\\n\"Отмена\": прервать процесс установки.",
	CantWrite: "\"Невозможно записать: \"",
	CopyFailed: "Ошибка при копировании",
	CopyTo: "\"Копирование в \"",
	Registering: "\"Регистрация: \"",
	Unregistering: "\"Де-регистрация: \"",
	SymbolNotFound: "\"Невозможно найти символ: \"",
	CouldNotLoad: "\"Невозможно загрузить: \"",
	CreateFolder: "\"Создание папки: \"",
	CreateShortcut: "\"Создание ярлыка: \"",
	CreatedUninstaller: "\"Создание программы удаления: \"",
	Delete: "\"Удаление файла: \"",
	DeleteOnReboot: "\"Удаление при перезагрузке ПК: \"",
	ErrorCreatingShortcut: "\"Ошибка создания ярлыка: \"",
	ErrorCreating: "\"Ошибка создания: \"",
	ErrorDecompressing: "Ошибка распаковки данных! Возможно, повреждён дистрибутив.",
	ErrorRegistering: "Невозможно зарегистрировать библиотеку (DLL)",
	ExecShell: "\"Выполнение команды оболочки: \"",
	Exec: "\"Выполнение: \"",
	Extract: "\"Извлечение: \"",
	ErrorWriting: "\"Извлечение: ошибка записи файла \"",
	InvalidOpcode: "Дистрибутив поврежден: недопустимый код",
	NoOLE: "\"Нет OLE для: \"",
	OutputFolder: "\"Папка установки: \"",
	RemoveFolder: "\"Удаление папки: \"",
	RenameOnReboot: "\"Переименование при перезагрузке ПК: \"",
	Rename: "\"Переименование: \"",
	Skipped: "\"Пропуск: \"",
	CopyDetails: "Копировать сведения в буфер обмена",
	LogInstall: "Вести отчет установки",
	Byte: "байт",
	Kilo: " К",
	Mega: " М",
	Giga: " Г"
};
var Russian$1 = {
	header: header$N,
	id: id$N,
	font: font$N,
	code_page: code_page$N,
	rtl: rtl$N,
	strings: strings$N
};

var header$O = "NLF v6";
var id$O = 1169;
var font$O = {
	name: null,
	size: null
};
var code_page$O = 1252;
var rtl$O = false;
var strings$O = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "A’ stàladh $(^Name)",
	UninstallCaption: "A’ dì-stàladh $(^Name)",
	LicenseSubCaption: ": Aonta ceadachais",
	ComponentsSubCaption: ": Roghainnean an stàlaidh",
	DirSubCaption: ": Pasgan an stàlaidh",
	InstallingSubCaption: ": ’Ga stàladh",
	CompletedSubCaption: ": Deiseil",
	UnComponentsSubCaption: ": Roghainnean an dì-stàlaidh",
	UnDirSubCaption: ": Pasgan an dì-stàlaidh",
	ConfirmSubCaption: ": Dearbhadh",
	UninstallingSubCaption: ": ’Ga dhì-stàladh",
	UnCompletedSubCaption: ": Deiseil",
	BackBtn: "< Air ai&s",
	NextBtn: "Air adha&rt >",
	AgreeBtn: "&Gabhaidh mi ris",
	AcceptBtn: "&Gabhaidh mi teirmichean an aonta cheadachais",
	DontAcceptBtn: "&Diùltaidh mi teirmichean an aonta ceadachais",
	InstallBtn: "&Stàlaich",
	UninstallBtn: "&Dì-stàlaich",
	CancelBtn: "Sguir dheth",
	CloseBtn: "&Dùin",
	BrowseBtn: "&Rùraich…",
	ShowDetailsBtn: "&Mion-fhiosrachadh",
	ClickNext: "Briog air “Air adhart” gus leantainn air adhart.",
	ClickInstall: "Briog air “Stàlaich” gus tòiseachadh air an stàladh.",
	ClickUninstall: "Briog air “Dì-stàlaich” gus tòiseachadh air an dì-stàladh.",
	Name: "Ainm",
	Completed: "Coileanta",
	LicenseText: "Feuch an doir thu sùil air an aonta cheadachais mus stàlaich thu $(^NameDA). Ma ghabhas tu ris a h-uile teirm san aonta, briog air “Gabhaidh mi ris”.",
	LicenseTextCB: "Feuch an doir thu sùil air an aonta cheadachais mus stàlaich thu $(^NameDA). Ma ghabhas tu ris a h-uile teirm san aonta, cuir cromag sa bhogsa gu h-ìosal. $_CLICK",
	LicenseTextRB: "Feuch an doir thu sùil air an aonta cheadachais mus stàlaich thu $(^NameDA). Ma ghabhas tu ris a h-uile teirm san aonta, tagh a’ chiad roghainn gu h-ìosal. $_CLICK",
	UnLicenseText: "Feuch an doir thu sùil air an aonta cheadachais mus dì-stàlaich thu $(^NameDA). Ma ghabhas tu ris a h-uile teirm san aonta, Briog air “Gabhaidh mi ris”.",
	UnLicenseTextCB: "Feuch an doir thu sùil air an aonta cheadachais mus dì-stàlaich thu $(^NameDA). Ma ghabhas tu ris a h-uile teirm san aonta, cuir cromag sa bhogsa gu h-ìosal. $_CLICK",
	UnLicenseTextRB: "Feuch an doir thu sùil air an aonta cheadachais mus dì-stàlaich thu $(^NameDA). Ma ghabhas tu ris a h-uile teirm san aonta, tagh a’ chiad roghainn gu h-ìosal. $_CLICK",
	Custom: "Gnàthaichte",
	ComponentsText: "Thoir cromag ann am bogsaichean nan co-phàirtean a tha thu airson stàladh is thoir air falbh i o bhogsaichean nan co-phàirtean nach eil thu ag iarraidh. $_CLICK",
	ComponentsSubText1: "Tagh an seòrsa dhen stàladh:",
	ComponentsSubText2_NoInstTypes: "Tagh na co-phàirtean a tha thu airson stàladh:",
	ComponentsSubText2: "No tagh na co-phàirtean roghainneil a tha thu airson stàladh:",
	UnComponentsText: "Thoir cromag ann am bogsaichean nan co-phàirtean a tha thu airson dì-stàladh is thoir air falbh i o bhogsaichean nan co-phàirtean a tha thu airson cumail. $_CLICK",
	UnComponentsSubText1: "Tagh an seòrsa dhen dì-stàladh:",
	UnComponentsSubText2_NoInstTypes: "Tagh na co-phàirtean a tha thu airson dì-stàladh:",
	UnComponentsSubText2: "No tagh na co-phàirtean roghainneil a tha thu airson dì-stàladh:",
	DirText: "Thèid $(^NameDA) a stàladh sa phasgan seo. Gus stàladh ann am pasgan eile, briog air “Rùraich” is tagh pasgan eile. $_CLICK",
	DirSubText: "Pasgan-uidhe",
	DirBrowseText: "Tagh am pasgan san dèid $(^NameDA) a stàladh:",
	UnDirText: "Thèid $(^NameDA) a dhì-stàladh on phasgan seo. Gus dì-stàladh o phasgan eile, briog air “Rùraich” is tagh pasgan eile. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Tagh am pasgan on a tha thu airson $(^NameDA) a dhì-stàladh:",
	SpaceAvailable: "\"Àite ri fhaighinn: \"",
	SpaceRequired: "\"Àite air a bheil feum: \"",
	UninstallingText: "Thèid $(^NameDA) a dhì-stàladh on phasgan seo. $_CLICK",
	UninstallingSubText: "’Ga dhì-stàladh o:",
	FileError: "Thachair mearachd a’ fosgladh an fhaidhle a chum sgrìobhaidh: \\r\\n\\r\\n$0\\r\\n\\r\\nBriog air “Sguir dheth” gus sgur dhen stàladh, air\\r\\n“Feuch ris a-rithist” gus feuchainn ris a-rithist no air\\r\\n“Leig seachad” gus leum a ghearradh thairis air an fhaidhle seo.",
	FileError_NoIgnore: "Thachair mearachd a’ fosgladh an fhaidhle seo a chum sgrìobhaidh: \\r\\n\\r\\n$0\\r\\n\\r\\nBriog air “Feuch ris a-rithist” gus feuchainn ris a-rithist no air\\r\\n“Sguir dheth” gus sgur dhen stàladh.",
	CantWrite: "\"Cha ghabh sgrìobhadh ann: \"",
	CopyFailed: "Cha deach leinn lethbhreac dheth a dhèanamh",
	CopyTo: "\"Cuir lethbhreac gu \"",
	Registering: "\"A’ clàradh: \"",
	Unregistering: "\"A’ neo-chlàradh: \"",
	SymbolNotFound: "\"Cha deach an samhla a lorg: \"",
	CouldNotLoad: "\"Cha b’ urrainn dhuinn a luchdadh: \"",
	CreateFolder: "\"Cruthaich pasgan: \"",
	CreateShortcut: "\"Cruthaich ath-ghoirid: \"",
	CreatedUninstaller: "\"Dì-stàlaichear air a chruthachadh: \"",
	Delete: "\"Sguab às dhan fhaidhle: \"",
	DeleteOnReboot: "\"Sguab às leis an ath-thòiseachadh: \"",
	ErrorCreatingShortcut: "\"Mearachd le cruthachadh na h-ath-ghoirid: \"",
	ErrorCreating: "\"Mearachd le cruthachadh: \"",
	ErrorDecompressing: "Thachair mearachd a’ dì-dhùmhlachadh an dàta! ’S dòcha gu bheil an t-inneal-stàlaidh coirbte.",
	ErrorRegistering: "Mearachd le clàradh DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Cuir àithne an gnìomh: \"",
	Extract: "\"Dì-dhùmhlaich: \"",
	ErrorWriting: "\"Dì-dhùmhlachadh: mearachd a’ sgrìobhadh gu faidhle \"",
	InvalidOpcode: "Stàlaichear coirbte: opcode mì-dhligheach",
	NoOLE: "\"Chan eil OLE ann airson: \"",
	OutputFolder: "\"Pasgan às-chuir: \"",
	RemoveFolder: "\"Thoir pasgan air falbh: \"",
	RenameOnReboot: "\"Cuir ainm ùr air leis an ath-thòiseachadh: \"",
	Rename: "\"Cuir ainm ùr air: \"",
	Skipped: "\"Air leum a ghearradh: \"",
	CopyDetails: "Cuir lethbhreac dhen mhion-fhiosrachadh san stòr-bhòrd",
	LogInstall: "Dèan loga dhen stàladh",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var ScotsGaelic$1 = {
	header: header$O,
	id: id$O,
	font: font$O,
	code_page: code_page$O,
	rtl: rtl$O,
	strings: strings$O
};

var header$P = "NLF v6";
var id$P = 3098;
var font$P = {
	name: null,
	size: null
};
var code_page$P = 1251;
var rtl$P = false;
var strings$P = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) Инсталација",
	UninstallCaption: "$(^Name) Деинсталација",
	LicenseSubCaption: ": Договор о праву коришћења",
	ComponentsSubCaption: ": Опције инсталације",
	DirSubCaption: ": Избор фолдера за инсталацију",
	InstallingSubCaption: ": Инсталација",
	CompletedSubCaption: ": Завршена инсталација",
	UnComponentsSubCaption: ": Опције деинсталације",
	UnDirSubCaption: ": Избор фолдера за деинсталацију",
	ConfirmSubCaption: ": Потврђивање",
	UninstallingSubCaption: ": Деинсталација",
	UnCompletedSubCaption: ": Завршена деинсталација",
	BackBtn: "< Назад",
	NextBtn: "Напред >",
	AgreeBtn: "Прихватам",
	AcceptBtn: "Прихватам услове договора о праву коришћења",
	DontAcceptBtn: "Не прихватам услове договора о праву коришћења",
	InstallBtn: "Инсталирај",
	UninstallBtn: "Деинсталирај",
	CancelBtn: "Одустани",
	CloseBtn: "Затвори",
	BrowseBtn: "Избор...",
	ShowDetailsBtn: "Детаљи",
	ClickNext: "Притисните дугме „Напред“ за наставак.",
	ClickInstall: "Притисните дугме „Инсталирај“ за почетак инсталације.",
	ClickUninstall: "Притисните дугме „Деинсталирај“ за почетак деинсталације.",
	Name: "Име",
	Completed: "Завршено",
	LicenseText: "Пажљиво прочитајте договор о праву коришћења пре инсталације програма $(^NameDA). Ако прихватате све услове договора, притисните дугме „Прихватам“.",
	LicenseTextCB: "Пажљиво прочитајте договор о праву коришћења пре инсталације програма $(^NameDA). Ако прихватате све услове договора, обележите квадратић испод. $_CLICK",
	LicenseTextRB: "Пажљиво прочитајте договор о праву коришћења пре инсталације програма $(^NameDA). Ако прихватате све услове договора, изаберите прву опцију испод. $_CLICK",
	UnLicenseText: "Пажљиво прочитајте договор о праву коришћења пре деинсталације програма $(^NameDA). Ако прихватате све услове договора, притисните дугме „Прихватам“.",
	UnLicenseTextCB: "Пажљиво прочитајте договор о праву коришћења пре деинсталације програма $(^NameDA). Ако прихватате све услове договора, обележите квадратић испод. $_CLICK",
	UnLicenseTextRB: "Пажљиво прочитајте договор о праву коришћења пре деинсталације програма $(^NameDA). Ако прихватате све услове договора, изаберите прву опцију испод. $_CLICK",
	Custom: "Прилагођавање",
	ComponentsText: "Изаберите компоненте за инсталацију. Инсталирају се само означене компоненте. $_CLICK",
	ComponentsSubText1: "Изаберите тип инсталације:",
	ComponentsSubText2_NoInstTypes: "Изаберите компоненте за инсталацију: ",
	ComponentsSubText2: "Или, изаберите опционе компоненте које желите да инсталирате: ",
	UnComponentsText: "Изаберите компоненте за деинсталацију. Деинсталирају се само означене компоненте. $_CLICK",
	UnComponentsSubText1: "Изаберите тип деинсталације: ",
	UnComponentsSubText2_NoInstTypes: "Изаберите компоненте за деинсталацију: ",
	UnComponentsSubText2: "Или, изаберите опционе компоненте које желите да деинсталирате: ",
	DirText: "Програм $(^NameDA) ће бити инсталиран у наведени фолдер. За инсталацију у други фолдер притисните дугме „Избор...“ и изаберите фолдер. $_CLICK",
	DirSubText: "Фолдер",
	DirBrowseText: "Изаберите фолдер у који ћете инсталирати програм $(^NameDA):",
	UnDirText: "Програм $(^NameDA) ће бити деинсталиран из наведеног фолдера. За деинсталацију из другог фолдера притисните дугме „Избор...“ и изаберите фолдер. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Изаберите фолдер из кога ћете деинсталирати програм $(^NameDA):",
	SpaceAvailable: "\"Слободан простор: \"",
	SpaceRequired: "\"Потребан простор: \"",
	UninstallingText: "Програм $(^NameDA) ће бити деинсталиран из наведеног фолдера. $_CLICK",
	UninstallingSubText: "Деинсталација из: ",
	FileError: "Грешка при отварању фајла за писање: \\r\\n\\t\"$0\"\\r\\nПритисните дугме „Одустани“ за прекид инсталације,\\r\\n„Понови“ за поновни покушај писања у фајл, или\\r\\n„Игнориши“ за прескакање овог фајла.",
	FileError_NoIgnore: "Грешка при отварању фајла за писање: \\r\\n\\t\"$0\"\\r\\nПритисните дугме „Понови“ за поновни покушај писања у фајл, или\\r\\n„Одустани“ за прекид инсталирања.",
	CantWrite: "\"Немогуће писање: \"",
	CopyFailed: "Неуспешно копирање",
	CopyTo: "\"Копирање у \"",
	Registering: "\"Регистровање: \"",
	Unregistering: "\"Дерегистровање: \"",
	SymbolNotFound: "\"Симбол није нађен: \"",
	CouldNotLoad: "\"Немогуће учитавање: \"",
	CreateFolder: "\"Креирање фолдера: \"",
	CreateShortcut: "\"Креирање пречице: \"",
	CreatedUninstaller: "\"Креирање деинсталера: \"",
	Delete: "\"Брисање фајла: \"",
	DeleteOnReboot: "\"Брисање при рестарту: \"",
	ErrorCreatingShortcut: "\"Грешка при креирању пречице: \"",
	ErrorCreating: "\"Грешка при креирању: \"",
	ErrorDecompressing: "Грешка при отпакивању података! Оштећен инсталациони програм?",
	ErrorRegistering: "Грешка при регистровању библиотеке",
	ExecShell: "\"Извршавање у окружењу: \"",
	Exec: "\"Извршавање: \"",
	Extract: "\"Отпакивање: \"",
	ErrorWriting: "\"Отпакивање: грешка при упису у фајл \"",
	InvalidOpcode: "Оштећен инсталациони програм: неисправна команда ",
	NoOLE: "\"Нема OLE подршке за: \"",
	OutputFolder: "\"Излазни фолдер: \"",
	RemoveFolder: "\"Брисање фолдера: \"",
	RenameOnReboot: "\"Преименовање при рестартовању: \"",
	Rename: "\"Преименован: \"",
	Skipped: "\"Прескочен: \"",
	CopyDetails: "Копирај детаље у клипборд",
	LogInstall: "Води записник о процесу инсталације",
	Byte: "B",
	Kilo: " k",
	Mega: " M",
	Giga: " G"
};
var Serbian$1 = {
	header: header$P,
	id: id$P,
	font: font$P,
	code_page: code_page$P,
	rtl: rtl$P,
	strings: strings$P
};

var header$Q = "NLF v6";
var id$Q = 2074;
var font$Q = {
	name: null,
	size: null
};
var code_page$Q = 1250;
var rtl$Q = false;
var strings$Q = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) Instalacija",
	UninstallCaption: "$(^Name) Deinstalacija",
	LicenseSubCaption: ": Dogovor o pravu korišćenja",
	ComponentsSubCaption: ": Opcije instalacije",
	DirSubCaption: ": Izbor foldera za instalaciju",
	InstallingSubCaption: ": Instalacija",
	CompletedSubCaption: ": Završena instalacija",
	UnComponentsSubCaption: ": Opcije deinstalacije",
	UnDirSubCaption: ": Izbor foldera za deinstalaciju",
	ConfirmSubCaption: ": Potvrđivanje",
	UninstallingSubCaption: ": Deinstalacija",
	UnCompletedSubCaption: ": Završena deinstalacija",
	BackBtn: "< Nazad",
	NextBtn: "Napred >",
	AgreeBtn: "Prihvatam",
	AcceptBtn: "Prihvatam uslove dogovora o pravu korišćenja",
	DontAcceptBtn: "Ne prihvatam uslove dogovora o pravu korišćenja",
	InstallBtn: "Instaliraj",
	UninstallBtn: "Deinstaliraj",
	CancelBtn: "Odustani",
	CloseBtn: "Zatvori",
	BrowseBtn: "Izbor...",
	ShowDetailsBtn: "Detalji",
	ClickNext: "Pritisnite dugme „Napred“ za nastavak.",
	ClickInstall: "Pritisnite dugme „Instaliraj“ za početak instalacije.",
	ClickUninstall: "Pritisnite dugme „Deinstaliraj“ za početak deinstalacije.",
	Name: "Ime",
	Completed: "Završeno",
	LicenseText: "Pažlivo pročitajte dogovor o pravu korišćenja pre instalacije programa $(^NameDA). Ako prihvatate sve uslove dogovora, pritisnite dugme „Prihvatam“.",
	LicenseTextCB: "Pažlivo pročitajte dogovor o pravu korišćenja pre instalacije programa $(^NameDA). Ako prihvatate sve uslove dogovora, obeležite kvadratić ispod. $_CLICK",
	LicenseTextRB: "Pažlivo pročitajte dogovor o pravu korišćenja pre instalacije programa $(^NameDA). Ako prihvatate sve uslove dogovora, izaberite prvu opciju ispod. $_CLICK",
	UnLicenseText: "Pažlivo pročitajte dogovor o pravu korišćenja pre deinstalacije programa $(^NameDA). Ako prihvatate sve uslove dogovora, pritisnite dugme „Prihvatam“.",
	UnLicenseTextCB: "Pažlivo pročitajte dogovor o pravu korišćenja pre deinstalacije programa $(^NameDA). Ako prihvatate sve uslove dogovora, obeležite kvadratić ispod. $_CLICK",
	UnLicenseTextRB: "Pažlivo pročitajte dogovor o pravu korišćenja pre deinstalacije programa $(^NameDA). Ako prihvatate sve uslove dogovora, izaberite prvu opciju ispod. $_CLICK",
	Custom: "Prilagođavanje",
	ComponentsText: "Izaberite komponente za instalaciju. Instaliraju se samo označene komponente. $_CLICK",
	ComponentsSubText1: "Izaberite tip instalacije:",
	ComponentsSubText2_NoInstTypes: "Izaberite komponente za instalaciju: ",
	ComponentsSubText2: "Ili, izaberite opcione komponente koje želite da instalirate: ",
	UnComponentsText: "Izaberite komponente za deinstalaciju. Deinstaliraju se samo označene komponente. $_CLICK",
	UnComponentsSubText1: "Izaberite tip deinstalacije: ",
	UnComponentsSubText2_NoInstTypes: "Izaberite komponente za deinstalaciju: ",
	UnComponentsSubText2: "Ili, izaberite opcione komponente koje želite da deinstalirate: ",
	DirText: "Program $(^NameDA) će biti instaliran u navedeni folder. Za instalaciju u drugi folder pritisnite dugme „Izbor...“ i izaberite folder. $_CLICK",
	DirSubText: "Folder",
	DirBrowseText: "Izaberite folder u koji ćete instalirati program $(^NameDA):",
	UnDirText: "Program $(^NameDA) će biti deinstaliran iz navedenog foldera. Za deinstalaciju iz drugog foldera pritisnite dugme „Izbor...“ i izaberite folder. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Izaberite folder iz koga ćete deinstalirati program $(^NameDA):",
	SpaceAvailable: "\"Slobodan prostor: \"",
	SpaceRequired: "\"Potreban prostor: \"",
	UninstallingText: "Program $(^NameDA) će biti deinstaliran iz navedenog foldera. $_CLICK",
	UninstallingSubText: "Deinstalacija iz: ",
	FileError: "Greška pri otvaranju fajla za pisanje: \\r\\n\\t\"$0\"\\r\\nPritisnite dugme „Odustani“ za prekid instalacije,\\r\\n„Ponovi“ za ponovni pokušaj pisanja u fajl, ili\\r\\n„Ignoriši“ za preskakanje ovog fajla.",
	FileError_NoIgnore: "Greška pri otvaranju fajla za pisanje: \\r\\n\\t\"$0\"\\r\\nPritisnite dugme „Ponovi“ za ponovni pokušaj pisanja u fajl, ili\\r\\n„Odustani“ za prekid instaliranja.",
	CantWrite: "\"Nemoguće pisanje: \"",
	CopyFailed: "Neuspešno kopiranje",
	CopyTo: "\"Kopiranje u \"",
	Registering: "\"Registrovanje: \"",
	Unregistering: "\"Deregistrovanje: \"",
	SymbolNotFound: "\"Simbol nije nađen: \"",
	CouldNotLoad: "\"Nemoguće učitavanje: \"",
	CreateFolder: "\"Kreiranje foldera: \"",
	CreateShortcut: "\"Kreiranje prečice: \"",
	CreatedUninstaller: "\"Kreiranje deinstalera: \"",
	Delete: "\"Brisanje fajla: \"",
	DeleteOnReboot: "\"Brisanje pri restartu: \"",
	ErrorCreatingShortcut: "\"Greška pri kreiranju prečice: \"",
	ErrorCreating: "\"Greška pri kreiranju: \"",
	ErrorDecompressing: "Greška pri otpakivanju podataka! Oštećen instalacioni program?",
	ErrorRegistering: "Greška pri registrovanju biblioteke",
	ExecShell: "\"Izvršavanje u okruženju: \"",
	Exec: "\"Izvršavanje: \"",
	Extract: "\"Otpakivanje: \"",
	ErrorWriting: "\"Otpakivanje: greška pri upisu u fajl \"",
	InvalidOpcode: "Oštećen instalacioni program: neispravna komanda ",
	NoOLE: "\"Nema OLE podrške za: \"",
	OutputFolder: "\"Izlazni folder: \"",
	RemoveFolder: "\"Brisanje foldera: \"",
	RenameOnReboot: "\"Preimenovanje pri restartu: \"",
	Rename: "\"Preimenovan: \"",
	Skipped: "\"Preskočen: \"",
	CopyDetails: "Kopiraj detalje u klipbord",
	LogInstall: "Vodi zapisnik o procesu instalacije",
	Byte: "B",
	Kilo: " k",
	Mega: " M",
	Giga: " G"
};
var SerbianLatin$1 = {
	header: header$Q,
	id: id$Q,
	font: font$Q,
	code_page: code_page$Q,
	rtl: rtl$Q,
	strings: strings$Q
};

var header$R = "NLF v6";
var id$R = 2052;
var font$R = {
	name: "宋体",
	size: 9
};
var code_page$R = 936;
var rtl$R = false;
var strings$R = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) 安装",
	UninstallCaption: "$(^Name) 卸载",
	LicenseSubCaption: ": 许可证协议",
	ComponentsSubCaption: ": 安装选项",
	DirSubCaption: ": 安装目录",
	InstallingSubCaption: ": 正在安装",
	CompletedSubCaption: ": 已完成",
	UnComponentsSubCaption: ": 卸载选项",
	UnDirSubCaption: ": 卸载文件夹",
	ConfirmSubCaption: ": 确认",
	UninstallingSubCaption: ": 正在卸载",
	UnCompletedSubCaption: ": 完成",
	BackBtn: "< 上一步(&P)",
	NextBtn: "下一步(&N) >",
	AgreeBtn: "我接受(&I)",
	AcceptBtn: "我接受许可证协议中的条款(&A)",
	DontAcceptBtn: "我不接受许可证协议中的条款(&N)",
	InstallBtn: "安装(&I)",
	UninstallBtn: "卸载(&U)",
	CancelBtn: "取消(&C)",
	CloseBtn: "关闭(&L)",
	BrowseBtn: "浏览(&B)...",
	ShowDetailsBtn: "显示详情(&D)",
	ClickNext: "点击 [下一步(N)] 继续。",
	ClickInstall: "点击 [安装(I)] 开始安装。",
	ClickUninstall: "点击 [卸载(U)] 开始卸载。",
	Name: "名称",
	Completed: "已完成",
	LicenseText: "请在安装 $(^NameDA) 之前阅读许可证协议。如果你接受协议中所有条款，点击 [我同意(I)] 。",
	LicenseTextCB: "请在安装 $(^NameDA) 之前阅读许可证协议。如果你接受协议中所有条款，点击下方的选框。 $_CLICK",
	LicenseTextRB: "请在安装 $(^NameDA) 之前阅读许可证协议。如果你接受协议中所有条款，选择下方的第一个选项。 $_CLICK",
	UnLicenseText: "请在卸载 $(^NameDA) 之前阅读许可证协议。如果你接受协议中所有条款，点击 [我同意(I)] 。",
	UnLicenseTextCB: "请在卸载 $(^NameDA) 之前阅读许可证协议。如果你接受协议中所有条款，点击下方的选框。 $_CLICK",
	UnLicenseTextRB: "请在卸载 $(^NameDA) 之前阅读许可证协议。如果你接受协议中所有条款，选择下方的第一个选项。 $_CLICK",
	Custom: "自定义",
	ComponentsText: "请勾选你想安装的组件，并取消勾选你不想安装的组件。 $_CLICK",
	ComponentsSubText1: "选定的安装的类型: ",
	ComponentsSubText2_NoInstTypes: "选定安装的组件: ",
	ComponentsSubText2: "或者，自定义选定想安装的组件: ",
	UnComponentsText: "请勾选你想卸载的组件，并取消勾选你不想卸载的组件。 $_CLICK",
	UnComponentsSubText1: "选择卸载的类型: ",
	UnComponentsSubText2_NoInstTypes: "选择要卸载的组件: ",
	UnComponentsSubText2: "或是，选择想要解除安装的可选项组件: ",
	DirText: "安装程序将把 $(^NameDA) 安装到以下目录。要安装到另一个目录，请点击 [浏览(B)...] 并选择其他的文件夹。 $_CLICK",
	DirSubText: "安装目录",
	DirBrowseText: "选择安装此软件的 $(^NameDA) 的位置: ",
	UnDirText: "安装程序将把 $(^NameDA) 从以下目录卸载。要从另一个目录卸载，点击 [浏览(B)...] 并选择其他目录。 $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "选择要卸载 $(^NameDA) 的目录: ",
	SpaceAvailable: "\"可用空间: \"",
	SpaceRequired: "\"所需空间: \"",
	UninstallingText: "此向导将从本机卸载 $(^NameDA) 。 $_CLICK",
	UninstallingSubText: "卸载目录: ",
	FileError: "无法打开要写入的文件: \\r\\n\\t\"$0\"\\r\\n点击 [Abort] 停止安装，\\r\\n [Retry] 重新尝试写入文件，或者\\r\\n [Ignore] 忽略这个文件。",
	FileError_NoIgnore: "无法打开要写入的文件: \\r\\n\\t\"$0\"\\r\\n点击 [Retry] 重新尝试写入文件，或者\\r\\n [Cancel] 停止安装。",
	CantWrite: "\"无法写入: \"",
	CopyFailed: "\"复制失败 \"",
	CopyTo: "\"复制到: \"",
	Registering: "\"正在注册: \"",
	Unregistering: "\"正在取消注册: \"",
	SymbolNotFound: "\"无法找到符号: \"",
	CouldNotLoad: "\"无法加载: \"",
	CreateFolder: "\"创建文件夹: \" ",
	CreateShortcut: "\"创建快捷方式: \"",
	CreatedUninstaller: "\"创建卸载程序: \"",
	Delete: "\"删除文件: \"",
	DeleteOnReboot: "\"重新启动后删除: \"",
	ErrorCreatingShortcut: "\"创建快捷方式时发生错误: \"",
	ErrorCreating: "\"创建时发生错误: \"",
	ErrorDecompressing: "\"解压缩数据时发生错误！请检查安装程序是否损坏。\"",
	ErrorRegistering: "\"注册 DLL 时发生错误\"",
	ExecShell: "\"执行外壳程序: \"",
	Exec: "\"执行: \"",
	Extract: "\"解压缩: \"",
	ErrorWriting: "\"抽取: 无法写入文件 \"",
	InvalidOpcode: "\"安装程序损坏: 无效的操作代码 \"",
	NoOLE: "\"没有 OLE 用于: \"",
	OutputFolder: "\"输出目录: \"",
	RemoveFolder: "\"删除目录: \"",
	RenameOnReboot: "\"重新启动之后重命名: \"",
	Rename: "\"重命名: \"",
	Skipped: "\"已跳过: \"",
	CopyDetails: "\"复制详情到剪贴板 \"",
	LogInstall: "\"记录安装过程到日志\"",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var SimpChinese$1 = {
	header: header$R,
	id: id$R,
	font: font$R,
	code_page: code_page$R,
	rtl: rtl$R,
	strings: strings$R
};

var header$S = "NLF v6";
var id$S = 1051;
var font$S = {
	name: null,
	size: null
};
var code_page$S = 1250;
var rtl$S = false;
var strings$S = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Inštalácia programu $(^Name)",
	UninstallCaption: "Odinštalovanie programu $(^Name)",
	LicenseSubCaption: ": Licenčná zmluva",
	ComponentsSubCaption: ": Možnosti inštalácie",
	DirSubCaption: ": Inštalačný priečinok",
	InstallingSubCaption: ": Prebieha inštalácia",
	CompletedSubCaption: ": Hotovo",
	UnComponentsSubCaption: ": Možnosti odinštalovania",
	UnDirSubCaption: ": Priečinok s informáciami pre odinštalovanie",
	ConfirmSubCaption: ": Potvrdenie",
	UninstallingSubCaption: ": Prebieha odinštalácia",
	UnCompletedSubCaption: ": Hotovo",
	BackBtn: "< &Späť",
	NextBtn: "Ď&alej >",
	AgreeBtn: "&Súhlasím",
	AcceptBtn: "&Súhlasím s podmienkami licenčnej zmluvy",
	DontAcceptBtn: "N&esúhlasím s podmienkami licenčnej zmluvy",
	InstallBtn: "&Nainštalovať",
	UninstallBtn: "&Odinštalovať",
	CancelBtn: "Zrušiť",
	CloseBtn: "&Zatvoriť",
	BrowseBtn: "&Prehľadávať...",
	ShowDetailsBtn: "&Podrobnosti",
	ClickNext: "V inštalácii pokračujte kliknutím na tlačidlo Ďalej.",
	ClickInstall: "Pre spustenie inštalácie kliknite na tlačidlo Nainštalovať.",
	ClickUninstall: "Pre spustenie procesu odinštalovania kliknite na tlačidlo Odinštalovať.",
	Name: "Názov",
	Completed: "Hotovo",
	LicenseText: "Pred inštaláciou programu si prosím dôkladne prečítajte licenčnú zmluvu $(^NameDA). Ak súhlasíte so všetkými jej podmienkami, kliknite na tlačidlo Súhlasím.",
	LicenseTextCB: "Pred inštaláciou programu si prosím dôkladne prečítajte licenčnú zmluvu $(^NameDA). Ak súhlasíte so všetkými jej podmienkami, zaškrtnite nasledujúce políčko. $_CLICK",
	LicenseTextRB: "Pred inštaláciou programu si prosím dôkladne prečítajte licenčnú zmluvu $(^NameDA). Ak súhlasíte so všetkými jej podmienkami, označte prvú z nasledujúcich možností. $_CLICK",
	UnLicenseText: "Pred odinštalovaním programu si prosím dôkladne prečítajte licenčnú zmluvu $(^NameDA). Ak súhlasíte so všetkými jej podmienkami, kliknite na tlačidlo Súhlasím.",
	UnLicenseTextCB: "Pred odinštalovaním programu si prosím dôkladne prečítajte licenčnú zmluvu $(^NameDA). Ak súhlasíte so všetkými jej podmienkami, zaškrtnite nasledujúce políčko. $_CLICK",
	UnLicenseTextRB: "Pred odinštalovaním programu si prosím dôkladne prečítajte licenčnú zmluvu $(^NameDA). Ak súhlasíte so všetkými jej podmienkami, označte prvú z nasledujúcich možností. $_CLICK",
	Custom: "Voliteľná",
	ComponentsText: "Označte súčasti programu, ktoré chcete nainštalovať a odznačte tie, ktoré nainštalovať nechcete. $_CLICK",
	ComponentsSubText1: "Vyberte si typ inštalácie:",
	ComponentsSubText2_NoInstTypes: "Vyberte si tie súčasti programu, ktoré chcete nainštalovať:",
	ComponentsSubText2: "Alebo označte voliteľné doplnky, ktoré chcete nainštalovať:",
	UnComponentsText: "Označte súčasti programu, ktoré chcete odinštalovať a odznačte tie, ktoré chcete ponechať nainštalované. $_CLICK",
	UnComponentsSubText1: "Zvoľte typ deinštalácie:",
	UnComponentsSubText2_NoInstTypes: "Vyberte súčasti, ktoré chcete odinštalovať:",
	UnComponentsSubText2: "Alebo označte voliteľné súčasti, ktoré chcete odinštalovať:",
	DirText: "$(^NameDA) bude nainštalovaný do nasledujúceho priečinka. Inštalovať do iného priečinka môžete po kliknutí na tlačidlo Prehľadávať a vybraní iného priečinka. $_CLICK",
	DirSubText: "Cieľový priečinok",
	DirBrowseText: "Zvoľte priečinok, do ktorého sa nainštaluje program $(^NameDA):",
	UnDirText: "Inštalátor odinštaluje program $(^NameDA) z nasledovného priečinka. Ak ho chcete odinštalovať z iného priečinka, kliknite na tlačidlo Prehľadávať a vyberte iný priečinok. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Zvoľte priečinok, z ktorého sa odinštaluje program $(^NameDA):",
	SpaceAvailable: "\"Voľné miesto na disku: \"",
	SpaceRequired: "\"Potrebné miesto na disku: \"",
	UninstallingText: "Program $(^NameDA) sa odinštaluje z nasledovného priečinka. $_CLICK",
	UninstallingSubText: "Prebieha odinštalovanie z:",
	FileError: "Chyba pri otváraní súboru na zápis: \\r\\n\\r\\n$0\\r\\n\\r\\n. Ak chcete inštaláciu ukončiť, kliknite na tlačidlo Ukončiť,\\r\\ ak chcete zápis súboru zopakovať, kliknite na tlačidlo Opakovať alebo kliknite na tlačidlo \\r\\nIgnorovať, ak chcete inštaláciu tohto súboru vynechať.",
	FileError_NoIgnore: "Chyba pri otváraní súboru na zápis: \\r\\n\\r\\n$0\\r\\n\\r\\n. Ak chcete zopakovať zápis súboru, kliknite na tlačidlo Opakovať, alebo kliknite na tlačidlo \\r\\nZrušiť, v prípade, že chcete inštaláciu ukončiť.",
	CantWrite: "\"Nemožno zapísať súbor: \"",
	CopyFailed: "Kopírovanie zlyhalo.",
	CopyTo: "\"Kopírovať do \"",
	Registering: "\"Registruje sa: \"",
	Unregistering: "\"Vymazáva sa z registra: \"",
	SymbolNotFound: "\"Nemožno nájsť symbol: \"",
	CouldNotLoad: "\"Nemožno načítať: \"",
	CreateFolder: "\"Vytvorený priečinok: \"",
	CreateShortcut: "\"Vytvorený odkaz: \"",
	CreatedUninstaller: "\"Program pre odinštalovanie: \"",
	Delete: "\"Vymazaný súbor: \"",
	DeleteOnReboot: "\"Vymazať po reštartovaní systému: \"",
	ErrorCreatingShortcut: "\"Chyba pri vytváraní odkazu: \"",
	ErrorCreating: "\"Chyba pri vytváraní: \"",
	ErrorDecompressing: "Chyba pri dekomprimovaní dát! Inštalátor je pravdepodobne poškodený...",
	ErrorRegistering: "Chyba pri registrácii súčasti",
	ExecShell: "\"Vykonať príkaz: \"",
	Exec: "\"Spustiť: \"",
	Extract: "\"Extrahuje sa: \"",
	ErrorWriting: "\"Chyba pri zápise do súboru \"",
	InvalidOpcode: "Inštalátor je pravdepodobne poškodený, pretože obsahuje neplatný operačný kód.",
	NoOLE: "\"Žiadny zápis OLE pre: \"",
	OutputFolder: "\"Výstupný priečinok: \"",
	RemoveFolder: "\"Odstrániť priečinok: \"",
	RenameOnReboot: "\"Premenovať po reštartovaní systému: \"",
	Rename: "\"Premenovať: \"",
	Skipped: "\"Vynechané: \"",
	CopyDetails: "Skopírovať podrobnosti do schránky",
	LogInstall: "Zaznamenať priebeh inštalácie",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Slovak$1 = {
	header: header$S,
	id: id$S,
	font: font$S,
	code_page: code_page$S,
	rtl: rtl$S,
	strings: strings$S
};

var header$T = "NLF v6";
var id$T = 1060;
var font$T = {
	name: null,
	size: null
};
var code_page$T = 1250;
var rtl$T = false;
var strings$T = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Namestitev $(^Name)",
	UninstallCaption: "Odstranitev $(^Name)",
	LicenseSubCaption: ": Licenčna pogodba",
	ComponentsSubCaption: ": Možnosti namestitve",
	DirSubCaption: ": Mapa namestitve",
	InstallingSubCaption: ": Nameščanje poteka",
	CompletedSubCaption: ": Dokončano",
	UnComponentsSubCaption: ": Možnosti odstranitve",
	UnDirSubCaption: ": Mapa odstranitve",
	ConfirmSubCaption: ": Potrditev",
	UninstallingSubCaption: ": Odstranjevanje poteka",
	UnCompletedSubCaption: ": Dokončano",
	BackBtn: "< &Nazaj",
	NextBtn: "N&aprej >",
	AgreeBtn: "Se &strinjam",
	AcceptBtn: "&Sprejmem pogoje licenčne pogodbe",
	DontAcceptBtn: "&Ne sprejmem pogojev licenčne pogodbe",
	InstallBtn: "&Namesti",
	UninstallBtn: "&Odstrani",
	CancelBtn: "Prekliči",
	CloseBtn: "&Zapri",
	BrowseBtn: "Prebrsk&aj ...",
	ShowDetailsBtn: "&Podrobnosti",
	ClickNext: "Kliknite Naprej za nadaljevanje.",
	ClickInstall: "Kliknite Namesti za začetek namestitve.",
	ClickUninstall: "Kliknite Odstrani za odstranitev.",
	Name: "Ime",
	Completed: "Dokončano",
	LicenseText: "Prosimo, da pred namestitvijo $(^NameDA) pregledate licenčno pogodbo. Če se z njo strinjate, pritisnite Se strinjam.",
	LicenseTextCB: "Prosimo, da pred namestitvijo $(^NameDA) pregledate licenčno pogodbo. Če sprejmete vse naštete pogoje, potrdite spodnje polje. $_CLICK",
	LicenseTextRB: "Prosimo, da pred namestitvijo $(^NameDA) pregledate licenčno pogodbo. Če sprejmete vse naštete pogoje, izberite prvo spodaj podano možnost. $_CLICK",
	UnLicenseText: "Prosimo, da pred odstranitvijo $(^NameDA) pregledate licenčno pogodbo. Če se z njo strinjate, pritisnite Se strinjam.",
	UnLicenseTextCB: "Prosimo, da pred odstranitvijo $(^NameDA) pregledate licenčno pogodbo. Če sprejmete vse naštete pogoje, potrdite spodnje polje. $_CLICK",
	UnLicenseTextRB: "Prosimo, da pred odstranitvijo $(^NameDA) pregledate licenčno pogodbo. Če sprejmete vse naštete pogoje, izberite prvo spodaj podano možnost. $_CLICK",
	Custom: "Po meri ...",
	ComponentsText: "Označite komponente, ki jih želite namestiti, in pustite neoznačene tiste, katerih ne želite namestiti. $_CLICK",
	ComponentsSubText1: "Izberite vrsto namestitve:",
	ComponentsSubText2_NoInstTypes: "Izberite komponente namestitve:",
	ComponentsSubText2: "Ali pa izberite komponente, ki jih želite namestiti:",
	UnComponentsText: "Označite komponente, ki jih želite odstraniti, in pustite neoznačene tiste, ki jih ne želite odstraniti. $_CLICK",
	UnComponentsSubText1: "Izberite vrsto odstranitve:",
	UnComponentsSubText2_NoInstTypes: "Izberite komponente za odstranitev:",
	UnComponentsSubText2: "Ali pa izberite komponente namestitve, ki jih želite odstraniti:",
	DirText: "$(^NameDA) boste namestili v sledečo mapo. Za izbiro druge mape kliknite tipko Prebrskaj in izberite drugo mapo. $_CLICK",
	DirSubText: "Ciljna mapa",
	DirBrowseText: "Izberite mapo, kamor želite namestiti $(^NameDA):",
	UnDirText: "Odstranili boste $(^NameDA) iz sledeče mape. Za izbiro druge mape kliknite tipko Prebrskaj in izberite drugo mapo. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Izberite mapo, od koder želite odstraniti $(^NameDA):",
	SpaceAvailable: "\"Prostor na disku: \"",
	SpaceRequired: "\"Potreben prostor: \"",
	UninstallingText: "$(^NameDA) bo odstranjen iz naslednje mape. $_CLICK",
	UninstallingSubText: "Odstranjevanje iz:",
	FileError: "Napaka pri odpiranju datoteke za pisanje: \\r\\n\\r\\n$0\\r\\n\\r\\nPritisnite Prekini za prekinitev namestitve,\\r\\nPonovi za ponoven poskus ali\\r\\nPrezri za izpust te datoteke.",
	FileError_NoIgnore: "Napaka pri odpiranju datoteke za pisanje: \\r\\n\\r\\n$0\\r\\n\\r\\nPritisnite Ponovi za ponoven poskus pisanja ali\\r\\Prekliči za prekinitev namestitve.",
	CantWrite: "\"Ni mogoče pisati: \"",
	CopyFailed: "Kopiranje neuspešno",
	CopyTo: "\"Kopiranje v \"",
	Registering: "\"Registracija: \"",
	Unregistering: "\"Preklic registracije: \"",
	SymbolNotFound: "\"Ni mogoče najti simbola: \"",
	CouldNotLoad: "\"Ni mogoče naložiti: \"",
	CreateFolder: "\"Ustvarjanje mape: \"",
	CreateShortcut: "\"Ustvarjanje bližnjice: \"",
	CreatedUninstaller: "\"Ustvarjena odstranitev: \"",
	Delete: "\"Brisanje datoteke: \"",
	DeleteOnReboot: "\"Brisanje ob ponovnem zagonu: \"",
	ErrorCreatingShortcut: "\"Napaka ustvarjanja bližnjice: \"",
	ErrorCreating: "\"Napaka ustvarjanja: \"",
	ErrorDecompressing: "Napaka pri razširjanju podatkov! Je namestitvena datoteka okvarjena?",
	ErrorRegistering: "Napaka registracije DLL",
	ExecShell: "\"Izvajanje v lupini: \"",
	Exec: "\"Izvajanje: \"",
	Extract: "\"Razširjanje: \"",
	ErrorWriting: "\"Razširjanje: napaka pri pisanju v datoteko \"",
	InvalidOpcode: "Namestitev neveljavna: napačen ukaz",
	NoOLE: "\"Neobstoječi OLE za: \"",
	OutputFolder: "\"Ciljna mapa: \"",
	RemoveFolder: "\"Odstranjevanje mape: \"",
	RenameOnReboot: "\"Preimenovanje ob zagonu: \"",
	Rename: "\"Preimenovanje: \"",
	Skipped: "\"Izpuščeno: \"",
	CopyDetails: "Kopiraj podrobnosti v odložišče",
	LogInstall: "Shrani potek namestitve",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Slovenian$1 = {
	header: header$T,
	id: id$T,
	font: font$T,
	code_page: code_page$T,
	rtl: rtl$T,
	strings: strings$T
};

var header$U = "NLF v6";
var id$U = 1034;
var font$U = {
	name: null,
	size: null
};
var code_page$U = 1252;
var rtl$U = false;
var strings$U = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Instalación de $(^Name)",
	UninstallCaption: "Desinstalación de $(^Name)",
	LicenseSubCaption: ": Acuerdo de Licencia",
	ComponentsSubCaption: ": Opciones de Instalación",
	DirSubCaption: ": Directorio de Instalación",
	InstallingSubCaption: ": Instalando",
	CompletedSubCaption: ": Completado",
	UnComponentsSubCaption: ": Opciones de Desinstalación",
	UnDirSubCaption: ": Directorio de Desinstalación",
	ConfirmSubCaption: ": Confirmación",
	UninstallingSubCaption: ": Desinstalando",
	UnCompletedSubCaption: ": Completado",
	BackBtn: "< &Atrás",
	NextBtn: "&Siguiente >",
	AgreeBtn: "A&cepto",
	AcceptBtn: "A&cepto los términos de la licencia",
	DontAcceptBtn: "&No acepto los términos de la licencia",
	InstallBtn: "&Instalar",
	UninstallBtn: "&Desinstalar",
	CancelBtn: "Cancelar",
	CloseBtn: "&Cerrar",
	BrowseBtn: "&Examinar...",
	ShowDetailsBtn: "Ver &detalles",
	ClickNext: "Presione Siguiente para continuar.",
	ClickInstall: "Presione Instalar para comenzar la instalación.",
	ClickUninstall: "Presione Desinstalar para comenzar la desinstalación.",
	Name: "Nombre",
	Completed: "Completado",
	LicenseText: "Por favor, revise el acuerdo de licencia antes de instalar $(^NameDA). Si acepta todos los términos del acuerdo, presione Acepto.",
	LicenseTextCB: "Por favor, revise el acuerdo de licencia antes de instalar $(^NameDA). Si acepta todos los términos del acuerdo, marque abajo la casilla. $_CLICK",
	LicenseTextRB: "Por favor, revise el acuerdo de licencia antes de instalar $(^NameDA). Si acepta todos los términos del acuerdo, seleccione abajo la primera opción. $_CLICK",
	UnLicenseText: "Por favor, revise el acuerdo de licencia antes de desinstalar $(^NameDA). Si acepta todos los términos del acuerdo, presione Acepto.",
	UnLicenseTextCB: "Por favor, revise el acuerdo de licencia antes de desinstalar $(^NameDA). Si acepta todos los términos del acuerdo, marque abajo la casilla. $_CLICK.",
	UnLicenseTextRB: "Por favor, revise el acuerdo de licencia antes de desinstalar $(^NameDA). Si acepta todos los términos del acuerdo, seleccione abajo la primera opción. $_CLICK",
	Custom: "Personalizada",
	ComponentsText: "Marque los componentes que desee instalar y desmarque los componentes que no desee instalar. $_CLICK",
	ComponentsSubText1: "Tipos de instalación:",
	ComponentsSubText2_NoInstTypes: "Seleccione los componentes a instalar:",
	ComponentsSubText2: "O seleccione los componentes opcionales que desee instalar:",
	UnComponentsText: "Marque los componentes que desee desinstalar y desmarque los componentes que no desee desinstalar. $_CLICK",
	UnComponentsSubText1: "Tipos de desinstalación:",
	UnComponentsSubText2_NoInstTypes: "Seleccione los componentes a desinstalar:",
	UnComponentsSubText2: "O seleccione los componentes opcionales que desee desinstalar:",
	DirText: "El programa de instalación instalará $(^NameDA) en el siguiente directorio. Para instalar en un directorio diferente, presione Examinar y seleccione otro directorio. $_CLICK",
	DirSubText: "Directorio de Destino",
	DirBrowseText: "Seleccione el directorio en el que instalará $(^NameDA):",
	UnDirText: "El programa de instalación desinstalará $(^NameDA) del siguiente directorio. Para desinstalar de un directorio diferente, presione Examinar y seleccione otro directorio. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Seleccione el directorio desde el cual desinstalará $(^NameDA):",
	SpaceAvailable: "Espacio disponible: ",
	SpaceRequired: "Espacio requerido: ",
	UninstallingText: "$(^NameDA) será desinstalado del siguiente directorio. $_CLICK",
	UninstallingSubText: "Desinstalando desde:",
	FileError: "Error abriendo archivo para escritura: \\r\\n\\t\"$0\"\\r\\nPresione abortar para anular la instalación,\\r\\nreintentar para volver a intentar escribir el archivo, u\\r\\nomitir para ignorar este archivo",
	FileError_NoIgnore: "Error abriendo archivo para escritura: \\r\\n\\t\"$0\"\\r\\nPresione reintentar para volver a intentar escribir el archivo, o\\r\\ncancelar para anular la instalación",
	CantWrite: "\"No pudo escribirse: \"",
	CopyFailed: "Falló la copia",
	CopyTo: "\"Copiar a \"",
	Registering: "\"Registrando: \"",
	Unregistering: "\"Eliminando registro: \"",
	SymbolNotFound: "\"No pudo encontrarse símbolo: \"",
	CouldNotLoad: "\"No pudo cargarse: \"",
	CreateFolder: "\"Creando directorio: \"",
	CreateShortcut: "\"Creando acceso directo: \"",
	CreatedUninstaller: "\"Creando desinstalador: \"",
	Delete: "\"Borrar archivo: \"",
	DeleteOnReboot: "\"Borrar al reinicio: \"",
	ErrorCreatingShortcut: "\"Error creando acceso directo: \"",
	ErrorCreating: "\"Error creando: \"",
	ErrorDecompressing: "¡Error descomprimiendo datos! ¿Instalador corrupto?",
	ErrorRegistering: "Error registrando DLL",
	ExecShell: "\"Extrayendo  comando: \"",
	Exec: "\"Extrayendo : \"",
	Extract: "\"Extraer: \"",
	ErrorWriting: "\"Extraer: error escribiendo al archivo \"",
	InvalidOpcode: "Instalador corrupto: código de operación no válido",
	NoOLE: "\"Sin OLE para: \"",
	OutputFolder: "\"Directorio de salida: \"",
	RemoveFolder: "\"Eliminar directorio: \"",
	RenameOnReboot: "\"Renombrar al reinicio: \"",
	Rename: "\"Renombrar: \"",
	Skipped: "\"Omitido: \"",
	CopyDetails: "Copiar Detalles al Portapapeles",
	LogInstall: "Registrar proceso de instalación ",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Spanish$1 = {
	header: header$U,
	id: id$U,
	font: font$U,
	code_page: code_page$U,
	rtl: rtl$U,
	strings: strings$U
};

var header$V = "NLF v6";
var id$V = 3082;
var font$V = {
	name: null,
	size: null
};
var code_page$V = 1252;
var rtl$V = false;
var strings$V = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Instalación de $(^Name)",
	UninstallCaption: "Desinstalación de $(^Name)",
	LicenseSubCaption: ": Acuerdo de Licencia",
	ComponentsSubCaption: ": Opciones de Instalación",
	DirSubCaption: ": Carpeta de Instalación",
	InstallingSubCaption: ": Instalando",
	CompletedSubCaption: ": Finalizado",
	UnComponentsSubCaption: ": Opciones de Desinstalación",
	UnDirSubCaption: ": Carpeta de Desinstalación",
	ConfirmSubCaption: ": Confirmación",
	UninstallingSubCaption: ": Desinstalando",
	UnCompletedSubCaption: ": Finalizado",
	BackBtn: "< &Atrás",
	NextBtn: "&Siguiente >",
	AgreeBtn: "&Acepto",
	AcceptBtn: "&Acepto las condiciones del Acuerdo de Licencia",
	DontAcceptBtn: "No &acepto las condiciones del Acuerdo de Licencia",
	InstallBtn: "&Instalar",
	UninstallBtn: "&Desinstalar",
	CancelBtn: "Cancelar",
	CloseBtn: "&Cerrar",
	BrowseBtn: "&Examinar...",
	ShowDetailsBtn: "Mostrar &detalles",
	ClickNext: "Presione Siguiente para continuar.",
	ClickInstall: "Presione Instalar para iniciar la instalación.",
	ClickUninstall: "Presione Desinstalar para iniciar la desinstalación.",
	Name: "Nombre",
	Completed: "Finalizado",
	LicenseText: "Por favor, revise el acuerdo de licencia antes de instalar $(^NameDA). Si usted acepta todas las condiciones del acuerdo, presione Acepto.",
	LicenseTextCB: "Por favor, revise el acuerdo de licencia antes de instalar $(^NameDA). Si usted acepta todas las condiciones del acuerdo, marque abajo la casilla. $_CLICK",
	LicenseTextRB: "Por favor, revise el acuerdo de licencia antes de instalar $(^NameDA). Si usted acepta todas las condiciones del acuerdo, seleccione abajo la primera opción. $_CLICK",
	UnLicenseText: "Por favor, revise el acuerdo de licencia antes de desinstalar $(^NameDA). Si usted acepta todas las condiciones del acuerdo, presione Acepto.",
	UnLicenseTextCB: "Por favor, revise el acuerdo de licencia antes de desinstalar $(^NameDA). Si usted acepta todas las condiciones del acuerdo, marque abajo la casilla. $_CLICK",
	UnLicenseTextRB: "Por favor, revise el acuerdo de licencia antes de desinstalar $(^NameDA). Si usted acepta todas las condiciones del acuerdo, seleccione abajo la primera opción. $_CLICK",
	Custom: "Personalizada",
	ComponentsText: "Marque los componentes que desee instalar y desmarque los componentes que no desee instalar. $_CLICK",
	ComponentsSubText1: "Seleccione el tipo de instalación:",
	ComponentsSubText2_NoInstTypes: "Seleccione los componentes a instalar:",
	ComponentsSubText2: "O seleccione los componentes opcionales que desee instalar:",
	UnComponentsText: "Marque los componentes que desee desinstalar y desmarque los componentes que no desee desinstalar. $_CLICK",
	UnComponentsSubText1: "Seleccione el tipo de desinstalación:",
	UnComponentsSubText2_NoInstTypes: "Seleccione los componentes a desinstalar:",
	UnComponentsSubText2: "O seleccione los componentes opcionales que desee desinstalar:",
	DirText: "El programa de instalación instalará $(^NameDA) en la siguiente carpeta. Para instalar en una carpeta diferente, presione Examinar y seleccione otra carpeta. $_CLICK",
	DirSubText: "Carpeta de Destino",
	DirBrowseText: "Seleccione la carpeta en la que instalará $(^NameDA):",
	UnDirText: "El programa de instalación desinstalará $(^NameDA) de la siguiente carpeta. Para desinstalar de una carpeta diferente, presione Examinar y seleccione otra carpeta. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Seleccione la carpeta desde la que desinstalará $(^NameDA):",
	SpaceAvailable: "Espacio disponible:",
	SpaceRequired: "Espacio requerido:",
	UninstallingText: "$(^NameDA) será desinstalado de la siguiente carpeta. $_CLICK",
	UninstallingSubText: "Desinstalando desde:",
	FileError: "Error abriendo archivo para escribir: \\r\\n\\r\\n$0\\r\\n\\r\\nPresione Abortar para detener la instalación,\\r\\nReintentar para probar otra vez, o\\r\\nOmitir para ignorar este archivo.",
	FileError_NoIgnore: "Error abriendo archivo para escribir: \\r\\n\\r\\n$0\\r\\n\\r\\nPresione Reintentar para probar otra vez, o\\r\\nCancelar para detener la instalación.",
	CantWrite: "\"No pudo escribirse: \"",
	CopyFailed: "Copia fallida",
	CopyTo: "\"Copiar a \"",
	Registering: "\"Registrando: \"",
	Unregistering: "\"Eliminando registro: \"",
	SymbolNotFound: "\"No se encontró simbolo: \"",
	CouldNotLoad: "\"No pudo cargarse: \"",
	CreateFolder: "\"Creando carpeta: \"",
	CreateShortcut: "\"Creando acceso directo: \"",
	CreatedUninstaller: "\"Creando desinstalador: \"",
	Delete: "\"Borrar archivo: \"",
	DeleteOnReboot: "\"Borrar al reinicio: \"",
	ErrorCreatingShortcut: "\"Error creando acceso directo: \"",
	ErrorCreating: "\"Error creando: \"",
	ErrorDecompressing: "¡Error descomprimiendo datos! ¿Instalador corrupto?",
	ErrorRegistering: "Error registrando DLL",
	ExecShell: "\"Ejecutando comando: \"",
	Exec: "\"Ejecutando: \"",
	Extract: "\"Extrayendo: \"",
	ErrorWriting: "\"Extrayendo: error escribiendo al archivo \"",
	InvalidOpcode: "Instalador corrupto: código de operación no válido",
	NoOLE: "\"Sin OLE para: \"",
	OutputFolder: "\"Carpeta de salida: \"",
	RemoveFolder: "\"Eliminar carpeta: \"",
	RenameOnReboot: "\"Renombrar al reinicio: \"",
	Rename: "\"Renombrar: \"",
	Skipped: "\"Omitido: \"",
	CopyDetails: "Copiar Detalles al Portapapeles",
	LogInstall: "Registrar proceso de instalación",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var SpanishInternational$1 = {
	header: header$V,
	id: id$V,
	font: font$V,
	code_page: code_page$V,
	rtl: rtl$V,
	strings: strings$V
};

var header$W = "NLF v6";
var id$W = 1053;
var font$W = {
	name: null,
	size: null
};
var code_page$W = 1252;
var rtl$W = false;
var strings$W = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) Installation",
	UninstallCaption: "$(^Name) Avinstallation",
	LicenseSubCaption: ": Licensavtal",
	ComponentsSubCaption: ": Installationsval",
	DirSubCaption: ": Installationskatalog",
	InstallingSubCaption: ": Installerar",
	CompletedSubCaption: ": Slutförd",
	UnComponentsSubCaption: ": Avinstallationsval",
	UnDirSubCaption: ": Avinstallationskatalog",
	ConfirmSubCaption: ": Bekräftelse",
	UninstallingSubCaption: ": Avinstallerar",
	UnCompletedSubCaption: ": Slutförd",
	BackBtn: "< &Tillbaka",
	NextBtn: "&Nästa >",
	AgreeBtn: "Jag &Godkänner",
	AcceptBtn: "Jag &Godkänner villkoren i licensavtalet",
	DontAcceptBtn: "Jag &Godkänner inte villkoren i licensavtalet",
	InstallBtn: "&Installera",
	UninstallBtn: "&Avinstallera",
	CancelBtn: "Avbryt",
	CloseBtn: "&Stäng",
	BrowseBtn: "B&läddra...",
	ShowDetailsBtn: "Visa &detaljer",
	ClickNext: "Klicka på Nästa för att fortsätta.",
	ClickInstall: "Klicka på Installera för att starta installationen.",
	ClickUninstall: "Klicka på Avinstallera för att starta avinstallationen.",
	Name: "Namn",
	Completed: "Slutförd",
	LicenseText: "Var vänlig läs igenom licensvillkoren innan du installerar $(^NameDA). Om du accepterar villkoren i avtalet, klicka Jag Godkänner.",
	LicenseTextCB: "Var vänlig läs igenom licensvillkoren innan du installerar $(^NameDA). Om du accepterar villkoren i avtalet, klicka i checkrutan nedan. $_CLICK",
	LicenseTextRB: "Var vänlig läs igenom licensvillkoren innan du installerar $(^NameDA). Om du accepterar villkoren i avtalet, välj det första alternativet nedan. $_CLICK",
	UnLicenseText: "Var vänlig läs igenom licensvillkoren innan du avinstallerar $(^NameDA). Om du accepterar villkoren i avtalet, klicka Jag Godkänner.",
	UnLicenseTextCB: "Var vänlig läs igenom licensvillkoren innan du avinstallerar $(^NameDA). Om du accepterar villkoren i avtalet, klicka i checkrutan nedan. $_CLICK",
	UnLicenseTextRB: "Var vänlig läs igenom licensvillkoren innan du avinstallerar $(^NameDA). Om du accepterar villkoren i avtalet, välj det första alternativet nedan. $_CLICK",
	Custom: "Valfri",
	ComponentsText: "Markera de komponenter du vill installera och avmarkera de komponenter du inte vill installera. $_CLICK",
	ComponentsSubText1: "Välj typ av installation:",
	ComponentsSubText2_NoInstTypes: "Välj komponenter att installera:",
	ComponentsSubText2: "Eller, välj de alternativa komponenter du önskar installera:",
	UnComponentsText: "Markera de komponenter du vill avinstallera och avmarkera de komponenter du inte vill avinstallera. $_CLICK",
	UnComponentsSubText1: "Välj typ av avinstallation:",
	UnComponentsSubText2_NoInstTypes: "Välj komponenter att avinstallera:",
	UnComponentsSubText2: "Eller, välj de alternativa komponenter du önskar avinstallera:",
	DirText: "Guiden kommer att installera $(^NameDA) i följande katalog. För att installera i en annan katalog, klicka Bläddra och välj en alternativ katalog. $_CLICK",
	DirSubText: "Målkatalog",
	DirBrowseText: "Välj katalog att installera $(^NameDA) i:",
	UnDirText: "Installationsguiden kommer att avinstallera $(^NameDA) från följande katalog. För att avinstallera från en annan katalog, klicka Bläddra och välj en annan katalog. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Välj katalog att avinstallera $(^NameDA) från:",
	SpaceAvailable: "\"Utrymme tillgängligt: \"",
	SpaceRequired: "\"Utrymme som behövs: \"",
	UninstallingText: "$(^NameDA) kommer att avinstalleras från följande katalog. $_CLICK",
	UninstallingSubText: "Avinstallerar från:",
	FileError: "Fel vid Öppning av fil för skrivning: \\r\\n\\t\"$0\"\\r\\nKlicka på avbryt för att avbryta installationen,\\r\\nförsök igen för att försöka skriva till filen igen, eller\\r\\nIgnorera för att skippa denna fil",
	FileError_NoIgnore: "Fel vid Öppning av fil för skrivning: \\r\\n\\t\"$0\"\\r\\nKlicka på försök igen för att skriva till filen igen, eller\\r\\navbryt för att avbryta installationen",
	CantWrite: "\"Kan inte skriva: \"",
	CopyFailed: "Kopiering misslyckades",
	CopyTo: "\"Kopiera till \"",
	Registering: "\"Registrerar: \"",
	Unregistering: "\"Avregistrerar: \"",
	SymbolNotFound: "\"Kunde inte hitta symbol: \"",
	CouldNotLoad: "\"Kunde inte ladda: \"",
	CreateFolder: "\"Skapa katalog: \"",
	CreateShortcut: "\"Skapa genväg: \"",
	CreatedUninstaller: "\"Skapade avinstallationsprogram: \"",
	Delete: "\"Radera fil: \"",
	DeleteOnReboot: "\"Radera vid omstart: \"",
	ErrorCreatingShortcut: "\"Fel vid skapande av genväg: \"",
	ErrorCreating: "\"Fel vid skapande: \"",
	ErrorDecompressing: "Fel vid uppackning av data! Skadat installationspaket?",
	ErrorRegistering: "Fel vid registrering av DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Kör: \"",
	Extract: "\"Extrahera: \"",
	ErrorWriting: "\"Extrahera: fel vid skrivning till fil \"",
	InvalidOpcode: "Installationspaket skadat: ogiltig opcode",
	NoOLE: "\"Ingen OLE för: \"",
	OutputFolder: "\"Målkatalog: \"",
	RemoveFolder: "\"Ta bort katalog: \"",
	RenameOnReboot: "\"Döp om vid omstart: \"",
	Rename: "\"Döp om: \"",
	Skipped: "\"Ignorerad: \"",
	CopyDetails: "Kopiera detaljinformation till klippbordet",
	LogInstall: "Logga installationsförfarandet",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Swedish$1 = {
	header: header$W,
	id: id$W,
	font: font$W,
	code_page: code_page$W,
	rtl: rtl$W,
	strings: strings$W
};

var header$X = "NLF v6";
var id$X = 1092;
var font$X = {
	name: null,
	size: null
};
var code_page$X = 1251;
var rtl$X = false;
var strings$X = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Урнаштыру $(^Name)",
	UninstallCaption: "Бетерү $(^Name)",
	LicenseSubCaption: ": Лицензия килешүе",
	ComponentsSubCaption: ": Урнаштыру шартлары",
	DirSubCaption: ": Урнаштыру папкасы",
	InstallingSubCaption: ": Файлларны күчермәләү",
	CompletedSubCaption: ": Гамәл тәмамланды",
	UnComponentsSubCaption: ": Бетерү шартлары",
	UnDirSubCaption: ": Бетерү папкасы",
	ConfirmSubCaption: ": Раслау",
	UninstallingSubCaption: ": Файлларны бетерү",
	UnCompletedSubCaption: ": Гамәл тәмамланды",
	BackBtn: "< &Артка",
	NextBtn: "&Алга >",
	AgreeBtn: "Кабул ит&әм",
	AcceptBtn: "Мин &килешү шартларын кабул итәм",
	DontAcceptBtn: "Мин &килешү шартларын кабул итими",
	InstallBtn: "&Урнаштырырга",
	UninstallBtn: "Бе&терергә",
	CancelBtn: "Баш тарту",
	CloseBtn: "&Ябарга",
	BrowseBtn: "К&арарга...",
	ShowDetailsBtn: "&Тулырак...",
	ClickNext: "Дәвам итү өчен 'Алга' төймәсенә басыгыз.",
	ClickInstall: "Программаны урнаштыру өчен 'Урнаштырырга' төймәсенә басыгыз.",
	ClickUninstall: "Программаны бетерү өчен 'Бетерергә' төймәсенә басыгыз.",
	Name: "Исем",
	Completed: "Әзер",
	LicenseText: "$(^NameDA) урнаштыру алдыннан лицензия килешүе белән танышыгыз. Килешү шартларын кабул итсәгез, 'Кабул итәм' төймәсенә басыгыз.",
	LicenseTextCB: "$(^NameDA) урнаштыру алдыннан лицензия килешүе белән танышыгыз. Килешү шартларын кабул итсәгез, түбәндә билге куегыз. $_CLICK",
	LicenseTextRB: "$(^NameDA) урнаштыру алдыннан лицензия килешүе белән танышыгыз. Килешү шартларын кабул итсәгез, түбәндәге вариантлардан беренчесен сайлагыз. $_CLICK",
	UnLicenseText: "$(^NameDA) урнаштыру алдыннан лицензия килешүе белән танышыгыз. Килешү шартларын кабул итсәгез, 'Кабул итәм' төймәсенә басыгыз.",
	UnLicenseTextCB: "$(^NameDA) урнаштыру алдыннан лицензия килешүе белән танышыгыз. Килешү шартларын кабул итсәгез, түбәндә билге куегыз. $_CLICK",
	UnLicenseTextRB: "$(^NameDA) урнаштыру алдыннан лицензия килешүе белән танышыгыз. Килешү шартларын кабул итсәгез, түбәндәге вариантлардан беренчесен сайлагыз. $_CLICK",
	Custom: "Сайлап кына",
	ComponentsText: "Программаның урнаштырырга теләгән компонентларын сайлагыз. $_CLICK",
	ComponentsSubText1: "Урнаштыру төрен сайлагыз:",
	ComponentsSubText2_NoInstTypes: "Урнаштыру өчен программаның компонентларын сайлагыз:",
	ComponentsSubText2: "яки урнаштыру өчен өстәмә компонентлар сайлагыз:",
	UnComponentsText: "Бетерергә теләгән компонентларны сайлагыз. $_CLICK",
	UnComponentsSubText1: "Бетерү төрен сайлагыз:",
	UnComponentsSubText2_NoInstTypes: "Бетерү өчен компонентларны сайлагыз:",
	UnComponentsSubText2: "яки бетерү өчен өстәмә компонентларны сайлагыз:",
	DirText: "Программа $(^NameDA) программасын күрсәтерлән папкага урнаштырачак. Башка папкага урнаштыру өчен, 'Карарга' төймәсенә басыгыз һәм урын күрсәтегез. $_CLICK",
	DirSubText: "Урнаштыру папкасы",
	DirBrowseText: "$(^NameDA) урнаштыру өчен папка сайлагыз:",
	UnDirText: "Программа $(^NameDA) программасын күрсәтелгән папкадан бетерәчәк. Башка папкадан бетерү өчен, 'Карарга' төймәсенә басыгыз һәм урын күрсәтегез. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "$(^NameDA) бетерергә кирәк булган папканы күрсәтегез:",
	SpaceAvailable: "\"Дискта буш урын: \"",
	SpaceRequired: "\"Дискта кирәк урын: \"",
	UninstallingText: "$(^NameDA) программасы санагыгыздан бетереләчәк. $_CLICK",
	UninstallingSubText: "Моннан бетерү:",
	FileError: "Яздыру өчен файлны ачып булмый: \\r\\n\\t\"$0\"\\r\\n'Туктату': урнаштыруны туктатырга;\\r\\n\"Кабатлау\": омтылышны кабатларга;\\r\\n\"Калдыру\": бу гамәлне төшереп калдырырга.",
	FileError_NoIgnore: "Яздыру өчен файлны ачып булмый: \\r\\n\\t\"$0\"\\r\\n'Кабатлау': омтылышны кабатларга;\\r\\n'Баш тарту': урнаштыру барышын туктатырга.",
	CantWrite: "\"Яздырып булмый: \"",
	CopyFailed: "Күчермә ясауда хата",
	CopyTo: "\"Монда күчермәләү: \"",
	Registering: "\"Теркәлү: \"",
	Unregistering: "\"Теркәүдән баш тарту: \"",
	SymbolNotFound: "\"Символны табып булмый: \"",
	CouldNotLoad: "\"Йөкләп булмый: \"",
	CreateFolder: "\"Папка ясау: \"",
	CreateShortcut: "\"Сылтама ясау: \"",
	CreatedUninstaller: "\"Бетерү программасын ясау: \"",
	Delete: "\"Файлны бетерү: \"",
	DeleteOnReboot: "\"Санак сүндереп кабызылганда бетерү: \"",
	ErrorCreatingShortcut: "\"Сылтама ясауда хата: \" ",
	ErrorCreating: "\"Ясауда хата: \"",
	ErrorDecompressing: "Мәгълүматларны чыгаруда хата! Урнаштыручы бозык булуы мөмкин.",
	ErrorRegistering: "DLL теркәүдә хата",
	ExecShell: "\"Тышча командасын башкару: \" ",
	Exec: "\"Башкару: \"",
	Extract: "\"Чыгару: \"",
	ErrorWriting: "\"Чыгару: файл яздыруда хата \"",
	InvalidOpcode: "Урнаштыручы бозылган: мөмкин булмаган код",
	NoOLE: "\"OLE моның өчен юк: \" ",
	OutputFolder: "\"Урнаштыру папкасы: \"",
	RemoveFolder: "\"Папканы бетерү: \"",
	RenameOnReboot: "\"Санак сүндереп кабызылганда исемен үзгәртү: \"",
	Rename: "\"Исемен үзгәртү: \"",
	Skipped: "\"Калдыру: \"",
	CopyDetails: "Мәгълүматларны алмашыну буферына күчермәләргә",
	LogInstall: "Урнаштыру хисабын алып барырга",
	Byte: "б",
	Kilo: " К",
	Mega: " М",
	Giga: " Г"
};
var Tatar$1 = {
	header: header$X,
	id: id$X,
	font: font$X,
	code_page: code_page$X,
	rtl: rtl$X,
	strings: strings$X
};

var header$Y = "NLF v6";
var id$Y = 1054;
var font$Y = {
	name: null,
	size: null
};
var code_page$Y = 874;
var rtl$Y = false;
var strings$Y = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) ติดตั้ง",
	UninstallCaption: "$(^Name) ยกเลิกการติดตั้ง",
	LicenseSubCaption: ": ข้อตกลงเรื่องลิขสิทธิ์",
	ComponentsSubCaption: ": ตัวเลือกการติดตั้ง",
	DirSubCaption: ": แฟ้มที่ติดตั้ง",
	InstallingSubCaption: ": กำลังติดตั้ง",
	CompletedSubCaption: ": เสร็จสิ้น",
	UnComponentsSubCaption: ": ตัวเลือกยกเลิกการติดตั้ง",
	UnDirSubCaption: ": แฟ้มที่ยกเลิกการติดตั้ง",
	ConfirmSubCaption: ": ยืนยัน",
	UninstallingSubCaption: ": กำลังยกเลิกการติดตั้ง",
	UnCompletedSubCaption: ": เสร็จสิ้น",
	BackBtn: "< &กลับไป",
	NextBtn: "&ต่อไป >",
	AgreeBtn: "&ตกลง",
	AcceptBtn: "&ตกลงยอมรับข้อต่างๆในหัวข้อลิขสิทธิ์ ",
	DontAcceptBtn: "&ไม่ยอมรับข้อต่างๆในหัวข้อลิขสิทธิ์",
	InstallBtn: "&ติดตั้ง",
	UninstallBtn: "&ยกเลิกการติดตั้ง",
	CancelBtn: "ยกเลิก",
	CloseBtn: "&ปิด",
	BrowseBtn: "เ&รียกดู...",
	ShowDetailsBtn: "&รายละเอียด",
	ClickNext: "กด ต่อไป เพื่อเริ่มระบบอัติโนมัติ",
	ClickInstall: "กด  ติดตั้ง เพื่อทำการติดตั้ง",
	ClickUninstall: "กด  ยกเลิกการติดตั้ง เพื่อยกเลิกการติดตั้ง",
	Name: "ชื่อ",
	Completed: "เสร็จสิ้นแล้ว",
	LicenseText: "โปรดอ่านทวนเรื่องการยอมรับในลิขสิทธิ์ก่อนที่คุณจะทำการติดตั้ง $(^NameDA). ถ้าคุณยอมรับข้อตกลงในทุกๆด้าน, กด ฉันยอมรับ",
	LicenseTextCB: "โปรดอ่านทวนเรื่องการยอมรับในลิขสิทธิ์ก่อนที่คุณจะทำการติดตั้ง $(^NameDA). ถ้าคุณยอมรับข้อตกลงในทุกๆด้าน, กดเลือกที่กล่องด้านล่าง. $_CLICK",
	LicenseTextRB: "โปรดอ่านทวนเรื่องการยอมรับในลิขสิทธิ์ก่อนที่คุณจะทำการติดตั้ง $(^NameDA). ถ้าคุณยอมรับข้อตกลงในทุกๆด้าน, เลือกตัวเลือกแรกข้างล่าง. $_CLICK",
	UnLicenseText: "โปรดอ่านทวนเรื่องการยอมรับในลิขสิทธิ์ก่อนที่คุณจะทำการยกเลิกติดตั้ง $(^NameDA). ถ้าคุณยอมรับข้อตกลงในทุกๆด้าน, กด ฉันยอมรับ",
	UnLicenseTextCB: "โปรดอ่านทวนเรื่องการยอมรับในลิขสิทธิ์ก่อนที่คุณจะทำการยกเลิกติดตั้ง $(^NameDA). ถ้าคุณยอมรับข้อตกลงในทุกๆด้าน, กดเลือกที่กล่องด้านล่าง. $_CLICK",
	UnLicenseTextRB: "โปรดอ่านทวนเรื่องการยอมรับในลิขสิทธิ์ก่อนที่คุณจะทำการยกเลิกติดตั้ง $(^NameDA). ถ้าคุณยอมรับข้อตกลงในทุกๆด้าน, เลือกตัวเลือกแรกข้างล่าง. $_CLICK",
	Custom: "กำหนดเอง",
	ComponentsText: "เลื่อกสิ่งที่คุณต้องการติดตั้งและไม่เลือกสิ่งที่คุณไม่ต้องการติดตั้ง $_CLICK",
	ComponentsSubText1: "เลือกวิธีการการติดตั้ง:",
	ComponentsSubText2_NoInstTypes: "เลือกสิ่งที่คุณต้องการติดตั้ง:",
	ComponentsSubText2: "หรือ, เลือกตัวเลือกที่คุณต้องการติดตั้ง:",
	UnComponentsText: "เลือกตัวเลือกที่คุณต้องการจะยกเลิกการติดตั้งและไม่เลือกสิ่งที่คุณไม่ต้องการจะยกเลิกการติดตั้ง $_CLICK",
	UnComponentsSubText1: "เลือกวิธีการยกเลิกการติดตั้ง:",
	UnComponentsSubText2_NoInstTypes: "เลือกตัวเลือกที่ต้องการจะยกเลิกการติดตั้ง:",
	UnComponentsSubText2: "หรือ, เลือกจากตัวเลือกอื่นๆที่คุณต้องการจะยกเลิกการติดตั้ง:",
	DirText: "ตัวติดตั้งจะทำการติดตั้ง $(^NameDA) ลงในแฟ้มดังต่อไปนี้, ถ้าต้องการติดตั้งลงในแฟ้มอื่น, กด เรียกดูและเลือกแฟ้มอื่น $_CLICK",
	DirSubText: "แฟ้มที่ต้องการติดตั้ง",
	DirBrowseText: "เลือกแฟ้มที่ต้องการติดตั้ง $(^NameDA) ใน:",
	UnDirText: "ตัวติดตั้งจะทำการยกเลิกการติดตั้ง $(^NameDA) จากแฟ้มดังต่อไปนี้, ถ้าต้องการยกเลิกการติดตั้งจากแฟ้มอื่น, กด เรียกดู และเลือกแฟ้มอื่น $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "เลือกแฟ้มที่ต้องการยกเลิกการติดตั้ง $(^NameDA) จาก:",
	SpaceAvailable: "\"มีพื้นที่เหลือ: \"",
	SpaceRequired: "\"ต้องการพื้นที่: \"",
	UninstallingText: "$(^NameDA) จะถูกยกเลิกการติดตั้งจากแฟ้มต่อไปนี้. $_CLICK",
	UninstallingSubText: "ยกเลิกการติดตั้งจาก:",
	FileError: "ไม่สามารถเปิดไฟล์สำหรับเขียนได้: \\r\\n\\r\\n$0\\r\\n\\r\\nกด ยกเลิก เพื่อหยุดการติดตั้ง,\\r\\nลองอีกครั้ง เพื่อลองอีกครั้ง, หรือ\\r\\nเพิกเฉย เพื่อข้ามไฟล์นี้.",
	FileError_NoIgnore: "ไม่สามารถเปิดไฟล์สำหรับเขียนได้: \\r\\n\\r\\n$0\\r\\n\\r\\nกด ลองอีกครั้ง เพื่อลองอีกครั้ง, หรือ\\r\\nยกเลิกเพื่อหยุดการติดตั้ง",
	CantWrite: "\"ไม่สามารถเขียน: \"",
	CopyFailed: "คัดลอกผิดพลาด",
	CopyTo: "\"คัดลอกไปยัง \"",
	Registering: "\"กำลังลงทะเบียน: \"",
	Unregistering: "\"ยกเลิกการลงทะเบียน: \"",
	SymbolNotFound: "\"ไม่สามารถหาสัญลักษณ์ได้: \"",
	CouldNotLoad: "\"ไม่สามารถโหลดได้: \"",
	CreateFolder: "\"สร้างแฟ้ม: \"",
	CreateShortcut: "\"สร้างชอร์ตคัท: \"",
	CreatedUninstaller: "\"สร้างตัวยกเลิกการติดตั้ง: \"",
	Delete: "\"ลบไฟล์: \"",
	DeleteOnReboot: "\"ลบตอนรีบูท: \"",
	ErrorCreatingShortcut: "\"มีปัญหาสร้างไฟล์ชอร์ตคัท: \"",
	ErrorCreating: "\"มีปัญหาในการสร้างไฟล์: \"",
	ErrorDecompressing: "มีปัญหาในการคลายข้อมูล! เกิดข้อผิดพลาดจากตัวติดตั้ง?",
	ErrorRegistering: "มีปัญหาในการลงทะเบียน DLL",
	ExecShell: "\"รันเชลล์ไฟล์: \"",
	Exec: "\"รันไฟล์: \"",
	Extract: "\"แตกไฟล์: \"",
	ErrorWriting: "\"แตกไฟล์: เกิดปัญหาในการเขียนไฟล์\"",
	InvalidOpcode: "ตัวติดตั้งมีปัญหา: รหัส opcode ผิดพลาด",
	NoOLE: "\"ไม่มี OLE สำหรับ: \"",
	OutputFolder: "\"แฟ้มทีติดตั้ง: \"",
	RemoveFolder: "\"ลบแฟ้ม: \"",
	RenameOnReboot: "\"เปลี่ยนชื่อตอนรีบูท: \"",
	Rename: "\"เปลี่ยนชื่อ: \"",
	Skipped: "\"ข้าม: \"",
	CopyDetails: "คัดลอกรายละเอียดลงคลิปบอร์ด",
	LogInstall: "บันทึกการติดตั้ง",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Thai$1 = {
	header: header$Y,
	id: id$Y,
	font: font$Y,
	code_page: code_page$Y,
	rtl: rtl$Y,
	strings: strings$Y
};

var header$Z = "NLF v6";
var id$Z = 1028;
var font$Z = {
	name: "新細明體",
	size: 9
};
var code_page$Z = 950;
var rtl$Z = false;
var strings$Z = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) 安裝",
	UninstallCaption: "$(^Name) 解除安裝",
	LicenseSubCaption: ": 授權協議",
	ComponentsSubCaption: ": 安裝選項",
	DirSubCaption: ": 安裝資料夾",
	InstallingSubCaption: ": 正在安裝",
	CompletedSubCaption: ": 已完成",
	UnComponentsSubCaption: ": 解除安裝選項",
	UnDirSubCaption: ": 解除安裝資料夾",
	ConfirmSubCaption: ": 確認",
	UninstallingSubCaption: ": 正在解除安裝",
	UnCompletedSubCaption: ": 完成",
	BackBtn: "< 上一步(&B)",
	NextBtn: "下一步(&N) >",
	AgreeBtn: "我同意(&A)",
	AcceptBtn: "我接受「授權協議」的條款(&A)",
	DontAcceptBtn: "我不接受「授權協議」的條款(&D)",
	InstallBtn: "安裝(&I)",
	UninstallBtn: "解除安裝(&U)",
	CancelBtn: "取消",
	CloseBtn: "關閉(&C)",
	BrowseBtn: "瀏覽(&R)...",
	ShowDetailsBtn: "顯示細節(&D)",
	ClickNext: "按「下一步(N)」繼續。",
	ClickInstall: "按「安裝(I)」開始安裝。",
	ClickUninstall: "按「解除安裝(U)」開始解除安裝。",
	Name: "名稱",
	Completed: "已完成",
	LicenseText: "在安裝 $(^NameDA) 之前請檢閱授權協議。如果接受協議所有條款，按「我同意(A)」。",
	LicenseTextCB: "在安裝 $(^NameDA) 之前請檢閱授權協議。如果接受協議所有條款，按下方的勾選框。 $_CLICK",
	LicenseTextRB: "在安裝 $(^NameDA) 之前請檢閱授權協議。如果接受協議所有條款，選擇下方的第一個選項。 $_CLICK",
	UnLicenseText: "在解除安裝 $(^NameDA) 之前請檢閱授權協議。如果接受協議中所有條款，按「我同意(A)」。",
	UnLicenseTextCB: "在解除安裝 $(^NameDA) 之前請檢閱授權協議。如果接受協議中所有條款，按下方的勾選框。 $_CLICK",
	UnLicenseTextRB: "在解除安裝 $(^NameDA) 之前請檢閱授權協議。如果接受協議中所有條款，選擇的第一個選項。 $_CLICK",
	Custom: "自訂",
	ComponentsText: "勾選想要安裝的元件，並解除勾選不想安裝的元件。 $_CLICK",
	ComponentsSubText1: "選取安裝的類型: ",
	ComponentsSubText2_NoInstTypes: "選取安裝的元件: ",
	ComponentsSubText2: "又或者，自訂選取想安裝的元件: ",
	UnComponentsText: "勾選想要解除安裝的元件，並解除勾選不想解除安裝的元件。 $_CLICK",
	UnComponentsSubText1: "選取解除安裝的類型: ",
	UnComponentsSubText2_NoInstTypes: "選取要解除安裝的元件: ",
	UnComponentsSubText2: "又或者，選擇想要解除安裝的可選項元件: ",
	DirText: "安裝程式會將 $(^NameDA) 安裝在以下資料夾。要安裝到不同的資料夾，按「瀏覽(B)...」並選擇其他資料夾。 $_CLICK",
	DirSubText: "目標資料夾",
	DirBrowseText: "選取要安裝 $(^NameDA) 的資料夾: ",
	UnDirText: "安裝程式會自以下資料夾解除安裝 $(^NameDA) 。要解除安裝不同的資料夾，按「瀏覽(B)...」並選擇其他資料夾。 $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "選取要解除安裝 $(^NameDA) 的資料夾: ",
	SpaceAvailable: "\"可用空間: \"",
	SpaceRequired: "\"所需空間: \"",
	UninstallingText: "會自以下資料夾解除安裝 $(^NameDA) 。 $_CLICK",
	UninstallingSubText: "解除安裝目錄: ",
	FileError: "無法開啟要寫入的檔案: \\r\\n\\t\"$0\"\\r\\n按「中止」停止安裝，\\r\\n「重試」重新嘗試寫入檔案，或\\r\\n「忽略」略過此檔案。",
	FileError_NoIgnore: "無法開啟要寫入的檔案: \\r\\n\\t\"$0\"\\r\\n按「重試」重新嘗試寫入檔案，或\\r\\n「取消」停止安裝。",
	CantWrite: "\"無法寫入: \"",
	CopyFailed: "\"複製失敗 \"",
	CopyTo: "\"複製到: \"",
	Registering: "\"正在註冊: \"",
	Unregistering: "\"正在解除註冊: \"",
	SymbolNotFound: "\"無法找到符號: \"",
	CouldNotLoad: "\"無法載入: \"",
	CreateFolder: "\"建立資料夾: \" ",
	CreateShortcut: "\"建立捷徑: \"",
	CreatedUninstaller: "\"建立解除安裝程式: \"",
	Delete: "\"刪除檔案: \"",
	DeleteOnReboot: "\"重新開機後刪除: \"",
	ErrorCreatingShortcut: "\"建立捷徑時發生錯誤: \"",
	ErrorCreating: "\"建立時發生錯誤: \"",
	ErrorDecompressing: "\"解壓縮資料發生錯誤！安裝程式是否已損壞？\"",
	ErrorRegistering: "\"註冊 DLL 時發生錯誤\"",
	ExecShell: "\"執行殼層程式: \"",
	Exec: "\"執行: \"",
	Extract: "\"抽取: \"",
	ErrorWriting: "\"抽取: 無法寫入檔案 \"",
	InvalidOpcode: "\"安裝程式損毀: 無效的作業代碼 \"",
	NoOLE: "\"沒有 OLE 用於: \"",
	OutputFolder: "\"輸出資料夾: \"",
	RemoveFolder: "\"移除資料夾: \"",
	RenameOnReboot: "\"重新開機後重新命名: \"",
	Rename: "\"重新命名: \"",
	Skipped: "\"已略過: \"",
	CopyDetails: "\"複製細節到剪貼簿 \"",
	LogInstall: "\"將安裝進程記入日誌\"",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var TradChinese$1 = {
	header: header$Z,
	id: id$Z,
	font: font$Z,
	code_page: code_page$Z,
	rtl: rtl$Z,
	strings: strings$Z
};

var header$_ = "NLF v6";
var id$_ = 1055;
var font$_ = {
	name: null,
	size: null
};
var code_page$_ = 1254;
var rtl$_ = false;
var strings$_ = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) Kurulumu",
	UninstallCaption: "$(^Name) Kaldırma",
	LicenseSubCaption: ": Lisans Sözleşmesi",
	ComponentsSubCaption: ": Kurulum Seçenekleri",
	DirSubCaption: ": Kurulum Dizini",
	InstallingSubCaption: ": Kuruluyor",
	CompletedSubCaption: ": Tamamlandı",
	UnComponentsSubCaption: ": Kaldırma Seçenekleri",
	UnDirSubCaption: ": Kaldırılacak Dizin",
	ConfirmSubCaption: ": Onay",
	UninstallingSubCaption: ": Kaldırılıyor",
	UnCompletedSubCaption: ": Tamamlandı",
	BackBtn: "< &Geri",
	NextBtn: "İ&leri >",
	AgreeBtn: "&Katılıyorum",
	AcceptBtn: "Lisans Sözleşmesi'nin koşullarını &kabul ediyorum",
	DontAcceptBtn: "Lisans Sözleşmesi'nin koşullarını kabul et&miyorum",
	InstallBtn: "&Kur",
	UninstallBtn: "&Kaldır",
	CancelBtn: "Vazgeç",
	CloseBtn: "&Kapat",
	BrowseBtn: "&Gözat...",
	ShowDetailsBtn: "&Ayrıntıları göster",
	ClickNext: "Devam etmek için İleri düğmesine basın.",
	ClickInstall: "Kurulumu başlatmak için Kur düğmesine basın.",
	ClickUninstall: "Kaldırmayı başlatmak için Kaldır düğmesine basın.",
	Name: "Ad",
	Completed: "Tamamlandı",
	LicenseText: "Lütfen $(^NameDA) uygulamasını kurmadan önce lisans sözleşmesini gözden geçirin. Sözleşmedeki bütün koşulları kabul ediyorsanız Kabul Ediyorum düğmesine basın.",
	LicenseTextCB: "Lütfen $(^NameDA) uygulamasını kurmadan önce lisans sözleşmesini gözden geçirin. Sözleşmedeki bütün koşulları kabul ediyorsanız aşağıdaki kutuya işaret koyun. $_CLICK",
	LicenseTextRB: "Lütfen $(^NameDA) uygulamasını kurmadan önce lisans sözleşmesini gözden geçirin. Sözleşmedeki bütün koşulları kabul ediyorsanız aşağıdaki ilk seçeneği seçin. $_CLICK",
	UnLicenseText: "Lütfen $(^NameDA) uygulamasını kaldırmadan önce lisans sözleşmesini gözden geçirin. Sözleşmedeki bütün koşulları kabul ediyorsanız Kabul Ediyorum düğmesine basın.",
	UnLicenseTextCB: "Lütfen $(^NameDA) uygulamasını kaldırmadan önce lisans sözleşmesini gözden geçirin. Sözleşmedeki bütün koşulları kabul ediyorsanız aşağıdaki kutuya işaret koyun. $_CLICK",
	UnLicenseTextRB: "Lütfen $(^NameDA) uygulamasını kaldırmadan önce lisans sözleşmesini gözden geçirin. Sözleşmedeki bütün koşulları kabul ediyorsanız aşağıdaki ilk seçeneği seçin. $_CLICK",
	Custom: "Özel",
	ComponentsText: "Kurmak istediğiniz bileşenleri işaretleyip kurmak istemediklerinizi işaretlemeden bırakın. $_CLICK",
	ComponentsSubText1: "Kurulum türünü seçin:",
	ComponentsSubText2_NoInstTypes: "Kurulacak bileşenleri seçin:",
	ComponentsSubText2: "ya da isteğe bağlı olarak kurmak istediğiniz bileşenleri seçin:",
	UnComponentsText: "Kaldırmak istediğiniz bileşenleri işaretleyip kaldırmak istemediklerinizi işaretlemeden bırakın. $_CLICK",
	UnComponentsSubText1: "Kaldırma türünü seçin:",
	UnComponentsSubText2_NoInstTypes: "Kaldırılacak bileşenleri seçin:",
	UnComponentsSubText2: "ya da isteğe bağlı olarak kaldırmak istediğiniz bileşenleri seçin:",
	DirText: "$(^NameDA) aşağıdaki dizinde kurulacak. Farklı bir dizinde kurmak için Gözat düğmesine basıp başka bir dizin seçin. $_CLICK",
	DirSubText: "Hedef Dizin",
	DirBrowseText: "$(^NameDA) uygulamasının kurulacağı dizini seçin:",
	UnDirText: "$(^NameDA) aşağıdaki dizinden kaldırılacak. Farklı bir dizinden kaldırmak için Gözat düğmesine basıp başka bir dizin seçin. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "$(^NameDA) uygulamasının kaldırılacağı dizini seçin:",
	SpaceAvailable: "\"Kullanılabilir boş alan: \"",
	SpaceRequired: "\"Gereken boş alan: \"",
	UninstallingText: "$(^NameDA) aşağıdaki dizinden kaldırılacak. $_CLICK",
	UninstallingSubText: "Kaldırılan yer:",
	FileError: "Dosya yazmak için açılırken hata meydana geldi: \\r\\n\\r\\n$0\\r\\n\\r\\nKurulumu durdurmak için Dur düğmesine,\\r\\nyeniden denemek için Yeniden Dene düğmesine,\\r\\nbu dosyayı atlamak için Yoksay düğmesine basın.",
	FileError_NoIgnore: "Dosya yazmak için açılırken hata meydana geldi: \\r\\n\\r\\n$0\\r\\n\\r\\nYeniden denemek için Yeniden Dene düğmesine,\\r\\nkurulumu durdurmak için Vazgeç düğmesine basın.",
	CantWrite: "\"Yazılamadı: \"",
	CopyFailed: "Kopyalama başarısız oldu",
	CopyTo: "\"Kayıt: \"",
	Registering: "\"Kaydediliyor: \"",
	Unregistering: "\"Kayıt siliniyor: \"",
	SymbolNotFound: "\"Simge bulunamadı: \"",
	CouldNotLoad: "\"Yüklenemedi: \"",
	CreateFolder: "\"Dizin oluştur: \"",
	CreateShortcut: "\"Kısayol oluştur: \"",
	CreatedUninstaller: "\"Kaldırma uygulaması oluştur: \"",
	Delete: "\"Dosya sil: \"",
	DeleteOnReboot: "\"Açılışta sil: \"",
	ErrorCreatingShortcut: "\"Kısayol oluşturulurken hata meydana geldi: \"",
	ErrorCreating: "\"Oluşturma hatası: \"",
	ErrorDecompressing: "Veriyi açarken hata meydana geldi! Acaba kurulum uygulaması mı bozuk?",
	ErrorRegistering: "DLL kaydedilirken hata meydana geldi",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Çalıştır: \"",
	Extract: "\"Aç: \"",
	ErrorWriting: "\"Açma: Dosyaya yazarken hata meydana geldi \"",
	InvalidOpcode: "Kurulum bozuk: Geçersiz kod",
	NoOLE: "\"OLE yok: \"",
	OutputFolder: "\"Çıktı dizini: \"",
	RemoveFolder: "\"Dizini sil: \"",
	RenameOnReboot: "\"Açılışta adını değiştir: \"",
	Rename: "\"Ad değiştir: \"",
	Skipped: "\"Atlandı: \"",
	CopyDetails: "Ayrıntıları panoya kopyala",
	LogInstall: "Kurulum sürecinin kaydını tut",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Turkish$1 = {
	header: header$_,
	id: id$_,
	font: font$_,
	code_page: code_page$_,
	rtl: rtl$_,
	strings: strings$_
};

var header$$ = "NLF v6";
var id$$ = 1058;
var font$$ = {
	name: null,
	size: null
};
var code_page$$ = 1251;
var rtl$$ = false;
var strings$$ = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "$(^Name) Встановлення",
	UninstallCaption: "$(^Name) Видалення",
	LicenseSubCaption: ": Ліцензійна угода",
	ComponentsSubCaption: ": Опції встановлення",
	DirSubCaption: ": Тека встановлення",
	InstallingSubCaption: ": Копіювання файлів",
	CompletedSubCaption: ": Завершено",
	UnComponentsSubCaption: ": Опції видалення",
	UnDirSubCaption: ": Тека видалення",
	ConfirmSubCaption: ": Підтверждення",
	UninstallingSubCaption: ": Видалення файлів",
	UnCompletedSubCaption: ": Завершено",
	BackBtn: "< &Назад",
	NextBtn: "&Далі >",
	AgreeBtn: "&Згоден",
	AcceptBtn: "Я &приймаю умови Ліцензійної угоди",
	DontAcceptBtn: "Я &не приймаю умови Ліцензійної угоди",
	InstallBtn: "&Встановити",
	UninstallBtn: "Видалити",
	CancelBtn: "Скасувати",
	CloseBtn: "&Закрити",
	BrowseBtn: "О&гляд...",
	ShowDetailsBtn: "Подробиці",
	ClickNext: "Натисніть Далі щоб продовжити",
	ClickInstall: "Натисніть Встановити для початку процессу встановлення",
	ClickUninstall: "Натисніть Видалить для початку процессу видалення",
	Name: "Ім'я",
	Completed: "Завершено",
	LicenseText: "Прочитайте умови ліцензійної угоди перед встановленням $(^NameDA). Якщо Ви приймаєте умови угоди, натисніть на кнопку Згоден.",
	LicenseTextCB: "Прочитайте умови ліцензійної угоди перед встановленням $(^NameDA). Якщо Ви приймаєте умови угоди, встановіть відмітку у квадратику нижче. $_CLICK",
	LicenseTextRB: "Прочитайте умови ліцензійної угоди перед встановленням $(^NameDA). Якщо Ви приймаєте умови угоди, виберіть перший варіант. $_CLICK",
	UnLicenseText: "Прочитайте умови ліцензійної угоди перед встановленням $(^NameDA). Якщо Ви приймаєте умови ліцензійної угоди, натисніть на кнопку Згоден.",
	UnLicenseTextCB: "Прочитайте умови ліцензійної угоди перед встановленням $(^NameDA). Якщо Ви приймаєте умови угоди, встановіть відмітку у квадратику нижче. $_CLICK",
	UnLicenseTextRB: "Прочитайте умови ліцензійної угоди перед видаленням $(^NameDA). Якщо Ви приймаєте умови угоди, виберіть перший варіант. $_CLICK",
	Custom: "По вибору",
	ComponentsText: "Виберіть які компоненти програми Ви бажаєте встановити. $_CLICK",
	ComponentsSubText1: "Виберіть тип встановлення:",
	ComponentsSubText2_NoInstTypes: "Виберіть компоненти для встановлення:",
	ComponentsSubText2: "Чи, виберіть вручну компоненти, які Ви хочете встановити:",
	UnComponentsText: "Виберіть які компоненти Ви бажаєте видалити. Відмітьте компоненти для видалення і зніміть відмітку з тих, які Ви видаляти не бажаєте. $_CLICK",
	UnComponentsSubText1: "Виберіть тип видалення:",
	UnComponentsSubText2_NoInstTypes: "Вибір компонентів для видалення:",
	UnComponentsSubText2: "Чи виберіть компоненти програми для видалення по своєму бажанні:",
	DirText: "Программа встановить $(^NameDA) у вказану теку. Для того, щоб встановити программу в іншу теку, натисніть Огляд і вкажіть потрібну теку. $_CLICK",
	DirSubText: "Каталог призначення",
	DirBrowseText: "Виберіть теку для встановлення $(^NameDA):",
	UnDirText: "Программа встановлення видалить $(^NameDA) із вказанної теки. Для того, щоб провести видалення з іншої теки, натисніть Огляд і вкажіть потрібну теку. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Виберіть теку, з якої Ви бажаєте видалити $(^NameDA):",
	SpaceAvailable: "\"Доступно місця: \"",
	SpaceRequired: "\"Необхідно місця: \"",
	UninstallingText: "$(^NameDA) буде видаленно з вказаного каталогу. $_CLICK",
	UninstallingSubText: "Видалення з:",
	FileError: "Неможливо відкрити файл для запису: \\r\\n\\t\"$0\"\\r\\nНатисніть Перервати для того, щоб перервати встановлення,\\r\\nПовторити для того, щоб повторити спробу запису у файл, чи\\r\\nІгнорувати для того, щоб пропустити цю дію",
	FileError_NoIgnore: "Неможливо відкрити файл для запису: \\r\\n\\t\"$0\"\\r\\nНатисніть Повторити для того, щоб повторити спробу запису у файл, чи\\r\\nСкасувати для того, щоб перервати встановлення",
	CantWrite: "\"Неможливо записати: \"",
	CopyFailed: "Не вдалося копіювати",
	CopyTo: "\"Копіювання в \"",
	Registering: "\"Реєстрація: \"",
	Unregistering: "\"Видалення реєстрації: \"",
	SymbolNotFound: "\"Неможливо знайти символ: \"",
	CouldNotLoad: "\"Неможливо завантажити: \"",
	CreateFolder: "\"Створення теки: \"",
	CreateShortcut: "\"Створення ярлика: \"",
	CreatedUninstaller: "\"Створення програми видалення: \"",
	Delete: "\"Видалення файлу: \"",
	DeleteOnReboot: "\"Видалення після перезавантаження: \"",
	ErrorCreatingShortcut: "\"Помилка створення ярлика: \"",
	ErrorCreating: "\"Помилка створення: \"",
	ErrorDecompressing: "Неможливо витягнути дані. Можливо пошкоджений дистрибутив.",
	ErrorRegistering: "Неможливо зареєструвати бібліотеку (DLL)",
	ExecShell: "\"Виконання команди оболонки: \"",
	Exec: "\"Виконання: \"",
	Extract: "\"Витягнення: \"",
	ErrorWriting: "\"Витягнення: помилка запису файла\"",
	InvalidOpcode: "Дистрибутив пошкоджений: помилковий код відповіді",
	NoOLE: "\"Немає OLE для: \"",
	OutputFolder: "\"Тека призначення: \"",
	RemoveFolder: "\"Видалення теки: \"",
	RenameOnReboot: "\"Переіменування після перезаванаження: \"",
	Rename: "\"Перейменування: \"",
	Skipped: "\"Пропущено: \"",
	CopyDetails: "Копіювати деталі у буфер обміну",
	LogInstall: "Записувати в лог процес встновлення",
	Byte: "б",
	Kilo: " К",
	Mega: " М",
	Giga: " Г"
};
var Ukrainian$1 = {
	header: header$$,
	id: id$$,
	font: font$$,
	code_page: code_page$$,
	rtl: rtl$$,
	strings: strings$$
};

var header$10 = "NLF v6";
var id$10 = 1091;
var font$10 = {
	name: null,
	size: null
};
var code_page$10 = 1252;
var rtl$10 = false;
var strings$10 = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "O'rnatish $(^Name)",
	UninstallCaption: "O'chirish $(^Name)",
	LicenseSubCaption: ": Lisenzion kelishuv",
	ComponentsSubCaption: ": O'rnatish parametrlari ",
	DirSubCaption: ": O'rnatish papkasi",
	InstallingSubCaption: ": Fayllarni kopiya qilish",
	CompletedSubCaption: ": Operatsiya yakunlandi",
	UnComponentsSubCaption: ": O'chirish parametrlari",
	UnDirSubCaption: ": O'chirsh papkasi",
	ConfirmSubCaption: ": Tasdiqlash",
	UninstallingSubCaption: ": Fayllarni o'chirish",
	UnCompletedSubCaption: ": Operatsiya yakunlandi",
	BackBtn: "< &Orqaga",
	NextBtn: "&Oldinga >",
	AgreeBtn: "&Qabul qilaman",
	AcceptBtn: "Men &kelishuv shartlarini qabul qilaman",
	DontAcceptBtn: "Men &kelishuv shartlarini qabul qilmayman",
	InstallBtn: "&O'rnatish",
	UninstallBtn: "&O'chirish",
	CancelBtn: "Bekor qilish",
	CloseBtn: "&Yopish",
	BrowseBtn: "&Ko'rish ...",
	ShowDetailsBtn: "&Äåòàëè...",
	ClickNext: "Davom etish uchun 'Oldinga'tugmachasini bosing.",
	ClickInstall: "Dasturni o'rnatish uchun'O'rnatish' tugmachasini bosing.",
	ClickUninstall: "Dasturni o'chirish uchun 'O'chirsh' tugmachasini bosing.",
	Name: "Ism",
	Completed: "Tayor",
	LicenseText: "$(^NameDA)ni o'rnatishdan oldin lisenzion kelishuv bilan tanishib oling. Kelishuv shartlarini qabul qilsangiz 'Qabul qilaman' tugmachasini bosing.",
	LicenseTextCB: "$(^NameDA)ni o'rnatishdan oldin lisenzion kelishuv bilan tanishib oling. Kelishuv shartlarini qabul qilsangiz bayroqchani joylashtiring. $_CLICK",
	LicenseTextRB: "$(^NameDA)ni o'rnatishdan oldin lisenzion kelishuv bilan tanishib oling. Kelishuv shartlarini qabul qilsangiz quyida taklif etilganlardan birinchi variantni tanlang. $_CLICK",
	UnLicenseText: "$(^NameDA)ni o'rnatishdan oldin lisenzion kelishuv bilan tanishib oling. Kelishuv shartlarini qabul qilsangiz 'Qabul qilaman' tugmachasini bosing.",
	UnLicenseTextCB: "$(^NameDA)ni o'rnatishdan oldin lisenzion kelishuv bilan tanishib oling. Kelishuv shartlarini qabul qilsangiz bayroqchani joylashtiring. $_CLICK",
	UnLicenseTextRB: "$(^NameDA)ni o'rnatishdan oldin lisenzion kelishuv bilan tanishib oling. Kelishuv shartlarini qabul qilsangiz quyida taklif etilganlardan birinchi variantni tanlang. $_CLICK",
	Custom: "Tanlash bo'icha",
	ComponentsText: "O'rnatish ucun dastur komponentlarini tanlang. $_CLICK",
	ComponentsSubText1: "O'rnatish jarayonini tanlang:",
	ComponentsSubText2_NoInstTypes: "O'rnatish uchun dastur komponentlarini tanlang:",
	ComponentsSubText2: "Yoki o'rnatish uchun qushimcha komponentlarini tanlang:",
	UnComponentsText: "O'chirish uchun dastur komponentlarini tanlang. $_CLICK",
	UnComponentsSubText1: "O'chirish jarayonini tanlang:",
	UnComponentsSubText2_NoInstTypes: "O'chirish uchun dastur komponentlarini tanlang:",
	UnComponentsSubText2: "Yoki o'chirish uchun qushimcha komponentlarini tanlang:",
	DirText: "Dastur $(^NameDA)ni ko'rsatilgan papkaga o'rnatadi. Boshqa papkaga o'rnatish uchun, 'Ko'rish'tugmachasini bosing va uni ko'rsatib bering. $_CLICK",
	DirSubText: "O'rnatish papkasi",
	DirBrowseText: "O'rnatish papkasini ko'rsating $(^NameDA):",
	UnDirText: "Dastur $(^NameDA)ni ko'rsatilgan papkadan o'chiradi. Boshqa papkaga o'rnatish uchun, 'Ko'rish'tugmachasini bosing va uni ko'rsatib bering. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "$(^NameDA)ni o'chirish uchun papkani ko'rsating:",
	SpaceAvailable: "\"Diskda joriy qilingan: \"",
	SpaceRequired: "\"Diskda talab qilinadigan: \"",
	UninstallingText: "$(^NameDA) dasturi kompyuterizdan uchiriladi. $_CLICK",
	UninstallingSubText: "O'chirilish:",
	FileError: "Yozish uchun faylni ochish imkoniyati yuq: \\r\\n\\t\"$0\"\\r\\n'Tuxtashish': O'rnatishni tuxtatish;\\r\\n\"Takrorlash\":yana bir o'rinib ko'rish;\\r\\n\"Taylab ketish\": shu xarakatni taylab ketish.",
	FileError_NoIgnore: "Yozish uchun faylni ochish imkoniyati yuq: \\r\\n\\t\"$0\"\\r\\n'Takrorlash': yana bir o'rinib ko'rish;\\r\\n'Bekor qilish': o'rnatish protsessini bekor qilish.",
	CantWrite: "\"Yozish uchun imkoniyat yuq: \"",
	CopyFailed: "Kopiya qilganda xato bor",
	CopyTo: "\"Kopiya qilish \"",
	Registering: "\"Ro'yxatga olish: \"",
	Unregistering: "\"Ro'xatdan chiqish: \"",
	SymbolNotFound: "\"Simvolni topish imkoniyati yuq: \"",
	CouldNotLoad: "\"Zagruzka qilish imkoniyati yuq: \"",
	CreateFolder: "\"Papkani yaratish: \"",
	CreateShortcut: "\"Belgini yaratish: \"",
	CreatedUninstaller: "\"O'chirish dasturini yaratish: \"",
	Delete: "\"Faylni o'chirish: \"",
	DeleteOnReboot: "\"Kompyuter qayta yuklash jaraonida o'chirish: \"",
	ErrorCreatingShortcut: "\"Belgini yaratish jarayonida xato: \" ",
	ErrorCreating: "\"Yaratish xatosi: \"",
	ErrorDecompressing: "Ma'lumotlarni asilga qaytarish xatosi! Distributiv ziyonlangan bulishi mumkin.",
	ErrorRegistering: "Kutubxonani ro'xatga olish imkoniyati yuq (DLL)",
	ExecShell: "\"Qoplang'ich komandasini bajarish: \" ",
	Exec: "\"Bajarish: \"",
	Extract: "\"Ichidan olish: \"",
	ErrorWriting: "\"Ichidan olish: fayl yozish xatosi \"",
	InvalidOpcode: "Distributiv ziyonlangan: ruxsatlanmangan kod",
	NoOLE: "\"Quydagilarga OLE yuq: \" ",
	OutputFolder: "\"Papkani o'rnatish: \"",
	RemoveFolder: "\"Papkani o'chirish: \"",
	RenameOnReboot: "\"Kompyuter qayta yuklanish jarayonida ismni qaita quyish: \"",
	Rename: "\"Ismni qayta quyish: \"",
	Skipped: "\"O'tkazib yuborish: \"",
	CopyDetails: "Bufer obmenaga ma'lumotlarni kopiya qilish",
	LogInstall: "O'rnatish xisobotini chiqorish",
	Byte: "áàéò",
	Kilo: " Ê",
	Mega: " Ì",
	Giga: " Ã"
};
var Uzbek$1 = {
	header: header$10,
	id: id$10,
	font: font$10,
	code_page: code_page$10,
	rtl: rtl$10,
	strings: strings$10
};

var header$11 = "NLF v6";
var id$11 = 1066;
var font$11 = {
	name: null,
	size: null
};
var code_page$11 = 1258;
var rtl$11 = false;
var strings$11 = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Cài đặt $(^Name)",
	UninstallCaption: "Gỡ bỏ $(^Name)",
	LicenseSubCaption: ": Thỏa thuận Giấy phép",
	ComponentsSubCaption: ": Tùy chọn Cài đặt",
	DirSubCaption: ": Thư mục Cài đặt",
	InstallingSubCaption: ": Cài đặt",
	CompletedSubCaption: ": Hoàn thành",
	UnComponentsSubCaption: ": Tùy chọn Gỡ bỏ",
	UnDirSubCaption: ": Thư mục Gỡ bỏ",
	ConfirmSubCaption: ": Xác nhận",
	UninstallingSubCaption: ": Gỡ bỏ",
	UnCompletedSubCaption: ": Hoàn thành",
	BackBtn: "< &Lùi",
	NextBtn: "&Tiến >",
	AgreeBtn: "Tô&i đồng ý",
	AcceptBtn: "Tô&i chấp thuận các điều khoản của Thỏa thuận Giấy phép",
	DontAcceptBtn: "Tôi &không chấp thuận các điều khoản của Thỏa thuận Giấy phép",
	InstallBtn: "&Cài đặt",
	UninstallBtn: "&Gỡ bỏ",
	CancelBtn: "Hủy bỏ",
	CloseBtn: "Đón&g",
	BrowseBtn: "Du&yệt...",
	ShowDetailsBtn: "&Hiện chi tiết",
	ClickNext: "Nhấn Tiến để tiếp tục.",
	ClickInstall: "Nhấn “Cài đặt” để bắt đầu việc cài đặt.",
	ClickUninstall: "Nhấn “Gỡ bỏ” để bắt đầu việc gỡ bỏ.",
	Name: "Tên",
	Completed: "Hoàn thành",
	LicenseText: "Vui lòng xem xét thỏa thuận giấy phép trước khi cài đặt $(^NameDA). Nếu bạn chấp thuận tất cả các điều khoản của thỏa thuận, hãy nhấn “Tôi đồng ý”.",
	LicenseTextCB: "Vui lòng xem xét thỏa thuận giấy phép trước khi cài đặt $(^NameDA). Nếu bạn chấp thuận tất cả các điều khoản của thỏa thuận, hãy nhấn ô bên dưới. $_CLICK",
	LicenseTextRB: "Vui lòng xem xét thỏa thuận giấy phép trước khi cài đặt $(^NameDA). Nếu bạn chấp thuận tất cả các điều khoản của thỏa thuận, hãy chọn ô đầu tiên bên dưới. $_CLICK",
	UnLicenseText: "Vui lòng xem xét thỏa thuận giấy phép trước khi gỡ bỏ $(^NameDA). Nếu bạn chấp thuận tất cả các điều khoản của thỏa thuận, hãy nhấn “Tôi đồng ý”.",
	UnLicenseTextCB: "Vui lòng xem xét thỏa thuận giấy phép trước khi gỡ bỏ $(^NameDA). Nếu bạn chấp thuận tất cả các điều khoản của thỏa thuận, hãy nhấn ô bên dưới. $_CLICK",
	UnLicenseTextRB: "Vui lòng xem xét thỏa thuận giấy phép trước khi gỡ bỏ $(^NameDA). Nếu bạn chấp thuận tất cả các điều khoản của thỏa thuận, hãy chọn ô đầu tiên bên dưới. $_CLICK",
	Custom: "Tùy biến",
	ComponentsText: "Chọn thành phần mà bạn muốn cài đặt và không chọn các thành phần mà bạn không muốn cài đặt. $_CLICK",
	ComponentsSubText1: "Chọn kiểu cài đặt:",
	ComponentsSubText2_NoInstTypes: "Chọn thành phần để cài đặt:",
	ComponentsSubText2: "Hoặc, chọn thành phần phụ mà bạn muốn cài đặt:",
	UnComponentsText: "Chọn thành phần mà bạn muốn gỡ bỏ và không chọn các thành phần mà bạn không muốn gỡ bỏ. $_CLICK",
	UnComponentsSubText1: "Chọn kiểu gỡ bỏ:",
	UnComponentsSubText2_NoInstTypes: "Chọn thành phần để gỡ bỏ:",
	UnComponentsSubText2: "Hoặc, chọn thành phần phụ mà bạn muốn gỡ bỏ:",
	DirText: "Trình trợ lí sẽ cài đặt $(^NameDA) vào thư mục sau. Để cài đặt vào một thư mục khác, hãy nhấn Duyệt để chọn thư mục. $_CLICK",
	DirSubText: "Thư mục đích",
	DirBrowseText: "Chọn thư mục để cài đặt $(^NameDA):",
	UnDirText: "Trình trợ lí sẽ gỡ bỏ $(^NameDA) khỏi thư mục sau. Để gỡ bỏ khỏi một thư mục khác, hãy nhấn Duyệt để chọn thư mục. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Chọn thư mục để gỡ bỏ $(^NameDA):",
	SpaceAvailable: "\"Dung lượng hiện có: \"",
	SpaceRequired: "\"Dung lượng yêu cầu: \"",
	UninstallingText: "$(^NameDA) sẽ bị gỡ bỏ khỏi thư mục sau. $_CLICK",
	UninstallingSubText: "Đang gỡ bỏ khỏi:",
	FileError: "Lỗi khi mở tập tin để ghi: \\r\\n\\r\\n$0\\r\\n\\r\\nNhấn “Hủy bỏ” để ngừng việc cài đặt,\\r\\n“Thử lại” để thử lần nữa, hoặc\\r\\n“Bỏ qua” để bỏ qua tập tin này.",
	FileError_NoIgnore: "Lỗi khi mở tập tin để ghi: \\r\\n\\r\\n$0\\r\\n\\r\\nNhấn “Thử lại” để thử lần nữa, hoặc\\r\\n“Hủy bỏ” để ngừng việc cài đặt.",
	CantWrite: "\"Không thể ghi: \"",
	CopyFailed: "Sao chép bị thất bại",
	CopyTo: "\"Sao chép vào \"",
	Registering: "\"Đang đăng kí: \"",
	Unregistering: "\"Đang hủy đăng kí: \"",
	SymbolNotFound: "\"Không thể tìm thấy biểu tượng: \"",
	CouldNotLoad: "\"Không thể nạp: \"",
	CreateFolder: "\"Tạo thư mục: \"",
	CreateShortcut: "\"Tạo lối tắt: \"",
	CreatedUninstaller: "\"Tạo trình gỡ bỏ: \"",
	Delete: "\"Xóa tập tin: \"",
	DeleteOnReboot: "\"Xóa khi khởi động lại: \"",
	ErrorCreatingShortcut: "\"Lỗi khi tạo lối tắt: \"",
	ErrorCreating: "\"Lỗi khi tạo: \"",
	ErrorDecompressing: "Lỗi khi giải nén dữ liệu! Có thể trình cài đặt đã bị hỏng?",
	ErrorRegistering: "Lỗi khi đăng kí DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Thực thi: \"",
	Extract: "\"Trích xuất: \"",
	ErrorWriting: "\"Trích xuất: lôi khi ghi vào tập tin \"",
	InvalidOpcode: "Trình cài đặt bị hỏng: mã tác vụ bất hợp lệ",
	NoOLE: "\"Không có OLE cho: \"",
	OutputFolder: "\"Thư mục đầu ra: \"",
	RemoveFolder: "\"Xóa thư mục: \"",
	RenameOnReboot: "\"Đổi tên khi khởi động lại: \"",
	Rename: "\"Đổi tên: \"",
	Skipped: "\"Đã bỏ qua: \"",
	CopyDetails: "Sao chép Chi tiết vào Clipboard",
	LogInstall: "Lưu kí quá trình cài đặt",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Vietnamese$1 = {
	header: header$11,
	id: id$11,
	font: font$11,
	code_page: code_page$11,
	rtl: rtl$11,
	strings: strings$11
};

var header$12 = "NLF v6";
var id$12 = 1106;
var font$12 = {
	name: null,
	size: null
};
var code_page$12 = 1252;
var rtl$12 = false;
var strings$12 = {
	Branding: "Nullsoft Install System %s",
	SetupCaption: "Rhaglen Osod $(^Name)",
	UninstallCaption: "Rhaglen Dadosod $(^Name)",
	LicenseSubCaption: ": Cytundeb Trwyddedu",
	ComponentsSubCaption: ": Dewisiadau Gosod",
	DirSubCaption: ": Ffolder Gosod",
	InstallingSubCaption: ": Gosod",
	CompletedSubCaption: ": Cwblhawyd",
	UnComponentsSubCaption: ": Dewisiadau Dadosod",
	UnDirSubCaption: ": Ffolder Dadosod",
	ConfirmSubCaption: ": Cadarnhad",
	UninstallingSubCaption: ": Dadosod",
	UnCompletedSubCaption: ": Cwblhawyd",
	BackBtn: "< &Nôl",
	NextBtn: "&Nesaf >",
	AgreeBtn: "&Cytuno",
	AcceptBtn: "Rwy'n &derbyn Amodau'r Drwydded",
	DontAcceptBtn: "Rwy'n &gwrthod Amodau'r Drwydded",
	InstallBtn: "&Gosod",
	UninstallBtn: "&Dadosod",
	CancelBtn: "Diddymu",
	CloseBtn: "C&au",
	BrowseBtn: "&Pori...",
	ShowDetailsBtn: "&Dangos manylion",
	ClickNext: "Cliciwch Nesaf i barhau.",
	ClickInstall: "Cliciwch Gosod i gychwyn gosod.",
	ClickUninstall: "Cliciwch Dadosod i gychwyn dadosod.",
	Name: "Enw",
	Completed: "Cwblhawyd",
	LicenseText: "Darllenwch y cytundeb trwyddedu cyn gosod $(^NameDA). Os ydych yn derbyn holl amodau'r cytundeb, cliciwch Cytuno.",
	LicenseTextCB: "Darllenwch y cytundeb trwyddedu cyn gosod $(^NameDA). Os ydych yn derbyn holl amodau'r cytundeb, cliciwch y blwch ticio isod. $_CLICK",
	LicenseTextRB: "Darllenwch y cytundeb trwyddedu cyn gosod $(^NameDA). Os ydych yn derbyn holl amodau'r cytundeb, ticiwch y dewis cyntaf isod. $_CLICK",
	UnLicenseText: "Darllenwch y cytundeb trwyddedu cyn dadosod $(^NameDA). Os ydych yn derbyn holl amodau'r cytundeb, cliciwch Cytuno.",
	UnLicenseTextCB: "Darllenwch y cytundeb trwyddedu cyn dadosod $(^NameDA). Os ydych yn derbyn holl amodau'r cytundeb, cliciwch y blwch ticio isod. $_CLICK",
	UnLicenseTextRB: "Darllenwch y cytundeb trwyddedu cyn dadosod $(^NameDA). Os ydych yn derbyn holl amodau'r cytundeb, ticiwch y dewis cyntaf isod. $_CLICK",
	Custom: "Addasu",
	ComponentsText: "Ticiwch y cydrannau rydych am eu gosod a dad-dicio'r cydrannau nad ydych am eu gosod. $_CLICK",
	ComponentsSubText1: "Dewis y math o osod:",
	ComponentsSubText2_NoInstTypes: "Dewis cydrannau i'w gosod:",
	ComponentsSubText2: "Neu, ddewis y cydrannau ychwanegol i'w gosod:",
	UnComponentsText: "Ticiwch y cydrannau rydych am eu dadosod a dad-dicio'r cydrannau nad ydych am eu dadosod. $_CLICK",
	UnComponentsSubText1: "Dewis y math o ddadosod:",
	UnComponentsSubText2_NoInstTypes: "Dewis cydrannau i'w dadosod:",
	UnComponentsSubText2: "Neu, ddewis y cydrannau ychwanegol i'w dadosod:",
	DirText: "Bydd y Rhaglen Osod yn gosod $(^NameDA) yn y ffolder canlynol. I'w osod mewn ffolder gwahanol, cliciwch Pori a dewis ffolder arall. $_CLICK",
	DirSubText: "Ffolder Cyrchfan",
	DirBrowseText: "Dewis y ffolder i osod $(^NameDA) ynddo:",
	UnDirText: "Bydd y Rhegen Osod yn dadosod $(^NameDA) o'r ffolder canlynol. I ddadosod o ffolder gwahanol, cliciwch Pori a dewis ffolder arall. $_CLICK",
	UnDirSubText: "\"\"",
	UnDirBrowseText: "Dewis ffolder i ddadosod $(^NameDA) ohono:",
	SpaceAvailable: "\"Lle ar gael: \"",
	SpaceRequired: "\"Lle angenrheidiol: \"",
	UninstallingText: "Bydd $(^NameDA) yn cael ei ddadosod o'r ffolder canlynol. $_CLICK",
	UninstallingSubText: "Dadosod o:",
	FileError: "Gwall agor ffeil i'w hysgrifennu: \\r\\n\\r\\n$0\\r\\n\\r\\nCliciwch Atal i atal y gosod,\\r\\nEto i geisio eto, neu\\r\\nAnwybyddu i hepgor y ffeil.",
	FileError_NoIgnore: "Gwall agor ffeil i'w hysgrifennu: \\r\\n\\r\\n$0\\r\\n\\r\\nCliciwch Eto i geisio eto, neu\\r\\nDiddymu i atal y gosod.",
	CantWrite: "\"Methu ysgrifennu: \"",
	CopyFailed: "Methu Copïo",
	CopyTo: "\"Copïo i \"",
	Registering: "\"Cofrestru: \"",
	Unregistering: "\"Dadgofrestru: \"",
	SymbolNotFound: "\"Methu canfod symbol: \"",
	CouldNotLoad: "\"Methu llwytho: \"",
	CreateFolder: "\"Creu ffolder: \"",
	CreateShortcut: "\"Creu llwybr byr: \"",
	CreatedUninstaller: "\"Creu dadosodwr: \"",
	Delete: "\"Dileu ffeil: \"",
	DeleteOnReboot: "\"Dileu wrth ailgychwyn: \"",
	ErrorCreatingShortcut: "\"Gwall wrth greu llwybr byr: \"",
	ErrorCreating: "\"Gwall wrth greu: \"",
	ErrorDecompressing: "Gwall wrth ddatgywasgu data! Gosodwr llwgr?",
	ErrorRegistering: "Gwall cofrestru DLL",
	ExecShell: "\"ExecShell: \"",
	Exec: "\"Gweithredu: \"",
	Extract: "\"Echdynnu: \"",
	ErrorWriting: "\"Echdynnu: gwall ysgrifennu i ffeil \"",
	InvalidOpcode: "Gosodwr llwgr: opcode annilys",
	NoOLE: "\"Dim OLE ar gyfer: \"",
	OutputFolder: "\"Ffolder allbwn: \"",
	RemoveFolder: "\"Tynnu ffolder: \"",
	RenameOnReboot: "\"Ailenwi wrth ailgychwyn: \"",
	Rename: "\"Ailenwi: \"",
	Skipped: "\"Hepgor: \"",
	CopyDetails: "Copïo Manylion i'r Clipfwrdd",
	LogInstall: "Cofnodi'r brosed gosod",
	Byte: "B",
	Kilo: " K",
	Mega: " M",
	Giga: " G"
};
var Welsh$1 = {
	header: header$12,
	id: id$12,
	font: font$12,
	code_page: code_page$12,
	rtl: rtl$12,
	strings: strings$12
};

var languageData = createCommonjsModule(function (module) {
/**
 * Language Meta Data
 */


module.exports.meta = meta;

/**
 * Language Data
 */




































































const languages = {
  Afrikaans: Afrikaans$1,
  Albanian: Albanian$1,
  Arabic: Arabic$1,
  Armenian: Armenian$1,
  Asturian: Asturian$1,
  Basque: Basque$1,
  Belarusian: Belarusian$1,
  Bosnian: Bosnian$1,
  Breton: Breton$1,
  Bulgarian: Bulgarian$1,
  Catalan: Catalan$1,
  Corsican: Corsican$1,
  Croatian: Croatian$1,
  Czech: Czech$1,
  Danish: Danish$1,
  Dutch: Dutch$1,
  English: English$1,
  Esperanto: Esperanto$1,
  Estonian: Estonian$1,
  Farsi: Farsi$1,
  Finnish: Finnish$1,
  French: French$1,
  Galician: Galician$1,
  Georgian: Georgian$1,
  German: German$1,
  Greek: Greek$1,
  Hebrew: Hebrew$1,
  Hindi: Hindi$1,
  Hungarian: Hungarian$1,
  Icelandic: Icelandic$1,
  Indonesian: Indonesian$1,
  Irish: Irish$1,
  Italian: Italian$1,
  Japanese: Japanese$1,
  Korean: Korean$1,
  Kurdish: Kurdish$1,
  Latvian: Latvian$1,
  Lithuanian: Lithuanian$1,
  Luxembourgish: Luxembourgish$1,
  Macedonian: Macedonian$1,
  Malay: Malay$1,
  Mongolian: Mongolian$1,
  Norwegian: Norwegian$1,
  NorwegianNynorsk: NorwegianNynorsk$1,
  Pashto: Pashto$1,
  Polish: Polish$1,
  Portuguese: Portuguese$1,
  PortugueseBR: PortugueseBR$1,
  Romanian: Romanian$1,
  Russian: Russian$1,
  ScotsGaelic: ScotsGaelic$1,
  Serbian: Serbian$1,
  SerbianLatin: SerbianLatin$1,
  SimpChinese: SimpChinese$1,
  Slovak: Slovak$1,
  Slovenian: Slovenian$1,
  Spanish: Spanish$1,
  SpanishInternational: SpanishInternational$1,
  Swedish: Swedish$1,
  Tatar: Tatar$1,
  Thai: Thai$1,
  TradChinese: TradChinese$1,
  Turkish: Turkish$1,
  Ukrainian: Ukrainian$1,
  Uzbek: Uzbek$1,
  Vietnamese: Vietnamese$1,
  Welsh: Welsh$1
};

module.exports.languages;

module.exports = {
  languages,
  meta
};

/**
 * Shortcuts
 */
module.exports.Afrikaans = Afrikaans$1;
module.exports.Albanian = Albanian$1;
module.exports.Arabic = Arabic$1;
module.exports.Armenian = Armenian$1;
module.exports.Asturian = Asturian$1;
module.exports.Basque = Basque$1;
module.exports.Belarusian = Belarusian$1;
module.exports.Bosnian = Bosnian$1;
module.exports.Breton = Breton$1;
module.exports.Bulgarian = Bulgarian$1;
module.exports.Catalan = Catalan$1;
module.exports.Corsican = Corsican$1;
module.exports.Croatian = Croatian$1;
module.exports.Czech = Czech$1;
module.exports.Danish = Danish$1;
module.exports.Dutch = Dutch$1;
module.exports.English = English$1;
module.exports.Esperanto = Esperanto$1;
module.exports.Estonian = Estonian$1;
module.exports.Farsi = Farsi$1;
module.exports.Finnish = Finnish$1;
module.exports.French = French$1;
module.exports.Galician = Galician$1;
module.exports.Georgian = Georgian$1;
module.exports.German = German$1;
module.exports.Greek = Greek$1;
module.exports.Hebrew = Hebrew$1;
module.exports.Hindi = Hindi$1;
module.exports.Hungarian = Hungarian$1;
module.exports.Icelandic = Icelandic$1;
module.exports.Indonesian = Indonesian$1;
module.exports.Irish = Irish$1;
module.exports.Italian = Italian$1;
module.exports.Japanese = Japanese$1;
module.exports.Korean = Korean$1;
module.exports.Kurdish = Kurdish$1;
module.exports.Latvian = Latvian$1;
module.exports.Lithuanian = Lithuanian$1;
module.exports.Luxembourgish = Luxembourgish$1;
module.exports.Macedonian = Macedonian$1;
module.exports.Malay = Malay$1;
module.exports.Mongolian = Mongolian$1;
module.exports.Norwegian = Norwegian$1;
module.exports.NorwegianNynorsk = NorwegianNynorsk$1;
module.exports.Pashto = Pashto$1;
module.exports.Polish = Polish$1;
module.exports.Portuguese = Portuguese$1;
module.exports.PortugueseBR = PortugueseBR$1;
module.exports.Romanian = Romanian$1;
module.exports.Russian = Russian$1;
module.exports.ScotsGaelic = ScotsGaelic$1;
module.exports.Serbian = Serbian$1;
module.exports.SerbianLatin = SerbianLatin$1;
module.exports.SimpChinese = SimpChinese$1;
module.exports.Slovak = Slovak$1;
module.exports.Slovenian = Slovenian$1;
module.exports.Spanish = Spanish$1;
module.exports.SpanishInternational = SpanishInternational$1;
module.exports.Swedish = Swedish$1;
module.exports.Tatar = Tatar$1;
module.exports.Thai = Thai$1;
module.exports.TradChinese = TradChinese$1;
module.exports.Turkish = Turkish$1;
module.exports.Ukrainian = Ukrainian$1;
module.exports.Uzbek = Uzbek$1;
module.exports.Vietnamese = Vietnamese$1;
module.exports.Welsh = Welsh$1;
});

var codePages = [];
Object.keys(languageData.meta).forEach(function (key) {
    var codePage = languageData.meta[key].code_page;
    if (!isNaN(codePage) && !codePages.includes("CP" + codePage)) {
        codePages.push("CP" + codePage);
    }
});
var input = __spreadArrays([
    'ACP'
], codePages, [
    'OEM',
    'UTF8',
    'UTF16BE',
    'UTF16LE'
]);
var output = __spreadArrays([
    'ACP'
], codePages, [
    'OEM',
    'UTF16BE',
    'UTF16BEBOM',
    'UTF16LE',
    'UTF16LEBOM',
    'UTF8',
    'UTF8SIG'
]);

var splitCommands = function (data) {
    var args = [];
    if (typeof data !== 'undefined') {
        if (typeof data === 'string') {
            if (data.trim().includes('\n')) {
                var lines = data.trim().split('\n');
                lines.map(function (line) {
                    if (line.trim().length) {
                        args.push("-X" + line);
                    }
                });
            }
            else {
                args.push("-X" + data);
            }
        }
        else {
            data.map(function (key) {
                if (key.trim().length) {
                    args.push("-X" + key);
                }
            });
        }
    }
    return args;
};
var mapArguments = function (args, options) {
    var pathToMakensis = (typeof options.pathToMakensis !== 'undefined' && options.pathToMakensis !== '') ? options.pathToMakensis : 'makensis';
    var cmd;
    if (os__default['default'].platform() !== 'win32' && options.wine === true) {
        cmd = 'wine';
        args.unshift(pathToMakensis);
    }
    else {
        cmd = pathToMakensis;
    }
    // return unless compile command
    if (args.length > 1 || args.includes('-CMDHELP')) {
        return [cmd, args, { json: options.json, wine: options.wine }];
    }
    if (typeof options.define !== 'undefined') {
        Object.keys(options.define).forEach(function (key) {
            args.push("-D" + key + "=" + options.define[key]);
        });
    }
    var preExecuteArgs = splitCommands(options.preExecute);
    if (preExecuteArgs.length) {
        args.push.apply(args, preExecuteArgs);
    }
    if (options.noCD === true) {
        args.push('-NOCD');
    }
    if (options.noConfig === true) {
        args.push('-NOCONFIG');
    }
    if (options.pause === true) {
        args.push('-PAUSE');
    }
    if (options.strict === true) {
        args.push('-WX');
    }
    if (typeof options.inputCharset !== 'undefined' && input.includes(options.inputCharset)) {
        args.push('-INPUTCHARSET', options.inputCharset);
    }
    if (os__default['default'].platform() === 'win32') {
        if (typeof options.outputCharset !== 'undefined' && output.includes(options.outputCharset)) {
            args.push('-OUTPUTCHARSET', options.outputCharset);
        }
    }
    if (options.ppo === true) {
        args.push('-PPO');
    }
    if (options.safePPO === true) {
        args.push('-SAFEPPO');
    }
    if (os__default['default'].platform() === 'win32' && Number.isInteger(options.priority) && options.priority >= 0 && options.priority <= 5) {
        args.push("-P" + options.priority);
    }
    if (Number.isInteger(options.verbose) && options.verbose >= 0 && options.verbose <= 4) {
        args.push("-V" + options.verbose);
    }
    return [cmd, args, { json: options.json, wine: options.wine }];
};
var stringify = function (data) {
    return data
        ? data.toString().trim()
        : '';
};
var isInteger = function (x) {
    return x % 2 === 0;
};
var hasWarnings = function (line) {
    var match = line.match(/(\d+) warnings?:/);
    if (match !== null) {
        return parseInt(match[1]);
    }
    return 0;
};
var formatOutput = function (stream, args, opts) {
    var _a;
    if (args.includes('-CMDHELP') && !stream.stdout.trim() && stream.stderr) {
        // CMDHELP writes to stderr by default, let's fix this
        _a = [stream.stderr, ''], stream.stdout = _a[0], stream.stderr = _a[1];
    }
    if (opts.json === true) {
        if (args.includes('-CMDHELP')) {
            var minLength = (opts.wine === true) ? 2 : 1;
            if (args.length === minLength) {
                stream.stdout = objectifyHelp(stream.stdout, opts);
            }
            else {
                stream.stdout = objectify(stream.stdout, 'help');
            }
        }
        else if (args.includes('-HDRINFO')) {
            stream.stdout = objectifyFlags(stream.stdout, opts);
        }
        else if (args.includes('-LICENSE')) {
            stream.stdout = objectify(stream.stdout, 'license');
        }
        else if (args.includes('-VERSION')) {
            stream.stdout = objectify(stream.stdout, 'version');
        }
    }
    return stream;
};
var objectify = function (input, key) {
    if (key === void 0) { key = null; }
    var output = {};
    if (key === 'version' && input.startsWith('v')) {
        input = input.substr(1);
    }
    if (key === null) {
        output = input;
    }
    else {
        output[key] = input;
    }
    return output;
};
var objectifyHelp = function (input, opts) {
    var lines = splitLines(input, opts);
    lines.sort();
    var output = {};
    lines.forEach(function (line) {
        var command = line.substr(0, line.indexOf(' '));
        var usage = line.substr(line.indexOf(' ') + 1);
        // Workaround
        if (['!AddIncludeDir', '!AddPluginDir'].includes(command)) {
            command = command.toLowerCase();
        }
        if (command)
            output[command] = usage;
    });
    return output;
};
var objectifyFlags = function (input, opts) {
    var lines = splitLines(input, opts);
    var filteredLines = lines.filter(function (line) {
        if (line !== '') {
            return line;
        }
    });
    var output = {};
    var tableSizes = {};
    var tableSymbols = {};
    var symbols;
    // Split sizes
    filteredLines.forEach(function (line) {
        if (line.startsWith('Size of ')) {
            var pair = line.split(' is ');
            pair[0] = pair[0].replace('Size of ', '');
            pair[0] = pair[0].replace(' ', '_');
            pair[1] = pair[1].slice(0, -1);
            tableSizes[pair[0]] = pair[1];
        }
        else if (line.startsWith('Defined symbols: ')) {
            symbols = line.replace('Defined symbols: ', '').split(',');
        }
    });
    output['sizes'] = tableSizes;
    // Split symbols
    symbols.map(function (symbol) {
        var pair = symbol.split('=');
        if (pair.length > 1 && pair[0] !== 'undefined') {
            if (isInteger(pair[1]) === true) {
                pair[1] = parseInt(pair[1], 10);
            }
            tableSymbols[pair[0]] = pair[1];
        }
        else {
            tableSymbols[symbol] = true;
        }
    });
    output['defined_symbols'] = tableSymbols;
    return output;
};
var hasErrorCode = function (input) {
    if (input.includes('ENOENT') && input.match(/\bENOENT\b/)) {
        return true;
    }
    else if (input.includes('EACCES') && input.match(/\bEACCES\b/)) {
        return true;
    }
    else if (input.includes('EISDIR') && input.match(/\bEISDIR\b/)) {
        return true;
    }
    else if (input.includes('EMFILE') && input.match(/\bEMFILE\b/)) {
        return true;
    }
    return false;
};
var splitLines = function (input, opts) {
    var lineBreak = (os__default['default'].platform() === 'win32' || opts.wine === true) ? '\r\n' : '\n';
    var output = input.split(lineBreak);
    return output;
};
var detectOutfile = function (str) {
    if (str.includes('Output: "')) {
        var regex = /Output: "(.*\.exe)"\r?\n/g;
        var result = regex.exec(str.toString());
        if (typeof result === 'object') {
            try {
                return result['1'];
            }
            catch (e) {
                return '';
            }
        }
    }
    return '';
};
var spawnMakensis = function (cmd, args, opts, spawnOpts) {
    if (spawnOpts === void 0) { spawnOpts = {}; }
    return new Promise(function (resolve, reject) {
        var stream = {
            stdout: '',
            stderr: ''
        };
        var warnings = 0;
        var outFile = '';
        var child = childProcess__default['default'].spawn(cmd, args, spawnOpts);
        child.stdout.on('data', function (line) {
            line = stringify(line);
            warnings += hasWarnings(line);
            if (outFile === '') {
                outFile = detectOutfile(line);
            }
            stream.stdout += line;
        });
        child.stderr.on('data', function (line) {
            stream.stderr += stringify(line);
        });
        child.on('close', function (code) {
            stream = formatOutput(stream, args, opts);
            var output = {
                'status': code,
                'stdout': stream.stdout,
                'stderr': stream.stderr,
                'warnings': warnings
            };
            if (outFile.length) {
                output['outfile'] = outFile;
            }
            if (code === 0 || (code !== 0 && !hasErrorCode(stream.stderr))) {
                // Promise also resolves on MakeNSIS errors
                resolve(output);
            }
            else {
                reject(output.stderr);
            }
        });
    });
};
var spawnMakensisSync = function (cmd, args, opts, spawnOpts) {
    if (spawnOpts === void 0) { spawnOpts = {}; }
    var child = childProcess__default['default'].spawnSync(cmd, args, spawnOpts);
    child.stdout = stringify(child.stdout);
    child.stderr = stringify(child.stderr);
    var warnings = hasWarnings(child.stdout);
    var outFile = detectOutfile(child.stdout);
    child = formatOutput(child, args, opts);
    var output = {
        'status': child.status,
        'stdout': child.stdout,
        'stderr': child.stderr,
        'warnings': warnings
    };
    if (outFile.length) {
        output['outfile'] = outFile;
    }
    return output;
};

/**
 * Returns usage information for a command, or list all commands
 * @param command - an NSIS command
 * @param options - compiler options
 * @returns - usage description
 */
var cmdHelp = function (command, options, spawnOpts) {
    if (command === void 0) { command = ''; }
    if (options === void 0) { options = {}; }
    if (spawnOpts === void 0) { spawnOpts = {}; }
    options = __assign(__assign({}, options), { verbose: 0 });
    var _a = mapArguments(['-CMDHELP'], options), cmd = _a[0], args = _a[1], opts = _a[2];
    if (typeof command !== 'undefined' && typeof command !== 'object' && command !== '') {
        args.push(command);
    }
    return spawnMakensis(cmd, args, opts, spawnOpts);
};
/**
 * Returns usage information for a command, or list all commands
 * @param command - an NSIS command
 * @param options - compiler options
 * @returns - usage description
 */
var cmdHelpSync = function (command, options, spawnOpts) {
    if (command === void 0) { command = ''; }
    if (options === void 0) { options = {}; }
    if (spawnOpts === void 0) { spawnOpts = {}; }
    options = __assign(__assign({}, options), { verbose: 0 });
    var _a = mapArguments(['-CMDHELP'], options), cmd = _a[0], args = _a[1], opts = _a[2];
    if (typeof command !== 'undefined' && typeof command !== 'object' && command !== '') {
        args.push(command);
    }
    return spawnMakensisSync(cmd, args, opts, spawnOpts);
};
/**
 * Returns information about which options were used to compile MakeNSIS
 * @param options - compiler options
 * @returns - compiler options
 */
var hdrInfo = function (options, spawnOpts) {
    if (options === void 0) { options = {}; }
    if (spawnOpts === void 0) { spawnOpts = {}; }
    options = __assign(__assign({}, options), { verbose: 0 });
    var _a = mapArguments(['-HDRINFO'], options), cmd = _a[0], args = _a[1], opts = _a[2];
    return spawnMakensis(cmd, args, opts, spawnOpts);
};
/**
 * Returns information about which options were used to compile MakeNSIS
 * @returns - compiler options
 */
var hdrInfoSync = function (options, spawnOpts) {
    if (options === void 0) { options = {}; }
    if (spawnOpts === void 0) { spawnOpts = {}; }
    options = __assign(__assign({}, options), { verbose: 0 });
    var _a = mapArguments(['-HDRINFO'], options), cmd = _a[0], args = _a[1], opts = _a[2];
    return spawnMakensisSync(cmd, args, opts, spawnOpts);
};
/**
 * Compile specified script with MakeNSIS
 * @param} script - path to NSIS script
 * @param options - compiler options
 */
var compile = function (script, options, spawnOpts) {
    if (options === void 0) { options = {}; }
    if (spawnOpts === void 0) { spawnOpts = {}; }
    var _a = mapArguments([], options), cmd = _a[0], args = _a[1], opts = _a[2];
    if (script) {
        if (cmd === 'wine') {
            args.push('--');
        }
        args.push(script);
    }
    var postExecuteArgs = splitCommands(options.postExecute);
    if (postExecuteArgs.length) {
        args.push.apply(args, postExecuteArgs);
    }
    return spawnMakensis(cmd, args, opts, spawnOpts);
};
/**
 * Compile specified script with MakeNSIS
 * @param script - path to NSIS script
 * @param options - compiler options
 */
var compileSync = function (script, options, spawnOpts) {
    if (options === void 0) { options = {}; }
    if (spawnOpts === void 0) { spawnOpts = {}; }
    var _a = mapArguments([], options), cmd = _a[0], args = _a[1], opts = _a[2];
    if (script) {
        if (cmd === 'wine') {
            args.push('--');
        }
        args.push(script);
    }
    if (typeof options.postExecute !== 'undefined') {
        if (typeof options.postExecute === 'string') {
            args.push("-X" + options.postExecute);
        }
        else {
            options.postExecute.forEach(function (key) {
                args.push("-X" + key);
            });
        }
    }
    return spawnMakensisSync(cmd, args, opts, spawnOpts);
};
/**
 * Returns version of MakeNSIS
 * @param options - compiler options
 * @returns - compiler version
 */
var version = function (options, spawnOpts) {
    if (options === void 0) { options = {}; }
    if (spawnOpts === void 0) { spawnOpts = {}; }
    options = __assign(__assign({}, options), { verbose: 0 });
    var _a = mapArguments(['-VERSION'], options), cmd = _a[0], args = _a[1], opts = _a[2];
    return spawnMakensis(cmd, args, opts, spawnOpts);
};
/**
 * Returns version of MakeNSIS
 * @param options - compiler options
 * @returns - compiler version
 */
var versionSync = function (options, spawnOpts) {
    if (options === void 0) { options = {}; }
    if (spawnOpts === void 0) { spawnOpts = {}; }
    options = __assign(__assign({}, options), { verbose: 0 });
    var _a = mapArguments(['-VERSION'], options), cmd = _a[0], args = _a[1], opts = _a[2];
    return spawnMakensisSync(cmd, args, opts, spawnOpts);
};
/**
 * Returns MakeNSIS software license
 * @param options - compiler options
 * @returns - compiler license
 */
var license = function (options, spawnOpts) {
    if (options === void 0) { options = {}; }
    if (spawnOpts === void 0) { spawnOpts = {}; }
    var _a = mapArguments(['-LICENSE'], options), cmd = _a[0], args = _a[1], opts = _a[2];
    return spawnMakensis(cmd, args, opts, spawnOpts);
};
/**
 * Returns MakeNSIS software license
 * @param options - compiler options
 * @returns - compiler license
 */
var licenseSync = function (options, spawnOpts) {
    if (options === void 0) { options = {}; }
    if (spawnOpts === void 0) { spawnOpts = {}; }
    var _a = mapArguments(['-LICENSE'], options), cmd = _a[0], args = _a[1], opts = _a[2];
    return spawnMakensisSync(cmd, args, opts, spawnOpts);
};
/**
 * Returns directory where NSIS is installed to
 * @param options - compiler options
 * @returns - NSIS directory
 */
var nsisDir = function (options) {
    if (options === void 0) { options = {}; }
    var hdrOptions = __assign(__assign({}, options), { json: true });
    var output = hdrInfo(hdrOptions);
    return Promise.resolve(output)
        .then(function (hdrinfo) {
        if (options.json === true) {
            return objectify(hdrinfo.stdout.defined_symbols.NSISDIR, 'nsisdir');
        }
        return hdrinfo.stdout.defined_symbols.NSISDIR;
    })["catch"](function (hdrinfo) {
        // NSIS < 3.03
        if (options.json === true) {
            return objectify(hdrinfo.stdout.defined_symbols.NSISDIR, 'nsisdir');
        }
        return hdrinfo.stdout.defined_symbols.NSISDIR;
    });
};
/**
 * Returns NSIS directory
 * @param options - compiler options
 * @returns - compiler version
 */
var nsisDirSync = function (options) {
    if (options === void 0) { options = {}; }
    var hdrOptions = __assign(__assign({}, options), { json: true });
    var hdrinfo = hdrInfoSync(hdrOptions);
    if (options.json === true) {
        return objectify(hdrinfo.stdout.defined_symbols.NSISDIR, 'nsisdir');
    }
    return hdrinfo.stdout.defined_symbols.NSISDIR;
};

exports.cmdHelp = cmdHelp;
exports.cmdHelpSync = cmdHelpSync;
exports.compile = compile;
exports.compileSync = compileSync;
exports.hdrInfo = hdrInfo;
exports.hdrInfoSync = hdrInfoSync;
exports.license = license;
exports.licenseSync = licenseSync;
exports.nsisDir = nsisDir;
exports.nsisDirSync = nsisDirSync;
exports.version = version;
exports.versionSync = versionSync;
});

var makensis$1 = /*@__PURE__*/getDefaultExportFromCjs(makensis);

var NSIS = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), makensis, {
    'default': makensis$1
}));

function compile(strictMode, consolePanel) {
    return __awaiter(this, void 0, void 0, function () {
        var editor, script, scope, notification_1, error_1, pathToMakensis, prefix, compilerArguments, makensis, _a, _b, hasWarning_1, outFile_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    editor = atom.workspace.getActiveTextEditor();
                    if (!editor) {
                        atom.notifications.addWarning("No active editor", {
                            dismissable: false
                        });
                        return [2 /*return*/];
                    }
                    script = editor.getPath();
                    scope = editor.getGrammar().scopeName;
                    if (getConfig('allowHeaderCompilation') === false && isHeaderFile(script)) {
                        notification_1 = atom.notifications.addWarning('Compiling header files is blocked by default. You can allow it in the package settings.', {
                            dismissable: true,
                            buttons: [
                                {
                                    text: 'Open Settings',
                                    className: 'icon icon-gear',
                                    onDidClick: function () {
                                        // openPackageSettings();
                                        atom.workspace.open("atom://config/packages/language-nsis", {
                                            pending: true,
                                            searchAllPanes: true
                                        });
                                        notification_1.dismiss();
                                        return;
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    onDidClick: function () {
                                        notification_1.dismiss();
                                        return;
                                    }
                                },
                            ]
                        });
                        atom.beep();
                        return [2 /*return*/];
                    }
                    if (!(script && scope.startsWith('source.nsis'))) return [3 /*break*/, 7];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, editor.save()];
                case 2:
                    _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    console.log(error_1);
                    atom.beep();
                    return [2 /*return*/];
                case 4: return [4 /*yield*/, getMakensisPath()];
                case 5:
                    pathToMakensis = _c.sent();
                    prefix = getPrefix();
                    compilerArguments = Array(getConfig('compilerArguments'));
                    // only add WX flag if not already specified
                    if (strictMode === true && !compilerArguments.includes('-WX') && !compilerArguments.includes('/WX')) {
                        compilerArguments.push(prefix + "WX");
                    }
                    compilerArguments.push(script);
                    clearConsole(consolePanel);
                    _a = childProcess.spawn;
                    _b = [pathToMakensis, compilerArguments];
                    return [4 /*yield*/, getSpawnEnv()];
                case 6:
                    makensis = _a.apply(void 0, _b.concat([_c.sent()]));
                    hasWarning_1 = false;
                    outFile_1 = '';
                    makensis.stdout.on('data', function (line) {
                        var lineString = line.toString();
                        if (hasWarning_1 === false && line.indexOf('warning: ') !== -1) {
                            hasWarning_1 = true;
                            try {
                                if (getConfig('alwaysShowOutput')) {
                                    consolePanel.warn(lineString);
                                }
                            }
                            catch (error) {
                                console.warn(lineString);
                            }
                        }
                        else {
                            try {
                                if (getConfig('alwaysShowOutput')) {
                                    consolePanel.log(lineString);
                                }
                            }
                            catch (error) {
                                console.log(lineString);
                            }
                        }
                        if (outFile_1 === '') {
                            return (outFile_1 = detectOutfile(line));
                        }
                    });
                    makensis.stderr.on('data', function (line) {
                        var lineString = line.toString();
                        try {
                            consolePanel.error(lineString);
                        }
                        catch (error) {
                            console.error(lineString);
                        }
                        return;
                    });
                    makensis.on('close', function (errorCode) {
                        if (errorCode === 0) {
                            if (hasWarning_1 && getConfig('showBuildNotifications')) {
                                notifyOnCompletion('addWarning', outFile_1);
                            }
                            else if (getConfig('showBuildNotifications')) {
                                notifyOnCompletion('addSuccess', outFile_1);
                            }
                        }
                        else if (getConfig('showBuildNotifications')) {
                            atom.notifications.addError('Compile Error', { dismissable: false });
                        }
                    });
                    return [2 /*return*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function showVersion(consolePanel) {
    return __awaiter(this, void 0, void 0, function () {
        var pathToMakensis, output, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, getMakensisPath()];
                case 1:
                    pathToMakensis = _d.sent();
                    _b = (_a = NSIS).version;
                    _c = [{
                            pathToMakensis: pathToMakensis
                        }];
                    return [4 /*yield*/, getSpawnEnv()];
                case 2: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent()]))];
                case 3:
                    output = _d.sent();
                    clearConsole(consolePanel);
                    if (String(getConfig('compilerOutput')).toLowerCase() === 'console') {
                        try {
                            consolePanel.log("makensis " + output.stdout + " (" + pathToMakensis + ")");
                        }
                        catch (error) {
                            console.info("makensis " + output.stdout + " (" + pathToMakensis + ")");
                            atom.openDevTools();
                        }
                    }
                    else {
                        atom.notifications.addInfo("NSIS Version", { detail: "makensis " + output.stdout + " (" + pathToMakensis + ")", dismissable: true });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function showCompilerFlags(consolePanel) {
    return __awaiter(this, void 0, void 0, function () {
        var pathToMakensis, showFlagsAsObject, output, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, getMakensisPath()];
                case 1:
                    pathToMakensis = _d.sent();
                    showFlagsAsObject = getConfig('showFlagsAsObject');
                    _b = (_a = NSIS).hdrInfo;
                    _c = [{
                            pathToMakensis: pathToMakensis,
                            json: showFlagsAsObject
                        }];
                    return [4 /*yield*/, getSpawnEnv()];
                case 2: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent()]))];
                case 3:
                    output = _d.sent();
                    clearConsole(consolePanel);
                    if (String(getConfig('compilerOutput')).toLowerCase() === 'console') {
                        try {
                            consolePanel.log(JSON.stringify(output.stdout || output.stderr, null, 2));
                        }
                        catch (error) {
                            console.info(output.stdout || output.stderr);
                            atom.openDevTools();
                        }
                    }
                    else {
                        atom.notifications.addInfo("Compiler Flags", { detail: JSON.stringify(output.stdout || output.stderr, null, 2), dismissable: true });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function showHelp(selectListView) {
    return __awaiter(this, void 0, void 0, function () {
        var pathToMakensis, output, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, getMakensisPath()];
                case 1:
                    pathToMakensis = _d.sent();
                    _b = (_a = NSIS).cmdHelp;
                    _c = ['', {
                            json: true,
                            pathToMakensis: pathToMakensis
                        }];
                    return [4 /*yield*/, getSpawnEnv()];
                case 2: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent()]))];
                case 3:
                    output = _d.sent();
                    selectListView.update({ items: Object.keys(output.stdout) });
                    return [2 /*return*/];
            }
        });
    });
}

// This is a generated file. Do not edit.
var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;

var unicode = {
	Space_Separator: Space_Separator,
	ID_Start: ID_Start,
	ID_Continue: ID_Continue
};

var util = {
    isSpaceSeparator (c) {
        return typeof c === 'string' && unicode.Space_Separator.test(c)
    },

    isIdStartChar (c) {
        return typeof c === 'string' && (
            (c >= 'a' && c <= 'z') ||
        (c >= 'A' && c <= 'Z') ||
        (c === '$') || (c === '_') ||
        unicode.ID_Start.test(c)
        )
    },

    isIdContinueChar (c) {
        return typeof c === 'string' && (
            (c >= 'a' && c <= 'z') ||
        (c >= 'A' && c <= 'Z') ||
        (c >= '0' && c <= '9') ||
        (c === '$') || (c === '_') ||
        (c === '\u200C') || (c === '\u200D') ||
        unicode.ID_Continue.test(c)
        )
    },

    isDigit (c) {
        return typeof c === 'string' && /[0-9]/.test(c)
    },

    isHexDigit (c) {
        return typeof c === 'string' && /[0-9A-Fa-f]/.test(c)
    },
};

let source;
let parseState;
let stack;
let pos;
let line;
let column;
let token;
let key;
let root;

var parse$2 = function parse (text, reviver) {
    source = String(text);
    parseState = 'start';
    stack = [];
    pos = 0;
    line = 1;
    column = 0;
    token = undefined;
    key = undefined;
    root = undefined;

    do {
        token = lex();

        // This code is unreachable.
        // if (!parseStates[parseState]) {
        //     throw invalidParseState()
        // }

        parseStates[parseState]();
    } while (token.type !== 'eof')

    if (typeof reviver === 'function') {
        return internalize({'': root}, '', reviver)
    }

    return root
};

function internalize (holder, name, reviver) {
    const value = holder[name];
    if (value != null && typeof value === 'object') {
        for (const key in value) {
            const replacement = internalize(value, key, reviver);
            if (replacement === undefined) {
                delete value[key];
            } else {
                value[key] = replacement;
            }
        }
    }

    return reviver.call(holder, name, value)
}

let lexState;
let buffer$1;
let doubleQuote;
let sign;
let c;

function lex () {
    lexState = 'default';
    buffer$1 = '';
    doubleQuote = false;
    sign = 1;

    for (;;) {
        c = peek();

        // This code is unreachable.
        // if (!lexStates[lexState]) {
        //     throw invalidLexState(lexState)
        // }

        const token = lexStates[lexState]();
        if (token) {
            return token
        }
    }
}

function peek () {
    if (source[pos]) {
        return String.fromCodePoint(source.codePointAt(pos))
    }
}

function read () {
    const c = peek();

    if (c === '\n') {
        line++;
        column = 0;
    } else if (c) {
        column += c.length;
    } else {
        column++;
    }

    if (c) {
        pos += c.length;
    }

    return c
}

const lexStates = {
    default () {
        switch (c) {
        case '\t':
        case '\v':
        case '\f':
        case ' ':
        case '\u00A0':
        case '\uFEFF':
        case '\n':
        case '\r':
        case '\u2028':
        case '\u2029':
            read();
            return

        case '/':
            read();
            lexState = 'comment';
            return

        case undefined:
            read();
            return newToken('eof')
        }

        if (util.isSpaceSeparator(c)) {
            read();
            return
        }

        // This code is unreachable.
        // if (!lexStates[parseState]) {
        //     throw invalidLexState(parseState)
        // }

        return lexStates[parseState]()
    },

    comment () {
        switch (c) {
        case '*':
            read();
            lexState = 'multiLineComment';
            return

        case '/':
            read();
            lexState = 'singleLineComment';
            return
        }

        throw invalidChar(read())
    },

    multiLineComment () {
        switch (c) {
        case '*':
            read();
            lexState = 'multiLineCommentAsterisk';
            return

        case undefined:
            throw invalidChar(read())
        }

        read();
    },

    multiLineCommentAsterisk () {
        switch (c) {
        case '*':
            read();
            return

        case '/':
            read();
            lexState = 'default';
            return

        case undefined:
            throw invalidChar(read())
        }

        read();
        lexState = 'multiLineComment';
    },

    singleLineComment () {
        switch (c) {
        case '\n':
        case '\r':
        case '\u2028':
        case '\u2029':
            read();
            lexState = 'default';
            return

        case undefined:
            read();
            return newToken('eof')
        }

        read();
    },

    value () {
        switch (c) {
        case '{':
        case '[':
            return newToken('punctuator', read())

        case 'n':
            read();
            literal('ull');
            return newToken('null', null)

        case 't':
            read();
            literal('rue');
            return newToken('boolean', true)

        case 'f':
            read();
            literal('alse');
            return newToken('boolean', false)

        case '-':
        case '+':
            if (read() === '-') {
                sign = -1;
            }

            lexState = 'sign';
            return

        case '.':
            buffer$1 = read();
            lexState = 'decimalPointLeading';
            return

        case '0':
            buffer$1 = read();
            lexState = 'zero';
            return

        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            buffer$1 = read();
            lexState = 'decimalInteger';
            return

        case 'I':
            read();
            literal('nfinity');
            return newToken('numeric', Infinity)

        case 'N':
            read();
            literal('aN');
            return newToken('numeric', NaN)

        case '"':
        case "'":
            doubleQuote = (read() === '"');
            buffer$1 = '';
            lexState = 'string';
            return
        }

        throw invalidChar(read())
    },

    identifierNameStartEscape () {
        if (c !== 'u') {
            throw invalidChar(read())
        }

        read();
        const u = unicodeEscape();
        switch (u) {
        case '$':
        case '_':
            break

        default:
            if (!util.isIdStartChar(u)) {
                throw invalidIdentifier()
            }

            break
        }

        buffer$1 += u;
        lexState = 'identifierName';
    },

    identifierName () {
        switch (c) {
        case '$':
        case '_':
        case '\u200C':
        case '\u200D':
            buffer$1 += read();
            return

        case '\\':
            read();
            lexState = 'identifierNameEscape';
            return
        }

        if (util.isIdContinueChar(c)) {
            buffer$1 += read();
            return
        }

        return newToken('identifier', buffer$1)
    },

    identifierNameEscape () {
        if (c !== 'u') {
            throw invalidChar(read())
        }

        read();
        const u = unicodeEscape();
        switch (u) {
        case '$':
        case '_':
        case '\u200C':
        case '\u200D':
            break

        default:
            if (!util.isIdContinueChar(u)) {
                throw invalidIdentifier()
            }

            break
        }

        buffer$1 += u;
        lexState = 'identifierName';
    },

    sign () {
        switch (c) {
        case '.':
            buffer$1 = read();
            lexState = 'decimalPointLeading';
            return

        case '0':
            buffer$1 = read();
            lexState = 'zero';
            return

        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            buffer$1 = read();
            lexState = 'decimalInteger';
            return

        case 'I':
            read();
            literal('nfinity');
            return newToken('numeric', sign * Infinity)

        case 'N':
            read();
            literal('aN');
            return newToken('numeric', NaN)
        }

        throw invalidChar(read())
    },

    zero () {
        switch (c) {
        case '.':
            buffer$1 += read();
            lexState = 'decimalPoint';
            return

        case 'e':
        case 'E':
            buffer$1 += read();
            lexState = 'decimalExponent';
            return

        case 'x':
        case 'X':
            buffer$1 += read();
            lexState = 'hexadecimal';
            return
        }

        return newToken('numeric', sign * 0)
    },

    decimalInteger () {
        switch (c) {
        case '.':
            buffer$1 += read();
            lexState = 'decimalPoint';
            return

        case 'e':
        case 'E':
            buffer$1 += read();
            lexState = 'decimalExponent';
            return
        }

        if (util.isDigit(c)) {
            buffer$1 += read();
            return
        }

        return newToken('numeric', sign * Number(buffer$1))
    },

    decimalPointLeading () {
        if (util.isDigit(c)) {
            buffer$1 += read();
            lexState = 'decimalFraction';
            return
        }

        throw invalidChar(read())
    },

    decimalPoint () {
        switch (c) {
        case 'e':
        case 'E':
            buffer$1 += read();
            lexState = 'decimalExponent';
            return
        }

        if (util.isDigit(c)) {
            buffer$1 += read();
            lexState = 'decimalFraction';
            return
        }

        return newToken('numeric', sign * Number(buffer$1))
    },

    decimalFraction () {
        switch (c) {
        case 'e':
        case 'E':
            buffer$1 += read();
            lexState = 'decimalExponent';
            return
        }

        if (util.isDigit(c)) {
            buffer$1 += read();
            return
        }

        return newToken('numeric', sign * Number(buffer$1))
    },

    decimalExponent () {
        switch (c) {
        case '+':
        case '-':
            buffer$1 += read();
            lexState = 'decimalExponentSign';
            return
        }

        if (util.isDigit(c)) {
            buffer$1 += read();
            lexState = 'decimalExponentInteger';
            return
        }

        throw invalidChar(read())
    },

    decimalExponentSign () {
        if (util.isDigit(c)) {
            buffer$1 += read();
            lexState = 'decimalExponentInteger';
            return
        }

        throw invalidChar(read())
    },

    decimalExponentInteger () {
        if (util.isDigit(c)) {
            buffer$1 += read();
            return
        }

        return newToken('numeric', sign * Number(buffer$1))
    },

    hexadecimal () {
        if (util.isHexDigit(c)) {
            buffer$1 += read();
            lexState = 'hexadecimalInteger';
            return
        }

        throw invalidChar(read())
    },

    hexadecimalInteger () {
        if (util.isHexDigit(c)) {
            buffer$1 += read();
            return
        }

        return newToken('numeric', sign * Number(buffer$1))
    },

    string () {
        switch (c) {
        case '\\':
            read();
            buffer$1 += escape();
            return

        case '"':
            if (doubleQuote) {
                read();
                return newToken('string', buffer$1)
            }

            buffer$1 += read();
            return

        case "'":
            if (!doubleQuote) {
                read();
                return newToken('string', buffer$1)
            }

            buffer$1 += read();
            return

        case '\n':
        case '\r':
            throw invalidChar(read())

        case '\u2028':
        case '\u2029':
            separatorChar(c);
            break

        case undefined:
            throw invalidChar(read())
        }

        buffer$1 += read();
    },

    start () {
        switch (c) {
        case '{':
        case '[':
            return newToken('punctuator', read())

        // This code is unreachable since the default lexState handles eof.
        // case undefined:
        //     return newToken('eof')
        }

        lexState = 'value';
    },

    beforePropertyName () {
        switch (c) {
        case '$':
        case '_':
            buffer$1 = read();
            lexState = 'identifierName';
            return

        case '\\':
            read();
            lexState = 'identifierNameStartEscape';
            return

        case '}':
            return newToken('punctuator', read())

        case '"':
        case "'":
            doubleQuote = (read() === '"');
            lexState = 'string';
            return
        }

        if (util.isIdStartChar(c)) {
            buffer$1 += read();
            lexState = 'identifierName';
            return
        }

        throw invalidChar(read())
    },

    afterPropertyName () {
        if (c === ':') {
            return newToken('punctuator', read())
        }

        throw invalidChar(read())
    },

    beforePropertyValue () {
        lexState = 'value';
    },

    afterPropertyValue () {
        switch (c) {
        case ',':
        case '}':
            return newToken('punctuator', read())
        }

        throw invalidChar(read())
    },

    beforeArrayValue () {
        if (c === ']') {
            return newToken('punctuator', read())
        }

        lexState = 'value';
    },

    afterArrayValue () {
        switch (c) {
        case ',':
        case ']':
            return newToken('punctuator', read())
        }

        throw invalidChar(read())
    },

    end () {
        // This code is unreachable since it's handled by the default lexState.
        // if (c === undefined) {
        //     read()
        //     return newToken('eof')
        // }

        throw invalidChar(read())
    },
};

function newToken (type, value) {
    return {
        type,
        value,
        line,
        column,
    }
}

function literal (s) {
    for (const c of s) {
        const p = peek();

        if (p !== c) {
            throw invalidChar(read())
        }

        read();
    }
}

function escape () {
    const c = peek();
    switch (c) {
    case 'b':
        read();
        return '\b'

    case 'f':
        read();
        return '\f'

    case 'n':
        read();
        return '\n'

    case 'r':
        read();
        return '\r'

    case 't':
        read();
        return '\t'

    case 'v':
        read();
        return '\v'

    case '0':
        read();
        if (util.isDigit(peek())) {
            throw invalidChar(read())
        }

        return '\0'

    case 'x':
        read();
        return hexEscape()

    case 'u':
        read();
        return unicodeEscape()

    case '\n':
    case '\u2028':
    case '\u2029':
        read();
        return ''

    case '\r':
        read();
        if (peek() === '\n') {
            read();
        }

        return ''

    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
        throw invalidChar(read())

    case undefined:
        throw invalidChar(read())
    }

    return read()
}

function hexEscape () {
    let buffer = '';
    let c = peek();

    if (!util.isHexDigit(c)) {
        throw invalidChar(read())
    }

    buffer += read();

    c = peek();
    if (!util.isHexDigit(c)) {
        throw invalidChar(read())
    }

    buffer += read();

    return String.fromCodePoint(parseInt(buffer, 16))
}

function unicodeEscape () {
    let buffer = '';
    let count = 4;

    while (count-- > 0) {
        const c = peek();
        if (!util.isHexDigit(c)) {
            throw invalidChar(read())
        }

        buffer += read();
    }

    return String.fromCodePoint(parseInt(buffer, 16))
}

const parseStates = {
    start () {
        if (token.type === 'eof') {
            throw invalidEOF()
        }

        push();
    },

    beforePropertyName () {
        switch (token.type) {
        case 'identifier':
        case 'string':
            key = token.value;
            parseState = 'afterPropertyName';
            return

        case 'punctuator':
            // This code is unreachable since it's handled by the lexState.
            // if (token.value !== '}') {
            //     throw invalidToken()
            // }

            pop();
            return

        case 'eof':
            throw invalidEOF()
        }

        // This code is unreachable since it's handled by the lexState.
        // throw invalidToken()
    },

    afterPropertyName () {
        // This code is unreachable since it's handled by the lexState.
        // if (token.type !== 'punctuator' || token.value !== ':') {
        //     throw invalidToken()
        // }

        if (token.type === 'eof') {
            throw invalidEOF()
        }

        parseState = 'beforePropertyValue';
    },

    beforePropertyValue () {
        if (token.type === 'eof') {
            throw invalidEOF()
        }

        push();
    },

    beforeArrayValue () {
        if (token.type === 'eof') {
            throw invalidEOF()
        }

        if (token.type === 'punctuator' && token.value === ']') {
            pop();
            return
        }

        push();
    },

    afterPropertyValue () {
        // This code is unreachable since it's handled by the lexState.
        // if (token.type !== 'punctuator') {
        //     throw invalidToken()
        // }

        if (token.type === 'eof') {
            throw invalidEOF()
        }

        switch (token.value) {
        case ',':
            parseState = 'beforePropertyName';
            return

        case '}':
            pop();
        }

        // This code is unreachable since it's handled by the lexState.
        // throw invalidToken()
    },

    afterArrayValue () {
        // This code is unreachable since it's handled by the lexState.
        // if (token.type !== 'punctuator') {
        //     throw invalidToken()
        // }

        if (token.type === 'eof') {
            throw invalidEOF()
        }

        switch (token.value) {
        case ',':
            parseState = 'beforeArrayValue';
            return

        case ']':
            pop();
        }

        // This code is unreachable since it's handled by the lexState.
        // throw invalidToken()
    },

    end () {
        // This code is unreachable since it's handled by the lexState.
        // if (token.type !== 'eof') {
        //     throw invalidToken()
        // }
    },
};

function push () {
    let value;

    switch (token.type) {
    case 'punctuator':
        switch (token.value) {
        case '{':
            value = {};
            break

        case '[':
            value = [];
            break
        }

        break

    case 'null':
    case 'boolean':
    case 'numeric':
    case 'string':
        value = token.value;
        break

    // This code is unreachable.
    // default:
    //     throw invalidToken()
    }

    if (root === undefined) {
        root = value;
    } else {
        const parent = stack[stack.length - 1];
        if (Array.isArray(parent)) {
            parent.push(value);
        } else {
            parent[key] = value;
        }
    }

    if (value !== null && typeof value === 'object') {
        stack.push(value);

        if (Array.isArray(value)) {
            parseState = 'beforeArrayValue';
        } else {
            parseState = 'beforePropertyName';
        }
    } else {
        const current = stack[stack.length - 1];
        if (current == null) {
            parseState = 'end';
        } else if (Array.isArray(current)) {
            parseState = 'afterArrayValue';
        } else {
            parseState = 'afterPropertyValue';
        }
    }
}

function pop () {
    stack.pop();

    const current = stack[stack.length - 1];
    if (current == null) {
        parseState = 'end';
    } else if (Array.isArray(current)) {
        parseState = 'afterArrayValue';
    } else {
        parseState = 'afterPropertyValue';
    }
}

// This code is unreachable.
// function invalidParseState () {
//     return new Error(`JSON5: invalid parse state '${parseState}'`)
// }

// This code is unreachable.
// function invalidLexState (state) {
//     return new Error(`JSON5: invalid lex state '${state}'`)
// }

function invalidChar (c) {
    if (c === undefined) {
        return syntaxError(`JSON5: invalid end of input at ${line}:${column}`)
    }

    return syntaxError(`JSON5: invalid character '${formatChar(c)}' at ${line}:${column}`)
}

function invalidEOF () {
    return syntaxError(`JSON5: invalid end of input at ${line}:${column}`)
}

// This code is unreachable.
// function invalidToken () {
//     if (token.type === 'eof') {
//         return syntaxError(`JSON5: invalid end of input at ${line}:${column}`)
//     }

//     const c = String.fromCodePoint(token.value.codePointAt(0))
//     return syntaxError(`JSON5: invalid character '${formatChar(c)}' at ${line}:${column}`)
// }

function invalidIdentifier () {
    column -= 5;
    return syntaxError(`JSON5: invalid identifier character at ${line}:${column}`)
}

function separatorChar (c) {
    console.warn(`JSON5: '${formatChar(c)}' in strings is not valid ECMAScript; consider escaping`);
}

function formatChar (c) {
    const replacements = {
        "'": "\\'",
        '"': '\\"',
        '\\': '\\\\',
        '\b': '\\b',
        '\f': '\\f',
        '\n': '\\n',
        '\r': '\\r',
        '\t': '\\t',
        '\v': '\\v',
        '\0': '\\0',
        '\u2028': '\\u2028',
        '\u2029': '\\u2029',
    };

    if (replacements[c]) {
        return replacements[c]
    }

    if (c < ' ') {
        const hexString = c.charCodeAt(0).toString(16);
        return '\\x' + ('00' + hexString).substring(hexString.length)
    }

    return c
}

function syntaxError (message) {
    const err = new SyntaxError(message);
    err.lineNumber = line;
    err.columnNumber = column;
    return err
}

var stringify = function stringify (value, replacer, space) {
    const stack = [];
    let indent = '';
    let propertyList;
    let replacerFunc;
    let gap = '';
    let quote;

    if (
        replacer != null &&
        typeof replacer === 'object' &&
        !Array.isArray(replacer)
    ) {
        space = replacer.space;
        quote = replacer.quote;
        replacer = replacer.replacer;
    }

    if (typeof replacer === 'function') {
        replacerFunc = replacer;
    } else if (Array.isArray(replacer)) {
        propertyList = [];
        for (const v of replacer) {
            let item;

            if (typeof v === 'string') {
                item = v;
            } else if (
                typeof v === 'number' ||
                v instanceof String ||
                v instanceof Number
            ) {
                item = String(v);
            }

            if (item !== undefined && propertyList.indexOf(item) < 0) {
                propertyList.push(item);
            }
        }
    }

    if (space instanceof Number) {
        space = Number(space);
    } else if (space instanceof String) {
        space = String(space);
    }

    if (typeof space === 'number') {
        if (space > 0) {
            space = Math.min(10, Math.floor(space));
            gap = '          '.substr(0, space);
        }
    } else if (typeof space === 'string') {
        gap = space.substr(0, 10);
    }

    return serializeProperty('', {'': value})

    function serializeProperty (key, holder) {
        let value = holder[key];
        if (value != null) {
            if (typeof value.toJSON5 === 'function') {
                value = value.toJSON5(key);
            } else if (typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }
        }

        if (replacerFunc) {
            value = replacerFunc.call(holder, key, value);
        }

        if (value instanceof Number) {
            value = Number(value);
        } else if (value instanceof String) {
            value = String(value);
        } else if (value instanceof Boolean) {
            value = value.valueOf();
        }

        switch (value) {
        case null: return 'null'
        case true: return 'true'
        case false: return 'false'
        }

        if (typeof value === 'string') {
            return quoteString(value)
        }

        if (typeof value === 'number') {
            return String(value)
        }

        if (typeof value === 'object') {
            return Array.isArray(value) ? serializeArray(value) : serializeObject(value)
        }

        return undefined
    }

    function quoteString (value) {
        const quotes = {
            "'": 0.1,
            '"': 0.2,
        };

        const replacements = {
            "'": "\\'",
            '"': '\\"',
            '\\': '\\\\',
            '\b': '\\b',
            '\f': '\\f',
            '\n': '\\n',
            '\r': '\\r',
            '\t': '\\t',
            '\v': '\\v',
            '\0': '\\0',
            '\u2028': '\\u2028',
            '\u2029': '\\u2029',
        };

        let product = '';

        for (let i = 0; i < value.length; i++) {
            const c = value[i];
            switch (c) {
            case "'":
            case '"':
                quotes[c]++;
                product += c;
                continue

            case '\0':
                if (util.isDigit(value[i + 1])) {
                    product += '\\x00';
                    continue
                }
            }

            if (replacements[c]) {
                product += replacements[c];
                continue
            }

            if (c < ' ') {
                let hexString = c.charCodeAt(0).toString(16);
                product += '\\x' + ('00' + hexString).substring(hexString.length);
                continue
            }

            product += c;
        }

        const quoteChar = quote || Object.keys(quotes).reduce((a, b) => (quotes[a] < quotes[b]) ? a : b);

        product = product.replace(new RegExp(quoteChar, 'g'), replacements[quoteChar]);

        return quoteChar + product + quoteChar
    }

    function serializeObject (value) {
        if (stack.indexOf(value) >= 0) {
            throw TypeError('Converting circular structure to JSON5')
        }

        stack.push(value);

        let stepback = indent;
        indent = indent + gap;

        let keys = propertyList || Object.keys(value);
        let partial = [];
        for (const key of keys) {
            const propertyString = serializeProperty(key, value);
            if (propertyString !== undefined) {
                let member = serializeKey(key) + ':';
                if (gap !== '') {
                    member += ' ';
                }
                member += propertyString;
                partial.push(member);
            }
        }

        let final;
        if (partial.length === 0) {
            final = '{}';
        } else {
            let properties;
            if (gap === '') {
                properties = partial.join(',');
                final = '{' + properties + '}';
            } else {
                let separator = ',\n' + indent;
                properties = partial.join(separator);
                final = '{\n' + indent + properties + ',\n' + stepback + '}';
            }
        }

        stack.pop();
        indent = stepback;
        return final
    }

    function serializeKey (key) {
        if (key.length === 0) {
            return quoteString(key)
        }

        const firstChar = String.fromCodePoint(key.codePointAt(0));
        if (!util.isIdStartChar(firstChar)) {
            return quoteString(key)
        }

        for (let i = firstChar.length; i < key.length; i++) {
            if (!util.isIdContinueChar(String.fromCodePoint(key.codePointAt(i)))) {
                return quoteString(key)
            }
        }

        return key
    }

    function serializeArray (value) {
        if (stack.indexOf(value) >= 0) {
            throw TypeError('Converting circular structure to JSON5')
        }

        stack.push(value);

        let stepback = indent;
        indent = indent + gap;

        let partial = [];
        for (let i = 0; i < value.length; i++) {
            const propertyString = serializeProperty(String(i), value);
            partial.push((propertyString !== undefined) ? propertyString : 'null');
        }

        let final;
        if (partial.length === 0) {
            final = '[]';
        } else {
            if (gap === '') {
                let properties = partial.join(',');
                final = '[' + properties + ']';
            } else {
                let separator = ',\n' + indent;
                let properties = partial.join(separator);
                final = '[\n' + indent + properties + ',\n' + stepback + ']';
            }
        }

        stack.pop();
        indent = stepback;
        return final
    }
};

const JSON5 = {
    parse: parse$2,
    stringify,
};

var lib$3 = JSON5;

var dist = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': lib$3
});

var JSON5$1 = /*@__PURE__*/getAugmentedNamespace(dist);

var dist$1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });



function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var JSON5__default = /*#__PURE__*/_interopDefaultLegacy(JSON5$1);

var NLFStrings = {
    /**
     * NLF v2
     + used up to NSIS 2.0 beta 3
     */
    v2: [
        'header',
        'id',
        '^Branding',
        '^SetupCaption',
        '^UninstallCaption',
        '^LicenseSubCaption',
        '^ComponentsSubCaption',
        '^DirSubCaption',
        '^InstallingSubCaption',
        '^CompletedSubCaption',
        '^ConfirmSubCaption',
        '^UninstallingSubCaption',
        '^UnCompletedSubCaption',
        '^BackBtn',
        '^NextBtn',
        '^AgreeBtn',
        '^InstallBtn',
        '^UninstallBtn',
        '^CancelBtn',
        '^CloseBtn',
        '^BrowseBtn',
        '^ShowDetailsBtn',
        '^Name',
        '^Completed',
        '^Custom',
        '^ComponentsText',
        '^ComponentsSubText1',
        '^ComponentsSubText2',
        '^DirText',
        '^SpaceAvailable',
        '^SpaceRequired',
        '^UninstallingText',
        '^FileError_NoIgnore',
        '^CantWrite',
        '^CopyFailed',
        '^CopyTo',
        '^SymbolNotFound',
        '^CouldNotLoad',
        '^CreateFolder',
        '^CreateShortcut',
        '^CreatedUninstaller',
        '^Delete',
        '^DeleteOnReboot',
        '^ErrorCreatingShortcut',
        '^ErrorCreating',
        '^ErrorDecompressing',
        '^ErrorRegistering',
        '^ExecShell',
        '^Exec',
        '^Extract',
        '^ErrorWriting',
        '^InvalidOpcode',
        '^NoOLE',
        '^OutputFolder',
        '^RemoveFolder',
        '^RenameOnReboot',
        '^Rename',
        '^Skipped',
        '^CopyDetails',
    ],
    /**
     * NLF v6
     + used as of NSIS 2.0 beta 4
     */
    v6: [
        'header',
        'id',
        'fontname',
        'fontsize',
        'code_page',
        'rtl',
        '^Branding',
        '^SetupCaption',
        '^UninstallCaption',
        '^LicenseSubCaption',
        '^ComponentsSubCaption',
        '^DirSubCaption',
        '^InstallingSubCaption',
        '^CompletedSubCaption',
        '^UnComponentsSubCaption',
        '^UnDirSubCaption',
        '^ConfirmSubCaption',
        '^UninstallingSubCaption',
        '^UnCompletedSubCaption',
        '^BackBtn',
        '^NextBtn',
        '^AgreeBtn',
        '^AcceptBtn',
        '^DontAcceptBtn',
        '^InstallBtn',
        '^UninstallBtn',
        '^CancelBtn',
        '^CloseBtn',
        '^BrowseBtn',
        '^ShowDetailsBtn',
        '^ClickNext',
        '^ClickInstall',
        '^ClickUninstall',
        '^Name',
        '^Completed',
        '^LicenseText',
        '^LicenseTextCB',
        '^LicenseTextRB',
        '^UnLicenseText',
        '^UnLicenseTextCB',
        '^UnLicenseTextRB',
        '^Custom',
        '^ComponentsText',
        '^ComponentsSubText1',
        '^ComponentsSubText2_NoInstTypes',
        '^ComponentsSubText2',
        '^UnComponentsText',
        '^UnComponentsSubText1',
        '^UnComponentsSubText2_NoInstTypes',
        '^UnComponentsSubText2',
        '^DirText',
        '^DirSubText',
        '^DirBrowseText',
        '^UnDirText',
        '^UnDirSubText',
        '^UnDirBrowseText',
        '^SpaceAvailable',
        '^SpaceRequired',
        '^UninstallingText',
        '^UninstallingSubText',
        '^FileError',
        '^FileError_NoIgnore',
        '^CantWrite',
        '^CopyFailed',
        '^CopyTo',
        '^Registering',
        '^Unregistering',
        '^SymbolNotFound',
        '^CouldNotLoad',
        '^CreateFolder',
        '^CreateShortcut',
        '^CreatedUninstaller',
        '^Delete',
        '^DeleteOnReboot',
        '^ErrorCreatingShortcut',
        '^ErrorCreating',
        '^ErrorDecompressing',
        '^ErrorRegistering',
        '^ExecShell',
        '^Exec',
        '^Extract',
        '^ErrorWriting',
        '^InvalidOpcode',
        '^NoOLE',
        '^OutputFolder',
        '^RemoveFolder',
        '^RenameOnReboot',
        '^Rename',
        '^Skipped',
        '^CopyDetails',
        '^LogInstall',
        '^Byte',
        '^Kilo',
        '^Mega',
        '^Giga'
    ]
};

/**
 * Parses an NSIS language file string
 * @param input - NLF string
 * @returns - NLF object
 */
var parse = function (input, options) {
    if (options === void 0) { options = {}; }
    var output = {
        header: '',
        id: 0,
        font: {
            name: null,
            size: null
        },
        code_page: null,
        rtl: false,
        strings: {}
    };
    // remove all comments
    input = input.trim().replace(/^#.*(\r?\n|$)/mg, '');
    // split into lines
    var lines = input.split(/\r?\n/);
    // get NLF version
    var version = lines[0].match(/\d+$/)[0] || 6;
    lines.map(function (line, index) {
        var key = NLFStrings["v" + version][index];
        if (typeof key !== 'undefined' && key.startsWith('^')) {
            // Language String
            key = key.replace('^', '');
            output.strings[key] = lines[index];
        }
        else {
            // Meta Data
            switch (key) {
                case 'id':
                case 'code_page':
                    output[key] = (lines[index] === '-')
                        ? null
                        : parseInt(lines[index]);
                    break;
                case 'font':
                case 'fontname':
                    output.font.name = (lines[index] === '-')
                        ? null
                        : lines[index];
                    break;
                case 'fontsize':
                    output.font.size = (lines[index] === '-')
                        ? null
                        : parseInt(lines[index]);
                    break;
                case 'rtl':
                    output[key] = (lines[index].toUpperCase() === 'RTL')
                        ? true
                        : false;
                    break;
                default:
                    if (typeof key !== 'undefined') {
                        output[key] = lines[index];
                    }
                    break;
            }
        }
    });
    if (options.stringify === true) {
        var indentation = (options.minify === true)
            ? 0
            : 2;
        return JSON.stringify(output, null, indentation);
    }
    return output;
};
/**
 * Stringifies an NSIS language file object
 * @param input - NLF object
 * @returns - NLF string
 */
var stringify = function (input) {
    var output = [];
    var inputObj = typeof input === 'string'
        ? JSON5__default['default'].parse(input)
        : input;
    // get NLF version
    var version = inputObj.header.match(/\d+$/)[0] || 6;
    output.push('# Header, don\'t edit', inputObj.header);
    output.push('# Language ID', inputObj.id);
    if (typeof inputObj.font !== 'undefined' && NLFStrings["v" + version].includes('fontname')) {
        output.push("# Font and size - dash (-) means default");
        if (inputObj.font.name) {
            output.push("" + inputObj.font.name);
        }
        else {
            output.push('-');
        }
        if (inputObj.font.size) {
            output.push("" + inputObj.font.size);
        }
        else {
            output.push('-');
        }
    }
    if (NLFStrings["v" + version].includes('code_page')) {
        output.push("# Codepage - dash (-) means ASCII code page");
        if (inputObj.code_page) {
            output.push("" + inputObj.code_page);
        }
        else {
            output.push('-');
        }
    }
    if (NLFStrings["v" + version].includes('rtl')) {
        output.push("# RTL - anything else than RTL means LTR");
        if (inputObj.rtl) {
            output.push('RTL');
        }
        else {
            output.push('-');
        }
    }
    for (var key in inputObj.strings) {
        if (NLFStrings["v" + version].includes("^" + key)) {
            output.push("# ^" + key, inputObj.strings[key]);
        }
    }
    return output.join('\n');
};

exports.parse = parse;
exports.stringify = stringify;
});

var NLF = /*@__PURE__*/getDefaultExportFromCjs(dist$1);

function convert() {
    return __awaiter(this, void 0, void 0, function () {
        var editor, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    editor = atom.workspace.getActiveTextEditor();
                    if (!editor) {
                        atom.beep();
                        return [2 /*return*/];
                    }
                    _a = editor.getGrammar().scopeName;
                    switch (_a) {
                        case 'source.nlf': return [3 /*break*/, 1];
                        case 'source.json': return [3 /*break*/, 3];
                        case 'source.json5': return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, convertNLF(editor)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 3: return [4 /*yield*/, convertJSON(editor)];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    atom.beep();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function convertNLF(editor) {
    return __awaiter(this, void 0, void 0, function () {
        var output, input;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    try {
                        input = editor.getText();
                        output = NLF.parse(input, { stringify: true });
                    }
                    catch (e) {
                        console.error(e);
                        atom.notifications.addError('Conversion Failed', { detail: e, dismissable: true });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, openNewFile(editor, output, 'json')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function convertJSON(editor) {
    return __awaiter(this, void 0, void 0, function () {
        var output, input;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    try {
                        input = editor.getText();
                        output = NLF.stringify(input);
                    }
                    catch (e) {
                        console.error(e);
                        atom.notifications.addError('Conversion Failed', { detail: e, dismissable: true });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, openNewFile(editor, output, 'nlf')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function openNewFile(editor, input, targetExt) {
    return __awaiter(this, void 0, void 0, function () {
        var newEditorTab, fileName, newFileName, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileName = editor.getFileName().toString();
                    newFileName = path.basename(fileName, path.extname(fileName));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, atom.workspace.open(newFileName + "." + targetExt, {
                            pending: true
                        })];
                case 2:
                    newEditorTab = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    atom.notifications.addError(error_1, { dismissable: true });
                    return [2 /*return*/];
                case 4:
                    newEditorTab.setText(input);
                    return [2 /*return*/];
            }
        });
    });
}

function createBuildFile() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var editor, currentFilePath, notification_1, scriptFile, currentPath, buildFileSyntax, buildFileName, buildFilePath, fileExistsNotification_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    editor = atom.workspace.getActiveTextEditor();
                    if (!editor) {
                        atom.notifications.addWarning("**language-nsis**: No active editor", {
                            dismissable: false
                        });
                        return [2 /*return*/];
                    }
                    else if (editor.getGrammar().scopeName !== 'source.nsis') {
                        atom.notifications.addWarning("**language-nsis**: Unsupported document type", {
                            dismissable: false
                        });
                        return [2 /*return*/];
                    }
                    currentFilePath = ((_b = (_a = atom.workspace) === null || _a === void 0 ? void 0 : _a.getActiveTextEditor()) === null || _b === void 0 ? void 0 : _b.getPath()) || null;
                    if (!currentFilePath) {
                        notification_1 = atom.notifications.addWarning('File not saved', {
                            dismissable: true,
                            detail: 'You need to save this file manually before you can create a build-file',
                            buttons: [
                                {
                                    text: 'OK',
                                    onDidClick: function () {
                                        notification_1.dismiss();
                                    }
                                }
                            ]
                        });
                        return [2 /*return*/];
                    }
                    scriptFile = path.basename(currentFilePath);
                    currentPath = path.dirname(currentFilePath);
                    buildFileSyntax = String(getConfig('buildFileSyntax'));
                    buildFileName = ".atom-build." + buildFileSyntax.toLowerCase();
                    buildFilePath = path.join(currentPath, buildFileName);
                    return [4 /*yield*/, fileExists(buildFilePath)];
                case 1:
                    if (_c.sent()) {
                        fileExistsNotification_1 = atom.notifications.addWarning('File exists', {
                            dismissable: true,
                            detail: 'Do you really want to overwrite your existing build file?',
                            buttons: [
                                {
                                    text: 'Overwrite',
                                    onDidClick: function () {
                                        return __awaiter(this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                fileExistsNotification_1.dismiss();
                                                saveBuildFile({
                                                    script: scriptFile,
                                                    syntax: buildFileSyntax,
                                                    fileName: buildFileName,
                                                    filePath: buildFilePath
                                                });
                                                return [2 /*return*/];
                                            });
                                        });
                                    }
                                },
                                {
                                    text: 'Abort',
                                    onDidClick: function () {
                                        fileExistsNotification_1.dismiss();
                                        return;
                                    }
                                }
                            ]
                        });
                    }
                    saveBuildFile({
                        script: scriptFile,
                        syntax: buildFileSyntax,
                        fileName: buildFileName,
                        filePath: buildFilePath
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function saveBuildFile(options) {
    return __awaiter(this, void 0, void 0, function () {
        var buildFile, stringifier, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = {
                        name: options.scriptFile
                    };
                    return [4 /*yield*/, getMakensisPath()];
                case 1:
                    buildFile = (_a.cmd = _b.sent(),
                        _a.args = [
                            '{FILE_ACTIVE}'
                        ],
                        _a.cwd = '{FILE_ACTIVE_PATH}',
                        _a.errorMatch = '(\\r?\\n)(?<message>.+)(\\r?\\n)Error in script "(?<file>[^"]+)" on line (?<line>\\d+) -- aborting creation process',
                        _a.warningMatch = '[^!]warning: (?<message>.*) \\((?<file>(\\w{1}:)?[^:]+):(?<line>\\d+)\\)',
                        _a);
                    stringifier = options.syntax === 'yaml'
                        ? YAML__default['default'].dump(buildFile)
                        : JSON.stringify(buildFile, null, 2);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, fs.promises.writeFile(options.filePath, stringifier, 'utf-8')];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    console.log(error_1);
                    atom.notifications.addError("Failed to write " + options.fileName, {
                        detail: error_1,
                        dismissable: false
                    });
                    return [2 /*return*/];
                case 5:
                    atom.workspace.open(options.filePath);
                    return [2 /*return*/];
            }
        });
    });
}

var eventListenerProps = {
  onCopy: 'copy',
  onCut: 'cut',
  onPaste: 'paste',
  onCompositionEnd: 'compositionend',
  onCompositionStart: 'compositionstart',
  onCompositionUpdate: 'compositionupdate',
  onKeyDown: 'keydown',
  onKeyPress: 'keypress',
  onKeyUp: 'keyup',
  onFocus: 'focus',
  onBlur: 'blur',
  onChange: 'change',
  onInput: 'input',
  onSubmit: 'submit',
  onClick: 'click',
  onContextMenu: 'contextmenu',
  onDoubleClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragEnter: 'dragenter',
  onDragExit: 'dragexit',
  onDragLeave: 'dragleave',
  onDragOver: 'dragover',
  onDragStart: 'dragstart',
  onDrop: 'drop',
  onMouseDown: 'mousedown',
  onMouseEnter: 'mouseenter',
  onMouseLeave: 'mouseleave',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onSelect: 'select',
  onTouchCancel: 'touchcancel',
  onTouchEnd: 'touchend',
  onTouchMove: 'touchmove',
  onTouchStart: 'touchstart',
  onScroll: 'scroll',
  onWheel: 'wheel',
  onAbort: 'abort',
  onCanPlay: 'canplay',
  onCanPlayThrough: 'canplaythrough',
  onDurationChange: 'durationchange',
  onEmptied: 'emptied',
  onEncrypted: 'encrypted',
  onEnded: 'ended',
  onError: 'error',
  onLoadedData: 'loadeddata',
  onLoadedMetadata: 'loadedmetadata',
  onLoadStart: 'loadstart',
  onPause: 'pause',
  onPlay: 'play',
  onPlaying: 'playing',
  onProgress: 'progress',
  onRateChange: 'ratechange',
  onSeeked: 'seeked',
  onSeeking: 'seeking',
  onStalled: 'stalled',
  onSuspend: 'suspend',
  onTimeUpdate: 'timeupdate',
  onVolumeChange: 'volumechange',
  onWaiting: 'waiting',
  onLoad: 'load',
  onAnimationStart: 'animationstart',
  onAnimationEnd: 'animationend',
  onAnimationIteration: 'animationiteration',
  onTransitionEnd: 'transitionend'
};

// taken from https://github.com/facebook/react/blob/67f8524e88abbf1ac0fd86d38a0477d11fbc7b3e/src/isomorphic/classic/element/ReactDOMFactories.js#L153
var svgTags = new Set([
  'circle',
  'clipPath',
  'defs',
  'ellipse',
  'g',
  'image',
  'line',
  'linearGradient',
  'mask',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'stop',
  'svg',
  'text',
  'tspan'
]);

function dom (tag, props, ...children) {
  for (let i = 0; i < children.length;) {
    const child = children[i];
    switch (typeof child) {
      case 'string':
      case 'number':
        children[i] = {text: child};
        i++;
        break;

      case 'object':
        if (Array.isArray(child)) {
          children.splice(i, 1, ...child);
        } else if (!child) {
          children.splice(i, 1);
        } else {
          i++;
        }
        break;

      default:
        throw new Error(`Invalid child node: ${child}`)
    }
  }

  if (props) {
    for (const propName in props) {
      const eventName = eventListenerProps[propName];
      if (eventName) {
        if (!props.on) props.on = {};
        props.on[eventName] = props[propName];
      }
    }

    if (props.class) {
      props.className = props.class;
    }
  }

  return {tag, props, children}
}

const HTML_TAGS = [
  'a', 'abbr', 'address', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo',
  'blockquote', 'body', 'button', 'canvas', 'caption', 'cite', 'code',
  'colgroup', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl',
  'dt', 'em', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2',
  'h3', 'h4', 'h5', 'h6', 'head', 'header', 'html', 'i', 'iframe', 'ins', 'kbd',
  'label', 'legend', 'li', 'main', 'map', 'mark', 'menu', 'meter', 'nav',
  'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'pre',
  'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section',
  'select', 'small', 'span', 'strong', 'style', 'sub', 'summary', 'sup',
  'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title',
  'tr', 'u', 'ul', 'var', 'video', 'area', 'base', 'br', 'col', 'command',
  'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source',
  'track', 'wbr'
];

for (const tagName of HTML_TAGS) {
  dom[tagName] = (props, ...children) => {
    return dom(tagName, props, ...children)
  };
}

for (const tagName of svgTags) {
  dom[tagName] = (props, ...children) => {
    return dom(tagName, props, ...children)
  };
}


var dom_1 = dom;

// Based on https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
var svgAttributeTranslations = new Map([
  ['accentHeight', 'accent-height'],
  ['alignmentBaseline', 'alignment-baseline'],
  ['arabicForm', 'arabic-form'],
  ['baselineShift', 'baseline-shift'],
  ['capHeight', 'cap-height'],
  ['className', 'class'],
  ['clipPath', 'clip-path'],
  ['clipRule', 'clip-rule'],
  ['colorInterpolation', 'color-interpolation'],
  ['colorInterpolationFilters', 'color-interpolation-filters'],
  ['colorProfile', 'color-profile'],
  ['colorRendering', 'color-rendering'],
  ['dominantBaseline', 'dominant-baseline'],
  ['enableBackground', 'enable-background'],
  ['fillOpacity', 'fill-opacity'],
  ['fillRule', 'fill-rule'],
  ['floodColor', 'flood-color'],
  ['floodOpacity', 'flood-opacity'],
  ['fontFamily', 'font-family'],
  ['fontSize', 'font-size'],
  ['fontSizeAdjust', 'font-size-adjust'],
  ['fontStretch', 'font-stretch'],
  ['fontStyle', 'font-style'],
  ['fontVariant', 'font-variant'],
  ['fontWeight', 'font-weight'],
  ['glyphName', 'glyph-name'],
  ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
  ['glyphOrientationVertical', 'glyph-orientation-vertical'],
  ['horizAdvX', 'horiz-adv-x'],
  ['horizOriginX', 'horiz-origin-x'],
  ['letterSpacing', 'letter-spacing'],
  ['lightingColor', 'lighting-color'],
  ['markerEnd', 'marker-end'],
  ['markerMid', 'marker-mid'],
  ['markerStart', 'marker-start'],
  ['overlinePosition', 'overline-position'],
  ['overlineThickness', 'overline-thickness'],
  ['panose1', 'panose-1'],
  ['paintOrder', 'paint-order'],
  ['pointerEvents', 'pointer-events'],
  ['renderingIntent', 'rendering-intent'],
  ['shapeRendering', 'shape-rendering'],
  ['stopColor', 'stop-color'],
  ['stopOpacity', 'stop-opacity'],
  ['strikethroughPosition', 'strikethrough-position'],
  ['strikethroughThickness', 'strikethrough-thickness'],
  ['strokeDasharray', 'stroke-dasharray'],
  ['strokeDashoffset', 'stroke-dashoffset'],
  ['strokeLinecap', 'stroke-linecap'],
  ['strokeLinejoin', 'stroke-linejoin'],
  ['strokeMiterlimit', 'stroke-miterlimit'],
  ['strokeOpacity', 'stroke-opacity'],
  ['strokeWidth', 'stroke-width'],
  ['textAnchor', 'text-anchor'],
  ['textDecoration', 'text-decoration'],
  ['textRendering', 'text-rendering'],
  ['underlinePosition', 'underline-position'],
  ['underlineThickness', 'underline-thickness'],
  ['unicodeBidi', 'unicode-bidi'],
  ['unicodeRange', 'unicode-range'],
  ['unitsPerEm', 'units-per-em'],
  ['vAlphabetic', 'v-alphabetic'],
  ['vHanging', 'v-hanging'],
  ['vIdeographic', 'v-ideographic'],
  ['vMathematical', 'v-mathematical'],
  ['vertAdvY', 'vert-adv-y'],
  ['vertOriginX', 'vert-origin-x'],
  ['vertOriginY', 'vert-origin-y'],
  ['wordSpacing', 'word-spacing'],
  ['writingMode', 'writing-mode'],
  ['xHeight', 'x-height'],
]);

const EMPTY = '';

var updateProps_1 = function (domNode, oldVirtualNode, newVirtualNode, options) {
  const oldProps = oldVirtualNode && oldVirtualNode.props;
  const newProps = newVirtualNode.props;

  let refs, listenerContext;
  if (options) {
    refs = options.refs;
    listenerContext = options.listenerContext;
  }
  updateProps(domNode, oldVirtualNode, oldProps, newVirtualNode, newProps);
  if (refs) updateRef(domNode, oldProps && oldProps.ref, newProps && newProps.ref, refs);
  updateEventListeners(domNode, oldVirtualNode, newVirtualNode, listenerContext);
};

// Using var to avoid "Unsupported phi use of variable" deoptimization in Chrome 56
function updateProps (domNode, oldVirtualNode, oldProps, newVirtualNode, newProps) {
  if (oldProps) {
    for (var name in oldProps) {
      if (name === 'ref' || name === 'on') continue
      if (name in eventListenerProps) continue
      if (!newProps || !(name in newProps)) {
        if (name === 'dataset') {
          updateProps(domNode.dataset, null, oldProps && oldProps.dataset, null, null);
        } else if (name !== 'innerHTML' && oldVirtualNode && svgTags.has(oldVirtualNode.tag)) {
          domNode.removeAttribute(svgAttributeTranslations.get(name) || name);
        } else {
          // Clear property for objects that don't support deletion (e.g. style
          // or className). If we used null instead of an empty string, the DOM
          // could sometimes stringify the value and mistakenly assign 'null'.
          domNode[name] = EMPTY;
          delete domNode[name];
        }
      }
    }
  }

  if (newProps) {
    for (var name in newProps) {
      if (name === 'ref' || name === 'on') continue
      if (name in eventListenerProps) continue
      var oldValue = oldProps && oldProps[name];
      var newValue = newProps[name];
      if (name === 'dataset') {
        updateNestedProps(domNode.dataset, oldValue, newValue, false);
      } else if (name === 'style' && typeof newValue !== 'string') {
        if (typeof oldValue === 'string') {
          domNode.style = '';
          oldValue = null;
        }
        updateNestedProps(domNode.style, oldValue, newValue, true);
      } else if (name === 'attributes') {
        updateAttributes(domNode, oldValue, newValue);
      } else {
        if (newValue !== oldValue) {
          if (name !== 'innerHTML' && newVirtualNode && svgTags.has(newVirtualNode.tag)) {
            domNode.setAttribute(svgAttributeTranslations.get(name) || name, newValue);
          } else if (newVirtualNode && newVirtualNode.tag === 'input'
            && name === 'value' && domNode[name] === newValue) ; else {
            domNode[name] = newValue;
          }
        }
      }
    }
  }
}

function updateNestedProps (domProps, oldProps, newProps, isStyleObject) {
  if (oldProps) {
    for (var name in oldProps) {
      if (!newProps || !(name in newProps)) {
        if (isStyleObject) {
          domProps[name] = EMPTY;
        } else {
          delete domProps[name];
        }
      }
    }
  }

  if (newProps) {
    for (var name in newProps) {
      const oldValue = oldProps && oldProps[name];
      const newValue = newProps[name];
      if (newValue !== oldValue) {
        domProps[name] = newValue;
      }
    }
  }
}

function updateAttributes (domNode, oldAttributes, newAttributes) {
  if (oldAttributes) {
    for (var name in oldAttributes) {
      if (!newAttributes || !(name in newAttributes)) {
        domNode.removeAttribute(name);
      }
    }
  }

  if (newAttributes) {
    for (var name in newAttributes) {
      const oldValue = oldAttributes && oldAttributes[name];
      const newValue = newAttributes[name];
      if (newValue !== oldValue) {
        domNode.setAttribute(name, newValue);
      }
    }
  }
}

function updateRef (domNode, oldRefName, newRefName, refs) {
  if (newRefName !== oldRefName) {
    if (oldRefName && refs[oldRefName] === domNode) delete refs[oldRefName];
    if (newRefName) refs[newRefName] = domNode;
  }
}

function updateEventListeners (domNode, oldVirtualNode, newVirtualNode, listenerContext) {
  const oldListeners = oldVirtualNode && oldVirtualNode.props && oldVirtualNode.props.on;
  const newListeners = newVirtualNode.props && newVirtualNode.props.on;

  for (const eventName in oldListeners) {
    if (!(newListeners && eventName in newListeners)) {
      let listenerToRemove;
      if (oldVirtualNode && oldVirtualNode.boundListeners && oldVirtualNode.boundListeners[eventName]) {
        listenerToRemove = oldVirtualNode.boundListeners[eventName];
      } else {
        listenerToRemove = oldListeners[eventName];
      }
      domNode.removeEventListener(eventName, listenerToRemove);
    }
  }

  for (const eventName in newListeners) {
    const oldListener = oldListeners && oldListeners[eventName];
    const newListener = newListeners[eventName];

    if (newListener !== oldListener) {
      if (oldListener) {
        let listenerToRemove;
        if (oldVirtualNode && oldVirtualNode.boundListeners && oldVirtualNode.boundListeners[eventName]) {
          listenerToRemove = oldVirtualNode.boundListeners[eventName];
        } else {
          listenerToRemove = oldListener;
        }
        domNode.removeEventListener(eventName, listenerToRemove);
      }
      if (newListener) {
        let listenerToAdd;
        if (listenerContext) {
          listenerToAdd = newListener.bind(listenerContext);
          if (!newVirtualNode.boundListeners) newVirtualNode.boundListeners = {};
          newVirtualNode.boundListeners[eventName] = listenerToAdd;
        } else {
          listenerToAdd = newListener;
        }
        domNode.addEventListener(eventName, listenerToAdd);
      }
    }
  }
}

function render (virtualNode, options) {
  let domNode;
  if (virtualNode.text != null) {
    domNode = document.createTextNode(virtualNode.text);
  } else {
    const {tag, children} = virtualNode;
    let {props} = virtualNode;

    if (typeof tag === 'function') {
      let ref;
      if (props && props.ref) {
        ref = props.ref;
      }
      const component = new tag(props || {}, children);
      virtualNode.component = component;
      domNode = component.element;
      if (options && options.refs && ref) {
        options.refs[ref] = component;
      }
    } else if (svgTags.has(tag)) {
      domNode = document.createElementNS("http://www.w3.org/2000/svg", tag);
      if (children) addChildren(domNode, children, options);
      if (props) updateProps_1(domNode, null, virtualNode, options);
    } else {
      domNode = document.createElement(tag);
      if (children) addChildren(domNode, children, options);
      if (props) updateProps_1(domNode, null, virtualNode, options);
    }
  }
  virtualNode.domNode = domNode;
  return domNode
}

function addChildren (parent, children, options) {
  for (let i = 0; i < children.length; i++) {
    parent.appendChild(render(children[i], options));
  }
}

var render_1 = render;

function patch (oldVirtualNode, newVirtualNode, options) {
  const oldNode = oldVirtualNode.domNode;

  if (newVirtualNode === oldVirtualNode) return oldNode

  if (virtualNodesAreEqual(oldVirtualNode, newVirtualNode)) {
    let newNode;
    if (newVirtualNode.text != null) {
      oldNode.nodeValue = newVirtualNode.text;
      newNode = oldNode;
    } else {
      if (typeof newVirtualNode.tag === 'function') {
        newNode = updateComponent(oldVirtualNode, newVirtualNode, options);
      } else {
        updateChildren(oldNode, oldVirtualNode.children, newVirtualNode.children, options);
        updateProps_1(oldNode, oldVirtualNode, newVirtualNode, options);
        newNode = oldNode;
      }
    }
    newVirtualNode.domNode = newNode;
    if (newNode !== oldNode && oldNode.parentNode) {
      oldNode.parentNode.replaceChild(newNode, oldNode);
    }
    return newNode
  } else {
    const parentNode = oldNode.parentNode;
    const nextSibling = oldNode.nextSibling;
    removeVirtualNode(oldVirtualNode, options && options.refs);
    const newNode = render_1(newVirtualNode, options);
    if (parentNode) parentNode.insertBefore(newNode, nextSibling);
    newVirtualNode.domNode = newNode;
    return newNode
  }
}

function updateComponent (oldVirtualNode, newVirtualNode, options) {
  const {component, props: oldProps} = oldVirtualNode;
  let {props: newProps, children: newChildren} = newVirtualNode;
  newVirtualNode.component = component;
  if (options && options.refs) {
    const refs = options.refs;
    const oldRefName = oldProps && oldProps.ref;
    const newRefName = newProps && newProps.ref;
    if (newRefName !== oldRefName) {
      if (oldRefName && refs[oldRefName] === component) delete refs[oldRefName];
      if (newRefName) refs[newRefName] = component;
    }
  }
  component.update(newProps || {}, newChildren);
  return component.element
}

let mapPool = [new Map(), new Map(), new Map(), new Map()];

function updateChildren (parentElement, oldChildren, newChildren, options) {
  var oldStartIndex = 0;
  var oldEndIndex = oldChildren.length - 1;
  var oldStartChild = oldChildren[0];
  var oldEndChild = oldChildren[oldEndIndex];

  var newStartIndex = 0;
  var newEndIndex = newChildren.length - 1;
  var newStartChild = newChildren[0];
  var newEndChild = newChildren[newEndIndex];

  var oldIndicesByKey;

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (!oldStartChild) {
      oldStartChild = oldChildren[++oldStartIndex];
    } else if (!oldEndChild) {
      oldEndChild = oldChildren[--oldEndIndex];
    } else if (virtualNodesAreEqual(oldStartChild, newStartChild)) {
      patch(oldStartChild, newStartChild, options);
      oldStartChild = oldChildren[++oldStartIndex];
      newStartChild = newChildren[++newStartIndex];
    } else if (virtualNodesAreEqual(oldEndChild, newEndChild)) {
      patch(oldEndChild, newEndChild, options);
      oldEndChild = oldChildren[--oldEndIndex];
      newEndChild = newChildren[--newEndIndex];
    } else if (virtualNodesAreEqual(oldStartChild, newEndChild)) {
      patch(oldStartChild, newEndChild, options);
      parentElement.insertBefore(oldStartChild.domNode, oldEndChild.domNode.nextSibling);
      oldStartChild = oldChildren[++oldStartIndex];
      newEndChild = newChildren[--newEndIndex];
    } else if (virtualNodesAreEqual(oldEndChild, newStartChild)) {
      patch(oldEndChild, newStartChild, options);
      parentElement.insertBefore(oldEndChild.domNode, oldStartChild.domNode);
      oldEndChild = oldChildren[--oldEndIndex];
      newStartChild = newChildren[++newStartIndex];
    } else {
      if (!oldIndicesByKey) {
        if (mapPool.length > 0) {
          oldIndicesByKey = mapPool.pop();
          oldIndicesByKey.clear();
        } else {
          oldIndicesByKey = new Map();
        }
        mapOldKeysToIndices(oldIndicesByKey, oldChildren, oldStartIndex, oldEndIndex);
      }

      var key = getKey(newStartChild);
      var oldIndex = key ? oldIndicesByKey.get(key) : null;
      if (oldIndex == null) {
        parentElement.insertBefore(render_1(newStartChild, options), oldStartChild.domNode);
        newStartChild = newChildren[++newStartIndex];
      } else {
        var oldChildToMove = oldChildren[oldIndex];
        patch(oldChildToMove, newStartChild, options);
        oldChildren[oldIndex] = undefined;
        parentElement.insertBefore(oldChildToMove.domNode, oldStartChild.domNode);
        newStartChild = newChildren[++newStartIndex];
      }
    }
  }

  if (oldStartIndex > oldEndIndex) {
    var subsequentElement = newChildren[newEndIndex + 1] ? newChildren[newEndIndex + 1].domNode : null;
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      parentElement.insertBefore(render_1(newChildren[i], options), subsequentElement);
    }
  } else if (newStartIndex > newEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      var child = oldChildren[i];
      if (child) removeVirtualNode(child, options && options.refs);
    }
  }

  if (oldIndicesByKey) mapPool.push(oldIndicesByKey);
}

function removeVirtualNode (virtualNode, refs, removeDOMNode = true) {
  const {domNode, props, children, component} = virtualNode;
  const ref = props && props.ref;
  if (component) {
    if (refs && ref && refs[ref] === component) delete refs[ref];
    if (component.destroy) component.destroy();
  } else {
    if (refs && ref && refs[ref] === domNode) delete refs[ref];
    if (children) {
      for (let i = 0; i < children.length; i++) {
        removeVirtualNode(children[i], refs, false);
      }
    }
  }

  if (removeDOMNode) domNode.remove();
}

function virtualNodesAreEqual (oldVirtualNode, newVirtualNode) {
  return (
    getKey(oldVirtualNode) === getKey(newVirtualNode)
      && oldVirtualNode.tag === newVirtualNode.tag
  )
}

function getKey (virtualNode) {
  return virtualNode.props ? virtualNode.props.key : undefined
}

function mapOldKeysToIndices (oldIndicesByKey, children, startIndex, endIndex) {
  for (let i = startIndex; i <= endIndex; i++) {
    const key = getKey(children[i]);
    if (key) oldIndicesByKey.set(key, i);
  }
  return oldIndicesByKey
}

var patch_1 = patch;

// If the scheduler is not customized via `etch.setScheduler`, an instance of
// this class will be used to schedule updates to the document. The
// `updateDocument` method accepts functions to be run at some point in the
// future, then runs them on the next animation frame.
var defaultScheduler = class DefaultScheduler {
  constructor () {
    this.updateRequests = [];
    this.readRequests = [];
    this.pendingAnimationFrame = null;
    this.performUpdates = this.performUpdates.bind(this);
    this.performingUpdates = false;
  }

  // Enqueues functions that write to the DOM to be performed on the next
  // animation frame. Functions passed to this method should *never* read from
  // the DOM, because that could cause synchronous reflows.
  updateDocument (fn) {
    this.updateRequests.push(fn);
    if (!this.pendingAnimationFrame) {
      this.pendingAnimationFrame = window.requestAnimationFrame(this.performUpdates);
    }
  }

  readDocument (fn) {
    this.readRequests.push(fn);
    if (!this.pendingAnimationFrame) {
      this.pendingAnimationFrame = window.requestAnimationFrame(this.performUpdates);
    }
  }

  // Returns a promise that will resolve at the end of the next update cycle,
  // after all the functions passed to `updateDocument` and `updateDocumentSync`
  // have been run.
  getNextUpdatePromise () {
    if (!this.nextUpdatePromise) {
      this.nextUpdatePromise = new Promise(resolve => {
        this.resolveNextUpdatePromise = resolve;
      });
    }
    return this.nextUpdatePromise
  }

  // Performs all the pending document updates. If running these update
  // functions causes *more* updates to be enqueued, they are run synchronously
  // in this update cycle without waiting for another frame.
  performUpdates () {
    while (this.updateRequests.length > 0) {
      this.updateRequests.shift()();
    }

    // We don't clear the pending frame until all update requests are processed.
    // This ensures updates requested within other updates are processed in the
    // current frame.
    this.pendingAnimationFrame = null;

    // Now that updates are processed, we can perform all pending document reads
    // without the risk of interleaving them with writes and causing layout
    // thrashing.
    while (this.readRequests.length > 0) {
      this.readRequests.shift()();
    }

    if (this.nextUpdatePromise) {
      let resolveNextUpdatePromise = this.resolveNextUpdatePromise;
      this.nextUpdatePromise = null;
      this.resolveNextUpdatePromise = null;
      resolveNextUpdatePromise();
    }
  }
};

// This file implements getter and setter functions for a scheduler to be used
// by this library when updating the DOM. The scheduler's job is to ensure that
// DOM interaction is performed efficiently. When using `etch` in Atom, you
// should tell `etch` to use Atom's scheduler by calling
// `setScheduler(atom.views)`.
//
// Schedulers should support the following interface:
// * `updateDocument(fn)` This method is asynchronous. It enqueues functions to
// be executed later.
// * `getNextUpdatePromise()` This function should return a promise that
// resolves after all pending document update functions have been invoked.
//
// Schedulers could support the following optional methods, which are supported
// by Atom's scheduler.
//
// * `readDocument` This method can be invoked by clients other than `etch` when
// it is necessary to read from the DOM. Functions enqueued via this method
// should not be run until all document update functions have been executed.
// Batching updates and reads in this way will prevent forced synchronous
// reflows.
// * `pollDocument` This method is similar to `readDocument`, but it runs the
// associated functions repeatedly. Again, they should be scheduled in such a
// way so as to avoid synchronous reflows.



let scheduler = null;

var setScheduler = function setScheduler (customScheduler) {
  scheduler = customScheduler;
};

var getScheduler = function getScheduler () {
  if (!scheduler) {
    scheduler = new defaultScheduler();
  }
  return scheduler
};

var schedulerAssignment = {
	setScheduler: setScheduler,
	getScheduler: getScheduler
};

const {getScheduler: getScheduler$1} = schedulerAssignment;

const componentsWithPendingUpdates = new WeakSet();
let syncUpdatesInProgressCounter = 0;
let syncDestructionsInProgressCounter = 0;

function isValidVirtualNode (virtualNode) {
  return virtualNode != null && virtualNode !== false
}

// This function associates a component object with a DOM element by calling
// the components `render` method, assigning an `.element` property on the
// object and also returning the element.
//
// It also assigns a `virtualNode` property based on the return value of the
// `render` method. This will be used later by `performElementUpdate` to diff
// the new results of `render` with the previous results when updating the
// component's element.
//
// Finally, this function also associates the component with a `refs` object,
// which is populated with references to elements based on `ref` properties on
// nodes of the `virtual-dom` tree. Before calling into `virtual-dom` to create
// the DOM tree, it pushes this `refs` object to a shared stack so it can be
// accessed by hooks during the creation of individual elements.
function initialize(component) {
  if (typeof component.update !== 'function') {
    throw new Error('Etch components must implement `update(props, children)`.')
  }

  let virtualNode = component.render();
  if (!isValidVirtualNode(virtualNode)) {
    let namePart = component.constructor && component.constructor.name ? ' in ' + component.constructor.name : '';
    throw new Error('invalid falsy value ' + virtualNode + ' returned from render()' + namePart)
  }

  component.refs = {};
  component.virtualNode = virtualNode;
  component.element = render_1(component.virtualNode, {
    refs: component.refs, listenerContext: component
  });
}

// This function receives a component that has already been associated with an
// element via a previous call to `initialize` and updates this element by
// calling `render` on the component.
//
// When called in normal circumstances, it uses the scheduler to defer this
// update until the next animation frame, and will only perform one update of a
// given component in a given frame. This means you can call `update`
// repeatedly in a given tick without causing redundant updates.
//
// If this function called during another synchronous update (for example, as a
// result of a call to `update` on a child component), the update is performed
// synchronously.
//
// Returns a promise that will resolve when the requested update has been
// completed.
function update (component, replaceNode=true) {
  if (syncUpdatesInProgressCounter > 0) {
    updateSync(component, replaceNode);
    return Promise.resolve()
  }

  let scheduler = getScheduler$1();

  if (!componentsWithPendingUpdates.has(component)) {
    componentsWithPendingUpdates.add(component);
    scheduler.updateDocument(function () {
      componentsWithPendingUpdates.delete(component);
      updateSync(component, replaceNode);
    });
  }

  return scheduler.getNextUpdatePromise()
}

// Synchronsly updates the DOM element associated with a component object. .
// This method assumes the presence of `.element` and `.virtualNode`
// properties on the component, which are assigned in the `initialize`
// function.
//
// It calls `render` on the component to obtain the desired state of the DOM,
// then `diff`s it with the previous state and `patch`es the element based on
// the resulting diff. During the patch operation, it pushes the component's
// `refs` object to a shared stack so that references to DOM elements can be
// updated.
//
// If `update` is called during the invocation of `updateSync`,
// the requests are processed synchronously as well. We track whether this is
// the case by incrementing and decrementing `syncUpdatesInProgressCounter`
// around the call.
//
// For now, etch does not allow the root tag of the `render` method to change
// between invocations, because we want to preserve a one-to-one relationship
// between component objects and DOM elements for simplicity.
function updateSync (component, replaceNode=true) {
  if (!isValidVirtualNode(component.virtualNode)) {
    throw new Error(`${component.constructor ? component.constructor.name + ' instance' : component} is not associated with a valid virtualNode. Perhaps this component was never initialized?`)
  }

  if (component.element == null) {
    throw new Error(`${component.constructor ? component.constructor.name + ' instance' : component} is not associated with a DOM element. Perhaps this component was never initialized?`)
  }

  let newVirtualNode = component.render();
  if (!isValidVirtualNode(newVirtualNode)) {
    const namePart = component.constructor && component.constructor.name ? ' in ' + component.constructor.name : '';
    throw new Error('invalid falsy value ' + newVirtualNode + ' returned from render()' + namePart)
  }

  syncUpdatesInProgressCounter++;
  let oldVirtualNode = component.virtualNode;
  let oldDomNode = component.element;
  let newDomNode = patch_1(oldVirtualNode, newVirtualNode, {
    refs: component.refs,
    listenerContext: component
  });
  component.virtualNode = newVirtualNode;
  if (newDomNode !== oldDomNode && !replaceNode) {
    throw new Error('The root node type changed on update, but the update was performed with the replaceNode option set to false')
  } else {
    component.element = newDomNode;
  }

  // We can safely perform additional writes after a DOM update synchronously,
  // but any reads need to be deferred until all writes are completed to avoid
  // DOM thrashing. Requested reads occur at the end of the the current frame
  // if this method was invoked via the scheduler. Otherwise, if `updateSync`
  // was invoked outside of the scheduler, the default scheduler will defer
  // reads until the next animation frame.
  if (typeof component.writeAfterUpdate === 'function') {
    component.writeAfterUpdate();
  }
  if (typeof component.readAfterUpdate === 'function') {
    getScheduler$1().readDocument(function () {
      component.readAfterUpdate();
    });
  }

  syncUpdatesInProgressCounter--;
}

// Removes the component's associated element and calls `destroy` on any child
// components. Normally, this function is asynchronous and will perform the
// destruction on the next animation frame. If called as the result of another
// update or destruction, it calls `destroy` on child components synchronously.
// If called as the result of destroying a component higher in the DOM, the
// element is not removed to avoid redundant DOM manipulation. Returns a promise
// that resolves when the destruction is completed.
function destroy (component, removeNode=true) {
  if (syncUpdatesInProgressCounter > 0 || syncDestructionsInProgressCounter > 0) {
    destroySync(component, removeNode);
    return Promise.resolve()
  }

  let scheduler = getScheduler$1();
  scheduler.updateDocument(function () {
    destroySync(component, removeNode);
  });
  return scheduler.getNextUpdatePromise()
}

// A synchronous version of `destroy`.
//
// Note that we track whether `destroy` calls are in progress and only remove
// the element if we are not a nested call.
function destroySync (component, removeNode=true) {
  syncDestructionsInProgressCounter++;
  destroyChildComponents(component.virtualNode);
  if (syncDestructionsInProgressCounter === 1 && removeNode) component.element.remove();
  syncDestructionsInProgressCounter--;
}

function destroyChildComponents(virtualNode) {
  if (virtualNode.component && typeof virtualNode.component.destroy === 'function') {
    virtualNode.component.destroy();
  } else if (virtualNode.children) {
    virtualNode.children.forEach(destroyChildComponents);
  }
}

var componentHelpers = {
  initialize,
  update, updateSync,
  destroy, destroySync
};

const {initialize: initialize$1, update: update$1, updateSync: updateSync$1, destroy: destroy$1, destroySync: destroySync$1} = componentHelpers;
const {setScheduler: setScheduler$1, getScheduler: getScheduler$2} = schedulerAssignment;

var lib$4 = {
  dom: dom_1, render: render_1,
  initialize: initialize$1, update: update$1, updateSync: updateSync$1, destroy: destroy$1, destroySync: destroySync$1,
  setScheduler: setScheduler$1, getScheduler: getScheduler$2
};

var scorer = createCommonjsModule(function (module, exports) {
(function() {
  var PathSeparator, queryIsLastPathSegment;

  PathSeparator = path__default['default'].sep;

  exports.basenameScore = function(string, query, score) {
    var base, depth, index, lastCharacter, segmentCount, slashCount;
    index = string.length - 1;
    while (string[index] === PathSeparator) {
      index--;
    }
    slashCount = 0;
    lastCharacter = index;
    base = null;
    while (index >= 0) {
      if (string[index] === PathSeparator) {
        slashCount++;
        if (base == null) {
          base = string.substring(index + 1, lastCharacter + 1);
        }
      } else if (index === 0) {
        if (lastCharacter < string.length - 1) {
          if (base == null) {
            base = string.substring(0, lastCharacter + 1);
          }
        } else {
          if (base == null) {
            base = string;
          }
        }
      }
      index--;
    }
    if (base === string) {
      score *= 2;
    } else if (base) {
      score += exports.score(base, query);
    }
    segmentCount = slashCount + 1;
    depth = Math.max(1, 10 - segmentCount);
    score *= depth * 0.01;
    return score;
  };

  exports.score = function(string, query) {
    var character, characterScore, indexInQuery, indexInString, lowerCaseIndex, minIndex, queryLength, queryScore, stringLength, totalCharacterScore, upperCaseIndex, _ref;
    if (string === query) {
      return 1;
    }
    if (queryIsLastPathSegment(string, query)) {
      return 1;
    }
    totalCharacterScore = 0;
    queryLength = query.length;
    stringLength = string.length;
    indexInQuery = 0;
    indexInString = 0;
    while (indexInQuery < queryLength) {
      character = query[indexInQuery++];
      lowerCaseIndex = string.indexOf(character.toLowerCase());
      upperCaseIndex = string.indexOf(character.toUpperCase());
      minIndex = Math.min(lowerCaseIndex, upperCaseIndex);
      if (minIndex === -1) {
        minIndex = Math.max(lowerCaseIndex, upperCaseIndex);
      }
      indexInString = minIndex;
      if (indexInString === -1) {
        return 0;
      }
      characterScore = 0.1;
      if (string[indexInString] === character) {
        characterScore += 0.1;
      }
      if (indexInString === 0 || string[indexInString - 1] === PathSeparator) {
        characterScore += 0.8;
      } else if ((_ref = string[indexInString - 1]) === '-' || _ref === '_' || _ref === ' ') {
        characterScore += 0.7;
      }
      string = string.substring(indexInString + 1, stringLength);
      totalCharacterScore += characterScore;
    }
    queryScore = totalCharacterScore / queryLength;
    return ((queryScore * (queryLength / stringLength)) + queryScore) / 2;
  };

  queryIsLastPathSegment = function(string, query) {
    if (string[string.length - query.length - 1] === PathSeparator) {
      return string.lastIndexOf(query) === string.length - query.length;
    }
  };

}).call(commonjsGlobal);
});

var filter = createCommonjsModule(function (module) {
(function() {
  var pluckCandidates, scorer$1, sortCandidates;

  scorer$1 = scorer;

  pluckCandidates = function(a) {
    return a.candidate;
  };

  sortCandidates = function(a, b) {
    return b.score - a.score;
  };

  module.exports = function(candidates, query, queryHasSlashes, _arg) {
    var candidate, key, maxResults, score, scoredCandidates, string, _i, _len, _ref;
    _ref = _arg != null ? _arg : {}, key = _ref.key, maxResults = _ref.maxResults;
    if (query) {
      scoredCandidates = [];
      for (_i = 0, _len = candidates.length; _i < _len; _i++) {
        candidate = candidates[_i];
        string = key != null ? candidate[key] : candidate;
        if (!string) {
          continue;
        }
        score = scorer$1.score(string, query, queryHasSlashes);
        if (!queryHasSlashes) {
          score = scorer$1.basenameScore(string, query, score);
        }
        if (score > 0) {
          scoredCandidates.push({
            candidate: candidate,
            score: score
          });
        }
      }
      scoredCandidates.sort(sortCandidates);
      candidates = scoredCandidates.map(pluckCandidates);
    }
    if (maxResults != null) {
      candidates = candidates.slice(0, maxResults);
    }
    return candidates;
  };

}).call(commonjsGlobal);
});

var matcher = createCommonjsModule(function (module, exports) {
(function() {
  var PathSeparator;

  PathSeparator = path__default['default'].sep;

  exports.basenameMatch = function(string, query) {
    var base, index, lastCharacter;
    index = string.length - 1;
    while (string[index] === PathSeparator) {
      index--;
    }
    lastCharacter = index;
    base = null;
    while (index >= 0) {
      if (string[index] === PathSeparator) {
        if (base == null) {
          base = string.substring(index + 1, lastCharacter + 1);
        }
      } else if (index === 0) {
        if (lastCharacter < string.length - 1) {
          if (base == null) {
            base = string.substring(0, lastCharacter + 1);
          }
        } else {
          if (base == null) {
            base = string;
          }
        }
      }
      index--;
    }
    return exports.match(base, query, string.length - base.length);
  };

  exports.match = function(string, query, stringOffset) {
    var character, indexInQuery, indexInString, lowerCaseIndex, matches, minIndex, queryLength, stringLength, upperCaseIndex, _results;
    if (stringOffset == null) {
      stringOffset = 0;
    }
    if (string === query) {
      return (function() {
        _results = [];
        for (var _i = stringOffset, _ref = stringOffset + string.length; stringOffset <= _ref ? _i < _ref : _i > _ref; stringOffset <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this);
    }
    queryLength = query.length;
    stringLength = string.length;
    indexInQuery = 0;
    indexInString = 0;
    matches = [];
    while (indexInQuery < queryLength) {
      character = query[indexInQuery++];
      lowerCaseIndex = string.indexOf(character.toLowerCase());
      upperCaseIndex = string.indexOf(character.toUpperCase());
      minIndex = Math.min(lowerCaseIndex, upperCaseIndex);
      if (minIndex === -1) {
        minIndex = Math.max(lowerCaseIndex, upperCaseIndex);
      }
      indexInString = minIndex;
      if (indexInString === -1) {
        return [];
      }
      matches.push(stringOffset + indexInString);
      stringOffset += indexInString + 1;
      string = string.substring(indexInString + 1, stringLength);
    }
    return matches;
  };

}).call(commonjsGlobal);
});

var fuzzaldrin = createCommonjsModule(function (module) {
(function() {
  var PathSeparator, SpaceRegex, filter$1, matcher$1, scorer$1;

  scorer$1 = scorer;

  filter$1 = filter;

  matcher$1 = matcher;

  PathSeparator = path__default['default'].sep;

  SpaceRegex = /\ /g;

  module.exports = {
    filter: function(candidates, query, options) {
      var queryHasSlashes;
      if (query) {
        queryHasSlashes = query.indexOf(PathSeparator) !== -1;
        query = query.replace(SpaceRegex, '');
      }
      return filter$1(candidates, query, queryHasSlashes, options);
    },
    score: function(string, query) {
      var queryHasSlashes, score;
      if (!string) {
        return 0;
      }
      if (!query) {
        return 0;
      }
      if (string === query) {
        return 2;
      }
      queryHasSlashes = query.indexOf(PathSeparator) !== -1;
      query = query.replace(SpaceRegex, '');
      score = scorer$1.score(string, query);
      if (!queryHasSlashes) {
        score = scorer$1.basenameScore(string, query, score);
      }
      return score;
    },
    match: function(string, query) {
      var baseMatches, index, matches, queryHasSlashes, seen, _results;
      if (!string) {
        return [];
      }
      if (!query) {
        return [];
      }
      if (string === query) {
        return (function() {
          _results = [];
          for (var _i = 0, _ref = string.length; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this);
      }
      queryHasSlashes = query.indexOf(PathSeparator) !== -1;
      query = query.replace(SpaceRegex, '');
      matches = matcher$1.match(string, query);
      if (!queryHasSlashes) {
        baseMatches = matcher$1.basenameMatch(string, query);
        matches = matches.concat(baseMatches).sort(function(a, b) {
          return a - b;
        });
        seen = null;
        index = 0;
        while (index < matches.length) {
          if (index && seen === matches[index]) {
            matches.splice(index, 1);
          } else {
            seen = matches[index];
            index++;
          }
        }
      }
      return matches;
    }
  };

}).call(commonjsGlobal);
});

const {Disposable, CompositeDisposable, TextEditor} = require$$0__default$3['default'];

const $ = lib$4.dom;


var selectListView = class SelectListView {
  static setScheduler (scheduler) {
    lib$4.setScheduler(scheduler);
  }

  static getScheduler (scheduler) {
    return lib$4.getScheduler()
  }

  constructor (props) {
    this.props = props;
    if (!this.props.hasOwnProperty('initialSelectionIndex')) {
      this.props.initialSelectionIndex = 0;
    }
    if (props.initiallyVisibleItemCount) {
      this.initializeVisibilityObserver();
    }
    this.computeItems(false);
    this.disposables = new CompositeDisposable();
    lib$4.initialize(this);
    this.element.classList.add('select-list');
    this.disposables.add(this.refs.queryEditor.onDidChange(this.didChangeQuery.bind(this)));
    if (!props.skipCommandsRegistration) {
      this.disposables.add(this.registerAtomCommands());
    }
    const editorElement = this.refs.queryEditor.element;
    const didLoseFocus = this.didLoseFocus.bind(this);
    editorElement.addEventListener('blur', didLoseFocus);

    // When clicking the scrollbar of the items list, a blur event will be triggered
    // on the query editor element, but we don't want to treat that as a cancellation.
    // This mousedown listener allows us to detect this case and restore focus to the
    // query editor. This is based on https://stackoverflow.com/a/1480178.
    this.didClickItemsList = false;
    this.element.addEventListener('mousedown', event => {
      if (event.target === this.refs.items) {
        this.didClickItemsList = true;
      }
    });
    this.disposables.add(new Disposable(() => { editorElement.removeEventListener('blur', didLoseFocus); }));
  }

  initializeVisibilityObserver () {
    this.visibilityObserver = new IntersectionObserver(changes => {
      for (const change of changes) {
        if (change.intersectionRatio > 0) {
          const element = change.target;
          this.visibilityObserver.unobserve(element);
          const index = Array.from(this.refs.items.children).indexOf(element);
          if (index >= 0) {
            this.renderItemAtIndex(index);
          }
        }
      }
    });
  }

  focus () {
    this.refs.queryEditor.element.focus();
  }

  didLoseFocus (event) {
    if (this.didClickItemsList || this.element.contains(event.relatedTarget)) {
      this.didClickItemsList = false;
      this.refs.queryEditor.element.focus();
    } else if (document.hasFocus()) {
      this.cancelSelection();
    }
  }

  reset () {
    this.refs.queryEditor.setText('');
  }

  destroy () {
    this.disposables.dispose();
    if (this.visibilityObserver) this.visibilityObserver.disconnect();
    return lib$4.destroy(this)
  }

  registerAtomCommands () {
    return commonjsGlobal.atom.commands.add(this.element, {
      'core:move-up': (event) => {
        this.selectPrevious();
        event.stopPropagation();
      },
      'core:move-down': (event) => {
        this.selectNext();
        event.stopPropagation();
      },
      'core:move-to-top': (event) => {
        this.selectFirst();
        event.stopPropagation();
      },
      'core:move-to-bottom': (event) => {
        this.selectLast();
        event.stopPropagation();
      },
      'core:confirm': (event) => {
        this.confirmSelection();
        event.stopPropagation();
      },
      'core:cancel': (event) => {
        this.cancelSelection();
        event.stopPropagation();
      }
    })
  }

  update (props = {}) {
    let shouldComputeItems = false;

    if (props.hasOwnProperty('items')) {
      this.props.items = props.items;
      shouldComputeItems = true;
    }

    if (props.hasOwnProperty('maxResults')) {
      this.props.maxResults = props.maxResults;
      shouldComputeItems = true;
    }

    if (props.hasOwnProperty('filter')) {
      this.props.filter = props.filter;
      shouldComputeItems = true;
    }

    if (props.hasOwnProperty('filterQuery')) {
      this.props.filterQuery = props.filterQuery;
      shouldComputeItems = true;
    }

    if (props.hasOwnProperty('query')) {
      // Items will be recomputed as part of the change event handler, so we
      // don't need to recompute them again at the end of this function.
      this.refs.queryEditor.setText(props.query);
      shouldComputeItems = false;
    }

    if (props.hasOwnProperty('selectQuery')) {
      if (props.selectQuery) {
        this.refs.queryEditor.selectAll();
      } else {
        this.refs.queryEditor.clearSelections();
      }
    }

    if (props.hasOwnProperty('order')) {
      this.props.order = props.order;
    }

    if (props.hasOwnProperty('emptyMessage')) {
      this.props.emptyMessage = props.emptyMessage;
    }

    if (props.hasOwnProperty('errorMessage')) {
      this.props.errorMessage = props.errorMessage;
    }

    if (props.hasOwnProperty('infoMessage')) {
      this.props.infoMessage = props.infoMessage;
    }

    if (props.hasOwnProperty('loadingMessage')) {
      this.props.loadingMessage = props.loadingMessage;
    }

    if (props.hasOwnProperty('loadingBadge')) {
      this.props.loadingBadge = props.loadingBadge;
    }

    if (props.hasOwnProperty('itemsClassList')) {
      this.props.itemsClassList = props.itemsClassList;
    }

    if (props.hasOwnProperty('initialSelectionIndex')) {
      this.props.initialSelectionIndex = props.initialSelectionIndex;
    }

    if (shouldComputeItems) {
      this.computeItems();
    }

    return lib$4.update(this)
  }

  render () {
    return $.div(
      {},
      $(TextEditor, {ref: 'queryEditor', mini: true}),
      this.renderLoadingMessage(),
      this.renderInfoMessage(),
      this.renderErrorMessage(),
      this.renderItems()
    )
  }

  renderItems () {
    if (this.items.length > 0) {
      const className = ['list-group'].concat(this.props.itemsClassList || []).join(' ');

      if (this.visibilityObserver) {
        lib$4.getScheduler().updateDocument(() => {
          Array.from(this.refs.items.children).slice(this.props.initiallyVisibleItemCount).forEach(element => {
            this.visibilityObserver.observe(element);
          });
        });
      }

      this.listItems = this.items.map((item, index) => {
        const selected = this.getSelectedItem() === item;
        const visible = !this.props.initiallyVisibleItemCount || index < this.props.initiallyVisibleItemCount;
        return $(ListItemView, {
          element: this.props.elementForItem(item, {selected, index, visible}),
          selected: selected,
          onclick: () => this.didClickItem(index)
        })
      });

      return $.ol(
        {className, ref: 'items'},
        ...this.listItems
      )
    } else if (!this.props.loadingMessage && this.props.emptyMessage) {
      return $.span({ref: 'emptyMessage'}, this.props.emptyMessage)
    } else {
      return ""
    }
  }

  renderErrorMessage () {
    if (this.props.errorMessage) {
      return $.span({ref: 'errorMessage'}, this.props.errorMessage)
    } else {
      return ''
    }
  }

  renderInfoMessage () {
    if (this.props.infoMessage) {
      return $.span({ref: 'infoMessage'}, this.props.infoMessage)
    } else {
      return ''
    }
  }

  renderLoadingMessage () {
    if (this.props.loadingMessage) {
      return $.div(
        {className: 'loading'},
        $.span({ref: 'loadingMessage', className: 'loading-message'}, this.props.loadingMessage),
        this.props.loadingBadge ? $.span({ref: 'loadingBadge', className: 'badge'}, this.props.loadingBadge) : ''
      )
    } else {
      return ''
    }
  }

  getQuery () {
    if (this.refs && this.refs.queryEditor) {
      return this.refs.queryEditor.getText()
    } else {
      return ''
    }
  }

  getFilterQuery () {
    return this.props.filterQuery ? this.props.filterQuery(this.getQuery()) : this.getQuery()
  }

  didChangeQuery () {
    if (this.props.didChangeQuery) {
      this.props.didChangeQuery(this.getFilterQuery());
    }

    this.computeItems();
  }

  didClickItem (itemIndex) {
    this.selectIndex(itemIndex);
    this.confirmSelection();
  }

  computeItems (updateComponent) {
    this.listItems = null;
    if (this.visibilityObserver) this.visibilityObserver.disconnect();
    const filterFn = this.props.filter || this.fuzzyFilter.bind(this);
    this.items = filterFn(this.props.items.slice(), this.getFilterQuery());
    if (this.props.order) {
      this.items.sort(this.props.order);
    }
    if (this.props.maxResults) {
      this.items = this.items.slice(0, this.props.maxResults);
    }

    this.selectIndex(this.props.initialSelectionIndex, updateComponent);
  }

  fuzzyFilter (items, query) {
    if (query.length === 0) {
      return items
    } else {
      const scoredItems = [];
      for (const item of items) {
        const string = this.props.filterKeyForItem ? this.props.filterKeyForItem(item) : item;
        let score = fuzzaldrin.score(string, query);
        if (score > 0) {
          scoredItems.push({item, score});
        }
      }
      scoredItems.sort((a, b) => b.score - a.score);
      return scoredItems.map((i) => i.item)
    }
  }

  getSelectedItem () {
    if (this.selectionIndex === undefined) return null
    return this.items[this.selectionIndex]
  }

  renderItemAtIndex (index) {
    const item = this.items[index];
    const selected = this.getSelectedItem() === item;
    const component = this.listItems[index].component;
    if (this.visibilityObserver) this.visibilityObserver.unobserve(component.element);
    component.update({
      element: this.props.elementForItem(item, {selected, index, visible: true}),
      selected: selected,
      onclick: () => this.didClickItem(index)
    });
  }

  selectPrevious () {
    if (this.selectionIndex === undefined) return this.selectLast()
    return this.selectIndex(this.selectionIndex - 1)
  }

  selectNext () {
    if (this.selectionIndex === undefined) return this.selectFirst()
    return this.selectIndex(this.selectionIndex + 1)
  }

  selectFirst () {
    return this.selectIndex(0)
  }

  selectLast () {
    return this.selectIndex(this.items.length - 1)
  }

  selectNone () {
    return this.selectIndex(undefined)
  }

  selectIndex (index, updateComponent = true) {
    if (index >= this.items.length) {
      index = 0;
    } else if (index < 0) {
      index = this.items.length - 1;
    }

    const oldIndex = this.selectionIndex;

    this.selectionIndex = index;
    if (index !== undefined && this.props.didChangeSelection) {
      this.props.didChangeSelection(this.getSelectedItem());
    }

    if (updateComponent) {
      if (this.listItems) {
        if (oldIndex >= 0) this.renderItemAtIndex(oldIndex);
        if (index >= 0) this.renderItemAtIndex(index);
        return lib$4.getScheduler().getNextUpdatePromise()
      } else {
        return lib$4.update(this)
      }
    } else {
      return Promise.resolve()
    }
  }

  selectItem (item) {
    const index = this.items.indexOf(item);
    if (index === -1) {
      throw new Error('Cannot select the specified item because it does not exist.')
    } else {
      return this.selectIndex(index)
    }
  }

  confirmSelection () {
    const selectedItem = this.getSelectedItem();
    if (selectedItem != null) {
      if (this.props.didConfirmSelection) {
        this.props.didConfirmSelection(selectedItem);
      }
    } else {
      if (this.props.didConfirmEmptySelection) {
        this.props.didConfirmEmptySelection();
      }
    }
  }

  cancelSelection () {
    if (this.props.didCancelSelection) {
      this.props.didCancelSelection();
    }
  }
};

class ListItemView {
  constructor (props) {
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.didClick = this.didClick.bind(this);
    this.selected = props.selected;
    this.onclick = props.onclick;
    this.element = props.element;
    this.element.addEventListener('mousedown', this.mouseDown);
    this.element.addEventListener('mouseup', this.mouseUp);
    this.element.addEventListener('click', this.didClick);
    if (this.selected) {
      this.element.classList.add('selected');
    }
    this.domEventsDisposable = new Disposable(() => {
      this.element.removeEventListener('mousedown', this.mouseDown);
      this.element.removeEventListener('mouseup', this.mouseUp);
      this.element.removeEventListener('click', this.didClick);
    });
    lib$4.getScheduler().updateDocument(this.scrollIntoViewIfNeeded.bind(this));
  }

  mouseDown (event) {
    event.preventDefault();
  }

  mouseUp (event) {
    event.preventDefault();
  }

  didClick (event) {
    event.preventDefault();
    this.onclick();
  }

  destroy () {
    this.element.remove();
    this.domEventsDisposable.dispose();
  }

  update (props) {
    this.element.removeEventListener('mousedown', this.mouseDown);
    this.element.removeEventListener('mouseup', this.mouseUp);
    this.element.removeEventListener('click', this.didClick);

    this.element.parentNode.replaceChild(props.element, this.element);
    this.element = props.element;
    this.element.addEventListener('mousedown', this.mouseDown);
    this.element.addEventListener('mouseup', this.mouseUp);
    this.element.addEventListener('click', this.didClick);
    if (props.selected) {
      this.element.classList.add('selected');
    }

    this.selected = props.selected;
    this.onclick = props.onclick;
    lib$4.getScheduler().updateDocument(this.scrollIntoViewIfNeeded.bind(this));
  }

  scrollIntoViewIfNeeded () {
    if (this.selected) {
      this.element.scrollIntoViewIfNeeded(false);
    }
  }
}

var commandReference = {
    init: function () {
        var _this = this;
        this.selectListView = new selectListView({
            emptyMessage: 'No command matches your search.',
            items: [],
            filterKeyForItem: function (item) { return item; },
            elementForItem: function (item) {
                var element = document.createElement('li');
                var html = item;
                element.innerHTML = html;
                return element;
            },
            didConfirmSelection: function (item) {
                _this.cancel();
                openURL(item);
            },
            didCancelSelection: function () {
                _this.cancel();
            }
        });
        this.selectListView.element.classList.add('nsis-command-list');
    },
    dispose: function () {
        this.cancel();
        this.selectListView.destroy();
    },
    cancel: function () {
        if (this.panel != null) {
            this.panel.destroy();
        }
        this.panel = null;
        if (this.previouslyFocusedElement) {
            this.previouslyFocusedElement.focus();
            this.previouslyFocusedElement = null;
        }
    },
    attach: function () {
        this.previouslyFocusedElement = document.activeElement;
        if ((this.panel == null)) {
            this.panel = atom.workspace.addModalPanel({ item: this.selectListView });
        }
        this.selectListView.focus();
        this.selectListView.reset();
    },
    toggle: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.panel != null)) return [3 /*break*/, 1];
                        this.cancel();
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, showHelp(this.selectListView)];
                    case 2:
                        _a.sent();
                        this.attach();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
};

var configSchema = {
    pathToMakensis: {
        title: 'Path To MakeNSIS',
        description: 'Specify the full path to `makensis`',
        type: 'string',
        "default": 'makensis',
        order: 0
    },
    compilerArguments: {
        title: 'Compiler Arguments',
        description: 'Specify the default arguments for `makensis`, separated by commas ([see documentation](http://nsis.sourceforge.net/Docs/Chapter3.html#usage))',
        type: 'array',
        "default": [
            getPrefix() + "V3"
        ],
        items: {
            type: 'string'
        },
        order: 1
    },
    alwaysShowOutput: {
        title: 'Always Show Output',
        description: 'Displays compiler output in console panel. When deactivated, it will only show on errors',
        type: 'boolean',
        "default": true,
        order: 2
    },
    showBuildNotifications: {
        title: 'Show Build Notifications',
        description: 'Displays color-coded notifications that close automatically after 5 seconds',
        type: 'boolean',
        "default": true,
        order: 3
    },
    clearConsole: {
        title: 'Clear Console',
        description: 'When `console-panel` isn\'t available, build logs will be printed using `console.log()`. This setting clears the console prior to building.',
        type: 'boolean',
        "default": true,
        order: 4
    },
    allowHeaderCompilation: {
        title: 'Allow Header Compilation',
        description: 'By default, only `.nsi` files will be compiled. This setting enables compilation for `.nsh` files as well.',
        type: 'boolean',
        "default": false,
        order: 5
    },
    showFlagsAsObject: {
        title: 'Show Flags as Object',
        description: 'Displays compiler flags as JSON',
        type: 'boolean',
        "default": true,
        order: 6
    },
    buildFileSyntax: {
        title: 'Build File Syntax',
        description: 'Specify the default syntax for your build file (requires [build](https://atom.io/packages/build))',
        type: 'string',
        "default": 'json',
        "enum": [
            {
                value: 'json',
                description: 'JSON'
            },
            {
                value: 'yaml',
                description: 'YAML'
            }
        ],
        order: 7
    },
    compilerOutput: {
        title: 'Compiler Output',
        description: 'Specify whether `makensis` outputs its version or compiler flags to notifications the console',
        type: 'string',
        "default": 'console',
        "enum": [
            {
                value: 'notification',
                description: 'Notification'
            },
            {
                value: 'console',
                description: 'Console'
            }
        ],
        order: 8
    },
    useWineToRun: {
        title: 'Use Wine to run',
        description: 'When on a non-Windows platform, you can run compiled installers using [Wine](https://www.winehq.org/)',
        type: 'boolean',
        "default": false,
        order: 9
    },
    manageDependencies: {
        title: 'Manage Dependencies',
        description: 'When enabled, third-party dependencies will be installed automatically',
        type: 'boolean',
        "default": true,
        order: 10
    }
};

function setRunner() {
    if (!hasAtomRunner()) {
        atom.beep();
        return;
    }
    var notification = atom.notifications.addInfo('Do you want to set `makensis` as the default runner for NSIS files?', {
        dismissable: true,
        buttons: [
            {
                text: 'Set makensis',
                onDidClick: function () {
                    atom.config.set('runner.scopes.nsis', 'makensis -');
                    notification.dismiss();
                    return;
                }
            },
            {
                text: 'Cancel',
                onDidClick: function () {
                    atom.beep();
                    notification.dismiss();
                    return;
                }
            }
        ]
    });
}
function unsetRunner() {
    if (!hasAtomRunner()) {
        atom.beep();
        return;
    }
    var notification = atom.notifications.addWarning('Do you want to unset `makensis` as the default runner for NSIS files?', {
        dismissable: true,
        buttons: [
            {
                text: 'Unset makensis',
                onDidClick: function () {
                    atom.config.unset('runner.scopes.nsis');
                    notification.dismiss();
                    return;
                }
            },
            {
                text: 'Cancel',
                onDidClick: function () {
                    atom.beep();
                    notification.dismiss();
                    return;
                }
            }
        ]
    });
}
function hasAtomRunner() {
    return atom.packages.isPackageLoaded('atom-runner');
}

var main$1 = {
    config: configSchema,
    subscriptions: null,
    activate: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
                        this.subscriptions = new require$$0$3.CompositeDisposable();
                        // Register commands
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:command-reference': function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    commandReference.init();
                                    commandReference.toggle();
                                    return [2 /*return*/];
                                });
                            }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:compile': function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, compile(false, this.consolePanel)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:compile-strict': function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, compile(true, this.consolePanel)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:create-.atom–build-file': function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, createBuildFile()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:convert-language-file': function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, convert()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:show-compiler-flags': function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, showCompilerFlags(this.consolePanel)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:show-version': function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, showVersion(this.consolePanel)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:open-package-settings': function () {
                                atom.workspace.open("atom://config/packages/language-nsis", {
                                    pending: true,
                                    searchAllPanes: true
                                });
                            }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:satisfy-dependencies': function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, manageDependencies()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:set-default-runner': function () { return setRunner(); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:unset-default-runner': function () { return unsetRunner(); }
                        }));
                        if (!getConfig('manageDependencies')) return [3 /*break*/, 2];
                        return [4 /*yield*/, manageDependencies()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    },
    deactivate: function () {
        this.subscriptions && this.subscriptions.dispose();
    },
    consumeConsolePanel: function (consolePanel) {
        this.consolePanel = consolePanel;
    }
};

module.exports = main$1;
//# sourceMappingURL=main.js.map
