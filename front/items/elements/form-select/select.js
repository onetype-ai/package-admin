onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-form-select',
        addon: 'admin',
        name: 'Select',
        description: 'Custom dropdown select with search, keyboard navigation, async options and a clear action.',
        collection: 'Home',
        config: {
            value: { type: 'string|number',
                description: 'Selected value.' },
            name: { type: 'string',
                description: 'Hidden input name for forms.' },
            placeholder: { type: 'string', value: 'Choose a team...',
                description: 'Placeholder text while nothing is selected.' },
            icon: { type: 'string',
                description: 'Icon on the left side of the trigger.' },
            options: { type: 'array|function',
                value: ['Design', 'Engineering', 'Marketing', 'Operations'],
                each: { type: 'object|string|number',
                    description: 'A single option. Strings/numbers auto-wrap to { label, value }, objects take label, value, icon, description, disabled.' },
                description: 'Options list, or async callback(value, type): (query, search) while typing, (values, selected) to resolve labels.' },
            searchable: { type: 'boolean', value: true,
                description: 'Show a search input inside the dropdown.' },
            clearable: { type: 'boolean', value: false,
                description: 'Show a clear action while a value is selected.' },
            disabled: { type: 'boolean', value: false,
                description: 'Disabled state.' },
            background: { type: 'number', value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth from 1 to 3. 0 renders transparent, without background or borders.' },
            _change: { type: 'function',
                description: 'Called with { value } when the selection changes.' }
        },
        render: function()
        {
            admin.Fn('do.select.field', this);

            return `
                <div :class="classes()" ot-click-outside="dismiss">
                    <input type="hidden" :name="name" :value="value" />
                    <div class="trigger" ot-click="toggle">
                        <i ot-if="icon" class="icon">{{ icon }}</i>
                        <i ot-if="!icon && current() && current().icon" class="icon">{{ current().icon }}</i>
                        <span ot-if="current()" class="selected">{{ current().label }}</span>
                        <span ot-if="!current() && loading" class="placeholder">Loading…</span>
                        <span ot-if="!current() && !loading" class="placeholder">{{ placeholder }}</span>
                        <button
                            ot-if="clearable && value && !disabled"
                            type="button"
                            class="action"
                            ot-click.stop="clear"
                            :ot-tooltip="{ text: 'Clear', position: { x: 'center', y: 'top' } }"
                        >
                            <i>close</i>
                        </button>
                        <i class="arrow">expand_more</i>
                    </div>
                    <div ot-if="open" class="dropdown">
                        <div ot-if="searchable" class="search">
                            <i>search</i>
                            <input type="text" :value="query" placeholder="Search…" autocomplete="off" ot-input="typing" />
                        </div>
                        <div class="list">
                            <div ot-for="option in filtered()" :ot-key="option.value">
                                <button
                                    type="button"
                                    :class="optionClasses(option)"
                                    ot-click="() => select(option)"
                                >
                                    <i ot-if="option.icon" class="icon">{{ option.icon }}</i>
                                    <span class="text">
                                        <span class="label">{{ option.label }}</span>
                                        <span ot-if="option.description" class="description">{{ option.description }}</span>
                                    </span>
                                    <i ot-if="option.value === value" class="check">check</i>
                                </button>
                            </div>
                            <div ot-if="filtered().length === 0 && !loading" class="empty">No results</div>
                            <div ot-if="loading" class="empty">Loading…</div>
                        </div>
                    </div>
                </div>
            `;
        }
    });
});
