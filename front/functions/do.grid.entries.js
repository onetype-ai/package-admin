admin.Fn('do.grid.entries', function(rows, group)
{
    const levels = (Array.isArray(group) ? group : [group]).filter(Boolean);

    const build = (currentRows, depth, prefix) =>
    {
        if(depth >= levels.length)
        {
            return currentRows.map((row) => ({
                kind: 'row',
                key: prefix + 'r' + row.key,
                row: row
            }));
        }

        const buckets = {};

        currentRows.forEach((row) =>
        {
            const label = row.item[levels[depth]] ? String(row.item[levels[depth]]) : 'Other';

            if(!buckets[label])
            {
                buckets[label] = [];
            }

            buckets[label].push(row);
        });

        const entries = [];

        for(const [label, bucket] of Object.entries(buckets))
        {
            entries.push({
                kind: 'section',
                key: prefix + 's' + label,
                label: label,
                depth: depth,
                count: bucket.length
            });

            entries.push(...build(bucket, depth + 1, prefix + label + '/'));
        }

        return entries;
    };

    return build(rows, 0, '');
});
