"use client";

import { useAnonymousAuth } from "./hooks/useAnonymousAuth";
import {
  useFetchFeedQuery,
  useSwipeBearMutation,
  useSwipeBullMutation,
  useSwipePortfolioMutation,
} from "./api/feedApi";
import { SwipeStack } from "@signalvc/ui/src/components/SwipeStack/index.web";
import useMedia from "./hooks/useMedia";

export default function DiscoveryPage() {
  const { loading } = useAnonymousAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white ">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen text-white ">
      <div className="py-10 h-full ">
        <div className="max-w-120 mx-auto  h-full grid grid-rows-12">
          <div className="row-span-11">
            <SwipeStack
              onFetchFeed={useFetchFeedQuery}
              useSwipeBearMutation={useSwipeBearMutation}
              useSwipeBullMutation={useSwipeBullMutation}
              useSwipePortfolioMutation={useSwipePortfolioMutation}
              useMedia={useMedia}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
