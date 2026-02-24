"use client";

import { motion } from "motion/react";
import { Briefcase, TrendingUp, Star } from "lucide-react";
import type { PortfolioStartup } from "../models/portfolio";

type PortfolioStatsProps = {
  startups: PortfolioStartup[];
};

export function PortfolioStats({ startups }: PortfolioStatsProps) {
  const totalSaved = startups.length;
  const avgPeerScore =
    startups.length > 0
      ? (startups.reduce((sum, s) => sum + s.peerScore, 0) / startups.length).toFixed(1)
      : "—";
  const topPerformer =
    startups.length > 0
      ? startups.reduce((top, s) => (s.peerScore > top.peerScore ? s : top), startups[0])
      : null;

  const stats = [
    {
      icon: Briefcase,
      label: "Total Saved",
      value: String(totalSaved),
      accent: "text-primary",
    },
    {
      icon: TrendingUp,
      label: "Avg Peer Score",
      value: avgPeerScore,
      accent: "text-emerald-400",
    },
    {
      icon: Star,
      label: "Top Performer",
      value: topPerformer?.operationalName ?? "—",
      accent: "text-foreground",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="bg-surface-60 backdrop-blur border border-border rounded-2xl p-4 space-y-2"
        >
          <div className="flex items-center gap-2">
            <s.icon size={14} className="text-muted-foreground" />
            <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
              {s.label}
            </span>
          </div>
          <div className={`text-xl font-bold ${s.accent}`}>{s.value}</div>
        </motion.div>
      ))}
    </div>
  );
}
