onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-form-tags',
        addon: 'admin',
        name: 'Tags',
        description: 'Tag input with autocomplete, multi select, async options and keyboard navigation.',
        collection: 'Home',
        config: {
            value: {
                type: 'array',
                value: ['design', 'frontend'],
                each: {
                    type: 'string|number',
                    description: 'A single selected tag value.'
                },
                description: 'Selected tag values.'
            },
            name: {
                type: 'string',
                description: 'Hidden input name for forms.'
            },
            placeholder: {
                type: 'string',
                value: 'Add a tag…',
                description: 'Input placeholder while no tags are selected.'
            },
            options: {
                type: 'array|function',
                value: ['design', 'frontend', 'backend', 'platform', 'marketing'],
                each: {
                    type: 'object|string|number',
                    description: 'Strings and numbers auto-wrap to { label, value }, objects take label, value, icon, description and disabled.'
                },
                description: 'Suggestions list, or an async callback(value, type): (query, "search") while typing, ([values], "selected") to resolve labels.'
            },
            mode: {
                type: 'string',
                value: 'input',
                options: ['input', 'select'],
                description: 'Input mode types to add, select mode toggles chips.'
            },
            max: {
                type: 'number',
                value: 0,
                description: 'Maximum number of tags. Zero is unlimited.'
            },
            minLength: {
                type: 'number',
                value: 0,
                description: 'Minimum character length per tag.'
            },
            restrict: {
                type: 'boolean',
                value: false,
                description: 'Only allow values from options.'
            },
            color: {
                type: 'string',
                value: 'brand',
                options: ['brand', 'blue', 'red', 'orange', 'green'],
                description: 'Accent color of the tag chips.'
            },
            disabled: {
                type: 'boolean',
                value: false,
                description: 'Disabled state.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth of the control surface from 1 to 3. 0 renders transparent, without background or borders.'
            },
            _change: {
                type: 'function',
                description: 'Called with { value } when the tags change.'
            }
        },
        render: function()
        {
            admin.Fn('do.form.tags.field', this);

            if(this.isSelect)
            {
                return `
                    <div :class="classes()">
                        <input type="hidden" :name="name" :value="value.join(',')" />
                        <div ot-if="loading && !list().length" class="empty">Loading…</div>
                        <div ot-if="!loading || list().length" class="chips">
                            <span ot-if="!list().length && !loading" class="placeholder">{{ placeholder }}</span>
                            <button
                                ot-for="option in list()"
                                :ot-key="option.value"
                                type="button"
                                :class="chipClass(option)"
                                ot-click="() => toggle(option)"
                                :disabled="disabled || option.disabled"
                            >
                                <i ot-if="option.icon">{{ option.icon }}</i>
                                <span>{{ option.label }}</span>
                            </button>
                        </div>
                    </div>
                `;
            }

            return `
                <div :class="classes()" ot-click-outside="dismiss">
                    <input type="hidden" :name="name" :value="value.join(',')" />
                    <div class="field">
                        <span ot-for="tag in value" :ot-key="tag" :class="'tag' + (shake === tag ? ' shake' : '')">
                            <span class="text">{{ labelOf(tag) }}</span>
                            <button ot-if="!disabled" type="button" class="remove" ot-click="() => remove(tag)">
                                <i>close</i>
                            </button>
                        </span>
                        <input
                            ot-if="!reachedMax()"
                            class="input"
                            type="text"
                            :value="query"
                            :placeholder="value.length ? '' : placeholder"
                            :disabled="disabled"
                            autocomplete="off"
                            spellcheck="false"
                            ot-input="input"
                            ot-keydown="handleKey"
                            ot-focus="focus"
                        />
                    </div>
                    <div ot-if="open" class="dropdown">
                        <div ot-if="loading" class="empty">Loading…</div>
                        <div ot-if="!loading && filtered().length === 0" class="empty">No results</div>
                        <div ot-if="!loading" class="list">
                            <div ot-for="option in filtered()" :ot-key="option.value">
                                <button
                                    type="button"
                                    :class="'option' + (option.value === active ? ' active' : '')"
                                    ot-click="() => add(option)"
                                >
                                    <i ot-if="option.icon">{{ option.icon }}</i>
                                    <span class="label">{{ option.label }}</span>
                                    <span ot-if="option.description" class="description">{{ option.description }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });
});
