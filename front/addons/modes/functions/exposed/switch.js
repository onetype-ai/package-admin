admin.modes.FnExpose('switch', function(id)
{
    const item = this.ItemGet(id);

    if(!item || !item.Fn('visible'))
    {
        return false;
    }

    if(admin.modes.active()?.Get('id') === id)
    {
        return false;
    }

    const active = [...config.get('admin.modes.active')];

    Object.values(this.Items()).filter((previous) => previous.Fn('visible') && active.includes(previous.Get('id'))).forEach((previous) =>
    {
        active.splice(active.indexOf(previous.Get('id')), 1);

        if(previous.Get('onDeactivate'))
        {
            previous.Get('onDeactivate')(previous);
        }
    });

    active.push(id);

    platform.config.set('admin.modes.active', active);

    if(item.Get('onActivate'))
    {
        item.Get('onActivate')(item);
    }

    const screen = admin.screens.active();

    if(screen && screen.Get('mode') !== id)
    {
        const siblings = Object.values(admin.screens.Items()).filter((candidate) => candidate.Get('app') === screen.Get('app') && candidate.Get('mode') === id);
        const next = siblings.find((candidate) => candidate.Get('isDefault')) || siblings[0];

        if(next)
        {
            admin.screens.open(next.Get('id'));
        }
        else if(screen.Get('mode') && screen.Get('mode') !== id)
        {
            admin.screens.close();
        }
    }

    onetype.emitters.fire('admin.modes.switch', { id });

    return true;
});
