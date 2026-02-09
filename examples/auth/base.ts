import type { SupabaseClient } from '@supabase/supabase-js';
import type { AuthStrategy, StrategyOptions } from '~/lib/types';
import { EmailAuthStrategy, GoogleAuthStrategy } from './strategy';
import { AuthType } from '~/lib/enums';

export class AuthStrategyBuilder {
  static build(
    options: StrategyOptions,
    client: SupabaseClient,
    headers: Headers,
  ): AuthStrategy {
    switch (options.type) {
      case AuthType.Google:
        return new GoogleAuthStrategy(client, headers);
      case AuthType.Email:
        return new EmailAuthStrategy(client, options.email!, headers);
      default:
        throw new Error('Invalid authentication strategy type');
    }
  }
}
