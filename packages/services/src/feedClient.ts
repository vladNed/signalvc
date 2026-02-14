import { BaseApiClient } from "@services/index";
import { SwipeDirection, SwipeResponse } from "@signalvc/types";
import { SupabaseClient } from "@supabase/supabase-js";

class FeedApiClient extends BaseApiClient {
  readonly swipeEndpoint = "/feed/swipe";

  constructor(baseUrl: string, authClient: SupabaseClient) {
    super(baseUrl, authClient);
  }

  async feedSwipe(startupId: string, swipeType: SwipeDirection): Promise<void> {
    await this.request<SwipeResponse>(this.swipeEndpoint, {
      method: "POST",
      body: { startupId, swipeType },
    });
  }
}

export { FeedApiClient };
