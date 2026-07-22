admin.apps.ItemOn('add', (item) =>
{
    onetype.AddonReady('admin.dock', (dock) =>
    {
        if(!item.Get('isVisible') || item.Get('isHidden'))
        {
            return;
        }

        dock.Item({
            id: item.Get('id'),
            name: item.Get('name'),
            icon: item.Get('icon'),
            color: item.Get('color'),
            order: item.Get('order'),
            position: item.Get('position'),
            condition: item.Get('condition'),
            isActive: () => item.Get('isActive'),
            render: item.Get('render'),
            badge: item.Get('badge'),
            onClick: () => item.Get('isActive') ? commands.Fn('run', 'admin:apps:close') : commands.Fn('run', 'admin:apps:open', { id: item.Get('id') })
        });
    });

    onetype.AddonReady('admin.explorer', (explorer) =>
    {
        if(item.Get('isHidden'))
        {
            return;
        }

        explorer.Item({
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
    });
});
