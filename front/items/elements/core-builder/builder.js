onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-core-builder',
        addon: 'admin',
        name: 'Builder',
        description: 'Config-driven form builder with steps, sections, grid and conditions.',
        config: {
            values: {
                type: 'object',
                value: {},
                description: 'Form data keyed by field key.'
            },
            steps: {
                type: 'array',
                value: [],
                each: {
                    type: 'object',
                    config: {
                        id: {
                            type: 'string',
                            description: 'Step identifier.'
                        },
                        label: {
                            type: 'string',
                            description: 'Step label.'
                        },
                        description: {
                            type: 'string',
                            description: 'Step description.'
                        },
                        icon: {
                            type: 'string',
                            description: 'Step icon.'
                        },
                        sections: {
                            type: 'array',
                            value: [],
                            description: 'Sections for this step.'
                        }
                    }
                },
                description: 'Wizard steps. Each contains sections.'
            },
            sections: {
                type: 'array',
                value: [],
                each: { type: 'object' },
                description: 'Flat sections when no steps.'
            },
            save: {
                type: 'string',
                value: '',
                description: 'Save button label. Empty hides button.'
            },
            disabled: {
                type: 'boolean',
                value: false,
                description: 'Disable save button.'
            },
            section: {
                type: 'object',
                value: {
                    background: 'bg-1',
                    variant: ['border']
                },
                config: {
                    background: {
                        type: 'string',
                        value: 'bg-1',
                        options: ['', 'bg-1', 'bg-2', 'bg-3'],
                        description: 'Section background depth.'
                    },
                    variant: {
                        type: 'array',
                        value: ['border'],
                        each: { type: 'string' },
                        description: 'Section visual modifiers.'
                    }
                },
                description: 'Section appearance.'
            },
            stepper: {
                type: 'object',
                value: {
                    background: 'bg-1',
                    variant: ['border', 'connected'],
                    orientation: 'vertical'
                },
                config: {
                    background: {
                        type: 'string',
                        value: 'bg-1',
                        options: ['', 'bg-1', 'bg-2', 'bg-3'],
                        description: 'Steps background depth.'
                    },
                    variant: {
                        type: 'array',
                        value: ['border', 'connected'],
                        each: {
                            type: 'string'
                        },
                        description: 'Steps visual modifiers.'
                    },
                    orientation: {
                        type: 'string',
                        value: 'vertical',
                        options: ['vertical', 'horizontal'],
                        description: 'Stepper layout direction.'
                    }
                },
                description: 'Steps sidebar appearance.'
            },
            size: {
                type: 'string',
                value: 'm',
                options: ['s', 'm', 'l'],
                description: 'Section spacing.'
            },
            background: {
                type: 'string',
                value: '',
                options: ['', 'bg-1', 'bg-2', 'bg-3'],
                description: 'Container background depth.'
            },
            variant: {
                type: 'array',
                value: [],
                each: {
                    type: 'string'
                },
                options: ['border'],
                description: 'Visual modifiers.'
            },
            _input: {
                type: 'function',
                description: 'Input handler. Receives { key, value }.'
            },
            _change: {
                type: 'function',
                description: 'Change handler. Receives { key, value }.'
            },
            _save: {
                type: 'function',
                description: 'Save handler. Receives { value }.'
            },
            variables: {
                type: 'object',
                value: {},
                description: 'Available variables propagated to every field that supports the variable builder.'
            }
        },
        render: function()
        {
            admin.Fn('do.builder.field', this);

            return admin.Fn('make.builder.markup', this);
        }
    });
});
