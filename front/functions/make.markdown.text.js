admin.Fn('make.markdown.text', function(part, segments)
{
    const chunks = part.split(/((?:[ \t]*\|.*\|[ \t]*(?:\n|$)){2,})/);

    chunks.forEach((chunk, order) =>
    {
        if(!chunk || !chunk.trim())
        {
            return;
        }

        if(order % 2)
        {
            segments.push({
                key: segments.length,
                type: 'table',
                ...admin.Fn('make.markdown.table', chunk)
            });
        }
        else
        {
            segments.push({
                key: segments.length,
                type: 'html',
                content: onetype.markdown.markdown(chunk)
            });
        }
    });
});
