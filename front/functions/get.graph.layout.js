admin.Fn('get.graph.layout', function(scope)
{
    const width = 300;
    const gapX = 32;
    const gapY = 70;
    const pad = 24;

    const cards = [];
    const links = [];
    const levels = [];

    let cursor = 0;

    const walk = (node, depth, parent) =>
    {
        const children = Array.isArray(node.children) ? node.children : [];
        const card = {
            node,
            depth,
            x: 0,
            y: 0,
            height: admin.Fn('get.graph.measure', node)
        };

        levels[depth] = Math.max(levels[depth] ? levels[depth] : 0, card.height);
        cards.push(card);

        if(children.length)
        {
            for(const child of children)
            {
                walk(child, depth + 1, card);
            }

            const mine = cards.filter((entry) => children.includes(entry.node));

            card.x = (Math.min(...mine.map((entry) => entry.x)) + Math.max(...mine.map((entry) => entry.x))) / 2;
        }
        else
        {
            card.x = pad + cursor * (width + gapX);
            cursor = cursor + 1;
        }

        if(parent)
        {
            links.push({
                id: parent.node.id + '-' + node.id,
                child: card,
                parent: parent,
                color: node.color ? node.color : 'brand'
            });
        }
    };

    for(const node of scope.items)
    {
        walk(node, 0, null);
    }

    const tops = [];

    let running = pad;

    for(let depth = 0; depth < levels.length; depth++)
    {
        tops[depth] = running;
        running = running + levels[depth] + gapY;
    }

    for(const card of cards)
    {
        card.y = tops[card.depth];
    }

    admin.Fn('do.graph.links', links, width);

    return {
        cards,
        links,
        width: Math.max(...cards.map((card) => card.x)) + width + pad,
        height: running - gapY + pad
    };
});
