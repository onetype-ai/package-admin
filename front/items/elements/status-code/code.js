onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-status-code',
        addon: 'admin',
        name: 'Code',
        description: 'Full-page status code with large number, message, action button and optional surface background.',
        collection: 'Home',
        config: {
            code: {
                type: 'string',
                value: '404',
                description: 'Status code number.'
            },
            title: {
                type: 'string',
                value: 'Page not found',
                description: 'Heading below the code.'
            },
            description: {
                type: 'string',
                value: "The page you're looking for doesn't exist or has been moved.",
                description: 'Paragraph below the title.'
            },
            action: {
                type: 'string',
                value: 'Go Home',
                description: 'Button label. Empty hides button.'
            },
            href: {
                type: 'string',
                value: '/',
                description: 'Button link target.'
            },
            color: {
                type: 'string',
                options: ['brand', 'blue', 'red', 'orange', 'green'],
                description: 'Code number gradient accent.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth 1-3 on a bordered surface. 0 is transparent, no background or borders.'
            },
            _click: {
                type: 'function',
                description: 'Action button click handler. Overrides the href navigation.'
            }
        },
        render: function()
        {
            this.classes = () =>
            {
                const list = ['box'];

                if(this.color)
                {
                    list.push(this.color);
                }

                if(this.background || this.background === 0)
                {
                    list.push('bg-' + this.background);
                }

                return list.join(' ');
            };

            return `
                <div :class="classes()">
                    <div class="inner">
                        <span class="code">{{ code }}</span>
                        <h2 ot-if="title" class="title">{{ title }}</h2>
                        <p ot-if="description" class="description">{{ description }}</p>
                        <e-admin-form-button
                            ot-if="action"
                            :text="action"
                            icon="home"
                            color="brand"
                            :href="_click ? null : href"
                            :_click="_click"
                        ></e-admin-form-button>
                    </div>
                </div>
            `;
        }
    });
});
