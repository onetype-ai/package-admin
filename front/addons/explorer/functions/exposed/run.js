admin.explorer.FnExpose('run', function(id)
{
    const item = this.ItemGet(id);

    if(!item)
    {
        return false;
    }

    item.Get('callback')();

    onetype.emitters.fire('admin.explorer.run', { id });

    return true;
});
