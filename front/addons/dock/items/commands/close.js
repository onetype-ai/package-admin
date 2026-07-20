commands.Item({
	id: 'ui:dock:close',
	exposed: true,
	description: 'Close the open dock item. Persists the state and emits $ot.ui.dock.close. Does nothing when no item is open.',
	metadata: { addon: 'ui.dock' },
	in: {},
	out: {},
	callback: function(properties, resolve)
	{
		const changed = $ot.ui.dock.Fn('close');

		if(!changed)
		{
			return resolve({}, 'No dock item is open, nothing to close.');
		}

		resolve({}, 'Dock item closed.');
	}
});
