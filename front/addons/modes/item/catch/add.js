admin.modes.ItemOn('add', (item) =>
{
	onetype.AddonReady('admin.explorer', (explorer) =>
	{
		explorer.Item({
			id: 'mode-' + item.Get('id'),
			order: 20,
			group: 'Modes',
			prefix: 'modes',
			icon: item.Get('icon') || 'tune',
			label: item.Get('name') || item.Get('id'),
			hint: 'Switch mode',
			keywords: [item.Get('id')],
			condition: { app: item.Get('condition').app },
			callback: () => admin.modes.Command('switch', { id: item.Get('id') })
		});
	});
});
