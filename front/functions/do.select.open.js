admin.Fn('do.select.open', function(scope)
{
    scope.open = true;
    scope.query = '';

    const box = scope.Element.querySelector('.box');
    const rect = box.getBoundingClientRect();

    scope.above = window.innerHeight - rect.bottom < 320;

    const current = scope.current();
    const filtered = scope.filtered();

    if(current)
    {
        scope.active = current.value;
    }
    else
    {
        scope.active = filtered.length ? filtered[0].value : null;
    }

    window.addEventListener('scroll', scope.handleScroll, true);
    window.addEventListener('resize', scope.close);
    window.addEventListener('keydown', scope.handleKey);

    if(scope.searchable)
    {
        setTimeout(() =>
        {
            const search = scope.Element ? scope.Element.querySelector('.search > input') : null;

            if(search)
            {
                search.focus();
            }
        }, 10);
    }
});
