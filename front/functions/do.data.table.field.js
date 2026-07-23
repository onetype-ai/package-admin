admin.Fn('do.data.table.field', function(scope)
{
    scope.by = '';
    scope.direction = 1;
    scope.selected = {};
    scope.expanded = {};

    scope.classes = () =>
    {
        const hasBackground = scope.background || scope.background === 0;

        return ['box', hasBackground && 'bg-' + scope.background, scope._click && 'clickable'].filter(Boolean).join(' ');
    };

    scope.rowClasses = (row) =>
    {
        return ['row', scope.checked(row) && 'selected', row.table && scope.opened(row) && 'open'].filter(Boolean).join(' ');
    };

    scope.foldClasses = (row) => scope.opened(row) ? 'fold-toggle open' : 'fold-toggle';

    scope.cellClasses = (column) => 'td ' + column.align + (column.wrap ? ' wrap' : '');

    scope.pillClasses = (row, column) => 'pill ' + (row[column.key + 'Color'] || 'brand');

    scope.allClasses = () =>
    {
        if(scope.count() && scope.count() === scope.rows.length)
        {
            return 'check on';
        }

        return scope.count() ? 'check some' : 'check';
    };

    scope.allIcon = () =>
    {
        if(scope.count() && scope.count() === scope.rows.length)
        {
            return 'check';
        }

        return scope.count() ? 'remove' : '';
    };

    scope.Compute(() =>
    {
        scope.nests = scope.rows.some((row) => row.table);

        const lead = (scope.selectable ? 'auto ' : '') + (scope.nests ? 'auto ' : '');

        scope.template = lead + scope.columns.map((column, index) => admin.Fn('get.data.table.track', column, index)).join(' ');

        const rows = [...scope.rows];

        if(scope.by)
        {
            const direction = scope.direction;

            rows.sort((first, second) => admin.Fn('do.data.table.compare', first, second, scope.by, direction));
        }

        scope.list = rows;
    });

    scope.sort = (column) =>
    {
        if(column.sortable === false)
        {
            return;
        }

        if(scope.by === column.key)
        {
            scope.direction = scope.direction * -1;
            scope.by = column.key;
            return;
        }

        scope.direction = 1;
        scope.by = column.key;
    };

    scope.arrow = (column) =>
    {
        if(scope.by !== column.key)
        {
            return '';
        }

        return scope.direction === 1 ? 'arrow_upward' : 'arrow_downward';
    };

    scope.chosen = () => scope.rows.filter((row, index) => scope.selected[index]);

    scope.notify = () =>
    {
        if(scope._select)
        {
            scope._select({ rows: scope.chosen() });
        }
    };

    scope.count = () => Object.values(scope.selected).filter(Boolean).length;

    scope.mark = (row) =>
    {
        const index = scope.rows.indexOf(row);

        scope.selected = { ...scope.selected, [index]: !scope.selected[index] };
        scope.notify();
    };

    scope.all = () =>
    {
        const full = scope.count() === scope.rows.length;
        const next = {};

        scope.rows.forEach((row, index) => next[index] = !full);

        scope.selected = next;
        scope.notify();
    };

    scope.clear = () =>
    {
        scope.selected = {};
        scope.notify();
    };

    scope.run = (action) =>
    {
        if(action.onClick)
        {
            action.onClick({ rows: scope.chosen() });
        }
    };

    scope.unfold = (row) =>
    {
        const index = scope.rows.indexOf(row);

        scope.expanded = { ...scope.expanded, [index]: !scope.expanded[index] };
    };

    scope.opened = (row) => !!scope.expanded[scope.rows.indexOf(row)];

    scope.checked = (row) => !!scope.selected[scope.rows.indexOf(row)];

    scope.pick = (row, event) =>
    {
        if(scope._click)
        {
            scope._click({ event, row });
        }
    };
});
