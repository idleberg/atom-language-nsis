import { Disposable } from 'atom';

export default {
  browse: null,

  consume(browse: unknown): Disposable {
    this.browse = browse;

    return new Disposable(() => {
      this.browse = null;
    });
  },

  async open(target: string): Promise<void> {
    try {
      await this.browse({
        action: 'open',
        target
      });
    } catch (error) {
      this.missingDependency();
    }
  },

  async reveal(target: string): Promise<void> {
    try {
      await this.browse({
        action: 'reveal',
        target
      });
    } catch (error) {
      this.missingDependency();
    }
  },

  missingDependency(): void {
    const notification = atom.notifications.addError('Missing package dependency `browse`, please install it now.', {
      dismissable: true,
      buttons: [
        {
          text: 'Show Package',
          async onDidClick() {
            notification.dismiss();

            await atom.workspace.open(`atom://config/packages/browse`, {
              pending: true,
              searchAllPanes: true,
            });

            return;
          }
        },
        {
          text: 'Cancel',
          onDidClick() {
            notification.dismiss();

            return;
          }
        }
      ]
    });
  }
};
