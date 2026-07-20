$ot.platform.boot.then(() =>
{
	const match = admin.screens.match(window.location.pathname);

	if(match)
	{
		return admin.screens.Command('open', { id: match.item.Get('id'), parameters: match.parameters });
	}

	const active = admin.screens.active();

	if(active)
	{
		admin.screens.Command('open', { id: active.Get('id'), parameters: config.get('admin.screens.parameters') });
	}
});
