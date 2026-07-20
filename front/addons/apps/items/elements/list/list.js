admin.apps.ElementAdd({
	id: 'list',
	icon: 'apps',
	name: 'Apps List',
	description: 'Launcher with application cards and their quick links.',
	category: 'Apps',
	render: function()
	{
		const refresh = () =>
		{
			this.apps = Object.values(admin.apps.Items()).filter((item) => !item.Get('isVisible') && item.Fn('visible')).sort((a, b) => a.Get('order') - b.Get('order')).map((item) =>
			{
				return {
					id: item.Get('id'),
					name: item.Get('name'),
					description: item.Get('description'),
					icon: item.Get('icon'),
					color: item.Get('color'),
					links: item.Get('links'),
					isActive: item.Get('isActive')
				};
			});
		};

		refresh();

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'admin.apps' && refresh());
		this.On('@addon.item.modified', (item) => item.addon.GetName() === 'admin.apps' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'admin.apps' && refresh());

		this.On('admin.apps.open', refresh);
		this.On('admin.apps.close', refresh);

		this.open = (app) =>
		{
			admin.apps.Command('open', { id: app.id });
			admin.dock.Command('close');
		};

		this.jump = (link) =>
		{
			link.onClick && link.onClick(link);
			admin.dock.Command('close');
		};

		return `
			<div class="box">
				<div ot-if="apps.length" class="list ot-scrollbar">
					<div ot-for="app in apps" :ot-key="app.id" :class="'app' + (app.isActive ? ' active' : '')" :style="'--color: ' + (app.color || 'var(--ot-brand)')">
						<div class="main" ot-click="open(app)">
							<span class="chip"><i>{{ app.icon }}</i></span>
							<span class="info">
								<span class="name">{{ app.name }}</span>
								<span ot-if="app.description" class="description">{{ app.description }}</span>
							</span>
							<span ot-if="app.isActive" class="dot"></span>
							<i ot-if="!app.isActive" class="go">chevron_right</i>
						</div>
						<div ot-if="app.links.length" class="links">
							<div ot-for="link in app.links" :ot-key="link.name" class="link" ot-click="jump(link)">
								<i ot-if="link.icon">{{ link.icon }}</i>
								<span>{{ link.name }}</span>
							</div>
						</div>
					</div>
				</div>
				<e-status-empty ot-if="!apps.length" icon="apps" title="Nothing here" description="Every application is already on the rail."></e-status-empty>
			</div>
		`;
	}
});
