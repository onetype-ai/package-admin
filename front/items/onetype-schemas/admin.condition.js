onetype.AddonReady('onetype.schemas', function(schemas)
{
    schemas.ItemAdd({
        id: 'admin.condition',
        description: 'Visibility rules shared by navbar, dock and status items. Empty object means the item shows everywhere.',
        addon: 'admin',
        config: {
            app: {
                type: 'array|boolean',
                value: [],
                each: { type: 'string' },
                description: 'App ids the item shows in. Empty means every app, true means any active app, false means none.'
            },
            screen: {
                type: 'array',
                value: [],
                each: { type: 'string' },
                description: 'Screen ids the item shows on. Empty means every screen and the shell.'
            },
            mode: {
                type: 'array|boolean',
                value: [],
                each: { type: 'string' },
                description: 'Mode ids the item shows in. Empty means every mode, true means any active mode, false means none.'
            },
            user: {
                type: 'boolean',
                value: false,
                description: 'When true, the item shows only while a user is logged in.'
            },
            permission: {
                type: 'array',
                value: [],
                each: { type: 'string' },
                description: 'Permission ids required to see the item. Empty means no permission needed.'
            },
            callback: {
                type: 'function',
                description: 'Custom check called with the item. Return false to hide. Runs after app, mode, user and permission pass.'
            }
        }
    });
});
