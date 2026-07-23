onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-form-upload-many',
        addon: 'admin',
        name: 'Upload Many',
        description: 'Multi file upload with a drop zone, preview tiles, drag reorder and per file remove.',
        collection: 'Home',
        config: {
            value: {
                type: 'array',
                value: [
                    'https://picsum.photos/seed/one/240/240#hero.png',
                    'https://picsum.photos/seed/two/240/240#team.jpg',
                    'https://picsum.photos/seed/three/240/240#office.webp',
                    'https://example.com/files/brand-guidelines.pdf',
                    'https://example.com/files/content-export.zip'
                ],
                each: {
                    type: 'string',
                    description: 'A single file URL.'
                },
                description: 'File URLs in display order.'
            },
            max: {
                type: 'number',
                value: 0,
                description: 'Maximum number of files. Zero is unlimited.'
            },
            accept: {
                type: 'string',
                description: 'Accepted file extensions (.png, .pdf) or MIME patterns (image/*).'
            },
            label: {
                type: 'string',
                value: 'Drop files here or browse',
                description: 'Drop zone label while empty.'
            },
            disabled: {
                type: 'boolean',
                value: false,
                description: 'Disabled state.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth of the tile surfaces from 1 to 3. 0 renders transparent, without background or borders.'
            },
            _change: {
                type: 'function',
                description: 'Called with { value } when the files change.'
            },
            _upload: {
                type: 'function',
                description: 'Called with { file } per dropped or picked file. Must return a URL string or null.'
            },
            _error: {
                type: 'function',
                description: 'Called with { errors } when files are rejected.'
            }
        },
        render: function()
        {
            admin.Fn('do.form.upload.many.field', this);

            return `
                <div :class="classes()" ot-dragenter="enter()" ot-dragover="enter()" ot-dragleave="leave()" ot-drop="drop()">
                    <div ot-if="tiles.length === 0" class="zone" ot-click="browse">
                        <div class="ring">
                            <i ot-if="!uploading">cloud_upload</i>
                            <i ot-if="uploading" class="spin">progress_activity</i>
                        </div>
                        <span class="label">{{ label }}</span>
                    </div>
                    <div ot-if="tiles.length > 0" class="grid">
                        <div ot-for="tile in tiles" :ot-key="tile.key">
                            <div
                                :class="tileClasses(tile)"
                                ot-dragstart="dragStart(tile)"
                                ot-dragover="dragOver(tile)"
                                ot-drop="dragDrop(tile)"
                                ot-dragend="dragEnd"
                                :ot-tooltip="{ text: tile.name, position: { x: 'center', y: 'top' } }"
                            >
                                <img ot-if="tile.image" class="shot" :src="tile.url" :alt="tile.name" loading="lazy" />
                                <div ot-if="!tile.image" class="doc">
                                    <i>{{ tile.icon }}</i>
                                    <span class="extension">{{ tile.extension ? tile.extension.toUpperCase() : 'FILE' }}</span>
                                </div>
                                <button ot-if="!disabled" type="button" class="remove" ot-click.stop="() => remove(tile)"><i>close</i></button>
                            </div>
                        </div>
                        <div ot-if="uploading" class="tile add"><i class="spin">progress_activity</i></div>
                        <div ot-if="!uploading && canAdd && !disabled" class="tile add" ot-click="browse"><i>add</i></div>
                    </div>
                    <div ot-if="tiles.length > 1" class="footer">
                        <span class="count">{{ tiles.length }} files</span>
                        <button ot-if="!disabled" type="button" class="wipe" ot-click="clear">
                            <i>delete_sweep</i>
                            <span>Clear all</span>
                        </button>
                    </div>
                    <input class="picker" type="file" multiple :accept="accept ? accept : null" :disabled="disabled" ot-change="pick" />
                </div>
            `;
        }
    });
});
