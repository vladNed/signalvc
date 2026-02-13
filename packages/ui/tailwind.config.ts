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

        startupCard: {
          darkFrom: "#071950",
          darkTo: "#010924",
          goldenFrom: "#4A3B1A",
          goldenTo: "#1F1708",
          border: "#06123D",
          goldenBorder: "rgba(202, 138, 4, 0.5)",
          tagBg: "rgba(30, 58, 138, 0.2)",
          tagBorder: "rgba(49, 46, 129, 0.44)",
          infoBoxBorder: "rgba(49, 46, 129, 0.44)",
          infoBoxBg: "rgba(30, 58, 138, 0.5)",
          goldenTagBg: "rgba(113, 63, 18, 0.3)",
          scoreCircleBg: "rgba(79, 70, 229, 0.4)",
          scoreCircleGoldenBg: "rgba(202, 138, 4, 0.4)",
          peerCircleBg: "#29239e",
          peerCircleGoldenBg: "rgba(161, 98, 7, 0.6)",
        },
        sentiment: {
          bull: "oklch(62.7% 0.194 149.214)", // Emerald Green
          neutral: "oklch(97.9% 0.021 166.113)", // White
          bear: "oklch(63.7% 0.237 25.331)", // Red
        },
        border: "#27272a",
        input: "#27272a",
        ring: "#2563eb",
        // Hype Score Colors
        hype: {
          peer: "#4ade80", // Neon Green
          bull: "#3b82f6", // Electric Blue (Same as primary for now, adjust if needed)
          pps: "#a855f7", // Vibrant Purple
        },
      },
      boxShadow: {
        golden: "0 0 60px rgba(234, 179, 8, 0.6)",
        dark: "0 0 40px rgba(79, 70, 229, 0.3)",
        scoreCircle: "0 0 60px rgba(79, 70, 229, 0.6), inset 0 0 20px rgba(79, 70, 229)",
        scoreCircleGolden: "0 0 60px rgba(234, 179, 8, 0.6), inset 0 0 20px rgba(234, 179, 8)",
        peerCircle: "0 0 60px rgba(79, 70, 229, 0.6), inset 0 0 20px rgba(79, 70, 229)",
        peerCircleGolden: "0 0 60px rgba(234, 179, 8, 0.6), inset 0 0 20px rgba(234, 179, 8)",
      },
    },
  },
  plugins: [],
};

export default config;
