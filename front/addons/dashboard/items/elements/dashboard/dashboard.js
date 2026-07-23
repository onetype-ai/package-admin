onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-dashboard-board',
        addon: 'admin.dashboard',
        name: 'Dashboard',
        description: 'Responsive board that lays out dashboard widgets on a twelve column grid, grouped into sections, and resolves each widget data.',
        config: {
            pattern: {
                type: 'string',
                options: ['dots', 'lines'],
                description: 'Backdrop pattern behind the board, drawn across the full element width. Empty renders a plain background.'
            }
        },
        render: function()
        {
            const load = async (widget) =>
            {
                const source = widget.item.Get('data');

                widget.state = 'loading';

                try
                {
                    widget.payload = (typeof source === 'function' ? await source(widget.item) : source) || {};
                    widget.state = 'ready';
                }
                catch(error)
                {
                    widget.error = error?.message || 'Could not load this widget.';
                    widget.state = 'error';
                }

                this.Update();
            };

            const map = (item) =>
            {
                const widget = admin.dashboard.Fn('make.widget', item);

                this.pending.push(widget);

                if(widget.refresh)
                {
                    this.timers.push(setInterval(() => load(widget), widget.refresh * 1000));
                }

                return widget;
            };

            const group = (section) =>
            {
                return {
                    ...admin.dashboard.Fn('make.section', section),
                    widgets: admin.dashboard.Fn('get.widgets', section ? section.Get('id') : null).map(map)
                };
            };

            const build = () =>
            {
                this.timers.forEach(clearInterval);
                this.timers = [];
                this.pending = [];
                this.sections = [group(null), ...admin.dashboard.Fn('get.sections').map(group)].filter((section) => section.widgets.length);
            };

            const refresh = () =>
            {
                build();
                this.pending.forEach(load);
            };

            if(!this.sections)
            {
                this.timers = [];
                this.pending = [];

                build();

                this.OnMounted(() => this.pending.forEach(load));
                this.OnDestroy(() => this.timers.forEach(clearInterval));
            }

            this.On('@addon.item.added', (item) => ['admin.dashboard.widgets', 'admin.dashboard.sections'].includes(item.addon.GetName()) && refresh());
            this.On('@addon.item.removed', (item) => ['admin.dashboard.widgets', 'admin.dashboard.sections'].includes(item.addon.GetName()) && refresh());
            this.On('admin.apps.open', refresh);
            this.On('admin.apps.close', refresh);
            this.On('admin.modes.switch', refresh);

            this.retry = (widget) =>
            {
                widget.state = 'loading';

                this.Update();

                load(widget);
            };

            this.classes = (section) => section.background ? 'section panel bg-' + section.background : 'section';

            this.card = (widget) => widget.color ? 'card ' + widget.color : 'card';

            this.body = (widget) =>
            {
                return admin.dashboard.types.Render(widget.type, {
                    color: widget.color,
                    payload: widget.payload
                }).Element;
            };

            return `
                <div :class="pattern ? 'box ' + pattern : 'box'">
                    <section ot-for="section in sections" :ot-key="section.id || 'loose'" :class="classes(section)">
                        <e-admin-global-heading
                            ot-if="section.title"
                            :icon="section.icon"
                            :title="section.title"
                            :description="section.description"
                            element="h3"
                        ></e-admin-global-heading>
                        <div class="grid">
                            <div ot-for="widget in section.widgets" :ot-key="widget.id" :class="card(widget)" :style="'grid-column: span ' + widget.span">
                                <header ot-if="widget.title || widget.icon">
                                    <div ot-if="widget.icon" class="wrap"><i>{{ widget.icon }}</i></div>
                                    <div class="text">
                                        <span ot-if="widget.title" class="title">{{ widget.title }}</span>
                                        <span ot-if="widget.description" class="description">{{ widget.description }}</span>
                                    </div>
                                </header>
                                <div class="body" :style="widget.height ? 'height: ' + widget.height + 'px' : ''">
                                    <e-admin-status-loading ot-if="widget.state === 'loading'"></e-admin-status-loading>
                                    <e-admin-status-error
                                        ot-if="widget.state === 'error'"
                                        icon="error"
                                        title="Failed to load"
                                        :description="widget.error"
                                        :_click="() => retry(widget)"
                                    ></e-admin-status-error>
                                    <div ot-if="widget.state === 'ready'" class="mount" ot-node="body(widget)"></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            `;
        }
    });
});
