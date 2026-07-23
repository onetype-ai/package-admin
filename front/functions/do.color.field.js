admin.Fn('do.color.field', function(scope)
{
    scope.copied = false;

    scope.Compute(() =>
    {
        scope.hasPresets = scope.presets.length > 0;
    });

    scope.classes = () =>
    {
        const list = ['box', 'bg-' + scope.background];

        if(scope.disabled)
        {
            list.push('disabled');
        }

        return list.join(' ');
    };

    scope.isValid = (value) => admin.Fn('is.color.valid', value);

    const sync = () =>
    {
        const input = scope.Element ? scope.Element.querySelector('input.input') : null;
        const native = scope.Element ? scope.Element.querySelector('input.native') : null;

        if(input)
        {
            input.value = scope.value;
        }

        if(native && scope.isValid(scope.value))
        {
            native.value = scope.value;
        }
    };

    const apply = (event, value) =>
    {
        scope.value = value;
        sync();

        if(scope._change)
        {
            scope._change({ event, value });
        }
    };

    scope.pick = ({ event, value }) =>
    {
        scope.value = value;
        sync();

        if(scope._input)
        {
            scope._input({ event, value });
        }
    };

    scope.commit = ({ event, value }) => apply(event, value);

    scope.input = ({ event, value }) => apply(event, admin.Fn('do.color.normalize', value));

    scope.open = ({ event }) =>
    {
        if(scope.disabled)
        {
            return;
        }

        const box = event.target.closest('.box');
        const native = box ? box.querySelector('.native') : null;

        if(native)
        {
            native.click();
        }
    };

    scope.clear = () => apply(null, '');

    scope.copy = () =>
    {
        if(!scope.value || !navigator.clipboard)
        {
            return;
        }

        navigator.clipboard.writeText(scope.value);
        scope.copied = true;

        setTimeout(() =>
        {
            scope.copied = false;
        }, 1500);
    };

    scope.pickPreset = (event, hex) =>
    {
        if(scope.disabled)
        {
            return;
        }

        apply(event, hex);
    };
});
