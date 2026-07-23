admin.Fn('make.textarea.config', function()
{
    return {
        value: {
            type: 'string',
            description: 'Textarea value.'
        },
        name: {
            type: 'string',
            description: 'Textarea name attribute.'
        },
        placeholder: {
            type: 'string',
            value: 'Tell us about your project...',
            description: 'Placeholder text while the value is empty.'
        },
        rows: {
            type: 'number',
            value: 4,
            description: 'Initial visible rows.'
        },
        minRows: {
            type: 'number',
            description: 'Minimum rows for auto-resize.'
        },
        maxRows: {
            type: 'number',
            description: 'Maximum rows for auto-resize.'
        },
        maxlength: {
            type: 'number',
            value: 280,
            description: 'Maximum character count.'
        },
        autoResize: {
            type: 'boolean',
            value: false,
            description: 'Grow the height with the content.'
        },
        counter: {
            type: 'boolean',
            value: true,
            description: 'Show a character counter while maxlength is set.'
        },
        resize: {
            type: 'string',
            value: 'vertical',
            options: ['none', 'vertical', 'horizontal', 'both'],
            description: 'CSS resize handle.'
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
        },
        _enter: {
            type: 'function',
            description: 'Called with { value } when Enter is pressed without Shift, then the field clears. Shift and Enter inserts a newline.'
        }
    };
});
