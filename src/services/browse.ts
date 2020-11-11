import { Disposable } from 'atom';
import { missingPackageWarning } from '../util';

export default {
  browse: null,

  consumer(browse: unknown): Disposable {
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
      missingPackageWarning('browse');
    }
  },

  async reveal(target: string): Promise<void> {
    try {
      await this.browse({
        action: 'reveal',
        target
      });
    } catch (error) {
      missingPackageWarning('browse');
    }
  }
};
