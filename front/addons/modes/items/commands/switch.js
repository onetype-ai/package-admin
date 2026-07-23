onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'admin:modes:switch',
        addon: 'admin.modes',
        description: 'Switches the current mode. Deactivates active modes, activates the given one and persists it. No-op when already active.',
        exposed: true,
        in: {
            id: {
                type: 'string',
                required: true,
                description: 'ID of the mode to switch to. Must match a registered, currently visible mode item.'
            }
        },
        out: {
            id: {
                type: 'string',
                description: 'ID of the mode that is now active.'
            }
        },
        callback: function(properties, resolve)
        {
            const item = admin.modes.ItemGet(properties.id);

            if(!item)
            {
                return resolve(null, 'Mode ' + properties.id + ' not found.', 404);
            }

            if(!item.Fn('visible'))
            {
                return resolve(null, 'Mode ' + properties.id + ' is not visible right now.', 400);
            }

            const changed = admin.modes.switch(properties.id);

            if(!changed)
            {
                return resolve({ id: properties.id }, 'Mode ' + properties.id + ' is already active.');
            }

            resolve({ id: properties.id }, 'Mode ' + properties.id + ' is now active.');
        }
    });
});
