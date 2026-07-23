onetype.AddonReady('admin.navbar', (navbar) =>
{
    navbar.Item({
        id: 'search',
        order: 4,
        position: 'right',
        render: '<e-admin-explorer-trigger :background="background"></e-admin-explorer-trigger>',
        popup: {
            type: 'default',
            width: 'l',
            padding: 'none',
            render: '<e-admin-explorer-panel></e-admin-explorer-panel>',
            onClose: () => onetype.emitters.fire('admin.explorer.close', {})
        }
    });
});
