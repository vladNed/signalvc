import * as React from "react";
import type { Startup, SwipeType } from "@signalvc/types";
import useSwipeGesture from "./hooks/useSwipeGesture";
import { ChartColumnStacked, Landmark, MapPin, TrendingDown, TrendingUp } from "lucide-react";

type StartupCardProps = {
  startup: Startup;
  onSwipe: (direction: SwipeType) => void;
  isTop?: boolean;
  showBehind?: boolean;
  isGolden?: boolean;
  nextCardIsGolden?: boolean;
  hoverDirection?: SwipeType | null;
};

const getScoreColor = (score: number) => {
  if (score >= 30) return "text-emerald-400";
  if (score >= 50) return "text-yellow-400";
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

    // Calculate overlay opacity based on drag distance
    const swipeOpacity = Math.min(Math.abs(offset.x) / 100, 1) * 0.8;
    const saveOpacity = Math.min(Math.abs(offset.y) / 100, 1) * 0.8;

    function formatValuation(valuation: any): React.ReactNode {
      if (valuation == null) return "—";
      if (valuation >= 1_000_000_000) return `$${(valuation / 1_000_000_000).toFixed(1)}B`;
      if (valuation >= 1_000_000) return `$${(valuation / 1_000_000).toFixed(1)}M`;
      if (valuation >= 1_000) return `$${(valuation / 1_000).toFixed(0)}K`;
      return `$${valuation}`;
    }

    return (
      <div
        ref={ref}
        className={`absolute inset-0 select-none ${isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"} ${!isDragging ? "transition-[transform] duration-300 ease-out" : ""} ${nextCardIsGolden && isTop ? "overflow-visible" : ""}`}
        style={{
          transform: isTop ? transform : undefined,
          touchAction: isTop ? "none" : undefined,
        }}
        {...(isTop ? handlers : {})}
      >
        {nextCardIsGolden && isTop && (
          <div className="absolute -inset-2 rounded-xl bg-gradient-to-b from-yellow-500/20 to-amber-600/20 blur-xl animate-pulse pointer-events-none -z-10" />
        )}

        <div
          className={`relative h-full w-full rounded-2xl overflow-hidden ${
            isGolden
              ? "bg-gradient-to-b from-startupCard-goldenFrom to-startupCard-goldenTo border-2 border-startupCard-goldenBorder shadow-golden"
              : "bg-surface-60 backdrop-blur-xl border border-border shadow-[0_0_40px_rgba(97,95,255,0.3)]"
          }`}
        >
          {/* Swipe overlays with glow */}
          {(isDragging || hoverDirection) && (
            <>
              {(hoverDirection === "bear" || (isDragging && offset.x < -50)) && (
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
                  style={{
                    background: `radial-gradient(circle at center, rgba(239,68,68,${hoverDirection === "bear" ? 0.25 : swipeOpacity * 0.8}) 0%, transparent 70%)`,
                  }}
                >
                  <span
                    className="text-5xl md:text-6xl font-bold text-red-500 rotate-12"
                    style={{ opacity: hoverDirection === "bear" ? 1 : swipeOpacity }}
                  >
                    BEAR
                  </span>
                </div>
              )}
              {(hoverDirection === "bull" || (isDragging && offset.x > 50)) && (
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
                  style={{
                    background: `radial-gradient(circle at center, rgba(16,185,129,${hoverDirection === "bull" ? 0.25 : swipeOpacity * 0.8}) 0%, transparent 70%)`,
                  }}
                >
                  <span
                    className="text-5xl md:text-6xl font-bold text-emerald-500 -rotate-12"
                    style={{ opacity: hoverDirection === "bull" ? 1 : swipeOpacity }}
                  >
                    BULL
                  </span>
                </div>
              )}
              {(hoverDirection === "portfolio" ||
                (isDragging && offset.y < -50 && Math.abs(offset.y) > Math.abs(offset.x))) && (
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
                  style={{
                    background: `radial-gradient(circle at center, rgba(97,95,255,${hoverDirection === "portfolio" ? 0.25 : saveOpacity * 0.8}) 0%, transparent 70%)`,
                  }}
                >
                  <span
                    className="text-5xl md:text-6xl font-bold text-blue-400"
                    style={{ opacity: hoverDirection === "portfolio" ? 1 : saveOpacity }}
                  >
                    SAVE
                  </span>
                </div>
              )}
            </>
          )}

          {/* ── CARD BODY ── */}
          <div className="relative h-full w-full p-5 md:p-8 overflow-hidden grid grid-rows-24">

            {/* Top row: location + category */}
            <div className="flex items-center justify-between flex-shrink-0 row-span-1 ">
              <div className="flex items-center min-w-0">
                <MapPin size={16} className="text-muted-foreground flex-shrink-0" />
                <p className="text-xs md:text-sm text-muted-foreground ml-1.5 truncate">
                  {startup.countryName} - {startup.regionName ? startup.regionName : "N/A"}
                </p>
              </div>
              <div className="text-xs md:text-sm text-muted-foreground flex items-center gap-1.5 flex-shrink-0 ml-2">
                <span className="hidden sm:inline">{startup.businessCategory}</span>
                <span className="sm:hidden truncate max-w-20">{startup.businessCategory}</span>
                <ChartColumnStacked size={16} className="flex-shrink-0" />
              </div>
            </div>

            {/* Name row */}
            <div className="flex items-center gap-3 mt-3 md:mt-4 flex-shrink-0 row-span-3">
              <div className="bg-primary/10 border border-primary/20 p-2.5 md:p-4 items-center justify-center rounded-full flex-shrink-0">
                <Landmark size={20} className="md:w-6 md:h-6" />
              </div>
              <h2 className="text-xl md:text-3xl font-semibold tracking-tight truncate">
                {startup.operationalName}
              </h2>
            </div>

            {/* Description — flexible area */}
            <div className="mt-3 md:mt-4 flex-1 min-h-0 overflow-hidden row-span-6">
              <p className="text-md md:text-lg text-body line-clamp-4 leading-relaxed">
                {startup.description}
              </p>
            </div>

            {/* Tags — horizontal scroll, never wrap */}
            <div className="row-span-2 mt-3 flex-shrink-0 flex items-center gap-1.5 md:gap-2 overflow-x-auto overflow-y-hidden scrollbar-none -mx-1 px-1">
              {startup.targetMarkets.map((market) => (
                <span
                  key={market}
                  className="whitespace-nowrap flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 border-startupCard-border/30 border bg-primary/20 rounded-full text-xs md:text-sm font-medium"
                >
                  {market}
                </span>
              ))}
            </div>

            {/* Info boxes: Valuation + Founded */}
            <div className="row-span-6 mt-3 md:mt-4 flex-shrink-0 grid grid-cols-2 gap-2 md:gap-4">
              <div className="flex border-glass bg-glass border rounded-xl p-3 md:p-4 flex-col gap-1 justify-between">
                <div className="text-sm md:text-md text-accent-foreground flex items-center gap-1.5">
                  <TrendingUp size={14} className="flex-shrink-0" />
                  <span>Valuation</span>
                </div>
                  <div className="text-3xl md:text-4xl font-bold text-accent-foreground">{formatValuation(startup.valuation)}</div>
                </div>
              <div className="flex border-glass bg-glass border rounded-xl p-3 md:p-4 flex-col gap-1 justify-between">
                <div className="text-sm md:text-md text-accent-foreground flex items-center gap-1.5">
                  <Landmark size={14} className="flex-shrink-0" />
                  <span>Founded</span>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-accent-foreground">{startup.foundedYear}</div>
              </div>
            </div>

            {/* Peer Score */}
            <div className="row-span-7 mt-3 md:mt-4 flex-shrink-0 border border-glass rounded-xl bg-glass flex p-3 md:p-4 flex-col items-center justify-center md:gap-3 md:py-6">
              <span className="text-md md:text-lg text-accent-foreground">Peer Score</span>
              <div className={`flex items-center text-4xl md:text-6xl font-bold ${getScoreColor(startup.peerScore)}`}>
                {startup.peerScore.toFixed(2)}
                {startup.peerScore >= 30 ? (
                  <TrendingUp size={18} className="text-emerald-400 ml-1.5 md:ml-2 md:w-7 md:h-7" />
                ) : (
                  <TrendingDown size={18} className="text-red-400 ml-1.5 md:ml-2 md:w-7 md:h-7" />
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
