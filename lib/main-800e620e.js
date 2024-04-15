'use strict';

var require$$0$2 = require('path');
var require$$0$1 = require('fs');
var require$$1 = require('child_process');
var require$$0 = require('os');
var require$$0$3 = require('atom');

/******************************************************************************
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
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign$1 = function() {
    __assign$1 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};

function __awaiter$2(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator$2(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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

function __spreadArray$1(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var name = "language-nsis";

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var lib$2 = {};

var lib$1 = {};

Object.defineProperty(lib$1, '__esModule', { value: true });

var os = require$$0;
var child_process = require$$1;
var fs$1 = require$$0$1;
var path = require$$0$2;

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs$1);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

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
const homeDir = typeof os__default['default'].homedir === 'undefined' ? '' : os__default['default'].homedir();

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
    const spawnedProcess = child_process.spawn(command, args, options);
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
    packageStats = await fs__default['default'].promises.stat(packageName);
  } catch (_) {// No Op
  }

  if (packageStats == null || !packageStats.isDirectory()) {
    throw new Error(`[Package-Deps] Expected packageName to be a readable directory in Node.js invocation`);
  }

  let parsed = null;

  try {
    const contents = await fs__default['default'].promises.readFile(path__default['default'].join(packageName, 'package.json'), 'utf8');
    parsed = JSON.parse(contents);
  } catch (_) {// Ignore JSON read errors and such
  }

  const packageDependencies = parsed == null || typeof parsed !== 'object' ? [] : parsed['package-deps'];
  return Array.isArray(packageDependencies) ? packageDependencies : [];
}
async function resolveDependencyPath$1(packageName) {
  var _process$env$ATOM_HOM;

  const packageDirectory = path__default['default'].join((_process$env$ATOM_HOM = process.env.ATOM_HOME) !== null && _process$env$ATOM_HOM !== void 0 ? _process$env$ATOM_HOM : path__default['default'].join(os__default['default'].homedir(), '.atom'), 'packages', packageName);

  try {
    await fs__default['default'].promises.access(packageDirectory, fs__default['default'].constants.R_OK);
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
    manifest = JSON.parse(await fs__default['default'].promises.readFile(path__default['default'].join(directory, 'package.json'), 'utf8'));
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
  const apmPath = IS_ATOM ? `"${atom.packages.getApmPath()}"` : 'apm';
  const {
    stdout,
    stderr
  } = await spawn(apmPath, ['install', dependency.name, '--production', '--color', 'false'], {
    shell: true
  });
  const match = INSTALL_VALIDATION_REGEXP.exec(stdout.trim());

  if (match != null && INSTALL_VALID_TICKS.has(match[2])) {
    // Installation complete and verified
    return;
  }

  const error = new Error(`Error installing dependency: ${dependency.name}`);
  error.stack = stderr.trim();
  throw error;
}
async function getResolvedDependency(item) {
  // string entry
  if (typeof item === 'string') {
    return {
      name: item,
      directory: await resolveDependencyPath$2(item)
    };
  }

  if ('name' in item) {
    return { ...item,
      directory: await resolveDependencyPath$2(item.name)
    };
  }

  console.error(`This package-deps entry is not valid. Please see https://github.com/steelbrain/package-deps#how-it-works`, {
    entry: item
  });
  throw Error(`The package-deps entry is not valid. Please see https://github.com/steelbrain/package-deps#how-it-works`);
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
    const groupChoices = groupedDependencies.map(item => item[0]); // If Atom "notifications" package is disabled output a warning in case no other notifications package is installed.

    if (atom.packages.isPackageDisabled('notifications')) {
      console.warn(`Enable notifications to install dependencies for ${packageName}`);
    }

    const notification = atom.notifications.addInfo(`${packageName} needs to install dependencies`, {
      dismissable: true,
      icon: 'cloud-download',
      detail,
      description: `Install dependenc${dependencies.length === 1 ? 'y' : 'ies'}?`,
      buttons: [{
        text: 'Yes',
        onDidClick: () => {
          if (skipGroups) {
            resolve(ungroupedDependencies);
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

async function install(packageName, hideUserPrompt = false) {
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
      return Promise.all(item.map(getResolvedDependency));
    }

    return getResolvedDependency(item);
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

  let chosenDependencies;

  if (!hideUserPrompt) {
    chosenDependencies = await confirmPackagesToInstall$2({
      packageName,
      dependencies: dependenciesToInstall
    });
  } else {
    // prompt-less installation
    chosenDependencies = dependenciesToInstall.map(dep => {
      if (Array.isArray(dep)) {
        return dep[0];
      }

      return dep;
    });
  }

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

lib$1.install = install;

var lib = {};

var callsites$2 = {exports: {}};

const callsites$1 = () => {
	const _prepareStackTrace = Error.prepareStackTrace;
	Error.prepareStackTrace = (_, stack) => stack;
	const stack = new Error().stack.slice(1);
	Error.prepareStackTrace = _prepareStackTrace;
	return stack;
};

callsites$2.exports = callsites$1;
// TODO: Remove this for the next major release
callsites$2.exports.default = callsites$1;

var callsitesExports = callsites$2.exports;

const callsites = callsitesExports;

var callerCallsite$1 = ({depth = 0} = {}) => {
	const callers = [];
	const callerFileSet = new Set();

	for (const callsite of callsites()) {
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

var __awaiter$1 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$1 = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
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
Object.defineProperty(lib, "__esModule", { value: true });
lib.readManifestSync = lib.readManifest = void 0;
var _a = require$$0$2, resolve = _a.resolve, sep = _a.sep;
var _b = require$$0$1, fs = _b.promises, readFileSync = _b.readFileSync;
var callerCallsite = callerCallsite$1;
function readManifest(packageName) {
    if (packageName === void 0) { packageName = ''; }
    return __awaiter$1(this, void 0, void 0, function () {
        var filePath, fileContents;
        return __generator$1(this, function (_a) {
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
                    _a.sent();
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
lib.readManifest = readManifest;
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
lib.readManifestSync = readManifestSync;
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
Object.defineProperty(lib$2, "__esModule", { value: true });
var satisfyDependencies_1 = lib$2.satisfyDependencies = void 0;
var atom_package_deps_1 = lib$1;
var atom_read_manifest_1 = lib;
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
                    return [4 /*yield*/, atom_read_manifest_1.readManifest(identifier)];
                case 1:
                    manifest = _a.sent();
                    return [4 /*yield*/, atom_package_deps_1.install(manifest['name'])];
                case 2:
                    _a.sent();
                    enableDependencies(manifest['package-deps'], options);
                    return [2 /*return*/];
            }
        });
    });
}
satisfyDependencies_1 = lib$2.satisfyDependencies = satisfyDependencies;
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

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

