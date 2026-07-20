admin.status.Fn('item.visible', function(item)
{
	if(!item.Get('active'))
	{
		return false;
	}

	const app = admin.apps.active()?.Get('id');
	const apps = item.Get('app');

	if(apps.length && !apps.includes(app))
	{
		return false;
	}

	const list = item.Get('mode');

	if(list.length && !list.includes(admin.modes.active()?.Get('id')))
	{
		return false;
	}

	return true;
});
