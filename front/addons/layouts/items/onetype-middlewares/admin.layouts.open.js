onetype.AddonReady('onetype.middlewares', function(middlewares)
{
    middlewares.ItemAdd({
        id: 'admin.layouts.open',
        description: 'Runs before a layout item opens. Set value.cancel to stop the open, or mutate value.properties to change what opens.',
        config: {
            properties: {
                type: 'object',
                config: {
                    id: {
                        type: 'string',
                        description: 'ID of the layout item to open.'
                    },
                    data: {
                        type: 'object',
                        value: {},
                        description: 'Prop values passed to the renders.'
                    }
                },
                description: 'The open request, the same properties passed to the ui:layouts:open command. Mutate to change what opens.'
            },
            cancel: {
                type: 'boolean',
                value: false,
                description: 'Set to true to cancel the open. The command resolves without changing the item.'
            }
        }
    });
});
