onetype.EmitRegister('admin.explorer.run', {
    description: 'Fired after an explorer entry is selected and its callback executes.',
    metadata: { addon: 'admin.explorer' },
    config: {
        id: {
            type: 'string',
            description: 'ID of the entry that ran.'
        }
    }
});
