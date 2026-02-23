"use client";

import { motion } from "motion/react";
import { TrendingUp, Users, BarChart3 } from "lucide-react";

const scores = [
  {
    title: "Bull / Bear Score",
    description: "Real-time crowd conviction. See how the VC community rates each startup before you commit.",
    icon: TrendingUp,
    accentColor: "emerald",
    mockValue: "78%",
    mockLabel: "Bullish",
    mockIcon: TrendingUp,
  },
  {
    title: "Peer Score",
    description: "Aggregated rating from verified investors. A single number for collective intelligence.",
    icon: Users,
    accentColor: "primary",
    mockValue: "92",
    mockLabel: "/100",
    mockIcon: null,
  },
  {
    title: "Performance Score",
    description: "Track sentiment over time. Spot momentum shifts before the market catches on.",
    icon: BarChart3,
    accentColor: "purple",
    mockValue: "+12%",
    mockLabel: "30d trend",
    mockIcon: TrendingUp,
  },
];

export function ScoresSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-widest font-mono text-primary/40">
            Scoring Engine
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3">
            Quantified conviction
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Every startup gets three proprietary scores so you never invest on gut alone.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {scores.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-surface-60 backdrop-blur border border-border rounded-2xl p-6 space-y-4"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <s.icon size={18} className="text-primary/70" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>

              {/* Mock score display */}
              <div className="pt-2 border-t border-border">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">{s.mockValue}</span>
                  <span className="text-sm text-muted-foreground">{s.mockLabel}</span>
                  {s.mockIcon && <s.mockIcon size={14} className="text-emerald-400" />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
