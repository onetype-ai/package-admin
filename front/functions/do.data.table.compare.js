admin.Fn('do.data.table.compare', function(left, right, key, direction)
{
    const leftValue = left[key];
    const rightValue = right[key];

    if(typeof leftValue === 'number' && typeof rightValue === 'number')
    {
        return (leftValue - rightValue) * direction;
    }

    return String(leftValue).localeCompare(String(rightValue), undefined, { numeric: true }) * direction;
});
