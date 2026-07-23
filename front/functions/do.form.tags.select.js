admin.Fn('do.form.tags.select', function(scope)
{
    const notify = () =>
    {
        if(scope._change)
        {
            scope._change({ value: scope.value });
        }
    };

    const settle = () =>
    {
        scope.query = '';
        scope.active = null;
        scope.open = false;
        scope.Update();
        notify();
    };

    scope.add = (option) =>
    {
        if(scope.disabled || !option || option.disabled || scope.reachedMax())
        {
            return;
        }

        const existing = scope.value.find((value) => scope.same(value, option.value));

        if(existing !== undefined)
        {
            scope.shake = existing;
            scope.Update();

            setTimeout(() =>
            {
                scope.shake = null;
                scope.Update();
            }, 400);

            return;
        }

        scope.value.push(option.value);
        settle();
    };

    scope.addRaw = (raw) =>
    {
        if(scope.disabled || scope.restrict)
        {
            return;
        }

        const text = String(raw ? raw : '').trim();

        if(!text || (scope.minLength && text.length < scope.minLength) || scope.reachedMax())
        {
            return;
        }

        if(scope.value.some((value) => scope.same(value, text)))
        {
            return;
        }

        scope.value.push(text);
        settle();
    };

    scope.remove = (tag) =>
    {
        if(scope.disabled)
        {
            return;
        }

        const index = scope.value.findIndex((value) => scope.same(value, tag));

        if(index === -1)
        {
            return;
        }

        scope.value.splice(index, 1);
        scope.Update();
        notify();
    };

    scope.toggle = (option) =>
    {
        if(scope.disabled || option.disabled)
        {
            return;
        }

        const index = scope.value.findIndex((value) => scope.same(value, option.value));

        if(index !== -1)
        {
            scope.value.splice(index, 1);
        }
        else
        {
            if(scope.reachedMax())
            {
                return;
            }

            scope.value.push(option.value);
        }

        scope.Update();
        notify();
    };
});
