"use client";

import { motion } from "motion/react";
import { Outfit, DM_Sans } from "next/font/google";
import { ArrowRight, ArrowUp, ArrowDown, TrendingUp, Users, Target, Sparkles, ChevronRight } from "lucide-react";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

function GlassCard({ children, className = "", hover = false }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`relative rounded-2xl bg-white/[0.03] backdrop-blur-md ${hover ? "hover:bg-white/[0.05] transition-all duration-500" : ""} ${className}`}>
      {/* Luminous edge - subtle gradient border */}
      <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)", mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude", padding: "1px" }} />
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

export default function PolishedSaaSPage() {
  return (
    <div className={`${outfit.variable} ${dmSans.variable} min-h-screen bg-[#08080d] text-white`} style={{ fontFamily: "var(--font-dm-sans)" }}>

      {/* Aurora gradients - richer, more vivid */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-300px] left-[10%] w-[800px] h-[800px] rounded-full bg-violet-500/[0.05] blur-[150px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] right-[-5%] w-[600px] h-[600px] rounded-full bg-cyan-500/[0.04] blur-[130px]"
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-200px] left-[30%] w-[700px] h-[700px] rounded-full bg-teal-500/[0.03] blur-[120px]"
        />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#08080d]/70">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-sm font-bold tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
            Signal<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">VC</span>
          </div>
          <button className="px-5 py-2 text-xs font-semibold bg-gradient-to-r from-violet-500 to-cyan-400 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/15">
            Get Early Access
          </button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pt-40 pb-28 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] mb-8">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-[11px] text-white/40 font-medium">Early access now open</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-7 max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            See what the market sees.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-300 to-teal-300">
              Before everyone else.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-base text-white/35 leading-relaxed mb-10 max-w-lg mx-auto"
          >
            Real-time startup sentiment from the VC crowd. Swipe, predict, and build a track record that proves your investment edge.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex items-center justify-center gap-5"
          >
            <button className="px-8 py-3 text-sm font-bold bg-gradient-to-r from-violet-500 to-cyan-400 text-white rounded-xl hover:opacity-90 transition-all shadow-lg shadow-violet-500/20 hover:-translate-y-0.5">
              Start Swiping
            </button>
            <span className="text-xs text-white/25">No account required</span>
          </motion.div>

          {/* Product preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="mt-24 max-w-3xl mx-auto"
          >
            <GlassCard className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
                  <span className="text-[10px] text-white/25 tracking-widest uppercase">Live feed preview</span>
                </div>
                <span className="text-[10px] text-white/15">2,847 VCs online</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { name: "CortexAI", sector: "AI/ML", bull: 88, peers: 63, val: "$62M" },
                  { name: "NovaPay", sector: "Fintech", bull: 82, peers: 47, val: "$24M" },
                  { name: "GridFlux", sector: "Climate", bull: 74, peers: 31, val: "$45M" },
                ].map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.12, duration: 0.5 }}
                    className="rounded-xl bg-white/[0.03] p-4 hover:bg-white/[0.05] transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-xs font-semibold text-white/75" style={{ fontFamily: "var(--font-outfit)" }}>{s.name}</div>
                        <div className="text-[10px] text-white/20">{s.sector}</div>
                      </div>
                      <div className="text-[10px] text-white/15">{s.val}</div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div>
                        <div className="text-xl font-bold text-emerald-400" style={{ fontFamily: "var(--font-outfit)" }}>{s.bull}%</div>
                        <div className="text-[9px] text-white/15">Bull/Bear</div>
                      </div>
                      <div className="h-6 w-px bg-white/[0.04]" />
                      <div>
                        <div className="text-xl font-bold text-violet-400" style={{ fontFamily: "var(--font-outfit)" }}>{s.peers}</div>
                        <div className="text-[9px] text-white/15">Peers</div>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      {[ArrowDown, ArrowUp, ArrowRight].map((Icon, j) => (
                        <button key={j} className="flex-1 flex items-center justify-center py-1.5 rounded-lg bg-white/[0.03] text-white/20 hover:bg-white/[0.06] hover:text-white/40 transition-all text-[10px]">
                          <Icon className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
              Built for VCs who move fast.
            </h2>
            <p className="text-sm text-white/30 max-w-md mx-auto">Three capabilities that give you an unfair advantage in startup scouting.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: TrendingUp,
                title: "Real-Time Sentiment",
                desc: "Every swipe updates the Bull/Bear Score in real time. See exactly where the crowd stands on any startup, right now.",
                gradient: "from-emerald-400 to-teal-400",
                glow: "bg-emerald-500/[0.06]",
              },
              {
                icon: Users,
                title: "Competitive Intelligence",
                desc: "Peer Scores reveal how many VCs in your niche are watching the same deal. High score means competition. Low means alpha.",
                gradient: "from-violet-400 to-blue-400",
                glow: "bg-violet-500/[0.06]",
              },
              {
                icon: Target,
                title: "Verifiable Track Record",
                desc: "Your Performance Score tracks prediction accuracy over time. A portable reputation that proves your investment instinct.",
                gradient: "from-cyan-400 to-teal-400",
                glow: "bg-cyan-500/[0.06]",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
              >
                <GlassCard className="p-7 h-full" hover>
                  <div className={`w-11 h-11 rounded-xl ${feature.glow} flex items-center justify-center mb-5`}>
                    <feature.icon className={`w-5 h-5 text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient}`} style={{ color: "currentColor" }} />
                  </div>
                  <h3 className="text-base font-bold mb-2.5 text-white/90" style={{ fontFamily: "var(--font-outfit)" }}>{feature.title}</h3>
                  <p className="text-xs text-white/30 leading-relaxed">{feature.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ fontFamily: "var(--font-outfit)" }}>How it works.</h2>
            <p className="text-sm text-white/30 max-w-md">Start in seconds. Build your edge over time.</p>
          </motion.div>

          <div className="space-y-4">
            {[
              { num: "01", title: "Browse & Swipe", desc: "Open the feed. See startups with real-time scores. Swipe bullish, bearish, or add to your portfolio. Each swipe takes 2 seconds.", cta: "No account needed" },
              { num: "02", title: "Track Your Accuracy", desc: "Every prediction is scored. Your Performance Score builds over time, ranking you against other VCs in your niche.", cta: "Builds automatically" },
              { num: "03", title: "Surface Your Edge", desc: "The recommendation engine learns your thesis. Relevant startups surface automatically. Noise disappears.", cta: "Gets smarter over time" },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <GlassCard className="p-7 flex flex-col md:flex-row md:items-center gap-6" hover>
                  <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-300 w-12 flex-shrink-0" style={{ fontFamily: "var(--font-outfit)" }}>
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold mb-1.5 text-white/85" style={{ fontFamily: "var(--font-outfit)" }}>{step.title}</h3>
                    <p className="text-xs text-white/35 leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-[10px] text-violet-400/50 bg-violet-400/[0.06] px-3 py-1.5 rounded-full font-medium">{step.cta}</span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <GlassCard className="p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "2,847", label: "Active VCs" },
                { value: "12K+", label: "Startups tracked" },
                { value: "480K", label: "Weekly predictions" },
                { value: "32", label: "Countries" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-3xl font-extrabold mb-1.5 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-300" style={{ fontFamily: "var(--font-outfit)" }}>
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-white/25">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ─── WHO IT'S FOR ─── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-3" style={{ fontFamily: "var(--font-outfit)" }}>Built for every stage of VC.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Associates & Principals", desc: "Scan the market in 5-minute gaps between meetings. Build a provable track record.", tag: "Series A/B" },
              { title: "Emerging Fund Managers", desc: "Compete with top-tier funds on intelligence, not just network. Surface deals early.", tag: "$100M-$500M AUM" },
              { title: "Sector Specialists", desc: "Dominate your niche. See exactly which peers are circling the same deals.", tag: "Deep verticals" },
            ].map((persona, i) => (
              <motion.div
                key={persona.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <GlassCard className="p-6 h-full group" hover>
                  <span className="text-[10px] text-violet-400/40 bg-violet-400/[0.06] px-2.5 py-1 rounded-full font-medium">{persona.tag}</span>
                  <h3 className="text-sm font-bold mt-4 mb-2" style={{ fontFamily: "var(--font-outfit)" }}>{persona.title}</h3>
                  <p className="text-xs text-white/30 leading-relaxed mb-4">{persona.desc}</p>
                  <div className="flex items-center gap-1 text-[10px] text-violet-400/30 group-hover:text-violet-400/60 transition-colors">
                    Learn more <ChevronRight className="w-3 h-3" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-36 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-500/[0.03] to-transparent pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-lg mx-auto text-center relative"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6" style={{ fontFamily: "var(--font-outfit)" }}>
            Ready to see{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-300 to-teal-300">
              the signal?
            </span>
          </h2>
          <p className="text-white/30 text-sm mb-10 max-w-sm mx-auto">
            Start swiping anonymously. No account, no onboarding. Just real-time market intelligence.
          </p>
          <button className="px-10 py-3.5 text-sm font-bold bg-gradient-to-r from-violet-500 to-cyan-400 text-white rounded-xl hover:opacity-90 transition-all shadow-lg shadow-violet-500/20 hover:-translate-y-0.5">
            Get Early Access
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs text-white/15 font-bold" style={{ fontFamily: "var(--font-outfit)" }}>SignalVC</span>
          <span className="text-[10px] text-white/8">Real-time venture intelligence</span>
        </div>
      </footer>
    </div>
  );
}
