onetype.AddonReady('onetype.emitters', function(emitters)
{
    emitters.ItemAdd({
        id: 'admin.dock.close',
        description: 'Fired after the open dock item closes.',
        metadata: { addon: 'admin.dock' },
        config: {}
    });
});
