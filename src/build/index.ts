import type { Disposable } from 'atom';
import { openPackageSettings } from '../makensis.ts';
import { compile } from './compile.ts';
import { showCompilerFlags, showCompilerVersion } from './info.ts';

/**
 * The build system: everything that shells out to `makensis` on demand, as
 * opposed to the language features the server provides.
 */
export function registerBuildCommands(): Disposable {
	return atom.commands.add('atom-workspace', {
		'NSIS:compile': async () => await compile(false),
		'NSIS:compile-strict': async () => await compile(true),
		'NSIS:show-version': async () => await showCompilerVersion(),
		'NSIS:show-compiler-flags': async () => await showCompilerFlags(),
		'NSIS:open-package-settings': async () => await openPackageSettings(),
	});
}
