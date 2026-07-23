admin.Fn('do.filters.picked', function(state, group)
{
    const current = state[group.id];

    if(Array.isArray(current))
    {
        return current;
    }

    if(current === null || current === undefined || current === '')
    {
        return [];
    }

    return [current];
});
