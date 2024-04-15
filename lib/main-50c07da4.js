'use strict';

var require$$1 = require('path');
var require$$0$1 = require('fs');
var require$$1$1 = require('child_process');
var require$$0 = require('os');
var atomSatisfyDependencies = require('atom-satisfy-dependencies');
var atom$1 = require('atom');

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
        return new atom$1.Disposable(function () {
            _this.browse = null;
        });
    },
    reveal: function (target) {
        return __awaiter(this, void 0, Promise, function () {
            var error_1, missingPackageWarning;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = __assign({ pending: true, searchAllPanes: true }, options);
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
        return new atom$1.Disposable(function () {
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
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
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
    return __awaiter(this, void 0, Promise, function () {
        var packageDirPaths;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    packageDirPaths = atom.packages.getPackageDirPaths();
                    return [4 /*yield*/, Promise.all(packageDirPaths.map(function (packageDirPath) { return __awaiter(_this, void 0, void 0, function () {
                            var packageDir;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        packageDir = require$$1.resolve(packageDirPath, packageName);
                                        return [4 /*yield*/, fileExists(require$$1.resolve(packageDir, 'package.json'))];
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
    return __awaiter(this, void 0, Promise, function () {
        var pathToMakensis, which, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pathToMakensis = String(Config.get('compilerOptions.pathToMakensis'));
                    if ((pathToMakensis === null || pathToMakensis === void 0 ? void 0 : pathToMakensis.length) && pathToMakensis !== 'makensis') {
                        return [2 /*return*/, pathToMakensis];
                    }
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./index-60ed1ab7.js'); }).then(function (n) { return n.index; })];
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
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
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
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, atomSatisfyDependencies.satisfyDependencies(name)];
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
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
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
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
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
    return __awaiter(this, void 0, Promise, function () {
        var open;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./index-2203085d.js'); }).then(function (n) { return n.index; })];
                case 1:
                    open = (_a.sent()).default;
                    open("https://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Commands/".concat(nsisCommand, ".html?utm_source=atom&utm_content=reference"));
                    return [2 /*return*/];
            }
        });
    });
}
function runInstaller(outFile) {
    return __awaiter(this, void 0, void 0, function () {
        var execa, pathToWine, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isWindows()) return [3 /*break*/, 1];
                    try {
                        require$$1$1.exec("cmd /c \"".concat(outFile, "\""));
                    }
                    catch (error) {
                        console.error(error);
                    }
                    return [2 /*return*/];
                case 1:
                    if (!Config.get('useWineToRun')) return [3 /*break*/, 6];
                    return [4 /*yield*/, import('execa')];
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
        return new atom$1.Disposable(function () {
            _this.busySignal = null;
        });
    },
    add: function (message) {
        return __awaiter(this, void 0, Promise, function () {
            var missingPackageWarning;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, Promise, function () {
            var missingPackageWarning;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, Promise, function () {
            var missingPackageWarning;
            return __generator(this, function (_a) {
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
    return __awaiter(this, void 0, Promise, function () {
        var editor, script, scope, isHeaderFile, processHeaders, notification_1, error_1, _a, clearConsole, getMakensisPath, getSpawnEnv, isLoadedAndActive, NSIS, _b, compilerOutput, compilerError, compilerClose, verbosity, _c, _d, _e;
        var _f;
        return __generator(this, function (_g) {
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
                                            return __awaiter(this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
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
                    return [4 /*yield*/, BusySignal.add("Compiling ".concat(require$$1.basename(script)))];
                case 7:
                    _g.sent();
                    _g.label = 8;
                case 8: return [4 /*yield*/, import('makensis')];
                case 9:
                    NSIS = _g.sent();
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./callbacks-c08ac7ff.js'); })];
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
    return __awaiter(this, void 0, Promise, function () {
        var _a, clearConsole, getMakensisPath, getSpawnEnv, isLoadedAndActive, pathToMakensis, NSIS, versionCallback, _b, _c, _d;
        return __generator(this, function (_e) {
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
                    return [4 /*yield*/, import('makensis')];
                case 5:
                    NSIS = _e.sent();
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./callbacks-c08ac7ff.js'); })];
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
    return __awaiter(this, void 0, Promise, function () {
        var _a, clearConsole, getMakensisPath, getSpawnEnv, isLoadedAndActive, NSIS, flagsCallback, _b, _c, _d;
        var _e;
        return __generator(this, function (_f) {
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
                    return [4 /*yield*/, import('makensis')];
                case 4:
                    NSIS = _f.sent();
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./callbacks-c08ac7ff.js'); })];
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
    return __awaiter(this, void 0, Promise, function () {
        var NSIS, _a, getMakensisPath, getSpawnEnv, output, _b, _c, _d;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, import('makensis')];
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
    return __awaiter(this, void 0, Promise, function () {
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
    return __awaiter(this, void 0, Promise, function () {
        var NLF, output, input;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, import('@nsis/nlf')];
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
    return __awaiter(this, void 0, Promise, function () {
        var NLF, output, input;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, import('@nsis/nlf')];
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
    return __awaiter(this, void 0, Promise, function () {
        var newEditorTab, fileName, newFileName, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileName = editor.getFileName().toString();
                    newFileName = require$$1.basename(fileName, require$$1.extname(fileName));
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
        return __awaiter(this, void 0, Promise, function () {
            var SelectListView;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, import('atom-select-list')];
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
                            didConfirmSelection: function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var openURL;
                                return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, Promise, function () {
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

var main = {
    config: Config.schema,
    subscriptions: new atom$1.CompositeDisposable(),
    activate: function () {
        return __awaiter(this, void 0, Promise, function () {
            var manageDependencies;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        devConsole.log('Activating package');
                        // Register commands
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:command-reference': function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
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
                            'NSIS:compile': function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, compile(false)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:compile-strict': function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, compile(true)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:create-.atom–build-file': function () { return __awaiter(_this, void 0, void 0, function () {
                                var isLoadedAndActive, createBuildFile, missingPackageWarning;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                                        case 1:
                                            isLoadedAndActive = (_a.sent()).isLoadedAndActive;
                                            if (!(isLoadedAndActive('buildium') || isLoadedAndActive('build'))) return [3 /*break*/, 4];
                                            return [4 /*yield*/, Promise.resolve().then(function () { return require('./build-e1a1da19.js'); })];
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
                                    case 0: return [4 /*yield*/, showCompilerFlags()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:show-version': function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, showVersion()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }
                        }));
                        this.subscriptions.add(atom.commands.add('atom-workspace', {
                            'NSIS:open-package-settings': function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
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
                            'NSIS:satisfy-dependencies': function () { return __awaiter(_this, void 0, void 0, function () {
                                var manageDependencies;
                                return __generator(this, function (_a) {
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
                            'NSIS:set-default-runner': function () { return __awaiter(_this, void 0, void 0, function () {
                                var isLoadedAndActive, setRunner, missingPackageWarning;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                                        case 1:
                                            isLoadedAndActive = (_a.sent()).isLoadedAndActive;
                                            if (!isLoadedAndActive('atom-runner')) return [3 /*break*/, 4];
                                            return [4 /*yield*/, Promise.resolve().then(function () { return require('./runner-5d01c92a.js'); })];
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
                            'NSIS:unset-default-runner': function () { return __awaiter(_this, void 0, void 0, function () {
                                var isLoadedAndActive, unsetRunner, missingPackageWarning;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Promise.resolve().then(function () { return util; })];
                                        case 1:
                                            isLoadedAndActive = (_a.sent()).isLoadedAndActive;
                                            if (!isLoadedAndActive('atom-runner')) return [3 /*break*/, 4];
                                            return [4 /*yield*/, Promise.resolve().then(function () { return require('./runner-5d01c92a.js'); })];
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
exports.__awaiter = __awaiter;
exports.__generator = __generator;
exports.__spreadArray = __spreadArray$1;
exports.main = main;
exports.util = util;
//# sourceMappingURL=main-50c07da4.js.map
