admin.Fn('make.filters.choices', function(group, picked, mark)
{
    return `
        <div ot-if="${group}.type === 'options'" class="choices">
            <e-admin-form-checkbox
                ot-for="option in ${group}.options"
                :ot-key="option.value"
                :label="option.label"
                description=""
                :count="option.count != null ? option.count : ''"
                :value="${picked}(${group}).includes(option.value)"
                :_change="() => ${mark}(${group}, option)"
            ></e-admin-form-checkbox>
        </div>
        <div ot-if="${group}.type === 'single'" class="choices">
            <e-admin-form-radio
                ot-for="option in ${group}.options"
                :ot-key="option.value"
                :label="option.label"
                description=""
                :count="option.count != null ? option.count : ''"
                :name="${group}.id"
                :option="String(option.value)"
                :value="${picked}(${group}).includes(option.value)"
                :_change="() => ${mark}(${group}, option)"
            ></e-admin-form-radio>
        </div>
    `;
});
