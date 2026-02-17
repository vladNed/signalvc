import type { SupabaseClient, User } from "@supabase/supabase-js";
import { getUserEmail, getUserName } from "./profileHelpers";

export async function upsertProfile(supabase: SupabaseClient, user: User) {
  const { error } = await supabase
    .from("profile")
    .upsert(
      {
        id: user.id,
        name: getUserName(user),
        email: getUserEmail(user),
        user_id: user.id,
      },
      { onConflict: "id" },
    )
    .select("id");

  if (error) {
    console.error("Failed to upsert user profile:", error);
  }

  return { error };
}
