admin.Fn('do.repeater.iteration', function(scope)
{
    scope.hasVariables = () =>
    {
        return scope.variables && typeof scope.variables === 'object' && Object.keys(scope.variables).length > 0;
    };

    scope.iterationLabel = () =>
    {
        if(!scope.isIterable) return '';

        const each = String(scope.value.each || '').trim();
        const match = /^\{\{\s*([\s\S]*?)\s*\}\}$/.exec(each);

        return match ? match[1] : each;
    };

    scope.iterationCount = () =>
    {
        return scope.rows ? scope.rows.length : 0;
    };

    scope.templateRow = () =>
    {
        if(!scope.isIterable) return {};

        return scope.value.template || {};
    };

    scope.templateVariables = () =>
    {
        if(!scope.isIterable) return scope.variables || {};

        const alias = scope.value.as || 'item';
        const source = scope.rows && scope.rows.length > 0 ? scope.rows[0] : null;
        const sample = source ? source : (() =>
        {
            const stub = {};

            for(const field of scope.fields)
            {
                stub[field.key] = '';
            }

            return stub;
        })();

        return { ...(scope.variables || {}), [alias]: sample };
    };

    scope.changeTemplate = (key, data) =>
    {
        if(!scope.isIterable) return;

        const next = { ...scope.value };

        next.template = { ...(next.template || {}), [key]: data.value };

        scope.value = next;
        scope.sync();
    };
});
