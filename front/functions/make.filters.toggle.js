admin.Fn('make.filters.toggle', function(group, assign)
{
    return `
        <div ot-if="${group}.type === 'toggle'" class="switch">
            <span class="label">{{ ${group}.label }}</span>
            <e-admin-form-toggle
                :value="!!state[${group}.id]"
                label=""
                description=""
                :_change="({ value }) => ${assign}(${group}, value)"
            ></e-admin-form-toggle>
        </div>
    `;
});
