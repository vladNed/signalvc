import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="font-bold text-xl tracking-tighter flex items-center gap-2 mb-4"
            >
              <div className="h-6 w-6 rounded bg-signal flex items-center justify-center">
                <span className="text-black font-bold text-xs">S</span>
              </div>
              SignalVC
            </Link>
            <p className="text-zinc-500 text-sm max-w-xs">
              The high-velocity terminal for modern venture capital. Track smart money, verify
              instincts, and close deals faster.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Live Feed
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Leaderboards
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Market Intelligence
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  API Access
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Manifesto
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">© 2026 SignalVC Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="text-zinc-600 hover:text-white h-auto p-0">
              Twitter
            </Button>
            <Button variant="ghost" size="sm" className="text-zinc-600 hover:text-white h-auto p-0">
              LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
