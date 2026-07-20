$ot.ui.canvas.ItemOn('removed', (item) =>
{
	if(item.Get('render'))
	{
		$ot.ui.canvas.RenderRemove(item.Get('id'));
	}
});
