import { getConfig } from './util';
import { promises as fs, constants } from 'fs';
import path from 'path';
// import YAML from 'yaml-js';

async function createBuildFile(useWine = false): Promise<any> {
  const editor = atom.workspace.getActiveTextEditor();

  if (!editor) {
    atom.notifications.addWarning(`**language-nsis**: No active editor`, {
      dismissable: false
    });

    return;
  }

  if (editor.getGrammar().scopeName !== 'source.nsis') {
    atom.notifications.addWarning(`**language-nsis**: Unsupported document type`, {
      dismissable: false
    });

    return;
  }

  let createFile = false;
  const currentPath = atom.workspace?.getActiveTextEditor()?.getPath() || null;


  if (!currentPath) {
    const notification = atom.notifications.addWarning('File not saved', {
      dismissable: true,
      detail: 'You need to save this file manually before you can create a build-file',
      buttons: [
        {
          text: 'OK',
          onDidClick() {
            notification.dismiss();
          }
        }
      ]
    });
  }

  const currentFile = path.basename(currentPath);

  let successMessage = '';
  //   currentPath = path.dirname(currentPath);
    const buildFileSyntax = String(getConfig('buildFileSyntax'));
    const buildFilePath = path.join(currentPath, `.atom-build.${buildFileSyntax.toLowerCase()}`);

    console.log({buildFilePath});

    try {
      await fs.access(`${buildFilePath}`, constants.F_OK);
      console.log('File Exists');
    } catch (error) {
      console.log('File does not exists');
    }

    const fileExistsNotification = atom.notifications.addWarning('File exists', {
      dismissable: true,
      detail: 'Do you really want to overwrite your existing build file?',
      buttons: [
        {
          text: 'Overwrite',
          onDidClick() {
            console.log('Overwriting')
            successMessage = 'Overwriting existing file';
            createFile = true;

            fileExistsNotification.dismiss();
          },
        },
        {
          text: 'Abort',
          onDidClick() {
            console.log('Aborting')
            fileExistsNotification.dismiss();

            return;
          }
        }
      ]
    });


}

// async function saveFile() {
//   return fs.access(`${buildFilePath}`, fs.constants.R_OK, function(error) {
//       if (error === null) {
//         atom.confirm({
//           message: "File exists",
//           detailedMessage: "Do you really want to overwrite your existing build file?",
//           buttons: {
//             "Overwrite"() {
//               successMessage = "Overwriting existing file";
//               return createFile = true;
//             },
//             "Abort"() {
//             }
//           }
//         });
//       } else {
//         successMessage = "Saving file";
//         createFile = true;
//       }

//       if (createFile === true) {
//         let makeNsis, sh, stringify;
//         if (useWine !== true) {
//           makeNsis ="makensis";
//           sh = false;
//         } else {
//           const pathToScript = atom.config.get("build-makensis-wine.pathToScript");
//           const packageDir = atom.packages.getPackageDirPaths().toString();
//           makeNsis = pathToScript ? `\"${pathToScript}\"` : path.join(packageDir, "build-makensis-wine", "lib", "makensis-wine.sh");
//           sh = true;
//         }

//         const buildFile = {
//           name: currentFile,
//           cmd: makeNsis,
//           args: [ "{FILE_ACTIVE}" ],
//           sh,
//           cwd: "{FILE_ACTIVE_PATH}",
//           errorMatch: "(\\r?\\n)(?<message>.+)(\\r?\\n)Error in script \"(?<file>[^\"]+)\" on line (?<line>\\d+) -- aborting creation process",
//           warningMatch: "[^!]warning: (?<message>.*) \\((?<file>(\\w{1}:)?[^:]+):(?<line>\\d+)\\)"
//         };

//         switch (buildFileSyntax) {
//           case "YAML":
//             stringify = YAML.dump(buildFile);
//             break;
//           default:
//             stringify = JSON.stringify(buildFile, null, 2);
//         }

//         // Save build file
//         return fs.writeFile(buildFilePath, stringify, function(error) {
//           if (error) {
//             return atom.notifications.addError(buildFileBase, {detail: error, dismissable: false});
//           } else {
//             atom.notifications.addInfo(buildFileBase, {detail: successMessage, dismissable: false});
//             return atom.workspace.open(buildFilePath);
//           }
//         });
//       }
//     });
//   }
// }

export {
  createBuildFile
};
