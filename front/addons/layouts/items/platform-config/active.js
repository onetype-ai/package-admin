onetype.AddonReady('platform.config', function(config)
{
    config.Item({
        id: 'admin.layouts.active',
        description: 'Persisted open state per layout item, keyed by item id.',
        value: {},
        config: {
            type: 'object',
            value: {},
            description: 'Persisted open state per layout item, keyed by item id.'
        }
    });
});
