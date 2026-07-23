onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-form-date',
        addon: 'admin',
        name: 'Date',
        description: 'Date picker with native input, min and max range, quick presets and a clear action.',
        collection: 'Home',
        config: {
            value: {
                type: 'string',
                description: 'Selected date in ISO format (YYYY-MM-DD).'
            },
            name: {
                type: 'string',
                description: 'Input name attribute.'
            },
            min: {
                type: 'string',
                description: 'Minimum selectable date (YYYY-MM-DD).'
            },
            max: {
                type: 'string',
                description: 'Maximum selectable date (YYYY-MM-DD).'
            },
            presets: {
                type: 'array',
                value: [],
                each: {
                    type: 'object',
                    config: {
                        label: {
                            type: 'string',
                            description: 'Preset button text.'
                        },
                        value: {
                            type: 'string',
                            description: 'Date the preset selects (YYYY-MM-DD).'
                        }
                    }
                },
                description: 'Quick pick preset buttons below the field.'
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
                description: 'Called with { event, value } when the date changes.'
            }
        },
        render: function()
        {
            admin.Fn('do.form.date', this);

            return `
                <div :class="classes()">
                    <div class="field" ot-click="({ event }) => openPicker(event)">
                        <i class="icon">calendar_today</i>
                        <input
                            class="input"
                            type="date"
                            :value="value"
                            :name="name"
                            :min="min"
                            :max="max"
                            :disabled="disabled"
                            ot-change="handle"
                        />
                        <button
                            ot-if="value && !disabled"
                            type="button"
                            class="action"
                            ot-click.stop="clear"
                            :ot-tooltip="{ text: 'Clear', position: { x: 'center', y: 'top' } }"
                        >
                            <i>close</i>
                        </button>
                    </div>
                    <div ot-if="hasPresets" class="presets">
                        <button
                            ot-for="preset in presets"
                            :ot-key="preset.value"
                            type="button"
                            :class="'preset' + (value === preset.value ? ' active' : '') + (!inRange(preset.value) ? ' disabled' : '')"
                            :disabled="!inRange(preset.value) || disabled"
                            ot-click="({ event }) => pickPreset(event, preset.value)"
                        >
                            {{ preset.label }}
                        </button>
                    </div>
                </div>
            `;
        }
    });
});
