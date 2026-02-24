import { baseApiInstance } from "@/shared/api/baseApi";
import { portfolioQueryConfig } from "@signalvc/data-access";
import type { PortfolioStartup } from "@signalvc/types";

const portfolioApi = baseApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    fetchPortfolio: builder.query<PortfolioStartup[], void>(portfolioQueryConfig),
  }),
});

export const { useFetchPortfolioQuery } = portfolioApi;
