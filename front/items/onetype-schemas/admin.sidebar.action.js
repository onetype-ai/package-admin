onetype.AddonReady('onetype.schemas', function(schemas)
{
    schemas.ItemAdd({
        id: 'admin.sidebar.action',
        description: 'Icon button shown on a sidebar item while hovered, shared by the sidebar element.',
        addon: 'admin',
        config: {
            icon: {
                type: 'string',
                required: true,
                description: 'Material Symbols icon name.'
            },
            tooltip: {
                type: 'string',
                description: 'Tooltip text. Empty renders no tooltip.'
            },
            onClick: {
                type: 'function',
                description: 'Called with { event, action, item } on click.'
            }
        }
    });
});
