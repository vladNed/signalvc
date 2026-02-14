"use client";

import { createClient } from "@/shared/supabase/client";
import { useCallback, useState } from "react";

export function useAnonymousAuth() {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const ensureAuth = useCallback(async () => {
    setLoading(true);
    try {
      // Check if user is already authenticated
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // User already exists (anonymous or permanent)
        return user;
      }

      // Create anonymous user
      const { data, error } = await supabase.auth.signInAnonymously();

      if (error) {
        console.error("Failed to create anonymous user:", error);
        throw error;
      }

      if (!data.user) {
        throw new Error("Failed to create anonymous user");
      }

      // Create profile for the anonymous user
      const { error: profileError } = await supabase
        .from("profile")
        .insert({
          name: "Anonymous User",
          email: `anonymous-${data.user.id}@temp.local`,
          user_id: data.user.id,
        });

      if (profileError) {
        console.error("Failed to create profile for anonymous user:", profileError);
        // Don't throw here - user is created, profile creation failure shouldn't block auth
      }

      return data.user;
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  return { ensureAuth, loading };
}
