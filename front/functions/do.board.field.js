admin.Fn('do.board.field', function(scope)
{
    scope.Compute(() =>
    {
        scope.lanes = admin.Fn('make.board.lanes', scope);
    });

    scope.open = (event, item) =>
    {
        scope._open && scope._open({ event, value: item });
    };

    scope.create = (event, value) =>
    {
        scope._create && scope._create({ event, value });
    };
});
