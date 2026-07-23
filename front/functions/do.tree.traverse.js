admin.Fn('do.tree.traverse', function(scope)
{
    scope.kids = (node) =>
    {
        if(Array.isArray(node.children))
        {
            return node.children;
        }

        return typeof node.children === 'function' && scope.loaded[node.id] ? scope.loaded[node.id] : [];
    };

    scope.branch = (node) =>
    {
        return Array.isArray(node.children) ? node.children.length > 0 : typeof node.children === 'function';
    };

    scope.total = (node) =>
    {
        const children = scope.kids(node);

        return children.reduce((sum, child) => sum + 1 + scope.total(child), 0);
    };

    scope.matches = (node, query) =>
    {
        const own = [node.title, node.subtitle, node.badge, node.id].some((text) => text ? String(text).toLowerCase().includes(query) : false);

        return own ? true : scope.kids(node).some((child) => scope.matches(child, query));
    };

    scope.opened = (node) =>
    {
        const query = scope.query.trim().toLowerCase();

        if(query)
        {
            return scope.kids(node).some((child) => scope.matches(child, query));
        }

        return !!scope.state[node.id];
    };
});
