"use client";

export function FeedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {/* Dot grid */}
      <div
        className="absolute inset-0 animate-grid-pulse"
        style={{
          backgroundImage: `radial-gradient(var(--color-dot-grid-feed) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      {/* Radial glow behind card area */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ backgroundColor: 'var(--color-radial-glow)' }} />
    </div>
  );
}
