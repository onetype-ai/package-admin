$ot.ui.layouts.Fn('item.render', function(item)
{
	return $ot.ui.layouts.Render(item.Get('id'), { ...$ot.ui.layouts.Fn('data'), ...($ot.ui.layouts.StoreGet('values.' + item.Get('id')) || {}) }).Element;
});
