"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function LandingNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#06060a]/70 border-b border-neutral-800/30">
      <div className="max-w-6xl mx-auto h-16 flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-0.5">
          <span className="text-2xl font-black text-white">Signal</span>
          <span className="text-2xl font-black text-primary">VC</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/discover"
            className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Try It
          </Link>
          <Link
            href="/auth"
            className="px-5 py-2 text-sm font-medium text-white bg-primary/20 border border-primary/40 rounded-lg hover:bg-primary/30 transition-colors"
          >
            Get Access
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-neutral-800/30 bg-[#06060a]/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-3">
          <Link
            href="/discover"
            onClick={() => setIsOpen(false)}
            className="py-3 text-sm text-neutral-400 hover:text-white transition-colors border-b border-neutral-800/30"
          >
            Try It
          </Link>
          <Link
            href="/auth"
            onClick={() => setIsOpen(false)}
            className="py-3 text-sm font-medium text-white"
          >
            Get Access →
          </Link>
        </div>
      )}
    </nav>
  );
}
