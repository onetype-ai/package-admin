admin.Fn('do.transfer.field', function(scope)
{
    scope.leftSearch = '';
    scope.rightSearch = '';

    elements.Fn('get.source', scope, () => scope.items);

    scope.list = () =>
    {
        if(scope.sourced)
        {
            const known = scope.value.map((value) => scope.find(value)).filter(Boolean);
            const extra = known.filter((option) => !scope.results.some((entry) => entry.value === option.value));

            return [...scope.results, ...extra];
        }

        return Array.isArray(scope.items) ? scope.items : [];
    };

    scope.classes = () =>
    {
        const list = ['box', 'bg-' + scope.background];

        scope.disabled && list.push('disabled');

        return list.join(' ');
    };

    scope.isSelected = (id) => scope.value.includes(id);
    scope.atMax = () => scope.max && scope.value.length >= scope.max;
    scope.slotsLeft = () => scope.max ? Math.max(0, scope.max - scope.value.length) : Infinity;

    scope.filter = (list, query) =>
    {
        if(scope.sourced || !query)
        {
            return list;
        }

        const search = query.toLowerCase();

        return list.filter((item) => admin.Fn('do.transfer.matched', item, search));
    };

    scope.computed = () =>
    {
        const available = scope.list().filter((item) => !scope.isSelected(item.value));
        const selected = scope.list().filter((item) => scope.isSelected(item.value));

        return {
            available,
            selected,
            availableFiltered: scope.filter(available, scope.leftSearch),
            selectedFiltered: scope.filter(selected, scope.rightSearch)
        };
    };

    scope.available = () => scope.computed().availableFiltered;
    scope.chosen = () => scope.computed().selectedFiltered;

    scope.emit = () =>
    {
        scope.value = scope.list().filter((item) => scope.value.includes(item.value)).map((item) => item.value);
        scope._change && scope._change({ value: scope.value });
    };

    scope.toggleLeft = (item) => admin.Fn('do.transfer.toggle', scope, item, true);
    scope.toggleRight = (item) => admin.Fn('do.transfer.toggle', scope, item, false);
    scope.moveAllRight = () => admin.Fn('do.transfer.moveall', scope, true);
    scope.moveAllLeft = () => admin.Fn('do.transfer.moveall', scope, false);

    scope.changeLeftSearch = ({ value }) =>
    {
        scope.leftSearch = value;
        scope.sourced && scope.search(value);
    };

    scope.changeRightSearch = ({ value }) => scope.rightSearch = value;

    scope.canMoveAllRight = () =>
    {
        return !scope.disabled && !scope.atMax() && scope.list().some((item) => !item.disabled && !scope.isSelected(item.value));
    };

    scope.canMoveAllLeft = () =>
    {
        return !scope.disabled && scope.list().some((item) => !item.disabled && scope.isSelected(item.value));
    };

    scope.Compute(() =>
    {
        if(scope.sourced && scope.value.length)
        {
            scope.resolve(scope.value);
        }
    });
});
