onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'admin:screens:close',
        addon: 'admin.screens',
        description: 'Close the active screen, restore the root route and emit admin.screens.close. The normal shell layouts take over again.',
        exposed: true,
        in: {},
        out: {
            id: {
                type: 'string',
                description: 'ID of the screen that was closed.'
            }
        },
        callback: function(properties, resolve)
        {
            const active = admin.screens.active();

            if(!active)
            {
                return resolve(null, 'No screen is open.', 400);
            }

            admin.screens.close();

            resolve({ id: active.Get('id') }, 'Screen ' + active.Get('id') + ' is closed.');
        }
    });
});
