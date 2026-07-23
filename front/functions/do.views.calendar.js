admin.Fn('do.views.calendar', function(scope)
{
    const stamp = (date) =>
    {
        return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    };

    const base = () =>
    {
        if(/^\d{4}-\d{2}$/.test(scope.month))
        {
            const [year, month] = scope.month.split('-').map(Number);

            return new Date(year, month - 1, 1);
        }

        const now = new Date();

        return new Date(now.getFullYear(), now.getMonth(), 1);
    };

    scope.shift = 0;
    scope.weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    scope.Compute(() =>
    {
        const start = base();
        const current = new Date(start.getFullYear(), start.getMonth() + scope.shift, 1);
        const map = {};

        for(const item of scope.items)
        {
            if(!map[item.date])
            {
                map[item.date] = [];
            }

            map[item.date].push({
                key: item.id,
                item,
                title: item.title,
                color: item.color ? item.color : 'brand'
            });
        }

        const cursor = new Date(current);
        cursor.setDate(1 - ((cursor.getDay() + 6) % 7));

        const today = stamp(new Date());
        const days = [];

        for(let index = 0; index < 42; index++)
        {
            const iso = stamp(cursor);
            const chips = map[iso] ? map[iso] : [];

            days.push({
                key: iso,
                number: cursor.getDate(),
                out: cursor.getMonth() !== current.getMonth(),
                today: iso === today,
                chips: chips.slice(0, 3),
                more: chips.length > 3 ? chips.length - 3 : 0
            });

            cursor.setDate(cursor.getDate() + 1);
        }

        scope.days = days;
        scope.label = current.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    });

    scope.previous = () =>
    {
        scope.shift = scope.shift - 1;
    };

    scope.next = () =>
    {
        scope.shift = scope.shift + 1;
    };

    scope.today = () =>
    {
        const from = base();
        const now = new Date();

        scope.shift = (now.getFullYear() - from.getFullYear()) * 12 + now.getMonth() - from.getMonth();
    };

    scope.open = (event, item) =>
    {
        if(scope._open)
        {
            scope._open({ event, value: item });
        }
    };
});
