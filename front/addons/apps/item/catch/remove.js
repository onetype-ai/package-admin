$ot.ui.apps.ItemOn('remove', (item) =>
{
	$ot.ui.dock.ItemRemove(item.Get('id'));

	$ot.ui.explorer.ItemRemove('app-' + item.Get('id'));
});
