"use client";

import { BriefcaseBusiness, House, User } from "lucide-react";
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
      <div className="h-screen flex items-center justify-center text-white bg-linear-to-b from-[#000A2E] to-[#010411]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen text-white bg-linear-to-b from-[#000A2E] to-[#010411]">
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
          <div className="row-span-1 flex items-center justify-center gap-6">
            {/* TODO: Change this to browser design menu */}
            <div className="border rounded-full flex gap-12 justify-between px-8 py-4 border-[#06123D] bg-[#06123D66]">
              <div className="flex flex-col items-center text-xs gap-1 text-white cursor-pointer">
                <House size={20} />
                Feed
              </div>
              <div className="flex flex-col items-center text-xs gap-1 text-muted-foreground cursor-not-allowed blur-xs">
                <BriefcaseBusiness size={20} />
                Portfolio
              </div>
              <div className="flex flex-col items-center text-xs gap-1 text-muted-foreground cursor-not-allowed blur-xs">
                <User size={20} />
                Profile
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
