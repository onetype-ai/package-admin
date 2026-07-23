admin.Fn('make.builder.field', function(scope, { field, sectionIndex, fieldIndex, path })
{
    const tag = 'e-' + field.element;
    const props = field.properties || {};
    const span = field.span || 1;
    const escape = (value) => elements.Fn('type.escape', value);

    let attrs = '';

    Object.keys(props).forEach((key) =>
    {
        const value = props[key];

        if(typeof value === 'string')
        {
            attrs += ` ${key}="${escape(value)}"`;
        }
        else if(typeof value === 'function')
        {
            const ref = '__fn_' + field.key + '_' + key;

            scope[ref] = value;
            attrs += ` :${key}="${ref}"`;
        }
        else
        {
            attrs += ` :${key}='${escape(JSON.stringify(value))}'`;
        }
    });

    const input = `
        <${tag}
            :value="val('${field.key}')"
            :_input="(data) => input('${field.key}', data)"
            :_change="(data) => change('${field.key}', data)"
            :variables="variables"
            ${attrs}
        ></${tag}>
    `;

    const condition = field.condition
        ? `ot-if="visible(${path}[${sectionIndex}].fields[${fieldIndex}].condition)"`
        : '';

    return `
        <e-admin-core-field
            ${condition}
            #class="field"
            #style="grid-column: span ${span};"
            label="${escape(field.label || '')}"
            description="${escape(field.description || '')}"
            hint="${escape(field.hint || '')}"
            :required="${field.required ? 'true' : 'false'}"
            orientation="${field.orientation || 'horizontal'}"
        >
            <div slot="input">
                ${input}
            </div>
        </e-admin-core-field>
    `;
});