var DeveloperConsole = /** @class */ (function () {
    function DeveloperConsole(options) {
        if (options === void 0) { options = {}; }
        this.name = options.name;
        this.styleSheet = "\n      background-color: " + (options.backgroundColor || 'darkgrey') + ";\n      border-radius: 2px;\n      color: " + (options.color || 'white') + ";\n      line-height: 1.5;\n      padding: 1px 4px;\n      text-shadow: 0 1px 0px rgba(0, 0, 0, 0.2);\n    ";
    }
    DeveloperConsole.prototype.__console__ = function (type) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!(atom === null || atom === void 0 ? void 0 : atom.inDevMode()))
            return;
        args.unshift("%c" + this.name + "%c", this.styleSheet, '');
        (_a = window.console)[type].apply(_a, args);
    };
    DeveloperConsole.prototype.debug = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        this.__console__.apply(this, __spreadArray(['debug'], data));
    };
    DeveloperConsole.prototype.error = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        this.__console__.apply(this, __spreadArray(['error'], data));
    };
    DeveloperConsole.prototype.info = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        this.__console__.apply(this, __spreadArray(['info'], data));
    };
    DeveloperConsole.prototype.log = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        this.__console__.apply(this, __spreadArray(['log'], data));
    };
    DeveloperConsole.prototype.trace = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        this.__console__.apply(this, __spreadArray(['trace'], data));
    };
    DeveloperConsole.prototype.warn = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        this.__console__.apply(this, __spreadArray(['warn'], data));
    };
    return DeveloperConsole;
}());

var devConsole = new DeveloperConsole({
    name: name,
    backgroundColor: 'coral'
});

