$ot.ui.status.ItemOn('removed', (item) =>
{
	if(item.Get('render'))
	{
		$ot.ui.status.RenderRemove(item.Get('id'));
	}
});
