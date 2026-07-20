admin.modes.ItemOn('remove', (item) =>
{
	admin.explorer.ItemRemove('mode-' + item.Get('id'));
});
