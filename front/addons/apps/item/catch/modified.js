admin.apps.ItemOn('modified', (item) =>
{
    if(!item.Get('isVisible') || item.Get('isHidden'))
    {
        admin.dock.ItemRemove(item.Get('id'));
    }
    else
    {
        admin.dock.Item({
            id: item.Get('id'),
            name: item.Get('name'),
            icon: item.Get('icon'),
            color: item.Get('color'),
            order: item.Get('order'),
            condition: item.Get('condition'),
            isActive: () => item.Get('isActive'),
            render: item.Get('render'),
            badge: item.Get('badge'),
            onClick: () => item.Get('isActive') ? commands.Fn('run', 'admin:apps:close') : commands.Fn('run', 'admin:apps:open', { id: item.Get('id') })
        });
    }

    if(item.Get('isHidden'))
    {
        admin.explorer.ItemRemove('app-' + item.Get('id'));
    }
    else
    {
        admin.explorer.Item({
            id: 'app-' + item.Get('id'),
            order: 10,
            group: 'Applications',
            prefix: 'apps',
            icon: item.Get('icon'),
            label: item.Get('name'),
            hint: 'Open application',
            keywords: [item.Get('id')],
            callback: () => commands.Fn('run', 'admin:apps:open', { id: item.Get('id') })
        });
    }
});
