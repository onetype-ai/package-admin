admin.Fn('get.builder.conditions', function(steps, sections, hasSteps)
{
    const scan = (list) => list.some((section) =>
    {
        if(section.condition)
        {
            return true;
        }

        return (section.fields || []).some((field) => field.condition);
    });

    if(hasSteps)
    {
        return steps.some((step) => scan(step.sections || []));
    }

    return scan(sections);
});
