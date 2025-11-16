export async function setRunner(): Promise<void> {
	if (!(await hasAtomRunner())) {
		atom.beep();

		return;
	}

	const notification = atom.notifications.addInfo(
		'Do you want to set `makensis` as the default runner for NSIS files?',
		{
			dismissable: true,
			buttons: [
				{
					text: 'Set makensis',
					onDidClick() {
						notification.dismiss();
						atom.config.set('runner.scopes.nsis', 'makensis -');

						return;
					},
				},
				{
					text: 'Cancel',
					onDidClick() {
						atom.beep();
						notification.dismiss();

						return;
					},
				},
			],
		},
	);
}

export async function unsetRunner(): Promise<void> {
	if (!(await hasAtomRunner())) {
		atom.beep();

		return;
	}

	const notification = atom.notifications.addWarning(
		'Do you want to unset `makensis` as the default runner for NSIS files?',
		{
			dismissable: true,
			buttons: [
				{
					text: 'Unset makensis',
					onDidClick() {
						notification.dismiss();
						atom.config.unset('runner.scopes.nsis');

						return;
					},
				},
				{
					text: 'Cancel',
					onDidClick() {
						notification.dismiss();
						atom.beep();

						return;
					},
				},
			],
		},
	);
}

async function hasAtomRunner(): Promise<boolean> {
	const { isLoadedAndActive } = await import('./util');

	return isLoadedAndActive('atom-runner');
}
