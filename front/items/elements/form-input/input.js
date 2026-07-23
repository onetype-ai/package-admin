onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-form-input',
        addon: 'admin',
        name: 'Input',
        description: 'Text input with icons, prefix and suffix, password toggle, clear action and autocomplete suggestions.',
        collection: 'Home',
        config: {
            value: {
                type: 'string|number',
                description: 'Input value.'
            },
            name: {
                type: 'string',
                description: 'Input name attribute.'
            },
            type: {
                type: 'string',
                value: 'text',
                options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'time', 'date'],
                description: 'Input type.'
            },
            placeholder: {
                type: 'string',
                value: 'Search the workspace...',
                description: 'Placeholder text while the value is empty.'
            },
            icon: {
                type: 'string',
                description: 'Icon on the left side of the input.'
            },
            iconRight: {
                type: 'string',
                description: 'Icon on the right side of the input.'
            },
            prefix: {
                type: 'string',
                description: 'Static text before the value.'
            },
            suffix: {
                type: 'string',
                description: 'Static text after the value.'
            },
            options: {
                type: 'array|function',
                value: [],
                each: {
                    type: 'string',
                    description: 'A single suggestion.'
                },
                description: 'Autocomplete suggestions shown while typing, or an async callback(query, "search") that returns suggestions.'
            },
            restrict: {
                type: 'boolean',
                value: false,
                description: 'Only allow values from options.'
            },
            reveal: {
                type: 'boolean',
                value: true,
                description: 'Shows the visibility toggle on password inputs.'
            },
            clearable: {
                type: 'boolean',
                value: true,
                description: 'Show a clear action while a value is present.'
            },
            maxlength: {
                type: 'number',
                description: 'Maximum character count.'
            },
            min: {
                type: 'number',
                description: 'Minimum value for a number input.'
            },
            max: {
                type: 'number',
                description: 'Maximum value for a number input.'
            },
            step: {
                type: 'number',
                description: 'Step increment for a number input.'
            },
            disabled: {
                type: 'boolean',
                value: false,
                description: 'Disabled state.'
            },
            readonly: {
                type: 'boolean',
                value: false,
                description: 'Readonly state.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth of the control surface from 1 to 3. 0 renders transparent, without background or borders.'
            },
            _input: {
                type: 'function',
                description: 'Called with { event, value } on every keystroke.'
            },
            _change: {
                type: 'function',
                description: 'Called with { event, value } when the value is committed.'
            },
            _focus: {
                type: 'function',
                description: 'Called with { event, value } on focus.'
            },
            _blur: {
                type: 'function',
                description: 'Called with { event, value } on blur.'
            }
        },
        render: function()
        {
            admin.Fn('do.input.field', this);

            return admin.Fn('make.input.markup');
        }
    });
});
