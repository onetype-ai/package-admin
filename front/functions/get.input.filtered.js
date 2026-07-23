admin.Fn('get.input.filtered', function(scope)
{
    if(!scope.hasOptions)
    {
        return [];
    }

    if(scope.sourced)
    {
        return scope.results.map((option) => option.label);
    }

    const query = scope.text().toLowerCase();

    if(!query)
    {
        return scope.options;
    }

    return scope.options.filter((option) => String(option).toLowerCase().includes(query));
});
