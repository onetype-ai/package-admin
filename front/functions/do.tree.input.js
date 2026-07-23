admin.Fn('do.tree.input', function(scope)
{
    scope.type = () => ({ value }) =>
    {
        scope.query = value;
    };

    scope.key = () => ({ event }) =>
    {
        const list = scope.rows();

        if(!list.length || !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(event.key))
        {
            return;
        }

        event.preventDefault();

        const index = list.findIndex((row) => row.node.id === scope.current);
        const row = index >= 0 ? list[index] : null;

        if(event.key === 'ArrowDown')
        {
            scope.current = list[Math.min(index + 1, list.length - 1)].node.id;
        }
        else if(event.key === 'ArrowUp')
        {
            scope.current = list[Math.max(index - 1, 0)].node.id;
        }
        else if(event.key === 'ArrowRight' && row && row.branch && !row.open)
        {
            scope.toggle(row.node);
        }
        else if(event.key === 'ArrowLeft' && row && row.branch && row.open)
        {
            scope.toggle(row.node);
        }
        else if(event.key === 'Enter' && row)
        {
            scope.pick(row.node);
        }
    };

    scope.stamp = (row) =>
    {
        const list = ['row', row.node.color ? row.node.color : 'brand'];

        if(row.node.id === scope.current)
        {
            list.push('active');
        }

        if(row.node.disabled)
        {
            list.push('disabled');
        }

        return list.join(' ');
    };
});
