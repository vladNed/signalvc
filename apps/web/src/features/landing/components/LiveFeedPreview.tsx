"use client";

import { motion } from "motion/react";
import { Lock } from "lucide-react";

const mockRows = [
  { name: "NeuraFlow", sector: "AI / SaaS", score: 92, sentiment: "Bullish", region: "Berlin" },
  { name: "FinLedger", sector: "Fintech", score: 88, sentiment: "Very Bullish", region: "London" },
  { name: "SolarGrid", sector: "CleanTech", score: 81, sentiment: "Neutral", region: "Munich" },
  { name: "AgriSense", sector: "AgriTech", score: 76, sentiment: "Bullish", region: "Amsterdam" },
  { name: "EduPath", sector: "EdTech", score: 83, sentiment: "Bullish", region: "Paris" },
];

function getSentimentColor(s: string) {
  if (s.includes("Very Bullish") || s.includes("Bullish")) return "text-emerald-400";
  if (s.includes("Neutral")) return "text-yellow-400";
  return "text-red-400";
}

export function LiveFeedPreview() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[10px] uppercase tracking-widest font-mono text-primary/40">
            Signal Feed
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3">
            Live deal flow
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Real startups. Real scores. Updated in real time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative bg-surface-60 backdrop-blur border border-border rounded-2xl overflow-hidden"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400/80">LIVE</span>
            </div>
            <span className="text-xs font-mono text-faint">
              {mockRows.length} startups in queue
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-[10px] uppercase tracking-widest font-mono text-faint">
                    Startup
                  </th>
                  <th className="px-6 py-3 text-[10px] uppercase tracking-widest font-mono text-faint">
                    Sector
                  </th>
                  <th className="px-6 py-3 text-[10px] uppercase tracking-widest font-mono text-faint">
                    Peer Score
                  </th>
                  <th className="px-6 py-3 text-[10px] uppercase tracking-widest font-mono text-faint">
                    Sentiment
                  </th>
                  <th className="px-6 py-3 text-[10px] uppercase tracking-widest font-mono text-faint">
                    Region
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockRows.map((row, i) => {
                  const isLocked = i >= 3;
                  return (
                    <tr
                      key={row.name}
                      className={`border-b border-border-light ${isLocked ? "blur-[3px] select-none" : ""}`}
                    >
                      <td className="px-6 py-3 text-sm font-medium text-foreground">{row.name}</td>
                      <td className="px-6 py-3 text-sm text-body">{row.sector}</td>
                      <td className="px-6 py-3 text-sm font-bold text-foreground">{row.score}</td>
                      <td className={`px-6 py-3 text-sm font-medium ${getSentimentColor(row.sentiment)}`}>
                        {row.sentiment}
                      </td>
                      <td className="px-6 py-3 text-sm text-muted-foreground">{row.region}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Locked overlay for bottom rows */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-gradient-fade to-transparent flex items-end justify-center pb-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Lock size={14} />
              <span>Sign up to unlock full feed</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
