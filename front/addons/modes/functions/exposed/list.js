admin.modes.FnExpose('list', function()
{
    return Object.values(this.Items()).sort((left, right) => left.Get('order') - right.Get('order')).filter((item) =>
    {
        return item.Fn('visible');
    }).map((item) =>
    {
        return {
            id: item.Get('id'),
            icon: item.Get('icon'),
            label: item.Get('name'),
            isActive: item.Get('isActive')
        };
    });
});
