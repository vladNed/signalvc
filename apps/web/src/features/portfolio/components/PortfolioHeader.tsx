"use client";

import { motion } from "motion/react";
import { Search } from "lucide-react";

type PortfolioHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export function PortfolioHeader({ search, onSearchChange }: PortfolioHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
        <p className="text-sm text-muted-foreground mt-1">Your saved startups and conviction tracker</p>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name, market, or country..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-border backdrop-blur-xl bg-surface-60 py-3 pl-11 pr-4 text-sm text-foreground placeholder-faint outline-none focus:border-primary/40 transition-colors"
        />
      </div>
    </motion.div>
  );
}
