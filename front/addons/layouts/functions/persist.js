admin.layouts.Fn('persist', function()
{
    const active = {};

    Object.values(this.Items()).forEach((item) =>
    {
        active[item.Get('id')] = item.Get('isActive');
    });

    config.set('admin.layouts.active', active);

    return active;
});
