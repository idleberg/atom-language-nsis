{ readManifestSync } = require("atom-read-manifest")
meta = readManifestSync("language-nsis")

# atom runner - https://atom.io/packages/atom-runner
module.exports = Runner =
  runner: null

  set: ->
    @check()

    if (typeof @runner.path != "undefined") and (@runner.active == true)
      atom.confirm
        message: "Set default runner for NSIS"
        detailedMessage: "To compile NSIS scripts inside Atom, you need to define a runner. Do you want to use makensis as default runner?"
        buttons:
          "Use makensis": ->
            atom.notifications.addSuccess("**#{meta.name}**: Set `runner.scopes.nsis` to 'makensis -'", dismissable: false)
            atom.config.set("runner.scopes.nsis", "makensis -")
          "Cancel": ->
            atom.notifications.addWarning("**#{meta.name}**: Cancelled setting default runner", dismissable: false)
            return
    else
      @notify()

  remove: ->
    @check()

    if (typeof @runner.path != "undefined") and (@runner.active == true)
      atom.notifications.addSuccess("**#{meta.name}**: Unset `runner.scopes.nsis`", dismissable: false)
      atom.config.unset("runner.scopes.nsis")
    else
      @notify()

  notify: ->
    atom.notifications.addWarning("**#{meta.name}**: [atom-runner](https://atom.io/packages/atom-runner) is not installed", dismissable: false)

  check: ->
    @runner =
      path: atom.packages.resolvePackagePath("atom-runner")
      active: atom.packages.isPackageLoaded("atom-runner")
