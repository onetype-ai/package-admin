onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-navigation-sidebar',
        addon: 'admin',
        name: 'Sidebar',
        description: 'Recursive navigation tree with sections, collapsible items, live search, item actions and badges.',
        collection: 'Home',
        config: {
            title: {
                type: 'string',
                value: 'Documentation',
                description: 'Header title.'
            },
            subtitle: {
                type: 'string',
                description: 'Header subtitle.'
            },
            version: {
                type: 'string',
                description: 'Version pill in the header.'
            },
            search: {
                type: 'boolean',
                value: true,
                description: 'Shows the search input that filters the tree live.'
            },
            items: {
                type: 'array',
                value: [{
                        label: 'Getting started',
                        icon: 'rocket_launch',
                        items: [{
                                label: 'Introduction',
                                value: 'introduction'
                            }, {
                                label: 'First package',
                                value: 'first-package',
                                badge: 'New'
                            }
                        ]
                    }, {
                        label: 'Platform',
                        icon: 'hub',
                        items: [{
                                label: 'Commands',
                                value: 'commands'
                            }, {
                                label: 'Runtimes',
                                value: 'runtimes',
                                soon: true
                            }
                        ]
                    }, {
                        label: 'Changelog',
                        value: 'changelog',
                        icon: 'history',
                        placement: 'bottom'
                    }
                ],
                each: {
                    type: 'object',
                    config: 'admin.sidebar.item'
                },
                description: 'Tree items. Every item nests its own items through the items key, any depth. Root items with children render as sections.'
            },
            active: {
                type: 'string',
                value: 'first-package',
                description: 'Active item value.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth of the sidebar. Lines and hover follow it, search sits one above. 0 renders transparent, no borders.'
            },
            _click: {
                type: 'function',
                description: 'Called with { event, value } when an item is clicked.'
            }
        },
        render: function()
        {
            admin.Fn('do.navigation.sidebar', this);

            const tree = (source) => `
                <div
                    ot-for="row in ${source}"
                    :ot-key="row.key"
                    :class="state(row)"
                    :style="row.indent ? '--depth: ' + row.indent : null"
                    ot-click="({ event }) => handle(row, event)"
                >
                    <i
                        ot-if="!row.section && row.parent"
                        :class="'chev' + (row.open ? ' open' : '') + (row.icon ? ' swap' : '')"
                        ot-click.stop="() => toggle(row)"
                    >expand_more</i>
                    <i ot-if="row.icon" class="icon">{{ row.icon }}</i>
                    <span class="text">{{ row.label }}</span>
                    <span class="meta">
                        <span ot-if="row.badge" class="badge">{{ row.badge }}</span>
                        <span ot-if="row.count != null && !row.badge" class="count">{{ row.count }}</span>
                        <span ot-if="row.soon" class="soon">Soon</span>
                    </span>
                    <span ot-if="row.hasActions" class="actions">
                        <span
                            ot-for="action in row.actions"
                            :ot-key="action.icon"
                            class="action"
                            :ot-tooltip="action.tooltip ? { text: action.tooltip, position: { x: 'center', y: 'top' } } : null"
                            ot-click.stop="({ event }) => act(action, row, event)"
                        ><i>{{ action.icon }}</i></span>
                    </span>
                    <span ot-if="row.section" class="action" ot-click.stop="() => toggle(row)">
                        <i :class="'chevron' + (row.open ? ' open' : '')">expand_more</i>
                    </span>
                </div>
            `;

            return `
                <aside :class="shell">
                    <header ot-if="hasHead" class="head">
                        <slot name="top"></slot>
                        <div class="heading">
                            <span ot-if="title" class="title">{{ title }}</span>
                            <span ot-if="version" class="pill">{{ version }}</span>
                        </div>
                        <span ot-if="subtitle" class="caption">{{ subtitle }}</span>
                    </header>

                    <div ot-if="search" class="finder">
                        <e-admin-form-input
                            icon="search"
                            placeholder="Search..."
                            :value="query"
                            :clearable="true"
                            :background="finder"
                            :_input="input"
                            :_change="input"
                        ></e-admin-form-input>
                    </div>

                    <nav class="tree ot-scrollbar">
                        ${tree('top')}
                        <div ot-if="empty" class="blank">No results for "{{ query }}"</div>
                    </nav>

                    <nav ot-if="bottom.length" class="tree bottom">${tree('bottom')}</nav>

                    <footer ot-if="hasFoot" class="foot">
                        <slot name="bottom"></slot>
                    </footer>
                </aside>
            `;
        }
    });
});
