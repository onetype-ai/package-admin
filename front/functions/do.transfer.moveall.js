admin.Fn('do.transfer.moveall', function(scope, isLeft)
{
    if(scope.disabled)
    {
        return;
    }

    if(isLeft)
    {
        const eligible = scope.list().filter((item) => !item.disabled && !scope.isSelected(item.value));
        const ids = eligible.slice(0, scope.slotsLeft()).map((item) => item.value);

        ids.forEach((id) => !scope.value.includes(id) && scope.value.push(id));
    }
    else
    {
        scope.value = scope.list().filter((item) => item.disabled && scope.isSelected(item.value)).map((item) => item.value);
    }

    scope.emit();
    scope.Update();
});
