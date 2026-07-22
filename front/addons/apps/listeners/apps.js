onetype.EmitOn('admin.apps.open', () =>
{
    admin.apps.theme();
});

onetype.EmitOn('admin.apps.close', () =>
{
    admin.apps.theme();
});

$ot.platform.boot.then(() =>
{
    admin.apps.theme();
});
