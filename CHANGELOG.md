# v8.11.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.11.0)

- bump minimum Atom version to v1.52

# v8.10.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.10.3)

- fix order of arguments in build-file
- extend build-file support to `buildium` package

# v8.10.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.10.2)

- fix multiple console clearing

# v8.10.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.10.1)

- consume fallback console service

# v8.10.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.10.0)

- add `console` package dependency
- remove unused `devDependency`

# v8.9.10 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.9.10)

- fix `migrateConfig()`

# v8.9.9 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.9.9)

- remove failing debug messages

# v8.9.8 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.9.8)

- update markdown linting script

# v8.9.7 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.9.7)

- replace logging module
- fix: add missing parameter to `busySignal.remove()`

# v8.9.6 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.9.6)

- remove deprecation notice
- update dependencies

# v8.9.5 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.9.5)

- minor refactoring
- modify `lint:ts` script
- update dependencies

# v8.9.4 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.9.4)

- update `.eslintrc`
- update dependencies

# v8.9.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.9.3)

- revert changes in rollup config

# v8.9.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.9.2)

- fix linting script

# v8.9.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.9.1)

- fix verbosity config
- improve verbosity handling
- update dependencies

# v8.9.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.9.0)

- group compiler settings
- add new compiler settings
  - `strictMode`
  - `customArguments`
- re-order package settings
- add prettier support
- update linting script

# v8.8.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.8.3)

- update rollup config

# v8.8.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.8.2)

- fix event handler
- update dependencies

# v8.8.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.8.1)

- minor refactoring
- update linting script
- update dependencies

# v8.8.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.8.0)

- use `makensis` to compile scripts
- add `System::Int64Op` snippet
- add `compilerVerbosity` option
- remove `compilerArguments` option
- toggle console panel prior to logging
- update dependencies

# v8.7.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.7.1)

- improve `detectOutfile()`
- change wording

# v8.7.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.7.0)

- consume `busy-signal` service
- update dependencies

# v8.6.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.6.1)

- improve success messages

# v8.6.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.6.0)

- add OutFile detection for `stderr`
- refactor `console-panel` service usage
- consume `browse` service
- remove unused dependencies

# v8.5.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.5.0)

- modify default behaviour for `NSIS_APP_*` environment variables

# v8.4.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.4.2)

- fix `findEnvFile()` for single files
- update dependencies

# v8.4.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.4.1)

- improve `child_process` error logging

# v8.4.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.4.0)

- add support for `NSIS_APP_*` environment variables
- initialize DotEnv early in package activation
- clean up dead code
- update dependencies

# v8.3.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.3.0)

- add configuration migration
- add development logging
- re-add support for Wine build files
- remove condition for `build` package config
- rename option

# v8.2.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.2.0)

- add conditions around settings depending on third party packages or platform
- replace YAML stringifier

# v8.1.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.1.0)

- add conditions around commands depending on third party packages
- rename setting _Allow Header Compilation_ ➞ _Allow Headers_
- respect _Allow Headers_ setting when creating build files

# v8.0.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.0.3)

- use `which` module
- update package description

# v8.0.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.0.2)

- reset default value for `useWineToRun`

# v8.0.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.0.1)

- fix: invalid JSON in keymap file

# v8.0.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v8.0.0)

- decaffeinate
  - rewrite in TypeScript
  - convert grammars/keymaps/menus/settings/snippets to JSON (excluding scaffolding snippets)
  - remove support for CSON build files
- add support for environment variables
- add support for DotEnv files
- build with Rollup
- lint with ESLint
- remove build files for Wine
- rename commands
  - _NSIS: Save & Compile_ ➞ _NSIS: Compile_
  - _NSIS: Save & Compile Strict_ ➞ _NSIS: Compile Strict_
  - _NSIS: Remove Default Runner_ ➞ _NSIS: Unset Default Runner_
- modify config defaults
- update dependencies

