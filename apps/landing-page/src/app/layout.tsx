import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DevPanel } from "@/components/dev/panel";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SignalVC | Speed of Venture",
  description:
    "The first high-velocity terminal for deal scouting. Track smart money, verify your instincts, and uncover alpha.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <DevPanel />
        {children}
      </body>
    </html>
  );
}
