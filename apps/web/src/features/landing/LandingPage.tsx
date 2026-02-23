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
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Dot-grid background */}
      <div
        className="fixed inset-0 pointer-events-none animate-grid-pulse"
        style={{
          backgroundImage: `radial-gradient(var(--color-dot-grid) 1px, transparent 1px)`,
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
      <footer className="border-t border-border-light py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            <span className="text-sm font-black text-foreground">Signal</span>
            <span className="text-sm font-black text-primary">VC</span>
          </div>
          <span className="text-xs text-faint">
            &copy; {new Date().getFullYear()} SignalVC. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
