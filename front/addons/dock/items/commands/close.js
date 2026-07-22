onetype.AddonReady('commands', (commands) =>
{
	commands.Item({
		id: 'admin:dock:close',
		metadata: { addon: 'admin.dock' },
		exposed: true,
		description: 'Close the open dock item. Persists the state and emits admin.dock.close. Does nothing when no item is open.',
		in: {},
		out: {},
		callback: function(properties, resolve)
		{
			const changed = admin.dock.close();

			if(!changed)
			{
				return resolve({}, 'No dock item is open, nothing to close.');
			}

			resolve({}, 'Dock item closed.');
		}
	});
});
