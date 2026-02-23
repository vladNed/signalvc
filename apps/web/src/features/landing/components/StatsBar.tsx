"use client";

import { motion } from "motion/react";

const stats = [
  { value: "2,847", label: "VCs on waitlist" },
  { value: "12K+", label: "Startups indexed" },
  { value: "340K", label: "Swipes recorded" },
  { value: "98%", label: "Match accuracy" },
];

export function StatsBar() {
  return (
    <section className="py-16 px-6 border-y border-neutral-800/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center space-y-1">
              <div className="text-3xl font-black text-white">{s.value}</div>
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
