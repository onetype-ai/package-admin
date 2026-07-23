onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-status-bar',
        addon: 'admin.status',
        name: 'Status',
        description: 'Bottom status bar. Plain segments show state, tabs open their panel through admin.layouts.',
        render: function()
        {
            const refresh = () =>
            {
                const list = admin.status.Fn('get.list');

                this.left = list.filter((item) => item.align === 'left');
                this.right = list.filter((item) => item.align === 'right');
            };

            refresh();

            this.On('@addon.item.added', (item) => item.addon.GetName() === 'admin.status' && refresh());
            this.On('@addon.item.modified', (item) => item.addon.GetName() === 'admin.status' && refresh());
            this.On('@addon.item.removed', (item) => item.addon.GetName() === 'admin.status' && refresh());

            this.On('admin.apps.open', refresh);
            this.On('admin.apps.close', refresh);
            this.On('admin.modes.switch', refresh);
            this.On('admin.layouts.open', refresh);
            this.On('admin.layouts.close', refresh);

            this.classes = (item) =>
            {
                let classes = 'segment';

                if(item.tab)
                {
                    classes += ' tab';
                }

                if(item.open)
                {
                    classes += ' open';
                }

                return classes;
            };

            this.toggle = (item) =>
            {
                if(!item.tab)
                {
                    return;
                }

                if(item.open)
                {
                    commands.Fn('run', 'admin:layouts:close', { id: 'admin.status.panel' });
                }
                else
                {
                    commands.Fn('run', 'admin:layouts:open', {
                        id: 'admin.status.panel',
                        data: { tab: item.id }
                    });
                }
            };

            return `
                <div class="box">
                    <div class="bar">
                        <div class="side left">
                            <div ot-for="item in left" :ot-key="item.id">
                                <div :class="classes(item)" ot-click="toggle(item)">
                                    <i ot-if="item.icon">{{ item.icon }}</i>
                                    <span ot-if="item.label">{{ item.label }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="side right">
                            <div ot-for="item in right" :ot-key="item.id">
                                <div :class="classes(item)" ot-click="toggle(item)">
                                    <i ot-if="item.icon">{{ item.icon }}</i>
                                    <span ot-if="item.label">{{ item.label }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });
});
