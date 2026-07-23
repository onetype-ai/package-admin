onetype.AddonReady('admin', (admin) =>
{
    admin.dashboard = onetype.Addon('admin.dashboard', (addon) =>
    {
        addon.sections = onetype.Addon('admin.dashboard.sections', (addon) =>
        {
            addon.Field('id', {
                type: 'string',
                required: true,
                description: 'Unique section id. Widgets join a section through their section field.'
            });

            addon.Field('title', {
                type: 'string',
                description: 'Section heading shown above its widgets. Empty renders the widgets without a heading.'
            });

            addon.Field('description', {
                type: 'string',
                description: 'One line under the section title.'
            });

            addon.Field('icon', {
                type: 'string',
                description: 'Material Symbols icon name shown next to the title.'
            });

            addon.Field('color', {
                type: 'string',
                options: ['brand', 'blue', 'red', 'orange', 'green'],
                description: 'Accent color of the section heading. Empty keeps it neutral.'
            });

            addon.Field('background', {
                type: 'number',
                description: 'Background depth from 1 to 3. When set, the section renders as its own panel. Empty keeps it flat.'
            });

            addon.Field('order', {
                type: 'number',
                value: 1,
                description: 'Sort position of the section on the board, lower first.'
            });

            addon.Field('condition', {
                type: 'object',
                value: {},
                config: 'admin.condition',
                description: 'Visibility rules. Empty object means the section shows everywhere its widgets do.'
            });
        });

        addon.widgets = onetype.Addon('admin.dashboard.widgets', (addon) =>
        {
            addon.Field('id', {
                type: 'string',
                required: true,
                description: 'Unique widget id.'
            });

            addon.Field('title', {
                type: 'string',
                description: 'Widget heading shown in the card header.'
            });

            addon.Field('description', {
                type: 'string',
                description: 'One line under the title, for context or the current range.'
            });

            addon.Field('icon', {
                type: 'string',
                description: 'Material Symbols icon name shown in the card header.'
            });

            addon.Field('color', {
                type: 'string',
                options: ['brand', 'blue', 'red', 'orange', 'green'],
                description: 'Accent color of the widget, drives the icon, deltas and chart strokes. Empty keeps it neutral.'
            });

            addon.Field('type', {
                type: 'string',
                required: true,
                description: 'What the widget renders as, the id of a registered admin.dashboard.types item.'
            });

            addon.Field('section', {
                type: 'string',
                description: 'ID of the section the widget belongs to. Empty places it in the default ungrouped area.'
            });

            addon.Field('span', {
                type: 'number',
                value: 4,
                description: 'Width of the widget in grid columns, from 1 to 12. The board is a 12 column grid.'
            });

            addon.Field('height', {
                type: 'number',
                description: 'Fixed body height in pixels. Empty lets the widget size to its content.'
            });

            addon.Field('order', {
                type: 'number',
                value: 1,
                description: 'Sort position inside the section, lower first.'
            });

            addon.Field('refresh', {
                type: 'number',
                description: 'Seconds between automatic data refreshes. Empty means the data is resolved once and never polled.'
            });

            addon.Field('condition', {
                type: 'object',
                value: {},
                config: 'admin.condition',
                description: 'Visibility rules. Empty object means the widget shows everywhere.'
            });

            addon.Field('data', {
                type: 'object|function',
                value: {},
                description: 'Widget data matching the config of its type. A function may return a promise, the card shows loading and error states.'
            });
        });

        addon.types = onetype.Addon('admin.dashboard.types', (addon) =>
        {
            addon.Field('id', {
                type: 'string',
                required: true,
                description: 'Unique type id, referenced by a widget through its type field, like numbers or gauge.'
            });

            addon.Field('config', {
                type: 'object',
                value: {},
                description: 'Schema of the payload this type reads, validated and defaulted before the render runs. Same shape as an element platform.config.'
            });

            addon.Field('render', {
                type: 'function',
                required: true,
                description: 'Render function returning the type body as an HTML string. Runs with the resolved payload and the widget color.'
            });
        });
    });
});
