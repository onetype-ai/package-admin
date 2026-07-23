admin.Fn('do.code.tokenize', function(code, language)
{
    const grammars = {
        js: {
            keywords: new RegExp('\\b(' + [
                'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
                'switch', 'case', 'break', 'continue', 'new', 'class', 'extends', 'super', 'this',
                'typeof', 'instanceof', 'in', 'of', 'try', 'catch', 'finally', 'throw', 'async',
                'await', 'import', 'from', 'export', 'default', 'null', 'undefined', 'true', 'false',
                'void', 'delete', 'yield', 'static'
            ].join('|') + ')\\b', 'g'),
            comment: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g,
            string: /(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|&quot;(?:(?!&quot;)[^\\]|\\.)*&quot;)/g,
            number: /\b(\d+(\.\d+)?)\b/g,
            fn: /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g
        },
        css: {
            comment: /(\/\*[\s\S]*?\*\/)/g,
            string: /(&quot;(?:(?!&quot;)[^\\]|\\.)*&quot;|'(?:[^'\\]|\\.)*')/g,
            selector: /([.#]?[a-zA-Z_-][\w-]*(?:\s*[>+~]\s*[.#]?[a-zA-Z_-][\w-]*)*)(?=\s*\{)/g,
            prop: /([a-zA-Z-]+)(?=\s*:)/g,
            number: /\b(\d+(\.\d+)?(px|em|rem|vh|vw|%|s|ms)?)\b/g
        },
        html: {
            comment: /(&lt;!--[\s\S]*?--&gt;)/g,
            tag: /(&lt;\/?)([a-zA-Z][\w-]*)/g,
            attr: /(\s)([a-zA-Z-:@_.]+)(?==)/g,
            string: /(=)(&quot;[^&]*&quot;|'[^']*')/g
        },
        curl: {
            comment: /(#[^\n]*)/g,
            string: /(&quot;(?:(?!&quot;)[^\\]|\\.)*&quot;|'(?:[^'\\]|\\.)*')/g,
            url: /(https?:\/\/[^\s'&]+)/g,
            method: /(-X\s+)(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)/g,
            variable: /(\$\w+|\$\{[^}]+\})/g,
            flag: /(\s)(-{1,2}[\w-]+)/g,
            command: /^(\s*)(curl|http|wget)\b/gm
        }
    };

    const escape = (text) =>
    {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    };

    const alphabet = 'abcdefghij';

    const toKey = (value) =>
    {
        return String(value).split('').map((digit) => alphabet[parseInt(digit)]).join('');
    };

    const fromKey = (key) =>
    {
        return parseInt(key.split('').map((letter) => alphabet.indexOf(letter)).join(''));
    };

    const stash = (placeholders, html) =>
    {
        const index = placeholders.length;

        placeholders.push(html);

        return String.fromCharCode(1) + toKey(index) + String.fromCharCode(2);
    };

    const unstash = (text, placeholders) =>
    {
        const marker = new RegExp(String.fromCharCode(1) + '([a-j]+)' + String.fromCharCode(2), 'g');

        return text.replace(marker, (match, key) => placeholders[fromKey(key)]);
    };

    const tokenizeJs = (text) =>
    {
        const placeholders = [];
        const grammar = grammars.js;

        text = text.replace(grammar.comment, (match) => stash(placeholders, '<span class="t-comment">' + match + '</span>'));
        text = text.replace(grammar.string, (match) => stash(placeholders, '<span class="t-string">' + match + '</span>'));
        text = text.replace(grammar.keywords, '<span class="t-keyword">$1</span>');
        text = text.replace(grammar.number, '<span class="t-number">$1</span>');
        text = text.replace(grammar.fn, '<span class="t-fn">$1</span>');

        return unstash(text, placeholders);
    };

    const tokenizeCss = (text) =>
    {
        const placeholders = [];
        const grammar = grammars.css;

        text = text.replace(grammar.comment, (match) => stash(placeholders, '<span class="t-comment">' + match + '</span>'));
        text = text.replace(grammar.string, (match) => stash(placeholders, '<span class="t-string">' + match + '</span>'));
        text = text.replace(grammar.selector, (match) => stash(placeholders, '<span class="t-fn">' + match + '</span>'));
        text = text.replace(grammar.prop, '<span class="t-keyword">$1</span>');
        text = text.replace(grammar.number, '<span class="t-number">$1</span>');

        return unstash(text, placeholders);
    };

    const tokenizeHtml = (text) =>
    {
        const placeholders = [];
        const grammar = grammars.html;

        text = text.replace(grammar.comment, (match) => stash(placeholders, '<span class="t-comment">' + match + '</span>'));
        text = text.replace(grammar.string, (match, equals, value) => equals + stash(placeholders, '<span class="t-string">' + value + '</span>'));
        text = text.replace(grammar.attr, '$1<span class="t-fn">$2</span>');
        text = text.replace(grammar.tag, '$1<span class="t-keyword">$2</span>');

        return unstash(text, placeholders);
    };

    const tokenizeCurl = (text) =>
    {
        const placeholders = [];
        const grammar = grammars.curl;

        text = text.replace(grammar.comment, (match) => stash(placeholders, '<span class="t-comment">' + match + '</span>'));
        text = text.replace(grammar.string, (match) => stash(placeholders, '<span class="t-string">' + match + '</span>'));
        text = text.replace(grammar.url, (match) => stash(placeholders, '<span class="t-url">' + match + '</span>'));
        text = text.replace(grammar.method, (match, flag, method) => flag + stash(placeholders, '<span class="t-number">' + method + '</span>'));
        text = text.replace(grammar.variable, '<span class="t-number">$1</span>');
        text = text.replace(grammar.flag, '$1<span class="t-fn">$2</span>');
        text = text.replace(grammar.command, '$1<span class="t-keyword">$2</span>');

        return unstash(text, placeholders);
    };

    const escaped = escape(code);

    const map = {
        js: tokenizeJs,
        html: tokenizeHtml,
        css: tokenizeCss,
        curl: tokenizeCurl
    };

    const handler = map[language];

    return handler ? handler(escaped) : escaped;
});
