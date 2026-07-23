onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-views-table',
        addon: 'admin',
        name: 'Table View',
        description: 'Listing view with typed columns: text, status, people, tags, dates, numbers, thumbnails, sorted by header click.',
        collection: 'Home',
        config: {
            fields: {
                type: 'array',
                value: [{
                    key: 'title',
                    label: 'Title',
                    type: 'text'
                }, {
                    key: 'status',
                    label: 'Status',
                    type: 'status'
                }, {
                    key: 'author',
                    label: 'Author',
                    type: 'user'
                }, {
                    key: 'tags',
                    label: 'Tags',
                    type: 'tags'
                }, {
                    key: 'date',
                    label: 'Updated',
                    type: 'date',
                    align: 'right'
                }],
                each: {
                    type: 'object',
                    config: 'admin.tablefield',
                    description: 'A single column of the table.'
                },
                description: 'Columns left to right.'
            },
            items: {
                type: 'array',
                value: [{
                    id: 1,
                    title: 'Designing the OneType shell',
                    status: {
                        label: 'Published',
                        color: 'green'
                    },
                    author: { name: 'Dejan Tomić' },
                    tags: ['Design', 'Platform'],
                    date: 'Jul 8, 2026'
                }, {
                    id: 2,
                    title: 'One database for everything',
                    status: {
                        label: 'Draft',
                        color: 'orange'
                    },
                    author: { name: 'Stefan Pakić' },
                    tags: ['Engineering'],
                    date: 'Jul 6, 2026'
                }, {
                    id: 3,
                    title: 'Marketplace economics',
                    status: {
                        label: 'In review',
                        color: 'blue'
                    },
                    author: { name: 'Mila Kovač' },
                    tags: ['Business', 'Marketplace'],
                    date: 'Jul 5, 2026'
                }, {
                    id: 4,
                    title: 'Commands as the universal API',
                    status: {
                        label: 'Published',
                        color: 'green'
                    },
                    author: { name: 'Dejan Tomić' },
                    tags: ['Engineering', 'AI'],
                    date: 'Jul 2, 2026'
                }],
                each: {
                    type: 'object',
                    description: 'A single entry keyed by the column keys, with a unique id.'
                },
                description: 'Entries top to bottom.'
            },
            empty: {
                type: 'string',
                value: 'No entries yet.',
                description: 'Message shown while there are no entries.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth 1-3 on the table surface. 0 is transparent, no background or borders.'
            },
            _open: {
                type: 'function',
                description: 'Called with { event, value } when an entry row is opened.'
            }
        },
        render: function()
        {
            admin.Fn('do.table.field', this);

            return `
                <div :class="classes()">
                    <div class="grid" :style="'grid-template-columns: ' + template">
                        <div class="row head">
                            <div
                                ot-for="field in fields"
                                :ot-key="field.key"
                                :class="'th' + (field.align === 'right' ? ' right' : '') + (sorted.key === field.key ? ' active' : '')"
                                ot-click="() => order(field)"
                            >
                                <span>{{ field.label }}</span>
                                <i :class="sorted.key === field.key && sorted.direction === -1 ? 'flip' : ''">arrow_upward</i>
                            </div>
                        </div>
                        <div ot-for="row in rows" :ot-key="row.key" class="row" ot-click="({ event }) => open(event, row.item)">
                            <div
                                ot-for="cell in row.cells"
                                :ot-key="cell.key"
                                :class="'td' + (cell.align === 'right' ? ' right' : '')"
                            >
                                <span ot-if="cell.type === 'text'" class="text">{{ cell.value }}</span>
                                <span ot-if="cell.type === 'number'" class="number">{{ cell.value }}</span>
                                <span ot-if="cell.type === 'date'" class="date">{{ cell.value }}</span>
                                <span ot-if="cell.type === 'status'" :class="'pill ' + cell.color">
                                    <span class="dot"></span>{{ cell.label }}
                                </span>
                                <span ot-if="cell.type === 'user'" :class="'user ' + cell.color">
                                    <span class="avatar">{{ cell.initials }}</span><span class="name">{{ cell.name }}</span>
                                </span>
                                <span ot-if="cell.type === 'tags'" class="tags">
                                    <span ot-for="tag in cell.shown" :ot-key="tag" class="tag">{{ tag }}</span>
                                    <span ot-if="cell.more" class="more">+{{ cell.more }}</span>
                                </span>
                                <img ot-if="cell.type === 'image' && cell.value" class="thumb" :src="cell.value" />
                            </div>
                        </div>
                    </div>
                    <div ot-if="!rows.length" class="empty">{{ empty }}</div>
                </div>
            `;
        }
    });
});
