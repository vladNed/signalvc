import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b", // Deep charcoal/black
        foreground: "#fafafa",
        primary: {
          DEFAULT: "#2563eb", // Electric Blue
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#27272a",
          foreground: "#fafafa",
        },
        muted: {
          DEFAULT: "#27272a",
          foreground: "#a1a1aa",
        },
        accent: {
          DEFAULT: "#27272a",
          foreground: "#fafafa",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#fafafa",
        },
        border: "#27272a",
        input: "#27272a",
        ring: "#2563eb",
        // Hype Score Colors
        hype: {
          peer: "#4ade80", // Neon Green
          bull: "#3b82f6", // Electric Blue (Same as primary for now, adjust if needed)
          pps: "#a855f7", // Vibrant Purple
        }
      },
    },
  },
  plugins: [],
};

export default config;
