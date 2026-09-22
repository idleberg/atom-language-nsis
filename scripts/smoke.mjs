// Loads the built package with a stubbed `atom` global and asserts the module
// contract Pulsar relies on: the settings schema, every provided/consumed
// service named in package.json, the snake_case mapping, that menus and keymaps
// only name commands the package registers, that the snippets parse, and that
// the server binary resolves out of the platform package.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import Module, { createRequire } from 'node:module';
import { join } from 'node:path';

// `atom-languageclient` requires the `atom` module, which only exists inside the
// editor, so it is stubbed with the few classes it destructures at load time.
const stubs = {
	atom: { Point: class {}, Range: class {}, Disposable: class {}, CompositeDisposable: class {} },
	electron: { shell: {} },
};

const load = Module._load;
Module._load = (request, ...rest) => (request in stubs ? stubs[request] : load(request, ...rest));

const config = {};

globalThis.atom = {
	config: {
		get: (key) => (key === 'language-nsis-lsp' ? config : undefined),
		observe: () => ({ dispose() {} }),
	},
	inDevMode: () => false,
	inSpecMode: () => false,
	notifications: { addError() {} },
	packages: { getLoadedPackage: () => null },
	project: { getPaths: () => [] },
};

const require = createRequire(import.meta.url);
const pkg = require('../package.json');
const main = require('../lib/main.cjs');

assert.ok(main.config.serverPath, 'the settings schema is exposed');

// `zadeh` is overridden with a pure-JS shim, since the native module has no
// darwin-arm64 prebuild. `atom-languageclient` filters completions through it.
const { ObjectArrayFilterer } = require('../shims/zadeh/index.js');
const filterer = new ObjectArrayFilterer(
	[{ filterText: 'WriteRegStr' }, { filterText: 'WriteUninstaller' }, { filterText: 'nsExec::Exec' }],
	'filterText',
);

assert.deepEqual(
	filterer.filter('wr').map(({ filterText }) => filterText),
	['WriteRegStr', 'WriteUninstaller'],
);
assert.deepEqual(filterer.filter('zzz'), []);
assert.equal(filterer.filter('').length, 3);

for (const services of [pkg.providedServices, pkg.consumedServices]) {
	for (const [name, { versions }] of Object.entries(services)) {
		for (const method of Object.values(versions)) {
			assert.equal(typeof main[method], 'function', `${name} -> ${method}() is on the module`);
		}
	}
}

// Menus and keymaps that name a command nobody registers are silently dead, so
// both are checked against the commands the package activates on. This is how
// `language-nsis` shipped a menu entry for `NSIS:satisfy-package-dependencies`
// and a Windows keybinding for `NSIS:create-.atom–build-file`, neither of which
// existed.
const commands = new Set(pkg.activationCommands['atom-workspace']);
const menus = require('../menus/nsis.json');
const keymaps = require('../keymaps/nsis.json');

for (const [source, command] of [
	...collectMenuCommands(menus.menu).map((command) => ['menus/nsis.json', command]),
	...Object.values(menus['context-menu'] ?? {}).flatMap((items) =>
		items.map(({ command }) => ['menus/nsis.json (context)', command]),
	),
	...Object.values(keymaps).flatMap((bindings) =>
		Object.values(bindings).map((command) => ['keymaps/nsis.json', command]),
	),
]) {
	assert.ok(commands.has(command), `${source} -> ${command} is an activation command`);
}

function collectMenuCommands(items) {
	return items.flatMap((item) => (item.submenu ? collectMenuCommands(item.submenu) : (item.command ?? [])));
}

// Every migration has to land on a setting that exists — a typo would write a
// key nothing reads, and the value would look migrated while doing nothing.
const { MIGRATIONS, DROPPED } = await import('../src/migrations.mts');

for (const { to } of MIGRATIONS) {
	const schema = to
		.split('.')
		.reduce((node, key) => node?.properties?.[key] ?? node?.[key], { properties: main.config });

	assert.ok(schema?.type, `${to} is in the settings schema`);
}

assert.deepEqual(
	MIGRATIONS.filter(({ from }) => DROPPED.includes(from)),
	[],
	'no setting is both migrated and dropped',
);

// The revaluing maps carry the old package's types into the new ones.
const mapped = (from, value) => MIGRATIONS.find((migration) => migration.from === from).map(value);

assert.equal(mapped('compilerOptions.pathToMakensis', 'makensis'), '');
assert.equal(mapped('compilerOptions.pathToMakensis', '/opt/nsis/makensis'), '/opt/nsis/makensis');
assert.equal(mapped('compilerOptions.verbosity', -1), '(default)');
assert.equal(mapped('compilerOptions.verbosity', 0), '0');
assert.equal(mapped('compilerOptions.verbosity', 9), undefined);
assert.deepEqual(mapped('compilerOptions.customArguments', '  -DA=1   -DB=2 '), ['-DA=1', '-DB=2']);
assert.equal(mapped('compilerOptions.customArguments', '   '), undefined);
assert.equal(mapped('alwaysShowOutput', true), 'Always');
assert.equal(mapped('alwaysShowOutput', false), 'On Errors');
assert.equal(mapped('compilerOutput', 'notification'), true);
assert.equal(mapped('compilerOutput', 'console'), false);

// Snippets are pure data, and a file that fails to parse takes the whole
// snippet package down with it.
for (const file of readdirSync(join(import.meta.dirname, '..', 'snippets')).filter((name) => name.endsWith('.json'))) {
	const snippets = require(`../snippets/${file}`);
	const [selector] = Object.keys(snippets);

	assert.match(selector, /^\.(source|text)\./, `snippets/${file} is keyed by a scope selector`);
}

assert.deepEqual(main.mapConfigurationObject({}), {
	diagnostics: { enabled_on_save: true, preprocess_mode: 'ppo' },
	formatter: {
		comment_style: null,
		end_of_line: null,
		print_width: 0,
		single_quote: false,
		trim_empty_lines: true,
	},
	makensis: { path: '' },
});

assert.deepEqual(
	main.mapConfigurationObject({
		diagnostics: { enabledOnSave: false, preprocessMode: 'none' },
		formatter: { commentStyle: 'hash', endOfLine: 'crlf', printWidth: 80, singleQuote: true, trimEmptyLines: false },
		makensis: { path: '/usr/local/bin/makensis' },
	}),
	{
		diagnostics: { enabled_on_save: false, preprocess_mode: null },
		formatter: {
			comment_style: 'hash',
			end_of_line: 'crlf',
			print_width: 80,
			single_quote: true,
			trim_empty_lines: false,
		},
		makensis: { path: '/usr/local/bin/makensis' },
	},
);

// The resolution ladder itself needs a runnable binary, which the sandbox denies
// under the repo path, so only the platform-package step is checked here.
const platform = `@nsis/lsp-${process.platform}-${process.arch}`;
const binary = join(
	require.resolve(`${platform}/package.json`, { paths: [join(import.meta.dirname, '..', 'lib')] }),
	'..',
	process.platform === 'win32' ? 'nsis-lsp.exe' : 'nsis-lsp',
);

assert.match(execFileSync(binary, ['--version'], { encoding: 'utf8' }), /nsis-lsp/i);

console.log(`OK: module contract, commands, snippets, settings mapping, and ${binary}`);
