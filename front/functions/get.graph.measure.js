admin.Fn('get.graph.measure', function(node)
{
    let height = 34 + 42;

    if(node.description)
    {
        height = height + 42;
    }

    if(Array.isArray(node.rows) && node.rows.length)
    {
        height = height + node.rows.length * 22 + 12;
    }

    if(Array.isArray(node.list) && node.list.length)
    {
        height = height + node.list.length * 38 + 26;
    }

    if(node.avatar || (Array.isArray(node.tags) && node.tags.length))
    {
        const rows = Array.isArray(node.tags) ? Math.max(1, Math.ceil(node.tags.length / 3)) : 1;

        height = height + 10 + rows * 24;
    }

    return height + 26;
});
