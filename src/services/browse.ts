import { Disposable } from 'atom';
import { missingPackageWarning } from '@/util';
import Logger from '../log';

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
			await this.browse(target);
		} catch (error) {
			Logger.debug(error);

			missingPackageWarning('browse');
		}
	},
};
