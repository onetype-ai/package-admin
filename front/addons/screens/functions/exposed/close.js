admin.screens.FnExpose('close', function()
{
	const active = admin.screens.active();

	if(!active)
	{
		return false;
	}

	config.set('admin.screens.parameters', {});

	this.StoreSet('data', {});

	config.set('admin.screens.active', null);

	if(active.Get('route') && window.location.pathname !== '/')
	{
		history.replaceState(null, '', '/');
	}

	onetype.Emit('admin.screens.close', { id: active.Get('id') });

	return true;
});
