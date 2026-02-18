"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { MOCK_PORTFOLIO } from "./consts/mockData";
import { PortfolioCard } from "./components/PortfolioCard";

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
        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-foreground" />
          <input
            type="text"
            placeholder="Search saved startups..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-neutral-800 backdrop-blur-xl bg-background/30 py-3 pl-11 pr-4 text-sm text-white placeholder-accent-foreground outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Card list */}
        <div className="space-y-4">
          {filtered.map((startup, index) => (
            <PortfolioCard
              key={startup.id}
              startup={startup}
              defaultExpanded={index === 0}
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-gray-500 py-12">No startups match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
