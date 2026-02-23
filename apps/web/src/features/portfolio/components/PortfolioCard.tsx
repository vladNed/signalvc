"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border bg-glass">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-lg font-bold ${valueColor ?? "text-foreground"}`}>{value}</span>
    </div>
  );
}

function getSentimentColor(sentiment: number): string {
  if (sentiment >= 70) return "text-emerald-400";
  if (sentiment >= 50) return "text-yellow-400";
  return "text-red-400";
}

function getAccentBorderColor(sentiment: number): string {
  if (sentiment >= 70) return "border-l-emerald-500/60";
  if (sentiment >= 50) return "border-l-yellow-500/60";
  return "border-l-red-500/60";
}

export function PortfolioCard({ startup, defaultExpanded = false }: PortfolioCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const flag = getCountryFlag(startup.countryName);

  return (
    <div
      className={`group w-full rounded-2xl backdrop-blur-xl border border-border bg-surface-60 overflow-hidden transition-all duration-300 border-l-2 ${getAccentBorderColor(startup.sentiment)} hover:shadow-[0_0_30px_rgba(97,95,255,0.08)]`}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full flex items-center justify-between px-6 py-4 cursor-pointer"
      >
        <div className="flex items-center gap-4 min-w-0">
          <h3 className="text-xl font-bold text-foreground truncate">{startup.operationalName}</h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            {startup.targetMarkets.map((market) => (
              <span
                key={market}
                className="px-3 py-1 text-xs rounded-full border border-primary/20 bg-primary/5 text-body backdrop-blur"
              >
                {market}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-4">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-glass text-sm text-body">
            <span>{flag}</span>
            {startup.countryName}
          </span>
          {expanded ? (
            <ChevronUp size={20} className="text-muted-foreground" />
          ) : (
            <ChevronDown size={20} className="text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Body — expandable with motion */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 space-y-5">
              {/* Founded year */}
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-sm text-muted-foreground"
              >
                Est. {startup.foundedYear}
              </motion.p>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4"
              >
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
              </motion.div>

              {/* Chart */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <SentimentChart
                  data={startup.sentimentHistory}
                  sentiment={startup.sentiment}
                  sentimentTrend={startup.sentimentTrend}
                />
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-border bg-glass px-5 py-4"
              >
                <p className="text-sm text-body text-center leading-relaxed">
                  {startup.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
