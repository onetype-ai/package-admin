onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-global-markdown',
        addon: 'admin',
        name: 'Markdown',
        description: 'Markdown renderer with premium typography, tables, quotes, images, code blocks through global-code and a read more fold.',
        collection: 'Home',
        config: {
            content: {
                type: 'string',
                value: "# Getting started\n\nInstalls **immediately**.\n\n> Just a manifest.\n\n| Plan | Price |\n| Pro | $19 |\n\n```js\nadmin.Fn('id');\n```",
                description: 'Markdown string to render.'
            },
            collapsible: {
                type: 'boolean',
                value: false,
                description: 'Folds long content behind a read more toggle.'
            },
            height: {
                type: 'number',
                value: 220,
                description: 'Folded max height in pixels while collapsible is on.'
            },
            expanded: {
                type: 'boolean',
                value: false,
                description: 'Start unfolded while collapsible is on.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth, renders the article on its own bordered surface. 0 renders transparent, without background or borders.'
            },
            glow: {
                type: 'string',
                options: ['brand', 'blue', 'red', 'orange', 'green'],
                description: 'Colored glow on top of the surface. Empty renders no glow.'
            }
        },
        render: function()
        {
            admin.Fn('do.markdown.field', this);

            return `
                <article :class="classes()">
                    <div class="body" :style="collapsible && !expanded ? 'max-height: ' + height + 'px' : null">
                        <div class="prose">
                            <div ot-for="segment in segments" :ot-key="segment.key" class="segment">
                                <div ot-if="segment.type === 'html'"><span ot-html="segment.content"></span></div>
                                <e-admin-global-code
                                    ot-if="segment.type === 'code'"
                                    :source="segment.source"
                                    :language="segment.language"
                                    :background="Math.min(background + 1, 3)"
                                ></e-admin-global-code>
                                <e-admin-views-table
                                    ot-if="segment.type === 'table'"
                                    :fields="segment.fields"
                                    :items="segment.items"
                                    :background="Math.min(background + 1, 3)"
                                ></e-admin-views-table>
                            </div>
                        </div>
                    </div>
                    <div ot-if="collapsible && !expanded" class="fade"></div>
                    <button ot-if="collapsible" type="button" class="toggle" ot-click="toggle">
                        <i>{{ expanded ? 'expand_less' : 'expand_more' }}</i>
                        <span>{{ expanded ? 'Show less' : 'Read more' }}</span>
                    </button>
                </article>
            `;
        }
    });
});
