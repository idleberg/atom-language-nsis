/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Util;
const { readManifestSync } = require("atom-read-manifest");
const meta = readManifestSync();

module.exports = (Util = {
  clearConsole(consolePanel) {
    try {
      return consolePanel.clear();
    } catch (error) {
      if (Util.getConfig("clearConsole")) { return console.clear(); }
    }
  },

  detectOutfile(line) {
    if (line.indexOf("Output: \"") !== -1) {
      const regex = /Output: \"(.*\.exe)\"\r?\n/g;
      const result = regex.exec(line.toString());

      return result[1];
    }

    return "";
  },

  getConfig(key) {
    if (key == null) { key = ""; }
    if (key != null) {
      return atom.config.get(`${meta.name}.${key}`);
    }

    return atom.config.get(`${meta.name}`);
  },

  getMakensisPath(callback) {
    const { spawn } = require("child_process");

    // If stored, return pathToMakensis
    const pathToMakensis = Util.getConfig("pathToMakensis");
    if ((pathToMakensis.length > 0) && (pathToMakensis !== "makensis")) {
      return callback(pathToMakensis);
    }

    // Find makensis
    const which = spawn(Util.which(), ["makensis"]);

    which.stdout.on("data", function( data ) {
      const path = data.toString().trim();
      atom.config.set(`${meta.name}.pathToMakensis`, path);
      return callback(path);
    });

    return which.on("close", function( errorCode ) {
      if (errorCode > 0) {
        return atom.notifications.addError(`**${meta.name}**: makensis is not in your \`PATH\` [environmental variable](http://superuser.com/a/284351/195953)`, {dismissable: true});
      }
    });
  },

  getPrefix() {
    const { platform } = require("os");

    if (platform() === "win32") {
      return "/";
    }

    return "-";
  },

  isWindowsCompatible() {
    const { platform } = require("os");

    if ((platform() === "win32") || (Util.getConfig("useWineToRun") === true)) {
      return true;
    }

    return false;
  },

  logCompilerFlags(output, showFlagsAsObject, consolePanel) {
    let stdOut;
    if (showFlagsAsObject === true) {
      stdOut = JSON.stringify(output.stdout, null, 2);
    } else {
      stdOut = output.stdout;
    }

    if (Util.getConfig("compilerOutput").toLowerCase() === "console") {
      try {
        return consolePanel.raw(stdOut);
      } catch (error) {
        console.info(stdOut);
        return atom.getCurrentWindow().openDevTools();
      }
    } else {
      return atom.notifications.addInfo(`**${meta.name}**`, {detail: stdOut, dismissable: true});
    }
  },

  notifyOnCompletion(type, openButton, outFile) {
    let notification;
    const buttons = [];
    let dismissable = false;

    if (outFile) {
      if (openButton === "Run") {
        dismissable = true;

        openButton = {
          text: openButton,
          className: "icon icon-playback-play",
          onDidClick() {
            notification.dismiss();
            return Util.runInstaller(outFile);
          }
        };

        buttons.push(openButton);
      }

      const revealButton = {
        text: "Reveal",
        className: "icon icon-location",

        onDidClick() {
          notification.dismiss();
          return Util.revealInstaller(outFile);
        }
      };

      const cancelButton = {
          text: "Cancel",

          onDidClick() {
            return notification.dismiss();
          }
        };

      buttons.push(revealButton);
      buttons.push(cancelButton);
    }

    if (type === "warning") {
      return notification = atom.notifications.addWarning(
        "Compiled with warnings", {
        dismissable,
        buttons
      }
      );
    } else {
      return notification = atom.notifications.addSuccess(
        "Compiled successfully", {
        dismissable,
        buttons
      }
      );
    }
  },

  openSettings() {
    const options = {
      pending: true,
      searchAllPanes: true
    };

    return atom.workspace.open(`atom://config/packages/${meta.name}`, options);
  },

  openURL(cmd) {
    const opn = require("open");
    return opn(`https://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Reference/${cmd}.html?utm_source=atom&utm_content=reference`, { url: true });
  },

  revealInstaller(outFile) {
    const { access, existsSync, F_OK } = require("fs");
    const { shell } = require("electron");

    return access(outFile, F_OK, function(error) {
      if (error || (outFile === "")) { return console.log(error); }

      return shell.showItemInFolder(outFile);
    });
  },

  runInstaller(outFile) {
    let error;
    const { exec, spawn } = require("child_process");
    const { platform } = require("os");

    if (platform() === "win32") {
      try {
        return exec(`cmd /c \"${outFile}\"`);
      } catch (error1) {
        error = error1;
        return atom.notifications.addWarning(`**${meta.name}**`, {detail: error, dismissable: true});
      }

    } else if (Util.getConfig("useWineToRun") === true) {
      try {
        return spawn("wine", [ outFile ]);
      } catch (error2) {
        error = error2;
        return atom.notifications.addWarning(`**${meta.name}**`, {detail: error, dismissable: true});
      }
    }
  },

  which() {
    const { platform } = require("os");

    if (platform() === "win32") {
      return "where";
    }

    return "which";
  }
});
