onetype.AddonReady('admin', (admin) =>
{
    admin.dock = onetype.Addon('admin.dock', (addon) =>
    {
        addon.Field('id', {
            type: 'string',
            required: true,
            description: 'Unique item id.'
        });

        addon.Field('name', {
            type: 'string',
            required: true,
            description: 'Item name, shown as the icon tooltip.'
        });

        addon.Field('icon', {
            type: 'string',
            required: true,
            description: 'Material Symbols icon name.'
        });

        addon.Field('color', {
            type: 'string',
            description: 'Accent color used while the item is active.'
        });

        addon.Field('order', {
            type: 'number',
            value: 1,
            description: 'Sort position on the rail.'
        });

        addon.Field('isActive', {
            type: 'boolean|function',
            value: false,
            description: 'Whether the item is highlighted as active. A function is called with the item on every render, so the state stays live.'
        });

        addon.Field('condition', {
            type: 'object',
            value: {},
            config: 'admin.condition',
            description: 'Visibility rules. Empty object means the item shows everywhere.'
        });

        addon.Field('position', {
            type: 'string',
            value: 'top',
            options: ['top', 'bottom'],
            description: 'Rail group the icon goes into.'
        });

        addon.Field('onClick', {
            type: 'function',
            description: 'Called with the item on click.'
        });

        addon.Field('render', {
            type: 'string|function',
            description: 'Content shown right of the rail while open. When set, clicking opens or closes it instead of running click.'
        });

        addon.Field('panel', {
            type: 'object',
            value: {},
            config: {
                title: {
                    type: 'string',
                    value: '',
                    description: 'Panel heading. Empty hides it.'
                },
                description: {
                    type: 'string',
                    value: '',
                    description: 'One line under the title. Empty hides it.'
                },
                actions: {
                    type: 'array',
                    value: [],
                    each: {
                        type: 'object',
                        config: {
                            icon: {
                                type: 'string',
                                required: true,
                                description: 'Material Symbols icon name.'
                            },
                            tooltip: {
                                type: 'string',
                                value: '',
                                description: 'Tooltip text. Empty renders no tooltip.'
                            },
                            onClick: {
                                type: 'function',
                                description: 'Called with the action on click.'
                            }
                        }
                    },
                    description: 'Icon buttons in the panel header.'
                },
                close: {
                    type: 'boolean',
                    value: false,
                    description: 'Shows the close button in the panel header.'
                }
            },
            description: 'Chrome of the open panel. Empty renders bare; the header appears while title, description, actions or close are set.'
        });

        addon.Field('badge', {
            type: 'boolean|string|number',
            description: 'Small marker on the icon. A short label or count. True renders a plain dot.'
        });

        addon.Field('isOpen', {
            type: 'boolean',
            value: false,
            description: 'Computed. True when this item is the one open on the rail. Reads and writes through the persisted admin.dock.open setting.'
        },
        (value, item) => platform.config.get('admin.dock.open') === item.Get('id'),
        (value, previous, item) =>
        {
            platform.config.set('admin.dock.open', value ? item.Get('id') : null);

            return value;
        });
    });
});
