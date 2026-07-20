$ot.ui.dock.ItemOn('add', (item) =>
{
	const render = item.Get('render');

	if(render)
	{
		$ot.ui.dock.RenderAdd(item.Get('id'), function()
		{
			if(typeof render === 'function')
			{
				return render.call(this);
			}

			return render;
		});
	}
});
