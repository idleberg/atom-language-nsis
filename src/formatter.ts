import { createFormatter, type DentOptions } from '@nsis/dent';
import type { TextEditor } from 'atom';
import Config from './config';

function getFormatterOptions(): DentOptions {
	const options: DentOptions = {};

	const endOfLine = String(Config.get('formatter.endOfLine'));

	if (endOfLine === 'lf' || endOfLine === 'crlf') {
		options.endOfLines = endOfLine;
	}

	options.trimEmptyLines = Boolean(Config.get('formatter.trimLines'));
	options.useTabs = Boolean(Config.get('formatter.useTabs'));

	const indentSize = Number(Config.get('formatter.indentSize'));

	if (indentSize > 0) {
		options.indentSize = indentSize;
	}

	return options;
}

export function formatDocument(): void {
	const editor = atom.workspace.getActiveTextEditor();

	if (!editor) {
		atom.beep();
		return;
	}

	if (editor.getGrammar().scopeName !== 'source.nsis') {
		atom.beep();
		return;
	}

	applyFormatter(editor);
}

export function applyFormatter(editor: TextEditor): void {
	const format = createFormatter(getFormatterOptions());
	const text = editor.getText();
	const formatted = format(text);

	if (formatted !== text) {
		editor.setText(formatted);
	}
}

export function isNsisEditor(editor: TextEditor): boolean {
	return editor.getGrammar().scopeName === 'source.nsis';
}
