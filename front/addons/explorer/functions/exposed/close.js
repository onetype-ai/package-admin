admin.explorer.FnExpose('close', function()
{
    if(admin.navbar.opened()?.Get('id') !== 'explorer')
    {
        return false;
    }

    admin.navbar.close();

    return true;
});
