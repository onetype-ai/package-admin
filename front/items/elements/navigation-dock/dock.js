onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-navigation-dock',
        addon: 'admin',
        name: 'Dock',
        description: 'Slim icon rail with top and bottom items, separators, tooltips and a floating side panel with optional header.',
        collection: 'Home',
        config: {
            items: {
                type: 'array',
                value: [{
                        icon: 'home',
                        label: 'Home',
                        isActive: true
                    }, {
                        icon: 'search',
                        label: 'Search',
                        hint: 'Cmd K'
                    }, {
                        icon: 'database',
                        label: 'Data',
                        badge: 3
                    }, {
                        icon: 'notifications',
                        label: 'Notifications',
                        badge: true
                    }, {
                        type: 'separator'
                    }, {
                        icon: 'extension',
                        label: 'Packages'
                    }, {
                        icon: 'settings',
                        label: 'Settings',
                        placement: 'bottom'
                    }
                ],
                description: 'Rail items.',
                each: {
                    type: 'object',
                    config: 'admin.dock.item'
                }
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth of the rail. Hover and colorless active states follow it. 0 renders transparent, without background or borders.'
            },
            panel: {
                type: 'object',
                value: {},
                config: 'admin.dock.panel',
                description: 'Panel sizing, chrome and behavior. The header renders only while title, description, actions or close are set.'
            }
        },
        render: function()
        {
            this.Compute(() =>
            {
                this.top = this.items.filter((item) => (item.placement ? item.placement : 'top') === 'top');
                this.bottom = this.items.filter((item) => item.placement === 'bottom');
                const opened = this.items.find((item) => item.isOpen && item.render);
                this.opened = opened ? opened : null;
            });

            this.positioned = (text, sideX, sideY) =>
            {
                if(!text)
                {
                    return null;
                }

                return {
                    text,
                    position: {
                        x: sideX,
                        y: sideY
                    }
                };
            };

            this.dismiss = (event) =>
            {
                event.key === 'Escape' && this.opened && this.panel.onClose && this.panel.onClose();
            };

            this.itemClasses = (item) =>
            {
                const active = (item.isActive || item.isOpen) ? ' active' : '', disabled = item.isDisabled ? ' disabled' : '';

                return 'item' + active + disabled + (item.color ? '' : ' neutral');
            };

            this.resize = () =>
            {
                return {
                    edge: ['right'],
                    width: this.panel.width,
                    min: this.panel.min,
                    max: this.panel.max,
                    onResize: (event) => this.panel.onResize && this.panel.onResize(event.width)
                };
            };

            this.OnMounted(() => document.addEventListener('keydown', this.dismiss));
            this.OnDestroy(() => document.removeEventListener('keydown', this.dismiss));

            const stack = (placement) => `
                <div class="stack ${placement}">
                    <div ot-for="item in ${placement}" :ot-key="item.id + ':' + item.isActive + ':' + item.isOpen">
                        <div ot-if="item.type === 'separator'" class="separator"></div>
                        <div
                            ot-if="item.type !== 'separator'"
                            :class="itemClasses(item)"
                            :style="item.color ? '--color: ' + item.color : null"
                            :ot-tooltip="positioned(item.hint ? item.label + '  ·  ' + item.hint : item.label, 'right', 'center')"
                            ot-click="!item.isDisabled && item.onClick && item.onClick(item)"
                        >
                            <span class="indicator"></span>
                            <i>{{ item.icon }}</i>
                            <span ot-if="item.badge" class="badge">{{ item.badge === true ? '' : item.badge }}</span>
                        </div>
                    </div>
                </div>
            `;

            return `
                <aside :class="'box bg-' + background">
                    ${stack('top')}
                    ${stack('bottom')}
                    <div ot-if="opened" class="panel" :ot-resize="resize()">
                        <div ot-if="panel.title || panel.description || panel.actions.length || panel.close" class="head">
                            <div class="text">
                                <div ot-if="panel.title" class="title">{{ panel.title }}</div>
                                <div ot-if="panel.description" class="description">{{ panel.description }}</div>
                            </div>
                            <div class="tools">
                                <div
                                    ot-for="action in panel.actions"
                                    :ot-key="action.icon"
                                    class="tool"
                                    :ot-tooltip="positioned(action.tooltip, 'center', 'bottom')"
                                    ot-click="action.onClick && action.onClick(action)"
                                ><i>{{ action.icon }}</i></div>
                                <div ot-if="panel.close" class="tool" ot-click="panel.onClose && panel.onClose()"><i>close</i></div>
                            </div>
                        </div>
                        <div class="body" ot-node="typeof opened.render === 'function' ? opened.render(opened) : opened.render" :ot-key="opened.id"></div>
                    </div>
                </aside>
            `;
        }
    });
});
