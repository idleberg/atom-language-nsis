"use strict";var e=require("./main-42bb6f75.js"),i=require("path");require("dotenv");var t=require("fs");function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}require("child_process"),require("os"),require("atom-satisfy-dependencies"),require("atom"),require("execa"),require("util"),require("which"),require("makensis"),require("@nsis/nlf"),require("atom-select-list");var s=n(require("yaml"));function r(n){return e.__awaiter(this,void 0,void 0,(function(){var r,a,o,l,c,u,d,f,m,g;return e.__generator(this,(function(h){switch(h.label){case 0:return r=e.getConfig("useWineToRun"),a=e.isLoadedAndActive("build-makensis-wine"),[4,e.findPackagePath("build-makensis-wine")];case 1:return o=h.sent()[0],l=["{FILE_ACTIVE}"],(c=e.getConfig("compilerOptions.verbosity"))&&l.push("-V"+c),e.getConfig("compilerOptions.strictMode")&&l.push("-WX"),g={name:n.scriptFile},r&&a?(d=i.resolve(o,"lib","makensis-wine.sh"),[3,4]):[3,2];case 2:return[4,e.getMakensisPath()];case 3:d=h.sent(),h.label=4;case 4:g.cmd=d,g.sh=r&&a,g.args=l,g.cwd="{FILE_ACTIVE_PATH}",g.errorMatch='(\\r?\\n)(?<message>.+)(\\r?\\n)Error in script "(?<file>[^"]+)" on line (?<line>\\d+) -- aborting creation process',g.warningMatch="[^!]warning: (?<message>.*) \\((?<file>(\\w{1}:)?[^:]+):(?<line>\\d+)\\)",u=g,f="yaml"===n.syntax?s.default.stringify(u):JSON.stringify(u,null,2),h.label=5;case 5:return h.trys.push([5,7,,8]),[4,t.promises.writeFile(n.filePath,f,"utf-8")];case 6:return h.sent(),[3,8];case 7:return m=h.sent(),console.log(m),atom.notifications.addError("Failed to write "+n.fileName,{detail:m,dismissable:!1}),[2];case 8:return[4,atom.workspace.open(n.filePath)];case 9:return h.sent(),[2]}}))}))}exports.createBuildFile=function(){var t,n;return e.__awaiter(this,void 0,void 0,(function(){var s,a,o,l,c,u,d,f,m,g,h;return e.__generator(this,(function(p){switch(p.label){case 0:return(s=atom.workspace.getActiveTextEditor())?"source.nsis"!==s.getGrammar().scopeName?(atom.notifications.addWarning("Unsupported document type",{dismissable:!1}),[2]):(a=s.getPath(),!1===e.getConfig("processHeaders")&&e.isHeaderFile(a)?(o=atom.notifications.addWarning("Creating build-files for headers is blocked by default. You can allow this in the package settings.",{dismissable:!0,buttons:[{text:"Open Settings",className:"icon icon-gear",onDidClick:function(){return e.__awaiter(this,void 0,void 0,(function(){return e.__generator(this,(function(e){switch(e.label){case 0:return o.dismiss(),[4,atom.workspace.open("atom://config/packages/language-nsis",{pending:!0,searchAllPanes:!0})];case 1:return e.sent(),[2]}}))}))}},{text:"Cancel",onDidClick:function(){o.dismiss()}}]}),atom.beep(),[2]):(l=(null===(n=null===(t=atom.workspace)||void 0===t?void 0:t.getActiveTextEditor())||void 0===n?void 0:n.getPath())||null)?(u=i.basename(l),d=i.dirname(l),f=String(e.getConfig("buildFileSyntax")),m=".atom-build."+f.toLowerCase(),g=i.join(d,m),[4,e.fileExists(g)]):(c=atom.notifications.addWarning("File not saved",{dismissable:!0,detail:"You need to save this file manually before you can create a build-file",buttons:[{text:"OK",onDidClick:function(){c.dismiss()}}]}),[2])):(atom.notifications.addWarning("No active editor",{dismissable:!1}),[2]);case 1:return p.sent()?h=atom.notifications.addWarning("File exists",{dismissable:!0,detail:"Do you really want to overwrite your existing build file?",buttons:[{text:"Overwrite",onDidClick:function(){return e.__awaiter(this,void 0,void 0,(function(){return e.__generator(this,(function(e){return h.dismiss(),r({script:u,syntax:f,fileName:m,filePath:g}),[2]}))}))}},{text:"Abort",onDidClick:function(){h.dismiss()}}]}):r({script:u,syntax:f,fileName:m,filePath:g}),[2]}}))}))};
//# sourceMappingURL=build-53957625.js.map