onetype.AddonReady('onetype.emitters', function(emitters)
{
    emitters.ItemAdd({
        id: 'admin.explorer.open',
        description: 'Fired after the explorer opens.',
        metadata: { addon: 'admin.explorer' },
        config: {}
    });
});
