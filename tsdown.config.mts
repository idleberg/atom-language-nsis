import { defineConfig } from 'tsdown';

export default defineConfig({
	clean: true,
	entry: ['src/main.ts'],
	external: ['atom', 'electron'],
	format: 'cjs',
	inlineOnly: false,
	minify: true,
	nodeProtocol: 'strip',
	noExternal: ['@atxm/developer-console', '@nsis/dent', '@nsis/nlf', 'atom-select-list', 'execa', 'makensis', 'open'],
	outDir: 'lib',
	platform: 'node',
	target: 'node14',
	treeshake: true,
});
