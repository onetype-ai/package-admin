onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-data-attachments',
        addon: 'admin',
        name: 'Attachments',
        description: 'Inline attachment chips with a colored extension mark, name, size and hover actions, wrapping like mail attachments.',
        collection: 'Home',
        config: {
            items: {
                type: 'array',
                value: [{
                        name: 'invoice-2026-07.pdf',
                        size: '128 KB'
                    }, {
                        name: 'screenshot.png',
                        size: '644 KB',
                        src: 'https://picsum.photos/seed/attach/120/120'
                    }, {
                        name: 'notes.md',
                        size: '4 KB'
                    }
                ],
                each: {
                    type: 'object',
                    config: {
                        name: {
                            type: 'string',
                            description: 'File name with extension, drives the icon and color.'
                        },
                        size: {
                            type: 'string',
                            description: 'Size label, like 128 KB.'
                        },
                        src: {
                            type: 'string',
                            description: 'File URL for the download action. Image files render it as a thumbnail instead of the extension mark.'
                        }
                    }
                },
                description: 'Attachments top to bottom.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth of the chips from 1 to 3. 0 renders transparent, without background or borders.'
            },
            _download: {
                type: 'function',
                description: 'Called with { item } on the download action. Overrides the src navigation.'
            },
            _remove: {
                type: 'function',
                description: 'Called with { item } on the remove action. Empty hides the remove button.'
            }
        },
        render: function()
        {
            admin.Fn('do.attachments.field', this);

            return `
                <div :class="'box bg-' + background">
                    <div ot-for="item in list" :ot-key="item.name">
                        <div :class="'chip ' + item.color">
                            <img ot-if="item.preview" class="thumb" :src="item.src" alt="" loading="lazy" />
                            <span ot-if="!item.preview" class="mark">{{ item.extension }}</span>
                            <span class="name">{{ item.name }}</span>
                            <span class="size">{{ item.size }}</span>
                            <span class="tools">
                                <button type="button" class="tool" ot-click="() => download(item)"><i>download</i></button>
                                <button ot-if="_remove" type="button" class="tool danger" ot-click="() => remove(item)"><i>close</i></button>
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }
    });
});
