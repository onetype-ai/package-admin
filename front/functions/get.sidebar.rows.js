admin.Fn('get.sidebar.rows', function(scope, items, query)
{
    const matches = (item) =>
    {
        return !query || String(item.label ? item.label : '').toLowerCase().includes(query);
    };

    const prune = (list) =>
    {
        return (list ? list : []).map((item) =>
        {
            if(matches(item))
            {
                return item;
            }

            const children = prune(item.items);

            return children.length ? { ...item, items: children } : null;
        }).filter(Boolean);
    };

    const count = (list) =>
    {
        return (list ? list : []).reduce((sum, item) => sum + (item.items && item.items.length ? count(item.items) : 1), 0);
    };

    const keyFor = (item, path, index) =>
    {
        if(item.value)
        {
            return path + '/' + item.value;
        }

        if(item.label)
        {
            return path + '/' + item.label;
        }

        return path + '/' + index;
    };

    const nextOffset = (section, item, offset) =>
    {
        if(!section)
        {
            return offset;
        }

        return item.icon ? 1 : 0;
    };

    const flatten = ({ list, depth, path, out, offset }) =>
    {
        (list ? list : []).forEach((item, index) =>
        {
            const key = keyFor(item, path, index);
            const children = item.items ? item.items : [];
            const open = scope.searching || !scope.collapsed[key];
            const section = !depth && !!children.length;

            out.push({
                ...item,
                key,
                depth,
                open,
                section,
                indent: depth ? depth - 1 + offset : 0,
                parent: !!children.length,
                count: section && (item.count === null || item.count === undefined) ? count(children) : item.count,
                active: !item.soon && !item.disabled && !!item.value && item.value === scope.active,
                hasActions: !!(item.actions ? item.actions : []).length
            });

            if(children.length && open)
            {
                flatten({
                    list: children,
                    depth: depth + 1,
                    path: key,
                    out,
                    offset: nextOffset(section, item, offset)
                });
            }
        });

        return out;
    };

    return flatten({
        list: query ? prune(items) : items,
        depth: 0,
        path: '',
        out: [],
        offset: 0
    });
});
