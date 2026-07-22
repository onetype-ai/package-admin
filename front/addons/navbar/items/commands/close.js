onetype.AddonReady('commands', (commands) =>
{
	commands.Item({
		id: 'admin:navbar:close',
		metadata: { addon: 'admin.navbar' },
		exposed: true,
		description: 'Close the open navbar item popup. Tracks the state and emits admin.navbar.close. Does nothing when no item is open.',
		in: {},
		out: {},
		callback: function(properties, resolve)
		{
			const open = admin.navbar.StoreGet('open');

			if(!admin.navbar.close())
			{
				return resolve({}, 'No navbar item is open, nothing to close.');
			}

			resolve({}, 'Navbar item ' + open + ' closed.');
		}
	});
});