# v7.5.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.5.1)

- fix NSIS 3.06 snippets

# v7.5.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.5.0)

- add NSIS v3.06 syntax
- update dependencies

# v7.4.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.4.2)

- bump `makensis` to v0.21.0

# v7.4.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.4.1)

- update dependencies

# v7.4.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.4.0)

- remove highlighting for URLs

# v7.3.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.3.3)

- some housekeeping
- update dependencies

# v7.3.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.3.2)

- fix broken dependency

# v7.3.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.3.1)

- minor refactoring
- update dependencies

# v7.3.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.3.0)

- replace custom code with `atom-satisfy-dependencies` module
- update dependencies

# v7.2.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.2.1)

- include parent `package-deps`
- modify `activationHooks`

# v7.2.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.2.0)

- add `hyperclick-nsis` package dependency

# v7.1.6 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.1.6)

- fix scaffolding snippet

# v7.1.5 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.1.5)

- fix snippets

# v7.1.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.1.3)

- scaffolding snippets default to Unicode

# v7.1.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.1.2)

- add missing NSIS 3.05 command
- fix typo in grammar

# v7.1.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.1.1)

- update dependencies

# v7.1.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.1.0)

- add notification on wrong document type for build-file creation
- replace CSON stringifier
- fix build-file creation

# v7.0.4 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.0.4)

- fix running installers with UAC

# v7.0.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.0.3)

- fix indentation character in snippets
- update dependencies

# v7.0.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.0.2)

- fix class name and symbol for function snippets

# v7.0.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.0.1)

- fix argument handling

# v7.0.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v7.0.0)

- **Breaking change:** arguments need to be passed as array
- explicitly pass `url: true` option in `open()` call
- update dependencies

# v6.20.6 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.20.6)

- improve detection of strict mode
- fix dependency name

# v6.20.5 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.20.5)

- fix path in `gulpfile.js`
- modify Circle CI configuration
- update dependencies

# v6.20.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.20.3)

- update dependencies

# v6.20.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.20.2)

- adjust `activationHooks`
- remove stray dependency

# v6.20.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.20.1)

- fix reading manifest

# v6.20.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.20.0)

- bundle with Webpack
- add activation hooks
- remove metrics
- update dependencies

# v6.19.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.19.1)

- fix command reference on NSIS v3.04

# v6.19.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.19.0)

- add NSIS v3.04 support
- update dependencies

# v6.18.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.18.2)

- add support for `@nsis/nlf@0.5`

# v6.18.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.18.1)

- fix: overwrite converted target file

# v6.18.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.18.0)

- modify NLF converter
- update dependencies

# v6.17.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.17.2)

- fix `nlf.cson`

# v6.17.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.17.1)

- fix: update `nlf` to 0.4.1

# v6.17.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.17.0)

- add `IsNative*` macros (from NSIS v3.04)
- add _NSIS: Convert Language File_ command
- fix NLF grammar name
- update dependencies

# v6.16.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.16.1)

- fix `anonymizerIP` parameter

# v6.16.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.16.0)

- add `.editorconfig`
- remove consent notification
- update GA parameters

# v6.14.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.14.1)

- rename option

# v6.14.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.14.0)

- add `disallowHeaderCompilation` option
- update dependencies

# v6.13.4 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.13.4)

- refactor

# v6.13.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.13.3)

- add missing event

# v6.13.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.13.2)

- print `fs.access` error to `console.error`
- catch empty output file

# v6.13.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.13.1)

- print `fs.access` error to console

# v6.13.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.13.0)

- add Reveal button
- update dependencies

# v6.12.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.12.1)

- adjust URL parameters

# v6.12.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.12.0)

- overhaul snippets

# v6.11.4 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.11.4)

- modify command name & icon

# v6.11.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.11.3)

- modify URL in snippet popover

# v6.11.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.11.2)

- change lookup URL
- update `Section` snippet

# v6.11.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.11.1)

