'use strict';

var main = require('./main-55e1807a.js');
require('path');
require('fs');
require('child_process');
require('os');
require('atom');

function compilerOutputHandler(data) {
    var logLevel = data['hasWarning']
        ? 'warn'
        : 'log';
    try {
        if (main.Config.get('alwaysShowOutput')) {
            main.ConsolePanel.show();
            main.ConsolePanel[logLevel](data['line']);
        }
    }
    catch (error) {
        console[logLevel](data['line']);
    }
}
function compilerErrorHandler(data) {
    try {
        main.ConsolePanel.error(data['line']);
    }
    catch (error) {
        console.error(data['line']);
    }
}
function compilerExitHandler(data) {
    return main.__awaiter(this, void 0, void 0, function () {
        var notifyOnCompletion;
        return main.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!main.Config.get('showBuildNotifications')) return [3 /*break*/, 3];
                    if (!(data['status'] === 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./main-55e1807a.js'); }).then(function (n) { return n.util; })];
                case 1:
                    notifyOnCompletion = (_a.sent()).notifyOnCompletion;
                    if (data['warnings']) {
                        notifyOnCompletion({
                            level: 'warning',
                            message: 'Compiled with warnings',
                            outFile: data['outFile']
                        });
                    }
                    else {
                        notifyOnCompletion({
                            level: 'success',
                            message: 'Compiled successfully',
                            outFile: data['outFile']
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    atom.notifications.addError('Compile Error', { dismissable: false });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function flagsHandler(data) {
    var output = data['stdout'] || data['stderr'];
    if (String(main.Config.get('compilerOutput')).toLowerCase() === 'console') {
        try {
            main.ConsolePanel.show();
            main.ConsolePanel.log(JSON.stringify(output, null, 2));
        }
        catch (error) {
            console.info(output);
            atom.openDevTools();
        }
    }
    else {
        atom.notifications.addInfo("Compiler Flags", {
            detail: JSON.stringify(output, null, 2),
            dismissable: true
        });
    }
}
function versionHandler(data, pathToMakensis) {
    if (String(main.Config.get('compilerOutput')).toLowerCase() === 'console') {
        try {
            main.ConsolePanel.show();
            main.ConsolePanel.log("makensis ".concat(data['line'], " (").concat(pathToMakensis, ")"));
        }
        catch (error) {
            console.info("makensis ".concat(data['line'], " (").concat(pathToMakensis, ")"));
            atom.openDevTools();
        }
    }
    else {
        atom.notifications.addInfo("NSIS Version", {
            detail: "makensis ".concat(data['line'], " (").concat(pathToMakensis, ")"),
            dismissable: true
        });
    }
}

exports.compilerErrorHandler = compilerErrorHandler;
exports.compilerExitHandler = compilerExitHandler;
exports.compilerOutputHandler = compilerOutputHandler;
exports.flagsHandler = flagsHandler;
exports.versionHandler = versionHandler;
//# sourceMappingURL=handlers-7944bd9e.js.map
