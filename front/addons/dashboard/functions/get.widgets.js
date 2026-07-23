admin.dashboard.Fn('get.widgets', function(section = null)
{
    return Object.values(this.widgets.Items())
        .filter((widget) => (widget.Get('section') || null) === section)
        .filter((widget) => this.Fn('is.visible', widget))
        .sort((left, right) => left.Get('order') - right.Get('order'));
});