- catch command name deviations

# v6.11.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.11.0)

- add `NSIS: Look up command online` command
- add `getConfig()` method
- update dependencies

# v6.10.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.10.0)

- add `PEDllCharacteristics`
- add `PESubsysVer`

# v6.9.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.9.0)

- add `showFlagsAsObject` option
- modify default comment delimiter
- update dependencies

# v6.8.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.8.0)

- make use of `makensis` module
- Drunken NSIS: add support for NSIS 3.03
- improve warning detection

# v6.7.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.7.1)

- fix typo in snippet

# v6.7.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.7.0)

- add support for NSIS 3.03

# v6.6.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.6.2)

- fix typo in scaffolding snippet
- update `devDependencies`

# v6.6.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.6.1)

- modify event message

# v6.6.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.6.0)

- add button icons

# v6.5.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.5.0)

- add support for `atom-linter`

# v6.4.4 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.4.4)

- remove activation event

# v6.4.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.4.3)

- modify satisfy-dependencies event

# v6.4.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.4.2)

- modify event output

# v6.4.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.4.1)

- change wording for package activation event

# v6.4.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.4.0)

- add metrics support

# v6.3.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.3.0)

- add highlighting support for URLs

# v6.2.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.2.1)

- pass options to `atom.workspace.open`

# v6.2.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.2.0)

