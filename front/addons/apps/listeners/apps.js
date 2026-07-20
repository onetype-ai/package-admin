onetype.EmitOn('ui.apps.open', () =>
{
	$ot.ui.apps.Fn('theme');
});

onetype.EmitOn('ui.apps.close', () =>
{
	$ot.ui.apps.Fn('theme');
});

$ot.boot.then(() =>
{
	$ot.ui.apps.Fn('theme');
});
