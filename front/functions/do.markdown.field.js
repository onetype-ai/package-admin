admin.Fn('do.markdown.field', function(scope)
{
    scope.Compute(() =>
    {
        scope.segments = admin.Fn('make.markdown.segments', scope.content);
    });

    scope.classes = () =>
    {
        const list = ['box'];

        if(scope.background || scope.background === 0)
        {
            list.push('bg-' + scope.background);
        }

        if(scope.collapsible && !scope.expanded)
        {
            list.push('folded');
        }

        return list.join(' ');
    };

    scope.toggle = () =>
    {
        scope.expanded = !scope.expanded;
    };
});
