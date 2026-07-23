admin.screens.FnExpose('close', function()
{
    const active = admin.screens.active();

    if(!active)
    {
        return false;
    }

    platform.config.set('admin.screens.parameters', {});

    this.StoreSet('data', {});

    platform.config.set('admin.screens.active', null);

    if(active.Get('route') && window.location.pathname !== '/')
    {
        history.replaceState(null, '', '/');
    }

    onetype.emitters.fire('admin.screens.close', { id: active.Get('id') });

    return true;
});
