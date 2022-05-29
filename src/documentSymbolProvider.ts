
import * as vscode from 'vscode';

/* respect https://github.com/Gimly/vscode-fortran/blob/229cddce53a2ea0b93032619efeef26376cd0d2c/src/documentSymbolProvider.ts
           https://github.com/Microsoft/vscode/blob/34ba2e2fbfd196e2d6db5a4db0e42d03a97c655e/extensions/markdown-language-features/src/features/documentLinkProvider.ts
           https://github.com/hitode909/vscode-perl-outline
           */

function findClosingBracket(str: string|undefined, pos: number) {
    if (str === undefined) {
        return -1;
    }
    const rExp = /\{|\}/gm;
    rExp.lastIndex = pos + 1;
    var deep = 1;
    var regexReturn:RegExpExecArray|null;
    while ((regexReturn = rExp.exec(str))) {
        if (!(deep += str[regexReturn.index] === "{" ? 1 : -1)) { 
            return regexReturn.index; 
        }
    }
}

type codeBlock = {
    startPos : number;
    endPos : number;
    type : string;
    name : string;
};


export class TclDocumentSymbolProvider implements vscode.DocumentSymbolProvider {

    public provideDocumentSymbols(
        document: vscode.TextDocument,
        token: vscode.CancellationToken): vscode.SymbolInformation[] {

        const tokenToKind = this.tokenToKind;

        const text = document.getText();
        const matchedList = this.matchAll(this.pattern, text);


        return matchedList.map((cb) => {
            const type = cb.type;
            const name = cb.name;
            const kind = tokenToKind[type];
            
            // TODO: add ending and begining of symbol
            // var position = document.positionAt(matched.index || 0);

            
            var pos1=document.positionAt(cb.startPos);
            var pos2=document.positionAt(cb.endPos);
            var range1=new vscode.Range(pos1,pos2);
            return new vscode.SymbolInformation(
                name,
                kind,
                '',
                new vscode.Location(document.uri, range1)
            );
        });
    }

    private get tokenToKind(): { [name: string]: vscode.SymbolKind; } {
        // console.log(name);
        return {
            'namespace eval' : vscode.SymbolKind.Class,
            'proc' : vscode.SymbolKind.Function,
            'itcl::body' : vscode.SymbolKind.Function,
            '::itcl::body' : vscode.SymbolKind.Function,
        };
    }

    // TODO: replace with better regexp
    private get pattern() {
        // return /^[ \t]*(namespace eval|proc|itcl::body)\b +([^ ;\n'"{]+|(['"].+['"])+)/gm;
        // first we have one of namespace eval|proc|(::)?itcl::body,
        // the args can be a word (\w+), or list ({( *\w+( +\w+)*)?}) or list of lists (({\w+ \w+}( +{\w+ \w+})*)?) (default values)
        // this way lat index will be just before the body block
        var keyword="(proc|(::)?itcl::body)";
        var space= " +";
        var name="([\\w:]+)";
        var args="(\\w+|{ *(\\w+( +\\w+)*)?( +{\\w+ \\S+}( +{\\w+ \\S+})*)? *})";
        var total="^[ \\t]*"+keyword+space+name+space+args+space+"{";
        var pattern :RegExp = RegExp(total,"gm");
        return pattern;
    } 



    private matchAll( pattern: RegExp, text: string): Array<codeBlock> {
        const out: codeBlock[]=[];
        pattern.lastIndex = 0;
        let match: RegExpMatchArray | null;
        while ((match = pattern.exec(text))) {
            console.log(match);
            // find matching parenthsis of body block
            var str=match.input;
            var pos=pattern.lastIndex - 1;
            var blockEnd=findClosingBracket(str,pos);
            var startIndex = match.index;
            var type = match[1].trim();
            var name = match[3];

            if (typeof blockEnd === "undefined" || typeof startIndex === "undefined") {
                continue;
            }

            out.push( {
                startPos : startIndex,
                endPos : blockEnd,
                type : type,
                name : name,
            }
            );
        }
        return out;
    }
}