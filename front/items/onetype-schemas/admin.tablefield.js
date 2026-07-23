onetype.AddonReady('onetype.schemas', function(schemas)
{
    schemas.ItemAdd({
        id: 'admin.tablefield',
        description: 'A single column of the table view, shared by the table element.',
        addon: 'admin',
        config: {
            key: {
                type: 'string',
                description: 'Item property the column reads.'
            },
            label: {
                type: 'string',
                description: 'Column header label.'
            },
            type: {
                type: 'string',
                value: 'text',
                options: ['text', 'number', 'date', 'status', 'user', 'tags', 'image'],
                description: 'Cell renderer. Status reads label/color, user reads name/color, tags reads an array of strings.'
            },
            align: {
                type: 'string',
                value: 'left',
                options: ['left', 'right'],
                description: 'Cell alignment.'
            },
            width: {
                type: 'string',
                description: 'Grid track like 2fr or 200px. First column defaults to minmax(0, 1fr), rest to max-content.'
            }
        }
    });
});
