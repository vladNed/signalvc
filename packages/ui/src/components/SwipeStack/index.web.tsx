import type { TypedUseMutation, TypedUseQuery } from "@reduxjs/toolkit/query/react";
import type { Startup, SwipeType } from "@signalvc/types";
import { MoveLeft, MoveRight, MoveUp } from "lucide-react";
import React, { useState } from "react";
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

const SwipeStack = React.forwardRef<HTMLDivElement, SwipeStackProps>(
  ({ onFetchFeed, useSwipeMutation, useMedia }, ref) => {
    const [animatingDirection, setAnimatingDirection] = useState<SwipeType | null>(null);
    const { isGoldenStartup } = useGolderCard();
    const { data: startups, isLoading } = onFetchFeed();
    const { isDesktop } = useMedia();
    const { handleSwipeAnimation, onSwipeHandler } = useSwipe(
      setAnimatingDirection,
      useSwipeMutation,
    );

    if (isLoading) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-white text-lg">Loading...</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center w-full max-w-lg mx-auto h-full py-4">
        <div className="relative w-full h-full">
          {!startups || startups.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0e] rounded-2xl p-8 text-center shadow-lg shadow-black/40">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-white mb-2">All Done!</h2>
              <p className="text-neutral-400 mb-6">You&apos;ve reviewed all startups</p>
              <button className="cursor-pointer px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
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
                      index === 0 && startups[1] ? isGoldenStartup(startups[1]) : false
                    }
                    hoverDirection={index === 0 ? animatingDirection : null}
                  />
                </div>
              );
            })
          )}
        </div>

        {isDesktop && (
          <div className="grid items-center justify-center gap-4 mt-6 grid-cols-12 w-full h-20">
            <Button
              className="cursor-pointer hover:bg-sentiment-bear/40 flex-col text-sentiment-bear col-span-3 bg-sentiment-bear/30 border border-sentiment-bear rounded-lg items-center flex justify-center h-full"
              onClick={() => onSwipeHandler(startups![0].id, "bear")}
              variant="feed"
            >
              <p>BEAR</p>
              <MoveLeft size={16} />
            </Button>
            <Button
              className="cursor-pointer hover:bg-sentiment-portfolio/40 flex-col text-sentiment-portfolio col-span-6 bg-sentiment-portfolio/30 border border-sentiment-portfolio rounded-lg items-center flex justify-center h-full"
              onClick={() => onSwipeHandler(startups![0].id, "portfolio")}
              variant="feed"
            >
              <MoveUp size={16} />
              <p>SAVE</p>
            </Button>
            <Button
              className="cursor-pointer hover:bg-sentiment-bull/40 flex-col text-sentiment-bull col-span-3 bg-sentiment-bull/30 border border-sentiment-bull rounded-lg items-center flex justify-center h-full"
              onClick={() => onSwipeHandler(startups![0].id, "bull")}
              variant="feed"
            >
              <p>BULL</p>
              <MoveRight size={16} />
            </Button>
          </div>
        )}
      </div>
    );
  },
);

export { SwipeStack };
