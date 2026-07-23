onetype.AddonReady('onetype.schemas', function(schemas)
{
    schemas.ItemAdd({
        id: 'admin.popup',
        description: 'Popup surface config for navbar items.',
        addon: 'admin',
        config: {
            type: {
                type: 'string',
                value: 'default',
                options: ['default', 'drawer', 'dropdown'],
                description: 'Surface kind. default opens a centered surface, drawer docks to a screen edge, dropdown anchors to the button.'
            },
            title: {
                type: 'string',
                description: 'Surface heading. Passing a title or description gives the surface its chrome, without both it renders bare.'
            },
            description: {
                type: 'string',
                description: 'Surface subheading below the title.'
            },
            width: {
                type: 'string',
                options: ['s', 'm', 'l'],
                description: 'Surface width preset.'
            },
            padding: {
                type: 'string',
                options: ['none', 's', 'm', 'l'],
                description: 'Surface content padding preset.'
            },
            position: {
                type: 'string|object',
                description: 'Where the surface sits. A place name for default and drawer, or an {x, y} object for dropdowns.'
            },
            offset: {
                type: 'object',
                config: {
                    x: {
                        type: 'number',
                        value: 0,
                        description: 'Horizontal offset in pixels.'
                    },
                    y: {
                        type: 'number',
                        value: 4,
                        description: 'Vertical offset in pixels.'
                    }
                },
                description: 'Dropdown offset from its anchor.'
            },
            backdrop: {
                type: 'number',
                description: 'Backdrop opacity between 0 and 1.'
            },
            closeable: {
                type: 'boolean',
                value: true,
                description: 'Whether clicking outside closes the surface.'
            },
            escape: {
                type: 'boolean',
                value: true,
                description: 'Whether the Escape key closes the surface.'
            },
            render: {
                type: 'string|function',
                required: true,
                description: 'Surface content.'
            },
            onOpen: {
                type: 'function',
                description: 'Called with the overlay item after the surface opens.'
            },
            onClose: {
                type: 'function',
                description: 'Called after the surface closes.'
            }
        }
    });
});
