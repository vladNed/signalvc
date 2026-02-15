import { NextResponse } from "next/server";
import { createClient } from "@/shared/supabase/server";
import type { EmailOtpType, User } from "@supabase/supabase-js";

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
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  const supabase = await createClient();

  if (!tokenHash || !type) {
    return NextResponse.redirect(`${origin}/auth?error=auth_callback_failed`);
  }

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as EmailOtpType
    });

    if (error) {
      return NextResponse.redirect(`${origin}/auth?error=auth_callback_failed`);
    }

    const user = data.user;
    if (!user) {
      return NextResponse.redirect(`${origin}/feed`);
    }

    const { error: updateProfileError } = await supabase
      .from("profile")
      .upsert({
        id: user.id,
        name: getUserName(user),
        email: getUserEmail(user),
        user_id: user.id,
      }, { onConflict: "id" })
      .select("id");

    if (updateProfileError) {
      console.error("Failed to upsert user profile:", updateProfileError);
    } 

    return NextResponse.redirect(`${origin}/feed`);
  } catch (error) {
    console.error("Error during OTP verification:", error);
  }

  return NextResponse.redirect(`${origin}/auth?token_hash=${tokenHash}&type=${type}`);

}