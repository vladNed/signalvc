"use client";

import { motion } from "motion/react";
import { Syne, JetBrains_Mono } from "next/font/google";
import {
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Shield,
  Users,
  BarChart3,
  Zap,
  Layers,
} from "lucide-react";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

function ProductCard() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-[320px] md:w-[360px]"
    >
      {/* Emerald ambient glow */}
      <div className="absolute -inset-4 bg-emerald-500/[0.07] rounded-3xl blur-2xl pointer-events-none" />

      <div className="relative rounded-2xl bg-[#0c0c10] shadow-2xl shadow-emerald-950/30 overflow-hidden">
        {/* Top status bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#0a0a0e]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
            <span className="text-[10px] text-[#4a4a52] tracking-wide font-mono">LIVE</span>
          </div>
          <span className="text-[10px] text-[#3a3a42] font-mono">#2,847</span>
        </div>

        {/* Card content */}
        <div className="p-5">
          <div className="text-[10px] text-[#555] tracking-widest uppercase mb-1 font-mono">Series A · Fintech</div>
          <h3 className="text-lg font-semibold text-white mb-0.5">NovaPay</h3>
          <p className="text-xs text-[#555] mb-5">Embedded finance infrastructure for emerging markets</p>

          {/* Scores */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="rounded-lg bg-emerald-500/[0.06] p-3">
              <div className="text-[9px] text-emerald-400/50 tracking-widest uppercase mb-1 font-mono">Bull/Bear</div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-semibold text-emerald-400 font-mono">82%</span>
                <span className="text-[9px] text-emerald-400/40">Bullish</span>
              </div>
            </div>
            <div className="rounded-lg bg-blue-500/[0.06] p-3">
              <div className="text-[9px] text-blue-400/50 tracking-widest uppercase mb-1 font-mono">Peer Score</div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-semibold text-blue-400 font-mono">47</span>
                <span className="text-[9px] text-blue-400/40">VCs</span>
              </div>
            </div>
          </div>

          {/* Data rows */}
          <div className="space-y-2.5 mb-5">
            {[
              ["Valuation", "$24M"],
              ["MRR", "$890K"],
              ["HQ", "Lagos, NG"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between text-xs">
                <span className="text-[#444]">{label}</span>
                <span className="text-[#888] font-mono">{value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {[
              { icon: ArrowDown, label: "Bear", cls: "text-red-400/60 bg-red-500/[0.06] hover:bg-red-500/[0.12]" },
              { icon: ArrowUp, label: "Bull", cls: "text-emerald-400/60 bg-emerald-500/[0.06] hover:bg-emerald-500/[0.12]" },
              { icon: ArrowRight, label: "Invest", cls: "text-blue-400/60 bg-blue-500/[0.06] hover:bg-blue-500/[0.12]" },
            ].map((a) => (
              <button key={a.label} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg transition-colors ${a.cls}`}>
                <a.icon className="w-3.5 h-3.5" />
                <span className="text-xs">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const PROBLEMS = [
  { icon: Shield, title: "Opaque market", desc: "No visibility into what other VCs are looking at or where sectors are heating up." },
  { icon: Users, title: "Network-gated deal flow", desc: "The best deals go to the best-connected — not necessarily the best investors." },
  { icon: BarChart3, title: "No verifiable track record", desc: "No objective measure of prediction accuracy. Promotions depend on politics, not performance." },
  { icon: Zap, title: "Stale intelligence", desc: "Existing tools are databases, not signals. Quarterly data in a market that moves daily." },
];

const SCORES = [
  {
    name: "Bull/Bear Score",
    metric: "78%",
    metricLabel: "Bullish",
    desc: "Real-time market sentiment aggregated from thousands of VC predictions on every startup.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/[0.05]",
    glow: "shadow-emerald-500/5",
  },
  {
    name: "Peer Score",
    metric: "34",
    metricLabel: "VCs watching",
    desc: "How many investors in your niche are watching the same deal. Quantified competitive intelligence.",
    color: "text-blue-400",
    bg: "bg-blue-500/[0.05]",
    glow: "shadow-blue-500/5",
  },
  {
    name: "Performance Score",
    metric: "92%",
    metricLabel: "Accuracy",
    desc: "Your personal prediction track record. A verifiable score that proves your investment instinct.",
    color: "text-amber-400",
    bg: "bg-amber-500/[0.05]",
    glow: "shadow-amber-500/5",
  },
];

export default function ProductLedPage() {
  return (
    <div
      className={`${syne.variable} ${jetbrains.variable} min-h-screen text-[#e0e0e0]`}
      style={{
        fontFamily: "var(--font-syne)",
        backgroundColor: "#050508",
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }}
    >
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#050508]/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-sm font-bold tracking-tight">
            <span className="text-white">Signal</span><span className="text-emerald-500/60">VC</span>
          </div>
          <button className="group px-4 py-1.5 text-xs font-medium bg-emerald-500 text-[#050508] rounded-lg hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30">
            Get Early Access
          </button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 px-6 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Copy */}
          <div className="flex-1 max-w-xl">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/[0.08] mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
                <span className="text-[11px] text-emerald-400/70 font-mono tracking-wide">Real-time market intelligence</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6"
            >
              Startup sentiment,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                powered by the VC crowd.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-base text-[#666] leading-relaxed mb-8 max-w-md"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Swipe on startups. See what the market thinks in real time. Build a track record that proves your edge. No account required to start.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="flex items-center gap-5"
            >
              <button className="px-7 py-3 text-sm font-bold bg-emerald-500 text-[#050508] rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5">
                Start Swiping
              </button>
              <span className="text-xs text-[#555] font-mono">No signup needed</span>
            </motion.div>
          </div>

          {/* Product card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            <ProductCard />
          </motion.div>
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }}>
            <p className="text-xs text-emerald-400/40 tracking-widest uppercase mb-4 font-mono">The problem</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 max-w-lg">
              Deal flow is broken.{" "}
              <span className="text-[#3a3a42]">It rewards connections, not conviction.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-14">
            {PROBLEMS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group p-6 rounded-2xl bg-[#0a0a0e] hover:bg-[#0d0d12] transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/[0.08] flex items-center justify-center mb-4 group-hover:bg-emerald-500/[0.12] transition-colors">
                  <p.icon className="w-4 h-4 text-emerald-400/60" />
                </div>
                <h3 className="text-sm font-bold mb-2 text-white">{p.title}</h3>
                <p className="text-xs text-[#555] leading-relaxed" style={{ fontFamily: "var(--font-jetbrains)" }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="mb-20">
            <p className="text-xs text-emerald-400/40 tracking-widest uppercase mb-4 font-mono">How it works</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Three steps. Instant edge.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: "01", title: "Swipe", desc: "Browse startups with real-time sentiment data. React with a single gesture — bullish, bearish, or invest." },
              { num: "02", title: "Compete", desc: "Your predictions build your Performance Score. See how you rank against other VCs in your niche." },
              { num: "03", title: "Discover", desc: "The feed learns your focus. Surface what matters to your thesis. Filter what doesn't." },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
              >
                <div className="text-3xl font-extrabold text-emerald-500/20 mb-4 font-mono">{step.num}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed" style={{ fontFamily: "var(--font-jetbrains)" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THREE SCORES ─── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="mb-16">
            <p className="text-xs text-emerald-400/40 tracking-widest uppercase mb-4 font-mono">Intelligence layer</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Three scores. One complete picture.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SCORES.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`p-6 rounded-2xl ${s.bg} shadow-lg ${s.glow}`}
              >
                <div className="flex items-baseline gap-2 mb-5">
                  <span className={`text-3xl font-extrabold ${s.color} font-mono`}>{s.metric}</span>
                  <span className="text-[10px] text-[#555] font-mono tracking-wide">{s.metricLabel}</span>
                </div>
                <h3 className="text-sm font-bold mb-2 text-white">{s.name}</h3>
                <p className="text-xs text-[#555] leading-relaxed" style={{ fontFamily: "var(--font-jetbrains)" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2,847", label: "VCs on platform" },
              { value: "12K+", label: "Startups scored" },
              { value: "480K", label: "Weekly predictions" },
              { value: "32", label: "Countries" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl font-extrabold mb-1.5 text-white font-mono">{stat.value}</div>
                <div className="text-[11px] text-[#444] font-mono tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPARISON ─── */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="mb-14">
            <h2 className="text-3xl font-extrabold tracking-tight text-center">Not another database.</h2>
          </motion.div>

          <div className="rounded-2xl bg-[#0a0a0e] shadow-2xl shadow-black/30 overflow-hidden">
            <div className="grid grid-cols-[1fr_1fr]">
              <div className="px-6 py-4 text-[10px] text-emerald-400/60 tracking-widest uppercase font-mono bg-emerald-500/[0.04]">SignalVC</div>
              <div className="px-6 py-4 text-[10px] text-[#3a3a42] tracking-widest uppercase font-mono">Traditional tools</div>
            </div>
            {[
              ["Real-time crowd sentiment", "Stale quarterly data"],
              ["Prediction-based intelligence", "Static database lookups"],
              ["Competitive scoring & rankings", "No performance tracking"],
              ["Zero friction — start instantly", "Enterprise onboarding"],
            ].map(([us, them], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="grid grid-cols-[1fr_1fr] group hover:bg-[#0d0d12] transition-colors"
              >
                <div className="px-6 py-4 text-xs text-[#bbb]">{us}</div>
                <div className="px-6 py-4 text-xs text-[#333]">{them}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-36 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/[0.02] to-transparent pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-lg mx-auto text-center relative"
        >
          <Layers className="w-6 h-6 text-emerald-500/30 mx-auto mb-6" />
          <h2 className="text-4xl font-extrabold tracking-tight mb-5">
            See what the market sees.
          </h2>
          <p className="text-[#555] mb-10" style={{ fontFamily: "var(--font-jetbrains)" }}>The market is already moving. Start swiping — no account required.</p>
          <button className="px-10 py-3.5 text-sm font-bold bg-emerald-500 text-[#050508] rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5">
            Get Early Access
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs text-[#333] font-bold">SignalVC</span>
          <span className="text-[10px] text-[#222] font-mono">Real-time venture intelligence</span>
        </div>
      </footer>
    </div>
  );
}
