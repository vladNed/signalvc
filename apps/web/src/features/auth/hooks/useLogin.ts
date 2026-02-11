"use client";

import { createClient } from "@/shared/supabase/client";
import type { OAuthProvider } from "@signalvc/types";
import { useState } from "react";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  async function signInWithPassword(email: string, password: string) {
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return false;
    }

    setLoading(false);
    return true;
  }

  async function signUpWithPassword(email: string, password: string) {
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return false;
    }

    setLoading(false);
    return true;
  }

  async function signInWithOAuth(provider: OAuthProvider) {
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    }
  }

  return { signInWithPassword, signUpWithPassword, signInWithOAuth, loading, error };
}
