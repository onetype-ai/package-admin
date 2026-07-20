$ot.ui.layouts.ItemOn('remove', (item) =>
{
	if(item.Get('render'))
	{
		$ot.ui.layouts.RenderRemove(item.Get('id'));
	}
});
