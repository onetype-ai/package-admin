onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'admin:dock:open',
        addon: 'admin.dock',
        description: 'Open a dock item. Items with a render show it here instead of running click; opening one closes any other open item first. Persists the open item and emits admin.dock.open. Does nothing when the item is already open.',
        exposed: true,
        in: {
            id: {
                type: 'string',
                required: true,
                description: 'ID of the dock item to open.'
            }
        },
        out: {
            id: {
                type: 'string',
                description: 'ID of the item that is open now.'
            }
        },
        callback: function(properties, resolve)
        {
            const item = admin.dock.ItemGet(properties.id);

            if(!item)
            {
                return resolve(null, 'Dock item ' + properties.id + ' not found.', 404);
            }

            if(!item.Get('render'))
            {
                return resolve(null, 'Dock item ' + properties.id + ' has no render.', 400);
            }

            const changed = admin.dock.open(properties.id);

            if(!changed)
            {
                return resolve({ id: properties.id }, 'Dock item ' + properties.id + ' is already open.');
            }

            resolve({ id: properties.id }, 'Dock item ' + properties.id + ' opened.');
        }
    });
});
