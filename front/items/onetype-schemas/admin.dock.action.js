onetype.AddonReady('onetype.schemas', function(schemas)
{
    schemas.ItemAdd({
        id: 'admin.dock.action',
        description: 'Icon button in the dock panel header, shared by the dock element.',
        addon: 'admin',
        config: {
            icon: {
                type: 'string',
                required: true,
                description: 'Material Symbols icon name.'
            },
            tooltip: {
                type: 'string',
                value: '',
                description: 'Tooltip text. Empty renders no tooltip.'
            },
            onClick: {
                type: 'function',
                description: 'Called with the action on click.'
            }
        }
    });
});
