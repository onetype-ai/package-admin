admin.Fn('make.markdown.table', function(block)
{
    const lines = block.trim().split('\n');
    const cells = (line) => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim().replace(/`/g, ''));

    const fields = cells(lines[0]).map((label, index) =>
    {
        return {
            key: 'c' + index,
            label,
            type: 'text'
        };
    });

    const items = lines.slice(2).map((line, order) =>
    {
        const values = cells(line);
        const item = { id: order + 1 };

        fields.forEach((field, position) => item[field.key] = values[position] !== undefined ? values[position] : '');

        return item;
    });

    return { fields, items };
});
