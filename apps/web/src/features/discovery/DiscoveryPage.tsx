"use client";

import { useFetchFeedQuery, useSwipeMutation } from "@/shared/api";
import { useMedia } from "@/shared/hooks";
import { SwipeStack } from "@signalvc/ui";
import { useAnonymousAuth } from "./hooks/useAnonymousAuth";

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
              useSwipeMutation={useSwipeMutation}
              useMedia={useMedia}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
