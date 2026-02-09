"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, Globe, ChevronRight, BarChart } from "lucide-react";

export function Design3() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 selection:bg-blue-600 selection:text-white font-sans">
      <nav className="border-b border-slate-800 bg-[#0B1120]/80 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-blue-600 rounded flex items-center justify-center">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-lg">SignalVC</span>
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-400">
            <span className="hover:text-blue-400 cursor-pointer transition-colors">Platform</span>
            <span className="hover:text-blue-400 cursor-pointer transition-colors">Solutions</span>
            <span className="hover:text-blue-400 cursor-pointer transition-colors">Pricing</span>
          </div>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-slate-800 h-9"
            >
              Log in
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white h-9">
              Start Free Trial
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 container px-6">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-blue-900/30 text-blue-400 border-blue-800 mb-6 hover:bg-blue-900/50 transition-colors cursor-pointer">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2 animate-pulse" />
              v2.4 Live: Enhanced Market Data
              <ChevronRight className="h-3 w-3 ml-1" />
            </Badge>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            The Operating System for
            <br />
            <span className="text-blue-500">Modern Capital Deployment.</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            SignalVC provides institutional-grade data infrastructure for the next generation of
            venture firms. Reliable, fast, and compliant.
          </p>

          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Request Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 border-slate-700 hover:bg-slate-800 text-slate-300"
            >
              View Documentation
            </Button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-xl border border-slate-800 bg-[#0f172a] shadow-2xl overflow-hidden max-w-5xl mx-auto"
        >
          <div className="h-10 bg-[#1e293b] border-b border-slate-800 flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-600" />
              <div className="w-3 h-3 rounded-full bg-slate-600" />
              <div className="w-3 h-3 rounded-full bg-slate-600" />
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Metric 1 */}
            <div className="bg-[#1e293b]/50 rounded-lg p-6 border border-slate-800/50">
              <div className="flex items-center gap-3 mb-4 text-slate-400">
                <Globe className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">Global Deal Flow</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">1,248</div>
              <div className="text-xs text-green-400 flex items-center gap-1">
                +12% <span className="text-slate-500">vs last week</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-[#1e293b]/50 rounded-lg p-6 border border-slate-800/50">
              <div className="flex items-center gap-3 mb-4 text-slate-400">
                <ShieldCheck className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium">Compliance Status</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                All systems operational
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-[#1e293b]/50 rounded-lg p-6 border border-slate-800/50">
              <div className="flex items-center gap-3 mb-4 text-slate-400">
                <BarChart className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium">Capital Deployed</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">$42.5M</div>
              <div className="text-xs text-slate-500 flex items-center gap-1">Q3 Target: $50M</div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
