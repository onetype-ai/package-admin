admin.Fn('make.filters.search', function(group, assign)
{
    return `
        <e-admin-form-input
            ot-if="${group}.type === 'search'"
            icon="search"
            :placeholder="${group}.placeholder ? ${group}.placeholder : 'Search...'"
            :value="state[${group}.id] ? state[${group}.id] : ''"
            :clearable="true"
            :background="2"
            :_input="({ value }) => ${assign}(${group}, value)"
        ></e-admin-form-input>
    `;
});
