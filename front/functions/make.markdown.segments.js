admin.Fn('make.markdown.segments', function(content)
{
    const parts = content.split(/```(\w*)\n([\s\S]*?)```/g);
    const segments = [];

    for(let order = 0; order < parts.length; order += 3)
    {
        const part = parts[order];
        const language = parts[order + 1];
        const source = parts[order + 2];

        if(part && part.trim())
        {
            admin.Fn('make.markdown.text', part, segments);
        }

        if(source !== undefined)
        {
            segments.push({
                key: segments.length,
                type: 'code',
                language: language ? language : 'text',
                source: source.replace(/^\n+|\n+$/g, '')
            });
        }
    }

    return segments;
});
