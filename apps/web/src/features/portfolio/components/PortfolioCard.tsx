"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { PortfolioStartup } from "../models/portfolio";
import { SentimentChart } from "./SentimentChart";
import { getCountryFlag } from "../utils/countryFlags";

type PortfolioCardProps = {
  startup: PortfolioStartup;
  defaultExpanded?: boolean;
};

function InfoBox({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-accent bg-accent/30">
      <span className="text-sm text-accent-foreground">{label}</span>
      <span className={`text-lg font-bold ${valueColor ?? "text-white"}`}>{value}</span>
    </div>
  );
}

function getSentimentColor(sentiment: number): string {
  if (sentiment >= 70) return "text-emerald-400";
  if (sentiment >= 50) return "text-yellow-400";
  return "text-red-400";
}

export function PortfolioCard({ startup, defaultExpanded = false }: PortfolioCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const flag = getCountryFlag(startup.countryName);

  return (
    <div className="w-full rounded-2xl backdrop-blur-xl border border-neutral-800 bg-background/30 shadow-dark overflow-hidden transition-all duration-300">
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full flex items-center justify-between px-6 py-4 cursor-pointer"
      >
        <div className="flex items-center gap-4 min-w-0">
          <h3 className="text-xl font-bold text-white truncate">{startup.operationalName}</h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            {startup.targetMarkets.map((market) => (
              <span
                key={market}
                className="px-3 py-1 text-xs rounded-full border border-accent bg-accent/30 text-accent-foreground"
              >
                {market}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-4">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent bg-accent/30 text-sm text-accent-foreground">
            <span>{flag}</span>
            {startup.countryName}
          </span>
          {expanded ? (
            <ChevronUp size={20} className="text-accent-foreground" />
          ) : (
            <ChevronDown size={20} className="text-accent-foreground" />
          )}
        </div>
      </button>

      {/* Body — expandable */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 space-y-5">
            {/* Founded year */}
            <p className="text-sm text-accent-foreground">Est. {startup.foundedYear}</p>

            {/* Stats row */}
            <div className="flex items-center gap-4">
              <InfoBox
                label="Current"
                value={startup.currentValuation}
                valueColor="text-emerald-400"
              />
              <InfoBox label="Peer Score" value={String(startup.peerScore)} />
              <InfoBox
                label="Sentiment"
                value={`${startup.sentiment}%`}
                valueColor={getSentimentColor(startup.sentiment)}
              />
            </div>

            {/* Chart */}
            <SentimentChart
              data={startup.sentimentHistory}
              sentiment={startup.sentiment}
              sentimentTrend={startup.sentimentTrend}
            />

            {/* Description */}
            <div className="rounded-xl border border-accent bg-accent/30 px-5 py-4">
              <p className="text-sm text-accent-foreground text-center leading-relaxed">
                {startup.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
