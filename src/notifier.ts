import config from './config';

export function featureNotifier(): void {
	localStorage.getItem('language-nsis:formatterNotified') || false;

	if (
		(config.get('formatter.formatOnSave') as unknown as boolean) === false &&
		!localStorage.getItem('language-nsis:formatterNotified')
	) {
		const notification = atom.notifications.addInfo(
			'The NSIS package can now automatically format your code on save. You can enable this feature in the package settings.',
			{
				dismissable: true,
				buttons: [
					{
						text: 'Open Settings',
						onDidClick() {
							atom.workspace.open('atom://config/packages/language-nsis', {
								pending: true,
								searchAllPanes: true,
							});

							notification.dismiss();
						},
					},
					{
						text: 'Dismiss',
						onDidClick() {
							localStorage.setItem('language-nsis:formatterNotified', 'true');
							notification.dismiss();

							return;
						},
					},
				],
			},
		);
	}
}
