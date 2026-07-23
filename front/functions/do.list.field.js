admin.Fn('do.list.field', function(scope)
{
    scope.query = '';

    scope.visible = () =>
    {
        const query = scope.query.trim().toLowerCase();

        if(!query)
        {
            return scope.rows;
        }

        return scope.rows.filter((row) =>
        {
            const label = row.label ? String(row.label).toLowerCase() : '';
            const sublabel = row.sublabel ? String(row.sublabel).toLowerCase() : '';

            return label.includes(query) || sublabel.includes(query);
        });
    };

    scope.type = () => ({ value }) =>
    {
        scope.query = value;
    };

    scope.classes = () =>
    {
        const list = ['box'];

        if(scope.background || scope.background === 0)
        {
            list.push('bg-' + scope.background);
        }

        return list.join(' ');
    };

    scope.state = (row) => row.onClick ? 'row ' + row.color + ' clickable' : 'row ' + row.color;

    scope.bar = (row) => 'width: ' + Math.min(Math.max(row.percent, 0), 100) + '%';

    scope.run = (row) =>
    {
        if(row.onClick)
        {
            row.onClick(row);
        }
    };
});
