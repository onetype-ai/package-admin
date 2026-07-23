admin.Fn('do.tags.field', function(scope)
{
    scope.Compute(() =>
    {
        scope.normalized = scope.items.map((item) =>
        {
            if(typeof item === 'string')
            {
                return {
                    id: item,
                    label: item
                };
            }

            return item;
        });
    });

    scope.picked = (tag) =>
    {
        if(Array.isArray(scope.active))
        {
            return scope.active.includes(tag.id);
        }

        return scope.active === tag.id;
    };

    scope.state = (tag) =>
    {
        const list = ['tag'];

        list.push(tag.color ? tag.color : 'brand');

        if(scope.picked(tag))
        {
            list.push('active');
        }

        if(tag.disabled)
        {
            list.push('disabled');
        }

        return list.join(' ');
    };

    scope.select = (tag, event) =>
    {
        if(tag.disabled)
        {
            return;
        }

        if(tag.onClick)
        {
            tag.onClick({ event, tag });
        }

        const next = admin.Fn('get.tags.next', scope, tag);

        scope.active = next;

        if(scope._change)
        {
            scope._change({ event, value: next });
        }
    };
});
