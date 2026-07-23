admin.Fn('make.builder.markup', function(scope)
{
    const sectionsHtml = admin.Fn('make.builder.sections', scope);

    return `
        <div :class="classes()">
            <div ot-if="hasSteps" class="steps">
                <e-admin-navigation-steps
                    :items="steps"
                    :active="activeStep"
                    :orientation="stepper.orientation"
                    :background="stepper.background"
                    :variant="stepper.variant"
                    :_change="selectStep"
                ></e-admin-navigation-steps>
            </div>

            <div class="main">
                <div class="sections">
                    ${sectionsHtml}
                </div>
                <div ot-if="hasSave" class="footer">
                    <e-admin-form-button
                        :text="save"
                        :_click="submit"
                        :disabled="disabled"
                        color="brand"
                    ></e-admin-form-button>
                </div>
            </div>
        </div>
    `;
});
