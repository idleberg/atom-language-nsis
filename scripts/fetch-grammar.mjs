// Copies the tree-sitter parser and its queries out of the `tree-sitter-nsis`
// package into the gitignored `grammars/tree-sitter/`, which is what
// `modern-tree-sitter-nsis.cson` points at. One pinned version, no second copy
// checked in to drift.
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The queries use Rust's inline `(?i)` flag, which `RegExp` rejects ("Invalid
// group"), taking the whole query down with it and leaving the editor unhighlighted.
// Electron 30 predates the `(?i:…)` modifier syntax, so the flag is dropped and
// every letter of the pattern folded to a character class instead.
function foldCaseInsensitiveFlags(query) {
	return query.replaceAll(/"[^"]*\(\?i\)[^"]*"/g, (pattern) =>
		pattern
			.replaceAll('(?i)', '')
			.replaceAll(/[a-zA-Z]/g, (letter) => `[${letter.toLowerCase()}${letter.toUpperCase()}]`),
	);
}

// `tree-sitter-nsis` only exports `./wasm`, so the queries are found relative to it.
const wasm = fileURLToPath(import.meta.resolve('tree-sitter-nsis/wasm'));
const source = dirname(wasm);
const target = join(import.meta.dirname, '..', 'grammars', 'tree-sitter');

await mkdir(target, { recursive: true });
await cp(wasm, join(target, 'tree-sitter-nsis.wasm'));

await mkdir(join(target, 'queries'), { recursive: true });

for (const query of ['folds', 'highlights', 'indents']) {
	const scm = await readFile(join(source, 'queries', `${query}.scm`), 'utf8');
	await writeFile(join(target, 'queries', `${query}.scm`), foldCaseInsensitiveFlags(scm));
}

console.log(`Copied the tree-sitter grammar from ${source}`);
