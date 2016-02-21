# NSIS for Atom

[![apm](https://img.shields.io/apm/l/language-nsis.svg?style=flat-square)](https://atom.io/packages/language-nsis)
[![apm](https://img.shields.io/apm/v/language-nsis.svg?style=flat-square)](https://atom.io/packages/language-nsis)
[![apm](https://img.shields.io/apm/dm/language-nsis.svg?style=flat-square)](https://atom.io/packages/language-nsis)
[![Travis](https://img.shields.io/travis/idleberg/atom-language-nsis.svg?style=flat-square)](https://travis-ci.org/idleberg/atom-language-nsis)
[![David](https://img.shields.io/david/dev/idleberg/atom-language-nsis.svg?style=flat-square)](https://david-dm.org/idleberg/atom-language-nsis#info=devDependencies)
[![Gitter](https://img.shields.io/badge/chat-Gitter-ff69b4.svg?style=flat-square)](https://gitter.im/NSIS-Dev/Atom)

Atom language support for NSIS, consisting of grammar and snippets

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
* Drunken NSIS (fuzzy completions)
* Support for third-party build systems

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

However, you have to type `__LINE___` to complete to `${__LINE__}`.

There are several special cases for your convenience:

* `MB_OK` completes to `MessageBox MB_OK`
* `onInit` completes to a `Function .onInit` block
* `LogicLib` completes to `!include "LogicLib.nsh"`

#### Drunken NSIS

Fuzzy syntax completions are available through “Drunken NSIS”, which tries to iron out some of the inconsistencies of the NSIS language, for instance word order.

**Example:**

Interchangable word order of NSIS language and library functions

* `FileRead` / `ReadFile`
* `ReadINIStr` / `INIStrRead`
* `SectionSetText` / `SetSectionText`
* `LogSet` / `SetLog`
* `FindFirst` / `FirstFind`
* `${FindLine}` / `${LineFind}`

### Building

There are several ways to build NSIS scripts within Atom, each of them depending on a separate build package.

**Note:** You might have to add makensis to your [PATH environmental variable](http://superuser.com/a/284351/195953) in order to use any of the mentioned building tools.

#### build

With the [script](https://atom.io/packages/build) package installed, you can compile scripts using the default <kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>b</kbd> shortcut (or <kbd>F9</kbd>).

#### script

With the [script](https://atom.io/packages/script) package installed, you can compile scripts using the default <kbd>Super</kbd>+<kbd>I</kbd> shortcut.

#### atom-runner

With the [atom-runner](https://atom.io/packages/atom-runner) package installed, you need to create a runner task to compile scripts. From the [command-palette](https://atom.io/packages/command-palette) run "NSIS: Set build command for atom–runner" and `makensis` will added as runner for NSIS files. Use the default shortcut <kbd>Ctrl</kbd>+<kbd>R</kbd> to compile your scripts.

#### atom-build

You can also create `.atom-build.json` to use with [atom-build](https://github.com/mirhec/atom-build). From the [command-palette](https://atom.io/packages/command-palette) run "NSIS: Create .atom–build file" to add it to your current project folder. Use the default shortcut <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> to compile your scripts.

## License

This work is licensed under the [The MIT License](LICENSE.md).

## Donate

You are welcome support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/atom-language-nsis) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`