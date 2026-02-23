"use client";

import { motion } from "motion/react";
import { Layers, Hand, Briefcase } from "lucide-react";

const steps = [
  {
    icon: Layers,
    step: "01",
    title: "Discover",
    description: "Our algorithm surfaces high-signal startups matched to your thesis and sector focus.",
  },
  {
    icon: Hand,
    step: "02",
    title: "Swipe",
    description: "Bull, Bear, or Save. Rate conviction in seconds. Your swipes feed the peer consensus engine.",
  },
  {
    icon: Briefcase,
    step: "03",
    title: "Build",
    description: "Saved startups flow into your portfolio with live sentiment tracking and peer scores.",
  },
];

export function HowItWorksSection() {
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
            How It Works
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3">
            Three steps to conviction
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-surface-60 backdrop-blur border border-border rounded-2xl p-6 space-y-4"
            >
              <span className="text-[40px] font-black text-primary/10 absolute top-4 right-5 leading-none">
                {s.step}
              </span>
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <s.icon size={22} className="text-primary/70" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
