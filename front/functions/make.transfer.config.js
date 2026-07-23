admin.Fn('make.transfer.config', function()
{
    return {
        value: {
            type: 'array',
            value: ['deploy', 'logs'],
            each: {
                type: 'string|number',
                description: 'A single selected item value.'
            },
            description: 'Selected item values.'
        },
        items: {
            type: 'array|function',
            value: [{
                    value: 'deploy',
                    label: 'Deploy',
                    description: 'Push releases to production.',
                    icon: 'rocket_launch'
                }, {
                    value: 'logs',
                    label: 'Logs',
                    description: 'Read service logs.',
                    icon: 'receipt_long'
                }, {
                    value: 'billing',
                    label: 'Billing',
                    description: 'Manage plans and invoices.',
                    icon: 'credit_card'
                }
            ],
            each: {
                type: 'object',
                config: {
                    value: {
                        type: 'string|number',
                        description: 'Unique item identifier.'
                    },
                    label: {
                        type: 'string',
                        description: 'Display label.'
                    },
                    description: {
                        type: 'string',
                        description: 'Secondary text.'
                    },
                    icon: {
                        type: 'string',
                        description: 'Material icon name.'
                    },
                    disabled: {
                        type: 'boolean',
                        description: 'Prevent moving this item.'
                    }
                }
            },
            description: 'Items, or an async callback(value, type): (query, "search") for the panel, ([values], "selected") to resolve labels.'
        },
        max: {
            type: 'number',
            description: 'Maximum selectable items.'
        },
        searchable: {
            type: 'boolean',
            value: true,
            description: 'Show search inputs.'
        },
        leftTitle: {
            type: 'string',
            value: 'Available',
            description: 'Left panel heading.'
        },
        rightTitle: {
            type: 'string',
            value: 'Selected',
            description: 'Right panel heading.'
        },
        emptyLeft: {
            type: 'string',
            value: 'No items',
            description: 'Left panel empty text.'
        },
        emptyRight: {
            type: 'string',
            value: 'None selected',
            description: 'Right panel empty text.'
        },
        background: {
            type: 'number',
            value: 1,
            options: [0, 1, 2, 3],
            description: 'Background depth of the panels from 1 to 3. 0 renders transparent, without background or borders.'
        },
        disabled: {
            type: 'boolean',
            value: false,
            description: 'Disable all interaction.'
        },
        _change: {
            type: 'function',
            description: 'Change handler. Receives { value }.'
        }
    };
});
