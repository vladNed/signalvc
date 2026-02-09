"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Layers,
  Command,
  Sparkles,
  ArrowRight,
  Zap,
  Eye,
  Trophy,
  Activity,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export function Design4() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="min-h-screen bg-[#09090B] text-white overflow-hidden relative selection:bg-[#3B82F6] selection:text-white font-sans">
      {/* Background Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#3B82F6] rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[150px] opacity-10 pointer-events-none" />

      {/* Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
        <div className="bg-black/40 w-full h-14 rounded-full border border-white/10 backdrop-blur-xl shadow-xl flex items-center justify-between px-6 transition-all hover:bg-black/60 hover:border-white/20">
          <span className="font-bold flex items-center gap-2 tracking-tight">
            <div className="bg-blue-600/20 p-1 rounded-md">
              <Layers className="h-4 w-4 text-[#3B82F6]" />
            </div>
            SignalVC
          </span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
            <span className="hover:text-white cursor-pointer transition-colors">Features</span>
            <span className="hover:text-white cursor-pointer transition-colors">Manifesto</span>
            <span className="hover:text-white cursor-pointer transition-colors">Pricing</span>
          </div>
          <Button
            size="sm"
            className="rounded-full bg-white text-black hover:bg-zinc-200 font-medium px-4 h-8 text-xs"
          >
            Login
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-44 pb-20 px-6 container max-w-6xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-xs font-medium mb-8 backdrop-blur-md"
        >
          <Sparkles className="h-3 w-3" />
          <span>v2.0 Now Available</span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-medium tracking-tight mb-8 leading-[0.9]">
          The Speed of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-purple-400">
            Venture.
          </span>
        </h1>

        <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
          Stop trusting your gut. Start trusting the signal. <br />
          The first high-velocity terminal for deal scouting.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-24">
          <Button className="h-12 px-8 rounded-full bg-[#3B82F6] hover:bg-blue-500 text-white shadow-[0_0_20px_-5px_#3B82F6] transition-all hover:scale-105 font-medium">
            <Zap className="h-4 w-4 mr-2 fill-current" />
            Request Access
          </Button>
          <Button
            variant="outline"
            className="h-12 px-8 rounded-full border-white/10 hover:bg-white/5 text-zinc-300 backdrop-blur-sm"
          >
            View Demo
          </Button>
        </div>

        {/* Hero Visual - Glass Cards Stack */}
        <div className="relative w-full max-w-3xl h-[400px] mx-auto perspective-[1000px]">
          <motion.div
            style={{ y: y1 }}
            className="absolute top-0 left-10 w-64 h-80 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 rotate-[-12deg] z-0 shadow-2xl"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute top-10 right-10 w-64 h-80 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 rotate-[12deg] z-0 shadow-2xl"
          />

          {/* Main Card */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 w-80 md:w-96 h-[450px] bg-[#121214]/80 backdrop-blur-2xl border border-white/[0.08] rounded-[32px] p-6 shadow-2xl z-10 flex flex-col justify-between group hover:border-[#3B82F6]/50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-[#3B82F6]" />
              </div>
              <Badge
                variant="outline"
                className="bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20"
              >
                98/100
              </Badge>
            </div>

            <div className="text-left space-y-1">
              <h3 className="text-2xl font-semibold">Nexus AI</h3>
              <p className="text-zinc-500 text-sm">Generative Infrastructure</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex justify-between text-xs text-zinc-400 mb-2">
                  <span>Momentum</span>
                  <span className="text-[#3B82F6]">+240%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3B82F6] w-[85%]" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-zinc-400 hover:text-white">
                  Pass
                </Button>
                <Button className="flex-1 bg-[#3B82F6] hover:bg-blue-500 text-white rounded-xl">
                  Track
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-32 container max-w-4xl mx-auto px-6 text-center">
        <span className="text-[#3B82F6] text-sm font-medium tracking-widest uppercase mb-4 block">
          The Old Way is Dead
        </span>
        <h2 className="text-4xl md:text-5xl font-medium mb-8 leading-tight">
          You are losing deals to <br /> faster firms.
        </h2>
        <p className="text-xl text-zinc-400 leading-relaxed">
          Traditional due diligence is slow. While you're reading a PitchBook PDF, your competition
          has already swiped, analyzed, and set the meeting. <br />
          <br />
          <span className="text-white font-medium">Ventures are won in minutes, not months.</span>
        </p>
      </section>

      {/* Value Props - Glass Grid */}
      <section className="py-20 container max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* VP 1 */}
          <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] p-10 rounded-[32px] backdrop-blur-md relative overflow-hidden group hover:border-white/[0.15] transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/10 blur-[80px] rounded-full group-hover:bg-[#3B82F6]/20 transition-all" />

            <Zap className="h-8 w-8 text-[#3B82F6] mb-6" />
            <h3 className="text-3xl font-medium mb-4">Terminal Velocity</h3>
            <p className="text-zinc-400 text-lg max-w-md">
              Review 50+ pre-seed opportunities in the time it takes to drink your coffee. A
              streamlined interface for the modern Associate.
            </p>
          </div>

          {/* VP 2 */}
          <div className="col-span-1 bg-[#0c0c0e] border border-white/[0.08] p-10 rounded-[32px] relative overflow-hidden group hover:border-white/[0.15] transition-all">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <Eye className="h-8 w-8 text-purple-400 mb-6 relative z-10" />
            <h3 className="text-2xl font-medium mb-4 relative z-10">Insider Intel</h3>
            <p className="text-zinc-400 relative z-10">
              Slipstream Alerts™ notify you the second a Market Leader enters a niche.
            </p>
          </div>

          {/* VP 3 */}
          <div className="col-span-1 bg-[#0c0c0e] border border-white/[0.08] p-10 rounded-[32px] relative overflow-hidden group hover:border-white/[0.15] transition-all">
            <Trophy className="h-8 w-8 text-yellow-500 mb-6" />
            <h3 className="text-2xl font-medium mb-4">Leaderboards</h3>
            <p className="text-zinc-400">
              Track your prediction accuracy against the global market. Prove your Alpha.
            </p>
          </div>

          {/* VP 4 */}
          <div className="col-span-1 md:col-span-2 bg-gradient-to-bl from-white/[0.05] to-transparent border border-white/[0.08] p-10 rounded-[32px] backdrop-blur-md relative overflow-hidden group hover:border-white/[0.15] transition-all flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <Activity className="h-8 w-8 text-green-400 mb-6" />
              <h3 className="text-3xl font-medium mb-4">Quantified Conviction</h3>
              <p className="text-zinc-400 text-lg">
                Real-time sentiment tracking. Fear vs Greed, visualized. Know when a deal is going
                viral before it happens.
              </p>
            </div>
            {/* Mini Graph Visual */}
            <div className="w-full md:w-48 h-32 flex items-end justify-between gap-1 p-4 bg-black/20 rounded-2xl border border-white/5">
              {[40, 60, 45, 70, 50, 80, 75, 90, 85, 100].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="w-full bg-[#3B82F6]/50 rounded-t-sm"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#3B82F6]/10 to-transparent pointer-events-none" />
        <h2 className="text-5xl md:text-7xl font-medium mb-8 tracking-tight">
          Ready to outpace <br /> the market?
        </h2>
        <Button
          size="lg"
          className="h-14 px-10 rounded-full bg-white text-black hover:bg-zinc-200 text-lg font-medium shadow-xl shadow-white/5"
        >
          Request Early Access
        </Button>
        <p className="mt-6 text-zinc-500 text-sm">Limited spots available for Q1 Batch.</p>
      </section>
    </div>
  );
}
