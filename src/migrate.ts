import { PACKAGE_NAME } from './config.ts';
import { openPackageSettings } from './makensis.ts';
import { MIGRATIONS, SOURCE_PACKAGE } from './migrations.mts';

/**
 * Set once the settings have been carried over. Deliberately absent from the
 * schema, so it stays out of the settings view and is only ever seen in
 * `config.cson`.
 */
const MIGRATED_KEY = `${PACKAGE_NAME}.settingsMigrated`;

/**
 * Copies `language-nsis` 11.x settings onto their new names. Pulsar namespaces
 * configuration by package id, so nothing is inherited by installing this
 * package — without this, a user with a configured compiler path silently gets
 * the defaults instead.
 *
 * The old keys are copied, never removed: `language-nsis` may still be installed
 * (the two cannot run together, but one is a reinstall away) and its settings
 * are not this package's to delete.
 */
export function migrateSettings(): string[] {
	if (atom.config.get(MIGRATED_KEY) === true) {
		return [];
	}

	// Only what the user actually wrote. Reading the resolved value would hand
	// back the old package's schema defaults when it is installed alongside.
	const userSettings = { sources: [atom.config.getUserConfigPath()] };
	const migrated: string[] = [];

	for (const { from, to, map } of MIGRATIONS) {
		const value = atom.config.get(`${SOURCE_PACKAGE}.${from}`, userSettings);

		if (value === undefined) {
			continue;
		}

		const next = map ? map(value) : value;

		// A value already set under the new name is the deliberate one, so it is
		// never overwritten by the old key.
		if (next === undefined || atom.config.get(`${PACKAGE_NAME}.${to}`, userSettings) !== undefined) {
			continue;
		}

		atom.config.set(`${PACKAGE_NAME}.${to}`, next);
		migrated.push(from);
	}

	// Set even when nothing moved, so a fresh install does not re-scan on every
	// launch, and a setting reset to its default is not resurrected.
	atom.config.set(MIGRATED_KEY, true);

	if (migrated.length) {
		atom.notifications.addInfo(
			`Migrated ${migrated.length} setting${migrated.length === 1 ? '' : 's'} from ${SOURCE_PACKAGE}`,
			{
				description: migrated.map((key) => `- \`${key}\``).join('\n'),
				buttons: [{ text: 'Open Settings', onDidClick: () => void openPackageSettings() }],
			},
		);
	}

	return migrated;
}
