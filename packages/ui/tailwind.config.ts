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
        // Page
        background: "var(--color-page-bg)",
        foreground: "var(--color-text-heading)",
        "page-gradient": "var(--color-page-bg-gradient)",
        "page-alt": "var(--color-page-bg-alt)",

        // Surfaces
        surface: {
          DEFAULT: "var(--color-surface)",
          60: "var(--color-surface-60)",
          80: "var(--color-surface-80)",
        },
        glass: "var(--color-glass)",

        // Nav
        nav: {
          DEFAULT: "var(--color-nav-bg)",
          mobile: "var(--color-nav-bg-mobile)",
        },

        // Text
        body: "var(--color-text-body)",
        faint: "var(--color-text-faint)",

        // Borders
        border: "var(--color-border)",
        "border-light": "var(--color-border-light)",
        input: "var(--color-border)",
        ring: "#2563eb",

        // Skeleton
        skeleton: {
          DEFAULT: "var(--color-skeleton)",
          shimmer: "var(--color-skeleton-shimmer)",
        },

        // Modal
        modal: {
          overlay: "var(--color-modal-overlay)",
          surface: "var(--color-modal-surface)",
        },

        // Delete zone
        "delete-zone": {
          DEFAULT: "var(--color-delete-zone-bg)",
          border: "var(--color-delete-zone-border)",
        },

        // Avatar
        "avatar-fallback": "var(--color-avatar-fallback)",

        // Decorative
        "dot-grid": {
          DEFAULT: "var(--color-dot-grid)",
          feed: "var(--color-dot-grid-feed)",
        },
        "radial-glow": "var(--color-radial-glow)",
        "gradient-fade": "var(--color-gradient-fade)",
        "card-shadow": "var(--color-card-shadow)",
        "primary-glow": {
          DEFAULT: "var(--color-primary-glow)",
          strong: "var(--color-primary-glow-strong)",
        },
        "grid-line": "var(--color-grid-line)",

        // Brand
        primary: {
          DEFAULT: "#615fff",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#27272a",
          foreground: "var(--color-text-heading)",
        },
        muted: {
          DEFAULT: "#27272a",
          foreground: "var(--color-text-muted)",
        },
        accent: {
          DEFAULT: "#1E3A8A",
          foreground: "#a3b3ff",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#fafafa",
        },

        // Startup card
        startupCard: {
          darkFrom: "#071950",
          darkTo: "#010924",
          goldenFrom: "#4A3B1A",
          goldenTo: "#1F1708",
          border: "#372aac90",
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

        // Sentiment
        sentiment: {
          bull: "oklch(0.7557 0.1784 156.45)",
          portfolio: "oklch(0.6833 0.1595 270.23)",
          bear: "oklch(0.5771 0.2152 27.33)",
        },

        // Hype scores
        hype: {
          peer: "#4ade80",
          bull: "#3b82f6",
          pps: "#a855f7",
        },
      },
      boxShadow: {
        golden: "0 0 60px rgba(234, 179, 8, 0.6)",
        dark: "0 0 40px rgba(79, 70, 229, 0.2)",
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
