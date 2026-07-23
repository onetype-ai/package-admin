admin.Fn('do.repeater.markupfooter', function(scope)
{
    scope.footerTopMarkup = () =>
    {
        return `
            <div ot-if="!isIterable && (addPosition === 'top' || addPosition === 'both')" class="footer top">
                <span ot-if="max" class="counter">{{ rows.length }} / {{ max }}</span>
                <span ot-if="!max" class="counter">{{ rows.length }} items</span>
                <e-admin-form-button
                    ot-if="canAdd()"
                    :text="add"
                    icon="add"
                    :_click="prepend"
                    background="bg-1"
                    size="s"
                ></e-admin-form-button>
            </div>
        `;
    };

    scope.emptyMarkup = () =>
    {
        return `
            <div ot-if="!isIterable && !rows.length" class="empty">
                <div class="empty-icon"><i>{{ emptyIcon }}</i></div>
                <span class="empty-text">{{ empty }}</span>
                <div class="empty-actions">
                    <e-admin-form-button
                        ot-if="!disabled && canAdd()"
                        :text="add"
                        icon="add"
                        :_click="append"
                        color="brand"
                    ></e-admin-form-button>
                    <e-admin-form-button
                        ot-if="!disabled && iterable && hasVariables()"
                        text="Bind to variable"
                        icon="data_object"
                        background="bg-2"
                        :_click="bindToVariable"
                    ></e-admin-form-button>
                </div>
            </div>
        `;
    };

    scope.footerBottomMarkup = () =>
    {
        return `
            <div ot-if="!isIterable && rows.length && (addPosition === 'bottom' || addPosition === 'both')" class="footer bottom">
                <span ot-if="max" class="counter">{{ rows.length }} / {{ max }}</span>
                <span ot-if="!max" class="counter">{{ rows.length }} items</span>
                <div class="footer-actions">
                    <e-admin-form-button
                        ot-if="canAdd()"
                        :text="add"
                        icon="add"
                        :_click="append"
                        background="bg-1"
                        size="s"
                    ></e-admin-form-button>
                    <e-admin-form-button
                        ot-if="!disabled && iterable && hasVariables()"
                        text="Bind"
                        icon="data_object"
                        background="bg-1"
                        size="s"
                        :_click="bindToVariable"
                    ></e-admin-form-button>
                    <e-admin-form-button
                        ot-if="hasSave"
                        :text="save"
                        :_click="submit"
                        color="brand"
                        size="s"
                    ></e-admin-form-button>
                </div>
            </div>
        `;
    };
});
