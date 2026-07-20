admin.explorer.CommandAdd({
	id: 'toggle',
	exposed: true,
	silent: true,
	description: 'Toggle the explorer. Flips the current state through ui:explorer:open or ui:explorer:close.',
	in: {},
	out: {
		open: {
			type: 'boolean',
			description: 'Whether the explorer is open now.'
		}
	},
	callback: async function(properties, resolve)
	{
		const open = admin.navbar.opened()?.Get('id') !== 'explorer';

		await admin.explorer.Command(open ? 'open' : 'close');

		resolve({ open }, 'Explorer is now ' + (open ? 'open' : 'closed') + '.');
	}
});
