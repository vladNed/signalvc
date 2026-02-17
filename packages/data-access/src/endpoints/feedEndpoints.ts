import type { Startup, SwipeType } from "@signalvc/types";

export const feedQueryConfig = {
  query: () => "/feed" as const,
  providesTags: (results: Startup[] | undefined) =>
    results
      ? [
          ...results.map(({ id }) => ({ type: "Startups" as const, id })),
          { type: "Startups" as const, id: "LIST" },
        ]
      : [{ type: "Startups" as const, id: "LIST" }],
};

export const swipeMutationConfig = {
  query: ({ startupId, swipeType }: { startupId: string; swipeType: SwipeType }) => ({
    url: "/feed/swipe" as const,
    method: "POST" as const,
    body: { swipeType, startupId },
  }),
  invalidatesTags: (
    _result: void | undefined,
    _error: unknown,
    { startupId }: { startupId: string },
  ) => [{ type: "Startups" as const, id: startupId }],
};
