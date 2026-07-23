admin.dashboard.Fn('make.section', function(section)
{
    return {
        id: section ? section.Get('id') : null,
        title: section ? section.Get('title') : '',
        description: section ? section.Get('description') : '',
        icon: section ? section.Get('icon') : '',
        color: section ? section.Get('color') : '',
        background: section ? section.Get('background') : null
    };
});
