admin.Fn('do.color.normalize', function(value)
{
    if(!value)
    {
        return '';
    }

    let hex = String(value).trim().replace(/[^#0-9a-fA-F]/g, '');

    if(hex && hex.charAt(0) !== '#')
    {
        hex = '#' + hex;
    }

    return hex.slice(0, 7);
});
