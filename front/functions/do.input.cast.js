admin.Fn('do.input.cast', function(type, value)
{
    if(type !== 'number')
    {
        return value;
    }

    const number = Number(value);

    return Number.isFinite(number) ? number : null;
});
