onetype.AddonReady('onetype.emitters', function(emitters)
{
    emitters.ItemAdd({
        id: 'admin.layouts.open',
        description: 'Fired after layout items open or receive new data. Carries only the ids that actually changed.',
        metadata: { addon: 'admin.layouts' },
        config: {
            ids: {
                type: 'array',
                each: { type: 'string' },
                description: 'IDs of the layout items that opened.'
            }
        }
    });
});
