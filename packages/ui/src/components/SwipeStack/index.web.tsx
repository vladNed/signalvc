import { useState } from "react";
import type { SwipeDirection, Startup } from "@signalvc/types";
import { StartupCard } from "../StartupCard/index.web";
import React from "react";
import { TypedUseMutation, TypedUseQuery } from "@reduxjs/toolkit/query/react";
import { Button } from "../Button/index.web";
import useGolderCard from "./hooks/useGolderCard";
import useSwipe from "./hooks/useSwipe";

type SwipeStackProps = {
  onFetchFeed: TypedUseQuery<Startup[], void, any>;
  useSwipeBullMutation: TypedUseMutation<void, { startupId: string }, any>;
  useSwipeBearMutation: TypedUseMutation<void, { startupId: string }, any>;
  useSwipePortofolioMutation: TypedUseMutation<void, { startupId: string }, any>;
  useMedia: () => {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
};

const SwipeStack = React.forwardRef<HTMLDivElement, SwipeStackProps>(
  (
    {
      onFetchFeed,
      useSwipeBullMutation,
      useSwipeBearMutation,
      useSwipePortofolioMutation,
      useMedia,
    },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animatingDirection, setAnimatingDirection] = useState<SwipeDirection | null>(null);
    const { isGoldenStartup } = useGolderCard();

    const { data: startups, isLoading } = onFetchFeed();
    const { isDesktop } = useMedia();
    const { handleSwipeAnimation } = useSwipe(setAnimatingDirection, setCurrentIndex);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-white text-lg">Loading...</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center w-full max-w-md mx-auto h-full py-4">
        <div className="relative w-full h-full">
          {currentIndex >= startups!.length ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0e] rounded-2xl p-8 text-center shadow-lg shadow-black/40">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-white mb-2">All Done!</h2>
              <p className="text-neutral-400 mb-6">You&apos;ve reviewed all startups</p>
              <button
                onClick={() => {
                  setCurrentIndex(0);
                }}
                className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
              >
                Start Over
              </button>
            </div>
          ) : (
            startups!.map((startup, index) => {
              const getAnimationStyle = () => {
                if (index !== 0 || !animatingDirection) return {};

                const translateX =
                  animatingDirection === "bear" ? -400 : animatingDirection === "bull" ? 400 : 0;
                const translateY = animatingDirection === "portfolio" ? -400 : 0;
                const rotate =
                  animatingDirection === "bear" ? -20 : animatingDirection === "bull" ? 20 : 0;

                return {
                  transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
                  opacity: 0,
                  transition: "all 0.3s ease-out",
                };
              };

              return (
                <div
                  key={startup.id}
                  style={getAnimationStyle()}
                  className={index === 0 ? "absolute inset-0" : ""}
                >
                  <StartupCard
                    startup={startup}
                    onSwipe={index === 0 ? handleSwipeAnimation : () => {}}
                    isTop={index === 0}
                    showBehind={index === 1}
                    isGolden={isGoldenStartup(startup)}
                    nextCardIsGolden={
                      index === 0 && startups![1] ? isGoldenStartup(startups![1]) : false
                    }
                    hoverDirection={index === 0 ? animatingDirection : null}
                  />
                </div>
              );
            })
          )}
        </div>

        {isDesktop && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="default"
              className="px-6 py-2 text-sm font-medium text-sentiment-bear rounded-md border border-sentiment-bear/30 bg-sentiment-bear/10 hover:bg-sentiment-bear/20 hover:border-sentiment-bear/50 backdrop-blur-sm transition-all"
            >
              BEAR
            </Button>
            <Button
              variant="default"
              className="px-6 py-2 text-sm font-medium text-sentiment-portofolio rounded-md border border-sentiment-portofolio/30 bg-sentiment-portofolio/10 hover:bg-sentiment-portofolio/20 hover:border-sentiment-portofolio/50 backdrop-blur-sm transition-all"
            >
              PORTOFOLIO
            </Button>
            <Button
              variant="default"
              className="px-6 py-2 text-sm font-medium text-sentiment-bull rounded-md border border-sentiment-bull/30 bg-sentiment-bull/10 hover:bg-sentiment-bull/20 hover:border-sentiment-bull/50 backdrop-blur-sm transition-all"
            >
              BULL
            </Button>
          </div>
        )}
      </div>
    );
  },
);

export { SwipeStack };
