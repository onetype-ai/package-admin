onetype.AddonReady('admin.dock', (dock) =>
{
	dock.Item({
		id: 'apps',
		name: 'All applications',
		icon: 'apps',
		order: 1,
		position: 'bottom',
		panel: {
			title: 'Applications',
			description: 'Switch or launch an application.',
			close: true
		},
		render: '<e-admin-apps-list></e-admin-apps-list>'
	});
});
