admin.apps.ItemOn('remove', (item) =>
{
    admin.dock.ItemRemove(item.Get('id'));

    admin.explorer.ItemRemove('app-' + item.Get('id'));
});
