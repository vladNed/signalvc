"use client";

import { motion } from "motion/react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          {/* Glow behind */}
          <div className="absolute left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/8 rounded-full blur-[100px] pointer-events-none" />

          <h2 className="text-4xl lg:text-5xl font-black text-foreground leading-tight relative">
            Stop scrolling spreadsheets.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Start swiping signal.
            </span>
          </h2>

          <p className="text-muted-foreground max-w-md mx-auto">
            Join the first batch of VCs using swipe-powered deal flow.
            Limited to 500 seats.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Link
              href="/auth"
              className="px-8 py-3.5 text-sm font-semibold text-white bg-primary rounded-lg hover:shadow-[0_0_30px_rgba(97,95,255,0.4)] transition-all duration-300"
            >
              Apply for Batch #01
            </Link>
            <Link
              href="/discover"
              className="px-8 py-3.5 text-sm font-medium text-body border border-border rounded-lg hover:border-border hover:text-foreground transition-colors"
            >
              Try Without Account
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
