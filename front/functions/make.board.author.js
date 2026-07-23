admin.Fn('make.board.author', function(source)
{
    let author = null;

    if(source && typeof source === 'object')
    {
        author = source;
    }
    else if(source)
    {
        author = { name: String(source) };
    }

    if(!author)
    {
        return null;
    }

    const initials = author.name.split(' ').map((word) => word.charAt(0)).slice(0, 2).join('');

    return {
        name: author.name,
        initials,
        color: author.color ? author.color : 'brand'
    };
});
