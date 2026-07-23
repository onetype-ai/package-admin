onetype.AddonReady('onetype.schemas', function(schemas)
{
    schemas.ItemAdd({
        id: 'admin.sidebar.item',
        description: 'A single sidebar tree item, shared by the sidebar element.',
        addon: 'admin',
        config: {
            icon: {
                type: 'string',
                description: 'Material icon name.'
            },
            label: {
                type: 'string',
                description: 'Item text.'
            },
            value: {
                type: 'string',
                description: 'Value sent on click. Items without a value only toggle their children.'
            },
            badge: {
                type: 'string|number',
                description: 'Badge after the label.'
            },
            count: {
                type: 'string|number',
                description: 'Count on the right. Sections without one count their children.'
            },
            placement: {
                type: 'string',
                value: 'top',
                options: ['top', 'bottom'],
                description: 'Sidebar end the root item sticks to. Read only on root items.'
            },
            soon: {
                type: 'boolean',
                description: 'Marks the item as coming soon and ignores clicks.'
            },
            disabled: {
                type: 'boolean',
                description: 'Dims the item and ignores clicks.'
            },
            actions: {
                type: 'array',
                value: [],
                each: {
                    type: 'object',
                    config: 'admin.sidebar.action'
                },
                description: 'Icon buttons shown on the right while the item is hovered.'
            },
            items: {
                type: 'array',
                value: [],
                each: {
                    type: 'object',
                    description: 'Nested item, the same shape as its parent item.'
                },
                description: 'Nested children, each the same shape as this item, any depth.'
            }
        }
    });
});
