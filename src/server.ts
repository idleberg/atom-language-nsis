import { execFile } from 'node:child_process';
import { dirname, isAbsolute, join } from 'node:path';
import { promisify } from 'node:util';
import { PACKAGE_NAME } from './config.ts';
import { findOnPath, locate } from './util.ts';

const execFileAsync = promisify(execFile);

export const BINARY_NAME = process.platform === 'win32' ? 'nsis-lsp.exe' : 'nsis-lsp';

export type ServerSource = 'setting' | 'environment' | 'package' | 'path';

export type ServerBinary = {
	path: string;
	source: ServerSource;
	version: string;
};

/**
 * Resolves the server binary, in descending order of precedence: the
 * `serverPath` setting, the `NSIS_LSP_BINARY` environment variable, the
 * `@nsis/lsp-*` package npm installed for this platform, and finally the `PATH`.
 *
 * Each candidate is probed with `--version` before it is accepted, so a stale
 * setting — or a platform package npm picked wrongly, which is what happens on
 * musl, since ppm's npm honours `os`/`cpu` but not `libc` — falls through to the
 * next candidate instead of failing the spawn with an opaque error.
 */
export async function resolveServer(): Promise<ServerBinary | undefined> {
	for (const [source, candidate] of candidates()) {
		if (!candidate) {
			continue;
		}

		const version = await probe(candidate);

		if (version) {
			return { path: candidate, source, version };
		}
	}

	return undefined;
}

function* candidates(): Generator<[ServerSource, string | undefined]> {
	const configured = (atom.config.get(`${PACKAGE_NAME}.serverPath`) ?? '').trim();

	yield ['setting', configured.length ? locate(configured) : undefined];
	yield ['environment', process.env.NSIS_LSP_BINARY ? locate(process.env.NSIS_LSP_BINARY) : undefined];
	yield ['package', fromPlatformPackage()];
	yield ['path', findOnPath(BINARY_NAME)];
}

/**
 * The binary inside `@nsis/lsp-<platform>-<arch>`, resolved directly rather than
 * through `@nsis/lsp`'s `bin/nsis-lsp`, which is a Node wrapper around the same
 * file and would put an extra process in the chain.
 */
function fromPlatformPackage(): string | undefined {
	const name = `@nsis/lsp-${process.platform}-${process.arch}`;

	try {
		return join(dirname(require.resolve(`${name}/package.json`)), BINARY_NAME);
	} catch {
		// Not installed for this platform — `PATH` is the fallback.
		return undefined;
	}
}

async function probe(binaryPath: string): Promise<string | undefined> {
	if (!isAbsolute(binaryPath)) {
		return undefined;
	}

	try {
		const { stdout } = await execFileAsync(binaryPath, ['--version'], { timeout: 5000 });

		return stdout.trim();
	} catch {
		return undefined;
	}
}
