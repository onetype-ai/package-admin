admin.Fn('get.data.table.track', function(column, index)
{
    if(column.width)
    {
        return column.width;
    }

    return index === 0 ? 'minmax(0, 1fr)' : 'auto';
});
