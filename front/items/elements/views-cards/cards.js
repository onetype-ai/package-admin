onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-views-cards',
        addon: 'admin',
        name: 'Cards View',
        description: 'Listing view with entry cards in a responsive grid: cover image or tinted icon, status pill, title, excerpt and author footer.',
        collection: 'Home',
        config: {
            items: {
                type: 'array',
                value: [{
                        id: 1,
                        title: 'Designing the OneType shell',
                        description: 'How the editor chrome became a quiet, floating surface.',
                        image: 'https://picsum.photos/id/1018/640/400',
                        status: {
                            label: 'Published',
                            color: 'green'
                        },
                        author: { name: 'Dejan Tomić' },
                        date: 'Jul 8, 2026'
                    }, {
                        id: 2,
                        title: 'One database for everything',
                        description: 'Collections, entries and relations on a single universal store.',
                        icon: 'database',
                        color: 'green',
                        status: {
                            label: 'Draft',
                            color: 'orange'
                        },
                        author: { name: 'Stefan Pakić' },
                        date: 'Jul 6, 2026'
                    }],
                each: {
                    type: 'object',
                    description: 'A single entry with id, title, description, image or icon with color, status, author and date.'
                },
                description: 'Entries in reading order.'
            },
            empty: {
                type: 'string',
                value: 'No entries yet.',
                description: 'Message shown while there are no entries.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth of the entry cards from 1 to 3. 0 renders transparent, without background or borders.'
            },
            _open: {
                type: 'function',
                description: 'Called with { event, value } when an entry card is opened.'
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

            const toAuthor = (item) =>
            {
                if(item.author && typeof item.author === 'object')
                {
                    return item.author;
                }

                if(item.author)
                {
                    return { name: String(item.author) };
                }

                return null;
            };

            const initials = (name) => name.split(' ').map((word) => word.charAt(0)).slice(0, 2).join('');

            this.Compute(() =>
            {
                this.cards = this.items.map((item) =>
                {
                    const status = toStatus(item);
                    const author = toAuthor(item);

                    return {
                        key: item.id,
                        item: item,
                        title: item.title,
                        description: item.description,
                        image: item.image,
                        icon: item.icon ? item.icon : 'article',
                        color: item.color ? item.color : 'brand',
                        status: status ? {
                            label: status.label,
                            color: status.color ? status.color : 'brand'
                        } : null,
                        author: author ? {
                            name: author.name,
                            initials: initials(author.name),
                            color: author.color ? author.color : 'brand'
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
                <div :class="_open ? 'box clickable' : 'box'">
                    <div ot-for="card in cards" :ot-key="card.key" :class="'card bg-' + background" ot-click="({ event }) => open(event, card.item)">
                        <div :class="'cover ' + card.color">
                            <img ot-if="card.image" :src="card.image" loading="lazy" />
                            <i ot-if="!card.image">{{ card.icon }}</i>
                            <span ot-if="card.status" :class="'pill ' + card.status.color"><span class="dot"></span>{{ card.status.label }}</span>
                        </div>
                        <div class="body">
                            <span class="title">{{ card.title }}</span>
                            <span ot-if="card.description" class="description">{{ card.description }}</span>
                        </div>
                        <div ot-if="card.author || card.date" class="footer">
                            <span ot-if="card.author" :class="'author ' + card.author.color">
                                <span class="avatar">{{ card.author.initials }}</span>
                                <span class="name">{{ card.author.name }}</span>
                            </span>
                            <span ot-if="card.date" class="date">{{ card.date }}</span>
                        </div>
                    </div>
                    <div ot-if="!cards.length" class="empty">{{ empty }}</div>
                </div>
            `;
        }
    });
});
