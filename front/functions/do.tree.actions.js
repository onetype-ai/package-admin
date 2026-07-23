admin.Fn('do.tree.actions', function(scope)
{
    scope.toggle = async (node) =>
    {
        if(!scope.branch(node))
        {
            return;
        }

        if(typeof node.children === 'function' && !scope.loaded[node.id])
        {
            scope.loading = { ...scope.loading, [node.id]: true };

            const children = await node.children(node);

            scope.loaded = { ...scope.loaded, [node.id]: Array.isArray(children) ? children : [] };
            scope.loading = { ...scope.loading, [node.id]: false };
        }

        const open = !scope.state[node.id];

        scope.state = { ...scope.state, [node.id]: open };

        if(scope._toggle)
        {
            scope._toggle({ value: node, open });
        }
    };

    scope.pick = (node) =>
    {
        if(node.disabled)
        {
            return;
        }

        scope.current = node.id;

        if(scope._open)
        {
            scope._open({ value: node });
        }
    };

    scope.everything = (open) =>
    {
        const state = {};

        const walk = (nodes) =>
        {
            for(const node of nodes)
            {
                if(scope.branch(node))
                {
                    state[node.id] = open;
                    walk(scope.kids(node));
                }
            }
        };

        walk(scope.items);

        scope.state = state;
    };
});
