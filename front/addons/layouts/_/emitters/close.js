onetype.EmitRegister('admin.layouts.close', {
    description: 'Fired after layout items close. Carries only the ids that actually closed.',
    metadata: { addon: 'admin.layouts' },
    config: {
        ids: {
            type: 'array',
            each: { type: 'string' },
            description: 'IDs of the layout items that closed.'
        }
    }
});
