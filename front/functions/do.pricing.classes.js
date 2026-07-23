admin.Fn('do.pricing.classes', function(color, background, featured)
{
    const list = ['box', color, 'bg-' + background];

    if(featured)
    {
        list.push('featured');
    }

    return list.join(' ');
});
