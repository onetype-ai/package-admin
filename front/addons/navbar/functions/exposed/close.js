admin.navbar.FnExpose('close', function()
{
	const open = this.StoreGet('open');

	if(!open)
	{
		return false;
	}

	this.ItemGet(open)?.Fn('close');

	return true;
});
