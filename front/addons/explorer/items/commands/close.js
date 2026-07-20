admin.explorer.CommandAdd({
	id: 'close',
	exposed: true,
	description: 'Close the explorer. Emits admin.explorer.close through the overlay teardown. Does nothing when the explorer is already closed.',
	in: {},
	out: {},
	callback: function(properties, resolve)
	{
		const changed = admin.explorer.close();

		if(!changed)
		{
			return resolve({}, 'Explorer is already closed.');
		}

		resolve({}, 'Explorer closed.');
	}
});
