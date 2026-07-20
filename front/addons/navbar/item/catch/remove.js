$ot.ui.navbar.ItemOn('remove', (item) =>
{
	if(item.Get('render'))
	{
		$ot.ui.navbar.RenderRemove(item.Get('id'));
	}
});
