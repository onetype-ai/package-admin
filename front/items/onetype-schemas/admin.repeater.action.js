onetype.AddonReady('onetype.schemas', function(schemas)
{
    schemas.ItemAdd({
        id: 'admin.repeater.action',
        description: 'Custom per-row action button, shared by the repeater element.',
        addon: 'admin',
        config: {
            id: {
                type: 'string'
            },
            icon: {
                type: 'string'
            },
            tooltip: {
                type: 'string'
            },
            danger: {
                type: 'boolean',
                value: false
            },
            _click: {
                type: 'function'
            }
        }
    });
});
