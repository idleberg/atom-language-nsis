import { defineConfig } from 'tsdown';

export default defineConfig({
	bundle: true,
	clean: true,
	entry: ['src/main.ts'],
	external: ['atom', 'electron'],
	format: 'cjs',
	minify: true,
	outDir: 'lib',
	platform: 'node',
	target: 'node14',
	treeshake: true,
});
