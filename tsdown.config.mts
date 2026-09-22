import { defineConfig } from 'tsdown';

export default defineConfig({
	clean: true,
	deps: {
		// `makensis` and `@nsis/nlf` are ESM-only, and Pulsar loads this package
		// with `require`, so they have to come along in the bundle.
		alwaysBundle: ['atom-package-deps', 'makensis', '@nsis/nlf'],
		// `atom-languageclient` reaches into Atom's own module registry, so it stays
		// external and is resolved from `node_modules` at runtime.
		neverBundle: ['atom', 'electron', 'atom-languageclient'],
		onlyBundle: false,
	},
	entry: ['src/main.ts'],
	format: 'cjs',
	minify: true,
	nodeProtocol: 'strip',
	outDir: 'lib',
	platform: 'node',
	target: 'node20',
	treeshake: true,
});
