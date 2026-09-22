import { parse, stringify } from '@nsis/nlf';
import { getConfig } from './config.ts';

/**
 * `stringify` accepts JSON5, so every JSON dialect Pulsar ships a grammar for is
 * valid input.
 */
const JSON_SCOPES = ['source.json', 'source.json.jsonc', 'source.json5'];

/**
 * Converts the active document between the NSIS language file format and JSON,
 * in whichever direction its grammar implies.
 *
 * The result opens in a new editor rather than replacing the original, so a
 * conversion that is not what was wanted costs nothing to discard.
 */
export async function convertLanguageFile(): Promise<void> {
	const editor = atom.workspace.getActiveTextEditor();
	const scopeName = editor?.getGrammar().scopeName;
	const toJson = scopeName === 'source.nlf';

	if (!editor || (!toJson && !JSON_SCOPES.includes(scopeName ?? ''))) {
		atom.notifications.addError('Open an NSIS language file or a JSON document to convert');

		return;
	}

	const text = editor.getText();

	if (!text.trim()) {
		atom.notifications.addError('The document is empty');

		return;
	}

	let content: string;

	try {
		content = toJson ? JSON.stringify(parse(text), null, 2) : stringify(text, getStringifierOptions());
	} catch (error) {
		// The parser reports the offending line, so the message is worth showing
		// rather than pointing at a console the user has to go find.
		console.error('[language-nsis-lsp]', error);

		atom.notifications.addError('Conversion failed', {
			description: error instanceof Error ? error.message : String(error),
			dismissable: true,
		});

		return;
	}

	// No URI, so Pulsar opens an empty editor rather than looking for an opener.
	const converted = await atom.workspace.open();

	converted.setText(content);
	atom.grammars.assignLanguageMode(converted.getBuffer(), toJson ? 'source.json' : 'source.nlf');
}

/**
 * Language files are consumed by `makensis` on Windows, so the line endings are
 * worth being deliberate about. `(auto)` is left to the library, which picks by
 * platform.
 */
function getStringifierOptions(): { eol?: 'crlf' | 'lf' } {
	const endOfLine = getConfig<string>('formatter.endOfLine', '(auto)');

	return endOfLine === 'crlf' || endOfLine === 'lf' ? { eol: endOfLine } : {};
}
