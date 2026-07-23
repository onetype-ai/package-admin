admin.Fn('do.form.tags.dropdown', function(scope)
{
    scope.openDropdown = () =>
    {
        if(scope.open)
        {
            return;
        }

        const box = scope.Element.querySelector('.box');
        const rect = box.getBoundingClientRect();

        scope.above = window.innerHeight - rect.bottom < 320;
        scope.open = true;
        scope.Update();

        window.addEventListener('scroll', scope.handleScroll, true);
        window.addEventListener('resize', scope.closeDropdown);
    };

    scope.closeDropdown = () =>
    {
        if(!scope.open)
        {
            return;
        }

        scope.open = false;
        scope.above = false;
        scope.query = '';
        scope.active = null;
        scope.Update();

        window.removeEventListener('scroll', scope.handleScroll, true);
        window.removeEventListener('resize', scope.closeDropdown);
    };

    scope.handleScroll = (event) =>
    {
        if(event.target.closest && event.target.closest('.dropdown'))
        {
            return;
        }

        scope.closeDropdown();
    };

    scope.dismiss = () => scope.closeDropdown();
});
