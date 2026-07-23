onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-views-board',
        addon: 'admin',
        name: 'Board View',
        description: 'Kanban listing view with entries grouped into columns by a field, each column with a colored header, count and stacked entry cards.',
        collection: 'Home',
        config: admin.Fn('make.board.config'),
        render: function()
        {
            admin.Fn('do.board.field', this);

            return `
                <div :class="'box bg-' + background + (_open ? ' clickable' : '') + ' ot-scrollbar'">
                    <div ot-for="lane in lanes" :ot-key="lane.key" :class="'lane ' + lane.color">
                        <div class="head">
                            <span class="dot"></span>
                            <span class="label">{{ lane.label }}</span>
                            <span class="count">{{ lane.count }}</span>
                        </div>
                        <div class="cards">
                            <div ot-for="card in lane.cards" :ot-key="card.key" class="card"
                                ot-click="({ event }) => open(event, card.item)">
                                <img ot-if="card.image" class="cover" :src="card.image" loading="lazy" />
                                <span class="title">{{ card.title }}</span>
                                <span ot-if="card.badges.length" class="badges">
                                    <span ot-for="badge in card.badges" :ot-key="badge.label" :class="'badge ' + badge.color">
                                        <i ot-if="badge.icon">{{ badge.icon }}</i>{{ badge.label }}
                                    </span>
                                </span>
                                <span ot-if="card.description" class="description">{{ card.description }}</span>
                                <span ot-if="card.author || card.date" class="footer">
                                    <span ot-if="card.author" :class="'avatar ' + card.author.color"
                                        :ot-tooltip="{ text: card.author.name, position: { x: 'center', y: 'top' } }">{{ card.author.initials }}</span>
                                    <span ot-if="card.date" class="date">{{ card.date }}</span>
                                </span>
                            </div>
                            <button ot-if="_create && lane.canCreate" class="create" ot-click.stop="({ event }) => create(event, lane.key)">
                                <i>add</i>
                                <span>Create</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    });
});
