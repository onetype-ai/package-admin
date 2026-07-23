admin.layouts.Fn('item.visible', function(item)
{
    if(!item.Get('isActive'))
    {
        return false;
    }

    const screen = admin.screens.active()?.Get('id');
    const screens = item.Get('screen');

    if(Array.isArray(screens) && screens.length && !screens.includes(screen))
    {
        return false;
    }

    const condition = item.Get('condition');

    if(condition.app.length && !condition.app.includes(admin.apps.active()?.Get('id')))
    {
        return false;
    }

    if(condition.mode.length && !condition.mode.includes(admin.modes.active()?.Get('id')))
    {
        return false;
    }

    if(condition.user && !$ot.get('user'))
    {
        return false;
    }

    if(condition.callback && condition.callback.call(admin.layouts.Fn('get.data'), item) === false)
    {
        return false;
    }

    return true;
});
