$ot.ui.dock.ItemOn('remove', (item) =>
{
	if(item.Get('render'))
	{
		$ot.ui.dock.RenderRemove(item.Get('id'));
	}
});
