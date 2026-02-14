import { FeedApiClient } from "@signalvc/services";
import { SupabaseClient } from "@supabase/supabase-js";

const useFeedClient = (baseUrl: string, supabse: SupabaseClient) => {
  const feedClient = new FeedApiClient(baseUrl, supabse);

  async function feedSwipe(startupId: string, swipeType: "bear" | "bull" | "portofolio") {
    try {
      await feedClient.feedSwipe(startupId, swipeType);
    } catch (error) {
      console.error("Error swiping on feed:", error);
      throw error;
    }
  }

  return { feedSwipe };
};

export { useFeedClient };
