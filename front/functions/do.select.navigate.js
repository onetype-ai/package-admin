admin.Fn('do.select.navigate', function(scope)
{
    scope.move = (step) =>
    {
        const filtered = scope.filtered();

        if(!filtered.length)
        {
            return;
        }

        const index = filtered.findIndex((option) => option.value === scope.active);

        scope.active = filtered[Math.min(Math.max(index + step, 0), filtered.length - 1)].value;
    };

    scope.confirm = () =>
    {
        const filtered = scope.filtered();
        const option = filtered.find((entry) => entry.value === scope.active) || filtered[0];

        if(option)
        {
            scope.select(option);
        }
    };

    scope.jump = (edge) =>
    {
        const filtered = scope.filtered();
        const option = edge === 'first' ? filtered[0] : filtered[filtered.length - 1];

        scope.active = filtered.length ? option.value : null;
    };

    scope.handleKey = (event) =>
    {
        if(!scope.open)
        {
            return;
        }

        const actions = {
            Escape: scope.close,
            ArrowDown: () => scope.move(1),
            ArrowUp: () => scope.move(-1),
            Home: () => scope.jump('first'),
            End: () => scope.jump('last'),
            Enter: scope.confirm
        };

        if(actions[event.key])
        {
            event.preventDefault();
            actions[event.key]();
        }
    };
});
