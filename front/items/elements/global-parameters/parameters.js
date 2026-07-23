onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-global-parameters',
        addon: 'admin',
        name: 'Parameters',
        description: 'Schema reference list: names, type badges, required marks, defaults, enum options, descriptions and endlessly nested children.',
        collection: 'Home',
        config: {
            items: {
                type: 'array',
                value: [
                    { name: 'title', type: 'string', required: true,
                        description: 'Notice title shown in the first row.' },
                    { name: 'color', type: 'string', value: 'blue',
                        options: ['brand', 'blue', 'red', 'orange', 'green'],
                        description: 'Accent color of the notice.' },
                    { name: 'closable', type: 'boolean', value: false,
                        description: 'Shows the dismiss button and hides the notice on click.' },
                    { name: 'delta', type: 'object',
                        description: 'Trend badge next to the value.',
                        items: [
                            { name: 'value', type: 'string',
                                description: 'Delta display value.' },
                            { name: 'direction', type: 'string', value: 'neutral',
                                options: ['up', 'down', 'neutral'],
                                description: 'Trend direction, colors the badge.' }
                        ] },
                    { name: 'metrics', type: 'array',
                        description: 'Metrics to show, one per column.',
                        items: [
                            { name: 'label', type: 'string',
                                description: 'Metric label above the value.' },
                            { name: 'value', type: 'string|number', required: true,
                                description: 'The metric value, formatted as it should read.' }
                        ] },
                    { name: '_close', type: 'function',
                        description: 'Called with { event } when the notice is dismissed.' }
                ],
                each: {
                    type: 'object',
                    config: {
                        name: { type: 'string',
                            description: 'Parameter name, rendered in mono.' },
                        type: { type: 'string',
                            description: 'Type label, like string, number or string|number. Drives the badge color.' },
                        required: { type: 'boolean',
                            value: false,
                            description: 'Marks the parameter as required.' },
                        value: { type: 'string|number|boolean',
                            description: 'Default value shown as a chip.' },
                        options: { type: 'array',
                            value: [],
                            each: { type: 'string|number',
                                description: 'A single allowed value.' },
                            description: 'Allowed values rendered as chips.' },
                        description: { type: 'string',
                            description: 'What the parameter does.' },
                        deprecated: { type: 'boolean',
                            value: false,
                            description: 'Strikes the name and dims the row.' },
                        items: { type: 'array',
                            value: [],
                            each: { type: 'object',
                                description: 'A nested parameter with the same shape.' },
                            description: 'Child parameters of an object or array type. Nesting has no depth limit.' }
                    }
                },
                description: 'Parameters top to bottom.'
            },
            nested: { type: 'boolean',
                value: false,
                description: 'Internal. Marks a nested children block.' },
            background: { type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth from 1 to 3. 0 renders transparent, without background or borders.' },
            glow: { type: 'string',
                options: ['brand', 'blue', 'red', 'orange', 'green'],
                description: 'Colored glow on top of the surface. Empty renders no glow.' }
        },
        render: function()
        {
            const families = {
                string: 'green',
                number: 'blue',
                boolean: 'orange',
                array: 'brand',
                object: 'brand',
                function: 'red'
            };

            this.open = {};

            this.classes = () =>
            {
                const showsBackground = (this.background || this.background === 0) && !this.nested;

                return ['box', this.nested && 'children', showsBackground && 'bg-' + this.background].filter(Boolean).join(' ');
            };

            this.state = (item) =>
            {
                const hasChildren = item.items && item.items.length;

                return ['parameter', hasChildren && 'parent', this.open[item.name] && 'open', item.deprecated && 'deprecated'].filter(Boolean).join(' ');
            };

            this.family = (item) =>
            {
                const base = String(item.type).split('|')[0].trim();

                return 'type ' + (families[base] ? families[base] : 'green');
            };

            this.preview = (item) =>
            {
                return typeof item.value === 'string' ? "'" + item.value + "'" : String(item.value);
            };

            this.toggle = (item) =>
            {
                if(!item.items || !item.items.length)
                {
                    return;
                }

                this.open = { ...this.open, [item.name]: !this.open[item.name] };
            };

            return `
                <div :class="classes()">
                    <div ot-for="item in items" :ot-key="item.name" :class="state(item)">
                        <div class="row" ot-click="() => toggle(item)">
                            <div class="line">
                                <span class="name">{{ item.name }}</span>
                                <span :class="family(item)">{{ item.type }}</span>
                                <span ot-if="item.required" class="required">required</span>
                                <span ot-if="item.value !== undefined && item.value !== null" class="preview">= {{ preview(item) }}</span>
                                <i ot-if="item.items && item.items.length" class="chevron">expand_more</i>
                            </div>
                            <p ot-if="item.description" class="description">{{ item.description }}</p>
                            <div ot-if="item.options.length" class="options">
                                <span class="label">Options</span>
                                <div ot-for="option in item.options" :ot-key="option">
                                    <code class="option">{{ option }}</code>
                                </div>
                            </div>
                        </div>
                        <div ot-if="item.items && item.items.length" class="fold">
                            <div class="inner">
                                <e-admin-global-parameters :items="item.items" :nested="true"></e-admin-global-parameters>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });
});
