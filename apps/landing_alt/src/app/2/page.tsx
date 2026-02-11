"use client";

import { motion } from "motion/react";
import { Lora, Inconsolata } from "next/font/google";
import { TrendingUp, TrendingDown } from "lucide-react";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
});

const SECTORS = [
  { name: "AI / Machine Learning", sentiment: 88, change: "+22.8%", direction: "up" as const, volume: "5,291" },
  { name: "Fintech", sentiment: 74, change: "+14.2%", direction: "up" as const, volume: "3,847" },
  { name: "HealthTech", sentiment: 61, change: "+3.4%", direction: "up" as const, volume: "1,876" },
  { name: "Climate Tech", sentiment: 48, change: "-6.1%", direction: "down" as const, volume: "2,104" },
  { name: "Cybersecurity", sentiment: 44, change: "-2.3%", direction: "down" as const, volume: "1,432" },
  { name: "EdTech", sentiment: 39, change: "-8.7%", direction: "down" as const, volume: "892" },
];

const SCORES_DETAIL = [
  {
    title: "Bull/Bear Score",
    value: "78%",
    trend: "+3.2% this week",
    desc: "Aggregated market sentiment from 2,847 VCs. Updated in real-time as predictions flow in.",
    example: "When NovaPay crossed the 90% bullish threshold, 3 funds initiated contact within 48 hours.",
    color: "text-emerald-800",
    accent: "bg-emerald-800",
    tint: "bg-emerald-50/60",
  },
  {
    title: "Peer Score",
    value: "47",
    trend: "+12 VCs this week",
    desc: "How many investors in your niche are actively watching the same startup. Updated per swipe.",
    example: "A Peer Score above 30 in your sector means the deal is competitive. Below 10, you may have found an alpha.",
    color: "text-blue-800",
    accent: "bg-blue-800",
    tint: "bg-blue-50/60",
  },
  {
    title: "Performance Score",
    value: "92%",
    trend: "Top 5% in Fintech",
    desc: "Your personal prediction accuracy over time. Based on portfolio performance and swipe accuracy.",
    example: "VCs with a Performance Score above 85% are 3.2x more likely to be followed by peers.",
    color: "text-amber-800",
    accent: "bg-amber-800",
    tint: "bg-amber-50/60",
  },
];

