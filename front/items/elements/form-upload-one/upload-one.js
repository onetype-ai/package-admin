onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-form-upload-one',
        addon: 'admin',
        name: 'Upload One',
        description: 'Compact single file upload row with a thumbnail or extension mark, drop support, URL paste and replace and clear actions.',
        collection: 'Home',
        config: {
            value: {
                type: 'string',
                value: 'https://picsum.photos/seed/upload/240/240#cover.png',
                description: 'File URL.'
            },
            name: {
                type: 'string',
                description: 'Input name attribute.'
            },
            placeholder: {
                type: 'string',
                value: 'Drop a file, paste a URL or browse',
                description: 'Placeholder text while empty.'
            },
            accept: {
                type: 'string',
                description: 'Accepted file types for the picker.'
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
                description: 'Background depth of the control surface from 1 to 3. 0 renders transparent, without background or borders.'
            },
            _change: {
                type: 'function',
                description: 'Called with { value } when the file changes.'
            },
            _upload: {
                type: 'function',
                description: 'Called with { file }. Must return a URL string or null.'
            },
            _error: {
                type: 'function',
                description: 'Called with { error } when an upload fails.'
            }
        },
        render: function()
        {
            admin.Fn('do.form.upload.one', this);

            return `
                <div :class="classes()" ot-dragenter="enter()" ot-dragover="enter()" ot-dragleave="leave()" ot-drop="drop()">
                    <div class="field">
                        <img ot-if="hasFile && file.image" class="thumb" :src="value" :alt="file.name" />
                        <span ot-if="hasFile && !file.image" :class="'mark ' + file.color">{{ file.extension ? file.extension : 'file' }}</span>
                        <i ot-if="!hasFile && !uploading" class="icon">cloud_upload</i>
                        <i ot-if="uploading" class="icon spin">progress_activity</i>
                        <span ot-if="hasFile" class="name">{{ file.name }}</span>
                        <input
                            ot-if="!hasFile"
                            class="input"
                            type="text"
                            :placeholder="placeholder"
                            :disabled="disabled"
                            autocomplete="off"
                            spellcheck="false"
                            ot-change="paste"
                        />
                        <div class="tools">
                            <button
                                ot-if="!disabled"
                                type="button"
                                class="tool"
                                ot-click.stop="browse"
                                :ot-tooltip="{ text: hasFile ? 'Replace' : 'Browse', position: { x: 'center', y: 'top' } }"
                            ><i ot-if="hasFile">sync</i><i ot-if="!hasFile">folder_open</i></button>
                            <button
                                ot-if="hasFile && !disabled"
                                type="button"
                                class="tool danger"
                                ot-click.stop="clear"
                                :ot-tooltip="{ text: 'Remove', position: { x: 'center', y: 'top' } }"
                            ><i>close</i></button>
                        </div>
                    </div>
                    <input
                        class="picker"
                        type="file"
                        :name="name"
                        :accept="accept ? accept : null"
                        :disabled="disabled"
                        ot-change="pick"
                    />
                </div>
            `;
        }
    });
});
