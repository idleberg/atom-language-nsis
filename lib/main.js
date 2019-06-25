module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var NsisCore, getConfig, getPrefix, openSettings, satisfyDependencies;

({getConfig, getPrefix, openSettings, satisfyDependencies} = __webpack_require__(1));

module.exports = NsisCore = {
  config: {
    pathToMakensis: {
      title: "Path To MakeNSIS",
      description: "Specify the full path to `makensis`",
      type: "string",
      default: "makensis",
      order: 0
    },
    compilerArguments: {
      title: "Compiler Arguments",
      description: "Specify the default arguments for `makensis` ([see documentation](http://nsis.sourceforge.net/Docs/Chapter3.html#usage))",
      type: "string",
      default: `${getPrefix()}V3`,
      order: 1
    },
    alwaysShowOutput: {
      title: "Always Show Output",
      description: "Displays compiler output in console panel. When deactivated, it will only show on errors",
      type: "boolean",
      default: true,
      order: 2
    },
    showBuildNotifications: {
      title: "Show Build Notifications",
      description: "Displays color-coded notifications that close automatically after 5 seconds",
      type: "boolean",
      default: true,
      order: 3
    },
    clearConsole: {
      title: "Clear Console",
      description: "When `console-panel` isn't available, build logs will be printed using `console.log()`. This setting clears the console prior to building.",
      type: "boolean",
      default: true,
      order: 4
    },
    allowHeaderCompilation: {
      title: "Allow Header Compilation",
      description: "By default, only `.nsi` files will be compiled. This setting enables it for `.nsh` files as well.",
      type: "boolean",
      default: false,
      order: 5
    },
    showFlagsAsObject: {
      title: "Show Flags as Object",
      description: "Displays compiler flags as JSON",
      type: "boolean",
      default: true,
      order: 6
    },
    buildFileSyntax: {
      title: "Build File Syntax",
      description: "Specify the default syntax for your build file ([requires build](https://atom.io/packages/build))",
      type: "string",
      default: "JSON",
      enum: ["CSON", "JSON", "YAML"],
      order: 7
    },
    compilerOutput: {
      title: "Compiler Output",
      description: "Specify whether `makensis` outputs its version or compiler flags to notifications the console",
      type: "string",
      default: "Notification",
      enum: ["Notification", "Console"],
      order: 8
    },
    useWineToRun: {
      title: "Use Wine to run",
      description: "When on a non-Windows platform, you can run compiled installers using [Wine](https://www.winehq.org/)",
      type: "boolean",
      default: false,
      order: 9
    },
    manageDependencies: {
      title: "Manage Dependencies",
      description: "When enabled, third-party dependencies will be installed automatically",
      type: "boolean",
      default: true,
      order: 10
    }
  },
  subscriptions: null,
  activate: function(state) {
    var Build, CompositeDisposable, Lookup, Makensis, NLF, Runner;
    ({CompositeDisposable} = __webpack_require__(24));
    Build = __webpack_require__(26);
    Lookup = __webpack_require__(47);
    Makensis = __webpack_require__(64);
    NLF = __webpack_require__(136);
    Runner = __webpack_require__(139);
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable;
    // Register commands
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "NSIS:save-&-compile": () => {
        return Makensis.compile(false, this.consolePanel);
      }
    }));
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "NSIS:save-&-compile-strict": () => {
        return Makensis.compile(true, this.consolePanel);
      }
    }));
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "NSIS:show-version": () => {
        return Makensis.showVersion(this.consolePanel);
      }
    }));
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "NSIS:show-compiler-flags": () => {
        return Makensis.showCompilerFlags(this.consolePanel);
      }
    }));
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "NSIS:open-package-settings": function() {
        return openSettings();
      }
    }));
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "NSIS:satisfy-package-dependencies": function() {
        return satisfyDependencies();
      }
    }));
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "NSIS:create-.atom–build-file": function() {
        return Build.createFile(false);
      }
    }));
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "NSIS:create-.atom–build-file-for-wine": function() {
        return Build.createFile(true);
      }
    }));
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "NSIS:set-default-runner": function() {
        return Runner.set();
      }
    }));
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "NSIS:remove-default-runner": function() {
        return Runner.remove();
      }
    }));
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "NSIS:command-reference": function() {
        Lookup.init();
        return Lookup.toggle();
      }
    }));
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "NSIS:convert-language-file": function() {
        return NLF.convert();
      }
    }));
    if (getConfig("manageDependencies") === true) {
      return satisfyDependencies(true);
    }
  },
  deactivate: function() {
    var ref;
    if ((ref = this.subscriptions) != null) {
      ref.dispose();
    }
    return this.subscriptions = null;
  },
  consumeConsolePanel: function(consolePanel) {
    this.consolePanel = consolePanel;
  }
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Util;

module.exports = Util = {
  clearConsole: function(consolePanel) {
    try {
      return consolePanel.clear();
    } catch (error1) {
      if (Util.getConfig("clearConsole")) {
        return console.clear();
      }
    }
  },
  detectOutfile: function(line) {
    var regex, result;
    if (line.indexOf('Output: "') !== -1) {
      regex = /Output: \"(.*\.exe)\"\r?\n/g;
      result = regex.exec(line.toString());
      return result[1];
    }
    return "";
  },
  getConfig: function(key = "") {
    var meta;
    meta = __webpack_require__(2).readManifestSync('language-nsis');
    if (key != null) {
      return atom.config.get(`${meta.name}.${key}`);
    }
    return atom.config.get(`${meta.name}`);
  },
  getMakensisPath: function(callback) {
    var pathToMakensis, spawn, which;
    ({spawn} = __webpack_require__(12));
    // If stored, return pathToMakensis
    pathToMakensis = Util.getConfig("pathToMakensis");
    if (pathToMakensis.length > 0 && pathToMakensis !== "makensis") {
      return callback(pathToMakensis);
    }
    // Find makensis
    which = spawn(Util.which(), ["makensis"]);
    which.stdout.on("data", function(data) {
      var path;
      path = data.toString().trim();
      atom.config.set("language-nsis.pathToMakensis", path);
      return callback(path);
    });
    return which.on("close", function(errorCode) {
      if (errorCode > 0) {
        return atom.notifications.addError("**language-nsis**: makensis is not in your `PATH` [environmental variable](http://superuser.com/a/284351/195953)", {
          dismissable: true
        });
      }
    });
  },
  getPrefix: function() {
    var platform;
    ({platform} = __webpack_require__(13));
    if (platform() === "win32") {
      return "/";
    }
    return "-";
  },
  isWindowsCompatible: function() {
    var platform;
    ({platform} = __webpack_require__(13));
    if (platform() === "win32" || Util.getConfig("useWineToRun") === true) {
      return true;
    }
    return false;
  },
  logCompilerFlags: function(output, showFlagsAsObject, consolePanel) {
    var stdOut;
    if (showFlagsAsObject === true) {
      stdOut = JSON.stringify(output.stdout, null, 2);
    } else {
      stdOut = output.stdout;
    }
    if (Util.getConfig("compilerOutput") === "Console") {
      try {
        return consolePanel.raw(stdOut);
      } catch (error1) {
        console.info(stdOut);
        return atom.getCurrentWindow().openDevTools();
      }
    } else {
      return atom.notifications.addInfo("**language-nsis**", {
        detail: stdOut,
        dismissable: true
      });
    }
  },
  notifyOnCompletion: function(type, openButton, outFile) {
    var buttons, cancelButton, dismissable, notification, revealButton;
    buttons = [];
    dismissable = false;
    if (outFile) {
      if (openButton === "Run") {
        dismissable = true;
        openButton = {
          text: openButton,
          className: "icon icon-playback-play",
          onDidClick: function() {
            notification.dismiss();
            return Util.runInstaller(outFile);
          }
        };
        buttons.push(openButton);
      }
      revealButton = {
        text: "Reveal",
        className: "icon icon-location",
        onDidClick: function() {
          notification.dismiss();
          return Util.revealInstaller(outFile);
        }
      };
      cancelButton = {
        text: "Cancel",
        onDidClick: function() {
          return notification.dismiss();
        }
      };
      buttons.push(revealButton);
      buttons.push(cancelButton);
    }
    if (type === "warning") {
      return notification = atom.notifications.addWarning("Compiled with warnings", {
        dismissable: dismissable,
        buttons: buttons
      });
    } else {
      return notification = atom.notifications.addSuccess("Compiled successfully", {
        dismissable: dismissable,
        buttons: buttons
      });
    }
  },
  openSettings: function() {
    var meta, options;
    meta = __webpack_require__(2).readManifestSync('language-nsis');
    options = {
      pending: true,
      searchAllPanes: true
    };
    return atom.workspace.open(`atom://config/packages/${meta.name}`, options);
  },
  openURL: function(cmd) {
    var opn;
    opn = __webpack_require__(14);
    return opn(`https://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Reference/${cmd}.html?utm_source=atom&utm_content=reference`);
  },
  revealInstaller: function(outFile) {
    var F_OK, access, existsSync, shell;
    ({access, existsSync, F_OK} = __webpack_require__(6));
    ({shell} = __webpack_require__(16));
    return access(outFile, F_OK, function(error) {
      if (error || outFile === "") {
        return console.log(error);
      }
      return shell.showItemInFolder(outFile);
    });
  },
  runInstaller: function(outFile) {
    var error, platform, spawn;
    ({spawn} = __webpack_require__(12));
    ({platform} = __webpack_require__(13));
    if (platform() === "win32") {
      try {
        return spawn(outFile);
      } catch (error1) {
        error = error1;
        return atom.notifications.addWarning("**language-nsis**", {
          detail: error,
          dismissable: true
        });
      }
    } else if (Util.getConfig("useWineToRun") === true) {
      try {
        return spawn("wine", [outFile]);
      } catch (error1) {
        error = error1;
        return atom.notifications.addWarning("**language-nsis**", {
          detail: error,
          dismissable: true
        });
      }
    }
  },
  satisfyDependencies: function(autoRun = false) {
    var k, meta, ref, results, v;
    meta = __webpack_require__(2).readManifestSync('language-nsis');
    __webpack_require__(17).install(meta.name, true);
    ref = meta["package-deps"];
    results = [];
    for (k in ref) {
      v = ref[k];
      if (atom.packages.isPackageDisabled(v)) {
        if (atom.inDevMode()) {
          console.log(`Enabling package '${v}'`);
        }
        results.push(atom.packages.enablePackage(v));
      } else {
        results.push(void 0);
      }
    }
    return results;
  },
  which: function() {
    var platform;
    ({platform} = __webpack_require__(13));
    if (platform() === "win32") {
      return "where";
    }
    return "which";
  }
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var findUp = __webpack_require__(3);
var promisify = __webpack_require__(7).promisify;
var _a = __webpack_require__(6), readFile = _a.readFile, readFileSync = _a.readFileSync;
var _b = __webpack_require__(4), join = _b.join, resolve = _b.resolve;
var readFileAsync = promisify(readFile);
var readManifest = function (packageName) { return __awaiter(_this, void 0, void 0, function () {
    var filePath, packagePath, fileContents, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                packagePath = atom.packages.resolvePackagePath(packageName);
                filePath = resolve(packagePath, 'package.json');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, readFileAsync(filePath, 'utf8')];
            case 2:
                fileContents = _a.sent();
                return [2 /*return*/, JSON.parse(fileContents)];
            case 3:
                err_1 = _a.sent();
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.readManifest = readManifest;
var readManifestSync = function (packageName) {
    var filePath;
    // @ts-ignore
    var packagePath = atom.packages.resolvePackagePath(packageName);
    filePath = resolve(packagePath, 'package.json');
    try {
        var fileContents = readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    }
    catch (err) {
        return null;
    }
};
exports.readManifestSync = readManifestSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBYixpQkEyQ0E7O0FBekNBLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxQixJQUFBLHFDQUFTLENBQXFCO0FBQ2hDLElBQUEsa0JBQTBDLEVBQXhDLHNCQUFRLEVBQUUsOEJBQThCLENBQUM7QUFDM0MsSUFBQSxvQkFBbUMsRUFBakMsY0FBSSxFQUFFLG9CQUEyQixDQUFDO0FBRTFDLElBQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUUxQyxJQUFNLFlBQVksR0FBRyxVQUFPLFdBQW1COzs7OztnQkFJdkMsV0FBVyxHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzFFLFFBQVEsR0FBRyxPQUFPLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDOzs7O2dCQUd6QixxQkFBTSxhQUFhLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFBOztnQkFBcEQsWUFBWSxHQUFHLFNBQXFDO2dCQUMxRCxzQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFDOzs7Z0JBRWhDLHNCQUFPLElBQUksRUFBQzs7OztLQUVmLENBQUM7QUFrQkEsb0NBQVk7QUFoQmQsSUFBTSxnQkFBZ0IsR0FBRyxVQUFDLFdBQW1CO0lBQzNDLElBQUksUUFBMEIsQ0FBQztJQUUvQixhQUFhO0lBQ2IsSUFBTSxXQUFXLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxRSxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUVoRCxJQUFJO1FBQ0YsSUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDakM7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDLENBQUM7QUFJQSw0Q0FBZ0IifQ==

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const path = __webpack_require__(4);
const locatePath = __webpack_require__(5);
const pathExists = __webpack_require__(11);

const stop = Symbol('findUp.stop');

module.exports = async (name, options = {}) => {
	let directory = path.resolve(options.cwd || '');
	const {root} = path.parse(directory);
	const paths = [].concat(name);

	const runMatcher = async locateOptions => {
		if (typeof name !== 'function') {
			return locatePath(paths, locateOptions);
		}

		const foundPath = await name(locateOptions.cwd);
		if (typeof foundPath === 'string') {
			return locatePath([foundPath], locateOptions);
		}

		return foundPath;
	};

	// eslint-disable-next-line no-constant-condition
	while (true) {
		// eslint-disable-next-line no-await-in-loop
		const foundPath = await runMatcher({...options, cwd: directory});

		if (foundPath === stop) {
			return;
		}

		if (foundPath) {
			return path.resolve(directory, foundPath);
		}

		if (directory === root) {
			return;
		}

		directory = path.dirname(directory);
	}
};

module.exports.sync = (name, options = {}) => {
	let directory = path.resolve(options.cwd || '');
	const {root} = path.parse(directory);
	const paths = [].concat(name);

	const runMatcher = locateOptions => {
		if (typeof name !== 'function') {
			return locatePath.sync(paths, locateOptions);
		}

		const foundPath = name(locateOptions.cwd);
		if (typeof foundPath === 'string') {
			return locatePath.sync([foundPath], locateOptions);
		}

		return foundPath;
	};

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const foundPath = runMatcher({...options, cwd: directory});

		if (foundPath === stop) {
			return;
		}

		if (foundPath) {
			return path.resolve(directory, foundPath);
		}

		if (directory === root) {
			return;
		}

		directory = path.dirname(directory);
	}
};

module.exports.exists = pathExists;

module.exports.sync.exists = pathExists.sync;

module.exports.stop = stop;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const path = __webpack_require__(4);
const fs = __webpack_require__(6);
const {promisify} = __webpack_require__(7);
const pLocate = __webpack_require__(8);

const fsStat = promisify(fs.stat);
const fsLStat = promisify(fs.lstat);

const typeMappings = {
	directory: 'isDirectory',
	file: 'isFile'
};

function checkType({type}) {
	if (type in typeMappings) {
		return;
	}

	throw new Error(`Invalid type specified: ${type}`);
}

const matchType = (type, stat) => type === undefined || stat[typeMappings[type]]();

module.exports = async (paths, options) => {
	options = {
		cwd: process.cwd(),
		type: 'file',
		allowSymlinks: true,
		...options
	};
	checkType(options);
	const statFn = options.allowSymlinks ? fsStat : fsLStat;

	return pLocate(paths, async path_ => {
		try {
			const stat = await statFn(path.resolve(options.cwd, path_));
			return matchType(options.type, stat);
		} catch (_) {
			return false;
		}
	}, options);
};

module.exports.sync = (paths, options) => {
	options = {
		cwd: process.cwd(),
		allowSymlinks: true,
		type: 'file',
		...options
	};
	checkType(options);
	const statFn = options.allowSymlinks ? fs.statSync : fs.lstatSync;

	for (const path_ of paths) {
		try {
			const stat = statFn(path.resolve(options.cwd, path_));

			if (matchType(options.type, stat)) {
				return path_;
			}
		} catch (_) {
		}
	}
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const pLimit = __webpack_require__(9);

class EndError extends Error {
	constructor(value) {
		super();
		this.value = value;
	}
}

// The input can also be a promise, so we await it
const testElement = async (element, tester) => tester(await element);

// The input can also be a promise, so we `Promise.all()` them both
const finder = async element => {
	const values = await Promise.all(element);
	if (values[1] === true) {
		throw new EndError(values[0]);
	}

	return false;
};

const pLocate = async (iterable, tester, options) => {
	options = {
		concurrency: Infinity,
		preserveOrder: true,
		...options
	};

	const limit = pLimit(options.concurrency);

	// Start all the promises concurrently with optional limit
	const items = [...iterable].map(element => [element, limit(testElement, element, tester)]);

	// Check the promises either serially or concurrently
	const checkLimit = pLimit(options.preserveOrder ? 1 : Infinity);

	try {
		await Promise.all(items.map(element => checkLimit(finder, element)));
	} catch (error) {
		if (error instanceof EndError) {
			return error.value;
		}

		throw error;
	}
};

module.exports = pLocate;
// TODO: Remove this for the next major release
module.exports.default = pLocate;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const pTry = __webpack_require__(10);

const pLimit = concurrency => {
	if (concurrency < 1) {
		throw new TypeError('Expected `concurrency` to be a number from 1 and up');
	}

	const queue = [];
	let activeCount = 0;

	const next = () => {
		activeCount--;

		if (queue.length > 0) {
			queue.shift()();
		}
	};

	const run = (fn, resolve, ...args) => {
		activeCount++;

		const result = pTry(fn, ...args);

		resolve(result);

		result.then(next, next);
	};

	const enqueue = (fn, resolve, ...args) => {
		if (activeCount < concurrency) {
			run(fn, resolve, ...args);
		} else {
			queue.push(run.bind(null, fn, resolve, ...args));
		}
	};

	const generator = (fn, ...args) => new Promise(resolve => enqueue(fn, resolve, ...args));
	Object.defineProperties(generator, {
		activeCount: {
			get: () => activeCount
		},
		pendingCount: {
			get: () => queue.length
		}
	});

	return generator;
};

module.exports = pLimit;
module.exports.default = pLimit;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const pTry = (fn, ...arguments_) => new Promise(resolve => {
	resolve(fn(...arguments_));
});

module.exports = pTry;
// TODO: remove this in the next major version
module.exports.default = pTry;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const fs = __webpack_require__(6);
const {promisify} = __webpack_require__(7);

const pAccess = promisify(fs.access);

module.exports = async path => {
	try {
		await pAccess(path);
		return true;
	} catch (_) {
		return false;
	}
};

module.exports.sync = path => {
	try {
		fs.accessSync(path);
		return true;
	} catch (_) {
		return false;
	}
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
const path = __webpack_require__(4);
const childProcess = __webpack_require__(12);
const isWsl = __webpack_require__(15);

module.exports = (target, opts) => {
	if (typeof target !== 'string') {
		return Promise.reject(new Error('Expected a `target`'));
	}

	opts = Object.assign({wait: true}, opts);

	let cmd;
	let appArgs = [];
	let args = [];
	const cpOpts = {};

	if (Array.isArray(opts.app)) {
		appArgs = opts.app.slice(1);
		opts.app = opts.app[0];
	}

	if (process.platform === 'darwin') {
		cmd = 'open';

		if (opts.wait) {
			args.push('-W');
		}

		if (opts.app) {
			args.push('-a', opts.app);
		}
	} else if (process.platform === 'win32' || isWsl) {
		cmd = 'cmd' + (isWsl ? '.exe' : '');
		args.push('/c', 'start', '""', '/b');
		target = target.replace(/&/g, '^&');

		if (opts.wait) {
			args.push('/wait');
		}

		if (opts.app) {
			args.push(opts.app);
		}

		if (appArgs.length > 0) {
			args = args.concat(appArgs);
		}
	} else {
		if (opts.app) {
			cmd = opts.app;
		} else {
			cmd = process.platform === 'android' ? 'xdg-open' : path.join(__dirname, 'xdg-open');
		}

		if (appArgs.length > 0) {
			args = args.concat(appArgs);
		}

		if (!opts.wait) {
			// `xdg-open` will block the process unless
			// stdio is ignored and it's detached from the parent
			// even if it's unref'd
			cpOpts.stdio = 'ignore';
			cpOpts.detached = true;
		}
	}

	args.push(target);

	if (process.platform === 'darwin' && appArgs.length > 0) {
		args.push('--args');
		args = args.concat(appArgs);
	}

	const cp = childProcess.spawn(cmd, args, cpOpts);

	if (opts.wait) {
		return new Promise((resolve, reject) => {
			cp.once('error', reject);

			cp.once('close', code => {
				if (code > 0) {
					reject(new Error('Exited with code ' + code));
					return;
				}

				resolve(cp);
			});
		});
	}

	cp.unref();

	return Promise.resolve(cp);
};

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const os = __webpack_require__(13);
const fs = __webpack_require__(6);

const isWsl = () => {
	if (process.platform !== 'linux') {
		return false;
	}

	if (os.release().includes('Microsoft')) {
		return true;
	}

	try {
		return fs.readFileSync('/proc/version', 'utf8').includes('Microsoft');
	} catch (err) {
		return false;
	}
};

if (process.env.__IS_WSL_TEST__) {
	module.exports = isWsl;
} else {
	module.exports = isWsl();
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = installDependencies;

var _assert = _interopRequireDefault(__webpack_require__(18));

var Helpers = _interopRequireWildcard(__webpack_require__(19));

var _view = _interopRequireDefault(__webpack_require__(25));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof window.__steelbrain_package_deps === 'undefined') {
  window.__steelbrain_package_deps = new Set();
}

async function installDependencies(packageName, promptUser = true) {
  (0, _assert.default)(packageName, '[Package-Deps] Package name is required');
  const dependencies = await Helpers.getDependencies(packageName);

  if (!dependencies.length) {
    return;
  }

  if (promptUser) {
    const choice = await Helpers.promptUser(packageName, dependencies);

    if (choice !== 'Yes') {
      return;
    }
  }

  const view = new _view.default(packageName, dependencies);
  const errors = await Helpers.apmInstall(dependencies, function () {
    view.advance();
  });
  const promises = [];
  view.complete(errors);

  for (const dependency of dependencies) {
    if (errors.has(dependency.name)) {
      continue;
    }

    promises.push(atom.packages.activatePackage(dependency.name));
  }

  await Promise.all(promises);
}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apmInstall = apmInstall;
exports.getDependencies = getDependencies;
exports.promptUser = promptUser;

var _sbFs = _interopRequireDefault(__webpack_require__(20));

var _path = _interopRequireDefault(__webpack_require__(4));

var _semver = _interopRequireDefault(__webpack_require__(23));

var _atom = __webpack_require__(24);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

let shownStorageInfo = false;
const VALID_TICKS = new Set(['✓', 'done']);
const VALIDATION_REGEXP = /(?:Installing|Moving) (.*?) to .* (.*)/;

function exec(command, parameters) {
  return new Promise(function (resolve) {
    const data = {
      stdout: [],
      stderr: []
    };
    const spawnedProcess = new _atom.BufferedProcess({
      command,
      args: parameters,

      stdout(chunk) {
        data.stdout.push(chunk);
      },

      stderr(chunk) {
        data.stderr.push(chunk);
      },

      exit() {
        resolve({
          stdout: data.stdout.join(''),
          stderr: data.stderr.join('')
        });
      },

      autoStart: false
    });
    spawnedProcess.start();
  });
}

function apmInstall(dependencies, progressCallback) {
  const errors = new Map();
  return Promise.all(dependencies.map(function (dep) {
    return exec(atom.packages.getApmPath(), ['install', dep.url || dep.name, '--production', '--color', 'false']).then(function (output) {
      let successful = VALIDATION_REGEXP.test(output.stdout);

      if (successful) {
        const match = VALIDATION_REGEXP.exec(output.stdout);
        successful = match && VALID_TICKS.has(match[2]);
      }

      progressCallback(dep.name, !!successful);

      if (!successful) {
        const error = new Error(`Error installing dependency: ${dep.name}`);
        error.stack = output.stderr;
        throw error;
      }
    })["catch"](function (error) {
      errors.set(dep.name, error);
    });
  })).then(function () {
    return errors;
  });
}

const DEPENDENCY_REGEX_VERSION = /(.*?):.*/;
const DEPENDENCY_REGEX_GIRURL = /(.*?)#.*/;

async function getDependencies(packageName) {
  const packageModule = atom.packages.getLoadedPackage(packageName);
  const packageDependencies = packageModule && packageModule.metadata['package-deps'];

  if (!Array.isArray(packageDependencies)) {
    console.error(`[Package-Deps] Unable to get loaded package '${packageName}'`);
    return [];
  }

  return (await Promise.all(packageDependencies.map(async function (entry) {
    let url = null;
    let name = entry;
    let version = null;
    const matchVersion = DEPENDENCY_REGEX_VERSION.exec(entry);
    const matchGiturl = DEPENDENCY_REGEX_GIRURL.exec(entry);

    if (matchVersion) {
      ;
      [, name, version] = matchVersion;
    } else if (matchGiturl) {
      ;
      [, name, url] = matchGiturl;
    } else {
      name = entry;
    }

    if (__steelbrain_package_deps.has(name)) {
      return null;
    }

    const resolvedPath = atom.packages.resolvePackagePath(name);

    if (resolvedPath) {
      if (!version) {
        return null;
      }

      const manifest = JSON.parse((await _sbFs["default"].readFile(_path["default"].join(resolvedPath, 'package.json')))); // $FlowIgnore: Flow is paranoid, this parsed.version is NOT NULL

      if (_semver["default"].satisfies(manifest.version, `>=${version}`)) {
        return null;
      }
    }

    __steelbrain_package_deps.add(name);

    return {
      name,
      url
    };
  }))).filter(Boolean);
}

async function promptUser(packageName, dependencies) {
  const oldConfigPath = _path["default"].join(atom.getConfigDirPath(), 'package-deps-state.json');

  let ignoredPackages = atom.config.get('atom-package-deps.ignored') || [];

  if (await _sbFs["default"].exists(oldConfigPath)) {
    const oldConfig = JSON.parse((await _sbFs["default"].readFile(oldConfigPath, 'utf8')));
    atom.config.set('atom-package-deps.ignored', ignoredPackages = oldConfig.ignored);
    await _sbFs["default"].unlink(oldConfigPath);
  }

  if (ignoredPackages.includes(packageName)) {
    return 'No';
  }

  if (atom.packages.isPackageDisabled('notifications')) {
    console.warn(`Enable notifications to install dependencies for ${packageName}`);
  }

  return new Promise(function (resolve) {
    const notification = atom.notifications.addInfo(`${packageName} needs to install dependencies`, {
      dismissable: true,
      icon: 'cloud-download',
      detail: dependencies.map(e => e.name).join(', '),
      description: `Install dependenc${dependencies.length === 1 ? 'y' : 'ies'}?`,
      buttons: [{
        text: 'Yes',
        onDidClick: () => {
          resolve('Yes');
          notification.dismiss();
        }
      }, {
        text: 'No Thanks',
        onDidClick: () => {
          resolve('No');
          notification.dismiss();
        }
      }, {
        text: 'Never',
        onDidClick: () => {
          ignoredPackages.push(packageName);
          atom.config.set('atom-package-deps.ignored', ignoredPackages);

          if (!shownStorageInfo) {
            shownStorageInfo = true;
            atom.notifications.addInfo('How to reset package-deps memory', {
              dismissable: true,
              description: "To modify the list of ignored files invoke 'Application: Open Your Config' and change the 'atom-package-deps' section"
            });
          }

          resolve('Never');
          notification.dismiss();
        }
      }]
    });
    notification.onDidDismiss(() => resolve('No'));
  });
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fs = _interopRequireDefault(__webpack_require__(6));

var _util = __webpack_require__(7);

var _stripBomBuf = _interopRequireDefault(__webpack_require__(21));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const promisifiedFS = {};
const syncMethods = ['Stats', '_toUnixTimestamp', 'watch', 'watchFile', 'unwatchFile'];
Object.keys(_fs.default).forEach(function (key) {
  const value = _fs.default[key];

  if (typeof value === 'function' && !key.includes('Sync') && !key.includes('Stream') && !syncMethods.includes(key)) {
    promisifiedFS[key] = (0, _util.promisify)(value);
  } else {
    promisifiedFS[key] = value;
  }
});

promisifiedFS.exists = function (path) {
  return new Promise(function (resolve) {
    _fs.default.access(path, _fs.default.R_OK, function (error) {
      resolve(error === null);
    });
  });
};

promisifiedFS.readFile = function (path, encoding) {
  return new Promise(function (resolve, reject) {
    _fs.default.readFile(path, function (error, buffer) {
      if (error) {
        reject(error);
        return;
      }

      let contents = (0, _stripBomBuf.default)(buffer);

      if (encoding) {
        contents = contents.toString(encoding);
      }

      resolve(contents);
    });
  });
};

module.exports = promisifiedFS;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const isUtf8 = __webpack_require__(22);

module.exports = x => {
	if (!Buffer.isBuffer(x)) {
		throw new TypeError('Expected a Buffer, got ' + typeof x);
	}

	if (x[0] === 0xEF && x[1] === 0xBB && x[2] === 0xBF && isUtf8(x)) {
		return x.slice(3);
	}

	return x;
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {


exports = module.exports = function(bytes)
{
    var i = 0;
    while(i < bytes.length)
    {
        if(     (// ASCII
                    bytes[i] == 0x09 ||
                    bytes[i] == 0x0A ||
                    bytes[i] == 0x0D ||
                    (0x20 <= bytes[i] && bytes[i] <= 0x7E)
                )
          ) {
              i += 1;
              continue;
          }

        if(     (// non-overlong 2-byte
                    (0xC2 <= bytes[i] && bytes[i] <= 0xDF) &&
                    (0x80 <= bytes[i+1] && bytes[i+1] <= 0xBF)
                )
          ) {
              i += 2;
              continue;
          }

        if(     (// excluding overlongs
                    bytes[i] == 0xE0 &&
                    (0xA0 <= bytes[i + 1] && bytes[i + 1] <= 0xBF) &&
                    (0x80 <= bytes[i + 2] && bytes[i + 2] <= 0xBF)
                ) ||
                (// straight 3-byte
                 ((0xE1 <= bytes[i] && bytes[i] <= 0xEC) ||
                  bytes[i] == 0xEE ||
                  bytes[i] == 0xEF) &&
                 (0x80 <= bytes[i + 1] && bytes[i+1] <= 0xBF) &&
                 (0x80 <= bytes[i+2] && bytes[i+2] <= 0xBF)
                ) ||
                (// excluding surrogates
                 bytes[i] == 0xED &&
                 (0x80 <= bytes[i+1] && bytes[i+1] <= 0x9F) &&
                 (0x80 <= bytes[i+2] && bytes[i+2] <= 0xBF)
                )
          ) {
              i += 3;
              continue;
          }

        if(     (// planes 1-3
                    bytes[i] == 0xF0 &&
                    (0x90 <= bytes[i + 1] && bytes[i + 1] <= 0xBF) &&
                    (0x80 <= bytes[i + 2] && bytes[i + 2] <= 0xBF) &&
                    (0x80 <= bytes[i + 3] && bytes[i + 3] <= 0xBF)
                ) ||
                (// planes 4-15
                 (0xF1 <= bytes[i] && bytes[i] <= 0xF3) &&
                 (0x80 <= bytes[i + 1] && bytes[i + 1] <= 0xBF) &&
                 (0x80 <= bytes[i + 2] && bytes[i + 2] <= 0xBF) &&
                 (0x80 <= bytes[i + 3] && bytes[i + 3] <= 0xBF)
                ) ||
                (// plane 16
                 bytes[i] == 0xF4 &&
                 (0x80 <= bytes[i + 1] && bytes[i + 1] <= 0x8F) &&
                 (0x80 <= bytes[i + 2] && bytes[i + 2] <= 0xBF) &&
                 (0x80 <= bytes[i + 3] && bytes[i + 3] <= 0xBF)
                )
          ) {
              i += 4;
              continue;
          }

        return false;
    }

    return true;
}


/***/ }),
/* 23 */
/***/ (function(module, exports) {

exports = module.exports = SemVer

var debug
/* istanbul ignore next */
if (typeof process === 'object' &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
  debug = function () {
    var args = Array.prototype.slice.call(arguments, 0)
    args.unshift('SEMVER')
    console.log.apply(console, args)
  }
} else {
  debug = function () {}
}

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0'

var MAX_LENGTH = 256
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
var MAX_SAFE_COMPONENT_LENGTH = 16

// The actual regexps go on exports.re
var re = exports.re = []
var src = exports.src = []
var R = 0

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*'
var NUMERICIDENTIFIERLOOSE = R++
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+'

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'

// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')'

var MAINVERSIONLOOSE = R++
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')'

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')'

var PRERELEASEIDENTIFIERLOOSE = R++
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')'

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))'

var PRERELEASELOOSE = R++
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))'

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+'

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))'

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?'

src[FULL] = '^' + FULLPLAIN + '$'

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?'

var LOOSE = R++
src[LOOSE] = '^' + LOOSEPLAIN + '$'

var GTLT = R++
src[GTLT] = '((?:<|>)?=?)'

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*'
var XRANGEIDENTIFIER = R++
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*'

var XRANGEPLAIN = R++
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[PRERELEASE] + ')?' +
                   src[BUILD] + '?' +
                   ')?)?'

var XRANGEPLAINLOOSE = R++
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[PRERELEASELOOSE] + ')?' +
                        src[BUILD] + '?' +
                        ')?)?'

var XRANGE = R++
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$'
var XRANGELOOSE = R++
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$'

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
var COERCE = R++
src[COERCE] = '(?:^|[^\\d])' +
              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:$|[^\\d])'

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++
src[LONETILDE] = '(?:~>?)'

var TILDETRIM = R++
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+'
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g')
var tildeTrimReplace = '$1~'

var TILDE = R++
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$'
var TILDELOOSE = R++
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$'

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++
src[LONECARET] = '(?:\\^)'

var CARETTRIM = R++
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+'
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g')
var caretTrimReplace = '$1^'

var CARET = R++
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$'
var CARETLOOSE = R++
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$'

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$'
var COMPARATOR = R++
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$'

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')'

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g')
var comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$'

var HYPHENRANGELOOSE = R++
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$'

// Star ranges basically just allow anything at all.
var STAR = R++
src[STAR] = '(<|>)?=?\\s*\\*'

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i])
  if (!re[i]) {
    re[i] = new RegExp(src[i])
  }
}

exports.parse = parse
function parse (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  var r = options.loose ? re[LOOSE] : re[FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

exports.valid = valid
function valid (version, options) {
  var v = parse(version, options)
  return v ? v.version : null
}

exports.clean = clean
function clean (version, options) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}

exports.SemVer = SemVer

function SemVer (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }
  if (version instanceof SemVer) {
    if (version.loose === options.loose) {
      return version
    } else {
      version = version.version
    }
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version)
  }

  if (version.length > MAX_LENGTH) {
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
  }

  if (!(this instanceof SemVer)) {
    return new SemVer(version, options)
  }

  debug('SemVer', version, options)
  this.options = options
  this.loose = !!options.loose

  var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL])

  if (!m) {
    throw new TypeError('Invalid Version: ' + version)
  }

  this.raw = version

  // these are actually numbers
  this.major = +m[1]
  this.minor = +m[2]
  this.patch = +m[3]

  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
    throw new TypeError('Invalid major version')
  }

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    throw new TypeError('Invalid minor version')
  }

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
    throw new TypeError('Invalid patch version')
  }

  // numberify any prerelease numeric ids
  if (!m[4]) {
    this.prerelease = []
  } else {
    this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id
        if (num >= 0 && num < MAX_SAFE_INTEGER) {
          return num
        }
      }
      return id
    })
  }

  this.build = m[5] ? m[5].split('.') : []
  this.format()
}

SemVer.prototype.format = function () {
  this.version = this.major + '.' + this.minor + '.' + this.patch
  if (this.prerelease.length) {
    this.version += '-' + this.prerelease.join('.')
  }
  return this.version
}

SemVer.prototype.toString = function () {
  return this.version
}

SemVer.prototype.compare = function (other) {
  debug('SemVer.compare', this.version, this.options, other)
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return this.compareMain(other) || this.comparePre(other)
}

SemVer.prototype.compareMain = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch)
}

SemVer.prototype.comparePre = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length) {
    return -1
  } else if (!this.prerelease.length && other.prerelease.length) {
    return 1
  } else if (!this.prerelease.length && !other.prerelease.length) {
    return 0
  }

  var i = 0
  do {
    var a = this.prerelease[i]
    var b = other.prerelease[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function (release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor = 0
      this.major++
      this.inc('pre', identifier)
      break
    case 'preminor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor++
      this.inc('pre', identifier)
      break
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0
      this.inc('patch', identifier)
      this.inc('pre', identifier)
      break
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0) {
        this.inc('patch', identifier)
      }
      this.inc('pre', identifier)
      break

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) {
        this.major++
      }
      this.minor = 0
      this.patch = 0
      this.prerelease = []
      break
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0) {
        this.minor++
      }
      this.patch = 0
      this.prerelease = []
      break
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0) {
        this.patch++
      }
      this.prerelease = []
      break
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0) {
        this.prerelease = [0]
      } else {
        var i = this.prerelease.length
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++
            i = -2
          }
        }
        if (i === -1) {
          // didn't increment anything
          this.prerelease.push(0)
        }
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1])) {
            this.prerelease = [identifier, 0]
          }
        } else {
          this.prerelease = [identifier, 0]
        }
      }
      break

    default:
      throw new Error('invalid increment argument: ' + release)
  }
  this.format()
  this.raw = this.version
  return this
}

exports.inc = inc
function inc (version, release, loose, identifier) {
  if (typeof (loose) === 'string') {
    identifier = loose
    loose = undefined
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version
  } catch (er) {
    return null
  }
}

exports.diff = diff
function diff (version1, version2) {
  if (eq(version1, version2)) {
    return null
  } else {
    var v1 = parse(version1)
    var v2 = parse(version2)
    var prefix = ''
    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = 'pre'
      var defaultResult = 'prerelease'
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}

exports.compareIdentifiers = compareIdentifiers

var numeric = /^[0-9]+$/
function compareIdentifiers (a, b) {
  var anum = numeric.test(a)
  var bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

exports.rcompareIdentifiers = rcompareIdentifiers
function rcompareIdentifiers (a, b) {
  return compareIdentifiers(b, a)
}

exports.major = major
function major (a, loose) {
  return new SemVer(a, loose).major
}

exports.minor = minor
function minor (a, loose) {
  return new SemVer(a, loose).minor
}

exports.patch = patch
function patch (a, loose) {
  return new SemVer(a, loose).patch
}

exports.compare = compare
function compare (a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose))
}

exports.compareLoose = compareLoose
function compareLoose (a, b) {
  return compare(a, b, true)
}

exports.rcompare = rcompare
function rcompare (a, b, loose) {
  return compare(b, a, loose)
}

exports.sort = sort
function sort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compare(a, b, loose)
  })
}

exports.rsort = rsort
function rsort (list, loose) {
  return list.sort(function (a, b) {
    return exports.rcompare(a, b, loose)
  })
}

exports.gt = gt
function gt (a, b, loose) {
  return compare(a, b, loose) > 0
}

exports.lt = lt
function lt (a, b, loose) {
  return compare(a, b, loose) < 0
}

exports.eq = eq
function eq (a, b, loose) {
  return compare(a, b, loose) === 0
}

exports.neq = neq
function neq (a, b, loose) {
  return compare(a, b, loose) !== 0
}

exports.gte = gte
function gte (a, b, loose) {
  return compare(a, b, loose) >= 0
}

exports.lte = lte
function lte (a, b, loose) {
  return compare(a, b, loose) <= 0
}

exports.cmp = cmp
function cmp (a, op, b, loose) {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError('Invalid operator: ' + op)
  }
}

exports.Comparator = Comparator
function Comparator (comp, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (comp instanceof Comparator) {
    if (comp.loose === !!options.loose) {
      return comp
    } else {
      comp = comp.value
    }
  }

  if (!(this instanceof Comparator)) {
    return new Comparator(comp, options)
  }

  debug('comparator', comp, options)
  this.options = options
  this.loose = !!options.loose
  this.parse(comp)

  if (this.semver === ANY) {
    this.value = ''
  } else {
    this.value = this.operator + this.semver.version
  }

  debug('comp', this)
}

var ANY = {}
Comparator.prototype.parse = function (comp) {
  var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var m = comp.match(r)

  if (!m) {
    throw new TypeError('Invalid comparator: ' + comp)
  }

  this.operator = m[1]
  if (this.operator === '=') {
    this.operator = ''
  }

  // if it literally is just '>' or '' then allow anything.
  if (!m[2]) {
    this.semver = ANY
  } else {
    this.semver = new SemVer(m[2], this.options.loose)
  }
}

Comparator.prototype.toString = function () {
  return this.value
}

Comparator.prototype.test = function (version) {
  debug('Comparator.test', version, this.options.loose)

  if (this.semver === ANY) {
    return true
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options)
  }

  return cmp(version, this.operator, this.semver, this.options)
}

Comparator.prototype.intersects = function (comp, options) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required')
  }

  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  var rangeTmp

  if (this.operator === '') {
    rangeTmp = new Range(comp.value, options)
    return satisfies(this.value, rangeTmp, options)
  } else if (comp.operator === '') {
    rangeTmp = new Range(this.value, options)
    return satisfies(comp.semver, rangeTmp, options)
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>')
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<')
  var sameSemVer = this.semver.version === comp.semver.version
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=')
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, options) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'))
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, options) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'))

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
}

exports.Range = Range
function Range (range, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (range instanceof Range) {
    if (range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease) {
      return range
    } else {
      return new Range(range.raw, options)
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, options)
  }

  if (!(this instanceof Range)) {
    return new Range(range, options)
  }

  this.options = options
  this.loose = !!options.loose
  this.includePrerelease = !!options.includePrerelease

  // First, split based on boolean or ||
  this.raw = range
  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
    return this.parseRange(range.trim())
  }, this).filter(function (c) {
    // throw out any that are not relevant for whatever reason
    return c.length
  })

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range)
  }

  this.format()
}

Range.prototype.format = function () {
  this.range = this.set.map(function (comps) {
    return comps.join(' ').trim()
  }).join('||').trim()
  return this.range
}

Range.prototype.toString = function () {
  return this.range
}

Range.prototype.parseRange = function (range) {
  var loose = this.options.loose
  range = range.trim()
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE]
  range = range.replace(hr, hyphenReplace)
  debug('hyphen replace', range)
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace)
  debug('comparator trim', range, re[COMPARATORTRIM])

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace)

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace)

  // normalize spaces
  range = range.split(/\s+/).join(' ')

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var set = range.split(' ').map(function (comp) {
    return parseComparator(comp, this.options)
  }, this).join(' ').split(/\s+/)
  if (this.options.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function (comp) {
      return !!comp.match(compRe)
    })
  }
  set = set.map(function (comp) {
    return new Comparator(comp, this.options)
  }, this)

  return set
}

Range.prototype.intersects = function (range, options) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required')
  }

  return this.set.some(function (thisComparators) {
    return (
      isSatisfiable(thisComparators, options) &&
      range.set.some(function (rangeComparators) {
        return (
          isSatisfiable(rangeComparators, options) &&
          thisComparators.every(function (thisComparator) {
            return rangeComparators.every(function (rangeComparator) {
              return thisComparator.intersects(rangeComparator, options)
            })
          })
        )
      })
    )
  })
}

// take a set of comparators and determine whether there
// exists a version which can satisfy it
function isSatisfiable (comparators, options) {
  var result = true
  var remainingComparators = comparators.slice()
  var testComparator = remainingComparators.pop()

  while (result && remainingComparators.length) {
    result = remainingComparators.every(function (otherComparator) {
      return testComparator.intersects(otherComparator, options)
    })

    testComparator = remainingComparators.pop()
  }

  return result
}

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators
function toComparators (range, options) {
  return new Range(range, options).set.map(function (comp) {
    return comp.map(function (c) {
      return c.value
    }).join(' ').trim().split(' ')
  })
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator (comp, options) {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

function isX (id) {
  return !id || id.toLowerCase() === 'x' || id === '*'
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceTilde(comp, options)
  }).join(' ')
}

function replaceTilde (comp, options) {
  var r = options.loose ? re[TILDELOOSE] : re[TILDE]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
            ' <' + M + '.' + (+m + 1) + '.0'
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0'
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceCaret(comp, options)
  }).join(' ')
}

function replaceCaret (comp, options) {
  debug('caret', comp, options)
  var r = options.loose ? re[CARETLOOSE] : re[CARET]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      if (M === '0') {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
      } else {
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0'
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
              ' <' + (+M + 1) + '.0.0'
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0'
      }
    }

    debug('caret return', ret)
    return ret
  })
}

function replaceXRanges (comp, options) {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map(function (comp) {
    return replaceXRange(comp, options)
  }).join(' ')
}

function replaceXRange (comp, options) {
  comp = comp.trim()
  var r = options.loose ? re[XRANGELOOSE] : re[XRANGE]
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    var xM = isX(M)
    var xm = xM || isX(m)
    var xp = xm || isX(p)
    var anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      ret = gtlt + M + '.' + m + '.' + p
    } else if (xm) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars (comp, options) {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '')
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = '>=' + fM + '.0.0'
  } else if (isX(fp)) {
    from = '>=' + fM + '.' + fm + '.0'
  } else {
    from = '>=' + from
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = '<' + (+tM + 1) + '.0.0'
  } else if (isX(tp)) {
    to = '<' + tM + '.' + (+tm + 1) + '.0'
  } else if (tpr) {
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr
  } else {
    to = '<=' + to
  }

  return (from + ' ' + to).trim()
}

// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function (version) {
  if (!version) {
    return false
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options)
  }

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version, this.options)) {
      return true
    }
  }
  return false
}

function testSet (set, version, options) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}

exports.satisfies = satisfies
function satisfies (version, range, options) {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}

exports.maxSatisfying = maxSatisfying
function maxSatisfying (versions, range, options) {
  var max = null
  var maxSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}

exports.minSatisfying = minSatisfying
function minSatisfying (versions, range, options) {
  var min = null
  var minSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}

exports.minVersion = minVersion
function minVersion (range, loose) {
  range = new Range(range, loose)

  var minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    comparators.forEach(function (comparator) {
      // Clone to avoid manipulating the comparator's semver object.
      var compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!minver || gt(minver, compver)) {
            minver = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error('Unexpected operation: ' + comparator.operator)
      }
    })
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}

exports.validRange = validRange
function validRange (range, options) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr
function ltr (version, range, options) {
  return outside(version, range, '<', options)
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr
function gtr (version, range, options) {
  return outside(version, range, '>', options)
}

exports.outside = outside
function outside (version, range, hilo, options) {
  version = new SemVer(version, options)
  range = new Range(range, options)

  var gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    var high = null
    var low = null

    comparators.forEach(function (comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

exports.prerelease = prerelease
function prerelease (version, options) {
  var parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}

exports.intersects = intersects
function intersects (r1, r2, options) {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}

exports.coerce = coerce
function coerce (version) {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  var match = version.match(re[COERCE])

  if (match == null) {
    return null
  }

  return parse(match[1] +
    '.' + (match[2] || '0') +
    '.' + (match[3] || '0'))
}


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("atom");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class View {
  constructor(name, dependencies) {
    this.name = name;
    this.dependencies = dependencies;
    const notification = atom.notifications.addInfo(`Installing ${name} dependencies`, {
      detail: `Installing ${dependencies.map(item => item.name).join(', ')}`,
      dismissable: true
    });
    const progress = document.createElement('progress');

    this.dispose = function () {
      notification.dismiss();
    };

    this.advance = function () {
      progress.value++;
    };

    progress.max = dependencies.length;
    progress.style.width = '100%';

    try {
      const notificationView = atom.views.getView(notification);
      const notificationContent = notificationView.querySelector('.detail-content') || notificationView.querySelector('.content');

      if (notificationContent) {
        notificationContent.appendChild(progress);
      }
    } catch (_) {
      /* Notifications package is disabled */
    }
  }

  complete(errors) {
    this.dispose();

    if (!errors.size) {
      atom.notifications.addSuccess(`Installed ${this.name} dependencies`, {
        detail: `Installed ${this.dependencies.map(item => item.name).join(', ')}`
      });
      return;
    }

    const packages = [];

    for (const [packageName, error] of errors) {
      packages.push(`  • ${packageName}`);
      console.error(`[Package-Deps] Unable to install ${packageName}, Error:`, error && error.stack || error);
    }

    atom.notifications.addWarning(`Failed to install ${this.name} dependencies`, {
      detail: `These packages were not installed, check your console\nfor more info.\n${packages.join('\n')}`,
      dismissable: true
    });
  }

}

exports.default = View;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// build - https://atom.io/packages/build
var Build;

module.exports = Build = {
  createFile: function(wine) {
    var buildFileBase, buildFilePath, buildFileSyntax, createFile, currentFile, currentPath, editor, fs, getConfig, path, successMsg;
    fs = __webpack_require__(6);
    path = __webpack_require__(4);
    ({getConfig} = __webpack_require__(1));
    editor = atom.workspace.getActiveTextEditor();
    if (editor == null) {
      atom.notifications.addWarning("**language-nsis**: No active editor", {
        dismissable: false
      });
      return;
    }
    if (editor.getGrammar().scopeName !== "source.nsis") {
      atom.beep();
      return;
    }
    createFile = false;
    currentPath = atom.workspace.getActivePaneItem().getPath();
    currentFile = path.basename(currentPath);
    if (typeof currentPath === "undefined") {
      return atom.confirm({
        message: "File not saved",
        detailedMessage: "You need to save this file before you can create a build-file",
        buttons: {
          "OK": function() {}
        }
      });
    } else {
      successMsg = null;
      currentPath = path.dirname(currentPath);
      buildFileSyntax = getConfig("buildFileSyntax");
      if (buildFileSyntax === "CSON") {
        buildFileBase = ".atom-build.cson";
      } else if (buildFileSyntax === "YAML") {
        buildFileBase = ".atom-build.yml";
      } else {
        buildFileBase = ".atom-build.json";
      }
      buildFilePath = path.join(currentPath, buildFileBase);
      return fs.access(`${buildFilePath}`, fs.constants.R_OK, function(error) {
        var CSON, YAML, buildFile, makeNsis, packageDir, pathToScript, sh, stringify;
        if (error === null) {
          atom.confirm({
            message: "File exists",
            detailedMessage: "Do you really want to overwrite your existing build file?",
            buttons: {
              "Overwrite": function() {
                successMsg = "Overwriting existing file";
                return createFile = true;
              },
              "Abort": function() {}
            }
          });
        } else {
          successMsg = "Saving file";
          createFile = true;
        }
        if (createFile === true) {
          if (wine !== true) {
            makeNsis = "makensis";
            sh = false;
          } else {
            pathToScript = atom.config.get("build-makensis-wine.pathToScript");
            packageDir = atom.packages.getPackageDirPaths().toString();
            makeNsis = pathToScript ? `"${pathToScript}"` : path.join(packageDir, "build-makensis-wine", "lib", "makensis-wine.sh");
            sh = true;
          }
          buildFile = {
            name: `${currentFile}`,
            cmd: makeNsis,
            args: ["{FILE_ACTIVE}"],
            sh: sh,
            cwd: "{FILE_ACTIVE_PATH}",
            errorMatch: "(\\r?\\n)(?<message>.+)(\\r?\\n)Error in script \"(?<file>[^\"]+)\" on line (?<line>\\d+) -- aborting creation process",
            warningMatch: "[^!]warning: (?<message>.*) \\((?<file>(\\w{1}:)?[^:]+):(?<line>\\d+)\\)"
          };
          if (buildFileSyntax === "CSON") {
            CSON = __webpack_require__(27);
            stringify = CSON.stringify(buildFile, null, 2);
          }
          if (buildFileSyntax === "YAML") {
            YAML = __webpack_require__(30);
            stringify = YAML.dump(buildFile);
          } else {
            stringify = JSON.stringify(buildFile, null, 2);
          }
          // Save build file
          return fs.writeFile(buildFilePath, stringify, function(error) {
            if (error) {
              return atom.notifications.addError(buildFileBase, {
                detail: error,
                dismissable: false
              });
            } else {
              atom.notifications.addInfo(buildFileBase, {
                detail: successMsg,
                dismissable: false
              });
              return atom.workspace.open(buildFilePath);
            }
          });
        }
      });
    }
  }
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {// 2016 December 29
// https://github.com/bevry/editions


module.exports = __webpack_require__(28).requirePackage(__dirname, __webpack_require__(29))

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* @flow */
/* eslint no-console:0 */


// Imports

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pathUtil = __webpack_require__(4);

// Helper class to display nested error in a sensible way

var DetailedError = function (_Error) {
	_inherits(DetailedError, _Error);

	function DetailedError(message /* :string */, details /* :Object */) {
		_classCallCheck(this, DetailedError);

		Object.keys(details).forEach(function (key) {
			var data = details[key];
			var value = __webpack_require__(7).inspect(data.stack || data.message || data);
			message += '\n' + key + ': ' + value;
		});
		return _possibleConstructorReturn(this, (DetailedError.__proto__ || Object.getPrototypeOf(DetailedError)).call(this, message));
	}

	return DetailedError;
}(Error);

// Environment fetching


var blacklist = process && process.env && process.env.EDITIONS_SYNTAX_BLACKLIST && process.env.EDITIONS_SYNTAX_BLACKLIST.split(',');

// Cache of which syntax combinations are supported or unsupported, hash of booleans
var syntaxFailedCombitions = {}; // sorted lowercase syntax combination => Error instance of failure
var syntaxBlacklist = {};
syntaxBlacklist.import = new Error('The import syntax is skipped as the module package.json field eliminates the need for autoloader support');
syntaxBlacklist.coffeescript = new Error('The coffeescript syntax is skipped as we want to use a precompiled edition rather than compiling at runtime');
syntaxBlacklist.typescript = new Error('The typescript syntax is skipped as we want to use a precompiled edition rather than compiling at runtime');

// Blacklist non-esnext node versions from esnext
if (process && process.versions && process.versions.node) {
	var EARLIEST_ESNEXT_NODE_VERSION = [0, 12];
	var NODE_VERSION = process.versions.node.split('.').map(function (n) {
		return parseInt(n, 10);
	});
	var ESNEXT_UNSUPPORTED = NODE_VERSION[0] < EARLIEST_ESNEXT_NODE_VERSION[0] || NODE_VERSION[0] === EARLIEST_ESNEXT_NODE_VERSION[0] && NODE_VERSION[1] < EARLIEST_ESNEXT_NODE_VERSION[1];
	if (ESNEXT_UNSUPPORTED) syntaxBlacklist.esnext = new Error('The esnext syntax is skipped on early node versions as attempting to use esnext features will output debugging information on these node versions');
}

// Check the environment configuration for a syntax blacklist
if (blacklist) {
	for (var i = 0; i < blacklist.length; ++i) {
		var syntax = blacklist[i].trim().toLowerCase();
		syntaxBlacklist[syntax] = new DetailedError('The EDITIONS_SYNTAX_BLACKLIST environment variable has blacklisted an edition syntax:', { syntax: syntax, blacklist: blacklist });
	}
}

/* ::
type edition = {
	name:number,
	description?:string,
	directory?:string,
	entry?:string,
	syntaxes?:Array<string>
};
type options = {
	cwd?:string,
	package?:string,
	entry?:string,
	require:function
};
*/

/**
 * Cycle through the editions and require the correct one
 * @protected internal function that is untested for public consumption
 * @param {edition} edition - the edition entry
 * @param {Object} opts - the following options
 * @param {string} opts.require - the require method of the calling module, used to ensure require paths remain correct
 * @param {string} [opts.cwd] - if provided, this will be the cwd for entries
 * @param {string} [opts.entry] - if provided, should be a relative or absolute path to the entry point of the edition
 * @param {string} [opts.package] - if provided, should be the name of the package that we are loading the editions for
 * @returns {*}
 */
function requireEdition(edition /* :edition */, opts /* :options */) /* :any */{
	// Prevent require from being included in debug logs
	Object.defineProperty(opts, 'require', { value: opts.require, enumerable: false });

	// Get the correct entry path
	// As older versions o
	var cwd = opts.cwd || '';
	var dir = edition.directory || '';
	var entry = opts.entry || edition.entry || '';
	if (dir && entry && entry.indexOf(dir + '/') === 0) entry = entry.substring(dir.length + 1);
	// ^ this should not be needed, but as previous versions of editions included the directory inside the entry
	// it unfortunately is, as such this is a stepping stone for the new format, the new format being
	// if entry is specified by itself, it is cwd => entry
	// if entry is specified with a directory, it is cwd => dir => entry
	// if entry is not specified but dir is, it is cwd => dir
	// if neither entry nor dir are specified, we have a problem
	if (!dir && !entry) {
		var editionFailure = new DetailedError('Skipped edition due to no entry or directory being specified:', { edition: edition, cwd: cwd, dir: dir, entry: entry });
		throw editionFailure;
	}
	var entryPath = pathUtil.resolve(cwd, dir, entry);

	// Check syntax support
	// Convert syntaxes into a sorted lowercase string
	var syntaxes = edition.syntaxes && edition.syntaxes.map(function (i) {
		return i.toLowerCase();
	}).sort();
	var syntaxCombination = syntaxes && syntaxes.join(', ');
	if (syntaxes && syntaxCombination) {
		// Check if any of the syntaxes are unsupported
		var unsupportedSyntaxes = syntaxes.filter(function (i) {
			return syntaxBlacklist[i.toLowerCase()];
		});
		if (unsupportedSyntaxes.length) {
			var _editionFailure = new DetailedError('Skipped edition due to it containing an unsupported syntax:', { edition: edition, unsupportedSyntaxes: unsupportedSyntaxes });
			throw _editionFailure;
		}
		// Is this syntax combination unsupported? If so skip it with a soft failure to try the next edition
		else if (syntaxFailedCombitions[syntaxCombination]) {
				var previousCombinationFailure = syntaxFailedCombitions[syntaxCombination];
				var _editionFailure2 = new DetailedError('Skipped edition due to its syntax combinatiom failing previously:', { edition: edition, previousCombinationFailure: previousCombinationFailure });
				throw _editionFailure2;
			}
	}

	// Try and load this syntax combination
	try {
		return opts.require(entryPath);
	} catch (error) {
		// Note the error with more details
		var _editionFailure3 = new DetailedError('Failed to load the edition due to a load error:', { edition: edition, error: error.stack });

		// Blacklist the combination, even if it may have worked before
		// Perhaps in the future note if that if it did work previously, then we should instruct module owners to be more specific with their syntaxes
		if (syntaxCombination) syntaxFailedCombitions[syntaxCombination] = _editionFailure3;

		// Continue to the next edition
		throw _editionFailure3;
	}
}

/**
 * Cycle through the editions and require the correct one
 * @protected internal function that is untested for public consumption
 * @param {Array<edition>} editions - an array of edition entries
 * @param {Object} opts - the following options
 * @param {string} opts.require - the require method of the calling module, used to ensure require paths remain correct
 * @param {string} [opts.cwd] - if provided, this will be the cwd for entries
 * @param {string} [opts.entry] - if provided, should be a relative path to the entry point of the edition
 * @param {string} [opts.package] - if provided, should be the name of the package that we are loading the editions for
 * @returns {*}
 */
function requireEditions(editions /* :Array<edition> */, opts /* :options */) /* :any */{
	// Extract
	if (opts.package == null) opts.package = 'custom runtime package';

	// Check
	if (!editions || editions.length === 0) {
		throw new DetailedError('No editions were specified:', { opts: opts });
	}

	// Note the last error message
	var editionFailures = [];

	// Cycle through the editions
	for (var _i = 0; _i < editions.length; ++_i) {
		var edition = editions[_i];
		try {
			return requireEdition(edition, opts);
		} catch (err) {
			editionFailures.push(err);
		}
	}

	// Through the error as no edition loaded
	throw new DetailedError('There are no suitable editions for this environment:', { opts: opts, editions: editions, failures: editionFailures });
}

/**
 * Cycle through the editions for a package and require the correct one
 * @param {string} cwd - the path of the package, used to load package.json:editions and handle relative edition entry points
 * @param {function} require - the require method of the calling module, used to ensure require paths remain correct
 * @param {string} [entry] - an optional override for the entry of an edition, requires the edition to specify a `directory` property
 * @returns {*}
 */
function requirePackage(cwd /* :string */, require /* :function */, entry /* :: ?:string */) /* :any */{
	// Load the package.json file to fetch `name` for debugging and `editions` for loading
	var packagePath = pathUtil.resolve(cwd, 'package.json');

	var _require = require(packagePath),
	    name = _require.name,
	    editions = _require.editions;

	var opts /* :options */ = { cwd: cwd, require: require };
	if (name) opts.package = name;
	if (entry) opts.entry = entry;
	return requireEditions(editions, opts);
}

// Exports
module.exports = { requireEdition: requireEdition, requireEditions: requireEditions, requirePackage: requirePackage };

/***/ }),
/* 29 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 29;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var composer, constructor, dumper, errors, events, loader, nodes, parser, reader, resolver, scanner, tokens, util;

  composer = this.composer = __webpack_require__(31);

  constructor = this.constructor = __webpack_require__(35);

  dumper = this.dumper = __webpack_require__(37);

  errors = this.errors = __webpack_require__(33);

  events = this.events = __webpack_require__(32);

  loader = this.loader = __webpack_require__(42);

  nodes = this.nodes = __webpack_require__(34);

  parser = this.parser = __webpack_require__(46);

  reader = this.reader = __webpack_require__(43);

  resolver = this.resolver = __webpack_require__(41);

  scanner = this.scanner = __webpack_require__(44);

  tokens = this.tokens = __webpack_require__(45);

  util = __webpack_require__(36);

  /*
  Scan a YAML stream and produce scanning tokens.
  */
  this.scan = function(stream, Loader = loader.Loader) {
    var _loader, results;
    _loader = new Loader(stream);
    results = [];
    while (_loader.check_token()) {
      results.push(_loader.get_token());
    }
    return results;
  };

  /*
  Parse a YAML stream and produce parsing events.
  */
  this.parse = function(stream, Loader = loader.Loader) {
    var _loader, results;
    _loader = new Loader(stream);
    results = [];
    while (_loader.check_event()) {
      results.push(_loader.get_event());
    }
    return results;
  };

  /*
  Parse the first YAML document in a stream and produce the corresponding
  representation tree.
  */
  this.compose = function(stream, Loader = loader.Loader) {
    var _loader;
    _loader = new Loader(stream);
    return _loader.get_single_node();
  };

  /*
  Parse all YAML documents in a stream and produce corresponding representation
  trees.
  */
  this.compose_all = function(stream, Loader = loader.Loader) {
    var _loader, results;
    _loader = new Loader(stream);
    results = [];
    while (_loader.check_node()) {
      results.push(_loader.get_node());
    }
    return results;
  };

  /*
  Parse the first YAML document in a stream and produce the corresponding
  Javascript object.
  */
  this.load = function(stream, Loader = loader.Loader) {
    var _loader;
    _loader = new Loader(stream);
    return _loader.get_single_data();
  };

  /*
  Parse all YAML documents in a stream and produce the corresponing Javascript
  object.
  */
  this.load_all = function(stream, Loader = loader.Loader) {
    var _loader, results;
    _loader = new Loader(stream);
    results = [];
    while (_loader.check_data()) {
      results.push(_loader.get_data());
    }
    return results;
  };

  /*
  Emit YAML parsing events into a stream.
  If stream is falsey, return the produced string instead.
  */
  this.emit = function(events, stream, Dumper = dumper.Dumper, options = {}) {
    var _dumper, dest, event, i, len;
    dest = stream || new util.StringStream;
    _dumper = new Dumper(dest, options);
    try {
      for (i = 0, len = events.length; i < len; i++) {
        event = events[i];
        _dumper.emit(event);
      }
    } finally {
      _dumper.dispose();
    }
    return stream || dest.string;
  };

  /*
  Serialize a representation tree into a YAML stream.
  If stream is falsey, return the produced string instead.
  */
  this.serialize = function(node, stream, Dumper = dumper.Dumper, options = {}) {
    return exports.serialize_all([node], stream, Dumper, options);
  };

  /*
  Serialize a sequence of representation tress into a YAML stream.
  If stream is falsey, return the produced string instead.
  */
  this.serialize_all = function(nodes, stream, Dumper = dumper.Dumper, options = {}) {
    var _dumper, dest, i, len, node;
    dest = stream || new util.StringStream;
    _dumper = new Dumper(dest, options);
    try {
      _dumper.open();
      for (i = 0, len = nodes.length; i < len; i++) {
        node = nodes[i];
        _dumper.serialize(node);
      }
      _dumper.close();
    } finally {
      _dumper.dispose();
    }
    return stream || dest.string;
  };

  /*
  Serialize a Javascript object into a YAML stream.
  If stream is falsey, return the produced string instead.
  */
  this.dump = function(data, stream, Dumper = dumper.Dumper, options = {}) {
    return exports.dump_all([data], stream, Dumper, options);
  };

  /*
  Serialize a sequence of Javascript objects into a YAML stream.
  If stream is falsey, return the produced string instead.
  */
  this.dump_all = function(documents, stream, Dumper = dumper.Dumper, options = {}) {
    var _dumper, dest, document, i, len;
    dest = stream || new util.StringStream;
    _dumper = new Dumper(dest, options);
    try {
      _dumper.open();
      for (i = 0, len = documents.length; i < len; i++) {
        document = documents[i];
        _dumper.represent(document);
      }
      _dumper.close();
    } finally {
      _dumper.dispose();
    }
    return stream || dest.string;
  };

}).call(this);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var MarkedYAMLError, events, nodes;

  events = __webpack_require__(32);

  ({MarkedYAMLError} = __webpack_require__(33));

  nodes = __webpack_require__(34);

  /*
  Thrown for errors encountered during composing.
  */
  this.ComposerError = class ComposerError extends MarkedYAMLError {};

  /*
  The composer class handles the construction of representation trees from events.

  This uses the methods from {Parser} to process the event stream, and provides a similar stream-like
  interface to representation trees via {Composer#check_node}, {Composer#get_node}, and
  {Composer#get_single_node}.
  */
  this.Composer = (function() {
    var ctor;

    class Composer {
      constructor() {
        return ctor.apply(this, arguments);
      }

      /*
      Initialise a `Composer` instance.
      */
      initialise() {
        // @property {Object} A mapping from anchor names to nodes.
        return this.anchors = {};
      }

      /*
      Checks if a document can be composed from the event stream.

      So long as the event stream hasn't ended (no [StreamEndEvent]), another document can be composed.

      @return {Boolean} True if a document can be composed, false otherwise.
      */
      check_node() {
        if (this.check_event(events.StreamStartEvent)) {
          // Drop the STREAM-START event.
          this.get_event();
        }
        // Are there more documents available?
        return !this.check_event(events.StreamEndEvent);
      }

      /*
      Compose a document from the remaining event stream.

      {Composer#check_node} must be called before calling this method.

      @return {Node} The next document in the stream. Returns `undefined` if the event stream has ended.
      */
      get_node() {
        if (!this.check_event(events.StreamEndEvent)) {
          return this.compose_document();
        }
      }

      /*
      Compose a single document from the entire event stream.

      @throw {ComposerError} if there's more than one document is in the stream.

      @return {Node} The single document in the stream.
      */
      get_single_node() {
        var document, event;
        // Drop the STREAM-START event.
        this.get_event();
        // Compose a document if the stream is not empty.
        document = null;
        if (!this.check_event(events.StreamEndEvent)) {
          document = this.compose_document();
        }
        // Ensure that the stream contains no more documents.
        if (!this.check_event(events.StreamEndEvent)) {
          event = this.get_event();
          throw new exports.ComposerError('expected a single document in the stream', document.start_mark, 'but found another document', event.start_mark);
        }
        // Drop the STREAM-END event.
        this.get_event();
        return document;
      }

      /*
      Compose a document node from the event stream.

      A 'document' node is any single {Node} subclass.  {DocumentStart} and {DocumentEnd} events delimit
      the events used for composition.

      @private

      @return {Node} The document node.
      */
      compose_document() {
        var node;
        // Drop the DOCUMENT-START event.
        this.get_event();
        // Compose the root node.
        node = this.compose_node();
        // Drop the DOCUMENT-END node.
        this.get_event();
        // Reset the anchors
        this.anchors = {};
        return node;
      }

      /*
      Compose a node from the event stream.

      Composes a {ScalarNode}, {SequenceNode}, or {MappingNode} from the event stream, depending on the
      first event encountered ({ScalarEvent}, {SequenceStartEvent}, or {MappingStartEvent}
      respectively).

      @private

      @param parent {Node} The parent of the new node.
      @param index {Number} The index of the new node within the parent's children.
      @throw {ComposerError} if an alias is encountered for an undefined anchor.
      @throw {ComposerError} if a duplicate anchor is envountered.
      @return {Node} The composed node.
      */
      compose_node(parent, index) {
        var anchor, event, node;
        if (this.check_event(events.AliasEvent)) {
          event = this.get_event();
          anchor = event.anchor;
          if (!(anchor in this.anchors)) {
            throw new exports.ComposerError(null, null, `found undefined alias ${anchor}`, event.start_mark);
          }
          return this.anchors[anchor];
        }
        event = this.peek_event();
        anchor = event.anchor;
        if (anchor !== null && anchor in this.anchors) {
          throw new exports.ComposerError(`found duplicate anchor ${anchor}; first occurence`, this.anchors[anchor].start_mark, 'second occurrence', event.start_mark);
        }
        this.descend_resolver(parent, index);
        if (this.check_event(events.ScalarEvent)) {
          node = this.compose_scalar_node(anchor);
        } else if (this.check_event(events.SequenceStartEvent)) {
          node = this.compose_sequence_node(anchor);
        } else if (this.check_event(events.MappingStartEvent)) {
          node = this.compose_mapping_node(anchor);
        }
        this.ascend_resolver();
        return node;
      }

      /*
      Compose a {ScalarNode} from the event stream.

      @private

      @param anchor {String} The anchor name for the node (if any).
      @return {ScalarNode} The node composed from a {ScalarEvent}.
      */
      compose_scalar_node(anchor) {
        var event, node, tag;
        event = this.get_event();
        tag = event.tag;
        if (tag === null || tag === '!') {
          tag = this.resolve(nodes.ScalarNode, event.value, event.implicit);
        }
        node = new nodes.ScalarNode(tag, event.value, event.start_mark, event.end_mark, event.style);
        if (anchor !== null) {
          this.anchors[anchor] = node;
        }
        return node;
      }

      /*
      Compose a {SequenceNode} from the event stream.

      The contents of the node are composed from events between a {SequenceStartEvent} and a
      {SequenceEndEvent}.

      @private

      @param anchor {String} The anchor name for the node (if any).
      @return {SequenceNode} The composed node.
      */
      compose_sequence_node(anchor) {
        var end_event, index, node, start_event, tag;
        start_event = this.get_event();
        tag = start_event.tag;
        if (tag === null || tag === '!') {
          tag = this.resolve(nodes.SequenceNode, null, start_event.implicit);
        }
        node = new nodes.SequenceNode(tag, [], start_event.start_mark, null, start_event.flow_style);
        if (anchor !== null) {
          this.anchors[anchor] = node;
        }
        index = 0;
        while (!this.check_event(events.SequenceEndEvent)) {
          node.value.push(this.compose_node(node, index));
          index++;
        }
        end_event = this.get_event();
        node.end_mark = end_event.end_mark;
        return node;
      }

      /*
      Compose a {MappingNode} from the event stream.

      The contents of the node are composed from events between a {MappingStartEvent} and a
      {MappingEndEvent}.

      @private

      @param anchor {String} The anchor name for the node (if any).
      @return {MappingNode} The composed node.
      */
      compose_mapping_node(anchor) {
        var end_event, item_key, item_value, node, start_event, tag;
        start_event = this.get_event();
        tag = start_event.tag;
        if (tag === null || tag === '!') {
          tag = this.resolve(nodes.MappingNode, null, start_event.implicit);
        }
        node = new nodes.MappingNode(tag, [], start_event.start_mark, null, start_event.flow_style);
        if (anchor !== null) {
          this.anchors[anchor] = node;
        }
        while (!this.check_event(events.MappingEndEvent)) {
          item_key = this.compose_node(node);
          item_value = this.compose_node(node, item_key);
          node.value.push([item_key, item_value]);
        }
        end_event = this.get_event();
        node.end_mark = end_event.end_mark;
        return node;
      }

    };

    ctor = Composer.prototype.initialise;

    return Composer;

  }).call(this);

}).call(this);


/***/ }),
/* 32 */
/***/ (function(module, exports) {

(function() {
  this.Event = class Event {
    constructor(start_mark1, end_mark1) {
      this.start_mark = start_mark1;
      this.end_mark = end_mark1;
    }

  };

  this.NodeEvent = class NodeEvent extends this.Event {
    constructor(anchor1, start_mark, end_mark) {
      super(start_mark, end_mark);
      this.anchor = anchor1;
    }

  };

  this.CollectionStartEvent = class CollectionStartEvent extends this.NodeEvent {
    constructor(anchor, tag, implicit, start_mark, end_mark, flow_style) {
      super(anchor, start_mark, end_mark);
      this.tag = tag;
      this.implicit = implicit;
      this.flow_style = flow_style;
    }

  };

  this.CollectionEndEvent = class CollectionEndEvent extends this.Event {};

  this.StreamStartEvent = class StreamStartEvent extends this.Event {
    constructor(start_mark, end_mark, encoding) {
      super(start_mark, end_mark);
      this.encoding = encoding;
    }

  };

  this.StreamEndEvent = class StreamEndEvent extends this.Event {};

  this.DocumentStartEvent = class DocumentStartEvent extends this.Event {
    constructor(start_mark, end_mark, explicit, version, tags) {
      super(start_mark, end_mark);
      this.explicit = explicit;
      this.version = version;
      this.tags = tags;
    }

  };

  this.DocumentEndEvent = class DocumentEndEvent extends this.Event {
    constructor(start_mark, end_mark, explicit) {
      super(start_mark, end_mark);
      this.explicit = explicit;
    }

  };

  this.AliasEvent = class AliasEvent extends this.NodeEvent {};

  this.ScalarEvent = class ScalarEvent extends this.NodeEvent {
    constructor(anchor, tag, implicit, value, start_mark, end_mark, style) {
      super(anchor, start_mark, end_mark);
      this.tag = tag;
      this.implicit = implicit;
      this.value = value;
      this.style = style;
    }

  };

  this.SequenceStartEvent = class SequenceStartEvent extends this.CollectionStartEvent {};

  this.SequenceEndEvent = class SequenceEndEvent extends this.CollectionEndEvent {};

  this.MappingStartEvent = class MappingStartEvent extends this.CollectionStartEvent {};

  this.MappingEndEvent = class MappingEndEvent extends this.CollectionEndEvent {};

}).call(this);


/***/ }),
/* 33 */
/***/ (function(module, exports) {

(function() {
  var indexOf = [].indexOf;

  this.Mark = class Mark {
    constructor(line, column, buffer, pointer) {
      this.line = line;
      this.column = column;
      this.buffer = buffer;
      this.pointer = pointer;
    }

    get_snippet(indent = 4, max_length = 75) {
      var break_chars, end, head, ref, ref1, start, tail;
      if (this.buffer == null) {
        return null;
      }
      break_chars = '\x00\r\n\x85\u2028\u2029';
      head = '';
      start = this.pointer;
      while (start > 0 && (ref = this.buffer[start - 1], indexOf.call(break_chars, ref) < 0)) {
        start--;
        if (this.pointer - start > max_length / 2 - 1) {
          head = ' ... ';
          start += 5;
          break;
        }
      }
      tail = '';
      end = this.pointer;
      while (end < this.buffer.length && (ref1 = this.buffer[end], indexOf.call(break_chars, ref1) < 0)) {
        end++;
        if (end - this.pointer > max_length / 2 - 1) {
          tail = ' ... ';
          end -= 5;
          break;
        }
      }
      return `${(new Array(indent)).join(' ')}${head}${this.buffer.slice(start, end)}${tail}\n${(new Array(indent + this.pointer - start + head.length)).join(' ')}^`;
    }

    toString() {
      var snippet, where;
      snippet = this.get_snippet();
      where = `  on line ${this.line + 1}, column ${this.column + 1}`;
      if (snippet) {
        return where;
      } else {
        return `${where}:\n${snippet}`;
      }
    }

  };

  this.YAMLError = class YAMLError extends Error {
    constructor(message) {
      super(message);
      // Hack to get the stack on the error somehow
      Object.defineProperty(this, 'stack', {
        get: function() {
          return this.toString() + '\n' + (new Error).stack.split('\n').slice(1).join('\n');
        }
      });
    }

    toString() {
      return this.message;
    }

  };

  this.MarkedYAMLError = class MarkedYAMLError extends this.YAMLError {
    constructor(context, context_mark, problem, problem_mark, note) {
      super();
      this.context = context;
      this.context_mark = context_mark;
      this.problem = problem;
      this.problem_mark = problem_mark;
      this.note = note;
    }

    toString() {
      var lines;
      lines = [];
      if (this.context != null) {
        lines.push(this.context);
      }
      if ((this.context_mark != null) && ((this.problem == null) || (this.problem_mark == null) || this.context_mark.line !== this.problem_mark.line || this.context_mark.column !== this.problem_mark.column)) {
        lines.push(this.context_mark.toString());
      }
      if (this.problem != null) {
        lines.push(this.problem);
      }
      if (this.problem_mark != null) {
        lines.push(this.problem_mark.toString());
      }
      if (this.note != null) {
        lines.push(this.note);
      }
      return lines.join('\n');
    }

  };

}).call(this);


/***/ }),
/* 34 */
/***/ (function(module, exports) {

(function() {
  var unique_id;

  unique_id = 0;

  this.Node = class Node {
    constructor(tag1, value1, start_mark1, end_mark1) {
      this.tag = tag1;
      this.value = value1;
      this.start_mark = start_mark1;
      this.end_mark = end_mark1;
      this.unique_id = `node_${unique_id++}`;
    }

  };

  this.ScalarNode = (function() {
    class ScalarNode extends this.Node {
      constructor(tag, value, start_mark, end_mark, style) {
        super(tag, value, start_mark, end_mark);
        this.style = style;
      }

    };

    ScalarNode.prototype.id = 'scalar';

    return ScalarNode;

  }).call(this);

  this.CollectionNode = class CollectionNode extends this.Node {
    constructor(tag, value, start_mark, end_mark, flow_style) {
      super(tag, value, start_mark, end_mark);
      this.flow_style = flow_style;
    }

  };

  this.SequenceNode = (function() {
    class SequenceNode extends this.CollectionNode {};

    SequenceNode.prototype.id = 'sequence';

    return SequenceNode;

  }).call(this);

  this.MappingNode = (function() {
    class MappingNode extends this.CollectionNode {};

    MappingNode.prototype.id = 'mapping';

    return MappingNode;

  }).call(this);

}).call(this);


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var MarkedYAMLError, nodes, util,
    indexOf = [].indexOf;

  ({MarkedYAMLError} = __webpack_require__(33));

  nodes = __webpack_require__(34);

  util = __webpack_require__(36);

  /*
  Thrown for errors encountered during construction.
  */
  this.ConstructorError = class ConstructorError extends MarkedYAMLError {};

  /*
  The constructor class handles the construction of Javascript objects from representation trees
  ({Node}s).

  This uses the methods from {Composer} to process the representation stream, and provides a similar
  stream-like interface to Javascript objects via {BaseConstructor#check_node},
  {BaseConstructor#get_node}, and {BaseConstructor#get_single_node}.
  */
  this.BaseConstructor = (function() {
    var ctor;

    class BaseConstructor {
      constructor() {
        return ctor.apply(this, arguments);
      }

      /*
      Add a constructor function for a specific tag.

      The constructor will be used to turn {Node Nodes} with the given tag into a Javascript object.

      @param tag {String} The tag for which the constructor should apply.
      @param constructor {Function<Node,any>} A function that turns a {Node} with the given tag into a
        Javascript object.
      @return {Function<Node,Any>} Returns the supplied `constructor`.
      */
      static add_constructor(tag, constructor) {
        if (!this.prototype.hasOwnProperty('yaml_constructors')) {
          this.prototype.yaml_constructors = util.extend({}, this.prototype.yaml_constructors);
        }
        return this.prototype.yaml_constructors[tag] = constructor;
      }

      /*
      Add a constructor function for a tag prefix.

      The constructor will be used to turn {Node Nodes} with the given tag prefix into a Javascript
      object.

      @param tag_prefix {String} The tag prefix for which the constructor should apply.
      @param multi_constructor {Function<Node,any>} A function that turns a {Node} with the given tag
      prefix into a Javascript object.
      @return {Function<Node,Any>} Returns the supplied `multi_constructor`.
      */
      static add_multi_constructor(tag_prefix, multi_constructor) {
        if (!this.prototype.hasOwnProperty('yaml_multi_constructors')) {
          this.prototype.yaml_multi_constructors = util.extend({}, this.prototype.yaml_multi_constructors);
        }
        return this.prototype.yaml_multi_constructors[tag_prefix] = multi_constructor;
      }

      /*
      Initialise a new instance.
      */
      initialise() {
        // @param {Object} A map from {Node#unique_id} to the constructed Javascript object for the node.
        this.constructed_objects = {};
        // @param {Array<String>} An array of {Node#unique_id}s that are being constructed.
        this.constructing_nodes = [];
        // @param {Function<any>} An array of functions to be exectied after docmuent construction.
        return this.deferred_constructors = [];
      }

      /*
      Checks if a document can be constructed from the representation stream.

      So long as the representation stream hasn't ended, another document can be constructed.

      @return {Boolean} True if a document can be constructed, false otherwise.
      */
      check_data() {
        return this.check_node();
      }

      /*
      Construct a document from the remaining representation stream.

      {Constructor#check_data} must be called before calling this method.

      @return {any} The next document in the stream. Returns `undefined` if the stream has ended.
      */
      get_data() {
        if (this.check_node()) {
          return this.construct_document(this.get_node());
        }
      }

      /*
      Construct a single document from the entire representation stream.

      @throw {ComposerError} if there's more than one document is in the stream.

      @return {Node} The single document in the stream.
      */
      get_single_data() {
        var node;
        node = this.get_single_node();
        if (node != null) {
          return this.construct_document(node);
        }
        return null;
      }

      /*
      Construct a document node

      @private
      */
      construct_document(node) {
        var data;
        data = this.construct_object(node);
        while (!util.is_empty(this.deferred_constructors)) {
          this.deferred_constructors.pop()();
        }
        return data;
      }

      defer(f) {
        return this.deferred_constructors.push(f);
      }

      construct_object(node) {
        var constructor, object, ref, tag_prefix, tag_suffix;
        if (node.unique_id in this.constructed_objects) {
          return this.constructed_objects[node.unique_id];
        }
        if (ref = node.unique_id, indexOf.call(this.constructing_nodes, ref) >= 0) {
          throw new exports.ConstructorError(null, null, 'found unconstructable recursive node', node.start_mark);
        }
        this.constructing_nodes.push(node.unique_id);
        constructor = null;
        tag_suffix = null;
        if (node.tag in this.yaml_constructors) {
          constructor = this.yaml_constructors[node.tag];
        } else {
          for (tag_prefix in this.yaml_multi_constructors) {
            if (node.tag.indexOf(tag_prefix === 0)) {
              tag_suffix = node.tag.slice(tag_prefix.length);
              constructor = this.yaml_multi_constructors[tag_prefix];
              break;
            }
          }
          if (constructor == null) {
            if (null in this.yaml_multi_constructors) {
              tag_suffix = node.tag;
              constructor = this.yaml_multi_constructors[null];
            } else if (null in this.yaml_constructors) {
              constructor = this.yaml_constructors[null];
            } else if (node instanceof nodes.ScalarNode) {
              constructor = this.construct_scalar;
            } else if (node instanceof nodes.SequenceNode) {
              constructor = this.construct_sequence;
            } else if (node instanceof nodes.MappingNode) {
              constructor = this.construct_mapping;
            }
          }
        }
        object = constructor.call(this, tag_suffix != null ? tag_suffix : node, node);
        this.constructed_objects[node.unique_id] = object;
        this.constructing_nodes.pop();
        return object;
      }

      construct_scalar(node) {
        if (!(node instanceof nodes.ScalarNode)) {
          throw new exports.ConstructorError(null, null, `expected a scalar node but found ${node.id}`, node.start_mark);
        }
        return node.value;
      }

      construct_sequence(node) {
        var child, i, len, ref, results;
        if (!(node instanceof nodes.SequenceNode)) {
          throw new exports.ConstructorError(null, null, `expected a sequence node but found ${node.id}`, node.start_mark);
        }
        ref = node.value;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          results.push(this.construct_object(child));
        }
        return results;
      }

      construct_mapping(node) {
        var i, key, key_node, len, mapping, ref, value, value_node;
        if (!(node instanceof nodes.MappingNode)) {
          throw new ConstructorError(null, null, `expected a mapping node but found ${node.id}`, node.start_mark);
        }
        mapping = {};
        ref = node.value;
        for (i = 0, len = ref.length; i < len; i++) {
          [key_node, value_node] = ref[i];
          key = this.construct_object(key_node);
          if (typeof key === 'object') {
            throw new exports.ConstructorError('while constructing a mapping', node.start_mark, 'found unhashable key', key_node.start_mark);
          }
          value = this.construct_object(value_node);
          mapping[key] = value;
        }
        return mapping;
      }

      construct_pairs(node) {
        var i, key, key_node, len, pairs, ref, value, value_node;
        if (!(node instanceof nodes.MappingNode)) {
          throw new exports.ConstructorError(null, null, `expected a mapping node but found ${node.id}`, node.start_mark);
        }
        pairs = [];
        ref = node.value;
        for (i = 0, len = ref.length; i < len; i++) {
          [key_node, value_node] = ref[i];
          key = this.construct_object(key_node);
          value = this.construct_object(value_node);
          pairs.push([key, value]);
        }
        return pairs;
      }

    };

    /*
    @property {Object} A map from a YAML tag to a constructor function for data with that tag.
    @private
    */
    BaseConstructor.prototype.yaml_constructors = {};

    /*
    @property {Object} A map from a YAML tag prefix to a constructor function for data with that tag
                       prefix.
    @private
    */
    BaseConstructor.prototype.yaml_multi_constructors = {};

    ctor = BaseConstructor.prototype.initialise;

    return BaseConstructor;

  }).call(this);

  this.Constructor = (function() {
    var BOOL_VALUES, TIMESTAMP_PARTS, TIMESTAMP_REGEX;

    class Constructor extends this.BaseConstructor {
      construct_scalar(node) {
        var i, key_node, len, ref, value_node;
        if (node instanceof nodes.MappingNode) {
          ref = node.value;
          for (i = 0, len = ref.length; i < len; i++) {
            [key_node, value_node] = ref[i];
            if (key_node.tag === 'tag:yaml.org,2002:value') {
              return this.construct_scalar(value_node);
            }
          }
        }
        return super.construct_scalar(node);
      }

      flatten_mapping(node) {
        var i, index, j, key_node, len, len1, merge, ref, submerge, subnode, value, value_node;
        merge = [];
        index = 0;
        while (index < node.value.length) {
          [key_node, value_node] = node.value[index];
          if (key_node.tag === 'tag:yaml.org,2002:merge') {
            node.value.splice(index, 1);
            //delete node.value[index]
            if (value_node instanceof nodes.MappingNode) {
              this.flatten_mapping(value_node);
              merge = merge.concat(value_node.value);
            } else if (value_node instanceof nodes.SequenceNode) {
              submerge = [];
              ref = value_node.value;
              for (i = 0, len = ref.length; i < len; i++) {
                subnode = ref[i];
                if (!(subnode instanceof nodes.MappingNode)) {
                  throw new exports.ConstructorError('while constructing a mapping', node.start_mark, `expected a mapping for merging, but found ${subnode.id}`, subnode.start_mark);
                }
                this.flatten_mapping(subnode);
                submerge.push(subnode.value);
              }
              submerge.reverse();
              for (j = 0, len1 = submerge.length; j < len1; j++) {
                value = submerge[j];
                merge = merge.concat(value);
              }
            } else {
              throw new exports.ConstructorError('while constructing a mapping', node.start_mark, `expected a mapping or list of mappings for merging but found ${value_node.id}`, value_node.start_mark);
            }
          } else if (key_node.tag === 'tag:yaml.org,2002:value') {
            key_node.tag = 'tag:yaml.org,2002:str';
            index++;
          } else {
            index++;
          }
        }
        if (merge.length) {
          return node.value = merge.concat(node.value);
        }
      }

      construct_mapping(node) {
        if (node instanceof nodes.MappingNode) {
          this.flatten_mapping(node);
        }
        return super.construct_mapping(node);
      }

      construct_yaml_null(node) {
        this.construct_scalar(node);
        return null;
      }

      construct_yaml_bool(node) {
        var value;
        value = this.construct_scalar(node);
        return BOOL_VALUES[value.toLowerCase()];
      }

      construct_yaml_int(node) {
        var base, digit, digits, i, len, part, ref, sign, value;
        value = this.construct_scalar(node);
        value = value.replace(/_/g, '');
        sign = value[0] === '-' ? -1 : 1;
        if (ref = value[0], indexOf.call('+-', ref) >= 0) {
          value = value.slice(1);
        }
        if (value === '0') {
          return 0;
        } else if (value.indexOf('0b') === 0) {
          return sign * parseInt(value.slice(2), 2);
        } else if (value.indexOf('0x') === 0) {
          return sign * parseInt(value.slice(2), 16);
        } else if (value.indexOf('0o') === 0) {
          return sign * parseInt(value.slice(2), 8);
        } else if (value[0] === '0') {
          return sign * parseInt(value, 8);
        } else if (indexOf.call(value, ':') >= 0) {
          digits = (function() {
            var i, len, ref1, results;
            ref1 = value.split(/:/g);
            results = [];
            for (i = 0, len = ref1.length; i < len; i++) {
              part = ref1[i];
              results.push(parseInt(part));
            }
            return results;
          })();
          digits.reverse();
          base = 1;
          value = 0;
          for (i = 0, len = digits.length; i < len; i++) {
            digit = digits[i];
            value += digit * base;
            base *= 60;
          }
          return sign * value;
        } else {
          return sign * parseInt(value);
        }
      }

      construct_yaml_float(node) {
        var base, digit, digits, i, len, part, ref, sign, value;
        value = this.construct_scalar(node);
        value = value.replace(/_/g, '').toLowerCase();
        sign = value[0] === '-' ? -1 : 1;
        if (ref = value[0], indexOf.call('+-', ref) >= 0) {
          value = value.slice(1);
        }
        if (value === '.inf') {
          return sign * 2e308;
        } else if (value === '.nan') {
          return 0/0;
        } else if (indexOf.call(value, ':') >= 0) {
          digits = (function() {
            var i, len, ref1, results;
            ref1 = value.split(/:/g);
            results = [];
            for (i = 0, len = ref1.length; i < len; i++) {
              part = ref1[i];
              results.push(parseFloat(part));
            }
            return results;
          })();
          digits.reverse();
          base = 1;
          value = 0.0;
          for (i = 0, len = digits.length; i < len; i++) {
            digit = digits[i];
            value += digit * base;
            base *= 60;
          }
          return sign * value;
        } else {
          return sign * parseFloat(value);
        }
      }

      construct_yaml_binary(node) {
        var error, value;
        value = this.construct_scalar(node);
        try {
          if (typeof window !== "undefined" && window !== null) {
            return atob(value);
          }
          return new Buffer(value, 'base64').toString('ascii');
        } catch (error1) {
          error = error1;
          throw new exports.ConstructorError(null, null, `failed to decode base64 data: ${error}`, node.start_mark);
        }
      }

      construct_yaml_timestamp(node) {
        var date, day, fraction, hour, index, key, match, millisecond, minute, month, second, tz_hour, tz_minute, tz_sign, value, values, year;
        value = this.construct_scalar(node);
        match = node.value.match(TIMESTAMP_REGEX);
        values = {};
        for (key in TIMESTAMP_PARTS) {
          index = TIMESTAMP_PARTS[key];
          values[key] = match[index];
        }
        year = parseInt(values.year);
        month = parseInt(values.month) - 1;
        day = parseInt(values.day);
        if (!values.hour) {
          return new Date(Date.UTC(year, month, day));
        }
        hour = parseInt(values.hour);
        minute = parseInt(values.minute);
        second = parseInt(values.second);
        millisecond = 0;
        if (values.fraction) {
          fraction = values.fraction.slice(0, 6);
          while (fraction.length < 6) {
            fraction += '0';
          }
          fraction = parseInt(fraction);
          millisecond = Math.round(fraction / 1000);
        }
        if (values.tz_sign) {
          tz_sign = values.tz_sign === '-' ? 1 : -1;
          if (tz_hour = parseInt(values.tz_hour)) {
            hour += tz_sign * tz_hour;
          }
          if (tz_minute = parseInt(values.tz_minute)) {
            minute += tz_sign * tz_minute;
          }
        }
        date = new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));
        return date;
      }

      construct_yaml_pair_list(type, node) {
        var list;
        list = [];
        if (!(node instanceof nodes.SequenceNode)) {
          throw new exports.ConstructorError(`while constructing ${type}`, node.start_mark, `expected a sequence but found ${node.id}`, node.start_mark);
        }
        this.defer(() => {
          var i, key, key_node, len, ref, results, subnode, value, value_node;
          ref = node.value;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subnode = ref[i];
            if (!(subnode instanceof nodes.MappingNode)) {
              throw new exports.ConstructorError(`while constructing ${type}`, node.start_mark, `expected a mapping of length 1 but found ${subnode.id}`, subnode.start_mark);
            }
            if (subnode.value.length !== 1) {
              throw new exports.ConstructorError(`while constructing ${type}`, node.start_mark, `expected a mapping of length 1 but found ${subnode.id}`, subnode.start_mark);
            }
            [key_node, value_node] = subnode.value[0];
            key = this.construct_object(key_node);
            value = this.construct_object(value_node);
            results.push(list.push([key, value]));
          }
          return results;
        });
        return list;
      }

      construct_yaml_omap(node) {
        return this.construct_yaml_pair_list('an ordered map', node);
      }

      construct_yaml_pairs(node) {
        return this.construct_yaml_pair_list('pairs', node);
      }

      construct_yaml_set(node) {
        var data;
        data = [];
        this.defer(() => {
          var item, results;
          results = [];
          for (item in this.construct_mapping(node)) {
            results.push(data.push(item));
          }
          return results;
        });
        return data;
      }

      construct_yaml_str(node) {
        return this.construct_scalar(node);
      }

      construct_yaml_seq(node) {
        var data;
        data = [];
        this.defer(() => {
          var i, item, len, ref, results;
          ref = this.construct_sequence(node);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            item = ref[i];
            results.push(data.push(item));
          }
          return results;
        });
        return data;
      }

      construct_yaml_map(node) {
        var data;
        data = {};
        this.defer(() => {
          var key, ref, results, value;
          ref = this.construct_mapping(node);
          results = [];
          for (key in ref) {
            value = ref[key];
            results.push(data[key] = value);
          }
          return results;
        });
        return data;
      }

      construct_yaml_object(node, klass) {
        var data;
        data = new klass;
        this.defer(() => {
          var key, ref, results, value;
          ref = this.construct_mapping(node, true);
          results = [];
          for (key in ref) {
            value = ref[key];
            results.push(data[key] = value);
          }
          return results;
        });
        return data;
      }

      construct_undefined(node) {
        throw new exports.ConstructorError(null, null, `could not determine a constructor for the tag ${node.tag}`, node.start_mark);
      }

    };

    BOOL_VALUES = {
      on: true,
      off: false,
      true: true,
      false: false,
      yes: true,
      no: false
    };

    TIMESTAMP_REGEX = /^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:(?:[Tt]|[\x20\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\.([0-9]*))?(?:[\x20\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?)?$/; //  1: year
    //  2: month
    //  3: day
    //  4: hour
    //  5: minute
    //  6: second
    //  7: fraction
    //  9: tz_sign
    // 10: tz_hour
    // 11: tz_minute
    //  8: tz

    TIMESTAMP_PARTS = {
      year: 1,
      month: 2,
      day: 3,
      hour: 4,
      minute: 5,
      second: 6,
      fraction: 7,
      tz: 8,
      tz_sign: 9,
      tz_hour: 10,
      tz_minute: 11
    };

    return Constructor;

  }).call(this);

  this.Constructor.add_constructor('tag:yaml.org,2002:null', this.Constructor.prototype.construct_yaml_null);

  this.Constructor.add_constructor('tag:yaml.org,2002:bool', this.Constructor.prototype.construct_yaml_bool);

  this.Constructor.add_constructor('tag:yaml.org,2002:int', this.Constructor.prototype.construct_yaml_int);

  this.Constructor.add_constructor('tag:yaml.org,2002:float', this.Constructor.prototype.construct_yaml_float);

  this.Constructor.add_constructor('tag:yaml.org,2002:binary', this.Constructor.prototype.construct_yaml_binary);

  this.Constructor.add_constructor('tag:yaml.org,2002:timestamp', this.Constructor.prototype.construct_yaml_timestamp);

  this.Constructor.add_constructor('tag:yaml.org,2002:omap', this.Constructor.prototype.construct_yaml_omap);

  this.Constructor.add_constructor('tag:yaml.org,2002:pairs', this.Constructor.prototype.construct_yaml_pairs);

  this.Constructor.add_constructor('tag:yaml.org,2002:set', this.Constructor.prototype.construct_yaml_set);

  this.Constructor.add_constructor('tag:yaml.org,2002:str', this.Constructor.prototype.construct_yaml_str);

  this.Constructor.add_constructor('tag:yaml.org,2002:seq', this.Constructor.prototype.construct_yaml_seq);

  this.Constructor.add_constructor('tag:yaml.org,2002:map', this.Constructor.prototype.construct_yaml_map);

  this.Constructor.add_constructor(null, this.Constructor.prototype.construct_undefined);

}).call(this);


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  /*
  A small class to stand-in for a stream when you simply want to write to a string.
  */
  var ref, ref1, ref2,
    hasProp = {}.hasOwnProperty;

  this.StringStream = class StringStream {
    constructor() {
      this.string = '';
    }

    write(chunk) {
      return this.string += chunk;
    }

  };

  this.clone = (obj) => {
    return Object.assign({}, obj);
  };

  this.extend = function(destination, ...sources) {
    var i, j, len, len1, name, ref, source;
    for (i = 0, len = sources.length; i < len; i++) {
      source = sources[i];
      while (source !== Object.prototype) {
        ref = Object.getOwnPropertyNames(source);
        for (j = 0, len1 = ref.length; j < len1; j++) {
          name = ref[j];
          if (destination[name] == null) {
            destination[name] = source[name];
          }
        }
        source = Object.getPrototypeOf(source);
      }
    }
    return destination;
  };

  this.is_empty = function(obj) {
    var key;
    if (Array.isArray(obj) || typeof obj === 'string') {
      return obj.length === 0;
    }
    for (key in obj) {
      if (!hasProp.call(obj, key)) continue;
      return false;
    }
    return true;
  };

  this.inspect = (ref = (ref1 = (ref2 = __webpack_require__(7)) != null ? ref2.inspect : void 0) != null ? ref1 : global.inspect) != null ? ref : function(a) {
    return `${a}`;
  };

  this.pad_left = function(str, char, length) {
    str = String(str);
    if (str.length >= length) {
      return str;
    } else if (str.length + 1 === length) {
      return `${char}${str}`;
    } else {
      return `${new Array(length - str.length + 1).join(char)}${str}`;
    }
  };

  this.to_hex = function(num) {
    if (typeof num === 'string') {
      num = num.charCodeAt(0);
    }
    return num.toString(16);
  };

}).call(this);


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var emitter, representer, resolver, serializer, util;

  util = __webpack_require__(36);

  emitter = __webpack_require__(38);

  serializer = __webpack_require__(39);

  representer = __webpack_require__(40);

  resolver = __webpack_require__(41);

  this.make_dumper = function(Emitter = emitter.Emitter, Serializer = serializer.Serializer, Representer = representer.Representer, Resolver = resolver.Resolver) {
    var Dumper, components;
    components = [Emitter, Serializer, Representer, Resolver];
    return Dumper = (function() {
      var component;

      class Dumper {
        constructor(stream, options = {}) {
          var i, len, ref;
          components[0].prototype.initialise.call(this, stream, options);
          ref = components.slice(1);
          for (i = 0, len = ref.length; i < len; i++) {
            component = ref[i];
            component.prototype.initialise.call(this, options);
          }
        }

      };

      util.extend(Dumper.prototype, ...((function() {
        var i, len, results;
        results = [];
        for (i = 0, len = components.length; i < len; i++) {
          component = components[i];
          results.push(component.prototype);
        }
        return results;
      })()));

      return Dumper;

    }).call(this);
  };

  this.Dumper = this.make_dumper();

}).call(this);


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var ScalarAnalysis, YAMLError, events, util,
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf;

  events = __webpack_require__(32);

  util = __webpack_require__(36);

  ({YAMLError} = __webpack_require__(33));

  this.EmitterError = class EmitterError extends YAMLError {};

  /*
  Emitter expects events obeying the following grammar:

  stream   ::= STREAM-START document* STREAM-END
  document ::= DOCUMENT-START node DOCUMENT-END
  node     ::= SCALA | sequence | mapping
  sequence ::= SEQUENCE-START node* SEQUENCE-END
  mapping  ::= MAPPING-START (node node)* MAPPING-END
  */
  this.Emitter = (function() {
    var C_WHITESPACE, DEFAULT_TAG_PREFIXES, ESCAPE_REPLACEMENTS, ctor;

    class Emitter {
      constructor() {
        return ctor.apply(this, arguments);
      }

      initialise(stream, options) {
        var ref;
        this.stream = stream;
        // Encoding can be overriden by STREAM-START
        this.encoding = null;
        // Emitter is a state machine with a stack of states to handle nested structures.
        this.states = [];
        this.state = this.expect_stream_start;
        // Current event and the event queue
        this.events = [];
        this.event = null;
        // The current indentation level and the stack of previous indents.
        this.indents = [];
        this.indent = null;
        // Flow level.
        this.flow_level = 0;
        // Contexts.
        this.root_context = false;
        this.sequence_context = false;
        this.mapping_context = false;
        this.simple_key_context = false;
        // Characteristics of the last emitted character:
        // - current position.
        // - is it a whitespace?
        // - is it an indentation character (indentation space, '-', '?', or ':')?
        this.line = 0;
        this.column = 0;
        this.whitespace = true;
        this.indentation = true;
        // Whether the document requires an explicit document indicator.
        this.open_ended = false;
        // Formatting details
        ({canonical: this.canonical, allow_unicode: this.allow_unicode} = options);
        if (this.canonical == null) {
          this.canonical = false;
        }
        if (this.allow_unicode == null) {
          this.allow_unicode = true;
        }
        this.best_indent = 1 < options.indent && options.indent < 10 ? options.indent : 2;
        this.best_width = options.width > this.indent * 2 ? options.width : 80;
        this.best_line_break = (ref = options.line_break) === '\r' || ref === '\n' || ref === '\r\n' ? options.line_break : '\n';
        // Tag prefixes.
        this.tag_prefixes = null;
        // Prepared anchor and tag
        this.prepared_anchor = null;
        this.prepared_tag = null;
        // Scalar analysis and style.
        this.analysis = null;
        return this.style = null;
      }

      /*
      Reset the state attributes (to clear self-references)
      */
      dispose() {
        this.states = [];
        return this.state = null;
      }

      emit(event) {
        var results;
        this.events.push(event);
        results = [];
        while (!this.need_more_events()) {
          this.event = this.events.shift();
          this.state();
          results.push(this.event = null);
        }
        return results;
      }

      /*
      In some cases, we wait for a few next events before emitting.
      */
      need_more_events() {
        var event;
        if (this.events.length === 0) {
          return true;
        }
        event = this.events[0];
        if (event instanceof events.DocumentStartEvent) {
          return this.need_events(1);
        } else if (event instanceof events.SequenceStartEvent) {
          return this.need_events(2);
        } else if (event instanceof events.MappingStartEvent) {
          return this.need_events(3);
        } else {
          return false;
        }
      }

      need_events(count) {
        var event, i, len, level, ref;
        level = 0;
        ref = this.events.slice(1);
        for (i = 0, len = ref.length; i < len; i++) {
          event = ref[i];
          if (event instanceof events.DocumentStartEvent || event instanceof events.CollectionStartEvent) {
            level++;
          } else if (event instanceof events.DocumentEndEvent || event instanceof events.CollectionEndEvent) {
            level--;
          } else if (event instanceof events.StreamEndEvent) {
            level = -1;
          }
          if (level < 0) {
            return false;
          }
        }
        return this.events.length < count + 1;
      }

      increase_indent(options = {}) {
        this.indents.push(this.indent);
        if (this.indent == null) {
          return this.indent = options.flow ? this.best_indent : 0;
        } else if (!options.indentless) {
          return this.indent += this.best_indent;
        }
      }

      // Stream states
      expect_stream_start() {
        if (this.event instanceof events.StreamStartEvent) {
          if (this.event.encoding && !('encoding' in this.stream)) {
            this.encoding = this.event.encoding;
          }
          this.write_stream_start();
          return this.state = this.expect_first_document_start;
        } else {
          return this.error('expected StreamStartEvent, but got', this.event);
        }
      }

      expect_nothing() {
        return this.error('expected nothing, but got', this.event);
      }

      // Document states
      expect_first_document_start() {
        return this.expect_document_start(true);
      }

      expect_document_start(first = false) {
        var explicit, handle, i, k, len, prefix, ref;
        if (this.event instanceof events.DocumentStartEvent) {
          if ((this.event.version || this.event.tags) && this.open_ended) {
            this.write_indicator('...', true);
            this.write_indent();
          }
          if (this.event.version) {
            this.write_version_directive(this.prepare_version(this.event.version));
          }
          this.tag_prefixes = util.clone(DEFAULT_TAG_PREFIXES);
          if (this.event.tags) {
            ref = ((function() {
              var ref, results;
              ref = this.event.tags;
              results = [];
              for (k in ref) {
                if (!hasProp.call(ref, k)) continue;
                results.push(k);
              }
              return results;
            }).call(this)).sort();
            for (i = 0, len = ref.length; i < len; i++) {
              handle = ref[i];
              prefix = this.event.tags[handle];
              this.tag_prefixes[prefix] = handle;
              this.write_tag_directive(this.prepare_tag_handle(handle), this.prepare_tag_prefix(prefix));
            }
          }
          explicit = !first || this.event.explicit || this.canonical || this.event.version || this.event.tags || this.check_empty_document();
          if (explicit) {
            this.write_indent();
            this.write_indicator('---', true);
            if (this.canonical) {
              this.write_indent();
            }
          }
          return this.state = this.expect_document_root;
        } else if (this.event instanceof events.StreamEndEvent) {
          if (this.open_ended) {
            this.write_indicator('...', true);
            this.write_indent();
          }
          this.write_stream_end();
          return this.state = this.expect_nothing;
        } else {
          return this.error('expected DocumentStartEvent, but got', this.event);
        }
      }

      expect_document_end() {
        if (this.event instanceof events.DocumentEndEvent) {
          this.write_indent();
          if (this.event.explicit) {
            this.write_indicator('...', true);
            this.write_indent();
          }
          this.flush_stream();
          return this.state = this.expect_document_start;
        } else {
          return this.error('expected DocumentEndEvent, but got', this.event);
        }
      }

      expect_document_root() {
        this.states.push(this.expect_document_end);
        return this.expect_node({
          root: true
        });
      }

      // Node states
      expect_node(expect = {}) {
        this.root_context = !!expect.root;
        this.sequence_context = !!expect.sequence;
        this.mapping_context = !!expect.mapping;
        this.simple_key_context = !!expect.simple_key;
        if (this.event instanceof events.AliasEvent) {
          return this.expect_alias();
        } else if (this.event instanceof events.ScalarEvent || this.event instanceof events.CollectionStartEvent) {
          this.process_anchor('&');
          this.process_tag();
          if (this.event instanceof events.ScalarEvent) {
            return this.expect_scalar();
          } else if (this.event instanceof events.SequenceStartEvent) {
            if (this.flow_level || this.canonical || this.event.flow_style || this.check_empty_sequence()) {
              return this.expect_flow_sequence();
            } else {
              return this.expect_block_sequence();
            }
          } else if (this.event instanceof events.MappingStartEvent) {
            if (this.flow_level || this.canonical || this.event.flow_style || this.check_empty_mapping()) {
              return this.expect_flow_mapping();
            } else {
              return this.expect_block_mapping();
            }
          }
        } else {
          return this.error('expected NodeEvent, but got', this.event);
        }
      }

      expect_alias() {
        if (!this.event.anchor) {
          this.error('anchor is not specified for alias');
        }
        this.process_anchor('*');
        return this.state = this.states.pop();
      }

      expect_scalar() {
        this.increase_indent({
          flow: true
        });
        this.process_scalar();
        this.indent = this.indents.pop();
        return this.state = this.states.pop();
      }

      // Flow sequence states
      expect_flow_sequence() {
        this.write_indicator('[', true, {
          whitespace: true
        });
        this.flow_level++;
        this.increase_indent({
          flow: true
        });
        return this.state = this.expect_first_flow_sequence_item;
      }

      expect_first_flow_sequence_item() {
        if (this.event instanceof events.SequenceEndEvent) {
          this.indent = this.indents.pop();
          this.flow_level--;
          this.write_indicator(']', false);
          return this.state = this.states.pop();
        } else {
          if (this.canonical || this.column > this.best_width) {
            this.write_indent();
          }
          this.states.push(this.expect_flow_sequence_item);
          return this.expect_node({
            sequence: true
          });
        }
      }

      expect_flow_sequence_item() {
        if (this.event instanceof events.SequenceEndEvent) {
          this.indent = this.indents.pop();
          this.flow_level--;
          if (this.canonical) {
            this.write_indicator(',', false);
            this.write_indent();
          }
          this.write_indicator(']', false);
          return this.state = this.states.pop();
        } else {
          this.write_indicator(',', false);
          if (this.canonical || this.column > this.best_width) {
            this.write_indent();
          }
          this.states.push(this.expect_flow_sequence_item);
          return this.expect_node({
            sequence: true
          });
        }
      }

      // Flow mapping states
      expect_flow_mapping() {
        this.write_indicator('{', true, {
          whitespace: true
        });
        this.flow_level++;
        this.increase_indent({
          flow: true
        });
        return this.state = this.expect_first_flow_mapping_key;
      }

      expect_first_flow_mapping_key() {
        if (this.event instanceof events.MappingEndEvent) {
          this.indent = this.indents.pop();
          this.flow_level--;
          this.write_indicator('}', false);
          return this.state = this.states.pop();
        } else {
          if (this.canonical || this.column > this.best_width) {
            this.write_indent();
          }
          if (!this.canonical && this.check_simple_key()) {
            this.states.push(this.expect_flow_mapping_simple_value);
            return this.expect_node({
              mapping: true,
              simple_key: true
            });
          } else {
            this.write_indicator('?', true);
            this.states.push(this.expect_flow_mapping_value);
            return this.expect_node({
              mapping: true
            });
          }
        }
      }

      expect_flow_mapping_key() {
        if (this.event instanceof events.MappingEndEvent) {
          this.indent = this.indents.pop();
          this.flow_level--;
          if (this.canonical) {
            this.write_indicator(',', false);
            this.write_indent();
          }
          this.write_indicator('}', false);
          return this.state = this.states.pop();
        } else {
          this.write_indicator(',', false);
          if (this.canonical || this.column > this.best_width) {
            this.write_indent();
          }
          if (!this.canonical && this.check_simple_key()) {
            this.states.push(this.expect_flow_mapping_simple_value);
            return this.expect_node({
              mapping: true,
              simple_key: true
            });
          } else {
            this.write_indicator('?', true);
            this.states.push(this.expect_flow_mapping_value);
            return this.expect_node({
              mapping: true
            });
          }
        }
      }

      expect_flow_mapping_simple_value() {
        this.write_indicator(':', false);
        this.states.push(this.expect_flow_mapping_key);
        return this.expect_node({
          mapping: true
        });
      }

      expect_flow_mapping_value() {
        if (this.canonical || this.column > this.best_width) {
          this.write_indent();
        }
        this.write_indicator(':', true);
        this.states.push(this.expect_flow_mapping_key);
        return this.expect_node({
          mapping: true
        });
      }

      // Block sequence states
      expect_block_sequence() {
        var indentless;
        indentless = this.mapping_context && !this.indentation;
        this.increase_indent({indentless});
        return this.state = this.expect_first_block_sequence_item;
      }

      expect_first_block_sequence_item() {
        return this.expect_block_sequence_item(true);
      }

      expect_block_sequence_item(first = false) {
        if (!first && this.event instanceof events.SequenceEndEvent) {
          this.indent = this.indents.pop();
          return this.state = this.states.pop();
        } else {
          this.write_indent();
          this.write_indicator('-', true, {
            indentation: true
          });
          this.states.push(this.expect_block_sequence_item);
          return this.expect_node({
            sequence: true
          });
        }
      }

      // Block mapping states
      expect_block_mapping() {
        this.increase_indent();
        return this.state = this.expect_first_block_mapping_key;
      }

      expect_first_block_mapping_key() {
        return this.expect_block_mapping_key(true);
      }

      expect_block_mapping_key(first = false) {
        if (!first && this.event instanceof events.MappingEndEvent) {
          this.indent = this.indents.pop();
          return this.state = this.states.pop();
        } else {
          this.write_indent();
          if (this.check_simple_key()) {
            this.states.push(this.expect_block_mapping_simple_value);
            return this.expect_node({
              mapping: true,
              simple_key: true
            });
          } else {
            this.write_indicator('?', true, {
              indentation: true
            });
            this.states.push(this.expect_block_mapping_value);
            return this.expect_node({
              mapping: true
            });
          }
        }
      }

      expect_block_mapping_simple_value() {
        this.write_indicator(':', false);
        this.states.push(this.expect_block_mapping_key);
        return this.expect_node({
          mapping: true
        });
      }

      expect_block_mapping_value() {
        this.write_indent();
        this.write_indicator(':', true, {
          indentation: true
        });
        this.states.push(this.expect_block_mapping_key);
        return this.expect_node({
          mapping: true
        });
      }

      // Checkers
      check_empty_document() {
        var event;
        if (!(this.event instanceof events.DocumentStartEvent) || this.events.length === 0) {
          return false;
        }
        event = this.events[0];
        return event instanceof events.ScalarEvent && (event.anchor == null) && (event.tag == null) && event.implicit && event.value === '';
      }

      check_empty_sequence() {
        return this.event instanceof events.SequenceStartEvent && this.events[0] instanceof events.SequenceEndEvent;
      }

      check_empty_mapping() {
        return this.event instanceof events.MappingStartEvent && this.events[0] instanceof events.MappingEndEvent;
      }

      check_simple_key() {
        var length;
        length = 0;
        if (this.event instanceof events.NodeEvent && (this.event.anchor != null)) {
          if (this.prepared_anchor == null) {
            this.prepared_anchor = this.prepare_anchor(this.event.anchor);
          }
          length += this.prepared_anchor.length;
        }
        if ((this.event.tag != null) && (this.event instanceof events.ScalarEvent || this.event instanceof events.CollectionStartEvent)) {
          if (this.prepared_tag == null) {
            this.prepared_tag = this.prepare_tag(this.event.tag);
          }
          length += this.prepared_tag.length;
        }
        if (this.event instanceof events.ScalarEvent) {
          if (this.analysis == null) {
            this.analysis = this.analyze_scalar(this.event.value);
          }
          length += this.analysis.scalar.length;
        }
        return length < 128 && (this.event instanceof events.AliasEvent || (this.event instanceof events.ScalarEvent && !this.analysis.empty && !this.analysis.multiline) || this.check_empty_sequence() || this.check_empty_mapping());
      }

      // Anchor, Tag and Scalar processors
      process_anchor(indicator) {
        if (this.event.anchor == null) {
          this.prepared_anchor = null;
          return;
        }
        if (this.prepared_anchor == null) {
          this.prepared_anchor = this.prepare_anchor(this.event.anchor);
        }
        if (this.prepared_anchor) {
          this.write_indicator(`${indicator}${this.prepared_anchor}`, true);
        }
        return this.prepared_anchor = null;
      }

      process_tag() {
        var tag;
        tag = this.event.tag;
        if (this.event instanceof events.ScalarEvent) {
          if (this.style == null) {
            this.style = this.choose_scalar_style();
          }
          if ((!this.canonical || (tag == null)) && ((this.style === '' && this.event.implicit[0]) || (this.style !== '' && this.event.implicit[1]))) {
            this.prepared_tag = null;
            return;
          }
          if (this.event.implicit[0] && (tag == null)) {
            tag = '!';
            this.prepared_tag = null;
          }
        } else if ((!this.canonical || (tag == null)) && this.event.implicit) {
          this.prepared_tag = null;
          return;
        }
        if (tag == null) {
          this.error('tag is not specified');
        }
        if (this.prepared_tag == null) {
          this.prepared_tag = this.prepare_tag(tag);
        }
        this.write_indicator(this.prepared_tag, true);
        return this.prepared_tag = null;
      }

      process_scalar() {
        var split;
        if (this.analysis == null) {
          this.analysis = this.analyze_scalar(this.event.value);
        }
        if (this.style == null) {
          this.style = this.choose_scalar_style();
        }
        split = !this.simple_key_context;
        switch (this.style) {
          case '"':
            this.write_double_quoted(this.analysis.scalar, split);
            break;
          case "'":
            this.write_single_quoted(this.analysis.scalar, split);
            break;
          case '>':
            this.write_folded(this.analysis.scalar);
            break;
          case '|':
            this.write_literal(this.analysis.scalar);
            break;
          default:
            this.write_plain(this.analysis.scalar, split);
        }
        this.analysis = null;
        return this.style = null;
      }

      choose_scalar_style() {
        var ref;
        if (this.analysis == null) {
          this.analysis = this.analyze_scalar(this.event.value);
        }
        if (this.event.style === '"' || this.canonical) {
          return '"';
        }
        if (!this.event.style && this.event.implicit[0] && !(this.simple_key_context && (this.analysis.empty || this.analysis.multiline)) && ((this.flow_level && this.analysis.allow_flow_plain) || (!this.flow_level && this.analysis.allow_block_plain))) {
          return '';
        }
        if (this.event.style && (ref = this.event.style, indexOf.call('|>', ref) >= 0) && !this.flow_level && !this.simple_key_context && this.analysis.allow_block) {
          return this.event.style;
        }
        if ((!this.event.style || this.event.style === "'") && this.analysis.allow_single_quoted && !(this.simple_key_context && this.analysis.multiline)) {
          return "'";
        }
        return '"';
      }

      // Analyzers
      prepare_version([major, minor]) {
        var version;
        version = `${major}.${minor}`;
        if (major === 1) {
          return version;
        } else {
          return this.error('unsupported YAML version', version);
        }
      }

      prepare_tag_handle(handle) {
        var char, i, len, ref;
        if (!handle) {
          this.error('tag handle must not be empty');
        }
        if (handle[0] !== '!' || handle.slice(-1) !== '!') {
          this.error("tag handle must start and end with '!':", handle);
        }
        ref = handle.slice(1, -1);
        for (i = 0, len = ref.length; i < len; i++) {
          char = ref[i];
          if (!(('0' <= char && char <= '9') || ('A' <= char && char <= 'Z') || ('a' <= char && char <= 'z') || indexOf.call('-_', char) >= 0)) {
            this.error(`invalid character '${char}' in the tag handle:`, handle);
          }
        }
        return handle;
      }

      prepare_tag_prefix(prefix) {
        var char, chunks, end, start;
        if (!prefix) {
          this.error('tag prefix must not be empty');
        }
        chunks = [];
        start = 0;
        end = +(prefix[0] === '!');
        while (end < prefix.length) {
          char = prefix[end];
          if (('0' <= char && char <= '9') || ('A' <= char && char <= 'Z') || ('a' <= char && char <= 'z') || indexOf.call('-;/?!:@&=+$,_.~*\'()[]', char) >= 0) {
            end++;
          } else {
            if (start < end) {
              chunks.push(prefix.slice(start, end));
            }
            start = end = end + 1;
            chunks.push(char);
          }
        }
        if (start < end) {
          chunks.push(prefix.slice(start, end));
        }
        return chunks.join('');
      }

      prepare_tag(tag) {
        var char, chunks, end, handle, i, k, len, prefix, ref, start, suffix, suffix_text;
        if (!tag) {
          this.error('tag must not be empty');
        }
        if (tag === '!') {
          return tag;
        }
        handle = null;
        suffix = tag;
        ref = ((function() {
          var ref, results;
          ref = this.tag_prefixes;
          results = [];
          for (k in ref) {
            if (!hasProp.call(ref, k)) continue;
            results.push(k);
          }
          return results;
        }).call(this)).sort();
        for (i = 0, len = ref.length; i < len; i++) {
          prefix = ref[i];
          if (tag.indexOf(prefix) === 0 && (prefix === '!' || prefix.length < tag.length)) {
            handle = this.tag_prefixes[prefix];
            suffix = tag.slice(prefix.length);
          }
        }
        chunks = [];
        start = end = 0;
        while (end < suffix.length) {
          char = suffix[end];
          if (('0' <= char && char <= '9') || ('A' <= char && char <= 'Z') || ('a' <= char && char <= 'z') || indexOf.call('-;/?!:@&=+$,_.~*\'()[]', char) >= 0 || (char === '!' && handle !== '!')) {
            end++;
          } else {
            if (start < end) {
              chunks.push(suffix.slice(start, end));
            }
            start = end = end + 1;
            chunks.push(char);
          }
        }
        if (start < end) {
          chunks.push(suffix.slice(start, end));
        }
        suffix_text = chunks.join('');
        if (handle) {
          return `${handle}${suffix_text}`;
        } else {
          return `!<${suffix_text}>`;
        }
      }

      prepare_anchor(anchor) {
        var char, i, len;
        if (!anchor) {
          this.error('anchor must not be empty');
        }
        for (i = 0, len = anchor.length; i < len; i++) {
          char = anchor[i];
          if (!(('0' <= char && char <= '9') || ('A' <= char && char <= 'Z') || ('a' <= char && char <= 'z') || indexOf.call('-_', char) >= 0)) {
            this.error(`invalid character '${char}' in the anchor:`, anchor);
          }
        }
        return anchor;
      }

      analyze_scalar(scalar) {
        var allow_block, allow_block_plain, allow_double_quoted, allow_flow_plain, allow_single_quoted, block_indicators, break_space, char, flow_indicators, followed_by_whitespace, i, index, leading_break, leading_space, len, line_breaks, preceded_by_whitespace, previous_break, previous_space, ref, ref1, space_break, special_characters, trailing_break, trailing_space, unicode_characters;
        // Empty scalar is a special case.
        if (!scalar) {
          new ScalarAnalysis(scalar, true, false, false, true, true, true, false);
        }
        // Indicators and special characters.
        block_indicators = false;
        flow_indicators = false;
        line_breaks = false;
        special_characters = false;
        unicode_characters = false;
        // Important whitespace combinations
        leading_space = false;
        leading_break = false;
        trailing_space = false;
        trailing_break = false;
        break_space = false;
        space_break = false;
        // Check document indicators.
        if (scalar.indexOf('---') === 0 || scalar.indexOf('...') === 0) {
          block_indicators = true;
          flow_indicators = true;
        }
        // First character or preceded by a whitespace.
        preceded_by_whitespace = true;
        // Last character or followed by a whitespace.
        followed_by_whitespace = scalar.length === 1 || (ref = scalar[1], indexOf.call('\0 \t\r\n\x85\u2028\u2029', ref) >= 0);
        // The previous character is a space.
        previous_space = false;
        // The previous character is a break
        previous_break = false;
        index = 0;
        for (index = i = 0, len = scalar.length; i < len; index = ++i) {
          char = scalar[index];
          // Check for indicators.
          if (index === 0) {
            // Leading indicators are special characters.
            if (indexOf.call('#,[]{}&*!|>\'"%@`', char) >= 0 || (char === '-' && followed_by_whitespace)) {
              flow_indicators = true;
              block_indicators = true;
            } else if (indexOf.call('?:', char) >= 0) {
              flow_indicators = true;
              if (followed_by_whitespace) {
                block_indicators = true;
              }
            }
          } else {
            // Some indicators cannot appear within a scalar as well.
            if (indexOf.call(',?[]{}', char) >= 0) {
              flow_indicators = true;
            } else if (char === ':') {
              flow_indicators = true;
              if (followed_by_whitespace) {
                block_indicators = true;
              }
            } else if (char === '#' && preceded_by_whitespace) {
              flow_indicators = true;
              block_indicators = true;
            }
          }
          // Check for line breaks, special, and unicode characters.
          if (indexOf.call('\n\x85\u2028\u2029', char) >= 0) {
            line_breaks = true;
          }
          if (!(char === '\n' || ('\x20' <= char && char <= '\x7e'))) {
            if (char !== '\uFEFF' && (char === '\x85' || ('\xA0' <= char && char <= '\uD7FF') || ('\uE000' <= char && char <= '\uFFFD'))) {
              unicode_characters = true;
              if (!this.allow_unicode) {
                special_characters = true;
              }
            } else {
              special_characters = true;
            }
          }
          // Detect important whitespace combinations.
          if (char === ' ') {
            if (index === 0) {
              leading_space = true;
            }
            if (index === scalar.length - 1) {
              trailing_space = true;
            }
            if (previous_break) {
              break_space = true;
            }
            previous_break = false;
            previous_space = true;
          } else if (indexOf.call('\n\x85\u2028\u2029', char) >= 0) {
            if (index === 0) {
              leading_break = true;
            }
            if (index === scalar.length - 1) {
              trailing_break = true;
            }
            if (previous_space) {
              space_break = true;
            }
            previous_break = true;
            previous_space = false;
          } else {
            previous_break = false;
            previous_space = false;
          }
          // Prepare for the next character.
          preceded_by_whitespace = indexOf.call(C_WHITESPACE, char) >= 0;
          followed_by_whitespace = index + 2 >= scalar.length || (ref1 = scalar[index + 2], indexOf.call(C_WHITESPACE, ref1) >= 0);
        }
        // Let's decide what styles are allowed.
        allow_flow_plain = true;
        allow_block_plain = true;
        allow_single_quoted = true;
        allow_double_quoted = true;
        allow_block = true;
        // Leading and trailing whitespaces are bad for plain scalars.
        if (leading_space || leading_break || trailing_space || trailing_break) {
          allow_flow_plain = allow_block_plain = false;
        }
        // We do not permit trailing spaces for block scalars.
        if (trailing_space) {
          allow_block = false;
        }
        // Spaces at the beginning of a new line are only acceptable for block scalars.
        if (break_space) {
          allow_flow_plain = allow_block_plain = allow_single_quoted = false;
        }
        // Spaces followed by breaks, as well as special character are only allowed for double quoted
        // scalars.
        if (space_break || special_characters) {
          allow_flow_plain = allow_block_plain = allow_single_quoted = allow_block = false;
        }
        // Although the plain scalar writer supports breaks, we never emit multiline plain scalars.
        if (line_breaks) {
          allow_flow_plain = allow_block_plain = false;
        }
        // Flow indicators are forbidden for flow plain scalars.
        if (flow_indicators) {
          allow_flow_plain = false;
        }
        // Block indicators are forbidden for block plain scalars.
        if (block_indicators) {
          allow_block_plain = false;
        }
        return new ScalarAnalysis(scalar, false, line_breaks, allow_flow_plain, allow_block_plain, allow_single_quoted, allow_double_quoted, allow_block);
      }

      // Writers
      /*
      Write BOM if needed.
      */
      write_stream_start() {
        if (this.encoding && this.encoding.indexOf('utf-16') === 0) {
          return this.stream.write('\uFEFF', this.encoding);
        }
      }

      write_stream_end() {
        return this.flush_stream();
      }

      write_indicator(indicator, need_whitespace, options = {}) {
        var data;
        data = this.whitespace || !need_whitespace ? indicator : ' ' + indicator;
        this.whitespace = !!options.whitespace;
        this.indentation && (this.indentation = !!options.indentation);
        this.column += data.length;
        this.open_ended = false;
        return this.stream.write(data, this.encoding);
      }

      write_indent() {
        var data, indent, ref;
        indent = (ref = this.indent) != null ? ref : 0;
        if (!this.indentation || this.column > indent || (this.column === indent && !this.whitespace)) {
          this.write_line_break();
        }
        if (this.column < indent) {
          this.whitespace = true;
          data = new Array(indent - this.column + 1).join(' ');
          this.column = indent;
          return this.stream.write(data, this.encoding);
        }
      }

      write_line_break(data) {
        this.whitespace = true;
        this.indentation = true;
        this.line += 1;
        this.column = 0;
        return this.stream.write(data != null ? data : this.best_line_break, this.encoding);
      }

      write_version_directive(version_text) {
        this.stream.write(`%YAML ${version_text}`, this.encoding);
        return this.write_line_break();
      }

      write_tag_directive(handle_text, prefix_text) {
        this.stream.write(`%TAG ${handle_text} ${prefix_text}`, this.encoding);
        return this.write_line_break();
      }

      write_single_quoted(text, split = true) {
        var br, breaks, char, data, end, i, len, ref, spaces, start;
        this.write_indicator("'", true);
        spaces = false;
        breaks = false;
        start = end = 0;
        while (end <= text.length) {
          char = text[end];
          if (spaces) {
            if ((char == null) || char !== ' ') {
              if (start + 1 === end && this.column > this.best_width && split && start !== 0 && end !== text.length) {
                this.write_indent();
              } else {
                data = text.slice(start, end);
                this.column += data.length;
                this.stream.write(data, this.encoding);
              }
              start = end;
            }
          } else if (breaks) {
            if ((char == null) || indexOf.call('\n\x85\u2028\u2029', char) < 0) {
              if (text[start] === '\n') {
                this.write_line_break();
              }
              ref = text.slice(start, end);
              for (i = 0, len = ref.length; i < len; i++) {
                br = ref[i];
                if (br === '\n') {
                  this.write_line_break();
                } else {
                  this.write_line_break(br);
                }
              }
              this.write_indent();
              start = end;
            }
          } else if (((char == null) || indexOf.call(' \n\x85\u2028\u2029', char) >= 0 || char === "'") && start < end) {
            data = text.slice(start, end);
            this.column += data.length;
            this.stream.write(data, this.encoding);
            start = end;
          }
          if (char === "'") {
            this.column += 2;
            this.stream.write("''", this.encoding);
            start = end + 1;
          }
          if (char != null) {
            spaces = char === ' ';
            breaks = indexOf.call('\n\x85\u2028\u2029', char) >= 0;
          }
          end++;
        }
        return this.write_indicator("'", false);
      }

      write_double_quoted(text, split = true) {
        var char, data, end, start;
        this.write_indicator('"', true);
        start = end = 0;
        while (end <= text.length) {
          char = text[end];
          if ((char == null) || indexOf.call('"\\\x85\u2028\u2029\uFEFF', char) >= 0 || !(('\x20' <= char && char <= '\x7E') || (this.allow_unicode && (('\xA0' <= char && char <= '\uD7FF') || ('\uE000' <= char && char <= '\uFFFD'))))) {
            if (start < end) {
              data = text.slice(start, end);
              this.column += data.length;
              this.stream.write(data, this.encoding);
              start = end;
            }
            if (char != null) {
              data = char in ESCAPE_REPLACEMENTS ? '\\' + ESCAPE_REPLACEMENTS[char] : char <= '\xFF' ? `\\x${util.pad_left(util.to_hex(char), '0', 2)}` : char <= '\uFFFF' ? `\\u${util.pad_left(util.to_hex(char), '0', 4)}` : `\\U${util.pad_left(util.to_hex(char), '0', 16)}`;
              this.column += data.length;
              this.stream.write(data, this.encoding);
              start = end + 1;
            }
          }
          if (split && (0 < end && end < text.length - 1) && (char === ' ' || start >= end) && this.column + (end - start) > this.best_width) {
            data = `${text.slice(start, end)}\\`;
            if (start < end) {
              start = end;
            }
            this.column += data.length;
            this.stream.write(data, this.encoding);
            this.write_indent();
            this.whitespace = false;
            this.indentation = false;
            if (text[start] === ' ') {
              data = '\\';
              this.column += data.length;
              this.stream.write(data, this.encoding);
            }
          }
          end++;
        }
        return this.write_indicator('"', false);
      }

      write_folded(text) {
        var br, breaks, char, data, end, hints, i, leading_space, len, ref, results, spaces, start;
        hints = this.determine_block_hints(text);
        this.write_indicator(`>${hints}`, true);
        if (hints.slice(-1) === '+') {
          this.open_ended = true;
        }
        this.write_line_break();
        leading_space = true;
        breaks = true;
        spaces = false;
        start = end = 0;
        results = [];
        while (end <= text.length) {
          char = text[end];
          if (breaks) {
            if ((char == null) || indexOf.call('\n\x85\u2028\u2029', char) < 0) {
              if (!leading_space && (char != null) && char !== ' ' && text[start] === '\n') {
                this.write_line_break();
              }
              leading_space = char === ' ';
              ref = text.slice(start, end);
              for (i = 0, len = ref.length; i < len; i++) {
                br = ref[i];
                if (br === '\n') {
                  this.write_line_break();
                } else {
                  this.write_line_break(br);
                }
              }
              if (char != null) {
                this.write_indent();
              }
              start = end;
            }
          } else if (spaces) {
            if (char !== ' ') {
              if (start + 1 === end && this.column > this.best_width) {
                this.write_indent();
              } else {
                data = text.slice(start, end);
                this.column += data.length;
                this.stream.write(data, this.encoding);
              }
              start = end;
            }
          } else if ((char == null) || indexOf.call(' \n\x85\u2028\u2029', char) >= 0) {
            data = text.slice(start, end);
            this.column += data.length;
            this.stream.write(data, this.encoding);
            if (char == null) {
              this.write_line_break();
            }
            start = end;
          }
          if (char != null) {
            breaks = indexOf.call('\n\x85\u2028\u2029', char) >= 0;
            spaces = char === ' ';
          }
          results.push(end++);
        }
        return results;
      }

      write_literal(text) {
        var br, breaks, char, data, end, hints, i, len, ref, results, start;
        hints = this.determine_block_hints(text);
        this.write_indicator(`|${hints}`, true);
        if (hints.slice(-1) === '+') {
          this.open_ended = true;
        }
        this.write_line_break();
        breaks = true;
        start = end = 0;
        results = [];
        while (end <= text.length) {
          char = text[end];
          if (breaks) {
            if ((char == null) || indexOf.call('\n\x85\u2028\u2029', char) < 0) {
              ref = text.slice(start, end);
              for (i = 0, len = ref.length; i < len; i++) {
                br = ref[i];
                if (br === '\n') {
                  this.write_line_break();
                } else {
                  this.write_line_break(br);
                }
              }
              if (char != null) {
                this.write_indent();
              }
              start = end;
            }
          } else {
            if ((char == null) || indexOf.call('\n\x85\u2028\u2029', char) >= 0) {
              data = text.slice(start, end);
              this.stream.write(data, this.encoding);
              if (char == null) {
                this.write_line_break();
              }
              start = end;
            }
          }
          if (char != null) {
            breaks = indexOf.call('\n\x85\u2028\u2029', char) >= 0;
          }
          results.push(end++);
        }
        return results;
      }

      write_plain(text, split = true) {
        var br, breaks, char, data, end, i, len, ref, results, spaces, start;
        if (!text) {
          return;
        }
        if (this.root_context) {
          this.open_ended = true;
        }
        if (!this.whitespace) {
          data = ' ';
          this.column += data.length;
          this.stream.write(data, this.encoding);
        }
        this.whitespace = false;
        this.indentation = false;
        spaces = false;
        breaks = false;
        start = end = 0;
        results = [];
        while (end <= text.length) {
          char = text[end];
          if (spaces) {
            if (char !== ' ') {
              if (start + 1 === end && this.column > this.best_width && split) {
                this.write_indent();
                this.whitespace = false;
                this.indentation = false;
              } else {
                data = text.slice(start, end);
                this.column += data.length;
                this.stream.write(data, this.encoding);
              }
              start = end;
            }
          } else if (breaks) {
            if (indexOf.call('\n\x85\u2028\u2029', char) < 0) {
              if (text[start] === '\n') {
                this.write_line_break();
              }
              ref = text.slice(start, end);
              for (i = 0, len = ref.length; i < len; i++) {
                br = ref[i];
                if (br === '\n') {
                  this.write_line_break();
                } else {
                  this.write_line_break(br);
                }
              }
              this.write_indent();
              this.whitespace = false;
              this.indentation = false;
              start = end;
            }
          } else {
            if ((char == null) || indexOf.call(' \n\x85\u2028\u2029', char) >= 0) {
              data = text.slice(start, end);
              this.column += data.length;
              this.stream.write(data, this.encoding);
              start = end;
            }
          }
          if (char != null) {
            spaces = char === ' ';
            breaks = indexOf.call('\n\x85\u2028\u2029', char) >= 0;
          }
          results.push(end++);
        }
        return results;
      }

      determine_block_hints(text) {
        var first, hints, i, last, penultimate;
        hints = '';
        first = text[0], i = text.length - 2, penultimate = text[i++], last = text[i++];
        if (indexOf.call(' \n\x85\u2028\u2029', first) >= 0) {
          hints += this.best_indent;
        }
        if (indexOf.call('\n\x85\u2028\u2029', last) < 0) {
          hints += '-';
        } else if (text.length === 1 || indexOf.call('\n\x85\u2028\u2029', penultimate) >= 0) {
          hints += '+';
        }
        return hints;
      }

      flush_stream() {
        var base;
        return typeof (base = this.stream).flush === "function" ? base.flush() : void 0;
      }

      /*
      Helper for common error pattern.
      */
      error(message, context) {
        var ref, ref1;
        if (context) {
          context = (ref = context != null ? (ref1 = context.constructor) != null ? ref1.name : void 0 : void 0) != null ? ref : util.inspect(context);
        }
        throw new exports.EmitterError(`${message}${(context ? ` ${context}` : '')}`);
      }

    };

    C_WHITESPACE = '\0 \t\r\n\x85\u2028\u2029';

    DEFAULT_TAG_PREFIXES = {
      '!': '!',
      'tag:yaml.org,2002:': '!!'
    };

    ESCAPE_REPLACEMENTS = {
      '\0': '0',
      '\x07': 'a',
      '\x08': 'b',
      '\x09': 't',
      '\x0A': 'n',
      '\x0B': 'v',
      '\x0C': 'f',
      '\x0D': 'r',
      '\x1B': 'e',
      '"': '"',
      '\\': '\\',
      '\x85': 'N',
      '\xA0': '_',
      '\u2028': 'L',
      '\u2029': 'P'
    };

    ctor = Emitter.prototype.initialise;

    return Emitter;

  }).call(this);

  ScalarAnalysis = class ScalarAnalysis {
    constructor(scalar1, empty, multiline, allow_flow_plain1, allow_block_plain1, allow_single_quoted1, allow_double_quoted1, allow_block1) {
      this.scalar = scalar1;
      this.empty = empty;
      this.multiline = multiline;
      this.allow_flow_plain = allow_flow_plain1;
      this.allow_block_plain = allow_block_plain1;
      this.allow_single_quoted = allow_single_quoted1;
      this.allow_double_quoted = allow_double_quoted1;
      this.allow_block = allow_block1;
    }

  };

}).call(this);


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var YAMLError, events, nodes, util;

  events = __webpack_require__(32);

  nodes = __webpack_require__(34);

  util = __webpack_require__(36);

  ({YAMLError} = __webpack_require__(33));

  this.SerializerError = class SerializerError extends YAMLError {};

  this.Serializer = (function() {
    var ctor;

    class Serializer {
      constructor() {
        return ctor.apply(this, arguments);
      }

      initialise({
          encoding: encoding,
          explicit_start: explicit_start,
          explicit_end: explicit_end,
          version: version,
          tags: tags
        } = {}) {
        this.encoding = encoding;
        this.explicit_start = explicit_start;
        this.explicit_end = explicit_end;
        this.version = version;
        this.tags = tags;
        this.serialized_nodes = {};
        this.anchors = {};
        this.last_anchor_id = 0;
        return this.closed = null;
      }

      open() {
        if (this.closed === null) {
          this.emit(new events.StreamStartEvent(this.encoding));
          return this.closed = false;
        } else if (this.closed) {
          throw new SerializerError('serializer is closed');
        } else {
          throw new SerializerError('serializer is already open');
        }
      }

      close() {
        if (this.closed === null) {
          throw new SerializerError('serializer is not opened');
        } else if (!this.closed) {
          this.emit(new events.StreamEndEvent);
          return this.closed = true;
        }
      }

      serialize(node) {
        if (this.closed === null) {
          throw new SerializerError('serializer is not opened');
        } else if (this.closed) {
          throw new SerializerError('serializer is closed');
        }
        if (node != null) {
          this.emit(new events.DocumentStartEvent(void 0, void 0, this.explicit_start, this.version, this.tags));
          this.anchor_node(node);
          this.serialize_node(node);
          this.emit(new events.DocumentEndEvent(void 0, void 0, this.explicit_end));
        }
        this.serialized_nodes = {};
        this.anchors = {};
        return this.last_anchor_id = 0;
      }

      anchor_node(node) {
        var base, i, item, j, key, len, len1, name, ref, ref1, results, results1, value;
        if (node.unique_id in this.anchors) {
          return (base = this.anchors)[name = node.unique_id] != null ? base[name] : base[name] = this.generate_anchor(node);
        } else {
          this.anchors[node.unique_id] = null;
          if (node instanceof nodes.SequenceNode) {
            ref = node.value;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              item = ref[i];
              results.push(this.anchor_node(item));
            }
            return results;
          } else if (node instanceof nodes.MappingNode) {
            ref1 = node.value;
            results1 = [];
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              [key, value] = ref1[j];
              this.anchor_node(key);
              results1.push(this.anchor_node(value));
            }
            return results1;
          }
        }
      }

      generate_anchor(node) {
        return `id${util.pad_left(++this.last_anchor_id, '0', 4)}`;
      }

      serialize_node(node, parent, index) {
        var alias, default_tag, detected_tag, i, implicit, item, j, key, len, len1, ref, ref1, value;
        alias = this.anchors[node.unique_id];
        if (node.unique_id in this.serialized_nodes) {
          return this.emit(new events.AliasEvent(alias));
        } else {
          this.serialized_nodes[node.unique_id] = true;
          this.descend_resolver(parent, index);
          if (node instanceof nodes.ScalarNode) {
            detected_tag = this.resolve(nodes.ScalarNode, node.value, [true, false]);
            default_tag = this.resolve(nodes.ScalarNode, node.value, [false, true]);
            implicit = [node.tag === detected_tag, node.tag === default_tag];
            this.emit(new events.ScalarEvent(alias, node.tag, implicit, node.value, void 0, void 0, node.style));
          } else if (node instanceof nodes.SequenceNode) {
            implicit = node.tag === this.resolve(nodes.SequenceNode, node.value, true);
            this.emit(new events.SequenceStartEvent(alias, node.tag, implicit, void 0, void 0, node.flow_style));
            ref = node.value;
            for (index = i = 0, len = ref.length; i < len; index = ++i) {
              item = ref[index];
              this.serialize_node(item, node, index);
            }
            this.emit(new events.SequenceEndEvent);
          } else if (node instanceof nodes.MappingNode) {
            implicit = node.tag === this.resolve(nodes.MappingNode, node.value, true);
            this.emit(new events.MappingStartEvent(alias, node.tag, implicit, void 0, void 0, node.flow_style));
            ref1 = node.value;
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              [key, value] = ref1[j];
              this.serialize_node(key, node, null);
              this.serialize_node(value, node, key);
            }
            this.emit(new events.MappingEndEvent);
          }
          return this.ascend_resolver();
        }
      }

    };

    ctor = Serializer.prototype.initialise;

    return Serializer;

  }).call(this);

}).call(this);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var YAMLError, nodes,
    hasProp = {}.hasOwnProperty;

  nodes = __webpack_require__(34);

  ({YAMLError} = __webpack_require__(33));

  this.RepresenterError = class RepresenterError extends YAMLError {};

  this.BaseRepresenter = (function() {
    var ctor;

    class BaseRepresenter {
      constructor() {
        return ctor.apply(this, arguments);
      }

      static add_representer(data_type, handler) {
        if (!this.prototype.hasOwnProperty('yaml_representers_types')) {
          this.prototype.yaml_representers_types = [].concat(this.prototype.yaml_representers_types);
        }
        if (!this.prototype.hasOwnProperty('yaml_representers_handlers')) {
          this.prototype.yaml_representers_handlers = [].concat(this.prototype.yaml_representers_handlers);
        }
        this.prototype.yaml_representers_types.push(data_type);
        return this.prototype.yaml_representers_handlers.push(handler);
      }

      static add_multi_representer(data_type, handler) {
        if (!this.prototype.hasOwnProperty('yaml_multi_representers_types')) {
          this.prototype.yaml_multi_representers_types = [].concat(this.prototype.yaml_multi_representers_types);
        }
        if (!this.prototype.hasOwnProperty('yaml_multi_representers_handlers')) {
          this.prototype.yaml_multi_representers_handlers = [].concat(this.prototype.yaml_multi_representers_handlers);
        }
        this.prototype.yaml_multi_representers_types.push(data_type);
        return this.prototype.yaml_multi_representers_handlers.push(handler);
      }

      initialise({
          default_style: default_style,
          default_flow_style: default_flow_style
        } = {}) {
        this.default_style = default_style;
        this.default_flow_style = default_flow_style;
        this.represented_objects = {};
        this.object_keeper = [];
        return this.alias_key = null;
      }

      represent(data) {
        var node;
        node = this.represent_data(data);
        this.serialize(node);
        this.represented_objects = {};
        this.object_keeper = [];
        return this.alias_key = null;
      }

      represent_data(data) {
        var data_type, i, j, len, ref, representer, type;
        if (this.ignore_aliases(data)) {
          this.alias_key = null;
        } else if ((i = this.object_keeper.indexOf(data)) !== -1) {
          this.alias_key = i;
          if (this.alias_key in this.represented_objects) {
            return this.represented_objects[this.alias_key];
          }
        } else {
          this.alias_key = this.object_keeper.length;
          this.object_keeper.push(data);
        }
        // Bit fiddly: we look into our non-multi representers using the JS type if `data` is not an
        // object, otherwise we use the object's constructor.  For multi-representers we just use
        // instanceof.  A representer for `undefined` can be called for any type.
        representer = null;
        data_type = data === null ? 'null' : typeof data;
        if (data_type === 'object') {
          data_type = data.constructor;
        }
        if ((i = this.yaml_representers_types.lastIndexOf(data_type)) !== -1) {
          representer = this.yaml_representers_handlers[i];
        }
        if (representer == null) {
          ref = this.yaml_multi_representers_types;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            type = ref[i];
            if (!(data instanceof type)) {
              continue;
            }
            representer = this.yaml_multi_representers_handlers[i];
            break;
          }
        }
        if (representer == null) {
          if ((i = this.yaml_multi_representers_types.lastIndexOf(void 0)) !== -1) {
            representer = this.yaml_multi_representers_handlers[i];
          } else if ((i = this.yaml_representers_types.lastIndexOf(void 0)) !== -1) {
            representer = this.yaml_representers_handlers[i];
          }
        }
        if (representer != null) {
          return representer.call(this, data);
        } else {
          return new nodes.ScalarNode(null, `${data}`);
        }
      }

      represent_scalar(tag, value, style = this.default_style) {
        var node;
        node = new nodes.ScalarNode(tag, value, null, null, style);
        if (this.alias_key != null) {
          this.represented_objects[this.alias_key] = node;
        }
        return node;
      }

      represent_sequence(tag, sequence, flow_style) {
        var best_style, item, j, len, node, node_item, ref, value;
        value = [];
        node = new nodes.SequenceNode(tag, value, null, null, flow_style);
        if (this.alias_key != null) {
          this.represented_objects[this.alias_key] = node;
        }
        best_style = true;
        for (j = 0, len = sequence.length; j < len; j++) {
          item = sequence[j];
          node_item = this.represent_data(item);
          if (!(node_item instanceof nodes.ScalarNode || node_item.style)) {
            best_style = false;
          }
          value.push(node_item);
        }
        if (flow_style == null) {
          node.flow_style = (ref = this.default_flow_style) != null ? ref : best_style;
        }
        return node;
      }

      represent_mapping(tag, mapping, flow_style) {
        var best_style, item_key, item_value, node, node_key, node_value, ref, value;
        value = [];
        node = new nodes.MappingNode(tag, value, flow_style);
        if (this.alias_key) {
          this.represented_objects[this.alias_key] = node;
        }
        best_style = true;
        for (item_key in mapping) {
          if (!hasProp.call(mapping, item_key)) continue;
          item_value = mapping[item_key];
          node_key = this.represent_data(item_key);
          node_value = this.represent_data(item_value);
          if (!(node_key instanceof nodes.ScalarNode || node_key.style)) {
            best_style = false;
          }
          if (!(node_value instanceof nodes.ScalarNode || node_value.style)) {
            best_style = false;
          }
          value.push([node_key, node_value]);
        }
        if (!flow_style) {
          node.flow_style = (ref = this.default_flow_style) != null ? ref : best_style;
        }
        return node;
      }

      ignore_aliases(data) {
        return false;
      }

    };

    BaseRepresenter.prototype.yaml_representers_types = [];

    BaseRepresenter.prototype.yaml_representers_handlers = [];

    BaseRepresenter.prototype.yaml_multi_representers_types = [];

    BaseRepresenter.prototype.yaml_multi_representers_handlers = [];

    ctor = BaseRepresenter.prototype.initialise;

    return BaseRepresenter;

  }).call(this);

  this.Representer = class Representer extends this.BaseRepresenter {
    represent_boolean(data) {
      return this.represent_scalar('tag:yaml.org,2002:bool', (data ? 'true' : 'false'));
    }

    represent_null(data) {
      return this.represent_scalar('tag:yaml.org,2002:null', 'null');
    }

    represent_number(data) {
      var tag, value;
      tag = `tag:yaml.org,2002:${(data % 1 === 0 ? 'int' : 'float')}`;
      value = data !== data ? '.nan' : data === 2e308 ? '.inf' : data === -2e308 ? '-.inf' : data.toString();
      return this.represent_scalar(tag, value);
    }

    represent_string(data) {
      return this.represent_scalar('tag:yaml.org,2002:str', data);
    }

    represent_array(data) {
      return this.represent_sequence('tag:yaml.org,2002:seq', data);
    }

    represent_date(data) {
      return this.represent_scalar('tag:yaml.org,2002:timestamp', data.toISOString());
    }

    represent_object(data) {
      return this.represent_mapping('tag:yaml.org,2002:map', data);
    }

    represent_undefined(data) {
      throw new exports.RepresenterError(`cannot represent an onbject: ${data}`);
    }

    ignore_aliases(data) {
      var ref;
      if (data == null) {
        return true;
      }
      if ((ref = typeof data) === 'boolean' || ref === 'number' || ref === 'string') {
        return true;
      }
      return false;
    }

  };

  this.Representer.add_representer('boolean', this.Representer.prototype.represent_boolean);

  this.Representer.add_representer('null', this.Representer.prototype.represent_null);

  this.Representer.add_representer('number', this.Representer.prototype.represent_number);

  this.Representer.add_representer('string', this.Representer.prototype.represent_string);

  this.Representer.add_representer(Array, this.Representer.prototype.represent_array);

  this.Representer.add_representer(Date, this.Representer.prototype.represent_date);

  this.Representer.add_representer(Object, this.Representer.prototype.represent_object);

  this.Representer.add_representer(null, this.Representer.prototype.represent_undefined);

}).call(this);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var YAMLError, nodes, util,
    indexOf = [].indexOf;

  nodes = __webpack_require__(34);

  util = __webpack_require__(36);

  ({YAMLError} = __webpack_require__(33));

  this.ResolverError = class ResolverError extends YAMLError {};

  this.BaseResolver = (function() {
    var DEFAULT_MAPPING_TAG, DEFAULT_SCALAR_TAG, DEFAULT_SEQUENCE_TAG, ctor;

    class BaseResolver {
      constructor() {
        return ctor.apply(this, arguments);
      }

      static add_implicit_resolver(tag, regexp, first = [null]) {
        var base, char, i, len, results;
        if (!this.prototype.hasOwnProperty('yaml_implicit_resolvers')) {
          this.prototype.yaml_implicit_resolvers = util.extend({}, this.prototype.yaml_implicit_resolvers);
        }
        results = [];
        for (i = 0, len = first.length; i < len; i++) {
          char = first[i];
          results.push(((base = this.prototype.yaml_implicit_resolvers)[char] != null ? base[char] : base[char] = []).push([tag, regexp]));
        }
        return results;
      }

      initialise() {
        this.resolver_exact_paths = [];
        return this.resolver_prefix_paths = [];
      }

      descend_resolver(current_node, current_index) {
        var depth, exact_paths, i, j, kind, len, len1, path, prefix_paths, ref, ref1;
        if (util.is_empty(this.yaml_path_resolvers)) {
          return;
        }
        exact_paths = {};
        prefix_paths = [];
        if (current_node) {
          depth = this.resolver_prefix_paths.length;
          ref = this.resolver_prefix_paths.slice(-1)[0];
          for (i = 0, len = ref.length; i < len; i++) {
            [path, kind] = ref[i];
            if (this.check_resolver_prefix(depth, path, kind, current_node, current_index)) {
              if (path.length > depth) {
                prefix_paths.push([path, kind]);
              } else {
                exact_paths[kind] = this.yaml_path_resolvers[path][kind];
              }
            }
          }
        } else {
          ref1 = this.yaml_path_resolvers;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            [path, kind] = ref1[j];
            if (!path) {
              exact_paths[kind] = this.yaml_path_resolvers[path][kind];
            } else {
              prefix_paths.push([path, kind]);
            }
          }
        }
        this.resolver_exact_paths.push(exact_paths);
        return this.resolver_prefix_paths.push(prefix_paths);
      }

      ascend_resolver() {
        if (util.is_empty(this.yaml_path_resolvers)) {
          return;
        }
        this.resolver_exact_paths.pop();
        return this.resolver_prefix_paths.pop();
      }

      check_resolver_prefix(depth, path, kind, current_node, current_index) {
        var index_check, node_check;
        [node_check, index_check] = path[depth - 1];
        if (typeof node_check === 'string') {
          if (current_node.tag !== node_check) {
            return;
          }
        } else if (node_check !== null) {
          if (!(current_node instanceof node_check)) {
            return;
          }
        }
        if (index_check === true && current_index !== null) {
          return;
        }
        if ((index_check === false || index_check === null) && current_index === null) {
          return;
        }
        if (typeof index_check === 'string') {
          if (!(current_index instanceof nodes.ScalarNode) && index_check === current_index.value) {
            return;
          }
        } else if (typeof index_check === 'number') {
          if (index_check !== current_index) {
            return;
          }
        }
        return true;
      }

      resolve(kind, value, implicit) {
        var empty, exact_paths, i, k, len, ref, ref1, ref2, regexp, resolvers, tag;
        if (kind === nodes.ScalarNode && implicit[0]) {
          if (value === '') {
            resolvers = (ref = this.yaml_implicit_resolvers['']) != null ? ref : [];
          } else {
            resolvers = (ref1 = this.yaml_implicit_resolvers[value[0]]) != null ? ref1 : [];
          }
          resolvers = resolvers.concat((ref2 = this.yaml_implicit_resolvers[null]) != null ? ref2 : []);
          for (i = 0, len = resolvers.length; i < len; i++) {
            [tag, regexp] = resolvers[i];
            if (value.match(regexp)) {
              return tag;
            }
          }
          implicit = implicit[1];
        }
        empty = true;
        for (k in this.yaml_path_resolvers) {
          if ({}[k] == null) {
            empty = false;
          }
        }
        if (!empty) {
          exact_paths = this.resolver_exact_paths.slice(-1)[0];
          if (indexOf.call(exact_paths, kind) >= 0) {
            return exact_paths[kind];
          }
          if (indexOf.call(exact_paths, null) >= 0) {
            return exact_paths[null];
          }
        }
        if (kind === nodes.ScalarNode) {
          return DEFAULT_SCALAR_TAG;
        }
        if (kind === nodes.SequenceNode) {
          return DEFAULT_SEQUENCE_TAG;
        }
        if (kind === nodes.MappingNode) {
          return DEFAULT_MAPPING_TAG;
        }
      }

    };

    DEFAULT_SCALAR_TAG = 'tag:yaml.org,2002:str';

    DEFAULT_SEQUENCE_TAG = 'tag:yaml.org,2002:seq';

    DEFAULT_MAPPING_TAG = 'tag:yaml.org,2002:map';

    BaseResolver.prototype.yaml_implicit_resolvers = {};

    BaseResolver.prototype.yaml_path_resolvers = {};

    ctor = BaseResolver.prototype.initialise;

    return BaseResolver;

  }).call(this);

  this.Resolver = class Resolver extends this.BaseResolver {};

  this.Resolver.add_implicit_resolver('tag:yaml.org,2002:bool', /^(?:yes|Yes|YES|true|True|TRUE|on|On|ON|no|No|NO|false|False|FALSE|off|Off|OFF)$/, 'yYnNtTfFoO');

  this.Resolver.add_implicit_resolver('tag:yaml.org,2002:float', /^(?:[-+]?(?:[0-9][0-9_]*)\.[0-9_]*(?:[eE][-+][0-9]+)?|\.[0-9_]+(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*|[-+]?\.(?:inf|Inf|INF)|\.(?:nan|NaN|NAN))$/, '-+0123456789.');

  this.Resolver.add_implicit_resolver('tag:yaml.org,2002:int', /^(?:[-+]?0b[01_]+|[-+]?0[0-7_]+|[-+]?(?:0|[1-9][0-9_]*)|[-+]?0x[0-9a-fA-F_]+|[-+]?0o[0-7_]+|[-+]?[1-9][0-9_]*(?::[0-5]?[0-9])+)$/, '-+0123456789');

  this.Resolver.add_implicit_resolver('tag:yaml.org,2002:merge', /^(?:<<)$/, '<');

  this.Resolver.add_implicit_resolver('tag:yaml.org,2002:null', /^(?:~|null|Null|NULL|)$/, ['~', 'n', 'N', '']);

  this.Resolver.add_implicit_resolver('tag:yaml.org,2002:timestamp', /^(?:[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]|[0-9][0-9][0-9][0-9]-[0-9][0-9]?-[0-9][0-9]?(?:[Tt]|[\x20\t]+)[0-9][0-9]?:[0-9][0-9]:[0-9][0-9](?:\.[0-9]*)?(?:[\x20\t]*(?:Z|[-+][0-9][0-9]?(?::[0-9][0-9])?))?)$/, '0123456789');

  this.Resolver.add_implicit_resolver('tag:yaml.org,2002:value', /^(?:=)$/, '=');

  // The following resolver is only for documentation purposes.  It cannot work
  // because plain scalars cannot start with '!', '&' or '*'.
  this.Resolver.add_implicit_resolver('tag:yaml.org,2002:yaml', /^(?:!|&|\*)$/, '!&*');

}).call(this);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var composer, constructor, parser, reader, resolver, scanner, util;

  util = __webpack_require__(36);

  reader = __webpack_require__(43);

  scanner = __webpack_require__(44);

  parser = __webpack_require__(46);

  composer = __webpack_require__(31);

  resolver = __webpack_require__(41);

  constructor = __webpack_require__(35);

  this.make_loader = function(Reader = reader.Reader, Scanner = scanner.Scanner, Parser = parser.Parser, Composer = composer.Composer, Resolver = resolver.Resolver, Constructor = constructor.Constructor) {
    var Loader, components;
    components = [Reader, Scanner, Parser, Composer, Resolver, Constructor];
    return Loader = (function() {
      var component;

      class Loader {
        constructor(stream) {
          var i, len, ref;
          components[0].prototype.initialise.call(this, stream);
          ref = components.slice(1);
          for (i = 0, len = ref.length; i < len; i++) {
            component = ref[i];
            component.prototype.initialise.call(this);
          }
        }

      };

      util.extend(Loader.prototype, ...((function() {
        var i, len, results;
        results = [];
        for (i = 0, len = components.length; i < len; i++) {
          component = components[i];
          results.push(component.prototype);
        }
        return results;
      })()));

      return Loader;

    }).call(this);
  };

  this.Loader = this.make_loader();

}).call(this);


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var Mark, YAMLError,
    indexOf = [].indexOf;

  ({Mark, YAMLError} = __webpack_require__(33));

  this.ReaderError = class ReaderError extends YAMLError {
    constructor(position1, character1, reason) {
      super();
      this.position = position1;
      this.character = character1;
      this.reason = reason;
    }

    toString() {
      return `unacceptable character #${this.character.charCodeAt(0).toString(16)}: ${this.reason}\n  position ${this.position}`;
    }

  };

  /*
  Reader:
    checks if characters are within the allowed range
    add '\x00' to the end
  */
  this.Reader = (function() {
    var NON_PRINTABLE, ctor;

    class Reader {
      constructor() {
        return ctor.apply(this, arguments);
      }

      initialise(string) {
        this.string = string;
        this.line = 0;
        this.column = 0;
        this.index = 0;
        this.check_printable();
        return this.string += '\x00';
      }

      peek(index = 0) {
        return this.string[this.index + index];
      }

      prefix(length = 1) {
        return this.string.slice(this.index, this.index + length);
      }

      forward(length = 1) {
        var char, results;
        results = [];
        while (length) {
          char = this.string[this.index];
          this.index++;
          if (indexOf.call('\n\x85\u2082\u2029', char) >= 0 || (char === '\r' && this.string[this.index] !== '\n')) {
            this.line++;
            this.column = 0;
          } else {
            this.column++;
          }
          results.push(length--);
        }
        return results;
      }

      get_mark() {
        return new Mark(this.line, this.column, this.string, this.index);
      }

      check_printable() {
        var character, match, position;
        match = NON_PRINTABLE.exec(this.string);
        if (match) {
          character = match[0];
          position = (this.string.length - this.index) + match.index;
          throw new exports.ReaderError(position, character, 'special characters are not allowed');
        }
      }

    };

    NON_PRINTABLE = /[^\x09\x0A\x0D\x20-\x7E\x85\xA0-\uFFFD]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/; // Invalid single characters
    // Missing or invalid low surrogate
    // Missing or invalid high surrogate

    ctor = Reader.prototype.initialise;

    return Reader;

  }).call(this);

}).call(this);


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var MarkedYAMLError, SimpleKey, tokens, util,
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf;

  ({MarkedYAMLError} = __webpack_require__(33));

  tokens = __webpack_require__(45);

  util = __webpack_require__(36);

  /*
  The Scanner throws these.
  */
  this.ScannerError = class ScannerError extends MarkedYAMLError {};

  /*
  Represents a possible simple key.
  */
  SimpleKey = class SimpleKey {
    constructor(token_number1, required1, index, line, column1, mark1) {
      this.token_number = token_number1;
      this.required = required1;
      this.index = index;
      this.line = line;
      this.column = column1;
      this.mark = mark1;
    }

  };

  /*
  The Scanner class deals with converting a YAML stream into a token stream.
  */
  this.Scanner = (function() {
    var C_LB, C_NUMBERS, C_WS, ESCAPE_CODES, ESCAPE_REPLACEMENTS, ctor;

    class Scanner {
      constructor() {
        return ctor.apply(this, arguments);
      }

      /*
      Initialise the Scanner
      */
      initialise() {
        // Have we reached the end of the stream?
        this.done = false;
        // How many unclosed '{' or '[' have been seen. '0' implies block context.
        this.flow_level = 0;
        // List of processed tokens not yet emitted.
        this.tokens = [];
        // Add the STREAM-START token.
        this.fetch_stream_start();
        // Number of tokens emitted through the `get_token` method.
        this.tokens_taken = 0;
        // Current indentation level. '-1' means no indentation has been seen.
        this.indent = -1;
        // Previous indentation levels.
        this.indents = [];
        // Simple Key Treatment
        //   A simple key is a key that is not denoted by the '?' indicator, e.g.
        //     block simple key: value
        //     ? not a simple key
        //     : { flow simple key: value }
        //   We emit the KEY token before all keys, so when we find a potential
        //   simple key, we try to locate the corresponding ':' indicator.  Simple
        //   keys should be limited to a single line and 1024 characters.

        // Can a simple key start at the current position?  A simple key may
        // start
        //   at the beginning of the line, not counting indentation spaces
        //     (block context)
        //   after '{', '[', ',' (flow context)
        //   after '?', ':', '-' (block context)
        // In the block context, this flag also signifies if a block collection
        // may start at the current position.
        this.allow_simple_key = true;
        // Keep track of possible simple keys.  This is an object.  The key is
        // `flow_level`; there can be no more than one possible simple key for
        // each level.  The value is a SimpleKey object. A simple key may start
        // with ALIAS, ANCHOR, TAG, SCALAR (flow), '[' or '{' tokens.
        return this.possible_simple_keys = {};
      }

      // API methods.
      /*
      Check if the next token is one of the given types.
      */
      check_token(...choices) {
        var choice, i, len;
        while (this.need_more_tokens()) {
          this.fetch_more_tokens();
        }
        if (this.tokens.length !== 0) {
          if (choices.length === 0) {
            return true;
          }
          for (i = 0, len = choices.length; i < len; i++) {
            choice = choices[i];
            if (this.tokens[0] instanceof choice) {
              return true;
            }
          }
        }
        return false;
      }

      /*
      Return the next token, but do not delete it from the queue.
      */
      peek_token() {
        while (this.need_more_tokens()) {
          this.fetch_more_tokens();
        }
        if (this.tokens.length !== 0) {
          return this.tokens[0];
        }
      }

      /*
      Return the next token, and remove it from the queue.
      */
      get_token() {
        while (this.need_more_tokens()) {
          this.fetch_more_tokens();
        }
        if (this.tokens.length !== 0) {
          this.tokens_taken++;
          return this.tokens.shift();
        }
      }

      // Non-API methods.
      need_more_tokens() {
        if (this.done) {
          return false;
        }
        if (this.tokens.length === 0) {
          return true;
        }
        // The current token may be a potential simple key, so we need to look
        // further.
        this.stale_possible_simple_keys();
        if (this.next_possible_simple_key() === this.tokens_taken) {
          return true;
        }
        return false;
      }

      fetch_more_tokens() {
        var char;
        // Eat whitespace and comments until we reach the next token.
        this.scan_to_next_token();
        // Remove obsolete possible simple keys
        this.stale_possible_simple_keys();
        // Compare the current indentation and column. It may add some tokens and
        // decrease the current indentation level.
        this.unwind_indent(this.column);
        // Peek the next character.
        char = this.peek();
        if (char === '\x00') {
          // Is it the end of stream?
          return this.fetch_stream_end();
        }
        if (char === '%' && this.check_directive()) {
          // Is it a directive?
          return this.fetch_directive();
        }
        if (char === '-' && this.check_document_start()) {
          // Is it the document start?
          return this.fetch_document_start();
        }
        if (char === '.' && this.check_document_end()) {
          // Is it the document end?
          return this.fetch_document_end();
        }
        if (char === '[') {
          // TODO: support for BOM within a stream.

          // Is it the flow sequence start indicator?
          return this.fetch_flow_sequence_start();
        }
        if (char === '{') {
          // Is it the flow mapping start indicator?
          return this.fetch_flow_mapping_start();
        }
        if (char === ']') {
          // Is it the flow sequence end indicator?
          return this.fetch_flow_sequence_end();
        }
        if (char === '}') {
          // Is it the flow mapping end indicator?
          return this.fetch_flow_mapping_end();
        }
        if (char === ',') {
          // Is it the flow entry indicator?
          return this.fetch_flow_entry();
        }
        if (char === '-' && this.check_block_entry()) {
          // Is it the block entry indicator?
          return this.fetch_block_entry();
        }
        if (char === '?' && this.check_key()) {
          // Is it the key indicator?
          return this.fetch_key();
        }
        if (char === ':' && this.check_value()) {
          // Is it the value indicator?
          return this.fetch_value();
        }
        if (char === '*') {
          // Is it an alias?
          return this.fetch_alias();
        }
        if (char === '&') {
          // Is it an anchor?
          return this.fetch_anchor();
        }
        if (char === '!') {
          // Is it a tag?
          return this.fetch_tag();
        }
        if (char === '|' && this.flow_level === 0) {
          // Is it a literal scalar?
          return this.fetch_literal();
        }
        if (char === '>' && this.flow_level === 0) {
          // Is it a folded scalar?
          return this.fetch_folded();
        }
        if (char === '\'') {
          // Is it a single quoted scalar?
          return this.fetch_single();
        }
        if (char === '"') {
          // Is it a double quoted scalar?
          return this.fetch_double();
        }
        if (this.check_plain()) {
          // It must be a plain scalar then.
          return this.fetch_plain();
        }
        // No? It's an error.
        throw new exports.ScannerError('while scanning for the next token', null, `found character ${char} that cannot start any token`, this.get_mark());
      }

      // Simple keys treatment.
      /*
      Return the number of the nearest possible simple key.
      */
      next_possible_simple_key() {
        var key, level, min_token_number, ref;
        min_token_number = null;
        ref = this.possible_simple_keys;
        for (level in ref) {
          if (!hasProp.call(ref, level)) continue;
          key = ref[level];
          if (min_token_number === null || key.token_number < min_token_number) {
            min_token_number = key.token_number;
          }
        }
        return min_token_number;
      }

      /*
      Remove entries that are no longer possible simple keys.  According to the
      YAML spec, simple keys:
      should be limited to a single line
      should be no longer than 1024 characters
      Disabling this procedure will allow simple keys of any length and height
      (may cause problems if indentation is broken though).
      */
      stale_possible_simple_keys() {
        var key, level, ref, results;
        ref = this.possible_simple_keys;
        results = [];
        for (level in ref) {
          if (!hasProp.call(ref, level)) continue;
          key = ref[level];
          if (key.line === this.line && this.index - key.index <= 1024) {
            continue;
          }
          if (!key.required) {
            results.push(delete this.possible_simple_keys[level]);
          } else {
            throw new exports.ScannerError('while scanning a simple key', key.mark, 'could not find expected \':\'', this.get_mark());
          }
        }
        return results;
      }

      /*
      The next token may start a simple key.  We check if it's possible and save
      its position.  This function is called for ALIAS, ANCHOR, TAG,
      SCALAR (flow),'[' and '{'.
      */
      save_possible_simple_key() {
        var required, token_number;
        // Check if a simple key is required at the current position.
        required = this.flow_level === 0 && this.indent === this.column;
        if (required && !this.allow_simple_key) {
          // A simple key is required only if it is the first token in the current
          // line.  Therefore it is always allowed.
          throw new Error('logic failure');
        }
        // If simple keys aren't allowed here we're done.
        if (!this.allow_simple_key) {
          return;
        }
        // The next token might be a simple key.  Let's save its number and
        // position.
        this.remove_possible_simple_key();
        token_number = this.tokens_taken + this.tokens.length;
        return this.possible_simple_keys[this.flow_level] = new SimpleKey(token_number, required, this.index, this.line, this.column, this.get_mark());
      }

      /*
      Remove the saved possible simple key at the current flow level.
      */
      remove_possible_simple_key() {
        var key;
        if (!(key = this.possible_simple_keys[this.flow_level])) {
          return;
        }
        if (!key.required) {
          return delete this.possible_simple_keys[this.flow_level];
        } else {
          throw new exports.ScannerError('while scanning a simple key', key.mark, 'could not find expected \':\'', this.get_mark());
        }
      }

      // Indentation functions
      /*
      In flow context, tokens should respect indentation.
      Actually the condition should be `self.indent >= column` according to
      the spec. But this condition will prohibit intuitively correct
      constructions such as
        key : {
        }
      */
      unwind_indent(column) {
        var mark, results;
        // In the flow context, indentation is ignored.  We make the scanner less
        // restrictive than the specification requires.
        if (this.flow_level !== 0) {
          return;
        }
        results = [];
        // In block context we may need to issue the BLOCK-END tokens.
        while (this.indent > column) {
          mark = this.get_mark();
          this.indent = this.indents.pop();
          results.push(this.tokens.push(new tokens.BlockEndToken(mark, mark)));
        }
        return results;
      }

      /*
      Check if we need to increase indentation.
      */
      add_indent(column) {
        if (!(column > this.indent)) {
          return false;
        }
        this.indents.push(this.indent);
        this.indent = column;
        return true;
      }

      // Fetchers.
      fetch_stream_start() {
        var mark;
        mark = this.get_mark();
        return this.tokens.push(new tokens.StreamStartToken(mark, mark, this.encoding));
      }

      fetch_stream_end() {
        var mark;
        // Set the current indentation to -1.
        this.unwind_indent(-1);
        // Reset simple keys.
        this.remove_possible_simple_key();
        this.allow_possible_simple_key = false;
        this.possible_simple_keys = {};
        mark = this.get_mark();
        this.tokens.push(new tokens.StreamEndToken(mark, mark));
        // The stream is finished.
        return this.done = true;
      }

      fetch_directive() {
        // Set the current indentation to -1.
        this.unwind_indent(-1);
        // Reset simple keys.
        this.remove_possible_simple_key();
        this.allow_simple_key = false;
        // Scan and add DIRECTIVE
        return this.tokens.push(this.scan_directive());
      }

      fetch_document_start() {
        return this.fetch_document_indicator(tokens.DocumentStartToken);
      }

      fetch_document_end() {
        return this.fetch_document_indicator(tokens.DocumentEndToken);
      }

      fetch_document_indicator(TokenClass) {
        var start_mark;
        // Set the current indentation to -1.
        this.unwind_indent(-1);
        // Reset simple keys.  Note that there would not be a block collection
        // after '---'.
        this.remove_possible_simple_key();
        this.allow_simple_key = false;
        // Add DOCUMENT-START or DOCUMENT-END.
        start_mark = this.get_mark();
        this.forward(3);
        return this.tokens.push(new TokenClass(start_mark, this.get_mark()));
      }

      fetch_flow_sequence_start() {
        return this.fetch_flow_collection_start(tokens.FlowSequenceStartToken);
      }

      fetch_flow_mapping_start() {
        return this.fetch_flow_collection_start(tokens.FlowMappingStartToken);
      }

      fetch_flow_collection_start(TokenClass) {
        var start_mark;
        // '[' and '{' may start a simple key.
        this.save_possible_simple_key();
        // Increase flow level.
        this.flow_level++;
        // Simple keys are allowed after '[' and '{'
        this.allow_simple_key = true;
        // Add FLOW-SEQUENCE-START or FLOW-MAPPING-START.
        start_mark = this.get_mark();
        this.forward();
        return this.tokens.push(new TokenClass(start_mark, this.get_mark()));
      }

      fetch_flow_sequence_end() {
        return this.fetch_flow_collection_end(tokens.FlowSequenceEndToken);
      }

      fetch_flow_mapping_end() {
        return this.fetch_flow_collection_end(tokens.FlowMappingEndToken);
      }

      fetch_flow_collection_end(TokenClass) {
        var start_mark;
        // Reset possible simple key on the current level.
        this.remove_possible_simple_key();
        // Decrease the flow level
        this.flow_level--;
        // No simple keys after ']' or '}'
        this.allow_simple_key = false;
        // Add FLOW-SEQUENCE-END or FLOW-MAPPING-END.
        start_mark = this.get_mark();
        this.forward();
        return this.tokens.push(new TokenClass(start_mark, this.get_mark()));
      }

      fetch_flow_entry() {
        var start_mark;
        // Simple keys are allowed after ','.
        this.allow_simple_key = true;
        // Reset possible simple key on the current level.
        this.remove_possible_simple_key();
        // Add FLOW-ENTRY
        start_mark = this.get_mark();
        this.forward();
        return this.tokens.push(new tokens.FlowEntryToken(start_mark, this.get_mark()));
      }

      fetch_block_entry() {
        var mark, start_mark;
        // Block context needs additional checks
        if (this.flow_level === 0) {
          // Are we allowed to start a new entry?
          if (!this.allow_simple_key) {
            throw new exports.ScannerError(null, null, 'sequence entries are not allowed here', this.get_mark());
          }
          // We may need to add BLOCK-SEQUENCE-START
          if (this.add_indent(this.column)) {
            mark = this.get_mark();
            this.tokens.push(new tokens.BlockSequenceStartToken(mark, mark));
          }
        }
        // It's an error for the block entry to occur in the flow context but we
        // let the parser detect this.

        // Simple keys are allowed after '-'
        this.allow_simple_key = true;
        // Reset possible simple key on the current level.
        this.remove_possible_simple_key();
        // Add BLOCK-ENTRY
        start_mark = this.get_mark();
        this.forward();
        return this.tokens.push(new tokens.BlockEntryToken(start_mark, this.get_mark()));
      }

      fetch_key() {
        var mark, start_mark;
        // Block context needs additional checks.
        if (this.flow_level === 0) {
          // Are we allowed to start a key?
          if (!this.allow_simple_key) {
            throw new exports.ScannerError(null, null, 'mapping keys are not allowed here', this.get_mark());
          }
          // We may need to add BLOCK-MAPPING-START.
          if (this.add_indent(this.column)) {
            mark = this.get_mark();
            this.tokens.push(new tokens.BlockMappingStartToken(mark, mark));
          }
        }
        // Simple keys are allowed after '?' in the flow context.
        this.allow_simple_key = !this.flow_level;
        // Reset possible simple key on the current level.
        this.remove_possible_simple_key();
        // Add KEY.
        start_mark = this.get_mark();
        this.forward();
        return this.tokens.push(new tokens.KeyToken(start_mark, this.get_mark()));
      }

      fetch_value() {
        var key, mark, start_mark;
        // Do we determine a simple key?
        if (key = this.possible_simple_keys[this.flow_level]) {
          // Add KEY.
          delete this.possible_simple_keys[this.flow_level];
          this.tokens.splice(key.token_number - this.tokens_taken, 0, new tokens.KeyToken(key.mark, key.mark));
          // If this key starts a new block mapping we need to add
          // BLOCK-MAPPING-START.
          if (this.flow_level === 0) {
            if (this.add_indent(key.column)) {
              this.tokens.splice(key.token_number - this.tokens_taken, 0, new tokens.BlockMappingStartToken(key.mark, key.mark));
            }
          }
          // There cannot be two simple keys one after the other.
          this.allow_simple_key = false;
        } else {
          // Block context needs additional checks.
          // TODO: do we really need them?  Parser will catch them anyway.
          // It must be part of a complex key.
          if (this.flow_level === 0) {
            // We are allowed to start a complex value if and only if we can start
            // a simple key.
            if (!this.allow_simple_key) {
              throw new exports.ScannerError(null, null, 'mapping values are not allowed here', this.get_mark());
            }
            // If this value starts a new block mapping we need to add
            // BLOCK-MAPPING-START.  It will be detected as an error later by the
            // parser.
            if (this.add_indent(this.column)) {
              mark = this.get_mark();
              this.tokens.push(new tokens.BlockMappingStartToken(mark, mark));
            }
          }
          // Simple keys are allowed after ':' in the block context.
          this.allow_simple_key = !this.flow_level;
          // Reset possible simple key on the current level.
          this.remove_possible_simple_key();
        }
        // Add VALUE.
        start_mark = this.get_mark();
        this.forward();
        return this.tokens.push(new tokens.ValueToken(start_mark, this.get_mark()));
      }

      fetch_alias() {
        // ALIAS could be a simple key.
        this.save_possible_simple_key();
        // No simple keys after ALIAS.
        this.allow_simple_key = false;
        // Scan and add ALIAS.
        return this.tokens.push(this.scan_anchor(tokens.AliasToken));
      }

      fetch_anchor() {
        // ANCHOR could start a simple key.
        this.save_possible_simple_key();
        // No simple keys allowed after ANCHOR.
        this.allow_simple_key = false;
        // Scan and add ANCHOR.
        return this.tokens.push(this.scan_anchor(tokens.AnchorToken));
      }

      fetch_tag() {
        // TAG could start a simple key
        this.save_possible_simple_key();
        // No simple keys after TAG.
        this.allow_simple_key = false;
        // Scan and add TAG.
        return this.tokens.push(this.scan_tag());
      }

      fetch_literal() {
        return this.fetch_block_scalar('|');
      }

      fetch_folded() {
        return this.fetch_block_scalar('>');
      }

      fetch_block_scalar(style) {
        // A simple key may follow a block sclar.
        this.allow_simple_key = true;
        // Reset possible simple key on the current level.
        this.remove_possible_simple_key();
        // Scan and add SCALAR.
        return this.tokens.push(this.scan_block_scalar(style));
      }

      fetch_single() {
        return this.fetch_flow_scalar('\'');
      }

      fetch_double() {
        return this.fetch_flow_scalar('"');
      }

      fetch_flow_scalar(style) {
        // A flow scalar could be a simple key.
        this.save_possible_simple_key();
        // No simple keys after flow scalars.
        this.allow_simple_key = false;
        // Scan and add SCALAR.
        return this.tokens.push(this.scan_flow_scalar(style));
      }

      fetch_plain() {
        // A plain scalar could be a simple key.
        this.save_possible_simple_key();
        // No simple keys after plain scalars.  But note that `scan_plain` will
        // change this flag if the scan is finished at the beginning of the line.
        this.allow_simple_key = false;
        // Scan and add SCALAR.  May change `allow_simple_key`.
        return this.tokens.push(this.scan_plain());
      }

      // Checkers.
      /*
      DIRECTIVE: ^ '%'
      */
      check_directive() {
        if (this.column === 0) {
          // The % indicator has already been checked.
          return true;
        }
        return false;
      }

      /*
      DOCUMENT-START: ^ '---' (' '|'\n')
      */
      check_document_start() {
        var ref;
        if (this.column === 0 && this.prefix(3) === '---' && (ref = this.peek(3), indexOf.call(C_LB + C_WS + '\x00', ref) >= 0)) {
          return true;
        }
        return false;
      }

      /*
      DOCUMENT-END: ^ '...' (' '|'\n')
      */
      check_document_end() {
        var ref;
        if (this.column === 0 && this.prefix(3) === '...' && (ref = this.peek(3), indexOf.call(C_LB + C_WS + '\x00', ref) >= 0)) {
          return true;
        }
        return false;
      }

      /*
      BLOCK-ENTRY: '-' (' '|'\n')
      */
      check_block_entry() {
        var ref;
        return ref = this.peek(1), indexOf.call(C_LB + C_WS + '\x00', ref) >= 0;
      }

      /*
      KEY (flow context):  '?'
      KEY (block context): '?' (' '|'\n')
      */
      check_key() {
        var ref;
        if (this.flow_level !== 0) {
          // KEY (flow context)
          return true;
        }
        // KEY (block context)
        return ref = this.peek(1), indexOf.call(C_LB + C_WS + '\x00', ref) >= 0;
      }

      /*
      VALUE (flow context):  ':'
      VALUE (block context): ':' (' '|'\n')
      */
      check_value() {
        var ref;
        if (this.flow_level !== 0) {
          // VALUE (flow context)
          return true;
        }
        // VALUE (block context)
        return ref = this.peek(1), indexOf.call(C_LB + C_WS + '\x00', ref) >= 0;
      }

      /*
      A plain scalar may start with any non-space character except:
      '-', '?', ':', ',', '[', ']', '{', '}',
      '#', '&', '*', '!', '|', '>', '\'', '"',
      '%', '@', '`'.

      It may also start with
      '-', '?', ':'
      if it is followed by a non-space character.

      Note that we limit the last rule to the block context (except the '-'
      character) because we want the flow context to be space independent.
      */
      check_plain() {
        var char, ref;
        char = this.peek();
        return indexOf.call(C_LB + C_WS + '\x00-?:,[]{}#&*!|>\'"%@`', char) < 0 || ((ref = this.peek(1), indexOf.call(C_LB + C_WS + '\x00', ref) < 0) && (char === '-' || (this.flow_level === 0 && indexOf.call('?:', char) >= 0)));
      }

      // Scanners.
      /*
      We ignore spaces, line breaks and comments.
      If we find a line break in the block context, we set the flag
      `allow_simple_key` on.
      The byte order mark is stripped if it's the first character in the stream.
      We do not yet support BOM inside the stream as the specification requires.
      Any such mark will be considered as a part of the document.

      TODO: We need to make tab handling rules more sane.  A good rule is
      Tabs cannot precede tokens BLOCK-SEQUENCE-START, BLOCK-MAPPING-START,
      BLOCK-END, KEY (block context), VALUE (block context), BLOCK-ENTRY
      So the tab checking code is
      @allow_simple_key = off if <TAB>
      We also need to add the check for `allow_simple_key is on` to
      `unwind_indent` before issuing BLOCK-END.  Scanners for block, flow and
      plain scalars need to be modified.
      */
      scan_to_next_token() {
        var found, ref, results;
        if (this.index === 0 && this.peek() === '\uFEFF') {
          this.forward();
        }
        found = false;
        results = [];
        while (!found) {
          while (this.peek() === ' ') {
            this.forward();
          }
          if (this.peek() === '#') {
            while (ref = this.peek(), indexOf.call(C_LB + '\x00', ref) < 0) {
              this.forward();
            }
          }
          if (this.scan_line_break()) {
            if (this.flow_level === 0) {
              results.push(this.allow_simple_key = true);
            } else {
              results.push(void 0);
            }
          } else {
            results.push(found = true);
          }
        }
        return results;
      }

      /*
      See the specification for details.
      */
      scan_directive() {
        var end_mark, name, ref, start_mark, value;
        start_mark = this.get_mark();
        this.forward();
        name = this.scan_directive_name(start_mark);
        value = null;
        if (name === 'YAML') {
          value = this.scan_yaml_directive_value(start_mark);
          end_mark = this.get_mark();
        } else if (name === 'TAG') {
          value = this.scan_tag_directive_value(start_mark);
          end_mark = this.get_mark();
        } else {
          end_mark = this.get_mark();
          while (ref = this.peek(), indexOf.call(C_LB + '\x00', ref) < 0) {
            this.forward();
          }
        }
        this.scan_directive_ignored_line(start_mark);
        return new tokens.DirectiveToken(name, value, start_mark, end_mark);
      }

      /*
      See the specification for details.
      */
      scan_directive_name(start_mark) {
        var char, length, value;
        length = 0;
        char = this.peek(length);
        while (('0' <= char && char <= '9') || ('A' <= char && char <= 'Z') || ('a' <= char && char <= 'z') || indexOf.call('-_', char) >= 0) {
          length++;
          char = this.peek(length);
        }
        if (length === 0) {
          throw new exports.ScannerError('while scanning a directive', start_mark, `expected alphanumeric or numeric character but found ${char}`, this.get_mark());
        }
        value = this.prefix(length);
        this.forward(length);
        char = this.peek();
        if (indexOf.call(C_LB + '\x00 ', char) < 0) {
          throw new exports.ScannerError('while scanning a directive', start_mark, `expected alphanumeric or numeric character but found ${char}`, this.get_mark());
        }
        return value;
      }

      /*
      See the specification for details.
      */
      scan_yaml_directive_value(start_mark) {
        var major, minor, ref;
        while (this.peek() === ' ') {
          this.forward();
        }
        major = this.scan_yaml_directive_number(start_mark);
        if (this.peek() !== '.') {
          throw new exports.ScannerError('while scanning a directive', start_mark, `expected a digit or '.' but found ${this.peek()}`, this.get_mark());
        }
        this.forward();
        minor = this.scan_yaml_directive_number(start_mark);
        if (ref = this.peek(), indexOf.call(C_LB + '\x00 ', ref) < 0) {
          throw new exports.ScannerError('while scanning a directive', start_mark, `expected a digit or ' ' but found ${this.peek()}`, this.get_mark());
        }
        return [major, minor];
      }

      /*
      See the specification for details.
      */
      scan_yaml_directive_number(start_mark) {
        var char, length, ref, value;
        char = this.peek();
        if (!(('0' <= char && char <= '9'))) {
          throw new exports.ScannerError('while scanning a directive', start_mark, `expected a digit but found ${char}`, this.get_mark());
        }
        length = 0;
        while (('0' <= (ref = this.peek(length)) && ref <= '9')) {
          length++;
        }
        value = parseInt(this.prefix(length));
        this.forward(length);
        return value;
      }

      /*
      See the specification for details.
      */
      scan_tag_directive_value(start_mark) {
        var handle, prefix;
        while (this.peek() === ' ') {
          this.forward();
        }
        handle = this.scan_tag_directive_handle(start_mark);
        while (this.peek() === ' ') {
          this.forward();
        }
        prefix = this.scan_tag_directive_prefix(start_mark);
        return [handle, prefix];
      }

      /*
      See the specification for details.
      */
      scan_tag_directive_handle(start_mark) {
        var char, value;
        value = this.scan_tag_handle('directive', start_mark);
        char = this.peek();
        if (char !== ' ') {
          throw new exports.ScannerError('while scanning a directive', start_mark, `expected ' ' but found ${char}`, this.get_mark());
        }
        return value;
      }

      /*
      See the specification for details.
      */
      scan_tag_directive_prefix(start_mark) {
        var char, value;
        value = this.scan_tag_uri('directive', start_mark);
        char = this.peek();
        if (indexOf.call(C_LB + '\x00 ', char) < 0) {
          throw new exports.ScannerError('while scanning a directive', start_mark, `expected ' ' but found ${char}`, this.get_mark());
        }
        return value;
      }

      /*
      See the specification for details.
      */
      scan_directive_ignored_line(start_mark) {
        var char, ref;
        while (this.peek() === ' ') {
          this.forward();
        }
        if (this.peek() === '#') {
          while (ref = this.peek(), indexOf.call(C_LB + '\x00', ref) < 0) {
            this.forward();
          }
        }
        char = this.peek();
        if (indexOf.call(C_LB + '\x00', char) < 0) {
          throw new exports.ScannerError('while scanning a directive', start_mark, `expected a comment or a line break but found ${char}`, this.get_mark());
        }
        return this.scan_line_break();
      }

      /*
      The specification does not restrict characters for anchors and aliases.
      This may lead to problems, for instance, the document:
      [ *alias, value ]
      can be interpteted in two ways, as
      [ "value" ]
      and
      [ *alias , "value" ]
      Therefore we restrict aliases to numbers and ASCII letters.
      */
      scan_anchor(TokenClass) {
        var char, indicator, length, name, start_mark, value;
        start_mark = this.get_mark();
        indicator = this.peek();
        if (indicator === '*') {
          name = 'alias';
        } else {
          name = 'anchor';
        }
        this.forward();
        length = 0;
        char = this.peek(length);
        while (('0' <= char && char <= '9') || ('A' <= char && char <= 'Z') || ('a' <= char && char <= 'z') || indexOf.call('-_', char) >= 0) {
          length++;
          char = this.peek(length);
        }
        if (length === 0) {
          throw new exports.ScannerError(`while scanning an ${name}`, start_mark, `expected alphabetic or numeric character but found '${char}'`, this.get_mark());
        }
        value = this.prefix(length);
        this.forward(length);
        char = this.peek();
        if (indexOf.call(C_LB + C_WS + '\x00' + '?:,]}%@`', char) < 0) {
          throw new exports.ScannerError(`while scanning an ${name}`, start_mark, `expected alphabetic or numeric character but found '${char}'`, this.get_mark());
        }
        return new TokenClass(value, start_mark, this.get_mark());
      }

      /*
      See the specification for details.
      */
      scan_tag() {
        var char, handle, length, start_mark, suffix, use_handle;
        start_mark = this.get_mark();
        char = this.peek(1);
        if (char === '<') {
          handle = null;
          this.forward(2);
          suffix = this.scan_tag_uri('tag', start_mark);
          if (this.peek() !== '>') {
            throw new exports.ScannerError('while parsing a tag', start_mark, `expected '>' but found ${this.peek()}`, this.get_mark());
          }
          this.forward();
        } else if (indexOf.call(C_LB + C_WS + '\x00', char) >= 0) {
          handle = null;
          suffix = '!';
          this.forward();
        } else {
          length = 1;
          use_handle = false;
          while (indexOf.call(C_LB + '\x00 ', char) < 0) {
            if (char === '!') {
              use_handle = true;
              break;
            }
            length++;
            char = this.peek(length);
          }
          if (use_handle) {
            handle = this.scan_tag_handle('tag', start_mark);
          } else {
            handle = '!';
            this.forward();
          }
          suffix = this.scan_tag_uri('tag', start_mark);
        }
        char = this.peek();
        if (indexOf.call(C_LB + '\x00 ', char) < 0) {
          throw new exports.ScannerError('while scanning a tag', start_mark, `expected ' ' but found ${char}`, this.get_mark());
        }
        return new tokens.TagToken([handle, suffix], start_mark, this.get_mark());
      }

      /*
      See the specification for details.
      */
      scan_block_scalar(style) {
        var breaks, chomping, chunks, end_mark, folded, increment, indent, leading_non_space, length, line_break, max_indent, min_indent, ref, ref1, ref2, start_mark;
        folded = style === '>';
        chunks = [];
        start_mark = this.get_mark();
        // Scan the header.
        this.forward();
        [chomping, increment] = this.scan_block_scalar_indicators(start_mark);
        this.scan_block_scalar_ignored_line(start_mark);
        // Determine the indentation level and go to the first non-empty line.
        min_indent = this.indent + 1;
        if (min_indent < 1) {
          min_indent = 1;
        }
        if (increment == null) {
          [breaks, max_indent, end_mark] = this.scan_block_scalar_indentation();
          indent = Math.max(min_indent, max_indent);
        } else {
          indent = min_indent + increment - 1;
          [breaks, end_mark] = this.scan_block_scalar_breaks(indent);
        }
        line_break = '';
        // Scan the inner part of the block scalar.
        while (this.column === indent && this.peek() !== '\x00') {
          chunks = chunks.concat(breaks);
          leading_non_space = (ref = this.peek(), indexOf.call(' \t', ref) < 0);
          length = 0;
          while (ref1 = this.peek(length), indexOf.call(C_LB + '\x00', ref1) < 0) {
            length++;
          }
          chunks.push(this.prefix(length));
          this.forward(length);
          line_break = this.scan_line_break();
          [breaks, end_mark] = this.scan_block_scalar_breaks(indent);
          if (this.column === indent && this.peek() !== '\x00') {
            // Unfortunately, folding rules are ambiguous.  This is the folding
            // according to the specification:
            if (folded && line_break === '\n' && leading_non_space && (ref2 = this.peek(), indexOf.call(' \t', ref2) < 0)) {
              if (util.is_empty(breaks)) {
                chunks.push(' ');
              }
            } else {
              chunks.push(line_break);
            }
          } else {
            // This is Clark Evan's interpretation (also in the spec examples):
            // if folded and line_break is '\n'
            //   if not breaks
            //     if @peek() not in ' \t'
            //       chunks.push ' '
            //     else
            //       chunks.push line_break
            // else
            //   chunks.push line_break
            break;
          }
        }
        if (chomping !== false) {
          // Chomp the tail
          chunks.push(line_break);
        }
        if (chomping === true) {
          chunks = chunks.concat(breaks);
        }
        // And we're done.
        return new tokens.ScalarToken(chunks.join(''), false, start_mark, end_mark, style);
      }

      /*
      See the specification for details.
      */
      scan_block_scalar_indicators(start_mark) {
        var char, chomping, increment;
        chomping = null;
        increment = null;
        char = this.peek();
        if (indexOf.call('+-', char) >= 0) {
          chomping = char === '+';
          this.forward();
          char = this.peek();
          if (indexOf.call(C_NUMBERS, char) >= 0) {
            increment = parseInt(char);
            if (increment === 0) {
              throw new exports.ScannerError('while scanning a block scalar', start_mark, 'expected indentation indicator in the range 1-9 but found 0', this.get_mark());
            }
            this.forward();
          }
        } else if (indexOf.call(C_NUMBERS, char) >= 0) {
          increment = parseInt(char);
          if (increment === 0) {
            throw new exports.ScannerError('while scanning a block scalar', start_mark, 'expected indentation indicator in the range 1-9 but found 0', this.get_mark());
          }
          this.forward();
          char = this.peek();
          if (indexOf.call('+-', char) >= 0) {
            chomping = char === '+';
            this.forward();
          }
        }
        char = this.peek();
        if (indexOf.call(C_LB + '\x00 ', char) < 0) {
          throw new exports.ScannerError('while scanning a block scalar', start_mark, `expected chomping or indentation indicators, but found ${char}`, this.get_mark());
        }
        return [chomping, increment];
      }

      /*
      See the specification for details.
      */
      scan_block_scalar_ignored_line(start_mark) {
        var char, ref;
        while (this.peek() === ' ') {
          this.forward();
        }
        if (this.peek() === '#') {
          while (ref = this.peek(), indexOf.call(C_LB + '\x00', ref) < 0) {
            this.forward();
          }
        }
        char = this.peek();
        if (indexOf.call(C_LB + '\x00', char) < 0) {
          throw new exports.ScannerError('while scanning a block scalar', start_mark, `expected a comment or a line break but found ${char}`, this.get_mark());
        }
        return this.scan_line_break();
      }

      /*
      See the specification for details.
      */
      scan_block_scalar_indentation() {
        var chunks, end_mark, max_indent, ref;
        chunks = [];
        max_indent = 0;
        end_mark = this.get_mark();
        while (ref = this.peek(), indexOf.call(C_LB + ' ', ref) >= 0) {
          if (this.peek() !== ' ') {
            chunks.push(this.scan_line_break());
            end_mark = this.get_mark();
          } else {
            this.forward();
            if (this.column > max_indent) {
              max_indent = this.column;
            }
          }
        }
        return [chunks, max_indent, end_mark];
      }

      /*
      See the specification for details.
      */
      scan_block_scalar_breaks(indent) {
        var chunks, end_mark, ref;
        chunks = [];
        end_mark = this.get_mark();
        while (this.column < indent && this.peek() === ' ') {
          this.forward();
        }
        while (ref = this.peek(), indexOf.call(C_LB, ref) >= 0) {
          chunks.push(this.scan_line_break());
          end_mark = this.get_mark();
          while (this.column < indent && this.peek() === ' ') {
            this.forward();
          }
        }
        return [chunks, end_mark];
      }

      /*
      See the specification for details.
      Note that we loose indentation rules for quoted scalars. Quoted scalars
      don't need to adhere indentation because " and ' clearly mark the beginning
      and the end of them. Therefore we are less restrictive than the
      specification requires. We only need to check that document separators are
      not included in scalars.
      */
      scan_flow_scalar(style) {
        var chunks, double, quote, start_mark;
        double = style === '"';
        chunks = [];
        start_mark = this.get_mark();
        quote = this.peek();
        this.forward();
        chunks = chunks.concat(this.scan_flow_scalar_non_spaces(double, start_mark));
        while (this.peek() !== quote) {
          chunks = chunks.concat(this.scan_flow_scalar_spaces(double, start_mark));
          chunks = chunks.concat(this.scan_flow_scalar_non_spaces(double, start_mark));
        }
        this.forward();
        return new tokens.ScalarToken(chunks.join(''), false, start_mark, this.get_mark(), style);
      }

      /*
      See the specification for details.
      */
      scan_flow_scalar_non_spaces(double, start_mark) {
        var char, chunks, code, i, k, length, ref, ref1, ref2;
        chunks = [];
        while (true) {
          length = 0;
          while (ref = this.peek(length), indexOf.call(C_LB + C_WS + '\'"\\\x00', ref) < 0) {
            length++;
          }
          if (length !== 0) {
            chunks.push(this.prefix(length));
            this.forward(length);
          }
          char = this.peek();
          if (!double && char === '\'' && this.peek(1) === '\'') {
            chunks.push('\'');
            this.forward(2);
          } else if ((double && char === '\'') || (!double && indexOf.call('"\\', char) >= 0)) {
            chunks.push(char);
            this.forward();
          } else if (double && char === '\\') {
            this.forward();
            char = this.peek();
            if (char in ESCAPE_REPLACEMENTS) {
              chunks.push(ESCAPE_REPLACEMENTS[char]);
              this.forward();
            } else if (char in ESCAPE_CODES) {
              length = ESCAPE_CODES[char];
              this.forward();
              for (k = i = 0, ref1 = length; 0 <= ref1 ? i < ref1 : i > ref1; k = 0 <= ref1 ? ++i : --i) {
                if (ref2 = this.peek(k), indexOf.call(`${C_NUMBERS}ABCDEFabcdef`, ref2) < 0) {
                  throw new exports.ScannerError('while scanning a double-quoted scalar', start_mark, `expected escape sequence of ${length} hexadecimal numbers, but found ${this.peek(k)}`, this.get_mark());
                }
              }
              code = parseInt(this.prefix(length), 16);
              chunks.push(String.fromCharCode(code));
              this.forward(length);
            } else if (indexOf.call(C_LB, char) >= 0) {
              this.scan_line_break();
              chunks = chunks.concat(this.scan_flow_scalar_breaks(double, start_mark));
            } else {
              throw new exports.ScannerError('while scanning a double-quoted scalar', start_mark, `found unknown escape character ${char}`, this.get_mark());
            }
          } else {
            return chunks;
          }
        }
      }

      /*
      See the specification for details.
      */
      scan_flow_scalar_spaces(double, start_mark) {
        var breaks, char, chunks, length, line_break, ref, whitespaces;
        chunks = [];
        length = 0;
        while (ref = this.peek(length), indexOf.call(C_WS, ref) >= 0) {
          length++;
        }
        whitespaces = this.prefix(length);
        this.forward(length);
        char = this.peek();
        if (char === '\x00') {
          throw new exports.ScannerError('while scanning a quoted scalar', start_mark, 'found unexpected end of stream', this.get_mark());
        }
        if (indexOf.call(C_LB, char) >= 0) {
          line_break = this.scan_line_break();
          breaks = this.scan_flow_scalar_breaks(double, start_mark);
          if (line_break !== '\n') {
            chunks.push(line_break);
          } else if (breaks.length === 0) {
            chunks.push(' ');
          }
          chunks = chunks.concat(breaks);
        } else {
          chunks.push(whitespaces);
        }
        return chunks;
      }

      /*
      See the specification for details.
      */
      scan_flow_scalar_breaks(double, start_mark) {
        var chunks, prefix, ref, ref1, ref2;
        chunks = [];
        while (true) {
          // Instead of checking for indentation, we check for document separators.
          prefix = this.prefix(3);
          if (prefix === '---' || prefix === '...' && (ref = this.peek(3), indexOf.call(C_LB + C_WS + '\x00', ref) >= 0)) {
            throw new exports.ScannerError('while scanning a quoted scalar', start_mark, 'found unexpected document separator', this.get_mark());
          }
          while (ref1 = this.peek(), indexOf.call(C_WS, ref1) >= 0) {
            this.forward();
          }
          if (ref2 = this.peek(), indexOf.call(C_LB, ref2) >= 0) {
            chunks.push(this.scan_line_break());
          } else {
            return chunks;
          }
        }
      }

      /*
      See the specification for details.
      We add an additional restriction for the flow context:
        plain scalars in the flow context cannot contain ',', ':' and '?'.
      We also keep track of the `allow_simple_key` flag here.
      Indentation rules are loosed for the flow context.
      */
      scan_plain() {
        var char, chunks, end_mark, indent, length, ref, ref1, spaces, start_mark;
        chunks = [];
        start_mark = end_mark = this.get_mark();
        indent = this.indent + 1;
        // We allow zero indentation for scalars, but then we need to check for
        // document separators at the beginning of the line.
        // indent = 1 if indent is 0
        spaces = [];
        while (true) {
          length = 0;
          if (this.peek() === '#') {
            break;
          }
          while (true) {
            char = this.peek(length);
            if (indexOf.call(C_LB + C_WS + '\x00', char) >= 0 || (this.flow_level === 0 && char === ':' && (ref = this.peek(length + 1), indexOf.call(C_LB + C_WS + '\x00', ref) >= 0)) || (this.flow_level !== 0 && indexOf.call(',:?[]{}', char) >= 0)) {
              break;
            }
            length++;
          }
          // It's not clear what we should do with ':' in the flow context.
          if (this.flow_level !== 0 && char === ':' && (ref1 = this.peek(length + 1), indexOf.call(C_LB + C_WS + '\x00,[]{}', ref1) < 0)) {
            this.forward(length);
            throw new exports.ScannerError('while scanning a plain scalar', start_mark, 'found unexpected \':\'', this.get_mark(), 'Please check http://pyyaml.org/wiki/YAMLColonInFlowContext');
          }
          if (length === 0) {
            break;
          }
          this.allow_simple_key = false;
          chunks = chunks.concat(spaces);
          chunks.push(this.prefix(length));
          this.forward(length);
          end_mark = this.get_mark();
          spaces = this.scan_plain_spaces(indent, start_mark);
          if ((spaces == null) || spaces.length === 0 || this.peek() === '#' || (this.flow_level === 0 && this.column < indent)) {
            break;
          }
        }
        return new tokens.ScalarToken(chunks.join(''), true, start_mark, end_mark);
      }

      /*
      See the specification for details.
      The specification is really confusing about tabs in plain scalars.
      We just forbid them completely. Do not use tabs in YAML!
      */
      scan_plain_spaces(indent, start_mark) {
        var breaks, char, chunks, length, line_break, prefix, ref, ref1, ref2, ref3, whitespaces;
        chunks = [];
        length = 0;
        while (ref = this.peek(length), indexOf.call(' ', ref) >= 0) {
          length++;
        }
        whitespaces = this.prefix(length);
        this.forward(length);
        char = this.peek();
        if (indexOf.call(C_LB, char) >= 0) {
          line_break = this.scan_line_break();
          this.allow_simple_key = true;
          prefix = this.prefix(3);
          if (prefix === '---' || prefix === '...' && (ref1 = this.peek(3), indexOf.call(C_LB + C_WS + '\x00', ref1) >= 0)) {
            return;
          }
          breaks = [];
          while (ref3 = this.peek(), indexOf.call(C_LB + ' ', ref3) >= 0) {
            if (this.peek() === ' ') {
              this.forward();
            } else {
              breaks.push(this.scan_line_break());
              prefix = this.prefix(3);
              if (prefix === '---' || prefix === '...' && (ref2 = this.peek(3), indexOf.call(C_LB + C_WS + '\x00', ref2) >= 0)) {
                return;
              }
            }
          }
          if (line_break !== '\n') {
            chunks.push(line_break);
          } else if (breaks.length === 0) {
            chunks.push(' ');
          }
          chunks = chunks.concat(breaks);
        } else if (whitespaces) {
          chunks.push(whitespaces);
        }
        return chunks;
      }

      /*
      See the specification for details.
      For some strange reasons, the specification does not allow '_' in tag
      handles. I have allowed it anyway.
      */
      scan_tag_handle(name, start_mark) {
        var char, length, value;
        char = this.peek();
        if (char !== '!') {
          throw new exports.ScannerError(`while scanning a ${name}`, start_mark, `expected '!' but found ${char}`, this.get_mark());
        }
        length = 1;
        char = this.peek(length);
        if (char !== ' ') {
          while (('0' <= char && char <= '9') || ('A' <= char && char <= 'Z') || ('a' <= char && char <= 'z') || indexOf.call('-_', char) >= 0) {
            length++;
            char = this.peek(length);
          }
          if (char !== '!') {
            this.forward(length);
            throw new exports.ScannerError(`while scanning a ${name}`, start_mark, `expected '!' but found ${char}`, this.get_mark());
          }
          length++;
        }
        value = this.prefix(length);
        this.forward(length);
        return value;
      }

      /*
      See the specification for details.
      Note: we do not check if URI is well-formed.
      */
      scan_tag_uri(name, start_mark) {
        var char, chunks, length;
        chunks = [];
        length = 0;
        char = this.peek(length);
        while (('0' <= char && char <= '9') || ('A' <= char && char <= 'Z') || ('a' <= char && char <= 'z') || indexOf.call('-;/?:@&=+$,_.!~*\'()[]%', char) >= 0) {
          if (char === '%') {
            chunks.push(this.prefix(length));
            this.forward(length);
            length = 0;
            chunks.push(this.scan_uri_escapes(name, start_mark));
          } else {
            length++;
          }
          char = this.peek(length);
        }
        if (length !== 0) {
          chunks.push(this.prefix(length));
          this.forward(length);
          length = 0;
        }
        if (chunks.length === 0) {
          throw new exports.ScannerError(`while parsing a ${name}`, start_mark, `expected URI but found ${char}`, this.get_mark());
        }
        return chunks.join('');
      }

      /*
      See the specification for details.
      */
      scan_uri_escapes(name, start_mark) {
        var bytes, i, k, mark;
        bytes = [];
        mark = this.get_mark();
        while (this.peek() === '%') {
          this.forward();
          for (k = i = 0; i <= 2; k = ++i) {
            throw new exports.ScannerError(`while scanning a ${name}`, start_mark, `expected URI escape sequence of 2 hexadecimal numbers but found ${this.peek(k)}`, this.get_mark());
          }
          bytes.push(String.fromCharCode(parseInt(this.prefix(2), 16)));
          this.forward(2);
        }
        return bytes.join('');
      }

      /*
      Transforms:
      '\r\n'      :   '\n'
      '\r'        :   '\n'
      '\n'        :   '\n'
      '\x85'      :   '\n'
      '\u2028'    :   '\u2028'
      '\u2029     :   '\u2029'
      default     :   ''
      */
      scan_line_break() {
        var char;
        char = this.peek();
        if (indexOf.call('\r\n\x85', char) >= 0) {
          if (this.prefix(2) === '\r\n') {
            this.forward(2);
          } else {
            this.forward();
          }
          return '\n';
        } else if (indexOf.call('\u2028\u2029', char) >= 0) {
          this.forward();
          return char;
        }
        return '';
      }

    };

    C_LB = '\r\n\x85\u2028\u2029';

    C_WS = '\t ';

    C_NUMBERS = '0123456789';

    ESCAPE_REPLACEMENTS = {
      '0': '\x00',
      'a': '\x07',
      'b': '\x08',
      't': '\x09',
      '\t': '\x09',
      'n': '\x0A',
      'v': '\x0B',
      'f': '\x0C',
      'r': '\x0D',
      'e': '\x1B',
      ' ': '\x20',
      '"': '"',
      '\\': '\\',
      'N': '\x85',
      '_': '\xA0',
      'L': '\u2028',
      'P': '\u2029'
    };

    ESCAPE_CODES = {
      'x': 2,
      'u': 4,
      'U': 8
    };

    ctor = Scanner.prototype.initialise;

    return Scanner;

  }).call(this);

}).call(this);


/***/ }),
/* 45 */
/***/ (function(module, exports) {

(function() {
  this.Token = class Token {
    constructor(start_mark1, end_mark1) {
      this.start_mark = start_mark1;
      this.end_mark = end_mark1;
    }

  };

  this.DirectiveToken = (function() {
    class DirectiveToken extends this.Token {
      constructor(name, value, start_mark, end_mark) {
        super(start_mark, end_mark);
        this.name = name;
        this.value = value;
      }

    };

    DirectiveToken.prototype.id = '<directive>';

    return DirectiveToken;

  }).call(this);

  this.DocumentStartToken = (function() {
    class DocumentStartToken extends this.Token {};

    DocumentStartToken.prototype.id = '<document start>';

    return DocumentStartToken;

  }).call(this);

  this.DocumentEndToken = (function() {
    class DocumentEndToken extends this.Token {};

    DocumentEndToken.prototype.id = '<document end>';

    return DocumentEndToken;

  }).call(this);

  this.StreamStartToken = (function() {
    class StreamStartToken extends this.Token {
      constructor(start_mark, end_mark, encoding) {
        super(start_mark, end_mark);
        this.encoding = encoding;
      }

    };

    StreamStartToken.prototype.id = '<stream start>';

    return StreamStartToken;

  }).call(this);

  this.StreamEndToken = (function() {
    class StreamEndToken extends this.Token {};

    StreamEndToken.prototype.id = '<stream end>';

    return StreamEndToken;

  }).call(this);

  this.BlockSequenceStartToken = (function() {
    class BlockSequenceStartToken extends this.Token {};

    BlockSequenceStartToken.prototype.id = '<block sequence start>';

    return BlockSequenceStartToken;

  }).call(this);

  this.BlockMappingStartToken = (function() {
    class BlockMappingStartToken extends this.Token {};

    BlockMappingStartToken.prototype.id = '<block mapping end>';

    return BlockMappingStartToken;

  }).call(this);

  this.BlockEndToken = (function() {
    class BlockEndToken extends this.Token {};

    BlockEndToken.prototype.id = '<block end>';

    return BlockEndToken;

  }).call(this);

  this.FlowSequenceStartToken = (function() {
    class FlowSequenceStartToken extends this.Token {};

    FlowSequenceStartToken.prototype.id = '[';

    return FlowSequenceStartToken;

  }).call(this);

  this.FlowMappingStartToken = (function() {
    class FlowMappingStartToken extends this.Token {};

    FlowMappingStartToken.prototype.id = '{';

    return FlowMappingStartToken;

  }).call(this);

  this.FlowSequenceEndToken = (function() {
    class FlowSequenceEndToken extends this.Token {};

    FlowSequenceEndToken.prototype.id = ']';

    return FlowSequenceEndToken;

  }).call(this);

  this.FlowMappingEndToken = (function() {
    class FlowMappingEndToken extends this.Token {};

    FlowMappingEndToken.prototype.id = '}';

    return FlowMappingEndToken;

  }).call(this);

  this.KeyToken = (function() {
    class KeyToken extends this.Token {};

    KeyToken.prototype.id = '?';

    return KeyToken;

  }).call(this);

  this.ValueToken = (function() {
    class ValueToken extends this.Token {};

    ValueToken.prototype.id = ':';

    return ValueToken;

  }).call(this);

  this.BlockEntryToken = (function() {
    class BlockEntryToken extends this.Token {};

    BlockEntryToken.prototype.id = '-';

    return BlockEntryToken;

  }).call(this);

  this.FlowEntryToken = (function() {
    class FlowEntryToken extends this.Token {};

    FlowEntryToken.prototype.id = ',';

    return FlowEntryToken;

  }).call(this);

  this.AliasToken = (function() {
    class AliasToken extends this.Token {
      constructor(value, start_mark, end_mark) {
        super(start_mark, end_mark);
        this.value = value;
      }

    };

    AliasToken.prototype.id = '<alias>';

    return AliasToken;

  }).call(this);

  this.AnchorToken = (function() {
    class AnchorToken extends this.Token {
      constructor(value, start_mark, end_mark) {
        super(start_mark, end_mark);
        this.value = value;
      }

    };

    AnchorToken.prototype.id = '<anchor>';

    return AnchorToken;

  }).call(this);

  this.TagToken = (function() {
    class TagToken extends this.Token {
      constructor(value, start_mark, end_mark) {
        super(start_mark, end_mark);
        this.value = value;
      }

    };

    TagToken.prototype.id = '<tag>';

    return TagToken;

  }).call(this);

  this.ScalarToken = (function() {
    class ScalarToken extends this.Token {
      constructor(value, plain, start_mark, end_mark, style) {
        super(start_mark, end_mark);
        this.value = value;
        this.plain = plain;
        this.style = style;
      }

    };

    ScalarToken.prototype.id = '<scalar>';

    return ScalarToken;

  }).call(this);

}).call(this);


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var MarkedYAMLError, events, tokens,
    hasProp = {}.hasOwnProperty;

  events = __webpack_require__(32);

  ({MarkedYAMLError} = __webpack_require__(33));

  tokens = __webpack_require__(45);

  this.ParserError = class ParserError extends MarkedYAMLError {};

  this.Parser = (function() {
    var DEFAULT_TAGS, ctor;

    class Parser {
      constructor() {
        return ctor.apply(this, arguments);
      }

      initialise() {
        this.current_event = null;
        this.yaml_version = null;
        this.tag_handles = {};
        this.states = [];
        this.marks = [];
        return this.state = 'parse_stream_start';
      }

      /*
      Reset the state attributes.
      */
      dispose() {
        this.states = [];
        return this.state = null;
      }

      /*
      Check the type of the next event.
      */
      check_event(...choices) {
        var choice, i, len;
        if (this.current_event === null) {
          if (this.state != null) {
            this.current_event = this[this.state]();
          }
        }
        if (this.current_event !== null) {
          if (choices.length === 0) {
            return true;
          }
          for (i = 0, len = choices.length; i < len; i++) {
            choice = choices[i];
            if (this.current_event instanceof choice) {
              return true;
            }
          }
        }
        return false;
      }

      /*
      Get the next event.
      */
      peek_event() {
        if (this.current_event === null && (this.state != null)) {
          this.current_event = this[this.state]();
        }
        return this.current_event;
      }

      /*
      Get the event and proceed further.
      */
      get_event() {
        var event;
        if (this.current_event === null && (this.state != null)) {
          this.current_event = this[this.state]();
        }
        event = this.current_event;
        this.current_event = null;
        return event;
      }

      // stream ::= STREAM-START implicit_document? explicit_document* STREAM-END
      // implicit_document ::= block_node DOCUMENT-END*
      // explicit_document ::= DIRECTIVE* DOCUMENT-START block_node? DOCUMENT-END*
      /*
      Parse the stream start.
      */
      parse_stream_start() {
        var event, token;
        token = this.get_token();
        event = new events.StreamStartEvent(token.start_mark, token.end_mark);
        // Prepare the next state,
        this.state = 'parse_implicit_document_start';
        return event;
      }

      /*
      Parse an implicit document.
      */
      parse_implicit_document_start() {
        var end_mark, event, start_mark, token;
        if (!this.check_token(tokens.DirectiveToken, tokens.DocumentStartToken, tokens.StreamEndToken)) {
          this.tag_handles = DEFAULT_TAGS;
          token = this.peek_token();
          start_mark = end_mark = token.start_mark;
          event = new events.DocumentStartEvent(start_mark, end_mark, false);
          // Prepare the next state
          this.states.push('parse_document_end');
          this.state = 'parse_block_node';
          return event;
        } else {
          return this.parse_document_start();
        }
      }

      /*
      Parse an explicit document.
      */
      parse_document_start() {
        var end_mark, event, start_mark, tags, token, version;
        while (this.check_token(tokens.DocumentEndToken)) {
          // Parse any extra document end indicators
          this.get_token();
        }
        if (!this.check_token(tokens.StreamEndToken)) {
          start_mark = this.peek_token().start_mark;
          [version, tags] = this.process_directives();
          if (!this.check_token(tokens.DocumentStartToken)) {
            throw new exports.ParserError(`expected '<document start>', but found ${(this.peek_token().id)}`, this.peek_token().start_mark);
          }
          token = this.get_token();
          end_mark = token.end_mark;
          event = new events.DocumentStartEvent(start_mark, end_mark, true, version, tags);
          this.states.push('parse_document_end');
          this.state = 'parse_document_content';
        } else {
          // Parse the end of the stream.
          token = this.get_token();
          event = new events.StreamEndEvent(token.start_mark, token.end_mark);
          if (this.states.length !== 0) {
            throw new Error('assertion error, states should be empty');
          }
          if (this.marks.length !== 0) {
            throw new Error('assertion error, marks should be empty');
          }
          this.state = null;
        }
        return event;
      }

      /*
      Parse the document end.
      */
      parse_document_end() {
        var end_mark, event, explicit, start_mark, token;
        token = this.peek_token();
        start_mark = end_mark = token.start_mark;
        explicit = false;
        if (this.check_token(tokens.DocumentEndToken)) {
          token = this.get_token();
          end_mark = token.end_mark;
          explicit = true;
        }
        event = new events.DocumentEndEvent(start_mark, end_mark, explicit);
        // Prepare next state.
        this.state = 'parse_document_start';
        return event;
      }

      parse_document_content() {
        var event;
        if (this.check_token(tokens.DirectiveToken, tokens.DocumentStartToken, tokens.DocumentEndToken, tokens.StreamEndToken)) {
          event = this.process_empty_scalar(this.peek_token().start_mark);
          this.state = this.states.pop();
          return event;
        } else {
          return this.parse_block_node();
        }
      }

      process_directives() {
        var handle, major, minor, prefix, ref, tag_handles_copy, token, value;
        this.yaml_version = null;
        this.tag_handles = {};
        while (this.check_token(tokens.DirectiveToken)) {
          token = this.get_token();
          if (token.name === 'YAML') {
            if (this.yaml_version !== null) {
              throw new exports.ParserError(null, null, 'found duplicate YAML directive', token.start_mark);
            }
            [major, minor] = token.value;
            if (major !== 1) {
              throw new exports.ParserError(null, null, 'found incompatible YAML document (version 1.* is required)', token.start_mark);
            }
            this.yaml_version = token.value;
          } else if (token.name === 'TAG') {
            [handle, prefix] = token.value;
            if (handle in this.tag_handles) {
              throw new exports.ParserError(null, null, `duplicate tag handle ${handle}`, token.start_mark);
            }
            this.tag_handles[handle] = prefix;
          }
        }
        tag_handles_copy = null;
        ref = this.tag_handles;
        for (handle in ref) {
          if (!hasProp.call(ref, handle)) continue;
          prefix = ref[handle];
          if (tag_handles_copy == null) {
            tag_handles_copy = {};
          }
          tag_handles_copy[handle] = prefix;
        }
        value = [this.yaml_version, tag_handles_copy];
        for (handle in DEFAULT_TAGS) {
          if (!hasProp.call(DEFAULT_TAGS, handle)) continue;
          prefix = DEFAULT_TAGS[handle];
          if (!(prefix in this.tag_handles)) {
            this.tag_handles[handle] = prefix;
          }
        }
        return value;
      }

      // block_node_or_indentless_sequence ::= ALIAS
      //   | properties (block_content | indentless_sequence)?
      //   | block_content
      //   | indentless_block_sequence
      // block_node ::= ALIAS
      //   | properties block_content?
      //   | block_content
      // flow_node ::= ALIAS
      //   | properties flow_content?
      //   | flow_content
      // properties ::= TAG ANCHOR? | ANCHOR TAG?
      // block_content ::= block_collection | flow_collection | SCALAR
      // flow_content ::= flow_collection | SCALAR
      // block_collection ::= block_sequence | block_mapping
      // flow_collection ::= flow_sequence | flow_mapping
      parse_block_node() {
        return this.parse_node(true);
      }

      parse_flow_node() {
        return this.parse_node();
      }

      parse_block_node_or_indentless_sequence() {
        return this.parse_node(true, true);
      }

      parse_node(block = false, indentless_sequence = false) {
        var anchor, end_mark, event, handle, implicit, node, start_mark, suffix, tag, tag_mark, token;
        if (this.check_token(tokens.AliasToken)) {
          token = this.get_token();
          event = new events.AliasEvent(token.value, token.start_mark, token.end_mark);
          this.state = this.states.pop();
        } else {
          anchor = null;
          tag = null;
          start_mark = end_mark = tag_mark = null;
          if (this.check_token(tokens.AnchorToken)) {
            token = this.get_token();
            start_mark = token.start_mark;
            end_mark = token.end_mark;
            anchor = token.value;
            if (this.check_token(tokens.TagToken)) {
              token = this.get_token();
              tag_mark = token.start_mark;
              end_mark = token.end_mark;
              tag = token.value;
            }
          } else if (this.check_token(tokens.TagToken)) {
            token = this.get_token();
            start_mark = tag_mark = token.start_mark;
            end_mark = token.end_mark;
            tag = token.value;
            if (this.check_token(tokens.AnchorToken)) {
              token = this.get_token();
              end_mark = token.end_mark;
              anchor = token.value;
            }
          }
          if (tag !== null) {
            [handle, suffix] = tag;
            if (handle !== null) {
              if (!(handle in this.tag_handles)) {
                throw new exports.ParserError('while parsing a node', start_mark, `found undefined tag handle ${handle}`, tag_mark);
              }
              tag = this.tag_handles[handle] + suffix;
            } else {
              tag = suffix;
            }
          }
          if (start_mark === null) {
            start_mark = end_mark = this.peek_token().start_mark;
          }
          event = null;
          implicit = tag === null || tag === '!';
          if (indentless_sequence && this.check_token(tokens.BlockEntryToken)) {
            end_mark = this.peek_token().end_mark;
            event = new events.SequenceStartEvent(anchor, tag, implicit, start_mark, end_mark);
            this.state = 'parse_indentless_sequence_entry';
          } else {
            if (this.check_token(tokens.ScalarToken)) {
              token = this.get_token();
              end_mark = token.end_mark;
              if ((token.plain && tag === null) || tag === '!') {
                implicit = [true, false];
              } else if (tag === null) {
                implicit = [false, true];
              } else {
                implicit = [false, false];
              }
              event = new events.ScalarEvent(anchor, tag, implicit, token.value, start_mark, end_mark, token.style);
              this.state = this.states.pop();
            } else if (this.check_token(tokens.FlowSequenceStartToken)) {
              end_mark = this.peek_token().end_mark;
              event = new events.SequenceStartEvent(anchor, tag, implicit, start_mark, end_mark, true);
              this.state = 'parse_flow_sequence_first_entry';
            } else if (this.check_token(tokens.FlowMappingStartToken)) {
              end_mark = this.peek_token().end_mark;
              event = new events.MappingStartEvent(anchor, tag, implicit, start_mark, end_mark, true);
              this.state = 'parse_flow_mapping_first_key';
            } else if (block && this.check_token(tokens.BlockSequenceStartToken)) {
              end_mark = this.peek_token().end_mark;
              event = new events.SequenceStartEvent(anchor, tag, implicit, start_mark, end_mark, false);
              this.state = 'parse_block_sequence_first_entry';
            } else if (block && this.check_token(tokens.BlockMappingStartToken)) {
              end_mark = this.peek_token().end_mark;
              event = new events.MappingStartEvent(anchor, tag, implicit, start_mark, end_mark, false);
              this.state = 'parse_block_mapping_first_key';
            } else if (anchor !== null || tag !== null) {
              // Empty scalars are allowed even if a tag or an anchor is specified.
              event = new events.ScalarEvent(anchor, tag, [implicit, false], '', start_mark, end_mark);
              this.state = this.states.pop();
            } else {
              if (block) {
                node = 'block';
              } else {
                node = 'flow';
              }
              token = this.peek_token();
              throw new exports.ParserError(`while parsing a ${node} node`, start_mark, `expected the node content, but found ${token.id}`, token.start_mark);
            }
          }
        }
        return event;
      }

      // block_sequence ::= BLOCK-SEQUENCE-START (BLOCK-ENTRY block_node?)*
      //   BLOCK-END
      parse_block_sequence_first_entry() {
        var token;
        token = this.get_token();
        this.marks.push(token.start_mark);
        return this.parse_block_sequence_entry();
      }

      parse_block_sequence_entry() {
        var event, token;
        if (this.check_token(tokens.BlockEntryToken)) {
          token = this.get_token();
          if (!this.check_token(tokens.BlockEntryToken, tokens.BlockEndToken)) {
            this.states.push('parse_block_sequence_entry');
            return this.parse_block_node();
          } else {
            this.state = 'parse_block_sequence_entry';
            return this.process_empty_scalar(token.end_mark);
          }
        }
        if (!this.check_token(tokens.BlockEndToken)) {
          token = this.peek_token();
          throw new exports.ParserError('while parsing a block collection', this.marks.slice(-1)[0], `expected <block end>, but found ${token.id}`, token.start_mark);
        }
        token = this.get_token();
        event = new events.SequenceEndEvent(token.start_mark, token.end_mark);
        this.state = this.states.pop();
        this.marks.pop();
        return event;
      }

      // indentless_sequence ::= (BLOCK-ENTRY block_node?)+
      parse_indentless_sequence_entry() {
        var event, token;
        if (this.check_token(tokens.BlockEntryToken)) {
          token = this.get_token();
          if (!this.check_token(tokens.BlockEntryToken, tokens.KeyToken, tokens.ValueToken, tokens.BlockEndToken)) {
            this.states.push('parse_indentless_sequence_entry');
            return this.parse_block_node();
          } else {
            this.state = 'parse_indentless_sequence_entry';
            return this.process_empty_scalar(token.end_mark);
          }
        }
        token = this.peek_token();
        event = new events.SequenceEndEvent(token.start_mark, token.start_mark);
        this.state = this.states.pop();
        return event;
      }

      // block_mapping ::= BLOCK-MAPPING-START
      //   ((KEY block_node_or_indentless_sequence?)?
      //   (VALUE block_node_or_indentless_sequence?)?)* BLOCK-END
      parse_block_mapping_first_key() {
        var token;
        token = this.get_token();
        this.marks.push(token.start_mark);
        return this.parse_block_mapping_key();
      }

      parse_block_mapping_key() {
        var event, token;
        if (this.check_token(tokens.KeyToken)) {
          token = this.get_token();
          if (!this.check_token(tokens.KeyToken, tokens.ValueToken, tokens.BlockEndToken)) {
            this.states.push('parse_block_mapping_value');
            return this.parse_block_node_or_indentless_sequence();
          } else {
            this.state = 'parse_block_mapping_value';
            return this.process_empty_scalar(token.end_mark);
          }
        }
        if (!this.check_token(tokens.BlockEndToken)) {
          token = this.peek_token();
          throw new exports.ParserError('while parsing a block mapping', this.marks.slice(-1)[0], `expected <block end>, but found ${token.id}`, token.start_mark);
        }
        token = this.get_token();
        event = new events.MappingEndEvent(token.start_mark, token.end_mark);
        this.state = this.states.pop();
        this.marks.pop();
        return event;
      }

      parse_block_mapping_value() {
        var token;
        if (this.check_token(tokens.ValueToken)) {
          token = this.get_token();
          if (!this.check_token(tokens.KeyToken, tokens.ValueToken, tokens.BlockEndToken)) {
            this.states.push('parse_block_mapping_key');
            return this.parse_block_node_or_indentless_sequence();
          } else {
            this.state = 'parse_block_mapping_key';
            return this.process_empty_scalar(token.end_mark);
          }
        } else {
          this.state = 'parse_block_mapping_key';
          token = this.peek_token();
          return this.process_empty_scalar(token.start_mark);
        }
      }

      // flow_sequence ::= FLOW-SEQUENCE-START
      //   (flow_sequence_entry FLOW-ENTRY)* flow_sequence_entry? FLOW-SEQUENCE-END
      // flow_sequence_entry ::= flow_node | KEY flow_node? (VALUE flow_node?)?

      // Note that while production rules for both flow_sequence_entry and
      // flow_mapping_entry are equal, their interpretations are different.  For
      // `flow_sequence_entry`, the part `KEY flow_node? (VALUE flow_node?)?`
      // generate an inline mapping (set syntax).
      parse_flow_sequence_first_entry() {
        var token;
        token = this.get_token();
        this.marks.push(token.start_mark);
        return this.parse_flow_sequence_entry(true);
      }

      parse_flow_sequence_entry(first = false) {
        var event, token;
        if (!this.check_token(tokens.FlowSequenceEndToken)) {
          if (!first) {
            if (this.check_token(tokens.FlowEntryToken)) {
              this.get_token();
            } else {
              token = this.peek_token();
              throw new exports.ParserError('while parsing a flow sequence', this.marks.slice(-1)[0], `expected ',' or ']', but got ${token.id}`, token.start_mark);
            }
          }
          if (this.check_token(tokens.KeyToken)) {
            token = this.peek_token();
            event = new events.MappingStartEvent(null, null, true, token.start_mark, token.end_mark, true);
            this.state = 'parse_flow_sequence_entry_mapping_key';
            return event;
          } else if (!this.check_token(tokens.FlowSequenceEndToken)) {
            this.states.push('parse_flow_sequence_entry');
            return this.parse_flow_node();
          }
        }
        token = this.get_token();
        event = new events.SequenceEndEvent(token.start_mark, token.end_mark);
        this.state = this.states.pop();
        this.marks.pop();
        return event;
      }

      parse_flow_sequence_entry_mapping_key() {
        var token;
        token = this.get_token();
        if (!this.check_token(tokens.ValueToken, tokens.FlowEntryToken, tokens.FlowSequenceEndToken)) {
          this.states.push('parse_flow_sequence_entry_mapping_value');
          return this.parse_flow_node();
        } else {
          this.state = 'parse_flow_sequence_entry_mapping_value';
          return this.process_empty_scalar(token.end_mark);
        }
      }

      parse_flow_sequence_entry_mapping_value() {
        var token;
        if (this.check_token(tokens.ValueToken)) {
          token = this.get_token();
          if (!this.check_token(tokens.FlowEntryToken, tokens.FlowSequenceEndToken)) {
            this.states.push('parse_flow_sequence_entry_mapping_end');
            return this.parse_flow_node();
          } else {
            this.state = 'parse_flow_sequence_entry_mapping_end';
            return this.process_empty_scalar(token.end_mark);
          }
        } else {
          this.state = 'parse_flow_sequence_entry_mapping_end';
          token = this.peek_token();
          return this.process_empty_scalar(token.start_mark);
        }
      }

      parse_flow_sequence_entry_mapping_end() {
        var token;
        this.state = 'parse_flow_sequence_entry';
        token = this.peek_token();
        return new events.MappingEndEvent(token.start_mark, token.start_mark);
      }

      // flow_mapping ::= FLOW-MAPPING-START (flow_mapping_entry FLOW-ENTRY)*
      //   flow_mapping_entry? FLOW-MAPPING-END
      // flow_mapping_entry ::= flow_node | KEY flow_node? (VALUE flow_node?)?
      parse_flow_mapping_first_key() {
        var token;
        token = this.get_token();
        this.marks.push(token.start_mark);
        return this.parse_flow_mapping_key(true);
      }

      parse_flow_mapping_key(first = false) {
        var event, token;
        if (!this.check_token(tokens.FlowMappingEndToken)) {
          if (!first) {
            if (this.check_token(tokens.FlowEntryToken)) {
              this.get_token();
            } else {
              token = this.peek_token();
              throw new exports.ParserError('while parsing a flow mapping', this.marks.slice(-1)[0], `expected ',' or '}', but got ${token.id}`, token.start_mark);
            }
          }
          if (this.check_token(tokens.KeyToken)) {
            token = this.get_token();
            if (!this.check_token(tokens.ValueToken, tokens.FlowEntryToken, tokens.FlowMappingEndToken)) {
              this.states.push('parse_flow_mapping_value');
              return this.parse_flow_node();
            } else {
              this.state = 'parse_flow_mapping_value';
              return this.process_empty_scalar(token.end_mark);
            }
          } else if (!this.check_token(tokens.FlowMappingEndToken)) {
            this.states.push('parse_flow_mapping_empty_value');
            return this.parse_flow_node();
          }
        }
        token = this.get_token();
        event = new events.MappingEndEvent(token.start_mark, token.end_mark);
        this.state = this.states.pop();
        this.marks.pop();
        return event;
      }

      parse_flow_mapping_value() {
        var token;
        if (this.check_token(tokens.ValueToken)) {
          token = this.get_token();
          if (!this.check_token(tokens.FlowEntryToken, tokens.FlowMappingEndToken)) {
            this.states.push('parse_flow_mapping_key');
            return this.parse_flow_node();
          } else {
            this.state = 'parse_flow_mapping_key';
            return this.process_empty_scalar(token.end_mark);
          }
        } else {
          this.state = 'parse_flow_mapping_key';
          token = this.peek_token();
          return this.process_empty_scalar(token.start_mark);
        }
      }

      parse_flow_mapping_empty_value() {
        this.state = 'parse_flow_mapping_key';
        return this.process_empty_scalar(this.peek_token().start_mark);
      }

      process_empty_scalar(mark) {
        return new events.ScalarEvent(null, null, [true, false], '', mark, mark);
      }

    };

    DEFAULT_TAGS = {
      '!': '!',
      '!!': 'tag:yaml.org,2002:'
    };

    ctor = Parser.prototype.initialise;

    return Parser;

  }).call(this);

}).call(this);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var Lookup, SelectListView;

SelectListView = __webpack_require__(48);

module.exports = Lookup = {
  init: function() {
    this.selectListView = new SelectListView({
      emptyMessage: "No command matches your search.",
      items: [],
      filterKeyForItem: function(item) {
        return item;
      },
      elementForItem: function(item) {
        var element, html;
        element = document.createElement("li");
        html = item;
        element.innerHTML = html;
        return element;
      },
      didConfirmSelection: (item) => {
        var openURL;
        ({openURL} = __webpack_require__(1));
        this.cancel();
        return openURL(item);
      },
      didCancelSelection: () => {
        return this.cancel();
      }
    });
    return this.selectListView.element.classList.add("nsis-command-list");
  },
  dispose: function() {
    this.cancel();
    return this.selectListView.destroy();
  },
  cancel: function() {
    if (this.panel != null) {
      this.panel.destroy();
    }
    this.panel = null;
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
      return this.previouslyFocusedElement = null;
    }
  },
  attach: function() {
    this.previouslyFocusedElement = document.activeElement;
    if (this.panel == null) {
      this.panel = atom.workspace.addModalPanel({
        item: this.selectListView
      });
    }
    this.selectListView.focus();
    return this.selectListView.reset();
  },
  toggle: function() {
    var showHelp;
    if (this.panel != null) {
      return this.cancel();
    } else {
      ({showHelp} = __webpack_require__(64));
      showHelp(this.selectListView);
      return this.attach();
    }
  }
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

const {Disposable, CompositeDisposable, TextEditor} = __webpack_require__(24)
const etch = __webpack_require__(49)
const $ = etch.dom
const fuzzaldrin = __webpack_require__(60)

module.exports = class SelectListView {
  static setScheduler (scheduler) {
    etch.setScheduler(scheduler)
  }

  static getScheduler (scheduler) {
    return etch.getScheduler()
  }

  constructor (props) {
    this.props = props
    if (!this.props.hasOwnProperty('initialSelectionIndex')) {
      this.props.initialSelectionIndex = 0
    }
    if (props.initiallyVisibleItemCount) {
      this.initializeVisibilityObserver()
    }
    this.computeItems(false)
    this.disposables = new CompositeDisposable()
    etch.initialize(this)
    this.element.classList.add('select-list')
    this.disposables.add(this.refs.queryEditor.onDidChange(this.didChangeQuery.bind(this)))
    if (!props.skipCommandsRegistration) {
      this.disposables.add(this.registerAtomCommands())
    }
    const editorElement = this.refs.queryEditor.element
    const didLoseFocus = this.didLoseFocus.bind(this)
    editorElement.addEventListener('blur', didLoseFocus)

    // When clicking the scrollbar of the items list, a blur event will be triggered
    // on the query editor element, but we don't want to treat that as a cancellation.
    // This mousedown listener allows us to detect this case and restore focus to the
    // query editor. This is based on https://stackoverflow.com/a/1480178.
    this.didClickItemsList = false
    this.element.addEventListener('mousedown', event => {
      if (event.target === this.refs.items) {
        this.didClickItemsList = true
      }
    })
    this.disposables.add(new Disposable(() => { editorElement.removeEventListener('blur', didLoseFocus) }))
  }

  initializeVisibilityObserver () {
    this.visibilityObserver = new IntersectionObserver(changes => {
      for (const change of changes) {
        if (change.intersectionRatio > 0) {
          const element = change.target
          this.visibilityObserver.unobserve(element)
          const index = Array.from(this.refs.items.children).indexOf(element)
          if (index >= 0) {
            this.renderItemAtIndex(index)
          }
        }
      }
    })
  }

  focus () {
    this.refs.queryEditor.element.focus()
  }

  didLoseFocus (event) {
    if (this.didClickItemsList || this.element.contains(event.relatedTarget)) {
      this.didClickItemsList = false
      this.refs.queryEditor.element.focus()
    } else if (document.hasFocus()) {
      this.cancelSelection()
    }
  }

  reset () {
    this.refs.queryEditor.setText('')
  }

  destroy () {
    this.disposables.dispose()
    if (this.visibilityObserver) this.visibilityObserver.disconnect()
    return etch.destroy(this)
  }

  registerAtomCommands () {
    return global.atom.commands.add(this.element, {
      'core:move-up': (event) => {
        this.selectPrevious()
        event.stopPropagation()
      },
      'core:move-down': (event) => {
        this.selectNext()
        event.stopPropagation()
      },
      'core:move-to-top': (event) => {
        this.selectFirst()
        event.stopPropagation()
      },
      'core:move-to-bottom': (event) => {
        this.selectLast()
        event.stopPropagation()
      },
      'core:confirm': (event) => {
        this.confirmSelection()
        event.stopPropagation()
      },
      'core:cancel': (event) => {
        this.cancelSelection()
        event.stopPropagation()
      }
    })
  }

  update (props = {}) {
    let shouldComputeItems = false

    if (props.hasOwnProperty('items')) {
      this.props.items = props.items
      shouldComputeItems = true
    }

    if (props.hasOwnProperty('maxResults')) {
      this.props.maxResults = props.maxResults
      shouldComputeItems = true
    }

    if (props.hasOwnProperty('filter')) {
      this.props.filter = props.filter
      shouldComputeItems = true
    }

    if (props.hasOwnProperty('filterQuery')) {
      this.props.filterQuery = props.filterQuery
      shouldComputeItems = true
    }

    if (props.hasOwnProperty('query')) {
      // Items will be recomputed as part of the change event handler, so we
      // don't need to recompute them again at the end of this function.
      this.refs.queryEditor.setText(props.query)
      shouldComputeItems = false
    }

    if (props.hasOwnProperty('selectQuery')) {
      if (props.selectQuery) {
        this.refs.queryEditor.selectAll()
      } else {
        this.refs.queryEditor.clearSelections()
      }
    }

    if (props.hasOwnProperty('order')) {
      this.props.order = props.order
    }

    if (props.hasOwnProperty('emptyMessage')) {
      this.props.emptyMessage = props.emptyMessage
    }

    if (props.hasOwnProperty('errorMessage')) {
      this.props.errorMessage = props.errorMessage
    }

    if (props.hasOwnProperty('infoMessage')) {
      this.props.infoMessage = props.infoMessage
    }

    if (props.hasOwnProperty('loadingMessage')) {
      this.props.loadingMessage = props.loadingMessage
    }

    if (props.hasOwnProperty('loadingBadge')) {
      this.props.loadingBadge = props.loadingBadge
    }

    if (props.hasOwnProperty('itemsClassList')) {
      this.props.itemsClassList = props.itemsClassList
    }

    if (props.hasOwnProperty('initialSelectionIndex')) {
      this.props.initialSelectionIndex = props.initialSelectionIndex
    }

    if (shouldComputeItems) {
      this.computeItems()
    }

    return etch.update(this)
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
      const className = ['list-group'].concat(this.props.itemsClassList || []).join(' ')

      if (this.visibilityObserver) {
        etch.getScheduler().updateDocument(() => {
          Array.from(this.refs.items.children).slice(this.props.initiallyVisibleItemCount).forEach(element => {
            this.visibilityObserver.observe(element)
          })
        })
      }

      this.listItems = this.items.map((item, index) => {
        const selected = this.getSelectedItem() === item
        const visible = !this.props.initiallyVisibleItemCount || index < this.props.initiallyVisibleItemCount
        return $(ListItemView, {
          element: this.props.elementForItem(item, {selected, index, visible}),
          selected: selected,
          onclick: () => this.didClickItem(index)
        })
      })

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
      this.props.didChangeQuery(this.getFilterQuery())
    }

    this.computeItems()
  }

  didClickItem (itemIndex) {
    this.selectIndex(itemIndex)
    this.confirmSelection()
  }

  computeItems (updateComponent) {
    this.listItems = null
    if (this.visibilityObserver) this.visibilityObserver.disconnect()
    const filterFn = this.props.filter || this.fuzzyFilter.bind(this)
    this.items = filterFn(this.props.items.slice(), this.getFilterQuery())
    if (this.props.order) {
      this.items.sort(this.props.order)
    }
    if (this.props.maxResults) {
      this.items = this.items.slice(0, this.props.maxResults)
    }

    this.selectIndex(this.props.initialSelectionIndex, updateComponent)
  }

  fuzzyFilter (items, query) {
    if (query.length === 0) {
      return items
    } else {
      const scoredItems = []
      for (const item of items) {
        const string = this.props.filterKeyForItem ? this.props.filterKeyForItem(item) : item
        let score = fuzzaldrin.score(string, query)
        if (score > 0) {
          scoredItems.push({item, score})
        }
      }
      scoredItems.sort((a, b) => b.score - a.score)
      return scoredItems.map((i) => i.item)
    }
  }

  getSelectedItem () {
    if (this.selectionIndex === undefined) return null
    return this.items[this.selectionIndex]
  }

  renderItemAtIndex (index) {
    const item = this.items[index]
    const selected = this.getSelectedItem() === item
    const component = this.listItems[index].component
    if (this.visibilityObserver) this.visibilityObserver.unobserve(component.element)
    component.update({
      element: this.props.elementForItem(item, {selected, index, visible: true}),
      selected: selected,
      onclick: () => this.didClickItem(index)
    })
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
      index = 0
    } else if (index < 0) {
      index = this.items.length - 1
    }

    const oldIndex = this.selectionIndex

    this.selectionIndex = index
    if (index !== undefined && this.props.didChangeSelection) {
      this.props.didChangeSelection(this.getSelectedItem())
    }

    if (updateComponent) {
      if (this.listItems) {
        if (oldIndex >= 0) this.renderItemAtIndex(oldIndex)
        if (index >= 0) this.renderItemAtIndex(index)
        return etch.getScheduler().getNextUpdatePromise()
      } else {
        return etch.update(this)
      }
    } else {
      return Promise.resolve()
    }
  }

  selectItem (item) {
    const index = this.items.indexOf(item)
    if (index === -1) {
      throw new Error('Cannot select the specified item because it does not exist.')
    } else {
      return this.selectIndex(index)
    }
  }

  confirmSelection () {
    const selectedItem = this.getSelectedItem()
    if (selectedItem != null) {
      if (this.props.didConfirmSelection) {
        this.props.didConfirmSelection(selectedItem)
      }
    } else {
      if (this.props.didConfirmEmptySelection) {
        this.props.didConfirmEmptySelection()
      }
    }
  }

  cancelSelection () {
    if (this.props.didCancelSelection) {
      this.props.didCancelSelection()
    }
  }
}

class ListItemView {
  constructor (props) {
    this.mouseDown = this.mouseDown.bind(this)
    this.mouseUp = this.mouseUp.bind(this)
    this.didClick = this.didClick.bind(this)
    this.selected = props.selected
    this.onclick = props.onclick
    this.element = props.element
    this.element.addEventListener('mousedown', this.mouseDown)
    this.element.addEventListener('mouseup', this.mouseUp)
    this.element.addEventListener('click', this.didClick)
    if (this.selected) {
      this.element.classList.add('selected')
    }
    this.domEventsDisposable = new Disposable(() => {
      this.element.removeEventListener('mousedown', this.mouseDown)
      this.element.removeEventListener('mouseup', this.mouseUp)
      this.element.removeEventListener('click', this.didClick)
    })
    etch.getScheduler().updateDocument(this.scrollIntoViewIfNeeded.bind(this))
  }

  mouseDown (event) {
    event.preventDefault()
  }

  mouseUp (event) {
    event.preventDefault()
  }

  didClick (event) {
    event.preventDefault()
    this.onclick()
  }

  destroy () {
    this.element.remove()
    this.domEventsDisposable.dispose()
  }

  update (props) {
    this.element.removeEventListener('mousedown', this.mouseDown)
    this.element.removeEventListener('mouseup', this.mouseUp)
    this.element.removeEventListener('click', this.didClick)

    this.element.parentNode.replaceChild(props.element, this.element)
    this.element = props.element
    this.element.addEventListener('mousedown', this.mouseDown)
    this.element.addEventListener('mouseup', this.mouseUp)
    this.element.addEventListener('click', this.didClick)
    if (props.selected) {
      this.element.classList.add('selected')
    }

    this.selected = props.selected
    this.onclick = props.onclick
    etch.getScheduler().updateDocument(this.scrollIntoViewIfNeeded.bind(this))
  }

  scrollIntoViewIfNeeded () {
    if (this.selected) {
      this.element.scrollIntoViewIfNeeded(false)
    }
  }
}


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

const dom = __webpack_require__(50)
const render = __webpack_require__(53)
const {initialize, update, updateSync, destroy, destroySync} = __webpack_require__(56)
const {setScheduler, getScheduler} = __webpack_require__(58)

module.exports = {
  dom, render,
  initialize, update, updateSync, destroy, destroySync,
  setScheduler, getScheduler
}


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

const EVENT_LISTENER_PROPS = __webpack_require__(51)
const SVG_TAGS = __webpack_require__(52)

function dom (tag, props, ...children) {
  for (let i = 0; i < children.length;) {
    const child = children[i]
    switch (typeof child) {
      case 'string':
      case 'number':
        children[i] = {text: child}
        i++
        break;

      case 'object':
        if (Array.isArray(child)) {
          children.splice(i, 1, ...child)
        } else if (!child) {
          children.splice(i, 1)
        } else {
          i++
        }
        break;

      default:
        throw new Error(`Invalid child node: ${child}`)
    }
  }

  if (props) {
    for (const propName in props) {
      const eventName = EVENT_LISTENER_PROPS[propName]
      if (eventName) {
        if (!props.on) props.on = {}
        props.on[eventName] = props[propName]
      }
    }

    if (props.class) {
      props.className = props.class
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
]

for (const tagName of HTML_TAGS) {
  dom[tagName] = (props, ...children) => {
    return dom(tagName, props, ...children)
  }
}

for (const tagName of SVG_TAGS) {
  dom[tagName] = (props, ...children) => {
    return dom(tagName, props, ...children)
  }
}


module.exports = dom


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = {
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
}


/***/ }),
/* 52 */
/***/ (function(module, exports) {

// taken from https://github.com/facebook/react/blob/67f8524e88abbf1ac0fd86d38a0477d11fbc7b3e/src/isomorphic/classic/element/ReactDOMFactories.js#L153
module.exports = new Set([
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
])


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

const updateProps = __webpack_require__(54)
const SVG_TAGS = __webpack_require__(52)

function render (virtualNode, options) {
  let domNode
  if (virtualNode.text != null) {
    domNode = document.createTextNode(virtualNode.text)
  } else {
    const {tag, children} = virtualNode
    let {props} = virtualNode

    if (typeof tag === 'function') {
      let ref
      if (props && props.ref) {
        ref = props.ref
      }
      const component = new tag(props || {}, children)
      virtualNode.component = component
      domNode = component.element
      if (options && options.refs && ref) {
        options.refs[ref] = component
      }
    } else if (SVG_TAGS.has(tag)) {
      domNode = document.createElementNS("http://www.w3.org/2000/svg", tag);
      if (children) addChildren(domNode, children, options)
      if (props) updateProps(domNode, null, virtualNode, options)
    } else {
      domNode = document.createElement(tag)
      if (children) addChildren(domNode, children, options)
      if (props) updateProps(domNode, null, virtualNode, options)
    }
  }
  virtualNode.domNode = domNode
  return domNode
}

function addChildren (parent, children, options) {
  for (let i = 0; i < children.length; i++) {
    parent.appendChild(render(children[i], options))
  }
}

module.exports = render


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

const EVENT_LISTENER_PROPS = __webpack_require__(51)
const SVG_TAGS = __webpack_require__(52)
const SVG_ATTRIBUTE_TRANSLATIONS = __webpack_require__(55)
const EMPTY = ''

module.exports = function (domNode, oldVirtualNode, newVirtualNode, options) {
  const oldProps = oldVirtualNode && oldVirtualNode.props
  const newProps = newVirtualNode.props

  let refs, listenerContext
  if (options) {
    refs = options.refs
    listenerContext = options.listenerContext
  }
  updateProps(domNode, oldVirtualNode, oldProps, newVirtualNode, newProps)
  if (refs) updateRef(domNode, oldProps && oldProps.ref, newProps && newProps.ref, refs)
  updateEventListeners(domNode, oldVirtualNode, newVirtualNode, listenerContext)
}

// Using var to avoid "Unsupported phi use of variable" deoptimization in Chrome 56
function updateProps (domNode, oldVirtualNode, oldProps, newVirtualNode, newProps) {
  if (oldProps) {
    for (var name in oldProps) {
      if (name === 'ref' || name === 'on') continue
      if (name in EVENT_LISTENER_PROPS) continue
      if (!newProps || !(name in newProps)) {
        if (name === 'dataset') {
          updateProps(domNode.dataset, null, oldProps && oldProps.dataset, null, null)
        } else if (name !== 'innerHTML' && oldVirtualNode && SVG_TAGS.has(oldVirtualNode.tag)) {
          domNode.removeAttribute(SVG_ATTRIBUTE_TRANSLATIONS.get(name) || name)
        } else {
          // Clear property for objects that don't support deletion (e.g. style
          // or className). If we used null instead of an empty string, the DOM
          // could sometimes stringify the value and mistakenly assign 'null'.
          domNode[name] = EMPTY
          delete domNode[name]
        }
      }
    }
  }

  if (newProps) {
    for (var name in newProps) {
      if (name === 'ref' || name === 'on') continue
      if (name in EVENT_LISTENER_PROPS) continue
      var oldValue = oldProps && oldProps[name]
      var newValue = newProps[name]
      if (name === 'dataset') {
        updateNestedProps(domNode.dataset, oldValue, newValue, false)
      } else if (name === 'style' && typeof newValue !== 'string') {
        if (typeof oldValue === 'string') {
          domNode.style = ''
          oldValue = null
        }
        updateNestedProps(domNode.style, oldValue, newValue, true)
      } else if (name === 'attributes') {
        updateAttributes(domNode, oldValue, newValue)
      } else {
        if (newValue !== oldValue) {
          if (name !== 'innerHTML' && newVirtualNode && SVG_TAGS.has(newVirtualNode.tag)) {
            domNode.setAttribute(SVG_ATTRIBUTE_TRANSLATIONS.get(name) || name, newValue)
          } else if (newVirtualNode && newVirtualNode.tag === 'input'
            && name === 'value' && domNode[name] === newValue) {
            // Do not update `value` of an `input` unless it differs.
            // Every change will reset the cursor position.
          } else {
            domNode[name] = newValue
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
          domProps[name] = EMPTY
        } else {
          delete domProps[name]
        }
      }
    }
  }

  if (newProps) {
    for (var name in newProps) {
      const oldValue = oldProps && oldProps[name]
      const newValue = newProps[name]
      if (newValue !== oldValue) {
        domProps[name] = newValue
      }
    }
  }
}

function updateAttributes (domNode, oldAttributes, newAttributes) {
  if (oldAttributes) {
    for (var name in oldAttributes) {
      if (!newAttributes || !(name in newAttributes)) {
        domNode.removeAttribute(name)
      }
    }
  }

  if (newAttributes) {
    for (var name in newAttributes) {
      const oldValue = oldAttributes && oldAttributes[name]
      const newValue = newAttributes[name]
      if (newValue !== oldValue) {
        domNode.setAttribute(name, newValue)
      }
    }
  }
}

function updateRef (domNode, oldRefName, newRefName, refs) {
  if (newRefName !== oldRefName) {
    if (oldRefName && refs[oldRefName] === domNode) delete refs[oldRefName]
    if (newRefName) refs[newRefName] = domNode
  }
}

function updateEventListeners (domNode, oldVirtualNode, newVirtualNode, listenerContext) {
  const oldListeners = oldVirtualNode && oldVirtualNode.props && oldVirtualNode.props.on
  const newListeners = newVirtualNode.props && newVirtualNode.props.on

  for (const eventName in oldListeners) {
    if (!(newListeners && eventName in newListeners)) {
      let listenerToRemove
      if (oldVirtualNode && oldVirtualNode.boundListeners && oldVirtualNode.boundListeners[eventName]) {
        listenerToRemove = oldVirtualNode.boundListeners[eventName]
      } else {
        listenerToRemove = oldListeners[eventName]
      }
      domNode.removeEventListener(eventName, listenerToRemove)
    }
  }

  for (const eventName in newListeners) {
    const oldListener = oldListeners && oldListeners[eventName]
    const newListener = newListeners[eventName]

    if (newListener !== oldListener) {
      if (oldListener) {
        let listenerToRemove
        if (oldVirtualNode && oldVirtualNode.boundListeners && oldVirtualNode.boundListeners[eventName]) {
          listenerToRemove = oldVirtualNode.boundListeners[eventName]
        } else {
          listenerToRemove = oldListener
        }
        domNode.removeEventListener(eventName, listenerToRemove)
      }
      if (newListener) {
        let listenerToAdd
        if (listenerContext) {
          listenerToAdd = newListener.bind(listenerContext)
          if (!newVirtualNode.boundListeners) newVirtualNode.boundListeners = {}
          newVirtualNode.boundListeners[eventName] = listenerToAdd
        } else {
          listenerToAdd = newListener
        }
        domNode.addEventListener(eventName, listenerToAdd)
      }
    }
  }
}


/***/ }),
/* 55 */
/***/ (function(module, exports) {

// Based on https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
module.exports = new Map([
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
])


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

const render = __webpack_require__(53)
const patch = __webpack_require__(57)
const {getScheduler} = __webpack_require__(58)

const componentsWithPendingUpdates = new WeakSet()
let syncUpdatesInProgressCounter = 0
let syncDestructionsInProgressCounter = 0

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

  let virtualNode = component.render()
  if (!isValidVirtualNode(virtualNode)) {
    let namePart = component.constructor && component.constructor.name ? ' in ' + component.constructor.name : ''
    throw new Error('invalid falsy value ' + virtualNode + ' returned from render()' + namePart)
  }

  component.refs = {}
  component.virtualNode = virtualNode
  component.element = render(component.virtualNode, {
    refs: component.refs, listenerContext: component
  })
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
    updateSync(component, replaceNode)
    return Promise.resolve()
  }

  let scheduler = getScheduler()

  if (!componentsWithPendingUpdates.has(component)) {
    componentsWithPendingUpdates.add(component)
    scheduler.updateDocument(function () {
      componentsWithPendingUpdates.delete(component)
      updateSync(component, replaceNode)
    })
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

  let newVirtualNode = component.render()
  if (!isValidVirtualNode(newVirtualNode)) {
    const namePart = component.constructor && component.constructor.name ? ' in ' + component.constructor.name : ''
    throw new Error('invalid falsy value ' + newVirtualNode + ' returned from render()' + namePart)
  }

  syncUpdatesInProgressCounter++
  let oldVirtualNode = component.virtualNode
  let oldDomNode = component.element
  let newDomNode = patch(oldVirtualNode, newVirtualNode, {
    refs: component.refs,
    listenerContext: component
  })
  component.virtualNode = newVirtualNode
  if (newDomNode !== oldDomNode && !replaceNode) {
    throw new Error('The root node type changed on update, but the update was performed with the replaceNode option set to false')
  } else {
    component.element = newDomNode
  }

  // We can safely perform additional writes after a DOM update synchronously,
  // but any reads need to be deferred until all writes are completed to avoid
  // DOM thrashing. Requested reads occur at the end of the the current frame
  // if this method was invoked via the scheduler. Otherwise, if `updateSync`
  // was invoked outside of the scheduler, the default scheduler will defer
  // reads until the next animation frame.
  if (typeof component.writeAfterUpdate === 'function') {
    component.writeAfterUpdate()
  }
  if (typeof component.readAfterUpdate === 'function') {
    getScheduler().readDocument(function () {
      component.readAfterUpdate()
    })
  }

  syncUpdatesInProgressCounter--
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
    destroySync(component, removeNode)
    return Promise.resolve()
  }

  let scheduler = getScheduler()
  scheduler.updateDocument(function () {
    destroySync(component, removeNode)
  })
  return scheduler.getNextUpdatePromise()
}

// A synchronous version of `destroy`.
//
// Note that we track whether `destroy` calls are in progress and only remove
// the element if we are not a nested call.
function destroySync (component, removeNode=true) {
  syncDestructionsInProgressCounter++
  destroyChildComponents(component.virtualNode)
  if (syncDestructionsInProgressCounter === 1 && removeNode) component.element.remove()
  syncDestructionsInProgressCounter--
}

function destroyChildComponents(virtualNode) {
  if (virtualNode.component && typeof virtualNode.component.destroy === 'function') {
    virtualNode.component.destroy()
  } else if (virtualNode.children) {
    virtualNode.children.forEach(destroyChildComponents)
  }
}

module.exports = {
  initialize,
  update, updateSync,
  destroy, destroySync
}


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

const render = __webpack_require__(53)
const updateProps = __webpack_require__(54)

function patch (oldVirtualNode, newVirtualNode, options) {
  const oldNode = oldVirtualNode.domNode

  if (newVirtualNode === oldVirtualNode) return oldNode

  if (virtualNodesAreEqual(oldVirtualNode, newVirtualNode)) {
    let newNode
    if (newVirtualNode.text != null) {
      oldNode.nodeValue = newVirtualNode.text
      newNode = oldNode
    } else {
      if (typeof newVirtualNode.tag === 'function') {
        newNode = updateComponent(oldVirtualNode, newVirtualNode, options)
      } else {
        updateChildren(oldNode, oldVirtualNode.children, newVirtualNode.children, options)
        updateProps(oldNode, oldVirtualNode, newVirtualNode, options)
        newNode = oldNode
      }
    }
    newVirtualNode.domNode = newNode
    if (newNode !== oldNode && oldNode.parentNode) {
      oldNode.parentNode.replaceChild(newNode, oldNode)
    }
    return newNode
  } else {
    const parentNode = oldNode.parentNode
    const nextSibling = oldNode.nextSibling
    removeVirtualNode(oldVirtualNode, options && options.refs)
    const newNode = render(newVirtualNode, options)
    if (parentNode) parentNode.insertBefore(newNode, nextSibling)
    newVirtualNode.domNode = newNode
    return newNode
  }
}

function updateComponent (oldVirtualNode, newVirtualNode, options) {
  const {component, props: oldProps} = oldVirtualNode
  let {props: newProps, children: newChildren} = newVirtualNode
  newVirtualNode.component = component
  if (options && options.refs) {
    const refs = options.refs
    const oldRefName = oldProps && oldProps.ref
    const newRefName = newProps && newProps.ref
    if (newRefName !== oldRefName) {
      if (oldRefName && refs[oldRefName] === component) delete refs[oldRefName]
      if (newRefName) refs[newRefName] = component
    }
  }
  component.update(newProps || {}, newChildren)
  return component.element
}

let mapPool = [new Map(), new Map(), new Map(), new Map()]

function updateChildren (parentElement, oldChildren, newChildren, options) {
  var oldStartIndex = 0
  var oldEndIndex = oldChildren.length - 1
  var oldStartChild = oldChildren[0]
  var oldEndChild = oldChildren[oldEndIndex]

  var newStartIndex = 0
  var newEndIndex = newChildren.length - 1
  var newStartChild = newChildren[0]
  var newEndChild = newChildren[newEndIndex]

  var oldIndicesByKey

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (!oldStartChild) {
      oldStartChild = oldChildren[++oldStartIndex]
    } else if (!oldEndChild) {
      oldEndChild = oldChildren[--oldEndIndex]
    } else if (virtualNodesAreEqual(oldStartChild, newStartChild)) {
      patch(oldStartChild, newStartChild, options)
      oldStartChild = oldChildren[++oldStartIndex]
      newStartChild = newChildren[++newStartIndex]
    } else if (virtualNodesAreEqual(oldEndChild, newEndChild)) {
      patch(oldEndChild, newEndChild, options)
      oldEndChild = oldChildren[--oldEndIndex]
      newEndChild = newChildren[--newEndIndex]
    } else if (virtualNodesAreEqual(oldStartChild, newEndChild)) {
      patch(oldStartChild, newEndChild, options)
      parentElement.insertBefore(oldStartChild.domNode, oldEndChild.domNode.nextSibling)
      oldStartChild = oldChildren[++oldStartIndex]
      newEndChild = newChildren[--newEndIndex]
    } else if (virtualNodesAreEqual(oldEndChild, newStartChild)) {
      patch(oldEndChild, newStartChild, options)
      parentElement.insertBefore(oldEndChild.domNode, oldStartChild.domNode);
      oldEndChild = oldChildren[--oldEndIndex]
      newStartChild = newChildren[++newStartIndex]
    } else {
      if (!oldIndicesByKey) {
        if (mapPool.length > 0) {
          oldIndicesByKey = mapPool.pop()
          oldIndicesByKey.clear()
        } else {
          oldIndicesByKey = new Map()
        }
        mapOldKeysToIndices(oldIndicesByKey, oldChildren, oldStartIndex, oldEndIndex)
      }

      var key = getKey(newStartChild)
      var oldIndex = key ? oldIndicesByKey.get(key) : null
      if (oldIndex == null) {
        parentElement.insertBefore(render(newStartChild, options), oldStartChild.domNode)
        newStartChild = newChildren[++newStartIndex]
      } else {
        var oldChildToMove = oldChildren[oldIndex]
        patch(oldChildToMove, newStartChild, options)
        oldChildren[oldIndex] = undefined
        parentElement.insertBefore(oldChildToMove.domNode, oldStartChild.domNode)
        newStartChild = newChildren[++newStartIndex]
      }
    }
  }

  if (oldStartIndex > oldEndIndex) {
    var subsequentElement = newChildren[newEndIndex + 1] ? newChildren[newEndIndex + 1].domNode : null
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      parentElement.insertBefore(render(newChildren[i], options), subsequentElement)
    }
  } else if (newStartIndex > newEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      var child = oldChildren[i]
      if (child) removeVirtualNode(child, options && options.refs)
    }
  }

  if (oldIndicesByKey) mapPool.push(oldIndicesByKey)
}

function removeVirtualNode (virtualNode, refs, removeDOMNode = true) {
  const {domNode, props, children, component} = virtualNode
  const ref = props && props.ref
  if (component) {
    if (refs && ref && refs[ref] === component) delete refs[ref]
    if (component.destroy) component.destroy()
  } else {
    if (refs && ref && refs[ref] === domNode) delete refs[ref]
    if (children) {
      for (let i = 0; i < children.length; i++) {
        removeVirtualNode(children[i], refs, false)
      }
    }
  }

  if (removeDOMNode) domNode.remove()
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
    const key = getKey(children[i])
    if (key) oldIndicesByKey.set(key, i)
  }
  return oldIndicesByKey
}

module.exports = patch


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

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

const DefaultScheduler = __webpack_require__(59)

let scheduler = null

module.exports.setScheduler = function setScheduler (customScheduler) {
  scheduler = customScheduler
}

module.exports.getScheduler = function getScheduler () {
  if (!scheduler) {
    scheduler = new DefaultScheduler()
  }
  return scheduler
}


/***/ }),
/* 59 */
/***/ (function(module, exports) {

// If the scheduler is not customized via `etch.setScheduler`, an instance of
// this class will be used to schedule updates to the document. The
// `updateDocument` method accepts functions to be run at some point in the
// future, then runs them on the next animation frame.
module.exports = class DefaultScheduler {
  constructor () {
    this.updateRequests = []
    this.readRequests = []
    this.pendingAnimationFrame = null
    this.performUpdates = this.performUpdates.bind(this)
    this.performingUpdates = false
  }

  // Enqueues functions that write to the DOM to be performed on the next
  // animation frame. Functions passed to this method should *never* read from
  // the DOM, because that could cause synchronous reflows.
  updateDocument (fn) {
    this.updateRequests.push(fn)
    if (!this.pendingAnimationFrame) {
      this.pendingAnimationFrame = window.requestAnimationFrame(this.performUpdates)
    }
  }

  readDocument (fn) {
    this.readRequests.push(fn)
    if (!this.pendingAnimationFrame) {
      this.pendingAnimationFrame = window.requestAnimationFrame(this.performUpdates)
    }
  }

  // Returns a promise that will resolve at the end of the next update cycle,
  // after all the functions passed to `updateDocument` and `updateDocumentSync`
  // have been run.
  getNextUpdatePromise () {
    if (!this.nextUpdatePromise) {
      this.nextUpdatePromise = new Promise(resolve => {
        this.resolveNextUpdatePromise = resolve
      })
    }
    return this.nextUpdatePromise
  }

  // Performs all the pending document updates. If running these update
  // functions causes *more* updates to be enqueued, they are run synchronously
  // in this update cycle without waiting for another frame.
  performUpdates () {
    while (this.updateRequests.length > 0) {
      this.updateRequests.shift()()
    }

    // We don't clear the pending frame until all update requests are processed.
    // This ensures updates requested within other updates are processed in the
    // current frame.
    this.pendingAnimationFrame = null

    // Now that updates are processed, we can perform all pending document reads
    // without the risk of interleaving them with writes and causing layout
    // thrashing.
    while (this.readRequests.length > 0) {
      this.readRequests.shift()()
    }

    if (this.nextUpdatePromise) {
      let resolveNextUpdatePromise = this.resolveNextUpdatePromise
      this.nextUpdatePromise = null
      this.resolveNextUpdatePromise = null
      resolveNextUpdatePromise()
    }
  }
}


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var PathSeparator, SpaceRegex, filter, matcher, scorer;

  scorer = __webpack_require__(61);

  filter = __webpack_require__(62);

  matcher = __webpack_require__(63);

  PathSeparator = __webpack_require__(4).sep;

  SpaceRegex = /\ /g;

  module.exports = {
    filter: function(candidates, query, options) {
      var queryHasSlashes;
      if (query) {
        queryHasSlashes = query.indexOf(PathSeparator) !== -1;
        query = query.replace(SpaceRegex, '');
      }
      return filter(candidates, query, queryHasSlashes, options);
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
      score = scorer.score(string, query);
      if (!queryHasSlashes) {
        score = scorer.basenameScore(string, query, score);
      }
      return score;
    },
    match: function(string, query) {
      var baseMatches, index, matches, queryHasSlashes, seen, _i, _ref, _results;
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
      matches = matcher.match(string, query);
      if (!queryHasSlashes) {
        baseMatches = matcher.basenameMatch(string, query);
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

}).call(this);


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var PathSeparator, queryIsLastPathSegment;

  PathSeparator = __webpack_require__(4).sep;

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

}).call(this);


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var pluckCandidates, scorer, sortCandidates;

  scorer = __webpack_require__(61);

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
        score = scorer.score(string, query, queryHasSlashes);
        if (!queryHasSlashes) {
          score = scorer.basenameScore(string, query, score);
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

}).call(this);


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var PathSeparator;

  PathSeparator = __webpack_require__(4).sep;

  exports.basenameMatch = function(string, query) {
    var base, index, lastCharacter, slashCount;
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
    return exports.match(base, query, string.length - base.length);
  };

  exports.match = function(string, query, stringOffset) {
    var character, indexInQuery, indexInString, lowerCaseIndex, matches, minIndex, queryLength, stringLength, upperCaseIndex, _i, _ref, _results;
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

}).call(this);


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var Makensis;

module.exports = Makensis = {
  compile: function(strictMode, consolePanel) {
    var clearConsole, detectOutfile, editor, getConfig, getMakensisPath, getPrefix, isWindowsCompatible, notification, notifyOnCompletion, scope, script, spawn;
    ({spawn} = __webpack_require__(12));
    ({clearConsole, detectOutfile, getConfig, getMakensisPath, getPrefix, isWindowsCompatible, notifyOnCompletion} = __webpack_require__(1));
    editor = atom.workspace.getActiveTextEditor();
    if (editor == null) {
      return atom.notifications.addWarning("**language-nsis**: No active editor", {
        dismissable: false
      });
    }
    script = editor.getPath();
    scope = editor.getGrammar().scopeName;
    if (getConfig("allowHeaderCompilation") === false && !script.endsWith("nsi")) {
      notification = atom.notifications.addWarning("Compiling header files is blocked by default. You can allow it in the package settings.", {
        dismissable: true,
        buttons: [
          {
            text: "Open Settings",
            className: "icon icon-gear",
            onDidClick: function() {
              atom.workspace.open("atom://config/packages/language-nsis",
          {
                pending: true,
                searchAllPanes: true
              });
              return notification.dismiss();
            }
          },
          {
            text: "Cancel",
            onDidClick: function() {
              return notification.dismiss();
            }
          }
        ]
      });
      return atom.beep();
    }
    if ((script != null) && scope.startsWith("source.nsis")) {
      return editor.save().then(function() {
        return getMakensisPath(function(pathToMakensis) {
          var compilerArguments, hasWarning, makensis, outFile, prefix, ref;
          prefix = getPrefix();
          compilerArguments = (ref = getConfig("compilerArguments")) != null ? ref.trim().split(" ") : void 0;
          // only add WX flag if not already specified
          if (strictMode === true && compilerArguments.indexOf(`${prefix}WX`) === -1) {
            compilerArguments.push(`${prefix}WX`);
          }
          compilerArguments.push(script);
          clearConsole(consolePanel);
          // Let's go
          makensis = spawn(pathToMakensis, compilerArguments);
          hasWarning = false;
          outFile = "";
          makensis.stdout.on("data", function(line) {
            if (hasWarning === false && line.indexOf("warning: ") !== -1) {
              hasWarning = true;
              try {
                if (getConfig("alwaysShowOutput")) {
                  consolePanel.warn(line.toString());
                }
              } catch (error) {
                console.warn(line.toString());
              }
            } else {
              try {
                if (getConfig("alwaysShowOutput")) {
                  consolePanel.log(line.toString());
                }
              } catch (error) {
                console.log(line.toString());
              }
            }
            if (outFile === "") {
              return outFile = detectOutfile(line);
            }
          });
          makensis.stderr.on("data", function(line) {
            try {
              return consolePanel.error(line.toString());
            } catch (error) {
              return console.error(line.toString());
            }
          });
          return makensis.on("close", function(errorCode) {
            var openButton;
            if (errorCode === 0) {
              openButton = isWindowsCompatible() === true ? "Run" : "";
              if (hasWarning === true) {
                if (getConfig("showBuildNotifications")) {
                  return notifyOnCompletion("warning", openButton, outFile);
                }
              }
              if (getConfig("showBuildNotifications")) {
                return notifyOnCompletion("success", openButton, outFile);
              }
            }
            if (getConfig("showBuildNotifications")) {
              return atom.notifications.addError("Compile Error", {
                dismissable: false
              });
            }
          });
        });
      });
    } else {
      // Something went wrong
      return atom.beep();
    }
  },
  showVersion: function(consolePanel) {
    var clearConsole, getConfig, getMakensisPath, getPrefix, spawn, version;
    ({spawn} = __webpack_require__(12));
    ({clearConsole, getConfig, getMakensisPath, getPrefix} = __webpack_require__(1));
    ({version} = __webpack_require__(65));
    return getMakensisPath(function(pathToMakensis) {
      clearConsole(consolePanel);
      return version({
        pathToMakensis: pathToMakensis
      }).then(function(output) {
        if (getConfig("compilerOutput") === "Console") {
          try {
            consolePanel.log(`makensis ${output.stdout} (${pathToMakensis})`);
          } catch (error) {
            console.info(`makensis ${output.stdout} (${pathToMakensis})`);
            atom.getCurrentWindow().openDevTools();
          }
        } else {
          atom.notifications.addInfo("**language-nsis**", {
            detail: `makensis ${output.stdout} (${pathToMakensis})`,
            dismissable: true
          });
        }
      }).catch(function(output) {
        return console.error(output);
      });
    });
  },
  showCompilerFlags: function(consolePanel) {
    var clearConsole, flagFormat, getConfig, getMakensisPath, getPrefix, hdrInfo, logCompilerFlags, showFlagsAsObject, spawn;
    ({spawn} = __webpack_require__(12));
    ({clearConsole, getConfig, getMakensisPath, getPrefix, logCompilerFlags} = __webpack_require__(1));
    ({hdrInfo} = __webpack_require__(65));
    showFlagsAsObject = getConfig("showFlagsAsObject");
    if (showFlagsAsObject) {
      flagFormat = " (JSON)";
    }
    return getMakensisPath(function(pathToMakensis) {
      clearConsole(consolePanel);
      return hdrInfo({
        pathToMakensis: pathToMakensis,
        json: showFlagsAsObject
      }).then(function(output) {
        return logCompilerFlags(output, showFlagsAsObject, consolePanel);
      }).catch(function(output) {
        // fallback for legacy NSIS
        return logCompilerFlags(output, showFlagsAsObject, consolePanel);
      });
    });
  },
  showHelp: function(selectListView) {
    var clearConsole, cmdHelp, getConfig, getMakensisPath, getPrefix, logCompilerFlags, spawn;
    ({spawn} = __webpack_require__(12));
    ({clearConsole, getConfig, getMakensisPath, getPrefix, logCompilerFlags} = __webpack_require__(1));
    ({cmdHelp} = __webpack_require__(65));
    return getMakensisPath(function(pathToMakensis) {
      return cmdHelp('', {
        pathToMakensis: pathToMakensis,
        json: true
      }).then(function(output) {
        return selectListView.update({
          items: Object.keys(output.stdout)
        });
      }).catch(function(output) {
        // fallback for legacy NSIS
        return selectListView.update({
          items: Object.keys(output.stdout)
        });
      });
    });
  }
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
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
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(66);
/**
 * Returns usage information for a command, or list all commands
 * @param command - an NSIS command
 * @param options - compiler options
 * @returns - usage description
 */
var cmdHelp = function (command, options) {
    if (command === void 0) { command = ''; }
    if (options === void 0) { options = {}; }
    options = __assign({}, options, { verbose: 0 });
    var p = util_1.mapArguments(['-CMDHELP'], options);
    if (typeof command !== 'undefined' && typeof command !== 'object' && command !== '') {
        p.args.push(command);
    }
    return util_1.spawnMakensis(p.cmd, p.args, p.opts);
};
exports.cmdHelp = cmdHelp;
/**
 * Returns usage information for a command, or list all commands
 * @param command - an NSIS command
 * @param options - compiler options
 * @returns - usage description
 */
var cmdHelpSync = function (command, options) {
    if (command === void 0) { command = ''; }
    if (options === void 0) { options = {}; }
    options = __assign({}, options, { verbose: 0 });
    var p = util_1.mapArguments(['-CMDHELP'], options);
    if (typeof command !== 'undefined' && typeof command !== 'object' && command !== '') {
        p.args.push(command);
    }
    return util_1.spawnMakensisSync(p.cmd, p.args, p.opts);
};
exports.cmdHelpSync = cmdHelpSync;
/**
 * Returns information about which options were used to compile MakeNSIS
 * @param options - compiler options
 * @returns - compiler options
 */
var hdrInfo = function (options) {
    if (options === void 0) { options = {}; }
    options = __assign({}, options, { verbose: 0 });
    var p = util_1.mapArguments(['-HDRINFO'], options);
    return util_1.spawnMakensis(p.cmd, p.args, p.opts);
};
exports.hdrInfo = hdrInfo;
/**
 * Returns information about which options were used to compile MakeNSIS
 * @returns - compiler options
 */
var hdrInfoSync = function (options) {
    if (options === void 0) { options = {}; }
    options = __assign({}, options, { verbose: 0 });
    var p = util_1.mapArguments(['-HDRINFO'], options);
    return util_1.spawnMakensisSync(p.cmd, p.args, p.opts);
};
exports.hdrInfoSync = hdrInfoSync;
/**
 * Compile specified script with MakeNSIS
 * @param} script - path to NSIS script
 * @param options - compiler options
 */
var compile = function (script, options) {
    if (options === void 0) { options = {}; }
    var p = util_1.mapArguments([], options);
    if (script) {
        if (p.cmd === 'wine') {
            p.args.push('--');
        }
        p.args.push(script);
    }
    if (typeof options.postExecute !== 'undefined') {
        if (typeof options.postExecute === 'string') {
            p.args.push("-X" + options.postExecute);
        }
        else {
            options.postExecute.forEach(function (key) {
                p.args.push("-X" + key);
            });
        }
    }
    return util_1.spawnMakensis(p.cmd, p.args, p.opts);
};
exports.compile = compile;
/**
 * Compile specified script with MakeNSIS
 * @param script - path to NSIS script
 * @param options - compiler options
 */
var compileSync = function (script, options) {
    if (options === void 0) { options = {}; }
    var p = util_1.mapArguments([], options);
    if (script) {
        if (p.cmd === 'wine') {
            p.args.push('--');
        }
        p.args.push(script);
    }
    if (typeof options.postExecute !== 'undefined') {
        if (typeof options.postExecute === 'string') {
            p.args.push("-X" + options.postExecute);
        }
        else {
            options.postExecute.forEach(function (key) {
                p.args.push("-X" + key);
            });
        }
    }
    return util_1.spawnMakensisSync(p.cmd, p.args, p.opts);
};
exports.compileSync = compileSync;
/**
 * Returns version of MakeNSIS
 * @param options - compiler options
 * @returns - compiler version
 */
var version = function (options) {
    if (options === void 0) { options = {}; }
    options = __assign({}, options, { verbose: 0 });
    var p = util_1.mapArguments(['-VERSION'], options);
    return util_1.spawnMakensis(p.cmd, p.args, p.opts);
};
exports.version = version;
/**
 * Returns version of MakeNSIS
 * @param options - compiler options
 * @returns - compiler version
 */
var versionSync = function (options) {
    if (options === void 0) { options = {}; }
    options = __assign({}, options, { verbose: 0 });
    var p = util_1.mapArguments(['-VERSION'], options);
    return util_1.spawnMakensisSync(p.cmd, p.args, p.opts);
};
exports.versionSync = versionSync;
/**
 * Returns MakeNSIS software license
 * @param options - compiler options
 * @returns - compiler license
 */
var license = function (options) {
    if (options === void 0) { options = {}; }
    var p = util_1.mapArguments(['-LICENSE'], options);
    return util_1.spawnMakensis(p.cmd, p.args, p.opts);
};
exports.license = license;
/**
 * Returns MakeNSIS software license
 * @param options - compiler options
 * @returns - compiler license
 */
var licenseSync = function (options) {
    if (options === void 0) { options = {}; }
    var p = util_1.mapArguments(['-LICENSE'], options);
    return util_1.spawnMakensisSync(p.cmd, p.args, p.opts);
};
exports.licenseSync = licenseSync;
/**
 * Returns NSIS directory
 * @param options - compiler options
 * @returns - compiler version
 */
var nsisDir = function (options) {
    if (options === void 0) { options = {}; }
    var hdrOptions = __assign({}, options, { json: true });
    var output = hdrInfo(hdrOptions);
    return Promise.resolve(output)
        .then(function (hdrinfo) {
        if (options.json === true) {
            return util_1.objectify(hdrinfo.stdout.defined_symbols.NSISDIR, 'nsisdir');
        }
        return hdrinfo.stdout.defined_symbols.NSISDIR;
    })
        .catch(function (hdrinfo) {
        // NSIS < 3.03
        if (options.json === true) {
            return util_1.objectify(hdrinfo.stdout.defined_symbols.NSISDIR, 'nsisdir');
        }
        return hdrinfo.stdout.defined_symbols.NSISDIR;
    });
};
exports.nsisDir = nsisDir;
/**
 * Returns NSIS directory
 * @param options - compiler options
 * @returns - compiler version
 */
var nsisDirSync = function (options) {
    if (options === void 0) { options = {}; }
    var hdrOptions = __assign({}, options, { json: true });
    var hdrinfo = hdrInfoSync(hdrOptions);
    if (options.json === true) {
        return util_1.objectify(hdrinfo.stdout.defined_symbols.NSISDIR, 'nsisdir');
    }
    return hdrinfo.stdout.defined_symbols.NSISDIR;
};
exports.nsisDirSync = nsisDirSync;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var charsets_1 = __webpack_require__(67);
var child_process_1 = __webpack_require__(12);
var os_1 = __webpack_require__(13);
var mapArguments = function (args, options) {
    var cmd = (typeof options.pathToMakensis !== 'undefined' && options.pathToMakensis !== '') ? options.pathToMakensis : 'makensis';
    var p = {
        cmd: cmd,
        args: args,
        opts: options
    };
    if (os_1.platform() !== 'win32' && options.wine === true) {
        p.cmd = 'wine';
        p.args.unshift(cmd);
    }
    if (typeof options.cwd !== 'undefined' && options.cwd !== '') {
        p.opts.cwd = options.cwd;
    }
    if (typeof options.detached !== 'undefined') {
        p.opts.detached = options.detached;
    }
    if (typeof options.shell !== 'undefined' && options.shell !== '') {
        p.opts.shell = options.shell;
    }
    // return unless compile command
    if (args.length > 1 || args.includes('-CMDHELP')) {
        return p;
    }
    if (typeof options.define !== 'undefined') {
        Object.keys(options.define).forEach(function (key) {
            p.args.push("-D" + key + "=" + options.define[key]);
        });
    }
    if (typeof options.preExecute !== 'undefined') {
        if (typeof options.preExecute === 'string') {
            p.args.push("-X" + options.preExecute);
        }
        else {
            options.preExecute.forEach(function (key) {
                p.args.push("-X" + key);
            });
        }
        // Temporary Fallback
    }
    else if (typeof options.execute !== 'undefined') {
        if (typeof options.execute === 'string') {
            p.args.push("-X" + options.execute);
        }
        else {
            options.execute.forEach(function (key) {
                p.args.push("-X" + key);
            });
        }
    }
    if (options.nocd === true || options.noCD === true) {
        p.args.push('-NOCD');
    }
    if (options.noconfig === true || options.noConfig === true) {
        p.args.push('-NOCONFIG');
    }
    if (options.pause === true) {
        p.args.push('-PAUSE');
    }
    if (options.strict === true || options.wx === true) {
        p.args.push('-WX');
    }
    if ((typeof options.inputcharset !== 'undefined' && charsets_1.input.includes(options.inputcharset)) || (typeof options.inputCharset !== 'undefined' && charsets_1.input.includes(options.inputCharset))) {
        p.args.push('-INPUTCHARSET', (options.inputcharset || options.inputCharset));
    }
    if (os_1.platform() === 'win32') {
        if ((typeof options.outputcharset !== 'undefined' && charsets_1.output.includes(options.outputcharset)) || (typeof options.outputCharset !== 'undefined' && charsets_1.output.includes(options.outputCharset))) {
            p.args.push('-OUTPUTCHARSET', (options.outputcharset || options.outputCharset));
        }
    }
    if (options.ppo === true || options.PPO === true) {
        p.args.push('-PPO');
    }
    if (options.safeppo === true || options.safePPO === true) {
        p.args.push('-SAFEPPO');
    }
    if (os_1.platform() === 'win32' && Number.isInteger(options.priority) && options.priority >= 0 && options.priority <= 5) {
        p.args.push("-P" + options.priority);
    }
    if (Number.isInteger(options.verbose) && options.verbose >= 0 && options.verbose <= 4) {
        p.args.push("-V" + options.verbose);
    }
    return p;
};
exports.mapArguments = mapArguments;
var stringify = function (data) {
    return data.toString().trim();
};
var isInteger = function (x) {
    return x % 2 === 0;
};
var hasWarnings = function (line) {
    var match = line.match(/(\d+) warnings?\:/);
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
exports.objectify = objectify;
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
        var obj = {};
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
    var objSizes = {};
    output['sizes'] = tableSizes;
    // Split symbols
    symbols.forEach(function (symbol) {
        var pair = symbol.split('=');
        var obj = {};
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
exports.objectifyFlags = objectifyFlags;
var splitLines = function (input, opts) {
    var lineBreak = (os_1.platform() === 'win32' || opts.wine === true) ? '\r\n' : '\n';
    var output = input.split(lineBreak);
    return output;
};
var spawnMakensis = function (cmd, args, opts) {
    return new Promise(function (resolve, reject) {
        var stream = {
            stdout: '',
            stderr: ''
        };
        var warnings = 0;
        var child = child_process_1.spawn(cmd, args, opts);
        child.stdout.on('data', function (line) {
            line = stringify(line);
            warnings = hasWarnings(line);
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
            if (code === 0) {
                resolve(output);
            }
            else {
                reject(output);
            }
        });
    });
};
exports.spawnMakensis = spawnMakensis;
var spawnMakensisSync = function (cmd, args, opts) {
    var child = child_process_1.spawnSync(cmd, args, opts);
    child.stdout = stringify(child.stdout);
    child.stderr = stringify(child.stderr);
    var warnings = hasWarnings(child.stdout);
    child = formatOutput(child, args, opts);
    var output = {
        'status': child.status,
        'stdout': child.stdout,
        'stderr': child.stderr,
        'warnings': warnings
    };
    return output;
};
exports.spawnMakensisSync = spawnMakensisSync;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var language_data_1 = __webpack_require__(68);
var codePages = [];
Object.keys(language_data_1.meta).forEach(function (key, index) {
    var codePage = language_data_1.meta[key].code_page;
    if (!isNaN(codePage) && !codePages.includes("CP" + codePage)) {
        codePages.push("CP" + codePage);
    }
});
var input = [
    'ACP'
].concat(codePages, [
    'OEM',
    'UTF8',
    'UTF16BE',
    'UTF16LE'
]);
exports.input = input;
var output = [
    'ACP'
].concat(codePages, [
    'OEM',
    'UTF16BE',
    'UTF16BEBOM',
    'UTF16LE',
    'UTF16LEBOM',
    'UTF8',
    'UTF8SIG'
]);
exports.output = output;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Language Meta Data
 */
const meta = __webpack_require__(69);

module.exports.meta = meta;

/**
 * Language Data
 */
const Afrikaans = __webpack_require__(70);
const Albanian = __webpack_require__(71);
const Arabic = __webpack_require__(72);
const Armenian = __webpack_require__(73);
const Asturian = __webpack_require__(74);
const Basque = __webpack_require__(75);
const Belarusian = __webpack_require__(76);
const Bosnian = __webpack_require__(77);
const Breton = __webpack_require__(78);
const Bulgarian = __webpack_require__(79);
const Catalan = __webpack_require__(80);
const Corsican = __webpack_require__(81);
const Croatian = __webpack_require__(82);
const Czech = __webpack_require__(83);
const Danish = __webpack_require__(84);
const Dutch = __webpack_require__(85);
const English = __webpack_require__(86);
const Esperanto = __webpack_require__(87);
const Estonian = __webpack_require__(88);
const Farsi = __webpack_require__(89);
const Finnish = __webpack_require__(90);
const French = __webpack_require__(91);
const Galician = __webpack_require__(92);
const Georgian = __webpack_require__(93);
const German = __webpack_require__(94);
const Greek = __webpack_require__(95);
const Hebrew = __webpack_require__(96);
const Hungarian = __webpack_require__(97);
const Icelandic = __webpack_require__(98);
const Indonesian = __webpack_require__(99);
const Irish = __webpack_require__(100);
const Italian = __webpack_require__(101);
const Japanese = __webpack_require__(102);
const Korean = __webpack_require__(103);
const Kurdish = __webpack_require__(104);
const Latvian = __webpack_require__(105);
const Lithuanian = __webpack_require__(106);
const Luxembourgish = __webpack_require__(107);
const Macedonian = __webpack_require__(108);
const Malay = __webpack_require__(109);
const Mongolian = __webpack_require__(110);
const Norwegian = __webpack_require__(111);
const NorwegianNynorsk = __webpack_require__(112);
const Pashto = __webpack_require__(113);
const Polish = __webpack_require__(114);
const Portuguese = __webpack_require__(115);
const PortugueseBR = __webpack_require__(116);
const Romanian = __webpack_require__(117);
const Russian = __webpack_require__(118);
const ScotsGaelic = __webpack_require__(119);
const Serbian = __webpack_require__(120);
const SerbianLatin = __webpack_require__(121);
const SimpChinese = __webpack_require__(122);
const Slovak = __webpack_require__(123);
const Slovenian = __webpack_require__(124);
const Spanish = __webpack_require__(125);
const SpanishInternational = __webpack_require__(126);
const Swedish = __webpack_require__(127);
const Tatar = __webpack_require__(128);
const Thai = __webpack_require__(129);
const TradChinese = __webpack_require__(130);
const Turkish = __webpack_require__(131);
const Ukrainian = __webpack_require__(132);
const Uzbek = __webpack_require__(133);
const Vietnamese = __webpack_require__(134);
const Welsh = __webpack_require__(135);

module.exports.languages = {
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


/***/ }),
/* 69 */
/***/ (function(module) {

module.exports = {"Afrikaans":{"id":1078,"code_page":1052,"rtl":false,"native":"Afrikaans"},"Albanian":{"id":1052,"code_page":1250,"rtl":false,"native":"Shqip"},"Arabic":{"id":1025,"code_page":1256,"rtl":true,"native":"العربية","literal":"Al-Arabiyyah"},"Armenian":{"id":1067,"code_page":1200,"rtl":false,"native":"Հայերեն","literal":"Hayeren"},"Asturian":{"id":9997,"code_page":1252,"rtl":false,"native":"Asturies"},"Basque":{"id":1069,"code_page":1252,"rtl":false,"native":"Euskera"},"Belarusian":{"id":1059,"code_page":1251,"rtl":false,"native":"Беларуская","literal":"Bielaruskaja"},"Bosnian":{"id":5146,"code_page":1250,"rtl":false,"native":"Bosanski"},"Breton":{"id":1150,"code_page":1252,"rtl":false,"native":"Brezhoneg"},"Bulgarian":{"id":1026,"code_page":1251,"rtl":false,"native":"Български","literal":"Balgarski"},"Catalan":{"id":1027,"code_page":1252,"rtl":false,"native":"Català","literal":"Catala"},"Corsican":{"id":1155,"code_page":1252,"rtl":false,"native":"Corsu"},"Croatian":{"id":1050,"code_page":1250,"rtl":false,"native":"Hrvatski"},"Czech":{"id":1029,"code_page":1250,"rtl":false,"native":"Čeština"},"Danish":{"id":1030,"code_page":1252,"rtl":false,"native":"Dansk"},"Dutch":{"id":1043,"code_page":1252,"rtl":false,"native":"Nederlands"},"English":{"id":1033,"code_page":"-","rtl":false,"native":"English"},"Esperanto":{"id":9998,"code_page":"-","rtl":false,"native":"Esperanto"},"Estonian":{"id":1061,"code_page":1257,"rtl":false,"native":"Eesti keel"},"Farsi":{"id":1065,"code_page":1256,"rtl":true,"long":"Persian","native":"فارسی","literal":"Farsi"},"Finnish":{"id":1035,"code_page":1252,"rtl":false,"native":"Suomi"},"French":{"id":1036,"code_page":1252,"rtl":false,"native":"Français","literal":"Francais"},"Galician":{"id":1110,"code_page":1252,"rtl":false,"native":"Galego"},"Georgian":{"id":1079,"code_page":1200,"rtl":false,"native":"ქართული","literal":"Kartuli"},"German":{"id":1031,"code_page":1252,"rtl":false,"native":"Deutsch"},"Greek":{"id":1032,"code_page":1253,"rtl":false,"native":"Ελληνικά","literal":"Ellinika"},"Hebrew":{"id":1037,"code_page":1255,"rtl":true,"native":"עברית","literal":"Ivrit"},"Hungarian":{"id":1038,"code_page":1250,"rtl":false,"native":"Magyar"},"Icelandic":{"id":1039,"code_page":1252,"rtl":false,"native":"Íslenska","literal":"Islenska"},"Indonesian":{"id":1057,"code_page":1252,"rtl":false,"native":"Bahasa Indonesia"},"Irish":{"id":2108,"code_page":1252,"rtl":false,"native":"Gaeilge"},"Italian":{"id":1040,"code_page":1252,"rtl":false,"native":"Italiano"},"Japanese":{"id":1041,"code_page":932,"rtl":false,"native":"日本語","literal":"Nihongo"},"Korean":{"id":1042,"code_page":949,"rtl":false,"native":"한국어","literal":"Hangugeo"},"Kurdish":{"id":9999,"code_page":1254,"rtl":false,"native":"Kurdî","literal":"Kurdi"},"Latvian":{"id":1062,"code_page":1257,"rtl":false,"native":"Latviešu","literal":"Latviesu"},"Lithuanian":{"id":1063,"code_page":1063,"rtl":false,"native":"Lietuvių","literal":"Lietuviu"},"Luxembourgish":{"id":4103,"code_page":1252,"rtl":false,"native":"Lëtzebuergesch","literal":"Letzebuergesch"},"Macedonian":{"id":1071,"code_page":1251,"rtl":false,"native":"Македонски","literal":"Makedonski"},"Malay":{"id":1086,"code_page":1252,"rtl":false,"native":"Bahasa Melayu"},"Mongolian":{"id":1104,"code_page":1251,"rtl":false,"long":"Mongolian (Cyrillic)","native":"Монгол Кирилл","literal":"Mongol kirill"},"Norwegian":{"id":1044,"code_page":1252,"rtl":false,"native":"Norsk"},"NorwegianNynorsk":{"id":2068,"code_page":1252,"rtl":false,"long":"Norwegian (Nynorsk)","native":"Norsk (nynorsk)"},"Pashto":{"id":1123,"code_page":1256,"rtl":true,"native":"پښتو","literal":"Pashto"},"Polish":{"id":1045,"code_page":1045,"rtl":false,"native":"Polski"},"Portuguese":{"id":2070,"code_page":1252,"rtl":false,"native":"Português","literal":"Portugues"},"PortugueseBR":{"id":1046,"code_page":1252,"rtl":false,"long":"Brazilian Portuguese","native":"Português Brasileiro","literal":"Portugues Brasileiro"},"Romanian":{"id":1048,"code_page":1250,"rtl":false,"native":"Română","literal":"Romana"},"Russian":{"id":1049,"code_page":1251,"rtl":false,"native":"Русский","literal":"Russkij"},"ScotsGaelic":{"id":1169,"code_page":1252,"rtl":false,"long":"Scottish Gaelic","native":"Gàidhlig","literal":"Gaidhlig"},"Serbian":{"id":3098,"code_page":1251,"rtl":false,"long":"Serbian (Cyrillic)","native":"Српски","literal":"Srpski (Cyrillic)"},"SerbianLatin":{"id":2074,"code_page":1250,"rtl":false,"long":"Serbian (Latin)","literal":"Srpski"},"SimpChinese":{"id":2052,"code_page":936,"rtl":false,"long":"Chinese (Simplified)","native":"中文(简体)","literal":"Hanyu (Jiantizi)"},"Slovak":{"id":1051,"code_page":1250,"rtl":false,"native":"Slovenčina","literal":"Slovencina"},"Slovenian":{"id":1060,"code_page":1250,"rtl":false,"native":"Slovenski"},"Spanish":{"id":1034,"code_page":1252,"rtl":false,"native":"Español","literal":"Espanol"},"SpanishInternational":{"id":3082,"code_page":1252,"rtl":false,"long":"Spanish (International)","native":"Español (Alfabetización Internacional)","literal":"Espanol (Alfabetizacion Internacional)"},"Tatar":{"id":1092,"code_page":1251,"rtl":false,"native":"Татарча","literal":"Tatarcha"},"Thai":{"id":1054,"code_page":874,"rtl":false,"native":"ไทย","literal":"Thai"},"TradChinese":{"id":1028,"code_page":950,"rtl":false,"long":"Chinese (Traditional)","native":"中文(繁體)","literal":"Hanyu (Fantizi)"},"Turkish":{"id":1055,"code_page":1254,"rtl":false,"native":"Türkçe","literal":"Turkce"},"Ukrainian":{"id":1058,"code_page":1251,"rtl":false,"native":"Українська","literal":"Ukrayins'ka"},"Uzbek":{"id":1091,"code_page":1252,"rtl":false,"native":"O‘zbek","literal":"O'zbek"},"Vietnamese":{"id":1066,"code_page":1258,"rtl":false,"native":"Tiếng Việt","literal":"Tieng Viet"},"Welsh":{"id":1106,"code_page":1252,"rtl":false,"native":"Cymraeg"}};

/***/ }),
/* 70 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1078,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) Installasie","UninstallCaption":"$(^Name) Verwydering","LicenseSubCaption":": Lisensie-ooreenkoms","ComponentsSubCaption":": Installasiekeuses","DirSubCaption":": Installasiegids","InstallingSubCaption":": Installeer tans","CompletedSubCaption":": Voltooid","UnComponentsSubCaption":": Verwyderingkeuses","UnDirSubCaption":": Verwyderinggids","ConfirmSubCaption":": Bevestiging","UninstallingSubCaption":": Verwyder tans","UnCompletedSubCaption":": Voltooid","BackBtn":"< V&orige","NextBtn":"&Volgende >","AgreeBtn":"&Regso","AcceptBtn":"Ek &aanvaar die ooreenkoms","DontAcceptBtn":"Ek aan vaar &nie die ooreenkoms nie","InstallBtn":"&Installeer","UninstallBtn":"&Verwyder","CancelBtn":"Kanselleer","CloseBtn":"&Sluit af","BrowseBtn":"&Blaai...","ShowDetailsBtn":"&Wys detail","ClickNext":"Klik op Volgende om verder te gaan.","ClickInstall":"Klik op Installeer om die installasie te begin.","ClickUninstall":"Klik op Verwyder om die verwydering te begin.","Name":"Naam","Completed":"Voltooid","LicenseText":"Lees die lisensieooreenkoms voordat u $(^NameDA) installeer. Klik op Regso as u die ooreenkoms aanvaar.","LicenseTextCB":"Lees die lisensieooreenkoms voordat u $(^NameDA) installeer. Merk die blokkie hieronder as u die ooreenkoms aanvaar. $_CLICK","LicenseTextRB":"Lees die lisensieooreenkoms voordat u $(^NameDA) installeer. Kies die eerste keuse hieronder as u die ooreenkoms aanvaar. $_CLICK","UnLicenseText":"Lees die lisensieooreenkoms voordat u $(^NameDA) verwyder. Klik op Regso als u die ooreenkoms aanvaar.","UnLicenseTextCB":"Lees die lisensieooreenkoms voordat u $(^NameDA) verwyder. Merk die blokkie hieronder as u die ooreenkoms aanvaar. $_CLICK","UnLicenseTextRB":"Lees die lisensieooreenkoms voordat u $(^NameDA) verwyder. KIes die eerste keuse hieronder as u die ooreenkoms aanvaar. $_CLICK","Custom":"Aangepast","ComponentsText":"Kies die komponente wat u wil installeer en deselekteer dié wat u nie wil installeer nie. $_CLICK","ComponentsSubText1":"Kies die installasietipe:","ComponentsSubText2_NoInstTypes":"Kies die komponente wat geïnstalleer moet word:","ComponentsSubText2":"Of kies die komponente wat geïnstalleer moet word:","UnComponentsText":"Kies die komponente wat u wil verwyder en deselekteer dié wat u nie wil verwyder nie. $_CLICK","UnComponentsSubText1":"Kies die verwyderingstipe:","UnComponentsSubText2_NoInstTypes":"Kies die komponente wat verwyder moet word:","UnComponentsSubText2":"Of kies die komponente wat verwyder moet word:","DirText":"$(^NameDA) sal in die volgende gids geïnstalleer word. Om elders te installeer, klik op Blaai en kies 'n ander een. $_CLICK","DirSubText":"Installasiegids","DirBrowseText":"Kies die gids om $(^NameDA) in te installeer:","UnDirText":"$(^NameDA) gaan uit die volgende gids verwyder word. Om van elders af te verwyder, klik op Blaai en kies 'n ander gids. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Kies die gids om $(^NameDA) uit te verwyder:","SpaceAvailable":"\"Beskikbare spasie: \"","SpaceRequired":"\"Vereiste spasie: \"","UninstallingText":"$(^NameDA) sal uit die volgende gids verwyder word. $_CLICK","UninstallingSubText":"Verwydering uit:","FileError":"Fout met skryf na lêer: \\r\\n\\r\\n$0\\r\\n\\r\\nKlik Staak om de installasie te stop,\\r\\nProbeer weer om weer te probeer of\\r\\nIgnoreer om dié lêer oor te slaan.","FileError_NoIgnore":"Fout met skryf na lêer: \\r\\n\\r\\n$0\\r\\n\\r\\nKlik Probeer weer om op nuut te probeer, of \\r\\nKanselleer om die installasie te stop.","CantWrite":"\"Kon nie skyf nie: \"","CopyFailed":"Kopiëring het misluk","CopyTo":"\"Kopieer na \"","Registering":"\"Registreer tans: \"","Unregistering":"\"Deregistreer tans: \"","SymbolNotFound":"\"Kon nie simbool vind nie: \"","CouldNotLoad":"\"Kon nie laai nie: \"","CreateFolder":"\"Skep gids: \"","CreateShortcut":"\"Maak kortpad: \"","CreatedUninstaller":"\"Verwyderingsprogram gemaak: \"","Delete":"\"Verwyder lêer: \"","DeleteOnReboot":"\"Verwyder na herbegin van rekenaar: \"","ErrorCreatingShortcut":"\"Fout met maak van kortpad: \"","ErrorCreating":"\"Fout met skep: \"","ErrorDecompressing":"Fout met uitpak van data! Korrupte installasielêer?","ErrorRegistering":"Fout met registrasie van DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Voer uit: \"","Extract":"\"Pak uit: \"","ErrorWriting":"\"Uitpak: fout met skryf na lêer \"","InvalidOpcode":"Installasieprogram korrup: ongeldige opcode","NoOLE":"\"Geen OLE vir: \"","OutputFolder":"\"Afvoergids: \"","RemoveFolder":"\"Verwyder gids: \"","RenameOnReboot":"\"Hernoem na herbegin van rekenaar: \"","Rename":"\"Hernoem: \"","Skipped":"\"Oorgeslaan: \"","CopyDetails":"Kopieer detail na knipbord","LogInstall":"Boekstaaf die installasieproses","Byte":"G","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 71 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1052,"font":{"name":null,"size":null},"codepage":1250,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Rregullimi i $(^Name)","UninstallCaption":"Çinstalimi i $(^Name)","LicenseSubCaption":": Marrëveshje Licence","ComponentsSubCaption":": Mundësi Instalimi","DirSubCaption":": Dosje Instalimi","InstallingSubCaption":": Po instalohet","CompletedSubCaption":": U plotësua","UnComponentsSubCaption":": Mundësi Çinstalimi","UnDirSubCaption":": Dosje Çinstalimi","ConfirmSubCaption":": Ripohim","UninstallingSubCaption":": Po çinstalohet","UnCompletedSubCaption":": U plotësua","BackBtn":"< &Mbrapsht","NextBtn":"&Tjetri >","AgreeBtn":"&Pajtohem","AcceptBtn":"&I pranoj kushtet e Marrëveshjes së Licensës","DontAcceptBtn":"&Nuk i pranoj kushtet e Marrëveshjes së Licensës","InstallBtn":"&Instaloje","UninstallBtn":"&Çinstaloje","CancelBtn":"Anuloje","CloseBtn":"&Mbylle","BrowseBtn":"Sh&fletoni...","ShowDetailsBtn":"Shfaq &hollësi","ClickNext":"Klikoni Tjetri për të vazhduar.","ClickInstall":"Për të filluar instalimin klikoni Instaloje.","ClickUninstall":"Për të filluar çinstalimin klikoni Çinstaloje.","Name":"Emër","Completed":"U plotësua","LicenseText":"Ju lutem, para instalimit të $(^NameDA), shqyrtoni marrëveshjen e licencës. Nëse i pranoni tërë kushtet e marrëveshjes, klikoni Pajtohem.","LicenseTextCB":"Ju lutem, para instalimit të $(^NameDA), shqyrtoni marrëveshjen e licensës. Nëse i pranoni tërë kushtet e marrëveshjes, klikoni kutizën më poshtë. $_CLICK","LicenseTextRB":"Ju lutem, para instalimit të $(^NameDA), shqyrtoni marrëveshjen e licensës. Nëse i pranoni tërë kushtet e marrëveshjes, përzgjidhni mundësinë e parë më poshtë. $_CLICK","UnLicenseText":"Ju lutem, para çinstalimit të $(^NameDA), shqyrtoni marrëveshjen e licensës. Nëse i pranoni tërë kushtet e marrëveshjes, klikoni Pajtohem.","UnLicenseTextCB":"Ju lutem, para çinstalimit të $(^NameDA), shqyrtoni marrëveshjen e licensës. Nëse i pranoni tërë kushtet e marrëveshjes, klikoni kutizën më poshtë. $_CLICK","UnLicenseTextRB":"Ju lutem, para çinstalimit të $(^NameDA), shqyrtoni marrëveshjen e licensës. Nëse i pranoni tërë kushtet e marrëveshjes, përzgjidhni mundësinë e parë më poshtë. $_CLICK","Custom":"Vetjake","ComponentsText":"U vini shenjë përbërësve që doni të instalohen dhe hiquani shenjën  përbërësvet që nuk doni të instalohen. $_CLICK","ComponentsSubText1":"Përzgjidhni llojin e instalimit:","ComponentsSubText2_NoInstTypes":"Përzgjidhni përbërësit për instalim:","ComponentsSubText2":"Ose, përzgjidhni përbërësit e mundshëm që doni të instalohen:","UnComponentsText":"U vini shenjë përbërësve që doni të çinstalohen dhe hiquni shenjën përbërësve që nuk doni të çinstalohen. $_CLICK","UnComponentsSubText1":"Përzgjidhni llojin e çinstalimit:","UnComponentsSubText2_NoInstTypes":"Përzgjidhni përbërësit për çinstalim:","UnComponentsSubText2":"Ose, përzgjidhni përbërësit e mundshëm që doni të çinstalohen:","DirText":"Rregullimi do ta instalojë $(^NameDA) në dosjen vijuese. Për instalim në një dosje tjetër, klikoni Shfletoni dhe përzgjidhni një tjetër dosje. $_CLICK","DirSubText":"Dosje Vendmbërritje","DirBrowseText":"Përzgjidhni dosjen ku të instalohet $(^NameDA):","UnDirText":"Rregullimi do të çinstalojë $(^NameDA) prej dosjes vijuese. Për çinstalim prej një dosjeje tjetër, klikoni Shfletoni dhe përzgjidhni një tjetër dosje. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Përzgjidhni dosjen prej nga ku të çinstalohet $(^NameDA):","SpaceAvailable":"\"Hapësirë e mundshme: \"","SpaceRequired":"\"Hapësirë e nevojshme: \"","UninstallingText":"$(^NameDA) do të çinstalohet prej dosjes vijuese. $_CLICK","UninstallingSubText":"Po çinstalohet prej:","FileError":"Gabim në hapje kartele për shkrim: \\r\\n\\r\\n$0\\r\\n\\r\\nKlikoni Ndërprite për të ndalur instalimin,\\r\\nRiprovo për të provuar sërish, ose\\r\\nShpërfille për të sanashkaluar këtë kartelë.","FileError_NoIgnore":"Gabim në hapje kartele për shkrim: \\r\\n\\r\\n$0\\r\\n\\r\\nKlikoni Riprovo për të provuar sërish, ose\\r\\nAnulo për të ndalur instalimin.","CantWrite":"\"S'shkruaj dot: \"","CopyFailed":"Kopjimi dështoi","CopyTo":"\"Kopjo tek \"","Registering":"\"Regjistrim: \"","Unregistering":"\"Çregjistrim: \"","SymbolNotFound":"\"S'u gjet dot simbol: \"","CouldNotLoad":"\"S'u ngarkua dot: \"","CreateFolder":"\"Krijo dosje: \"","CreateShortcut":"\"Krijo shkurtore: \"","CreatedUninstaller":"\"Krijo çinstalues: \"","Delete":"\"Fshi kartelë: \"","DeleteOnReboot":"\"Fshi gjatë rinisjes: \"","ErrorCreatingShortcut":"\"Gabim në krijim shkurtoresh: \"","ErrorCreating":"\"Gabim në krijimin e: \"","ErrorDecompressing":"Gabim në çngjeshje të dhënash! Instalues i dëmtuar?","ErrorRegistering":"Gabim në regjistrim DLL-je","ExecShell":"\"ExecShell: \"","Exec":"\"Ekzekuto: \"","Extract":"\"Përfto: \"","ErrorWriting":"\"Përftim: gabim në shkrim te kartela \"","InvalidOpcode":"Instalues i dëmtuar: opcode i pavlefshëm","NoOLE":"\"Pa OLE për: \"","OutputFolder":"\"Dosje përfundimesh: \"","RemoveFolder":"\"Hiq dosjen: \"","RenameOnReboot":"\"Riemërtoje gjatë rinisjes: \"","Rename":"\"Riemërtoje: \"","Skipped":"\"U anashkalua: \"","CopyDetails":"Kopjo Hollësira Te Clipboard","LogInstall":"Regjistro procesin e instalimit","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 72 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1025,"font":{"name":null,"size":null},"codepage":1256,"rtl":true,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"تنصيب $(^Name)","UninstallCaption":"إزالة $(^Name)","LicenseSubCaption":"إتفاقية‏ الترخيص :","ComponentsSubCaption":"خيارات التنصيب :","DirSubCaption":"مجلد التنصيب :","InstallingSubCaption":"تنصيب :","CompletedSubCaption":"إنتهى :","UnComponentsSubCaption":"خيارات الإزالة :","UnDirSubCaption":"مجلد الإزالة :","ConfirmSubCaption":"تأكيد :","UninstallingSubCaption":"إزالة :","UnCompletedSubCaption":"إنتهى :","BackBtn":"< ال&سابق","NextBtn":"ال&تالي >","AgreeBtn":"موافق&","AcceptBtn":"&أوافق على شروط اتفاقية الترخيص","DontAcceptBtn":"&لا أوافق على شروط اتفاقية الترخيص","InstallBtn":"&تنصيب","UninstallBtn":"&إزالة","CancelBtn":"إلغاء","CloseBtn":"إ&غلاق","BrowseBtn":"&عرض...","ShowDetailsBtn":"إ&ظهار التفاصيل","ClickNext":"إضغط على التالي للمتابعة.","ClickInstall":"إضغط على تنصيب لتشغيل التنصيب.","ClickUninstall":"إضغط على إزالة لتشغيل الإزالة.","Name":"الإسم","Completed":"إنتهى","LicenseText":"الرجاء مراجعة إتفاقية الترخيص قبل تنصيب $(^NameDA). عند الموافقة على جميع شروط الإتفاقية، إضغط موافق.","LicenseTextCB":"الرجاء مراجعة إتفاقية الترخيص قبل تنصيب $(^NameDA). عند الموافقة على جميع شروط الإتفاقية، إضغط على مربع المؤشر التالي. $_CLICK.","LicenseTextRB":"الرجاء مراجعة إتفاقية الترخيص قبل تنصيب $(^NameDA). عند الموافقة على جميع شروط الإتفاقية، إختر الخيار الأول التالي. $_CLICK","UnLicenseText":"الرجاء مراجعة إتفاقية الترخيص قبل إزالة $(^NameDA). عند الموافقة على جميع شروط الإتفاقية، إضغط موافق.","UnLicenseTextCB":"الرجاء مراجعة إتفاقية الترخيص قبل إزالة $(^NameDA). عند الموافقة على جميع شروط الإتفاقية، اضغط على مربع المؤشر التالي. $_CLICK","UnLicenseTextRB":"الرجاء مراجعة إتفاقية الترخيص قبل إزالة $(^NameDA). عند الموافقة على جميع شروط الإتفاقية، إختر الخيار الأول التالي. $_CLICK","Custom":"إختياري","ComponentsText":"علّم المكونات المراد تنصيبها وإزل العلامة عن المكونات الغير مراد تنصيبها. $_CLICK","ComponentsSubText1":"إختر نوع التنصيب:","ComponentsSubText2_NoInstTypes":"إختر المكونات للتنصيب:","ComponentsSubText2":"أو، قم بإختيار المكونات الإختيارية المراد تنصيبها:","UnComponentsText":"علّم المكونات المراد إزالتها وأزل العلامة عن المكونات الغير مراد إزالتها. $_CLICK","UnComponentsSubText1":"إختر نوع الإزالة:","UnComponentsSubText2_NoInstTypes":"إختر المكونات للإزالة:","UnComponentsSubText2":"أو، إختر المكونات الإختيارية المراد إزالتها:","DirText":"سيتم تنصيب $(^NameDA) في المجلد التالي. للتنصيب في مجلد آخر، إضغط عرض وإختر مجلد آخر. $_CLICK","DirSubText":"مجلد الهدف","DirBrowseText":"إختر المجلد لتنصيب $(^NameDA) فيه:","UnDirText":"سيتم إزالة $(^NameDA) من المجلد التالي. للإزالة من مجلد آخر، إضغط عرض وأختر مجلد آخر. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"إختر المجلد لإزالة $(^NameDA) منه:","SpaceAvailable":"\"المساحة المتوفرة: \"","SpaceRequired":"\"المساحة المطلوبة: \"","UninstallingText":"سيتم إزالة $(^NameDA) من المجلد التالي. $_CLICK","UninstallingSubText":"إزالة من:","FileError":"حدث خلل أثناء فتح ملف للكتابة: \\r\\n\\t\\\"$0\\\"\\r\\nإضغط إلغاء لإلغاء التنصيب،\\r\\nمحاولة لإعادة محاولة كتابة الملف،\\r\\n تجاهل لتخطي الملف","FileError_NoIgnore":"حدث خلل أثناء فتح ملف للكتابة: \\r\\n\\t\\\"$0\\\"\\r\\nإضغط محاولة لإعادة محاولة كتابة الملف، أو\\r\\nإلغاء لإلغاء التنصيب","CantWrite":"\"لا يستطيع الكتابة: \"","CopyFailed":"فشل النسخ","CopyTo":"\"نسخ إلى\"","Registering":"\"تسجيل: \"","Unregistering":"\"إلغاء تسجيل: \"","SymbolNotFound":"\"لم يتمكن من إيجاد الرمز :\"","CouldNotLoad":"\"لم يتمكن من تحميل :\"","CreateFolder":"\"إنشاء مجلد\"","CreateShortcut":"\"إنشاء إختصار: \"","CreatedUninstaller":"\"إنشاء مزيل: \"","Delete":"\"حذف ملف: \"","DeleteOnReboot":"\"حذف بعد إعادة التشغيل: \"","ErrorCreatingShortcut":"\"خلل أثناء إنشاء إختصار: \"","ErrorCreating":"\"خلل أثناء إنشاء :\"","ErrorDecompressing":"خلل أثناء فتح البيانات المضغوطة! منصب تالف؟","ErrorRegistering":"خلل أثناء تسجيل DLL","ExecShell":"\"تنفيذ ExecShell:\"","Exec":"\"تنفيذ: \"","Extract":"\"إستخراج: \"","ErrorWriting":"\"إستخراج: خلل أثناء الكتابة إلى ملف \"","InvalidOpcode":"المنصّب تالف: شفرة غير صالحة","NoOLE":"\"لا توجد OLE لـِ: \"","OutputFolder":"\"مجلد الإخراج: \"","RemoveFolder":"\"إزالة مجلد: \"","RenameOnReboot":"\"إعادة تسمية بعد إعادة التشغيل: \"","Rename":"\"إعادة تسمية: \"","Skipped":"\"تخطى: \"","CopyDetails":"نسخ التفاصيل إلى الذاكرة","LogInstall":"سجّل عملية التنصيب","Byte":"بايت","Kilo":" كيلو","Mega":" ميغا","Giga":" جيغا"}};

/***/ }),
/* 73 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1067,"font":{"name":null,"size":null},"codepage":1200,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Տեղակայել $(^Name)-ը","UninstallCaption":"Ջնջել $(^Name)-ը","LicenseSubCaption":": Արտոնագրային համաձայնություն","ComponentsSubCaption":": Տեղակայելու ընտրանքները","DirSubCaption":": Տեղակայելու թղթապանակը","InstallingSubCaption":": Ֆայլերը պատճենվում են","CompletedSubCaption":": Գործողությունը ավարտվեց","UnComponentsSubCaption":": Տեղակայելու ընտրությունը","UnDirSubCaption":": Ջնջվող թղթապանակը","ConfirmSubCaption":": Հաստատեք","UninstallingSubCaption":": Ֆայլերը ջնջվում են","UnCompletedSubCaption":": Գործողությունը ավարտվեց","BackBtn":"« &Նախորդը","NextBtn":"&Հաջորդը »","AgreeBtn":"Համաձայն& եմ","AcceptBtn":"Ես &ընդունում եմ համաձայնագրի պայմանները","DontAcceptBtn":"Ես &չեմ ընդունում համաձայնագրի պայմանները","InstallBtn":"&Տեղակայել","UninstallBtn":"Ջն&ջել","CancelBtn":"Չեղարկել","CloseBtn":"&Փակել","BrowseBtn":"Դ&իտել ...","ShowDetailsBtn":"&Մանրամասն...","ClickNext":"Շարունակելու համար սեղմեք 'Առաջ'։","ClickInstall":"Տեղակայելու համար սեղմեք 'Տեղակայել'։","ClickUninstall":"Ծրագիրը ջնջելու համար սեղմեք 'Ջնջել'։","Name":"Անունը","Completed":"Պատրաստ է","LicenseText":"$(^NameDA)-ը տեղակայելուց առաջ ծանոթացեք արտոնագրային համաձայնությանը։ Եթե ընդունում եք այն՝ սեղմեք 'Համաձայն եմ'։","LicenseTextCB":"$(^NameDA)-ը տեղակայելուց առաջ ծանոթացեք արտոնագրային համաձայնությանը։ Եթե ընդունում եք այն՝ դրեք նիշը ներքևում։ $_CLICK","LicenseTextRB":"$(^NameDA)-ը տեղակայելուց առաջ ծանոթացեք արտոնագրային համաձայնությանը։ Եթե ընդունում եք այն՝ ընտրեք ներքոնշյալներից առաջինը։ $_CLICK","UnLicenseText":"$(^NameDA)-ը ջնջելուց առաջ ծանոթացեք արտոնագրային համաձայնությանը։ Եթե ընդունում եք այն՝ սեղմեք 'Համաձայն եմ'։","UnLicenseTextCB":"$(^NameDA)-ը ջնջելուց առաջ ծանոթացեք արտոնագրային համաձայնությանը։ Եթե ընդունում եք այն՝ դրեք նիշը ներքևում։ $_CLICK","UnLicenseTextRB":"$(^NameDA)-ը ջնջելուց առաջ ծանոթացեք արտոնագրային համաձայնությանը։ Եթե ընդունում եք այն՝ ընտրեք ներքոնշյալներից առաջինը։ $_CLICK","Custom":"Հարմարեցված","ComponentsText":"Ընտրեք այն բաղադրիչները, որոնք ցանկանում եք տեղակայել։ $_CLICK","ComponentsSubText1":"Ընտրեք տեղակայելու եղանակը.","ComponentsSubText2_NoInstTypes":"Տեղակայելու համար ընտրեք բաղադրիչները.","ComponentsSubText2":"կամ ընտրեք լրացուցիչ բաղադրիչներ.","UnComponentsText":"Ջնջելու համար ընտրեք բաղադրիչները։ $_CLICK","UnComponentsSubText1":"Ընտրեք ջնջելու եղանակը.","UnComponentsSubText2_NoInstTypes":"Ընտրեք ջնջելու բաղադրիչները.","UnComponentsSubText2":"կամ ջնջելու համար ընտրեք լրացուցիչ բաղադրիչներ։","DirText":"Ծրագիրը կտեղակայի $(^NameDA)-ը նշված թղթապանակում։ Այլ թղթապանակում տեղակայելու համար սեղմեք 'Ընտրել' և ընտրեք այն։ $_CLICK","DirSubText":"Տեղակայելու թղթապանկը","DirBrowseText":"Նշեք $(^NameDA)-ի տեղակայելու թղթապանակը.","UnDirText":"Ծրագիրը կջնջի $(^NameDA)-ը նշված թղթապանակից։ Այլ թղթապանակից ջնջելու համար սեղմեք 'Ընտրել' և ընտրեք այն։ $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Ընտրեք թղթապանակը, որից պետք է ջնջել $(^NameDA)-ը.","SpaceAvailable":"\"Հասանելի է. \"","SpaceRequired":"\"Պահանջվում է. \"","UninstallingText":"$(^NameDA) ծրագիրը կջնջվի Ձեր համակարգչից։ $_CLICK","UninstallingSubText":"Ջնջվում է՝","FileError":"Հնարավոր չէ բացել ֆայլը՝ գրանցելու համար։ \\r\\n\\t\"$0\"\\r\\n'Դադարեցնել'՝ ընդհատել տեղակայումը,\\r\\n\"Կրկնել\"՝ կրկին փորձել,\\r\\n\"Բաց թողնել\"՝ բաց թողնել գործողությունը։","FileError_NoIgnore":"Հնարավոր չէ բացել ֆայլը՝ գրանցելու համար։ \\r\\n\\t\"$0\"\\r\\n'Կրկնել'՝ կրկին փորձել,\\r\\n'Դադարեցնել'՝ ընդհատել տեղակայումը։","CantWrite":"\"Հնարավոր չէ գրանցել \"","CopyFailed":"Սխալ՝ պատճենելու ժամանակ","CopyTo":"\"Պատճենել՝ \"","Registering":"\"Գրանցում. \"","Unregistering":"\"Վերագրանցում. \"","SymbolNotFound":"\"Հնարավոր չէ գտնել՝ \"","CouldNotLoad":"\"Հնարավոր չէ բացել. \"","CreateFolder":"\"Ստեղծվում է թղթապանակ \"","CreateShortcut":"\"Ստեղծվում են պիտակներ.\"","CreatedUninstaller":"\"Ստեղծվում ջնջման ծրագիրը. \"","Delete":"\"Ֆայլերի ջնջում. \"","DeleteOnReboot":"\"Կջնջվի վերագործարկելուց հետո. \"","ErrorCreatingShortcut":"\"Սխալ՝ պիտակը ստեղծելիս. \" ","ErrorCreating":"\"Սխալ. \"","ErrorDecompressing":"Սխալ՝ տվյալները բացելու ժամանակ։","ErrorRegistering":"Հնարավոր չէ գրանցել գրադարանը(DLL)","ExecShell":"\"Ֆայլի կիրառում. \" ","Exec":"\"Կատարվում է. \"","Extract":"\"Հանում է. \"","ErrorWriting":"\"Ֆայլերը գրելու սխալ. \"","InvalidOpcode":"Տեղակայիչը վնասված է.","NoOLE":"\"Չկա OLE՝\" ","OutputFolder":"\"Տեղակայելու թղթապանակը. \"","RemoveFolder":"\"Թղթապանակի ջնջում. \"","RenameOnReboot":"\"Կանվանափոխվի վերագործարկելուց հետո. \"","Rename":"\"Անվանափոխում. \"","Skipped":"\"Բաց թողնած. \"","CopyDetails":"Պատճենել տվյալները ","LogInstall":"Տեղակայման հաշվետվություն","Byte":"բայթ","Kilo":" Կ","Mega":" Մ","Giga":" Գ"}};

/***/ }),
/* 74 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":9997,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Instalación de $(^Name)","UninstallCaption":"Desinstalación de $(^Name)","LicenseSubCaption":": Alcuerdu de Llicencia","ComponentsSubCaption":": Opciones d'Instalación","DirSubCaption":": Direutoriu d'Instalación","InstallingSubCaption":": Instalando","CompletedSubCaption":": Completáu","UnComponentsSubCaption":": Opciones de Desinstalación","UnDirSubCaption":": Direutoriu de Desinstalación","ConfirmSubCaption":": Confirmación","UninstallingSubCaption":": Desinstalando","UnCompletedSubCaption":": Completáu","BackBtn":"< &Atrás","NextBtn":"&Siguiente >","AgreeBtn":"A&ceuto","AcceptBtn":"A&ceuto los términos de la llicencia","DontAcceptBtn":"&Non aceuto los términos de la llicencia","InstallBtn":"&Instalar","UninstallBtn":"&Desinstalar","CancelBtn":"Encaboxar","CloseBtn":"&Zarrar","BrowseBtn":"&Restolar...","ShowDetailsBtn":"Ver &detalles","ClickNext":"Calca Siguiente pa siguir.","ClickInstall":"Calca Instalar pa entamar la instalación.","ClickUninstall":"Calca Desinstalar pa entamar la desinstalación.","Name":"Nome","Completed":"Completáu","LicenseText":"Por favor, revisa l'acuerdu de llicencia enantes d'instalar $(^NameDA). Si aceutes tolos términos del alcuerdu, calca Aceuto.","LicenseTextCB":"Por favor, revisa l'alcuerdu de llicencia enantes d'instalar $(^NameDA). Si aceutes tolos términos del alcuerdu, marca embaxo la caxella. $_CLICK","LicenseTextRB":"Por favor, revisa l'alcuerdu de llicencia enantes d'instalar $(^NameDA). Si aceutes tolos términos del alcuerdu, seleiciona embaxo la primer opción. $_CLICK","UnLicenseText":"Por favor, revisa l'alcuerdu de llicencia enantes de desinstalar $(^NameDA). Si aceutes tolos términos del alcuerdu, calca Aceuto.","UnLicenseTextCB":"Por favor, revisa l'alcuerdu de llicencia enantes de desinstalar $(^NameDA). Si aceutes tolos términos del alcuerdu, marca embaxo la caxella. $_CLICK.","UnLicenseTextRB":"Por favor, revisa l'alcuerdu de llicencia enantes de desinstalar $(^NameDA). Si aceutes tolos términos del alcuerdu, seleiciona embaxo la primer opción. $_CLICK","Custom":"Personalizada","ComponentsText":"Conseña los componentes que deseyes instalar y desconseña los componentes que nun quies instalar. $_CLICK","ComponentsSubText1":"Tipos d'instalación:","ComponentsSubText2_NoInstTypes":"Seleiciona los componentes a instalar:","ComponentsSubText2":"O selecciona los componentes opcionales que deseyes instalar:","UnComponentsText":"Conseña los componentes que deseyes desinstalar y desconseña los componentes que nun quieras desinstalar. $_CLICK","UnComponentsSubText1":"Tipos de desinstalación:","UnComponentsSubText2_NoInstTypes":"Seleiciona los componentes a desinstalar:","UnComponentsSubText2":"O seleiciona los componentes opcionales que deseyes desinstalar:","DirText":"El programa d'instalación instalará $(^NameDA) nel siguiente direutoriu. Pa instalar nun direutoriu distintu, calca Restolar y seleiciona otru direutoriu. $_CLICK","DirSubText":"Direutoriu de Destín","DirBrowseText":"Seleiciona'l direutoriu nel qu'instalará $(^NameDA):","UnDirText":"El programa d'instalación desinstalará $(^NameDA) del siguiente direutoriu. Pa desinstalar d'un direutoriu distintu, calca Restolar y seleiciona otru direutoriu. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Seleiciona'l direutoriu dende'l cual desinstalará $(^NameDA):","SpaceAvailable":"Espaciu disponible: ","SpaceRequired":"Espaciu requeríu: ","UninstallingText":"$(^NameDA) sedrá desinstaláu del siguiente direutoriu. $_CLICK","UninstallingSubText":"Desinstalando dende:","FileError":"Error abriendo ficheru pa escritura: \\r\\n\\t\"$0\"\\r\\nCalca albortar p'anular la instalación,\\r\\nreintentar pa volver a intentar escribir el ficheru, u\\r\\nomitir pa inorar esti ficheru","FileError_NoIgnore":"Error abriendo ficheru pa escritura: \\r\\n\\t\"$0\"\\r\\nCalca reintentar pa volver a intentar escribir el ficheru, o\\r\\nencaboxar p'anular la instalación","CantWrite":"\"Nun pudo escribise: \"","CopyFailed":"Falló la copia","CopyTo":"\"Copiar a \"","Registering":"\"Rexistrando: \"","Unregistering":"\"Desaniciando rexistru: \"","SymbolNotFound":"\"Nun pudo atopase símbolu: \"","CouldNotLoad":"\"Nun pudo cargase: \"","CreateFolder":"\"Criar direutoriu: \"","CreateShortcut":"\"Criar accesu direutu: \"","CreatedUninstaller":"\"Criar desinstalador: \"","Delete":"\"Desaniciar ficheru: \"","DeleteOnReboot":"\"Desaniciar al reaniciu: \"","ErrorCreatingShortcut":"\"Fallu criando accesu direutu: \"","ErrorCreating":"\"Fallu criando: \"","ErrorDecompressing":"¡Error descomprimiendo datos! ¿Instalador corruptu?","ErrorRegistering":"Fallu rexistrando DLL","ExecShell":"\"Executar comandu: \"","Exec":"\"Executar: \"","Extract":"\"Estrayer: \"","ErrorWriting":"\"Extrayer: fallu escribiendo al ficheru \"","InvalidOpcode":"Instalador corruptu: códigu d'operación non válidu","NoOLE":"\"Ensin OLE pa: \"","OutputFolder":"\"Direutoriu de salida: \"","RemoveFolder":"\"Desaniciar direutoriu: \"","RenameOnReboot":"\"Renomar al reaniciu: \"","Rename":"\"Renomar: \"","Skipped":"\"Omitíu: \"","CopyDetails":"Copiar Detalles al Cartafueyu","LogInstall":"Rexistrar procesu d'instalación ","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 75 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1069,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) -ren Instalazioa","UninstallCaption":"$(^Name) -ren Ezabaketa","LicenseSubCaption":": Lizentzia hitzarmen agiria","ComponentsSubCaption":": Instalazio aukerak","DirSubCaption":": Instalazio karpeta","InstallingSubCaption":": Instalatzen","CompletedSubCaption":": Instalazioa burututa","UnComponentsSubCaption":": Ezabaketa aukerak","UnDirSubCaption":": Ezabaketa direktorioa","ConfirmSubCaption":": Berretsi ezabaketa","UninstallingSubCaption":": Ezabatzen","UnCompletedSubCaption":": Ezabaketa burututa","BackBtn":"< &Atzera","NextBtn":"&Aurrera >","AgreeBtn":"Onartu","AcceptBtn":"Lizentzia hitzarmenaren baldintzak onartzen ditut.","DontAcceptBtn":"Ez ditut lizentzia hitzarmenaren baldintzak onartzen.","InstallBtn":"&Instalatu","UninstallBtn":"&Ezabatu","CancelBtn":"Ezeztatu","CloseBtn":"&Itxi","BrowseBtn":"&Arakatu...","ShowDetailsBtn":"Ikusi &zehaztasunak","ClickNext":"Sakatu Aurrera jarraitzeko.","ClickInstall":"Sakatu Instalatu instalazioarekin hasteko.","ClickUninstall":"Sakatu Ezabatu ezabaketarekin hasteko.","Name":"Izena","Completed":"Osatuta","LicenseText":"Mesedez, aztertu lizentzia hitzarmena $(^NameDA) instalatu aurretik. Baldintza guztiak onartzen badituzu, sakatu Onartu.","LicenseTextCB":"Mesedez, aztertu lizentzia hitzarmena $(^NameDA) instalatu aurretik. Baldintza guztiak onartzen badituzu, nabarmendu azpiko laukitxoa. $_CLICK","LicenseTextRB":"Mesedez, aztertu lizentzia hitzarmena $(^NameDA) instalatu aurretik. Baldintza guztiak onartzen badituzu, hautatu azpian lehen aukera. $_CLICK","UnLicenseText":"Mesedez, aztertu lizentzia hitzarmena $(^NameDA) ezabatu aurretik. Baldintza guztiak onartzen badituzu, sakatu Onartu.","UnLicenseTextCB":"Mesedez, aztertu lizentzia hitzarmena $(^NameDA) ezabatu aurretik. Baldintza guztiak onartzen badituzu, nabarmendu azpiko laukitxoa. $_CLICK.","UnLicenseTextRB":"Mesedez, aztertu lizentzia hitzarmena $(^NameDA) ezabatu aurretik. Baldintza guztiak onartzen badituzu, hautatu azpian lehen aukera. $_CLICK","Custom":"Norberaren nahien arabera","ComponentsText":"Nabarmendu instalatu nahi diren osagaiak, eta utzi zuri instalatu nahi ez direnak. $_CLICK","ComponentsSubText1":"Hautatu instalazio mota:","ComponentsSubText2_NoInstTypes":"Hautatu instalatu beharreko osagaiak:","ComponentsSubText2":"Edo hautatu instalatu beharreko aukerazko osagaiak:","UnComponentsText":"Nabarmendu ezabatu nahi diren osagaiak, eta utzi zuri ezabatu nahi ez direnak. $_CLICK","UnComponentsSubText1":"Hautatu ezabaketa mota:","UnComponentsSubText2_NoInstTypes":"Hautatu ezabatu beharreko osagaiak:","UnComponentsSubText2":"Edo hautatu ezabatu beharreko aukerazko osagaiak:","DirText":"Instalazio programak $(^NameDA) honako karpetan instalatuko du. Beste karpeta batean instalatzeko, sakatu Arakatu eta aukeratu beste bat. $_CLICK","DirSubText":"Helburu karpeta","DirBrowseText":"Aukeratu $(^NameDA) instalatuko den karpeta:","UnDirText":"Instalazio programak $(^NameDA) honako karpetatik ezabatuko du. Beste karpeta batetik ezabatzeko, sakatu Arakatu eta aukeratu beste bat. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Aukeratu $(^NameDA) zein karpetatik ezabatuko den:","SpaceAvailable":"Leku erabilgarria:","SpaceRequired":"Behar den lekua:","UninstallingText":"$(^NameDA) ondorengo karpetan instalatuko da. $_CLICK","UninstallingSubText":"Ezabatzen honako karpetatik:","FileError":"Hutsegitea idazteko fitxategia irekitzean: \\r\\n\\t\"$0\"\\r\\nSakatu Irten instalazioa ,\\r\\nsaiatu berriz fitxategi hau berriz idazten saiatzeko, u\\r\\njarraitu fitxategi hau alde batera utzita aurrera egiteko","FileError_NoIgnore":"Hutsegitea idazteko fitxategia irekitzean: \\r\\n\\t\"$0\"\\r\\nsaiatu berriz fitxategi hau berriz idazten saiatzeko ,\\r\\nSakatu Irten instalazioa","CantWrite":"\"Ezin izan da idatzi: \"","CopyFailed":"Kopiatzeak hutsegin du","CopyTo":"\"Kopiatu hona \"","Registering":"\"Erregistratzen: \"","Unregistering":"\"Erregistroa ezabatzen: \"","SymbolNotFound":"\"Ikurra ezin izan da aurkitu: \"","CouldNotLoad":"\"Ezin izan da kargatu: \"","CreateFolder":"\"Sortu karpeta: \"","CreateShortcut":"\"Sortu lasterbidea: \"","CreatedUninstaller":"\"Sortu ezabatzailea: \"","Delete":"\"Ezabatu fitxategia: \"","DeleteOnReboot":"\"Ezabatu berrabiarazitakoan: \"","ErrorCreatingShortcut":"\"Hutsegitea lasterbidea sortzerakoan: \"","ErrorCreating":"\"Hutsegitea sortzerakoan: \"","ErrorDecompressing":"¡Hutsegitea datuak deskomprimatzean! Instalatzailea okerra?","ErrorRegistering":"Hutsegitea DLL erregistratzerakoan","ExecShell":"\"Exekutatu agindua: \"","Exec":"\"Exekutatu: \"","Extract":"\"Kanporatu: \"","ErrorWriting":"\"Kanporaketa: hutsegitea fitxategira idazterakoan \"","InvalidOpcode":"Instalatzailea okerra: ekintza kodea ez da baliozkoa","NoOLE":"\"OLE-rik ez honentzako: \"","OutputFolder":"\"Irteera karpeta: \"","RemoveFolder":"\"Ezabatu karpeta: \"","RenameOnReboot":"\"Berrizendatu berrabiarazitakoan: \"","Rename":"\"Berrizendatu: \"","Skipped":"\"Alde batera utzitakoa: \"","CopyDetails":"Kopiatu xehetasunak arbelera","LogInstall":"Instalazio prozesuaren erregistroa gorde","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 76 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1059,"font":{"name":null,"size":null},"codepage":1251,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Усталяванне $(^Name)","UninstallCaption":"Выдаленне $(^Name)","LicenseSubCaption":": Ліцэнзійнае пагадненне","ComponentsSubCaption":": Параметры ўсталявання","DirSubCaption":": Папка ўсталявання","InstallingSubCaption":": Капіяванне файлаў","CompletedSubCaption":": Працэдура завершена","UnComponentsSubCaption":": Параметры выдалення","UnDirSubCaption":": Папка выдалення","ConfirmSubCaption":": Пацвярджэнне","UninstallingSubCaption":": Выдаленне файлаў","UnCompletedSubCaption":": Працэдура завершана","BackBtn":"< &Назад","NextBtn":"&Далей >","AgreeBtn":"&Прыняць","AcceptBtn":"Я &прымаю ўмовы Ліцэнзійнага пагаднення","DontAcceptBtn":"Я н&е прымаю ўмовы Ліцэнзійнага пагаднення","InstallBtn":"&Усталяваць","UninstallBtn":"Выд&аліць","CancelBtn":"Скасаваць","CloseBtn":"За&крыць","BrowseBtn":"А&гляд ...","ShowDetailsBtn":"Падра&бязнасці...","ClickNext":"Націсніце кнопку \"Далей\", каб працягнуць усталяванне праграмы.","ClickInstall":"Націсніце кнопку \"Усталяваць\", каб пачаць працэс ўсталявання праграмы.","ClickUninstall":"Націсніце кнопку \"Выдаліць\", каб пачаць працэс выдалення праграмы.","Name":"Імя","Completed":"Завершана","LicenseText":"Калі ласка, прачытайце ўмовы Ліцэнзійнага пагаднення перад пачаткам усталявання $(^NameDA). Калі Вы прымаеце ўмовы Ліцэнзійнага пагаднення, націсніце кнопку \"Прыняць\".","LicenseTextCB":"Калі ласка, прачытайце ўмовы Ліцэнзійнага пагаднення перад пачаткам усталявання $(^NameDA). Калі Вы прымаеце ўмовы Ліцэнзійнага пагаднення, націсніце на сцяжок ніжэй. $_CLICK","LicenseTextRB":"Калі ласка, прачытайце ўмовы Ліцэнзійнага пагаднення перад пачаткам усталявання $(^NameDA). Калі Вы прымаеце ўмовы Ліцэнзійнага пагаднення, выберыце першы варыянт з прапанаваных нiжэй. $_CLICK","UnLicenseText":"Калі ласка, прачытайце ўмовы Ліцэнзійнага пагаднення перад пачаткам выдалення $(^NameDA). Калі Вы прымаеце ўмовы Ліцэнзійнага пагаднення, нацiснiце кнопку \"Прыняць\".","UnLicenseTextCB":"Калі ласка, прачытайце ўмовы Ліцэнзійнага пагаднення перад пачаткам выдалення $(^NameDA). Калі Вы прымаеце ўмовы Ліцэнзійнага пагаднення, націсніце на сцяжок ніжэй. $_CLICK","UnLicenseTextRB":"Калі ласка, прачытайце ўмовы Ліцэнзійнага пагаднення перад пачаткам выдалення $(^NameDA). Калі Вы прымаеце ўмовы Ліцэнзійнага пагаднення, выберыце першы варыянт з прапанаваных нiжэй. $_CLICK","Custom":"Выбарачна","ComponentsText":"Выберыце кампаненты праграмы, якiя Вы жадаеце ўсталяваць. $_CLICK","ComponentsSubText1":"Выберыце тып усталявання:","ComponentsSubText2_NoInstTypes":"Выберыце кампаненты праграмы, каб усталяваць iх:","ComponentsSubText2":"або выберыце кампаненты праграмы, каб усталяваць iх па свайму жаданню:","UnComponentsText":"Выберыце кампаненты, якiя Вы жадаеце выдалiць, i знiмiце сцяжкі, выбраныя для тых кампанентаў, якiя не трэба выдаляць. $_CLICK","UnComponentsSubText1":"Выберыце тып выдалення:","UnComponentsSubText2_NoInstTypes":"Выберыце кампаненты для выдалення:","UnComponentsSubText2":"або выберыце кампаненты праграмы для выдалення:","DirText":"Праграма ўсталюе $(^NameDA) у выбраную папку. Каб усталяваць праграму ў iншай папкі, нацiснiце кнопку \"Агляд\" i выберыце патрэбную папку. $_CLICK","DirSubText":"Папка ўсталявання","DirBrowseText":"Выберыце папку для ўсталявання $(^NameDA):","UnDirText":"Праграма выдалiць $(^NameDA) з выбранай папкі. Каб выдаліць праграму з iншай папкі, нацiснiце кнопку \"Агляд\" i выберыце патрэбную папку. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Выберыце папку, з якой Вы жадаеце выдалiць $(^NameDA):","SpaceAvailable":"\"Даступна на дыску: \"","SpaceRequired":"\"Патрэбна месца на дыску: \"","UninstallingText":"Праграма выдалiць $(^NameDA) з Вашага камп'ютара. $_CLICK","UninstallingSubText":"Выдаленне з:","FileError":"Немагчыма адкрыць файл для запiсу: \\r\\n\\r\\n$0\\r\\n\\r\\nНацiснiце кнопку \"Перапынiць\", каб перапынiць усталяванне;\\r\\n\"Паўтарыць\", каб паўтарыць спробу запiсу ў файл;\\r\\n\"Ігнараваць\", каб прапусцiць гэта дзеянне.","FileError_NoIgnore":"Немагчыма адкрыць файл для запiсу: \\r\\n\\r\\n$0\\r\\n\\r\\nНацiснiце кнопку \"Паўтарыць\", каб паўтарыць спробу запiсу ў файл;\\r\\n\"Скасаваць\", каб перапынiць усталяванне.","CantWrite":"\"Немагчыма запiсаць: \"","CopyFailed":"Памылка пры капіяванні","CopyTo":"\"Капіяванне ў \"","Registering":"\"Рэгiстрацыя: \"","Unregistering":"\"Выдаленне рэгiстрацыi: \"","SymbolNotFound":"\"Немагчыма знайсці сiмвал: \"","CouldNotLoad":"\"Немагчыма загрузiць: \"","CreateFolder":"\"Стварэнне папкі: \"","CreateShortcut":"\"Стварэнне ярлыка: \"","CreatedUninstaller":"\"Стварэнне праграмы выдалення: \"","Delete":"\"Выдаленне файла: \"","DeleteOnReboot":"\"Выдаленне пасля перазапуску камп'ютара: \"","ErrorCreatingShortcut":"\"Памылка стварэння ярлыка: \" ","ErrorCreating":"\"Памылка стварэння: \"","ErrorDecompressing":"Немагчыма выцягнуць дадзеныя. Магчыма пашкоджаны дыстрыбутыў.","ErrorRegistering":"Немагчыма зарэгістраваць бібліятэку (DLL)","ExecShell":"\"Выкананне каманды абалонкі: \" ","Exec":"\"Выкананне: \"","Extract":"\"Выманне: \"","ErrorWriting":"\"Выманне: памылка запiсу файла\"","InvalidOpcode":"дыстрыбутыў пашкоджаны: код памылкi","NoOLE":"\"Няма OLE для: \" ","OutputFolder":"\"Папка усталявання: \"","RemoveFolder":"\"Выдаленне папкі: \"","RenameOnReboot":"\"Перайменаванне пасля перазапуску камп'ютара: \"","Rename":"\"Перайменаванне: \"","Skipped":"\"Прапушчана: \"","CopyDetails":"Капіяваць звесткi ў буфер абмена ","LogInstall":"Запiсваць у лог працэс усталявання","Byte":"Б","Kilo":" К","Mega":" М","Giga":" Г"}};

/***/ }),
/* 77 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":5146,"font":{"name":null,"size":null},"codepage":1250,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) Instalacija","UninstallCaption":"$(^Name) Uklanjanje","LicenseSubCaption":": Licencno pravo korištenja","ComponentsSubCaption":": Opcije instalacije","DirSubCaption":": Izbor mape za instalaciju","InstallingSubCaption":": Instaliranje","CompletedSubCaption":": Završeno","UnComponentsSubCaption":": Opcije uklanjanja","UnDirSubCaption":": Mapa uklanjanja","ConfirmSubCaption":": Potvrda","UninstallingSubCaption":": Uklanjanje","UnCompletedSubCaption":": Završeno uklanjanje","BackBtn":"< &Nazad","NextBtn":"&Dalje >","AgreeBtn":"&Prihvatam","AcceptBtn":"&Prihvatam uvjete licencnog ugovora","DontAcceptBtn":"&Ne prihvatam uvjete licencnog ugovora","InstallBtn":"&Instaliraj","UninstallBtn":"&Ukloni","CancelBtn":"Odustani","CloseBtn":"&Zatvori","BrowseBtn":"&Pregledaj...","ShowDetailsBtn":"Prikaži &detalje","ClickNext":"Pritisnite dugme 'Dalje' za nastavak.","ClickInstall":"Pritisnite dugme 'Instaliraj' za početak instalacije.","ClickUninstall":"Pritisnite dugme 'Ukloni' za početak uklanjanja.","Name":"Ime","Completed":"Završeno","LicenseText":"Molim pročitajte licencu prije instaliranja programa $(^NameDA). Ukoliko prihvatate sve uvjete ugovora, odaberite 'Prihvatam'.","LicenseTextCB":"Molim pročitajte licencu prije instaliranja programa $(^NameDA). Ukoliko prihvatate sve uvjete ugovora, označite donji kvadratić. $_CLICK","LicenseTextRB":"Molim pročitajte licencu prije instaliranja programa $(^NameDA). Ukoliko prihvatate sve uvjete ugovora, odaberite prvu donju opciju. $_CLICK","UnLicenseText":"Molim pročitajte licencu prije uklanjanja programa $(^NameDA). Ukoliko prihvatate sve uvjete ugovora, odaberite 'Prihvatam'.","UnLicenseTextCB":"Molim pročitajte licencu prije uklanjanja programa $(^NameDA). Ako prihvatate sve uvjete ugovora, obilježite donji kvadratić. $_CLICK","UnLicenseTextRB":"Molim pročitajte licencu prije uklanjanja programa $(^NameDA). Ukoliko prihvatate sve uvjete ugovora, odaberite prvu opciju ispod. $_CLICK","Custom":"Podešavanje","ComponentsText":"Označite komponente koje želite instalirati. Instaliraju se samo označene komponente. Uklonite oznaku sa onih koje ne želite instalirati. $_CLICK","ComponentsSubText1":"Izaberite tip instalacije:","ComponentsSubText2_NoInstTypes":"Odaberite komponente za instalaciju:","ComponentsSubText2":"Ili po izboru označite komponente koje želite instalirati:","UnComponentsText":"Označite komponente koje želite ukloniti. Uklonite oznaku sa onih koje ne želite ukloniti. $_CLICK","UnComponentsSubText1":"Izaberite tip uklanjanja:","UnComponentsSubText2_NoInstTypes":"Izaberite komponente za uklanjanje:","UnComponentsSubText2":"Ili po izboru odaberite komponente koje želite da uklonite:","DirText":"Program $(^NameDA) će biti instaliran u sljedeću mapu. Za instalaciju na neku drugu mapu odaberite 'Pregledaj...' i odaberite drugu mapu. $_CLICK","DirSubText":"Odredišna mapa","DirBrowseText":"Izaberite mapu u koju želite instalirati program $(^NameDA):","UnDirText":"Program $(^NameDA) će biti uklonjen iz navedene mape. Za uklanjanje iz druge mape odaberite 'Pregledaj...' i označite drugu mapu. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Izaberite mapu iz koje ćete program $(^NameDA) ukloniti:","SpaceAvailable":"\"Slobodno prostora na disku: \"","SpaceRequired":"\"Potrebno prostora na disku: \"","UninstallingText":"Program $(^NameDA) će biti uklonjen iz sljedeće mape. $_CLICK","UninstallingSubText":"Uklanjanje iz:","FileError":"Greška prilikom otvaranja datoteke za upisivanje: \\r\\n\\t\"$0\"\\r\\n\\\"Odustani\\\" za prekid instalacije,\\r\\n\\\"Ponovi\\\" za ponovni pokušaj upisivanja, ili\\r\\n\\\"Ignoriši\\\" za zanemarenje te datoteke","FileError_NoIgnore":"Greška prilikom otvaranja datoteke za upisivanje: \\r\\n\\t\"$0\"\\r\\n\\\"Ponovi\\\" za ponovni pokušaj zapisivanja, ili\\r\\n\\\"Odustani\\\" za prekid instalacije","CantWrite":"\"Nemoguće upisati: \"","CopyFailed":"Greška prilikom kopiranja","CopyTo":"\"Kopiraj u \"","Registering":"\"Prijava: \"","Unregistering":"\"Odjava: \"","SymbolNotFound":"\"Nemoguće naći simbol: \"","CouldNotLoad":"\"Nemoguće učitavanje: \"","CreateFolder":"\"Napravi mapu: \"","CreateShortcut":"\"Napravi prečicu: \"","CreatedUninstaller":"\"Program za uklanjanje: \"","Delete":"\"Obriši datoteku: \"","DeleteOnReboot":"\"Obriši prilikom ponovnog pokretanja: \"","ErrorCreatingShortcut":"\"Greška prilikom kreiranja prečica: \"","ErrorCreating":"\"Greška prilikom kreiranja: \"","ErrorDecompressing":"Greška prilikom otpakivanja podataka! Oštećen instalacijski program?","ErrorRegistering":"Greška prilikom prijavljivanja DLLa","ExecShell":"\"ExecShell: \"","Exec":"\"Izvrši: \"","Extract":"\"Otpakuj: \"","ErrorWriting":"\"Otpakivanje: greška upisivanja u datoteku \"","InvalidOpcode":"Oštećena instalacijska datoteka: neispravna opkoda","NoOLE":"\"Nema OLE za: \"","OutputFolder":"\"Izlazna mapa: \"","RemoveFolder":"\"Obriši mapu: \"","RenameOnReboot":"\"Preimenuj prilikom ponovnog startovanja: \"","Rename":"\"Preimenuj: \"","Skipped":"\"Preskočeno: \"","CopyDetails":"Kopiraj detalje na Klembord","LogInstall":"Logiraj zapisnik procesa instalacije","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 78 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1150,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Staliañ ha kefluniañ $(^Name)","UninstallCaption":"Distaliañ $(^Name)","LicenseSubCaption":": Aotre arverañ","ComponentsSubCaption":": Dibaboù staliañ","DirSubCaption":": Kavlec'h staliañ","InstallingSubCaption":": O staliañ ar restroù","CompletedSubCaption":": Echu eo","UnComponentsSubCaption":": Dibaboù distaliañ","UnDirSubCaption":": Kavlec'h distaliañ","ConfirmSubCaption":": Kadarnañ","UninstallingSubCaption":": O tistaliañ ar restroù","UnCompletedSubCaption":": Echu eo","BackBtn":"< &Kent","NextBtn":"&War-lerc'h >","AgreeBtn":"&A-du emaon","AcceptBtn":"&Degemer holl dermoù al lañvaz emglev","DontAcceptBtn":"&Chom hep degemer termoù al lañvaz emglev","InstallBtn":"&Staliañ","UninstallBtn":"&Distaliañ","CancelBtn":"Nullañ","CloseBtn":"&Serriñ","BrowseBtn":"F&urchal...","ShowDetailsBtn":"Muioc'h a &ditouroù","ClickNext":"Klikit war « War-lerc'h » evit mont war-raok.","ClickInstall":"Klikit war « Staliañ » evit kregiñ gant ar staliadur.","ClickUninstall":"Klikit war « Distaliañ » evit kregiñ gant an distaliadur.","Name":"Anv","Completed":"Echu eo","LicenseText":"Bezit aketus en ur lenn an aotre arverañ a-raok staliañ $(^NameDA) mar plij. Mar degemerit pep term eus an aotre, klikit war « A-du emaon ».","LicenseTextCB":"Bezit aketus en ur lenn an aotre arverañ a-raok staliañ $(^NameDA) mar plij. Mar degemerit pep term eus an aotre, klikit war al log a-zindan. $_CLICK","LicenseTextRB":"Bezit aketus en ur lenn an aotre arverañ a-raok staliañ $(^NameDA) mar plij. Mar degemerit pep term eus an aotre, dizuzit an dibab kentañ a-zindan. $_CLICK","UnLicenseText":"Bezit aketus en ur lenn an aotre arverañ a-raok distaliañ $(^NameDA) mar plij. Mar degemerit pep term eus an aotre, klikit war « A-du emaon ».","UnLicenseTextCB":"Bezit aketus en ur lenn an aotre arverañ a-raok distaliañ $(^NameDA) mar plij. Mar degemerit pep term eus an aotre, klikit war al log a-zindan. $_CLICK","UnLicenseTextRB":"Bezit aketus en ur lenn an aotre arverañ a-raok distaliañ $(^NameDA) mar plij. Mar degemerit pep term eus an aotre, diuzit an dibab kentañ a-zindan. $_CLICK","Custom":"Diouzh ho kiz","ComponentsText":"Dibabit an elfennoù a fell deoc'h staliañ pe diziuzit an elfennoù a fell deoc'h leuskel a-gostez. $_CLICK","ComponentsSubText1":"Dibabit pe seurt staliañ a vo :","ComponentsSubText2_NoInstTypes":"Dibabit an elfennoù da staliañ :","ComponentsSubText2":"Pe dibabit an elfennoù diret a fell deoc'h staliañ :","UnComponentsText":"Dibabit an elfennoù a fell deoc'h distaliañ pe diziuzit an elfennoù a fell deoc'h mirout. $_CLICK","UnComponentsSubText1":"Dibabit peseurt distaliañ a vo :","UnComponentsSubText2_NoInstTypes":"Dibabit an elfennoù da zistaliañ :","UnComponentsSubText2":"Pe dibabit an elfennoù diret a fell deoc'h distaliañ :","DirText":"Staliet e vo $(^NameDA) gant ar goulev-mañ er c'havlec'h da-heul. Mar fell deoc'h dibab ur c'havlec'h all, klikit war « Furchal » ha dibabit ur c'havlec'h all. $_CLICK","DirSubText":"Kavlec'h bukenn","DirBrowseText":"Dibabit ar c'havlec'h e vo diazezet $(^NameDA) ennañ :","UnDirText":"Distaliet e vo $(^NameDA) gant ar goulev-mañ adalek ar c'havlec'h da heul. Ma fell deoc'h distaliañ adalek ur c'havlec'h all, klikit war « Furchal » ha diuzit ur c'havlec'h all. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Diuzit ar c'havlec'h evit distaliañ $(^NameDA) adalek :","SpaceAvailable":"\"Egor kantenn vak : \"","SpaceRequired":"\"Egor kantenn rekis : \"","UninstallingText":"Distaliet e vo $(^NameDA) adalek ar c'havelec'h da-heul. $_CLICK","UninstallingSubText":"Distaliañ adalek :","FileError":"Fazi en ur zigeriñ ur restr evit skrivañ : \\r\\n\\r\\n$0\\r\\n\\r\\nKlikit war « Paouez » evit paouez gant ar staliañ,\\r\\n« Adober » evit eseañ en-dro, pe\\r\\n« Tremen » evit leuskel a-gostez ar restr-mañ.","FileError_NoIgnore":"Fazi en ur zigeriñ ur restr a-benn skrivañ : \\r\\n\\r\\n$0\\r\\n\\r\\nKlikit war « Adober » evit esaeañ en-dro, pe\\r\\nwar « Nullañ » evit paouez gant ar staliañ.","CantWrite":"\"N'haller ket skrivañ : \"","CopyFailed":"Kopiañ faziet","CopyTo":"\"Kopiañ da \"","Registering":"\"Oc'h enskrivañ : \"","Unregistering":"\"O tienskrivañ : \"","SymbolNotFound":"\"N'haller ket kavout ur simbolenn : \"","CouldNotLoad":"\"N'haller ket kargañ : \"","CreateFolder":"\"Krouiñ kavlec'h : \"","CreateShortcut":"\"Krouiñ berradenn : \"","CreatedUninstaller":"\"Skoazeller distaliañ krouet : \"","Delete":"\"Dilemel restr : \"","DeleteOnReboot":"\"Dilemel en ur adloc'hañ : \"","ErrorCreatingShortcut":"\"Fazi en ur grouiñ berradenn : \"","ErrorCreating":"\"Fazi en ur grouiñ : \"","ErrorDecompressing":"Fazi en ur ziwaskañ stlenn ! Skoazeller staliañ gwastet ?","ErrorRegistering":"Fazi en ur enskrivañ an DLL","ExecShell":"\"ExecShell : \"","Exec":"\"Lañsañ : \"","Extract":"\"Eztennañ : \"","ErrorWriting":"\"Eztennañ : fazi en ur skrivañ restr \"","InvalidOpcode":"Skoazeller staliañ gwastet : opcode direizh","NoOLE":"\"OLE ebet evit : \"","OutputFolder":"\"Kavlec'h ec'hank : \"","RemoveFolder":"\"Dilemel ar c'havlec'h : \"","RenameOnReboot":"\"Adenvel pa vez adloc'het : \"","Rename":"\"Adenvel : \"","Skipped":"\"Laosket a-gostez: \"","CopyDetails":"Kopiañ ar munudoù er golver","LogInstall":"Tresañ an argerzh staliañ","Byte":"E","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 79 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1026,"font":{"name":null,"size":null},"codepage":1251,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Инсталиране на $(^Name) ","UninstallCaption":"Изтриване на $(^Name) ","LicenseSubCaption":": Лицензионно споразумение","ComponentsSubCaption":": Опции за инсталиране","DirSubCaption":": Инсталиране в папка","InstallingSubCaption":": Инсталиране","CompletedSubCaption":": Завършване","UnComponentsSubCaption":": Опции за изтриване","UnDirSubCaption":": Изтриване от папка","ConfirmSubCaption":": Потвърждение","UninstallingSubCaption":": Изтриване","UnCompletedSubCaption":": Завършване","BackBtn":"< &Назад","NextBtn":"Н&апред >","AgreeBtn":"&Съгласен","AcceptBtn":"&Съгласен съм с условията на Лицензионното споразумение.","DontAcceptBtn":"&Не съм съгласен с условията на Лицензионното споразумение.","InstallBtn":"&Инсталирай","UninstallBtn":"&Изтрий","CancelBtn":"&Отказ","CloseBtn":"&Затвори","BrowseBtn":"П&реглед...","ShowDetailsBtn":"&Детайли","ClickNext":"Натиснете \"Напред\", за да продължите.","ClickInstall":"Натиснете \"Инсталирай\", за да започне инсталирането.","ClickUninstall":"Натиснете \"Изтрий\", за да започне изтриването.","Name":"Име","Completed":"Край","LicenseText":"Моля прочетете Лицензионното споразумение преди да инсталирате $(^NameDA). Ако приемате всички условия на споразумението, натиснете \"Съгласен\".","LicenseTextCB":"Моля прочетете Лицензионното споразумение преди да инсталирате $(^NameDA). Ако приемате всички условия на споразумението, сложете отметка в полето по-долу. $_CLICK","LicenseTextRB":"Моля прочетете Лицензионното споразумение преди да инсталирате $(^NameDA). Ако приемате всички условия на споразумението, изберете първата опция по-долу. $_CLICK","UnLicenseText":"Моля прочетете Лицензионното споразумение преди да изтриете $(^NameDA). Ако приемате всички условия на споразумението, натиснете \"Съгласен\".","UnLicenseTextCB":"Моля прочетете Лицензионното споразумение преди да изтриете $(^NameDA). Ако приемате всички условия на споразумението, сложете отметка в полето по-долу. $_CLICK","UnLicenseTextRB":"Моля прочетете Лицензионното споразумение преди да изтриете $(^NameDA). Ако приемате всички условия на споразумението, изберете първата опция по-долу. $_CLICK","Custom":"Инсталиране по избор","ComponentsText":"Изберете компонентите, които искате да бъдат инсталирани. $_CLICK","ComponentsSubText1":"Изберете тип инсталиране:","ComponentsSubText2_NoInstTypes":"Изберете компоненти:","ComponentsSubText2":"Или изберете компонентите, които искате да бъдат инсталирани:","UnComponentsText":"Сложете отметка пред компонентите, които искате да изтриете, а тези които не искате да изтриете оставете без отметка. $_CLICK","UnComponentsSubText1":"Изберете типа на изтриване:","UnComponentsSubText2_NoInstTypes":"Изберете компонентите за изтриване:","UnComponentsSubText2":"Или, изберете допълнителни компоненти за изтриване:","DirText":"Програмата ще инсталира $(^NameDA) в посочената папка. За да инсталирате в друга папка, натиснете \"Преглед\" и изберете друга папка. $_CLICK","DirSubText":"Целева папка","DirBrowseText":"Изберете папка, в която да се инсталира $(^NameDA):","UnDirText":"Програмата ще изтрие $(^NameDA) от следната папка. За да изтриете от друга папка, натиснете \"Преглед\" и изберете друга папка. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Изберете папката от която да се изтрие $(^NameDA):","SpaceAvailable":"\"Свободно пространство: \"","SpaceRequired":"\"Необходимо пространство: \"","UninstallingText":"$(^NameDA) ще бъде изтрита от следната папка. $_CLICK","UninstallingSubText":"Изтриване от:","FileError":"Грешка при отваряне на файла за запис: \\r\\n\\t\"$0\"\\r\\nНатиснете \"Прекрати\", за да прекратите инсталирането, \"Повтори\", за да опитате отново или \"Игнорирай\", за да пропуснете този файл","FileError_NoIgnore":"Грешка при отваряне на файла за запис: \\r\\n\\t\"$0\"\\r\\nНатиснете \"Повтори\", за да опитате отново или \"Прекрати\", за да прекратите инсталирането.","CantWrite":"\"Неуспешно записване на: \"","CopyFailed":"Копирането неуспешно","CopyTo":"\"Копиране на \"","Registering":"\"Регистриране на: \"","Unregistering":"\"Дерегистриране на: \"","SymbolNotFound":"\"Символът не е намерен: \"","CouldNotLoad":"\"Неуспешно зареждане на: \"","CreateFolder":"\"Създаване на папка: \"","CreateShortcut":"\"Създаване на пряк път: \"","CreatedUninstaller":"\"Създаване на програма за изтриване: \"","Delete":"\"Изтриване на: \"","DeleteOnReboot":"\"Изтриване след рестарт: \"","ErrorCreatingShortcut":"\"Грешка при създаване на прекия път: \"","ErrorCreating":"\"Грешка при създаване на: \"","ErrorDecompressing":"Грешка при декомпресиране на данните! Вероятно инсталационния пакет е повреден.","ErrorRegistering":"Грешка при регистриране на DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Изпълнение на: \"","Extract":"\"Извличане на: \"","ErrorWriting":"\"Извличане на: грешка при запис във файл \"","InvalidOpcode":"Пакета е повреден: грешен код на операция","NoOLE":"\"Няма OLE за: \"","OutputFolder":"\"Инсталиране в папка: \"","RemoveFolder":"\"Изтриване на папка: \"","RenameOnReboot":"\"Преименуване при рестарт: \"","Rename":"\"Преименуване на: \"","Skipped":"\"Пропускане на: \"","CopyDetails":"Копиране на данните в буфера","LogInstall":"Записване на отчет за инсталирането","Byte":"Б","Kilo":" К","Mega":" М","Giga":" Г"}};

/***/ }),
/* 80 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1027,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Instal·lació de l'aplicació $(^Name)","UninstallCaption":"Desinstal·lació de l'aplicació $(^Name)","LicenseSubCaption":": Acord de llicència","ComponentsSubCaption":": Opcions d'instal·lació","DirSubCaption":": Carpeta d'instal·lació","InstallingSubCaption":": S'està instal·lant","CompletedSubCaption":": S'ha acabat","UnComponentsSubCaption":": Opcions de desinstal·lació","UnDirSubCaption":": Carpeta de desinstal·lació","ConfirmSubCaption":": Confirmació","UninstallingSubCaption":": S'està desinstal·lant","UnCompletedSubCaption":": No s'ha acabat","BackBtn":"< En&rere","NextBtn":"En&davant >","AgreeBtn":"Hi estic d'a&cord","AcceptBtn":"&Accepto els termes de l'acord de llicència","DontAcceptBtn":"&No accepto els termes de l'acord de llicència","InstallBtn":"&Instal·la","UninstallBtn":"&Desinstal·la","CancelBtn":"&Cancel·la","CloseBtn":"&Tanca","BrowseBtn":"&Navega...","ShowDetailsBtn":"&Mostra els detalls","ClickNext":"Feu clic a Endavant per a continuar.","ClickInstall":"Feu clic a Instal·la per a iniciar la instal·lació.","ClickUninstall":"Feu clic a Desinstal·la per a iniciar la desinstal·lació.","Name":"Nom","Completed":"S'ha acabat","LicenseText":"Reviseu l'acord de llicència abans d'instal·lar l'aplicació $(^NameDA). Si accepteu tots els termes de l'acord, feu clic a Hi estic d'acord.","LicenseTextCB":"Reviseu l'acord de llicència abans d'instal·lar l'aplicació $(^NameDA). Si accepteu tots els termes de l'acord, activeu la casella de sota. $_CLICK","LicenseTextRB":"Reviseu l'acord de llicència abans d'instal·lar l'aplicació $(^NameDA). Si accepteu tots els termes de l'acord, seleccioneu la primera opció de sota. $_CLICK","UnLicenseText":"Reviseu l'acord de llicència abans de desinstal·lar l'aplicació $(^NameDA). Si accepteu tots els termes de l'acord, feu clic a Hi estic d'acord.","UnLicenseTextCB":"Reviseu l'acord de llicència abans de desinstal·lar l'aplicació $(^NameDA). Si accepteu tots els termes de l'acord, activeu la la casella de sota. $_CLICK","UnLicenseTextRB":"Reviseu l'acord de llicència abans de desinstal·lar l'aplicació $(^NameDA). Si accepteu tots els termes de l'acord, seleccioneu la primera opció de sota. $_CLICK","Custom":"Personalitzada","ComponentsText":"Activeu els components que voleu instal·lar i desactiveu els que no. $_CLICK","ComponentsSubText1":"Seleccioneu el tipus d'instal·lació:","ComponentsSubText2_NoInstTypes":"Seleccioneu els components per instal·lar:","ComponentsSubText2":"O bé, seleccioneu els components opcionals que desitgéssiu instal·lar:","UnComponentsText":"Activeu els components que voleu desinstal·lar i desactiveu els que no. $_CLICK","UnComponentsSubText1":"Seleccioneu el tipus de desinstal·lació:","UnComponentsSubText2_NoInstTypes":"Seleccioneu els components per desinstal·lar:","UnComponentsSubText2":"O bé, seleccioneu els components opcionals per desinstal·lar:","DirText":"El programa d'instal·lació instal·larà l'aplicació $(^NameDA) en la següent carpeta. Per a instal·lar-lo en una carpeta diferent, feu clic a Navega i seleccioneu-ne una altra. $_CLICK","DirSubText":"Carpeta de destinació","DirBrowseText":"Seleccioneu la carpeta on s'instal·larà l'aplicació $(^NameDA):","UnDirText":"El programa d'instal·lació desinstal·larà l'aplicació $(^NameDA) de la següent carpeta. Per a desinstal·lar-lo d'una carpeta diferent, feu clic a Navega i seleccioneu-ne una altra. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Seleccioneu la carpeta des d'on es desinstal·larà l'aplicació $(^NameDA):","SpaceAvailable":"\"Espai lliure: \"","SpaceRequired":"\"Espai necessari: \"","UninstallingText":"Es desinstal·larà l'aplicació $(^NameDA) de la següent carpeta. $_CLICK","UninstallingSubText":"S'està desinstal·lant de:","FileError":"S'ha produït un error en obrir el fitxer en mode d'escriptura: \\r\\n\\t\"$0\"\\r\\nFeu clic a Abandona per a aturar la instal·lació,\\r\\nReintenta per a tornar-ho a provar, o\\r\\Ignora per a ometre aquest fitxer.","FileError_NoIgnore":"S'ha produït un error en obrir el fitxer en mode d'escriptura: \\r\\n\\t\"$0\"\\r\\nFeu clic a Reintenta per a tornar-ho a provar, o\\r\\Cancel·la per a aturar la instal·lació.","CantWrite":"\"No s'ha pogut escriure: \"","CopyFailed":"Ha fallat la còpia","CopyTo":"\"Copia a \"","Registering":"\"S'esta registrant:\"","Unregistering":"\"S'està suprimint el registre: \"","SymbolNotFound":"\"No s'ha trobat el símbol: \"","CouldNotLoad":"\"No s'ha pogut carregar: \"","CreateFolder":"\"Crea la carpeta: \"","CreateShortcut":"\"Crea la drecera: \"","CreatedUninstaller":"\"S'ha creat el desinstal·lador: \"","Delete":"\"S'ha suprimit el fitxer: \"","DeleteOnReboot":"\"Suprimeix en reiniciar: \"","ErrorCreatingShortcut":"\"S'ha produït un error en crear la drecera: \"","ErrorCreating":"S'ha produït un error en crear:","ErrorDecompressing":"S'ha produït un error en descomprimir les dades! L'instal·lador està corrupte?","ErrorRegistering":"S'ha produït un error en registrar una DLL","ExecShell":"\"Executa l'ordre: \"","Exec":"\"Executa:\"","Extract":"\"Extreu: \"","ErrorWriting":"\"Extreu: s'ha produït un error en escriure el fitxer \"","InvalidOpcode":"L'instal·lador està corrupte: el codi d'operació no és vàlid","NoOLE":"\"No hi ha OLE per a: \"","OutputFolder":"\"Carpeta de sortida: \"","RemoveFolder":"\"Suprimeix la carpeta: \"","RenameOnReboot":"\"Reanomena en reiniciar: \"","Rename":"\"Reanomena: \"","Skipped":"\"S'ha omès: \"","CopyDetails":"Copia els detalls al porta-retalls","LogInstall":"Registra el procés d'instal·lació","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 81 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1155,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Assistente d'Installazione di $(^Name)","UninstallCaption":"Disinstallazione di $(^Name)","LicenseSubCaption":": Cuntrattu d'Utilizazione","ComponentsSubCaption":": Ozzioni d'Installazione","DirSubCaption":": Cartulare d'Installazione","InstallingSubCaption":": Installazione in corsu","CompletedSubCaption":": Compiu","UnComponentsSubCaption":": Ozzioni di Disinstallazione","UnDirSubCaption":": Cartulare di Disinstallazione","ConfirmSubCaption":": Cunfirmazione","UninstallingSubCaption":": Disinstallazione in corsu","UnCompletedSubCaption":": Compiu","BackBtn":"< &Precedente","NextBtn":"&Seguente >","AgreeBtn":"&Accunsentu","AcceptBtn":"Sò d'&accunsentu cù i termini di u Cuntrattu di Licenza","DontAcceptBtn":"Ùn sò &micca d'accunsentu cù i termini di u Cuntrattu di Licenza","InstallBtn":"&Installà","UninstallBtn":"&Disinstallà","CancelBtn":"Abbandunà","CloseBtn":"&Chjode","BrowseBtn":"&Sfuglià...","ShowDetailsBtn":"Affissà i &ditaglii","ClickNext":"Sceglie Seguente per cuntinuà.","ClickInstall":"Sceglie Installà per principià l'installazione.","ClickUninstall":"Sceglie Disinstallà per principià a disinstallazione.","Name":"Nome","Completed":"Compiu","LicenseText":"Ci vole à leghje u cuntrattu di licenza nanzu d'installà $(^NameDA). S'è voi site d'accunsentu cù tutti i termini di u cuntrattu, sceglie Accunsentu.","LicenseTextCB":"Ci vole à leghje u cuntrattu di licenza nanzu d'installà $(^NameDA). S'è voi site d'accunsentu cù tutti i termini di u cuntrattu, sceglie a casella inghjò. $_CLICK","LicenseTextRB":"Ci vole à leghje u cuntrattu di licenza nanzu d'installà $(^NameDA). S'è voi site d'accunsentu cù tutti i termini di u cuntrattu, sceglie a prima ozzione inghjò. $_CLICK","UnLicenseText":"Ci vole à leghje u cuntrattu di licenza nanzu di disinstallà $(^NameDA). S'è voi site d'accunsentu cù tutti i termini di u cuntrattu, sceglie Accunsentu.","UnLicenseTextCB":"Ci vole à leghje u cuntrattu di licenza nanzu di disinstallà $(^NameDA). S'è voi site d'accunsentu cù tutti i termini di u cuntrattu, sceglie a casella inghjò. $_CLICK","UnLicenseTextRB":"Ci vole à leghje u cuntrattu di licenza nanzu di disinstallà $(^NameDA). S'è voi site d'accunsentu cù tutti i termini di u cuntrattu, sceglie a prima ozzione inghjò. $_CLICK","Custom":"Persunalizatu","ComponentsText":"Selezziunà i cumpunenti chì voi vulete installà è viutà a casella di quelli ch'ellu ùn ci vole à installà. $_CLICK","ComponentsSubText1":"Selezziunà u tipu d'installazione :","ComponentsSubText2_NoInstTypes":"Selezziunà i cumpunenti à installà :","ComponentsSubText2":"Osinnò, selezziunà i cumpunenti addizziunali chì voi vulete installà :","UnComponentsText":"Selezziunà i cumpunenti chì voi vulete disinstallà è viutà a casella di quelli ch'ellu ùn ci vole à disinstallà. $_CLICK","UnComponentsSubText1":"Selezziunà u tipu di disinstallazione :","UnComponentsSubText2_NoInstTypes":"Selezziunà i cumpunenti à disinstallà :","UnComponentsSubText2":"Osinnò, selezziunà i cumpunenti addizziunali chì voi vulete disinstallà :","DirText":"L'Assistente hà da installà $(^NameDA) in quessu cartulare. Per installà in un altru cartulare, sceglie Sfuglià è selezziunà un altru cartulare. $_CLICK","DirSubText":"Cartulare di Destinazione","DirBrowseText":"Selezziunà u cartulare d'installazione di $(^NameDA) :","UnDirText":"L'Assistente hà da disinstallà $(^NameDA) da quessu cartulare. Per disinstallà da un altru cartulare, sceglie Sfuglià è selezziunà un altru cartulare. $_CLICK","UnDirSubText":"Cartulare d'Installazione","UnDirBrowseText":"Selezziunà u cartulare di disinstallazione di $(^NameDA) :","SpaceAvailable":"Spaziu dispunibule : ","SpaceRequired":"Spaziu richiestu : ","UninstallingText":"$(^NameDA) serà disinstallatu da quessu cartulare. $_CLICK","UninstallingSubText":"Disinstallazione da :","FileError":"Sbagliu durante l'accessu in scrittura di u schedariu : \\r\\n\\r\\n$0\\r\\n\\r\\nSceglie Interrompe per piantà l'installazione,\\r\\nTorna per pruvà torna, o\\r\\nIgnurà per ignurà u schedariu.","FileError_NoIgnore":"Sbagliu durante l'accessu in scrittura di u schedariu : \\r\\n\\r\\n$0\\r\\n\\r\\nSceglie Torna per pruvà torna, o\\r\\nAbbandunà per piantà l'installazione.","CantWrite":"Ùn pò micca scrive : ","CopyFailed":"Fiascu di copia","CopyTo":"Cupià ver di ","Registering":"Arregistramentu : ","Unregistering":"Disarregistramentu : ","SymbolNotFound":"Ùn pò micca truvà di simbolu : ","CouldNotLoad":"Ùn pò micca caricà : ","CreateFolder":"Creazione di u cartulare : ","CreateShortcut":"Creazione di l'accurtatoghju : ","CreatedUninstaller":"Assistente di disinstallazione creatu : ","Delete":"Squassatura di schedariu : ","DeleteOnReboot":"Squassatura à l'avviu di l'urdinatore : ","ErrorCreatingShortcut":"Sbagliu durante a creazione di l'accurtatoghju : ","ErrorCreating":"Sbagliu durante a creazione di : ","ErrorDecompressing":"Sbagliu durante a scumprezzione di dati : Stalladore alteratu ?","ErrorRegistering":"Sbagliu durante l'arregistramentu di DLL","ExecShell":"ExecShell : ","Exec":"Eseguisce : ","Extract":"Estrae : ","ErrorWriting":"Estrae : sbagliu di scrittura ver di u schedariu ","InvalidOpcode":"Stalladore alteratu : opcode micca accettevule","NoOLE":"Alcunu OLE per : ","OutputFolder":"Cartulare di destinazione : ","RemoveFolder":"Caccià u cartulare : ","RenameOnReboot":"Rinumà à l'avviu di l'urdinatore : ","Rename":"Rinumà : ","Skipped":"Tralasciatu : ","CopyDetails":"Cupià i Ditaglii ver di u Preme'Papei","LogInstall":"Arregistrà u ghjurnale d'installazione","Byte":"o","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 82 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1050,"font":{"name":null,"size":null},"codepage":1250,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Instalacija programa $(^Name)","UninstallCaption":"Uklanjanje programa $(^Name)","LicenseSubCaption":": Uvjeti Ugovora o licenci","ComponentsSubCaption":": Instalacijske opcije","DirSubCaption":": Instalacijska mapa","InstallingSubCaption":": Instaliranje","CompletedSubCaption":": Završeno","UnComponentsSubCaption":": Opcije uklanjanja","UnDirSubCaption":": Mapa uklanjanja","ConfirmSubCaption":": Potvrda","UninstallingSubCaption":": Uklanjanje","UnCompletedSubCaption":": Završeno","BackBtn":"< &Natrag","NextBtn":"&Dalje >","AgreeBtn":"&Prihvaćam","AcceptBtn":"&Prihvaćam uvjete Ugovora o licenci","DontAcceptBtn":"&Ne prihvaćam uvjete Ugovora o licenci","InstallBtn":"&Instaliraj","UninstallBtn":"&Ukloni","CancelBtn":"Odustani","CloseBtn":"&Zatvori","BrowseBtn":"&Pregledaj...","ShowDetailsBtn":"Prikaži &detalje","ClickNext":"Za nastavak odaberite 'Dalje'.","ClickInstall":"Za početak instalacije odaberite 'Instaliraj'.","ClickUninstall":"Za početak uklanjanja odaberite 'Ukloni'.","Name":"Ime","Completed":"Završeno","LicenseText":"Pročitajte licencu prije instalacije programa $(^NameDA). Ukoliko prihvaćate sve uvjete ugovora, odaberite 'Prihvaćam'.","LicenseTextCB":"Pročitajte licencu prije instalacije programa $(^NameDA). Ukoliko prihvaćate sve uvjete ugovora, označite donji kvadratić. $_CLICK","LicenseTextRB":"Pročitajte licencu prije instalacije programa $(^NameDA). Ukoliko prihvaćate sve uvjete ugovora, odaberite prvu donju opciju. $_CLICK","UnLicenseText":"Pročitajte licencu prije uklanjanja programa $(^NameDA). Ukoliko prihvaćate sve uvjete ugovora, odaberite 'Prihvaćam'.","UnLicenseTextCB":"Pročitajte licencu prije uklanjanja programa $(^NameDA). Ukoliko prihvaćate sve uvjete ugovora, označite donji kvadratić. $_CLICK","UnLicenseTextRB":"Pročitajte licencu prije uklanjanja programa $(^NameDA). Ukoliko prihvaćate sve uvjete ugovora, odaberite prvu donju opciju. $_CLICK","Custom":"Posebna","ComponentsText":"Označite komponente koje želite instalirati i uklonite oznaku s onih koje ne želite instalirati. $_CLICK","ComponentsSubText1":"Izaberite tip instalacije:","ComponentsSubText2_NoInstTypes":"Odaberite komponente za instalaciju:","ComponentsSubText2":"Ili po izboru označite komponente koje želite instalirati:","UnComponentsText":"Označite komponente koje želite ukloniti i uklonite oznaku s onih koje ne želite ukloniti. $_CLICK","UnComponentsSubText1":"Izaberite tip uklanjanja:","UnComponentsSubText2_NoInstTypes":"Odaberite komponente za uklanjanje:","UnComponentsSubText2":"Ili po izboru označite komponente koje želite ukloniti:","DirText":"Program $(^NameDA) bit će instaliran u sljedeću mapu. Ako želite promijeniti odredište, pritisnite dugme za traženje mape i označite drugu mapu. $_CLICK","DirSubText":"Odredišna mapa","DirBrowseText":"Odaberite mapu u koju želite instalirati program $(^NameDA):","UnDirText":"Program $(^NameDA) bit će uklonjen iz sljedeće mape. Za uklanjanje s drugog mjesta odaberite 'Pregledaj' i označite drugu mapu. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Mapa iz koje će program $(^NameDA) biti uklonjen:","SpaceAvailable":"\"Slobodno prostora na disku: \"","SpaceRequired":"\"Potrebno prostora na disku: \"","UninstallingText":"Program $(^NameDA) bit će uklonjen iz sljedeće mape. $_CLICK","UninstallingSubText":"Uklanjam iz:","FileError":"Greška prilikom otvaranja datoteke za zapisivanje: \\r\\n\\r\\n$0\\r\\n\\r\\nPritisnite \"Abort\" ako želite prekinuti instalaciju,\\r\\n\"Retry\" ako želite pokušati ponovno, ili\\r\\n\"Ignore\" ako želite zanemariti tu datoteku","FileError_NoIgnore":"Greška prilikom otvaranja datoteke za zapisivanje: \\r\\n\\r\\n$0\\r\\n\\r\\nPritisnite \"Retry\" za ponovni pokušaj zapisivanja, ili\\r\\n\"Cancel\" za prekid instalacije","CantWrite":"\"Ne mogu zapisati: \"","CopyFailed":"Greška prilikom kopiranja","CopyTo":"\"Kopiraj u \"","Registering":"\"Prijava: \"","Unregistering":"\"Odjava: \"","SymbolNotFound":"\"Ne mogu naći simbol: \"","CouldNotLoad":"\"Ne mogu učitati: \"","CreateFolder":"\"Stvori mapu: \"","CreateShortcut":"\"Stvori prečac: \"","CreatedUninstaller":"\"Program za uklanjanje: \"","Delete":"\"Izbriši datoteku: \"","DeleteOnReboot":"\"Izbriši prilikom ponovnog pokretanja: \"","ErrorCreatingShortcut":"\"Greška prilikom stvaranja prečaca: \"","ErrorCreating":"\"Greška prilikom stvaranja: \"","ErrorDecompressing":"Greška dekompresije podataka! Oštećena instalacijska datoteka?","ErrorRegistering":"Greška prilikom prijavljivanja DLL-a","ExecShell":"\"ExecShell: \"","Exec":"\"Izvrši: \"","Extract":"\"Otpakiraj: \"","ErrorWriting":"\"Otpakiranje: greška zapisivanja u datoteku \"","InvalidOpcode":"Oštećena instalacijska datoteka: neispravan opkod","NoOLE":"\"Nema OLE za: \"","OutputFolder":"\"Izlazna mapa: \"","RemoveFolder":"\"Izbriši mapu: \"","RenameOnReboot":"\"Preimenuj prilikom ponovnog pokretanja: \"","Rename":"\"Preimenuj: \"","Skipped":"\"Preskočeno: \"","CopyDetails":"Kopiraj detalje u međuspremnik","LogInstall":"Logiraj instalacijski proces","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 83 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1029,"font":{"name":null,"size":null},"codepage":1250,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Instalace $(^Name)","UninstallCaption":"Odinstalace $(^Name)","LicenseSubCaption":": Licenční smlouva","ComponentsSubCaption":": Možnosti instalace","DirSubCaption":": Instalační složka","InstallingSubCaption":": Instalace","CompletedSubCaption":": Dokončeno","UnComponentsSubCaption":": Možnosti odinstalace","UnDirSubCaption":": Odinstalační složka","ConfirmSubCaption":": Potvrzení","UninstallingSubCaption":": Odinstalace","UnCompletedSubCaption":": Dokončeno","BackBtn":"< &Zpět","NextBtn":"&Další >","AgreeBtn":"Souhl&asím","AcceptBtn":"Souhl&asím s podmínkami licenční smlouvy","DontAcceptBtn":"&Nesouhlasím s podmínkami licenční smlouvy","InstallBtn":"&Instalovat","UninstallBtn":"&Odinstalovat","CancelBtn":"Storno","CloseBtn":"&Zavřít","BrowseBtn":"P&rocházet...","ShowDetailsBtn":"&Podrobnosti","ClickNext":"Pokračujte kliknutím na tlačítko Další.","ClickInstall":"Instalaci spustíte kliknutím na tlačítko Instalovat.","ClickUninstall":"Odinstalaci spustíte kliknutím na tlačítko Odinstalovat.","Name":"Název","Completed":"Dokončeno","LicenseText":"Před instalací programu $(^NameDA) si prosím přečtěte licenční smlouvu. Jestliže souhlasíte s podmínkami této smlouvy, klikněte na tlačítko Souhlasím.","LicenseTextCB":"Před instalací programu $(^NameDA) si prosím přečtěte licenční smlouvu. Jestliže souhlasíte s podmínkami této smlouvy, zaškrtněte políčko níže. $_CLICK","LicenseTextRB":"Před instalací programu $(^NameDA) si prosím přečtěte licenční smlouvu. Jestliže souhlasíte s podmínkami této smlouvy, vyberte níže první možnost. $_CLICK","UnLicenseText":"Před odinstalací programu $(^NameDA) si prosím přečtěte licenční smlouvu. Jestliže souhlasíte s podmínkami této smlouvy, klikněte na tlačítko Souhlasím.","UnLicenseTextCB":"Před odinstalací programu $(^NameDA) si prosím přečtěte licenční smlouvu. Jestliže souhlasíte s podmínkami této smlouvy, zaškrtněte políčko níže. $_CLICK","UnLicenseTextRB":"Před odinstalací programu $(^NameDA) si prosím přečtěte licenční smlouvu. Jestliže souhlasíte s podmínkami této smlouvy, vyberte níže první možnost. $_CLICK","Custom":"Vlastní","ComponentsText":"Zaškrtněte součásti, které chcete nainstalovat a zrušte zaškrtnutí součástí, které nechcete nainstalovat. $_CLICK","ComponentsSubText1":"Zvolte způsob instalace:","ComponentsSubText2_NoInstTypes":"Vyberte součásti, které chcete nainstalovat.","ComponentsSubText2":"Nebo vyberte volitelné součásti, které chcete nainstalovat.","UnComponentsText":"Zaškrtněte součásti, které chcete odinstalovat a zrušte zaškrtnutí součástí, které nechcete odinstalovat. $_CLICK","UnComponentsSubText1":"Zvolte způsob odinstalace:","UnComponentsSubText2_NoInstTypes":"Vyberte součásti, které chcete odinstalovat.","UnComponentsSubText2":"Nebo vyberte volitelné součásti, které chcete odinstalovat.","DirText":"Instalační program nainstaluje program $(^NameDA) do následující složky. Chcete-li instalovat do jiné složky, klikněte na tlačítko Procházet a vyberte jinou složku. $_CLICK","DirSubText":"Cílová složka","DirBrowseText":"Výběr instalační složky programu $(^NameDA).","UnDirText":"Odinstalační program odinstaluje program $(^NameDA) z následující složky. Chcete-li odinstalovat z jiné složky, klikněte na tlačítko Procházet a vyberte jinou složku. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Vyberte odinstalační složku programu $(^NameDA):","SpaceAvailable":"\"Volné místo: \"","SpaceRequired":"\"Požadované místo: \"","UninstallingText":"Program $(^NameDA) bude odinstalován z následující složky. $_CLICK","UninstallingSubText":"Odinstalovat z:","FileError":"Soubor nelze otevřít pro zápis: \\r\\n\\t\"$0\"\\r\\nKlikněte na tlačítko Přerušit k ukončení instalace,\\r\\nnebo na tlačítko Opakovat k zopakování akce, nebo\\r\\n na tlačítko Ignorovat k přeskočení souboru.","FileError_NoIgnore":"Soubor nelze otevřít pro zápis: \\r\\n\\t\"$0\"\\r\\nKlikněte na tlačítko Opakovat k zopakování akce, nebo\\r\\n na tlačítko Storno k ukončení instalace.","CantWrite":"\"Nelze zapsat: \"","CopyFailed":"Kopírování se nezdařilo.","CopyTo":"\"Kopírování do \"","Registering":"\"Registrace: \"","Unregistering":"\"Rušení registrace: \"","SymbolNotFound":"\"Nelze najít symbol: \"","CouldNotLoad":"\"Nelze načíst: \"","CreateFolder":"\"Vytváření složky: \"","CreateShortcut":"\"Vytváření zástupce: \"","CreatedUninstaller":"\"Vytváření odinstalačního programu: \"","Delete":"\"Odstraňování souboru: \"","DeleteOnReboot":"\"Odstranit při restartování: \"","ErrorCreatingShortcut":"\"Při vytváření zástupce došlo k chybě: \"","ErrorCreating":"\"Při vytváření došlo k chybě: \"","ErrorDecompressing":"Při dekompresi dat došlo k chybě. Byl poškozen instalační program?","ErrorRegistering":"Při registraci souborů DLL došlo k chybě.","ExecShell":"\"Spouštění prostředí: \"","Exec":"\"Spouštění: \"","Extract":"\"Extrahování: \"","ErrorWriting":"\"Extrakce: Při zápisu souboru došlo k chybě \"","InvalidOpcode":"Instalační program byl poškozen: neplatný operační kód.","NoOLE":"\"Nedostupné OLE pro: \"","OutputFolder":"\"Výstupní složka: \"","RemoveFolder":"\"Odstraňování složky: \"","RenameOnReboot":"\"Přejmenovat při restartování: \"","Rename":"\"Přejmenováno: \"","Skipped":"\"Přeskočeno: \"","CopyDetails":"Zkopírovat podrobnosti do schránky","LogInstall":"Protokolovat proces instalace","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 84 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1030,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) Installation","UninstallCaption":"$(^Name) Afinstallation","LicenseSubCaption":": Licensaftale","ComponentsSubCaption":": Installationsvalgmuligheder","DirSubCaption":": Installationsmappe","InstallingSubCaption":": Installerer","CompletedSubCaption":": Gennemført","UnComponentsSubCaption":": Afinstallationsvalgmuligheder","UnDirSubCaption":": Afinstallationsmappe","ConfirmSubCaption":": Bekræft","UninstallingSubCaption":": Afinstallerer","UnCompletedSubCaption":": Gennemført","BackBtn":"< &Tilbage","NextBtn":"&Næste >","AgreeBtn":"Jeg &accepterer","AcceptBtn":"Jeg &accepterer vilkårene i licensaftalen","DontAcceptBtn":"Jeg &accepterer ikke vilkårene i licensaftalen","InstallBtn":"&Installer","UninstallBtn":"&Afinstaller","CancelBtn":"Annuller","CloseBtn":"&Luk","BrowseBtn":"G&ennemse...","ShowDetailsBtn":"Vis &detaljer","ClickNext":"Tryk på Næste for at fortsætte.","ClickInstall":"Tryk på Installer for at starte installationen.","ClickUninstall":"Tryk på Afinstaller for at starte afinstallationen.","Name":"Navn","Completed":"Gennemført","LicenseText":"Gennemlæs venligst licensaftalen før installationen af $(^NameDA). Hvis du accepterer alle vilkår i aftalen, skal du klikke på Jeg accepterer.","LicenseTextCB":"Gennemlæs venligst licensaftalen før installationen af $(^NameDA). Hvis du accepterer alle vilkår i aftalen, skal du klikke på afkrydsningsfeltet nedenfor. $_CLICK","LicenseTextRB":"Gennemlæs venligst licensaftalen før installationen af $(^NameDA). Hvis du accepterer alle vilkår i aftalen, skal du vælge den første valgmulighed nedenfor. $_CLICK","UnLicenseText":"Gennemlæs venligst licensaftalen før afinstallationen af $(^NameDA). Hvis du accepterer alle vilkår i aftalen, skal du trykke på Jeg accepterer.","UnLicenseTextCB":"Gennemlæs venligst licensaftalen før afinstallationen af $(^NameDA). Hvis du accepterer alle vilkår i aftalen, skal du klikke på afkrydsningsfeltet nedenfor. $_CLICK","UnLicenseTextRB":"Gennemlæs venligst licensaftalen før afinstallationen af $(^NameDA). Hvis du accepterer alle vilkår i aftalen, skal du vælge den første valgmulighed nedenfor. $_CLICK","Custom":"Brugerdefineret","ComponentsText":"Tilvælg de komponenter du vil installere, og fravælg de komponenter du ikke vil installere. $_CLICK","ComponentsSubText1":"Vælg installationstype:","ComponentsSubText2_NoInstTypes":"Vælg de komponenter der skal installeres:","ComponentsSubText2":"Eller vælg de valgfrie komponenter du ønsker at installere:","UnComponentsText":"Tilvælg de komponenter du vil afinstallere, og fravælg de komponenter du ikke vil afinstallere. $_CLICK","UnComponentsSubText1":"Vælg afinstallationstype:","UnComponentsSubText2_NoInstTypes":"Vælg de komponenter der skal afinstalleres:","UnComponentsSubText2":"Eller vælg de valgfrie komponenter du ønsker at afinstallere:","DirText":"Installationsguiden vil installere $(^NameDA) i følgende mappe. For at installere i en anden mappe, tryk på Gennemse og vælg en anden mappe. $_CLICK","DirSubText":"Destinationsmappe","DirBrowseText":"Vælg den mappe hvori $(^NameDA) skal installeres:","UnDirText":"Installationsguiden vil afinstallere $(^NameDA) fra følgende mappe. For at afinstallere fra en anden mappe, tryk på Gennemse og vælg en anden mappe. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Vælg den mappe hvorfra $(^NameDA) skal afinstalleres:","SpaceAvailable":"\"Ledig plads: \"","SpaceRequired":"\"Nødvendig plads: \"","UninstallingText":"$(^NameDA) vil blive afinstalleret fra følgende mappe. $_CLICK","UninstallingSubText":"Afinstallerer fra:","FileError":"Fejl ved skrivning af fil til skrivning: \\r\\n\\r\\n$0\\r\\n\\r\\nTryk på Annuller for at stoppe installationen,\\r\\nPrøv igen for at prøve igen, eller\\r\\nIgnorer for at springe over denne fil.","FileError_NoIgnore":"Fejl ved åbning af fil til skrivning: \\r\\n\\r\\n$0\\r\\n\\r\\nTryk på Prøv igen for at prøve igen, eller\\r\\nAnnuller for at stoppe installationen.","CantWrite":"\"Kan ikke skrive: \"","CopyFailed":"Kopiering mislykkedes","CopyTo":"\"Kopier til \"","Registering":"\"Registrerer: \"","Unregistering":"\"Afregisterer: \"","SymbolNotFound":"\"Kunne ikke finde symbol: \"","CouldNotLoad":"\"Kunne ikke indlæse: \"","CreateFolder":"\"Opret mappe: \"","CreateShortcut":"\"Opret genvej: \"","CreatedUninstaller":"\"Afinstallationsguide oprettet: \"","Delete":"\"Slet fil: \"","DeleteOnReboot":"\"Slet ved genstart: \"","ErrorCreatingShortcut":"\"Fejl ved oprettelse af genvej: \"","ErrorCreating":"\"Fejl ved oprettelse: \"","ErrorDecompressing":"Fejl ved udpakning af data! Beskadiget installationsguide?","ErrorRegistering":"Fejl ved registrering af DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Kør: \"","Extract":"\"Udpak: \"","ErrorWriting":"\"Udpak: fejl ved skrivning til fil \"","InvalidOpcode":"Beskadiget installationsguide: ugyldig opcode","NoOLE":"\"Ingen OLE for: \"","OutputFolder":"\"Outputmappe: \"","RemoveFolder":"\"Slet mappe: \"","RenameOnReboot":"\"Omdøb ved genstart: \"","Rename":"\"Omdøb: \"","Skipped":"\"Sprunget over: \"","CopyDetails":"Kopier detaljer til udklipsholderen","LogInstall":"Log installationsproces","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 85 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1043,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name)-installatie","UninstallCaption":"$(^Name)-deïnstallatie","LicenseSubCaption":": Licentieovereenkomst","ComponentsSubCaption":": Installatieopties","DirSubCaption":": Installatiemap","InstallingSubCaption":": Bezig met installeren","CompletedSubCaption":": Voltooid","UnComponentsSubCaption":": Verwijderingsopties","UnDirSubCaption":": Te verwijderen map","ConfirmSubCaption":": Bevestiging","UninstallingSubCaption":": Bezig met verwijderen","UnCompletedSubCaption":": Voltooid","BackBtn":"< V&orige","NextBtn":"&Volgende >","AgreeBtn":"&Akkoord","AcceptBtn":"Ik &accepteer de overeenkomst","DontAcceptBtn":"Ik accepteer de overeenkomst &niet","InstallBtn":"&Installeren","UninstallBtn":"&Verwijderen","CancelBtn":"Annuleren","CloseBtn":"&Afsluiten","BrowseBtn":"&Bladeren...","ShowDetailsBtn":"&Details tonen","ClickNext":"Klik op Volgende om verder te gaan.","ClickInstall":"Klik op Installeren om de installatie te beginnen.","ClickUninstall":"Klik op Verwijderen om de deïnstallatie te beginnen.","Name":"Naam","Completed":"Voltooid","LicenseText":"Lees de licentieovereenkomst voordat u $(^NameDA) installeert. Klik op Akkoord als u de overeenkomst accepteert.","LicenseTextCB":"Lees de licentieovereenkomst voordat u $(^NameDA) installeert. Schakel het selectievakje hieronder in als u de overeenkomst accepteert. $_CLICK","LicenseTextRB":"Lees de licentieovereenkomst voordat u $(^NameDA) installeert. Selecteer de eerste optie hieronder als u de overeenkomst accepteert. $_CLICK","UnLicenseText":"Lees de licentieovereenkomst voordat u $(^NameDA) verwijdert. Klik op Akkoord als u de overeenkomst accepteert.","UnLicenseTextCB":"Lees de licentieovereenkomst voordat u $(^NameDA) verwijdert. Schakel het selectievakje hieronder in als u de overeenkomst accepteert. $_CLICK","UnLicenseTextRB":"Lees de licentieovereenkomst voordat u $(^NameDA) verwijdert. Selecteer de eerste optie hieronder als u de overeenkomst accepteert. $_CLICK","Custom":"Aangepast","ComponentsText":"Selecteer de onderdelen die u wilt installeren en deselecteer welke u niet wilt installeren. $_CLICK","ComponentsSubText1":"Selecteer het installatietype:","ComponentsSubText2_NoInstTypes":"Selecteer de onderdelen die moeten worden geïnstalleerd:","ComponentsSubText2":"Of selecteer de optionele onderdelen die moeten worden geïnstalleerd:","UnComponentsText":"Selecteer de onderdelen die u wilt verwijderen en deselecteer welke u niet wilt verwijderen. $_CLICK","UnComponentsSubText1":"Selecteer het type verwijdering:","UnComponentsSubText2_NoInstTypes":"Selecteer de onderdelen die moeten worden verwijderd:","UnComponentsSubText2":"Of selecteer de optionele onderdelen die moeten worden verwijderd:","DirText":"Setup zal $(^NameDA) in de volgende map installeren. Klik op Bladeren als u $(^NameDA) in een andere map wilt installeren en selecteer deze. $_CLICK","DirSubText":"Installatiemap","DirBrowseText":"Selecteer de map om $(^NameDA) in te installeren:","UnDirText":"Setup zal $(^NameDA) uit de volgende map verwijderen. Klik op Bladeren als u $(^NameDA) uit een andere map wilt verwijderen en selecteer deze. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Selecteer de map om $(^NameDA) uit te verwijderen:","SpaceAvailable":"\"Beschikbare ruimte: \"","SpaceRequired":"\"Vereiste ruimte: \"","UninstallingText":"$(^NameDA) zal uit de volgende map worden verwijderd. $_CLICK","UninstallingSubText":"Verwijderen uit:","FileError":"Fout bij het schrijven naar bestand: \\r\\n\\r\\n$0\\r\\n\\r\\nKlik op Afbreken om de installatie te stoppen,\\r\\nOpnieuw om het opnieuw te proberen of\\r\\nNegeren om dit bestand over te slaan.","FileError_NoIgnore":"Fout bij het schrijven naar bestand: \\r\\n\\r\\n$0\\r\\n\\r\\nKlik op Opnieuw om het opnieuw te proberen of \\r\\nAnnuleren om de installatie te stoppen.","CantWrite":"\"Kon niet schrijven: \"","CopyFailed":"Kopiëren mislukt","CopyTo":"\"Kopiëren naar \"","Registering":"\"Registreren: \"","Unregistering":"\"Deregistreren: \"","SymbolNotFound":"\"Kon symbool niet vinden: \"","CouldNotLoad":"\"Kon niet laden: \"","CreateFolder":"\"Map maken: \"","CreateShortcut":"\"Snelkoppeling maken: \"","CreatedUninstaller":"\"Deïnstallatieprogramma gemaakt: \"","Delete":"\"Bestand verwijderen: \"","DeleteOnReboot":"\"Verwijderen na opnieuw opstarten: \"","ErrorCreatingShortcut":"\"Fout bij maken snelkoppeling: \"","ErrorCreating":"\"Fout bij maken: \"","ErrorDecompressing":"Fout bij uitpakken van gegevens! Gegevens beschadigd?","ErrorRegistering":"Fout bij registreren DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Uitvoeren: \"","Extract":"\"Uitpakken: \"","ErrorWriting":"\"Uitpakken: fout bij schrijven naar bestand \"","InvalidOpcode":"Installatieprogramma beschadigd: ongeldige opcode","NoOLE":"\"Geen OLE voor: \"","OutputFolder":"\"Uitvoermap: \"","RemoveFolder":"\"Map verwijderen: \"","RenameOnReboot":"\"Hernoemen na opnieuw opstarten: \"","Rename":"\"Hernoemen: \"","Skipped":"\"Overgeslagen: \"","CopyDetails":"Details kopiëren naar klembord","LogInstall":"Gegevens over installatie bewaren","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 86 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1033,"font":{"name":null,"size":null},"codepage":null,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) Setup","UninstallCaption":"$(^Name) Uninstall","LicenseSubCaption":": License Agreement","ComponentsSubCaption":": Installation Options","DirSubCaption":": Installation Folder","InstallingSubCaption":": Installing","CompletedSubCaption":": Completed","UnComponentsSubCaption":": Uninstallation Options","UnDirSubCaption":": Uninstallation Folder","ConfirmSubCaption":": Confirmation","UninstallingSubCaption":": Uninstalling","UnCompletedSubCaption":": Completed","BackBtn":"< &Back","NextBtn":"&Next >","AgreeBtn":"I &Agree","AcceptBtn":"I &accept the terms of the License Agreement","DontAcceptBtn":"I &do not accept the terms of the License Agreement","InstallBtn":"&Install","UninstallBtn":"&Uninstall","CancelBtn":"Cancel","CloseBtn":"&Close","BrowseBtn":"B&rowse...","ShowDetailsBtn":"Show &details","ClickNext":"Click Next to continue.","ClickInstall":"Click Install to start the installation.","ClickUninstall":"Click Uninstall to start the uninstallation.","Name":"Name","Completed":"Completed","LicenseText":"Please review the license agreement before installing $(^NameDA). If you accept all terms of the agreement, click I Agree.","LicenseTextCB":"Please review the license agreement before installing $(^NameDA). If you accept all terms of the agreement, click the check box below. $_CLICK","LicenseTextRB":"Please review the license agreement before installing $(^NameDA). If you accept all terms of the agreement, select the first option below. $_CLICK","UnLicenseText":"Please review the license agreement before uninstalling $(^NameDA). If you accept all terms of the agreement, click I Agree.","UnLicenseTextCB":"Please review the license agreement before uninstalling $(^NameDA). If you accept all terms of the agreement, click the check box below. $_CLICK","UnLicenseTextRB":"Please review the license agreement before uninstalling $(^NameDA). If you accept all terms of the agreement, select the first option below. $_CLICK","Custom":"Custom","ComponentsText":"Check the components you want to install and uncheck the components you don't want to install. $_CLICK","ComponentsSubText1":"Select the type of install:","ComponentsSubText2_NoInstTypes":"Select components to install:","ComponentsSubText2":"Or, select the optional components you wish to install:","UnComponentsText":"Check the components you want to uninstall and uncheck the components you don't want to uninstall. $_CLICK","UnComponentsSubText1":"Select the type of uninstall:","UnComponentsSubText2_NoInstTypes":"Select components to uninstall:","UnComponentsSubText2":"Or, select the optional components you wish to uninstall:","DirText":"Setup will install $(^NameDA) in the following folder. To install in a different folder, click Browse and select another folder. $_CLICK","DirSubText":"Destination Folder","DirBrowseText":"Select the folder to install $(^NameDA) in:","UnDirText":"Setup will uninstall $(^NameDA) from the following folder. To uninstall from a different folder, click Browse and select another folder. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Select the folder to uninstall $(^NameDA) from:","SpaceAvailable":"\"Space available: \"","SpaceRequired":"\"Space required: \"","UninstallingText":"$(^NameDA) will be uninstalled from the following folder. $_CLICK","UninstallingSubText":"Uninstalling from:","FileError":"Error opening file for writing: \\r\\n\\r\\n$0\\r\\n\\r\\nClick Abort to stop the installation,\\r\\nRetry to try again, or\\r\\nIgnore to skip this file.","FileError_NoIgnore":"Error opening file for writing: \\r\\n\\r\\n$0\\r\\n\\r\\nClick Retry to try again, or\\r\\nCancel to stop the installation.","CantWrite":"\"Can't write: \"","CopyFailed":"Copy failed","CopyTo":"\"Copy to \"","Registering":"\"Registering: \"","Unregistering":"\"Unregistering: \"","SymbolNotFound":"\"Could not find symbol: \"","CouldNotLoad":"\"Could not load: \"","CreateFolder":"\"Create folder: \"","CreateShortcut":"\"Create shortcut: \"","CreatedUninstaller":"\"Created uninstaller: \"","Delete":"\"Delete file: \"","DeleteOnReboot":"\"Delete on reboot: \"","ErrorCreatingShortcut":"\"Error creating shortcut: \"","ErrorCreating":"\"Error creating: \"","ErrorDecompressing":"Error decompressing data! Corrupted installer?","ErrorRegistering":"Error registering DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Execute: \"","Extract":"\"Extract: \"","ErrorWriting":"\"Extract: error writing to file \"","InvalidOpcode":"Installer corrupted: invalid opcode","NoOLE":"\"No OLE for: \"","OutputFolder":"\"Output folder: \"","RemoveFolder":"\"Remove folder: \"","RenameOnReboot":"\"Rename on reboot: \"","Rename":"\"Rename: \"","Skipped":"\"Skipped: \"","CopyDetails":"Copy Details To Clipboard","LogInstall":"Log install process","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 87 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":9998,"font":{"name":null,"size":null},"codepage":null,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Instalado de $(^Name)","UninstallCaption":"Malinstalado de $(^Name)","LicenseSubCaption":": Permes-Kontrakto","ComponentsSubCaption":": Instaladaj Opcioj","DirSubCaption":": Instalada Dosierujo","InstallingSubCaption":": Oni Instalas Dosierojn","CompletedSubCaption":": Kompletite","UnComponentsSubCaption":": Malinstaladaj Opcioj","UnDirSubCaption":": Malinstalada Dosierujo","ConfirmSubCaption":": Konfirmo","UninstallingSubCaption":": Oni malinstalas","UnCompletedSubCaption":": Kompletite","BackBtn":"< &Antauxe","NextBtn":"&Sekve >","AgreeBtn":"&Akceptite","AcceptBtn":"Mi &akceptas la kondicxojn de la Permes-Kontrakto","DontAcceptBtn":"Mi &ne akceptas la kondicxojn de la Permes-Kontrakto","InstallBtn":"&Instali","UninstallBtn":"&Malinstali","CancelBtn":"Nuligi","CloseBtn":"&Fermi","BrowseBtn":"&Sercxi...","ShowDetailsBtn":"Vidi &Detalojn","ClickNext":"Musklaku en 'Sekve' por dauxrigi.","ClickInstall":"Musklaku en 'Instali' por ekigi la instaladon.","ClickUninstall":"Musklaku en 'Malinstali' por ekigi la malinstaladon.","Name":"Nomo","Completed":"Kompletite","LicenseText":"Bonvole revidu la permes-akordon antaux ol instali $(^NameDA). Se vi konsentas kun cxiuj kondicxoj de la permeso, musklaku en 'Akceptite'.","LicenseTextCB":"Bonvole revidu la permes-akordon antaux ol instali $(^NameDA). Se vi konsentas kun cxiuj kondicxoj de la permeso, musklaku en la suba elekt-skatolo. $_CLICK","LicenseTextRB":"Bonvole revidu la permes-akordon antaux ol instali $(^NameDA). Se vi konsentas kun cxiuj kondicxoj de la permeso, elektu la unuan opcion sube. $_CLICK","UnLicenseText":"Bonvole revidu la permes-akordon antaux ol malinstali $(^NameDA). Se vi konsentas kun cxiuj kondicxoj de la permeso, musklaku en 'Akceptite'.","UnLicenseTextCB":"Bonvole revidu la permes-akordon antaux ol malinstali $(^NameDA). Se vi konsentas kun cxiuj kondicxoj de la permeso, musklaku en la suba elekt-skatolo. $_CLICK","UnLicenseTextRB":"Bonvole revidu la permes-akordon antaux ol malinstali $(^NameDA). Se vi konsentas kun cxiuj kondicxoj de la permeso, elektu la unuan opcion sube. $_CLICK","Custom":"Personigite","ComponentsText":"Marku la konsisterojn, kiujn vi deziras instali kaj malmarku tiujn, kiujn vi ne deziras instali. $_CLICK","ComponentsSubText1":"Elektu la tipon de instalado:","ComponentsSubText2_NoInstTypes":"Elektu la konsisterojn por instali:","ComponentsSubText2":"Aux, elektu la nedevigajn konsisterojn, kiujn vi deziras instali:","UnComponentsText":"Marku la konsisterojn, kiujn vi volas malinstali aux male. $_CLICK ","UnComponentsSubText1":"Elektu la tipon de malinstalado:","UnComponentsSubText2_NoInstTypes":"Elektu la konsisterojn por malinstali:","UnComponentsSubText2":"Aux, elektu la nedevigajn konsisterojn, kiujn vi deziras malinstali:","DirText":"$(^NameDA) estos instalita en la jena dosierujo. Por instali en alia dosierujo, musklaku en 'Sercxi...' kaj elektu gxin. $_CLICK","DirSubText":"Celota Dosierujo","DirBrowseText":"Elektu dosierujon por instali $(^NameDA):","UnDirText":"$(^NameDA) estos malinstalita el la jena dosierujo. Por malinstali en alia dosierujo, musklaku en 'Sercxi...' kaj elektu gxin. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Elektu dosierujon el kie $(^NameDA) estos malinstalita:","SpaceAvailable":"\"Disponebla spaco: \"","SpaceRequired":"\"Postulata spaco: \"","UninstallingText":"$(^NameDA) estos malinstalita el la jena dosierujo. $_CLICK","UninstallingSubText":"Malinstalado el:","FileError":"Eraro dum malfermo de dosiero por skribi: \\r\\n\\t\"$0\"\\r\\nMusklaku en Cxesigi por finigi la instaladon,\\r\\Ripeti por provi refoje skribi sur la dosiero, aux\\r\\nPreteratenti por preteratenti tiun cxi dosieron.","FileError_NoIgnore":"Eraro dum malfermo de dosierujo por skribi: \\r\\n\\t\"$0\"\\r\\nMusklaku en Ripeti por provi refoje skribi sur la dosiero, aux\\r\\nNuligi por cxesigi la instaladon.","CantWrite":"\"Ne eblis skribi: \"","CopyFailed":"Malsukceso dum kopio","CopyTo":"\"Kopii al \"","Registering":"\"Oni registras: \"","Unregistering":"\"Oni malregistras: \"","SymbolNotFound":"\"Ne trovita simbolo: \"","CouldNotLoad":"\"Ne eblis sxargi: \"","CreateFolder":"\"Oni kreas subdosierujon: \"","CreateShortcut":"\"Oni kreas lancxilon: \"","CreatedUninstaller":"\"Oni kreas malinstalilon: \"","Delete":"\"Oni forigas dosieron: \"","DeleteOnReboot":"\"Forigi je restarto: \"","ErrorCreatingShortcut":"\"Eraro dum kreo de lancxilo: \"","ErrorCreating":"\"Eraro dum kreo: \"","ErrorDecompressing":"Eraro dum malkompaktigo de datumaro! Cxu misrompita instalilo?","ErrorRegistering":"Eraru dum registro de DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Lancxi: \"","Extract":"\"Eltiri: \"","ErrorWriting":"\"Eltirado: eraro dum skribo de dosiero \"","InvalidOpcode":"Misrompita instalilo: malvalida operaci-kodo","NoOLE":"\"Sen OLE por: \"","OutputFolder":"\"Celota dosierujo: \"","RemoveFolder":"\"Oni forigas la dosierujon: \"","RenameOnReboot":"\"Renomigi je restarto: \"","Rename":"\"Oni renomigas: \"","Skipped":"\"Preterpasita: \"","CopyDetails":"Kopii detalojn al la tondejo","LogInstall":"Registri instalad-procezo","Byte":"B","Kilo":" k","Mega":" M","Giga":" G"}};

/***/ }),
/* 88 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1061,"font":{"name":null,"size":null},"codepage":1257,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) Paigaldamine","UninstallCaption":"$(^Name) Eemaldamine","LicenseSubCaption":": Litsentsileping","ComponentsSubCaption":": Paigaldusvalikud","DirSubCaption":": Paigalduskaust","InstallingSubCaption":": Paigaldan\t\t\t","CompletedSubCaption":": Valmis","UnComponentsSubCaption":": Eemaldusvalikud","UnDirSubCaption":": Eemalduskaust","ConfirmSubCaption":": Kinnitus","UninstallingSubCaption":": Eemaldan","UnCompletedSubCaption":": Valmis","BackBtn":"< Tagasi","NextBtn":"Edasi >","AgreeBtn":"Nõustun","AcceptBtn":"Nõustun litsentsilepingu tingimustega","DontAcceptBtn":"Ei nõustu litsentsilepingu tingimustega","InstallBtn":"Paigalda","UninstallBtn":"Eemalda","CancelBtn":"Loobu","CloseBtn":"Sule","BrowseBtn":"Sirvi...","ShowDetailsBtn":"Detailid","ClickNext":"Jätkamiseks vajuta Edasi.","ClickInstall":"Paigaldamise alustamiseks vajuta Paigalda.","ClickUninstall":"Eemaldamise alustamiseks vajuta Eemalda.","Name":"Nimi","Completed":"Valmis","LicenseText":"Enne $(^NameDA) paigaldamist vaata palun litsentsileping üle. Kui sa nõustud kõigi lepingu tingimustega, vajuta Nõustun.","LicenseTextCB":"Enne $(^NameDA) paigaldamist vaata palun litsentsileping üle. Kui sa nõustud kõigi lepingu tingimustega, vali allolev märkeruut. $_CLICK","LicenseTextRB":"Enne $(^NameDA) paigaldamist vaata palun litsentsileping üle. Kui sa nõustud kõigi lepingu tingimustega, märgi allpool esimene valik. $_CLICK","UnLicenseText":"Enne $(^NameDA) eemaldamist vaata palun litsentsileping üle. Kui sa nõustud kõigi lepingu tingimustega, vajuta Nõustun.","UnLicenseTextCB":"Enne $(^NameDA) eemaldamist vaata palun litsentsileping üle. Kui sa nõustud kõigi lepingu tingimustega, vali allolev märkeruut. $_CLICK","UnLicenseTextRB":"Enne $(^NameDA) eemaldamist vaata palun litsentsileping üle. Kui sa nõustud kõigi lepingu tingimustega, märgi allpool esimene valik. $_CLICK","Custom":"Kohandatud","ComponentsText":"Märgista komponendid mida soovid paigaldada ja eemalda märgistus neilt, mida ei soovi paigaldada. $_CLICK","ComponentsSubText1":"Vali paigalduse tüüp:","ComponentsSubText2_NoInstTypes":"Vali paigaldatavad komponendid:","ComponentsSubText2":"või vali lisakomponendid mida soovid paigaldada:","UnComponentsText":"Märgista komponendid mida soovid eemaldada ja eemalda märgistus neilt, mida ei soovi eemaldada. $_CLICK","UnComponentsSubText1":"Vali eemalduse tüüp:","UnComponentsSubText2_NoInstTypes":"Vali eemaldatavad komponendid:","UnComponentsSubText2":"või vali lisakomponendid mida soovid eemaldada:","DirText":"$(^NameDA) paigaldatakse järgmisse kausta. Et mujale paigaldada, vajuta sirvi ja vali teine kaust. $_CLICK","DirSubText":"Sihtkaust","DirBrowseText":"Vali kaust kuhu $(^NameDA) paigaldada:","UnDirText":"$(^NameDA) eemaldatakse järgmisest kaustast. Et mujalt eemaldada, vajuta sirvi ja vali teine kaust. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Vali kaust kust $(^NameDA) eemaldada:","SpaceAvailable":"\"Vaba ruum: \"","SpaceRequired":"\"Vajalik ruum: \"","UninstallingText":"$(^NameDA) eemaldatakse järgmisest kaustast. $_CLICK","UninstallingSubText":"Eemaldan sealt:","FileError":"Tõrge faili avamisel kirjutamiseks: \\r\\n\\t\"$0\"\\r\\nPaigalduse katkestamiseks vajuta Katkesta,\\r\\nvajuta Ürita uuesti, et faili kirjutamist uuesti proovida, või\\r\\nIgnoreeri, et see fail vahele jätta.","FileError_NoIgnore":"Tõrge faili avamisel kirjutamiseks: \\r\\n\\t\"$0\"\\r\\nVajuta Ürita uuesti, et faili kirjutamist uuesti proovida, või\\r\\nLoobu, et paigaldamine katkestada","CantWrite":"\"Ei saa kirjutada: \"","CopyFailed":"Kopeerimine ebaõnnestus","CopyTo":"\"Kopeeri sinna \"","Registering":"\"Registreerin: \"","Unregistering":"\"Deregistreerin: \"","SymbolNotFound":"\"Ei leidnud sümbolit: \"","CouldNotLoad":"\"Ei saanud laadida: \"","CreateFolder":"\"Loo kaust: \"","CreateShortcut":"\"Loo otsetee: \"","CreatedUninstaller":"\"Loodud eemaldaja: \"","Delete":"\"Kustuta fail: \"","DeleteOnReboot":"\"Kustuta taaskäivitamisel: \"","ErrorCreatingShortcut":"\"Tõrge otsetee loomisel: \"","ErrorCreating":"\"Tõrge loomisel: \"","ErrorDecompressing":"Tõrge andmete lahtipakkimisel! Vigane paigaldaja?","ErrorRegistering":"Tõrge DLL-i registreerimisel","ExecShell":"\"ExecShell: \"","Exec":"\"Käivita: \"","Extract":"\"Paki lahti: \"","ErrorWriting":"\"Paki lahti: viga faili kirjutamisel \"","InvalidOpcode":"Paigaldaja kõlbmatu: vigane opkood","NoOLE":"\"No OLE for: \"","OutputFolder":"\"Väljastatav kaust: \"","RemoveFolder":"\"Eemalda kaust: \"","RenameOnReboot":"\"Taaskäivitusel nimeta ümber: \"","Rename":"\"Nimeta ümber: \"","Skipped":"\"Vahele jäetud: \"","CopyDetails":"Kopeeri detailid lõikelauale","LogInstall":"Logi paigaldusprotsess","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 89 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1065,"font":{"name":null,"size":null},"codepage":1256,"rtl":true,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"نصب $(^Name) ","UninstallCaption":"حذف $(^Name) ","LicenseSubCaption":": مجوز نصب","ComponentsSubCaption":": گزینه‌های نصب","DirSubCaption":": پوشه نصب","InstallingSubCaption":": در حال نصب","CompletedSubCaption":": پایان یافت","UnComponentsSubCaption":": گزینه‌های حذف","UnDirSubCaption":": پوشه‌ی حذف","ConfirmSubCaption":": تأیید","UninstallingSubCaption":": در حال حذف","UnCompletedSubCaption":": پایان یافت","BackBtn":"&قبل ","NextBtn":"&بعد","AgreeBtn":"&موافقم","AcceptBtn":"من همه‌ی بندهای مجوز را قبول &دارم","DontAcceptBtn":"من بندهای مجوز را قبول &ندارم","InstallBtn":"&نصب","UninstallBtn":"&حذف","CancelBtn":"انصراف","CloseBtn":"&بستن","BrowseBtn":"&مرور...","ShowDetailsBtn":"نمایش جزئیات","ClickNext":"برای ادامه روی دکمه‌ی بعد کلیک کنید.","ClickInstall":"برای شروع نصب روی دکمه‌ی نصب کلیک کنید.","ClickUninstall":"برای شروع حذف روی دکمه‌ی حذف کلیک کنید.","Name":"نام","Completed":"پایان یافت","LicenseText":"لطفاً قبل از نصب $(^NameDA) متن مجوز را بخوانید. اگر همه‌ی بندهای آن را قبول دارید روی دکمه‌ی موافقم کلیک کنید.","LicenseTextCB":"لطفاً قبل از نصب $(^NameDA) متن مجوز را بخوانید. اگر همه‌ی بندهای آن را قبول دارید روی جعبه نشانه‌زنی زیر کلیک کنید. $_CLICK","LicenseTextRB":"لطفاً قبل از نصب $(^NameDA) متن مجوز را بخوانید. اگر همه‌ی بندهای آن را قبول دارید گزینه‌ی اول را انتخاب کنید. $_CLICK","UnLicenseText":"لطفاً قبل از حذف $(^NameDA) متن مجوز را بخوانید. اگر همه‌ی بندهای آن را قبول دارید روی دکمه‌ی موافقم کلیک کنید.","UnLicenseTextCB":"لطفاً قبل از حذف $(^NameDA) متن مجوز را بخوانید. اگر همه‌ی بندهای آن را قبول دارید روی جعبه نشانه‌زنی زیر کلیک کنید. $_CLICK","UnLicenseTextRB":"لطفاً قبل از حذف $(^NameDA) متن مجوز را بخوانید. اگر همه‌ی بندهای آن را قبول دارید گزینه‌ی اول را انتخاب کنید. $_CLICK","Custom":"سفارشی","ComponentsText":"کنار بخش‌هایی که می‌خواهید نصب شوند نشانه بزنید و نشانه بخش‌هایی را که نمی‌خواهید نصب شوند بردارید. $_CLICK","ComponentsSubText1":"نوع نصب را مشخص کنید: ","ComponentsSubText2_NoInstTypes":"بخش‌هایی را که می‌خواهید نصب شوند انتخاب کنید:","ComponentsSubText2":"یا، بخش‌های اختیاری را که می‌خواهید نصب شوند انتخاب کنید: ","UnComponentsText":"کنار بخش‌هایی که می‌خواهید حذف شوند نشانه بزنید و نشانه بخش‌هایی را که نمی‌خواهید حذف شوند بردارید. $_CLICK","UnComponentsSubText1":"نوع حذف را انتخاب کنید: ","UnComponentsSubText2_NoInstTypes":"بخش‌هایی را که می‌خواهید حذف شوند انتخاب کنید:","UnComponentsSubText2":"یا، بخش‌های اختیاری را که می‌خواهید حذف شوند انتخاب کنید: ","DirText":"برنامه نصب، $(^NameDA) را در پوشه‌ی زیر نصب خواهد کرد. برای نصب در پوشه‌ی دیگر روی دکمه مرور کلیک کنید و پوشه‌ی دیگری انتخاب کنید. $_CLICK","DirSubText":"پوشه‌ی مقصد","DirBrowseText":"انتخاب پوشه برای نصب $(^NameDA):","UnDirText":"برنامه نصب، $(^NameDA) را از پوشه‌ی زیر حذف خواهد کرد. برای نصب در پوشه‌ی دیگر روی دکمه مرور کلیک کنید و پوشه‌ی دیگری انتخاب کنید. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"انتخاب پوشه برای حذف $(^NameDA):","SpaceAvailable":"\"فضای موجود: \"","SpaceRequired":"\"فضای مورد نیاز: \"","UninstallingText":"$(^NameDA) از پوشه‌ی زیر حذف خواهد شد. $_CLICK","UninstallingSubText":"حذف از: ","FileError":"خطا هنگام باز کردن پرونده برای نوشتن: \\r\\n\\r\\n$0\\r\\n\\n برای توقف نصب روی Abort \\r\\n برای تلاش مجدد روی Retry \\r\\n و برای صرف‌نظر از این پرونده روی Ignore کلیک کنید.","FileError_NoIgnore":"خطا هنگام باز کردن پرونده برای نوشتن: \\r\\n\\r\\n$0\\r\\n\\nبرای تلاش مجدد روی Retry\\r\\nو برای انصراف روی Cancel کلیک کنید.","CantWrite":"\"نوشتن ممکن نیست: \"","CopyFailed":"نسخه‌برداری ناموفق بود.","CopyTo":"\"نسخه‌برداری در: \"","Registering":"\"در حال ثبت: \"","Unregistering":"\"در حال حذف ثبت: \"","SymbolNotFound":"\"علامت پیدا نشد: \"","CouldNotLoad":"\"بارگذاری ممکن نیست: \"","CreateFolder":"\"ایجاد پوشه: \"","CreateShortcut":"\"ایجاد میان‌بُر: \"","CreatedUninstaller":"\"حذف‌کننده ایجاد شد: \"","Delete":"\"حذف پرونده: \"","DeleteOnReboot":"\"حذف هنگام راه اندازی مجدد: \"","ErrorCreatingShortcut":"\"خطا هنگام ایجاد میان‌بُر: \"","ErrorCreating":"\"خطا هنگام ایجاد: \"","ErrorDecompressing":"خطا هنگام باز کردن اطلاعات! نصب‌کننده خراب است؟","ErrorRegistering":"خطا هنگام ثبت DLL","ExecShell":"\"پوسته اجرایی: \"","Exec":"\"اجرا: \"","Extract":"\"استخراج: \"","ErrorWriting":"\"استخراج: خطا هنگام نوشتن در پرونده\"","InvalidOpcode":"نصب‌کننده خراب است: کد عملیاتی نامعتبر.","NoOLE":"\"‏OLE وجود ندارد: \"","OutputFolder":"\"پوشه‌ی خروجی: \"","RemoveFolder":"\"حذف پوشه: \"","RenameOnReboot":"\"تغییر نام هنگام راه اندازی مجدد: \"","Rename":"\"تغییر نام: \"","Skipped":"\"چشم پوشی شد: \"","CopyDetails":"نسخه‌برداری جزئیات در کلیپ‌برد","LogInstall":"ثبت روند نصب","Byte":" بایت","Kilo":" کیلو","Mega":" مگا","Giga":" گیگا"}};

/***/ }),
/* 90 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1035,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) -ohjelman asennus","UninstallCaption":"$(^Name) -ohjelman poisto","LicenseSubCaption":": Lisenssisopimus","ComponentsSubCaption":": Asennusvaihtoehdot","DirSubCaption":": Asennuskansio","InstallingSubCaption":": Asennetaan","CompletedSubCaption":": Valmis","UnComponentsSubCaption":": Poistovaihtoehdot","UnDirSubCaption":": Poistokansio","ConfirmSubCaption":": Varmistus","UninstallingSubCaption":": Poistetaan","UnCompletedSubCaption":": Valmis","BackBtn":"< &Takaisin","NextBtn":"&Seuraava >","AgreeBtn":"&Hyväksyn","AcceptBtn":"Hyväksyn lisenssisopimuksen ehdot","DontAcceptBtn":"En hyväksy sopimuksen ehtoja","InstallBtn":"&Asenna","UninstallBtn":"&Poista","CancelBtn":"Peruuta","CloseBtn":"&Sulje","BrowseBtn":"S&elaa...","ShowDetailsBtn":"&Näytä tiedot","ClickNext":"Valitse Seuraava jatkaaksesi.","ClickInstall":"Valitse Asenna aloittaaksesi asennuksen.","ClickUninstall":"Valitse Poista poistaaksesi asennuksen.","Name":"Nimi","Completed":"Valmis","LicenseText":"Lue lisenssisopimus ennen asentamista. Jos hyväksyt sopimuksen kaikki ehdot, valitse Hyväksyn.","LicenseTextCB":"Lue lisenssisopimus ennen asentamista. Jos hyväksyt sopimuksen kaikki ehdot, laita rasti ruutuun. $_CLICK","LicenseTextRB":"Lue lisenssisopimus ennen asentamista. Jos hyväksyt sopimuksen kaikki ehdot, valitse ensimmäinen vaihtoehto alapuolelta. $_CLICK","UnLicenseText":"Lue lisenssisopimus ennen poistamista. Jos hyväksyt sopimuksen kaikki ehdot, valitse Hyväksyn.","UnLicenseTextCB":"Lue lisenssisopimus ennen poistamista. Jos hyväksyt sopimuksen kaikki ehdot, laita rasti ruutuun. $_CLICK","UnLicenseTextRB":"Lue lisenssisopimus ennen poistamista. Jos hyväksyt sopimuksen kaikki ehdot, valitse ensimmäinen vaihtoehto alapuolelta. $_CLICK","Custom":"Oma","ComponentsText":"Valitse komponentit, jotka haluat asentaa, ja poista valinta komponenteista, joita et halua asentaa. $_CLICK","ComponentsSubText1":"Valitse asennustyyppi:","ComponentsSubText2_NoInstTypes":"Valitse asennettavat komponentit:","ComponentsSubText2":"Tai, valitse valinnaiset komponentit, jotka haluat asentaa:","UnComponentsText":"Valitse komponentit, jotka haluat poistaa, ja poista valinta komponenteista, joita et haluat poistaa. $_CLICK","UnComponentsSubText1":"Valitse poistotyyppi:","UnComponentsSubText2_NoInstTypes":"Valitse poistettavat komponentit:","UnComponentsSubText2":"Tai, valitse valinnaiset komponentit, jotka haluat poistaa","DirText":"$(^NameDA) -ohjelma asennetaan seuraavaan kansioon. Jos haluat asentaa sen johonkin muuhun kansioon, valitse Selaa, ja valitse toinen kansio. $_CLICK","DirSubText":"Kohdekansio","DirBrowseText":"Valitse kansio, johon haluat asentaa ohjelman $(^NameDA):","UnDirText":"Poistetaan ohjelman $(^NameDA) seuraavasta kansiosta. Jos haluat poistaa sen jostakin muusta kansiosta, valitse Selaa, ja valitse toinen kansio. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Valitse kansio, josta haluat poistaa ohjelman $(^NameDA):","SpaceAvailable":"\"Tilaa vapaana: \"","SpaceRequired":"\"Tarvittava tila: \"","UninstallingText":"Tämä ohjelma poistaa ohjelman $(^NameDA) tietokoneelta. $_CLICK","UninstallingSubText":"Poistetaan kansiosta:","FileError":"Tiedostoon ei voitu kirjoittaa: \\r\\n\\t\"$0\"\\r\\nLopeta asennus valitsemalla Hylkää,\\r\\nyritä uudelleen valitsemalla Uudelleen, tai\\r\\nohita tiedosto valitsemalla Ohita","FileError_NoIgnore":"Tiedostoon ei voitu kirjoittaa: \\r\\n\\t\"$0\"\\r\\nYritä uudelleen valitsemalla Uudelleen, tai\\r\\nlopeta asennus valitsemalla Hylkää","CantWrite":"\"Ei voi kirjoittaa: \"","CopyFailed":"Kopiointi epäonnistui","CopyTo":"\"Kopioidaan kohteeseen \"","Registering":"\"Rekisteröidään: \"","Unregistering":"\"Poistetaan rekisteröinti: \"","SymbolNotFound":"\"Symbolia ei löytynyt: \"","CouldNotLoad":"\"Ei voitu ladata: \"","CreateFolder":"\"Luo kansio: \"","CreateShortcut":"\"Luo pikakuvake: \"","CreatedUninstaller":"\"Poisto-ohjelma luotiin: \"","Delete":"\"Poista: \"","DeleteOnReboot":"\"Poista käynnistyksen yhteydessä: \"","ErrorCreatingShortcut":"\"Virhe luotaessa pikakuvaketta: \"","ErrorCreating":"\"Virhe luotaessa: \"","ErrorDecompressing":"Pakettia ei voitu purkaa. Korruptoitunut asennusohjelma?","ErrorRegistering":"Virhe rekisteröidessä DLL-tiedostoa","ExecShell":"\"ExecShell: \"","Exec":"\"Suorita: \"","Extract":"\"Pura: \"","ErrorWriting":"\"Pura: tiedostoon ei voitu kirjoittaa \"","InvalidOpcode":"Asennuspaketti on vioittunut: virheellinen opcode","NoOLE":"\"Ei OLEa: \"","OutputFolder":"\"Kansio: \"","RemoveFolder":"\"Poista kansio: \"","RenameOnReboot":"\"Muuta nimi uudelleenkäynnistyksen yhteydessä: \"","Rename":"\"Muuta nimi: \"","Skipped":"\"Ohitettiin: \"","CopyDetails":"Kopioi tiedot leikepöydälle","LogInstall":"Tallenna asennusloki","Byte":"t","Kilo":" k","Mega":" M","Giga":" G"}};

/***/ }),
/* 91 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1036,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Installation de $(^Name)","UninstallCaption":"Désinstallation de $(^Name)","LicenseSubCaption":": Licence","ComponentsSubCaption":": Options d'installation","DirSubCaption":": Dossier d'installation","InstallingSubCaption":": Installation des fichiers","CompletedSubCaption":": Terminé","UnComponentsSubCaption":": Options de désinstallation","UnDirSubCaption":": Dossier de désinstallation","ConfirmSubCaption":": Confirmation","UninstallingSubCaption":": Désinstallation des fichiers","UnCompletedSubCaption":": Terminé","BackBtn":"< &Précédent","NextBtn":"&Suivant >","AgreeBtn":"J'a&ccepte","AcceptBtn":"J'a&ccepte les termes de la licence","DontAcceptBtn":"Je &n'accepte pas les termes de la licence","InstallBtn":"&Installer","UninstallBtn":"&Désinstaller","CancelBtn":"Annuler","CloseBtn":"&Fermer","BrowseBtn":"P&arcourir...","ShowDetailsBtn":"P&lus d'infos","ClickNext":"Cliquez sur Suivant pour continuer.","ClickInstall":"Cliquez sur Installer pour démarrer l'installation.","ClickUninstall":"Cliquez sur Désinstaller pour démarrer la désinstallation.","Name":"Nom","Completed":"Terminé","LicenseText":"Veuillez examiner le contrat de licence avant d'installer $(^NameDA). Si vous acceptez tous les termes du contrat, cliquez sur J'accepte.","LicenseTextCB":"Veuillez examiner le contrat de licence avant d'installer $(^NameDA). Si vous acceptez tous les termes du contrat, cochez la boîte de contrôle ci-dessous. $_CLICK","LicenseTextRB":"Veuillez examiner le contrat de licence avant d'installer $(^NameDA). Si vous acceptez tous les termes du contrat, sélectionnez la première option ci-dessous. $_CLICK","UnLicenseText":"Veuillez examiner le contrat de licence avant de désinstaller $(^NameDA). Si vous acceptez tous les termes du contrat, cliquez sur J'accepte.","UnLicenseTextCB":"Veuillez examiner le contrat de licence avant de désinstaller $(^NameDA). Si vous acceptez tous les termes du contrat, cochez la boîte de contrôle ci-dessous. $_CLICK","UnLicenseTextRB":"Veuillez examiner le contrat de licence avant de désinstaller $(^NameDA). Si vous acceptez tous les termes du contrat, sélectionnez la première option ci-dessous. $_CLICK","Custom":"Personnalisée","ComponentsText":"Cochez les composants que vous désirez installer et décochez ceux que vous ne désirez pas installer. $_CLICK","ComponentsSubText1":"Type d'installation :","ComponentsSubText2_NoInstTypes":"Sélectionnez les composants à installer :","ComponentsSubText2":"Ou, sélectionnez les composants optionnels que vous voulez installer :","UnComponentsText":"Cochez les composants que vous désirez désinstaller et décochez ceux que vous ne désirez pas désinstaller. $_CLICK","UnComponentsSubText1":"Sélectionnez le type de désinstallation :","UnComponentsSubText2_NoInstTypes":"Sélectionnez les composants à désinstaller :","UnComponentsSubText2":"Ou, sélectionnez les composants optionnels que vous voulez désinstaller :","DirText":"Ceci installera $(^NameDA) dans le dossier suivant. Pour installer dans un autre dossier, cliquez sur Parcourir et choisissez un autre dossier. $_CLICK","DirSubText":"Dossier d'installation","DirBrowseText":"Sélectionnez le dossier d'installation pour $(^NameDA) :","UnDirText":"Ceci désinstallera $(^NameDA) du dossier suivant. Pour désinstaller d'un autre dossier, cliquez sur Parcourir et choisissez un autre dossier. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Sélectionnez le dossier de désinstallation pour $(^NameDA) :","SpaceAvailable":"\"Espace disponible : \"","SpaceRequired":"\"Espace requis : \"","UninstallingText":"Ce programme désinstallera $(^NameDA) de votre ordinateur. $_CLICK","UninstallingSubText":"Désinstallation à partir de :","FileError":"Erreur lors de l'ouverture du fichier en écriture : \\r\\n\\t\"$0\"\\r\\nAppuyez sur Abandonner pour annuler l'installation,\\r\\nRéessayer pour réessayer l'écriture du fichier, ou\\r\\nIgnorer pour passer ce fichier","FileError_NoIgnore":"Erreur lors de l'ouverture du fichier en écriture : \\r\\n\\t\"$0\"\\r\\nAppuyez sur Réessayez pour re-écrire le fichier, ou\\r\\nAnnuler pour abandonner l'installation","CantWrite":"\"Impossible d'écrire : \"","CopyFailed":"Échec de la copie","CopyTo":"\"Copier vers \"","Registering":"\"Enregistrement : \"","Unregistering":"\"Suppression de l'enregistrement : \"","SymbolNotFound":"\"Impossible de trouver un symbole : \"","CouldNotLoad":"\"Impossible de charger : \"","CreateFolder":"\"Création du dossier : \"","CreateShortcut":"\"Création du raccourci : \"","CreatedUninstaller":"\"Création de la désinstallation : \"","Delete":"\"Suppression : \"","DeleteOnReboot":"\"Suppression au redémarrage : \"","ErrorCreatingShortcut":"\"Erreur lors de la création du raccourci : \"","ErrorCreating":"\"Erreur de la création : \"","ErrorDecompressing":"Erreur lors de la décompression des données ! Installation corrompue ?","ErrorRegistering":"Erreur lors de l'enregistrement de la DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Exécution : \"","Extract":"\"Extraction : \"","ErrorWriting":"\"Extraction : erreur d'écriture du fichier \"","InvalidOpcode":"Installation corrompue : opcode incorrect","NoOLE":"\"Pas de OLE pour : \"","OutputFolder":"\"Destination : \"","RemoveFolder":"\"Suppression du dossier : \"","RenameOnReboot":"\"Renommer au redémarrage : \"","Rename":"\"Renommer : \"","Skipped":"\"Passé : \"","CopyDetails":"Copier les Détails dans le Presse-papier","LogInstall":"Enregistrer le déroulement de l'installation","Byte":"o","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 92 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1110,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Instalación de $(^Name)","UninstallCaption":"Desinstalación de $(^Name)","LicenseSubCaption":": Contrato de licenza","ComponentsSubCaption":": Opcións de instalación","DirSubCaption":": Diretória de instalación","InstallingSubCaption":": Instalando ficheiros","CompletedSubCaption":": Concluído","UnComponentsSubCaption":": Opcións de desinstalación","UnDirSubCaption":": Cartafol de desinstalación","ConfirmSubCaption":": Confirmación","UninstallingSubCaption":": Desinstalando","UnCompletedSubCaption":": Concluído","BackBtn":"< &Anterior","NextBtn":"&Seguinte >","AgreeBtn":"&Aceito","AcceptBtn":"Eu &aceito os termos do Contrato de licenza","DontAcceptBtn":"Eu &non aceito os termos do Contrato de licenza","InstallBtn":"&Instalar","UninstallBtn":"&Desinstalar","CancelBtn":"Cancelar","CloseBtn":"&Fechar","BrowseBtn":"&Procurar...","ShowDetailsBtn":"Ver &Detalles","ClickNext":"Clique en 'Seguinte' para continuar.","ClickInstall":"Clique en 'Instalar' para iniciar a instalación.","ClickUninstall":"Clique en 'Desinstalar' para iniciar a desinstalación.","Name":"Nome","Completed":"Concluído","LicenseText":"Por favor revexa o acordo de licenza antes de instalar $(^NameDA). Se concordar con todos os termos da licenza, clique em 'Aceito'.","LicenseTextCB":"Por favor reveja o acordo de licenza antes de instalar $(^NameDA). Se concordar con todos os termos da licenza, clique na caixa de selección abaixo. $_CLICK","LicenseTextRB":"Por favor revexa o acordo de licenza antes de instalar $(^NameDA). Se concordar con todos os termos da licenza, escolla a primeira opción abaixo. $_CLICK","UnLicenseText":"Por favor revexa o acordo de licenza antes de desinstalar $(^NameDA). Se concordar con todos os termos da licenza, clique em 'Aceito'.","UnLicenseTextCB":"Por favor reveja o acordo de licenza antes de desinstalar $(^NameDA). Se concordar con todos os termos da licenza, clique na caixa de selección abaixo. $_CLICK","UnLicenseTextRB":"Por favor revexa o acordo de licenza antes de desinstalar $(^NameDA). Se concordar con todos os termos da licenza, escolla a primeira opción abaixo. $_CLICK","Custom":"Personalizado","ComponentsText":"Marque os componentes que desexa instalar e desmarque os componentes que non desexa instalar. $_CLICK","ComponentsSubText1":"Escolla o tipo de instalación:","ComponentsSubText2_NoInstTypes":"Escolla os componentes para instalar:","ComponentsSubText2":"Ou, escolla os componentes opcionais que desexa instalar:","UnComponentsText":"Marque os componentes que queira desinstalar e vice versa. $_CLICK","UnComponentsSubText1":"Escolla o tipo de desinstalación:","UnComponentsSubText2_NoInstTypes":"Escolla os componentes para desinstalar:","UnComponentsSubText2":"Ou, escolla os componentes opcionais que queira desinstalar:","DirText":"O $(^NameDA) será instalado na seguinte directória. Para instalar nunha directória diferente, clique en 'Procurar...' e escolla outra directória. $_CLICK","DirSubText":"Directória de destino","DirBrowseText":"Escolla unha directória para instalar o $(^NameDA):","UnDirText":"O $(^NameDA) será desinstalado da seguinte directória. Para desinstalar dunha pasta diferente, clique en 'Procurar...' e escolla outra directória. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Escolla a directória de onde vai ser desinstalado o $(^NameDA):","SpaceAvailable":"\"Espazo disponíbel: \"","SpaceRequired":"\"Espazo necesário: \"","UninstallingText":"$(^NameDA) vai ser desinstalado da seguinte directória. $_CLICK","UninstallingSubText":"Desinstalando de:","FileError":"Erro ao abrir ficheiro para escrita: \\r\\n\\t\"$0\"\\r\\nClique en Abortar para abortar a instalación,\\r\\nRepetir para tentar novamente a escrita do ficheiro, ou\\r\\nIgnorar para ignorar este ficheiro.","FileError_NoIgnore":"Erro ao abrir ficheiro para escrita: \\r\\n\\t\"$0\"\\r\\nClique en Repetir para tentar novamente a gravación do ficheiro, ou\\r\\nCancelar para abortar a instalación.","CantWrite":"\"Non foi posíbel escreber: \"","CopyFailed":"Falla ao copiar","CopyTo":"\"Copiar para \"","Registering":"\"Rexistando: \"","Unregistering":"\"Desrexistando: \"","SymbolNotFound":"\"Símbolo non achado: \"","CouldNotLoad":"\"Non foi posíbel carregar: \"","CreateFolder":"\"Criando diretória: \"","CreateShortcut":"\"Criando atallo: \"","CreatedUninstaller":"\"Criando desinstalador: \"","Delete":"\"Eliminando ficheiro: \"","DeleteOnReboot":"\"Eliminar ao reiniciar: \"","ErrorCreatingShortcut":"\"Erro ao criar atallo: \"","ErrorCreating":"\"Erro ao criar: \"","ErrorDecompressing":"Erro ao descomprimir dados! Instalador corrompido?","ErrorRegistering":"Erro ao rexistar DLL","ExecShell":"\"Executando polo Shell: \"","Exec":"\"Executando: \"","Extract":"\"Extraindo: \"","ErrorWriting":"\"Extraindo: erro ao escreber ficheiro \"","InvalidOpcode":"Instalador corrompido: código de operación inválido","NoOLE":"\"Sen OLE para: \"","OutputFolder":"\"Cartafol de destino: \"","RemoveFolder":"\"Removendo cartafol: \"","RenameOnReboot":"\"Renomear ao reiniciar: \"","Rename":"\"Renomeando: \"","Skipped":"\"Ignorado: \"","CopyDetails":"Copiar detalles para a Área de transférencia","LogInstall":"Rexistar proceso de instalación","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 93 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1079,"font":{"name":null,"size":null},"codepage":1200,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"ჩატვირთვა $(^Name)","UninstallCaption":"$(^Name)–ის წაშლა","LicenseSubCaption":": სალიცენზიო შეთანხმება","ComponentsSubCaption":": ჩატვირთვის მონაცემები","DirSubCaption":": საინსტალაციო ფოლდერი","InstallingSubCaption":": ფაილების კოპირება","CompletedSubCaption":": ოპერაცია დასრულებულია","UnComponentsSubCaption":": წაშლის მონაცემები","UnDirSubCaption":": წაშლის ფოულდერი","ConfirmSubCaption":": თანხმობა","UninstallingSubCaption":": ფაილების წაშლა","UnCompletedSubCaption":": ოპერაცია დასრულებულია","BackBtn":"< &უკან","NextBtn":"&შემდეგ >","AgreeBtn":"ვეთანხმე&ბი","AcceptBtn":"&ვეთანხმები სალიცენზიო პირობებს","DontAcceptBtn":"&არ ვეთანხმები სალიცენზიო პირობებს","InstallBtn":"&ჩატვირთვა","UninstallBtn":"წაშ&ლა","CancelBtn":"უარი","CloseBtn":"&დახურვა","BrowseBtn":"დათ&ვალიერება...","ShowDetailsBtn":"&დეტალები...","ClickNext":"გასაგრძელებლად დააწკაპუნეთ ღილაკზე 'შემდეგ'.","ClickInstall":"დააწკაპუნეთ ღილაკზე 'ჩატვირთვა', პროგრამის ჩასატვირთად.","ClickUninstall":"დააწკაპუნეთ ღილაკზე 'წაშლა', პროგრამის წასაშლელად.","Name":"სახელი","Completed":"ჩაიტვირთა","LicenseText":"სანამ ჩაიტვირთება $(^NameDA) გაეცანით სალიცენზიო ხელშეკრულებას. თუ ეთანხმებით პირობებს დააწკაპუნეთ ღილაკზე 'თანხმობა'.","LicenseTextCB":"სანამ ჩაიტვირთება $(^NameDA) გაეცანით სალიცენზიო ხელშეკრულებას. თუ ეთანხმებით პირობებს მონიშნეთ ფანჯარა ქვემოთ. $_CLICK","LicenseTextRB":"სანამ ჩაიტვირთება $(^NameDA) გაეცანით სალიცენზიო ხელშეკრულებას. თუ ეთანხმებით პირობებს მონიშნეთ ქვემოთ მოცემული პირველი ვარიანტი. $_CLICK","UnLicenseText":"სანამ წაშლით $(^NameDA) გაეცანით სალიცენზიო ხელშეკრულებას. თუ ეთანხმებით პირობებს დააწკაპუნეთ ღილაკზე 'თანხმობა'.","UnLicenseTextCB":"სანამ წაშლით $(^NameDA) გაეცანით სალიცენზიო ხელშეკრულებას. თუ ეთანხმებით პირობებს მონიშნეთ ფანჯარა ქვემოთ. $_CLICK","UnLicenseTextRB":"სანამ წაშლით $(^NameDA) გაეცანით სალიცენზიო ხელშეკრულებას. თუ ეთანხმებით პირობებს მონიშნეთ ქვემოთ მოცემული პირველი ვარიანტი. $_CLICK","Custom":"სტანდარტული","ComponentsText":"აირჩიეთ ის კომპონენტები, რომლის ჩატვირთვაც გსურთ. $_CLICK","ComponentsSubText1":"აირჩიეთ ჩატვირთვის მეთოდი:","ComponentsSubText2_NoInstTypes":"ჩასატვირთად აირჩიეთ პროგრამის კომპონენტები:","ComponentsSubText2":"ან ჩასატვირთად აირჩიეთ პროგრამის დამატებითი კომპონენტები:","UnComponentsText":"აირჩიეთ ის კომპონენტები, რომლის წაშლაც გსურთ. $_CLICK","UnComponentsSubText1":"აირჩიეთ წაშლის მეთოდი:","UnComponentsSubText2_NoInstTypes":"წასაშლელად აირჩიეთ პროგრამის კომპონენტები:","UnComponentsSubText2":"ან წასაშლელად აირჩიეთ პროგრამის დამატებითი კომპონენტები:","DirText":"პროგრამა ჩაგიტვირთავთ $(^NameDA)–ის მითითებულ ფოლდერში. სხვა ადგილზე ჩასატვირთად დააწკაპუნეთ ღილაკზე 'დათვალიერება' და მიუთითეთ ადგილი. $_CLICK","DirSubText":"ჩატვირთვის ფოლდერი","DirBrowseText":"მითითეთ ფოლდერი სადაც უნდა ჩაიტვირთოს $(^NameDA):","UnDirText":"პროგრამა წაშლის $(^NameDA)–ის მითითებული ფოლდერიდან. სხვა ფოლდერიდან წასაშლელად დააწკაპუნეთ ღილაკზე 'დათვალიერება' და მიუთითეთ ადგილი. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"მიუთითეთ ფოლდერი საიდანაც უნდა წაიშალოს $(^NameDA):","SpaceAvailable":"\"Доступно на диске: \"","SpaceRequired":"\"Требуется на диске: \"","UninstallingText":"პროგრამა $(^NameDA) წაიშლება თქვენი კომპიუტერიდან. $_CLICK","UninstallingSubText":"წაშლა:","FileError":"არ იხსნება ფაილები ჩასაწერად: \\r\\n\\t\"$0\"\\r\\n'შეჩერება': შეჩერდეს ჩატვირთვა;\\r\\n\"გამეორება\": მცდელობის გამეორება;\\r\\n\"გამოტოვება\": ამ მოქმედების გამოტოვება.","FileError_NoIgnore":"არ იხსნება ფაილეი ჩასაწერად: \\r\\n\\t\"$0\"\\r\\n'გამეორება': მცდელობის გამეორება;\\r\\n'უარი': ჩატვირთვის პროცესის შეწყვეტა.","CantWrite":"\"არ იწერება: \"","CopyFailed":"შეცდომა ჩაწერის დროს","CopyTo":"\"კოპირება: \"","Registering":"\"რეგისტრირება: \"","Unregistering":"\"რეგისტრირებიდან მოხსნა: \"","SymbolNotFound":"\"ვერ მოიძებნა სიმბოლო: \"","CouldNotLoad":"\"ჩატვირთვა შეუძლებელია: \"","CreateFolder":"\"ფოლდერის შექმნა: \"","CreateShortcut":"\"იარლიყის შექმნა: \"","CreatedUninstaller":"\"წაშლის პროგრამის შექმნა: \"","Delete":"\"ფაილის წაშლა: \"","DeleteOnReboot":"\"წაიშლება კომპიუტერის გადატვირთვის დროს: \"","ErrorCreatingShortcut":"\"იარლიყის შექმნისას დაშვებულია შეცდომა: \" ","ErrorCreating":"\"შექმნისას დაშვებულია შეცდომა: \"","ErrorDecompressing":"შეცდომა მონაცემების გახსნისას! შესაძლოა საინსტალაციო პროგრამაა დაზიანებული.","ErrorRegistering":"არ რეგისტრირდება (DLL)","ExecShell":"\"ExecShell: \" ","Exec":"\"შესრულება: \"","Extract":"\"ამონაწერი: \"","ErrorWriting":"\"ამონაწერი: შეცდომაა დაშვებული ფაილის ჩაწერისას \"","InvalidOpcode":"საინსტალაციო პროგრამა დაზიანებულია: კოდი არ არსებობს","NoOLE":"\"OLE არ არის: \" ","OutputFolder":"\"ჩატვირთვის ფოლდერი: \"","RemoveFolder":"\"ფოლდერის წაშლა: \"","RenameOnReboot":"\"სახელის შეცვლა კომპიუტერის გადავირთვისას: \"","Rename":"\"სახელის შეცვლა: \"","Skipped":"\"გამოტოვა: \"","CopyDetails":"მონაცემების ბუფერში კოპირება ","LogInstall":"ჩატვირთვის აღწერა","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 94 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1031,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Installation von $(^Name)","UninstallCaption":"Deinstallation von $(^Name)","LicenseSubCaption":": Lizenzabkommen","ComponentsSubCaption":": Installations-Optionen","DirSubCaption":": Zielverzeichnis","InstallingSubCaption":": Wird installiert","CompletedSubCaption":": Fertig","UnComponentsSubCaption":": Deinstallations-Optionen","UnDirSubCaption":": Quellverzeichnis","ConfirmSubCaption":": Bestätigung","UninstallingSubCaption":": Wird entfernt","UnCompletedSubCaption":": Fertig","BackBtn":"< &Zurück","NextBtn":"&Weiter >","AgreeBtn":"&Annehmen","AcceptBtn":"Lizenzabkommen &akzeptieren","DontAcceptBtn":"Lizenzabkommen ab&lehnen","InstallBtn":"&Installieren","UninstallBtn":"&Deinstallieren","CancelBtn":"Abbrechen","CloseBtn":"&Beenden","BrowseBtn":"&Durchsuchen ...","ShowDetailsBtn":"&Details anzeigen","ClickNext":"Klicken Sie auf Weiter, um fortzufahren.","ClickInstall":"Klicken Sie auf Installieren, um die Installation zu starten.","ClickUninstall":"Klicken Sie auf Deinstallieren, um die Deinstallation zu starten.","Name":"Name","Completed":"Fertig","LicenseText":"Bitte lesen Sie das Lizenzabkommen, bevor Sie $(^NameDA) installieren. Wenn Sie alle Bedingungen des Abkommens akzeptieren, klicken Sie auf Annehmen.","LicenseTextCB":"Bitte lesen Sie das Lizenzabkommen, bevor Sie $(^NameDA) installieren. Wenn Sie alle Bedingungen des Abkommens akzeptieren, aktivieren Sie das Kontrollkästchen. $_CLICK","LicenseTextRB":"Bitte lesen Sie das Lizenzabkommen, bevor Sie $(^NameDA) installieren. Wenn Sie alle Bedingungen des Abkommens akzeptieren, wählen Sie die entsprechende Option. $_CLICK","UnLicenseText":"Bitte lesen Sie das Lizenzabkommen, bevor Sie $(^NameDA) entfernen. Wenn Sie alle Bedingungen des Abkommens akzeptieren, klicken Sie auf Annehmen.","UnLicenseTextCB":"Bitte lesen Sie das Lizenzabkommen, bevor Sie $(^NameDA) entfernen. Wenn Sie alle Bedingungen des Abkommens akzeptieren, aktivieren Sie das Kontrollkästchen. $_CLICK","UnLicenseTextRB":"Bitte lesen Sie das Lizenzabkommen, bevor Sie $(^NameDA) entfernen. Wenn Sie alle Bedingungen des Abkommens akzeptieren, wählen Sie die entsprechende Option. $_CLICK","Custom":"Benutzerdefiniert","ComponentsText":"Wählen Sie die Komponenten aus, die Sie installieren möchten, und wählen Sie diejenigen ab, die Sie nicht installiert werden sollen. $_CLICK","ComponentsSubText1":"Installations-Typ bestimmen:","ComponentsSubText2_NoInstTypes":"Wählen Sie die Komponenten aus, die Sie installieren möchten:","ComponentsSubText2":"oder wählen Sie zusätzliche Komponenten aus, die Sie installieren möchten:","UnComponentsText":"Wählen Sie die Komponenten aus, die Sie entfernen möchten, und wählen Sie diejenigen ab, die Sie nicht entfernt werden sollen. $_CLICK","UnComponentsSubText1":"Deinstallations-Typ bestimmen:","UnComponentsSubText2_NoInstTypes":"Wählen Sie die Komponenten aus, die Sie entfernen möchten:","UnComponentsSubText2":"oder wählen Sie zusätzliche Komponenten aus, die Sie entfernen möchten:","DirText":"$(^NameDA) wird in das unten angegebene Verzeichnis installiert. Falls Sie in ein anderes Verzeichnis installieren möchten, klicken Sie auf Durchsuchen und wählen Sie ein anderes Verzeichnis aus. $_CLICK","DirSubText":"Zielverzeichnis","DirBrowseText":"Wählen Sie das Verzeichnis aus, in das Sie $(^NameDA) installieren möchten:","UnDirText":"$(^NameDA) wird aus dem unten angegebenen Verzeichnis entfernt. Falls sich $(^NameDA) in einem anderen Verzeichnis befindet, klicken Sie auf Durchsuchen und wählen Sie das richtige Verzeichnis aus. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Wählen Sie das Verzeichnis aus, in dem sich $(^NameDA) befindet:","SpaceAvailable":"\"Verfügbarer Speicher: \"","SpaceRequired":"\"Benötigter Speicher: \"","UninstallingText":"$(^NameDA) wird aus dem unten angegebenen Verzeichnis entfernt. $_CLICK","UninstallingSubText":"Wird entfernt aus:","FileError":"Fehler beim Überschreiben der Datei: \\r\\n\\t\"$0\"\\r\\nKlicken Sie auf Abbrechen, um abzubrechen,\\r\\nauf Wiederholen, um den Schreibvorgang erneut zu versuchen,\\r\\noder auf Ignorieren, um diese Datei zu überspringen.","FileError_NoIgnore":"Fehler beim Überschreiben der Datei: \\r\\n\\t\"$0\"\\r\\nKlicken Sie auf Wiederholen, um den Schreibvorgang erneut zu versuchen,\\r\\noder auf Abbrechen, um die Installation zu beenden.","CantWrite":"\"Fehler beim Schreiben: \"","CopyFailed":"Kopieren fehlgeschlagen","CopyTo":"\"Wird kopiert nach \"","Registering":"\"Wird registriert: \"","Unregistering":"\"Wird deregistriert: \"","SymbolNotFound":"\"Symbol ist nicht vorhanden: \"","CouldNotLoad":"\"Fehler beim Laden von \"","CreateFolder":"\"Verzeichnis wird erstellt: \"","CreateShortcut":"\"Verknüpfung wird erstellt: \"","CreatedUninstaller":"\"Deinstallations-Programm wird erstellt: \"","Delete":"\"Datei wird gelöscht: \"","DeleteOnReboot":"\"Datei wird nach Neustart gelöscht: \"","ErrorCreatingShortcut":"\"Fehler beim Erstellen der Verknüpfung: \"","ErrorCreating":"\"Fehler beim Erstellen: \"","ErrorDecompressing":"Fehler beim Entpacken. Ist das Installations-Programm beschädigt?","ErrorRegistering":"Fehler beim Registrieren der DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Wird gestartet: \"","Extract":"\"Wird entpackt: \"","ErrorWriting":"\"Entpacken: Fehler beim Schreiben der Datei \"","InvalidOpcode":"Beschädigtes Installations-Programm: ungültiger Befehlscode","NoOLE":"\"Kein OLE für: \"","OutputFolder":"\"Zielverzeichnis: \"","RemoveFolder":"\"Verzeichnis wird entfernt: \"","RenameOnReboot":"\"Umbenennen nach Neustart: \"","Rename":"\"Umbenennen: \"","Skipped":"\"Übersprungen: \"","CopyDetails":"Details in die Zwischenablage kopieren","LogInstall":"Installationsverlauf protokollieren","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 95 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1032,"font":{"name":null,"size":null},"codepage":1253,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Εγκατάσταση του '$(^Name)'","UninstallCaption":"Απεγκατάσταση του '$(^Name)'","LicenseSubCaption":": Συμφωνία Άδειας Χρήσης","ComponentsSubCaption":": Επιλογές Εγκατάστασης","DirSubCaption":": Φάκελος Εγκατάστασης","InstallingSubCaption":": Εγκατάσταση σε εξέλιξη","CompletedSubCaption":": Ολοκληρώθηκε","UnComponentsSubCaption":": Επιλογές Απεγκατάστασης","UnDirSubCaption":": Φάκελος Απεγκατάστασης","ConfirmSubCaption":": Επιβεβαίωση","UninstallingSubCaption":": Απεγκατάσταση σε εξέλιξη","UnCompletedSubCaption":": Ολοκληρώθηκε","BackBtn":"< &Πίσω","NextBtn":"&Επόμενο >","AgreeBtn":"&Συμφωνώ","AcceptBtn":"&Αποδέχομαι τους όρους της άδειας χρήσης","DontAcceptBtn":"&Δεν αποδέχομαι τους όρους της άδειας χρήσης","InstallBtn":"&Εγκατάσταση","UninstallBtn":"Απε&γκατάστ.","CancelBtn":"Άκυρο","CloseBtn":"&Κλείσιμο","BrowseBtn":"Α&ναζήτηση...","ShowDetailsBtn":"&Λεπτομέρειες","ClickNext":"Κάντε κλικ στο Επόμενο για να συνεχίσετε.","ClickInstall":"Κάντε κλικ στο Εγκατάσταση για να αρχίσετε την εγκατάσταση.","ClickUninstall":"Κάντε κλικ στο Απεγκατάσταση για να αρχίσετε την απεγκατάσταση.","Name":"Όνομα","Completed":"Ολοκληρώθηκε","LicenseText":"Ελέγξτε την άδεια χρήσης πριν εγκαταστήσετε το '$(^NameDA)'. Εάν αποδέχεστε όλους τους όρους, κάντε κλικ στο Συμφωνώ.","LicenseTextCB":"Ελέγξτε την άδεια χρήσης πριν εγκαταστήσετε το '$(^NameDA)'. Εάν αποδέχεστε όλους τους όρους, κάντε κλικ στην επιλογή παρακάτω. $_CLICK","LicenseTextRB":"Ελέγξτε την άδεια χρήσης πριν εγκαταστήσετε το '$(^NameDA)'. Εάν αποδέχεστε όλους τους όρους, κάντε κλικ στην πρώτη επιλογή παρακάτω. $_CLICK","UnLicenseText":"Ελέγξτε την άδεια χρήσης πριν απεγκαταστήσετε το '$(^NameDA)'. Εάν αποδέχεστε όλους τους όρους, κάντε κλικ στο Συμφωνώ.","UnLicenseTextCB":"Ελέγξτε την άδεια χρήσης πριν απεγκαταστήσετε το '$(^NameDA)'. Εάν αποδέχεστε όλους τους όρους, κάντε κλικ στην επιλογή παρακάτω. $_CLICK","UnLicenseTextRB":"Ελέγξτε την άδεια χρήσης πριν απεγκαταστήσετε το '$(^NameDA)'. Εάν αποδέχεστε όλους τους όρους, κάντε κλικ στην πρώτη επιλογή παρακάτω. $_CLICK","Custom":"Προσαρμοσμένη","ComponentsText":"Επιλέξτε τα στοιχεία που θέλετε να εγκαταστήσετε και αποεπιλέξτε τα στοιχεία που δε θέλετε να εγκαταστήσετε. $_CLICK","ComponentsSubText1":"Επιλέξτε τύπο εγκατάστασης:","ComponentsSubText2_NoInstTypes":"Επιλέξτε τα στοιχεία που θέλετε να εγκαταστήσετε:","ComponentsSubText2":"Ή, επιλέξτε τα προαιρετικά στοιχεία που θέλετε να εγκαταστήσετε:","UnComponentsText":"Επιλέξτε τα στοιχεία που θέλετε να απεγκαταστήσετε και αποεπιλέξτε τα στοιχεία που δε θέλετε να απεγκαταστήσετε. $_CLICK","UnComponentsSubText1":"Επιλέξτε τύπο απεγκατάστασης:","UnComponentsSubText2_NoInstTypes":"Επιλέξτε τα στοιχεία που θέλετε να απεγκαταστήσετε:","UnComponentsSubText2":"Ή, επιλέξτε τα προαιρετικά στοιχεία που θέλετε να απεγκαταστήσετε:","DirText":"Το πρόγραμμα εγκατάστασης θα εγκαταστήσει το '$(^NameDA)' στον παρακάτω φάκελο. Για να το εγκαταστήσετε σε έναν άλλο φάκελο, κάντε κλικ στο Αναζήτηση και επιλέξτε κάποιον άλλο φάκελο. $_CLICK","DirSubText":"Φάκελος Εγκατάστασης","DirBrowseText":"Επιλέξτε το φάκελο εγκατάστασης για το '$(^NameDA)':","UnDirText":"Το πρόγραμμα εγκατάστασης θα απεγκαταστήσει το '$(^NameDA)' από τον παρακάτω φάκελο. Για να απεγκαταστήσετε από έναν άλλο φάκελο, κάντε κλικ στο Αναζήτηση και επιλέξτε κάποιον άλλο φάκελο. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Επιλέξτε το φάκελο απεγκατάστασης για το '$(^NameDA)':","SpaceAvailable":"\"Διαθέσιμος χώρος: \"","SpaceRequired":"\"Απαιτούμενος χώρος: \"","UninstallingText":"Το '$(^NameDA)' θα απεγκατασταθεί από τον ακόλουθο φάκελο. $_CLICK","UninstallingSubText":"Απεγκατάστ. από:","FileError":"Σφάλμα κατά το άνοιγμα αρχείου για εγγραφή: \\r\\n\\t\"$0\"\\r\\nΕπιλέξτε ματαίωση για να ματαιώσετε την εγκατάσταση,\\r\\nεπανάληψη για να δοκιμάσετε να γράψετε το αρχείο πάλι, ή\\r\\nπαράβλεψη για να παραλείψετε αυτό το αρχείο.","FileError_NoIgnore":"Σφάλμα κατά το άνοιγμα αρχείου για εγγραφή: \\r\\n\\t\"$0\"\\r\\nΕπιλέξτε επανάληψη για να δοκιμάσετε να γράψετε το αρχείο πάλι, ή\\r\\nματαίωση για να ματαιώσετε την εγκατάσταση.","CantWrite":"\"Αδυναμία εγγραφής: \"","CopyFailed":"Αντιγραφή απέτυχε","CopyTo":"\"Αντιγραφή στο \"","Registering":"\"Καταχώρηση: \"","Unregistering":"\"Κατάργηση καταχώρησης: \"","SymbolNotFound":"\"Αδυναμία εύρεσης συμβόλου: \"","CouldNotLoad":"\"Αδυναμία φόρτωσης: \"","CreateFolder":"\"Δημιουργία φακέλου: \"","CreateShortcut":"\"Δημιουργία συντόμευσης: \"","CreatedUninstaller":"\"Δημιουργία προγράμματος απεγκατάστασης: \"","Delete":"\"Διαγραφή αρχείου: \"","DeleteOnReboot":"\"Διαγραφή στην επανεκκίνηση: \"","ErrorCreatingShortcut":"\"Σφάλμα στη δημιουργία συντόμευσης: \"","ErrorCreating":"\"Σφάλμα στη δημιουργία: \"","ErrorDecompressing":"Σφάλμα στην αποσυμπίεση δεδομένων! Κατεστραμμένο πρόγραμμα εγκατάστασης;","ErrorRegistering":"Σφάλμα καταχώρησης του DLL","ExecShell":"\"Εκτέλεση (ExecShell): \"","Exec":"\"Εκτέλεση: \"","Extract":"\"Αποσυμπίεση: \"","ErrorWriting":"\"Αποσυμπίεση: σφάλμα εγγραφής στο αρχείο \"","InvalidOpcode":"Εγκατάσταση κατεστραμμένη: μη-έγκυρο opcode","NoOLE":"\"Όχι OLE για το: \"","OutputFolder":"\"Φάκελος εξόδου: \"","RemoveFolder":"\"Διαγραφή φακέλου: \"","RenameOnReboot":"\"Μετονομασία στην επανεκκίνηση: \"","Rename":"\"Μετονομασία: \"","Skipped":"\"Παραλείφθηκε: \"","CopyDetails":"Αντιγραφή λεπτομερειών στο Πρόχειρο","LogInstall":"Καταγραφή διαδικασίας εγκατάστασης","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 96 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1037,"font":{"name":null,"size":null},"codepage":1255,"rtl":true,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"התקנת $(^Name)","UninstallCaption":"הסרת $(^Name)","LicenseSubCaption":": הסכם רישוי","ComponentsSubCaption":": אפשרויות התקנה","DirSubCaption":": תיקיית התקנה","InstallingSubCaption":": מתקין","CompletedSubCaption":": ההתקנה הושלמה","UnComponentsSubCaption":": אפשרויות הסרה","UnDirSubCaption":": תיקייה להסרה","ConfirmSubCaption":": אישור הסרה","UninstallingSubCaption":": מסיר","UnCompletedSubCaption":": ההסרה הושלמה","BackBtn":"< ה&קודם","NextBtn":"ה&בא >","AgreeBtn":"אני &מסכים","AcceptBtn":"אני &מסכים לתנאי הסכם הרישוי","DontAcceptBtn":"אני &לא מסכים לתנאי הסכם הרישוי","InstallBtn":"&התקן","UninstallBtn":"&הסר","CancelBtn":"ביטול","CloseBtn":"סגור&","BrowseBtn":"&עיין...","ShowDetailsBtn":"ה&צג פרטים","ClickNext":"לחץ על הבא כדי להמשיך.","ClickInstall":"לחץ על התקן כדי להתחיל את ההתקנה.","ClickUninstall":"לחץ על הסר כדי להתחיל את ההסרה.","Name":"שם","Completed":"הפעולה הושלמה","LicenseText":"אנא סקור את הסכם הרישוי לפני התקנת $(^NameDA). אם הינך מקבל את כל תנאי ההסכם, לחץ 'אני מסכים'.","LicenseTextCB":"אנא סקור את הסכם הרישוי לפני התקנת $(^NameDA). אם הינך מקבל את כל תנאי ההסכם, סמן את תיבת הסימון שלהלן. $_CLICK","LicenseTextRB":"אנא סקור את הסכם הרישוי לפני התקנת $(^NameDA). אם הינך מקבל את כל תנאי ההסכם, בחר באפשרות הראשונה שלהלן. $_CLICK","UnLicenseText":"אנא סקור את הסכם הרישוי לפני הסרת $(^NameDA). אם הינך מסכים לכל תנאי ההסכם, לחץ 'אני מסכים'.","UnLicenseTextCB":"אנא סקור את הסכם הרישוי לפני הסרת $(^NameDA). אם הינך מסכים לכל תנאי ההסכם, סמן את תיבת הסימון שלהלן. $_CLICK","UnLicenseTextRB":"אנא סקור את הסכם הרישוי לפני הסרת $(^NameDA). אם הינך מסכים לכל תנאי ההסכם, בחר באפשרות הראשונה שלהלן. $_CLICK","Custom":"מותאם אישית","ComponentsText":"סמן את הרכיבים שברצונך להתקין ובטל את הסימון של רכיבים שאין ברצונך להתקין. $_CLICK","ComponentsSubText1":"בחר סוג התקנה:","ComponentsSubText2_NoInstTypes":"בחר רכיבים להתקנה:","ComponentsSubText2":"או, בחר רכיבי רשות להתקנה:","UnComponentsText":"סמן את הרכיבים שברצונך להסיר ובטל את הסימון של רכיבים שאין ברצונך להסיר. $_CLICK","UnComponentsSubText1":"בחר סוג הסרה:","UnComponentsSubText2_NoInstTypes":"בחר רכיבים להסרה:","UnComponentsSubText2":"או, בחר רכיבי רשות להסרה:","DirText":"תוכנית זו תתקין את $(^NameDA) לתיקייה שלהלן. כדי להתקין לתיקייה אחרת, לחץ על 'עיין' ובחר תיקייה אחרת. $_CLICK","DirSubText":"תיקיית יעד","DirBrowseText":"בחר תיקייה להתקנת $(^NameDA):","UnDirText":"תוכנית זו תסיר את $(^NameDA) מהתיקייה שלהלן. כדי להסיר מתיקייה אחרת, לחץ על 'עיין' ובחר תיקייה אחרת. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"בחר תיקייה ממנה תוסר $(^NameDA):","SpaceAvailable":"\"מקום פנוי: \"","SpaceRequired":"\"מקום דרוש: \"","UninstallingText":"הסרת $(^NameDA) תתבצע מהתיקייה שלהלן. $_CLICK","UninstallingSubText":"מסיר מ:","FileError":"ארעה שגיאה בעת פתיחת קובץ לכתיבה:\\r\\n\\t\"$0\"\\r\\nלחץ על ביטול כדי לבטל את ההתקנה,\\r\\nנסה שנית כדי לנסות לפתוח את הקובץ שוב, או\\r\\nהתעלם כדי לדלג על הקובץ","FileError_NoIgnore":"ארעה שגיאה בעת פתיחת קובץ לכתיבה:\\r\\n\\t\"$0\"\\r\\nלחץ על נסה שנית כדי לנסות לפתוח את הקובץ  שוב, או\\r\\nביטול כדי לבטל את התתקנה","CantWrite":"\"לא ניתן לכתוב: \"","CopyFailed":"ההעתקה נכשלה","CopyTo":"העתק ל-","Registering":"\"רושם: \"","Unregistering":"\"ביטול רישום: \"","SymbolNotFound":"\"סמל לא נמצא: \"","CouldNotLoad":"\"לא ניתן לטעון: \"","CreateFolder":"\"צור תיקייה: \"","CreateShortcut":"\"צור קיצור דרך: \"","CreatedUninstaller":"\"מסיר התקנה נוצר: \"","Delete":"\"מחק קובץ: \"","DeleteOnReboot":"\"מחק אחרי אתחול: \"","ErrorCreatingShortcut":"\"שגיאה בעת יצירת קיצור דרך: \"","ErrorCreating":"\"שגיאה בעת יצירת: \"","ErrorDecompressing":"שגיאה בעת פרישת מידע! התקנה פגומה?","ErrorRegistering":"שגיאה בעת רישום DLL","ExecShell":"\"בצע פעולת-קובץ: \"","Exec":"\"בצע: \"","Extract":"\"פרוש: \"","ErrorWriting":"\"פרוש: שגיאה בעת כתיבה לקובץ \"","InvalidOpcode":"התקנה פגומה! פקודת ביצוע שגויה","NoOLE":"\"אין OLE ל: \"","OutputFolder":"\"תיקיית פלט: \"","RemoveFolder":"\"הסר תיקייה: \"","RenameOnReboot":"\"שנה שם לאחר אתחול: \"","Rename":"\"שנה שם: \"","Skipped":"\"דלג: \"","CopyDetails":"העתק פרטים ללוח","LogInstall":"שמור רישום פעילויות ההתקנה","Byte":"\"ב","Kilo":"\" ק\"","Mega":"\" מ\"","Giga":"\" ג\""}};

/***/ }),
/* 97 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1038,"font":{"name":null,"size":null},"codepage":1250,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) Telepítő","UninstallCaption":"$(^Name) Eltávolító","LicenseSubCaption":": Licencszerződés","ComponentsSubCaption":": Telepítési lehetőségek","DirSubCaption":": Célmappa","InstallingSubCaption":": Fájlok telepítése","CompletedSubCaption":": Kész","UnComponentsSubCaption":": Eltávolítási lehetőségek","UnDirSubCaption":": Eltávolítás mappája","ConfirmSubCaption":": Megerősítés","UninstallingSubCaption":": Fájlok eltávolítása","UnCompletedSubCaption":": Kész","BackBtn":"< &Vissza","NextBtn":"&Tovább >","AgreeBtn":"&Elfogadom","AcceptBtn":"&Elfogadom a Licencszerződés feltételeit","DontAcceptBtn":"&Nem fogadom el a Licencszerződés feltételeit","InstallBtn":"&Telepítés","UninstallBtn":"&Eltávolítás","CancelBtn":"&Mégse","CloseBtn":"&Bezárás","BrowseBtn":"&Tallózás...","ShowDetailsBtn":"&Részletek","ClickNext":"Kattintson a Tovább-ra a folytatáshoz.","ClickInstall":"Kattintson a Telepítésre a telepítéshez.","ClickUninstall":"Kattintson az Eltávolításra az eltávolításhoz.","Name":"Név","Completed":"Kész","LicenseText":"A(z) $(^NameDA) telepítése előtt tekintse át a szerződés feltételeit. Ha elfogadja a szerződés valamennyi feltételét, az Elfogadom gombbal folytathatja.","LicenseTextCB":"A(z) $(^NameDA) telepítése előtt tekintse át a szerződés feltételeit. Ha elfogadja a szerződés valamennyi feltételét, jelölje be a Jelölőnégyzeten. $_CLICK","LicenseTextRB":"A(z) $(^NameDA) telepítése előtt tekintse át a szerződés feltételeit. Ha elfogadja a szerződés valamennyi feltételét, válassza az első lehetőséget. $_CLICK","UnLicenseText":"A(z) $(^NameDA) eltávolítása előtt tekintse át a szerződés feltételeit. Ha elfogadja a szerződés valamennyi feltételét, az Elfogadom gombbal folytathatja.","UnLicenseTextCB":"A(z) $(^NameDA) eltávolítása előtt tekintse át a szerződés feltételeit. Ha elfogadja a szerződés valamennyi feltételét, jelölje be a Jelölőnégyzeten. $_CLICK","UnLicenseTextRB":"A(z) $(^NameDA) eltávolítása előtt tekintse át a szerződés feltételeit. Ha elfogadja a szerződés valamennyi feltételét, válassza az első lehetőséget. $_CLICK","Custom":"Egyéni","ComponentsText":"Jelölje be azokat az összetevőket amelyeket telepíteni kíván és törölje a jelölést a nem kívánt összetevőknél. $_CLICK","ComponentsSubText1":"Válassza ki a telepítés típusát:","ComponentsSubText2_NoInstTypes":"Válassza ki a telepítendő összetevőket:","ComponentsSubText2":"vagy, jelölje ki a választható összetevők közül a telepíteni kívánta(ka)t:","UnComponentsText":"Jelölje be azokat az összetevőket amelyeket el kíván távolítani és törölje a jelölést az eltávolítani nem kívánt összetevőknél. $_CLICK","UnComponentsSubText1":"Válassza ki az Eltávolítás típusát:","UnComponentsSubText2_NoInstTypes":"Válassza ki az eltávolítandó összetevőket:","UnComponentsSubText2":"vagy, jelölje ki a választható összetevők közül az eltávolítani kívánta(ka)t:","DirText":"A $(^NameDA) a következő mappába kerül. Másik mappa választásához kattintson a Tallózás gombra. $_CLICK","DirSubText":"Telepítés helye","DirBrowseText":"A(z) $(^NameDA) telepítési helyének kiválasztása:","UnDirText":"A(z) $(^NameDA) eltávolítása a következő mappából. Másik mappa választásához kattintson a Tallózás gombra. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Válassza ki, hogy a $(^NameDA) melyik mappából kerüljön eltávolításra:","SpaceAvailable":"\"Szabad terület: \"","SpaceRequired":"\"Helyigény: \"","UninstallingText":"A(z) $(^NameDA) eltávolítása következik a számítógépről. $_CLICK","UninstallingSubText":"Eltávolítás helye:","FileError":"Hiba történt a fájl írásra történő megnyitásakor: \\r\\n\\t\"$0\"\\r\\nA Mégse gomb megnyomásával megszakíthatja a telepítést,\\r\\naz Ismét gombbal megismételheti a fájl írását,\\r\\na Kihagyás gombbal kihagyhatja ezt a fájlt.","FileError_NoIgnore":"Hiba történt a fájl írásra történő megnyitásakor:  \\r\\n\\t\"$0\"\\r\\nAz Újra gomb megnyomásával megismételheti a műveletet, vagy \\r\\na Mégse gombbal megszakíthatja a telepítést.","CantWrite":"\"Nem írható: \"","CopyFailed":"A másolás megszakadt","CopyTo":"\"Másolás ide: \"","Registering":"\"Bejegyzés: \"","Unregistering":"\"Eltávolítás: \"","SymbolNotFound":"\"A következő szimbólum nem található: \"","CouldNotLoad":"\"Nem tölthető be: \"","CreateFolder":"\"Mappa létrehozás: \"","CreateShortcut":"\"Parancsikon létrehozása: \"","CreatedUninstaller":"\"Létrehozott eltávolító: \"","Delete":"\"Törölt fájl: \"","DeleteOnReboot":"\"Rendszerindításkor törlendő: \"","ErrorCreatingShortcut":"\"Hiba a parancsikon létrehozásakor: \"","ErrorCreating":"\"Hiba a létrehozáskor: \"","ErrorDecompressing":"Hiba az adatok kibontásakor! Megsérült a Telepítő?","ErrorRegistering":"Hiba a DLL regisztrálásakor","ExecShell":"\"Végrehajtás a hozzárendeléseken keresztül: \"","Exec":"\"Végrehajtás: \"","Extract":"\"Kibontás: \"","ErrorWriting":"\"Kibontás: Hiba a fájl írásakor \"","InvalidOpcode":"Sérült a telepítő: hibás utasítás","NoOLE":"\"Nincs OLE: \"","OutputFolder":"\"Kimeneti mappa: \"","RemoveFolder":"\"Mappa eltávolítása: \"","RenameOnReboot":"\"Átnevezés rendszerindításkor: \"","Rename":"\"Átnevezés: \"","Skipped":"\"Kihagyott: \"","CopyDetails":"Adatok vágólapra másolása","LogInstall":"Telepítő ellenőrzőlista","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 98 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1039,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) Uppsetning","UninstallCaption":"$(^Name) Fjarlæging","LicenseSubCaption":": Notandaleyfissamningur","ComponentsSubCaption":": Uppsetningarvalmöguleikar","DirSubCaption":": Uppsetningarskráarsafn","InstallingSubCaption":": Set upp","CompletedSubCaption":": Lokið","UnComponentsSubCaption":": Fjarlægingarvalmöguleikar","UnDirSubCaption":": Fjarlægingarskráarsafn","ConfirmSubCaption":": Staðfesting","UninstallingSubCaption":": Fjarlægi","UnCompletedSubCaption":": Lokið","BackBtn":"< &Til baka","NextBtn":"&Áfram >","AgreeBtn":"Ég &Samþykki","AcceptBtn":"Ég &samþykki skilmála leyfissamningsins","DontAcceptBtn":"Ég samþykki &ekki skilmála leyfissamningsins","InstallBtn":"&Setja upp","UninstallBtn":"&Fjarlægja","CancelBtn":"Hætta við","CloseBtn":"&Loka","BrowseBtn":"&Vafra...","ShowDetailsBtn":"Sýna &upplýsingar","ClickNext":"Smelltu á 'Áfram' til að halda áfram.","ClickInstall":"Smelltu á 'Setja upp' til þess að hefja uppsetninguna.","ClickUninstall":"Smelltu á 'Fjarlægja' til að hefja fjarlægingar ferlið.","Name":"Nafn","Completed":"Lokið","LicenseText":"Vinsamlegast skoðaðu notandaleyfissamninginn vel áður en uppsetning á $(^NameDA) hefst. Ef þú samþykkir skilmála samningsins, smelltu þá á 'Ég samþykki'.","LicenseTextCB":"Vinsamlegast skoðaðu notandaleyfissamninginn vel áður en uppsetning á $(^NameDA) hefst. Ef þú samþykkir skilmála samningsins, hakaðu þá í kassann hér að neðan. $_CLICK","LicenseTextRB":"Vinsamlegast skoðaðu notandaleyfissamninginn vel áður en uppsetning á $(^NameDA) hefst. Ef þú samþykkir skilmála samningsins, veldu þá fyrsta valmöguleikann hér að neðan. $_CLICK","UnLicenseText":"Vinsamlegast skoðaðu notandaleyfissamninginn vel áður en uppsetning á $(^NameDA) hefst. Ef þú samþykkir skilmála samningsins, smelltu þá á 'Ég samþykki'.","UnLicenseTextCB":"Vinsamlegast skoðaðu notandaleyfissamninginn vel áður en uppsetning á $(^NameDA) hefst. Ef þú samþykkir skilmála samningsins, hakaðu þá í kassann hér að neðan. $_CLICK","UnLicenseTextRB":"Vinsamlegast skoðaðu notandaleyfissamninginn vel áður en uppsetning á $(^NameDA) hefst. Ef þú samþykkir skilmála samningsins, veldu þá fyrsta valmöguleikann hér að neðan. $_CLICK","Custom":"Sjálfval","ComponentsText":"Hakaðu við þá íhluti sem þú vilt setja upp og taktu hakið af þeim íhlutum sem þú vilt ekki setja upp. $_CLICK","ComponentsSubText1":"Veldu tegund uppsetningar:","ComponentsSubText2_NoInstTypes":"Veldu þá íhluti sem á að setja upp:","ComponentsSubText2":"Eða, veldu valfrjálsa íhluti á að setja upp:","UnComponentsText":"Hakaðu við þá íhluti sem þú vilt fjarlægja og taktu hakið af þeim íhlutum sem þú vilt ekki fjarlægja. $_CLICK","UnComponentsSubText1":"Veldu tegund fjarlægingar:","UnComponentsSubText2_NoInstTypes":"Veldu íhluti sem á að fjarlægja:","UnComponentsSubText2":"Eða, veldu valfrjálsa íhluti sem á að fjarlægja:","DirText":"Uppsetningin mun setja $(^NameDA) upp í eftirfarandi skráarsafn. Til að setja forritið upp í annað skráarsafn, smelltu á 'Vafra...' og veldu annað skráarsafn. $_CLICK","DirSubText":"Uppsetningarskráarsafn","DirBrowseText":"Veldu það skráarsafn sem þú vilt setja $(^NameDA) upp í:","UnDirText":"Uppsetningin mun fjarlægja $(^NameDA) úr eftirfarandi skráarsafni. Til að fjarlægja forritið úr öðru skráarsafni, smelltu á 'Vafra...' og veldu annað skráarsafn. $_CLICK","UnDirSubText":"\"Fjarlægingarskráarsafn\"","UnDirBrowseText":"Veldu það skráarsafn sem þú vilt fjarlægja $(^NameDA) úr:","SpaceAvailable":"\"Tiltækt rými: \"","SpaceRequired":"\"Nauðsynlegt rými: \"","UninstallingText":"$(^NameDA) verður fjarlægt úr eftirfarandi skráarsafni. $_CLICK","UninstallingSubText":"Fjarlægi úr:","FileError":"Villa við að skrifa í skrá: \\r\\n\\r\\n$0\\r\\n\\r\\nSmelltu á 'Hætta við' til að stoppa uppsetninguna,\\r\\n'Reyna aftur' til að gera aðra tilraun, eða\\r\\n'Hunsa' til sleppa þessari skrá.","FileError_NoIgnore":"Villa við að skrifa í skrá: \\r\\n\\r\\n$0\\r\\n\\r\\nSmelltu á 'Reyna aftur' til að gera aðra tilraun, eða\\r\\n'Hætta við' til að stoppa uppsetninguna.","CantWrite":"\"Get ei skrifað: \"","CopyFailed":"Afritun mistókst","CopyTo":"\"Afrita til \"","Registering":"\"Skrásetja: \"","Unregistering":"\"Afskrá: \"","SymbolNotFound":"\"Fann ekki tákn: \"","CouldNotLoad":"\"Gat ekki hlaðið inn: \"","CreateFolder":"\"Búa til skráarsafn: \"","CreateShortcut":"\"Búa til flýtileið: \"","CreatedUninstaller":"\"Bjó til fjarlægingarhjálp: \"","Delete":"\"Eyða skrá: \"","DeleteOnReboot":"\"Eyða við endurræsingu: \"","ErrorCreatingShortcut":"\"Villa við gerð flýtileiðar: \"","ErrorCreating":"\"Villa við gerð: \"","ErrorDecompressing":"Villa við afþjöppun gagna! Biluð uppsetningarhjálp?","ErrorRegistering":"Villa við skrásetningu DLL","ExecShell":"\"Keyrslugluggi: \"","Exec":"\"Keyra: \"","Extract":"\"Færa út: \"","ErrorWriting":"\"Færa út: villa við að skrifa í skrá \"","InvalidOpcode":"Uppsetningarhjálp biluð: rangur stýrikóði","NoOLE":"\"Engin OLE fyrir: \"","OutputFolder":"\"Útskráarsafn: \"","RemoveFolder":"\"Fjarlægja skráarsafn: \"","RenameOnReboot":"\"Endurskíra við endurræsingu: \"","Rename":"\"Endurskíra: \"","Skipped":"\"Sleppt: \"","CopyDetails":"Afrita upplýsingar til skrifbrettis","LogInstall":"Skrá uppsetningarferli","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 99 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1057,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Instalasi Program $(^Name)","UninstallCaption":"Penghapusan Program $(^Name)","LicenseSubCaption":": Perihal Lisensi","ComponentsSubCaption":": Pilihan Instalasi","DirSubCaption":": Lokasi Instalasi","InstallingSubCaption":": Proses Instalasi","CompletedSubCaption":": Selesai","UnComponentsSubCaption":": Pilihan Penghapusan","UnDirSubCaption":": Berkas Lokasi yang dihapus","ConfirmSubCaption":": Konfirmasi","UninstallingSubCaption":": Proses Penghapusan","UnCompletedSubCaption":": Selesai","BackBtn":"< &Mundur","NextBtn":"&Lanjut >","AgreeBtn":"Saya &Setuju","AcceptBtn":"Saya s&etuju dengan Perihal Lisensi","DontAcceptBtn":"Saya &tidak setuju dengan Perihal Lisensi","InstallBtn":"&Instal","UninstallBtn":"&Hapus","CancelBtn":"Batalkan","CloseBtn":"&Tutup","BrowseBtn":"Ca&ri...","ShowDetailsBtn":"Lihat &perincian","ClickNext":"Tekan tombol Lanjut untuk melanjutkan.","ClickInstall":"Tekan tombol Instal untuk memulai instalasi.","ClickUninstall":"Tekan tombol Hapus untuk memulai penghapusan.","Name":"Nama","Completed":"Selesai","LicenseText":"Silahkan membaca lisensi berikut sebelum memulai instalasi $(^NameDA). Jika anda menyetujui dan menerima semua pernyataan, tekan tombol Saya Setuju.","LicenseTextCB":"Silahkan membaca lisensi berikut sebelum memulai instalasi $(^NameDA). Jika anda menyetujui dan menerima semua pernyataan, beri tanda centang. $_CLICK","LicenseTextRB":"Silahkan membaca lisensi berikut sebelum memulai instalasi $(^NameDA). Jika anda menyetujui dan menerima semua pernyataan, pilihlah salah satu item dibawah ini. $_CLICK","UnLicenseText":"Silahkan membaca lisensi berikut sebelum mulai menghapus $(^NameDA). Jika anda menyetujui dan menerima semua pernyataan, tekan tombol Saya Setuju.","UnLicenseTextCB":"Silahkan membaca lisensi berikut sebelum mulai menghapus $(^NameDA). Jika anda menyetujui dan menerima semua pernyataan, beri tanda centang. $_CLICK","UnLicenseTextRB":"Silahkan membaca lisensi berikut sebelum mulai menghapus $(^NameDA). Jika anda menyetujui dan menerima semua pernyataan, pilihlah salah satu item dibawah ini. $_CLICK","Custom":"Tentukan Sendiri","ComponentsText":"Beri tanda centang pada komponen yang akan di instal and hilangkan tanda centang pada komponen yang tidak perlu di instal. $_CLICK","ComponentsSubText1":"Pilih tipe instalasi:","ComponentsSubText2_NoInstTypes":"Pilih komponen-komponen yang akan di instal:","ComponentsSubText2":"Atau, pilih komponen tambahan yang akan di instal:","UnComponentsText":"Beri tanda centang pada komponen yang akan dihapus and hilangkan tanda centang pada komponen yang tidak ingin dihapus. $_CLICK","UnComponentsSubText1":"Pilih tipe penghapusan:","UnComponentsSubText2_NoInstTypes":"Pilih komponen-komponen yang ingin dihapus:","UnComponentsSubText2":"Atau, pilih komponen tambahan yang ingin dihapus:","DirText":"Program $(^NameDA) akan di instal pada lokasi berikut. Untuk memilih lokasi, tekan tombol Cari kemudian pilih lokasi yang anda kehendaki. $_CLICK","DirSubText":"Lokasi instalasi","DirBrowseText":"Pilih lokasi instalasi program $(^NameDA):","UnDirText":"Proses penghapusan program $(^NameDA) dari lokasi instalasi berikut. Untuk memilih lokasi lainnya, tekan tombol Cari kemudian pilih lokasi yang anda kehendaki. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Pilih lokasi instalasi program $(^NameDA) yang akan dihapus:","SpaceAvailable":"\"Ruang yang tersedia:   \"","SpaceRequired":"\"Ruang yang dibutuhkan: \"","UninstallingText":"$(^NameDA) akan dihapus dari lokasi berikut. $_CLICK","UninstallingSubText":"Proses penghapusan dari:","FileError":"Tidak dapat membuka berkas untuk menulis: \\r\\n\\t\"$0\"\\r\\nTekan tombol Abort untuk membatalkan instalasi,\\r\\nRetry untuk mencoba lagi, atau\\r\\nIgnore untuk melewati file ini.","FileError_NoIgnore":"Tidak dapat membuka berkas untuk menulis: \\r\\n\\t\"$0\"\\r\\nTekan tombol Retry untuk mencoba lagi, atau\\r\\nCancel untuk membatalkan instalasi.","CantWrite":"\"Tidak bisa menulis pada berkas: \"","CopyFailed":"Gagal menyalin berkas","CopyTo":"\"Menyalin ke \"","Registering":"\"Memasukkan dalam daftar: \"","Unregistering":"\"Menghapus dari daftar: \"","SymbolNotFound":"\"Tidak dapat menemukan simbol: \"","CouldNotLoad":"\"Tidak dapat memuat: \"","CreateFolder":"\"Membuat tempat menyimpan berkas: \"","CreateShortcut":"\"Membuat shortcut: \"","CreatedUninstaller":"\"Program penghapusan yang dibuat: \"","Delete":"\"Menghapus berkas: \"","DeleteOnReboot":"\"Akan dihapus saat reboot: \"","ErrorCreatingShortcut":"\"Tidak dapat membuat shortcut: \"","ErrorCreating":"\"Ada kesalahan saat membuat: \"","ErrorDecompressing":"Ada kesalahan saat membuka data! Program Instalasi tidak lengkap?","ErrorRegistering":"Ada kesalahan ketika mendaftarkan modul DLL","ExecShell":"\"Perintah: \"","Exec":"\"Menjalankan: \"","Extract":"\"Proses ekstraksi berkas: \"","ErrorWriting":"\"Ekstraksi: ada kesalahan saat menulis ke berkas \"","InvalidOpcode":"Program instalasi rusak: kode program tidak lengkap","NoOLE":"\"OLE tidak ditemukan: \"","OutputFolder":"\"Lokasi tujuan: \"","RemoveFolder":"\"Menghapus lokasi penyimpanan: \"","RenameOnReboot":"\"Memberi nama baru saat reboot: \"","Rename":"\"Memberi nama baru: \"","Skipped":"\"Dilewati: \"","CopyDetails":"Salin perincian ke Clipboard","LogInstall":"Catat proses instalasi","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 100 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":2108,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Socrú $(^Name)","UninstallCaption":"Díshuiteáil $(^Name)","LicenseSubCaption":": Comhaontú um Cheadúnas","ComponentsSubCaption":": Roghanna Suiteála","DirSubCaption":": Fillteán Suiteála","InstallingSubCaption":": Suiteáil","CompletedSubCaption":": Críochnaithe","UnComponentsSubCaption":": Roghanna Díshuiteála","UnDirSubCaption":": Fillteán Díshuiteála","ConfirmSubCaption":": Deimhniú","UninstallingSubCaption":": Díshuiteáil","UnCompletedSubCaption":": Críochnaithe","BackBtn":"< Ar Ai&s","NextBtn":"Ar &Aghaidh >","AgreeBtn":"Gl&acaim Leis","AcceptBtn":"Táim toilteanach &glacadh le coinníollacha an Chomhaontú um Cheadúnas","DontAcceptBtn":"Nílim &toilteanach glacadh le coinníollacha an Chomhaontú um Cheadúnas","InstallBtn":"&Suiteáil","UninstallBtn":"&Díshuiteáil","CancelBtn":"Cealaigh","CloseBtn":"&Dún","BrowseBtn":"B&rabhsáil...","ShowDetailsBtn":"Taispeáin &sonraí","ClickNext":"Cliceáil \"Ar Aghaidh\" chun leanúint ar aghaidh.","ClickInstall":"Cliceáil \"Suiteáil\" chun tosú.","ClickUninstall":"Cliceáil \"Díshuiteáil\" chun tosú.","Name":"Ainm","Completed":"Críochnaithe","LicenseText":"Déan iniúchadh ar an gComhaontú um Cheadúnas sula suiteálann tú $(^NameDA). Má ghlacann tú le gach coinníoll den chomhaontú, cliceáil \"Glacaim Leis\".","LicenseTextCB":"Déan iniúchadh ar an gComhaontú um Cheadúnas sula suiteálann tú $(^NameDA). Má ghlacann tú le gach coinníoll den chomhaontú, cliceáil an ticbhosca thíos. $_CLICK","LicenseTextRB":"Déan iniúchadh ar an gComhaontú um Cheadúnas sula suiteálann tú $(^NameDA). Má ghlacann tú le gach coinníoll den chomhaontú, roghnaigh an chéad rogha thíos. $_CLICK","UnLicenseText":"Déan iniúchadh ar an gComhaontú um Cheadúnas sula ndíshuiteálann tú $(^NameDA). Má ghlacann tú le gach coinníoll den chomhaontú, cliceáil \"Glacaim Leis\".","UnLicenseTextCB":"Déan iniúchadh ar an gComhaontú um Cheadúnas sula ndíshuiteálann tú $(^NameDA). Má ghlacann tú le gach coinníoll den chomhaontú, cliceáil an ticbhosca thíos. $_CLICK","UnLicenseTextRB":"Déan iniúchadh ar an gComhaontú um Cheadúnas sula ndíshuiteálann tú $(^NameDA). Má ghlacann tú le gach coinníoll den chomhaontú, roghnaigh an chéad rogha thíos. $_CLICK","Custom":"Saincheaptha","ComponentsText":"Roghnaigh na comhpháirteanna is mian leat a shuiteáil, agus díroghnaigh na comhpháirteanna nach mian leat a shuiteáil. $_CLICK","ComponentsSubText1":"Roghnaigh cineál na suiteála:","ComponentsSubText2_NoInstTypes":"Roghnaigh na comhpháirteanna is mian leat a shuiteáil:","ComponentsSubText2":"Nó, roghnaigh na comhpháirteanna roghnacha is mian leat a shuiteáil:","UnComponentsText":"Roghnaigh na comhpháirteanna is mian leat a dhíshuiteáil, agus díroghnaigh na comhpháirteanna nach mian leat a dhíshuiteáil. $_CLICK","UnComponentsSubText1":"Roghnaigh cineál na díshuiteála:","UnComponentsSubText2_NoInstTypes":"Roghnaigh comhpháirteanna le díshuiteáil:","UnComponentsSubText2":"Nó, roghnaigh na comhpháirteanna roghnacha is mian leat a dhíshuiteáil:","DirText":"Cuirfidh an Suiteálaí $(^NameDA) san fhillteán seo a leanas. Más mian leat suiteáil i bhfillteán difriúil, cliceáil \"Brabhsáil\" agus roghnaigh fillteán eile. $_CLICK","DirSubText":"Sprioc-Fhillteán","DirBrowseText":"Roghnaigh an fillteán inar mian leat $(^NameDA) a shuiteáil:","UnDirText":"Bainfidh an Suiteálaí $(^NameDA) amach as an bhfillteán seo a leanas. Más mian leat é a dhíshuiteáil ó fhillteán difriúil, cliceáil \"Brabhsáil\" agus roghnaigh fillteán eile. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Roghnaigh an fillteán ar mian leat $(^NameDA) a dhíshuiteáil as:","SpaceAvailable":"\"Spás le fáil: \"","SpaceRequired":"\"Spás de dhíth: \"","UninstallingText":"Díshuiteálfar $(^NameDA) ón fhillteán seo a leanas. $_CLICK","UninstallingSubText":"Á dhíshuiteáil ó:","FileError":"Earráid agus comhad á scríobh: \\r\\n\\r\\n$0\\r\\n\\r\\nCliceáil \"Abort\" chun an tsuiteáil a stopadh,\\r\\n\"Retry\" chun iarracht eile a dhéanamh, nó\\r\\n\"Ignore\" chun neamhaird a dhéanamh den chomhad seo.","FileError_NoIgnore":"Earráid agus comhad á scríobh: \\r\\n\\r\\n$0\\r\\n\\r\\nCliceáil \"Retry\" chun iarracht eile a dhéanamh, nó\\r\\n\"Cancel\" chun an tsuiteáil a stopadh.","CantWrite":"\"Ní féidir scríobh: \"","CopyFailed":"Theip ar an gcóipeáil","CopyTo":"\"Cóipeáil go \"","Registering":"\"Clárú: \"","Unregistering":"\"Díchlárú: \"","SymbolNotFound":"\"Níorbh fhéidir siombail a aimsiú: \"","CouldNotLoad":"\"Níorbh fhéidir luchtú: \"","CreateFolder":"\"Cruthaigh fillteán: \"","CreateShortcut":"\"Cruthaigh aicearra: \"","CreatedUninstaller":"\"Cruthaíodh díshuiteálaí: \"","Delete":"\"Scrios comhad: \"","DeleteOnReboot":"\"Scrios ag am atosaithe: \"","ErrorCreatingShortcut":"\"Earráid agus aicearra á chruthú: \"","ErrorCreating":"\"Earráid le linn cruthaithe: \"","ErrorDecompressing":"Earráid agus sonraí á ndíchomhbhrú! Suiteálaí truaillithe?","ErrorRegistering":"Earráid agus DLL á chlárú","ExecShell":"\"Blaosc: \"","Exec":"\"Rith: \"","Extract":"\"Bain Amach: \"","ErrorWriting":"\"Extract: earráid le linn scríofa \"","InvalidOpcode":"Díshuiteálaí truaillithe: cód neamhbhailí oibríochta","NoOLE":"\"Gan OLE le haghaidh: \"","OutputFolder":"\"Fillteán aschurtha: \"","RemoveFolder":"\"Bain fillteán: \"","RenameOnReboot":"\"Athainmnigh ag am atosaithe: \"","Rename":"\"Athainmnigh: \"","Skipped":"\"Neamhaird déanta de: \"","CopyDetails":"Cóipeáil Sonraí go dtí an Ghearrthaisce","LogInstall":"Logáil an próiseas suiteála","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 101 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1040,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Installazione di $(^Name)","UninstallCaption":"Disinstallazione di $(^Name)","LicenseSubCaption":": Accordo di licenza","ComponentsSubCaption":": Opzioni installazione","DirSubCaption":": Cartella installazione","InstallingSubCaption":": Installazione","CompletedSubCaption":": Installazione completata","UnComponentsSubCaption":": Opzioni disinstallazione","UnDirSubCaption":": Cartella disinstallazione","ConfirmSubCaption":": Conferma","UninstallingSubCaption":": Disinstallazione","UnCompletedSubCaption":": Disisntallazione completata","BackBtn":"< &Indietro","NextBtn":"&Avanti >","AgreeBtn":"&Accetto","AcceptBtn":"&Accetto le condizioni della licenza","DontAcceptBtn":"&Non accetto le condizioni della licenza","InstallBtn":"Ins&talla","UninstallBtn":"&Disinstalla","CancelBtn":"Annulla","CloseBtn":"&Fine","BrowseBtn":"S&foglia...","ShowDetailsBtn":"Visualizza &dettagli","ClickNext":"Per proseguire, seleziona 'Avanti'.","ClickInstall":"Per avviare l'installazione, seleziona 'Installa'.","ClickUninstall":"Per avviare la disinstallazione, seleziona 'Disinstalla'.","Name":"Nome","Completed":"Installazione completata","LicenseText":"Leggi la licenza prima di procedere con l'installazione di $(^NameDA). Se accetti le condizioni della licenza, seleziona 'Accetto'.","LicenseTextCB":"Leggi licenza prima di procedere con l'installazione di $(^NameDA). Se accetti tutte le condizioni della licenza, seleziona la casella sottostante. $_CLICK","LicenseTextRB":"Leggi la licenza prima di procedere con l'installazione di $(^NameDA). Se accetti tutte le condizioni della licenza, seleziona la prima delle opzioni sottoindicate. $_CLICK","UnLicenseText":"Leggi la licenza prima di procedere con la disinstallazione di $(^NameDA). Se accetti tutte le condizioni della licenza, seleziona 'Accetto'. $_CLICK","UnLicenseTextCB":"Leggi la licenza prima di procedere con la disinstallazione di $(^NameDA). Se accetti tutte le condizioni della licenza, seleziona la casella sottostante. $_CLICK","UnLicenseTextRB":"Leggi la licenza prima di procedere con la disinstallazione di $(^NameDA). Se accetti tutte le condizioni della licenza, seleziona la prima delle opzioni sottoindicate. $_CLICK","Custom":"Personalizzata","ComponentsText":"Seleziona componenti da installare.","ComponentsSubText1":"Seleziona tipo installazione:","ComponentsSubText2_NoInstTypes":"Seleziona componenti da installare:","ComponentsSubText2":"Oppure, seleziona componenti opzionali da installare:","UnComponentsText":"Seleziona componenti da disinstallare.","UnComponentsSubText1":"Seleziona tipo disinstallazione:","UnComponentsSubText2_NoInstTypes":"Seleziona componenti da disinstallare:","UnComponentsSubText2":"Oppure, seleziona componenti opzionali da disinstallare :","DirText":"Questa procedura installerà $(^NameDA) in questa cartella.\\r\\nPer installare in una cartella diversa, seleziona 'Sfoglia' e scegli un'altra cartella.\\r\\n$_CLICK","DirSubText":"Cartella destinazione","DirBrowseText":"Seleziona la cartella dove installare $(^NameDA):","UnDirText":"Questa procedura disinstallerà $(^NameDA) da questa cartella.\\r\\nPer disinstallare da una cartella diversa, seleziona 'Sfoglia' e scegli un'altra cartella.\\r\\n$_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Seleziona la cartella dalla quale disinstallare $(^NameDA):","SpaceAvailable":"\"Spazio disponibile: \"","SpaceRequired":"\"Spazio richiesto: \"","UninstallingText":"$(^NameDA) verrà disinstallato da questa cartella.\\r\\n$_CLICK","UninstallingSubText":"Rimozione da:","FileError":"Errore nell'apertura del file per la scrittura: \\r\\n\\t\"$0\"\\r\\nSeleziona 'Termina' per interrompere l'installazione,\\r\\n'Riprova' per ritentare, oppure\\r\\n'Ignora' per saltare questo file.","FileError_NoIgnore":"Errore nell'apertura del file per la scrittura: \\r\\n\\t\"$0\"\\r\\nSeleziona 'Riprova' per ritentare, oppure\\r\\n'Termina' per interrompere l'installazione","CantWrite":"\"Impossibile scrivere: \"","CopyFailed":"Copia fallita","CopyTo":"\"Copia in \"","Registering":"\"Registrazione di: \"","Unregistering":"\"Deregistrazione di: \"","SymbolNotFound":"\"Impossibile trovare il simbolo: \"","CouldNotLoad":"\"Impossibile caricare: \"","CreateFolder":"\"Creazione cartella: \"","CreateShortcut":"\"Creazione collegamento: \"","CreatedUninstaller":"\"Creazione programma disinstallazione: \"","Delete":"\"Eliminazione file: \"","DeleteOnReboot":"\"Elimina al riavvio: \"","ErrorCreatingShortcut":"\"Errore nella creazione del collegamento: \"","ErrorCreating":"\"Errore nella creazione di: \"","ErrorDecompressing":"Errore nella decompressione dei dati! Probabile programma di installazione corrotto.","ErrorRegistering":"Errore nella registrazione della DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Esecuzione di: \"","Extract":"\"Estrazione di: \"","ErrorWriting":"\"Estrazione: errore nella scrittura nel file \"","InvalidOpcode":"Programma di installazione corrotto: opcode non valido","NoOLE":"\"Nessuna OLE per: \"","OutputFolder":"\"Cartella destinazione: \"","RemoveFolder":"\"Rimozione cartella: \"","RenameOnReboot":"\"Al riavvio rinomina: \"","Rename":"Rinomina ","Skipped":"\"Saltato: \"","CopyDetails":"Copia i dettagli negli Appunti","LogInstall":"Registro eventi processo installazione","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 102 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1041,"font":{"name":"ＭＳ Ｐゴシック","size":9},"codepage":932,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) セットアップ","UninstallCaption":"$(^Name) アンインストール","LicenseSubCaption":"：ライセンス契約書","ComponentsSubCaption":"：インストール オプション","DirSubCaption":"：インストール フォルダ","InstallingSubCaption":"：インストール","CompletedSubCaption":"：完了","UnComponentsSubCaption":": アンインストール オプション","UnDirSubCaption":": アンインストール フォルダ","ConfirmSubCaption":"：確認","UninstallingSubCaption":"：アンインストール","UnCompletedSubCaption":"：完了","BackBtn":"< 戻る(&B)","NextBtn":"次へ(&N) >","AgreeBtn":"同意する(&A)","AcceptBtn":"このライセンス契約書に同意します(&A)","DontAcceptBtn":"このライセンス契約書には同意できません(&D)","InstallBtn":"インストール","UninstallBtn":"ｱﾝｲﾝｽﾄｰﾙ(&U)","CancelBtn":"キャンセル","CloseBtn":"閉じる(&C)","BrowseBtn":"参照(&R)...","ShowDetailsBtn":"詳細を表示(&D)","ClickNext":"続けるには [次へ] をクリックして下さい。","ClickInstall":"インストールを始めるには [インストール] をクリックして下さい。","ClickUninstall":"アンインストールを始めるには [ｱﾝｲﾝｽﾄｰﾙ] をクリックして下さい。","Name":"アプリケーション","Completed":"完了","LicenseText":"$(^NameDA)をインストールする前に、ライセンス契約書を確認して下さい。契約書の全ての条件に同意するならば、[同意する] ボタンをクリックして下さい。","LicenseTextCB":"$(^NameDA)をインストールする前に、ライセンス契約書を確認して下さい。契約書の全ての条件に同意するならば、下のチェックボックスをクリックして下さい。 $_CLICK","LicenseTextRB":"$(^NameDA)をインストールする前に、ライセンス契約書を確認して下さい。契約書の全ての条件に同意するならば、下に表示されているオプションのうち、最初のものを選んで下さい。 $_CLICK","UnLicenseText":"$(^NameDA)をアンインストールする前に、ライセンス契約書を確認して下さい。契約書の全ての条件に同意するならば、[同意する] ボタンをクリックして下さい。","UnLicenseTextCB":"$(^NameDA)をアンインストールする前に、ライセンス契約書を確認して下さい。契約書の全ての条件に同意するならば、下のチェックボックスをクリックして下さい。 $_CLICK","UnLicenseTextRB":"$(^NameDA)をアンインストールする前に、ライセンス契約書を確認して下さい。契約書の全ての条件に同意するならば、下に表示されているオプションのうち、最初のものを選んで下さい。 $_CLICK","Custom":"カスタム","ComponentsText":"インストールしたいコンポーネントにチェックを付けて下さい。不要なものについては、チェックを外して下さい。 $_CLICK","ComponentsSubText1":"インストール タイプを選択：","ComponentsSubText2_NoInstTypes":"インストール コンポーネントを選択：","ComponentsSubText2":"または、インストール オプション コンポーネントを選択：","UnComponentsText":"アンインストールしたいコンポーネントにチェックを付けて下さい。そうでないものについては、チェックを外して下さい。 $_CLICK","UnComponentsSubText1":"アンインストール タイプを選択：","UnComponentsSubText2_NoInstTypes":"アンインストール コンポーネントを選択：","UnComponentsSubText2":"または、アンインストール オプション コンポーネントを選択：","DirText":"$(^NameDA)を以下のフォルダにインストールします。異なったフォルダにインストールするには、[参照] を押して、別のフォルダを選択してください。 $_CLICK","DirSubText":"インストール先 フォルダ","DirBrowseText":"$(^NameDA)をインストールするフォルダを選択してください：","UnDirText":"$(^NameDA)を以下のフォルダからアンインストールします。異なったフォルダからアンインストールするには、[参照] を押して、別のフォルダを選択してください。 $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"$(^NameDA)をアンインストールするフォルダを選択してください：","SpaceAvailable":"利用可能なディスクスペース： ","SpaceRequired":"必要なディスクスペース： ","UninstallingText":"$(^NameDA)は、以下のフォルダからアンインストールされます。 $_CLICK","UninstallingSubText":"アンインストール元：","FileError":"初期ファイルの作成エラー：\\r\\n\\t\"$0\"\\r\\nインストールを中止するには中止を,\\r\\n再びこのファイルの作成を試みるには再試行を, また\\r\\nこのファイルをスキップして続けるには無視を押してください","FileError_NoIgnore":"初期ファイルの作成エラー: \\r\\n\\t\"$0\"\\r\\n再びこのファイルの作成を試みるには再試行を, また\\r\\nインストールを中止するにはキャンセルを押して下さい","CantWrite":"作成できません：","CopyFailed":"コピーは失敗しました","CopyTo":"コピーします","Registering":"登録中:","Unregistering":"登録解除中:","SymbolNotFound":"シンボルを見つけることができません：","CouldNotLoad":"ロードすることができません：","CreateFolder":"フォルダの作成：","CreateShortcut":"ショートカットの作成：","CreatedUninstaller":"アンインストーラの作成：","Delete":"ファイルの削除：","DeleteOnReboot":"リブート時に削除：","ErrorCreatingShortcut":"ショートカットの作成エラー：","ErrorCreating":"作成エラー：","ErrorDecompressing":"データの抽出エラー\\r\\n\\r\\nインストーラが破損しています。","ErrorRegistering":"DLLの登録エラー","ExecShell":"拡張子の関連付け実行: ","Exec":"実行：","Extract":"抽出：","ErrorWriting":"抽出：ファイル作成エラー","InvalidOpcode":"インストールの不正：無効なopcode","NoOLE":"OLEがありません：","OutputFolder":"出力先フォルダ：","RemoveFolder":"フォルダの削除：","RenameOnReboot":"リブート時に名前の変更：","Rename":"名前の変更：","Skipped":"スキップ：","CopyDetails":"クリップボードへ詳細をコピー","LogInstall":"インストールプロセスをログヘ記録","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 103 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1042,"font":{"name":"굴림","size":9},"codepage":949,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) 설치","UninstallCaption":"$(^Name) 제거","LicenseSubCaption":": 사용권 계약 동의","ComponentsSubCaption":": 설치 옵션","DirSubCaption":": 폴더 지정","InstallingSubCaption":": 파일 설치중","CompletedSubCaption":": 설치 완료","UnComponentsSubCaption":": 제거 옵션","UnDirSubCaption":": 제거 폴더","ConfirmSubCaption":": 확인 ","UninstallingSubCaption":": 제거중","UnCompletedSubCaption":": 제거 완료","BackBtn":"< 뒤로","NextBtn":"다음 >","AgreeBtn":"동의함","AcceptBtn":"위 사항에 동의합니다.","DontAcceptBtn":"동의하지 않습니다.","InstallBtn":"설치","UninstallBtn":"제거","CancelBtn":"취소","CloseBtn":"닫음","BrowseBtn":"찾아보기...","ShowDetailsBtn":"자세히 보기","ClickNext":"계속하시려면 '다음' 버튼을 눌러 주세요.","ClickInstall":"설치를 시작하시려면 '설치' 버튼을 눌러 주세요.","ClickUninstall":"'제거' 버튼을 누르면 제거가 시작됩니다.","Name":"이름","Completed":"완료","LicenseText":"$(^NameDA)(을)를 설치하기 전에 사용권 계약 내용을 살펴보시기 바랍니다. 내용에 동의하셨다면 '동의함'을 눌러 주세요.","LicenseTextCB":"$(^NameDA)(을)를 설치하기 전에 사용권 계약 내용을 살펴보시기 바랍니다. 내용에 동의하셨다면 아래 사항을 체크해 주세요. $_CLICK","LicenseTextRB":"$(^NameDA)(을)를 설치하기 전에 사용권 계약 내용을 살펴보시기 바랍니다. 내용에 동의하셨다면 아래 옵션을 선택해 주세요. $_CLICK","UnLicenseText":"$(^NameDA)(을)를 제거하기 전에 사용권 계약 내용을 살펴보시기 바랍니다. 내용에 동의하셨다면 '동의함'을 눌러 주세요.","UnLicenseTextCB":"$(^NameDA)(을)를 제거하기 전에 사용권 계약 내용을 살펴보시기 바랍니다. 내용에 동의하셨다면 아래 사항을 체크해 주세요. $_CLICK","UnLicenseTextRB":"$(^NameDA)(을)를 제거하기 전에 사용권 계약 내용을 살펴보시기 바랍니다. 내용에 동의하셨다면 아래 옵션을 선택해 주세요. $_CLICK","Custom":"사용자 정의","ComponentsText":"설치를 원하시는 구성 요소를 선택하여 주시기 바랍니다. $_CLICK","ComponentsSubText1":"설치 형태 선택:","ComponentsSubText2_NoInstTypes":"설치하려는 구성 요소 선택:","ComponentsSubText2":"구성요소 직접 선택:","UnComponentsText":"제거를 원하는 구성 요소를 체크해 주시기 바랍니다. $_CLICK","UnComponentsSubText1":"제거 형태 선택:","UnComponentsSubText2_NoInstTypes":"제거하려는 구성 요소 선택:","UnComponentsSubText2":"제거하려는 구성요소 직접 선택:","DirText":"$(^NameDA)(을)를 다음 폴더에 설치할 예정입니다. \\r\\n다른 폴더에 설치하고 싶으시면 '찾아보기' 버튼을 눌러서 다른 폴더를 선택해 주세요. $_CLICK","DirSubText":"설치 폴더","DirBrowseText":"$(^NameDA)(을)를 다음 폴더에 설치합니다:","UnDirText":"$(^NameDA)(을)를 다음 폴더에서 제거할 예정입니다. \\r\\n다른 폴더에서 제거하고 싶으시면 '찾아보기' 버튼을 눌러서 다른 폴더를 선택해 주세요. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"$(^NameDA)(을)를 다음 폴더에서 제거 합니다:","SpaceAvailable":"\"남은 디스크 공간: \"","SpaceRequired":"\"필요한 디스크 공간: \"","UninstallingText":"시스템에서 $(^NameDA)(을)를 제거 할 것입니다. $_CLICK","UninstallingSubText":"제거 대상:","FileError":"다음 파일을 열 수 없습니다.: \\r\\n\\t\"$0\"\\r\\n'중단'을 눌러 설치를 종료하거나,\\r'다시 시도'를 눌러 다시 시도해 보거나,\\r'무시'를 눌러 이 파일을 건너 뛰세요.","FileError_NoIgnore":"다음 파일을 열 수 없습니다.: \\r\\n\\t\"$0\"\\r\\n'다시 시도'를 눌러 다시 시도해 보거나,\\r'취소'를 눌러 설치를 종료하세요.","CantWrite":"\"기록할 수 없음: \"","CopyFailed":"복사 실패","CopyTo":"\"파일 복사 \"","Registering":"\"등록중: \"","Unregistering":"\"등록 해제중: \"","SymbolNotFound":"\"심볼을 찾을 수 없음: \"","CouldNotLoad":"\"불러올 수 없음: \"","CreateFolder":"\"폴더 생성: \"","CreateShortcut":"\"바로 가기 생성: \"","CreatedUninstaller":"\"언인스톨러 생성: \"","Delete":"\"파일 삭제: \"","DeleteOnReboot":"\"재부팅시 삭제: \"","ErrorCreatingShortcut":"\"바로 가기 생성 오류: \"","ErrorCreating":"\"생성 실패: \"","ErrorDecompressing":"압축 해제중 오류 발생! 설치 파일이 손상되었습니다.","ErrorRegistering":"DLL 등록 실패","ExecShell":"\"쉘 실행: \"","Exec":"\"실행: \"","Extract":"\"압축 해제: \"","ErrorWriting":"\"압축 해제: 파일을 기록하는 도중 오류 발생 \"","InvalidOpcode":"인스톨러 손상됨: 잘못된 실행코드","NoOLE":"\"OLE 정보 없음: \"","OutputFolder":"\"대상 폴더: \"","RemoveFolder":"\"폴더 삭제: \"","RenameOnReboot":"\"재부팅시 이름 변경: \"","Rename":"\"이름 변경: \"","Skipped":"\"건너뜀: \"","CopyDetails":"자세한 내용을 클립보드로 복사","LogInstall":"설치 로그 작성","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 104 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":9999,"font":{"name":null,"size":null},"codepage":1254,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) Sazkirin","UninstallCaption":"$(^Name) Rakirin","LicenseSubCaption":": Peymana Lîsansê","ComponentsSubCaption":": Vebijêrkên Sazkirinê","DirSubCaption":": Peldanka Sazkirinê","InstallingSubCaption":": Tê Sazkirin","CompletedSubCaption":": Qediya","UnComponentsSubCaption":": Vebijêrkên Rakirinê","UnDirSubCaption":": Peldanka Rakirinê","ConfirmSubCaption":": Erêkirin","UninstallingSubCaption":": Tê Rakirin","UnCompletedSubCaption":": Qediya","BackBtn":"< &Vegere","NextBtn":"&Bidomîne >","AgreeBtn":"&Ez Dipejirînim","AcceptBtn":"Şertên Peymanê &Dipejirînim","DontAcceptBtn":"Şertên Peymanê Napejirînim","InstallBtn":"&Saz Bike","UninstallBtn":"&Rake","CancelBtn":"Betal","CloseBtn":"&Bigire","BrowseBtn":"&Çavlêgerîn...","ShowDetailsBtn":"Hûragahiyan &Nîşan Bide","ClickNext":"Ji bo berdewamê 'Bidomîne'yê bitikîne.","ClickInstall":"Ji bo destpêka sazkirinê 'Saz Bike'yê bitikîne.","ClickUninstall":"Ji bo destpêka rakirinê 'Rake' bitikîne.","Name":"nav","Completed":"Qediya","LicenseText":"Ji kerema xwe re berî tu bernameya $(^NameDA) saz bikî, çavekî li peymana lîsansê bigerîne. Heke tu hemû şertên peymanê dipejirînî, 'Ez Dipejirînim'ê bitikîne.","LicenseTextCB":"Ji kerema xwe re berî tu bernameya $(^NameDA) saz bikî, çavekî li peymana lîsansê bigerîne. Heke tu hemû şertan dipejirînî, zeviya erêkirinê ya jêrîn dagire. $_CLICK","LicenseTextRB":"Ji kerema xwe re berî tu bernameya $(^NameDA) saz bikî çavekî li peymana lîsansê bigerîne. Heke tu hemû şertên peymanê dipejirînî, zeviya vebijêrkê ya jêrîn dagire. $_CLICK","UnLicenseText":"Ji kerema xwe re berî tu bernameya $(^NameDA) rakî, çavekî li peymana lîsansê bigerîne. Heke tu hemû şertên peymanê dipejirînî, 'Ez Dipejirînim'ê bitikîn.","UnLicenseTextCB":"Ji kerema xwe re berî tu bernameya $(^NameDA) ji pergala xwe rakî, çavekî li peymana lîsansê bigerîne. Heke tu hemû şertên peymanê dipejirînî, zeviya jêrîn a erêkirinê dagire. $_CLICK","UnLicenseTextRB":"Ji kerema xwe re berî tu bernameya $(^NameDA) ji pergala xwe rakî, çavekî li peymana lîsansê bigerîne. Heke tu hemû şertên peymanê dipejirînî, zeviya vebijêrkê ya jêrîn dagire. $_CLICK","Custom":"Taybet","ComponentsText":"Beşên tu dixwazî saz bikî hilbijêre û niqirên 'check' beşên tu naxwazî werin sazkirin rake. $_CLICK","ComponentsSubText1":"Awayê sazkirinê hilbijêre:","ComponentsSubText2_NoInstTypes":"Beşên dê werin sazkirin hilbijêre:","ComponentsSubText2":"an jî, beşên beşên tu dixwazî werin sazkirin hilbijêre:","UnComponentsText":"Beşên tu dixwazî rakî hilbijêre, an jî niqira 'check'a ber beşên tu daxwazî were rakirin, rake. $_CLICK","UnComponentsSubText1":"Awayê rakirinê hilbijêre:","UnComponentsSubText2_NoInstTypes":"Beşên dê werin rakirin hilbijêre:","UnComponentsSubText2":"an jî beşên tu dixwazî werin rakirin hilbijêre:","DirText":"$(^NameDA) dê ji aliyê sazkirinê ve li peldanka jêrîn were sazkirin. Ji bo tu li peldankeke din saz bikî 'Çavlêgerîn'ê bitikîne û peldankeke din hilbijêre. $_CLICK","DirSubText":"Peldanka Armanckirî","DirBrowseText":"Peldanka tu dixwazî bernameya $(^NameDA) lê were sazkirin hilbijêre:","UnDirText":"$(^NameDA) dê ji aliyê sazkirinê ve ji peldanka jêrîn were rakirin. Ji bo tu ji peldankeke cuda rakî 'Çavlêgerîn'ê bitikîne û peldankeke din hilbijêre. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Peldanka tu dixwazî bernameya $(^NameDA) jê were rakirin hilbijêre:","SpaceAvailable":"\"Herêma vala ku dikare were bikaranîn: \"","SpaceRequired":"\"Herêma vala ya pêwist: \"","UninstallingText":"Bernameya $(^NameDA) dê ji peldanka jêrîn were rakirin. $_CLICK","UninstallingSubText":"tê rakirin:","FileError":"Dosya ji bo nivîsandinê venebû: \\r\\n\\t\"$0\"\\r\\nJi bo destjêberdana sazkirinê abort'ê bitikîne,\\r\\nji bo ceribandina ji nû ve  retry'ê , an jî\\r\\nji bo tu dosiyê tune bihesibînî û berdewam bikî ignore'yê bitikîne","FileError_NoIgnore":"Dosya ji bo nivîsandinê vebenebû: \\r\\n\\t\"$0\"\\r\\nJi bo nivîsandina ji nû ve retry'yê, an jî\\r\\nJi bo destjêberdana sazkirinê abort'ê hilbijêre","CantWrite":"\"Nehate Nivîsandin: \"","CopyFailed":"Çewtiya Jibergirtinê","CopyTo":"\"Ji Ber Bigire \"","Registering":"\"Tê Tomarkirin: \"","Unregistering":"\"Tomarî Tê Jêbirin: \"","SymbolNotFound":"\"Dawêr Nehate Dîtin: \"","CouldNotLoad":"\"Nehate Barkirin: \"","CreateFolder":"\"Peldankê Çêke: \"","CreateShortcut":"\"Kineriyê Çêke: \"","CreatedUninstaller":"\"Sêrbazê Rakirinê Hate Çêkirin: \"","Delete":"\"Dosyayê Jê Bibe: \"","DeleteOnReboot":"\"Dema ji nû ve dest pê kir dosiyê jê bibe: \"","ErrorCreatingShortcut":"\"Dema çêkirina kineriyê çewtî derket: \"","ErrorCreating":"\"Çewtiya çêkirinê: \"","ErrorDecompressing":"Di dema vekirina daneyan de çewtî derket! Sazkirina Çewt?","ErrorRegistering":"Çewtiya tomariya DLL","ExecShell":"\"Qalikê Xebatê: \"","Exec":"\"Bixebitîne: \"","Extract":"\"Veke: \"","ErrorWriting":"\"Veke: Dema li dosiyê hate nivîsîn çewtiyek derket \"","InvalidOpcode":"Sazkirina Xirabe: koda nerast pêkanînê","NoOLE":"\"OLE nehate dîtin: \"","OutputFolder":"\"Peldanka derketinê: \"","RemoveFolder":"\"Peldankê jê bibe: \"","RenameOnReboot":"\"Dema ji nû hate destpêkirin ji nû ve bi nav bike: \"","Rename":"\"Nav Biguhere: \"","Skipped":"\"Hate gavkirin: \"","CopyDetails":"Hûragahiyan li Pano'yê binivîse","LogInstall":"Pêkanîna sazkirinê li lênûska rewşê binivîse","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 105 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1062,"font":{"name":null,"size":null},"codepage":1257,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"'$(^Name)' Uzstādīšana","UninstallCaption":"'$(^Name)' Atinstalēšana","LicenseSubCaption":": Licences līgums","ComponentsSubCaption":": Uzstādīšanas opcijas","DirSubCaption":": Uzstādīšanas mape","InstallingSubCaption":": Notiek uzstādīšana","CompletedSubCaption":": Uzstādīšana pabeigta.","UnComponentsSubCaption":": Atinstalēšanas opcijas","UnDirSubCaption":": Atinstalēšanas mape","ConfirmSubCaption":": Apstiprināšana","UninstallingSubCaption":": Notiek atinstalēšana","UnCompletedSubCaption":": Atinstalēšana pabeigta","BackBtn":"< &Atpakaļ","NextBtn":"&Tālāk >","AgreeBtn":"Es &piekrītu","AcceptBtn":"Es &piekrītu licences līguma noteikumiem","DontAcceptBtn":"Es &nepiekrītu licences līguma noteikumiem","InstallBtn":"&Uzstādīt","UninstallBtn":"&Atinstalēt","CancelBtn":"Atcelt","CloseBtn":"Ai&zvērt","BrowseBtn":"Pā&rlūkot...","ShowDetailsBtn":"Parādīt &detaļas","ClickNext":"Spiediet 'Tālāk', lai turpinātu.","ClickInstall":"Spiediet 'Uzstādīt', lai sāktu uzstādīšanas procesu.","ClickUninstall":"Spiediet 'Atinstalēt', lai sāktu atinstalēšanas procesu.","Name":"Vārds","Completed":"Uzstādīšana pabeigta","LicenseText":"Lūdzu izlasiet licences līgumu pirms '$(^NameDA)' uzstādīšanas. Ja piekrītat licences līguma noteikumiem, tad spiediet 'Es piekrītu'.","LicenseTextCB":"Lūdzu izlasiet licences līgumu pirms '$(^NameDA)' uzstādīšanas. Ja piekrītat licences līguma noteikumiem, tad atzīmējiet izvēles rūtiņu. $_CLICK","LicenseTextRB":"Lūdzu izlasiet licences līgumu pirms '$(^NameDA)' uzstādīšanas. Ja piekrītat licences līguma noteikumiem, tad izvēlieties pirmo zemākesošo opciju. $_CLICK","UnLicenseText":"Lūdzu izlasiet licences līgumu pirms '$(^NameDA)' atinstalēšanas. Ja piekrītat licences līguma noteikumiem, tad spiediet 'Es piekrītu'.","UnLicenseTextCB":"Lūdzu izlasiet licences līgumu pirms '$(^NameDA)' atinstalēšanas. Ja piekrītat licences līguma noteikumiem, tad atzīmējiet izvēles rūtiņu. $_CLICK","UnLicenseTextRB":"Lūdzu izlasiet licences līgumu pirms '$(^NameDA)' atinstalēšanas. Ja piekrītat licences līguma noteikumiem, tad izvēlieties zemākesošo opciju. $_CLICK","Custom":"Pielāgots","ComponentsText":"Izvēlieties, kurus komponentus vēlaties uzstādīt un neiezīmējiet tos, kurus nevēlaties uzstādīt. $_CLICK","ComponentsSubText1":"Izvēlieties uzstādīšanas veidu:","ComponentsSubText2_NoInstTypes":"Izvēlieties uzstādāmos komponentus:","ComponentsSubText2":"Vai arī – izvēlieties tikai nepieciešamos komponentus, kurus vēlaties uzstādīt:","UnComponentsText":"Izvēlieties, kurus komponentus atinstalēt un neiezīmējiet tos, kurus nevēlaties atinstalēt. $_CLICK","UnComponentsSubText1":"Izvēlieties atinstalēšanas veidu:","UnComponentsSubText2_NoInstTypes":"Izvēlieties atinstalējamos komponentus:","UnComponentsSubText2":"Vai arī – izvēlieties tikai nepieciešamos komponentus, kurus vēlaties atinstalēt:","DirText":"'$(^NameDA)' tiks uzstādīta šajā mapē. Lai to uzstādītu citā mapē, nospiediet 'Pārlūkot' un izvēlieties citu mapi. $_CLICK","DirSubText":"Uzstādīšanas mape","DirBrowseText":"Izvēlieties mapi, kurā uzstādīt '$(^NameDA)':","UnDirText":"'$(^NameDA)' tiks atinstalēta no šīs mapes. Lai to atinstalētu no citas mapes, nospiediet 'Pārlūkot' un izvēlieties citu mapi. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Izvēlieties mapi, no kuras atinstalēt '$(^NameDA)':","SpaceAvailable":"\"Pieejamais diska apjoms: \"","SpaceRequired":"\"Nepieciešamais diska apjoms: \"","UninstallingText":"'$(^NameDA)' tiks atinstalēta no šīs mapes. $_CLICK","UninstallingSubText":"Atinstalēšana no:","FileError":"Kļūda atverot failu rakstīšanai: \\r\\n\\t\"$0\"\\r\\nNospiediet 'Atcelt', lai atceltu uzstādīšanas procesu,\\r\\n'Mēģināt vēlreiz', lai atkārtoti mēģinātu rakstīt failā vai\\r\\n'Ignorēt', lai izlaistu šī faila uzstādīšanu","FileError_NoIgnore":"Kļūda atverot failu rakstīšanai: \\r\\n\\t\"$0\"\\r\\nNospiediet 'Atcelt', lai pārtrauktu uzstādīšanas procesu","CantWrite":"\"Nevar ierakstīt: \"","CopyFailed":"Kopēšana neizdevās","CopyTo":"\"Kopē uz \"","Registering":"\"Reģistrē: \"","Unregistering":"\"Atreģistrē: \"","SymbolNotFound":"\"Simbols nav atrasts: \"","CouldNotLoad":"\"Nav iespējams ielādēt: \"","CreateFolder":"\"Izveido mapi: \"","CreateShortcut":"\"Izveido saīsni: \"","CreatedUninstaller":"\"Izveidots atinstalētājs: \"","Delete":"\"Dzēš failu: \"","DeleteOnReboot":"\"Dzēst pēc pārstartēšanas: \"","ErrorCreatingShortcut":"\"Kļūda veidojot saīsni: \"","ErrorCreating":"\"Kļūda veidojot: \"","ErrorDecompressing":"Kļūda atkompresējot datus! Bojāta instalācija?","ErrorRegistering":"Kļūda reģistrējot DLL failu","ExecShell":"\"Izpilda čaulā: \"","Exec":"\"Izpilda: \"","Extract":"\"Atspiež: \"","ErrorWriting":"\"Atspiešana: kļūda rakstot failā \"","InvalidOpcode":"Instalācija bojāta: nederīgs CRC kods","NoOLE":"\"Nav OLE priekš: \"","OutputFolder":"\"Izvades mape: \"","RemoveFolder":"\"Dzēš mapi: \"","RenameOnReboot":"\"Pārsaukt pēc pārstartēšanas: \"","Rename":"\"Pārsaukt: \"","Skipped":"\"Izlaists: \"","CopyDetails":"Iekopēt detaļas starpliktuvē","LogInstall":"Ierakstīt žurnāla failā uzstādīšanas procesu","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 106 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1063,"font":{"name":null,"size":null},"codepage":1257,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) Įdiegimas","UninstallCaption":"$(^Name) Šalinti","LicenseSubCaption":": Naudojimo sutartis","ComponentsSubCaption":": Įdiegimo nustatymai","DirSubCaption":": Įdiegimo katalogas","InstallingSubCaption":": Įdiegiama","CompletedSubCaption":": Baigta","UnComponentsSubCaption":": Ištrinimo nustatymai","UnDirSubCaption":": Ištrinimo katalogas","ConfirmSubCaption":": Patvirtinimas","UninstallingSubCaption":": Panaikinama","UnCompletedSubCaption":": Baigta","BackBtn":"< &Atgal","NextBtn":"&Toliau >","AgreeBtn":"Aš &sutinku","AcceptBtn":"Aš &sutinku su naudojimo sutarties sąlygomis","DontAcceptBtn":"Aš &nesutinku su naudojimo sutarties sąlygomis","InstallBtn":"&Įdiegti","UninstallBtn":"&Panaikinti","CancelBtn":"Nutraukti","CloseBtn":"&Uždaryti","BrowseBtn":"P&asirinkti...","ShowDetailsBtn":"Parodyti &detales","ClickNext":"Paspauskite toliau","ClickInstall":"Paspauskite įdiegti","ClickUninstall":"Paspauskite ištrinti","Name":"Vardas","Completed":"Baigta","LicenseText":"Prašome perskaityti sutartį prieš įdiegdami $(^NameDA). Jei jūs sutinkate su nurodytomis sąlygomis, spauskite Sutinku.","LicenseTextCB":"Prašome perskaityti sutartį prieš įdiegdami $(^NameDA). Jei jūs sutinkate su nurodytomis sąlygomis, padėkite varnelę tam skirtame laukelyje. $_CLICK","LicenseTextRB":"Prašome perskaityti sutartį prieš įdiegdami $(^NameDA). Jei jūs sutinkate su nurodytomis sąlygomis, pasirinkite pirmą pasirinkimą esantį žemiau. $_CLICK","UnLicenseText":"Prašome perskaityti sutartį prieš ištrinant $(^NameDA). Jei jūs sutinkate su nurodytomis sąlygomis, spauskite Sutinku.","UnLicenseTextCB":"Prašome perskaityti sutartį prieš ištrinant $(^NameDA). Jei jūs sutinkate su nurodytomis sąlygomis, padėkite varnelę tam skirtame laukelyje. $_CLICK","UnLicenseTextRB":"Prašome perskaityti sutartį prieš ištrinant $(^NameDA). Jei jūs sutinkate su nurodytomis sąlygomis, pasirinkite pirmą pasirinkimą esantį žemiau.  $_CLICK","Custom":"Kitoks","ComponentsText":"Padėkite varneles laukeliuose komponentų kuriuos norite įdiegti ir nuimkite nuo kurių nenorite įdiegti. $_CLICK","ComponentsSubText1":"Pasirinkite įdiegimo būdą:","ComponentsSubText2_NoInstTypes":"Pasirinkite komponentus, kuriuos įdiegti:","ComponentsSubText2":"Arba, pasirinkite neprivalomus komponentus, kuriuos jūs norite įdiegti:","UnComponentsText":"Padėkite varneles laukeliuose komponentų kuriuos norite pašalinti ir nuimkite nuo kurių nenorite pašalinti. $_CLICK","UnComponentsSubText1":"Pasirinkite šalinimo būdą:","UnComponentsSubText2_NoInstTypes":"Pasirinkite komponentus, kuriuos šalinti:","UnComponentsSubText2":"Arba, pasirinkite neprivalomus komponentus, kuriuos jūs norite pašalinti:","DirText":"Įdiegimas dabar įdiegs $(^NameDA) šiame kataloge. Jeigu norite pakeisti šį katalogą, paspauskite Pasirinkti. $_CLICK","DirSubText":"Įdiegimo katalogas","DirBrowseText":"Pasirinkite katalogą, kur įdiegti $(^NameDA):","UnDirText":"Įdiegimas dabar pašalins $(^NameDA) iš šio katalogo. Jeigu norite pakeisti šį katalogą paspauskite Pasirinkti. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Pasirinkite katalogą iš kurio pašalinti $(^NameDA):","SpaceAvailable":"Yra vietos: ","SpaceRequired":"Reikia vietos: ","UninstallingText":"$(^NameDA) dabar bus pašalintas iš šio katalogo. $_CLICK","UninstallingSubText":"Trinama iš:","FileError":"Klaida atidarant failą įrašymui: \\r\\n\\t\"$0\"\\r\\nPaspauskite Nutraukti, jei norite nutraukti įdiegimą,\\r\\nPakartoti, jei norite pabandyti dar kartą įrašyti failą, ar\\r\\nIgnoruoti, jei norite praleisti šį failą","FileError_NoIgnore":"Klaida atidarant failą įrašymui: \\r\\n\\t\"$0\"\\r\\nPaspauskite Pakartoti, jei norite pabandyti dar kartą įrašyti failą, ar\\r\\nNutraukti, jei norite nutraukti įdiegimą.","CantWrite":"\"Negalima įrašyti: \"","CopyFailed":"Kopijavimas nepavyko","CopyTo":"Kopijuoti į ","Registering":"\"Užregistruojama: \"","Unregistering":"\"Išregistruojama: \"","SymbolNotFound":"Nerastas simbolis: ","CouldNotLoad":"Negaliu įkrauti: ","CreateFolder":"Sukurti katalogą: ","CreateShortcut":"Sukurti nuorodą: ","CreatedUninstaller":"Sukurti panaikinimo programą:","Delete":"Ištrinti failą: ","DeleteOnReboot":"\"Ištrinti perkraunant: \"","ErrorCreatingShortcut":"\"Klaida kuriant nuorodą: \"","ErrorCreating":"\"Klaida kuriant: \"","ErrorDecompressing":"Klaida išskleidžiant duomenis! Sugadintas įdiegimo failas?","ErrorRegistering":"Klaida užregistruojant DLL","ExecShell":"\"VykdytiShell: \"","Exec":"\"Vykdyti: \"","Extract":"\"Išskleisti: \"","ErrorWriting":"Išskleisti: klaida įrašant į failą","InvalidOpcode":"Įdiegimo failas sugadintas: neteisingas opkodas","NoOLE":"\"Nėra OLE dėl: \"","OutputFolder":"\"Paskirties katalogas: \"","RemoveFolder":"\"Panaikinti katalogą: \"","RenameOnReboot":"\"Pervardinti perkraunant: \"","Rename":"\"Pervardinti: \"","Skipped":"\"Praleista: \"","CopyDetails":"Kopijuoti detales į atmintį","LogInstall":"Įrašyti įdiegimo detales","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 107 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":4103,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) Installatioun","UninstallCaption":"$(^Name) Desinstallatioun","LicenseSubCaption":": Lizenzofkommes","ComponentsSubCaption":": Installatiouns-Optiounen","DirSubCaption":": Zielverzeechnis","InstallingSubCaption":": Installéieren","CompletedSubCaption":": Färdeg","UnComponentsSubCaption":": Desinstallatiuons-Optiounen","UnDirSubCaption":": Quellverzeechnes","ConfirmSubCaption":": Bestätegung","UninstallingSubCaption":": Läschen","UnCompletedSubCaption":": Färdeg","BackBtn":"< &Zréck","NextBtn":"&Weider >","AgreeBtn":"&Unhuelen","AcceptBtn":"Ech &huelen d'Lizenzofkommes un.","DontAcceptBtn":"Ech &lehnen d'Lizenzofkommes of.","InstallBtn":"&Installéieren","UninstallBtn":"&Desinstalléieren","CancelBtn":"Ofbriechen","CloseBtn":"&Zou maan","BrowseBtn":"&Duerchsichen...","ShowDetailsBtn":"&Details uweisen","ClickNext":"Klick op weider fir weiderzefueren","ClickInstall":"Klick op Installéieren, fir d'Installatioun unzefänken.","ClickUninstall":"Klick op Desinstalléieren, fir d'Desinstallatioun unzefänken.","Name":"Numm","Completed":"Färdeg","LicenseText":"W.e.g. d'Lizenzofkommes liesen, ierts de $(^NameDA) installéiers. Wanns de all Bedengungen vum Ofkommes akzeptéiers, klick op Unhuelen.","LicenseTextCB":"W.e.g. d'Lizenzofkommes liesen, ierts de $(^NameDA) installéiers. Wanns de all Bedengungen vum Ofkommes akzeptéiers, aktivéier d'Kontrollkeschtchen. $_CLICK","LicenseTextRB":"W.e.g. d'Lizenzofkommes liesen, ierts de $(^NameDA) installéiers. Wanns de all Bedengungen vum Ofkommes akzeptéiers, wiel d'entsprichend Optioun. $_CLICK","UnLicenseText":"W.e.g. d'Lizenzofkommes liesen, ierts de $(^NameDA) desinstalléiers. Wanns de all Bedengungen vum Ofkommes akzeptéiers, klick op Unhuelen.","UnLicenseTextCB":"W.e.g. d'Lizenzofkommes liesen, ierts de $(^NameDA) desinstalléiers. Wanns de all Bedengungen vum Ofkommes akzeptéiers, aktivéier d'Kontrollkeschtchen. $_CLICK","UnLicenseTextRB":"W.e.g. d'Lizenzoofkommes liesen, ierts de $(^NameDA) desinstalléiers. Wanns de all Bedengungen vum Oofkommes akzeptéiers, wiel d'entspriechend Optioun. $_CLICK","Custom":"Benutzerdefiniert","ComponentsText":"Wiel d'Komponenten aus, déis de wëlls installéieren an wiel déijéineg of, déis de net installéieren wëlls. $_CLICK","ComponentsSubText1":"Installatiouns-Typ bestëmmen:","ComponentsSubText2_NoInstTypes":"Wiel d'Komponenten aus, déis de installéieren wëlls:","ComponentsSubText2":"oder wiel zousätzlech Komponenten aus déis de installéieren wëlls:","UnComponentsText":"Wiel d'Komponenten aus déis de desinstalléieren wëlls an wiel déijéineg of, déis de net desinstalléieren wëlls. $_CLICK","UnComponentsSubText1":"Deinstallatiouns-Typ bestëmmen:","UnComponentsSubText2_NoInstTypes":"Wiel d'Komponenten aus, déis de desinstalléieren wëlls:","UnComponentsSubText2":"oder wiel zusätzlech Komponenten aus, déis de desinstalléieren wëlls:","DirText":"$(^NameDA) gëtt an den Dossier installéiert deen fierginn gouf. Wanns de et an een aneren Dossier installéieren wëlls, klick op Duechsichen an wiel een aneren Dossier aus. $_CLICK","DirSubText":"Zielverzeechnes","DirBrowseText":"Wiel en Dossier aus wuers de $(^NameDA) installéieren wëlls:","UnDirText":"$(^NameDA) gëtt an deem Dossier desinstalléiert, deen uginn gouf. Wann $(^NameDA) an engem aneren Dossier ass, klick op Duechsichen an wiel een aneren Dossier aus. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Wiel den Dossier aus wou $(^NameDA) dran installéiert ass:","SpaceAvailable":"\"Verfügbaren Späicher: \"","SpaceRequired":"\"Gebrauchten Späicher: \"","UninstallingText":"$(^NameDA) gëtt aus dem ausgewielten Dossier desinstalléiert. $_CLICK","UninstallingSubText":"Desinstalléieren aus:","FileError":"Fehler beim Iwwerschreiwen vun der Datei: \\r\\n\\t\"$0\"\\r\\nKlick op ofbriechen fir den Setup ze verloossen,\\r\\nop Widderhuelen fir den Setup nach eng Kéier duechzeféieren\\r\\n oder op Ignoréieren fir des Datei ze iwwersprengen an weiderzefueren.","FileError_NoIgnore":"Fehler beim Iwwerschreiwen vun der Datei: \\r\\n\\t\"$0\"\\r\\nKlick op Widderhuelen fir den Setup nach eng Kéier duechzeféieren,\\r\\noder op ofbriechen fir den Setup ze verloossen.","CantWrite":"\"Fehler beim Schreiwen: \"","CopyFailed":"Kopéieren fehlgeschloen","CopyTo":"\"Kopéiere an \"","Registering":"\"Registréieren: \"","Unregistering":"\"Deregistréieren: \"","SymbolNotFound":"\"Symbol ass net do: \"","CouldNotLoad":"\"Fehler beim Lueden vun: \"","CreateFolder":"\"Maan Dossier: \"","CreateShortcut":"\"Maan Oofkierzung: \"","CreatedUninstaller":"\"Man Desinstallatiouns-Programm: \"","Delete":"\"Läschen Datei: \"","DeleteOnReboot":"\"Läschen Datei no engem Neistart: \"","ErrorCreatingShortcut":"\"Fehler beim man vun enger Oofkierzung: \"","ErrorCreating":"\"Fehler beim maan: \"","ErrorDecompressing":"Fehler beim Dekompriméieren. Installations-Programm beschiedegt?","ErrorRegistering":"Fehler beim Registréieren vun der DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Starten: \"","Extract":"\"Dekompriméieren: \"","ErrorWriting":"\"Dekompriméierung: Fehler beim Schreiwen vun der Datei \"","InvalidOpcode":"Installations-Programm Beschiedegt: net zoulässegen Befehlscode","NoOLE":"\"Keen OLE fier: \"","OutputFolder":"\"Zieldossier: \"","RemoveFolder":"\"Läschen Dossier: \"","RenameOnReboot":"\"Gett no Neistart embenannt: \"","Rename":"\"Embenennen: \"","Skipped":"\"Iwwersprongen: \"","CopyDetails":"Detailler an d'Zwëschenooflag kopéieren","LogInstall":"Installatioun protokolléieren","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 108 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1071,"font":{"name":null,"size":null},"codepage":1251,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Инсталирање на $(^Name)","UninstallCaption":"Деинсталирање на $(^Name)","LicenseSubCaption":": Лиценцен Договор","ComponentsSubCaption":": Инсталациони Опции","DirSubCaption":": Инсталационен Директориум","InstallingSubCaption":": Инсталира","CompletedSubCaption":": Завршено","UnComponentsSubCaption":": Деинсталациони Опции","UnDirSubCaption":": Деинсталационен Директориум","ConfirmSubCaption":": Потврда","UninstallingSubCaption":": Деинсталира","UnCompletedSubCaption":": Завршено","BackBtn":"< &Назад","NextBtn":"Н&апред >","AgreeBtn":"&Да","AcceptBtn":"&Ги прифаќам условите од Лиценцниот Договор","DontAcceptBtn":"Н&е ги прифаќам условите од Лиценцниот Договор","InstallBtn":"&Инсталирај","UninstallBtn":"&Деинсталирај","CancelBtn":"Откажи","CloseBtn":"&Затвори","BrowseBtn":"&Пребарувај...","ShowDetailsBtn":"П&окажи Детали","ClickNext":"Притиснете 'Напред' за да продолжите.","ClickInstall":"Притиснете 'Инсталирај' за да се инсталира.","ClickUninstall":"Притиснете 'Деинсталирај' за да се деинсталира.","Name":"Име","Completed":"Завршено","LicenseText":"Ве молиме прочитајте го Лиценцниот Договор пред да се инсталира $(^NameDA). Ако ги прифаќате сите услови, притиснете 'Да'.","LicenseTextCB":"Ве молиме прочитајте го Лиценцниот Договор пред да се инсталира $(^NameDA). Ако ги прифаќате сите услови, притиснете го Check box-от подоле. $_CLICK","LicenseTextRB":"Ве молиме прочитајте го Лиценцниот Договор пред да се инсталира $(^NameDA). Ако ги прифаќате сите услови, одберете ја првата опција подоле. $_CLICK","UnLicenseText":"Ве молиме прочитајте го Лиценцниот Договор пред да се деинсталира $(^NameDA). Ако ги прифаќате сите услови, притиснете 'Да'.","UnLicenseTextCB":"Ве молиме прочитајте го Лиценцниот Договор пред да се деинсталира $(^NameDA). Ако ги прифаќате сите услови, притиснете го Check box-от подоле. $_CLICK","UnLicenseTextRB":"Ве молиме прочитајте го Лиценцниот Договор пред да се деинсталира $(^NameDA). Ако ги прифаќате сите услови, одберете ја првата опција подоле. $_CLICK","Custom":"Подесено","ComponentsText":"Чекирајте ги компонентите што сакате да се инсталираат или дечекирајте ги тие што не сакате да се инсталираат. $_CLICK ","ComponentsSubText1":"Одберете вид на инсталација:","ComponentsSubText2_NoInstTypes":"Одберете ги компонентите што ќе се инсталираат:","ComponentsSubText2":"или, одберете други компоненти што сакате да се инсталираат:","UnComponentsText":"Чекирајте ги компонентите што сакате да се деинсталираат или дечекирајте ги тие што не сакате да се деинсталираат. $_CLICK","UnComponentsSubText1":"Одберете го видот на деинсталацијата:","UnComponentsSubText2_NoInstTypes":"Одберете ги компонентите што ќе се деинсталираат:","UnComponentsSubText2":"или, одберете други компоненти што сакате да се деинсталираат:","DirText":"Инсталациониот програм ќе го инсталира $(^NameDA) во следниов директориум. За да инсталирате во друг, притиснете 'Пребарувај' и одберете друг директориум. $_CLICK","DirSubText":"Директориум каде што ќе се инсталира","DirBrowseText":"Одберете директориум за инсталирање на $(^NameDA):","UnDirText":"Инсталациониот програм ќе го деинсталира $(^NameDA) од следниов директориум. За да деинсталирате од друг, притиснете 'Пребарувај' и одберете друг директориум. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Одберете го директориумот за деинсталирање на $(^NameDA):","SpaceAvailable":"\"Слободен простор: \"","SpaceRequired":"\"Потребен простор: \"","UninstallingText":"$(^NameDA) ќе биде деинсталиран од следниов директориум. $_CLICK","UninstallingSubText":"Деинсталира од:","FileError":"Грешка при отварањето на датотеката за запишување: \\r\\n\\t\"$0\"\\r\\nПритиснете 'Откажи' за да ја откажете инсталацијата,\\r\\n'Пробај' за да проба да ја запише датотеката, или\\r\\n'Игнорирај' за да ја прерипа датотеката","FileError_NoIgnore":"Грешка при отварањето на датотеката за запишување: \\r\\n\\t\"$0\"\\r\\nПритиснете 'Пробај' за да проба да ја запише датотеката, или\\r\\n'Откажи' за да ја откаже инсталацијата","CantWrite":"\"Не може да запише: \"","CopyFailed":"Копирањето не успеа","CopyTo":"\"Копирај до \"","Registering":"\"Регистрира: \"","Unregistering":"\"Дерегистрира: \"","SymbolNotFound":"\"Не може да го најде симболот: \"","CouldNotLoad":"\"Не може да лоадира: \"","CreateFolder":"\"Создади директориум: \"","CreateShortcut":"\"Создади кратеница: \"","CreatedUninstaller":"\"Создаден деинсталатор: \"","Delete":"\"Избришана датотека: \"","DeleteOnReboot":"\"Избриши после рестартирање: \"","ErrorCreatingShortcut":"\"Грешка при создавањето на скратеницата: \"","ErrorCreating":"\"Грешка при создавањето: \"","ErrorDecompressing":"Грешка при отпакувањето на податоците! Расипан инсталационен програм?","ErrorRegistering":"Грешка при регистрирањето на DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Покрени: \"","Extract":"\"Отпакувано: \"","ErrorWriting":"\"Отпакувај: грешка при снимањето во датотеката \"","InvalidOpcode":"Расипан инсталационен програм: погрешен код","NoOLE":"\"Нема OLE за: \"","OutputFolder":"\"Инсталационен директориум: \"","RemoveFolder":"\"Избришан директориум: \"","RenameOnReboot":"\"Преименувај после рестартирање: \"","Rename":"\"Преименувај: \"","Skipped":"\"Прерипано: \"","CopyDetails":"Копирај ги Деталите во Clipboard-от","LogInstall":"Сними лог за инсталационите процеси","Byte":"б","Kilo":" К","Mega":" М","Giga":" Г"}};

/***/ }),
/* 109 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1086,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Setup $(^Name)","UninstallCaption":"Uninstall $(^Name)","LicenseSubCaption":": Perlesenan","ComponentsSubCaption":": Pilihan kemasukan","DirSubCaption":": Folder kemasukan","InstallingSubCaption":": Memasang","CompletedSubCaption":": Selesai","UnComponentsSubCaption":": Pilihan membuang","UnDirSubCaption":": Folder Uninstal","ConfirmSubCaption":": Kepastian","UninstallingSubCaption":": Membuang","UnCompletedSubCaption":": Tidak Selesai","BackBtn":"< &Ke Belakang","NextBtn":"&Ke Depan >","AgreeBtn":"Saya &setuju","AcceptBtn":"Saya s&etuju dengan Perlesenan","DontAcceptBtn":"Saya &tidak setuju dengan Perlesenan","InstallBtn":"&Masukkan","UninstallBtn":"&Buang","CancelBtn":"Batal","CloseBtn":"&Tutup","BrowseBtn":"S&elusur...","ShowDetailsBtn":"Buka &lagi","ClickNext":"Klik Ke Depan untuk teruskan.","ClickInstall":"Klik Masukkan untuk kemasukkan.","ClickUninstall":"Klik Uninstall untuk membuang.","Name":"Nama","Completed":"Selesai","LicenseText":"Sila baca lesen sebelum memasukkan $(^NameDA). Jika anda terima perlesenan, klik Saya setuju.","LicenseTextCB":"Sila baca lesen sebelum memasukkan $(^NameDA). Jika terima, beri tanda dicheckbox. $_CLICK","LicenseTextRB":"Sila baca lesen sebelum sebelum membuang $(^NameDA). Jika anda terima perlesenan, pilihlah salah satu item dibawah ini. $_CLICK","UnLicenseText":"Sila baca lesen sebelum sebelum membuang $(^NameDA). Jika anda terima perlesenan, klik Saya setuju.","UnLicenseTextCB":"Sila baca lesen sebelum memasukkan $(^NameDA). Jika terima, beri tanda dicheckbox. $_CLICK","UnLicenseTextRB":"Sila baca lesen sebelum sebelum membuang $(^NameDA).Jika anda terima perlesenan, pilihlah salah satu item dibawah ini. $_CLICK","Custom":"Custom","ComponentsText":"Beri tanda dicheckbox pada komponen yang ingin dimasukkan and hilangkan tanda pada komponen yang tidak perlu dimasukkan. $_CLICK","ComponentsSubText1":"Pilih kemasukan:","ComponentsSubText2_NoInstTypes":"Pilih komponen-komponen untuk dimasukkan:","ComponentsSubText2":"Atau, pilih komponen berikut untuk dimasukkan:","UnComponentsText":"Beri tanda dicheckbox pada komponen yang ingin dimasukkan and hilangkan tanda pada komponen yang tidak perlu dimasukkan. $_CLICK","UnComponentsSubText1":"Pilih tipe un-kemasukan:","UnComponentsSubText2_NoInstTypes":"Pilih komponen-komponen untuk di buang:","UnComponentsSubText2":"Atau, pilih komponen berikut untuk di buang:","DirText":"Setup akan memasukkan $(^NameDA) pada folder berikut. Untuk memilih folder lainnya, klik Selusur dan pilih folder pilihan anda. $_CLICK","DirSubText":"Folder tujuan","DirBrowseText":"Pilih folder untuk memasukkan $(^NameDA):","UnDirText":"Setup akan membuang $(^NameDA) dari folder berikut. Untuk memilih folder lainnya, klik Selusur dan pilih folder pilihan anda. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Pilih folder untuk dibuang $(^NameDA):","SpaceAvailable":"\"Ruang cakera keras yang ada: \"","SpaceRequired":"\"Ruang cakera keras yang diperlukan: \"","UninstallingText":"$(^NameDA) akan buang dari folder berikut. $_CLICK","UninstallingSubText":"Membuang:","FileError":"Tidak dapat menulis pada fail: \\r\\n\\t\"$0\"\\r\\nKlik abort untuk membatalkan kemasukan,\\r\\nretry untuk cuba lagi, atau\\r\\nignore untuk abaikan fail ini.","FileError_NoIgnore":"Tidak dapat menulis pada fail: \\r\\n\\t\"$0\"\\r\\nKlik retry untuk cuba lagi, atau\\r\\ncancel untuk batalkan kemasukan","CantWrite":"\"Gagal menulis pada: \"","CopyFailed":"Gagal menyalin","CopyTo":"\"Menyalin ke \"","Registering":"\"Mendaftarkan modul: \"","Unregistering":"\"Melepaskan modul: \"","SymbolNotFound":"\"Symbol tidak jumpa : \"","CouldNotLoad":"\"Tidak dapat membuka: \"","CreateFolder":"\"Membuat folder: \"","CreateShortcut":"\"Membuat pintasan: \"","CreatedUninstaller":"\"Membuat program unistall: \"","Delete":"\"Memadam fail: \"","DeleteOnReboot":"\"Akan dipadam ketika reboot: \"","ErrorCreatingShortcut":"\"Tidak dapat membuat pintasan: \"","ErrorCreating":"\"Ralat penciptaan: \"","ErrorDecompressing":"Ralat ketika membuka data! Program Installer rosak","ErrorRegistering":"Ralat mendaftarkan modul DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Menjalankan: \"","Extract":"\"Mengekstrak: \"","ErrorWriting":"\"Ekstrak: ralat ketika menulis ke fail \"","InvalidOpcode":"Installer rosak: opcode tidak lengkap","NoOLE":"\"OLE tidak ditemukan: \"","OutputFolder":"\"Folder tujuan: \"","RemoveFolder":"\"Menghapuskan folder: \"","RenameOnReboot":"\"Menamakan semula pada reboot: \"","Rename":"\"Menamakan semula: \"","Skipped":"\"Diabaikan: \"","CopyDetails":"Salin terperinci ke clipboard","LogInstall":"Catat proses kemasukan","Byte":"Bait","Kilo":" Kilo","Mega":" Mega","Giga":" Giga"}};

/***/ }),
/* 110 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1104,"font":{"name":null,"size":null},"codepage":1251,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) Суулгац","UninstallCaption":"$(^Name) Суулгасныг устгах","LicenseSubCaption":": Лицензийн зөвшөөрөл","ComponentsSubCaption":": Суулгах сонголт","DirSubCaption":": Суулгах Хавтас","InstallingSubCaption":":Суулгаж байна","CompletedSubCaption":": Дууслаа","UnComponentsSubCaption":": Суулгасныг устгахын Сонголт","UnDirSubCaption":": Суулгасныг устгах Хавтас","ConfirmSubCaption":": Батламж","UninstallingSubCaption":": Суулгасныг устгаж байна","UnCompletedSubCaption":": Дууслаа","BackBtn":"< &Буцах","NextBtn":"&Цааш>","AgreeBtn":"&Зөвшөөрлөө","AcceptBtn":"Би Лицензийн Зөвшөөрлийн зүйлүүдийг  &зөвшөөрч байна","DontAcceptBtn":"Би Лицензийн Зөвшөөрлийн зүйлүүдийг  &зөвшөөрөхгүй байна","InstallBtn":"&Суулга","UninstallBtn":"&Устга","CancelBtn":"Болих","CloseBtn":"&Xaax","BrowseBtn":"Х&өтлөх...","ShowDetailsBtn":"&Дэлгэрэнгүй","ClickNext":"Цааш дээр дарвал үргэлжилнэ.","ClickInstall":"Суулга дээр дарвал суулгац эхэлнэ.","ClickUninstall":"Устга дээр дарвал суулгацын устгалт эхэлнэ.","Name":"Нэр","Completed":"Дууслаа","LicenseText":"$(^NameDA)-г суулгахын өмнө Лицензийн Зөвшөөрлийг уншина уу. Хэрэв та зөвшилцлийн зүйлүүдийг зөвшөөрч байвал, Зөвшөөрлөө-г дарна уу.","LicenseTextCB":"$(^NameDA)-г суулгахын өмнө Лицензийн Зөвшөөрлийг уншина уу. Хэрэв та зөвшилцлийн зүйлүүдийг зөвшөөрч байвал, доорх нүдийг чагтална уу. $_CLICK","LicenseTextRB":"$(^NameDA)-г суулгахын өмнө Лицензийн Зөвшөөрлийг уншина уу. Хэрэв та зөвшилцлийн зүйлүүдийг зөвшөөрч байвал, доорх эхний сонголтыг сонгоно уу. $_CLICK","UnLicenseText":"$(^NameDA)-г суулгахын өмнө Лицензийн Зөвшөөрлийг уншина уу. Хэрэв та зөвшилцлийн зүйлүүдийг зөвшөөрч байвал, Зөвшөөрлөө-г дарна уу.","UnLicenseTextCB":"$(^NameDA)-г суулгахын өмнө Лицензийн Зөвшөөрлийг уншина уу. Хэрэв та зөвшилцлийн зүйлүүдийг зөвшөөрч байвал, доорх нүдийг чагтална уу. $_CLICK","UnLicenseTextRB":"$(^NameDA)-г суулгахын өмнө Лицензийн Зөвшөөрлийг уншина уу. Хэрэв та зөвшилцлийн зүйлүүдийг зөвшөөрч байвал, доорх эхний сонголтыг сонгоно уу. $_CLICK","Custom":"Бусад","ComponentsText":"Суулгахыг хүссэн нэгдлээ чагтлаад, суулгахыг хүсэхгүй буйгаа бүү чагтлаарай. $_CLICK","ComponentsSubText1":"Суулгах төрлийг сонгоно уу:","ComponentsSubText2_NoInstTypes":"Суулгах нэгдлийг сонгоно уу:","ComponentsSubText2":"Эсвэл, заавал суулгахгүй байх нэгдлүүдийг сонго:","UnComponentsText":"Устгахыг хүссэн нэгдлээ чагтлаад, устгахыг хүсэхгүй байгаагаа бүү чагтлаарай. $_CLICK","UnComponentsSubText1":"Устгах төрлийг сонгоно уу:","UnComponentsSubText2_NoInstTypes":"Устгах нэгдлүүдийг сонгоно ууl:","UnComponentsSubText2":"Эсвэл, заавал устгахгүй байх нэгдлүүдийг сонго:","DirText":"$(^NameDA) нь дараах хавтсанд сууна. Өөр газар суулгахыг хүсвэл Хөтлөх товч дээр даран өөр хавтас сонгоно уу. $_CLICK","DirSubText":"Зорилтот Хавтас","DirBrowseText":"$(^NameDA)-ыг суулгах хавтсыг сонгох:","UnDirText":"$(^NameDA)-г уг хавтаснаас устгана. Өөр газраас устгахыг хүсвэл Хөтлөх товч дээр даран өөр хавтас сонгоно уу. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"$(^NameDA)-г устгах хавтсыг сонгох:","SpaceAvailable":"\"Боломжит зай: \"","SpaceRequired":"\"Шаардагдах зай: \"","UninstallingText":"$(^NameDA) нь уг хавтаснаас устгагдлаа. $_CLICK","UninstallingSubText":"Устгагдах газар:","FileError":"Файл бичихээр нээхэд алдлаа: \\r\\n\\t\"$0\"\\r\\nТаслах дарвал суулгалт таслагдана,\\r\\nДахья дарвал файлыг бичихээр дахин оролдоно,\\r\\nэсвэл Үл тоох дарвал уг файлыг алгасна","FileError_NoIgnore":"Файл бичихээр нээхэд алдлаа: \\r\\n\\t\"$0\"\\r\\nДахия дарвал файлыг бичихээр дахин оролдоно, \\r\\nэсвэл болих дарвал суулгалт таслагдана","CantWrite":"\"Бичиж чадсангүй: \"","CopyFailed":"Хуулалт бүтсэнгүй","CopyTo":"\"Хуулах нь \"","Registering":"\"Бүртгэж байна: \"","Unregistering":"\"Бүртгэлийг арилгаж байна: \"","SymbolNotFound":"\"Тэмдэг хайгдсангүй: \"","CouldNotLoad":"\"Дуудагдсангүй: \"","CreateFolder":"\"Үүсгэх хавтас: \"","CreateShortcut":"\"Үүсгэх shortcut: \"","CreatedUninstaller":"\"Үүссэн uninstaller: \"","Delete":"\"Файл устгах: \"","DeleteOnReboot":"\"Д.ачаалахад устгах: \"","ErrorCreatingShortcut":"\"Shortcut үүсгэхэд алдлаа: \"","ErrorCreating":"\"Үүсгэх алдаа: \"","ErrorDecompressing":"Өгөгдөл задлахад алдлаа! Суулгац эвдэрчээ?","ErrorRegistering":"DLL бүртгүүлэхэд алдлаа","ExecShell":"\"Ажиллуулах команд(ExecShell): \"","Exec":"\"Ажиллуулах: \"","Extract":"\"Задлах: \"","ErrorWriting":"\"Задлалт:файл руу бичихэд алдаа \"","InvalidOpcode":"Суулгац эвдэрчээ: задлах код буруу","NoOLE":"\"OLE байхгүй: \"","OutputFolder":"\"Гаргах хавтас: \"","RemoveFolder":"\"Устгах хавтас: \"","RenameOnReboot":"\"Д.ачаалахад дахин нэрлэх: \"","Rename":"\"Дахин нэрлэх: \"","Skipped":"\"Алгассан: \"","CopyDetails":"Дэлгэрэнгүйг Clipboard руу хуулах","LogInstall":"Суулгах явцын баримт","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 111 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1044,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) installasjon","UninstallCaption":"$(^Name) avinstallasjon","LicenseSubCaption":": Lisensavtale","ComponentsSubCaption":": Installasjonsvalg","DirSubCaption":": Installasjonsmappe","InstallingSubCaption":": Installerer","CompletedSubCaption":": Ferdig","UnComponentsSubCaption":": Avinstallasjonsvalg","UnDirSubCaption":": Avinstallasjonsmappe","ConfirmSubCaption":": Bekreft","UninstallingSubCaption":": Avinstallerer","UnCompletedSubCaption":": Ferdig","BackBtn":"< &Tilbake","NextBtn":"&Neste >","AgreeBtn":"&Godta","AcceptBtn":"Jeg &godtar vilkårene i lisensavtalen","DontAcceptBtn":"Jeg godtar &ikke vilkårene i lisensavtalen","InstallBtn":"&Installer","UninstallBtn":"&Avinstaller","CancelBtn":"Avbryt","CloseBtn":"&Lukk","BrowseBtn":"Bla &gjennom...","ShowDetailsBtn":"Vis &detaljer","ClickNext":"Trykk Neste for å fortsette.","ClickInstall":"Trykk Installer for å starte installasjonen.","ClickUninstall":"Trykk Avinstaller for å starte avinstallasjonen.","Name":"Navn","Completed":"Ferdig","LicenseText":"Vennligst les gjennom lisensavtalen før du installerer $(^Name). Hvis du godtar vilkårene i avtalen, trykk på Godta.","LicenseTextCB":"Vennligst les gjennom lisensavtalen før du installerer $(^Name). Hvis du godtar vilkårene i avtalen, merk av under. $_CLICK","LicenseTextRB":"Vennligst les gjennom lisensavtalen før du installerer $(^Name). Hvis du godtar vilkårene i avtalen, velg det første alternativet. $_CLICK","UnLicenseText":"Vennligst les gjennom lisensavtalen før du avinstallerer $(^Name). Hvis du godtar vilkårene i avtalen, trykk på Godta.","UnLicenseTextCB":"Vennligst les gjennom lisensavtalen før du avinstallerer $(^Name). Hvis du godtar vilkårene i avtalen, merk av under. $_CLICK","UnLicenseTextRB":"Vennligst les gjennom lisensavtalen før du avinstallerer $(^Name). Hvis du godtar vilkårene i avtalen, velg det første alternativet. $_CLICK","Custom":"Egendefinert","ComponentsText":"Merk komponentene du vil installere og fjern merkingen for de du ikke vil installere. $_CLICK","ComponentsSubText1":"Velg hvilken måte du vil installere på:","ComponentsSubText2_NoInstTypes":"Merk komponenter du vil installere:","ComponentsSubText2":"Eller merk de valgfrie komponentene du ønsker å installere:","UnComponentsText":"Merk komponentene du vil avinstallere og fjern merkingen for de du vil beholde. $_CLICK","UnComponentsSubText1":"Velg hvilken måte du vil avinstallere på:","UnComponentsSubText2_NoInstTypes":"Merk komponenter du vil avinstallere:","UnComponentsSubText2":"Eller merk de valgfrie komponentene du ønsker å avinstallere:","DirText":"$(^Name) vil bli installert i følgende mappe. For å velge en annen mappe, trykk Bla gjennom. $_CLICK","DirSubText":"Målmappe","DirBrowseText":"Velg mappe du vil installere $(^Name) i:","UnDirText":"$(^Name) i følgende mappe vil bli avinstallert. For å velge en annen mappe, trykk Bla gjennom. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Velg mappe du vil avinstallere $(^Name) fra:","SpaceAvailable":"\"Ledig plass: \"","SpaceRequired":"\"Nødvendig plass: \"","UninstallingText":"Denne veiviseren vil avinstallere $(^Name) fra din datamaskin. $_CLICK","UninstallingSubText":"Avinstallerer fra:","FileError":"Feil under åpning av fil for skriving: \\r\\n\\t\\\"$0\\\"\\r\\nTrykk Avbryt for å avbryte installasjonen,\\r\\nPrøv igjen for å prøve igjen, eller\\r\\nIgnorer for å hoppe over denne filen","FileError_NoIgnore":"Feil under åpning av fil for skriving: \\r\\n\\t\\\"$0\\\"\\r\\nTrykk Prøv igjen for å prøve igjen, or\\r\\neller Avbryt for å avbryte installasjonen","CantWrite":"\"Kan ikke skrive: \"","CopyFailed":"Kopiering mislyktes","CopyTo":"\"Kopier til \"","Registering":"\"Registrerer: \"","Unregistering":"\"\"Avregistrerer: \"","SymbolNotFound":"\"Kunne ikke finne symbol: \"","CouldNotLoad":"\"Kunne ikke laste: \"","CreateFolder":"\"Lag mappe: \"","CreateShortcut":"\"Lag snarvei: \"","CreatedUninstaller":"\"Avinstallasjon laget: \"","Delete":"\"Slett fil: \"","DeleteOnReboot":"\"Slett ved omstart: \"","ErrorCreatingShortcut":"\"Feil under opprettelse av snarvei: \"","ErrorCreating":"\"Feil under opprettelse av: \"","ErrorDecompressing":"Feil under utpakking av data! Installasjonsprogrammet kan være skadet.","ErrorRegistering":"Feil under registrering av DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Kjøre: \"","Extract":"\"Pakk ut: \"","ErrorWriting":"\"Pakk ut: Feil under skriving til fil \"","InvalidOpcode":"Installasjonsprogrammet er skadet: ukjent kode","NoOLE":"\"Ingen OLE for: \"","OutputFolder":"\"Ut-mappe: \"","RemoveFolder":"\"Fjern mappe: \"","RenameOnReboot":"\"Gi nytt navn ved omstart: \"","Rename":"\"Gi nytt navn: \"","Skipped":"\"Hoppet over: \"","CopyDetails":"Kopier detaljer til utklippstavlen","LogInstall":"Loggfør installasjonsprosessen","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 112 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":2068,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) installasjon","UninstallCaption":"$(^Name) avinstallasjon","LicenseSubCaption":": Lisensavtale","ComponentsSubCaption":": Installasjonsval","DirSubCaption":": Installasjonsmappe","InstallingSubCaption":": Installerer","CompletedSubCaption":": Ferdig","UnComponentsSubCaption":": Avinstallasjonsval","UnDirSubCaption":": Avinstallasjonsmappe","ConfirmSubCaption":": Stadfest","UninstallingSubCaption":": Avinstallerer","UnCompletedSubCaption":": Ferdig","BackBtn":"< &Attende","NextBtn":"&Neste >","AgreeBtn":"&Godta","AcceptBtn":"Eg &godtek vilkåra i lisensavtalen","DontAcceptBtn":"Eg godtek &ikkje vilkåra i lisensavtalen","InstallBtn":"&Installer","UninstallBtn":"&Avinstaller","CancelBtn":"Avbryt","CloseBtn":"&Lat att","BrowseBtn":"Bla &gjennom ...","ShowDetailsBtn":"Syn &detaljar","ClickNext":"Trykk Neste for å halda fram.","ClickInstall":"Trykk Installer for å starta installasjonen.","ClickUninstall":"Trykk Avinstaller for å starta avinstallasjonen.","Name":"Namn","Completed":"Ferdig","LicenseText":"Ver grei og les gjennom lisensavtalen før du installerer $(^NameDA). Dersom du godtek vilkåra i avtalen, trykk på Godta.","LicenseTextCB":"Ver grei og les gjennom lisensavtalen før du installerer $(^NameDA). Dersom du godtek vilkåra i avtalen, merk av under. $_CLICK","LicenseTextRB":"Ver grei og les gjennom lisensavtalen før du installerer $(^NameDA). Dersom du godtek vilkåra i avtalen, vel det fyrste alternativet. $_CLICK","UnLicenseText":"Ver grei og les gjennom lisensavtalen før du avinstallerer $(^NameDA). Dersom du godtek vilkåra i avtalen, trykk på Godta.","UnLicenseTextCB":"Ver grei og les gjennom lisensavtalen før du avinstallerer $(^NameDA). Dersom du godtek vilkåra i avtalen, merk av under. $_CLICK","UnLicenseTextRB":"Ver grei og les gjennom lisensavtalen før du avinstallerer $(^NameDA). Dersom du godtek vilkåra i avtalen, vel det fyrste alternativet. $_CLICK","Custom":"Eigendefinert","ComponentsText":"Merk komponentane du vil installera og fjern merkinga for dei du ikkje vil installera. $_CLICK","ComponentsSubText1":"Vel kva måte du vil installera på:","ComponentsSubText2_NoInstTypes":"Merk komponentar du vil installera:","ComponentsSubText2":"Eller merk dei valfrie komponentane du ynskjer å installera:","UnComponentsText":"Merk komponentane du vil avinstallera og fjern merkinga for dei du vil ta vare på. $_CLICK","UnComponentsSubText1":"Vel kva måte du vil avinstallera på:","UnComponentsSubText2_NoInstTypes":"Merk komponentar du vil avinstallera:","UnComponentsSubText2":"Eller merk dei valfrie komponentane du ynskjer å avinstallera:","DirText":"$(^NameDA) vil verta installert i fylgjande mappe. For å velja ei anna mappe, trykk Bla gjennom. $_CLICK","DirSubText":"Målmappe","DirBrowseText":"Vel mappe du vil installera $(^NameDA) i:","UnDirText":"$(^NameDA) i fylgjande mappe vil verta avinstallert. For å velja ei anna mappe, trykk Bla gjennom. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Vel mappe du vil avinstallera $(^NameDA) frå:","SpaceAvailable":"\"Ledig plass: \"","SpaceRequired":"\"Naudsynt plass: \"","UninstallingText":"Denne vegvisaren vil avinstallera $(^NameDA) frå din datamaskin. $_CLICK","UninstallingSubText":"Avinstallerer frå:","FileError":"Feil under opning av fil for skriving: \\r\\n\\t\\\"$0\\\"\\r\\nTrykk Avbryt for å avbryta installasjonen,\\r\\nPrøv igjen for å prøva igjen, eller\\r\\nIgnorer for å hoppa over denne fila","FileError_NoIgnore":"Feil under opning av fil for skriving: \\r\\n\\t\\\"$0\\\"\\r\\nTrykk Prøv igjen for å prøva igjen, or\\r\\neller Avbryt for å avbryta installasjonen","CantWrite":"\"Kan ikkje skriva: \"","CopyFailed":"Kopiering mislukka","CopyTo":"\"Kopier til \"","Registering":"\"Registrerer: \"","Unregistering":"\"\"Avregistrerer: \"","SymbolNotFound":"\"Kunne ikkje finna symbol: \"","CouldNotLoad":"\"Kunne ikkje lasta: \"","CreateFolder":"\"Lag mappe: \"","CreateShortcut":"\"Lag snarveg: \"","CreatedUninstaller":"\"Avinstallasjon laga: \"","Delete":"\"Slett fil: \"","DeleteOnReboot":"\"Slett ved omstart: \"","ErrorCreatingShortcut":"\"Feil under oppretting av snarveg: \"","ErrorCreating":"\"Feil under oppretting av: \"","ErrorDecompressing":"Feil under utpakking av data! Installasjonsprogrammet kan vera skadd.","ErrorRegistering":"Feil under registrering av DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Køyra: \"","Extract":"\"Pakk ut: \"","ErrorWriting":"\"Pakk ut: Feil under skriving til fil \"","InvalidOpcode":"Installasjonsprogrammet er skadd: ukjend kode","NoOLE":"\"Ingen OLE for: \"","OutputFolder":"\"Ut-mappe: \"","RemoveFolder":"\"Fjern mappe: \"","RenameOnReboot":"\"Gje nytt namn ved omstart: \"","Rename":"\"Gje nytt namn: \"","Skipped":"\"Hoppa over: \"","CopyDetails":"Kopier detaljar til utklyppstavla","LogInstall":"Loggfør installasjonsprosessen","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 113 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1123,"font":{"name":null,"size":null},"codepage":1256,"rtl":true,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"امسته $(^Name)","UninstallCaption":"نالګاو $(^Name)","LicenseSubCaption":": منښتليک تړون","ComponentsSubCaption":": لګاو غوراوي","DirSubCaption":": لګاو پوښۍ","InstallingSubCaption":": لګيږي","CompletedSubCaption":": بشپړ","UnComponentsSubCaption":": نالګاو غوراوي","UnDirSubCaption":": نالګاو پوښۍ","ConfirmSubCaption":": باورول","UninstallingSubCaption":": نالګيږي","UnCompletedSubCaption":": بشپړ","BackBtn":"< &وروسته","NextBtn":"&مخکښې >","AgreeBtn":"زه &منم","AcceptBtn":"زه &د منښتليک توکي منم","DontAcceptBtn":"زه &د منښتليک توکي نه منم","InstallBtn":"&لګول","UninstallBtn":"&نالګول","CancelBtn":"بندول","CloseBtn":"&بندول","BrowseBtn":"...چ&ڼل","ShowDetailsBtn":"خبرتياوې &ښودل","ClickNext":".مخکښې تلو لپاره مخکښې ټک وهئ","ClickInstall":".لګاو پېلولو لپاره لګول ټک وهئ","ClickUninstall":".نالګاو پېلولو لپاره نالګول ټک وهئ","Name":"نوم","Completed":"بشپړ","LicenseText":".د لګولو نه مخکښې منښتليک وګورئ. که چېرې تاسې د منښتليک ټول توکي منئ، زه منم ټک وهئ $(^NameDA) د","LicenseTextCB":"$_CLICK .د لګولو نه مخکښې منښتليک وګورئ. که چېرې تاسې د منښتليک ټول توکي منئ، لاندې خوښبکس ټک وهئ $(^NameDA) د","LicenseTextRB":"$_CLICK .د لګولو نه مخکښې منښتليک وګورئ. که چېرې تاسې د منښتليک ټول توکي منئ، لاندې لمړی غوراوی خوښ کړئ $(^NameDA) د","UnLicenseText":".د نالګاو نه مخکښې منښتليک وګورئ. که چېرې تاسې د منښتليک ټول توکي منئ، زه منم ټک وهئ $(^NameDA) د","UnLicenseTextCB":"$_CLICK .د نالګاو نه مخکښې منښتليک وګورئ. که چېرې تاسې د منښتليک ټول توکي منئ، لاندې خوښبکس ټک وهئ $(^NameDA) د","UnLicenseTextRB":"$_CLICK .د نالګاو نه مخکښې منښتليک وګورئ. که چېرې تاسې د منښتليک ټول توکي منئ، لاندې لمړی غوراوي خوښ کړئ $(^NameDA) د","Custom":"دوديز","ComponentsText":"$_CLICK .کوم رغتوکي چې لګول غواړئ خوښ يې کړئ او کوم رغتوکي چې نه غواړئ ويې لګوئ مه يې خوښوئ","ComponentsSubText1":":د لګاو ډول وټاکئ","ComponentsSubText2_NoInstTypes":":د لګولو لپاره رغتوکي خوښ کړئ","ComponentsSubText2":":يا، هغه غوراويز رغتوکي چې لګول يې غواړئ وټاکئ","UnComponentsText":"$_CLICK .کوم رغتوکي چې نالګول غواړئ خوښ يې کړئ او کوم رغتوکي چې نه غواړئ ويې نالګوئ مه يې خوښوئ","UnComponentsSubText1":":د نالګاو ډول وټاکئ","UnComponentsSubText2_NoInstTypes":":د نالګولو لپاره رغتوکي وټاکئ","UnComponentsSubText2":":يا، هغه غوراويز رغتوکي چې نالګول يې غواړئ وټاکئ","DirText":"$_CLICK .په لاندې پوښۍ کښې ولګوي. په بلې پوښۍ کښې يې د لګولو لپاره، چڼل ټک وهئ او بله پوښۍ وټاکئ $(^NameDA) امسته به","DirSubText":"موخه پوښۍ","DirBrowseText":":پکښې لګول غواړئ وټاکئ $(^NameDA) هغه پوښۍ چې","UnDirText":"$_CLICK .د لاندې پوښۍ نه ونالګوي. د بلې پوښۍ نې د نالګولو لپاره، چڼل ټک وهئ او بله پوښۍ وټاکئ $(^NameDA) امسته به","UnDirSubText":"\"\"","UnDirBrowseText":":ترې نالګول غواړئ وټاکئ $(^NameDA) هغه پوښۍ چې","SpaceAvailable":"\" :شته تشه\"","SpaceRequired":"\" :اړينه تشه\"","UninstallingText":"$_CLICK .به د لاندې پوښۍ نه ونالګول شي $(^NameDA)","UninstallingSubText":":نالګيږي له","FileError":":د ليکلو لپاره د دوتنې پرانيستلو کښې ستونزه \\r\\n\\r\\n$0\\r\\n\\r\\n،د لګاو د بندولو لپاره بندول ټک وهئ\\r\\nبياهڅه د بيا هڅې کولو لپاره، يا\\r\\n.پرېږده د دې دوتنې پرېښودلو لپاره","FileError_NoIgnore":":د ليکلو لپاره د دوتنې پرانيستلو کښې ستونزه \\r\\n\\r\\n$0\\r\\n\\r\\nد بيا هڅې کولو لپاره بياهڅه ټک وهئ، يا\\r\\n.بندول د لګاو د بندولو لپاره","CantWrite":"\" :نشي ليکلی\"","CopyFailed":"لمېسلو پاتېينه","CopyTo":"\"ته لمېسل \"","Registering":"\" :نومکښليږي\"","Unregistering":"\" :نانومکښليږي\"","SymbolNotFound":"\" :پېلام نشي پېدا کولی\"","CouldNotLoad":"\" :نشي راوستلی\"","CreateFolder":"\" :پوښۍ جوړول\"","CreateShortcut":"\" :لنډلاری جوړول\"","CreatedUninstaller":"\" :جوړ شوی نالګاند\"","Delete":"\" :دوتنې ړنګول\"","DeleteOnReboot":"\" :پر بياپېلات ړنګول\"","ErrorCreatingShortcut":"\" :د لنډاري جوړولو ستونزه\"","ErrorCreating":"\" :جوړولو ستونزه\"","ErrorDecompressing":"اومتوک نازېرلو ستونزه! اندرغل لګاند؟","ErrorRegistering":"د ډلل نومکښلو ستونزه","ExecShell":"\" :اکزک شل\"","Exec":"\" :پېلول\"","Extract":"\" :وېستل\"","ErrorWriting":"\"وېستل: دوتنې کښې ليکلو ستونزه \"","InvalidOpcode":"اندرغل لګاند: ناسم اپکوډ","NoOLE":"\"No OLE for: \"","OutputFolder":"\" :وتنې پوښۍ\"","RemoveFolder":"\" :پوښې ړنګول\"","RenameOnReboot":"\" :پر بياپېلات بيانومول\"","Rename":"\" :بيانومول\"","Skipped":"\" :پرېښودلي\"","CopyDetails":"خبرتياوې ټوټې ډړې ته لمېسل","LogInstall":"د لګاو بهير خبرالول","Byte":"ب","Kilo":" ک","Mega":" م","Giga":" ګ"}};

/***/ }),
/* 114 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1045,"font":{"name":null,"size":null},"codepage":1250,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Instalator $(^Name)","UninstallCaption":"Deinstalator $(^Name)","LicenseSubCaption":": Umowa licencyjna","ComponentsSubCaption":": Opcje instalacji","DirSubCaption":": Folder instalacyjny","InstallingSubCaption":": Instalowanie plików","CompletedSubCaption":": Zakończono","UnComponentsSubCaption":": Opcje deinstalacji","UnDirSubCaption":": Folder deinstalacyjny","ConfirmSubCaption":": Potwierdzenie","UninstallingSubCaption":": Deinstalowanie plików","UnCompletedSubCaption":": Zakończono","BackBtn":"< &Wstecz","NextBtn":"&Dalej >","AgreeBtn":"&Zgadzam się","AcceptBtn":"&Akceptuję warunki umowy licencyjnej","DontAcceptBtn":"&Nie akceptuję warunków umowy licencyjnej","InstallBtn":"&Zainstaluj","UninstallBtn":"&Odinstaluj","CancelBtn":"Anuluj","CloseBtn":"&Zamknij","BrowseBtn":"&Przeglądaj...","ShowDetailsBtn":"Pokaż &szczegóły","ClickNext":"Kliknij przycisk 'Dalej', aby kontynuować.","ClickInstall":"Kliknij przycisk 'Zainstaluj', aby rozpocząć instalację.","ClickUninstall":"Kliknij przycisk 'Odinstaluj', aby rozpocząć deinstalację.","Name":"Nazwa","Completed":"Zakończono","LicenseText":"Przed instalacją $(^NameDA) zapoznaj się z warunkami licencji. Jeśli akceptujesz wszystkie warunki umowy, kliknij przycisk 'Zgadzam się'.","LicenseTextCB":"Przed instalacją $(^NameDA) zapoznaj się z warunkami licencji. Jeśli akceptujesz wszystkie warunki umowy, kliknij poniższe pole wyboru. $_CLICK.","LicenseTextRB":"Przed instalacją $(^NameDA) zapoznaj się z warunkami licencji. Jeśli akceptujesz wszystkie warunki umowy, wybierz pierwszą z poniższych opcji. $_CLICK.","UnLicenseText":"Przed deinstalacją $(^NameDA) zapoznaj się z warunkami licencji. Jeśli akceptujesz wszystkie warunki umowy, kliknij przycisk 'Zgadzam się'.","UnLicenseTextCB":"Przed deinstalacją $(^NameDA) zapoznaj się z warunkami licencji. Jeśli akceptujesz wszystkie warunki umowy, kliknij poniższe pole wyboru. $_CLICK.","UnLicenseTextRB":"Przed deinstalacją $(^NameDA) zapoznaj się z warunkami licencji. Jeśli akceptujesz wszystkie warunki umowy, wybierz pierwszą z poniższych opcji. $_CLICK.","Custom":"Użytkownika","ComponentsText":"Zaznacz komponenty, które chcesz zainstalować i odznacz te, których nie chcesz instalować. $_CLICK","ComponentsSubText1":"Wybierz typ instalacji:","ComponentsSubText2_NoInstTypes":"Wybierz komponenty do zainstalowania:","ComponentsSubText2":"Albo wybierz opcjonalne komponenty, które chcesz zainstalować:","UnComponentsText":"Zaznacz komponenty, które chcesz odinstalować i odznacz te, które nie zostaną odinstalowane. $_CLICK","UnComponentsSubText1":"Wybierz typ deinstalacji:","UnComponentsSubText2_NoInstTypes":"Wybierz komponenty do odinstalowania:","UnComponentsSubText2":"Albo wybierz opcjonalne komponenty, które chcesz odinstalować:","DirText":"Instalator zainstaluje $(^NameDA) w podanym poniżej folderze docelowym (możesz także kliknąć przycisk 'Przeglądaj...' i wybrać inny folder). $_CLICK","DirSubText":"Folder docelowy","DirBrowseText":"Wybierz folder instalacyjny $(^NameDA):","UnDirText":"Deinstalator usunie $(^NameDA) z następującego folderu. Aby odinstalować z innego folderu, kliknij przycisk 'Przeglądaj...' i wybierz folder. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Wybierz folder, z którego zostanie odinstalowany $(^NameDA):","SpaceAvailable":"\"Dostępne miejsce: \"","SpaceRequired":"\"Wymagane miejsce: \"","UninstallingText":"Ten kreator odinstaluje $(^NameDA) z Twojego komputera. $_CLICK","UninstallingSubText":"Deinstalacja z: ","FileError":"Błąd otwarcia pliku do zapisu: \\r\\n\\r\\n$0\\r\\n\\r\\nWybierz 'Anuluj', aby przerwać instalację,\\r\\n'Ponów', aby ponowić zapis do pliku lub\\r\\n'Ignoruj', aby pominąć ten plik.","FileError_NoIgnore":"Błąd otwarcia pliku do zapisu: \\r\\n\\r\\n$0\\r\\n\\r\\nWybierz 'Ponów', aby ponowić zapis do pliku lub\\r\\n'Anuluj', aby przerwać instalację.","CantWrite":"\"Nie można zapisać: \"","CopyFailed":"Błąd kopiowania","CopyTo":"\"Kopiuj do \"","Registering":"\"Rejestrowanie: \"","Unregistering":"\"Wyrejestrowywanie: \"","SymbolNotFound":"\"Nie można odnaleźć symbolu: \"","CouldNotLoad":"\"Nie można wczytać: \"","CreateFolder":"\"Utwórz folder: \"","CreateShortcut":"\"Utwórz skrót: \"","CreatedUninstaller":"\"Utworzono deinstalator: \"","Delete":"\"Usuń plik: \"","DeleteOnReboot":"\"Usuń przy ponownym uruchomieniu: \"","ErrorCreatingShortcut":"\"Błąd tworzenia skrótu: \"","ErrorCreating":"\"Błąd tworzenia: \"","ErrorDecompressing":"Błąd wyodrębniania danych! Uszkodzony instalator?","ErrorRegistering":"Błąd rejestracji pliku DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Uruchom: \"","Extract":"\"Wyodrębnij: \"","ErrorWriting":"\"Wyodrębnij: błąd zapisu do pliku \"","InvalidOpcode":"Instalator uszkodzony: nieprawidłowy kod operacji","NoOLE":"\"Brak OLE dla: \"","OutputFolder":"\"Folder wyjściowy: \"","RemoveFolder":"\"Usuń folder: \"","RenameOnReboot":"\"Zmień nazwę przy ponownym uruchomieniu: \"","Rename":"\"Zmień nazwę: \"","Skipped":"\"Pominięte: \"","CopyDetails":"Kopiuj szczegóły do schowka","LogInstall":"Rejestruj przebieg instalacji","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 115 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":2070,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Instalação de $(^Name)","UninstallCaption":"Desinstalação de $(^Name)","LicenseSubCaption":": Contrato de Licença","ComponentsSubCaption":": Opções de instalação","DirSubCaption":": Diretório de instalação","InstallingSubCaption":": Instalando Ficheiros","CompletedSubCaption":": Concluído","UnComponentsSubCaption":": Opções de Desinstalação","UnDirSubCaption":": Pasta de Desinstalação","ConfirmSubCaption":": Confirmação","UninstallingSubCaption":": Desinstalando","UnCompletedSubCaption":": Concluído","BackBtn":"< &Anterior","NextBtn":"&Seguinte >","AgreeBtn":"&Aceito","AcceptBtn":"Eu &aceito os termos do Contrato de Licença","DontAcceptBtn":"Eu &não aceito os termos do Contrato de Licença","InstallBtn":"&Instalar","UninstallBtn":"&Desinstalar","CancelBtn":"Cancelar","CloseBtn":"&Fechar","BrowseBtn":"&Procurar...","ShowDetailsBtn":"Ver &Detalhes","ClickNext":"Clique em 'Seguinte' para continuar.","ClickInstall":"Clique em 'Instalar' para iniciar a instalação.","ClickUninstall":"Clique em 'Desinstalar' para iniciar a desinstalação.","Name":"Nome","Completed":"Concluído","LicenseText":"Por favor reveja o acordo de licensa antes de instalar $(^NameDA). Se concorda com todos os termos da licensa, clique em 'Aceito'.","LicenseTextCB":"Por favor reveja o acordo de licensa antes de instalar $(^NameDA). Se concorda com todos os termos da licensa, clique na caixa de seleção abaixo. $_CLICK","LicenseTextRB":"Por favor reveja o acordo de licensa antes de instalar $(^NameDA). Se concorda com todos os termos da licensa, escolha a primeira opção abaixo. $_CLICK","UnLicenseText":"Por favor reveja o acordo de licensa antes de desinstalar $(^NameDA). Se concorda com todos os termos da licensa, clique em 'Aceito'.","UnLicenseTextCB":"Por favor reveja o acordo de licensa antes de desinstalar $(^NameDA). Se concorda com todos os termos da licensa, clique na caixa de seleção abaixo. $_CLICK","UnLicenseTextRB":"Por favor reveja o acordo de licensa antes de desinstalar $(^NameDA). Se concorda com todos os termos da licensa, escolha a primeira opção abaixo. $_CLICK","Custom":"Personalizado","ComponentsText":"Marque os componentes que deseja instalar e desmarque os componentes que não deseja instalar. $_CLICK","ComponentsSubText1":"Escolha o tipo de instalação:","ComponentsSubText2_NoInstTypes":"Escolha os componentes para instalar:","ComponentsSubText2":"Ou, escolha os componentes opcionais que deseja instalar:","UnComponentsText":"Marque os componentes que queira desinstalar e vice versa. $_CLICK","UnComponentsSubText1":"Escolha o tipo de desinstalação: ","UnComponentsSubText2_NoInstTypes":"Escolha os componentes para desinstalar:","UnComponentsSubText2":"Ou, escolha os componentes opcionais que queira desinstalar:","DirText":"O $(^NameDA) será instalado na seguinte pasta. Para instalar numa pasta diferente, clique em 'Procurar...' e escolha outra pasta. $_CLICK","DirSubText":"Pasta de Destino","DirBrowseText":"Escolha uma pasta para instalar o $(^NameDA):","UnDirText":"O $(^NameDA) será desinstalado da seguinte pasta. Para desinstalar de uma pasta diferente, clique em 'Procurar...' e escolha outra pasta. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Escolha uma pasta de onde será desinstalado o $(^NameDA):","SpaceAvailable":"\"Espaço disponível: \"","SpaceRequired":"\"Espaço necessário: \"","UninstallingText":"$(^NameDA) será desinstalado da seguinte pasta. $_CLICK","UninstallingSubText":"Desinstalando de:","FileError":"Erro ao abrir ficheiro para escrita: \\r\\n\\t\"$0\"\\r\\nClique em Abortar para abortar a instalação,\\r\\nRepetir para tentar novamente a escrita do ficheiro, ou\\r\\nIgnorar para ignorar este ficheiro.","FileError_NoIgnore":"Erro ao abrir ficheiro para escrita: \\r\\n\\t\"$0\"\\r\\nClique em Repetir para tentar novamente a gravação do ficheiro, ou\\r\\nCancelar para abortar a instalação.","CantWrite":"\"Não foi possível escrever: \"","CopyFailed":"Falha ao copiar","CopyTo":"\"Copiar para \"","Registering":"\"Registando: \"","Unregistering":"\"Desregistando: \"","SymbolNotFound":"\"Símbolo não encontrado: \"","CouldNotLoad":"\"Não foi possível carregar: \"","CreateFolder":"\"Criando diretório: \"","CreateShortcut":"\"Criando atalho: \"","CreatedUninstaller":"\"Criando desinstalador: \"","Delete":"\"Apagando ficheiro: \"","DeleteOnReboot":"\"Apagar ao reiniciar: \"","ErrorCreatingShortcut":"\"Erro ao criar atalho: \"","ErrorCreating":"\"Erro ao criar: \"","ErrorDecompressing":"Erro ao descomprimir dados! Instalador corrompido?","ErrorRegistering":"Erro ao registar DLL","ExecShell":"\"Executando pelo Shell: \"","Exec":"\"Executando: \"","Extract":"\"Extraindo: \"","ErrorWriting":"\"Extraindo: erro ao escrever ficheiro \"","InvalidOpcode":"Instalador corrompido: código de operação inválido","NoOLE":"\"Sem OLE para: \"","OutputFolder":"\"Pasta de destino: \"","RemoveFolder":"\"Removendo pasta: \"","RenameOnReboot":"\"Renomear ao reiniciar: \"","Rename":"\"Renomeando: \"","Skipped":"\"Ignorado: \"","CopyDetails":"Copiar detalhes para a Área de Transfêrencia","LogInstall":"Registar processo de instalação","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 116 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1046,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Instalação do $(^Name)","UninstallCaption":"Desinstalação do $(^Name)","LicenseSubCaption":": Acordo de licença","ComponentsSubCaption":": Opções da Instalação","DirSubCaption":": Pasta da Instalação","InstallingSubCaption":": Instalando","CompletedSubCaption":": Completado","UnComponentsSubCaption":": Opções da Desinstalação","UnDirSubCaption":": Pasta da Desinstalação","ConfirmSubCaption":": Confirmação","UninstallingSubCaption":": Desinstalando","UnCompletedSubCaption":": Completado","BackBtn":"< &Voltar","NextBtn":"&Próximo >","AgreeBtn":"Eu &Concordo","AcceptBtn":"Eu &aceito os termos do Acordo de Licença","DontAcceptBtn":"Eu &não aceito os termos do Acordo de Licença","InstallBtn":"&Instalar","UninstallBtn":"&Desinstalar","CancelBtn":"Cancelar","CloseBtn":"&Fechar","BrowseBtn":"P&rocurar...","ShowDetailsBtn":"Mostrar &detalhes","ClickNext":"Clique em Próximo para continuar.","ClickInstall":"Clique em Instalar para iniciar a instalação.","ClickUninstall":"Clique em Desinstalar para iniciar a desinstalação.","Name":"Nome","Completed":"Completado","LicenseText":"Por favor, leia com atenção o acordo de licença antes de instalar o $(^NameDA). Se você aceita todos os termos do acordo, clique em Eu Concordo.","LicenseTextCB":"Por favor, leia com atenção o acordo de licença antes de instalar o $(^NameDA). Se você aceita todos os termos do acordo, clique na caixa de seleção abaixo. $_CLICK","LicenseTextRB":"Por favor, leia com atenção o acordo de licença antes de instalar o $(^NameDA). Se você aceita todos os termos do acordo, selecione a primeira opção abaixo. $_CLICK","UnLicenseText":"Por favor, leia com atenção o acordo de licença antes de desinstalar o $(^NameDA). Se você aceita todos os termos do acordo, clique em Eu Concordo.","UnLicenseTextCB":"Por favor, leia com atenção o acordo de licença antes de desinstalar o $(^NameDA). Se você aceita todos os termos do acordo, clique na caixa de seleção abaixo. $_CLICK","UnLicenseTextRB":"Por favor, leia com atenção o acordo de licença antes de desinstalar o $(^NameDA). Se você aceita todos os termos do acordo, selecione a primeira opção abaixo. $_CLICK","Custom":"Personalizado","ComponentsText":"Marque os componentes que você quer instalar e desmarque os componentes que você não quer instalar. $_CLICK","ComponentsSubText1":"Selecione o tipo de instalação:","ComponentsSubText2_NoInstTypes":"Selecione os componentes a instalar:","ComponentsSubText2":"Ou, selecione os componentes opcionais que você deseja instalar:","UnComponentsText":"Marque os componentes que você quer desinstalar e desmarque os componentes que você não quer desinstalar. $_CLICK","UnComponentsSubText1":"Selecione o tipo de desinstalação:","UnComponentsSubText2_NoInstTypes":"Selecione os componentes a desinstalar:","UnComponentsSubText2":"Ou, selecione os componentes opcionais que você deseja desinstalar:","DirText":"O $(^NameDA) será instalado na pasta a seguir. Para instalar em uma pasta diferente, clique em Procurar e selecione outra pasta. $_CLICK","DirSubText":"Pasta de Destino","DirBrowseText":"Selecione a pasta para instalar o $(^NameDA):","UnDirText":"O $(^NameDA) será desinstalado da pasta a seguir. Para desinstalar de uma pasta diferente, clique em Procurar e selecione outra pasta. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Selecione a pasta de onde desinstalar o $(^NameDA):","SpaceAvailable":"\"Espaço disponível: \"","SpaceRequired":"\"Espaço necessário: \"","UninstallingText":"O $(^NameDA) será desinstalado da pasta a seguir. $_CLICK","UninstallingSubText":"Desinstalando de:","FileError":"Erro ao abrir o arquivo para gravação: \\r\\n\\r\\n$0\\r\\n\\r\\nClique em Abortar para parar a instalação,\\r\\nRepetir para tentar de novo, ou\\r\\nIgnorar para pular este arquivo.","FileError_NoIgnore":"Erro ao abrir o arquivo para gravação: \\r\\n\\r\\n$0\\r\\n\\r\\nClique em Repetir para tentar de novo, ou\\r\\nCancelar para parar a instalação.","CantWrite":"\"Não foi possível gravar: \"","CopyFailed":"Falha ao copiar","CopyTo":"\"Copiar para \"","Registering":"\"Registrando: \"","Unregistering":"\"Desfazendo o registro: \"","SymbolNotFound":"\"Não foi possível localizar o símbolo: \"","CouldNotLoad":"\"Não foi possível carregar: \"","CreateFolder":"\"Criar pasta: \"","CreateShortcut":"\"Criar atalho: \"","CreatedUninstaller":"\"Desinstalador criado: \"","Delete":"\"Excluir o arquivo: \"","DeleteOnReboot":"\"Excluir ao reiniciar: \"","ErrorCreatingShortcut":"\"Erro ao criar atalho: \"","ErrorCreating":"\"Erro ao criar: \"","ErrorDecompressing":"Erro ao descomprimir os dados! Instalador corrompido?","ErrorRegistering":"Erro ao registar a DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Executar: \"","Extract":"\"Extrair: \"","ErrorWriting":"\"Extrair: erro ao gravar o arquivo \"","InvalidOpcode":"Instalador corrompido: opcode inválido","NoOLE":"\"Sem OLE para: \"","OutputFolder":"\"Pasta de saída: \"","RemoveFolder":"\"Excluir a pasta: \"","RenameOnReboot":"\"Renomear ao reiniciar: \"","Rename":"\"Renomear: \"","Skipped":"\"Ignorado: \"","CopyDetails":"Copiar os Detalhes para a Área de Transferência","LogInstall":"Registrar o processo de instalação","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 117 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1048,"font":{"name":null,"size":null},"codepage":1250,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Instalare $(^Name)","UninstallCaption":"Dezinstalare $(^Name)","LicenseSubCaption":": Contract de licenţă","ComponentsSubCaption":": Opţiuni instalare","DirSubCaption":": Directorul destinaţie","InstallingSubCaption":": În curs de instalare","CompletedSubCaption":": Instalare terminată","UnComponentsSubCaption":": Opţiuni dezinstalare","UnDirSubCaption":": Directorul de dezinstalare","ConfirmSubCaption":": Confirmă","UninstallingSubCaption":": În curs de dezinstalare","UnCompletedSubCaption":": Termină","BackBtn":"< Îna&poi","NextBtn":"Îna&inte >","AgreeBtn":"&De acord","AcceptBtn":"&Accept termenii contractului de licenţă","DontAcceptBtn":"Nu accept termenii contractului de licenţă","InstallBtn":"&Instalează","UninstallBtn":"&Dezinstalează","CancelBtn":"&Renunţă","CloseBtn":"În&chide","BrowseBtn":"&Alege...","ShowDetailsBtn":"Arată &detalii","ClickNext":"Apăsaţi Înainte pentru a continua.","ClickInstall":"Apăsaţi Instalează pentru a începe instalarea.","ClickUninstall":"Apăsaţi Dezinstalează pentru a începe dezinstalarea.","Name":"Nume","Completed":"Terminat","LicenseText":"Citiţi cu atenţie contractul de licenţă înainte de a instala $(^NameDA). Dacă acceptaţi termenii contractului de licenţă, apăsaţi butonul De acord.","LicenseTextCB":"Citiţi cu atenţie contractul de licenţă înainte de a instala $(^NameDA). Dacă acceptaţi termenii contractului de licenţă, bifaţi căsuţa de mai jos. $_CLICK","LicenseTextRB":"Citiţi cu atenţie contractul de licenţă înainte de a instala $(^NameDA). Dacă acceptaţi termenii contractului de licenţă, selectaţi prima opţiune de mai jos. $_CLICK","UnLicenseText":"Citiţi cu atenţie contractul de licenţă înainte de a dezinstala $(^NameDA). Dacă acceptaţi termenii contractului de licenţă, apăsaţi butonul De acord.","UnLicenseTextCB":"Citiţi cu atenţie contractul de licenţă înainte de a dezinstala $(^NameDA). Dacă acceptaţi termenii contractului de licenţă, bifaţi căsuţa de mai jos. $_CLICK","UnLicenseTextRB":"Citiţi cu atenţie contractul de licenţă înainte de a dezinstala $(^NameDA). Dacă acceptaţi termenii contractului de licenţă, selectaţi prima opţiune de mai jos. $_CLICK","Custom":"Personalizată","ComponentsText":"Alegeţi componentele pe care doriţi să le instalaţi. $_CLICK","ComponentsSubText1":"Alegeţi tipul instalării:","ComponentsSubText2_NoInstTypes":"Alegeţi componentele ce urmează a fi instalate:","ComponentsSubText2":"Sau, alegeţi componentele opţionale pe care doriţi să le instalaţi:","UnComponentsText":"Alegeţi componentele pe care doriţi să le dezinstalaţi. $_CLICK","UnComponentsSubText1":"Alegeţi tipul de dezinstalare:","UnComponentsSubText2_NoInstTypes":"Alegeţi componentele ce urmează a fi dezinstalate:","UnComponentsSubText2":"Sau, alegeţi componentele opţionale pe care doriţi să le dezinstalaţi:","DirText":"$(^NameDA) se va instala în următorul director. Pentru a alege altă destinaţie, apăsaţi Alege şi alegeţi alt director. $_CLICK","DirSubText":"Director destinaţie","DirBrowseText":"Alegeţi directorul în care doriţi să instalaţi $(^NameDA):","UnDirText":"$(^NameDA) se va dezinstala din următorul director. Pentru a dezinstala din alt director, apăsaţi Alege şi alegeţi alt director. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Alegeţi directorul de dezinstalare al $(^NameDA):","SpaceAvailable":"\"Spaţiu disponibil: \"","SpaceRequired":"\"Spaţiu necesar: \"","UninstallingText":"Această aplicaţie va dezinstala $(^NameDA) din computerul Dv. $_CLICK","UninstallingSubText":"Dezinstalare din:","FileError":"Eroare la scrierea fişierului: \\r\\n\\t\"$0\"\\r\\nApăsaţi Abort pentru oprirea instalării,\\r\\nRetry pentru a mai încerca o dată scrierea fişierului, \\r\\nIgnore pentru a trece peste acest fişier.","FileError_NoIgnore":"Eroare la scrierea fişierului: \\r\\n\\t\"$0\"\\r\\nApăsaţi Retry pentru a mai încerca o dată, sau\\r\\nAbort pentru oprirea instalării.","CantWrite":"\"Nu am putut scrie: \"","CopyFailed":"Copierea a eşuat","CopyTo":"\"Copiere în \"","Registering":"\"Se înregistrează: \"","Unregistering":"\"Se dezînregistrează din registru: \"","SymbolNotFound":"\"Simbolul nu a fost găsit: \"","CouldNotLoad":"\"Nu am putut încărca: \"","CreateFolder":"\"Creare director: \"","CreateShortcut":"\"Creare comandă rapidă: \"","CreatedUninstaller":"\"S-a creat aplicaţia de dezinstalare: \"","Delete":"\"Ştergere fişier: \"","DeleteOnReboot":"\"Ştergere la repornire: \"","ErrorCreatingShortcut":"\"Eroare la crearea comenzii rapide: \"","ErrorCreating":"\"Eroare la creare: \"","ErrorDecompressing":"Eroare la dezarhivarea datelor! Aplicatia de instalare este defectă?","ErrorRegistering":"Eroare la Înregistrarea DLL-ului","ExecShell":"\"ExecShell: \"","Exec":"\"Executare: \"","Extract":"\"Extragere: \"","ErrorWriting":"\"Extragere: eroare la scriere în fişier \"","InvalidOpcode":"Aplicaţie de instalare defectă: opcode incorect","NoOLE":"\"Nu există OLE pentru: \"","OutputFolder":"\"Directorul destinaţie: \"","RemoveFolder":"\"Ştergere destinaţie: \"","RenameOnReboot":"\"Redenumire la repornirea computerului: \"","Rename":"\"Redenumire: \"","Skipped":"\"Sărite: \"","CopyDetails":"Copiere detalii în clipboard","LogInstall":"Jurnal proces instalare","Byte":"O","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 118 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1049,"font":{"name":null,"size":null},"codepage":1251,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Установка $(^Name)","UninstallCaption":"Удаление $(^Name)","LicenseSubCaption":": Лицензионное соглашение","ComponentsSubCaption":": Параметры установки","DirSubCaption":": Папка установки","InstallingSubCaption":": Копирование файлов","CompletedSubCaption":": Операция завершена","UnComponentsSubCaption":": Параметры удаления","UnDirSubCaption":": Папка удаления","ConfirmSubCaption":": Подтверждение","UninstallingSubCaption":": Удаление файлов","UnCompletedSubCaption":": Операция завершена","BackBtn":"< &Назад","NextBtn":"&Далее >","AgreeBtn":"Принима&ю","AcceptBtn":"Я &принимаю условия соглашения","DontAcceptBtn":"Я &не принимаю условия соглашения","InstallBtn":"&Установить","UninstallBtn":"Уд&алить","CancelBtn":"Отмена","CloseBtn":"&Закрыть","BrowseBtn":"О&бзор ...","ShowDetailsBtn":"&Детали...","ClickNext":"Нажмите кнопку \"Далее\" для продолжения.","ClickInstall":"Нажмите кнопку \"Установить\", чтобы установить программу.","ClickUninstall":"Нажмите кнопку \"Удалить\", чтобы удалить программу.","Name":"Имя","Completed":"Готово","LicenseText":"Перед установкой $(^NameDA) ознакомьтесь с лицензионным соглашением. Если вы принимаете условия соглашения, нажмите кнопку \"Принимаю\".","LicenseTextCB":"Перед установкой $(^NameDA) ознакомьтесь с лицензионным соглашением. Если вы принимаете условия соглашения, установите флажок ниже. $_CLICK","LicenseTextRB":"Перед установкой $(^NameDA) ознакомьтесь с лицензионным соглашением. Если вы принимаете условия соглашения, выберите первый вариант из предложенных ниже. $_CLICK","UnLicenseText":"Перед установкой $(^NameDA) ознакомьтесь с лицензионным соглашением. Если вы принимаете условия соглашения, нажмите кнопку \"Принимаю\".","UnLicenseTextCB":"Перед установкой $(^NameDA) ознакомьтесь с лицензионным соглашением. Если вы принимаете условия соглашения, установите флажок ниже. $_CLICK","UnLicenseTextRB":"Перед установкой $(^NameDA) ознакомьтесь с лицензионным соглашением. Если вы принимаете условия соглашения, выберите первый вариант из предложенных ниже. $_CLICK","Custom":"По выбору","ComponentsText":"Выберите компоненты программы, которые вы хотите установить. $_CLICK","ComponentsSubText1":"Выберите тип установки:","ComponentsSubText2_NoInstTypes":"Выберите компоненты программы для установки:","ComponentsSubText2":"или выберите дополнительные компоненты для установки:","UnComponentsText":"Выберите компоненты, которые вы хотите удалить. $_CLICK","UnComponentsSubText1":"Выберите тип удаления:","UnComponentsSubText2_NoInstTypes":"Выберите компоненты для удаления:","UnComponentsSubText2":"или выберите дополнительные компоненты для удаления:","DirText":"Программа установит $(^NameDA) в указанную папку. Чтобы установить приложение в другую папку, нажмите кнопку \"Обзор\" и укажите ее. $_CLICK","DirSubText":"Папка установки","DirBrowseText":"Укажите папку для установки $(^NameDA):","UnDirText":"Программа удалит $(^NameDA) из указанной папки. Чтобы выполнить удаление из другой папки, нажмите кнопку \"Обзор\" и укажите ее. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Укажите папку, из которой нужно удалить $(^NameDA):","SpaceAvailable":"\"Доступно на диске: \"","SpaceRequired":"\"Требуется на диске: \"","UninstallingText":"Программа $(^NameDA) будет удалена из вашего ПК. $_CLICK","UninstallingSubText":"Удаление из:","FileError":"Невозможно открыть файл для записи: \\r\\n\\t\"$0\"\\r\\n\"Прервать\": остановить установку;\\r\\n\"Повтор\": повторить попытку;\\r\\n\"Пропуск\": пропустить это действие.","FileError_NoIgnore":"Невозможно открыть файл для записи: \\r\\n\\t\"$0\"\\r\\n\"Повтор\": повторить попытку;\\r\\n\"Отмена\": прервать процесс установки.","CantWrite":"\"Невозможно записать: \"","CopyFailed":"Ошибка при копировании","CopyTo":"\"Копирование в \"","Registering":"\"Регистрация: \"","Unregistering":"\"Де-регистрация: \"","SymbolNotFound":"\"Невозможно найти символ: \"","CouldNotLoad":"\"Невозможно загрузить: \"","CreateFolder":"\"Создание папки: \"","CreateShortcut":"\"Создание ярлыка: \"","CreatedUninstaller":"\"Создание программы удаления: \"","Delete":"\"Удаление файла: \"","DeleteOnReboot":"\"Удаление при перезагрузке ПК: \"","ErrorCreatingShortcut":"\"Ошибка создания ярлыка: \"","ErrorCreating":"\"Ошибка создания: \"","ErrorDecompressing":"Ошибка распаковки данных! Возможно, повреждён дистрибутив.","ErrorRegistering":"Невозможно зарегистрировать библиотеку (DLL)","ExecShell":"\"Выполнение команды оболочки: \"","Exec":"\"Выполнение: \"","Extract":"\"Извлечение: \"","ErrorWriting":"\"Извлечение: ошибка записи файла \"","InvalidOpcode":"Дистрибутив поврежден: недопустимый код","NoOLE":"\"Нет OLE для: \"","OutputFolder":"\"Папка установки: \"","RemoveFolder":"\"Удаление папки: \"","RenameOnReboot":"\"Переименование при перезагрузке ПК: \"","Rename":"\"Переименование: \"","Skipped":"\"Пропуск: \"","CopyDetails":"Копировать сведения в буфер обмена","LogInstall":"Вести отчет установки","Byte":"байт","Kilo":" К","Mega":" М","Giga":" Г"}};

/***/ }),
/* 119 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1169,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"A’ stàladh $(^Name)","UninstallCaption":"A’ dì-stàladh $(^Name)","LicenseSubCaption":": Aonta ceadachais","ComponentsSubCaption":": Roghainnean an stàlaidh","DirSubCaption":": Pasgan an stàlaidh","InstallingSubCaption":": ’Ga stàladh","CompletedSubCaption":": Deiseil","UnComponentsSubCaption":": Roghainnean an dì-stàlaidh","UnDirSubCaption":": Pasgan an dì-stàlaidh","ConfirmSubCaption":": Dearbhadh","UninstallingSubCaption":": ’Ga dhì-stàladh","UnCompletedSubCaption":": Deiseil","BackBtn":"< Air ai&s","NextBtn":"Air adha&rt >","AgreeBtn":"&Gabhaidh mi ris","AcceptBtn":"&Gabhaidh mi teirmichean an aonta cheadachais","DontAcceptBtn":"&Diùltaidh mi teirmichean an aonta ceadachais","InstallBtn":"&Stàlaich","UninstallBtn":"&Dì-stàlaich","CancelBtn":"Sguir dheth","CloseBtn":"&Dùin","BrowseBtn":"&Rùraich…","ShowDetailsBtn":"&Mion-fhiosrachadh","ClickNext":"Briog air “Air adhart” gus leantainn air adhart.","ClickInstall":"Briog air “Stàlaich” gus tòiseachadh air an stàladh.","ClickUninstall":"Briog air “Dì-stàlaich” gus tòiseachadh air an dì-stàladh.","Name":"Ainm","Completed":"Coileanta","LicenseText":"Feuch an doir thu sùil air an aonta cheadachais mus stàlaich thu $(^NameDA). Ma ghabhas tu ris a h-uile teirm san aonta, briog air “Gabhaidh mi ris”.","LicenseTextCB":"Feuch an doir thu sùil air an aonta cheadachais mus stàlaich thu $(^NameDA). Ma ghabhas tu ris a h-uile teirm san aonta, cuir cromag sa bhogsa gu h-ìosal. $_CLICK","LicenseTextRB":"Feuch an doir thu sùil air an aonta cheadachais mus stàlaich thu $(^NameDA). Ma ghabhas tu ris a h-uile teirm san aonta, tagh a’ chiad roghainn gu h-ìosal. $_CLICK","UnLicenseText":"Feuch an doir thu sùil air an aonta cheadachais mus dì-stàlaich thu $(^NameDA). Ma ghabhas tu ris a h-uile teirm san aonta, Briog air “Gabhaidh mi ris”.","UnLicenseTextCB":"Feuch an doir thu sùil air an aonta cheadachais mus dì-stàlaich thu $(^NameDA). Ma ghabhas tu ris a h-uile teirm san aonta, cuir cromag sa bhogsa gu h-ìosal. $_CLICK","UnLicenseTextRB":"Feuch an doir thu sùil air an aonta cheadachais mus dì-stàlaich thu $(^NameDA). Ma ghabhas tu ris a h-uile teirm san aonta, tagh a’ chiad roghainn gu h-ìosal. $_CLICK","Custom":"Gnàthaichte","ComponentsText":"Thoir cromag ann am bogsaichean nan co-phàirtean a tha thu airson stàladh is thoir air falbh i o bhogsaichean nan co-phàirtean nach eil thu ag iarraidh. $_CLICK","ComponentsSubText1":"Tagh an seòrsa dhen stàladh:","ComponentsSubText2_NoInstTypes":"Tagh na co-phàirtean a tha thu airson stàladh:","ComponentsSubText2":"No tagh na co-phàirtean roghainneil a tha thu airson stàladh:","UnComponentsText":"Thoir cromag ann am bogsaichean nan co-phàirtean a tha thu airson dì-stàladh is thoir air falbh i o bhogsaichean nan co-phàirtean a tha thu airson cumail. $_CLICK","UnComponentsSubText1":"Tagh an seòrsa dhen dì-stàladh:","UnComponentsSubText2_NoInstTypes":"Tagh na co-phàirtean a tha thu airson dì-stàladh:","UnComponentsSubText2":"No tagh na co-phàirtean roghainneil a tha thu airson dì-stàladh:","DirText":"Thèid $(^NameDA) a stàladh sa phasgan seo. Gus stàladh ann am pasgan eile, briog air “Rùraich” is tagh pasgan eile. $_CLICK","DirSubText":"Pasgan-uidhe","DirBrowseText":"Tagh am pasgan san dèid $(^NameDA) a stàladh:","UnDirText":"Thèid $(^NameDA) a dhì-stàladh on phasgan seo. Gus dì-stàladh o phasgan eile, briog air “Rùraich” is tagh pasgan eile. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Tagh am pasgan on a tha thu airson $(^NameDA) a dhì-stàladh:","SpaceAvailable":"\"Àite ri fhaighinn: \"","SpaceRequired":"\"Àite air a bheil feum: \"","UninstallingText":"Thèid $(^NameDA) a dhì-stàladh on phasgan seo. $_CLICK","UninstallingSubText":"’Ga dhì-stàladh o:","FileError":"Thachair mearachd a’ fosgladh an fhaidhle a chum sgrìobhaidh: \\r\\n\\r\\n$0\\r\\n\\r\\nBriog air “Sguir dheth” gus sgur dhen stàladh, air\\r\\n“Feuch ris a-rithist” gus feuchainn ris a-rithist no air\\r\\n“Leig seachad” gus leum a ghearradh thairis air an fhaidhle seo.","FileError_NoIgnore":"Thachair mearachd a’ fosgladh an fhaidhle seo a chum sgrìobhaidh: \\r\\n\\r\\n$0\\r\\n\\r\\nBriog air “Feuch ris a-rithist” gus feuchainn ris a-rithist no air\\r\\n“Sguir dheth” gus sgur dhen stàladh.","CantWrite":"\"Cha ghabh sgrìobhadh ann: \"","CopyFailed":"Cha deach leinn lethbhreac dheth a dhèanamh","CopyTo":"\"Cuir lethbhreac gu \"","Registering":"\"A’ clàradh: \"","Unregistering":"\"A’ neo-chlàradh: \"","SymbolNotFound":"\"Cha deach an samhla a lorg: \"","CouldNotLoad":"\"Cha b’ urrainn dhuinn a luchdadh: \"","CreateFolder":"\"Cruthaich pasgan: \"","CreateShortcut":"\"Cruthaich ath-ghoirid: \"","CreatedUninstaller":"\"Dì-stàlaichear air a chruthachadh: \"","Delete":"\"Sguab às dhan fhaidhle: \"","DeleteOnReboot":"\"Sguab às leis an ath-thòiseachadh: \"","ErrorCreatingShortcut":"\"Mearachd le cruthachadh na h-ath-ghoirid: \"","ErrorCreating":"\"Mearachd le cruthachadh: \"","ErrorDecompressing":"Thachair mearachd a’ dì-dhùmhlachadh an dàta! ’S dòcha gu bheil an t-inneal-stàlaidh coirbte.","ErrorRegistering":"Mearachd le clàradh DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Cuir àithne an gnìomh: \"","Extract":"\"Dì-dhùmhlaich: \"","ErrorWriting":"\"Dì-dhùmhlachadh: mearachd a’ sgrìobhadh gu faidhle \"","InvalidOpcode":"Stàlaichear coirbte: opcode mì-dhligheach","NoOLE":"\"Chan eil OLE ann airson: \"","OutputFolder":"\"Pasgan às-chuir: \"","RemoveFolder":"\"Thoir pasgan air falbh: \"","RenameOnReboot":"\"Cuir ainm ùr air leis an ath-thòiseachadh: \"","Rename":"\"Cuir ainm ùr air: \"","Skipped":"\"Air leum a ghearradh: \"","CopyDetails":"Cuir lethbhreac dhen mhion-fhiosrachadh san stòr-bhòrd","LogInstall":"Dèan loga dhen stàladh","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 120 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":3098,"font":{"name":null,"size":null},"codepage":1251,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) Инсталација","UninstallCaption":"$(^Name) Деинсталација","LicenseSubCaption":": Договор о праву коришћења","ComponentsSubCaption":": Опције инсталације","DirSubCaption":": Избор фолдера за инсталацију","InstallingSubCaption":": Инсталација","CompletedSubCaption":": Завршена инсталација","UnComponentsSubCaption":": Опције деинсталације","UnDirSubCaption":": Избор фолдера за деинсталацију","ConfirmSubCaption":": Потврђивање","UninstallingSubCaption":": Деинсталација","UnCompletedSubCaption":": Завршена деинсталација","BackBtn":"< Назад","NextBtn":"Напред >","AgreeBtn":"Прихватам","AcceptBtn":"Прихватам услове договора о праву коришћења","DontAcceptBtn":"Не прихватам услове договора о праву коришћења","InstallBtn":"Инсталирај","UninstallBtn":"Деинсталирај","CancelBtn":"Одустани","CloseBtn":"Затвори","BrowseBtn":"Избор...","ShowDetailsBtn":"Детаљи","ClickNext":"Притисните дугме „Напред“ за наставак.","ClickInstall":"Притисните дугме „Инсталирај“ за почетак инсталације.","ClickUninstall":"Притисните дугме „Деинсталирај“ за почетак деинсталације.","Name":"Име","Completed":"Завршено","LicenseText":"Пажљиво прочитајте договор о праву коришћења пре инсталације програма $(^NameDA). Ако прихватате све услове договора, притисните дугме „Прихватам“.","LicenseTextCB":"Пажљиво прочитајте договор о праву коришћења пре инсталације програма $(^NameDA). Ако прихватате све услове договора, обележите квадратић испод. $_CLICK","LicenseTextRB":"Пажљиво прочитајте договор о праву коришћења пре инсталације програма $(^NameDA). Ако прихватате све услове договора, изаберите прву опцију испод. $_CLICK","UnLicenseText":"Пажљиво прочитајте договор о праву коришћења пре деинсталације програма $(^NameDA). Ако прихватате све услове договора, притисните дугме „Прихватам“.","UnLicenseTextCB":"Пажљиво прочитајте договор о праву коришћења пре деинсталације програма $(^NameDA). Ако прихватате све услове договора, обележите квадратић испод. $_CLICK","UnLicenseTextRB":"Пажљиво прочитајте договор о праву коришћења пре деинсталације програма $(^NameDA). Ако прихватате све услове договора, изаберите прву опцију испод. $_CLICK","Custom":"Прилагођавање","ComponentsText":"Изаберите компоненте за инсталацију. Инсталирају се само означене компоненте. $_CLICK","ComponentsSubText1":"Изаберите тип инсталације:","ComponentsSubText2_NoInstTypes":"Изаберите компоненте за инсталацију: ","ComponentsSubText2":"Или, изаберите опционе компоненте које желите да инсталирате: ","UnComponentsText":"Изаберите компоненте за деинсталацију. Деинсталирају се само означене компоненте. $_CLICK","UnComponentsSubText1":"Изаберите тип деинсталације: ","UnComponentsSubText2_NoInstTypes":"Изаберите компоненте за деинсталацију: ","UnComponentsSubText2":"Или, изаберите опционе компоненте које желите да деинсталирате: ","DirText":"Програм $(^NameDA) ће бити инсталиран у наведени фолдер. За инсталацију у други фолдер притисните дугме „Избор...“ и изаберите фолдер. $_CLICK","DirSubText":"Фолдер","DirBrowseText":"Изаберите фолдер у који ћете инсталирати програм $(^NameDA):","UnDirText":"Програм $(^NameDA) ће бити деинсталиран из наведеног фолдера. За деинсталацију из другог фолдера притисните дугме „Избор...“ и изаберите фолдер. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Изаберите фолдер из кога ћете деинсталирати програм $(^NameDA):","SpaceAvailable":"\"Слободан простор: \"","SpaceRequired":"\"Потребан простор: \"","UninstallingText":"Програм $(^NameDA) ће бити деинсталиран из наведеног фолдера. $_CLICK","UninstallingSubText":"Деинсталација из: ","FileError":"Грешка при отварању фајла за писање: \\r\\n\\t\"$0\"\\r\\nПритисните дугме „Одустани“ за прекид инсталације,\\r\\n„Понови“ за поновни покушај писања у фајл, или\\r\\n„Игнориши“ за прескакање овог фајла.","FileError_NoIgnore":"Грешка при отварању фајла за писање: \\r\\n\\t\"$0\"\\r\\nПритисните дугме „Понови“ за поновни покушај писања у фајл, или\\r\\n„Одустани“ за прекид инсталирања.","CantWrite":"\"Немогуће писање: \"","CopyFailed":"Неуспешно копирање","CopyTo":"\"Копирање у \"","Registering":"\"Регистровање: \"","Unregistering":"\"Дерегистровање: \"","SymbolNotFound":"\"Симбол није нађен: \"","CouldNotLoad":"\"Немогуће учитавање: \"","CreateFolder":"\"Креирање фолдера: \"","CreateShortcut":"\"Креирање пречице: \"","CreatedUninstaller":"\"Креирање деинсталера: \"","Delete":"\"Брисање фајла: \"","DeleteOnReboot":"\"Брисање при рестарту: \"","ErrorCreatingShortcut":"\"Грешка при креирању пречице: \"","ErrorCreating":"\"Грешка при креирању: \"","ErrorDecompressing":"Грешка при отпакивању података! Оштећен инсталациони програм?","ErrorRegistering":"Грешка при регистровању библиотеке","ExecShell":"\"Извршавање у окружењу: \"","Exec":"\"Извршавање: \"","Extract":"\"Отпакивање: \"","ErrorWriting":"\"Отпакивање: грешка при упису у фајл \"","InvalidOpcode":"Оштећен инсталациони програм: неисправна команда ","NoOLE":"\"Нема OLE подршке за: \"","OutputFolder":"\"Излазни фолдер: \"","RemoveFolder":"\"Брисање фолдера: \"","RenameOnReboot":"\"Преименовање при рестартовању: \"","Rename":"\"Преименован: \"","Skipped":"\"Прескочен: \"","CopyDetails":"Копирај детаље у клипборд","LogInstall":"Води записник о процесу инсталације","Byte":"B","Kilo":" k","Mega":" M","Giga":" G"}};

/***/ }),
/* 121 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":2074,"font":{"name":null,"size":null},"codepage":1250,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) Instalacija","UninstallCaption":"$(^Name) Deinstalacija","LicenseSubCaption":": Dogovor o pravu korišćenja","ComponentsSubCaption":": Opcije instalacije","DirSubCaption":": Izbor foldera za instalaciju","InstallingSubCaption":": Instalacija","CompletedSubCaption":": Završena instalacija","UnComponentsSubCaption":": Opcije deinstalacije","UnDirSubCaption":": Izbor foldera za deinstalaciju","ConfirmSubCaption":": Potvrđivanje","UninstallingSubCaption":": Deinstalacija","UnCompletedSubCaption":": Završena deinstalacija","BackBtn":"< Nazad","NextBtn":"Napred >","AgreeBtn":"Prihvatam","AcceptBtn":"Prihvatam uslove dogovora o pravu korišćenja","DontAcceptBtn":"Ne prihvatam uslove dogovora o pravu korišćenja","InstallBtn":"Instaliraj","UninstallBtn":"Deinstaliraj","CancelBtn":"Odustani","CloseBtn":"Zatvori","BrowseBtn":"Izbor...","ShowDetailsBtn":"Detalji","ClickNext":"Pritisnite dugme „Napred“ za nastavak.","ClickInstall":"Pritisnite dugme „Instaliraj“ za početak instalacije.","ClickUninstall":"Pritisnite dugme „Deinstaliraj“ za početak deinstalacije.","Name":"Ime","Completed":"Završeno","LicenseText":"Pažlivo pročitajte dogovor o pravu korišćenja pre instalacije programa $(^NameDA). Ako prihvatate sve uslove dogovora, pritisnite dugme „Prihvatam“.","LicenseTextCB":"Pažlivo pročitajte dogovor o pravu korišćenja pre instalacije programa $(^NameDA). Ako prihvatate sve uslove dogovora, obeležite kvadratić ispod. $_CLICK","LicenseTextRB":"Pažlivo pročitajte dogovor o pravu korišćenja pre instalacije programa $(^NameDA). Ako prihvatate sve uslove dogovora, izaberite prvu opciju ispod. $_CLICK","UnLicenseText":"Pažlivo pročitajte dogovor o pravu korišćenja pre deinstalacije programa $(^NameDA). Ako prihvatate sve uslove dogovora, pritisnite dugme „Prihvatam“.","UnLicenseTextCB":"Pažlivo pročitajte dogovor o pravu korišćenja pre deinstalacije programa $(^NameDA). Ako prihvatate sve uslove dogovora, obeležite kvadratić ispod. $_CLICK","UnLicenseTextRB":"Pažlivo pročitajte dogovor o pravu korišćenja pre deinstalacije programa $(^NameDA). Ako prihvatate sve uslove dogovora, izaberite prvu opciju ispod. $_CLICK","Custom":"Prilagođavanje","ComponentsText":"Izaberite komponente za instalaciju. Instaliraju se samo označene komponente. $_CLICK","ComponentsSubText1":"Izaberite tip instalacije:","ComponentsSubText2_NoInstTypes":"Izaberite komponente za instalaciju: ","ComponentsSubText2":"Ili, izaberite opcione komponente koje želite da instalirate: ","UnComponentsText":"Izaberite komponente za deinstalaciju. Deinstaliraju se samo označene komponente. $_CLICK","UnComponentsSubText1":"Izaberite tip deinstalacije: ","UnComponentsSubText2_NoInstTypes":"Izaberite komponente za deinstalaciju: ","UnComponentsSubText2":"Ili, izaberite opcione komponente koje želite da deinstalirate: ","DirText":"Program $(^NameDA) će biti instaliran u navedeni folder. Za instalaciju u drugi folder pritisnite dugme „Izbor...“ i izaberite folder. $_CLICK","DirSubText":"Folder","DirBrowseText":"Izaberite folder u koji ćete instalirati program $(^NameDA):","UnDirText":"Program $(^NameDA) će biti deinstaliran iz navedenog foldera. Za deinstalaciju iz drugog foldera pritisnite dugme „Izbor...“ i izaberite folder. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Izaberite folder iz koga ćete deinstalirati program $(^NameDA):","SpaceAvailable":"\"Slobodan prostor: \"","SpaceRequired":"\"Potreban prostor: \"","UninstallingText":"Program $(^NameDA) će biti deinstaliran iz navedenog foldera. $_CLICK","UninstallingSubText":"Deinstalacija iz: ","FileError":"Greška pri otvaranju fajla za pisanje: \\r\\n\\t\"$0\"\\r\\nPritisnite dugme „Odustani“ za prekid instalacije,\\r\\n„Ponovi“ za ponovni pokušaj pisanja u fajl, ili\\r\\n„Ignoriši“ za preskakanje ovog fajla.","FileError_NoIgnore":"Greška pri otvaranju fajla za pisanje: \\r\\n\\t\"$0\"\\r\\nPritisnite dugme „Ponovi“ za ponovni pokušaj pisanja u fajl, ili\\r\\n„Odustani“ za prekid instaliranja.","CantWrite":"\"Nemoguće pisanje: \"","CopyFailed":"Neuspešno kopiranje","CopyTo":"\"Kopiranje u \"","Registering":"\"Registrovanje: \"","Unregistering":"\"Deregistrovanje: \"","SymbolNotFound":"\"Simbol nije nađen: \"","CouldNotLoad":"\"Nemoguće učitavanje: \"","CreateFolder":"\"Kreiranje foldera: \"","CreateShortcut":"\"Kreiranje prečice: \"","CreatedUninstaller":"\"Kreiranje deinstalera: \"","Delete":"\"Brisanje fajla: \"","DeleteOnReboot":"\"Brisanje pri restartu: \"","ErrorCreatingShortcut":"\"Greška pri kreiranju prečice: \"","ErrorCreating":"\"Greška pri kreiranju: \"","ErrorDecompressing":"Greška pri otpakivanju podataka! Oštećen instalacioni program?","ErrorRegistering":"Greška pri registrovanju biblioteke","ExecShell":"\"Izvršavanje u okruženju: \"","Exec":"\"Izvršavanje: \"","Extract":"\"Otpakivanje: \"","ErrorWriting":"\"Otpakivanje: greška pri upisu u fajl \"","InvalidOpcode":"Oštećen instalacioni program: neispravna komanda ","NoOLE":"\"Nema OLE podrške za: \"","OutputFolder":"\"Izlazni folder: \"","RemoveFolder":"\"Brisanje foldera: \"","RenameOnReboot":"\"Preimenovanje pri restartu: \"","Rename":"\"Preimenovan: \"","Skipped":"\"Preskočen: \"","CopyDetails":"Kopiraj detalje u klipbord","LogInstall":"Vodi zapisnik o procesu instalacije","Byte":"B","Kilo":" k","Mega":" M","Giga":" G"}};

/***/ }),
/* 122 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":2052,"font":{"name":"宋体","size":9},"codepage":936,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) 安装","UninstallCaption":"$(^Name) 解除安装","LicenseSubCaption":": 许可证协议","ComponentsSubCaption":": 安装选项","DirSubCaption":": 安装文件夹","InstallingSubCaption":": 正在安装","CompletedSubCaption":": 已完成","UnComponentsSubCaption":": 解除安装选项","UnDirSubCaption":": 解除安装文件夹","ConfirmSubCaption":": 确认","UninstallingSubCaption":": 正在解除安装","UnCompletedSubCaption":": 完成","BackBtn":"< 上一步(&P)","NextBtn":"下一步(&N) >","AgreeBtn":"我接受(&I)","AcceptBtn":"我接受“许可证协议”中的条款(&A)","DontAcceptBtn":"我不接受“许可证协议”中的条款(&N)","InstallBtn":"安装(&I)","UninstallBtn":"解除安装(&U)","CancelBtn":"取消(&C)","CloseBtn":"关闭(&L)","BrowseBtn":"浏览(&B)...","ShowDetailsBtn":"显示细节(&D)","ClickNext":"单击 [下一步(N)] 继续。","ClickInstall":"单击 [安装(I)] 开始安装进程。","ClickUninstall":"单击 [解除安装(U)] 开始解除安装进程。","Name":"名称","Completed":"已完成","LicenseText":"在安装 $(^NameDA) 之前请检阅许可证协议。如果你接受协议中所有条款，单击 [我同意(I)] 。","LicenseTextCB":"在安装 $(^NameDA) 之前请检阅许可证协议。如果你接受协议中所有条款，单击下方的勾选框。 $_CLICK","LicenseTextRB":"在安装 $(^NameDA) 之前请检阅许可证协议。如果你接受协议中所有条款，选择下方的第一个选项。 $_CLICK","UnLicenseText":"在解除安装 $(^NameDA) 之前请检阅许可证协议。如果你接受协议中所有条款，单击 [我同意(I)] 。","UnLicenseTextCB":"在解除安装 $(^NameDA) 之前请检阅许可证协议。如果你接受协议中所有条款，单击下方的勾选框。 $_CLICK","UnLicenseTextRB":"在解除安装 $(^NameDA) 之前请检阅许可证协议。如果你接受协议中所有条款，选择下方的第一个选项。 $_CLICK","Custom":"自定义","ComponentsText":"勾选你想要安装的组件，并解除勾选你不希望安装的组件。 $_CLICK","ComponentsSubText1":"选定安装的类型: ","ComponentsSubText2_NoInstTypes":"选定安装的组件: ","ComponentsSubText2":"或者，自定义选定想安装的组件: ","UnComponentsText":"勾选你想要解除安装的组件，并解除勾选你不想要望解除安装的组件。 $_CLICK","UnComponentsSubText1":"选择解除安装的类型: ","UnComponentsSubText2_NoInstTypes":"选择要解除安装的组件: ","UnComponentsSubText2":"或是，选择想要解除安装的可选项组件: ","DirText":"Setup 将安装 $(^NameDA) 在下列文件夹。要安装到不同文件夹，单击 [浏览(B)...] 并选择其他的文件夹。 $_CLICK","DirSubText":"目标文件夹","DirBrowseText":"选择要安装 $(^NameDA) 的文件夹位置: ","UnDirText":"Setup 将自下列文件夹解除安装 $(^NameDA) 。要解除安装到不同文件夹，单击 [浏览(B)...] 并选择其他的文件夹。 $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"选择要解除安装 $(^NameDA) 的文件夹: ","SpaceAvailable":"\"可用空间: \"","SpaceRequired":"\"所需空间: \"","UninstallingText":"这个向导将从你的计算机解除安装 $(^NameDA) 。 $_CLICK","UninstallingSubText":"解除安装目录: ","FileError":"不能打开要写入的文件: \\r\\n\\t\"$0\"\\r\\n单击 [Abort] 停止安装，\\r\\n [Retry] 重新尝试写入文件，或\\r\\n [Ignore] 忽略这个文件。","FileError_NoIgnore":"不能打开要写入的文件: \\r\\n\\t\"$0\"\\r\\n单击 [Retry] 重新尝试写入文件，或\\r\\n [Cancel] 停止安装。","CantWrite":"\"无法写入: \"","CopyFailed":"\"复制失败 \"","CopyTo":"\"复制到: \"","Registering":"\"正在注册: \"","Unregistering":"\"正在解除注册: \"","SymbolNotFound":"\"无法找到符号: \"","CouldNotLoad":"\"无法加载: \"","CreateFolder":"\"创建文件夹: \" ","CreateShortcut":"\"创建快捷方式: \"","CreatedUninstaller":"\"创建解除安装程序: \"","Delete":"\"删除文件: \"","DeleteOnReboot":"\"重新启动后删除: \"","ErrorCreatingShortcut":"\"正在创建快捷方式时发生错误: \"","ErrorCreating":"\"正在创建时发生错误: \"","ErrorDecompressing":"\"正在解压缩数据发生错误！已损坏的安装程序？\"","ErrorRegistering":"\"正在注册 DLL 时发生错误\"","ExecShell":"\"运行壳层程序: \"","Exec":"\"运行: \"","Extract":"\"抽取: \"","ErrorWriting":"\"抽取: 无法写入文件 \"","InvalidOpcode":"\"安装损毁: 无效的操作代码 \"","NoOLE":"\"没有 OLE 用于: \"","OutputFolder":"\"输出目录: \"","RemoveFolder":"\"移除目录: \"","RenameOnReboot":"\"重新启动后重命名: \"","Rename":"\"重命名: \"","Skipped":"\"已跳过: \"","CopyDetails":"\"复制细节到剪贴板 \"","LogInstall":"\"日志安装进程\"","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 123 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1051,"font":{"name":null,"size":null},"codepage":1250,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Inštalácia programu $(^Name)","UninstallCaption":"Odinštalovanie programu $(^Name)","LicenseSubCaption":": Licenčná zmluva","ComponentsSubCaption":": Možnosti inštalácie","DirSubCaption":": Inštalačný priečinok","InstallingSubCaption":": Prebieha inštalácia","CompletedSubCaption":": Hotovo","UnComponentsSubCaption":": Možnosti odinštalovania","UnDirSubCaption":": Priečinok s informáciami pre odinštalovanie","ConfirmSubCaption":": Potvrdenie","UninstallingSubCaption":": Prebieha odinštalácia","UnCompletedSubCaption":": Hotovo","BackBtn":"< &Späť","NextBtn":"Ď&alej >","AgreeBtn":"&Súhlasím","AcceptBtn":"&Súhlasím s podmienkami licenčnej zmluvy","DontAcceptBtn":"N&esúhlasím s podmienkami licenčnej zmluvy","InstallBtn":"&Nainštalovať","UninstallBtn":"&Odinštalovať","CancelBtn":"Zrušiť","CloseBtn":"&Zatvoriť","BrowseBtn":"&Prehľadávať...","ShowDetailsBtn":"&Podrobnosti","ClickNext":"V inštalácii pokračujte kliknutím na tlačidlo Ďalej.","ClickInstall":"Pre spustenie inštalácie kliknite na tlačidlo Nainštalovať.","ClickUninstall":"Pre spustenie procesu odinštalovania kliknite na tlačidlo Odinštalovať.","Name":"Názov","Completed":"Hotovo","LicenseText":"Pred inštaláciou programu si prosím dôkladne prečítajte licenčnú zmluvu $(^NameDA). Ak súhlasíte so všetkými jej podmienkami, kliknite na tlačidlo Súhlasím.","LicenseTextCB":"Pred inštaláciou programu si prosím dôkladne prečítajte licenčnú zmluvu $(^NameDA). Ak súhlasíte so všetkými jej podmienkami, zaškrtnite nasledujúce políčko. $_CLICK","LicenseTextRB":"Pred inštaláciou programu si prosím dôkladne prečítajte licenčnú zmluvu $(^NameDA). Ak súhlasíte so všetkými jej podmienkami, označte prvú z nasledujúcich možností. $_CLICK","UnLicenseText":"Pred odinštalovaním programu si prosím dôkladne prečítajte licenčnú zmluvu $(^NameDA). Ak súhlasíte so všetkými jej podmienkami, kliknite na tlačidlo Súhlasím.","UnLicenseTextCB":"Pred odinštalovaním programu si prosím dôkladne prečítajte licenčnú zmluvu $(^NameDA). Ak súhlasíte so všetkými jej podmienkami, zaškrtnite nasledujúce políčko. $_CLICK","UnLicenseTextRB":"Pred odinštalovaním programu si prosím dôkladne prečítajte licenčnú zmluvu $(^NameDA). Ak súhlasíte so všetkými jej podmienkami, označte prvú z nasledujúcich možností. $_CLICK","Custom":"Voliteľná","ComponentsText":"Označte súčasti programu, ktoré chcete nainštalovať a odznačte tie, ktoré nainštalovať nechcete. $_CLICK","ComponentsSubText1":"Vyberte si typ inštalácie:","ComponentsSubText2_NoInstTypes":"Vyberte si tie súčasti programu, ktoré chcete nainštalovať:","ComponentsSubText2":"Alebo označte voliteľné doplnky, ktoré chcete nainštalovať:","UnComponentsText":"Označte súčasti programu, ktoré chcete odinštalovať a odznačte tie, ktoré chcete ponechať nainštalované. $_CLICK","UnComponentsSubText1":"Zvoľte typ deinštalácie:","UnComponentsSubText2_NoInstTypes":"Vyberte súčasti, ktoré chcete odinštalovať:","UnComponentsSubText2":"Alebo označte voliteľné súčasti, ktoré chcete odinštalovať:","DirText":"$(^NameDA) bude nainštalovaný do nasledujúceho priečinka. Inštalovať do iného priečinka môžete po kliknutí na tlačidlo Prehľadávať a vybraní iného priečinka. $_CLICK","DirSubText":"Cieľový priečinok","DirBrowseText":"Zvoľte priečinok, do ktorého sa nainštaluje program $(^NameDA):","UnDirText":"Inštalátor odinštaluje program $(^NameDA) z nasledovného priečinka. Ak ho chcete odinštalovať z iného priečinka, kliknite na tlačidlo Prehľadávať a vyberte iný priečinok. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Zvoľte priečinok, z ktorého sa odinštaluje program $(^NameDA):","SpaceAvailable":"\"Voľné miesto na disku: \"","SpaceRequired":"\"Potrebné miesto na disku: \"","UninstallingText":"Program $(^NameDA) sa odinštaluje z nasledovného priečinka. $_CLICK","UninstallingSubText":"Prebieha odinštalovanie z:","FileError":"Chyba pri otváraní súboru na zápis: \\r\\n\\r\\n$0\\r\\n\\r\\n. Ak chcete inštaláciu ukončiť, kliknite na tlačidlo Ukončiť,\\r\\ ak chcete zápis súboru zopakovať, kliknite na tlačidlo Opakovať alebo kliknite na tlačidlo \\r\\nIgnorovať, ak chcete inštaláciu tohto súboru vynechať.","FileError_NoIgnore":"Chyba pri otváraní súboru na zápis: \\r\\n\\r\\n$0\\r\\n\\r\\n. Ak chcete zopakovať zápis súboru, kliknite na tlačidlo Opakovať, alebo kliknite na tlačidlo \\r\\nZrušiť, v prípade, že chcete inštaláciu ukončiť.","CantWrite":"\"Nemožno zapísať súbor: \"","CopyFailed":"Kopírovanie zlyhalo.","CopyTo":"\"Kopírovať do \"","Registering":"\"Registruje sa: \"","Unregistering":"\"Vymazáva sa z registra: \"","SymbolNotFound":"\"Nemožno nájsť symbol: \"","CouldNotLoad":"\"Nemožno načítať: \"","CreateFolder":"\"Vytvorený priečinok: \"","CreateShortcut":"\"Vytvorený odkaz: \"","CreatedUninstaller":"\"Program pre odinštalovanie: \"","Delete":"\"Vymazaný súbor: \"","DeleteOnReboot":"\"Vymazať po reštartovaní systému: \"","ErrorCreatingShortcut":"\"Chyba pri vytváraní odkazu: \"","ErrorCreating":"\"Chyba pri vytváraní: \"","ErrorDecompressing":"Chyba pri dekomprimovaní dát! Inštalátor je pravdepodobne poškodený...","ErrorRegistering":"Chyba pri registrácii súčasti","ExecShell":"\"Vykonať príkaz: \"","Exec":"\"Spustiť: \"","Extract":"\"Extrahuje sa: \"","ErrorWriting":"\"Chyba pri zápise do súboru \"","InvalidOpcode":"Inštalátor je pravdepodobne poškodený, pretože obsahuje neplatný operačný kód.","NoOLE":"\"Žiadny zápis OLE pre: \"","OutputFolder":"\"Výstupný priečinok: \"","RemoveFolder":"\"Odstrániť priečinok: \"","RenameOnReboot":"\"Premenovať po reštartovaní systému: \"","Rename":"\"Premenovať: \"","Skipped":"\"Vynechané: \"","CopyDetails":"Skopírovať podrobnosti do schránky","LogInstall":"Zaznamenať priebeh inštalácie","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 124 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1060,"font":{"name":null,"size":null},"codepage":1250,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Namestitev $(^Name)","UninstallCaption":"Odstranitev $(^Name)","LicenseSubCaption":": Licenčna pogodba","ComponentsSubCaption":": Možnosti namestitve","DirSubCaption":": Mapa namestitve","InstallingSubCaption":": Nameščanje poteka","CompletedSubCaption":": Dokončano","UnComponentsSubCaption":": Možnosti odstranitve","UnDirSubCaption":": Mapa odstranitve","ConfirmSubCaption":": Potrditev","UninstallingSubCaption":": Odstranjevanje poteka","UnCompletedSubCaption":": Dokončano","BackBtn":"< &Nazaj","NextBtn":"N&aprej >","AgreeBtn":"Se &strinjam","AcceptBtn":"&Sprejmem pogoje licenčne pogodbe","DontAcceptBtn":"&Ne sprejmem pogojev licenčne pogodbe","InstallBtn":"&Namesti","UninstallBtn":"&Odstrani","CancelBtn":"Prekliči","CloseBtn":"&Zapri","BrowseBtn":"Prebrsk&aj ...","ShowDetailsBtn":"&Podrobnosti","ClickNext":"Kliknite Naprej za nadaljevanje.","ClickInstall":"Kliknite Namesti za začetek namestitve.","ClickUninstall":"Kliknite Odstrani za odstranitev.","Name":"Ime","Completed":"Dokončano","LicenseText":"Prosimo, da pred namestitvijo $(^NameDA) pregledate licenčno pogodbo. Če se z njo strinjate, pritisnite Se strinjam.","LicenseTextCB":"Prosimo, da pred namestitvijo $(^NameDA) pregledate licenčno pogodbo. Če sprejmete vse naštete pogoje, potrdite spodnje polje. $_CLICK","LicenseTextRB":"Prosimo, da pred namestitvijo $(^NameDA) pregledate licenčno pogodbo. Če sprejmete vse naštete pogoje, izberite prvo spodaj podano možnost. $_CLICK","UnLicenseText":"Prosimo, da pred odstranitvijo $(^NameDA) pregledate licenčno pogodbo. Če se z njo strinjate, pritisnite Se strinjam.","UnLicenseTextCB":"Prosimo, da pred odstranitvijo $(^NameDA) pregledate licenčno pogodbo. Če sprejmete vse naštete pogoje, potrdite spodnje polje. $_CLICK","UnLicenseTextRB":"Prosimo, da pred odstranitvijo $(^NameDA) pregledate licenčno pogodbo. Če sprejmete vse naštete pogoje, izberite prvo spodaj podano možnost. $_CLICK","Custom":"Po meri ...","ComponentsText":"Označite komponente, ki jih želite namestiti, in pustite neoznačene tiste, katerih ne želite namestiti. $_CLICK","ComponentsSubText1":"Izberite vrsto namestitve:","ComponentsSubText2_NoInstTypes":"Izberite komponente namestitve:","ComponentsSubText2":"Ali pa izberite komponente, ki jih želite namestiti:","UnComponentsText":"Označite komponente, ki jih želite odstraniti, in pustite neoznačene tiste, ki jih ne želite odstraniti. $_CLICK","UnComponentsSubText1":"Izberite vrsto odstranitve:","UnComponentsSubText2_NoInstTypes":"Izberite komponente za odstranitev:","UnComponentsSubText2":"Ali pa izberite komponente namestitve, ki jih želite odstraniti:","DirText":"$(^NameDA) boste namestili v sledečo mapo. Za izbiro druge mape kliknite tipko Prebrskaj in izberite drugo mapo. $_CLICK","DirSubText":"Ciljna mapa","DirBrowseText":"Izberite mapo, kamor želite namestiti $(^NameDA):","UnDirText":"Odstranili boste $(^NameDA) iz sledeče mape. Za izbiro druge mape kliknite tipko Prebrskaj in izberite drugo mapo. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Izberite mapo, od koder želite odstraniti $(^NameDA):","SpaceAvailable":"\"Prostor na disku: \"","SpaceRequired":"\"Potreben prostor: \"","UninstallingText":"$(^NameDA) bo odstranjen iz naslednje mape. $_CLICK","UninstallingSubText":"Odstranjevanje iz:","FileError":"Napaka pri odpiranju datoteke za pisanje: \\r\\n\\r\\n$0\\r\\n\\r\\nPritisnite Prekini za prekinitev namestitve,\\r\\nPonovi za ponoven poskus ali\\r\\nPrezri za izpust te datoteke.","FileError_NoIgnore":"Napaka pri odpiranju datoteke za pisanje: \\r\\n\\r\\n$0\\r\\n\\r\\nPritisnite Ponovi za ponoven poskus pisanja ali\\r\\Prekliči za prekinitev namestitve.","CantWrite":"\"Ni mogoče pisati: \"","CopyFailed":"Kopiranje neuspešno","CopyTo":"\"Kopiranje v \"","Registering":"\"Registracija: \"","Unregistering":"\"Preklic registracije: \"","SymbolNotFound":"\"Ni mogoče najti simbola: \"","CouldNotLoad":"\"Ni mogoče naložiti: \"","CreateFolder":"\"Ustvarjanje mape: \"","CreateShortcut":"\"Ustvarjanje bližnjice: \"","CreatedUninstaller":"\"Ustvarjena odstranitev: \"","Delete":"\"Brisanje datoteke: \"","DeleteOnReboot":"\"Brisanje ob ponovnem zagonu: \"","ErrorCreatingShortcut":"\"Napaka ustvarjanja bližnjice: \"","ErrorCreating":"\"Napaka ustvarjanja: \"","ErrorDecompressing":"Napaka pri razširjanju podatkov! Je namestitvena datoteka okvarjena?","ErrorRegistering":"Napaka registracije DLL","ExecShell":"\"Izvajanje v lupini: \"","Exec":"\"Izvajanje: \"","Extract":"\"Razširjanje: \"","ErrorWriting":"\"Razširjanje: napaka pri pisanju v datoteko \"","InvalidOpcode":"Namestitev neveljavna: napačen ukaz","NoOLE":"\"Neobstoječi OLE za: \"","OutputFolder":"\"Ciljna mapa: \"","RemoveFolder":"\"Odstranjevanje mape: \"","RenameOnReboot":"\"Preimenovanje ob zagonu: \"","Rename":"\"Preimenovanje: \"","Skipped":"\"Izpuščeno: \"","CopyDetails":"Kopiraj podrobnosti v odložišče","LogInstall":"Shrani potek namestitve","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 125 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1034,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Instalación de $(^Name)","UninstallCaption":"Desinstalación de $(^Name)","LicenseSubCaption":": Acuerdo de Licencia","ComponentsSubCaption":": Opciones de Instalación","DirSubCaption":": Directorio de Instalación","InstallingSubCaption":": Instalando","CompletedSubCaption":": Completado","UnComponentsSubCaption":": Opciones de Desinstalación","UnDirSubCaption":": Directorio de Desinstalación","ConfirmSubCaption":": Confirmación","UninstallingSubCaption":": Desinstalando","UnCompletedSubCaption":": Completado","BackBtn":"< &Atrás","NextBtn":"&Siguiente >","AgreeBtn":"A&cepto","AcceptBtn":"A&cepto los términos de la licencia","DontAcceptBtn":"&No acepto los términos de la licencia","InstallBtn":"&Instalar","UninstallBtn":"&Desinstalar","CancelBtn":"Cancelar","CloseBtn":"&Cerrar","BrowseBtn":"&Examinar...","ShowDetailsBtn":"Ver &detalles","ClickNext":"Presione Siguiente para continuar.","ClickInstall":"Presione Instalar para comenzar la instalación.","ClickUninstall":"Presione Desinstalar para comenzar la desinstalación.","Name":"Nombre","Completed":"Completado","LicenseText":"Por favor, revise el acuerdo de licencia antes de instalar $(^NameDA). Si acepta todos los términos del acuerdo, presione Acepto.","LicenseTextCB":"Por favor, revise el acuerdo de licencia antes de instalar $(^NameDA). Si acepta todos los términos del acuerdo, marque abajo la casilla. $_CLICK","LicenseTextRB":"Por favor, revise el acuerdo de licencia antes de instalar $(^NameDA). Si acepta todos los términos del acuerdo, seleccione abajo la primera opción. $_CLICK","UnLicenseText":"Por favor, revise el acuerdo de licencia antes de desinstalar $(^NameDA). Si acepta todos los términos del acuerdo, presione Acepto.","UnLicenseTextCB":"Por favor, revise el acuerdo de licencia antes de desinstalar $(^NameDA). Si acepta todos los términos del acuerdo, marque abajo la casilla. $_CLICK.","UnLicenseTextRB":"Por favor, revise el acuerdo de licencia antes de desinstalar $(^NameDA). Si acepta todos los términos del acuerdo, seleccione abajo la primera opción. $_CLICK","Custom":"Personalizada","ComponentsText":"Marque los componentes que desee instalar y desmarque los componentes que no desee instalar. $_CLICK","ComponentsSubText1":"Tipos de instalación:","ComponentsSubText2_NoInstTypes":"Seleccione los componentes a instalar:","ComponentsSubText2":"O seleccione los componentes opcionales que desee instalar:","UnComponentsText":"Marque los componentes que desee desinstalar y desmarque los componentes que no desee desinstalar. $_CLICK","UnComponentsSubText1":"Tipos de desinstalación:","UnComponentsSubText2_NoInstTypes":"Seleccione los componentes a desinstalar:","UnComponentsSubText2":"O seleccione los componentes opcionales que desee desinstalar:","DirText":"El programa de instalación instalará $(^NameDA) en el siguiente directorio. Para instalar en un directorio diferente, presione Examinar y seleccione otro directorio. $_CLICK","DirSubText":"Directorio de Destino","DirBrowseText":"Seleccione el directorio en el que instalará $(^NameDA):","UnDirText":"El programa de instalación desinstalará $(^NameDA) del siguiente directorio. Para desinstalar de un directorio diferente, presione Examinar y seleccione otro directorio. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Seleccione el directorio desde el cual desinstalará $(^NameDA):","SpaceAvailable":"Espacio disponible: ","SpaceRequired":"Espacio requerido: ","UninstallingText":"$(^NameDA) será desinstalado del siguiente directorio. $_CLICK","UninstallingSubText":"Desinstalando desde:","FileError":"Error abriendo archivo para escritura: \\r\\n\\t\"$0\"\\r\\nPresione abortar para anular la instalación,\\r\\nreintentar para volver a intentar escribir el archivo, u\\r\\nomitir para ignorar este archivo","FileError_NoIgnore":"Error abriendo archivo para escritura: \\r\\n\\t\"$0\"\\r\\nPresione reintentar para volver a intentar escribir el archivo, o\\r\\ncancelar para anular la instalación","CantWrite":"\"No pudo escribirse: \"","CopyFailed":"Falló la copia","CopyTo":"\"Copiar a \"","Registering":"\"Registrando: \"","Unregistering":"\"Eliminando registro: \"","SymbolNotFound":"\"No pudo encontrarse símbolo: \"","CouldNotLoad":"\"No pudo cargarse: \"","CreateFolder":"\"Creando directorio: \"","CreateShortcut":"\"Creando acceso directo: \"","CreatedUninstaller":"\"Creando desinstalador: \"","Delete":"\"Borrar archivo: \"","DeleteOnReboot":"\"Borrar al reinicio: \"","ErrorCreatingShortcut":"\"Error creando acceso directo: \"","ErrorCreating":"\"Error creando: \"","ErrorDecompressing":"¡Error descomprimiendo datos! ¿Instalador corrupto?","ErrorRegistering":"Error registrando DLL","ExecShell":"\"Extrayendo  comando: \"","Exec":"\"Extrayendo : \"","Extract":"\"Extraer: \"","ErrorWriting":"\"Extraer: error escribiendo al archivo \"","InvalidOpcode":"Instalador corrupto: código de operación no válido","NoOLE":"\"Sin OLE para: \"","OutputFolder":"\"Directorio de salida: \"","RemoveFolder":"\"Eliminar directorio: \"","RenameOnReboot":"\"Renombrar al reinicio: \"","Rename":"\"Renombrar: \"","Skipped":"\"Omitido: \"","CopyDetails":"Copiar Detalles al Portapapeles","LogInstall":"Registrar proceso de instalación ","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 126 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":3082,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Instalación de $(^Name)","UninstallCaption":"Desinstalación de $(^Name)","LicenseSubCaption":": Acuerdo de Licencia","ComponentsSubCaption":": Opciones de Instalación","DirSubCaption":": Carpeta de Instalación","InstallingSubCaption":": Instalando","CompletedSubCaption":": Finalizado","UnComponentsSubCaption":": Opciones de Desinstalación","UnDirSubCaption":": Carpeta de Desinstalación","ConfirmSubCaption":": Confirmación","UninstallingSubCaption":": Desinstalando","UnCompletedSubCaption":": Finalizado","BackBtn":"< &Atrás","NextBtn":"&Siguiente >","AgreeBtn":"&Acepto","AcceptBtn":"&Acepto las condiciones del Acuerdo de Licencia","DontAcceptBtn":"No &acepto las condiciones del Acuerdo de Licencia","InstallBtn":"&Instalar","UninstallBtn":"&Desinstalar","CancelBtn":"Cancelar","CloseBtn":"&Cerrar","BrowseBtn":"&Examinar...","ShowDetailsBtn":"Mostrar &detalles","ClickNext":"Presione Siguiente para continuar.","ClickInstall":"Presione Instalar para iniciar la instalación.","ClickUninstall":"Presione Desinstalar para iniciar la desinstalación.","Name":"Nombre","Completed":"Finalizado","LicenseText":"Por favor, revise el acuerdo de licencia antes de instalar $(^NameDA). Si usted acepta todas las condiciones del acuerdo, presione Acepto.","LicenseTextCB":"Por favor, revise el acuerdo de licencia antes de instalar $(^NameDA). Si usted acepta todas las condiciones del acuerdo, marque abajo la casilla. $_CLICK","LicenseTextRB":"Por favor, revise el acuerdo de licencia antes de instalar $(^NameDA). Si usted acepta todas las condiciones del acuerdo, seleccione abajo la primera opción. $_CLICK","UnLicenseText":"Por favor, revise el acuerdo de licencia antes de desinstalar $(^NameDA). Si usted acepta todas las condiciones del acuerdo, presione Acepto.","UnLicenseTextCB":"Por favor, revise el acuerdo de licencia antes de desinstalar $(^NameDA). Si usted acepta todas las condiciones del acuerdo, marque abajo la casilla. $_CLICK","UnLicenseTextRB":"Por favor, revise el acuerdo de licencia antes de desinstalar $(^NameDA). Si usted acepta todas las condiciones del acuerdo, seleccione abajo la primera opción. $_CLICK","Custom":"Personalizada","ComponentsText":"Marque los componentes que desee instalar y desmarque los componentes que no desee instalar. $_CLICK","ComponentsSubText1":"Seleccione el tipo de instalación:","ComponentsSubText2_NoInstTypes":"Seleccione los componentes a instalar:","ComponentsSubText2":"O seleccione los componentes opcionales que desee instalar:","UnComponentsText":"Marque los componentes que desee desinstalar y desmarque los componentes que no desee desinstalar. $_CLICK","UnComponentsSubText1":"Seleccione el tipo de desinstalación:","UnComponentsSubText2_NoInstTypes":"Seleccione los componentes a desinstalar:","UnComponentsSubText2":"O seleccione los componentes opcionales que desee desinstalar:","DirText":"El programa de instalación instalará $(^NameDA) en la siguiente carpeta. Para instalar en una carpeta diferente, presione Examinar y seleccione otra carpeta. $_CLICK","DirSubText":"Carpeta de Destino","DirBrowseText":"Seleccione la carpeta en la que instalará $(^NameDA):","UnDirText":"El programa de instalación desinstalará $(^NameDA) de la siguiente carpeta. Para desinstalar de una carpeta diferente, presione Examinar y seleccione otra carpeta. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Seleccione la carpeta desde la que desinstalará $(^NameDA):","SpaceAvailable":"Espacio disponible:","SpaceRequired":"Espacio requerido:","UninstallingText":"$(^NameDA) será desinstalado de la siguiente carpeta. $_CLICK","UninstallingSubText":"Desinstalando desde:","FileError":"Error abriendo archivo para escribir: \\r\\n\\r\\n$0\\r\\n\\r\\nPresione Abortar para detener la instalación,\\r\\nReintentar para probar otra vez, o\\r\\nOmitir para ignorar este archivo.","FileError_NoIgnore":"Error abriendo archivo para escribir: \\r\\n\\r\\n$0\\r\\n\\r\\nPresione Reintentar para probar otra vez, o\\r\\nCancelar para detener la instalación.","CantWrite":"\"No pudo escribirse: \"","CopyFailed":"Copia fallida","CopyTo":"\"Copiar a \"","Registering":"\"Registrando: \"","Unregistering":"\"Eliminando registro: \"","SymbolNotFound":"\"No se encontró simbolo: \"","CouldNotLoad":"\"No pudo cargarse: \"","CreateFolder":"\"Creando carpeta: \"","CreateShortcut":"\"Creando acceso directo: \"","CreatedUninstaller":"\"Creando desinstalador: \"","Delete":"\"Borrar archivo: \"","DeleteOnReboot":"\"Borrar al reinicio: \"","ErrorCreatingShortcut":"\"Error creando acceso directo: \"","ErrorCreating":"\"Error creando: \"","ErrorDecompressing":"¡Error descomprimiendo datos! ¿Instalador corrupto?","ErrorRegistering":"Error registrando DLL","ExecShell":"\"Ejecutando comando: \"","Exec":"\"Ejecutando: \"","Extract":"\"Extrayendo: \"","ErrorWriting":"\"Extrayendo: error escribiendo al archivo \"","InvalidOpcode":"Instalador corrupto: código de operación no válido","NoOLE":"\"Sin OLE para: \"","OutputFolder":"\"Carpeta de salida: \"","RemoveFolder":"\"Eliminar carpeta: \"","RenameOnReboot":"\"Renombrar al reinicio: \"","Rename":"\"Renombrar: \"","Skipped":"\"Omitido: \"","CopyDetails":"Copiar Detalles al Portapapeles","LogInstall":"Registrar proceso de instalación","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 127 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1053,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) Installation","UninstallCaption":"$(^Name) Avinstallation","LicenseSubCaption":": Licensavtal","ComponentsSubCaption":": Installationsval","DirSubCaption":": Installationskatalog","InstallingSubCaption":": Installerar","CompletedSubCaption":": Slutförd","UnComponentsSubCaption":": Avinstallationsval","UnDirSubCaption":": Avinstallationskatalog","ConfirmSubCaption":": Bekräftelse","UninstallingSubCaption":": Avinstallerar","UnCompletedSubCaption":": Slutförd","BackBtn":"< &Tillbaka","NextBtn":"&Nästa >","AgreeBtn":"Jag &Godkänner","AcceptBtn":"Jag &Godkänner villkoren i licensavtalet","DontAcceptBtn":"Jag &Godkänner inte villkoren i licensavtalet","InstallBtn":"&Installera","UninstallBtn":"&Avinstallera","CancelBtn":"Avbryt","CloseBtn":"&Stäng","BrowseBtn":"B&läddra...","ShowDetailsBtn":"Visa &detaljer","ClickNext":"Klicka på Nästa för att fortsätta.","ClickInstall":"Klicka på Installera för att starta installationen.","ClickUninstall":"Klicka på Avinstallera för att starta avinstallationen.","Name":"Namn","Completed":"Slutförd","LicenseText":"Var vänlig läs igenom licensvillkoren innan du installerar $(^NameDA). Om du accepterar villkoren i avtalet, klicka Jag Godkänner.","LicenseTextCB":"Var vänlig läs igenom licensvillkoren innan du installerar $(^NameDA). Om du accepterar villkoren i avtalet, klicka i checkrutan nedan. $_CLICK","LicenseTextRB":"Var vänlig läs igenom licensvillkoren innan du installerar $(^NameDA). Om du accepterar villkoren i avtalet, välj det första alternativet nedan. $_CLICK","UnLicenseText":"Var vänlig läs igenom licensvillkoren innan du avinstallerar $(^NameDA). Om du accepterar villkoren i avtalet, klicka Jag Godkänner.","UnLicenseTextCB":"Var vänlig läs igenom licensvillkoren innan du avinstallerar $(^NameDA). Om du accepterar villkoren i avtalet, klicka i checkrutan nedan. $_CLICK","UnLicenseTextRB":"Var vänlig läs igenom licensvillkoren innan du avinstallerar $(^NameDA). Om du accepterar villkoren i avtalet, välj det första alternativet nedan. $_CLICK","Custom":"Valfri","ComponentsText":"Markera de komponenter du vill installera och avmarkera de komponenter du inte vill installera. $_CLICK","ComponentsSubText1":"Välj typ av installation:","ComponentsSubText2_NoInstTypes":"Välj komponenter att installera:","ComponentsSubText2":"Eller, välj de alternativa komponenter du önskar installera:","UnComponentsText":"Markera de komponenter du vill avinstallera och avmarkera de komponenter du inte vill avinstallera. $_CLICK","UnComponentsSubText1":"Välj typ av avinstallation:","UnComponentsSubText2_NoInstTypes":"Välj komponenter att avinstallera:","UnComponentsSubText2":"Eller, välj de alternativa komponenter du önskar avinstallera:","DirText":"Guiden kommer att installera $(^NameDA) i följande katalog. För att installera i en annan katalog, klicka Bläddra och välj en alternativ katalog. $_CLICK","DirSubText":"Målkatalog","DirBrowseText":"Välj katalog att installera $(^NameDA) i:","UnDirText":"Installationsguiden kommer att avinstallera $(^NameDA) från följande katalog. För att avinstallera från en annan katalog, klicka Bläddra och välj en annan katalog. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Välj katalog att avinstallera $(^NameDA) från:","SpaceAvailable":"\"Utrymme tillgängligt: \"","SpaceRequired":"\"Utrymme som behövs: \"","UninstallingText":"$(^NameDA) kommer att avinstalleras från följande katalog. $_CLICK","UninstallingSubText":"Avinstallerar från:","FileError":"Fel vid Öppning av fil för skrivning: \\r\\n\\t\"$0\"\\r\\nKlicka på avbryt för att avbryta installationen,\\r\\nförsök igen för att försöka skriva till filen igen, eller\\r\\nIgnorera för att skippa denna fil","FileError_NoIgnore":"Fel vid Öppning av fil för skrivning: \\r\\n\\t\"$0\"\\r\\nKlicka på försök igen för att skriva till filen igen, eller\\r\\navbryt för att avbryta installationen","CantWrite":"\"Kan inte skriva: \"","CopyFailed":"Kopiering misslyckades","CopyTo":"\"Kopiera till \"","Registering":"\"Registrerar: \"","Unregistering":"\"Avregistrerar: \"","SymbolNotFound":"\"Kunde inte hitta symbol: \"","CouldNotLoad":"\"Kunde inte ladda: \"","CreateFolder":"\"Skapa katalog: \"","CreateShortcut":"\"Skapa genväg: \"","CreatedUninstaller":"\"Skapade avinstallationsprogram: \"","Delete":"\"Radera fil: \"","DeleteOnReboot":"\"Radera vid omstart: \"","ErrorCreatingShortcut":"\"Fel vid skapande av genväg: \"","ErrorCreating":"\"Fel vid skapande: \"","ErrorDecompressing":"Fel vid uppackning av data! Skadat installationspaket?","ErrorRegistering":"Fel vid registrering av DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Kör: \"","Extract":"\"Extrahera: \"","ErrorWriting":"\"Extrahera: fel vid skrivning till fil \"","InvalidOpcode":"Installationspaket skadat: ogiltig opcode","NoOLE":"\"Ingen OLE för: \"","OutputFolder":"\"Målkatalog: \"","RemoveFolder":"\"Ta bort katalog: \"","RenameOnReboot":"\"Döp om vid omstart: \"","Rename":"\"Döp om: \"","Skipped":"\"Ignorerad: \"","CopyDetails":"Kopiera detaljinformation till klippbordet","LogInstall":"Logga installationsförfarandet","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 128 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1092,"font":{"name":null,"size":null},"codepage":1251,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Урнаштыру $(^Name)","UninstallCaption":"Бетерү $(^Name)","LicenseSubCaption":": Лицензия килешүе","ComponentsSubCaption":": Урнаштыру шартлары","DirSubCaption":": Урнаштыру папкасы","InstallingSubCaption":": Файлларны күчермәләү","CompletedSubCaption":": Гамәл тәмамланды","UnComponentsSubCaption":": Бетерү шартлары","UnDirSubCaption":": Бетерү папкасы","ConfirmSubCaption":": Раслау","UninstallingSubCaption":": Файлларны бетерү","UnCompletedSubCaption":": Гамәл тәмамланды","BackBtn":"< &Артка","NextBtn":"&Алга >","AgreeBtn":"Кабул ит&әм","AcceptBtn":"Мин &килешү шартларын кабул итәм","DontAcceptBtn":"Мин &килешү шартларын кабул итими","InstallBtn":"&Урнаштырырга","UninstallBtn":"Бе&терергә","CancelBtn":"Баш тарту","CloseBtn":"&Ябарга","BrowseBtn":"К&арарга...","ShowDetailsBtn":"&Тулырак...","ClickNext":"Дәвам итү өчен 'Алга' төймәсенә басыгыз.","ClickInstall":"Программаны урнаштыру өчен 'Урнаштырырга' төймәсенә басыгыз.","ClickUninstall":"Программаны бетерү өчен 'Бетерергә' төймәсенә басыгыз.","Name":"Исем","Completed":"Әзер","LicenseText":"$(^NameDA) урнаштыру алдыннан лицензия килешүе белән танышыгыз. Килешү шартларын кабул итсәгез, 'Кабул итәм' төймәсенә басыгыз.","LicenseTextCB":"$(^NameDA) урнаштыру алдыннан лицензия килешүе белән танышыгыз. Килешү шартларын кабул итсәгез, түбәндә билге куегыз. $_CLICK","LicenseTextRB":"$(^NameDA) урнаштыру алдыннан лицензия килешүе белән танышыгыз. Килешү шартларын кабул итсәгез, түбәндәге вариантлардан беренчесен сайлагыз. $_CLICK","UnLicenseText":"$(^NameDA) урнаштыру алдыннан лицензия килешүе белән танышыгыз. Килешү шартларын кабул итсәгез, 'Кабул итәм' төймәсенә басыгыз.","UnLicenseTextCB":"$(^NameDA) урнаштыру алдыннан лицензия килешүе белән танышыгыз. Килешү шартларын кабул итсәгез, түбәндә билге куегыз. $_CLICK","UnLicenseTextRB":"$(^NameDA) урнаштыру алдыннан лицензия килешүе белән танышыгыз. Килешү шартларын кабул итсәгез, түбәндәге вариантлардан беренчесен сайлагыз. $_CLICK","Custom":"Сайлап кына","ComponentsText":"Программаның урнаштырырга теләгән компонентларын сайлагыз. $_CLICK","ComponentsSubText1":"Урнаштыру төрен сайлагыз:","ComponentsSubText2_NoInstTypes":"Урнаштыру өчен программаның компонентларын сайлагыз:","ComponentsSubText2":"яки урнаштыру өчен өстәмә компонентлар сайлагыз:","UnComponentsText":"Бетерергә теләгән компонентларны сайлагыз. $_CLICK","UnComponentsSubText1":"Бетерү төрен сайлагыз:","UnComponentsSubText2_NoInstTypes":"Бетерү өчен компонентларны сайлагыз:","UnComponentsSubText2":"яки бетерү өчен өстәмә компонентларны сайлагыз:","DirText":"Программа $(^NameDA) программасын күрсәтерлән папкага урнаштырачак. Башка папкага урнаштыру өчен, 'Карарга' төймәсенә басыгыз һәм урын күрсәтегез. $_CLICK","DirSubText":"Урнаштыру папкасы","DirBrowseText":"$(^NameDA) урнаштыру өчен папка сайлагыз:","UnDirText":"Программа $(^NameDA) программасын күрсәтелгән папкадан бетерәчәк. Башка папкадан бетерү өчен, 'Карарга' төймәсенә басыгыз һәм урын күрсәтегез. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"$(^NameDA) бетерергә кирәк булган папканы күрсәтегез:","SpaceAvailable":"\"Дискта буш урын: \"","SpaceRequired":"\"Дискта кирәк урын: \"","UninstallingText":"$(^NameDA) программасы санагыгыздан бетереләчәк. $_CLICK","UninstallingSubText":"Моннан бетерү:","FileError":"Яздыру өчен файлны ачып булмый: \\r\\n\\t\"$0\"\\r\\n'Туктату': урнаштыруны туктатырга;\\r\\n\"Кабатлау\": омтылышны кабатларга;\\r\\n\"Калдыру\": бу гамәлне төшереп калдырырга.","FileError_NoIgnore":"Яздыру өчен файлны ачып булмый: \\r\\n\\t\"$0\"\\r\\n'Кабатлау': омтылышны кабатларга;\\r\\n'Баш тарту': урнаштыру барышын туктатырга.","CantWrite":"\"Яздырып булмый: \"","CopyFailed":"Күчермә ясауда хата","CopyTo":"\"Монда күчермәләү: \"","Registering":"\"Теркәлү: \"","Unregistering":"\"Теркәүдән баш тарту: \"","SymbolNotFound":"\"Символны табып булмый: \"","CouldNotLoad":"\"Йөкләп булмый: \"","CreateFolder":"\"Папка ясау: \"","CreateShortcut":"\"Сылтама ясау: \"","CreatedUninstaller":"\"Бетерү программасын ясау: \"","Delete":"\"Файлны бетерү: \"","DeleteOnReboot":"\"Санак сүндереп кабызылганда бетерү: \"","ErrorCreatingShortcut":"\"Сылтама ясауда хата: \" ","ErrorCreating":"\"Ясауда хата: \"","ErrorDecompressing":"Мәгълүматларны чыгаруда хата! Урнаштыручы бозык булуы мөмкин.","ErrorRegistering":"DLL теркәүдә хата","ExecShell":"\"Тышча командасын башкару: \" ","Exec":"\"Башкару: \"","Extract":"\"Чыгару: \"","ErrorWriting":"\"Чыгару: файл яздыруда хата \"","InvalidOpcode":"Урнаштыручы бозылган: мөмкин булмаган код","NoOLE":"\"OLE моның өчен юк: \" ","OutputFolder":"\"Урнаштыру папкасы: \"","RemoveFolder":"\"Папканы бетерү: \"","RenameOnReboot":"\"Санак сүндереп кабызылганда исемен үзгәртү: \"","Rename":"\"Исемен үзгәртү: \"","Skipped":"\"Калдыру: \"","CopyDetails":"Мәгълүматларны алмашыну буферына күчермәләргә","LogInstall":"Урнаштыру хисабын алып барырга","Byte":"б","Kilo":" К","Mega":" М","Giga":" Г"}};

/***/ }),
/* 129 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1054,"font":{"name":null,"size":null},"codepage":874,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) ติดตั้ง","UninstallCaption":"$(^Name) ยกเลิกการติดตั้ง","LicenseSubCaption":": ข้อตกลงเรื่องลิขสิทธิ์","ComponentsSubCaption":": ตัวเลือกการติดตั้ง","DirSubCaption":": แฟ้มที่ติดตั้ง","InstallingSubCaption":": กำลังติดตั้ง","CompletedSubCaption":": เสร็จสิ้น","UnComponentsSubCaption":": ตัวเลือกยกเลิกการติดตั้ง","UnDirSubCaption":": แฟ้มที่ยกเลิกการติดตั้ง","ConfirmSubCaption":": ยืนยัน","UninstallingSubCaption":": กำลังยกเลิกการติดตั้ง","UnCompletedSubCaption":": เสร็จสิ้น","BackBtn":"< &กลับไป","NextBtn":"&ต่อไป >","AgreeBtn":"&ตกลง","AcceptBtn":"&ตกลงยอมรับข้อต่างๆในหัวข้อลิขสิทธิ์ ","DontAcceptBtn":"&ไม่ยอมรับข้อต่างๆในหัวข้อลิขสิทธิ์","InstallBtn":"&ติดตั้ง","UninstallBtn":"&ยกเลิกการติดตั้ง","CancelBtn":"ยกเลิก","CloseBtn":"&ปิด","BrowseBtn":"เ&รียกดู...","ShowDetailsBtn":"&รายละเอียด","ClickNext":"กด ต่อไป เพื่อเริ่มระบบอัติโนมัติ","ClickInstall":"กด  ติดตั้ง เพื่อทำการติดตั้ง","ClickUninstall":"กด  ยกเลิกการติดตั้ง เพื่อยกเลิกการติดตั้ง","Name":"ชื่อ","Completed":"เสร็จสิ้นแล้ว","LicenseText":"โปรดอ่านทวนเรื่องการยอมรับในลิขสิทธิ์ก่อนที่คุณจะทำการติดตั้ง $(^NameDA). ถ้าคุณยอมรับข้อตกลงในทุกๆด้าน, กด ฉันยอมรับ","LicenseTextCB":"โปรดอ่านทวนเรื่องการยอมรับในลิขสิทธิ์ก่อนที่คุณจะทำการติดตั้ง $(^NameDA). ถ้าคุณยอมรับข้อตกลงในทุกๆด้าน, กดเลือกที่กล่องด้านล่าง. $_CLICK","LicenseTextRB":"โปรดอ่านทวนเรื่องการยอมรับในลิขสิทธิ์ก่อนที่คุณจะทำการติดตั้ง $(^NameDA). ถ้าคุณยอมรับข้อตกลงในทุกๆด้าน, เลือกตัวเลือกแรกข้างล่าง. $_CLICK","UnLicenseText":"โปรดอ่านทวนเรื่องการยอมรับในลิขสิทธิ์ก่อนที่คุณจะทำการยกเลิกติดตั้ง $(^NameDA). ถ้าคุณยอมรับข้อตกลงในทุกๆด้าน, กด ฉันยอมรับ","UnLicenseTextCB":"โปรดอ่านทวนเรื่องการยอมรับในลิขสิทธิ์ก่อนที่คุณจะทำการยกเลิกติดตั้ง $(^NameDA). ถ้าคุณยอมรับข้อตกลงในทุกๆด้าน, กดเลือกที่กล่องด้านล่าง. $_CLICK","UnLicenseTextRB":"โปรดอ่านทวนเรื่องการยอมรับในลิขสิทธิ์ก่อนที่คุณจะทำการยกเลิกติดตั้ง $(^NameDA). ถ้าคุณยอมรับข้อตกลงในทุกๆด้าน, เลือกตัวเลือกแรกข้างล่าง. $_CLICK","Custom":"กำหนดเอง","ComponentsText":"เลื่อกสิ่งที่คุณต้องการติดตั้งและไม่เลือกสิ่งที่คุณไม่ต้องการติดตั้ง $_CLICK","ComponentsSubText1":"เลือกวิธีการการติดตั้ง:","ComponentsSubText2_NoInstTypes":"เลือกสิ่งที่คุณต้องการติดตั้ง:","ComponentsSubText2":"หรือ, เลือกตัวเลือกที่คุณต้องการติดตั้ง:","UnComponentsText":"เลือกตัวเลือกที่คุณต้องการจะยกเลิกการติดตั้งและไม่เลือกสิ่งที่คุณไม่ต้องการจะยกเลิกการติดตั้ง $_CLICK","UnComponentsSubText1":"เลือกวิธีการยกเลิกการติดตั้ง:","UnComponentsSubText2_NoInstTypes":"เลือกตัวเลือกที่ต้องการจะยกเลิกการติดตั้ง:","UnComponentsSubText2":"หรือ, เลือกจากตัวเลือกอื่นๆที่คุณต้องการจะยกเลิกการติดตั้ง:","DirText":"ตัวติดตั้งจะทำการติดตั้ง $(^NameDA) ลงในแฟ้มดังต่อไปนี้, ถ้าต้องการติดตั้งลงในแฟ้มอื่น, กด เรียกดูและเลือกแฟ้มอื่น $_CLICK","DirSubText":"แฟ้มที่ต้องการติดตั้ง","DirBrowseText":"เลือกแฟ้มที่ต้องการติดตั้ง $(^NameDA) ใน:","UnDirText":"ตัวติดตั้งจะทำการยกเลิกการติดตั้ง $(^NameDA) จากแฟ้มดังต่อไปนี้, ถ้าต้องการยกเลิกการติดตั้งจากแฟ้มอื่น, กด เรียกดู และเลือกแฟ้มอื่น $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"เลือกแฟ้มที่ต้องการยกเลิกการติดตั้ง $(^NameDA) จาก:","SpaceAvailable":"\"มีพื้นที่เหลือ: \"","SpaceRequired":"\"ต้องการพื้นที่: \"","UninstallingText":"$(^NameDA) จะถูกยกเลิกการติดตั้งจากแฟ้มต่อไปนี้. $_CLICK","UninstallingSubText":"ยกเลิกการติดตั้งจาก:","FileError":"ไม่สามารถเปิดไฟล์สำหรับเขียนได้: \\r\\n\\r\\n$0\\r\\n\\r\\nกด ยกเลิก เพื่อหยุดการติดตั้ง,\\r\\nลองอีกครั้ง เพื่อลองอีกครั้ง, หรือ\\r\\nเพิกเฉย เพื่อข้ามไฟล์นี้.","FileError_NoIgnore":"ไม่สามารถเปิดไฟล์สำหรับเขียนได้: \\r\\n\\r\\n$0\\r\\n\\r\\nกด ลองอีกครั้ง เพื่อลองอีกครั้ง, หรือ\\r\\nยกเลิกเพื่อหยุดการติดตั้ง","CantWrite":"\"ไม่สามารถเขียน: \"","CopyFailed":"คัดลอกผิดพลาด","CopyTo":"\"คัดลอกไปยัง \"","Registering":"\"กำลังลงทะเบียน: \"","Unregistering":"\"ยกเลิกการลงทะเบียน: \"","SymbolNotFound":"\"ไม่สามารถหาสัญลักษณ์ได้: \"","CouldNotLoad":"\"ไม่สามารถโหลดได้: \"","CreateFolder":"\"สร้างแฟ้ม: \"","CreateShortcut":"\"สร้างชอร์ตคัท: \"","CreatedUninstaller":"\"สร้างตัวยกเลิกการติดตั้ง: \"","Delete":"\"ลบไฟล์: \"","DeleteOnReboot":"\"ลบตอนรีบูท: \"","ErrorCreatingShortcut":"\"มีปัญหาสร้างไฟล์ชอร์ตคัท: \"","ErrorCreating":"\"มีปัญหาในการสร้างไฟล์: \"","ErrorDecompressing":"มีปัญหาในการคลายข้อมูล! เกิดข้อผิดพลาดจากตัวติดตั้ง?","ErrorRegistering":"มีปัญหาในการลงทะเบียน DLL","ExecShell":"\"รันเชลล์ไฟล์: \"","Exec":"\"รันไฟล์: \"","Extract":"\"แตกไฟล์: \"","ErrorWriting":"\"แตกไฟล์: เกิดปัญหาในการเขียนไฟล์\"","InvalidOpcode":"ตัวติดตั้งมีปัญหา: รหัส opcode ผิดพลาด","NoOLE":"\"ไม่มี OLE สำหรับ: \"","OutputFolder":"\"แฟ้มทีติดตั้ง: \"","RemoveFolder":"\"ลบแฟ้ม: \"","RenameOnReboot":"\"เปลี่ยนชื่อตอนรีบูท: \"","Rename":"\"เปลี่ยนชื่อ: \"","Skipped":"\"ข้าม: \"","CopyDetails":"คัดลอกรายละเอียดลงคลิปบอร์ด","LogInstall":"บันทึกการติดตั้ง","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 130 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1028,"font":{"name":"新細明體","size":9},"codepage":950,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) 安裝","UninstallCaption":"$(^Name) 解除安裝","LicenseSubCaption":": 授權協議","ComponentsSubCaption":": 安裝選項","DirSubCaption":": 安裝資料夾","InstallingSubCaption":": 正在安裝","CompletedSubCaption":": 已完成","UnComponentsSubCaption":": 解除安裝選項","UnDirSubCaption":": 解除安裝資料夾","ConfirmSubCaption":": 確認","UninstallingSubCaption":": 正在解除安裝","UnCompletedSubCaption":": 完成","BackBtn":"< 上一步(&B)","NextBtn":"下一步(&N) >","AgreeBtn":"我同意(&A)","AcceptBtn":"我接受「授權協議」的條款(&A)","DontAcceptBtn":"我不接受「授權協議」的條款(&D)","InstallBtn":"安裝(&I)","UninstallBtn":"解除安裝(&U)","CancelBtn":"取消","CloseBtn":"關閉(&C)","BrowseBtn":"瀏覽(&R)...","ShowDetailsBtn":"顯示細節(&D)","ClickNext":"按「下一步(N)」繼續。","ClickInstall":"按「安裝(I)」開始安裝。","ClickUninstall":"按「解除安裝(U)」開始解除安裝。","Name":"名稱","Completed":"已完成","LicenseText":"在安裝 $(^NameDA) 之前請檢閱授權協議。如果接受協議所有條款，按「我同意(A)」。","LicenseTextCB":"在安裝 $(^NameDA) 之前請檢閱授權協議。如果接受協議所有條款，按下方的勾選框。 $_CLICK","LicenseTextRB":"在安裝 $(^NameDA) 之前請檢閱授權協議。如果接受協議所有條款，選擇下方的第一個選項。 $_CLICK","UnLicenseText":"在解除安裝 $(^NameDA) 之前請檢閱授權協議。如果接受協議中所有條款，按「我同意(A)」。","UnLicenseTextCB":"在解除安裝 $(^NameDA) 之前請檢閱授權協議。如果接受協議中所有條款，按下方的勾選框。 $_CLICK","UnLicenseTextRB":"在解除安裝 $(^NameDA) 之前請檢閱授權協議。如果接受協議中所有條款，選擇的第一個選項。 $_CLICK","Custom":"自訂","ComponentsText":"勾選想要安裝的元件，並解除勾選不想安裝的元件。 $_CLICK","ComponentsSubText1":"選取安裝的類型: ","ComponentsSubText2_NoInstTypes":"選取安裝的元件: ","ComponentsSubText2":"又或者，自訂選取想安裝的元件: ","UnComponentsText":"勾選想要解除安裝的元件，並解除勾選不想解除安裝的元件。 $_CLICK","UnComponentsSubText1":"選取解除安裝的類型: ","UnComponentsSubText2_NoInstTypes":"選取要解除安裝的元件: ","UnComponentsSubText2":"又或者，選擇想要解除安裝的可選項元件: ","DirText":"安裝程式會將 $(^NameDA) 安裝在以下資料夾。要安裝到不同的資料夾，按「瀏覽(B)...」並選擇其他資料夾。 $_CLICK","DirSubText":"目標資料夾","DirBrowseText":"選取要安裝 $(^NameDA) 的資料夾: ","UnDirText":"安裝程式會自以下資料夾解除安裝 $(^NameDA) 。要解除安裝不同的資料夾，按「瀏覽(B)...」並選擇其他資料夾。 $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"選取要解除安裝 $(^NameDA) 的資料夾: ","SpaceAvailable":"\"可用空間: \"","SpaceRequired":"\"所需空間: \"","UninstallingText":"會自以下資料夾解除安裝 $(^NameDA) 。 $_CLICK","UninstallingSubText":"解除安裝目錄: ","FileError":"無法開啟要寫入的檔案: \\r\\n\\t\"$0\"\\r\\n按「中止」停止安裝，\\r\\n「重試」重新嘗試寫入檔案，或\\r\\n「忽略」略過此檔案。","FileError_NoIgnore":"無法開啟要寫入的檔案: \\r\\n\\t\"$0\"\\r\\n按「重試」重新嘗試寫入檔案，或\\r\\n「取消」停止安裝。","CantWrite":"\"無法寫入: \"","CopyFailed":"\"複製失敗 \"","CopyTo":"\"複製到: \"","Registering":"\"正在註冊: \"","Unregistering":"\"正在解除註冊: \"","SymbolNotFound":"\"無法找到符號: \"","CouldNotLoad":"\"無法載入: \"","CreateFolder":"\"建立資料夾: \" ","CreateShortcut":"\"建立捷徑: \"","CreatedUninstaller":"\"建立解除安裝程式: \"","Delete":"\"刪除檔案: \"","DeleteOnReboot":"\"重新開機後刪除: \"","ErrorCreatingShortcut":"\"建立捷徑時發生錯誤: \"","ErrorCreating":"\"建立時發生錯誤: \"","ErrorDecompressing":"\"解壓縮資料發生錯誤！安裝程式是否已損壞？\"","ErrorRegistering":"\"註冊 DLL 時發生錯誤\"","ExecShell":"\"執行殼層程式: \"","Exec":"\"執行: \"","Extract":"\"抽取: \"","ErrorWriting":"\"抽取: 無法寫入檔案 \"","InvalidOpcode":"\"安裝程式損毀: 無效的作業代碼 \"","NoOLE":"\"沒有 OLE 用於: \"","OutputFolder":"\"輸出資料夾: \"","RemoveFolder":"\"移除資料夾: \"","RenameOnReboot":"\"重新開機後重新命名: \"","Rename":"\"重新命名: \"","Skipped":"\"已略過: \"","CopyDetails":"\"複製細節到剪貼簿 \"","LogInstall":"\"將安裝進程記入日誌\"","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 131 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1055,"font":{"name":null,"size":null},"codepage":1254,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) Kurulumu","UninstallCaption":"$(^Name) Kaldırma","LicenseSubCaption":": Lisans Sözleşmesi","ComponentsSubCaption":": Kurulum Seçenekleri","DirSubCaption":": Kurulum Dizini","InstallingSubCaption":": Kuruluyor","CompletedSubCaption":": Tamamlandı","UnComponentsSubCaption":": Kaldırma Seçenekleri","UnDirSubCaption":": Kaldırılacak Dizin","ConfirmSubCaption":": Onay","UninstallingSubCaption":": Kaldırılıyor","UnCompletedSubCaption":": Tamamlandı","BackBtn":"< &Geri","NextBtn":"İ&leri >","AgreeBtn":"&Kabul Ediyorum","AcceptBtn":"Lisans Sözleşmesi'nin koşullarını &kabul ediyorum","DontAcceptBtn":"Lisans Sözleşmesi'nin koşullarını kabul et&miyorum","InstallBtn":"&Kur","UninstallBtn":"&Kaldır","CancelBtn":"Vazgeç","CloseBtn":"&Kapat","BrowseBtn":"&Gözat...","ShowDetailsBtn":"&Ayrıntıları göster","ClickNext":"Devam etmek için İleri düğmesine basın.","ClickInstall":"Kurulumu başlatmak için Kur düğmesine basın.","ClickUninstall":"Kaldırmayı başlatmak için Kaldır düğmesine basın.","Name":"Ad","Completed":"Tamamlandı","LicenseText":"Lütfen $(^NameDA) uygulamasını kurmadan önce lisans sözleşmesini gözden geçirin. Sözleşmedeki bütün koşulları kabul ediyorsanız Kabul Ediyorum düğmesine basın.","LicenseTextCB":"Lütfen $(^NameDA) uygulamasını kurmadan önce lisans sözleşmesini gözden geçirin. Sözleşmedeki bütün koşulları kabul ediyorsanız aşağıdaki kutuya işaret koyun. $_CLICK","LicenseTextRB":"Lütfen $(^NameDA) uygulamasını kurmadan önce lisans sözleşmesini gözden geçirin. Sözleşmedeki bütün koşulları kabul ediyorsanız aşağıdaki ilk seçeneği seçin. $_CLICK","UnLicenseText":"Lütfen $(^NameDA) uygulamasını kaldırmadan önce lisans sözleşmesini gözden geçirin. Sözleşmedeki bütün koşulları kabul ediyorsanız Kabul Ediyorum düğmesine basın.","UnLicenseTextCB":"Lütfen $(^NameDA) uygulamasını kaldırmadan önce lisans sözleşmesini gözden geçirin. Sözleşmedeki bütün koşulları kabul ediyorsanız aşağıdaki kutuya işaret koyun. $_CLICK","UnLicenseTextRB":"Lütfen $(^NameDA) uygulamasını kaldırmadan önce lisans sözleşmesini gözden geçirin. Sözleşmedeki bütün koşulları kabul ediyorsanız aşağıdaki ilk seçeneği seçin. $_CLICK","Custom":"Özel","ComponentsText":"Kurmak istediğiniz bileşenleri işaretleyip kurmak istemediklerinizi işaretlemeden bırakın. $_CLICK","ComponentsSubText1":"Kurulum türünü seçin:","ComponentsSubText2_NoInstTypes":"Kurulacak bileşenleri seçin:","ComponentsSubText2":"ya da isteğe bağlı olarak kurmak istediğiniz bileşenleri seçin:","UnComponentsText":"Kaldırmak istediğiniz bileşenleri işaretleyip kaldırmak istemediklerinizi işaretlemeden bırakın. $_CLICK","UnComponentsSubText1":"Kaldırma türünü seçin:","UnComponentsSubText2_NoInstTypes":"Kaldırılacak bileşenleri seçin:","UnComponentsSubText2":"ya da isteğe bağlı olarak kaldırmak istediğiniz bileşenleri seçin:","DirText":"$(^NameDA) aşağıdaki dizinde kurulacak. Farklı bir dizinde kurmak için Gözat düğmesine basıp başka bir dizin seçin. $_CLICK","DirSubText":"Hedef Dizin","DirBrowseText":"$(^NameDA) uygulamasının kurulacağı dizini seçin:","UnDirText":"$(^NameDA) aşağıdaki dizinden kaldırılacak. Farklı bir dizinden kaldırmak için Gözat düğmesine basıp başka bir dizin seçin. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"$(^NameDA) uygulamasının kaldırılacağı dizini seçin:","SpaceAvailable":"\"Kullanılabilir boş alan: \"","SpaceRequired":"\"Gereken boş alan: \"","UninstallingText":"$(^NameDA) aşağıdaki dizinden kaldırılacak. $_CLICK","UninstallingSubText":"Kaldırılan yer:","FileError":"Dosya yazmak için açılırken hata meydana geldi: \\r\\n\\r\\n$0\\r\\n\\r\\nKurulumu durdurmak için Dur düğmesine,\\r\\nyeniden denemek için Yeniden Dene düğmesine,\\r\\nbu dosyayı atlamak için Yoksay düğmesine basın.","FileError_NoIgnore":"Dosya yazmak için açılırken hata meydana geldi: \\r\\n\\r\\n$0\\r\\n\\r\\nYeniden denemek için Yeniden Dene düğmesine,\\r\\nkurulumu durdurmak için Vazgeç düğmesine basın.","CantWrite":"\"Yazılamadı: \"","CopyFailed":"Kopyalama başarısız oldu","CopyTo":"\"Kayıt: \"","Registering":"\"Kaydediliyor: \"","Unregistering":"\"Kayıt siliniyor: \"","SymbolNotFound":"\"Simge bulunamadı: \"","CouldNotLoad":"\"Yüklenemedi: \"","CreateFolder":"\"Dizin oluştur: \"","CreateShortcut":"\"Kısayol oluştur: \"","CreatedUninstaller":"\"Kaldırma uygulaması oluştur: \"","Delete":"\"Dosya sil: \"","DeleteOnReboot":"\"Açılışta sil: \"","ErrorCreatingShortcut":"\"Kısayol oluşturulurken hata meydana geldi: \"","ErrorCreating":"\"Oluşturma hatası: \"","ErrorDecompressing":"Veriyi açarken hata meydana geldi! Acaba kurulum uygulaması mı bozuk?","ErrorRegistering":"DLL kaydedilirken hata meydana geldi","ExecShell":"\"ExecShell: \"","Exec":"\"Çalıştır: \"","Extract":"\"Aç: \"","ErrorWriting":"\"Açma: Dosyaya yazarken hata meydana geldi \"","InvalidOpcode":"Kurulum bozuk: Geçersiz kod","NoOLE":"\"OLE yok: \"","OutputFolder":"\"Çıktı dizini: \"","RemoveFolder":"\"Dizini sil: \"","RenameOnReboot":"\"Açılışta adını değiştir: \"","Rename":"\"Ad değiştir: \"","Skipped":"\"Atlandı: \"","CopyDetails":"Ayrıntıları panoya kopyala","LogInstall":"Kurulum sürecinin kaydını tut","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 132 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1058,"font":{"name":null,"size":null},"codepage":1251,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"$(^Name) Встановлення","UninstallCaption":"$(^Name) Видалення","LicenseSubCaption":": Ліцензійна угода","ComponentsSubCaption":": Опції встановлення","DirSubCaption":": Тека встановлення","InstallingSubCaption":": Копіювання файлів","CompletedSubCaption":": Завершено","UnComponentsSubCaption":": Опції видалення","UnDirSubCaption":": Тека видалення","ConfirmSubCaption":": Підтверждення","UninstallingSubCaption":": Видалення файлів","UnCompletedSubCaption":": Завершено","BackBtn":"< &Назад","NextBtn":"&Далі >","AgreeBtn":"&Згоден","AcceptBtn":"Я &приймаю умови Ліцензійної угоди","DontAcceptBtn":"Я &не приймаю умови Ліцензійної угоди","InstallBtn":"&Встановити","UninstallBtn":"Видалити","CancelBtn":"Скасувати","CloseBtn":"&Закрити","BrowseBtn":"О&гляд...","ShowDetailsBtn":"Подробиці","ClickNext":"Натисніть Далі щоб продовжити","ClickInstall":"Натисніть Встановити для початку процессу встановлення","ClickUninstall":"Натисніть Видалить для початку процессу видалення","Name":"Ім'я","Completed":"Завершено","LicenseText":"Прочитайте умови ліцензійної угоди перед встановленням $(^NameDA). Якщо Ви приймаєте умови угоди, натисніть на кнопку Згоден.","LicenseTextCB":"Прочитайте умови ліцензійної угоди перед встановленням $(^NameDA). Якщо Ви приймаєте умови угоди, встановіть відмітку у квадратику нижче. $_CLICK","LicenseTextRB":"Прочитайте умови ліцензійної угоди перед встановленням $(^NameDA). Якщо Ви приймаєте умови угоди, виберіть перший варіант. $_CLICK","UnLicenseText":"Прочитайте умови ліцензійної угоди перед встановленням $(^NameDA). Якщо Ви приймаєте умови ліцензійної угоди, натисніть на кнопку Згоден.","UnLicenseTextCB":"Прочитайте умови ліцензійної угоди перед встановленням $(^NameDA). Якщо Ви приймаєте умови угоди, встановіть відмітку у квадратику нижче. $_CLICK","UnLicenseTextRB":"Прочитайте умови ліцензійної угоди перед видаленням $(^NameDA). Якщо Ви приймаєте умови угоди, виберіть перший варіант. $_CLICK","Custom":"По вибору","ComponentsText":"Виберіть які компоненти програми Ви бажаєте встановити. $_CLICK","ComponentsSubText1":"Виберіть тип встановлення:","ComponentsSubText2_NoInstTypes":"Виберіть компоненти для встановлення:","ComponentsSubText2":"Чи, виберіть вручну компоненти, які Ви хочете встановити:","UnComponentsText":"Виберіть які компоненти Ви бажаєте видалити. Відмітьте компоненти для видалення і зніміть відмітку з тих, які Ви видаляти не бажаєте. $_CLICK","UnComponentsSubText1":"Виберіть тип видалення:","UnComponentsSubText2_NoInstTypes":"Вибір компонентів для видалення:","UnComponentsSubText2":"Чи виберіть компоненти програми для видалення по своєму бажанні:","DirText":"Программа встановить $(^NameDA) у вказану теку. Для того, щоб встановити программу в іншу теку, натисніть Огляд і вкажіть потрібну теку. $_CLICK","DirSubText":"Каталог призначення","DirBrowseText":"Виберіть теку для встановлення $(^NameDA):","UnDirText":"Программа встановлення видалить $(^NameDA) із вказанної теки. Для того, щоб провести видалення з іншої теки, натисніть Огляд і вкажіть потрібну теку. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Виберіть теку, з якої Ви бажаєте видалити $(^NameDA):","SpaceAvailable":"\"Доступно місця: \"","SpaceRequired":"\"Необхідно місця: \"","UninstallingText":"$(^NameDA) буде видаленно з вказаного каталогу. $_CLICK","UninstallingSubText":"Видалення з:","FileError":"Неможливо відкрити файл для запису: \\r\\n\\t\"$0\"\\r\\nНатисніть Перервати для того, щоб перервати встановлення,\\r\\nПовторити для того, щоб повторити спробу запису у файл, чи\\r\\nІгнорувати для того, щоб пропустити цю дію","FileError_NoIgnore":"Неможливо відкрити файл для запису: \\r\\n\\t\"$0\"\\r\\nНатисніть Повторити для того, щоб повторити спробу запису у файл, чи\\r\\nСкасувати для того, щоб перервати встановлення","CantWrite":"\"Неможливо записати: \"","CopyFailed":"Не вдалося копіювати","CopyTo":"\"Копіювання в \"","Registering":"\"Реєстрація: \"","Unregistering":"\"Видалення реєстрації: \"","SymbolNotFound":"\"Неможливо знайти символ: \"","CouldNotLoad":"\"Неможливо завантажити: \"","CreateFolder":"\"Створення теки: \"","CreateShortcut":"\"Створення ярлика: \"","CreatedUninstaller":"\"Створення програми видалення: \"","Delete":"\"Видалення файлу: \"","DeleteOnReboot":"\"Видалення після перезавантаження: \"","ErrorCreatingShortcut":"\"Помилка створення ярлика: \"","ErrorCreating":"\"Помилка створення: \"","ErrorDecompressing":"Неможливо витягнути дані. Можливо пошкоджений дистрибутив.","ErrorRegistering":"Неможливо зареєструвати бібліотеку (DLL)","ExecShell":"\"Виконання команди оболонки: \"","Exec":"\"Виконання: \"","Extract":"\"Витягнення: \"","ErrorWriting":"\"Витягнення: помилка запису файла\"","InvalidOpcode":"Дистрибутив пошкоджений: помилковий код відповіді","NoOLE":"\"Немає OLE для: \"","OutputFolder":"\"Тека призначення: \"","RemoveFolder":"\"Видалення теки: \"","RenameOnReboot":"\"Переіменування після перезаванаження: \"","Rename":"\"Перейменування: \"","Skipped":"\"Пропущено: \"","CopyDetails":"Копіювати деталі у буфер обміну","LogInstall":"Записувати в лог процес встновлення","Byte":"б","Kilo":" К","Mega":" М","Giga":" Г"}};

/***/ }),
/* 133 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1091,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"O'rnatish $(^Name)","UninstallCaption":"O'chirish $(^Name)","LicenseSubCaption":": Lisenzion kelishuv","ComponentsSubCaption":": O'rnatish parametrlari ","DirSubCaption":": O'rnatish papkasi","InstallingSubCaption":": Fayllarni kopiya qilish","CompletedSubCaption":": Operatsiya yakunlandi","UnComponentsSubCaption":": O'chirish parametrlari","UnDirSubCaption":": O'chirsh papkasi","ConfirmSubCaption":": Tasdiqlash","UninstallingSubCaption":": Fayllarni o'chirish","UnCompletedSubCaption":": Operatsiya yakunlandi","BackBtn":"< &Orqaga","NextBtn":"&Oldinga >","AgreeBtn":"&Qabul qilaman","AcceptBtn":"Men &kelishuv shartlarini qabul qilaman","DontAcceptBtn":"Men &kelishuv shartlarini qabul qilmayman","InstallBtn":"&O'rnatish","UninstallBtn":"&O'chirish","CancelBtn":"Bekor qilish","CloseBtn":"&Yopish","BrowseBtn":"&Ko'rish ...","ShowDetailsBtn":"&Äåòàëè...","ClickNext":"Davom etish uchun 'Oldinga'tugmachasini bosing.","ClickInstall":"Dasturni o'rnatish uchun'O'rnatish' tugmachasini bosing.","ClickUninstall":"Dasturni o'chirish uchun 'O'chirsh' tugmachasini bosing.","Name":"Ism","Completed":"Tayor","LicenseText":"$(^NameDA)ni o'rnatishdan oldin lisenzion kelishuv bilan tanishib oling. Kelishuv shartlarini qabul qilsangiz 'Qabul qilaman' tugmachasini bosing.","LicenseTextCB":"$(^NameDA)ni o'rnatishdan oldin lisenzion kelishuv bilan tanishib oling. Kelishuv shartlarini qabul qilsangiz bayroqchani joylashtiring. $_CLICK","LicenseTextRB":"$(^NameDA)ni o'rnatishdan oldin lisenzion kelishuv bilan tanishib oling. Kelishuv shartlarini qabul qilsangiz quyida taklif etilganlardan birinchi variantni tanlang. $_CLICK","UnLicenseText":"$(^NameDA)ni o'rnatishdan oldin lisenzion kelishuv bilan tanishib oling. Kelishuv shartlarini qabul qilsangiz 'Qabul qilaman' tugmachasini bosing.","UnLicenseTextCB":"$(^NameDA)ni o'rnatishdan oldin lisenzion kelishuv bilan tanishib oling. Kelishuv shartlarini qabul qilsangiz bayroqchani joylashtiring. $_CLICK","UnLicenseTextRB":"$(^NameDA)ni o'rnatishdan oldin lisenzion kelishuv bilan tanishib oling. Kelishuv shartlarini qabul qilsangiz quyida taklif etilganlardan birinchi variantni tanlang. $_CLICK","Custom":"Tanlash bo'icha","ComponentsText":"O'rnatish ucun dastur komponentlarini tanlang. $_CLICK","ComponentsSubText1":"O'rnatish jarayonini tanlang:","ComponentsSubText2_NoInstTypes":"O'rnatish uchun dastur komponentlarini tanlang:","ComponentsSubText2":"Yoki o'rnatish uchun qushimcha komponentlarini tanlang:","UnComponentsText":"O'chirish uchun dastur komponentlarini tanlang. $_CLICK","UnComponentsSubText1":"O'chirish jarayonini tanlang:","UnComponentsSubText2_NoInstTypes":"O'chirish uchun dastur komponentlarini tanlang:","UnComponentsSubText2":"Yoki o'chirish uchun qushimcha komponentlarini tanlang:","DirText":"Dastur $(^NameDA)ni ko'rsatilgan papkaga o'rnatadi. Boshqa papkaga o'rnatish uchun, 'Ko'rish'tugmachasini bosing va uni ko'rsatib bering. $_CLICK","DirSubText":"O'rnatish papkasi","DirBrowseText":"O'rnatish papkasini ko'rsating $(^NameDA):","UnDirText":"Dastur $(^NameDA)ni ko'rsatilgan papkadan o'chiradi. Boshqa papkaga o'rnatish uchun, 'Ko'rish'tugmachasini bosing va uni ko'rsatib bering. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"$(^NameDA)ni o'chirish uchun papkani ko'rsating:","SpaceAvailable":"\"Diskda joriy qilingan: \"","SpaceRequired":"\"Diskda talab qilinadigan: \"","UninstallingText":"$(^NameDA) dasturi kompyuterizdan uchiriladi. $_CLICK","UninstallingSubText":"O'chirilish:","FileError":"Yozish uchun faylni ochish imkoniyati yuq: \\r\\n\\t\"$0\"\\r\\n'Tuxtashish': O'rnatishni tuxtatish;\\r\\n\"Takrorlash\":yana bir o'rinib ko'rish;\\r\\n\"Taylab ketish\": shu xarakatni taylab ketish.","FileError_NoIgnore":"Yozish uchun faylni ochish imkoniyati yuq: \\r\\n\\t\"$0\"\\r\\n'Takrorlash': yana bir o'rinib ko'rish;\\r\\n'Bekor qilish': o'rnatish protsessini bekor qilish.","CantWrite":"\"Yozish uchun imkoniyat yuq: \"","CopyFailed":"Kopiya qilganda xato bor","CopyTo":"\"Kopiya qilish \"","Registering":"\"Ro'yxatga olish: \"","Unregistering":"\"Ro'xatdan chiqish: \"","SymbolNotFound":"\"Simvolni topish imkoniyati yuq: \"","CouldNotLoad":"\"Zagruzka qilish imkoniyati yuq: \"","CreateFolder":"\"Papkani yaratish: \"","CreateShortcut":"\"Belgini yaratish: \"","CreatedUninstaller":"\"O'chirish dasturini yaratish: \"","Delete":"\"Faylni o'chirish: \"","DeleteOnReboot":"\"Kompyuter qayta yuklash jaraonida o'chirish: \"","ErrorCreatingShortcut":"\"Belgini yaratish jarayonida xato: \" ","ErrorCreating":"\"Yaratish xatosi: \"","ErrorDecompressing":"Ma'lumotlarni asilga qaytarish xatosi! Distributiv ziyonlangan bulishi mumkin.","ErrorRegistering":"Kutubxonani ro'xatga olish imkoniyati yuq (DLL)","ExecShell":"\"Qoplang'ich komandasini bajarish: \" ","Exec":"\"Bajarish: \"","Extract":"\"Ichidan olish: \"","ErrorWriting":"\"Ichidan olish: fayl yozish xatosi \"","InvalidOpcode":"Distributiv ziyonlangan: ruxsatlanmangan kod","NoOLE":"\"Quydagilarga OLE yuq: \" ","OutputFolder":"\"Papkani o'rnatish: \"","RemoveFolder":"\"Papkani o'chirish: \"","RenameOnReboot":"\"Kompyuter qayta yuklanish jarayonida ismni qaita quyish: \"","Rename":"\"Ismni qayta quyish: \"","Skipped":"\"O'tkazib yuborish: \"","CopyDetails":"Bufer obmenaga ma'lumotlarni kopiya qilish","LogInstall":"O'rnatish xisobotini chiqorish","Byte":"áàéò","Kilo":" Ê","Mega":" Ì","Giga":" Ã"}};

/***/ }),
/* 134 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1066,"font":{"name":null,"size":null},"codepage":1258,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Cài đặt $(^Name)","UninstallCaption":"Gỡ bỏ $(^Name)","LicenseSubCaption":": Thỏa thuận Giấy phép","ComponentsSubCaption":": Tùy chọn Cài đặt","DirSubCaption":": Thư mục Cài đặt","InstallingSubCaption":": Cài đặt","CompletedSubCaption":": Hoàn thành","UnComponentsSubCaption":": Tùy chọn Gỡ bỏ","UnDirSubCaption":": Thư mục Gỡ bỏ","ConfirmSubCaption":": Xác nhận","UninstallingSubCaption":": Gỡ bỏ","UnCompletedSubCaption":": Hoàn thành","BackBtn":"< &Lùi","NextBtn":"&Tiến >","AgreeBtn":"Tô&i đồng ý","AcceptBtn":"Tô&i chấp thuận các điều khoản của Thỏa thuận Giấy phép","DontAcceptBtn":"Tôi &không chấp thuận các điều khoản của Thỏa thuận Giấy phép","InstallBtn":"&Cài đặt","UninstallBtn":"&Gỡ bỏ","CancelBtn":"Hủy bỏ","CloseBtn":"Đón&g","BrowseBtn":"Du&yệt...","ShowDetailsBtn":"&Hiện chi tiết","ClickNext":"Nhấn Tiến để tiếp tục.","ClickInstall":"Nhấn “Cài đặt” để bắt đầu việc cài đặt.","ClickUninstall":"Nhấn “Gỡ bỏ” để bắt đầu việc gỡ bỏ.","Name":"Tên","Completed":"Hoàn thành","LicenseText":"Vui lòng xem xét thỏa thuận giấy phép trước khi cài đặt $(^NameDA). Nếu bạn chấp thuận tất cả các điều khoản của thỏa thuận, hãy nhấn “Tôi đồng ý”.","LicenseTextCB":"Vui lòng xem xét thỏa thuận giấy phép trước khi cài đặt $(^NameDA). Nếu bạn chấp thuận tất cả các điều khoản của thỏa thuận, hãy nhấn ô bên dưới. $_CLICK","LicenseTextRB":"Vui lòng xem xét thỏa thuận giấy phép trước khi cài đặt $(^NameDA). Nếu bạn chấp thuận tất cả các điều khoản của thỏa thuận, hãy chọn ô đầu tiên bên dưới. $_CLICK","UnLicenseText":"Vui lòng xem xét thỏa thuận giấy phép trước khi gỡ bỏ $(^NameDA). Nếu bạn chấp thuận tất cả các điều khoản của thỏa thuận, hãy nhấn “Tôi đồng ý”.","UnLicenseTextCB":"Vui lòng xem xét thỏa thuận giấy phép trước khi gỡ bỏ $(^NameDA). Nếu bạn chấp thuận tất cả các điều khoản của thỏa thuận, hãy nhấn ô bên dưới. $_CLICK","UnLicenseTextRB":"Vui lòng xem xét thỏa thuận giấy phép trước khi gỡ bỏ $(^NameDA). Nếu bạn chấp thuận tất cả các điều khoản của thỏa thuận, hãy chọn ô đầu tiên bên dưới. $_CLICK","Custom":"Tùy biến","ComponentsText":"Chọn thành phần mà bạn muốn cài đặt và không chọn các thành phần mà bạn không muốn cài đặt. $_CLICK","ComponentsSubText1":"Chọn kiểu cài đặt:","ComponentsSubText2_NoInstTypes":"Chọn thành phần để cài đặt:","ComponentsSubText2":"Hoặc, chọn thành phần phụ mà bạn muốn cài đặt:","UnComponentsText":"Chọn thành phần mà bạn muốn gỡ bỏ và không chọn các thành phần mà bạn không muốn gỡ bỏ. $_CLICK","UnComponentsSubText1":"Chọn kiểu gỡ bỏ:","UnComponentsSubText2_NoInstTypes":"Chọn thành phần để gỡ bỏ:","UnComponentsSubText2":"Hoặc, chọn thành phần phụ mà bạn muốn gỡ bỏ:","DirText":"Trình trợ lí sẽ cài đặt $(^NameDA) vào thư mục sau. Để cài đặt vào một thư mục khác, hãy nhấn Duyệt để chọn thư mục. $_CLICK","DirSubText":"Thư mục đích","DirBrowseText":"Chọn thư mục để cài đặt $(^NameDA):","UnDirText":"Trình trợ lí sẽ gỡ bỏ $(^NameDA) khỏi thư mục sau. Để gỡ bỏ khỏi một thư mục khác, hãy nhấn Duyệt để chọn thư mục. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Chọn thư mục để gỡ bỏ $(^NameDA):","SpaceAvailable":"\"Dung lượng hiện có: \"","SpaceRequired":"\"Dung lượng yêu cầu: \"","UninstallingText":"$(^NameDA) sẽ bị gỡ bỏ khỏi thư mục sau. $_CLICK","UninstallingSubText":"Đang gỡ bỏ khỏi:","FileError":"Lỗi khi mở tập tin để ghi: \\r\\n\\r\\n$0\\r\\n\\r\\nNhấn “Hủy bỏ” để ngừng việc cài đặt,\\r\\n“Thử lại” để thử lần nữa, hoặc\\r\\n“Bỏ qua” để bỏ qua tập tin này.","FileError_NoIgnore":"Lỗi khi mở tập tin để ghi: \\r\\n\\r\\n$0\\r\\n\\r\\nNhấn “Thử lại” để thử lần nữa, hoặc\\r\\n“Hủy bỏ” để ngừng việc cài đặt.","CantWrite":"\"Không thể ghi: \"","CopyFailed":"Sao chép bị thất bại","CopyTo":"\"Sao chép vào \"","Registering":"\"Đang đăng kí: \"","Unregistering":"\"Đang hủy đăng kí: \"","SymbolNotFound":"\"Không thể tìm thấy biểu tượng: \"","CouldNotLoad":"\"Không thể nạp: \"","CreateFolder":"\"Tạo thư mục: \"","CreateShortcut":"\"Tạo lối tắt: \"","CreatedUninstaller":"\"Tạo trình gỡ bỏ: \"","Delete":"\"Xóa tập tin: \"","DeleteOnReboot":"\"Xóa khi khởi động lại: \"","ErrorCreatingShortcut":"\"Lỗi khi tạo lối tắt: \"","ErrorCreating":"\"Lỗi khi tạo: \"","ErrorDecompressing":"Lỗi khi giải nén dữ liệu! Có thể trình cài đặt đã bị hỏng?","ErrorRegistering":"Lỗi khi đăng kí DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Thực thi: \"","Extract":"\"Trích xuất: \"","ErrorWriting":"\"Trích xuất: lôi khi ghi vào tập tin \"","InvalidOpcode":"Trình cài đặt bị hỏng: mã tác vụ bất hợp lệ","NoOLE":"\"Không có OLE cho: \"","OutputFolder":"\"Thư mục đầu ra: \"","RemoveFolder":"\"Xóa thư mục: \"","RenameOnReboot":"\"Đổi tên khi khởi động lại: \"","Rename":"\"Đổi tên: \"","Skipped":"\"Đã bỏ qua: \"","CopyDetails":"Sao chép Chi tiết vào Clipboard","LogInstall":"Lưu kí quá trình cài đặt","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 135 */
/***/ (function(module) {

module.exports = {"header":"NLF v6","id":1106,"font":{"name":null,"size":null},"codepage":1252,"rtl":false,"strings":{"Branding":"Nullsoft Install System %s","SetupCaption":"Rhaglen Osod $(^Name)","UninstallCaption":"Rhaglen Dadosod $(^Name)","LicenseSubCaption":": Cytundeb Trwyddedu","ComponentsSubCaption":": Dewisiadau Gosod","DirSubCaption":": Ffolder Gosod","InstallingSubCaption":": Gosod","CompletedSubCaption":": Cwblhawyd","UnComponentsSubCaption":": Dewisiadau Dadosod","UnDirSubCaption":": Ffolder Dadosod","ConfirmSubCaption":": Cadarnhad","UninstallingSubCaption":": Dadosod","UnCompletedSubCaption":": Cwblhawyd","BackBtn":"< &Nôl","NextBtn":"&Nesaf >","AgreeBtn":"&Cytuno","AcceptBtn":"Rwy'n &derbyn Amodau'r Drwydded","DontAcceptBtn":"Rwy'n &gwrthod Amodau'r Drwydded","InstallBtn":"&Gosod","UninstallBtn":"&Dadosod","CancelBtn":"Diddymu","CloseBtn":"C&au","BrowseBtn":"&Pori...","ShowDetailsBtn":"&Dangos manylion","ClickNext":"Cliciwch Nesaf i barhau.","ClickInstall":"Cliciwch Gosod i gychwyn gosod.","ClickUninstall":"Cliciwch Dadosod i gychwyn dadosod.","Name":"Enw","Completed":"Cwblhawyd","LicenseText":"Darllenwch y cytundeb trwyddedu cyn gosod $(^NameDA). Os ydych yn derbyn holl amodau'r cytundeb, cliciwch Cytuno.","LicenseTextCB":"Darllenwch y cytundeb trwyddedu cyn gosod $(^NameDA). Os ydych yn derbyn holl amodau'r cytundeb, cliciwch y blwch ticio isod. $_CLICK","LicenseTextRB":"Darllenwch y cytundeb trwyddedu cyn gosod $(^NameDA). Os ydych yn derbyn holl amodau'r cytundeb, ticiwch y dewis cyntaf isod. $_CLICK","UnLicenseText":"Darllenwch y cytundeb trwyddedu cyn dadosod $(^NameDA). Os ydych yn derbyn holl amodau'r cytundeb, cliciwch Cytuno.","UnLicenseTextCB":"Darllenwch y cytundeb trwyddedu cyn dadosod $(^NameDA). Os ydych yn derbyn holl amodau'r cytundeb, cliciwch y blwch ticio isod. $_CLICK","UnLicenseTextRB":"Darllenwch y cytundeb trwyddedu cyn dadosod $(^NameDA). Os ydych yn derbyn holl amodau'r cytundeb, ticiwch y dewis cyntaf isod. $_CLICK","Custom":"Addasu","ComponentsText":"Ticiwch y cydrannau rydych am eu gosod a dad-dicio'r cydrannau nad ydych am eu gosod. $_CLICK","ComponentsSubText1":"Dewis y math o osod:","ComponentsSubText2_NoInstTypes":"Dewis cydrannau i'w gosod:","ComponentsSubText2":"Neu, ddewis y cydrannau ychwanegol i'w gosod:","UnComponentsText":"Ticiwch y cydrannau rydych am eu dadosod a dad-dicio'r cydrannau nad ydych am eu dadosod. $_CLICK","UnComponentsSubText1":"Dewis y math o ddadosod:","UnComponentsSubText2_NoInstTypes":"Dewis cydrannau i'w dadosod:","UnComponentsSubText2":"Neu, ddewis y cydrannau ychwanegol i'w dadosod:","DirText":"Bydd y Rhaglen Osod yn gosod $(^NameDA) yn y ffolder canlynol. I'w osod mewn ffolder gwahanol, cliciwch Pori a dewis ffolder arall. $_CLICK","DirSubText":"Ffolder Cyrchfan","DirBrowseText":"Dewis y ffolder i osod $(^NameDA) ynddo:","UnDirText":"Bydd y Rhegen Osod yn dadosod $(^NameDA) o'r ffolder canlynol. I ddadosod o ffolder gwahanol, cliciwch Pori a dewis ffolder arall. $_CLICK","UnDirSubText":"\"\"","UnDirBrowseText":"Dewis ffolder i ddadosod $(^NameDA) ohono:","SpaceAvailable":"\"Lle ar gael: \"","SpaceRequired":"\"Lle angenrheidiol: \"","UninstallingText":"Bydd $(^NameDA) yn cael ei ddadosod o'r ffolder canlynol. $_CLICK","UninstallingSubText":"Dadosod o:","FileError":"Gwall agor ffeil i'w hysgrifennu: \\r\\n\\r\\n$0\\r\\n\\r\\nCliciwch Atal i atal y gosod,\\r\\nEto i geisio eto, neu\\r\\nAnwybyddu i hepgor y ffeil.","FileError_NoIgnore":"Gwall agor ffeil i'w hysgrifennu: \\r\\n\\r\\n$0\\r\\n\\r\\nCliciwch Eto i geisio eto, neu\\r\\nDiddymu i atal y gosod.","CantWrite":"\"Methu ysgrifennu: \"","CopyFailed":"Methu Copïo","CopyTo":"\"Copïo i \"","Registering":"\"Cofrestru: \"","Unregistering":"\"Dadgofrestru: \"","SymbolNotFound":"\"Methu canfod symbol: \"","CouldNotLoad":"\"Methu llwytho: \"","CreateFolder":"\"Creu ffolder: \"","CreateShortcut":"\"Creu llwybr byr: \"","CreatedUninstaller":"\"Creu dadosodwr: \"","Delete":"\"Dileu ffeil: \"","DeleteOnReboot":"\"Dileu wrth ailgychwyn: \"","ErrorCreatingShortcut":"\"Gwall wrth greu llwybr byr: \"","ErrorCreating":"\"Gwall wrth greu: \"","ErrorDecompressing":"Gwall wrth ddatgywasgu data! Gosodwr llwgr?","ErrorRegistering":"Gwall cofrestru DLL","ExecShell":"\"ExecShell: \"","Exec":"\"Gweithredu: \"","Extract":"\"Echdynnu: \"","ErrorWriting":"\"Echdynnu: gwall ysgrifennu i ffeil \"","InvalidOpcode":"Gosodwr llwgr: opcode annilys","NoOLE":"\"Dim OLE ar gyfer: \"","OutputFolder":"\"Ffolder allbwn: \"","RemoveFolder":"\"Tynnu ffolder: \"","RenameOnReboot":"\"Ailenwi wrth ailgychwyn: \"","Rename":"\"Ailenwi: \"","Skipped":"\"Hepgor: \"","CopyDetails":"Copïo Manylion i'r Clipfwrdd","LogInstall":"Cofnodi'r brosed gosod","Byte":"B","Kilo":" K","Mega":" M","Giga":" G"}};

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var NLF, NSISLanguageFile;

NLF = __webpack_require__(137);

module.exports = NSISLanguageFile = {
  convert: function() {
    var editor;
    editor = atom.workspace.getActiveTextEditor();
    if (editor == null) {
      return atom.beep();
    }
    if (editor.getGrammar().scopeName === "source.nlf") {
      return this.convertNLF(editor);
    } else if (editor.getGrammar().scopeName === "source.json") {
      return this.convertJSON(editor);
    } else {
      return atom.beep();
    }
  },
  convertNLF: function(editor) {
    var e, input, output;
    try {
      input = editor.getText();
      output = NLF.parse(input, {
        stringify: true
      });
    } catch (error1) {
      e = error1;
      console.error(e);
      return atom.notifications.addError("Conversion Failed", {
        detail: e,
        dismissable: true
      });
    }
    return this.openNewFile(editor, output, "json");
  },
  convertJSON: function(editor) {
    var e, input, output;
    try {
      input = editor.getText();
      output = NLF.stringify(input);
    } catch (error1) {
      e = error1;
      console.error(e);
      return atom.notifications.addError("Conversion Failed", {
        detail: e,
        dismissable: true
      });
    }
    return this.openNewFile(editor, output, "nlf");
  },
  openNewFile: function(editor, input, targetExt) {
    var basename, extname, fileName, newFileName;
    ({basename, extname} = __webpack_require__(4));
    fileName = editor.getFileName().toString();
    newFileName = basename(fileName, extname(fileName));
    return atom.workspace.open(`${newFileName}.${targetExt}`, {
      pending: true
    }).then(function(newTab) {
      return newTab.setText(input);
    }).catch(function(error) {
      return atom.notifications.addError(error, {
        dismissable: true
      });
    });
  }
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dictionary_js_1 = __webpack_require__(138);
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
        strings: {},
    };
    var strings = {};
    try {
        // remove all comments
        input = input.trim().replace(/^#.*(\r?\n|$)/mg, '');
        // split into lines
        var lines_1 = input.split(/\r?\n/);
        // get NLF version
        var version_1 = lines_1[0].match(/\d+$/)[0] || 6;
        lines_1.forEach(function (line, index) {
            var key = dictionary_js_1.default["v" + version_1][index];
            if (typeof key !== 'undefined' && key.startsWith('^')) {
                // Language String
                key = key.replace('^', '');
                output.strings[key] = lines_1[index];
            }
            else {
                // Meta Data
                switch (key) {
                    case 'id':
                    case 'code_page':
                        output[key] = (lines_1[index] === '-') ? null : parseInt(lines_1[index]);
                        break;
                    case 'font':
                    case 'fontname':
                        output.font.name = (lines_1[index] === '-') ? null : lines_1[index];
                        break;
                    case 'fontsize':
                        output.font.size = (lines_1[index] === '-') ? null : parseInt(lines_1[index]);
                        break;
                    case 'rtl':
                        output[key] = (lines_1[index].toUpperCase() === 'RTL') ? true : false;
                        break;
                    default:
                        if (typeof key !== 'undefined') {
                            output[key] = lines_1[index];
                        }
                        break;
                }
            }
        });
    }
    catch (e) {
        throw e;
    }
    if (options.stringify === true) {
        var indentation = (options.minify === true) ? 0 : 2;
        return JSON.stringify(output, null, indentation);
    }
    return output;
};
exports.parse = parse;
/**
 * Stringifies an NSIS language file object
 * @param input - NLF object
 * @returns - NLF string
 */
var stringify = function (input) {
    var output = '';
    var inputObj;
    // Convert JSON string to object, if necessary
    if (isObject(input) === false) {
        inputObj = JSON.parse(input);
    }
    else {
        inputObj = input;
    }
    // get NLF version
    var version = inputObj.header.match(/\d+$/)[0] || 6;
    try {
        output += "# Header, don't edit\n" + inputObj.header;
        output += "\n# Language ID\n" + inputObj.id;
        if (typeof inputObj.font !== 'undefined' && dictionary_js_1.default["v" + version].includes('fontname')) {
            output += "\n# Font and size - dash (-) means default";
            output += (inputObj.font.name === null) ? '\n-' : "\n" + inputObj.font.name;
            output += (inputObj.font.size === null) ? '\n-' : "\n" + inputObj.font.size;
        }
        if (dictionary_js_1.default["v" + version].includes('code_page')) {
            output += "\n# Codepage - dash (-) means ASCII code page";
            output += (inputObj.code_page === null) ? '\n-' : "\n" + inputObj.code_page;
        }
        if (dictionary_js_1.default["v" + version].includes('rtl')) {
            output += "\n# RTL - anything else than RTL means LTR";
            output += (inputObj.rtl === true) ? '\nRTL' : '\n-';
        }
        for (var key in inputObj.strings) {
            if (inputObj.strings.hasOwnProperty(key) && dictionary_js_1.default["v" + version].includes("^" + key)) {
                output += "\n# ^" + key + "\n" + inputObj.strings[key];
            }
        }
    }
    catch (e) {
        throw e;
    }
    return output;
};
exports.stringify = stringify;
// Helpers
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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


/***/ }),
/* 139 */
/***/ (function(module, exports) {

// atom runner - https://atom.io/packages/atom-runner
var Runner;

module.exports = Runner = {
  runner: null,
  set: function() {
    this.check();
    if ((typeof this.runner.path !== "undefined") && (this.runner.active === true)) {
      return atom.confirm({
        message: "Set default runner for NSIS",
        detailedMessage: "To compile NSIS scripts inside Atom, you need to define a runner. Do you want to use makensis as default runner?",
        buttons: {
          "Use makensis": function() {
            atom.notifications.addSuccess("**language-nsis**: Set `runner.scopes.nsis` to 'makensis -'", {
              dismissable: false
            });
            return atom.config.set("runner.scopes.nsis", "makensis -");
          },
          "Cancel": function() {
            atom.notifications.addWarning("**language-nsis**: Cancelled setting default runner", {
              dismissable: false
            });
          }
        }
      });
    } else {
      return this.notify();
    }
  },
  remove: function() {
    this.check();
    if ((typeof this.runner.path !== "undefined") && (this.runner.active === true)) {
      atom.notifications.addSuccess("**language-nsis**: Unset `runner.scopes.nsis`", {
        dismissable: false
      });
      return atom.config.unset("runner.scopes.nsis");
    } else {
      return this.notify();
    }
  },
  notify: function() {
    return atom.notifications.addWarning("**language-nsis**: [atom-runner](https://atom.io/packages/atom-runner) is not installed", {
      dismissable: false
    });
  },
  check: function() {
    return this.runner = {
      path: atom.packages.resolvePackagePath("atom-runner"),
      active: atom.packages.isPackageLoaded("atom-runner")
    };
  }
};


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map