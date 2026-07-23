admin.dock.FnExpose('close', function()
{
    const item = Object.values(this.Items()).find((item) => item.Get('isOpen'));

    if(!item)
    {
        return false;
    }

    item.Set('isOpen', false);

    onetype.emitters.fire('admin.dock.close', {});

    return true;
});
