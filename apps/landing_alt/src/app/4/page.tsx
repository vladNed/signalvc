"use client";

import { motion } from "motion/react";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { Activity, Lock, Radar, Users, BarChart3, Globe, ArrowUpRight } from "lucide-react";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const ibmMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-mono",
});

const FEED_ITEMS = [
  { name: "CortexAI", sector: "AI/ML", bull: 88, peers: 63, val: "$62M", delta: "+5.3%", hot: true },
  { name: "NovaPay", sector: "Fintech", bull: 82, peers: 47, val: "$24M", delta: "+3.2%", hot: false },
  { name: "GridFlux", sector: "Climate", bull: 74, peers: 31, val: "$45M", delta: "+7.1%", hot: true },
  { name: "NeuroLink", sector: "Health", bull: 73, peers: 28, val: "$31M", delta: "+1.6%", hot: false },
  { name: "DataForge", sector: "Infra", bull: 85, peers: 52, val: "$89M", delta: "+4.8%", hot: false },
  { name: "VaultEdge", sector: "Security", bull: 42, peers: 19, val: "$15M", delta: "-2.9%", hot: false },
];

export default function IntelligencePlatformPage() {
  return (
    <div
      className={`${archivo.variable} ${ibmMono.variable} min-h-screen text-[#c8d6e5]`}
      style={{
        fontFamily: "var(--font-archivo)",
        backgroundColor: "#080c18",
      }}
    >
      {/* Radar pulse ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.02]" style={{ background: "conic-gradient(from 0deg, transparent 0deg, rgba(52,211,153,0.3) 20deg, transparent 40deg)", animation: "radar-sweep 8s linear infinite" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.02] blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#080c18]/85">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-sm font-bold tracking-tight">SignalVC</div>
            <div className="h-4 w-px bg-[#1a2340]" />
            <span className="text-[10px] text-[#3a4a6b] tracking-widest uppercase" style={{ fontFamily: "var(--font-ibm-mono)" }}>Intelligence</span>
          </div>
          <button className="px-4 py-1.5 text-xs font-medium text-[#8899b8] bg-[#0f1528] hover:bg-[#141d38] rounded-lg transition-colors">
            Request Access
          </button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="pt-32 pb-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Radar className="w-4 h-4 text-emerald-500/40" />
              <span className="text-[10px] text-[#3a4a6b] tracking-widest uppercase" style={{ fontFamily: "var(--font-ibm-mono)" }}>Market intelligence infrastructure</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-5 text-[#e8edf5]">
              Venture capital intelligence.{" "}
              <span className="text-[#3a4a6b]">Real-time. Crowd-sourced. Actionable.</span>
            </h1>
            <p className="text-sm text-[#5a6a8b] leading-relaxed mb-8 max-w-lg" style={{ fontFamily: "var(--font-ibm-mono)" }}>
              SignalVC aggregates predictions from 2,847 VCs across 14 sectors into three proprietary scores that give you a complete picture of any startup&apos;s market position.
            </p>
            <div className="flex items-center gap-3">
              <button className="px-6 py-2.5 text-xs font-bold bg-[#e8edf5] text-[#080c18] rounded-lg hover:bg-white transition-colors shadow-lg shadow-white/5">
                Request Access
              </button>
              <button className="px-6 py-2.5 text-xs font-medium text-[#8899b8] bg-[#0f1528] hover:bg-[#141d38] rounded-lg transition-colors">
                View Live Feed
              </button>
            </div>
          </motion.div>

          {/* Live feed preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="rounded-2xl bg-[#0b1024] shadow-2xl shadow-black/40 overflow-hidden"
          >
            {/* Feed header */}
            <div className="flex items-center justify-between px-6 py-3.5 bg-[#0a0e20]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
                  <span className="text-[10px] text-emerald-400/60 font-medium" style={{ fontFamily: "var(--font-ibm-mono)" }}>LIVE FEED</span>
                </div>
                <div className="h-3 w-px bg-[#1a2340]" />
                <span className="text-[10px] text-[#2a3a5b]" style={{ fontFamily: "var(--font-ibm-mono)" }}>6 targets visible</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#2a3a5b]" style={{ fontFamily: "var(--font-ibm-mono)" }}>
                <Lock className="w-3 h-3" />Full feed requires access
              </div>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-[1fr_70px_70px_80px_80px_60px] gap-0 px-6 py-2.5 text-[9px] text-[#3a4a6b] tracking-widest uppercase bg-[#090d1c]" style={{ fontFamily: "var(--font-ibm-mono)" }}>
              <span>Target</span>
              <span className="text-right">Bull/Bear</span>
              <span className="text-right">Peers</span>
              <span className="text-right">Valuation</span>
              <span className="text-right">Δ 7d</span>
              <span className="text-right">Signal</span>
            </div>

            {FEED_ITEMS.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                className="grid grid-cols-[1fr_70px_70px_80px_80px_60px] gap-0 px-6 py-3.5 hover:bg-[#0d1228] transition-colors"
                style={{ borderTop: "1px solid rgba(26,35,64,0.4)" }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-medium text-[#d0d8e8]">{item.name}</span>
                  <span className="text-[10px] text-[#3a4a6b]">{item.sector}</span>
                  {item.hot && <span className="text-[9px] text-amber-300 bg-amber-400/[0.08] px-1.5 py-0.5 rounded font-medium">HOT</span>}
                </div>
                <div className="flex items-center justify-end">
                  <span className={`text-xs font-medium ${item.bull > 70 ? "text-emerald-400" : item.bull > 50 ? "text-[#7a8aab]" : "text-red-400"}`} style={{ fontFamily: "var(--font-ibm-mono)" }}>
                    {item.bull}%
                  </span>
                </div>
                <div className="text-xs text-[#5a6a8b] text-right" style={{ fontFamily: "var(--font-ibm-mono)" }}>{item.peers}</div>
                <div className="text-xs text-[#7a8aab] text-right" style={{ fontFamily: "var(--font-ibm-mono)" }}>{item.val}</div>
                <div className={`text-xs text-right font-medium ${item.delta.startsWith("+") ? "text-emerald-400" : "text-red-400"}`} style={{ fontFamily: "var(--font-ibm-mono)" }}>
                  {item.delta}
                </div>
                <div className="flex justify-end">
                  <div className="w-8 h-4 flex items-end gap-px">
                    {[40, 55, 45, 70, 65, 80, 75].map((h, j) => (
                      <div key={j} className={`flex-1 rounded-sm ${item.bull > 60 ? "bg-emerald-500/30" : "bg-red-400/30"}`} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── THREE SCORES ─── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="mb-14">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-emerald-500/40" />
              <span className="text-[10px] text-[#3a4a6b] tracking-widest uppercase" style={{ fontFamily: "var(--font-ibm-mono)" }}>Proprietary scoring</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#e8edf5]">Three metrics derived from real VC activity.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: BarChart3,
                title: "Bull/Bear Score",
                formula: "Σ(up_swipes - down_swipes) / total_swipes",
                desc: "Real-time aggregate sentiment. Updated with every swipe across the network. Analogous to a fear/greed index per startup.",
                metric: "78%",
                metricNote: "avg bullish",
              },
              {
                icon: Users,
                title: "Peer Score",
                formula: "n_sector_vcs / total_sector_investors",
                desc: "Competitive intelligence metric. Measures how many VCs in your specific niche are tracking the same target.",
                metric: "47",
                metricNote: "VCs watching",
              },
              {
                icon: Radar,
                title: "Performance Score",
                formula: "(correct_predictions / total) × w₁ + portfolio_growth × w₂",
                desc: "Personal prediction accuracy. Based on swipe outcomes and portfolio performance. A portable, verifiable reputation.",
                metric: "92%",
                metricNote: "accuracy",
              },
            ].map((score, i) => (
              <motion.div
                key={score.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group p-6 rounded-2xl bg-[#0b1024] hover:bg-[#0d1228] transition-all duration-300 shadow-lg shadow-black/20"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/[0.06] flex items-center justify-center mb-4">
                  <score.icon className="w-4 h-4 text-emerald-400/50" />
                </div>
                <h3 className="text-sm font-bold mb-2 text-[#d0d8e8]">{score.title}</h3>
                <div className="text-[10px] text-[#2a3a5b] mb-4 px-2.5 py-1.5 bg-[#080c18] rounded-lg inline-block" style={{ fontFamily: "var(--font-ibm-mono)" }}>
                  {score.formula}
                </div>
                <p className="text-xs text-[#5a6a8b] leading-relaxed mb-5" style={{ fontFamily: "var(--font-ibm-mono)" }}>{score.desc}</p>
                <div className="flex items-baseline gap-2 pt-4" style={{ borderTop: "1px solid rgba(26,35,64,0.3)" }}>
                  <span className="text-2xl font-bold text-[#e8edf5]" style={{ fontFamily: "var(--font-ibm-mono)" }}>{score.metric}</span>
                  <span className="text-[10px] text-[#3a4a6b]">{score.metricNote}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="mb-14">
            <span className="text-[10px] text-[#3a4a6b] tracking-widest uppercase" style={{ fontFamily: "var(--font-ibm-mono)" }}>Methodology</span>
            <h2 className="text-2xl font-bold tracking-tight mt-3 text-[#e8edf5]">How the intelligence engine works.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Ingest", desc: "VCs swipe on startups: bullish, bearish, pass, or invest. Each action is a data point." },
              { step: "02", title: "Score", desc: "Swipe data feeds into three proprietary scores. Updated in real-time across the network." },
              { step: "03", title: "Rank", desc: "VCs are ranked within their niche by prediction accuracy. Leaderboards update continuously." },
              { step: "04", title: "Surface", desc: "The recommendation engine learns each VC's thesis and surfaces relevant targets weighted by market heat." },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative"
              >
                {i < 3 && <div className="hidden md:block absolute top-4 left-full w-full h-px bg-gradient-to-r from-[#1a2340] to-transparent" />}
                <div className="text-2xl font-bold text-emerald-500/15 mb-3" style={{ fontFamily: "var(--font-ibm-mono)" }}>{s.step}</div>
                <h3 className="text-sm font-bold mb-2 text-[#d0d8e8]">{s.title}</h3>
                <p className="text-xs text-[#5a6a8b] leading-relaxed" style={{ fontFamily: "var(--font-ibm-mono)" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BUILT FOR ─── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="mb-14">
            <span className="text-[10px] text-[#3a4a6b] tracking-widest uppercase" style={{ fontFamily: "var(--font-ibm-mono)" }}>Built for</span>
            <h2 className="text-2xl font-bold tracking-tight mt-3 text-[#e8edf5]">Investment professionals who need an edge.</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Associates", detail: "Series A/B" },
              { label: "Principals", detail: "Growth equity" },
              { label: "Partners", detail: "Fund strategy" },
              { label: "Fund Managers", detail: "Emerging funds" },
            ].map((role, i) => (
              <motion.div
                key={role.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="p-4 rounded-xl bg-[#0b1024] hover:bg-[#0d1228] transition-colors shadow-md shadow-black/10"
              >
                <div className="text-sm font-medium mb-0.5 text-[#d0d8e8]">{role.label}</div>
                <div className="text-[10px] text-[#3a4a6b]" style={{ fontFamily: "var(--font-ibm-mono)" }}>{role.detail}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
            {[
              { value: "2,847", label: "Active VCs" },
              { value: "14", label: "Sectors covered" },
              { value: "32", label: "Countries" },
              { value: "$50M-$2B", label: "Fund AUM range" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="p-4 rounded-xl bg-[#090d1e]"
              >
                <div className="text-xl font-bold mb-0.5 text-[#e8edf5]" style={{ fontFamily: "var(--font-ibm-mono)" }}>{stat.value}</div>
                <div className="text-[10px] text-[#3a4a6b]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/[0.02] to-transparent pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto text-center relative"
        >
          <Globe className="w-5 h-5 text-emerald-500/30 mx-auto mb-6" />
          <h2 className="text-2xl font-bold tracking-tight mb-4 text-[#e8edf5]">
            The market is always open.
          </h2>
          <p className="text-sm text-[#5a6a8b] mb-10" style={{ fontFamily: "var(--font-ibm-mono)" }}>
            Request access to the full intelligence feed, or start swiping anonymously — no account required.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button className="px-7 py-3 text-xs font-bold bg-[#e8edf5] text-[#080c18] rounded-lg hover:bg-white transition-colors shadow-lg shadow-white/5">
              Request Access
            </button>
            <button className="group px-7 py-3 text-xs font-medium text-[#8899b8] bg-[#0f1528] hover:bg-[#141d38] rounded-lg transition-colors">
              Try Anonymous Feed <ArrowUpRight className="w-3 h-3 inline ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs text-[#2a3a5b] font-bold">SignalVC Intelligence</span>
          <span className="text-[10px] text-[#1a2340]" style={{ fontFamily: "var(--font-ibm-mono)" }}>Privileged market intelligence</span>
        </div>
      </footer>
    </div>
  );
}
