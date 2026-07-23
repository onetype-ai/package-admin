admin.explorer.FnExpose('open', function()
{
    if(admin.navbar.opened()?.Get('id') === 'search')
    {
        return false;
    }

    admin.navbar.open('search');

    onetype.emitters.fire('admin.explorer.open', {});

    return true;
});
