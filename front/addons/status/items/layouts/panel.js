onetype.AddonReady('admin.layouts', (layouts) =>
{
	layouts.Item({
		id: 'status-panel',
		zone: 'root',
		slot: 'bottom',
		order: 2000,
		render: function()
		{
			return '<e-admin-status-panel :tab="tab"></e-admin-status-panel>';
		}
	});
});
