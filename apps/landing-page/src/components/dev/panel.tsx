"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings, X } from "lucide-react";

export function DevPanel() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <div className="fixed top-20 right-4 z-50 flex items-start justify-end pointer-events-none">
      <div className="pointer-events-auto">
        {!isOpen ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="bg-black/80 backdrop-blur border-zinc-800 text-zinc-400 hover:text-white"
          >
            <Settings className="mr-2 h-3 w-3" />
            {"<< Dev Panel >>"}
          </Button>
        ) : (
          <Card className="w-48 bg-black/90 backdrop-blur border-zinc-800 p-3 relative">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 absolute top-2 right-2 text-zinc-500 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-3 w-3" />
            </Button>

            <div className="space-y-3 mt-4">
              <p className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider">
                Select Theme
              </p>

              <div className="grid gap-2">
                {[1, 2, 3, 4, 5].map((num) => {
                  const isActive = pathname === `/${num}`;
                  return (
                    <Link key={num} href={`/${num}`} passHref>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        size="sm"
                        className={`w-full justify-start font-mono text-xs ${isActive ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
                      >
                        Theme {num}
                      </Button>
                    </Link>
                  );
                })}
                <Link href="/" passHref>
                  <Button
                    variant={pathname === "/" ? "secondary" : "ghost"}
                    size="sm"
                    className={`w-full justify-start font-mono text-xs ${pathname === "/" ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
                  >
                    Default
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
