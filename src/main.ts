import { NSISLanguageClient } from './client.ts';
import { schema } from './config.ts';

// Pulsar looks the services up on the module, not on the client instance, so the
// client *is* the module. Everything but `config` comes off its prototype.
export default Object.assign(new NSISLanguageClient(), { config: schema });
