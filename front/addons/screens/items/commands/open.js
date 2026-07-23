onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'admin:screens:open',
        addon: 'admin.screens',
        description: 'Open a screen. Replaces the active screen, writes its route to the address bar, emits admin.screens.open. Only its layouts stay visible.',
        exposed: true,
        in: {
            id: {
                type: 'string',
                required: true,
                description: 'ID of the screen to open. Must match a registered screen item.'
            },
            parameters: {
                type: 'object',
                value: {},
                description: 'Route parameter values, mapped into the layouts data through the screen params map.'
            }
        },
        out: {
            id: {
                type: 'string',
                description: 'ID of the screen that is now open.'
            }
        },
        callback: function(properties, resolve)
        {
            const item = admin.screens.ItemGet(properties.id);

            if(!item)
            {
                return resolve(null, 'Screen ' + properties.id + ' not found.', 404);
            }

            const changed = admin.screens.open(properties.id, properties.parameters);

            if(!changed)
            {
                return resolve({ id: properties.id }, 'Screen ' + properties.id + ' is already open.');
            }

            resolve({ id: properties.id }, 'Screen ' + properties.id + ' is now open.');
        }
    });
});
