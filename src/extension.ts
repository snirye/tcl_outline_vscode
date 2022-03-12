import * as vscode from 'vscode';

import { TclDocumentSymbolProvider } from './documentSymbolProvider';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.languages.registerDocumentSymbolProvider(
			[
				{ language: 'tcl' },
			],
			new TclDocumentSymbolProvider()
		)
	);
}

export function deactivate() {
}