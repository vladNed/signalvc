import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StoreProvider } from "@/shared/providers/StoreProvider";
import { AccountProvider } from "@/shared/contexts/AccountContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SignalVC — Tinder for Venture Capital",
  description: "Swipe-powered deal flow for VCs. Discover, evaluate, and save high-signal startups in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
          <AccountProvider>
            {children}
          </AccountProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
