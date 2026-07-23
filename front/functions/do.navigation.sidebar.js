admin.Fn('do.navigation.sidebar', function(scope)
{
    scope.query = '';
    scope.collapsed = {};

    const build = () =>
    {
        const query = scope.query.trim().toLowerCase();
        const prepare = (items) => admin.Fn('get.sidebar.rows', scope, items, query);

        scope.searching = !!query;
        scope.top = prepare(scope.items.filter((item) => (item.placement ? item.placement : 'top') === 'top'));
        scope.bottom = prepare(scope.items.filter((item) => item.placement === 'bottom'));

        scope.shell = ['box', 'bg-' + scope.background].join(' ');
        scope.finder = Math.min(scope.background + 1, 3);
        scope.hasHead = !!scope.title || !!scope.subtitle || !!scope.version || !!scope.Slots.top;
        scope.hasFoot = !!scope.Slots.bottom;
        scope.empty = scope.searching && !scope.top.length && !scope.bottom.length;
    };

    scope.Compute(build);

    scope.state = (row) =>
    {
        const kind = row.section ? 'section' : 'entry';

        return kind
            + (row.indent ? ' child child-' + row.indent : '')
            + (row.active ? ' active' : '')
            + (row.soon ? ' soon' : '')
            + (row.disabled ? ' disabled' : '')
            + (row.hasActions ? ' has-actions' : '');
    };

    scope.toggle = (row) =>
    {
        scope.collapsed = { ...scope.collapsed, [row.key]: !scope.collapsed[row.key] };
        build();
    };

    scope.input = ({ value }) =>
    {
        scope.query = value;
        build();
    };

    scope.handle = (row, event) =>
    {
        if(row.soon || row.disabled)
        {
            return;
        }

        if(row.parent && !row.value)
        {
            return scope.toggle(row);
        }

        if(scope._click)
        {
            scope._click({ event, value: row });
        }
    };

    scope.act = (action, row, event) =>
    {
        action.onClick && action.onClick({ event, action, item: row });
    };
});
