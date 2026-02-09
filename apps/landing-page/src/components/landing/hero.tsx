"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Activity, BarChart3, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outlineSignal" className="px-3 py-1 text-sm backdrop-blur-sm">
              <span className="mr-2 h-2 w-2 rounded-full bg-signal animate-pulse" />
              System Status: Normal
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 max-w-3xl"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              The Speed of Venture.
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stop trusting your gut. Start trusting the signal. The first high-velocity terminal
              for deal scouting.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-none justify-center"
          >
            <Button size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-gray-200">
              Request Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base border-zinc-800 bg-black/50 backdrop-blur-sm hover:bg-zinc-900 hover:text-white"
            >
              View Documentation
            </Button>
          </motion.div>

          {/* Hero Visuals (Bento Cards) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            className="w-full max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Card 1: Live Ticker */}
            <Card className="col-span-1 md:col-span-2 bg-black/40 border-zinc-800 backdrop-blur-md p-6 flex flex-col justify-between h-[200px] overflow-hidden group hover:border-zinc-700 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 text-zinc-400 text-sm font-mono uppercase tracking-wider">
                  <Activity className="h-4 w-4 text-signal" />
                  Live Signal Feed
                </div>
                <Badge variant="outline" className="border-zinc-800 text-zinc-500 text-[10px]">
                  Realtime
                </Badge>
              </div>
              <div className="space-y-4 mt-4 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10 pointer-events-none" />
                <div className="flex items-center justify-between text-sm border-b border-zinc-800/50 pb-2">
                  <span className="text-zinc-300">Sequoia Capital</span>
                  <span className="text-signal font-mono">Viewed [FinTech Stealth]</span>
                </div>
                <div className="flex items-center justify-between text-sm border-b border-zinc-800/50 pb-2">
                  <span className="text-zinc-300">Andreessen Horowitz</span>
                  <span className="text-signal font-mono">+25% Allocation</span>
                </div>
                <div className="flex items-center justify-between text-sm pb-2 opacity-60">
                  <span className="text-zinc-300">Jason Calacanis</span>
                  <span className="text-signal font-mono">Rank #1 Mover</span>
                </div>
              </div>
            </Card>

            {/* Card 2: Peer Score */}
            <Card className="bg-black/40 border-zinc-800 backdrop-blur-md p-6 h-[200px] flex flex-col justify-between group hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-2 text-zinc-400 text-sm font-mono uppercase tracking-wider">
                <BarChart3 className="h-4 w-4 text-blue-500" />
                Peer Score
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white tracking-tighter">98</span>
                <span className="text-zinc-500 text-sm">/ 100</span>
              </div>
              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[98%]" />
              </div>
              <p className="text-xs text-zinc-500 mt-2">Top 1% in SaaS Vertical</p>
            </Card>

            {/* Card 3: Security/Status */}
            <Card className="bg-black/40 border-zinc-800 backdrop-blur-md p-6 h-[200px] flex flex-col justify-between group hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-2 text-zinc-400 text-sm font-mono uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4 text-purple-500" />
                Validation
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Biometric verification required for high-volume deal flow access.
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-zinc-900 text-zinc-400 hover:bg-zinc-800">
                  Soc2
                </Badge>
                <Badge variant="secondary" className="bg-zinc-900 text-zinc-400 hover:bg-zinc-800">
                  ISO 27001
                </Badge>
              </div>
            </Card>

            {/* Card 4: Velocity (Wide) */}
            <Card className="col-span-1 md:col-span-2 bg-black/40 border-zinc-800 backdrop-blur-md p-6 flex items-center justify-between h-[100px] group hover:border-zinc-700 transition-colors">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-zinc-400 text-sm font-mono uppercase tracking-wider mb-1">
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                  Market Velocity
                </div>
                <span className="text-2xl font-bold text-white">High Frequency</span>
              </div>
              <div className="h-10 w-32 flex items-end justify-between gap-1">
                {[40, 60, 30, 80, 50, 90, 70, 40].map((h, i) => (
                  <div
                    key={i}
                    className="w-2 bg-orange-500/20 rounded-sm"
                    style={{ height: "100%" }}
                  >
                    <div
                      className="bg-orange-500 w-full rounded-sm bottom-0 absolute"
                      style={{ height: `${h}%`, position: "relative" }}
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Card 5: Join CTA */}
            <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800 p-6 flex flex-col justify-center items-center text-center h-[100px] group hover:border-zinc-600 transition-colors cursor-pointer">
              <span className="text-zinc-300 font-medium group-hover:text-white transition-colors">
                Apply for Batch #01
              </span>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
