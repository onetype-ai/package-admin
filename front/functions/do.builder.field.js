admin.Fn('do.builder.field', function(scope)
{
    scope.activeStep = '';
    scope.sectionVariant = scope.section.variant || ['border'];

    scope.Compute(() =>
    {
        scope.hasSteps = scope.steps.length > 0;
        scope.hasSave = !!scope.save;

        if(!scope.activeStep && scope.hasSteps)
        {
            scope.activeStep = scope.steps[0].id;
        }

        scope.hasConditions = admin.Fn('get.builder.conditions', scope.steps, scope.sections, scope.hasSteps);
    });

    scope.classes = () =>
    {
        const list = ['box', 'size-' + scope.size];

        if(scope.background)
        {
            list.push(scope.background);
        }

        scope.variant.forEach((entry) => list.push(entry));

        if(scope.hasSteps)
        {
            list.push('has-steps');
            list.push('steps-' + scope.stepper.orientation);
        }

        return list.join(' ');
    };

    scope.visible = (condition) => condition ? condition(scope.values) : true;

    scope.val = (key) => scope.values ? scope.values[key] : null;

    scope.selectStep = ({ value }) =>
    {
        scope.activeStep = value;
    };

    scope.input = (key, data) =>
    {
        scope.values[key] = data.value;

        if(scope.hasConditions)
        {
            scope.Update();
        }

        if(scope._input)
        {
            scope._input({ key, value: data.value });
        }
    };

    scope.change = (key, data) =>
    {
        scope.values[key] = data.value;

        if(scope.hasConditions)
        {
            scope.Update();
        }

        if(scope._change)
        {
            scope._change({ key, value: data.value });
        }
    };

    scope.submit = () =>
    {
        if(scope._save)
        {
            scope._save({ value: scope.values });
        }
    };
});
