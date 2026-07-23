onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-dock-bar',
        addon: 'admin.dock',
        name: 'Dock Rail',
        description: 'Vertical rail that renders the dock items.',
        render: function()
        {
            const refresh = () =>
            {
                const list = admin.dock.list();
                const open = list.find((item) => item.isOpen) || null;

                this.panel = {
                    width: platform.config.get('admin.dock.width'),
                    min: 280,
                    max: 640,
                    onResize: (width) => platform.config.set('admin.dock.width', width),
                    onClose: () => commands.Fn('run', 'admin:dock:close'),
                    ...(open?.panel || {})
                };

                this.items = list.map((item) => ({
                    id: item.id,
                    icon: item.icon,
                    label: item.label,
                    color: item.color,
                    isActive: item.isActive,
                    isOpen: item.isOpen,
                    placement: item.position,
                    badge: item.badge,
                    render: item.render ? () => admin.dock.Render(item.id).Element : null,
                    onClick: () =>
                    {
                        onetype.emitters.fire('admin.dock.click', { id: item.id });

                        if(item.render)
                        {
                            return item.isOpen ? commands.Fn('run', 'admin:dock:close') : commands.Fn('run', 'admin:dock:open', { id: item.id });
                        }

                        item.onClick && item.onClick(item);
                    }
                }));
            };

            refresh();

            this.On('@addon.item.added', (item) => item.addon.GetName() === 'admin.dock' && refresh());
            this.On('@addon.item.removed', (item) => item.addon.GetName() === 'admin.dock' && refresh());

            this.On('admin.dock.open', refresh);
            this.On('admin.dock.close', refresh);
            this.On('admin.apps.open', refresh);
            this.On('admin.apps.close', refresh);
            this.On('admin.modes.switch', refresh);

            return '<e-admin-navigation-dock :items="items" :panel="panel"></e-admin-navigation-dock>';
        }
    });
});
