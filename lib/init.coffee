class NsisConfigInit

  # Is atom-runner installed & active?
  _path   = atom.packages.resolvePackagePath('atom-runner')
  _active = atom.packages.isPackageLoaded('atom-runner')

  # Is there a default runner for NSIS scripts?
  _scope  = atom.config.get('runner.scopes.nsis')

  # Ask user whether to set default runner
  if (typeof _path != 'undefined') and (_active == true) and (typeof _scope == "undefined")
    atom.confirm
      message: 'Set default runner for NSIS'
      detailedMessage: 'To compile NSIS scripts inside Atom, you need to define a runner. Do you want to use makensis as default runner?'
      buttons:
        "Use makensis": -> atom.config.set('runner.scopes.nsis','makensis -')
        "Not now": -> atom.config.set('runner.scopes.nsis','echo No runner defined for')

module.exports = new NsisConfigInit