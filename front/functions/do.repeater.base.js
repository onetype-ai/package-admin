admin.Fn('do.repeater.base', function(scope)
{
    scope.classes = () =>
    {
        const list = ['box', scope.background, scope.orientation, 'size-' + scope.size];

        scope.variant.forEach((variant) =>
        {
            list.push(variant);
        });

        if(scope.disabled)
        {
            list.push('disabled');
        }

        if(scope.isIterable)
        {
            list.push('iterating');
        }

        return list.join(' ');
    };

    scope.tip = (text) =>
    {
        if(!text)
        {
            return null;
        }

        return {
            text,
            position: {
                x: 'center',
                y: 'top'
            }
        };
    };

    scope.defaults = () =>
    {
        const row = {};

        scope.fields.forEach(field =>
        {
            row[field.key] = field.default !== undefined ? field.default : '';
        });

        return row;
    };
});
