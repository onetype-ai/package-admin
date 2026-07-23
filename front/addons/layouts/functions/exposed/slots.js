admin.layouts.FnExpose('slots', function(zone)
{
    const slots = {
        top: [],
        bottom: [],
        left: [],
        right: [],
        center: []
    };

    const data = this.Fn('get.data');

    Object.values(this.Items()).sort((left, right) => left.Get('order') - right.Get('order')).forEach((item) =>
    {
        if(item.Get('zone') !== zone)
        {
            return;
        }

        if(!item.Fn('visible'))
        {
            return;
        }

        slots[item.Get('slot')].push({
            id: item.Get('id'),
            data: { ...data, ...(this.StoreGet('values.' + item.Get('id')) || {}) }
        });
    });

    return slots;
});
