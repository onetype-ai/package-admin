admin.status.Fn('get.list', function()
{
    const panel = admin.layouts.ItemGet('admin.status.panel');
    const active = panel && panel.Get('active') ? panel.Get('data').tab : null;

    return Object.values(this.Items()).sort((left, right) => left.Get('order') - right.Get('order')).filter((item) =>
    {
        return item.Fn('visible');
    }).map((item) =>
    {
        return {
            id: item.Get('id'),
            icon: item.Get('icon'),
            label: item.Get('label'),
            align: item.Get('align'),
            tab: !!item.Get('render'),
            open: item.Get('id') === active
        };
    });
});
