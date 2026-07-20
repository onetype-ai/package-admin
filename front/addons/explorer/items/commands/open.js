commands.Item({
	id: 'ui:explorer:open',
	exposed: true,
	description: 'Open the explorer, the universal search over applications, modes, pages, commands and settings. Emits $ot.ui.explorer.open. Does nothing when the explorer is already open.',
	metadata: { addon: 'ui.explorer' },
	in: {},
	out: {},
	callback: function(properties, resolve)
	{
		const changed = $ot.ui.explorer.Fn('open');

		if(!changed)
		{
			return resolve({}, 'Explorer is already open.');
		}

		resolve({}, 'Explorer opened.');
	}
});
