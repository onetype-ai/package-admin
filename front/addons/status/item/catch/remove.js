admin.status.ItemOn('removed', (item) =>
{
	if(item.Get('render'))
	{
		admin.status.RenderRemove(item.Get('id'));
	}
});
