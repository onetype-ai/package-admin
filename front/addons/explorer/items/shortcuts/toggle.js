onetype.AddonReady('shortcuts', (shortcuts) =>
{
	shortcuts.Item({
		id: 'explorer-toggle',
		name: 'Toggle Explorer',
		group: 'Explorer',
		description: 'Opens and closes the universal search.',
		key: 'meta+e',
		callback: () => commands.Fn('run', 'admin:explorer:toggle')
	});
});
