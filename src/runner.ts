import { isLoadedAndActive } from './util';

function setRunner(): void {
  if (!hasAtomRunner()) {
    atom.beep();

    return;
  }

  const notification = atom.notifications.addInfo('Do you want to set `makensis` as the default runner for NSIS files?', {
    dismissable: true,
    buttons: [
      {
        text: 'Set makensis',
        onDidClick() {
          notification.dismiss();
          atom.config.set('runner.scopes.nsis', 'makensis -');

          return;
        }
      },
      {
        text: 'Cancel',
        onDidClick() {
          atom.beep();
          notification.dismiss();

          return;
        }
      }
    ]
  });
}

function unsetRunner(): void {
  if (!hasAtomRunner()) {
    atom.beep();

    return;
  }

  const notification = atom.notifications.addWarning('Do you want to unset `makensis` as the default runner for NSIS files?', {
    dismissable: true,
    buttons: [
      {
        text: 'Unset makensis',
        onDidClick() {
          notification.dismiss();
          atom.config.unset('runner.scopes.nsis');

          return;
        }
      },
      {
        text: 'Cancel',
        onDidClick() {
          notification.dismiss();
          atom.beep();

          return;
        }
      }
    ]
  });
}

function hasAtomRunner(): boolean {
  return isLoadedAndActive('atom-runner');
}

export {
  setRunner,
  unsetRunner
}
