import * as React from "react";
import type { Startup, SwipeType } from "@signalvc/types";
import useSwipeGesture from "./hooks/useSwipeGesture";
import { ChartColumnStacked, Landmark, MapPin, PinIcon, TrendingDown, TrendingUp } from "lucide-react";

type StartupCardProps = {
  startup: Startup;
  onSwipe: (direction: SwipeType) => void;
  isTop?: boolean;
  showBehind?: boolean;
  isGolden?: boolean;
  nextCardIsGolden?: boolean;
  hoverDirection?: SwipeType | null;
};

// TODO: Move this to utils
const getScoreColor = (score: number) => {
  if (score >= 30) return "text-emerald-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
};

// TODO: Move this to utils
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

    const opacity = isDragging ? 1 : 1;

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
          <div className="absolute -inset-2 rounded-xl bg-gradient-to-b from-yellow-500/20 to-amber-600/20 blur-xl animate-pulse pointer-events-none -z-10" />
        )}

        <div
          className={`relative max-h-200 h-full w-full rounded-2xl overflow-hidden ${
            isGolden
              ? "bg-gradient-to-b from-startupCard-goldenFrom to-startupCard-goldenTo border-2 border-startupCard-goldenBorder shadow-golden"
              : "backdrop-blur-xl border border-neutral-800 bg-background/30 shadow-dark"
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
              {(hoverDirection === "portfolio" ||
                (isDragging && offset.y < -50 && Math.abs(offset.y) > Math.abs(offset.x))) && (
                <div className="absolute inset-0 flex items-center justify-center bg-sentiment-portfolio/30 pointer-events-none z-50">
                  <span className="text-6xl font-bold text-sentiment-portfolio">SAVE</span>
                </div>
              )}
            </>
          )}

          {/* BODY */}
          <div className="relative h-full w-full grid grid-rows-12 p-8 gap-4">
            <div className="row-span-1 flex items-center justify-between">
              <div className="flex items-center">
                <MapPin size={18} className="text-accent-foreground" />
                <p className="text-sm text-accent-foreground ml-2">
                  {startup.countryName} - {startup.regionName ? startup.regionName : "N/A"}
                </p>
              </div>
              <div className="text-sm text-accent-foreground flex items-center gap-2">
                {startup.businessCategory}
                <ChartColumnStacked size={18} className="inline-block ml-1" />
              </div>
            </div>
            <div className="row-span-1 flex items-center gap-4">
              <div className="bg-accent/30 border border-accent p-4 items-center justify-center rounded-full">
                <Landmark size={25} />
              </div>
              <h2 className="text-3xl font-semibold tracking-tight flex">
                {startup.operationalName}
              </h2>
            </div>
            <div className="row-span-4">
              <p className="text-lg text-start line-clamp-8">{startup.description}</p>
            </div>
            <div className="row-span-1 flex items-center gap-2 overflow-x-scroll overflow-y-hidden scrollbar-thin scrollbar-thumb-accent scrollbar-track-background">
              {startup.targetMarkets.map((market) => (
                <span
                  key={market}
                  className="whitespace-nowrap px-4 py-2 border-accent border bg-accent/30 rounded-full text-md font-medium"
                >
                  {market}
                </span>
              ))}
            </div>
            <div className="row-span-2 grid grid-cols-2 gap-4">
              <div className="col-span-1 flex border-accent bg-accent/30 border rounded-xl p-4 flex-col justify-between">
                <div className="text-sm text-accent-foreground flex items-center gap-2">
                  <TrendingUp size={18} className="inline-block ml-1" />
                  <span className="">Current Valuation</span>
                </div>
                <div className="text-4xl font-bold ">$12M</div>
              </div>
              <div className="col-span-1 flex border-accent bg-accent/30 border rounded-xl p-4 flex-col justify-between">
                <div className="text-sm text-accent-foreground flex items-center gap-2">
                  <Landmark size={18} className="inline-block ml-1" />
                  <span className="">Founded In</span>
                </div>
                <div className="text-4xl font-bold ">{startup.foundedYear}</div>
              </div>
            </div>
            <div className="row-span-3 border border-accent rounded-xl bg-accent/30 flex flex-col items-center justify-center p-4 gap-4 overflow-hidden">
              <span className="text-md text-accent-foreground">Peer Score</span>
              <div className={`flex items-center text-5xl font-bold ${getScoreColor(startup.peerScore)}`}>
                {startup.peerScore.toFixed(2)}
                {startup.peerScore >= 30 ? (
                  <span className="text-sm text-emerald-400 ml-2"><TrendingUp size={30} /></span>
                ) : (
                  <span className="text-sm text-red-400 ml-2"><TrendingDown size={30} /></span>
                )}
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
