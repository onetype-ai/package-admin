onetype.emitters.catch('platform.boot', () =>
{
    const match = admin.screens.match(window.location.pathname);

    if(match)
    {
        return commands.Fn('run', 'admin:screens:open', {
            id: match.item.Get('id'),
            parameters: match.parameters
        });
    }

    const active = admin.screens.active();

    if(active)
    {
        commands.Fn('run', 'admin:screens:open', {
            id: active.Get('id'),
            parameters: platform.config.get('admin.screens.parameters')
        });
    }
});
