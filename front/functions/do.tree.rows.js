admin.Fn('do.tree.rows', function(scope)
{
    scope.rows = () =>
    {
        const query = scope.query.trim().toLowerCase();
        const out = [];

        const walk = (nodes, depth) =>
        {
            for(const node of nodes)
            {
                if(query && !scope.matches(node, query))
                {
                    continue;
                }

                out.push({
                    node,
                    depth,
                    branch: scope.branch(node),
                    open: scope.opened(node),
                    loading: !!scope.loading[node.id]
                });

                if(scope.branch(node) && scope.opened(node))
                {
                    walk(scope.kids(node), depth + 1);
                }
            }
        };

        walk(scope.items, 0);

        return out;
    };
});
