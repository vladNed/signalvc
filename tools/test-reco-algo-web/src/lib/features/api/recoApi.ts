import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface FeedRequest {
    filters: {
        countries: string[];
        target_markets: string[];
        business_categories: string[];
    };
    weights: {
        countries: number;
        target_markets: number;
        business_categories: number;
    };
}

export interface FeedCard {
    id: string;
    operational_name: string;
    description: string;
    country_name: string;
    target_markets: string[];
    relevance_score: number;
}

export const recoApi = createApi({
    reducerPath: "recoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://signalvc-api.onrender.com/api/v1/feed/swipe",
    }),
    endpoints: (builder) => ({
        getFeed: builder.mutation<FeedCard[], FeedRequest>({
            query: (body) => ({
                url: "dev",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useGetFeedMutation } = recoApi;
