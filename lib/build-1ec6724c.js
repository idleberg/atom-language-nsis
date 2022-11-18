'use strict';

var main = require('./main-55e1807a.js');
var require$$0$1 = require('fs');
var require$$0 = require('path');
require('child_process');
require('os');
require('atom');

var YAML;
function createBuildFile() {
    var _a, _b;
    return main.__awaiter(this, void 0, void 0, function () {
        var editor, script, isHeaderFile, processHeaders, notification_1, currentFilePath, notification_2, scriptFile, currentPath, buildFileSyntax, buildFileName, buildFilePath, fileExists, fileExistsNotification_1;
        return main.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    editor = atom.workspace.getActiveTextEditor();
                    if (!editor) {
                        atom.notifications.addWarning("No active editor", {
                            dismissable: false
                        });
                        return [2 /*return*/];
                    }
                    else if (editor.getGrammar().scopeName !== 'source.nsis') {
                        atom.notifications.addWarning("Unsupported document type", {
                            dismissable: false
                        });
                        return [2 /*return*/];
                    }
                    script = editor.getPath();
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./main-55e1807a.js'); }).then(function (n) { return n.util; })];
                case 1:
                    isHeaderFile = (_c.sent()).isHeaderFile;
                    if (isHeaderFile(script)) {
                        processHeaders = String(main.Config.get('processHeaders'));
                        if (processHeaders === 'Disallow') {
                            notification_1 = atom.notifications.addWarning('Creating build-files for headers is blocked by default. You can allow this in the package settings, or mute this warning.', {
                                dismissable: true,
                                buttons: [
                                    {
                                        text: 'Open Settings',
                                        className: 'icon icon-gear',
                                        onDidClick: function () {
                                            return main.__awaiter(this, void 0, void 0, function () {
                                                return main.__generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            notification_1.dismiss();
                                                            return [4 /*yield*/, atom.workspace.open("atom://config/packages/language-nsis", {
                                                                    pending: true,
                                                                    searchAllPanes: true
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
                    currentFilePath = ((_b = (_a = atom.workspace) === null || _a === void 0 ? void 0 : _a.getActiveTextEditor()) === null || _b === void 0 ? void 0 : _b.getPath()) || null;
                    if (!currentFilePath) {
                        notification_2 = atom.notifications.addWarning('File not saved', {
                            dismissable: true,
                            detail: 'You need to save this file manually before you can create a build-file',
                            buttons: [
                                {
                                    text: 'OK',
                                    onDidClick: function () {
                                        notification_2.dismiss();
                                    }
                                }
                            ]
                        });
                        return [2 /*return*/];
                    }
                    scriptFile = require$$0.basename(currentFilePath);
                    currentPath = require$$0.dirname(currentFilePath);
                    buildFileSyntax = String(main.Config.get('buildFileSyntax'));
                    buildFileName = ".atom-build.".concat(buildFileSyntax.toLowerCase());
                    buildFilePath = require$$0.join(currentPath, buildFileName);
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./main-55e1807a.js'); }).then(function (n) { return n.util; })];
                case 2:
                    fileExists = (_c.sent()).fileExists;
                    return [4 /*yield*/, fileExists(buildFilePath)];
                case 3:
                    if (_c.sent()) {
                        fileExistsNotification_1 = atom.notifications.addWarning('File exists', {
                            dismissable: true,
                            detail: 'Do you really want to overwrite your existing build file?',
                            buttons: [
                                {
                                    text: 'Overwrite',
                                    onDidClick: function () {
                                        return main.__awaiter(this, void 0, void 0, function () {
                                            return main.__generator(this, function (_a) {
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
                    else {
                        saveBuildFile({
                            script: scriptFile,
                            syntax: buildFileSyntax,
                            fileName: buildFileName,
                            filePath: buildFilePath
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function saveBuildFile(options) {
    return main.__awaiter(this, void 0, void 0, function () {
        var _a, findPackagePath, getMakensisPath, isLoadedAndActive, useWineToRun, hasWineProvider, wineProviderPath, args, verbosity, strictMode, buildFile, _b, stringifier, error_1;
        var _c;
        return main.__generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./main-55e1807a.js'); }).then(function (n) { return n.util; })];
                case 1:
                    _a = _d.sent(), findPackagePath = _a.findPackagePath, getMakensisPath = _a.getMakensisPath, isLoadedAndActive = _a.isLoadedAndActive;
                    useWineToRun = main.Config.get('useWineToRun');
                    hasWineProvider = isLoadedAndActive('build-makensis-wine');
                    return [4 /*yield*/, findPackagePath('build-makensis-wine')];
                case 2:
                    wineProviderPath = (_d.sent())[0];
                    args = [];
                    verbosity = parseInt(String(main.Config.get('compilerOptions.verbosity')), 10);
                    if (verbosity)
                        args.push("-V".concat(verbosity));
                    strictMode = main.Config.get('compilerOptions.strictMode');
                    if (strictMode)
                        args.push('-WX');
                    _c = {
                        name: options.scriptFile
                    };
                    if (!(useWineToRun && hasWineProvider)) return [3 /*break*/, 3];
                    _b = require$$0.resolve(wineProviderPath, 'lib', 'makensis-wine.sh');
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, getMakensisPath()];
                case 4:
                    _b = _d.sent();
                    _d.label = 5;
                case 5:
                    buildFile = (_c.cmd = _b,
                        _c.sh = useWineToRun && hasWineProvider,
                        _c.args = main.__spreadArray(main.__spreadArray([], args, true), ['{FILE_ACTIVE}'], false),
                        _c.cwd = '{FILE_ACTIVE_PATH}',
                        _c.errorMatch = '(\\r?\\n)(?<message>.+)(\\r?\\n)Error in script "(?<file>[^"]+)" on line (?<line>\\d+) -- aborting creation process',
                        _c.warningMatch = '[^!]warning: (?<message>.*) \\((?<file>(\\w{1}:)?[^:]+):(?<line>\\d+)\\)',
                        _c);
                    if (!(options.syntax === 'yaml')) return [3 /*break*/, 7];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./index-de228abb.js'); })];
                case 6:
                    YAML = _d.sent();
                    _d.label = 7;
                case 7:
                    stringifier = options.syntax === 'yaml'
                        ? YAML.stringify(buildFile)
                        : JSON.stringify(buildFile, null, 2);
                    _d.label = 8;
                case 8:
                    _d.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, require$$0$1.promises.writeFile(options.filePath, stringifier, 'utf-8')];
                case 9:
                    _d.sent();
                    return [3 /*break*/, 11];
                case 10:
                    error_1 = _d.sent();
                    console.log(error_1);
                    atom.notifications.addError("Failed to write ".concat(options.fileName), {
                        detail: error_1,
                        dismissable: false
                    });
                    return [2 /*return*/];
                case 11: return [4 /*yield*/, atom.workspace.open(options.filePath)];
                case 12:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    });
}

exports.createBuildFile = createBuildFile;
//# sourceMappingURL=build-1ec6724c.js.map
