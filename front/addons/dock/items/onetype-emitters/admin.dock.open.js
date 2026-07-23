onetype.AddonReady('onetype.emitters', function(emitters)
{
    emitters.ItemAdd({
        id: 'admin.dock.open',
        description: 'Fired after a dock item opens.',
        metadata: { addon: 'admin.dock' },
        config: {
            id: {
                type: 'string',
                description: 'ID of the item that opened.'
            }
        }
    });
});
