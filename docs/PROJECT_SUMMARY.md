# Project Summary: SignalVC

Based on the analysis of `AGENTS.md` and the `docs/` directory, here is the synthesized summary of the project's features and design language.

## Core Concept
**"Tinder for Venture Capitalists"**
SignalVC is a high-velocity, hype-driven investment scouting platform designed for VCs who need to move fast. It leverages FOMO (Fear Of Missing Out) and peer pressure to drive engagement.

## Key Features

### 1. The Hype Machine (The Swipe Loop)
The core interaction model is a gesture-based feed where users make rapid decisions:
-   **Swipe Up**: **Bullish** (Predicting valuation growth).
-   **Swipe Down**: **Bearish** (Predicting valuation decline).
-   **Swipe Left**: **Pass** (Not interested).
-   **Swipe Right**: **Invest** (Add to Portfolio).

### 2. The 3 Core Hype Scores
Metrics designed to drive competition and trust:
1.  **PPS (Personal Performance Score)**: A track record of the user's prediction accuracy (Portfolio growth + Correct Up/Down swipes).
2.  **Peer Score**: The aggregate interest of *other* VCs in a startup/sector. This is the primary "FOMO" metric.
3.  **Bull/Bear Score**: A market sentiment index (Greed vs. Fear) based on collective Up/Down swipes.

### 3. Gamification & "Social Pressure"
-   **Leaderboards**: Dynamic rankings within specific niches (e.g., "Top Fintech Predictor").
-   **"Slipstream" Alerts**: Real-time notifications when a "Market Leader" competitor enters a niche.
-   **Rivalry Pings**: Specific updates on direct competitors ("Your rival just increased their Trust Score").

## Design Language & UI Framework

### Aesthetic Direction
**"Financial Terminal meets Modern Dating App"**
-   **Visual Style**: High-contrast, "Refined Enterprise Dark Mode".
-   **Information Density**: High density (Bloomberg Terminal style) but presented in skimmable, bite-sized cards (Tinder style).
-   **Key Visuals**:
    -   **Neon Accents**: Use vibrant colors for the Hype Scores to make them pop against dark backgrounds.
    -   **Floating Bubbles**: For displaying Scores on cards.
    -   **Motion**: Smooth, gesture-driven transitions (swipes) are critical.

### Technical UI Implementation
-   **Framework**: `packages/ui` shared component library.
-   **Strategy**: "Twin-Implementation" with Shared Logic.
    -   **Logic**: `cva` (Class Variance Authority) for shared variants.
    -   **Web**: Semantic HTML + Tailwind CSS (for SEO).
    -   **Mobile**: Native Primitives (`<Pressable>`, `<View>`) + NativeWind (for Performance).
-   **Strict Separation**: No "React Native for Web".

## Architecture Snapshot
-   **Monorepo**: Turborepo + pnpm workspaces.
-   **Apps**: Next.js (`apps/web`) and Expo (`apps/mobile`).
-   **Pattern**: Feature-Entity-Shared architecture.
