admin.Fn('make.board.lanes', function(scope)
{
    let columns = scope.columns;

    if(!columns.length)
    {
        const values = [...new Set(scope.items.map((item) => String(item[scope.field])))];

        columns = values.map((value) =>
        {
            return {
                value,
                label: value,
                color: 'brand'
            };
        });
    }

    return columns.map((column) =>
    {
        const entries = scope.items.filter((item) => String(item[scope.field]) === column.value);

        return {
            key: column.value,
            label: column.label,
            color: column.color ? column.color : 'brand',
            canCreate: column.canCreate !== false,
            count: entries.length,
            cards: entries.map((item) => admin.Fn('make.board.card', item))
        };
    });
});
