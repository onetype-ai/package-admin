admin.Fn('do.repeater.capability', function(scope)
{
    scope.canAdd = () =>
    {
        if(scope.disabled || scope.isIterable)
        {
            return false;
        }

        if(scope.max > 0 && Array.isArray(scope.value) && scope.value.length >= scope.max)
        {
            return false;
        }

        return true;
    };

    scope.canRemove = () =>
    {
        if(scope.disabled || scope.isIterable)
        {
            return false;
        }

        if(scope.min > 0 && Array.isArray(scope.value) && scope.value.length <= scope.min)
        {
            return false;
        }

        return true;
    };

    scope.canReorder = () =>
    {
        return !scope.disabled && !scope.isIterable && scope.draggable;
    };

    scope.Compute(() =>
    {
        scope.hasSave = !!scope.save;
        scope.isIterable = !!(scope.value && !Array.isArray(scope.value) && typeof scope.value === 'object' && typeof scope.value.each === 'string');
        scope.rows = scope.computeRows();
    });
});
