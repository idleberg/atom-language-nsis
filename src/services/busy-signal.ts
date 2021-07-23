import { Disposable } from 'atom';

export default {
  busySignal: null,
  serviceName: 'busy-signal',

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  consumer(registry: any): Disposable {
    this.busySignal = registry.create();

    return new Disposable(() => {
      this.busySignal = null;
    });
  },

  async add(message: string): Promise<void> {
    try {
      this.busySignal.add(message);
    } catch (error) {
      const missingPackageWarning = (await import('../util')).missingPackageWarning;
      missingPackageWarning(this.serviceName);
    }
  },

  async remove(message = ''): Promise<void> {
    try {
      this.busySignal.remove(message);
    } catch (error) {
      const missingPackageWarning = (await import('../util')).missingPackageWarning;
      missingPackageWarning(this.serviceName);
    }
  },

  async clear(): Promise<void> {
    try {
      this.busySignal.clear();
    } catch (error) {
      const missingPackageWarning = (await import('../util')).missingPackageWarning;
      missingPackageWarning(this.serviceName);
    }
  },

  dispose(): void {
    try {
      this.busySignal.dispose();
    } catch (error) {
      console.error(error);
    }
  }
};
