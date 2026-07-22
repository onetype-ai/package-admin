onetype.AddonReady('commands', (commands) =>
{
	commands.Item({
		id: 'admin:explorer:open',
		metadata: { addon: 'admin.explorer' },
		exposed: true,
		description: 'Open the explorer, the universal search over applications, modes, pages, commands and settings. Emits admin.explorer.open. Does nothing when the explorer is already open.',
		in: {},
		out: {},
		callback: function(properties, resolve)
		{
			const changed = admin.explorer.open();

			if(!changed)
			{
				return resolve({}, 'Explorer is already open.');
			}

			resolve({}, 'Explorer opened.');
		}
	});
});
