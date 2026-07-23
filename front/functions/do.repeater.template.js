admin.Fn('do.repeater.template', function(scope)
{
    scope.computeRows = () =>
    {
        const value = scope.value;

        if(value && !Array.isArray(value) && typeof value === 'object' && typeof value.each === 'string')
        {
            const match = /^\{\{\s*([\s\S]*?)\s*\}\}$/.exec(value.each.trim());
            const expression = match ? match[1] : value.each;
            const alias = value.as || 'item';
            const template = value.template || {};

            let source;

            try
            {
                source = onetype.Function(expression, scope.variables || {}, false);
            }
            catch(error)
            {
                onetype.Error(400, 'Repeater iteration expression failed: :message:', { message: error.message });

                source = null;
            }

            if(!Array.isArray(source))
            {
                return [];
            }

            return source.map((item, index) =>
            {
                const rowScope = { ...(scope.variables || {}), [alias]: item, index };
                const rendered = {};

                for(const [key, raw] of Object.entries(template))
                {
                    rendered[key] = scope.resolveValue(raw, rowScope);
                }

                return rendered;
            });
        }

        return Array.isArray(value) ? value : [];
    };

    scope.evaluate = (expression, evalScope) =>
    {
        try
        {
            return onetype.Function(expression, evalScope, false);
        }
        catch(error)
        {
            onetype.Error(400, 'Repeater template expression failed: :message:', { message: error.message });

            return undefined;
        }
    };

    scope.resolveText = (value, textScope) =>
    {
        const whole = /^\{\{\s*([\s\S]*?)\s*\}\}$/.exec(value);

        if(whole)
        {
            const result = scope.evaluate(whole[1], textScope);

            return result === undefined ? '' : result;
        }

        if(value.indexOf('{{') === -1)
        {
            return value;
        }

        return value.replace(/\{\{\s*([\s\S]*?)\s*\}\}/g, (match, expression) =>
        {
            const result = scope.evaluate(expression, textScope);

            if(result === null || result === undefined)
            {
                return '';
            }

            return typeof result === 'object' ? JSON.stringify(result) : String(result);
        });
    };

    scope.resolveValue = (value, valueScope) =>
    {
        if(typeof value === 'string')
        {
            return scope.resolveText(value, valueScope);
        }

        if(Array.isArray(value))
        {
            return value.map((item) => scope.resolveValue(item, valueScope));
        }

        if(value && typeof value === 'object')
        {
            const output = {};

            for(const [key, child] of Object.entries(value))
            {
                output[key] = scope.resolveValue(child, valueScope);
            }

            return output;
        }

        return value;
    };
});
