$ot.boot.then(() =>
{
	const match = $ot.ui.screens.Fn('match', window.location.pathname);

	if(match)
	{
		return $ot.command('ui:screens:open', { id: match.item.Get('id'), parameters: match.parameters });
	}

	const active = $ot.ui.screens.active();

	if(active)
	{
		$ot.command('ui:screens:open', { id: active.Get('id'), parameters: $ot.modules.settings.get('ui.screens.parameters', {}) });
	}
});
