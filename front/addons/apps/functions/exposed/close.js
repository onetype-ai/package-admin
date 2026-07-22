admin.apps.FnExpose('close', function()
{
    const active = admin.apps.active();

    if(!active)
    {
        return false;
    }

    if(active.Get('onDeactivate'))
    {
        active.Get('onDeactivate')(active);
    }

    const screen = admin.screens.active();

    if(screen && screen.Get('app') === active.Get('id'))
    {
        admin.screens.close();
    }

    config.set('admin.apps.active', null);

    onetype.Emit('admin.apps.close', { id: active.Get('id') });

    return true;
});
