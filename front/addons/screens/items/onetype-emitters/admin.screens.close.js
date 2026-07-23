onetype.AddonReady('onetype.emitters', function(emitters)
{
    emitters.ItemAdd({
        id: 'admin.screens.close',
        description: 'Fired after the active screen closes and the normal shell takes over.',
        metadata: { addon: 'admin.screens' },
        config: {
            id: {
                type: 'string',
                description: 'ID of the screen that closed.'
            }
        }
    });
});
