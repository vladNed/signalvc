# LLM Notes - SignalVC Project Summary

**Last Updated:** [Current Date]

## Project Overview
SignalVC is a suite of applications (Web + Mobile) designed for Venture Capitalists to scout and rate startups using a high-velocity "swipe" interface. The core loop involves anonymous swiping to generate sentiment data (Bull/Bear scores) and relevance matching, which migrates to a full account upon signup.

## Architecture & Tech Stack
- **Monorepo**: Managed with **Turborepo** and **pnpm workspaces**.
- **Apps**:
  - **`apps/web`**: **Next.js** application.
  - **`apps/mobile`**: **Expo** (React Native) application.
- **Shared Resources** (`packages/`):
  - **`data-access`**: likely API clients and data fetching logic.
  - **`domain`**: Core business entities and logic.
  - **`hooks`**: Shared React hooks (newly created).
  - **`store`**: State management (likely shared stores).
  - **`types`**: Shared TypeScript definitions.
  - **`utils`**: Shared utilities.
  - **Config**: Shared `eslint-config` and `prettier-config`.
- **Tooling**: Unified `dev`, `build`, `lint` commands via Turbo.
- **Note**: The `/apis` directory is currently excluded from the Turbo workspace.

## Key Product Features (Phase 1)
1.  **Anonymous Swipe Loop**:
    - **Actions**: Swipe Up (Valuation Increase), Down (Decrease), Left (Ignore), Right (Invest).
    - **Goal**: Instant value/FOMO before account creation. Session data migrates to account upon signup.
2.  **Reel Info Card**:
    - **Anonymous**: Hype-driven (Peer Score, Bull/Bear Score, Industry, Ticket Size).
    - **Logged In**: Personalized "My Niche vs. Others" context.
3.  **Portfolio Menu**:
    - Deeper dive into startup details, investor competition, and sentiment over time.
4.  **Recommendation Engine**:
    - **Relevance Score**: Weighted formula based on Industry, Ticket Size, Geography, Peer Score, Bull/Bear Score, and MRR Growth.
    - **Logic**: Balances "Personal Fit" with "Market Heat".

## Data Models & Metrics
- **Startups**: Basic info + Scores.
- **Investors & Portfolio**: Tracking entry vs. current validation.
- **Derived Metrics**:
  - **PPS (Personal Performance Score)**: Based on portfolio growth.
  - **Peer Score**: Share of investors in a specific industry.

## Development Log
- **[2026-02-07] Scaffolding**: Created `packages/hooks` and wired it into `apps/web` and `apps/mobile`. Confirmed TypeScript resolution works.
