admin.Fn('do.repeater.markup', function(scope)
{
    scope.iterationMarkup = (templateFieldTemplate) =>
    {
        return `
            <div ot-if="isIterable" class="iteration">
                <div class="iteration-chip">
                    <i class="iteration-icon">repeat</i>
                    <div class="iteration-text">
                        <span class="iteration-label">Bound to variable</span>
                        <span class="iteration-expression">{{ iterationLabel() }}</span>
                    </div>
                    <span class="iteration-count">{{ iterationCount() }} item{{ iterationCount() === 1 ? '' : 's' }}</span>
                    <button
                        ot-if="!disabled"
                        type="button"
                        class="iteration-action"
                        ot-click.stop="bindToVariable"
                        :ot-tooltip="tip('Change expression')"
                    ><i>edit</i></button>
                    <button
                        ot-if="!disabled"
                        type="button"
                        class="iteration-action danger"
                        ot-click.stop="unbindVariable"
                        :ot-tooltip="tip('Unbind')"
                    ><i>close</i></button>
                </div>

                <div class="iteration-template">
                    <div class="iteration-template-head">
                        <i>auto_awesome</i>
                        <span class="iteration-template-label">Template</span>
                        <span class="iteration-template-hint">applied to each item — use <code>item.field</code></span>
                    </div>
                    <div class="fields">
                        ${templateFieldTemplate}
                    </div>
                </div>

                <div ot-if="rows.length" class="iteration-preview">
                    <div class="iteration-preview-head">
                        <i>visibility</i>
                        <span>Preview ({{ rows.length }} item{{ rows.length === 1 ? '' : 's' }})</span>
                    </div>
                    <div ot-for="row, row_index in rows" class="iteration-row">
                        <span class="iteration-row-index">{{ row_index + 1 }}</span>
                        <span class="iteration-row-text">{{ JSON.stringify(row) }}</span>
                    </div>
                </div>

                <div ot-if="!rows.length" class="iteration-empty">
                    <i>info</i>
                    <span>Expression returned an empty array.</span>
                </div>
            </div>
        `;
    };

    scope.rowsMarkup = (fieldTemplate) =>
    {
        return `
            <div ot-if="!isIterable && rows.length" class="rows">
                <div ot-for="row, row_index in rows" class="row">
                    <div ot-if="canReorder()" class="reorder">
                        <button
                            type="button"
                            class="action"
                            :disabled="row_index === 0"
                            ot-click="() => up(row_index)"
                            :ot-tooltip="tip('Move up')"
                        ><i>keyboard_arrow_up</i></button>
                        <button
                            type="button"
                            class="action"
                            :disabled="row_index === rows.length - 1"
                            ot-click="() => down(row_index)"
                            :ot-tooltip="tip('Move down')"
                        ><i>keyboard_arrow_down</i></button>
                    </div>

                    <div ot-if="numbered" class="number">{{ row_index + 1 }}</div>

                    <div class="fields">
                        ${fieldTemplate}
                    </div>

                    <div ot-if="!disabled" class="actions">
                        <button
                            ot-for="action in actions"
                            type="button"
                            :class="'action' + (action.danger ? ' danger' : '')"
                            ot-click="() => action._click({ row, index: row_index })"
                            :ot-tooltip="tip(action.tooltip)"
                        ><i>{{ action.icon }}</i></button>
                        <button
                            ot-if="duplicable && canAdd()"
                            type="button"
                            class="action"
                            ot-click="() => duplicate(row_index)"
                            :ot-tooltip="tip('Duplicate')"
                        ><i>content_copy</i></button>
                        <button
                            ot-if="canRemove()"
                            type="button"
                            class="action danger"
                            ot-click="() => remove(row_index)"
                            :ot-tooltip="tip('Remove')"
                        ><i>close</i></button>
                    </div>
                </div>
            </div>
        `;
    };
});
