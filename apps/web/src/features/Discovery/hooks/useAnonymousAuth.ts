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

      return data.user;
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  return { ensureAuth, loading };
}
