admin.Fn('make.filters.date', function(group, assign)
{
    return `
        <e-admin-form-date
            ot-if="${group}.type === 'date'"
            :value="state[${group}.id] ? state[${group}.id] : ''"
            :background="2"
            :_change="({ value }) => ${assign}(${group}, value)"
        ></e-admin-form-date>
    `;
});
