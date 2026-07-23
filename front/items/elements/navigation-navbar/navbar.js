onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-navigation-navbar',
        addon: 'admin',
        name: 'Navbar',
        description: 'Top toolbar with left, center and right areas, logo, buttons, separators, dropdowns and popups.',
        collection: 'Home',
        config: {
            logo: {
                type: 'string',
                value: '',
                description: 'Logo image URL. Links to /.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth of the bar, nested controls sit one above. 0 renders transparent, without background or borders.'
            },
            items: {
                type: 'array',
                value: [{
                        id: 'projects',
                        icon: 'stacks',
                        label: 'Projects',
                        active: true
                    }, {
                        id: 'docs',
                        icon: 'menu_book',
                        label: 'Docs'
                    }, {
                        id: 'split',
                        type: 'separator'
                    }, {
                        id: 'search',
                        icon: 'search',
                        tooltip: 'Search',
                        position: 'right'
                    }, {
                        id: 'alerts',
                        icon: 'notifications',
                        tooltip: 'Notifications',
                        badge: 2,
                        position: 'right'
                    }
                ],
                description: 'Toolbar items.',
                each: {
                    type: 'object',
                    config: 'admin.navbar.item'
                }
            }
        },
        render: function()
        {
            this.Compute(() =>
            {
                this.left = this.items.filter((item) => (item.position ? item.position : 'left') === 'left');
                this.center = this.items.filter((item) => item.position === 'center');
                this.right = this.items.filter((item) => item.position === 'right');
                this.depth = Math.min(this.background + 1, 3);
            });

            this.kind = (item) =>
            {
                return item.type ? item.type : 'default';
            };

            this.tooltip = (item) =>
            {
                if(!item.tooltip)
                {
                    return null;
                }

                return {
                    text: item.tooltip,
                    position: {
                        x: 'center',
                        y: 'bottom'
                    }
                };
            };

            this.node = (item) =>
            {
                return typeof item.render === 'function' ? item.render({ background: this.depth }) : item.render;
            };

            this.click = (item) =>
            {
                item.click && item.click(item);

                if(!item.popup || this.kind(item.popup) === 'dropdown')
                {
                    return;
                }

                const { type, render, ...options } = item.popup;

                if(!options.position)
                {
                    options.position = type === 'drawer' ? 'right' : 'center';
                }

                $ot.float.drawer({
                    ...options,
                    content: typeof render === 'function' ? render : () => render,
                    clean: !options.title && !options.description
                });
            };

            const inner = `
                <i ot-if="item.icon">{{ item.icon }}</i>
                <span ot-if="item.label" class="label">{{ item.label }}</span>
                <span ot-if="item.badge" class="badge">{{ item.badge === true ? '' : item.badge }}</span>
            `;

            const zone = (position) => `
                <div ot-for="item in ${position}" :ot-key="item.id" class="entry">
                    <div ot-if="kind(item) === 'separator'" class="separator"></div>
                    <div ot-if="kind(item) === 'default' && item.render" class="node" ot-node="node(item)"></div>
                    <button
                        :data-navbar-id="item.id"
                        ot-if="kind(item) === 'default' && !item.render && item.popup && kind(item.popup) === 'dropdown'"
                        :class="'item' + (item.active ? ' active' : '')"
                        :style="'--color: ' + (item.color ? item.color : 'var(--ot-brand)')"
                        :ot-tooltip="tooltip(item)"
                        :ot-popup="typeof item.popup.render === 'function' ? item.popup.render : () => item.popup.render"
                        ot-click="click(item)"
                    >${inner}</button>
                    <button
                        :data-navbar-id="item.id"
                        ot-if="kind(item) === 'default' && !item.render && (!item.popup || kind(item.popup) !== 'dropdown')"
                        :class="'item' + (item.active ? ' active' : '')"
                        :style="'--color: ' + (item.color ? item.color : 'var(--ot-brand)')"
                        :ot-tooltip="tooltip(item)"
                        ot-click="click(item)"
                    >${inner}</button>
                </div>
            `;

            return `
                <div :class="'box bg-' + background">
                    <div class="zone left">
                        <a ot-if="logo" class="logo" href="/">
                            <img :src="logo" alt="" />
                        </a>
                        ${zone('left')}
                    </div>
                    <div class="zone center">${zone('center')}</div>
                    <div class="zone right">${zone('right')}</div>
                </div>
            `;
        }
    });
});
