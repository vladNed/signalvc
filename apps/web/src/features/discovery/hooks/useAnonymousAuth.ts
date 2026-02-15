"use client";

import { createClient } from "@/shared/supabase/client";
import { useEffect, useState } from "react";

export const useAnonymousAuth = () => {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkAnonUser = async () => {
      setLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signInAnonymously();

        if (error) {
          console.error("Failed to create anonymous user:", error);
          throw error;
        }

        if (!data.user) {
          throw new Error("Failed to create anonymous user");
        }

        // Create profile for the anonymous user
        const { error: profileError } = await supabase.from("profile").insert({
          id: data.user.id,
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
    };

    checkAnonUser().catch((error) => {
      console.error("Unexpected error during anonymous authentication:", error);
      setLoading(false);
    });
  }, [supabase]);

  return { loading };
};
