onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-core-repeater',
        addon: 'admin',
        name: 'Repeater',
        description: 'Repeatable rows with reorder, duplicate, numbered rows and empty state.',
        config: {
            value: {
                type: 'array|object',
                value: [],
                description: 'Row data. Array for manual mode, or { each, as, template } for iteration over a variable expression.'
            },
            iterable: {
                type: 'boolean',
                value: false,
                description: 'Allow binding the repeater to a variable expression (array). Shows a bind action in the editor.'
            },
            fields: {
                type: 'array',
                value: [],
                each: {
                    type: 'object',
                    config: 'admin.repeater.field'
                },
                description: 'Field definitions.'
            },
            orientation: {
                type: 'string',
                value: 'horizontal',
                options: ['horizontal', 'vertical'],
                description: 'Field layout inside each row.'
            },
            add: {
                type: 'string',
                value: 'Add',
                description: 'Add button label.'
            },
            addPosition: {
                type: 'string',
                value: 'bottom',
                options: ['top', 'bottom', 'both'],
                description: 'Add button placement.'
            },
            save: {
                type: 'string',
                value: '',
                description: 'Save button label. Empty hides button.'
            },
            empty: {
                type: 'string',
                value: 'No items yet',
                description: 'Empty state text.'
            },
            emptyIcon: {
                type: 'string',
                value: 'inbox',
                description: 'Empty state icon.'
            },
            min: {
                type: 'number',
                description: 'Minimum row count.'
            },
            max: {
                type: 'number',
                description: 'Maximum row count.'
            },
            draggable: {
                type: 'boolean',
                value: true,
                description: 'Show reorder arrows.'
            },
            numbered: {
                type: 'boolean',
                value: false,
                description: 'Show row numbers.'
            },
            duplicable: {
                type: 'boolean',
                value: false,
                description: 'Show duplicate button.'
            },
            disabled: {
                type: 'boolean',
                value: false,
                description: 'Disable all interaction.'
            },
            background: {
                type: 'string',
                value: 'bg-2',
                options: ['bg-1', 'bg-2', 'bg-3'],
                description: 'Row background depth.'
            },
            size: {
                type: 'string',
                value: 'm',
                options: ['s', 'm', 'l'],
                description: 'Row padding size.'
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
            actions: {
                type: 'array',
                value: [],
                each: {
                    type: 'object',
                    config: 'admin.repeater.action'
                },
                description: 'Custom per-row actions rendered before duplicate and remove.'
            },
            _change: {
                type: 'function',
                description: 'Change handler. Receives { value }.'
            },
            _save: {
                type: 'function',
                description: 'Save handler. Receives { value }.'
            },
            variables: {
                type: 'object',
                value: {},
                description: 'Available variables propagated to every row field that supports the variable builder.'
            }
        },
        render: function()
        {
            admin.Fn('do.repeater.base', this);
            admin.Fn('do.repeater.template', this);
            admin.Fn('do.repeater.capability', this);
            admin.Fn('do.repeater.actions', this);
            admin.Fn('do.repeater.iteration', this);
            admin.Fn('do.repeater.bind', this);
            admin.Fn('do.repeater.fields', this);
            admin.Fn('do.repeater.markup', this);
            admin.Fn('do.repeater.markupfooter', this);

            const fieldTemplate = this.buildFields('row', 'variables', (field) => `change(row_index, '${field.key}', data)`);
            const templateFieldTemplate = this.buildFields('templateRow()', 'templateVariables()', (field) => `changeTemplate('${field.key}', data)`);

            return `
                <div :class="classes()">
                    ${this.iterationMarkup(templateFieldTemplate)}
                    ${this.footerTopMarkup()}
                    ${this.rowsMarkup(fieldTemplate)}
                    ${this.emptyMarkup()}
                    ${this.footerBottomMarkup()}
                </div>
            `;
        }
    });
});
