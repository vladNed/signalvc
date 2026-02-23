import type { TypedUseMutation, TypedUseQuery } from "@reduxjs/toolkit/query/react";
import type { Startup, SwipeType } from "@signalvc/types";
import { MoveLeft, MoveRight, MoveUp } from "lucide-react";
import React, { useState, useCallback, useRef } from "react";
import { Button } from "../Button/index.web";
import { StartupCard } from "../StartupCard/index.web";
import useGolderCard from "./hooks/useGolderCard";
import useSwipe from "./hooks/useSwipe";

type SwipeStackProps = {
  onFetchFeed: TypedUseQuery<Startup[], void, any>;
  useSwipeMutation: TypedUseMutation<void, { startupId: string; swipeType: SwipeType }, any>;
  useMedia: () => {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
};

const MAX_VISIBLE = 4;

const STACK_DEPTH = [
  { scale: 1, y: 0, opacity: 1 },
  { scale: 0.96, y: 30, opacity: 1 },
  { scale: 0.92, y: 60, opacity: 0.7 },
  { scale: 0.88, y: 93, opacity: 0.6 },
];

const SwipeStack = React.forwardRef<HTMLDivElement, SwipeStackProps>(
  ({ onFetchFeed, useSwipeMutation, useMedia }, ref) => {
    const [animatingDirection, setAnimatingDirection] = useState<SwipeType | null>(null);
    const swipingRef = useRef(false);
    const { isGoldenStartup } = useGolderCard();
    const { data: startups, isLoading } = onFetchFeed();
    const { isDesktop } = useMedia();
    const { onSwipeHandler } = useSwipe(setAnimatingDirection, useSwipeMutation);

    // Unified handler for both gesture swipes and button clicks
    const handleSwipe = useCallback(
      async (startupId: string, direction: SwipeType) => {
        if (swipingRef.current) return;
        swipingRef.current = true;
        await onSwipeHandler(startupId, direction);
        swipingRef.current = false;
      },
      [onSwipeHandler],
    );

    if (isLoading) {
      return (
        <div className="flex flex-col items-center w-full mx-auto h-full">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-surface-60 backdrop-blur-xl border border-border rounded-2xl overflow-hidden">
              <div className="h-full w-full p-5 md:p-8 space-y-6">
                <div className="h-4 w-32 rounded bg-skeleton animate-shimmer bg-gradient-to-r from-skeleton via-skeleton-shimmer to-skeleton" />
                <div className="h-8 w-48 rounded bg-skeleton animate-shimmer bg-gradient-to-r from-skeleton via-skeleton-shimmer to-skeleton" />
                <div className="space-y-3">
                  <div className="h-4 w-full rounded bg-skeleton animate-shimmer bg-gradient-to-r from-skeleton via-skeleton-shimmer to-skeleton" />
                  <div className="h-4 w-5/6 rounded bg-skeleton animate-shimmer bg-gradient-to-r from-skeleton via-skeleton-shimmer to-skeleton" />
                  <div className="h-4 w-4/6 rounded bg-skeleton animate-shimmer bg-gradient-to-r from-skeleton via-skeleton-shimmer to-skeleton" />
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-20 rounded-full bg-skeleton animate-shimmer bg-gradient-to-r from-skeleton via-skeleton-shimmer to-skeleton" />
                  <div className="h-8 w-16 rounded-full bg-skeleton animate-shimmer bg-gradient-to-r from-skeleton via-skeleton-shimmer to-skeleton" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const visibleCards = startups?.slice(0, MAX_VISIBLE) ?? [];
    const hasCards = startups && startups.length > 0;

    return (
      <div className="flex flex-col  items-center w-full mx-auto h-full">
        <div className="h-full w-full flex items-center justify-center">
          <div className="relative w-full h-180 ">
            {!hasCards ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-60 backdrop-blur-xl border border-border rounded-2xl p-8 text-center">
                <div className="text-5xl mb-5">&#x1f389;</div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  All caught up
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xs">
                  You&apos;ve reviewed every startup in the queue. Check back later for fresh deal
                  flow.
                </p>
                <button className="cursor-pointer px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(97,95,255,0.4)] transition-all duration-300">
                  Refresh Feed
                </button>
              </div>
            ) : (
              // Render cards in reverse order so index 0 paints on top
              [...visibleCards].reverse().map((startup) => {
                const index = visibleCards.indexOf(startup);
                const isTop = index === 0;
                const isAnimatingOut = isTop && animatingDirection !== null;
                const depth = STACK_DEPTH[index] ?? STACK_DEPTH[MAX_VISIBLE - 1];

                // When top card is animating out, promote cards behind by one slot
                const effectiveDepth =
                  !isTop && animatingDirection ? STACK_DEPTH[Math.max(0, index - 1)] : depth;

                // Top card fly-off transform
                const flyOffStyle: React.CSSProperties = isAnimatingOut
                  ? {
                      transform: `translate(${
                        animatingDirection === "bear" ? -500 : animatingDirection === "bull" ? 500 : 0
                      }px, ${animatingDirection === "portfolio" ? -500 : 0}px) rotate(${
                        animatingDirection === "bear" ? -25 : animatingDirection === "bull" ? 25 : 0
                      }deg)`,
                      opacity: 0,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }
                  : {};

                // Stack positioning for non-top cards (or top card when not animating)
                const stackStyle: React.CSSProperties = !isAnimatingOut
                  ? {
                      transform: `scale(${effectiveDepth.scale}) translateY(${effectiveDepth.y}px)`,
                      opacity: effectiveDepth.opacity,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }
                  : {};

                return (
                  <div
                    key={startup.id}
                    className="absolute inset-0"
                    style={{
                      zIndex: MAX_VISIBLE - index,
                      ...stackStyle,
                      ...flyOffStyle,
                    }}
                  >
                    <StartupCard
                      startup={startup}
                      onSwipe={isTop ? (dir: SwipeType) => handleSwipe(startup.id, dir) : () => {}}
                      isTop={isTop}
                      showBehind={index > 0 && index < MAX_VISIBLE}
                      isGolden={isGoldenStartup(startup)}
                      nextCardIsGolden={isTop && startups![1] ? isGoldenStartup(startups![1]) : false}
                      hoverDirection={isTop ? animatingDirection : null}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {isDesktop && hasCards && (
          <div className="grid items-center justify-center gap-4 mt-6 grid-cols-12 w-full h-20">
            <Button
              className="group cursor-pointer flex-col text-sentiment-bear col-span-3 bg-red-500/10 border border-red-500/30 rounded-xl items-center flex justify-center h-full hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:scale-[1.02] transition-all duration-200"
              onClick={() => handleSwipe(startups![0].id, "bear")}
              variant="feed"
            >
              <p className="font-bold">BEAR</p>
              <MoveLeft size={16} />
            </Button>
            <Button
              className="group cursor-pointer flex-col text-sentiment-portfolio col-span-6 bg-primary/10 border border-primary/30 rounded-xl items-center flex justify-center h-full hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(97,95,255,0.2)] hover:scale-[1.02] transition-all duration-200"
              onClick={() => handleSwipe(startups![0].id, "portfolio")}
              variant="feed"
            >
              <MoveUp size={16} />
              <p className="font-bold">SAVE</p>
            </Button>
            <Button
              className="group cursor-pointer flex-col text-sentiment-bull col-span-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl items-center flex justify-center h-full hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-[1.02] transition-all duration-200"
              onClick={() => handleSwipe(startups![0].id, "bull")}
              variant="feed"
            >
              <p className="font-bold">BULL</p>
              <MoveRight size={16} />
            </Button>
          </div>
        )}
      </div>
    );
  },
);

export { SwipeStack };
