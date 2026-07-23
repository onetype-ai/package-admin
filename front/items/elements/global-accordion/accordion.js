onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-global-accordion',
        addon: 'admin',
        name: 'Accordion',
        description: 'Expandable panels with icon tiles, smooth height animation, single or multiple open mode.',
        collection: 'Home',
        config: {
            items: {
                type: 'array',
                value: [{
                    id: 'install',
                    icon: 'download',
                    title: 'How do I install a package?',
                    description: 'Marketplace basics',
                    content: 'Open the marketplace, pick a package and press install. It lands in your project immediately, updates ship the same way.'
                }, {
                    id: 'domains',
                    icon: 'language',
                    title: 'Can I bring my own domain?',
                    description: 'DNS and SSL',
                    content: 'Yes. Point your domain to our edge, pick which runtime it serves, SSL certificates are issued automatically within a minute.'
                }, {
                    id: 'billing',
                    icon: 'credit_card',
                    title: 'How does billing work?',
                    description: 'Plans and invoices',
                    content: 'Billing runs per workspace. Every plan includes unlimited drafts, you only pay for published sites.'
                }],
                each: {
                    type: 'object',
                    config: 'admin.accordionpanel',
                    description: 'A single panel.'
                },
                description: 'Panels top to bottom.'
            },
            active: {
                type: 'string|array',
                description: 'Open panel id, or an array of ids while multiple is on.'
            },
            multiple: {
                type: 'boolean',
                value: false,
                description: 'Allow more than one open panel.'
            },
            color: {
                type: 'string',
                value: 'brand',
                options: ['brand', 'blue', 'red', 'orange', 'green'],
                description: 'Accent color of the open state.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth 1-3 of the surface. 0 is transparent, no background or borders.'
            },
            _change: {
                type: 'function',
                description: 'Called with { event, value } after every toggle.'
            }
        },
        render: function()
        {
            this.classes = () =>
            {
                const hasBackground = this.background || this.background === 0;

                return ['box', this.color, hasBackground && 'bg-' + this.background].filter(Boolean).join(' ');
            };

            this.state = (item) =>
                ['item', this.opened(item) && 'open', item.disabled && 'disabled'].filter(Boolean).join(' ');

            this.opened = (item) =>
            {
                if(Array.isArray(this.active))
                {
                    return this.active.includes(item.id);
                }

                return this.active === item.id;
            };

            this.toggle = (item, event) =>
            {
                if(item.disabled)
                {
                    return;
                }

                let next;

                if(this.multiple)
                {
                    const current = Array.isArray(this.active) ? [...this.active] : [];
                    const index = current.indexOf(item.id);

                    if(index === -1)
                    {
                        current.push(item.id);
                    }
                    else
                    {
                        current.splice(index, 1);
                    }

                    next = current;
                }
                else
                {
                    next = this.active === item.id ? null : item.id;
                }

                this.active = next;

                if(this._change)
                {
                    this._change({ event, value: next });
                }
            };

            return `
                <div :class="classes()">
                    <div ot-for="item in items" :ot-key="item.id" :class="state(item)">
                        <button type="button" class="head" ot-click="({ event }) => toggle(item, event)">
                            <div ot-if="item.icon" class="tile"><i>{{ item.icon }}</i></div>
                            <div class="text">
                                <span class="title">{{ item.title }}</span>
                                <span ot-if="item.description" class="description">{{ item.description }}</span>
                            </div>
                            <span ot-if="item.badge" class="chip">{{ item.badge }}</span>
                            <i class="chevron">expand_more</i>
                        </button>
                        <div class="panel">
                            <div class="inner">
                                <div class="content"><span ot-html="item.content"></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });
});
