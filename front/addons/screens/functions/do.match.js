admin.screens.Fn('do.match', function(item, path)
{
    for(const route of [].concat(item.Get('route') || []))
    {
        const result = onetype.route.match(route, path);

        if(result.match)
        {
            return { item, parameters: result.params };
        }
    }

    return null;
});
