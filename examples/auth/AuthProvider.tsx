import { createBrowserClient } from '@supabase/ssr';
import type { User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  supabaseUrl,
  supabaseKey,
}: {
  children: ReactNode;
  supabaseUrl: string;
  supabaseKey: string;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dbClient = createBrowserClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    const init = async () => {
      const { data: userData } = await dbClient.auth.getUser();
      setUser(userData.user);
      setLoading(false);
    };
    init();

    const { data } = dbClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('authentication context not ignited');
  return ctx;
};
