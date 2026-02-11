import Link from "next/link";

const variants = [
  {
    id: 1,
    name: "Terminal Noir",
    description: "Deep black, emerald glow, dot-grid texture. The product card floats in terminal space.",
    accent: "bg-emerald-500",
  },
  {
    id: 2,
    name: "Financial Broadsheet",
    description: "Warm ivory, editorial serif, gold accents. Numbers and credibility speak first.",
    accent: "bg-amber-600",
  },
  {
    id: 3,
    name: "Rebel Signal",
    description: "Dramatic orange light spills, bold Bricolage type at massive scale. Confrontational.",
    accent: "bg-orange-500",
  },
  {
    id: 4,
    name: "Black Ops Intelligence",
    description: "Deep navy with radar pulse. Classified terminal, institutional credibility.",
    accent: "bg-slate-400",
  },
  {
    id: 5,
    name: "Aurora Drift",
    description: "Rich aurora gradients, luminous glass cards, floating animations. No hard edges.",
    accent: "bg-violet-500",
  },
];

export default function Home() {
  return (
    <div
      className="min-h-screen text-white flex flex-col items-center justify-center p-8"
      style={{
        backgroundColor: "#050508",
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }}
    >
      <h1 className="text-4xl font-bold tracking-tight mb-2">SignalVC</h1>
      <p className="text-neutral-600 mb-14 text-sm">5 Landing Page Concepts</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl w-full">
        {variants.map((v) => (
          <Link
            key={v.id}
            href={`/${v.id}`}
            className="group relative rounded-2xl bg-[#0a0a0e] p-6 transition-all duration-300 hover:bg-[#0e0e14] shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-2.5 h-2.5 rounded-full ${v.accent} shadow-lg`} />
              <div className="text-[10px] text-neutral-600 font-mono tracking-wide">
                /{v.id}
              </div>
            </div>
            <h2 className="text-base font-bold mb-2 text-white group-hover:text-white/90 transition-colors">{v.name}</h2>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {v.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
