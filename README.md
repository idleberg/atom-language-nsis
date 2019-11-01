# atom-language-nsis

[![apm](https://flat.badgen.net/apm/license/language-nsis)](https://atom.io/packages/language-nsis)
[![apm](https://flat.badgen.net/apm/v/language-nsis)](https://atom.io/packages/language-nsis)
[![apm](https://flat.badgen.net/apm/dl/language-nsis)](https://atom.io/packages/language-nsis)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/atom-language-nsis)](https://circleci.com/gh/idleberg/atom-language-nsis)
[![David](https://flat.badgen.net/david/dep/idleberg/atom-language-nsis)](https://david-dm.org/idleberg/atom-language-nsis)
[![Gitter](https://flat.badgen.net/badge/chat/on%20gitter/ff69b4)](https://gitter.im/NSIS-Dev/Atom)

Language syntax, auto-completions and build system for Nullsoft Scriptable Install System (NSIS), as well as language syntax for NSIS Language Files (NLF).

![Screenshot](https://raw.github.com/idleberg/atom-language-nsis/master/screenshot.gif)

*Screenshot of NSIS in Atom with [Fira Mono](http://mozilla.github.io/Fira/) font & the [Hopscotch](https://atom.io/themes/hopscotch) theme*

## Features

* syntax grammar for NSIS and NSIS Language Files (.nlf)
* auto-complete core NSIS commands, variables and predefines
* auto-complete core Plugins:
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
* auto-complete core libraries (“Useful Headers”):
    * FileFunc
    * LogicLib
    * Memento
    * Modern UI
    * MultiUser
    * Sections
    * StrFunc
    * WinMessages
    * WinVer
    * WordFunc
    * x64
* [Drunken NSIS](https://github.com/idleberg/atom-language-nsis#drunken-nsis)
* [Build Tools](https://github.com/idleberg/atom-language-nsis#building)
* [Linter](https://github.com/idleberg/atom-language-nsis#linting)

You can further extend this package with snippets for [third-party plug-ins](https://atom.io/packages/nsis-plugins).

## Installation

### apm

Install `language-nsis` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install language-nsis`

### Using Git

Change to your Atom packages directory:

```bash
# Windows
$ cd %USERPROFILE%\.atom\packages

# Linux & macOS
$ cd ~/.atom/packages/
```

Clone repository as `language-nsis`:

```bash
$ git clone https://github.com/idleberg/atom-language-nsis language-nsis
```

Inside the cloned directory, install dependencies using your preferred Node package manager:

```bash
$ yarn || npm install
```

### Package Dependencies

This package automatically installs third-party packages it depends on. You can prevent this by disabling the *Manage Dependencies* option in the package settings.

## Usage

### Completion

With most commands, you can specify available options before completion. For instance, rather than completing `RequestExecutionLevel` and then specifying an option, you can directly choose `RequestExecutionLevel user` from the completion menu.

To complete [compile time commands](http://nsis.sourceforge.net/Docs/Chapter5.html#), [variables](http://nsis.sourceforge.net/Docs/Chapter4.html#varother) or [predefines](http://nsis.sourceforge.net/Docs/Chapter5.html#comppredefines), make sure to *omit special characters* like `!`, `$` and brackets:

* `include` completes to `!include`
* `INSTDIR` completes to `$INSTDIR`
* `NSIS_VERSION` completes to `${NSIS_VERSION}`

However, you have to type `__LINE__` to complete to `${__LINE__}`.

There are several special cases for your convenience:

* `MB_OK` completes to `MessageBox MB_OK "messagebox_text"`
* `onInit` completes to a `Function .onInit` block
* `LogicLib` completes to `!include "LogicLib.nsh"`

#### Drunken NSIS

Fuzzy syntax completions are available through the “Drunken NSIS” snippets, which iron out some of the inconsistencies of the NSIS language, for instance word order.

**Example:**

* `FileRead` equals `ReadFile`
* `ReadINIStr` equals `INIStrRead`
* `SectionSetText` equals `SetSectionText`
* `LogSet` equals `SetLog`
* `FindFirst` equals `FirstFind`
* `${FindLine}` equals `${LineFind}`

### Building

There are many ways to compile NSIS scripts in Atom. But before you read on, make sure `makensis` is in your [PATH environmental variable](http://superuser.com/a/284351/195953).

As of recently, this package contains build system to compile your NSIS scripts. To trigger a build, select *“NSIS: Save & Compile”* from the [command-palette](https://atom.io/docs/latest/getting-started-atom-basics#command-palette) or use the keyboard shortcut.

If you prefer working with specific compiler arguments, you can specify them in the [package settings](https://flight-manual.atom.io/using-atom/sections/atom-packages/#package-settings). Optionally, you can also specify the path to `makensis`.

**Example:**

```cson
"language-nsis":
  compilerArguments: ["/WX", "/V3"]
  pathToMakensis: "/usr/local/bin/makensis"
```

#### Third-party Build Tools

Should you prefer working with an existing third-party build system, the following packages already have support for NSIS.

* [`build`](https://atom.io/packages/build) – requires additional provider (e.g. [`build-makensis`](https://atom.io/packages/build-makensis)), supports [`linter`](https://atom.io/packages/linter) package
* [`script`](https://atom.io/packages/script)
* [`atom-runner`](https://atom.io/packages/atom-runner)

Project files for `build` can be created by executing *“NSIS: Create .atom-build file”* from the [command-palette](https://atom.io/docs/latest/getting-started-atom-basics#command-palette) or using the keyboard shortcut. An equivalent for [building on Wine](https://atom.io/packages/build-makensis-wine) is also available. You can specify your preferred build file syntax (CSON/JSON/YAML) in the package settings.

You can set up `atom-runner` by executing *“NSIS: Set default runner”* from the [command-palette](https://atom.io/docs/latest/getting-started-atom-basics#command-palette) or packages menu. To remove it, use *“NSIS: Remove default runner”*.

### Linting

As of `v6.5.0`, a basic [Atom linter](https://github.com/idleberg/atom-linter-makensis/) provider for `makensis` is included. By default, NSIS documents get linted when opened or saved. Make sure to refer to the [`linter-makensis`](https://github.com/idleberg/atom-linter-makensis#settings) documentation to learn about available lint modes and other settings.

### Other Commands

There are several other, previously unmentioned commands available from the [command-palette](https://atom.io/docs/latest/getting-started-atom-basics#command-palette):

Command                              | Description
-------------------------------------|-------------------------------------
`NSIS: Look Up Command Online`       | Look up NSIS command online
`NSIS: Open Package Settings`        | Opens settings page
`NSIS: Satisfy Package Dependencies` | Install missing package dependencies
`NSIS: Show Version Info`            | Shows current version of NSIS
`NSIS: Show Compiler Flags`          | Shows output of `makensis /HDRINFO`
`NSIS: Convert Language File`        | Converts NLF to JSON and vice versa

## Related

- [node-makensis](https://www.npmjs.com/package/makensis) - Node wrapper for `makensis`
- [vscode-nsis](https://marketplace.visualstudio.com/items?itemName=idleberg.nsis) - NSIS package for Visual Studio Code

## License

This work is dual-licensed under [The MIT License](https://opensource.org/licenses/MIT) and the [GNU General Public License, version 2.0](https://opensource.org/licenses/GPL-2.0)

## Donate

You are welcome to support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/atom-language-nsis) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`
