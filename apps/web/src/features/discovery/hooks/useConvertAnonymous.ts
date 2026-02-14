"use client";

import { createClient } from "@/shared/supabase/client";
import { useState } from "react";

export const useConvertAnonymous = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const convertToEmail = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        email,
        password,
      });

      if (updateError) {
        setError(updateError.message);
        return false;
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { convertToEmail, loading, error };
};
