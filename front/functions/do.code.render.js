admin.Fn('do.code.render', function(source, language, showLines, highlight)
{
    const parseHighlight = (value) =>
    {
        if(!value)
        {
            return [];
        }

        const list = [];

        value.split(',').forEach((part) =>
        {
            const range = part.split('-').map((piece) => parseInt(piece.trim()));

            if(range.length === 2)
            {
                for(let line = range[0]; line <= range[1]; line++)
                {
                    list.push(line);
                }
            }
            else if(!isNaN(range[0]))
            {
                list.push(range[0]);
            }
        });

        return list;
    };

    const toLine = (line, index, marks) =>
    {
        const number = index + 1;
        const cls = 'line' + (marks.includes(number) ? ' marked' : '');
        const content = line ? line : ' ';

        return '<div class="' + cls + '"><span class="number">' + number + '</span><span class="code">' + content + '</span></div>';
    };

    const raw = source.replace(/^\n+|\n+$/g, '');
    const highlighted = admin.Fn('do.code.tokenize', raw, language);
    const marks = parseHighlight(highlight);

    if(showLines)
    {
        const rows = highlighted.split('\n').map((line, index) => toLine(line, index, marks)).join('');

        return '<div class="numbered">' + rows + '</div>';
    }

    return '<span class="plain">' + highlighted + '</span>';
});
