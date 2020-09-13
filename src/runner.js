/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Runner;
const { readManifestSync } = require("atom-read-manifest");
const meta = readManifestSync();

// atom runner - https://atom.io/packages/atom-runner
module.exports = (Runner = {
  runner: null,

  set() {
    this.check();

    if ((typeof this.runner.path !== "undefined") && (this.runner.active === true)) {
      return atom.confirm({
        message: "Set default runner for NSIS",
        detailedMessage: "To compile NSIS scripts inside Atom, you need to define a runner. Do you want to use makensis as default runner?",
        buttons: {
          "Use makensis"() {
            atom.notifications.addSuccess(`**${meta.name}**: Set \`runner.scopes.nsis\` to 'makensis -'`, {dismissable: false});
            return atom.config.set("runner.scopes.nsis", "makensis -");
          },
          "Cancel"() {
            atom.notifications.addWarning(`**${meta.name}**: Cancelled setting default runner`, {dismissable: false});
          }
        }
      });
    } else {
      return this.notify();
    }
  },

  remove() {
    this.check();

    if ((typeof this.runner.path !== "undefined") && (this.runner.active === true)) {
      atom.notifications.addSuccess(`**${meta.name}**: Unset \`runner.scopes.nsis\``, {dismissable: false});
      return atom.config.unset("runner.scopes.nsis");
    } else {
      return this.notify();
    }
  },

  notify() {
    return atom.notifications.addWarning(`**${meta.name}**: [atom-runner](https://atom.io/packages/atom-runner) is not installed`, {dismissable: false});
  },

  check() {
    return this.runner = {
      path: atom.packages.resolvePackagePath("atom-runner"),
      active: atom.packages.isPackageLoaded("atom-runner")
    };
  }
});
