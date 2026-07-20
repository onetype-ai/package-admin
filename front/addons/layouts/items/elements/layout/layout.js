admin.layouts.ElementAdd({
	id: 'zone',
	icon: 'layout',
	name: 'Layout',
	description: 'Workspace shell with top, left, right, bottom and center slots.',
	category: 'Layout',
	config: {
		zone: {
			type: 'string',
			value: 'root'
		}
	},
	render: function()
	{
		this.slots = admin.layouts.slots(this.zone);

		const refresh = () =>
		{
			this.slots = admin.layouts.slots(this.zone);
		};

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'admin.layouts' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'admin.layouts' && refresh());

		this.On('admin.layouts.open', refresh);
		this.On('admin.layouts.close', refresh);
		this.On('admin.apps.open', refresh);
		this.On('admin.apps.close', refresh);
		this.On('admin.modes.switch', refresh);
		this.On('admin.screens.open', refresh);
		this.On('admin.screens.close', refresh);

		this.render = (item) =>
		{
			return admin.layouts.ItemGet(item.id).Fn('render');
		};

		this.key = (item) =>
		{
			return item.id;
		};

		return `
			<div :class="'box ' + zone">
				<div ot-if="slots.left.length" class="slot left">
					<div ot-for="item in slots.left" ot-node="render(item)" :ot-key="key(item)"></div>
				</div>
				<div class="middle">
					<div ot-if="slots.top.length" class="slot top">
						<div ot-for="item in slots.top" ot-node="render(item)" :ot-key="key(item)"></div>
					</div>
					<div class="slot center">
						<div ot-for="item in slots.center" ot-node="render(item)" :ot-key="key(item)"></div>
					</div>
					<div ot-if="slots.bottom.length" class="slot bottom">
						<div ot-for="item in slots.bottom" ot-node="render(item)" :ot-key="key(item)"></div>
					</div>
				</div>
				<div ot-if="slots.right.length" class="slot right">
					<div ot-for="item in slots.right" ot-node="render(item)" :ot-key="key(item)"></div>
				</div>
			</div>
		`;
	}
});
