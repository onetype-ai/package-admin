admin.Fn('do.repeater.actions', function(scope)
{
    scope.emit = () =>
    {
        if(scope._change)
        {
            scope._change({ value: scope.value });
        }
    };

    scope.sync = () =>
    {
        scope.Update();
        scope.emit();
    };

    scope.append = () =>
    {
        if(scope.canAdd())
        {
            scope.value.push(scope.defaults());
            scope.sync();
        }
    };

    scope.prepend = () =>
    {
        if(scope.canAdd())
        {
            scope.value.unshift(scope.defaults());
            scope.sync();
        }
    };

    scope.remove = (index) =>
    {
        if(scope.canRemove())
        {
            scope.value.splice(index, 1);
            scope.sync();
        }
    };

    scope.duplicate = (index) =>
    {
        if(scope.canAdd())
        {
            const copy = JSON.parse(JSON.stringify(scope.value[index]));

            scope.value.splice(index + 1, 0, copy);
            scope.sync();
        }
    };

    scope.up = (index) =>
    {
        if(index !== 0 && !scope.disabled)
        {
            const row = scope.value.splice(index, 1)[0];

            scope.value.splice(index - 1, 0, row);
            scope.sync();
        }
    };

    scope.down = (index) =>
    {
        if(index < scope.value.length - 1 && !scope.disabled)
        {
            const row = scope.value.splice(index, 1)[0];

            scope.value.splice(index + 1, 0, row);
            scope.sync();
        }
    };

    scope.change = (index, key, data) =>
    {
        scope.value[index][key] = data.value;
        scope.emit();
    };

    scope.submit = () =>
    {
        if(scope._save)
        {
            scope._save({ value: scope.value });
        }
    };
});
