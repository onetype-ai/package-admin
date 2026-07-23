onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-cards-stat',
        addon: 'admin',
        name: 'Stat Card',
        description: 'KPI card with label, value, delta trend badge and an inline area sparkline.',
        collection: 'Home',
        config: {
            label: {
                type: 'string',
                value: 'Visitors',
                description: 'Uppercase label above the value.'
            },
            value: {
                type: 'string|number',
                value: '48,215',
                description: 'Main display value.'
            },
            icon: {
                type: 'string',
                value: 'group',
                description: 'Icon in the small tile on the right. Empty hides the tile.'
            },
            color: {
                type: 'string',
                value: 'brand',
                options: ['brand', 'blue', 'red', 'orange', 'green'],
                description: 'Accent color of the tile and the sparkline.'
            },
            delta: {
                type: 'object',
                value: {
                    value: '+12%',
                    direction: 'up'
                },
                config: {
                    value: {
                        type: 'string',
                        description: 'Delta display value.'
                    },
                    direction: {
                        type: 'string',
                        value: 'neutral',
                        options: ['up', 'down', 'neutral'],
                        description: 'Trend direction, colors the badge.'
                    }
                },
                description: 'Trend badge next to the value. Empty object hides it.'
            },
            description: {
                type: 'string',
                value: 'vs last month',
                description: 'Muted helper text under the value.'
            },
            sparkline: {
                type: 'array',
                value: [28, 34, 31, 42, 39, 48, 44, 56],
                each: {
                    type: 'number',
                    description: 'A single data point.'
                },
                description: 'Area sparkline points at the bottom. Empty hides it.'
            },
            href: {
                type: 'string',
                description: 'Link target. When set the card renders as a link.'
            },
            isActive: {
                type: 'boolean',
                value: false,
                description: 'Highlights the card with an accent ring.'
            },
            isDisabled: {
                type: 'boolean',
                value: false,
                description: 'Dims the card and ignores clicks.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth of the card surface from 1 to 3. 0 renders transparent, without background or borders.'
            },
            _click: {
                type: 'function',
                description: 'Called with { event } on click. Overrides the href navigation.'
            }
        },
        render: function()
        {
            const width = 120, height = 32;
            const icons = {
                up: 'trending_up',
                down: 'trending_down',
                neutral: 'trending_flat'
            };

            this.classes = () =>
            {
                const active = this.isActive ? ' active' : '', disabled = this.isDisabled ? ' disabled' : '';
                const clickable = (this._click || this.href) ? ' clickable' : '';

                return 'box ' + this.color + ' bg-' + this.background + active + disabled + clickable;
            };

            this.Compute(() =>
            {
                const points = this.sparkline;
                const min = Math.min(...points), range = Math.max(...points) - min || 1;
                const step = points.length > 1 ? width / (points.length - 1) : 0;
                const coordinate = (value, index) => (index * step).toFixed(1) + ' ' + (height - ((value - min) / range) * height).toFixed(1);

                this.trend = this.delta && this.delta.value ? this.delta : null;
                this.path = points.map((value, index) => (index ? 'L' : 'M') + coordinate(value, index)).join(' ');
                this.area = points.length ? this.path + ' L' + width + ' ' + height + ' L0 ' + height + ' Z' : '';
            });

            this.arrow = (trend) =>
            {
                return icons[trend.direction];
            };

            this.open = (event) =>
            {
                if(!this.isDisabled && this._click)
                {
                    this._click({ event });
                }
                else if(!this.isDisabled && this.href)
                {
                    window.location.href = this.href;
                }
            };

            return `
                <div :class="classes()" ot-click="({ event }) => open(event)">
                    <div ot-if="label || icon" class="head">
                        <span ot-if="label" class="label">{{ label }}</span>
                        <div ot-if="icon" class="tile"><i>{{ icon }}</i></div>
                    </div>
                    <div class="row">
                        <span class="value">{{ value }}</span>
                        <span ot-if="trend" :class="'delta ' + trend.direction"><i>{{ arrow(trend) }}</i><span>{{ trend.value }}</span></span>
                    </div>
                    <p ot-if="description" class="description">{{ description }}</p>
                    <div ot-if="path" class="spark">
                        <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
                            <defs><linearGradient id="cards-stat-fade" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color="currentColor" stop-opacity="0.25"></stop>
                                <stop offset="100%" stop-color="currentColor" stop-opacity="0"></stop>
                            </linearGradient></defs>
                            <path :d="area" class="area"></path><path :d="path" class="line"></path>
                        </svg>
                    </div>
                </div>
            `;
        }
    });
});
