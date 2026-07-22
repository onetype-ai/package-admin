admin.layouts.Fn('restore', function()
{
    const active = config.get('admin.layouts.active');
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

    onetype.Emit('admin.layouts.open', { ids: opened });

    return active;
});
