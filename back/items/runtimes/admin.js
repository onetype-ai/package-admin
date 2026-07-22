import runtimes from '@onetype/platform/runtimes';

runtimes.Item({
	id: 'admin',
	name: 'Admin',
	description: 'The universal workspace runtime. Loads the shell with dock, navbar, dashboard and every application. The place a user starts from.',
	domain: '*',
	path: '/admin'
});
