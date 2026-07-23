onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-global-tags',
        addon: 'admin',
        name: 'Tags',
        description: 'Selectable tag pills with icons, color dots, counts, single or multi selection.',
        collection: 'Home',
        config: {
            items: {
                type: 'array',
                value: [{
                        id: 'all',
                        label: 'All',
                        count: 24
                    }, {
                        id: 'design',
                        label: 'Design',
                        color: 'blue',
                        count: 9
                    }, {
                        id: 'engineering',
                        label: 'Engineering',
                        color: 'green',
                        count: 8
                    }, {
                        id: 'product',
                        label: 'Product',
                        color: 'orange',
                        count: 5
                    }, {
                        id: 'archived',
                        label: 'Archived',
                        disabled: true
                    }
                ],
                each: {
                    type: 'string|object',
                    config: {
                        id: {
                            type: 'string',
                            description: 'Unique tag identifier.'
                        },
                        label: {
                            type: 'string',
                            description: 'Display text.'
                        },
                        icon: {
                            type: 'string',
                            description: 'Material Symbols icon before the label.'
                        },
                        count: {
                            type: 'string|number',
                            description: 'Count badge after the label.'
                        },
                        color: {
                            type: 'string',
                            options: ['brand', 'blue', 'red', 'orange', 'green'],
                            description: 'Color dot and active accent. Empty falls back to brand on select.'
                        },
                        disabled: {
                            type: 'boolean',
                            value: false,
                            description: 'Dims the tag and blocks selection.'
                        },
                        tooltip: {
                            type: 'string',
                            description: 'Tooltip shown on hover.'
                        },
                        onClick: {
                            type: 'function',
                            description: 'Called with { event, tag } on click, before the selection change.'
                        }
                    }
                },
                description: 'Tags left to right. Strings or objects with id, label, icon, count, color and disabled.'
            },
            active: {
                type: 'string|array',
                description: 'Active tag id, or an array of ids while multiple is on.'
            },
            multiple: {
                type: 'boolean',
                value: false,
                description: 'Allow selecting more than one tag.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth of the tag pills from 1 to 3. 0 renders transparent, without background or borders.'
            },
            _change: {
                type: 'function',
                description: 'Called with { event, value } after every selection change.'
            }
        },
        render: function()
        {
            admin.Fn('do.tags.field', this);

            return `
                <div :class="'box bg-' + background">
                    <div ot-for="tag in normalized" :ot-key="tag.id">
                        <button
                            type="button"
                            :class="state(tag)"
                            :ot-tooltip="tag.tooltip ? tag.tooltip : ''"
                            ot-click="({ event }) => select(tag, event)"
                        >
                            <span ot-if="tag.color && !tag.icon" class="dot"></span>
                            <i ot-if="tag.icon">{{ tag.icon }}</i>
                            <span class="label">{{ tag.label }}</span>
                            <span ot-if="tag.count != null" class="count">{{ tag.count }}</span>
                        </button>
                    </div>
                </div>
            `;
        }
    });
});
