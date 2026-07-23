admin.Fn('is.color.valid', function(value)
{
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
});
