"use client";

import { useAccount } from "@/shared/contexts/AccountContext";
import { Button } from "@signalvc/ui";
import { User } from "lucide-react";
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
      <nav className="px-6">
        <div className="mx-auto h-16 w-full justify-between items-center grid grid-cols-12">
          <div className="col-span-4 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-3xl font-black text-white">SignalVC</span>
            </Link>
          </div>
          <div className="col-span-4 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Link href="/feed">
                <Button
                  variant={activeTab === "feed" ? "outline" : "ghost"}
                  className="cursor-pointer"
                >
                  Feed
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  variant={activeTab === "portfolio" ? "outline" : "ghost"}
                  className={`cursor-pointer ${blurPortfolio || loading ? "blur-sm pointer-events-none" : ""}`}
                >
                  Portfolio
                </Button>
              </Link>
            </div>
          </div>
          <div className="col-span-4 flex items-center justify-end gap-4">
            <div className={`flex items-center gap-3 ${blurProfile || loading ? "blur-sm" : ""}`}>
              <span className="text-sm text-gray-400">{user?.email ?? "loading..."}</span>
              <div className="relative">
                {user?.user_metadata.avatar_url && !loading ? (
                  <Image
                    src={user.user_metadata.avatar_url as string}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                  />
                ) : (
                  <div className="rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)] p-2 bg-neutral-800 border border-border text-neutral-400">
                    <User size={20} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  );
}
