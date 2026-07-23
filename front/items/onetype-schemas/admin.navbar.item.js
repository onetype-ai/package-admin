onetype.AddonReady('onetype.schemas', function(schemas)
{
    schemas.ItemAdd({
        id: 'admin.navbar.item',
        description: 'A single navbar toolbar item, shared by the navbar element.',
        addon: 'admin',
        config: {
            id: {
                type: 'string',
                description: 'Unique item id.'
            },
            type: {
                type: 'string',
                value: 'default',
                options: ['default', 'separator'],
                description: 'What the item is. default renders the item, separator draws a divider.'
            },
            popup: {
                type: 'object',
                config: 'admin.popup',
                description: 'Floating surface the item opens on click. Without it the click runs the click handler.'
            },
            position: {
                type: 'string',
                value: 'left',
                options: ['left', 'center', 'right'],
                description: 'Area of the bar the item goes into.'
            },
            icon: {
                type: 'string',
                description: 'Material icon name.'
            },
            label: {
                type: 'string',
                description: 'Button text.'
            },
            tooltip: {
                type: 'string',
                description: 'Tooltip text, useful for icon only items.'
            },
            active: {
                type: 'boolean',
                value: false,
                description: 'Shows the active pill on the item.'
            },
            color: {
                type: 'string',
                value: 'var(--ot-brand)',
                description: 'Accent color used while the item is active.'
            },
            badge: {
                type: 'boolean|string|number',
                description: 'Small marker on the item. A short label or count. True renders a plain dot.'
            },
            click: {
                type: 'function',
                description: 'Called with the item on click, before the type behavior runs. Ignored on separators and dropdowns.'
            },
            render: {
                type: 'string|function',
                description: 'Inline content, how the item renders in the bar instead of the default button.'
            }
        }
    });
});
