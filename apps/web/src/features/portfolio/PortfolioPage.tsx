"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useFetchPortfolioQuery } from "@/shared/api/portfolioApi";
import { PortfolioCard } from "./components/PortfolioCard";
import { PortfolioStats } from "./components/PortfolioStats";
import { PortfolioHeader } from "./components/PortfolioHeader";

export function PortfolioPage() {
  const [search, setSearch] = useState("");
  const { data: portfolio = [], isLoading } = useFetchPortfolioQuery();

  const filtered = useMemo(() => {
    if (!search.trim()) return portfolio;
    const query = search.toLowerCase();
    return portfolio.filter(
      (s) =>
        s.operationalName.toLowerCase().includes(query) ||
        s.targetMarkets.some((m) => m.toLowerCase().includes(query)) ||
        (s.countryName ?? "").toLowerCase().includes(query),
    );
  }, [search, portfolio]);

  return (
    <div className="h-full text-foreground">
      <div className="py-8 max-w-3xl mx-auto px-4 space-y-6">
        <PortfolioHeader search={search} onSearchChange={setSearch} />
        <PortfolioStats startups={portfolio} />

        {/* Card list */}
        <div className="space-y-4">
          {isLoading && (
            <p className="text-center text-muted-foreground py-12">Loading portfolio…</p>
          )}
          {!isLoading && filtered.map((startup, index) => (
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
          {!isLoading && filtered.length === 0 && (
            <p className="text-center text-faint py-12">
              {portfolio.length === 0
                ? "No startups saved yet. Swipe to add some!"
                : "No startups match your search."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
