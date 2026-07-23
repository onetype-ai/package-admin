onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-form-color',
        addon: 'admin',
        name: 'Color',
        description: 'Color picker with native input, hex validation, presets and a copy action.',
        collection: 'Home',
        config: {
            value: {
                type: 'string',
                value: '#6366F1',
                description: 'Hex color value.'
            },
            name: {
                type: 'string',
                description: 'Input name attribute.'
            },
            placeholder: {
                type: 'string',
                value: '#000000',
                description: 'Placeholder text while the value is empty.'
            },
            presets: {
                type: 'array',
                value: ['#6366F1', '#38BDF8', '#34D399', '#FB923C', '#F43F5E'],
                each: {
                    type: 'string',
                    description: 'A single preset hex color.'
                },
                description: 'Preset color swatches below the field.'
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
            _input: {
                type: 'function',
                description: 'Called with { event, value } while picking.'
            },
            _change: {
                type: 'function',
                description: 'Called with { event, value } when the value is committed.'
            }
        },
        render: function()
        {
            admin.Fn('do.color.field', this);

            return `
                <div :class="classes()">
                    <div class="field">
                        <div class="swatch" :style="value ? 'background: ' + value : ''" ot-click="open">
                            <input
                                class="native"
                                type="color"
                                :value="isValid(value) ? value : '#000000'"
                                ot-input="pick"
                                ot-change="commit"
                                tabindex="-1"
                                :disabled="disabled"
                            />
                        </div>
                        <input
                            class="input"
                            :name="name"
                            type="text"
                            :value="value"
                            :placeholder="placeholder"
                            :disabled="disabled"
                            maxlength="7"
                            autocomplete="off"
                            spellcheck="false"
                            ot-change="input"
                        />
                        <button
                            ot-if="value && !disabled"
                            type="button"
                            :class="'action' + (copied ? ' copied' : '')"
                            ot-click.stop="copy"
                            :ot-tooltip="{ text: copied ? 'Copied!' : 'Copy', position: { x: 'center', y: 'top' } }"
                        >
                            <i ot-if="!copied">content_copy</i>
                            <i ot-if="copied">check</i>
                        </button>
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
                            :ot-key="preset"
                            type="button"
                            :class="'preset' + (value === preset ? ' active' : '')"
                            :style="'background: ' + preset"
                            :ot-tooltip="{ text: preset, position: { x: 'center', y: 'top' } }"
                            ot-click="({ event }) => pickPreset(event, preset)"
                        ></button>
                    </div>
                </div>
            `;
        }
    });
});
