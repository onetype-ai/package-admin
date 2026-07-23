admin.Fn('do.input.handlers', function(scope)
{
    scope.input = ({ event, value }) =>
    {
        value = scope.cast(value);

        scope.value = value;
        scope.active = null;

        if(scope.sourced)
        {
            scope.search(value);
            scope.open = true;
        }
        else if(scope.hasOptions)
        {
            scope.open = scope.filtered().length > 0;
        }

        if(scope._input)
        {
            scope._input({ event, value });
        }
    };

    scope.change = ({ event, value }) =>
    {
        value = scope.cast(value);

        if(scope.restrict && scope.hasOptions && !scope.filtered().includes(value))
        {
            scope.value = '';

            if(scope._change)
            {
                scope._change({ event, value: '' });
            }

            return;
        }

        scope.value = value;

        if(scope._change)
        {
            scope._change({ event, value });
        }
    };

    scope.focus = ({ event, value }) =>
    {
        if(scope.hasOptions && scope.filtered().length > 0)
        {
            scope.open = true;
        }

        if(scope._focus)
        {
            scope._focus({ event, value });
        }
    };

    scope.blur = ({ event, value }) =>
    {
        if(scope._blur)
        {
            scope._blur({ event, value });
        }
    };
});
