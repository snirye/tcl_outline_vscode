
import * as vscode from 'vscode';

/* respect https://github.com/Gimly/vscode-fortran/blob/229cddce53a2ea0b93032619efeef26376cd0d2c/src/documentSymbolProvider.ts
           https://github.com/Microsoft/vscode/blob/34ba2e2fbfd196e2d6db5a4db0e42d03a97c655e/extensions/markdown-language-features/src/features/documentLinkProvider.ts
           https://github.com/hitode909/vscode-perl-outline
           */
export class TclDocumentSymbolProvider implements vscode.DocumentSymbolProvider {

    public provideDocumentSymbols(
        document: vscode.TextDocument,
        token: vscode.CancellationToken): vscode.SymbolInformation[] {

        const tokenToKind = this.tokenToKind;

        const text = document.getText();
        const matchedList = this.matchAll(this.pattern, text);

        return matchedList.map((matched) => {
            const type = matched[1].trim();
            const name = matched[2];
            const kind = tokenToKind[type];
            
            // TODO: add ending and begining of symbol
            const position = document.positionAt(matched.index || 0);
            // console.log(position);

            return new vscode.SymbolInformation(
                name,
                kind,
                '',
                new vscode.Location(document.uri, position)
            );
        });
    }

    private get tokenToKind(): { [name: string]: vscode.SymbolKind; } {
        // console.log(name);
        return {
            'namespace eval' : vscode.SymbolKind.Class,
            'proc' : vscode.SymbolKind.Function,
            'itcl::body' : vscode.SymbolKind.Function,
        };
    }

    // TODO: replace with better regexp
    private get pattern() {
        return /(^[ \t]*namespace eval|^[ \t]*proc|^[ \t]*itcl::body)\b +([^ ;\n'"{]+|(['"].+['"])+)/gm;
    } 

    private matchAll( pattern: RegExp, text: string): Array<RegExpMatchArray> {
        const out: RegExpMatchArray[] = [];
        pattern.lastIndex = 0;
        let match: RegExpMatchArray | null;
        while ((match = pattern.exec(text))) {
            out.push(match);
        }
        return out;
    }
}