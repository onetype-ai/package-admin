admin.Fn('do.filters.count', function(state, group)
{
    if(group.type === 'toggle')
    {
        return state[group.id] ? 1 : 0;
    }

    return admin.Fn('do.filters.picked', state, group).length;
});
