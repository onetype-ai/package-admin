admin.apps.FnExpose('open', function(id)
{
	const item = this.ItemGet(id);

	if(!item)
	{
		return false;
	}

	const previous = admin.apps.active();

	if(previous?.Get('id') === id)
	{
		return false;
	}

	if(previous && previous.Get('onDeactivate'))
	{
		previous.Get('onDeactivate')(previous);
	}

	const screen = admin.screens.active();

	if(screen && screen.Get('app') !== id)
	{
		admin.screens.close();
	}

	config.set('admin.apps.active', id);

	if(item.Get('onActivate'))
	{
		item.Get('onActivate')(item);
	}

	onetype.Emit('admin.apps.open', { id });

	return true;
});
