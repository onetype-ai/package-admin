admin.layouts.Fn('item.render', function(item)
{
    return admin.layouts.Render(item.Get('id'), { ...admin.layouts.Fn('data'), ...(admin.layouts.StoreGet('values.' + item.Get('id')) || {}) }).Element;
});
