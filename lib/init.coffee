class NsisConfigInit

    # Set runner for NSIS scripts
    makensis = (exec) ->
        conf = atom.config.get('runner.scopes.nsis')
        if !conf
            atom.config.set('runner.scopes.nsis', exec)

    # Show dialog if no runner was defined
    if (typeof atom.config.get('runner.scopes.nsis') == 'undefined')
        atom.confirm
          message: 'Set default runner for NSIS'
          detailedMessage: 'To compile NSIS scripts from inside Atom, you need to define a runner. Do you want to use makensis as default runner?'
          buttons:
            "Use makensis": -> makensis('makensis -')
            Abort: -> makensis('echo No runner defined for')

module.exports = new NsisConfigInit