var Browse = {
    browse: null,
    consumer: function (browse) {
        var _this = this;
        this.browse = browse;
        return new require$$0$3.Disposable(function () {
            _this.browse = null;
        });
    },
    reveal: function (target) {
        return __awaiter$2(this, void 0, void 0, function () {
            var error_1, missingPackageWarning;
            return __generator$2(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, this.browse(target)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        devConsole.debug(error_1);
                        return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                    case 3:
                        missingPackageWarning = (_a.sent()).missingPackageWarning;
                        missingPackageWarning('browse');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
};

var Config = {
    schema: {
        compilerOptions: {
            title: 'Compiler Options',
            type: 'object',
            order: 1,
            properties: {
                pathToMakensis: {
                    title: 'Path To MakeNSIS',
                    description: 'Specify the full path to `makensis`',
                    type: 'string',
                    default: 'makensis',
                    order: 1
                },
                verbosity: {
                    title: 'Verbosity',
                    description: 'Specify the default verbosity for `makensis`',
                    type: 'number',
                    default: 3,
                    enum: [
                        {
                            value: -1,
                            description: '(not set)'
                        },
                        {
                            value: 0,
                            description: '0: none'
                        },
                        {
                            value: 1,
                            description: '1: no warnings'
                        },
                        {
                            value: 2,
                            description: '2: no info'
                        },
                        {
                            value: 3,
                            description: '3: no script'
                        },
                        {
                            value: 4,
                            description: '4: all'
                        }
                    ],
                    order: 2
                },
                strictMode: {
                    title: 'Strict Mode',
                    description: 'Enabling strict mode will treat warnings as errors. Note that when disabled, running *NSIS: Compile Strict* will ignore the setting',
                    type: 'boolean',
                    default: false,
                    order: 3
                },
                customArguments: {
                    title: 'Custom Arguments',
                    description: 'Specify any of the default [compiler arguments](http://nsis.sourceforge.net/Docs/Chapter3.html#usage). Note that these will have precedence over the settings above',
                    type: 'string',
                    default: '',
                    order: 4
                }
            },
        },
        processHeaders: {
            title: 'Process Headers',
            description: 'By default, you can only compile (and create build-files) for `.nsi` files. This setting enables support for `.nsh` files.',
            type: 'string',
            enum: [
                'Allow',
                'Disallow',
                'Disallow & Never Ask Me'
            ],
            default: 'Disallow',
            order: 1
        },
        showBuildNotifications: {
            title: 'Show Build Notifications',
            description: 'Displays color-coded notifications that close automatically after 5 seconds',
            type: 'boolean',
            default: true,
            order: 2
        },
        showFlagsAsObject: {
            title: 'Show Flags as Object',
            description: 'Displays compiler flags as JSON',
            type: 'boolean',
            default: true,
            order: 3
        },
        alwaysShowOutput: {
            title: 'Always Show Output',
            description: 'Displays compiler output in console panel. When deactivated, it will only show on errors',
            type: 'boolean',
            default: true,
            order: 4
        },
        clearConsole: {
            title: 'Clear Console',
            description: 'When `console-panel` isn\'t available, build logs will be printed using `console.log()`. This setting clears the console prior to building.',
            type: 'boolean',
            default: true,
            order: 5
        },
        compilerOutput: {
            title: 'Compiler Output',
            description: 'Specify whether `makensis` outputs its version or compiler flags to notifications the console',
            type: 'string',
            default: 'console',
            enum: [
                {
                    value: 'notification',
                    description: 'Notification'
                },
                {
                    value: 'console',
                    description: 'Console'
                }
            ],
            order: 6
        },
        buildFileSyntax: {
            title: 'Build File Syntax',
            description: 'Specify the default syntax for your build file (requires [build](https://atom.io/packages/build))',
            type: 'string',
            default: 'json',
            enum: [
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
        useWineToRun: !isWindows() ? {
            title: 'Run with Wine',
            description: 'When on a non-Windows platform, you can run compiled installers using [Wine](https://www.winehq.org/)',
            type: 'boolean',
            default: false,
            order: 8
        } : {},
        pathToWine: !isWindows() ? {
            title: 'Path To Wine',
            description: 'Specifies a custom path to `wine`, useful when relying on alternatives such as `wine32` or [`wine32on64`](https://github.com/Gcenx/homebrew-wine)',
            type: 'string',
            default: 'wine',
            order: 9
        } : {},
        manageDependencies: {
            title: 'Manage Dependencies',
            description: 'When enabled, third-party dependencies will be installed automatically',
            type: 'boolean',
            default: true,
            order: 10
        }
    },
    get: function (key) {
        if (key === void 0) { key = ''; }
        return (key === null || key === void 0 ? void 0 : key.length) ? atom.config.get("".concat(name, ".").concat(key)) : atom.config.get("".concat(name));
    },
    migrate: function (oldKey, newKey) {
        if (!atom.config.get("".concat(name, ".").concat(oldKey)) || atom.config.get("".concat(name, ".").concat(newKey))) {
            return;
        }
        try {
            atom.config.set("".concat(name, ".").concat(newKey), atom.config.get("".concat(name, ".").concat(oldKey)));
        }
        catch (error) {
            atom.notifications.addWarning("Failed to migrate configuration, see console for details");
            return;
        }
        atom.config.unset("".concat(name, ".").concat(oldKey));
    },
    unset: function (key) {
        if (key === void 0) { key = ''; }
        var unsetKey = (key === null || key === void 0 ? void 0 : key.length) ? "".concat(name, ".").concat(key) : name;
        atom.config.unset(unsetKey);
    },
    open: function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter$2(this, void 0, void 0, function () {
            return __generator$2(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = __assign$1({ pending: true, searchAllPanes: true }, options);
                        return [4 /*yield*/, atom.workspace.open("atom://config/packages/".concat(name), options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
};

var ConsolePanel = {
    consolePanel: null,
    consumer: function (consolePanel) {
        var _this = this;
        this.consolePanel = consolePanel;
        return new require$$0$3.Disposable(function () {
            _this.consolePanel = null;
        });
    },
    show: function () {
        this.consolePanel.show();
    },
    hide: function () {
        this.consolePanel.hide();
    },
    toggle: function () {
        this.consolePanel.toggle();
    },
    clear: function () {
        this.consolePanel.clear();
    },
    log: function () {
        var _a;
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        (_a = this.consolePanel).log.apply(_a, message);
    },
    error: function () {
        var _a;
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        (_a = this.consolePanel).error.apply(_a, message);
    },
    warn: function () {
        var _a;
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        (_a = this.consolePanel).warn.apply(_a, message);
    }
};

function clearConsole() {
    try {
        ConsolePanel.clear();
    }
    catch (error) {
        if (Config.get('clearConsole')) {
            console.clear();
        }
    }
}
function fileExists(filePath) {
    return __awaiter$2(this, void 0, void 0, function () {
        return __generator$2(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, require$$0$1.promises.access(filePath, require$$0$1.constants.F_OK)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/, true];
            }
        });
    });
}
function findPackagePath(packageName) {
    return __awaiter$2(this, void 0, void 0, function () {
        var packageDirPaths;
        var _this = this;
        return __generator$2(this, function (_a) {
            switch (_a.label) {
                case 0:
                    packageDirPaths = atom.packages.getPackageDirPaths();
                    return [4 /*yield*/, Promise.all(packageDirPaths.map(function (packageDirPath) { return __awaiter$2(_this, void 0, void 0, function () {
                            var packageDir;
                            return __generator$2(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        packageDir = require$$0$2.resolve(packageDirPath, packageName);
                                        return [4 /*yield*/, fileExists(require$$0$2.resolve(packageDir, 'package.json'))];
                                    case 1:
                                        if (_a.sent()) {
                                            return [2 /*return*/, packageDir];
                                        }
                                        return [2 /*return*/, undefined];
                                }
                            });
                        }); }))];
                case 1: return [2 /*return*/, (_a.sent()).filter(function (item) { return item; })];
            }
        });
    });
}
function getMakensisPath() {
    return __awaiter$2(this, void 0, void 0, function () {
        var pathToMakensis, which, _a;
        return __generator$2(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pathToMakensis = String(Config.get('compilerOptions.pathToMakensis'));
                    if ((pathToMakensis === null || pathToMakensis === void 0 ? void 0 : pathToMakensis.length) && pathToMakensis !== 'makensis') {
                        return [2 /*return*/, pathToMakensis];
                    }
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./index-dca869fe.js'); }).then(function (n) { return n.index; })];
                case 1:
                    which = (_b.sent()).default;
                    _a = String;
                    return [4 /*yield*/, which('makensis')];
                case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()]) || 'makensis'];
            }
        });
    });
}
function getSpawnEnv() {
    return __awaiter$2(this, void 0, void 0, function () {
        return __generator$2(this, function (_a) {
            return [2 /*return*/, {
                    env: {
                        NSISDIR: process.env.NSISDIR || undefined,
                        NSISCONFDIR: process.env.NSISCONFDIR || undefined,
                        LANGUAGE: !isWindows() && !process.env.LANGUAGE ? 'en_US.UTF-8' : undefined,
                        LC_ALL: !isWindows() && !process.env.LC_ALL ? 'en_US.UTF-8' : undefined,
                    }
                }];
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
function isLoadedAndActive(packageName) {
    return atom.packages.isPackageLoaded(packageName) && atom.packages.isPackageActive(packageName);
}
function isWindows() {
    return require$$0.platform() === 'win32';
}
function isWindowsCompatible() {
    return isWindows() || Config.get('useWineToRun')
        ? true
        : false;
}
function manageDependencies() {
    return __awaiter$2(this, void 0, void 0, function () {
        return __generator$2(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, satisfyDependencies_1(name)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function missingPackageWarning(packageName) {
    var notification = atom.notifications.addWarning("This command requires the `".concat(packageName, "` package to be installed and enabled"), {
        dismissable: true,
        buttons: [
            {
                text: 'Show Package',
                onDidClick: function () {
                    return __awaiter$2(this, void 0, void 0, function () {
                        return __generator$2(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    notification.dismiss();
                                    return [4 /*yield*/, atom.workspace.open("atom://config/packages/".concat(packageName), {
                                            pending: true,
                                            searchAllPanes: true,
                                        })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                }
            },
            {
                text: 'Cancel',
                onDidClick: function () {
                    notification.dismiss();
                    return;
                }
            }
        ]
    });
}
function getNotificationLevel(level) {
    switch (level.toLowerCase()) {
        case 'success':
            return 'addSuccess';
        case 'warning':
            return 'addWarning';
        case 'error':
            return 'addError';
        case 'fatal':
        case 'fatalerror':
            return 'addFatalError';
        default:
            return 'addInfo';
    }
}
function notifyOnCompletion(params) {
    var type = getNotificationLevel(params.level);
    var notification = atom.notifications[type](params.message, {
        dismissable: params.dismissable || true,
        buttons: params.outFile ? [
            isWindowsCompatible() ? {
                text: 'Run',
                className: 'icon icon-playback-play',
                onDidClick: function () {
                    return __awaiter$2(this, void 0, void 0, function () {
                        return __generator$2(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    notification.dismiss();
                                    return [4 /*yield*/, runInstaller(params.level)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
            } : undefined,
            isLoadedAndActive('browse') ? {
                text: 'Reveal',
                className: 'icon icon-location',
                onDidClick: function () {
                    notification.dismiss();
                    Browse.reveal(params.outFile);
                    return;
                },
            } : undefined,
            {
                text: 'Cancel',
                onDidClick: function () {
                    notification.dismiss();
                    return;
                },
            }
        ].filter(function (item) { return item; }) : [],
    });
}
function openURL(nsisCommand) {
    return __awaiter$2(this, void 0, void 0, function () {
        var open;
        return __generator$2(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./index-86778deb.js'); }).then(function (n) { return n.index; })];
                case 1:
                    open = (_a.sent()).default;
                    open("https://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Commands/".concat(nsisCommand, ".html?utm_source=atom&utm_content=reference"));
                    return [2 /*return*/];
            }
        });
    });
}
function runInstaller(outFile) {
    return __awaiter$2(this, void 0, void 0, function () {
        var execa, pathToWine, error_2;
        return __generator$2(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isWindows()) return [3 /*break*/, 1];
                    try {
                        require$$1.exec("cmd /c \"".concat(outFile, "\""));
                    }
                    catch (error) {
                        console.error(error);
                    }
                    return [2 /*return*/];
                case 1:
                    if (!Config.get('useWineToRun')) return [3 /*break*/, 6];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./index-adcf2f54.js'); }).then(function (n) { return n.index; })];
                case 2:
                    execa = (_a.sent()).default;
                    pathToWine = String(Config.get('pathToWine')) || 'wine';
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, execa(pathToWine, [outFile])];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function inRange(value, options) {
    return value >= options.min && value <= options.max;
}

var util = /*#__PURE__*/Object.freeze({
    __proto__: null,
    clearConsole: clearConsole,
    fileExists: fileExists,
    findPackagePath: findPackagePath,
    getMakensisPath: getMakensisPath,
    getSpawnEnv: getSpawnEnv,
    inRange: inRange,
    isHeaderFile: isHeaderFile,
    isLoadedAndActive: isLoadedAndActive,
    isWindows: isWindows,
    isWindowsCompatible: isWindowsCompatible,
    manageDependencies: manageDependencies,
    missingPackageWarning: missingPackageWarning,
    notifyOnCompletion: notifyOnCompletion,
    openURL: openURL
});

var BusySignal = {
    busySignal: null,
    serviceName: 'busy-signal',
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    consumer: function (registry) {
        var _this = this;
        this.busySignal = registry.create();
        return new require$$0$3.Disposable(function () {
            _this.busySignal = null;
        });
    },
    add: function (message) {
        return __awaiter$2(this, void 0, void 0, function () {
            var missingPackageWarning;
            return __generator$2(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 1, , 3]);
                        this.busySignal.add(message);
                        return [3 /*break*/, 3];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                    case 2:
                        missingPackageWarning = (_a.sent()).missingPackageWarning;
                        missingPackageWarning(this.serviceName);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    remove: function (message) {
        if (message === void 0) { message = ''; }
        return __awaiter$2(this, void 0, void 0, function () {
            var missingPackageWarning;
            return __generator$2(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 1, , 3]);
                        this.busySignal.remove(message);
                        return [3 /*break*/, 3];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                    case 2:
                        missingPackageWarning = (_a.sent()).missingPackageWarning;
                        missingPackageWarning(this.serviceName);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    clear: function () {
        return __awaiter$2(this, void 0, void 0, function () {
            var missingPackageWarning;
            return __generator$2(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 1, , 3]);
                        this.busySignal.clear();
                        return [3 /*break*/, 3];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                    case 2:
                        missingPackageWarning = (_a.sent()).missingPackageWarning;
                        missingPackageWarning(this.serviceName);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    dispose: function () {
        try {
            this.busySignal.dispose();
        }
        catch (error) {
            console.error(error);
        }
    }
};

function compile(strictMode) {
    return __awaiter$2(this, void 0, void 0, function () {
        var editor, script, scope, isHeaderFile, processHeaders, notification_1, error_1, _a, clearConsole, getMakensisPath, getSpawnEnv, isLoadedAndActive, NSIS, _b, compilerOutput, compilerError, compilerClose, verbosity, _c, _d, _e;
        var _f;
        return __generator$2(this, function (_g) {
            switch (_g.label) {
                case 0:
                    editor = atom.workspace.getActiveTextEditor();
                    if (!editor) {
                        atom.notifications.addWarning("No active editor", {
                            dismissable: false,
                        });
                        return [2 /*return*/];
                    }
                    script = editor.getPath();
                    scope = editor.getGrammar().scopeName;
                    return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                case 1:
                    isHeaderFile = (_g.sent()).isHeaderFile;
                    if (isHeaderFile(script)) {
                        processHeaders = String(Config.get('processHeaders'));
                        if (processHeaders === 'Disallow') {
                            notification_1 = atom.notifications.addWarning('Compiling header files is blocked by default. You can allow this in the package settings, or mute this warning.', {
                                dismissable: true,
                                buttons: [
                                    {
                                        text: 'Open Settings',
                                        className: 'icon icon-gear',
                                        onDidClick: function () {
                                            return __awaiter$2(this, void 0, void 0, function () {
                                                return __generator$2(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, atom.workspace.open("atom://config/packages/language-nsis", {
                                                                pending: true,
                                                                searchAllPanes: true,
                                                            })];
                                                        case 1:
                                                            _a.sent();
                                                            notification_1.dismiss();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            });
                                        }
                                    },
                                    {
                                        text: 'Cancel',
                                        onDidClick: function () {
                                            notification_1.dismiss();
                                            return;
                                        }
                                    }
                                ]
                            });
                            atom.beep();
                            return [2 /*return*/];
                        }
                        else if (processHeaders === 'Disallow & Never Ask Me') {
                            atom.beep();
                            return [2 /*return*/];
                        }
                    }
                    if (!(script && scope.startsWith('source.nsis'))) return [3 /*break*/, 15];
                    _g.label = 2;
                case 2:
                    _g.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, editor.save()];
                case 3:
                    _g.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _g.sent();
                    console.log(error_1);
                    atom.beep();
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                case 6:
                    _a = _g.sent(), clearConsole = _a.clearConsole, getMakensisPath = _a.getMakensisPath, getSpawnEnv = _a.getSpawnEnv, isLoadedAndActive = _a.isLoadedAndActive;
                    clearConsole();
                    if (!isLoadedAndActive('busy-signal')) return [3 /*break*/, 8];
                    return [4 /*yield*/, BusySignal.add("Compiling ".concat(require$$0$2.basename(script)))];
                case 7:
                    _g.sent();
                    _g.label = 8;
                case 8: return [4 /*yield*/, Promise.resolve().then(function () { return require('./makensis-0247f178.js'); })];
                case 9:
                    NSIS = _g.sent();
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./callbacks-7769cae5.js'); })];
                case 10:
                    _b = _g.sent(), compilerOutput = _b.compilerOutput, compilerError = _b.compilerError, compilerClose = _b.compilerClose;
                    verbosity = parseInt(String((Config.get('compilerOptions.verbosity'))), 10);
                    _d = (_c = NSIS).compile;
                    _e = [script];
                    _f = {
                        env: false,
                        json: Boolean(Config.get('showFlagsAsObject'))
                    };
                    return [4 /*yield*/, getMakensisPath()];
                case 11:
                    _e = _e.concat([(_f.pathToMakensis = _g.sent(),
                            _f.onData = compilerOutput,
                            _f.onError = compilerError,
                            _f.onClose = compilerClose,
                            _f.rawArguments = String(Config.get('compilerOptions.customArguments')),
                            _f.strict = strictMode || Boolean(Config.get('compilerOptions.strictMode')),
                            _f.verbose = inRange(verbosity, { min: 0, max: 4 }) ? verbosity : 3,
                            _f)]);
                    return [4 /*yield*/, getSpawnEnv()];
                case 12: return [4 /*yield*/, _d.apply(_c, _e.concat([_g.sent()]))];
                case 13:
                    _g.sent();
                    if (!isLoadedAndActive('busy-signal')) return [3 /*break*/, 15];
                    return [4 /*yield*/, BusySignal.clear()];
                case 14:
                    _g.sent();
                    _g.label = 15;
                case 15: return [2 /*return*/];
            }
        });
    });
}
function showVersion() {
    return __awaiter$2(this, void 0, void 0, function () {
        var _a, clearConsole, getMakensisPath, getSpawnEnv, isLoadedAndActive, pathToMakensis, NSIS, versionCallback, _b, _c, _d;
        return __generator$2(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                case 1:
                    _a = _e.sent(), clearConsole = _a.clearConsole, getMakensisPath = _a.getMakensisPath, getSpawnEnv = _a.getSpawnEnv, isLoadedAndActive = _a.isLoadedAndActive;
                    if (!isLoadedAndActive('busy-signal')) return [3 /*break*/, 3];
                    return [4 /*yield*/, BusySignal.add("Showing version")];
                case 2:
                    _e.sent();
                    _e.label = 3;
                case 3:
                    clearConsole();
                    return [4 /*yield*/, getMakensisPath()];
                case 4:
                    pathToMakensis = _e.sent();
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./makensis-0247f178.js'); })];
                case 5:
                    NSIS = _e.sent();
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./callbacks-7769cae5.js'); })];
                case 6:
                    versionCallback = (_e.sent()).versionCallback;
                    _c = (_b = NSIS).version;
                    _d = [{
                            onData: function (data) { return versionCallback(data, pathToMakensis); },
                            pathToMakensis: pathToMakensis,
                        }];
                    return [4 /*yield*/, getSpawnEnv()];
                case 7: return [4 /*yield*/, _c.apply(_b, _d.concat([_e.sent()]))];
                case 8:
                    _e.sent();
                    if (!isLoadedAndActive('busy-signal')) return [3 /*break*/, 10];
                    return [4 /*yield*/, BusySignal.clear()];
                case 9:
                    _e.sent();
                    _e.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
}
function showCompilerFlags() {
    return __awaiter$2(this, void 0, void 0, function () {
        var _a, clearConsole, getMakensisPath, getSpawnEnv, isLoadedAndActive, NSIS, flagsCallback, _b, _c, _d;
        var _e;
        return __generator$2(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                case 1:
                    _a = _f.sent(), clearConsole = _a.clearConsole, getMakensisPath = _a.getMakensisPath, getSpawnEnv = _a.getSpawnEnv, isLoadedAndActive = _a.isLoadedAndActive;
                    if (!isLoadedAndActive('busy-signal')) return [3 /*break*/, 3];
                    return [4 /*yield*/, BusySignal.add("Showing compiler flags")];
                case 2:
                    _f.sent();
                    _f.label = 3;
                case 3:
                    clearConsole();
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./makensis-0247f178.js'); })];
                case 4:
                    NSIS = _f.sent();
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./callbacks-7769cae5.js'); })];
                case 5:
                    flagsCallback = (_f.sent()).flagsCallback;
                    _c = (_b = NSIS).headerInfo;
                    _e = {
                        json: Boolean(Config.get('showFlagsAsObject')),
                        onClose: flagsCallback
                    };
                    return [4 /*yield*/, getMakensisPath()];
                case 6:
                    _d = [(_e.pathToMakensis = _f.sent(),
                            _e)];
                    return [4 /*yield*/, getSpawnEnv()];
                case 7: return [4 /*yield*/, _c.apply(_b, _d.concat([_f.sent()]))];
                case 8:
                    _f.sent();
                    if (!isLoadedAndActive('busy-signal')) return [3 /*break*/, 10];
                    return [4 /*yield*/, BusySignal.clear()];
                case 9:
                    _f.sent();
                    _f.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function showHelp(selectListView) {
    return __awaiter$2(this, void 0, void 0, function () {
        var NSIS, _a, getMakensisPath, getSpawnEnv, output, _b, _c, _d;
        var _e;
        return __generator$2(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./makensis-0247f178.js'); })];
                case 1:
                    NSIS = _f.sent();
                    return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                case 2:
                    _a = _f.sent(), getMakensisPath = _a.getMakensisPath, getSpawnEnv = _a.getSpawnEnv;
                    _c = (_b = NSIS).commandHelp;
                    _d = [''];
                    _e = {
                        json: true
                    };
                    return [4 /*yield*/, getMakensisPath()];
                case 3:
                    _d = _d.concat([(_e.pathToMakensis = _f.sent(),
                            _e)]);
                    return [4 /*yield*/, getSpawnEnv()];
                case 4: return [4 /*yield*/, _c.apply(_b, _d.concat([_f.sent()]))];
                case 5:
                    output = _f.sent();
                    selectListView.update({ items: Object.keys(output.stdout) });
                    return [2 /*return*/];
            }
        });
    });
}

function convert() {
    return __awaiter$2(this, void 0, void 0, function () {
        var editor, _a;
        return __generator$2(this, function (_b) {
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
    return __awaiter$2(this, void 0, void 0, function () {
        var NLF, output, input;
        return __generator$2(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./index-2a0b4367.js'); })];
                case 1:
                    NLF = _a.sent();
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
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function convertJSON(editor) {
    return __awaiter$2(this, void 0, void 0, function () {
        var NLF, output, input;
        return __generator$2(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./index-2a0b4367.js'); })];
                case 1:
                    NLF = _a.sent();
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
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function openNewFile(editor, input, targetExt) {
    return __awaiter$2(this, void 0, void 0, function () {
        var newEditorTab, fileName, newFileName, error_1;
        return __generator$2(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileName = editor.getFileName().toString();
                    newFileName = require$$0$2.basename(fileName, require$$0$2.extname(fileName));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, atom.workspace.open("".concat(newFileName, ".").concat(targetExt), {
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

var commandReference = {
    init: function () {
        return __awaiter$2(this, void 0, void 0, function () {
            var SelectListView;
            var _this = this;
            return __generator$2(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./select-list-view-fee5826a.js'); }).then(function (n) { return n.selectListView; })];
                    case 1:
                        SelectListView = (_a.sent()).default;
                        this.selectListView = new SelectListView({
                            emptyMessage: 'No command matches your search.',
                            items: [],
                            filterKeyForItem: function (item) {
                                return item;
                            },
                            elementForItem: function (item) {
                                var element = document.createElement('li');
                                var html = item;
                                element['innerHTML'] = html;
                                return element;
                            },
                            didConfirmSelection: function (item) { return __awaiter$2(_this, void 0, void 0, function () {
                                var openURL;
                                return __generator$2(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.cancel();
                                            return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                                        case 1:
                                            openURL = (_a.sent()).openURL;
                                            return [4 /*yield*/, openURL(String(item))];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                            didCancelSelection: function () {
                                _this.cancel();
                            }
                        });
                        this.selectListView.element.classList.add('nsis-command-list');
                        return [2 /*return*/];
                }
            });
        });
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
        return __awaiter$2(this, void 0, void 0, function () {
            return __generator$2(this, function (_a) {
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

var main = {
    config: Config.schema,
    subscriptions: new require$$0$3.CompositeDisposable(),
    activate: function () {
        return __awaiter$2(this, void 0, void 0, function () {
            var manageDependencies;
            var _this = this;
            return __generator$2(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        devConsole.log('Activating package');
                        // Register commands
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:command-reference': function () { return __awaiter$2(_this, void 0, void 0, function () {
                                return __generator$2(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, commandReference.init()];
                                        case 1:
                                            _a.sent();
                                            commandReference.toggle();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:compile': function () { return __awaiter$2(_this, void 0, void 0, function () { return __generator$2(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, compile(false)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:compile-strict': function () { return __awaiter$2(_this, void 0, void 0, function () { return __generator$2(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, compile(true)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:create-.atom–build-file': function () { return __awaiter$2(_this, void 0, void 0, function () {
                                var isLoadedAndActive, createBuildFile, missingPackageWarning;
                                return __generator$2(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                                        case 1:
                                            isLoadedAndActive = (_a.sent()).isLoadedAndActive;
                                            if (!(isLoadedAndActive('buildium') || isLoadedAndActive('build'))) return [3 /*break*/, 4];
                                            return [4 /*yield*/, Promise.resolve().then(function () { return require('./build-ef318bdb.js'); })];
                                        case 2:
                                            createBuildFile = (_a.sent()).createBuildFile;
                                            return [4 /*yield*/, createBuildFile()];
                                        case 3:
                                            _a.sent();
                                            return [3 /*break*/, 6];
                                        case 4: return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                                        case 5:
                                            missingPackageWarning = (_a.sent()).missingPackageWarning;
                                            missingPackageWarning('buildium');
                                            _a.label = 6;
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); },
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:convert-language-file': function () { return __awaiter$2(_this, void 0, void 0, function () { return __generator$2(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, convert()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:show-compiler-flags': function () { return __awaiter$2(_this, void 0, void 0, function () { return __generator$2(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, showCompilerFlags()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:show-version': function () { return __awaiter$2(_this, void 0, void 0, function () { return __generator$2(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, showVersion()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:open-package-settings': function () { return __awaiter$2(_this, void 0, void 0, function () {
                                return __generator$2(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, atom.workspace.open("atom://config/packages/language-nsis", {
                                                pending: true,
                                                searchAllPanes: true,
                                            })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:satisfy-dependencies': function () { return __awaiter$2(_this, void 0, void 0, function () {
                                var manageDependencies;
                                return __generator$2(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                                        case 1:
                                            manageDependencies = (_a.sent()).manageDependencies;
                                            return [4 /*yield*/, manageDependencies()];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:set-default-runner': function () { return __awaiter$2(_this, void 0, void 0, function () {
                                var isLoadedAndActive, setRunner, missingPackageWarning;
                                return __generator$2(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                                        case 1:
                                            isLoadedAndActive = (_a.sent()).isLoadedAndActive;
                                            if (!isLoadedAndActive('atom-runner')) return [3 /*break*/, 4];
                                            return [4 /*yield*/, Promise.resolve().then(function () { return require('./runner-ec08175c.js'); })];
                                        case 2:
                                            setRunner = (_a.sent()).setRunner;
                                            return [4 /*yield*/, setRunner()];
                                        case 3:
                                            _a.sent();
                                            return [3 /*break*/, 6];
                                        case 4: return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                                        case 5:
                                            missingPackageWarning = (_a.sent()).missingPackageWarning;
                                            missingPackageWarning('runner');
                                            _a.label = 6;
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:unset-default-runner': function () { return __awaiter$2(_this, void 0, void 0, function () {
                                var isLoadedAndActive, unsetRunner, missingPackageWarning;
                                return __generator$2(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                                        case 1:
                                            isLoadedAndActive = (_a.sent()).isLoadedAndActive;
                                            if (!isLoadedAndActive('atom-runner')) return [3 /*break*/, 4];
                                            return [4 /*yield*/, Promise.resolve().then(function () { return require('./runner-ec08175c.js'); })];
                                        case 2:
                                            unsetRunner = (_a.sent()).unsetRunner;
                                            return [4 /*yield*/, unsetRunner()];
                                        case 3:
                                            _a.sent();
                                            return [3 /*break*/, 6];
                                        case 4: return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                                        case 5:
                                            missingPackageWarning = (_a.sent()).missingPackageWarning;
                                            missingPackageWarning('runner');
                                            _a.label = 6;
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); }
                        }));
                        if (!Config.get('manageDependencies')) return [3 /*break*/, 3];
                        return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                    case 1:
                        manageDependencies = (_a.sent()).manageDependencies;
                        return [4 /*yield*/, manageDependencies()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    deactivate: function () {
        var _a;
        devConsole.log('Deactivating package');
        (_a = this.subscriptions) === null || _a === void 0 ? void 0 : _a.dispose();
    },
    consumeConsolePanel: function (consolePanel) {
        devConsole.log('Consuming Console Panel service');
        ConsolePanel.consumer(consolePanel);
    },
    consumeBrowse: function (browse) {
        devConsole.log('Consuming Browse service');
        Browse.consumer(browse);
    },
    consumeSignal: function (registry) {
        devConsole.log('Consuming Busy Signal service');
        BusySignal.consumer(registry);
    }
};

exports.Config = Config;
exports.ConsolePanel = ConsolePanel;
exports.__awaiter = __awaiter$2;
exports.__generator = __generator$2;
exports.__spreadArray = __spreadArray$1;
exports.commonjsGlobal = commonjsGlobal;
exports.getDefaultExportFromCjs = getDefaultExportFromCjs;
exports.main = main;
exports.util = util;
//# sourceMappingURL=main-800e620e.js.map
