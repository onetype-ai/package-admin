admin.dashboard.Fn('make.widget', function(item)
{
    return {
        id: item.Get('id'),
        title: item.Get('title'),
        description: item.Get('description'),
        icon: item.Get('icon'),
        color: item.Get('color') || '',
        type: item.Get('type'),
        span: item.Get('span'),
        height: item.Get('height') || null,
        refresh: item.Get('refresh') || null,
        state: 'loading',
        error: '',
        payload: {},
        item
    };
});
