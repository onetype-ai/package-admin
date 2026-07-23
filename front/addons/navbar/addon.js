onetype.AddonReady('admin', (admin) =>
{
    admin.navbar = onetype.Addon('admin.navbar', (addon) =>
    {
        addon.Field('id', {
            type: 'string',
            required: true,
            description: 'Unique item id.'
        });

        addon.Field('order', {
            type: 'number',
            value: 1,
            description: 'Sort position inside the area.'
        });

        addon.Field('condition', {
            type: 'object',
            value: {},
            config: 'admin.condition',
            description: 'Visibility rules. Empty object means the item shows everywhere.'
        });

        addon.Field('position', {
            type: 'string',
            required: true,
            options: ['left', 'center', 'right'],
            description: 'Area of the bar the item goes into.'
        });

        addon.Field('type', {
            type: 'string',
            value: 'default',
            options: ['default', 'separator'],
            description: 'What the item is. default renders the item, separator draws a divider.'
        });

        addon.Field('popup', {
            type: 'object',
            config: 'admin.popup',
            description: 'Popup surface opened by the item, when it has one.'
        });

        addon.Field('icon', {
            type: 'string',
            description: 'Material Symbols icon name.'
        });

        addon.Field('name', {
            type: 'string',
            description: 'Button text.'
        });

        addon.Field('tooltip', {
            type: 'string',
            description: 'Hover tooltip, useful for icon only items.'
        });

        addon.Field('color', {
            type: 'string',
            description: 'Accent color used while the item is active.'
        });

        addon.Field('badge', {
            type: 'boolean|string|number',
            description: 'Small marker on the item. A short label or count. True renders a plain dot.'
        });

        addon.Field('isActive', {
            type: 'boolean|function',
            value: false,
            description: 'Shows the active pill on the item. A function is called with the item on every render, so the state stays live.'
        });

        addon.Field('isOpen', {
            type: 'boolean',
            value: false,
            description: 'Computed. True when this item is the one whose surface is open. Reads through the admin.navbar.open setting.'
        },
        (value, item) => admin.navbar.StoreGet('open') === item.Get('id'));

        addon.Field('onClick', {
            type: 'function',
            description: 'Called with the item on click, before the type behavior runs.'
        });

        addon.Field('render', {
            type: 'string|function',
            description: 'Inline content, how the item renders in the bar instead of the default button.'
        });
    });
});
