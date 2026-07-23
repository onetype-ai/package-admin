admin.navbar.FnExpose('open', function(id)
{
    const item = this.ItemGet(id);

    if(!item || !item.Get('popup'))
    {
        return false;
    }

    const previous = this.StoreGet('open');

    if(previous === id)
    {
        return false;
    }

    if(previous)
    {
        this.ItemGet(previous)?.Fn('close');
    }

    if(!item.Fn('open'))
    {
        return false;
    }

    this.StoreSet('open', id);

    onetype.emitters.fire('admin.navbar.open', { id });

    return true;
});
