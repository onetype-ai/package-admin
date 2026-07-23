onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-views-gallery',
        addon: 'admin',
        name: 'Gallery View',
        description: 'Image first listing view with a masonry of media tiles, title and date revealed on hover and a status pill in the corner.',
        collection: 'Home',
        config: {
            items: {
                type: 'array',
                value: [{
                        id: 1,
                        title: 'Designing the OneType shell',
                        image: 'https://picsum.photos/id/1018/600/420',
                        status: {
                            label: 'Published',
                            color: 'green'
                        },
                        date: 'Jul 8, 2026'
                    }, {
                        id: 2,
                        title: 'One database for everything',
                        image: 'https://picsum.photos/id/1015/600/760',
                        status: {
                            label: 'Draft',
                            color: 'orange'
                        },
                        date: 'Jul 6, 2026'
                    }, {
                        id: 3,
                        title: 'Marketplace economics',
                        image: 'https://picsum.photos/id/1084/600/400',
                        status: {
                            label: 'In review',
                            color: 'blue'
                        },
                        date: 'Jul 5, 2026'
                    }, {
                        id: 4,
                        title: 'Commands as the universal API',
                        image: 'https://picsum.photos/id/1025/600/620',
                        status: {
                            label: 'Published',
                            color: 'green'
                        },
                        date: 'Jul 2, 2026'
                    }, {
                        id: 5,
                        title: 'Packages, not plugins',
                        image: 'https://picsum.photos/id/1039/600/480',
                        status: {
                            label: 'Published',
                            color: 'green'
                        },
                        date: 'Jun 28, 2026'
                    }, {
                        id: 6,
                        title: 'Automation that writes itself',
                        image: 'https://picsum.photos/id/1043/600/720',
                        status: {
                            label: 'Draft',
                            color: 'orange'
                        },
                        date: 'Jun 24, 2026'
                    }
                ],
                each: {
                    type: 'object',
                    description: 'A single entry with id, title, image, status and date. Entries without an image render a tinted icon tile.'
                },
                description: 'Entries in masonry order.'
            },
            columns: {
                type: 'number',
                value: 5,
                options: [2, 3, 4, 5],
                description: 'Number of masonry columns.'
            },
            empty: {
                type: 'string',
                value: 'No media yet.',
                description: 'Message shown while there are no entries.'
            },
            _open: {
                type: 'function',
                description: 'Called with { event, value } when a tile is opened.'
            }
        },
        render: function()
        {
            const toStatus = (item) =>
            {
                if(item.status && typeof item.status === 'object')
                {
                    return item.status;
                }

                if(item.status)
                {
                    return {
                        label: String(item.status),
                        color: 'brand'
                    };
                }

                return null;
            };

            this.Compute(() =>
            {
                this.tiles = this.items.map((item) =>
                {
                    const status = toStatus(item);

                    return {
                        key: item.id,
                        item: item,
                        title: item.title,
                        image: item.image,
                        icon: item.icon ? item.icon : 'image',
                        color: item.color ? item.color : 'brand',
                        status: status ? {
                            label: status.label,
                            color: status.color ? status.color : 'brand'
                        } : null,
                        date: item.date
                    };
                });
            });

            this.open = (event, item) =>
            {
                if(this._open)
                {
                    this._open({ event, value: item });
                }
            };

            return `
                <div :class="_open ? 'box clickable' : 'box'" :style="'columns: ' + columns">
                    <div ot-for="tile in tiles" :ot-key="tile.key" :class="'tile ' + tile.color" ot-click="({ event }) => open(event, tile.item)">
                        <img ot-if="tile.image" :src="tile.image" loading="lazy" />
                        <span ot-if="!tile.image" class="fallback"><i>{{ tile.icon }}</i></span>
                        <span ot-if="tile.status" :class="'pill ' + tile.status.color"><span class="dot"></span>{{ tile.status.label }}</span>
                        <span class="veil">
                            <span class="title">{{ tile.title }}</span>
                            <span ot-if="tile.date" class="date">{{ tile.date }}</span>
                        </span>
                    </div>
                    <div ot-if="!tiles.length" class="empty">{{ empty }}</div>
                </div>
            `;
        }
    });
});
