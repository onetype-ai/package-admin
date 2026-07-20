admin.layouts.FnExpose('close', function(id)
{
	const item = this.ItemGet(id);

	if(!item)
	{
		return false;
	}

	if(!item.Get('isActive'))
	{
		return false;
	}

	item.Set('isActive', false);

	this.Fn('persist');

	onetype.Emit('admin.layouts.close', { ids: [id] });

	return true;
});
