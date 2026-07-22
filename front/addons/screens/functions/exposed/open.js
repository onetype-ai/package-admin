admin.screens.FnExpose('open', function(id, parameters = {})
{
    const item = this.ItemGet(id);

    if(!item)
    {
        return false;
    }

    config.set('admin.screens.parameters', parameters);

    this.StoreSet('data', item.Get('data') ? item.Get('data').call(parameters) : {});

    config.set('admin.screens.active', id);

    if(item.Get('app'))
    {
        admin.apps.open(item.Get('app'));
    }
    else if(admin.apps.active())
    {
        admin.apps.close();
    }

    if(item.Get('mode'))
    {
        admin.modes.switch(item.Get('mode'));
    }

    const url = this.Fn('url', item);

    if(url && window.location.pathname !== url)
    {
        history.replaceState(null, '', url);
    }

    onetype.Emit('admin.screens.open', { id });

    return true;
});
