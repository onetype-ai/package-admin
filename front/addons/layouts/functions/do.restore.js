admin.layouts.Fn('do.restore', function()
{
    const active = platform.config.get('admin.layouts.active');
    const opened = [];

    Object.entries(active).forEach(([id, open]) =>
    {
        const item = this.ItemGet(id);

        if(!item)
        {
            return;
        }

        item.Set('isActive', open, false);

        if(open)
        {
            opened.push(id);
        }
    });

    onetype.emitters.fire('admin.layouts.open', { ids: opened });

    return active;
});
