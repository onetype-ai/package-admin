$ot.ui.canvas.Fn('item.render', function(item)
{
	return $ot.ui.canvas.Render(item.Get('id'), { ...item.Get('data') }).Element;
});
