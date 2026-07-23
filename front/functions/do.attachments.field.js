admin.Fn('do.attachments.field', function(scope)
{
    scope.Compute(() =>
    {
        scope.list = scope.items.map((item) =>
        {
            const kind = admin.Fn('get.attachment.kind', item.name);

            return {
                ...item,
                ...kind,
                preview: kind.image && item.src ? true : false
            };
        });
    });

    scope.download = (item) =>
    {
        if(scope._download)
        {
            scope._download({ item });
            return;
        }

        if(item.src)
        {
            window.open(item.src, '_blank');
        }
    };

    scope.remove = (item) =>
    {
        if(scope._remove)
        {
            scope._remove({ item });
        }
    };
});
