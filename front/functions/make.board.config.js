admin.Fn('make.board.config', function()
{
    return {
        field: {
            type: 'string',
            value: 'status',
            description: 'Item property the entries group by.'
        },
        columns: {
            type: 'array',
            value: [{
                    value: 'draft',
                    label: 'Draft',
                    color: 'orange'
                }, {
                    value: 'review',
                    label: 'In review',
                    color: 'blue'
                }, {
                    value: 'published',
                    label: 'Published',
                    color: 'green'
                }, {
                    value: 'archived',
                    label: 'Archived',
                    color: 'red'
                }
            ],
            each: {
                type: 'object',
                config: {
                    value: {
                        type: 'string',
                        description: 'Field value the column collects.'
                    },
                    label: {
                        type: 'string',
                        description: 'Column header label.'
                    },
                    color: {
                        type: 'string',
                        value: 'brand',
                        options: ['brand', 'blue', 'red', 'orange', 'green'],
                        description: 'Column accent color.'
                    },
                    canCreate: {
                        type: 'boolean',
                        value: true,
                        description: 'Whether the column offers the create action when _create is given.'
                    }
                }
            },
            description: 'Columns left to right. Empty derives them from the values found on the items.'
        },
        items: {
            type: 'array',
            value: admin.Fn('make.board.items'),
            each: {
                type: 'object',
                description: 'Entry with id, title, description, the group field value, author, date and optional badges as { label, icon, color } chips.'
            },
            description: 'Entries distributed into the columns.'
        },
        background: {
            type: 'number',
            value: 1,
            options: [0, 1, 2, 3],
            description: 'Background depth the board sits on from 0 to 3. Cards and column outlines sit one step above it.'
        },
        _open: {
            type: 'function',
            description: 'Called with { event, value } when an entry card is opened.'
        },
        _create: {
            type: 'function',
            description: 'Called with { event, value } on the create action of a column, value being the column value. Omitted hides the action.'
        }
    };
});
