admin.Fn('do.graph.links', function(links, width)
{
    links.forEach((link) =>
    {
        const startX = link.parent.x + width / 2;
        const startY = link.parent.y + link.parent.height;
        const endX = link.child.x + width / 2;
        const endY = link.child.y;
        const bend = (endY - startY) / 2;

        link.d = 'M ' + startX + ' ' + startY
            + ' C ' + startX + ' ' + (startY + bend)
            + ', ' + endX + ' ' + (endY - bend)
            + ', ' + endX + ' ' + endY;
        link.x1 = startX;
        link.y1 = startY;
        link.x2 = endX;
        link.y2 = endY;
    });
});
