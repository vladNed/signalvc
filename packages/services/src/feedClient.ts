import { BaseApiClient } from "./index";
import { SwipeDirection, SwipeResponse } from "@signalvc/types";
import { SupabaseClient } from "@supabase/supabase-js";

class FeedApiClient extends BaseApiClient {
  readonly swipeEndpoint = "/feed/swipe";
  readonly swipeBulkEndpoint = "/feed/swipe";

  constructor(baseUrl: string, authClient: SupabaseClient) {
    super(baseUrl, authClient);
  }

  async feedSwipe(startupId: string, swipeType: SwipeDirection): Promise<void> {
    await this.request<SwipeResponse>(this.swipeEndpoint, {
      method: "POST",
      body: { startup_id: startupId, swipe_type: swipeType },
    });
  }

  async feedSwipeBulk(swipes: Array<{ startupId: string; swipeType: SwipeDirection }>): Promise<void> {
    await this.request<SwipeResponse>(this.swipeBulkEndpoint, {
      method: "POST",
      body: {
        swipes: swipes.map(({ startupId, swipeType }) => ({
          startup_id: startupId,
          swipe_type: swipeType,
        })),
      },
    });
  }
}

export { FeedApiClient };
