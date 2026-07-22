admin.dock.ItemOn('remove', (item) =>
{
    if(item.Get('render'))
    {
        admin.dock.RenderRemove(item.Get('id'));
    }
});
