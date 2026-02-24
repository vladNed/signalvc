"use client";

import { useAccount } from "@/shared/contexts/AccountContext";
import { Button } from "@signalvc/ui";
import { LayoutGrid, Briefcase, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/shared/components/ThemeToggle";

interface AppLayoutProps {
  children: ReactNode;
  activeTab?: "feed" | "portfolio" | "profile";
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
    <div className="flex flex-col h-screen">
      <nav className="fixed w-full top-0 z-40 backdrop-blur-sm px-4 md:px-16 h-16 grid grid-cols-3">
        <div className="col-span-1 flex items-center ">
          <Link href="/" className="flex items-center gap-0.5">
            <span className="text-2xl font-black text-foreground">Signal</span>
            <span className="text-2xl font-black text-primary">VC</span>
          </Link>
        </div>
        <div className="col-span-1 flex items-center justify-center">
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
        </div>
        <div className="col-span-1 flex items-center justify-end gap-3    ">
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <Link
              href="/profile"
              className={`flex items-center gap-3 transition-opacity hover:opacity-80 ${blurProfile || loading ? "blur-sm" : ""}`}
            >
              <span className="hidden md:block text-sm text-muted-foreground">
                {user?.email ?? "loading..."}
              </span>
              <div className="relative">
                {user?.user_metadata.avatar_url && !loading ? (
                  <Image
                    src={user.user_metadata.avatar_url as string}
                    alt="Profile"
                    width={32}
                    height={32}
                    className={`rounded-full ${activeTab === "profile" ? "shadow-[0_0_15px_rgba(97,95,255,0.6)] ring-2 ring-primary" : "shadow-[0_0_15px_rgba(97,95,255,0.4)]"}`}
                  />
                ) : (
                  <div className={`rounded-full p-2 bg-avatar-fallback border border-border text-body ${activeTab === "profile" ? "shadow-[0_0_15px_rgba(97,95,255,0.6)] ring-2 ring-primary" : "shadow-[0_0_15px_rgba(97,95,255,0.4)]"}`}>
                    <User size={20} />
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <main className="h-full overflow-y-scroll pt-20">{children}</main>

      <nav className="md:hidden bottom-0 left-0 right-0 z-40 backdrop-blur-xl bg-nav-mobile border-t border-border">
        <div className="flex items-center justify-around h-16">
          <Link
            href="/feed"
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
              activeTab === "feed" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <LayoutGrid size={20} />
            <span className="text-[10px] font-mono uppercase tracking-widest">Feed</span>
          </Link>

          <Link
            href="/portfolio"
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
              blurPortfolio || loading ? "opacity-30 pointer-events-none" : ""
            } ${activeTab === "portfolio" ? "text-primary" : "text-muted-foreground"}`}
          >
            <Briefcase size={20} />
            <span className="text-[10px] font-mono uppercase tracking-widest">Portfolio</span>
          </Link>

          <Link
            href="/profile"
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
              activeTab === "profile" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <User size={20} />
            <span className="text-[10px] font-mono uppercase tracking-widest">Profile</span>
          </Link>

          <div className="flex flex-col items-center gap-1 px-4 py-2">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
}
