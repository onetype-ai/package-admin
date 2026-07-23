admin.explorer.FnExpose('close', function()
{
    if(admin.navbar.opened()?.Get('id') !== 'search')
    {
        return false;
    }

    admin.navbar.close();

    return true;
});
