admin.Fn('do.repeater.fields', function(scope)
{
    const buildFieldAttrs = (field) =>
    {
        const props = field.properties || {};

        let attrs = '';

        Object.keys(props).forEach(key =>
        {
            const val = props[key];

            if(typeof val === 'function')
            {
                const ref = '__fn_' + field.key + '_' + key;
                scope[ref] = val;
                attrs += ` :${key}="${ref}"`;
            }
            else if(typeof val === 'string')
            {
                attrs += ` ${key}="${val}"`;
            }
            else
            {
                attrs += ` :${key}='${JSON.stringify(val)}'`;
            }
        });

        return attrs;
    };

    const buildFieldLabel = (field) =>
    {
        if(!field.label) return '';

        return `<div class="field-info">
            <span class="field-label">${field.label}</span>
            ${field.description ? `<span class="field-description">${field.description}</span>` : ''}
        </div>`;
    };

    scope.buildFields = (value, variables, change) =>
    {
        return scope.fields.map((field) =>
        {
            const tag = 'e-' + field.element;
            const attrs = buildFieldAttrs(field);
            const label = buildFieldLabel(field);

            return `
                <div class="field">
                    ${label}
                    <${tag}
                        :value="${value}['${field.key}']"
                        :variables="${variables}"
                        :_change="(data) => ${change(field)}"${attrs}
                    ></${tag}>
                </div>
            `;
        }).join('');
    };
});
