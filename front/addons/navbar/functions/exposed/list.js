admin.navbar.FnExpose('list', function()
{
	return Object.values(this.Items()).filter((item) => item.Fn('visible')).sort((a, b) => a.Get('order') - b.Get('order')).map((item) =>
	{
		const active = item.Get('isActive');
		const render = item.Get('render');

		return {
			id: item.Get('id'),
			type: item.Get('type'),
			position: item.Get('position'),
			icon: item.Get('icon'),
			label: item.Get('name'),
			tooltip: item.Get('tooltip'),
			color: item.Get('color'),
			badge: item.Get('badge'),
			active: (typeof active === 'function' ? active(item) === true : active) || item.Get('isOpen'),
			render: item.Get('type') === 'default' && render ? (data) => admin.navbar.Render(item.Get('id'), data || {}).Element : null,
			click: () =>
			{
				onetype.Emit('admin.navbar.click', { id: item.Get('id') });

				if(item.Get('popup'))
				{
					return item.Get('isOpen') ? commands.Fn('run', 'admin:navbar:close') : commands.Fn('run', 'admin:navbar:open', { id: item.Get('id') });
				}

				item.Get('onClick') && item.Get('onClick')(item);
			}
		};
	});
});
