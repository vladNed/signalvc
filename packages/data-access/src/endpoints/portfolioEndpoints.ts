import type { PortfolioStartup } from "@signalvc/types";

export const portfolioQueryConfig = {
  query: () => "/feed/portfolio" as const,
  providesTags: (results: PortfolioStartup[] | undefined) =>
    results
      ? [
          ...results.map(({ id }) => ({ type: "Startups" as const, id })),
          { type: "Startups" as const, id: "PORTFOLIO" },
        ]
      : [{ type: "Startups" as const, id: "PORTFOLIO" }],
};
