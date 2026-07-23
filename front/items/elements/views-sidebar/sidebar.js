onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-views-sidebar',
        addon: 'admin',
        name: 'Sidebar View',
        description: 'Local navigation for a detail page: entries with icon, label and hint, an accent rail on active, sticky beside content.',
        collection: 'Home',
        config: {
            items: {
                type: 'array',
                value: [{
                    id: 'overview',
                    label: 'Overview',
                    icon: 'info'
                }, {
                    id: 'credentials',
                    label: 'Credentials',
                    icon: 'key'
                }, {
                    id: 'actions',
                    label: 'Actions',
                    icon: 'bolt'
                }],
                each: {
                    type: 'object',
                    config: {
                        id: {
                            type: 'string',
                            description: 'Unique entry id, reported on select.'
                        },
                        label: {
                            type: 'string',
                            description: 'Entry label.'
                        },
                        icon: {
                            type: 'string',
                            description: 'Material Symbols icon before the label.'
                        },
                        hint: {
                            type: 'string',
                            description: 'Muted line under the label, like a count.'
                        }
                    }
                },
                description: 'Entries top to bottom.'
            },
            active: {
                type: 'string',
                description: 'Id of the active entry.'
            },
            _select: {
                type: 'function',
                description: 'Called with { value } holding the entry when one is clicked.'
            }
        },
        render: function()
        {
            this.pick = (item) =>
            {
                this.active = item.id;

                this._select && this._select({ value: item });
            };

            return `
                <nav class="box">
                    <div
                        ot-for="item in items"
                        :ot-key="item.id"
                        :class="active === item.id ? 'entry active' : 'entry'"
                        ot-click="() => pick(item)"
                    >
                        <span class="rail"></span>
                        <i ot-if="item.icon" class="icon">{{ item.icon }}</i>
                        <span class="text">
                            <span class="label">{{ item.label }}</span>
                            <span ot-if="item.hint" class="hint">{{ item.hint }}</span>
                        </span>
                    </div>
                </nav>
            `;
        }
    });
});
