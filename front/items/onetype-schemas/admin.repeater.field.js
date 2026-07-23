onetype.AddonReady('onetype.schemas', function(schemas)
{
    schemas.ItemAdd({
        id: 'admin.repeater.field',
        description: 'A single row field definition, shared by the repeater element.',
        addon: 'admin',
        config: {
            key: {
                type: 'string',
                description: 'Data key in row object.'
            },
            label: {
                type: 'string',
                description: 'Field label shown above input.'
            },
            description: {
                type: 'string',
                description: 'Helper text below label.'
            },
            element: {
                type: 'string',
                description: 'Element id without e- prefix.'
            },
            properties: {
                type: 'object',
                description: 'Props passed to element.'
            },
            default: {
                type: 'string',
                description: 'Default value for new rows.'
            }
        }
    });
});
