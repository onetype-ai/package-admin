admin.dock.ElementAdd({
	id: 'bar',
	icon: 'dock_to_right',
	name: 'Dock Rail',
	description: 'Vertical rail that renders the dock items.',
	category: 'Dock',
	render: function()
	{
		const refresh = () =>
		{
			const list = admin.dock.list();
			const open = list.find((item) => item.isOpen) || null;

			this.panel = {
				width: config.get('admin.dock.width'),
				min: 280,
				max: 640,
				onResize: (width) => config.set('admin.dock.width', width),
				onClose: () => admin.dock.Command('close'),
				...(open?.panel || {})
			};

			this.items = list.map((item) => ({
				id: item.id,
				icon: item.icon,
				label: item.label,
				color: item.color,
				isActive: item.isActive,
				isOpen: item.isOpen,
				placement: item.position,
				badge: item.badge,
				render: item.render ? () => admin.dock.Render(item.id).Element : null,
				onClick: () =>
				{
					onetype.Emit('admin.dock.click', { id: item.id });

					if(item.render)
					{
						return item.isOpen ? admin.dock.Command('close') : admin.dock.Command('open', { id: item.id });
					}

					item.onClick && item.onClick(item);
				}
			}));
		};

		refresh();

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'admin.dock' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'admin.dock' && refresh());

		this.On('admin.dock.open', refresh);
		this.On('admin.dock.close', refresh);
		this.On('admin.apps.open', refresh);
		this.On('admin.apps.close', refresh);
		this.On('admin.modes.switch', refresh);

		return `<e-admin-navigation-dock :items="items" :panel="panel"></e-admin-navigation-dock>`;
	}
});
