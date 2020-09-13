/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Build;
const { readManifestSync } = require("atom-read-manifest");
const meta = readManifestSync();

// build - https://atom.io/packages/build
module.exports = (Build = {
  createFile(wine) {
    const fs = require("fs");
    const path = require("path");
    const { getConfig } = require("./util");

    const editor = atom.workspace.getActiveTextEditor();

    if (editor == null) {
      atom.notifications.addWarning(`**${meta.name}**: No active editor`, {dismissable: false});
      return;
    }

    if (editor.getGrammar().scopeName !== "source.nsis") {
      atom.notifications.addWarning(`**${meta.name}**: Unsupported document type`, {dismissable: false});
      return;
    }

    let createFile = false;
    let currentPath = atom.workspace.getActivePaneItem().getPath();
    const currentFile = path.basename(currentPath);

    if (typeof currentPath === "undefined") {
      return atom.confirm({
        message: "File not saved",
        detailedMessage: "You need to save this file before you can create a build-file",
        buttons: {
          "OK"() {  }
        }
      });

    } else {
      let buildFileBase;
      let successMsg = null;
      currentPath = path.dirname(currentPath);
      const buildFileSyntax = getConfig("buildFileSyntax");

      if (buildFileSyntax === "CSON") {
        buildFileBase = ".atom-build.cson";
      } else if (buildFileSyntax === "YAML") {
        buildFileBase = ".atom-build.yml";
      } else {
        buildFileBase = ".atom-build.json";
      }

      const buildFilePath = path.join(currentPath, buildFileBase);

      return fs.access(`${buildFilePath}`, fs.constants.R_OK, function(error) {
        if (error === null) {
          atom.confirm({
            message: "File exists",
            detailedMessage: "Do you really want to overwrite your existing build file?",
            buttons: {
              "Overwrite"() {
                successMsg = "Overwriting existing file";
                return createFile = true;
              },
              "Abort"() {
              }
            }
          });
        } else {
          successMsg = "Saving file";
          createFile = true;
        }

        if (createFile === true) {
          let makeNsis, sh, stringify;
          if (wine !== true) {
            makeNsis ="makensis";
            sh = false;
          } else {
            const pathToScript = atom.config.get("build-makensis-wine.pathToScript");
            const packageDir = atom.packages.getPackageDirPaths().toString();
            makeNsis = pathToScript ? `\"${pathToScript}\"` : path.join(packageDir, "build-makensis-wine", "lib", "makensis-wine.sh");
            sh = true;
          }

          const buildFile = {
            name: `${currentFile}`,
            cmd: makeNsis,
            args: [ "{FILE_ACTIVE}" ],
            sh,
            cwd: "{FILE_ACTIVE_PATH}",
            errorMatch: "(\\r?\\n)(?<message>.+)(\\r?\\n)Error in script \"(?<file>[^\"]+)\" on line (?<line>\\d+) -- aborting creation process",
            warningMatch: "[^!]warning: (?<message>.*) \\((?<file>(\\w{1}:)?[^:]+):(?<line>\\d+)\\)"
          };

          switch (buildFileSyntax) {
            case "CSON":
              var CSON = require("cson-parser");
              stringify = CSON.stringify(buildFile, null, 2);
              break;
            case "YAML":
              var YAML = require("yaml-js");
              stringify = YAML.dump(buildFile);
              break;
            default:
              stringify = JSON.stringify(buildFile, null, 2);
          }

          // Save build file
          return fs.writeFile(buildFilePath, stringify, function(error) {
            if (error) {
              return atom.notifications.addError(buildFileBase, {detail: error, dismissable: false});
            } else {
              atom.notifications.addInfo(buildFileBase, {detail: successMsg, dismissable: false});
              return atom.workspace.open(buildFilePath);
            }
          });
        }
      });
    }
  }
});
