admin.Fn('do.transfer.toggle', function(scope, item, isLeft)
{
    if(scope.disabled || item.disabled)
    {
        return;
    }

    if(isLeft)
    {
        if(scope.slotsLeft() <= 0 && !scope.value.includes(item.value))
        {
            return;
        }

        !scope.value.includes(item.value) && scope.value.push(item.value);
    }
    else
    {
        scope.value = scope.value.filter((id) => id !== item.value);
    }

    scope.emit();
    scope.Update();
});
