"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Terminal,
  Activity,
  Crosshair,
  Zap,
  AlertTriangle,
  Cpu,
  Network,
  ChevronRight,
} from "lucide-react";

export function Design1() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] font-mono selection:bg-[#F97316] selection:text-black overflow-x-hidden">
      {/* HUD Overlay Effects */}
      <div className="fixed inset-0 pointer-events-none z-50 border-[20px] border-transparent md:border-[#050505]" />
      <div className="fixed top-0 left-0 w-full h-[2px] bg-[#F97316]/20 z-50" />
      <div className="fixed bottom-0 left-0 w-full h-[2px] bg-[#F97316]/20 z-50" />
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#00FF00 1px, transparent 1px), linear-gradient(90deg, #00FF00 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-40 bg-[#050505]/90 border-b border-[#333] backdrop-blur-sm">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-[#F97316]" />
            <span className="font-bold tracking-widest text-[#F97316]">SIGNAL_VC_TERMINAL_V1</span>
          </div>
          <div className="hidden md:flex gap-6 text-[10px] uppercase tracking-widest">
            <span className="text-zinc-500">
              SYS.STATUS: <span className="text-[#00FF00] animate-pulse">ONLINE</span>
            </span>
            <span className="text-zinc-500">
              NET.LATENCY: <span className="text-[#e5e5e5]">12ms</span>
            </span>
            <span className="text-zinc-500">
              SEC.LEVEL: <span className="text-[#F97316]">MAX</span>
            </span>
          </div>
          <Button
            variant="outline"
            className="rounded-none border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-black font-bold h-8 text-xs uppercase"
          >
            [ ACCESS_GRID ]
          </Button>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20">
        {/* Hero Section */}
        <section className="container px-4 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-l border-[#333] pl-6 md:pl-12">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Badge
                    variant="outline"
                    className="rounded-none border-[#00FF00] text-[#00FF00] bg-[#00FF00]/10 px-2 py-0.5 text-[10px]"
                  >
                    // PROTOCOL_INITIATED
                  </Badge>
                  <span className="text-xs text-zinc-500">v2.4.0-RC1</span>
                </div>

                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-6 leading-[0.85] text-white">
                  The Speed
                  <br /> of <span className="text-[#F97316] bg-[#F97316]/10 px-2">Venture.</span>
                </h1>

                <p className="text-zinc-400 max-w-xl text-lg md:text-xl uppercase tracking-wide border-l-2 border-[#F97316] pl-4 mb-10">
                  Stop trusting your gut. Start trusting the signal. <br />
                  Algorithmic deal sourcing for the post-human era.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="rounded-none bg-[#F97316] text-black hover:bg-white hover:text-black font-bold uppercase px-8 h-14 text-lg border-2 border-transparent hover:border-[#F97316] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none transition-all hover:translate-x-[2px] hover:translate-y-[2px]">
                    [ INITIATE_SEQUENCE ]
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-none border-[#333] text-[#e5e5e5] hover:bg-[#333] uppercase px-8 h-14 tracking-widest"
                  >
                    READ_DOCS(v2)
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Hero Visual - Radar/Scanner */}
            <div className="lg:col-span-4 relative h-[300px] border border-[#333] bg-[#0a0a0a] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F97316]/20 via-transparent to-transparent opacity-50" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-[#F97316]/30 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] border border-[#F97316]/50 rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]" />

              {/* Scanner Line */}
              <div
                className="absolute top-0 left-1/2 h-full w-[2px] bg-[#F97316] origin-top animate-[spin_2s_linear_infinite]"
                style={{ boxShadow: "0 0 20px #F97316" }}
              />

              {/* Blips */}
              <div className="absolute top-[30%] left-[60%] w-2 h-2 bg-[#00FF00] rounded-full animate-ping" />
              <div className="absolute bottom-[40%] right-[30%] w-2 h-2 bg-[#00FF00] rounded-full animate-ping delay-700" />

              <div className="absolute bottom-2 left-2 text-[10px] text-[#F97316] font-bold bg-black px-1">
                RADAR_ACTIVE // SCANNING_SECTOR_07
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="border-t border-b border-[#333] bg-[#0a0a0a] py-20">
          <div className="container px-4">
            <div className="flex items-center gap-4 mb-8 text-[#FF0000]">
              <AlertTriangle className="h-8 w-8" />
              <h2 className="text-3xl font-bold uppercase tracking-tight">
                System Critical: Latency Detected
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <p className="text-xl text-zinc-400 font-light leading-relaxed border-l-2 border-[#FF0000] pl-6">
                Traditional due diligence is{" "}
                <span className="text-[#e5e5e5] border-b border-[#FF0000]">OBSOLETE</span>. While
                you analyze PDF artifacts, competitors have already executed the trade.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border border-[#333] bg-black">
                  <span className="text-zinc-500 text-sm">LEGACY_FIRM_SPEED</span>
                  <span className="text-[#FF0000] font-bold">4.2 WEEKS</span>
                </div>
                <div className="flex justify-between items-center p-4 border border-[#F97316] bg-[#F97316]/5">
                  <span className="text-[#F97316] text-sm font-bold">SIGNAL_VC_SPEED</span>
                  <span className="text-[#00FF00] font-bold animate-pulse">4.2 MINUTES</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container px-4 py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-[#333]">
            {/* Feature 1 */}
            <div className="group border-r border-b border-[#333] p-10 hover:bg-[#111] transition-all relative overflow-hidden">
              <div className="absolute top-2 right-2 text-[10px] text-zinc-700">MOD_01</div>
              <Zap className="h-10 w-10 text-[#F97316] mb-8 group-hover:text-[#e5e5e5] transition-colors" />
              <h3 className="text-2xl font-bold uppercase mb-4 text-[#e5e5e5]">
                Terminal <br />
                Velocity
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                Review 50+ pre-seed nodes in sub-optimal timeframes. Gesture-driven interface.
              </p>
              <div className="h-24 bg-black border border-[#333] relative overflow-hidden font-mono text-[10px] p-2 text-green-500">
                <div className="opacity-50">
                  &gt; DEAL_01: REJECTED
                  <br />
                  &gt; DEAL_02: REJECTED
                  <br />
                  &gt; DEAL_03: <span className="bg-[#F97316] text-black px-1">ACQUIRED</span>
                  <br />
                  &gt; DEAL_04: REJECTED
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group border-r border-b border-[#333] p-10 hover:bg-[#111] transition-all relative overflow-hidden">
              <div className="absolute top-2 right-2 text-[10px] text-zinc-700">MOD_02</div>
              <Network className="h-10 w-10 text-[#F97316] mb-8 group-hover:text-[#e5e5e5] transition-colors" />
              <h3 className="text-2xl font-bold uppercase mb-4 text-[#e5e5e5]">
                Insider <br />
                Intelligence
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                Intercept Smart Money movements. Slipstream Alerts™ detect market leaders entering
                sectors.
              </p>
              <div className="h-24 bg-black border border-[#333] flex items-center justify-center p-4">
                <div className="w-full h-1 bg-[#333] relative">
                  <div className="absolute left-[20%] w-2 h-2 bg-[#F97316] rounded-full animate-ping" />
                  <div className="absolute left-[20%] w-2 h-2 bg-[#F97316] rounded-full" />
                  <div className="absolute top-4 left-[20%] text-[8px] text-[#F97316] -translate-x-1/2 whitespace-nowrap">
                    A16Z ENTRY
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group border-r border-b border-[#333] p-10 hover:bg-[#111] transition-all relative overflow-hidden">
              <div className="absolute top-2 right-2 text-[10px] text-zinc-700">MOD_03</div>
              <Cpu className="h-10 w-10 text-[#F97316] mb-8 group-hover:text-[#e5e5e5] transition-colors" />
              <h3 className="text-2xl font-bold uppercase mb-4 text-[#e5e5e5]">
                Quantified <br />
                Conviction
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                Verify Alpha. Personal Performance Score (PPS) tracks prediction accuracy.
              </p>
              <div className="h-24 bg-black border border-[#333] flex items-end justify-between px-4 pb-2 gap-1">
                {[20, 60, 40, 80, 50, 90, 70, 100].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`w-full ${i === 7 ? "bg-[#00FF00]" : "bg-[#333]"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Data Grid Section */}
        <section className="container px-4 py-20">
          <div className="border border-[#333] bg-[#080808] p-8">
            <div className="flex justify-between items-end border-b-2 border-[#F97316] pb-4 mb-8">
              <h2 className="text-4xl font-bold uppercase">Live_Feed_V3</h2>
              <div className="flex gap-4 text-[10px] font-bold text-[#F97316]">
                <span>UPTIME: 99.99%</span>
                <span>PACKETS: 4.2TB</span>
              </div>
            </div>

            <div className="space-y-2 font-mono text-sm">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 gap-4 py-2 border-b border-[#222] hover:bg-[#111] cursor-pointer group"
                >
                  <div className="col-span-2 text-zinc-500">14:02:{10 + i}</div>
                  <div className="col-span-7 flex gap-2">
                    <span className="text-[#F97316]"> &gt;&gt; </span>
                    <span className="group-hover:text-white transition-colors">
                      SEQUOIA_CAPITAL
                    </span>
                    <span className="text-zinc-600">ALLOCATED</span>
                    <span className="text-[#e5e5e5]">[ SERIES_A ]</span>
                  </div>
                  <div className="col-span-3 text-right text-[#00FF00]">+25.00%</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 text-center container px-4">
          <div className="border border-[#333] bg-[#0a0a0a] p-12 md:p-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#F97316_10px,#F97316_11px)] opacity-5 pointer-events-none" />

            <h2 className="text-4xl md:text-6xl font-bold uppercase mb-8 text-white relative z-10">
              Ready to <span className="text-black bg-[#F97316] px-2">Execute?</span>
            </h2>

            <p className="text-zinc-500 text-lg mb-10 max-w-lg mx-auto uppercase tracking-wide relative z-10">
              Limited spots available for Q1 Batch Initialization.
            </p>

            <div className="relative z-10">
              <Button className="rounded-none bg-[#e5e5e5] text-black hover:bg-white hover:scale-105 transition-all font-bold uppercase px-12 h-16 text-xl shadow-[6px_6px_0px_0px_#F97316]">
                [ REQUEST_EARLY_ACCESS ]
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
