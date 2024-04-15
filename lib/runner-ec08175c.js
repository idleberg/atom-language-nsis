'use strict';

var main = require('./main-800e620e.js');
require('path');
require('fs');
require('child_process');
require('os');
require('atom');

function setRunner() {
    return main.__awaiter(this, void 0, void 0, function () {
        var notification;
        return main.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hasAtomRunner()];
                case 1:
                    if (!(_a.sent())) {
                        atom.beep();
                        return [2 /*return*/];
                    }
                    notification = atom.notifications.addInfo('Do you want to set `makensis` as the default runner for NSIS files?', {
                        dismissable: true,
                        buttons: [
                            {
                                text: 'Set makensis',
                                onDidClick: function () {
                                    notification.dismiss();
                                    atom.config.set('runner.scopes.nsis', 'makensis -');
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
                    return [2 /*return*/];
            }
        });
    });
}
function unsetRunner() {
    return main.__awaiter(this, void 0, void 0, function () {
        var notification;
        return main.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hasAtomRunner()];
                case 1:
                    if (!(_a.sent())) {
                        atom.beep();
                        return [2 /*return*/];
                    }
                    notification = atom.notifications.addWarning('Do you want to unset `makensis` as the default runner for NSIS files?', {
                        dismissable: true,
                        buttons: [
                            {
                                text: 'Unset makensis',
                                onDidClick: function () {
                                    notification.dismiss();
                                    atom.config.unset('runner.scopes.nsis');
                                    return;
                                }
                            },
                            {
                                text: 'Cancel',
                                onDidClick: function () {
                                    notification.dismiss();
                                    atom.beep();
                                    return;
                                }
                            }
                        ]
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function hasAtomRunner() {
    return main.__awaiter(this, void 0, void 0, function () {
        var isLoadedAndActive;
        return main.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./main-800e620e.js'); }).then(function (n) { return n.util; })];
                case 1:
                    isLoadedAndActive = (_a.sent()).isLoadedAndActive;
                    return [2 /*return*/, isLoadedAndActive('atom-runner')];
            }
        });
    });
}

exports.setRunner = setRunner;
exports.unsetRunner = unsetRunner;
//# sourceMappingURL=runner-ec08175c.js.map
