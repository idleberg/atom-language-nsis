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

  async reveal(target: string): Promise<void> {
    try {
      await this.browse({
        action: 'reveal',
        target
      });
    } catch (error) {
      const missingPackageWarning = (await import('../util')).missingPackageWarning;
      missingPackageWarning('browse');
    }
  }
};
