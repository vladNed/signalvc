"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Zap, Eye, Trophy, ArrowRight, User } from "lucide-react";

const features = [
  {
    title: "Deal Flow at Terminal Velocity",
    description:
      "Review 50+ pre-seed opportunities in minutes. A streamlined, gesture-driven interface designed for speed.",
    icon: Zap,
    visual: (
      <div className="relative h-48 w-full bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        {/* Stacked Cards for Swipe Effect */}
        <div className="w-32 h-44 bg-zinc-800 rounded-xl border border-zinc-700 absolute top-4 rotate-[-5deg] scale-90 opacity-50" />
        <div className="w-32 h-44 bg-zinc-800 rounded-xl border border-zinc-700 absolute top-2 rotate-[-2deg] scale-95 opacity-80" />
        <div className="w-32 h-44 bg-black rounded-xl border border-zinc-600 z-20 flex flex-col items-center justify-between p-3 shadow-2xl relative">
          <div className="w-full h-20 bg-zinc-800 rounded-md" />
          <div className="space-y-1 w-full">
            <div className="h-2 w-16 bg-zinc-700 rounded" />
            <div className="h-2 w-24 bg-zinc-800 rounded" />
          </div>
          <div className="flex w-full gap-2">
            <div className="h-6 flex-1 rounded bg-red-500/20 border border-red-500/50 flex items-center justify-center text-[8px] text-red-400">
              PASS
            </div>
            <div className="h-6 flex-1 rounded bg-signal/20 border border-signal/50 flex items-center justify-center text-[8px] text-signal">
              BULL
            </div>
          </div>
          {/* Finger/Swipe Indicator */}
          <div className="absolute bottom-10 right-2 w-8 h-8 bg-white/10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md animate-pulse">
            <div className="w-4 h-4 rounded-full bg-white/80" />
          </div>
        </div>
      </div>
    ),
    colSpan: "md:col-span-1",
  },
  {
    title: "Insider Intelligence",
    description:
      "Slipstream Alerts™ notify you the second a Market Leader enters a niche. Know what the Smart Money is doing.",
    icon: Eye,
    visual: (
      <div className="relative h-48 w-full bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800 p-4">
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-lg border ${i === 1 ? "bg-signal/5 border-signal/30" : "bg-black/40 border-zinc-800"} backdrop-blur-sm`}
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${i === 1 ? "bg-signal/10 text-signal" : "bg-zinc-800 text-zinc-500"}`}
              >
                <User className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium ${i === 1 ? "text-white" : "text-zinc-400"}`}
                  >
                    {i === 1 ? "Andreessen Horowitz" : i === 2 ? "Sequoia" : "Founders Fund"}
                  </span>
                  {i === 1 && (
                    <Badge variant="outlineSignal" className="text-[9px] h-4 px-1">
                      Active
                    </Badge>
                  )}
                </div>
                <p className="text-[10px] text-zinc-500 mt-0.5">Entered 'Generative BioTech'</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    colSpan: "md:col-span-1",
  },
  {
    title: "Quantified Conviction",
    description:
      "Don't just claim Alpha. Prove it. Build a Personal Performance Score that validates your ability to pick winners.",
    icon: Trophy,
    visual: (
      <div className="relative h-48 w-full bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800 p-6 flex flex-col justify-center items-center">
        <div className="text-center space-y-2 z-10">
          <span className="text-zinc-400 text-xs uppercase tracking-widest">
            Personal Performance Score
          </span>
          <div className="text-5xl font-bold text-white tracking-tighter flex items-start justify-center gap-1">
            94.2
            <span className="text-lg text-signal mt-1 flex items-center">
              <ArrowRight className="h-3 w-3 rotate-[-45deg]" />
              +2.4%
            </span>
          </div>
          <p className="text-xs text-zinc-500">Ranking: #3 in Global / FinTech</p>
        </div>
        {/* Background Graph */}
        <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-between px-2 opacity-50">
          {[20, 40, 30, 70, 50, 80, 60, 90, 85, 95].map((h, i) => (
            <div
              key={i}
              className="w-1/12 bg-signal/20 rounded-t-sm mx-0.5"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    ),
    colSpan: "md:col-span-2",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-black">
      <div className="container px-4 md:px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Stop Losing Deals.
          </h2>
          <p className="text-zinc-400 max-w-[600px] text-lg">
            Traditional due diligence is slow. Ventures are won in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-xl border border-zinc-800 bg-black/40 p-6 hover:border-zinc-700 transition-colors ${feature.colSpan}`}
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 group-hover:bg-zinc-800 transition-colors">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
              </div>

              <div className="mb-6">{feature.visual}</div>

              <h3 className="mb-2 text-xl font-bold text-white">{feature.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
