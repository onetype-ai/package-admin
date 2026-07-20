admin.explorer.FnExpose('open', function()
{
	if(admin.navbar.opened()?.Get('id') === 'explorer')
	{
		return false;
	}

	admin.navbar.open('explorer');

	onetype.Emit('admin.explorer.open', {});

	return true;
});
