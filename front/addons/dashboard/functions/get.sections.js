admin.dashboard.Fn('get.sections', function()
{
    return Object.values(this.sections.Items())
        .filter((section) => this.Fn('is.visible', section))
        .sort((left, right) => left.Get('order') - right.Get('order'));
});
