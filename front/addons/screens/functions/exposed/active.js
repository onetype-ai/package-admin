admin.screens.FnExpose('active', function()
{
	const id = config.get('admin.screens.active');

	return id ? this.ItemGet(id) || null : null;
});
