onetype.AddonReady('onetype.schemas', function(schemas)
{
    schemas.ItemAdd({
        id: 'admin.accordionpanel',
        description: 'A single panel of the accordion, shared by the accordion element.',
        addon: 'admin',
        config: {
            id: {
                type: 'string',
                description: 'Unique panel identifier.'
            },
            title: {
                type: 'string',
                description: 'Header title.'
            },
            description: {
                type: 'string',
                description: 'Muted line under the title.'
            },
            icon: {
                type: 'string',
                description: 'Icon in the tile before the title.'
            },
            content: {
                type: 'string',
                description: 'Panel body HTML.'
            },
            badge: {
                type: 'string',
                description: 'Small chip on the right of the header.'
            },
            disabled: {
                type: 'boolean',
                value: false,
                description: 'Dims the panel and blocks the toggle.'
            }
        }
    });
});
