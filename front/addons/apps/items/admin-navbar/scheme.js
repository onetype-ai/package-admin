onetype.AddonReady('admin.navbar', (navbar) =>
{
    navbar.Item({
        id: 'scheme',
        order: 3,
        position: 'right',
        icon: 'contrast',
        tooltip: 'Switch scheme',
        condition: { app: true },
        onClick: () =>
        {
            const active = admin.apps.active();

            active.Set('scheme', active.Get('scheme') === 'dark' ? 'light' : 'dark');
            admin.apps.theme();
        }
    });
});
