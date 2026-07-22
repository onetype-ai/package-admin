onetype.AddonReady('admin.layouts', (layouts) =>
{
    layouts.Item({
        id: 'modes-bar',
        isActive: true,
        zone: 'root',
        slot: 'bottom',
        order: 1000,
        render: `<e-admin-modes-bar></e-admin-modes-bar>`
    });
});
