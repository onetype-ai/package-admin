onetype.AddonReady('onetype.emitters', function(emitters)
{
    emitters.ItemAdd({
        id: 'admin.apps.close',
        description: 'Fired after the active app closes and none is selected.',
        metadata: { addon: 'admin.apps' },
        config: {
            id: {
                type: 'string',
                description: 'ID of the app that was closed.'
            }
        }
    });
});
