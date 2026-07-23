onetype.AddonReady('admin', (admin) =>
{
    admin.screens = onetype.Addon('admin.screens', (addon) =>
    {
        addon.Field('id', {
            type: 'string',
            required: true,
            description: 'Unique screen id, namespaced by the addon that registers it, like auth.login.'
        });

        addon.Field('route', {
            type: 'string|array',
            each: {
                type: 'string',
                description: 'A single route pattern.'
            },
            description: 'URL patterns the screen lives on, like /developer/elements/:id. Opening writes the best pattern to the URL bar, a matching URL opens.'
        });

        addon.Field('app', {
            type: 'string',
            description: 'App the screen belongs to. Opening the screen opens the app, opening another closes it. Empty closes the active app while open.'
        });

        addon.Field('mode', {
            type: 'string',
            description: 'Mode the screen switches to on open. Switching modes opens the sibling screen of the new mode, closes it if none. Empty leaves alone.'
        });

        addon.Field('isDefault', {
            type: 'boolean',
            value: false,
            description: 'Marks the screen a mode switch opens when the mode has more than one.'
        });

        addon.Field('data', {
            type: 'function',
            description: 'Called with the route parameters as this on open. Returns values merged into layouts data while open, never persisted, always live.'
        });

        addon.Field('config', {
            type: 'object',
            value: {},
            description: 'Prop schema for screen level data, merged into the global layouts data shape.'
        });

        addon.Field('metadata', {
            type: 'object',
            value: {},
            description: 'Provenance of the screen, the addon that registered it.'
        });
    });
});
