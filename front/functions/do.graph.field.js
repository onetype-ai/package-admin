admin.Fn('do.graph.field', function(scope)
{
    scope.current = scope.active ? scope.active : '';

    scope.layout = () => admin.Fn('get.graph.layout', scope);

    scope.chips = (node) => node.tags.map((tag) =>
    {
        if(typeof tag === 'string')
        {
            return {
                id: tag,
                label: tag
            };
        }

        return {
            id: tag.label,
            label: tag.label,
            tooltip: tag.tooltip ? tag.tooltip : ''
        };
    });

    scope.pick = (node) =>
    {
        scope.current = node.id;

        if(scope._open)
        {
            scope._open({ value: node });
        }
    };

    scope.stamp = (card) =>
    {
        const list = ['card', card.node.color ? card.node.color : 'brand'];

        if(card.node.id === scope.current)
        {
            list.push('active');
        }

        return list.join(' ');
    };

    scope.place = (card) =>
    {
        return 'left: ' + card.x + 'px; top: ' + card.y + 'px; width: 300px; min-height: ' + card.height + 'px;';
    };

    scope.frame = () =>
    {
        const { width, height } = scope.layout();

        return 'width: ' + width + 'px; height: ' + height + 'px;';
    };
});
