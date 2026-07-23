admin.Fn('make.input.markup', function()
{
    return `
        <div :class="classes()" ot-click-outside="close">
            <div class="field">
                <i ot-if="icon" class="icon">{{ icon }}</i>
                <span ot-if="prefix" class="affix">{{ prefix }}</span>
                <input
                    class="input"
                    :value="value"
                    :type="inputType()"
                    :placeholder="placeholder"
                    :name="name"
                    :maxlength="maxlength"
                    :min="min"
                    :max="max"
                    :step="step"
                    :disabled="disabled"
                    :readonly="readonly"
                    autocomplete="off"
                    ot-input="input"
                    ot-change="change"
                    ot-focus="focus"
                    ot-blur="blur"
                    ot-keydown="keydown"
                />
                <span ot-if="suffix" class="affix">{{ suffix }}</span>
                <button
                    ot-if="clearable && text() && !disabled && !readonly"
                    type="button"
                    class="action"
                    ot-click.stop="clear"
                    :ot-tooltip="{ text: 'Clear', position: { x: 'center', y: 'top' } }"
                >
                    <i>close</i>
                </button>
                <button
                    ot-if="reveal && isPassword && !disabled"
                    type="button"
                    class="action"
                    ot-click.stop="togglePassword"
                    :ot-tooltip="{ text: revealed ? 'Hide' : 'Show', position: { x: 'center', y: 'top' } }"
                >
                    <i ot-if="!revealed">visibility</i>
                    <i ot-if="revealed">visibility_off</i>
                </button>
                <i ot-if="iconRight" class="icon">{{ iconRight }}</i>
            </div>
            <div ot-if="open && hasOptions" class="dropdown">
                <div ot-for="option in filtered()" :ot-key="option">
                    <button
                        type="button"
                        :class="'option' + (option === active ? ' active' : '')"
                        ot-click="() => select(option)"
                    >{{ option }}</button>
                </div>
            </div>
        </div>
    `;
});
