onetype.AddonReady('admin.navbar', (navbar) =>
{
	navbar.Item({
		id: 'scheme',
		order: 3,
		position: 'right',
		icon: 'contrast',
		tooltip: 'Switch scheme',
		condition: { app: true },
		onClick: () =>
		{
			const active = admin.apps.active();
			const schemes = ['midnight', 'studio', 'daylight', 'eclipse'];
			const index = schemes.indexOf(active.Get('scheme'));

			active.Set('scheme', schemes[(index + 1) % schemes.length]);
			admin.apps.theme();
		}
	});
});
