onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-apps-list',
        addon: 'admin.apps',
        name: 'Apps List',
        description: 'Launcher with application cards and their quick links.',
        render: function()
        {
            const refresh = () =>
            {
                const items = Object.values(admin.apps.Items());
                const visible = items.filter((item) => !item.Get('isVisible') && item.Fn('visible'));

                this.apps = visible.sort((left, right) => left.Get('order') - right.Get('order')).map((item) =>
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
                commands.Fn('run', 'admin:apps:open', { id: app.id });
                commands.Fn('run', 'admin:dock:close');
            };

            this.jump = (link) =>
            {
                link.onClick && link.onClick(link);
                commands.Fn('run', 'admin:dock:close');
            };

            return `
                <div class="box">
                    <div ot-if="apps.length" class="list ot-scrollbar">
                        <div ot-for="app in apps" :ot-key="app.id"
                            :class="'app' + (app.isActive ? ' active' : '')"
                            :style="'--color: ' + (app.color || 'var(--ot-brand)')">
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
                    <e-admin-status-empty ot-if="!apps.length" icon="apps" title="Nothing here"
                        description="Every application is already on the rail."></e-admin-status-empty>
                </div>
            `;
        }
    });
});
