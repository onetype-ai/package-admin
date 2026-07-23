admin.Fn('do.textarea.resize', function(textarea, rows, minRows, maxRows)
{
    if(!textarea)
    {
        return;
    }

    textarea.style.height = 'auto';

    const minimum = minRows ? minRows : rows;
    const style = getComputedStyle(textarea);
    const line = parseFloat(style.lineHeight) ? parseFloat(style.lineHeight) : 22;

    const floor = minimum * line;
    const ceiling = maxRows ? maxRows * line : Infinity;
    const scroll = textarea.scrollHeight;

    textarea.style.height = Math.max(floor, Math.min(scroll, ceiling)) + 'px';
    textarea.style.overflowY = scroll > ceiling ? 'auto' : 'hidden';
});
