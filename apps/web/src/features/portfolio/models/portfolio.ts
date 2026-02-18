import type { Startup } from "@signalvc/types";

export type PortfolioStartup = Startup & {
  currentValuation: string;
  sentiment: number;
  sentimentTrend: number;
  sentimentHistory: { month: string; value: number }[];
  savedAt: string;
};
