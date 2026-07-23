onetype.AddonReady('onetype.schemas', function(schemas)
{
    schemas.ItemAdd({
        id: 'admin.thread.entry',
        description: 'A single entry of the thread, shared by the thread element.',
        addon: 'admin',
        config: {
            id: {
                type: 'string|number',
                description: 'Unique entry identifier.'
            },
            author: {
                type: 'object',
                config: 'admin.thread.author',
                description: 'Who wrote the entry.'
            },
            at: {
                type: 'string',
                description: 'When the entry was written.'
            },
            text: {
                type: 'string',
                description: 'The entry itself.'
            },
            replyable: {
                type: 'boolean',
                value: false,
                description: 'Whether the entry expects a reply. Open entries carry the accent and the reply form.'
            },
            reply: {
                type: 'object',
                value: null,
                config: 'admin.thread.reply',
                description: 'The reply once given. Null while open.'
            }
        }
    });
});
