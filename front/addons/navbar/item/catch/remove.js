admin.navbar.ItemOn('remove', (item) =>
{
	if(item.Get('render'))
	{
		admin.navbar.RenderRemove(item.Get('id'));
	}
});
