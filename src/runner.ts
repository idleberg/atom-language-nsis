export default {
  set(): void {
    if (!this.hasAtomRunner()) {
      atom.beep();

      return;
    }

    const notification = atom.notifications.addInfo("Do you want to set `makensis` as the default runner for NSIS files?", {
      dismissable: true,
      buttons: [
        {
          text: "Set makensis",
          onDidClick() {
            atom.config.set("runner.scopes.nsis", "makensis -");
            notification.dismiss();

            return;
          }
        },
        {
          text: "Cancel",
          onDidClick() {
            atom.beep();
            notification.dismiss();

            return;
          }
        }
      ]
    });
  },

  unset(): void {
    if (!this.hasAtomRunner()) {
      atom.beep();

      return;
    }

    const notification = atom.notifications.addWarning("Do you want to unset `makensis` as the default runner for NSIS files?", {
      dismissable: true,
      buttons: [
        {
          text: "Unset makensis",
          onDidClick() {
            atom.config.unset("runner.scopes.nsis");
            notification.dismiss();

            return;
          }
        },
        {
          text: "Cancel",
          onDidClick() {
            atom.beep();
            notification.dismiss();

            return;
          }
        }
      ]
    });
  },

  hasAtomRunner(): boolean {
    return atom.packages.isPackageLoaded("atom-runner")
  }
}
