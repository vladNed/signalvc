"use client";

import { Button } from "@signalvc/ui/src/components/Button/index.web";
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
  blurProfile = false 
}: AppLayoutProps) {
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
                  className={`cursor-pointer ${blurPortfolio ? "blur-sm pointer-events-none" : ""}`}
                >
                  Portfolio
                </Button>
              </Link>
            </div>
          </div>
          <div className="col-span-4 flex items-center justify-end gap-4">
            <div className={`flex items-center gap-3 ${blurProfile ? "blur-sm" : ""}`}>
              <span className="text-sm text-gray-400">@vcjohndoe</span>
              <div className="relative">
                <Image
                  src="/generic-photo.png"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  );
}
