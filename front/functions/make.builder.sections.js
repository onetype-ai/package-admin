admin.Fn('make.builder.sections', function(scope)
{
    if(!scope.hasSteps)
    {
        return scope.sections
            .map((section, sectionIndex) => admin.Fn('make.builder.section', scope, section, sectionIndex, 'sections'))
            .join('');
    }

    return scope.steps.map((step, stepIndex) =>
    {
        const path = `steps[${stepIndex}].sections`;
        const sections = (step.sections || [])
            .map((section, sectionIndex) => admin.Fn('make.builder.section', scope, section, sectionIndex, path))
            .join('');

        return `
            <div ot-if="activeStep === '${step.id}'" class="step-panel">
                ${sections}
            </div>
        `;
    }).join('');
});
