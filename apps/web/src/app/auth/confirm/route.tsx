import { upsertProfile } from "@/features/auth";
import { createClient } from "@/shared/supabase/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

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
      type: type as EmailOtpType,
    });

    if (error) {
      console.error("OTP verification failed:", error);
      return NextResponse.redirect(`${origin}/auth?error=auth_callback_failed`);
    }

    const user = data.user;
    if (!user) {
      return NextResponse.redirect(`${origin}/feed`);
    }

    await upsertProfile(supabase, user);

    return NextResponse.redirect(`${origin}/feed`);
  } catch (error) {
    console.error("Error during OTP verification:", error);
  }

  return NextResponse.redirect(`${origin}/auth?token_hash=${tokenHash}&type=${type}`);
}
