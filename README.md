# atom-language-nsis

[![License](https://img.shields.io/github/license/idleberg/atom-language-nsis?color=blue&style=for-the-badge)](https://github.com/idleberg/atom-language-nsis/blob/master/LICENSE)
[![Release](https://img.shields.io/github/v/release/idleberg/atom-language-nsis?style=for-the-badge)](https://github.com/idleberg/atom-language-nsis/releases)
[![Downloads](https://img.shields.io/pulsar/dt/language-nsis?style=for-the-badge&color=slateblue)](https://web.pulsar-edit.dev/packages/language-nsis)
[![CI](https://img.shields.io/github/actions/workflow/status/idleberg/atom-language-nsis/default.yml?style=for-the-badge)](https://github.com/idleberg/atom-language-nsis/actions)

Language syntax, auto-completions and build system for Nullsoft Scriptable Install System (NSIS), as well as language syntax for NSIS Language Files.

![Screenshot](https://raw.github.com/idleberg/atom-language-nsis/master/resources/screenshot.gif)

_Screenshot of NSIS with [Fira Mono](http://mozilla.github.io/Fira/) font & the [Hopscotch](https://web.pulsar-edit.dev/packages/hopscotch) theme_

## Features

- syntax grammar for NSIS and NSIS Language Files (.nlf)
- auto-complete core NSIS commands, variables and predefines
- auto-complete core Plugins:
  - AdvSplash
  - Banner
  - BgImage
  - Dialer
  - InstallOptions
  - LangDLL
  - Math
  - nsDialogs
  - nsExec
  - NSISdl
  - Splash
  - StartMenu
  - System
  - UserInfo
  - VPatch
- auto-complete core libraries (“Useful Headers”):
  - FileFunc
  - LogicLib
  - Memento
  - Modern UI
  - MultiUser
  - Sections
  - StrFunc
  - WinMessages
  - WinVer
  - WordFunc
  - x64
- [Drunken NSIS](#drunken-nsis)
- [Build Tools](#building)
- [Linting](#linting)
- [Environment Variables](#environment-variables)

You can further extend this package with snippets for [third-party plug-ins](https://web.pulsar-edit.dev/packages/nsis-plugins).

## Installation

### Package Manager

Install `language-nsis` from the editor's [Package Manager](http://flight-manual.atom-editor.cc/using-atom/sections/atom-packages/) or the command-line equivalent:

`bash
$ ppm install language-nsis

````

### Using Git

Change to your Atom packages directory:

**Windows**

```powershell
# Powershell
$ cd $Env:USERPROFILE\.pulsar\packages
````

```cmd
:: Command Prompt
$ cd %USERPROFILE%\.pulsar\packages
```

**Linux & macOS**

```bash
$ cd ~/.atom/packages/
```

Clone repository as `language-nsis`:

```bash
$ git clone https://github.com/idleberg/atom-language-nsis language-nsis
```

Inside the cloned directory, install its dependencies:

```bash
$ ppm ci
```

Build the source:

```bash
$ ppm run build
```

### Package Dependencies

This package automatically installs third-party packages it depends on. You can prevent this by disabling the _Manage Dependencies_ option in the package settings.

## Usage

### Completion

With most commands, you can specify available options before completion. For instance, rather than completing `RequestExecutionLevel` and then specifying an option, you can directly choose `RequestExecutionLevel user` from the completion menu.

To complete [compile time commands](http://nsis.sourceforge.net/Docs/Chapter5.html#), [variables](http://nsis.sourceforge.net/Docs/Chapter4.html#varother) or [predefines](http://nsis.sourceforge.net/Docs/Chapter5.html#comppredefines), make sure to _omit special characters_ like `!`, `$` and brackets:

- `include` completes to `!include`
- `INSTDIR` completes to `$INSTDIR`
- `NSIS_VERSION` completes to `${NSIS_VERSION}`

However, you have to type `__LINE__` to complete to `${__LINE__}`.

There are several special cases for your convenience:

- `MB_OK` completes to `MessageBox MB_OK "messagebox_text"`
- `onInit` completes to a `Function .onInit` block
- `LogicLib` completes to `!include "LogicLib.nsh"`

#### Drunken NSIS

Fuzzy syntax completions are available through the “Drunken NSIS” snippets, which iron out some of the inconsistencies of the NSIS language, for instance word order.

**Example:**

- `FileRead` equals `ReadFile`
- `ReadINIStr` equals `INIStrRead`
- `SectionSetText` equals `SetSectionText`
- `LogSet` equals `SetLog`
- `FindFirst` equals `FirstFind`
- `${FindLine}` equals `${LineFind}`

### Building

There are many ways to compile NSIS scripts in Atom. But before you read on, make sure `makensis` is in your [PATH environment variable](http://superuser.com/a/284351/195953).

This package contains a build system to compile your NSIS scripts. To trigger a build, select _“NSIS: Save & Compile”_ from the [command-palette](https://atom-editor.cc/docs/latest/getting-started-atom-basics#command-palette) or use the keyboard shortcut.

If you prefer working with custom compiler arguments, you can specify them in the [package settings](https://flight-manual.atom-editor.cc/using-atom/sections/atom-packages/#package-settings). Optionally, you can also specify the path to `makensis`.

#### Third-party Build Tools

Should you prefer working with an existing third-party build system, the following packages already have support for NSIS.

- [`build-makensis`](https://web.pulsar-edit.dev/packages/build-makensis)
- [`script`](https://web.pulsar-edit.dev/packages/script)
- [`atom-runner`](https://web.pulsar-edit.dev/packages/atom-runner)

Project files for `build-makensis` can be created by executing _“NSIS: Create .atom-build file”_ from the [command-palette](https://atom-editor.cc/docs/latest/getting-started-atom-basics#command-palette) or using the keyboard shortcut. You can specify your preferred build file syntax (JSON/YAML) in the package settings.

You can set up `atom-runner` by executing _“NSIS: Set default runner”_ from the [command-palette](https://atom-editor.cc/docs/latest/getting-started-atom-basics#command-palette) or packages menu. To remove it, use _“NSIS: Remove default runner”_.

### Linting

This package will install an [Atom linter](https://github.com/idleberg/atom-linter-makensis/) provider for `makensis`. By default, NSIS documents get linted when opened or saved. Make sure to refer to the [`linter-makensis`](https://github.com/idleberg/atom-linter-makensis#settings) documentation to learn about available lint modes and other settings.

### Other Commands

There are several other, previously unmentioned commands available from the [command-palette](https://atom-editor.cc/docs/latest/getting-started-atom-basics#command-palette):

| Command                       | Description                         |
| ----------------------------- | ----------------------------------- |
| `NSIS: Command Reference`     | Look up NSIS command online         |
| `NSIS: Open Package Settings` | Opens settings page                 |
| `NSIS: Show Version Info`     | Shows current version of NSIS       |
| `NSIS: Show Compiler Flags`   | Shows output of `makensis /HDRINFO` |
| `NSIS: Convert Language File` | Converts NLF to JSON and vice versa |

### Environment Variables

This extension supports a variety of ways to provide environment variables such as `NSISDIR` or `NSISCONFDIR`. The following precedence applies:

1. `.env` files
2. system-wide environment variables

**Note:** Some operating systems require the editor to be launched from terminal in order to access system-wide environment variables.

Additionally, you can pass special environment variables prefixed with `NSIS_APP_` as definitions to your installer script.

<details>
<summary><strong>Example</strong></summary>

```env
# .env
NSIS_APP_ENVIRONMENT=development
```

```nsis
# installer.nsi
!if ${NSIS_APP_ENVIRONMENT} == "development"
  DetailPrint "Valuable Debug Information"
!endif
```

</details>

## Related

- [node-makensis](https://www.npmjs.com/package/makensis) - Node wrapper for `makensis`
- [vscode-nsis](https://marketplace.visualstudio.com/items?itemName=idleberg.nsis) - NSIS package for Visual Studio Code

## License

This work is dual-licensed under [The MIT License](https://opensource.org/licenses/MIT).
