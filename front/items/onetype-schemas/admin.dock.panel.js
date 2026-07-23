onetype.AddonReady('onetype.schemas', function(schemas)
{
    schemas.ItemAdd({
        id: 'admin.dock.panel',
        description: 'Dock side panel sizing, chrome and behavior, shared by the dock element.',
        addon: 'admin',
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
                    config: 'admin.dock.action'
                },
                description: 'Icon buttons in the panel header.'
            },
            close: {
                type: 'boolean',
                value: false,
                description: 'Shows the close button in the header. Escape asks the panel to close either way.'
            },
            width: {
                type: 'number',
                value: 380,
                description: 'Width of the panel in pixels.'
            },
            min: {
                type: 'number',
                value: 280,
                description: 'Minimum width the panel can be resized to.'
            },
            max: {
                type: 'number',
                value: 640,
                description: 'Maximum width the panel can be resized to.'
            },
            onResize: {
                type: 'function',
                description: 'Called with the new width in pixels once the panel resize ends.'
            },
            onClose: {
                type: 'function',
                description: 'Called when the close button or Escape asks the panel to close.'
            }
        }
    });
});
