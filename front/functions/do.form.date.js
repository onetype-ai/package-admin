admin.Fn('do.form.date', function(scope)
{
    if(scope.value && typeof scope.value === 'string' && scope.value.length > 10)
    {
        scope.value = scope.value.slice(0, 10);
    }

    const today = new Date().toISOString().slice(0, 10);

    scope.todayIso = today;
    scope.isToday = scope.value === today;

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

        if(scope.isToday)
        {
            list.push('today');
        }

        return list.join(' ');
    };

    scope.inRange = (iso) =>
    {
        if(scope.min && iso < scope.min)
        {
            return false;
        }

        if(scope.max && iso > scope.max)
        {
            return false;
        }

        return true;
    };

    scope.handle = ({ event, value }) =>
    {
        scope.value = value;
        scope.isToday = value === scope.todayIso;

        if(scope._change)
        {
            scope._change({ event, value });
        }
    };

    scope.openPicker = (event) =>
    {
        if(scope.disabled)
        {
            return;
        }

        const target = event ? event.target : null;
        const field = target && target.closest ? target.closest('.field') : null;
        const input = field ? field.querySelector('.input') : null;

        if(!input)
        {
            return;
        }

        input.focus();

        if(typeof input.showPicker === 'function')
        {
            try
            {
                input.showPicker();
            }
            catch(error)
            {
                onetype.Error(500, 'Date picker failed to open: :reason:', { reason: error.message });
            }
        }
    };

    scope.clear = () =>
    {
        scope.value = '';
        scope.isToday = false;

        if(scope._change)
        {
            scope._change({
                event: null,
                value: ''
            });
        }
    };

    scope.pickPreset = (event, iso) =>
    {
        if(scope.disabled || !scope.inRange(iso))
        {
            return;
        }

        scope.value = iso;
        scope.isToday = iso === scope.todayIso;

        if(scope._change)
        {
            scope._change({ event, value: iso });
        }
    };
});
