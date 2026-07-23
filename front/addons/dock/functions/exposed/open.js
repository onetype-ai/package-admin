admin.dock.FnExpose('open', function(id)
{
    const item = this.ItemGet(id);

    if(!item || !item.Get('render') || item.Get('isOpen'))
    {
        return false;
    }

    item.Set('isOpen', true);

    onetype.emitters.fire('admin.dock.open', { id });

    return true;
});
