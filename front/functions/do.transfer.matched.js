admin.Fn('do.transfer.matched', function(item, search)
{
    const label = String(item.label ? item.label : '').toLowerCase();
    const description = String(item.description ? item.description : '').toLowerCase();

    return label.includes(search) || description.includes(search);
});
