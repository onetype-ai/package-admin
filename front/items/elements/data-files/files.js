onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-data-files',
        addon: 'admin',
        name: 'Files',
        description: 'File grid with type colored icon tiles, image previews, groups holding multiple files and click to open.',
        collection: 'Home',
        config: {
            files: {
                type: 'array',
                value: [{
                        name: 'Brand assets',
                        files: [{
                            name: 'cover.png',
                            size: '1.2 MB',
                            src: 'https://picsum.photos/seed/cover/640/400'
                        }]
                    }, {
                        name: 'homepage-hero.png',
                        size: '820 KB',
                        date: 'Jul 9',
                        src: 'https://picsum.photos/seed/hero/640/400'
                    }],
                each: {
                    type: 'object',
                    description: 'name, size, date, src (opened on click, previewed if an image) and onClick. Nested files makes it a group of the same shape.'
                },
                description: 'Files and groups in grid order.'
            },
            columns: {
                type: 'number',
                value: 3,
                options: [2, 3, 4, 5, 6],
                description: 'Grid columns.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth from 1 to 3. 0 renders transparent, without background or borders.'
            },
            _open: {
                type: 'function',
                description: 'Called with { file } on every file tile click.'
            }
        },
        render: function()
        {
            const kinds = {
                pdf: 'picture_as_pdf red', zip: 'folder_zip orange', rar: 'folder_zip orange',
                doc: 'description blue', docx: 'description blue', txt: 'article blue', md: 'article blue',
                xls: 'table green', xlsx: 'table green', csv: 'table green', svg: 'shapes orange',
                jpg: 'image green', jpeg: 'image green', png: 'image green', webp: 'image green', gif: 'image green', avif: 'image green',
                mp4: 'movie brand', webm: 'movie brand', mp3: 'music_note brand', wav: 'music_note brand',
                js: 'code orange', css: 'code blue', html: 'code red', json: 'data_object green', fig: 'design_services brand'
            };

            const resolve = (name) =>
            {
                const extension = String(name).split('?')[0].split('.').pop().toLowerCase();
                const [icon, color] = (kinds[extension] || 'draft blue').split(' ');

                return { extension, image: icon === 'image', icon, color };
            };

            this.group = null;

            this.entry = (file) =>
            {
                const kind = resolve(file.name);

                return {
                    ...file,
                    ...kind,
                    preview: !!(kind.image && file.src),
                    meta: file.date ? file.size + ' · ' + file.date : file.size
                };
            };

            this.toRow = (file) =>
            {
                if(!file.files || !file.files.length)
                {
                    return this.entry(file);
                }

                const stack = file.files.slice(0, file.files.length > 4 ? 3 : 4).map((member) => this.entry(member));

                return {
                    ...file,
                    group: true,
                    stack,
                    extra: file.files.length - stack.length,
                    meta: file.files.length + ' files'
                };
            };

            this.entries = () => (this.group ? this.group.files : this.files).map((file) => this.toRow(file));

            this.classes = (file) => ['tile', file.color, file.group ? 'folder' : '', file.preview ? 'shot' : ''].filter(Boolean).join(' ');

            this.open = (file) =>
            {
                if(file.group)
                {
                    this.group = file;
                }
                else if(file.onClick)
                {
                    file.onClick(file);
                }
                else if(this._open)
                {
                    this._open({ file });
                }
                else if(file.src)
                {
                    window.open(file.src, '_blank');
                }
            };

            this.back = () => this.group = null;

            return `
                <div :class="'box bg-' + background" :style="'grid-template-columns: repeat(' + columns + ', minmax(0, 1fr))'">
                    <div ot-if="group" class="bar">
                        <button type="button" class="return" ot-click="() => back()"><i>arrow_back</i></button>
                        <span class="label">{{ group.name }}</span>
                        <span class="count">{{ group.meta }}</span>
                    </div>
                    <div ot-for="file in entries()" :ot-key="file.name">
                        <button type="button" :class="classes(file)" ot-click="() => open(file)">
                            <div class="visual">
                                <img ot-if="file.preview" class="thumb" :src="file.src" alt="" loading="lazy" />
                                <div ot-if="!file.preview && !file.group" class="wrap"><i>{{ file.icon }}</i></div>
                                <div ot-if="file.group" class="stack">
                                    <div ot-for="member in file.stack" :ot-key="member.name">
                                        <span :class="'mini ' + member.color">
                                            <img ot-if="member.preview" :src="member.src" alt="" loading="lazy" />
                                            <i ot-if="!member.preview">{{ member.icon }}</i>
                                        </span>
                                    </div>
                                    <span ot-if="file.extra" class="mini more">+{{ file.extra }}</span>
                                </div>
                            </div>
                            <span ot-if="!file.group" class="badge">{{ file.extension.toUpperCase() }}</span>
                            <span class="name">{{ file.name }}</span>
                            <span ot-if="file.meta" class="meta">{{ file.meta }}</span>
                        </button>
                    </div>
                </div>
            `;
        }
    });
});
