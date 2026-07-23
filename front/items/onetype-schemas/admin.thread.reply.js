onetype.AddonReady('onetype.schemas', function(schemas)
{
    schemas.ItemAdd({
        id: 'admin.thread.reply',
        description: 'Reply given to a thread entry, shared by the thread element.',
        addon: 'admin',
        config: {
            author: {
                type: 'object',
                config: 'admin.thread.author',
                description: 'Who replied.'
            },
            at: {
                type: 'string',
                description: 'When the reply was written.'
            },
            text: {
                type: 'string',
                description: 'The reply itself.'
            }
        }
    });
});
