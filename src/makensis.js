/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Makensis;
const { readManifestSync } = require("atom-read-manifest");
const meta = readManifestSync();

module.exports = (Makensis = {
  compile(strictMode, consolePanel) {
    const { spawn } = require("child_process");
    const { clearConsole, detectOutfile, getConfig, getMakensisPath, getPrefix, isWindowsCompatible, notifyOnCompletion } = require("./util");

    const editor = atom.workspace.getActiveTextEditor();
    if (editor == null) { return atom.notifications.addWarning(`**${meta.name}**: No active editor`, {dismissable: false}); }

    const script = editor.getPath();
    const scope  = editor.getGrammar().scopeName;

    if ((getConfig("allowHeaderCompilation") === false) && script.endsWith("nsh")) {
      var notification = atom.notifications.addWarning(
        "Compiling header files is blocked by default. You can allow it in the package settings.", {
        dismissable: true,
        buttons: [
          {
            text: "Open Settings",
            className: "icon icon-gear",
            onDidClick() {
              atom.workspace.open(`atom://config/packages/${meta.name}`, {pending: true, searchAllPanes: true});
              return notification.dismiss();
            }
          },
          {
            text: "Cancel",
            onDidClick() {
              return notification.dismiss();
            }
          }
        ]
      }
      );

      return atom.beep();
    }

    if ((script != null) && scope.startsWith("source.nsis")) {
      return editor.save().then(() => getMakensisPath(function(pathToMakensis) {
        const prefix = getPrefix();
        const compilerArguments = getConfig("compilerArguments");

        // only add WX flag if not already specified
        if ((strictMode === true) && !compilerArguments.includes("-WX") && !compilerArguments.includes("/WX")) {
          compilerArguments.push(`${prefix}WX`);
        }
        compilerArguments.push(script);

        clearConsole(consolePanel);

        // Let's go
        const makensis = spawn(pathToMakensis, compilerArguments);
        let hasWarning = false;
        let outFile = "";

        makensis.stdout.on("data", function(line) {
          const lineString = line.toString();

          if ((hasWarning === false) && (line.indexOf("warning: ") !== -1)) {
            hasWarning = true;

            try {
              if (getConfig("alwaysShowOutput")) { consolePanel.warn(lineString); }
            } catch (error) {
              console.warn(lineString);
            }
          } else {
            try {
              if (getConfig("alwaysShowOutput")) { consolePanel.log(lineString); }
            } catch (error1) {
              console.log(lineString);
            }
          }

          if (outFile === "") {
            return outFile = detectOutfile(line);
          }
        });

        makensis.stderr.on("data", function(line) {
          const lineString = line.toString();

          try {
            return consolePanel.error(lineString);
          } catch (error) {
            return console.error(lineString);
          }
        });

        return makensis.on("close", function( errorCode ) {
          if (errorCode === 0) {
            const openButton = isWindowsCompatible() === true ? "Run" : "";

            if (hasWarning === true) {
              if (getConfig("showBuildNotifications")) { return notifyOnCompletion("warning", openButton, outFile); }
            }

            if (getConfig("showBuildNotifications")) { return notifyOnCompletion("success", openButton, outFile); }
          }

          if (getConfig("showBuildNotifications")) { return atom.notifications.addError("Compile Error", {dismissable: false}); }
        });
      }));
    } else {
      // Something went wrong
      return atom.beep();
    }
  },

  showVersion(consolePanel) {
    const { spawn } = require("child_process");
    const { clearConsole, getConfig, getMakensisPath, getPrefix } = require("./util");
    const { version } = require("makensis");

    return getMakensisPath(function(pathToMakensis) {
      clearConsole(consolePanel);

      return version({pathToMakensis}).then(function(output) {
        if (getConfig("compilerOutput").toLowerCase() === "console") {
          try {
            consolePanel.log(`makensis ${output.stdout} (${pathToMakensis})`);
          } catch (error) {
            console.info(`makensis ${output.stdout} (${pathToMakensis})`);
            atom.getCurrentWindow().openDevTools();
          }
        } else {
          atom.notifications.addInfo(`**${meta.name}**`, {detail: `makensis ${output.stdout} (${pathToMakensis})`, dismissable: true});
        }

      }).catch(output => console.error(output));
    });
  },

  showCompilerFlags(consolePanel) {
    const { spawn } = require("child_process");
    const { clearConsole, getConfig, getMakensisPath, getPrefix, logCompilerFlags } = require("./util");
    const { hdrInfo } = require("makensis");

    const showFlagsAsObject = getConfig("showFlagsAsObject");
    if (showFlagsAsObject) { const flagFormat = " (JSON)"; }

    return getMakensisPath(function(pathToMakensis) {
      clearConsole(consolePanel);

      return hdrInfo({pathToMakensis, json: showFlagsAsObject}).then(output => logCompilerFlags(output, showFlagsAsObject, consolePanel)).catch(output => // fallback for legacy NSIS
      logCompilerFlags(output, showFlagsAsObject, consolePanel));
    });
  },

  showHelp(selectListView) {
    const { spawn } = require("child_process");
    const { clearConsole, getConfig, getMakensisPath, getPrefix, logCompilerFlags } = require("./util");
    const { cmdHelp } = require("makensis");

    return getMakensisPath(pathToMakensis => cmdHelp('', {pathToMakensis, json: true}).then(output => selectListView.update({items: Object.keys(output.stdout)})).catch(output => // fallback for legacy NSIS
    selectListView.update({items: Object.keys(output.stdout)})));
  }
});
