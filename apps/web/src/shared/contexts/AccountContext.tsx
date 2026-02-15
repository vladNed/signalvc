"use client";

import type { User } from "@supabase/supabase-js";
import { createClient } from "../supabase/client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AccountContextValue {
  user: User | null;
  loading: boolean;
}

const AccountContext = createContext<AccountContextValue | undefined>(undefined);

export function AccountProvider({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    void fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []); // Empty deps - only run once

  return (
    <AccountContext.Provider value={{ user, loading }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within AccountProvider");
  }
  return context;
}
