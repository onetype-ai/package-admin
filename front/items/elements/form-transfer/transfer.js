onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-form-transfer',
        addon: 'admin',
        name: 'Transfer',
        description: 'Two panel transfer list with search, bulk move actions and a max limit.',
        collection: 'Home',
        config: admin.Fn('make.transfer.config'),
        render: function()
        {
            admin.Fn('do.transfer.field', this);

            const panel = ([title, count, search, onSearch, items, empty, icon, toggle, move]) =>
            {
                return `
                    <div class="panel">
                        <header class="head">
                            <span class="title">{{ ${title} }}</span>
                            <span class="counter">${count}</span>
                        </header>
                        <div ot-if="searchable" class="search">
                            <e-admin-form-input icon="search" placeholder="Search…" :value="${search}"
                                :_input="${onSearch}" :background="3"></e-admin-form-input>
                        </div>
                        <div class="list">
                            <div ot-if="!${items}().length" class="empty">
                                <i>${icon}</i>
                                <span>{{ ${empty} }}</span>
                            </div>
                            <button ot-for="item in ${items}()" :ot-key="item.value" type="button"
                                :class="'item' + (item.disabled ? ' disabled' : '')" :disabled="item.disabled || disabled"
                                ot-click="() => ${toggle}(item)">
                                <i ot-if="item.icon" class="item-icon">{{ item.icon }}</i>
                                <div class="item-text">
                                    <span class="item-label">{{ item.label }}</span>
                                    <span ot-if="item.description" class="item-desc">{{ item.description }}</span>
                                </div>
                                <i class="item-move">${move}</i>
                            </button>
                        </div>
                    </div>
                `;
            };

            const availableCount = '{{ computed().available.length }} / {{ list().length }}';
            const selectedCount = '{{ computed().selected.length }} / {{ max ? max : list().length }}';

            const left = ['leftTitle', availableCount, 'leftSearch', 'changeLeftSearch', 'available', 'emptyLeft', 'inbox', 'toggleLeft', 'add'];
            const right = ['rightTitle', selectedCount, 'rightSearch', 'changeRightSearch', 'chosen', 'emptyRight', 'playlist_add', 'toggleRight', 'close'];

            return `
                <div :class="classes()">
                    ${panel(left)}
                    <div class="controls">
                        <button type="button" class="control" :disabled="!canMoveAllRight()" ot-click="moveAllRight"
                            :ot-tooltip="{ text: 'Move all', position: { x: 'center', y: 'top' } }">
                            <i>keyboard_double_arrow_right</i>
                        </button>
                        <button type="button" class="control" :disabled="!canMoveAllLeft()" ot-click="moveAllLeft"
                            :ot-tooltip="{ text: 'Remove all', position: { x: 'center', y: 'top' } }">
                            <i>keyboard_double_arrow_left</i>
                        </button>
                    </div>
                    ${panel(right)}
                </div>
            `;
        }
    });
});
