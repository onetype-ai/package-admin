onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-charts-bar',
        addon: 'admin',
        name: 'Bar',
        description: 'Vertical bar chart with per-bar colors, values above the bars and labels below.',
        collection: 'Home',
        config: {
            bars: {
                type: 'array',
                value: [{
                    label: 'Starter',
                    value: 412,
                    color: 'blue'
                }, {
                    label: 'Pro',
                    value: 268,
                    color: 'green'
                }, {
                    label: 'Business',
                    value: 94,
                    color: 'orange'
                }],
                each: {
                    type: 'object',
                    config: {
                        label: {
                            type: 'string',
                            description: 'Category label under the bar.'
                        },
                        value: {
                            type: 'number',
                            value: 0,
                            description: 'Bar value, scaled against the largest bar.'
                        },
                        color: {
                            type: 'string',
                            value: 'brand',
                            options: ['brand', 'blue', 'red', 'orange', 'green'],
                            description: 'Bar color name.'
                        }
                    }
                },
                description: 'Bars to draw, left to right.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth 1-3 on a bordered surface. 0 is transparent, no background or borders.'
            },
            glow: {
                type: 'string',
                options: ['brand', 'blue', 'red', 'orange', 'green'],
                description: 'Colored glow on top of the surface. Empty renders no glow.'
            }
        },
        render: function()
        {
            this.classes = () =>
            {
                const list = ['box'];

                if(this.background || this.background === 0)
                {
                    list.push('bg-' + this.background);
                }

                return list.join(' ');
            };

            this.Compute(() =>
            {
                const bars = this.bars;
                const max = Math.max(...bars.map((bar) => bar.value), 1);

                this.empty = !bars.length;

                this.columns = bars.map((bar) => ({
                    label: bar.label,
                    value: bar.value,
                    color: bar.color,
                    height: Math.max((bar.value / max) * 100, 2)
                }));
            });

            this.style = (bar) =>
                'height: ' + bar.height + '%; background: linear-gradient(180deg, var(--ot-' + bar.color
                    + ') 0%, var(--ot-' + bar.color + '-hover) 100%)';

            return `
                <div :class="classes()">
                    <div ot-if="empty" class="empty">No data</div>
                    <div ot-if="!empty" class="bars">
                        <div ot-for="bar in columns" :ot-key="bar.label" class="col">
                            <div class="track">
                                <span class="value">{{ bar.value }}</span>
                                <div class="bar" :style="style(bar)"></div>
                            </div>
                            <span class="label">{{ bar.label }}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    });
});
