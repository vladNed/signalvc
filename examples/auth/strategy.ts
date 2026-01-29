import type { SupabaseClient } from '@supabase/supabase-js';
import { redirect } from 'react-router';
import { AUTH_CALLBACK_URL, HOSTNAME_URL, VERIFY_CALLBACK_URL } from '~/config';
import { checkEmail } from './utils';
import type { AuthStrategy } from '~/lib/types';

/**
 * GoogleAuthStrategy implements the AuthStrategy interface
 * for handling Google OAuth sign-in using Supabase.
 */
export class GoogleAuthStrategy implements AuthStrategy {
  constructor(
    private supabase: SupabaseClient,
    private headers: Headers,
  ) {}

  async signIn(): Promise<Response> {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${HOSTNAME_URL}${AUTH_CALLBACK_URL}`,
      },
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return redirect(data.url, { headers: this.headers });
  }
}

/**
 * EmailAuthStrategy implements the AuthStrategy interface
 * for handling email-based sign-in using Supabase.
 * It checks the validity of the email before sending the OTP.
 */
export class EmailAuthStrategy implements AuthStrategy {
  constructor(
    private supabase: SupabaseClient,
    private email: string,
    private headers: Headers,
  ) {}

  async signIn(): Promise<Response> {
    const emailCheck = await checkEmail(this.email);
    if (!emailCheck) {
      return Response.json({ error: 'Invalid email' }, { status: 400 });
    }
    const { error } = await this.supabase.auth.signInWithOtp({
      email: this.email,
      options: { shouldCreateUser: true },
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return redirect(`${VERIFY_CALLBACK_URL}?email=${this.email}`, {
      headers: this.headers,
    });
  }
}
