$ot.ui.status.Fn('item.render', function(item)
{
	return $ot.ui.status.Render(item.Get('id'), { ...item.Get('data') }).Element;
});
