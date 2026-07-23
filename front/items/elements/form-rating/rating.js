onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-form-rating',
        addon: 'admin',
        name: 'Rating',
        description: 'Star rating with half stars, custom icon, label and review count.',
        collection: 'Home',
        config: {
            label: {
                type: 'string',
                value: 'Rate your experience',
                description: 'Label above the stars.'
            },
            description: {
                type: 'string',
                description: 'Description below the label.'
            },
            value: {
                type: 'number',
                value: 3.5,
                description: 'Current rating value.'
            },
            max: {
                type: 'number',
                value: 5,
                description: 'Maximum number of stars.'
            },
            precision: {
                type: 'number',
                value: 0.5,
                options: [1, 0.5],
                description: 'Rating step. 1 for full, 0.5 for half.'
            },
            icon: {
                type: 'string',
                value: 'star',
                description: 'Icon name for each star.'
            },
            count: {
                type: 'number',
                value: 128,
                description: 'Review count shown after the stars.'
            },
            showValue: {
                type: 'boolean',
                value: true,
                description: 'Show the numeric value after the stars.'
            },
            color: {
                type: 'string',
                value: 'orange',
                options: ['brand', 'blue', 'red', 'orange', 'green'],
                description: 'Fill color of the active stars.'
            },
            readonly: {
                type: 'boolean',
                value: false,
                description: 'Display only, no interaction.'
            },
            disabled: {
                type: 'boolean',
                value: false,
                description: 'Disabled state.'
            },
            _change: {
                type: 'function',
                description: 'Change handler. Receives { event, value }.'
            }
        },
        render: function()
        {
            this.hover = null;

            this.Compute(() =>
            {
                this.hasInfo = !!this.label || !!this.description;
                this.hasMeta = this.showValue || (this.count !== null && this.count !== undefined);
                this.locked = this.readonly || this.disabled;
            });

            this.classes = () =>
                ['box', this.color, this.readonly && 'readonly', this.disabled && 'disabled'].filter(Boolean).join(' ');

            this.fillFor = (index) =>
            {
                const diff = (this.hover !== null ? this.hover : this.value) - index;

                if(diff >= 1 || (diff > 0 && this.precision === 1))
                {
                    return 100;
                }

                return diff >= 0.5 && this.precision === 0.5 ? 50 : 0;
            };

            this.computed = () => Array.from({ length: this.max }, (blank, index) =>
            {
                const fill = this.fillFor(index);

                return { index, fill, active: fill > 0 };
            });

            this.formatValue = (value) =>
                (value === null || value === undefined ? '' : Number(value).toFixed(this.precision === 0.5 ? 1 : 0));
            this.stepFor = (index, half) => (this.precision === 0.5 && half ? index + 0.5 : index + 1);

            this.select = (event, index, half) =>
            {
                if(this.locked)
                {
                    return;
                }

                const next = this.stepFor(index, half);

                this.value = this.value === next ? 0 : next;
                this._change && this._change({ event, value: this.value });
            };

            this.enter = (index, half) => !this.locked && (this.hover = this.stepFor(index, half));
            this.leave = () => !this.locked && (this.hover = null);

            return `
                <div :class="classes()">
                    <div ot-if="hasInfo" class="info">
                        <span ot-if="label" class="label">{{ label }}</span>
                        <span ot-if="description" class="text">{{ description }}</span>
                    </div>
                    <div class="row">
                        <div class="stars" ot-mouse-leave="leave">
                            <button
                                ot-for="star in computed()"
                                :ot-key="star.index"
                                type="button"
                                :class="'star fill-' + star.fill + (star.active ? ' active' : '')"
                                :disabled="locked"
                                ot-click="({ event }) => select(event, star.index, false)"
                                ot-mouse-enter="() => enter(star.index, false)"
                            >
                                <i class="base">{{ icon }}</i>
                                <i class="fill">{{ icon }}</i>
                                <span
                                    ot-if="precision === 0.5"
                                    class="half"
                                    ot-click.stop="({ event }) => select(event, star.index, true)"
                                    ot-mouse-enter="() => enter(star.index, true)"
                                ></span>
                            </button>
                        </div>
                        <div ot-if="hasMeta" class="meta">
                            <span ot-if="showValue" class="value">{{ formatValue(value) }}</span>
                            <span ot-if="count !== null && count !== undefined" class="count">({{ count }})</span>
                        </div>
                    </div>
                </div>
            `;
        }
    });
});
