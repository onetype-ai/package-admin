onetype.AddonReady('onetype.schemas', function(schemas)
{
    schemas.ItemAdd({
        id: 'admin.thread.author',
        description: 'Author of a thread entry or reply, shared by the thread element.',
        addon: 'admin',
        config: {
            name: {
                type: 'string',
                description: 'Display name of the author.'
            }
        }
    });
});
