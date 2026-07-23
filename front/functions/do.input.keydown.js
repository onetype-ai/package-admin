admin.Fn('do.input.keydown', function(scope, event)
{
    if(!scope.hasOptions)
    {
        return;
    }

    if(event.key === 'Enter')
    {
        const filtered = scope.filtered();

        if(scope.open && filtered.length)
        {
            event.preventDefault();
            scope.select(scope.active !== null && filtered.includes(scope.active) ? scope.active : filtered[0]);
        }

        return;
    }

    if(event.key === 'ArrowDown')
    {
        event.preventDefault();
        scope.move(1);
        return;
    }

    if(event.key === 'ArrowUp')
    {
        event.preventDefault();
        scope.move(-1);
        return;
    }

    if(event.key === 'Escape')
    {
        scope.open = false;
    }
});
