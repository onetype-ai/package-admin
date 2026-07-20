pages.Item({
	id: 'home',
	route: '/*',
	title: 'OneType - Platform',
	grid: {
		template: '"app"',
		columns: '1fr',
		rows: '1fr',
		gap: '0'
	},
	areas: {
		app: function()
		{
			this.ready = false;

			$ot.platform.boot.then(() =>
			{
				this.ready = true;
			});

			return `
				<div ot-if="!ready" style="width: 100%; height: 100%;">
					<e-status-loading></e-status-loading>
				</div>
				<div ot-if="ready" style="display: grid; width: 100%; height: 100%; grid-template-areas: 'navbar navbar' 'rail workspace' 'status status'; grid-template-columns: auto 1fr; grid-template-rows: 46px 1fr 32px;">
					<div style="grid-area: navbar;"><e-admin-navbar-bar></e-admin-navbar-bar></div>
					<div style="grid-area: rail;"><e-admin-dock-bar></e-admin-dock-bar></div>
					<div style="grid-area: workspace; min-width: 0; overflow: hidden;"><e-admin-layouts-zone></e-admin-layouts-zone></div>
					<div style="grid-area: status;"><e-admin-status-bar></e-admin-status-bar></div>
				</div>
			`;
		}
	}
});
