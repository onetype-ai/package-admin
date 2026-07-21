import html from '@onetype/framework/html';

html.Item({
	id: 'geist',
	tag: 'link',
	position: 'head',
	order: 89,
	attributes: {
		rel: 'stylesheet',
		defer: true,
		href: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap'
	},
	condition: function()
	{
		return this.http.state.runtime !== 'website';
	}
});
