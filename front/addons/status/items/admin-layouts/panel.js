onetype.AddonReady('admin.layouts', (layouts) =>
{
    layouts.Item({
        id: 'admin.status.panel',
        zone: 'root',
        slot: 'bottom',
        order: 2000,
        render: function()
        {
            this.tab = this.tab ? this.tab : null;

            return '<e-admin-status-panel :tab="tab"></e-admin-status-panel>';
        }
    });
});
