"use client";

import { useFetchFeedQuery, useSwipeMutation } from "@/shared/api";
import { useMedia } from "@/shared/hooks";
import { SwipeStack } from "@signalvc/ui";
import { motion } from "motion/react";
import { FeedBackground } from "./components/FeedBackground";

export function FeedPage() {
  return (
    <div className="h-full text-foreground relative md:overflow-hidden">
      <FeedBackground />
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-full px-3 py-3 md:px-0 md:py-10"
      >
        <div className="max-w-lg mx-auto h-full">
          <SwipeStack
            onFetchFeed={useFetchFeedQuery}
            useSwipeMutation={useSwipeMutation}
            useMedia={useMedia}
          />
        </div>
      </motion.div>
    </div>
  );
}
