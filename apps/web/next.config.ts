import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@signalvc/ui", "@signalvc/types"],
  images: {
    domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
  }
};

export default nextConfig;
