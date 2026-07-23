admin.Fn('get.tags.next', function(scope, tag)
{
    if(!scope.multiple)
    {
        return scope.active === tag.id ? null : tag.id;
    }

    const current = Array.isArray(scope.active) ? [...scope.active] : [];
    const index = current.indexOf(tag.id);

    if(index === -1)
    {
        current.push(tag.id);
    }
    else
    {
        current.splice(index, 1);
    }

    return current;
});
