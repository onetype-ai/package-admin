onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-data-table',
        addon: 'admin',
        name: 'Table',
        description: 'Data table with aligned columns, badge cells, sortable headers, bulk selection and endlessly nested child tables.',
        collection: 'Home',
        config: {
            columns: {
                type: 'array',
                value: [
                    { key: 'build',
                        label: 'Build' },
                    { key: 'environment',
                        label: 'Environment' },
                    { key: 'duration', label: 'Duration',
                        align: 'right' },
                    { key: 'status', label: 'Status', align: 'right',
                        badge: true }
                ],
                each: {
                    type: 'object',
                    config: {
                        key: { type: 'string',
                            description: 'Row field the column reads.' },
                        label: { type: 'string',
                            description: 'Header text.' },
                        align: { type: 'string', value: 'left', options: ['left', 'right'],
                            description: 'Cell alignment.' },
                        badge: { type: 'boolean', value: false,
                            description: 'Renders the cell as a colored pill, reading the color from the row field key plus Color.' },
                        sortable: { type: 'boolean', value: true,
                            description: 'Click on the header sorts by this column.' },
                        width: { type: 'string',
                            description: 'Grid track like 2fr, auto or 200px. First column defaults to minmax(0, 1fr), rest to auto.' },
                        wrap: { type: 'boolean', value: false,
                            description: 'Wraps long cell text instead of truncating it.' }
                    }
                },
                description: 'Columns left to right.'
            },
            rows: {
                type: 'array',
                value: [
                    { build: '#214', environment: 'production', duration: '38s', status: 'live', statusColor: 'green',
                        table: {
                            columns: [{ key: 'step',
                                label: 'Step' }],
                            rows: [{ step: 'Install packages' }, { step: 'Build bundle' }, { step: 'Deploy to edge' }]
                        } },
                    { build: '#213', environment: 'preview', duration: '41s', status: 'ready',
                        statusColor: 'blue' },
                    { build: '#212', environment: 'production', duration: '36s', status: 'live',
                        statusColor: 'green' },
                    { build: '#211', environment: 'staging', duration: '48s', status: 'ready',
                        statusColor: 'blue' }
                ],
                each: {
                    type: 'object',
                    description: 'A single row keyed by the column keys. An optional table key with columns and rows nests a child table under the row.'
                },
                description: 'Rows top to bottom.'
            },
            empty: { type: 'string', value: 'No data',
                description: 'Message shown while there are no rows.' },
            selectable: { type: 'boolean', value: false,
                description: 'Checkbox column with select all in the header.' },
            actions: {
                type: 'array',
                value: [
                    { icon: 'download', label: 'Export',
                        color: 'blue' },
                    { icon: 'replay', label: 'Rebuild',
                        color: 'orange' },
                    { icon: 'delete', label: 'Delete',
                        color: 'red' }
                ],
                each: {
                    type: 'object',
                    config: {
                        icon: { type: 'string',
                            description: 'Action icon.' },
                        label: { type: 'string',
                            description: 'Action text.' },
                        color: { type: 'string', value: 'brand', options: ['brand', 'blue', 'red', 'orange', 'green'],
                            description: 'Action accent color.' },
                        onClick: { type: 'function',
                            description: 'Called with { rows } holding the selected rows.' }
                    }
                },
                description: 'Bulk actions shown in a floating bar while rows are selected.'
            },
            _select: { type: 'function',
                description: 'Called with { rows } after every selection change.' },
            background: { type: 'number', value: 1, options: [0, 1, 2, 3],
                description: 'Background depth from 1 to 3. 0 renders transparent, without background or borders.' },
            _click: { type: 'function',
                description: 'Called with { event, row } on row click. Makes the rows interactive.' }
        },
        render: function()
        {
            admin.Fn('do.data.table.field', this);

            return `
                <div :class="classes()">
                    <div class="grid" :style="'grid-template-columns: ' + template">
                        <div class="row head">
                            <div ot-if="nests"></div>
                            <div ot-if="selectable"><button type="button" :class="allClasses()" ot-click="all"><i>{{ allIcon() }}</i></button></div>
                            <div ot-for="column in columns" :ot-key="column.key">
                                <button type="button" :class="'th ' + column.align" ot-click="() => sort(column)">
                                    <span>{{ column.label }}</span>
                                    <i ot-if="arrow(column)">{{ arrow(column) }}</i>
                                </button>
                            </div>
                        </div>
                        <div ot-for="row in list" :ot-key="JSON.stringify(row)" :class="rowClasses(row)" ot-click="({ event }) => pick(row, event)">
                            <div ot-if="nests">
                                <button
                                    ot-if="row.table"
                                    type="button"
                                    :class="foldClasses(row)"
                                    ot-click.stop="() => unfold(row)"
                                ><i>chevron_right</i></button>
                            </div>
                            <div ot-if="selectable">
                                <button type="button" :class="checked(row) ? 'check on' : 'check'" ot-click.stop="() => mark(row)">
                                    <i ot-if="checked(row)">check</i>
                                </button>
                            </div>
                            <div ot-for="column in columns" :ot-key="column.key">
                                <div :class="cellClasses(column)">
                                    <span ot-if="!column.badge" class="value">{{ row[column.key] }}</span>
                                    <span ot-if="column.badge" :class="pillClasses(row, column)">{{ row[column.key] }}</span>
                                </div>
                            </div>
                            <div ot-if="row.table && opened(row)" class="fold">
                                <e-admin-data-table :columns="row.table.columns" :rows="row.table.rows" :selectable="false"></e-admin-data-table>
                            </div>
                        </div>
                    </div>
                    <div ot-if="!list.length" class="empty">{{ empty }}</div>
                    <div ot-if="selectable && count()" class="bulk">
                        <span class="total">{{ count() }} selected</span>
                        <div class="tools">
                            <div ot-for="action in actions" :ot-key="action.label">
                                <button type="button" :class="'tool ' + action.color" ot-click="() => run(action)">
                                    <i ot-if="action.icon">{{ action.icon }}</i>
                                    <span>{{ action.label }}</span>
                                </button>
                            </div>
                        </div>
                        <button type="button" class="dismiss" ot-click="clear"><i>close</i></button>
                    </div>
                </div>
            `;
        }
    });
});
