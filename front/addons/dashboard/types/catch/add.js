$ot.ui.dashboard.types.ItemOn('add', (item) =>
{
	$ot.ui.dashboard.types.RenderAdd(item.Get('id'), function()
	{
		this.Define(item.Get('config'));

		return item.Get('render').call(this);
	});
});
