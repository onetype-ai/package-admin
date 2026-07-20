admin.status.Fn('item.render', function(item)
{
	return admin.status.Render(item.Get('id'), { ...item.Get('data') }).Element;
});
