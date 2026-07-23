admin.Fn('do.table.field', function(scope)
{
    scope.sorted = {
        key: '',
        direction: 1
    };

    const raw = (item, field) =>
    {
        const value = item[field.key];

        if(value === null || value === undefined)
        {
            return '';
        }

        if(field.type === 'status')
        {
            return typeof value === 'object' ? value.label : String(value);
        }

        if(field.type === 'user')
        {
            return typeof value === 'object' ? value.name : String(value);
        }

        if(field.type === 'tags')
        {
            return value.length;
        }

        if(field.type === 'number')
        {
            return Number(value);
        }

        return String(value);
    };

    const cell = (item, field) =>
    {
        const value = item[field.key];
        const result = {
            key: field.key,
            type: field.type,
            align: field.align,
            value: value === null || value === undefined ? '' : value
        };

        if(field.type === 'status')
        {
            result.label = typeof value === 'object' ? value.label : String(result.value);
            result.color = typeof value === 'object' && value.color ? value.color : 'brand';
        }

        if(field.type === 'user')
        {
            result.name = typeof value === 'object' ? value.name : String(result.value);
            result.color = typeof value === 'object' && value.color ? value.color : 'brand';
            result.initials = result.name.split(' ').map((word) => word.charAt(0)).slice(0, 2).join('');
        }

        if(field.type === 'tags')
        {
            result.shown = Array.isArray(value) ? value.slice(0, 3) : [];
            result.more = Array.isArray(value) && value.length > 3 ? value.length - 3 : 0;
        }

        return result;
    };

    const trackFor = (definition, index) =>
    {
        if(definition.width)
        {
            return definition.width;
        }

        return index === 0 ? 'minmax(0, 1fr)' : 'max-content';
    };

    scope.Compute(() =>
    {
        const entries = [...scope.items];
        const field = scope.fields.find((candidate) => candidate.key === scope.sorted.key);

        if(field)
        {
            entries.sort((left, right) =>
            {
                const leftValue = raw(left, field);
                const rightValue = raw(right, field);

                if(typeof leftValue === 'number' && typeof rightValue === 'number')
                {
                    return (leftValue - rightValue) * scope.sorted.direction;
                }

                return String(leftValue).localeCompare(String(rightValue)) * scope.sorted.direction;
            });
        }

        scope.rows = entries.map((item) => ({
            key: item.id,
            item,
            cells: scope.fields.map((definition) => cell(item, definition))
        }));

        scope.template = scope.fields.map(trackFor).join(' ');
    });

    scope.classes = () =>
    {
        const list = ['box'];

        if(scope.background || scope.background === 0)
        {
            list.push('bg-' + scope.background);
        }

        if(scope._open)
        {
            list.push('clickable');
        }

        return list.join(' ');
    };

    scope.order = (field) =>
    {
        const direction = scope.sorted.key === field.key ? scope.sorted.direction * -1 : 1;

        scope.sorted = {
            key: field.key,
            direction
        };
    };

    scope.open = (event, item) =>
    {
        if(scope._open)
        {
            scope._open({ event, value: item });
        }
    };
});
