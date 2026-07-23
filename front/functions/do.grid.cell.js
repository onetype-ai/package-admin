admin.Fn('do.grid.cell', function(item, field)
{
    const value = item[field.key];

    const result = {
        key: field.key,
        type: field.type,
        value: value === null || value === undefined ? '' : value
    };

    if(field.type === 'title')
    {
        result.sub = field.sub ? item[field.sub] : '';
    }

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
        result.shown = Array.isArray(value) ? value.slice(0, 2) : [];
        result.more = Array.isArray(value) && value.length > 2 ? value.length - 2 : 0;
    }

    return result;
});
