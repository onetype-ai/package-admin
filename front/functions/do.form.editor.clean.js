admin.Fn('do.form.editor.clean', function(scope)
{
    const allowed = {
        P: [], H2: [], H3: [], H4: [],
        STRONG: [], U: [], S: [],
        A: ['href'], UL: [], OL: [], LI: [],
        BLOCKQUOTE: [], CODE: [],
        TABLE: [], THEAD: [], TBODY: [], TR: [], TH: ['colspan', 'rowspan'], TD: ['colspan', 'rowspan'],
        BR: [], HR: [], IMG: ['src', 'alt']
    };

    const blocks = new Set(['P', 'H2', 'H3', 'H4', 'UL', 'OL', 'BLOCKQUOTE', 'HR', 'TABLE']);

    const normalize = {
        H1: 'H2',
        B: 'STRONG',
        STRIKE: 'S',
        DEL: 'S'
    };

    const copyAttrs = (source, target, tag) =>
    {
        allowed[tag].forEach((attr) =>
        {
            const value = source.getAttribute(attr);

            if(value)
            {
                target.setAttribute(attr, value);
            }
        });
    };

    const walk = (source, target, inside) =>
    {
        Array.from(source.childNodes).forEach((child) =>
        {
            if(child.nodeType === 3)
            {
                if(child.textContent.trim() || inside)
                {
                    target.appendChild(document.createTextNode(child.textContent));
                }

                return;
            }

            if(child.nodeType !== 1)
            {
                return;
            }

            const tag = normalize[child.tagName] || child.tagName;

            if(!(tag in allowed))
            {
                walk(child, target, inside);
                return;
            }

            if(inside && blocks.has(tag))
            {
                const root = target.closest('.walk-root') || target;
                const node = document.createElement(tag);

                copyAttrs(child, node, tag);
                walk(child, node, false);
                root.appendChild(node);
                return;
            }

            const node = document.createElement(tag);

            copyAttrs(child, node, tag);
            walk(child, node, tag !== 'TABLE' && tag !== 'UL' && tag !== 'OL');

            if(node.hasChildNodes() || ['BR', 'HR', 'IMG'].includes(tag))
            {
                target.appendChild(node);
            }
        });
    };

    scope.clean = (html) =>
    {
        const stripped = html.replace(/<html[^>]*>|<\/html>|<head[^>]*>[\s\S]*?<\/head>|<body[^>]*>|<\/body>|<meta[^>]*>|<style[^>]*>[\s\S]*?<\/style>/gi, '');
        const source = document.createElement('div');

        source.innerHTML = stripped;

        const target = document.createElement('div');

        walk(source, target, false);

        return target.innerHTML
            .replace(/\u00A0/g, ' ')
            .replace(/<(p|blockquote|li|h[2-4])>(\s|<br\s*\/?>)*<\/(p|blockquote|li|h[2-4])>/gi, '')
            .replace(/<(strong|u|s)>\s*<\/(strong|u|s)>/gi, '')
            .replace(/(<br\s*\/?>)+$/gi, '')
            .trim();
    };
});
