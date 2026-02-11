export type OAuthProvider = "google" | "apple";

export type AuthUser = {
  id: string;
  email: string;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export type AuthResult = {
  data: { user: AuthUser | null; session: AuthSession | null } | null;
  error: { message: string } | null;
};
