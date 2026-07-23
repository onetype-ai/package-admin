admin.Fn('make.filters.config', function()
{
    return {
        groups: {
            type: 'array',
            value: [{
                    id: 'query',
                    type: 'search',
                    placeholder: 'Search entries...'
                }, {
                    id: 'status',
                    label: 'Status',
                    type: 'options',
                    options: [{
                            value: 'published',
                            label: 'Published',
                            count: 3
                        }, {
                            value: 'draft',
                            label: 'Draft',
                            count: 2
                        }
                    ]
                }, {
                    id: 'author',
                    label: 'Author',
                    type: 'options',
                    options: [{
                            value: 'dejan',
                            label: 'Dejan Tomić',
                            count: 2
                        }, {
                            value: 'stefan',
                            label: 'Stefan Pakić',
                            count: 2
                        }
                    ]
                }, {
                    id: 'tags',
                    label: 'Tags',
                    type: 'options',
                    options: [{
                            value: 'design',
                            label: 'Design',
                            count: 1
                        }, {
                            value: 'engineering',
                            label: 'Engineering',
                            count: 2
                        }
                    ]
                }, {
                    id: 'cover',
                    label: 'Only with cover',
                    type: 'toggle'
                }, {
                    id: 'after',
                    label: 'Updated after',
                    type: 'date'
                }
            ],
            each: {
                type: 'object',
                config: {
                    id: {
                        type: 'string',
                        description: 'Key of the group inside the value object.'
                    },
                    label: {
                        type: 'string',
                        description: 'Group label. Search groups render without one.'
                    },
                    type: {
                        type: 'string',
                        value: 'options',
                        options: ['search', 'options', 'single', 'select', 'toggle', 'date'],
                        description: 'Control the group renders. Options is a multi check list, single picks one value.'
                    },
                    options: {
                        type: 'array',
                        value: [],
                        each: {
                            type: 'object',
                            config: {
                                value: {
                                    type: 'string|number',
                                    description: 'Option value stored in the state.'
                                },
                                label: {
                                    type: 'string',
                                    description: 'Option label.'
                                },
                                count: {
                                    type: 'number',
                                    description: 'Matching entries shown after the label.'
                                }
                            }
                        },
                        description: 'Choices for options, single and select groups.'
                    },
                    placeholder: {
                        type: 'string',
                        description: 'Placeholder for search, select and date groups.'
                    },
                    collapsed: {
                        type: 'boolean',
                        value: false,
                        description: 'Start the group collapsed.'
                    }
                }
            },
            description: 'Filter groups top to bottom.'
        },
        value: {
            type: 'object',
            value: {},
            description: 'Filter state keyed by group id: strings for search, select, single and date, arrays for options, booleans for toggles.'
        },
        background: {
            type: 'number',
            value: 1,
            options: [0, 1, 2, 3],
            description: 'Background depth of the panel surface from 1 to 3. 0 renders transparent, without background or borders.'
        },
        _change: {
            type: 'function',
            description: 'Called with { value } holding the whole filter state whenever any group changes.'
        }
    };
});
