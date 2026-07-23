admin.Fn('make.graph.markup', function()
{
    return `
        <div :class="'box bg-' + background + ' ot-scrollbar'">
            <div ot-if="!items.length" class="void">{{ empty }}</div>
            <div ot-if="items.length" class="plane" :style="frame()">
                <svg class="wires" :style="frame()">
                    <path ot-for="link in layout().links" :ot-key="link.id" :class="link.color" :d="link.d"></path>
                    <circle
                        ot-for="link in layout().links"
                        :ot-key="'dot-' + link.id"
                        :class="link.color"
                        :cx="link.x2"
                        :cy="link.y2"
                        r="3"
                    ></circle>
                </svg>
                <div
                    ot-for="card in layout().cards"
                    :ot-key="card.node.id"
                    :class="stamp(card)"
                    :style="place(card)"
                    ot-click="() => pick(card.node)"
                >
                    <div class="head">
                        <span class="dot"></span>
                        <span class="kind">{{ card.node.badge ? card.node.badge : 'Node' }}</span>
                        <span ot-if="card.node.meta" class="meta">{{ card.node.meta }}</span>
                    </div>
                    <div class="words">
                        <span class="title">{{ card.node.title }}</span>
                        <span ot-if="card.node.subtitle" class="subtitle">{{ card.node.subtitle }}</span>
                    </div>
                    <p ot-if="card.node.description" class="description">{{ card.node.description }}</p>
                    <div ot-if="card.node.rows && card.node.rows.length" class="grid">
                        <div ot-for="row in card.node.rows" :ot-key="row.label" class="pair">
                            <span class="label">{{ row.label }}</span>
                            <span class="value">{{ row.value }}</span>
                        </div>
                    </div>
                    <div ot-if="card.node.list && card.node.list.length" class="list">
                        <span class="caption">{{ card.node.listLabel ? card.node.listLabel : 'Items' }} · {{ card.node.list.length }}</span>
                        <div ot-for="entry in card.node.list" :ot-key="entry.label" class="entry">
                            <i ot-if="entry.icon">{{ entry.icon }}</i>
                            <span class="lines">
                                <span class="name">{{ entry.label }}</span>
                                <span ot-if="entry.sublabel" class="sub">{{ entry.sublabel }}</span>
                            </span>
                            <span ot-if="entry.badge" class="mark">{{ entry.badge }}</span>
                        </div>
                    </div>
                    <div ot-if="card.node.avatar || (card.node.tags && card.node.tags.length)" class="footer">
                        <span ot-if="card.node.avatar" class="avatar" :ot-tooltip="card.node.title">{{ card.node.avatar }}</span>
                        <span ot-if="card.node.tags && card.node.tags.length" class="tags">
                            <e-admin-global-tags :items="chips(card.node)" :background="2"></e-admin-global-tags>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;
});
