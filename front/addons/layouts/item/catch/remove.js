admin.layouts.ItemOn('remove', (item) =>
{
	if(item.Get('render'))
	{
		admin.layouts.RenderRemove(item.Get('id'));
	}
});
