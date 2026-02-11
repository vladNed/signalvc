import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@signalvc/ui", "@signalvc/types"],
};

export default nextConfig;
