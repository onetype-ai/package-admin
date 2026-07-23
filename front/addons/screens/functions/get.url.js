admin.screens.Fn('get.url', function(item)
{
    const routes = [].concat(item.Get('route') || []);

    if(!routes.length)
    {
        return null;
    }

    const values = platform.config.get('admin.screens.parameters');
    const isFilled = (name) => values[name] !== null && values[name] !== undefined && values[name] !== '';
    const filled = (route) => (route.match(/:(\w+)/g) || []).every((parameter) => isFilled(parameter.slice(1)));
    const pattern = routes.findLast(filled);

    return pattern ? onetype.route.build(pattern, values) : null;
});
