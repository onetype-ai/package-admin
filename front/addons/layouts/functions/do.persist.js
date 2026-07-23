admin.layouts.Fn('do.persist', function()
{
    const active = {};

    Object.values(this.Items()).forEach((item) =>
    {
        active[item.Get('id')] = item.Get('isActive');
    });

    platform.config.set('admin.layouts.active', active);

    return active;
});
