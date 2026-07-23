onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-global-code',
        addon: 'admin',
        name: 'Code',
        description: 'Code block with syntax highlighting for JavaScript, HTML, CSS and cURL, a copy button, line numbers and line highlights.',
        collection: 'Home',
        config: {
            source: {
                type: 'string',
                value: "const packages = onetype.Addon('packages');\n\npackages.Fn('scan');",
                description: 'Raw code string.'
            },
            language: {
                type: 'string',
                value: 'js',
                options: ['js', 'html', 'css', 'curl', 'text'],
                description: 'Syntax language. Text renders without highlighting.'
            },
            filename: {
                type: 'string',
                description: 'Filename in the header. Replaces the language label.'
            },
            lines: {
                type: 'boolean',
                value: false,
                description: 'Show line numbers.'
            },
            highlight: {
                type: 'string',
                description: 'Lines to highlight while line numbers are on, like 2,4-6.'
            },
            copy: {
                type: 'boolean',
                value: true,
                description: 'Show the copy button.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth of the code surface from 1 to 3. 0 renders transparent, without background or borders.'
            }
        },
        render: function()
        {
            this.copied = false;

            this.Compute(() =>
            {
                this.output = admin.Fn('do.code.render', this.source, this.language, this.lines, this.highlight);
            });

            this.grab = () =>
            {
                const text = this.source.replace(/^\n+|\n+$/g, '');

                if(navigator.clipboard && text)
                {
                    navigator.clipboard.writeText(text);
                }

                this.copied = true;

                setTimeout(() =>
                {
                    this.copied = false;
                }, 1800);
            };

            return `
                <div :class="'box bg-' + background">
                    <div class="head">
                        <div class="dots"><span></span><span></span><span></span></div>
                        <div ot-if="filename" class="filename">{{ filename }}</div>
                        <div ot-if="!filename" class="language">{{ language }}</div>
                        <button ot-if="copy" :class="copied ? 'copy copied' : 'copy'" type="button" ot-click="grab">
                            <i>{{ copied ? 'check' : 'content_copy' }}</i>
                            <span>{{ copied ? 'Copied' : 'Copy' }}</span>
                        </button>
                    </div>
                    <pre class="body"><code ot-html="output"></code></pre>
                </div>
            `;
        }
    });
});
