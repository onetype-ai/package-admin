onetype.AddonReady('admin', (admin) =>
{
    admin.modes = onetype.Addon('admin.modes', (addon) =>
    {
        addon.Field('id', {
            type: 'string',
            required: true,
            description: 'Unique mode id.'
        });

        addon.Field('order', {
            type: 'number',
            value: 1,
            description: 'Sort position in the modes bar.'
        });

        addon.Field('condition', {
            type: 'object',
            value: {},
            config: 'admin.condition',
            description: 'Visibility rules. Empty object means the mode shows everywhere.'
        });

        addon.Field('isDefault', {
            type: 'boolean',
            value: false,
            description: 'Marks the mode the app starts in when none is saved.'
        });

        addon.Field('icon', {
            type: 'string',
            required: true,
            description: 'Material Symbols icon name.'
        });

        addon.Field('name', {
            type: 'string',
            required: true,
            description: 'Mode name, shown as the icon tooltip.'
        });

        addon.Field('onActivate', {
            type: 'function',
            description: 'Called with the mode item when the mode becomes active.'
        });

        addon.Field('onDeactivate', {
            type: 'function',
            description: 'Called with the mode item when another mode takes over.'
        });

        addon.Field('isActive', {
            type: 'boolean',
            value: false,
            description: 'Computed. True when this mode is the current one, the visible mode out of the active ones.'
        }, (value, item) =>
        {
            return admin.modes.active()?.Get('id') === item.Get('id');
        });
    });
});
