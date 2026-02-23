"use client";

import { useAccount } from "@/shared/contexts/AccountContext";
import { Button } from "@signalvc/ui";
import { LayoutGrid, Briefcase, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  activeTab?: "feed" | "portfolio";
  blurPortfolio?: boolean;
  blurProfile?: boolean;
}

export function AppLayout({
  children,
  activeTab = "feed",
  blurPortfolio = false,
  blurProfile = false,
}: AppLayoutProps) {
  const { user, loading } = useAccount();

  return (
    <div className="flex min-h-screen flex-col">
      {/* ── Top nav ─────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-[#06060a]/80 border-b border-neutral-800/50 px-6">
        <div className="mx-auto h-16 w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0.5">
            <span className="text-2xl font-black text-white">Signal</span>
            <span className="text-2xl font-black text-primary">VC</span>
          </Link>

          {/* Desktop: centre tabs */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/feed">
              <Button
                variant={activeTab === "feed" ? "feed" : "feedInactive"}
                className={`relative cursor-pointer px-5 ${
                  activeTab === "feed" ? "shadow-[0_0_12px_rgba(97,95,255,0.3)]" : ""
                }`}
              >
                Feed
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                variant={activeTab === "portfolio" ? "feed" : "feedInactive"}
                className={`relative cursor-pointer px-5 ${
                  blurPortfolio || loading ? "blur-sm pointer-events-none" : ""
                } ${activeTab === "portfolio" ? "shadow-[0_0_12px_rgba(97,95,255,0.3)]" : ""}`}
              >
                Portfolio
              </Button>
            </Link>
          </div>

          {/* User info (both desktop and mobile) */}
          <div className={`flex items-center gap-3 ${blurProfile || loading ? "blur-sm" : ""}`}>
            <span className="hidden md:block text-sm text-neutral-500">
              {user?.email ?? "loading..."}
            </span>
            <div className="relative">
              {user?.user_metadata.avatar_url && !loading ? (
                <Image
                  src={user.user_metadata.avatar_url as string}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full shadow-[0_0_15px_rgba(97,95,255,0.4)]"
                />
              ) : (
                <div className="rounded-full shadow-[0_0_15px_rgba(97,95,255,0.4)] p-2 bg-neutral-900 border border-neutral-800 text-neutral-400">
                  <User size={20} />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Main content ─────────────────────────────────────────────── */}
      {/* pb-16 on mobile to clear the fixed bottom nav */}
      <main className="flex-1 pb-16 md:pb-0">{children}</main>

      {/* ── Mobile bottom tab bar ────────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl bg-[#06060a]/90 border-t border-neutral-800/50">
        <div className="flex items-center justify-around h-16">
          <Link
            href="/feed"
            className={`flex flex-col items-center gap-1 px-6 py-2 transition-colors ${
              activeTab === "feed" ? "text-primary" : "text-neutral-500"
            }`}
          >
            <LayoutGrid size={20} />
            <span className="text-[10px] font-mono uppercase tracking-widest">Feed</span>
          </Link>

          <Link
            href="/portfolio"
            className={`flex flex-col items-center gap-1 px-6 py-2 transition-colors ${
              blurPortfolio || loading ? "opacity-30 pointer-events-none" : ""
            } ${activeTab === "portfolio" ? "text-primary" : "text-neutral-500"}`}
          >
            <Briefcase size={20} />
            <span className="text-[10px] font-mono uppercase tracking-widest">Portfolio</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
