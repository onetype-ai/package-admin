onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-global-menu',
        addon: 'admin',
        name: 'Menu',
        description: 'Menu panel for dropdowns and context menus: items, separators, group labels, checks, shortcuts and endlessly nested submenus.',
        collection: 'Home',
        config: {
            items: {
                type: 'array',
                value: [{
                        id: 'open',
                        icon: 'folder_open',
                        label: 'Open',
                        hint: 'Cmd O'
                    }, {
                        id: 'pin',
                        icon: 'push_pin',
                        label: 'Pinned',
                        checked: true
                    }, {
                        type: 'separator'
                    }, {
                        id: 'delete',
                        icon: 'delete',
                        label: 'Delete',
                        color: 'red',
                        hint: 'Cmd Del'
                    }
                ],
                each: {
                    type: 'object',
                    config: {
                        id: {
                            type: 'string',
                            description: 'Unique item identifier, passed to _select.'
                        },
                        type: {
                            type: 'string',
                            value: 'item',
                            options: ['item', 'separator', 'label'],
                            description: 'Row kind. A separator renders a divider, a label renders a group heading.'
                        },
                        icon: {
                            type: 'string',
                            description: 'Leading Material Symbols icon.'
                        },
                        label: {
                            type: 'string',
                            description: 'Row text.'
                        },
                        hint: {
                            type: 'string',
                            description: 'Muted shortcut hint on the right.'
                        },
                        badge: {
                            type: 'string|number',
                            description: 'Small chip on the right.'
                        },
                        color: {
                            type: 'string',
                            options: ['brand', 'blue', 'red', 'orange', 'green'],
                            description: 'Accent color of the row, like red for destructive actions.'
                        },
                        checked: {
                            type: 'boolean',
                            description: 'Check mark on the right. Use for toggleable items.'
                        },
                        disabled: {
                            type: 'boolean',
                            value: false,
                            description: 'Dims the row and blocks the click.'
                        },
                        items: {
                            type: 'array',
                            value: [],
                            each: { type: 'object' },
                            description: 'Submenu items with the same shape, nested without depth limit.'
                        },
                        onClick: {
                            type: 'function',
                            description: 'Called with { event, item } on click, before _select.'
                        }
                    }
                },
                description: 'Menu rows top to bottom.'
            },
            nested: {
                type: 'boolean',
                value: false,
                description: 'Internal. Marks a submenu panel, positioned to the side of its parent row.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth of the panel from 1 to 3. 0 renders transparent, without background or borders.'
            },
            _select: {
                type: 'function',
                description: 'Called with { event, item } when any item at any depth is picked.'
            }
        },
        render: function()
        {
            this.classes = () =>
            {
                return 'box bg-' + this.background + (this.nested ? ' sub' : '');
            };

            this.state = (item) =>
            {
                const hasChildren = item.items && item.items.length;
                const list = ['item', item.color ? item.color : 'neutral'];

                item.disabled && list.push('disabled');
                hasChildren && list.push('parent');

                return list.join(' ');
            };

            this.forward = ({ event, item }) =>
            {
                this._select && this._select({ event, item });
            };

            this.pick = (item, event) =>
            {
                if(item.disabled || (item.items && item.items.length))
                {
                    return;
                }

                item.onClick && item.onClick({ event, item });
                this.forward({ event, item });
            };

            return `
                <div :class="classes()">
                    <div ot-for="item in items" :ot-key="item.id ? item.id : item.label ? item.label : item.type">
                        <div ot-if="item.type === 'separator'" class="separator"></div>
                        <div ot-if="item.type === 'label'" class="group">{{ item.label }}</div>
                        <div ot-if="item.type !== 'separator' && item.type !== 'label'" :class="state(item)" ot-click="({ event }) => pick(item, event)">
                            <i ot-if="item.icon" class="lead">{{ item.icon }}</i>
                            <span class="label">{{ item.label }}</span>
                            <span ot-if="item.badge != null" class="chip">{{ item.badge }}</span>
                            <span ot-if="item.hint" class="hint">{{ item.hint }}</span>
                            <i ot-if="item.checked" class="check">check</i>
                            <i ot-if="item.items && item.items.length" class="more">chevron_right</i>
                            <div ot-if="item.items && item.items.length" class="flyout">
                                <e-admin-global-menu :items="item.items" :nested="true" :background="background" :_select="forward"></e-admin-global-menu>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });
});
