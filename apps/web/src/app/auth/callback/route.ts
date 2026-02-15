import { createClient } from "@/shared/supabase/server";
import type { User } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const getUserName = (user: User): string => {
  if (user.user_metadata.full_name) {
    return user.user_metadata.full_name as string;
  } else {
    return user.email ?? "Unknown User";
  }
};

const getUserEmail = (user: User): string => {
  if (user.email) {
    return user.email;
  } else if (user.user_metadata.email) {
    return user.user_metadata.email as string;
  }

  return `temp@email.com`;
};

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/feed";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const user = data.user;
      const { error } = await supabase
        .from("profile")
        .upsert({
          id: user.id,
          name: getUserName(user),
          email: getUserEmail(user),
          user_id: user.id,
        }, { onConflict: "id" })
        .select("id");
        

      if (error) {
        console.error("Failed to upsert user profile:", error);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If code exchange fails, redirect back to auth page with error
  return NextResponse.redirect(`${origin}/auth?error=auth_callback_failed`);
}
