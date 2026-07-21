onetype.AddonReady('shortcuts', (shortcuts) =>
{
	shortcuts.Item({
		id: 'explorer-toggle',
		name: 'Toggle Explorer',
		group: 'Explorer',
		description: 'Opens and closes the universal search.',
		key: 'meta+e',
		callback: () => admin.explorer.Command('toggle')
	});
});
