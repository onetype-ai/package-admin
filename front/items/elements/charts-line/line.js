onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-charts-line',
        addon: 'admin',
        name: 'Line',
        description: 'Line chart with one or more series, gradient area fill, legend and axis range labels.',
        collection: 'Home',
        config: {
            labels: {
                type: 'array',
                value: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                each: {
                    type: 'string',
                    description: 'A single X axis label.'
                },
                description: 'X axis labels, one per point. Only the first and last are shown.'
            },
            series: {
                type: 'array',
                value: [{
                        name: 'Views',
                        color: 'blue',
                        points: [32, 41, 38, 52, 61, 48, 56]
                    }, {
                        name: 'Sessions',
                        color: 'green',
                        points: [21, 28, 25, 36, 42, 33, 39]
                    }
                ],
                each: {
                    type: 'object',
                    config: {
                        name: {
                            type: 'string',
                            description: 'Series name shown in the legend.'
                        },
                        color: {
                            type: 'string',
                            value: 'brand',
                            options: ['brand', 'blue', 'red', 'orange', 'green'],
                            description: 'Series color name.'
                        },
                        points: {
                            type: 'array',
                            value: [],
                            each: {
                                type: 'number',
                                description: 'A single Y value.'
                            },
                            description: 'Y values, one per label.'
                        }
                    }
                },
                description: 'One or more series sharing the same labels.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth from 1 to 3 on a bordered surface. 0 renders transparent, without background or borders.'
            },
            glow: {
                type: 'string',
                options: ['brand', 'blue', 'red', 'orange', 'green'],
                description: 'Colored glow on top of the surface. Empty renders no glow.'
            }
        },
        render: function()
        {
            const width = 300;
            const height = 100;

            const toPath = (points, min, range) =>
            {
                const step = points.length > 1 ? width / (points.length - 1) : 0;
                const segments = points.map((value, index) =>
                {
                    const pointX = index * step;
                    const pointY = height - ((value - min) / range) * height;

                    return (index ? 'L' : 'M') + pointX.toFixed(1) + ' ' + pointY.toFixed(1);
                });

                return segments.join(' ');
            };

            this.classes = () =>
            {
                const hasBackground = this.background || this.background === 0;

                return hasBackground ? 'box bg-' + this.background : 'box';
            };

            this.Compute(() =>
            {
                const series = this.series;
                const all = series.flatMap((line) => line.points);

                this.empty = !all.length;

                const max = Math.max(...all, 1);
                const min = Math.min(...all, 0);
                const range = max - min || 1;

                this.lines = series.map((line, index) =>
                {
                    const path = toPath(line.points, min, range);
                    const isFirst = index === 0;
                    const area = isFirst && line.points.length ? path + ' L' + width + ' ' + height + ' L0 ' + height + ' Z' : '';

                    return {
                        name: line.name,
                        color: line.color,
                        path,
                        area,
                        primary: isFirst
                    };
                });

                this.multi = series.length > 1;
            });

            this.tint = (line) => 'color: var(--ot-' + line.color + ')';
            this.dot = (line) => 'background: var(--ot-' + line.color + ')';

            return `
                <div :class="classes()">
                    <div ot-if="empty" class="empty">No data</div>
                    <div ot-if="!empty" class="chart">
                        <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="charts-line-fade" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stop-color="currentColor" stop-opacity="0.22"></stop>
                                    <stop offset="100%" stop-color="currentColor" stop-opacity="0"></stop>
                                </linearGradient>
                            </defs>
                            <g ot-for="line in lines" :ot-key="line.name" :style="tint(line)">
                                <path ot-if="line.primary" :d="line.area" class="area"></path>
                                <path :d="line.path" class="line"></path>
                            </g>
                        </svg>
                    </div>
                    <div ot-if="!empty && (multi || labels.length)" class="foot">
                        <div ot-if="multi" class="legend">
                            <span ot-for="line in lines" :ot-key="'g' + line.name" class="key">
                                <span class="dot" :style="dot(line)"></span>
                                <span>{{ line.name }}</span>
                            </span>
                        </div>
                        <div ot-if="!multi && labels.length" class="range">
                            <span>{{ labels[0] }}</span>
                            <span>{{ labels[labels.length - 1] }}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    });
});
