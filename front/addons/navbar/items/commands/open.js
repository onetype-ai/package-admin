onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'admin:navbar:open',
        addon: 'admin.navbar',
        description: 'Open a navbar item popup. Closes any other open item, tracks state and emits admin.navbar.open. Does nothing when already open.',
        exposed: true,
        in: {
            id: {
                type: 'string',
                required: true,
                description: 'ID of the navbar item to open.'
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
            const item = admin.navbar.ItemGet(properties.id);

            if(!item)
            {
                return resolve(null, 'Navbar item ' + properties.id + ' not found.', 404);
            }

            if(!item.Get('popup'))
            {
                return resolve(null, 'Navbar item ' + properties.id + ' has no popup to open.', 400);
            }

            if(admin.navbar.StoreGet('open') === properties.id)
            {
                return resolve({ id: properties.id }, 'Navbar item ' + properties.id + ' is already open.');
            }

            if(!admin.navbar.open(properties.id))
            {
                return resolve(null, 'Navbar item ' + properties.id + ' is not on screen to anchor its dropdown.', 400);
            }

            resolve({ id: properties.id }, 'Navbar item ' + properties.id + ' opened.');
        }
    });
});