export default function DataFirstPage() {
  return (
    <div
      className={`${lora.variable} ${inconsolata.variable} min-h-screen`}
      style={{
        fontFamily: "var(--font-lora)",
        backgroundColor: "#f7f5f0",
        color: "#1c1917",
      }}
    >
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl" style={{ backgroundColor: "rgba(247,245,240,0.85)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-sm font-bold tracking-tight text-[#1c1917]" style={{ fontFamily: "var(--font-lora)" }}>
            Signal<span className="text-[#b8860b]">VC</span>
          </div>
          <button className="px-5 py-2 text-xs font-semibold bg-[#1c1917] text-[#f7f5f0] rounded-lg hover:bg-[#2c2926] transition-colors">
            Get Early Access
          </button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="pt-36 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mb-20"
          >
            <h1 className="text-4xl lg:text-[3.5rem] font-bold leading-[1.12] tracking-tight mb-6 text-[#1c1917]">
              The market has an opinion on every startup.{" "}
              <span className="text-[#b8860b]">Do you know what it is?</span>
            </h1>
            <p className="text-base text-[#78716c] leading-relaxed mb-8 max-w-lg" style={{ fontFamily: "var(--font-inconsolata)" }}>
              SignalVC aggregates real-time predictions from thousands of venture capitalists into actionable sentiment data. See what the crowd thinks before you invest.
            </p>
            <div className="flex items-center gap-5">
              <button className="px-7 py-3 text-sm font-semibold bg-[#1c1917] text-[#f7f5f0] rounded-lg hover:bg-[#2c2926] transition-colors shadow-lg shadow-[#1c1917]/10">
                Start Swiping
              </button>
              <span className="text-xs text-[#a8a29e]" style={{ fontFamily: "var(--font-inconsolata)" }}>Free — no account required</span>
            </div>
          </motion.div>

          {/* Live sector data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="rounded-2xl bg-white shadow-xl shadow-[#1c1917]/[0.04] overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 bg-[#faf8f4]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
                <span className="text-[10px] text-[#a8a29e] tracking-widest uppercase" style={{ fontFamily: "var(--font-inconsolata)" }}>Live sector sentiment · Week 07, 2026</span>
              </div>
              <span className="text-[10px] text-[#a8a29e]" style={{ fontFamily: "var(--font-inconsolata)" }}>2,847 VCs contributing</span>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-[1fr_120px_100px_100px_100px] gap-0 px-6 py-3 text-[10px] text-[#a8a29e] tracking-widest uppercase" style={{ fontFamily: "var(--font-inconsolata)" }}>
              <span>Sector</span>
              <span className="text-right">Sentiment</span>
              <span className="text-right">Change</span>
              <span className="text-right">Direction</span>
              <span className="text-right">Swipes / wk</span>
            </div>

            {SECTORS.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                className="grid grid-cols-[1fr_120px_100px_100px_100px] gap-0 px-6 py-3.5 hover:bg-[#faf8f4] transition-colors"
                style={{ borderTop: "1px solid rgba(28,25,23,0.05)" }}
              >
                <span className="text-sm font-medium text-[#1c1917]">{s.name}</span>
                <div className="flex items-center justify-end gap-3">
                  <div className="w-16 h-1.5 bg-[#f5f0e8] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${s.direction === "up" ? "bg-emerald-600" : "bg-rose-400"}`}
                      style={{ width: `${s.sentiment}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#57534e] w-8 text-right" style={{ fontFamily: "var(--font-inconsolata)" }}>{s.sentiment}%</span>
                </div>
                <span className={`text-xs text-right font-medium ${s.direction === "up" ? "text-emerald-700" : "text-rose-500"}`} style={{ fontFamily: "var(--font-inconsolata)" }}>
                  {s.change}
                </span>
                <div className="flex items-center justify-end">
                  {s.direction === "up" ? (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                  )}
                </div>
                <span className="text-xs text-[#a8a29e] text-right" style={{ fontFamily: "var(--font-inconsolata)" }}>{s.volume}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-28 px-6" style={{ backgroundColor: "#f0ede6" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="mb-16">
            <p className="text-[10px] text-[#b8860b] tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-inconsolata)" }}>How it works</p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1c1917]">Start in seconds. Build your edge over time.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: "1", title: "Swipe on startups", desc: "Browse a curated feed with real-time scores. Swipe bullish, bearish, or add to your portfolio. Every swipe feeds the intelligence engine." },
              { num: "2", title: "Track your accuracy", desc: "Your predictions are scored over time. Build a Performance Score that quantifies your investment instinct and ranks you in your niche." },
              { num: "3", title: "Surface your edge", desc: "The recommendation engine learns your thesis. See what matters to you — and what your competitors are watching — without the noise." },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <div className="w-10 h-10 rounded-full bg-[#1c1917] text-[#f7f5f0] text-sm font-bold flex items-center justify-center mb-5">{step.num}</div>
                <h3 className="text-lg font-bold mb-3 text-[#1c1917]">{step.title}</h3>
                <p className="text-sm text-[#78716c] leading-relaxed" style={{ fontFamily: "var(--font-inconsolata)" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THREE SCORES ─── */}
      <section className="py-28 px-6" style={{ backgroundColor: "#f7f5f0" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="mb-16">
            <p className="text-[10px] text-[#b8860b] tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-inconsolata)" }}>Intelligence layer</p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1c1917]">Three scores that give you the full picture.</h2>
          </motion.div>

          <div className="space-y-5">
            {SCORES_DETAIL.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`rounded-2xl ${s.tint} p-8 shadow-md shadow-black/[0.02]`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  <div className="md:w-48 flex-shrink-0">
                    <div className={`text-4xl font-bold ${s.color} mb-1`} style={{ fontFamily: "var(--font-inconsolata)" }}>{s.value}</div>
                    <div className="text-[10px] text-[#a8a29e] uppercase tracking-widest" style={{ fontFamily: "var(--font-inconsolata)" }}>{s.trend}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 text-[#1c1917]">{s.title}</h3>
                    <p className="text-sm text-[#78716c] leading-relaxed mb-4" style={{ fontFamily: "var(--font-inconsolata)" }}>{s.desc}</p>
                    <div className="flex items-start gap-2.5 text-xs text-[#a8a29e]">
                      <div className={`w-1 h-1 rounded-full ${s.accent} mt-1.5 flex-shrink-0`} />
                      <span className="leading-relaxed" style={{ fontFamily: "var(--font-inconsolata)" }}>{s.example}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-24 px-6 bg-[#1c1917]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2,847", label: "Active VCs" },
              { value: "12,439", label: "Startups tracked" },
              { value: "480K", label: "Weekly predictions" },
              { value: "<1s", label: "Feed latency" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl font-bold mb-1.5 text-[#f7f5f0]" style={{ fontFamily: "var(--font-inconsolata)" }}>{stat.value}</div>
                <div className="text-xs text-[#78716c]" style={{ fontFamily: "var(--font-inconsolata)" }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO IT'S FOR ─── */}
      <section className="py-28 px-6" style={{ backgroundColor: "#f7f5f0" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="mb-16">
            <p className="text-[10px] text-[#b8860b] tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-inconsolata)" }}>Built for</p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1c1917]">VCs who want to move faster with better data.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Associates & Principals", desc: "Scan the market in 5-minute gaps between meetings. Build a provable track record that earns you a seat at the table.", tag: "Series A/B focus" },
              { title: "Emerging Fund Managers", desc: "Compete with top-tier funds on intelligence, not just network. Surface deals before they're obvious.", tag: "$100M-$500M AUM" },
              { title: "Sector Specialists", desc: "Dominate your niche leaderboard. See exactly which peers are circling the same deals in your vertical.", tag: "Deep vertical focus" },
            ].map((persona, i) => (
              <motion.div
                key={persona.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group p-6 rounded-2xl bg-white shadow-md shadow-[#1c1917]/[0.03] hover:shadow-lg hover:shadow-[#1c1917]/[0.06] transition-all duration-300"
              >
                <div className="inline-block px-2.5 py-1 rounded text-[10px] font-medium text-[#b8860b] bg-[#b8860b]/[0.08] mb-4" style={{ fontFamily: "var(--font-inconsolata)" }}>{persona.tag}</div>
                <h3 className="text-base font-bold mb-2 text-[#1c1917]">{persona.title}</h3>
                <p className="text-xs text-[#78716c] leading-relaxed" style={{ fontFamily: "var(--font-inconsolata)" }}>{persona.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-28 px-6" style={{ backgroundColor: "#f0ede6" }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-5 text-[#1c1917]">
            See what the market sees.
          </h2>
          <p className="text-[#78716c] text-sm mb-10" style={{ fontFamily: "var(--font-inconsolata)" }}>
            Start swiping anonymously. No account, no credit card, no onboarding. Just market intelligence.
          </p>
          <button className="px-10 py-3.5 text-sm font-semibold bg-[#1c1917] text-[#f7f5f0] rounded-lg hover:bg-[#2c2926] transition-colors shadow-lg shadow-[#1c1917]/10">
            Get Early Access
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6" style={{ backgroundColor: "#f7f5f0" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs font-bold text-[#a8a29e]">SignalVC</span>
          <span className="text-[10px] text-[#d6d3d1]" style={{ fontFamily: "var(--font-inconsolata)" }}>Real-time venture intelligence</span>
        </div>
      </footer>
    </div>
  );
}
