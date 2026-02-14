import { BaseApiClient } from "@services/index";
import { SwipeDirection, SwipeResponse } from "@signalvc/types";

class FeedApiClient extends BaseApiClient {
  readonly swipeEndpoint = "/feed/swipe";

  async feedSwipe(startupId: string, swipeType: SwipeDirection): Promise<void> {
    await this.request<SwipeResponse>(this.swipeEndpoint, {
      method: "POST",
      body: { startupId, swipeType },
    });
  }
}
