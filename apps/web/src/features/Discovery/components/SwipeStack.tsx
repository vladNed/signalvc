"use client";

import { useState, useCallback } from "react";
import type { Startup } from "../models/startup";
import { StartupCard } from "./StartupCard";
import type { SwipeDirection } from "../hooks/useSwipeGesture";

interface SwipeStackProps {
  startups: Startup[];
}

export function SwipeStack({ startups }: SwipeStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = useCallback(
    (direction: SwipeDirection) => {
      if (!direction || currentIndex >= startups.length) return;
      setCurrentIndex((prev) => prev + 1);
    },
    [currentIndex, startups],
  );

  // Determine if a startup is "golden" - high performing
  const isGoldenStartup = (startup: Startup) => {
    return startup.bullBearScore >= 85 && startup.peerScore >= 90;
  };

  const visibleCards = startups.slice(currentIndex, currentIndex + 2);
  const isComplete = currentIndex >= startups.length;

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto h-full py-4">
      {/* Card Stack Container */}
      <div className="relative w-full h-full">
        {isComplete ? (
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
          visibleCards.map((startup, index) => (
            <StartupCard
              key={startup.id}
              startup={startup}
              onSwipe={
                index === 0
                  ? handleSwipe
                  : () => {
                      /* empty */
                    }
              }
              isTop={index === 0}
              showBehind={index === 1}
              isGolden={isGoldenStartup(startup)}
              nextCardIsGolden={
                index === 0 && visibleCards[1] ? isGoldenStartup(visibleCards[1]) : false
              }
            />
          ))
        )}
      </div>

      {/* Progress Indicator */}
      <div className="text-center text-sm text-neutral-600 mt-4">
        {currentIndex} / {startups.length}
      </div>
    </div>
  );
}
