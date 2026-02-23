"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { MOCK_PORTFOLIO } from "./consts/mockData";
import { PortfolioCard } from "./components/PortfolioCard";
import { PortfolioStats } from "./components/PortfolioStats";
import { PortfolioHeader } from "./components/PortfolioHeader";

export function PortfolioPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return MOCK_PORTFOLIO;
    const query = search.toLowerCase();
    return MOCK_PORTFOLIO.filter(
      (s) =>
        s.operationalName.toLowerCase().includes(query) ||
        s.targetMarkets.some((m) => m.toLowerCase().includes(query)) ||
        s.countryName.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <div className="h-full text-white">
      <div className="py-8 max-w-3xl mx-auto px-4 space-y-6">
        <PortfolioHeader search={search} onSearchChange={setSearch} />
        <PortfolioStats startups={MOCK_PORTFOLIO} />

        {/* Card list */}
        <div className="space-y-4">
          {filtered.map((startup, index) => (
            <motion.div
              key={startup.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
            >
              <PortfolioCard
                startup={startup}
                defaultExpanded={index === 0}
              />
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-neutral-600 py-12">No startups match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
