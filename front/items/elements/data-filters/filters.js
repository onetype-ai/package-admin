onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-data-filters',
        addon: 'admin',
        name: 'Filters',
        description: 'Filter panel with collapsible groups: search, option lists with counts, toggles, selects and dates, reporting one value object.',
        collection: 'Home',
        config: admin.Fn('make.filters.config'),
        render: function()
        {
            this.state = { ...this.value };
            this.closed = {};

            this.picked = (group) => admin.Fn('do.filters.picked', this.state, group);

            this.count = (group) => admin.Fn('do.filters.count', this.state, group);

            this.active = () =>
            {
                return this.groups.reduce((total, group) => total + (group.type === 'search' ? 0 : this.count(group)), 0);
            };

            this.shown = (group) =>
            {
                return this.closed[group.id] === undefined ? !group.collapsed : !this.closed[group.id];
            };

            const report = () =>
            {
                if(this._change)
                {
                    this._change({ value: { ...this.state } });
                }
            };

            this.assign = (group, value) =>
            {
                this.state = { ...this.state, [group.id]: value };

                report();
            };

            this.mark = (group, option) =>
            {
                const value = admin.Fn('do.filters.toggled', group, option, this.picked(group));

                if(group.type !== 'single')
                {
                    this.assign(group, value);

                    return;
                }

                this.assign(group, value.length ? value[0] : '');
            };

            this.fold = (group) =>
            {
                this.closed = { ...this.closed, [group.id]: this.shown(group) };
            };

            this.clear = () =>
            {
                this.state = {};

                report();
            };

            this.classes = () =>
            {
                const list = ['box'];

                if(this.background || this.background === 0)
                {
                    list.push('bg-' + this.background);
                }

                return list.join(' ');
            };

            const search = admin.Fn('make.filters.search', 'group', 'assign');
            const choices = admin.Fn('make.filters.choices', 'group', 'picked', 'mark');
            const select = admin.Fn('make.filters.select', 'group', 'assign');
            const date = admin.Fn('make.filters.date', 'group', 'assign');
            const toggle = admin.Fn('make.filters.toggle', 'group', 'assign');

            return `
                <div :class="classes()">
                    <div ot-for="group in groups" :ot-key="group.id" class="group">
                        ${search}
                        <div ot-if="group.type !== 'search' && group.type !== 'toggle'" class="head" ot-click="() => fold(group)">
                            <span class="label">{{ group.label }}</span>
                            <span ot-if="count(group)" class="badge">{{ count(group) }}</span>
                            <i :class="shown(group) ? 'caret turned' : 'caret'">chevron_right</i>
                        </div>
                        <div ot-if="group.type !== 'search' && group.type !== 'toggle' && shown(group)" class="body">
                            ${choices}
                            ${select}
                            ${date}
                        </div>
                        ${toggle}
                    </div>
                    <div class="bar">
                        <span class="total">{{ active() ? active() + ' active' : 'No filters active' }}</span>
                        <span ot-if="active()" class="reset" ot-click="clear">Clear all</span>
                    </div>
                </div>
            `;
        }
    });
});
