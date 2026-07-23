admin.apps.FnExpose('active', function()
{
    return this.ItemGet(platform.config.get('admin.apps.active'));
});
