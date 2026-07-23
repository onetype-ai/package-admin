admin.Fn('make.grid.config', function()
{
    return {
        fields: {
            type: 'array',
            value: [{
                    key: 'title',
                    label: 'Title',
                    type: 'text',
                    width: '2fr'
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
                    key: 'views',
                    label: 'Views',
                    type: 'number'
                }, {
                    key: 'date',
                    label: 'Updated',
                    type: 'date'
                }
            ],
            each: {
                type: 'object',
                config: {
                    key: {
                        type: 'string',
                        description: 'Item property the column reads.'
                    },
                    label: {
                        type: 'string',
                        description: 'Column header label.'
                    },
                    type: {
                        type: 'string',
                        value: 'text',
                        options: ['text', 'title', 'number', 'date', 'status', 'user', 'tags', 'image'],
                        description: 'Cell renderer. Title bolds the value with sub underneath, status/user show a label and color, tags reads an array.'
                    },
                    sub: {
                        type: 'string',
                        description: 'Item property shown underneath the value, for the title cell type.'
                    },
                    width: {
                        type: 'string',
                        description: 'Grid track for the column, like 2fr or 200px. Columns default to minmax(140px, 1fr).'
                    }
                }
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
                    views: 4218,
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
                    views: 1730,
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
                    views: 2963,
                    date: 'Jul 5, 2026'
                }
            ],
            each: {
                type: 'object',
                description: 'A single entry keyed by the column keys, with a unique id.'
            },
            description: 'Entries top to bottom.'
        },
        background: {
            type: 'number',
            value: 1,
            options: [0, 1, 2, 3],
            description: 'Surface depth from 1 to 3. 0 renders transparent cells on the canvas, without background or borders.'
        },
        group: {
            type: 'string|array',
            description: 'Property rows group under, or nested properties with the outer level first. Missing values fall under Other.'
        },
        empty: {
            type: 'string',
            value: 'No entries yet.',
            description: 'Message shown while there are no entries.'
        },
        _select: {
            type: 'function',
            description: 'Called with { event, value } when a cell is selected, value holding the item and the field key.'
        },
        _open: {
            type: 'function',
            description: 'Called with { event, value } when an entry is opened through its row number.'
        }
    };
});
