"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { HeroProductCard } from "./HeroProductCard";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Radial purple glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-primary/70">Live Beta — Batch #01</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
              Swipe on the next{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                unicorn
              </span>
            </h1>

            <p className="text-lg text-neutral-400 max-w-md leading-relaxed">
              SignalVC is <strong className="text-white">Tinder for venture capital</strong>.
              Swipe through curated startups, score conviction, and build your portfolio in seconds.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <Link
                href="/auth"
                className="group px-6 py-3 text-sm font-semibold text-white bg-primary rounded-lg hover:shadow-[0_0_30px_rgba(97,95,255,0.4)] transition-all duration-300"
              >
                Get Early Access
              </Link>
              <Link
                href="/discover"
                className="px-6 py-3 text-sm font-medium text-neutral-400 border border-neutral-800 rounded-lg hover:border-neutral-700 hover:text-white transition-colors"
              >
                Try Anonymous
              </Link>
            </div>
          </motion.div>

          {/* Right — floating card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <HeroProductCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
