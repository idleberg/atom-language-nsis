# NSIS for Atom

[![apm](https://img.shields.io/apm/l/language-nsis.svg?style=flat-square)](https://atom.io/packages/language-nsis)
[![apm](https://img.shields.io/apm/v/language-nsis.svg?style=flat-square)](https://atom.io/packages/language-nsis)
[![apm](https://img.shields.io/apm/dm/language-nsis.svg?style=flat-square)](https://atom.io/packages/language-nsis)
[![Travis](https://img.shields.io/travis/idleberg/atom-language-nsis.svg?style=flat-square)](https://travis-ci.org/idleberg/atom-language-nsis)
[![David](https://img.shields.io/david/dev/idleberg/atom-language-nsis.svg?style=flat-square)](https://david-dm.org/idleberg/atom-language-nsis#info=devDependencies)
[![Gitter](https://img.shields.io/badge/chat-Gitter-ff69b4.svg?style=flat-square)](https://gitter.im/NSIS-Dev/Atom)

Atom language support for NSIS, including grammar, snippets and a rudimentary build system

![Screenshot](https://raw.github.com/idleberg/atom-language-nsis/master/screenshot.gif)

*Screenshot of NSIS in Atom with [Hopscotch](https://atom.io/themes/hopscotch) theme*

## Features

* all core NSIS commands, variables and predefines
* all core Plugins:
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
* all core libraries (“Useful Headers”):
    * FileFunc
    * LogicLib
    * Memento
    * MultiUser
    * Sections
    * WinMessages
    * WinVer
    * WordFunc
    * x64
* [Drunken NSIS](#drunken-nsis) (fuzzy completions)
* [Build Tools](#building)

You can further extend this package with snippets for [plug-ins](https://atom.io/packages/nsis-plugins) and [localization](https://atom.io/packages/language-nlf).

## Installation

### apm

* Install package `apm install language-nsis` (or use the GUI)

### GitHub

1. Change directory `cd ~/.atom/packages/`
2. Clone repository `git clone https://github.com/idleberg/atom-language-nsis language-nsis`

## Usage

### Completion

With most commands, you can specify available options before completion. For instance, rather than completing `RequestExecutionLevel` and then specifying an option, you can directly choose `RequestExecutionLevel user` from the completion menu.

To complete [compile time commands](http://nsis.sourceforge.net/Docs/Chapter5.html#), [variables](http://nsis.sourceforge.net/Docs/Chapter4.html#varother) or [predefines](http://nsis.sourceforge.net/Docs/Chapter5.html#comppredefines), make sure to *leave out* special characters like `!`, `$` and brackets:

* `include` completes to `!include`
* `INSTDIR` completes to `$INSTDIR`
* `NSIS_VERSION` completes to `${NSIS_VERSION}`

However, you have to type `__LINE__` to complete to `${__LINE__}`.

There are several special cases for your convenience:

* `MB_OK` completes to `MessageBox MB_OK`
* `onInit` completes to a `Function .onInit` block
* `LogicLib` completes to `!include "LogicLib.nsh"`

#### Drunken NSIS

Fuzzy syntax completions are available through “Drunken NSIS”, which tries to iron out some of the inconsistencies of the NSIS language, for instance word order.

**Example:**

Interchangable word order of NSIS language and library functions

* `FileRead` == `ReadFile`
* `ReadINIStr` == `INIStrRead`
* `SectionSetText` == `SetSectionText`
* `LogSet` == `SetLog`
* `FindFirst` == `FirstFind`
* `${FindLine}` == `${LineFind}`

### Building

There are many ways to compile NSIS scripts in Atom. But before we you read on, make sure `makensis` is in your [PATH environmental variable](http://superuser.com/a/284351/195953).

As of `v4.0.0`, this package contains a rudimentary build system to compile your NSIS scripts. To do so, select *“NSIS: Save & Compile”* from the [command-palette](https://atom.io/docs/latest/getting-started-atom-basics#command-palette) or use the keyboard shortcut.

If you prefer working with specific compiler arguments, you can specify them in your `config.cson`.

**Example:**

    "language-nsis":
      compilerArguments: "/WX /V3"

#### Third-party packages

In addition to that, the following build packages already support NSIS:

* [build](https://atom.io/packages/build) with provider (e.g. [build-makensis](https://atom.io/packages/build-makensis))
* [script](https://atom.io/packages/script)
* [atom-runner](https://atom.io/packages/atom-runner)
* [atom-build](https://github.com/mirhec/atom-build)

You can set up `atom-runner` by executing *“NSIS: Set default runner”* from the [command-palette](https://atom.io/docs/latest/getting-started-atom-basics#command-palette) or packages menu. To remove it, use *“NSIS: Remove default runner”*.

Project files for `atom-build` and `build` can be created by executing *“NSIS: Create .atom-build file”* from the [command-palette](https://atom.io/docs/latest/getting-started-atom-basics#command-palette) or using the keyboard shortcut.

## License

This work is dual-licensed under [The MIT License](https://opensource.org/licenses/MIT) and the [GNU General Public License, version 2.0](https://opensource.org/licenses/GPL-2.0)

## Donate

You are welcome support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/atom-language-nsis) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`