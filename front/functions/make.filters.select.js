admin.Fn('make.filters.select', function(group, assign)
{
    return `
        <e-admin-form-select
            ot-if="${group}.type === 'select'"
            :options="${group}.options"
            :value="state[${group}.id] ? state[${group}.id] : ''"
            :placeholder="${group}.placeholder ? ${group}.placeholder : 'Pick...'"
            :background="2"
            :_change="({ value }) => ${assign}(${group}, value)"
        ></e-admin-form-select>
    `;
});
