admin.Fn('do.form.slider', function(scope)
{
    scope.computeMarks = () =>
    {
        if(!scope.marks || !scope.step || scope.step <= 0)
        {
            return [];
        }

        const range = scope.max - scope.min;
        const count = Math.floor(range / scope.step);

        if(count > 20)
        {
            return [];
        }

        const result = [];

        for(let index = 0; index <= count; index++)
        {
            const value = scope.min + index * scope.step;
            const percent = (index / count) * 100;

            result.push({ value, percent });
        }

        return result;
    };

    scope.Compute(() =>
    {
        scope.hasInfo = !!scope.label || !!scope.description;
        scope.marksList = scope.computeMarks();
        scope.hasMarks = scope.marksList.length > 0;
    });

    scope.classes = () =>
    {
        const list = ['box', scope.color];

        if(scope.disabled)
        {
            list.push('disabled');
        }

        return list.join(' ');
    };

    scope.format = (value) =>
    {
        return (scope.prefix ? scope.prefix : '') + value + (scope.suffix ? scope.suffix : '');
    };

    scope.percentage = () =>
    {
        if(scope.max === scope.min)
        {
            return 0;
        }

        return ((scope.value - scope.min) / (scope.max - scope.min)) * 100;
    };

    scope.OnReady(() =>
    {
        const input = scope.Element?.querySelector('input[type="range"]');

        if(input)
        {
            input.value = scope.value;
        }
    });

    scope.handle = ({ event }) =>
    {
        scope.value = parseFloat(event.target.value);

        if(scope._input)
        {
            scope._input({ event, value: scope.value });
        }
    };

    scope.commit = ({ event }) =>
    {
        scope.value = parseFloat(event.target.value);

        if(scope._change)
        {
            scope._change({ event, value: scope.value });
        }
    };
});
