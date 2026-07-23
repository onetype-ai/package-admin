admin.Fn('make.board.card', function(item)
{
    const badges = Array.isArray(item.badges) ? item.badges.map((badge) =>
    {
        return {
            label: badge.label,
            icon: badge.icon,
            color: badge.color ? badge.color : 'brand'
        };
    }) : [];

    return {
        key: item.id,
        item,
        title: item.title,
        description: item.description,
        badges,
        image: item.image,
        author: admin.Fn('make.board.author', item.author),
        date: item.date
    };
});
