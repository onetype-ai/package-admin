admin.navbar.ElementAdd({
	id: 'bar',
	icon: 'toolbar',
	name: 'Navbar',
	description: 'Top toolbar rendering the navbar items. Addons inject items.',
	category: 'Navbar',
	render: function()
	{
		const refresh = () =>
		{
			this.items = admin.navbar.list();
		};

		refresh();

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'admin.navbar' && refresh());
		this.On('@addon.item.modified', (item) => item.addon.GetName() === 'admin.navbar' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'admin.navbar' && refresh());

		this.On('admin.navbar.open', refresh);
		this.On('admin.navbar.close', refresh);
		this.On('admin.apps.open', refresh);
		this.On('admin.apps.close', refresh);
		this.On('admin.modes.switch', refresh);

		this.logo = 'https://images.onetype.ai/96752e47-1bea-4313-025c-5b76dc174200/public';

		return `<e-admin-navigation-navbar :logo="logo" :items="items"></e-admin-navigation-navbar>`;
	}
});
