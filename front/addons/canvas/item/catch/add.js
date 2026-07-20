$ot.ui.canvas.ItemOn('add', (item) =>
{
	const render = item.Get('render');

	if(render)
	{
		$ot.ui.canvas.RenderAdd(item.Get('id'), function()
		{
			this.Define(item.Get('config'));

			if(typeof render === 'function')
			{
				return render.call(this);
			}

			return render;
		});
	}
});
