onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'admin:explorer:toggle',
        addon: 'admin.explorer',
        description: 'Toggle the explorer. Flips the current state through ui:explorer:open or ui:explorer:close.',
        exposed: true,
        silent: true,
        in: {},
        out: {
            open: {
                type: 'boolean',
                description: 'Whether the explorer is open now.'
            }
        },
        callback: async function(properties, resolve)
        {
            const open = admin.navbar.opened()?.Get('id') !== 'search';

            await admin.explorer.Command(open ? 'open' : 'close');

            resolve({ open }, 'Explorer is now ' + (open ? 'open' : 'closed') + '.');
        }
    });
});
