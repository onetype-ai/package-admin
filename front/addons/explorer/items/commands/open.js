onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'admin:explorer:open',
        addon: 'admin.explorer',
        description: 'Open the explorer, the universal search. Emits admin.explorer.open. Does nothing when already open.',
        exposed: true,
        in: {},
        out: {},
        callback: function(properties, resolve)
        {
            const changed = admin.explorer.open();

            if(!changed)
            {
                return resolve({}, 'Explorer is already open.');
            }

            resolve({}, 'Explorer opened.');
        }
    });
});
