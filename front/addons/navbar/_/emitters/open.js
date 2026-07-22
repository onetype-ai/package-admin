onetype.EmitRegister('admin.navbar.open', {
    description: 'Fired after a navbar item surface opens.',
    metadata: { addon: 'admin.navbar' },
    config: {
        id: {
            type: 'string',
            description: 'ID of the item that opened.'
        }
    }
});
