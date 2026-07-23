onetype.AddonReady('pages', (pages) =>
{
    pages.Item({
        id: 'home',
        route: '/*',
        title: 'OneType - Platform',
        grid: {
            template: '"app"',
            columns: '1fr',
            rows: '1fr',
            gap: '0'
        },
        areas: {
            app: function()
            {
                this.ready = $ot.get('platform.booted') === true;

                onetype.emitters.catch('platform.boot', () =>
                {
                    this.ready = true;
                });

                this.shell = () =>
                {
                    const areas = "'navbar navbar' 46px 'rail workspace' 1fr 'status status' 32px";

                    return 'display: grid; width: 100%; height: 100%; grid-template: ' + areas + ' / auto 1fr;';
                };

                return `
                    <div ot-if="!ready" style="width: 100%; height: 100%;">
                        <e-admin-status-loading></e-admin-status-loading>
                    </div>
                    <div ot-if="ready" :style="shell()">
                        <div style="grid-area: navbar;"><e-admin-navbar-bar></e-admin-navbar-bar></div>
                        <div style="grid-area: rail;"><e-admin-dock-bar></e-admin-dock-bar></div>
                        <div style="grid-area: workspace; min-width: 0; overflow: hidden;"><e-admin-layouts-zone></e-admin-layouts-zone></div>
                        <div style="grid-area: status;"><e-admin-status-bar></e-admin-status-bar></div>
                    </div>
                `;
            }
        }
    });
});
