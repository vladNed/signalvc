import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StoreProvider } from "@/shared/providers/StoreProvider";
import { AccountProvider } from "@/shared/contexts/AccountContext";
import { ThemeProvider } from "@/shared/contexts/ThemeContext";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap" />
        <script dangerouslySetInnerHTML={{
          __html: `(function(){var s=localStorage.getItem('signalvc-theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(s==='dark'||(s!=='light'&&d))document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark')})();`
        }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
          <AccountProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </AccountProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
