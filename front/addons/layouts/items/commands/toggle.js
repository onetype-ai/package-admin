onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'admin:layouts:toggle',
        addon: 'admin.layouts',
        description: 'Toggle a layout item by id. Flips the current state through ui:layouts:open or ui:layouts:close, including persistence and events.',
        exposed: true,
        silent: true,
        in: {
            id: {
                type: 'string',
                required: true,
                description: 'ID of the layout item to toggle.'
            },
            data: {
                type: 'object',
                description: 'Prop values passed to the render when opening.'
            }
        },
        out: {
            open: {
                type: 'boolean',
                description: 'Whether the item is open now.'
            }
        },
        callback: async function(properties, resolve)
        {
            const item = admin.layouts.ItemGet(properties.id);

            if(!item)
            {
                return resolve(null, 'Layout item ' + properties.id + ' not found.', 404);
            }

            const open = !item.Get('isActive');

            if(open)
            {
                await commands.Fn('run', 'admin:layouts:open', properties.data ? {
                    id: properties.id,
                    data: properties.data
                } : { id: properties.id });
            }
            else
            {
                await commands.Fn('run', 'admin:layouts:close', { id: properties.id });
            }

            resolve({ open }, 'Layout ' + properties.id + ' is now ' + (open ? 'open' : 'closed') + '.');
        }
    });
});
