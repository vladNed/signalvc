"use client";

import { motion } from "motion/react";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { ArrowUp, ArrowDown, ArrowRight, ChevronRight } from "lucide-react";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

function MiniCard() {
  return (
    <motion.div
      whileHover={{ rotate: -1, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full max-w-sm"
    >
      {/* Orange rim glow */}
      <div className="relative">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-orange-500/30 via-transparent to-orange-500/10" />
        <div className="relative rounded-2xl bg-[#0e0e12] p-5 shadow-2xl shadow-orange-950/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] text-[#555] tracking-widest uppercase mb-0.5" style={{ fontFamily: "var(--font-manrope)" }}>Series A · Fintech</div>
              <div className="text-base font-bold text-white" style={{ fontFamily: "var(--font-bricolage)" }}>NovaPay</div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_6px_rgba(251,146,60,0.6)]" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
              <span className="text-[10px] text-[#555]" style={{ fontFamily: "var(--font-manrope)" }}>Live</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <div className="rounded-xl bg-emerald-500/[0.08] p-3">
              <div className="text-[9px] text-emerald-400/50 tracking-widest uppercase mb-0.5" style={{ fontFamily: "var(--font-manrope)" }}>Bull/Bear</div>
              <div className="text-lg font-bold text-emerald-400" style={{ fontFamily: "var(--font-bricolage)" }}>82%</div>
            </div>
            <div className="rounded-xl bg-orange-500/[0.08] p-3">
              <div className="text-[9px] text-orange-400/50 tracking-widest uppercase mb-0.5" style={{ fontFamily: "var(--font-manrope)" }}>Peers</div>
              <div className="text-lg font-bold text-orange-400" style={{ fontFamily: "var(--font-bricolage)" }}>47</div>
            </div>
          </div>

          <div className="flex gap-2">
            {[
              { icon: ArrowDown, label: "Bear", cls: "text-red-400/60 bg-red-500/[0.08] hover:bg-red-500/[0.15]" },
              { icon: ArrowUp, label: "Bull", cls: "text-emerald-400/60 bg-emerald-500/[0.08] hover:bg-emerald-500/[0.15]" },
              { icon: ArrowRight, label: "Invest", cls: "text-orange-400/60 bg-orange-500/[0.08] hover:bg-orange-500/[0.15]" },
            ].map((a) => (
              <button key={a.label} className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs transition-colors ${a.cls}`}>
                <a.icon className="w-3 h-3" /> {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SharpPitchPage() {
  return (
    <div
      className={`${bricolage.variable} ${manrope.variable} min-h-screen text-[#ededed]`}
      style={{
        fontFamily: "var(--font-manrope)",
        backgroundColor: "#07070a",
      }}
    >
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#07070a]/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-sm font-extrabold tracking-tight" style={{ fontFamily: "var(--font-bricolage)" }}>
            SignalVC
          </div>
          <button className="px-5 py-2 text-xs font-bold bg-orange-500 text-white rounded-xl hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/20">
            Get Early Access
          </button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center pt-16 px-6 overflow-hidden">
        {/* Dramatic orange light spill */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-orange-500/[0.04] rounded-full blur-[200px] pointer-events-none translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/[0.02] rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-16 lg:gap-24">
            <div className="flex-1">
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-block px-3.5 py-1.5 rounded-full bg-orange-500/[0.1] mb-8">
                  <span className="text-[11px] text-orange-400/80 font-medium">Now in early access</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight mb-7"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                The VC market
                <br />
                has no scoreboard.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">We built one.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-base text-[#666] leading-relaxed mb-8 max-w-md"
              >
                Real-time startup sentiment. Competitive rankings. A verifiable track record. All from a single swipe.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="flex items-center gap-5"
              >
                <button className="px-8 py-3 text-sm font-bold bg-orange-500 text-white rounded-xl hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/25 hover:-translate-y-0.5">
                  Start Swiping
                </button>
                <span className="text-xs text-[#555]">No account required</span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 0.4, duration: 0.9, type: "spring", stiffness: 80 }}
              className="flex-shrink-0"
            >
              <MiniCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEM / SOLUTION SPLIT ─── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
            {/* Problem side */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
              <div className="text-xs text-[#444] tracking-widest uppercase mb-6 font-medium">Without SignalVC</div>
              <div className="space-y-6">
                {[
                  "You don't know what other VCs are watching.",
                  "Deal flow depends on who you know, not what you know.",
                  "No way to prove your prediction accuracy.",
                  "Existing tools update quarterly. The market moves daily.",
                ].map((problem, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#333] mt-2 flex-shrink-0" />
                    <p className="text-sm text-[#666] leading-relaxed">{problem}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Solution side */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: 0.15, duration: 0.6 }}>
              <div className="text-xs text-orange-400/60 tracking-widest uppercase mb-6 font-medium">With SignalVC</div>
              <div className="space-y-6">
                {[
                  "See real-time sentiment on every startup from the VC crowd.",
                  "Intelligence-driven deal flow. Your thesis, surfaced automatically.",
                  "A Performance Score that quantifies your investment instinct.",
                  "Live data. Every swipe updates the market in real time.",
                ].map((solution, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                    <p className="text-sm text-[#bbb] leading-relaxed">{solution}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── YOUR EDGE: THREE SCORES ─── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="mb-16 max-w-lg">
            <h2 className="text-4xl font-extrabold tracking-tight mb-4" style={{ fontFamily: "var(--font-bricolage)" }}>
              Three metrics.{" "}
              <span className="text-[#333]">No guesswork.</span>
            </h2>
            <p className="text-sm text-[#666] leading-relaxed">
              Every score is derived from real VC activity. Not surveys, not estimates — actual prediction data.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                name: "Bull/Bear Score",
                value: "78%",
                label: "Bullish",
                desc: "Aggregate market sentiment on a startup. Derived from thousands of Up/Down swipes. Think fear/greed index, but for individual startups.",
                bg: "bg-emerald-500/[0.05]",
                valueColor: "text-emerald-400",
                hoverBg: "hover:bg-emerald-500/[0.08]",
              },
              {
                name: "Peer Score",
                value: "47 VCs",
                label: "Watching",
                desc: "How many investors in your sector are watching the same deal. High peer score = competitive deal. Low = potential alpha.",
                bg: "bg-blue-500/[0.05]",
                valueColor: "text-blue-400",
                hoverBg: "hover:bg-blue-500/[0.08]",
              },
              {
                name: "Performance Score",
                value: "92%",
                label: "Accuracy",
                desc: "Your personal track record. How often your predictions align with actual market outcomes. A verifiable, portable reputation.",
                bg: "bg-amber-500/[0.05]",
                valueColor: "text-amber-400",
                hoverBg: "hover:bg-amber-500/[0.08]",
              },
            ].map((score, i) => (
              <motion.div
                key={score.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`flex flex-col md:flex-row md:items-center gap-6 p-7 rounded-2xl ${score.bg} ${score.hoverBg} transition-all duration-300 group cursor-default`}
              >
                <div className="md:w-36 flex-shrink-0">
                  <div className={`text-3xl font-extrabold ${score.valueColor}`} style={{ fontFamily: "var(--font-bricolage)" }}>{score.value}</div>
                  <div className="text-[10px] text-[#555] uppercase tracking-widest mt-1">{score.label}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold mb-1.5 text-white" style={{ fontFamily: "var(--font-bricolage)" }}>{score.name}</h3>
                  <p className="text-xs text-[#666] leading-relaxed">{score.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#222] hidden md:block flex-shrink-0 group-hover:text-[#444] group-hover:translate-x-1 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPARISON ─── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-bricolage)" }}>
              Why this and not PitchBook?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { us: "Real-time sentiment", them: "Quarterly reports" },
              { us: "Crowd intelligence from 2,847 VCs", them: "Single-source database" },
              { us: "Competitive rankings & prediction tracking", them: "No performance metrics" },
              { us: "Start swiping in 3 seconds", them: "Weeks of enterprise onboarding" },
              { us: "Free anonymous access", them: "$20K+ annual contracts" },
              { us: "Mobile-first, gesture-driven", them: "Desktop spreadsheet interface" },
            ].map((row, i) => (
              <motion.div
                key={row.us}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="flex items-center gap-4 p-5 rounded-xl bg-[#0c0c10] hover:bg-[#101015] transition-colors group"
              >
                <div className="flex-1">
                  <div className="text-xs text-[#ddd] font-medium">{row.us}</div>
                </div>
                <div className="text-[9px] text-[#333] font-bold tracking-wider">VS</div>
                <div className="flex-1 text-right">
                  <div className="text-xs text-[#444] group-hover:text-[#555] transition-colors">{row.them}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "2,847", label: "VCs on platform" },
            { value: "12K+", label: "Startups scored" },
            { value: "480K", label: "Weekly swipes" },
            { value: "32", label: "Countries" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl font-extrabold mb-1.5 text-white" style={{ fontFamily: "var(--font-bricolage)" }}>{stat.value}</div>
              <div className="text-[11px] text-[#444]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-36 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/[0.03] to-transparent pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-lg mx-auto text-center relative"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5" style={{ fontFamily: "var(--font-bricolage)" }}>
            Stop guessing.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Start knowing.</span>
          </h2>
          <p className="text-[#666] text-sm mb-10">
            The market is already moving. Your competitors are already swiping. No account required to start.
          </p>
          <button className="px-10 py-3.5 text-sm font-bold bg-orange-500 text-white rounded-xl hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5">
            Get Early Access
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs text-[#333] font-extrabold" style={{ fontFamily: "var(--font-bricolage)" }}>SignalVC</span>
          <span className="text-[10px] text-[#222]">Real-time venture intelligence</span>
        </div>
      </footer>
    </div>
  );
}
