"use client";

import { createClient } from "@/shared/supabase/client";
import type { OAuthProvider } from "@signalvc/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
  
export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const supabase = createClient();

  async function signInWithEmail() {
    setLoading(true);
    setError(null);

    try {
      // Check if there's an existing anonymous session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user.is_anonymous) {
        // Convert anonymous user to email user by updating with email
        // This sends a verification email/OTP
        const { error: updateError } = await supabase.auth.updateUser({ email });
        
        if (updateError) {
          setError(updateError.message);
          setLoading(false);
          return;
        }
        
        console.log("Verification email sent to convert anonymous user");
      } else {
        // Regular email OTP sign in for new or existing users
        const { error: otpError } = await supabase.auth.signInWithOtp({
          email,
          options: { shouldCreateUser: true },
        });
        
        if (otpError) {
          setError(otpError.message);
          setLoading(false);
          return;
        }
      }
      
      setLoading(false);
      router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      setLoading(false);
    }
  }

  async function signInWithOAuth(provider: OAuthProvider) {
    setLoading(true);
    setError(null);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      const user = session.user;
      if (user.is_anonymous) {
        const { data, error } = await supabase.auth.linkIdentity({
          provider,
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) {
          setError(error.message);
          setLoading(false);
          return;
        }
        console.log("Redirect to provider for OAuth linking:", data.url);
        window.location.href = data.url;
        return;
      }
    }

    const { data, error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }
    window.location.href = data.url;
  }

  return { signInWithEmail, signInWithOAuth, loading, error, email, setEmail };
}
