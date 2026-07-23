onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-views-calendar',
        addon: 'admin',
        name: 'Calendar View',
        description: 'Monthly calendar listing view with entries as colored chips on their dates, month navigation and a highlighted today.',
        collection: 'Home',
        config: {
            month: {
                type: 'string',
                value: '2026-07',
                description: 'Month shown first, formatted as YYYY-MM. Empty opens the current month.'
            },
            items: {
                type: 'array',
                value: [{
                        id: 1,
                        title: 'Designing the OneType shell',
                        date: '2026-07-08',
                        color: 'green'
                    }, {
                        id: 2,
                        title: 'One database for everything',
                        date: '2026-07-06',
                        color: 'orange'
                    }, {
                        id: 3,
                        title: 'Marketplace economics',
                        date: '2026-07-05',
                        color: 'blue'
                    }, {
                        id: 4,
                        title: 'Commands as the universal API',
                        date: '2026-07-02',
                        color: 'green'
                    }, {
                        id: 5,
                        title: 'Weekly editorial sync',
                        date: '2026-07-13',
                        color: 'brand'
                    }, {
                        id: 6,
                        title: 'Launch teaser campaign',
                        date: '2026-07-13',
                        color: 'red'
                    }, {
                        id: 7,
                        title: 'Automation that writes itself',
                        date: '2026-07-13',
                        color: 'orange'
                    }, {
                        id: 8,
                        title: 'Packages, not plugins',
                        date: '2026-07-13',
                        color: 'green'
                    }, {
                        id: 9,
                        title: 'Community AMA',
                        date: '2026-07-21',
                        color: 'blue'
                    }, {
                        id: 10,
                        title: 'Marketplace beta opens',
                        date: '2026-07-24',
                        color: 'brand'
                    }
                ],
                each: {
                    type: 'object',
                    description: 'A single entry with id, title, a date formatted as YYYY-MM-DD and an accent color.'
                },
                description: 'Entries placed on their dates.'
            },
            background: {
                type: 'number',
                value: 1,
                options: [0, 1, 2, 3],
                description: 'Background depth of the day cells from 1 to 3. 0 renders transparent, without background or borders.'
            },
            _open: {
                type: 'function',
                description: 'Called with { event, value } when an entry chip is opened.'
            }
        },
        render: function()
        {
            admin.Fn('do.views.calendar', this);

            return `
                <div :class="background || background === 0 ? 'box bg-' + background : 'box'">
                    <div class="bar">
                        <span class="label">{{ label }}</span>
                        <span class="controls">
                            <button type="button" ot-click="previous"><i>chevron_left</i></button>
                            <button type="button" class="now" ot-click="today">Today</button>
                            <button type="button" ot-click="next"><i>chevron_right</i></button>
                        </span>
                    </div>
                    <div class="names">
                        <span ot-for="name in weekdays" :ot-key="name">{{ name }}</span>
                    </div>
                    <div class="grid">
                        <div ot-for="day in days" :ot-key="day.key" :class="'day' + (day.out ? ' out' : '') + (day.today ? ' today' : '')">
                            <span class="number">{{ day.number }}</span>
                            <span
                                ot-for="chip in day.chips"
                                :ot-key="chip.key"
                                :class="'chip ' + chip.color"
                                ot-click="({ event }) => open(event, chip.item)"
                            >
                                <span class="dot"></span>
                                <span class="text">{{ chip.title }}</span>
                            </span>
                            <span ot-if="day.more" class="more">+{{ day.more }} more</span>
                        </div>
                    </div>
                </div>
            `;
        }
    });
});
