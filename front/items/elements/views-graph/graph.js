onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-views-graph',
        addon: 'admin',
        name: 'Graph View',
        description: 'Hierarchy as a wide canvas: kind-labeled cards top to bottom with descriptions, rows, lists and footers, wired by soft connectors.',
        collection: 'Home',
        config: {
            items: {
                type: 'array',
                value: [{
                        id: 'ceo',
                        title: 'Vera Antić',
                        subtitle: 'Chief Executive',
                        avatar: 'VA',
                        color: 'brand',
                        badge: 'Lead',
                        meta: '12 yrs',
                        description: 'Keeps the whole company pointed at one goal and clears the road when teams collide.',
                        tags: ['strategy', 'hiring'],
                        children: [{
                                id: 'product',
                                title: 'Marko Ilić',
                                subtitle: 'Product',
                                avatar: 'MI',
                                color: 'blue',
                                description: 'Turns customer noise into a roadmap people actually ship.',
                                rows: [{
                                        label: 'Focus',
                                        value: 'Q3 launch'
                                    }, {
                                        label: 'Squad',
                                        value: '6 people'
                                    }
                                ],
                                children: [{
                                        id: 'design',
                                        title: 'Sara Perić',
                                        subtitle: 'Design',
                                        avatar: 'SP',
                                        color: 'green',
                                        description: 'Owns the design system and the face of every screen.',
                                        list: [{
                                                icon: 'palette',
                                                label: 'design:tokens'
                                            }, {
                                                icon: 'brush',
                                                label: 'design:review'
                                            }
                                        ]
                                    }, {
                                        id: 'research',
                                        title: 'Ivan Simić',
                                        subtitle: 'Research',
                                        avatar: 'IS',
                                        color: 'orange',
                                        description: 'Talks to users so nobody has to guess.'
                                    }
                                ]
                            }, {
                                id: 'engineering',
                                title: 'Lena Kovač',
                                subtitle: 'Engineering',
                                avatar: 'LK',
                                color: 'red',
                                description: 'Runs the platform and mobile squads, allergic to flaky builds.',
                                list: [{
                                        icon: 'terminal',
                                        label: 'ci:deploy'
                                    }, {
                                        icon: 'bug_report',
                                        label: 'ci:test'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                each: {
                    type: 'object',
                    description: 'A node: id, title, subtitle, avatar, color, badge, meta, tags, rows, list, listLabel, children of the same shape.'
                },
                description: 'Nodes of the first level, nested through children.'
            },
            active: {
                type: 'string',
                description: 'Id of the selected node.'
            },
            empty: {
                type: 'string',
                value: 'Nothing to draw yet.',
                description: 'Message shown while there are no nodes.'
            },
            background: {
                type: 'number',
                value: 0,
                options: [0, 1, 2, 3],
                description: 'Background depth the canvas sits on. Cards sit one step above.'
            },
            _open: {
                type: 'function',
                description: 'Called with { value } holding the node when a card is opened.'
            }
        },
        render: function()
        {
            admin.Fn('do.graph.field', this);

            return admin.Fn('make.graph.markup');
        }
    });
});
