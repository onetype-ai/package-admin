onetype.AddonReady('onetype.schemas', function(schemas)
{
    schemas.ItemAdd({
        id: 'admin.dock.item',
        description: 'A single dock rail item, shared by the dock element.',
        addon: 'admin',
        config: {
            type: {
                type: 'string',
                value: 'item',
                options: ['item', 'separator'],
                description: 'Item kind. A separator renders a divider line.'
            },
            placement: {
                type: 'string',
                value: 'top',
                options: ['top', 'bottom'],
                description: 'Rail end the item sticks to.'
            },
            icon: {
                type: 'string',
                description: 'Material icon name.'
            },
            label: {
                type: 'string',
                description: 'Tooltip text.'
            },
            hint: {
                type: 'string',
                value: '',
                description: 'Shortcut hint shown next to the tooltip text, like Cmd K.'
            },
            isActive: {
                type: 'boolean',
                value: false,
                description: 'Whether the item is the active one.'
            },
            isOpen: {
                type: 'boolean',
                value: false,
                description: 'Whether the side panel of this item is open. One item at most should be open.'
            },
            isDisabled: {
                type: 'boolean',
                value: false,
                description: 'Dims the item and ignores clicks.'
            },
            color: {
                type: 'string',
                description: 'Accent color while active. Empty follows the background hover tone, matching the dock.'
            },
            onClick: {
                type: 'function',
                description: 'Called with the item on click. Ignored when render is set.'
            },
            render: {
                type: 'string|function',
                description: 'Panel content shown to the right of the rail while this item is the open one.'
            },
            badge: {
                type: 'boolean|string|number',
                description: 'Small marker on the icon. A short label or count. Empty renders a plain dot.'
            }
        }
    });
});
