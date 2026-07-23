onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-views-grid',
        addon: 'admin',
        name: 'Grid View',
        description: 'Database grid listing view with a hairline cell mesh, numbered rows, typed column headers and spreadsheet style cell selection.',
        collection: 'Home',
        config: admin.Fn('make.grid.config'),
        render: function()
        {
            this.active = {
                row: null,
                key: null
            };

            this.icons = {
                text: 'notes',
                number: 'tag',
                date: 'calendar_today',
                status: 'flag',
                user: 'person',
                tags: 'sell',
                image: 'image'
            };

            const columnWidth = (definition) => definition.width ? definition.width : 'minmax(140px, 1fr)';

            this.Compute(() =>
            {
                this.rows = this.items.map((item, index) => ({
                    key: item.id,
                    item: item,
                    number: index + 1,
                    cells: this.fields.map((definition) => admin.Fn('do.grid.cell', item, definition))
                }));

                this.template = '44px ' + this.fields.map(columnWidth).join(' ');
                this.entries = admin.Fn('do.grid.entries', this.rows, this.group);
            });

            this.select = (event, row, cell) =>
            {
                this.active = {
                    row: row.key,
                    key: cell.key
                };

                if(this._select)
                {
                    this._select({
                        event,
                        value: {
                            item: row.item,
                            field: cell.key
                        }
                    });
                }
            };

            this.open = (event, row) =>
            {
                if(this._open)
                {
                    this._open({ event, value: row.item });
                }
            };

            return `
                <div :class="'box ot-scrollbar' + (background ? ' bg-' + background : ' clear')">
                    <div class="grid" :style="'grid-template-columns: ' + template">
                        <div class="cell head corner">#</div>
                        <div ot-for="field in fields" :ot-key="field.key" class="cell head">
                            <i>{{ icons[field.type] }}</i>
                            <span>{{ field.label }}</span>
                        </div>
                        <div ot-for="entry in entries" :ot-key="entry.key" class="band">
                            <div
                                ot-if="entry.kind === 'section'"
                                :class="'cell section depth-' + entry.depth"
                            ><span>{{ entry.label }}</span><span class="count">{{ entry.count }}</span></div>
                            <div ot-if="entry.kind === 'row'" class="line">
                                <div :class="_open ? 'cell number openable' : 'cell number'" ot-click="({ event }) => open(event, entry.row)">
                                    <span class="index">{{ entry.row.number }}</span>
                                    <i class="reveal">open_in_full</i>
                                </div>
                                <div
                                    ot-for="cell in entry.row.cells"
                                    :ot-key="cell.key"
                                    :class="'cell' + (active.row === entry.row.key && active.key === cell.key ? ' active' : '')"
                                    ot-click="({ event }) => select(event, entry.row, cell)"
                                >
                                    <span ot-if="cell.type === 'text'" class="text">{{ cell.value }}</span>
                                    <span ot-if="cell.type === 'title'" class="title">
                                        <span class="name">{{ cell.value }}</span>
                                        <span ot-if="cell.sub" class="sub">{{ cell.sub }}</span>
                                    </span>
                                    <span ot-if="cell.type === 'number'" class="digit">{{ cell.value }}</span>
                                    <span ot-if="cell.type === 'date'" class="date">{{ cell.value }}</span>
                                    <span
                                        ot-if="cell.type === 'status'"
                                        :class="'pill ' + cell.color"
                                    ><span class="dot"></span>{{ cell.label }}</span>
                                    <span
                                        ot-if="cell.type === 'user'"
                                        :class="'user ' + cell.color"
                                    ><span class="avatar">{{ cell.initials }}</span><span class="name">{{ cell.name }}</span></span>
                                    <span ot-if="cell.type === 'tags'" class="tags">
                                        <span ot-for="tag in cell.shown" :ot-key="tag" class="tag">{{ tag }}</span>
                                        <span ot-if="cell.more" class="more">+{{ cell.more }}</span>
                                    </span>
                                    <img ot-if="cell.type === 'image' && cell.value" class="thumb" :src="cell.value" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ot-if="!rows.length" class="empty">{{ empty }}</div>
                </div>
            `;
        }
    });
});
