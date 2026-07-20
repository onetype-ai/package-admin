config.Item({
	key: 'admin.modes.active',
	description: 'IDs of the active modes. More than one can be active at a time, only the visible one is the current mode.',
	value: [],
	config: {
		type: 'array',
		value: [],
		each: {
			type: 'string',
			description: 'ID of one active mode.'
		},
		description: 'IDs of the active modes. More than one can be active at a time, only the visible one is the current mode.'
	}
});
