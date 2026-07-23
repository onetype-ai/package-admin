onetype.AddonReady('onetype.emitters', function(emitters)
{
    emitters.ItemAdd({
        id: 'admin.apps.open',
        description: 'Fired after an app becomes active. Not fired when opening the app that is already active.',
        metadata: { addon: 'admin.apps' },
        config: {
            id: {
                type: 'string',
                description: 'ID of the app that became active.'
            }
        }
    });
});
