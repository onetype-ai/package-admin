onetype.AddonReady('onetype.emitters', function(emitters)
{
    emitters.ItemAdd({
        id: 'admin.modes.switch',
        description: 'Fired after the active mode changes. Not fired when switching to the mode that is already active.',
        metadata: { addon: 'admin.modes' },
        config: {
            id: {
                type: 'string',
                description: 'ID of the mode that became active.'
            }
        }
    });
});
