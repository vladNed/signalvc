"use client";

import { LandingNav } from "./components/LandingNav";
import { HeroSection } from "./components/HeroSection";
import { ProblemSection } from "./components/ProblemSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { ScoresSection } from "./components/ScoresSection";
import { LiveFeedPreview } from "./components/LiveFeedPreview";
import { StatsBar } from "./components/StatsBar";
import { CTASection } from "./components/CTASection";

export function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#06060a] text-white overflow-x-hidden">
      {/* Dot-grid background */}
      <div
        className="fixed inset-0 pointer-events-none animate-grid-pulse"
        style={{
          backgroundImage: `radial-gradient(rgba(97,95,255,0.07) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <LandingNav />
      <HeroSection />
      <StatsBar />
      <ProblemSection />
      <HowItWorksSection />
      <ScoresSection />
      <LiveFeedPreview />
      <CTASection />

      {/* Footer */}
      <footer className="border-t border-neutral-800/30 py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            <span className="text-sm font-black text-white">Signal</span>
            <span className="text-sm font-black text-primary">VC</span>
          </div>
          <span className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} SignalVC. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
