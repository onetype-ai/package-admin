onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-views-tree',
        addon: 'admin',
        name: 'Tree View',
        description: 'Hierarchy view for thousands of nodes: lazy branches, pruning search, badges, counts, meta, async children and keyboard walking.',
        collection: 'Home',
        config: {
            items: {
                type: 'array',
                value: [{
                        id: 'home',
                        title: 'Home',
                        icon: 'web',
                        color: 'brand'
                    }, {
                        id: 'product',
                        title: 'Product',
                        subtitle: 'Everything the platform sells',
                        icon: 'category',
                        color: 'blue',
                        children: [{
                                id: 'features',
                                title: 'Features',
                                icon: 'star',
                                color: 'blue',
                                badge: 'New'
                            }, {
                                id: 'pricing',
                                title: 'Pricing',
                                icon: 'sell',
                                color: 'blue',
                                meta: 'updated Jul 12'
                            }
                        ]
                    }, {
                        id: 'docs',
                        title: 'Docs',
                        icon: 'menu_book',
                        color: 'orange',
                        children: [{
                                id: 'start',
                                title: 'Getting started',
                                icon: 'rocket_launch',
                                color: 'orange'
                            }, {
                                id: 'framework',
                                title: 'Framework',
                                icon: 'extension',
                                color: 'orange'
                            }
                        ]
                    }
                ],
                each: {
                    type: 'object',
                    description: 'A node: id, title, subtitle, icon, color, badge, meta, disabled, children as the same shape or an async callback.'
                },
                description: 'Nodes of the first level, nested through children.'
            },
            search: {
                type: 'boolean',
                value: true,
                description: 'Shows the search field that prunes the tree to matching branches as you type.'
            },
            placeholder: {
                type: 'string',
                value: 'Search the tree...',
                description: 'Placeholder of the search field.'
            },
            controls: {
                type: 'boolean',
                value: true,
                description: 'Shows the expand all and collapse all actions next to the search.'
            },
            counts: {
                type: 'boolean',
                value: true,
                description: 'Shows the number of descendants on every branch.'
            },
            active: {
                type: 'string',
                description: 'Id of the selected node.'
            },
            empty: {
                type: 'string',
                value: 'No entries yet.',
                description: 'Message shown while there are no nodes.'
            },
            background: {
                type: 'number',
                value: 0,
                options: [0, 1, 2, 3],
                description: 'Background depth the tree sits on. Rows highlight one step above.'
            },
            _open: {
                type: 'function',
                description: 'Called with { value } holding the node when a row is opened by click or Enter.'
            },
            _toggle: {
                type: 'function',
                description: 'Called with { value, open } when a branch expands or collapses.'
            }
        },
        render: function()
        {
            this.state = {};
            this.loaded = {};
            this.loading = {};
            this.query = '';
            this.current = this.active ? this.active : '';

            admin.Fn('do.tree.traverse', this);
            admin.Fn('do.tree.rows', this);
            admin.Fn('do.tree.actions', this);
            admin.Fn('do.tree.input', this);

            return `
                <div :class="'box bg-' + background" tabindex="0" ot-keydown="key()">
                    <div ot-if="search || controls" class="top">
                        <div ot-if="search" class="find">
                            <i>search</i>
                            <input type="text" :placeholder="placeholder" ot-input="type()" ot-key="tree-search" />
                        </div>
                        <div ot-if="controls" class="tools">
                            <button :ot-tooltip="'Expand all'" ot-click="() => everything(true)"><i>unfold_more</i></button>
                            <button :ot-tooltip="'Collapse all'" ot-click="() => everything(false)"><i>unfold_less</i></button>
                        </div>
                    </div>
                    <div ot-if="!rows().length" class="void">{{ query ? 'Nothing matches.' : empty }}</div>
                    <div class="rows">
                        <div
                            ot-for="row in rows()"
                            :ot-key="row.node.id"
                            :class="stamp(row)"
                            :style="'padding-left: ' + (row.depth * 22 + 8) + 'px'"
                            ot-click="() => pick(row.node)"
                        >
                            <span ot-if="row.branch" :class="row.open ? 'caret turned' : 'caret'" ot-click.stop="() => toggle(row.node)">
                                <i :class="row.loading ? 'spin' : ''">{{ row.loading ? 'progress_activity' : 'chevron_right' }}</i>
                            </span>
                            <span ot-if="!row.branch" class="caret leaf"></span>
                            <span ot-if="row.node.icon" class="tile"><i>{{ row.node.icon }}</i></span>
                            <span class="words">
                                <span class="title">{{ row.node.title }}</span>
                                <span ot-if="row.node.subtitle" class="subtitle">{{ row.node.subtitle }}</span>
                            </span>
                            <span ot-if="row.node.badge" class="chip">{{ row.node.badge }}</span>
                            <span ot-if="counts && row.branch && total(row.node)" class="count">{{ total(row.node) }}</span>
                            <span ot-if="row.node.meta" class="meta">{{ row.node.meta }}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    });
});
