onetype.AddonReady('platform.config', function(config)
{
    config.Item({
        id: 'admin.apps.active',
        description: 'ID of the app open on the rail, null while none is active.',
        value: null,
        config: {
            type: 'string',
            value: null,
            description: 'ID of the app open on the rail, null while none is active.'
        }
    });
});
