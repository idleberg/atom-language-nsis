# NSIS for Atom

[![apm](https://img.shields.io/apm/l/language-nsis.svg?style=flat-square)](https://atom.io/packages/language-nsis)
[![apm](https://img.shields.io/apm/v/language-nsis.svg?style=flat-square)](https://atom.io/packages/language-nsis)
[![apm](https://img.shields.io/apm/dm/language-nsis.svg?style=flat-square)](https://atom.io/packages/language-nsis)
[![Travis](https://img.shields.io/travis/idleberg/atom-language-nsis.svg?style=flat-square)](https://travis-ci.org/idleberg/atom-language-nsis)
[![David](https://img.shields.io/david/dev/idleberg/atom-language-nsis.svg?style=flat-square)](https://david-dm.org/idleberg/atom-language-nsis#info=devDependencies)

Atom language support for NSIS, consisting of grammar and snippets

![Screenshot](https://raw.github.com/idleberg/atom-language-nsis/master/screenshot.gif)

*Screenshot of NSIS in Atom with [Hopscotch](https://atom.io/themes/hopscotch) theme*

## Features

* all core NSIS commands, variables and predefines
* Drunken NSIS
* Plugins:
    * AdvSplash
    * Banner
    * BgImage
    * Dialer
    * InstallOptions
    * LangDLL
    * Math
    * nsDialogs
    * nsExec
    * NSISdl
    * Splash
    * StartMenu
    * System
    * UserInfo
    * VPatch
* Headers:
    * FileFunc
    * LogicLib
    * Memento
    * MultiUser
    * Sections
    * WinMessages
    * WinVer
    * WordFunc
    * x64

You can further extend this package with snippets for [plug-ins](https://atom.io/packages/nsis-plugins) and [localization](https://atom.io/packages/language-nlf).

## Installation

### apm

* Install package `apm install language-nsis` (or use the GUI)

### GitHub

1. Change directory to `~/.atom/packages/`
2. Clone repository `git clone https://github.com/idleberg/atom-language-nsis.git`

## Usage

### Completion

With most commands, you can specify available options before completion. For instance, rather than completing `RequestExecutionLevel` and then specifying an option, you can directly choose `RequestExecutionLevel user` from the completion menu.

To complete [compile time commands](http://nsis.sourceforge.net/Docs/Chapter5.html#), [variables](http://nsis.sourceforge.net/Docs/Chapter4.html#varother) or [predefines](http://nsis.sourceforge.net/Docs/Chapter5.html#comppredefines), *leave out* special characters:

* `include` completes to `!include`
* `INSTDIR` completes to `$INSTDIR`
* `NSIS_VERSION` completes to `${NSIS_VERSION}`

However, you have to type `__LINE___` to complete to `${__LINE__}`.

There are several special cases for your convenience:

* `MB_OK` completes to `MessageBox MB_OK`
* `onInit` completes to a `Function .onInit` block
* `LogicLib` completes to `!include "LogicLib.nsh"`

### Building

There are currently two ways to build NSIS scripts within Atom, each of them requiring an additional package to be installed.

Package Dependency                                  | Build Shortcut
----------------------------------------------------|---------------
[script](https://atom.io/packages/script)           | <kbd>Super</kbd>+<kbd>I</kbd>
[atom-runner](https://atom.io/packages/atom-runner) | <kbd>Ctrl</kbd>+<kbd>R</kbd>

If atom-runner has been detected, the user will be asked whether to use makensis as the default runner for NSIS scripts.

**Note:** You might have to add makensis to your PATH environmental variable in order to use any of the mentioned building tools.

## License

This work is licensed under the [The MIT License](LICENSE.md).

## Donate

You are welcome support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/atom-language-nsis) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`