import { FeedApiClient } from "@signalvc/services";
import { SwipeDirection } from "@signalvc/types";
import { SupabaseClient } from "@supabase/supabase-js";

const useFeedClient = (baseUrl: string, supabse: SupabaseClient) => {
  const feedClient = new FeedApiClient(baseUrl, supabse);

  async function feedSwipe(startupId: string, swipeType: SwipeDirection) {
    try {
      await feedClient.feedSwipe(startupId, swipeType);
    } catch (error) {
      console.error("Error swiping on feed:", error);
      throw error;
    }
  }

  async function feedSwipeBulk(
    swipes: Array<{ startupId: string; swipeType: SwipeDirection}>,
  ) {
    try {
      await feedClient.feedSwipeBulk(swipes);
    } catch (error) {
      console.error("Error bulk swiping on feed:", error);
      throw error;
    }
  }

  return { feedSwipe, feedSwipeBulk };
};

export { useFeedClient };
