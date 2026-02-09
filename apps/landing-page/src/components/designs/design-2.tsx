"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowUpRight, Circle, LayoutGrid, Box } from "lucide-react";

export function Design2() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#000000] selection:bg-[#FF4F00] selection:text-white font-sans">
      {/* Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-[#FF4F00] rounded-sm" />
            <span className="font-bold tracking-tight text-lg">SignalVC</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-500">
            <span className="text-black cursor-pointer">Manifesto</span>
            <span className="hover:text-black cursor-pointer transition-colors">Portfolio</span>
            <span className="hover:text-black cursor-pointer transition-colors">Intelligence</span>
          </div>
          <Button className="rounded-full bg-black text-white hover:bg-[#FF4F00] transition-colors px-6 h-9 text-sm font-medium">
            Login
          </Button>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 container px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full border border-zinc-200 mb-8"
            >
              <Circle className="h-2 w-2 fill-[#FF4F00] text-[#FF4F00]" />
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
                Batch S26 Open
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.95]">
              Deploy
              <br />
              Different.
            </h1>

            <p className="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-lg mb-10 font-medium">
              The operating system for next-generation venture capital. Data-driven sourcing meets
              product-led execution.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="h-14 px-8 rounded-full bg-[#FF4F00] hover:bg-black text-white text-lg font-semibold transition-all">
                Start Deploying
              </Button>
              <Button
                variant="outline"
                className="h-14 px-8 rounded-full border-zinc-200 hover:bg-zinc-50 text-black text-lg font-medium"
              >
                View The Data
              </Button>
            </div>
          </div>

          <div className="relative">
            {/* Abstract UI Representation */}
            <div className="aspect-square bg-zinc-50 rounded-3xl border border-zinc-200 p-8 relative overflow-hidden shadow-2xl shadow-zinc-200/50">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#FF4F00]" />

              <div className="space-y-6">
                {/* Mock Card 1 */}
                <div className="bg-white rounded-xl p-6 border border-zinc-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-zinc-100 rounded-lg flex items-center justify-center">
                      <LayoutGrid className="h-5 w-5 text-zinc-400" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Deal Flow Velocity</div>
                      <div className="text-zinc-400 text-xs">Updated 2m ago</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-[#FF4F00]">+24%</div>
                </div>

                {/* Mock Card 2 */}
                <div className="bg-white rounded-xl p-6 border border-zinc-100 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <div className="font-bold text-sm">Conviction Score</div>
                    <Badge
                      variant="secondary"
                      className="bg-green-50 text-green-700 hover:bg-green-100"
                    >
                      High
                    </Badge>
                  </div>
                  <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-black w-[85%]" />
                  </div>
                </div>

                {/* Mock Card 3 */}
                <div className="flex gap-4">
                  <div className="flex-1 bg-zinc-900 rounded-xl p-6 text-white flex flex-col justify-between h-32">
                    <Box className="h-6 w-6 text-zinc-500" />
                    <div>
                      <div className="text-2xl font-bold">128</div>
                      <div className="text-zinc-500 text-xs text-opacity-80">Portfolio Co.</div>
                    </div>
                  </div>
                  <div className="flex-1 bg-[#FF4F00] rounded-xl p-6 text-white flex flex-col justify-between h-32 relative overflow-hidden">
                    <ArrowUpRight className="h-6 w-6 absolute top-6 right-6 opacity-50" />
                    <div className="mt-auto">
                      <div className="text-2xl font-bold">32x</div>
                      <div className="text-white/80 text-xs">MOIC</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
