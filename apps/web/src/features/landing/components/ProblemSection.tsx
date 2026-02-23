"use client";

import { motion } from "motion/react";
import { AlertTriangle, Clock, BarChart3, Users } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Information Overload",
    description: "Thousands of startups, no signal. Traditional sourcing drowns VCs in noise.",
  },
  {
    icon: Clock,
    title: "Slow Due Diligence",
    description: "Weeks of research per deal. By the time you decide, the round is closed.",
  },
  {
    icon: BarChart3,
    title: "No Conviction Metric",
    description: "Gut feeling isn't a strategy. You need quantified peer consensus before committing.",
  },
  {
    icon: Users,
    title: "Fragmented Workflow",
    description: "Spreadsheets, emails, and 12 tabs. Your deal flow lives everywhere except one place.",
  },
];

export function ProblemSection() {
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
            The Problem
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3">
            Deal flow is broken
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            The VC industry runs on outdated workflows. We&apos;re fixing that.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-surface-60 backdrop-blur border border-border rounded-2xl p-6 space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <p.icon size={18} className="text-primary/70" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
