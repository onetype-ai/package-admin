admin.modes.ElementAdd({
	id: 'bar',
	icon: 'layout',
	name: 'Modes Bar',
	description: 'Floating bar to switch modes.',
	category: 'Modes',
	render: function()
	{
		const refresh = () =>
		{
			const list = admin.modes.list();

			this.options = list.map((mode) => ({ value: mode.id, icon: mode.icon, tooltip: mode.label }));
			this.value = list.find((mode) => mode.isActive)?.id || null;
		};

		refresh();

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'admin.modes' && refresh());
		this.On('@addon.item.modified', (item) => item.addon.GetName() === 'admin.modes' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'admin.modes' && refresh());

		this.On('admin.modes.switch', refresh);
		this.On('admin.apps.open', refresh);
		this.On('admin.apps.close', refresh);

		this.change = ({ value }) =>
		{
			admin.modes.Command('switch', { id: value });
		};

		return `
			<div ot-if="options.length" class="holder">
				<e-form-options :value="value" :options="options" :_change="change"></e-form-options>
			</div>
		`;
	}
});
