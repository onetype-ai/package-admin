admin.explorer.ElementAdd({
	id: 'trigger',
	icon: 'search',
	name: 'Explorer Trigger',
	description: 'Search pill in the navbar that opens the explorer.',
	category: 'Explorer',
	config: {
		background: {
			type: 'number',
			value: 1,
			options: [0, 1, 2, 3],
			description: 'Background depth of the pill. 0 renders transparent, without background or borders.'
		}
	},
	render: function()
	{
		this.open = () =>
		{
			admin.explorer.Command('open');
		};

		return `
			<div :class="'box bg-' + background" ot-click="open">
				<i>keyboard_command_key</i>
				<span>Search...</span>
			</div>
		`;
	}
});
