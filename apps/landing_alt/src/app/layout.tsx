import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SignalVC — Landing Variants",
  description: "Five landing page concepts for SignalVC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
