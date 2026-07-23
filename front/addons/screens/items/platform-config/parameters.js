onetype.AddonReady('platform.config', function(config)
{
    config.Item({
        id: 'admin.screens.parameters',
        description: 'Route parameters of the open screen, kept so it restores completely on the next load.',
        value: {},
        config: {
            type: 'object',
            value: {},
            description: 'Route parameters of the open screen, keyed by parameter name.'
        }
    });
});
