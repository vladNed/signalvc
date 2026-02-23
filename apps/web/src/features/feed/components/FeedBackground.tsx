"use client";

export function FeedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {/* Dot grid */}
      <div
        className="absolute inset-0 animate-grid-pulse"
        style={{
          backgroundImage: `radial-gradient(rgba(97,95,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      {/* Radial glow behind card area */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[100px]" />
    </div>
  );
}
