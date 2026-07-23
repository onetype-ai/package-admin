onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-form-editor',
        addon: 'admin',
        name: 'Editor',
        description: 'WYSIWYG editor with a formatting toolbar and clean HTML output.',
        collection: 'Home',
        config: {
            value: {
                type: 'string',
                value: '<h2>Release notes</h2><p>Everything shipping in the <b>next update</b>.</p><ul><li>Faster boot</li><li>New elements</li></ul>',
                description: 'HTML content.'
            },
            placeholder: {
                type: 'string',
                value: 'Start writing…',
                description: 'Placeholder text.'
            },
            name: {
                type: 'string',
                description: 'Hidden input name for forms.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth of the editor surface from 1 to 3. 0 renders transparent, without background or borders.'
            },
            compact: {
                type: 'boolean',
                value: false,
                description: 'Tighter padding and shorter height.'
            },
            disabled: {
                type: 'boolean',
                value: false,
                description: 'Disabled state.'
            },
            _change: {
                type: 'function',
                description: 'Change handler. Receives { value }.'
            }
        },
        render: function()
        {
            admin.Fn('do.form.editor.field', this);

            return `
                <div :class="classes()">
                    <input ot-if="name" class="hidden" type="hidden" :name="name" :value="value" />
                    <div class="bar">
                        <div ot-for="tool in tools">
                            <div ot-if="tool.sep" class="sep"></div>
                            <button
                                ot-if="!tool.sep"
                                type="button"
                                class="btn"
                                :data-cmd="tool.cmd"
                                :ot-tooltip="{ text: tool.label, position: { x: 'center', y: 'top' } }"
                                ot-mousedown.prevent=""
                                ot-click.stop="() => exec(tool.cmd)"
                            >
                                <i>{{ tool.icon }}</i>
                            </button>
                        </div>
                    </div>
                    <div class="area">
                        <div class="body" contenteditable="true" ot-skip :data-placeholder="placeholder"></div>
                    </div>
                </div>
            `;
        }
    });
});
