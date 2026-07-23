onetype.AddonReady('onetype.emitters', function(emitters)
{
    emitters.ItemAdd({
        id: 'admin.explorer.close',
        description: 'Fired after the explorer closes, no matter whether the close command, the Escape key or a backdrop click closed it.',
        metadata: { addon: 'admin.explorer' },
        config: {}
    });
});
