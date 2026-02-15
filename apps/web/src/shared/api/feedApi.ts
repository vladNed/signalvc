import { baseApiInstance } from "@/shared/api";
import type { Startup } from "@signalvc/types";

const feedApi = baseApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    fetchFeed: builder.query<Startup[], void>({
      query: () => "/feed",
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({ type: "Startups" as const, id })),
              { type: "Startups", id: "LIST" },
            ]
          : [{ type: "Startups", id: "LIST" }],
    }),
    swipeBull: builder.mutation<void, { startupId: string }>({
      query: ({ startupId }) => ({
        url: "/feed/swipe",
        method: "POST",
        body: {
          swipeType: "bull",
          startupId,
        },
      }),
      invalidatesTags: (result, error, { startupId }) => [{ type: "Startups", id: startupId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const startupId = arg.startupId;
        const patchResult = dispatch(
          feedApi.util.updateQueryData("fetchFeed", undefined, (draft) => {
            const newDraft = draft.filter((s) => s.id !== startupId);
            return newDraft;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    swipeBear: builder.mutation<void, { startupId: string }>({
      query: ({ startupId }) => ({
        url: "/feed/swipe",
        method: "POST",
        body: {
          swipeType: "bear",
          startupId,
        },
      }),
      invalidatesTags: (result, error, { startupId }) => [{ type: "Startups", id: startupId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const startupId = arg.startupId;
        const patchResult = dispatch(
          feedApi.util.updateQueryData("fetchFeed", undefined, (draft) => {
            const newDraft = draft.filter((s) => s.id !== startupId);
            return newDraft;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    swipePortfolio: builder.mutation<void, { startupId: string }>({
      query: ({ startupId }) => ({
        url: "/feed/swipe",
        method: "POST",
        body: {
          swipeType: "portofolio",
          startupId,
        },
      }),
      invalidatesTags: (result, error, { startupId }) => [{ type: "Startups", id: startupId }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const startupId = arg.startupId;
        const patchResult = dispatch(
          feedApi.util.updateQueryData("fetchFeed", undefined, (draft) => {
            const newDraft = draft.filter((s) => s.id !== startupId);
            return newDraft;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useFetchFeedQuery,
  useSwipeBullMutation,
  useSwipeBearMutation,
  useSwipePortfolioMutation,
} = feedApi;
