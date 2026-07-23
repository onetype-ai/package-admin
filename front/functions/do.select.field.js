admin.Fn('do.select.field', function(scope)
{
    scope.open = false;
    scope.above = false;
    scope.query = '';
    scope.active = null;

    elements.Fn('get.source', scope, () => scope.options);

    scope.Compute(() =>
    {
        if(scope.sourced && scope.value !== null && scope.value !== undefined && scope.value !== '')
        {
            scope.resolve([scope.value]);
        }
    });

    scope.list = () =>
    {
        if(scope.sourced)
        {
            return scope.results;
        }

        return scope.normalize(Array.isArray(scope.options) ? scope.options : []);
    };

    scope.classes = () =>
    {
        return ['box', 'bg-' + scope.background, scope.open && 'open', scope.above && 'above', scope.disabled && 'disabled'].filter(Boolean).join(' ');
    };

    scope.optionClasses = (option) =>
    {
        const isSelected = option.value === scope.value;
        const isActive = option.value === scope.active;

        return ['option', isSelected && 'selected', isActive && 'active', option.disabled && 'disabled'].filter(Boolean).join(' ');
    };

    scope.current = () =>
    {
        if(scope.sourced)
        {
            return scope.find(scope.value);
        }

        return scope.list().find((option) => option.value === scope.value);
    };

    scope.filtered = () =>
    {
        if(scope.sourced || !scope.query)
        {
            return scope.list();
        }

        return scope.list().filter((option) =>
            String(option.label ? option.label : '').toLowerCase().includes(scope.query.toLowerCase())
        );
    };

    scope.close = () =>
    {
        scope.open = false;
        scope.above = false;
        scope.query = '';
        scope.active = null;

        window.removeEventListener('scroll', scope.handleScroll, true);
        window.removeEventListener('resize', scope.close);
        window.removeEventListener('keydown', scope.handleKey);
    };

    scope.toggle = () =>
    {
        if(scope.disabled)
        {
            return;
        }

        if(scope.open)
        {
            scope.close();
            return;
        }

        admin.Fn('do.select.open', scope);
    };

    scope.select = (option) =>
    {
        if(option.disabled)
        {
            return;
        }

        scope.value = option.value;
        scope.close();

        if(scope._change)
        {
            scope._change({ value: scope.value });
        }
    };

    scope.clear = () =>
    {
        scope.value = '';

        if(scope._change)
        {
            scope._change({ value: '' });
        }
    };

    scope.typing = ({ value }) =>
    {
        scope.query = value;

        const filtered = scope.filtered();

        scope.active = filtered.length ? filtered[0].value : null;

        if(scope.sourced)
        {
            scope.search(value);
        }
    };

    scope.dismiss = () => scope.close();

    scope.handleScroll = (event) =>
    {
        if(event.target.closest && event.target.closest('.dropdown'))
        {
            return;
        }

        scope.close();
    };

    admin.Fn('do.select.navigate', scope);
});
