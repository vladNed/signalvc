import { createClient } from "@/shared/supabase/client";
import { baseApi } from "@signalvc/services";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

const onPrepareHeaders = async (headers: Headers) => {
  const supabase = createClient();
  const response = await supabase.auth.getSession();
  if (!response.data.session) {
    return headers;
  }
  headers.set("Authorization", `Bearer ${response.data.session.access_token}`);
  return headers;
};

export const baseApiInstance = baseApi(`${baseUrl}/api/v1`, onPrepareHeaders);


