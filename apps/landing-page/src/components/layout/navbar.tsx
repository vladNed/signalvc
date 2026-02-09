import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl tracking-tighter flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-signal flex items-center justify-center">
              <span className="text-black font-bold text-xs">S</span>
            </div>
            SignalVC
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Log in
          </Link>
          <Button
            size="sm"
            className="bg-foreground text-background hover:bg-foreground/90 font-medium"
          >
            Request Access
          </Button>
        </div>
      </div>
    </nav>
  );
}
