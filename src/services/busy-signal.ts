import { Disposable } from 'atom';
import { missingPackageWarning } from '../util';

export default {
  busySignal: null,

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  consumer(registry: any): Disposable {
    this.busySignal = registry.create();

    return new Disposable(() => {
      this.busySignal = null;
    });
  },

  add(message: string): void {
    try {
      this.busySignal.add(message);
    } catch (error) {
      missingPackageWarning('busy-signal');
    }
  },

  remove(): void {
    try {
      this.busySignal.remove();
    } catch (error) {
      missingPackageWarning('busy-signal');
    }
  },

  clear(): void {
    try {
      this.busySignal.clear();
    } catch (error) {
      missingPackageWarning('busy-signal');
    }
  },

  dispose(): void {
    try {
      this.busySignal.dispose();
    } catch (error) {
      missingPackageWarning('busy-signal');
    }
  }
};
