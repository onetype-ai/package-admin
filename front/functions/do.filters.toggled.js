admin.Fn('do.filters.toggled', function(group, option, current)
{
    if(current.includes(option.value))
    {
        return current.filter((entry) => entry !== option.value);
    }

    if(group.type === 'single')
    {
        return [option.value];
    }

    return [...current, option.value];
});
