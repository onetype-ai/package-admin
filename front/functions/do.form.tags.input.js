admin.Fn('do.form.tags.input', function(scope)
{
    scope.input = ({ value }) =>
    {
        scope.query = value;
        scope.active = null;

        if(scope.sourced)
        {
            scope.search(value);

            if(!scope.open)
            {
                scope.openDropdown();
            }

            scope.Update();
            return;
        }

        const filtered = scope.filtered();

        if(filtered.length > 0 && !scope.open)
        {
            scope.openDropdown();
        }
        else if(filtered.length === 0 && scope.open)
        {
            scope.closeDropdown();
        }

        scope.Update();
    };

    scope.focus = () =>
    {
        if(scope.filtered().length > 0)
        {
            scope.openDropdown();
        }
    };

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

    const handleEnter = (event, filtered) =>
    {
        event.preventDefault();

        if(scope.open && filtered.length > 0)
        {
            const option = filtered.find((entry) => entry.value === scope.active);

            scope.add(option ? option : filtered[0]);
        }
        else if(scope.query.trim() && !scope.restrict)
        {
            scope.addRaw(scope.query);
        }
    };

    const handleArrowDown = (event, filtered) =>
    {
        event.preventDefault();

        if(!filtered.length)
        {
            return;
        }

        if(!scope.open)
        {
            scope.openDropdown();
        }

        scope.move(1);
        scope.Update();
    };

    const handleArrowUp = (event) =>
    {
        event.preventDefault();
        scope.move(-1);
        scope.Update();
    };

    scope.handleKey = ({ event }) =>
    {
        const filtered = scope.filtered();

        if(event.key === 'Enter')
        {
            handleEnter(event, filtered);
        }
        else if(event.key === 'Backspace' && !scope.query && scope.value.length)
        {
            scope.remove(scope.value[scope.value.length - 1]);
        }
        else if(event.key === 'ArrowDown')
        {
            handleArrowDown(event, filtered);
        }
        else if(event.key === 'ArrowUp')
        {
            handleArrowUp(event);
        }
        else if(event.key === 'Escape')
        {
            event.preventDefault();
            scope.closeDropdown();
        }
    };
});
