import * as React from "react";
import type { Startup, SwipeDirection } from "@signalvc/types";
import { useSwipeGesture } from "@signalvc/hooks";

interface StartupCardProps {
  startup: Startup;
  onSwipe: (direction: SwipeDirection) => void;
  isTop?: boolean;
  showBehind?: boolean;
  isGolden?: boolean;
  nextCardIsGolden?: boolean;
  hoverDirection?: SwipeDirection | null;
}

const getScoreColor = (score: number) => {
  if (score >= 70) return "text-emerald-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
};

const getSentimentColor = (sentiment: string) => {
  if (sentiment.includes("Very Bullish") || sentiment.includes("Bullish"))
    return "text-emerald-400";
  if (sentiment.includes("Neutral")) return "text-yellow-400";
  return "text-red-400";
};

const StartupCard = React.forwardRef<HTMLDivElement, StartupCardProps>(
  (
    {
      startup,
      onSwipe,
      isTop = false,
      showBehind = false,
      isGolden = false,
      nextCardIsGolden = false,
      hoverDirection = null,
    },
    ref,
  ) => {
    const { handlers, isDragging, offset, rotation } = useSwipeGesture({
      onSwipe,
      threshold: 100,
    });

    const transform = isDragging
      ? `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg)`
      : "translate(0, 0) rotate(0deg)";

    const opacity = isDragging ? 1 - Math.abs(offset.x) / 900 : 1;

    const formatCurrency = (value: number) => {
      if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`;
      if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
      return `$${value.toLocaleString()}`;
    };

    return (
      <div
        ref={ref}
        className={`absolute inset-0 cursor-grab active:cursor-grabbing select-none ${!isDragging ? "transition-[transform,opacity] duration-300 ease-out" : ""} ${isTop ? "z-10" : "z-1"} ${!isTop && !showBehind ? "opacity-0 pointer-events-none" : ""} ${nextCardIsGolden && isTop ? "overflow-visible" : ""}`}
        style={{
          transform,
          opacity: isTop || showBehind ? Math.max(opacity, 0.3) : 0,
        }}
        {...handlers}
      >
        {nextCardIsGolden && isTop && (
          <div className="absolute -inset-2 rounded-lg bg-gradient-to-b from-yellow-500/20 to-amber-600/20 blur-xl animate-pulse pointer-events-none -z-10" />
        )}

        <div
          className={`relative h-full w-full rounded-lg overflow-hidden ${
            isGolden
              ? "bg-gradient-to-b from-startupCard-goldenFrom to-startupCard-goldenTo border-2 border-startupCard-goldenBorder shadow-golden"
              : "bg-gradient-to-b from-startupCard-darkFrom to-startupCard-darkTo border border-startupCard-border shadow-dark"
          }`}
        >
          {(isDragging || hoverDirection) && (
            <>
              {(hoverDirection === "bear" || (isDragging && offset.x < -50)) && (
                <div className="absolute inset-0 flex items-center justify-center bg-sentiment-bear/30 pointer-events-none z-50">
                  <span className="text-6xl font-bold text-sentiment-bear rotate-12">BEAR</span>
                </div>
              )}
              {(hoverDirection === "bull" || (isDragging && offset.x > 50)) && (
                <div className="absolute inset-0 flex items-center justify-center bg-sentiment-bull/30 pointer-events-none z-50">
                  <span className="text-6xl font-bold text-sentiment-bull -rotate-12">BULL</span>
                </div>
              )}
              {(hoverDirection === "portofolio" ||
                (isDragging && offset.y < -50 && Math.abs(offset.y) > Math.abs(offset.x))) && (
                <div className="absolute inset-0 flex items-center justify-center bg-sentiment-neutral/30 pointer-events-none z-50">
                  <span className="text-6xl font-bold text-sentiment-neutral">PORTOFOLIO</span>
                </div>
              )}
            </>
          )}

          <div className="relative h-full w-full grid grid-rows-12 p-4">
            <div className="row-span-1 flex justify-between">
              <div className="flex items-start gap-2">
                <span
                  className={`px-4 py-2 text-xs font-medium text-white rounded-md border ${
                    isGolden
                      ? "bg-startupCard-goldenTagBg border-startupCard-goldenBorder"
                      : "bg-startupCard-tagBg border-startupCard-tagBorder"
                  }`}
                >
                  {startup.industry}
                </span>
                <span
                  className={`px-4 py-2 text-xs font-medium text-white rounded-md border ${
                    isGolden
                      ? "bg-startupCard-goldenTagBg border-startupCard-goldenBorder"
                      : "bg-startupCard-tagBg border-startupCard-tagBorder"
                  }`}
                >
                  {startup.fundingStage}
                </span>
              </div>
              <div className="flex items-start">
                <div
                  className={`px-4 py-2 text-xs font-medium text-white rounded-md border ${
                    isGolden
                      ? "bg-startupCard-goldenTagBg border-startupCard-goldenBorder"
                      : "bg-startupCard-tagBg border-startupCard-tagBorder"
                  }`}
                >
                  {startup.founderName}
                </div>
              </div>
            </div>
            <div className="row-span-2 flex flex-col items-center justify-between">
              <div className="text-center py-4">
                <h2 className="text-3xl font-semibold text-white tracking-tight">{startup.name}</h2>
              </div>
              <div
                className={`border rounded-md p-3 text-center ${
                  isGolden
                    ? "border-startupCard-goldenBorder bg-startupCard-goldenTagBg"
                    : "border-startupCard-infoBoxBorder bg-startupCard-infoBoxBg"
                }`}
              >
                <p className="font-semibold text-sm leading-relaxed">{startup.description}</p>
              </div>
            </div>
            <div className="row-span-7 flex-1 flex items-center justify-center relative">
              <div
                className={`rounded-full right-15 w-56 h-56 absolute flex items-center justify-center ${
                  isGolden
                    ? "bg-startupCard-scoreCircleGoldenBg shadow-scoreCircleGolden"
                    : "bg-startupCard-scoreCircleBg shadow-scoreCircle"
                }`}
              >
                <div className="text-center">
                  <div className={`text-4xl font-medium ${getScoreColor(startup.bullBearScore)}`}>
                    {startup.bullBearScore}
                  </div>
                  <div className="text-sm text-white/90 mt-2 font-semibold">Bull/Bear Score</div>
                  <div
                    className={`text-xs mt-1 font-semibold ${getSentimentColor(startup.bullBearSentiment)}`}
                  >
                    {startup.bullBearSentiment}
                  </div>
                </div>
              </div>

              <div
                className={`h-35 w-35 rounded-full absolute left-13 top-72 -translate-y-1/2 flex items-center justify-center ${
                  isGolden
                    ? "bg-startupCard-peerCircleGoldenBg shadow-peerCircleGolden"
                    : "bg-startupCard-peerCircleBg shadow-peerCircle"
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl font-medium text-white">{startup.peerScore}</div>
                  <div className="text-xs text-white mt-1 font-medium">Peer Score</div>
                </div>
              </div>
            </div>
            <div className="row-span-2 w-full gap-4 grid grid-cols-2 p-3">
              <div className="flex flex-col justify-end col-span-1 gap-4">
                <div className="text-lg text-blue-200/50 mb-1 font-medium">MRR</div>
                <div className="text-4xl font-medium text-white">
                  ${startup.mrr.toLocaleString()}
                </div>
              </div>
              <div className="flex flex-col items-end justify-end col-span-1 gap-4">
                <div className="text-lg text-blue-200/50 mb-1 font-medium">Ticket Size</div>
                <div className="text-4xl font-medium text-white">
                  {formatCurrency(startup.ticketSize)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

StartupCard.displayName = "StartupCard";

export { StartupCard };
