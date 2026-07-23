admin.Fn('make.builder.section', function(scope, section, sectionIndex, path)
{
    const columns = section.columns || 1;
    const escape = (value) => elements.Fn('type.escape', value);

    const fields = (section.fields || [])
        .map((field, fieldIndex) => admin.Fn('make.builder.field', scope, { field, sectionIndex, fieldIndex, path }))
        .join('');

    const condition = section.condition
        ? `ot-if="visible(${path}[${sectionIndex}].condition)"`
        : '';

    const background = section.background || scope.section.background || '';
    const depth = Number(String(background).replace('bg-', '')) || 0;

    return `
        <e-admin-core-section
            ${condition}
            eyebrow="${escape(section.eyebrow || '')}"
            icon="${escape(section.icon || '')}"
            title="${escape(section.title || '')}"
            description="${escape(section.description || '')}"
            :collapsible="${section.collapsible ? 'true' : 'false'}"
            :collapsed="${section.collapsed ? 'true' : 'false'}"
            :background="${depth}"
        >
            <div slot="content">
                <div class="grid" style="grid-template-columns: repeat(${columns}, minmax(0, 1fr));">
                    ${fields}
                </div>
            </div>
        </e-admin-core-section>
    `;
});
