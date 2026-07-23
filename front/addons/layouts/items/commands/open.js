onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'admin:layouts:open',
        addon: 'admin.layouts',
        description: 'Open a layout item by id, passing data to the renders. Emits admin.layouts.open. An already open item only receives the new data.',
        exposed: true,
        in: {
            id: {
                type: 'string',
                required: true,
                description: 'ID of the layout item to open.'
            },
            data: {
                type: 'object',
                description: 'Prop values passed to the renders.'
            }
        },
        out: {
            id: {
                type: 'string',
                description: 'ID of the layout item.'
            }
        },
        callback: async function(properties, resolve)
        {
            const context = await onetype.middlewares.run('admin.layouts.open', { properties, cancel: false });

            if(context.value.cancel)
            {
                return resolve(null, 'Layout open cancelled.', 400);
            }

            properties = context.value.properties;

            if(!admin.layouts.ItemGet(properties.id))
            {
                return resolve(null, 'Layout item ' + properties.id + ' not found.', 404);
            }

            const changed = admin.layouts.open(properties.id, properties.data);

            if(!changed && !properties.data)
            {
                return resolve({ id: properties.id }, 'Layout ' + properties.id + ' already open.');
            }

            if(!changed)
            {
                return resolve({ id: properties.id }, 'Layout data updated.');
            }

            resolve({ id: properties.id }, 'Layout ' + properties.id + ' opened.');
        }
    });
});