- use async `TextEditor.save()` (closes #4)
- bump minimum Atom version to v1.19
- Travis CI: test against Node versions 6 & 8

# v6.1.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.1.2)

- add snippet for new `WriteRegNone` command
- add snippet variants for `ExecShellWait`

# v6.1.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.1.1)

- add Modern UI definitions introduced in NSIS 3.02

# v6.1.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.1.0)

- add support for NSIS 3.02

# v6.0.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.0.2)

- improve `runInstaller()` function

# v6.0.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.0.1)

- lazyload dependencies

# v6.0.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v6.0.0)

- add support to run installers
- split code into modules

# v5.22.5 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.22.5)

- fix file-extension for scripts generated by BridleNSIS

# v5.22.4 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.22.4)

- fix dependency management

# v5.22.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.22.2)

- modify format of compiler flags output
- update `devDependencies`

# v5.22.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.22.1)

- extend `compilerFlags` option, rename it to `compilerOutput`
- modify notifications view

# v5.22.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.22.0)

- add `compilerFlags` option
- add Developer menu

# v5.21.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.21.0)

- add command to show `makensis` compiler flags
- update snippets
- update description

# v5.20.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.20.2)

- update class-names in snippet pane ([read more](http://blog.atom.io/2016/11/14/removing-shadow-dom-boundary-from-text-editor-elements.html))

# v5.20.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.20.1)

- fix frame-order in animation

# v5.20.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.20.0)

- lazyload dependencies
- update screenshot

# v5.19.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.19.0)

- allow case-insensitive syntax

# v5.18.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.18.0)

- reverts `satisfyDependencies()` removal (oops!)

# v5.17.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.17.0)

- remove `satisfyDependencies()`
- use `showPrompt` option when installing package dependencies
- update devDependencies

# v5.16.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.16.2)

- revert recent changes in prefix handling

# v5.16.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.16.1)

- some refactoring
- update dependencies

# v5.16.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.16.0)

- re-add `getPath` function
- update `devDependencies`

# v5.15.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.15.1)

- resolve conflict with core key binding

# v5.15.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.15.0)

- add menu item to access package settings

# v5.14.5 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.14.5)

- integrate `yarn.lock` into Travis CI tests
- update `devDependencies`

# v5.14.4 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.14.4)

- extend highlighting support to transpiled [BridleNSIS](https://github.com/henrikor2/bridlensis) scripts

# v5.14.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.14.3)

- rename command

# v5.14.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.14.2)

- improve escape character pattern

# v5.14.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.14.1)

- fix typo

# v5.14.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.14.0)

- add option for dependency management
- add _NSIS: Setup Package Dependencies_ command
- reindent settings file

# v5.13.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.13.1)

- add fallback for missing `console-panel`

# v5.13.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.13.0)

- add option to control `console-panel`
- add descriptions for some settings

# v5.12.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.12.1)

- minor refinements

# v5.12.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.12.0)

- add support for `console-panel`
- remove `getPath()` function

# v5.11.4 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.11.4)

- fix unescaped `$` in scaffolding snippet

# v5.11.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.11.3)

- add shortcut to build in strict mode

# v5.11.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.11.2)

- replace `fs.exists`(deprecated) with `fs.access`
- update linter

# v5.11.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.11.1)

- use `\t` in snippets

# v5.11.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.11.0)

- use `spawn` were applicable
- improve compiler notifications
- update Travis CI settings

# v5.10.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.10.0)

- improve async `exec` usage
- update `devDependencies`

# v5.9.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.9.0)

- add strict build command
- improve build success notifications
- fix build error notification

# v5.8.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.8.3)

- add more deprecated commands
- add `%PackEXEHeader` and `%UninstallExeName` to Drunken NSIS snippets

# v5.8.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.8.2)

- update scope for `Function`, `PageEx`, `Section` and `SectionGroup` blocks

# v5.8.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.8.1)

- add `$PROGRAMFILES32` and `$PROGRAMFILES64`

# v5.8.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.8.0)

- merge with [language-nlf](https://github.com/idleberg/atom-language-nlf) package
- modify grammar order

# v5.7.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.7.2)

- grammar: split up core library patterns for better maintainability

# v5.7.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.7.1)

- remove deprecated commands
- add `SetPluginUnload` alias to Drunken NSIS

# v5.7.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.7.0)

- update syntax grammar
  - add support for variables/constants in quotes
  - add core libraries
  - add highlighting of deprecated commands
  - modify scopes

# v5.6.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.6.0)

- add deprecated commands to grammar
- update RegEx patterns
- update `.travis.yml`

# v5.5.5 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.5.5)

- update grammar patterns
- replace JSON linter
- remove Node 4 test

# v5.5.4 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.5.4)

- improved `gulpfile`
- fix linting issues

# v5.5.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.5.3)

- add description URL for Modern UI v1.x snippets

# v5.5.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.5.2)

- add missing description for `CreateShortcut`

# v5.5.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.5.1)

- modify settings label
- improve documentation
- remove `atom-build` from build description

# v5.5.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.5.0)

- add support for YAML build files

# v5.4.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.4.0)

- add option to specify build file syntax
- update `devDependencies`
- update `.travis.yml`

# v5.3.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.3.3)

- improve handling of default `makensis` value

# v5.3.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.3.2)

- fix bug not detecting `makensis`
- improve description of settings

# v5.3.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.3.0)

- overhaul config system
- fixed error notification
- removed `getPlatform()`

# v5.2.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.2.2)

- improve `disable()`

# v5.2.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.2.1)

- improved error handling

# v5.2.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.2.0)

- add support for `MUI2.nsh` (and `MUI.nsh`)
- add command to display `makensis` version

# v5.1.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.1.1)

- add missing trailing tab-stops

# v5.1.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.1.0)

- add support for `MultiUser.nsh`
- add support for `StrStr.nsh`

# v5.0.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.0.1)

- improve descriptions for some of the snippets

# v5.0.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v5.0.0)

- add additional fields to snippets
  - descriptions
  - description links
  - labels
- move “drunken” header completions to `header.DrunkenNSIS.cson`
- update `header.WinVer.cson`
- modified `variable` and `constant` grammar
- many fixes

# v4.8.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.8.1)

- remove duplicate from `core.InstallOptions.cson`
- fix typo in `core.Options.cson`

# v4.8.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.8.0)

- use CSON for build files (“the Atom way”)

# v4.7.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.7.1)

- update devDependencies
- update linter

# v4.7.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.7.0)

- add `IsServerOS` (keeping`IsServer` for transitional period)
- add deprecated commands to Drunken NSIS module

# v4.6.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.6.2)

- only save if buffer was updated

# v4.6.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.6.1)

- add changes from `v4.6.0` to Drunken NSIS

# v4.6.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.6.0)

- add `${VersionConvert}`
- fix `${VersionCompare}`

# v4.5.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.5.3)

- add `${EndIf}`
- add `${EndUnless}`

# v4.5.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.5.2)

- fix Wine config

# v4.5.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.5.1)

- limit build-file creation to `source.nsis`

# v4.5.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.5.0)

- add build-file command for Wine

# v4.4.9 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.4.9)

- add `errorMatch` to build-file
- add `warningMatch` to build-file
- rename build-file target

# v4.4.8 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.4.8)

- add file-name to created `.atom-build.json`

# v4.4.7 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.4.7)

- remove stray `console.log` calls

# v4.4.6 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.4.6)

- dispose on deactivation

# v4.4.5 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.4.5)

- fix more tab-stops

# v4.4.4 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.4.4)

- fix tab-stops
- re-indent all CSON
- update `README.md`

# v4.4.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.4.3)

- adds name to build file
- improved documentation

# v4.4.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.4.2)

- fix scaffolding snippets

# v4.4.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.4.1)

- fix typos

# v4.4.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.4.0)

- add tab-stops to end of each snippet
- minor fixes

# v4.3.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.3.0)

- add `scaffold-InstallOptions` snippet
- dual-license

# v4.2.4 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.2.4)

- change Windows keymap 😔

# v4.2.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.2.3)

- fix Windows keymap selector

# v4.2.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.2.2)

- fix: re-add missing menu separator
- update descriptions in `README.md`

# v4.2.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.2.1)

- fix URL in scaffolding snippets
- update description

# v4.2.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.2.0)

- asynchronous `makensis` detection, fixes not building on the first try
- add check for NSIS scope
- modify default keymap (again)
- rename setting (`compilerArgs` to `compilerArguments`), looks better in the GUI

# v4.1.4 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.1.4)

(yes, `4.1.3` was removed)

- use Markdown in notifications

# v4.1.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.1.2)

- modify keyboard shortcuts on Windows and Linux
- fix makensis error output
- prefix makensis version output

# v4.1.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.1.1)

- fix error output

# v4.1.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.1.0)

- add option to provide custom compiler arguments

# v4.0.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.0.2)

- change shortcuts for Windows platform

# v4.0.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.0.1)

- add paths to build command, fixes Windows not building
- fix command name

# v4.0.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v4.0.0)

- add native build support
- add keymap
- lazy load dependencies
- various minor fixes
- update devDependencies

# v3.7.4 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v3.7.4)

- add `${NSIS_PTR_SIZE}`

# v3.7.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v3.7.3)

- open `.atom-build.json` after creation
- rename commands
- update `README.md`

# v3.7.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v3.7.2)

- fix current working directory for `.atom-build-json`

# v3.7.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v3.7.1)

- move flag: `RequestExecutionLevel` now defaults to `admin`

# v3.6.5 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v3.6.5)

- update description

# v3.6.4 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v3.6.4)

- update description

# v3.6.3 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v3.6.3)

- update description

# v3.6.2 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v3.6.2)

- update description

# v3.6.1 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v3.6.1)

- add `un.Section` / `un.Function` snippets

# v3.7.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v3.7.0)

- add notifications

# v3.5.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v3.5.0)

- add commands
  - set default runner
  - remove default runner
  - create `.atom-builder-json`
- remove automatic check for atom-runner

# v3.6.0 [#](https://github.com/idleberg/atom-language-nsis/releases/tag/v3.6.0)

- add menu
- add additional dialogs for atom-build helper
- refined dialogs
- update devDependencies
