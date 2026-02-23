"use client";

import { motion } from "motion/react";
import { TrendingUp, MapPin } from "lucide-react";

export function HeroProductCard() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-72 mx-auto"
    >
      {/* Ambient glow */}
      <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl pointer-events-none" />

      <div className="relative bg-[#0c0c18]/80 backdrop-blur-xl border border-neutral-800/50 rounded-2xl p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-primary/60" />
            <span className="text-xs text-neutral-500">Berlin, DE</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-mono text-primary/40">
            Live
          </span>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-bold text-white">NeuraFlow</h3>
          <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
            AI-powered workflow automation for enterprise teams
          </p>
        </div>

        {/* Tags */}
        <div className="flex gap-1.5">
          {["SaaS", "AI", "B2B"].map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[10px] rounded-full border border-primary/20 bg-primary/5 text-primary/70 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Scores */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2">
            <span className="text-[10px] text-emerald-400/60 block">Peer Score</span>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-emerald-400">92</span>
              <TrendingUp size={12} className="text-emerald-400" />
            </div>
          </div>
          <div className="bg-primary/10 border border-primary/20 rounded-xl px-3 py-2">
            <span className="text-[10px] text-primary/60 block">Valuation</span>
            <span className="text-lg font-bold text-white">$14M</span>
          </div>
        </div>

        {/* Swipe indicators */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] font-bold text-red-400/40">← BEAR</span>
          <span className="text-[10px] font-bold text-blue-400/40">↑ SAVE</span>
          <span className="text-[10px] font-bold text-emerald-400/40">BULL →</span>
        </div>
      </div>
    </motion.div>
  );
}
