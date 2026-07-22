onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'admin:apps:close',
        addon: 'admin.apps',
        description: 'Close the active app so none is selected. Runs the deactivate hook, persists the empty state and emits admin.apps.close. Does nothing when no app is active.',
        exposed: true,
        out: {
            id: {
                type: 'string',
                description: 'ID of the app that was closed. Empty when none was active.'
            }
        },
        callback: function(properties, resolve)
        {
            const active = admin.apps.active();

            if(!active)
            {
                return resolve({ id: '' }, 'No app is active.');
            }

            admin.apps.close();

            resolve({ id: active.Get('id') }, 'App ' + active.Get('id') + ' closed.');
        }
    });
});
