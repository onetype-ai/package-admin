admin.Fn('do.form.tags.field', function(scope)
{
    scope.query = '';
    scope.open = false;
    scope.above = false;
    scope.active = null;
    scope.shake = null;

    elements.Fn('get.source', scope, () => scope.options);

    scope.Compute(() =>
    {
        scope.isSelect = scope.mode === 'select';

        if(scope.sourced && scope.value.length)
        {
            scope.resolve(scope.value);
        }
    });

    scope.same = (left, right) => String(left) === String(right);

    scope.list = () =>
    {
        if(scope.sourced)
        {
            return scope.results;
        }

        return scope.normalize(Array.isArray(scope.options) ? scope.options : []);
    };

    scope.labelOf = (value) =>
    {
        const found = scope.sourced ? scope.find(value) : scope.list().find((option) => option.value === value);

        return found ? found.label : String(value);
    };

    scope.classes = () =>
    {
        const list = ['box', 'bg-' + scope.background, scope.color];

        if(scope.above)
        {
            list.push('above');
        }

        if(scope.disabled)
        {
            list.push('disabled');
        }

        return list.join(' ');
    };

    scope.chipClass = (option) =>
    {
        const selected = scope.value.some((value) => scope.same(value, option.value));

        return 'chip' + (selected ? ' selected' : '');
    };

    scope.reachedMax = () => scope.max > 0 && scope.value.length >= scope.max;

    scope.filtered = () =>
    {
        const list = scope.list();

        if(!list.length)
        {
            return [];
        }

        const query = scope.query.toLowerCase();

        return list.filter((option) =>
        {
            if(scope.value.some((value) => scope.same(value, option.value)))
            {
                return false;
            }

            if(scope.sourced || !query)
            {
                return true;
            }

            return String(option.label ? option.label : '').toLowerCase().includes(query);
        });
    };

    admin.Fn('do.form.tags.select', scope);
    admin.Fn('do.form.tags.input', scope);
    admin.Fn('do.form.tags.dropdown', scope);
});
