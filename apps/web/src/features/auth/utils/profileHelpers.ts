import type { User } from "@supabase/supabase-js";

export const getUserName = (user: User): string => {
  if (user.user_metadata.full_name) {
    return user.user_metadata.full_name as string;
  }
  return user.email ?? "Unknown User";
};

export const getUserEmail = (user: User): string => {
  if (user.email) {
    return user.email;
  }
  if (user.user_metadata.email) {
    return user.user_metadata.email as string;
  }
  return `temp@email.com`;
};
