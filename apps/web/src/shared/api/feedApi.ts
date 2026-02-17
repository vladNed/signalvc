import { baseApiInstance } from "@/shared/api/baseApi";
import { feedQueryConfig, swipeMutationConfig } from "@signalvc/data-access";
import type { Startup, SwipeType } from "@signalvc/types";

const feedApi = baseApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    fetchFeed: builder.query<Startup[], void>(feedQueryConfig),
    swipe: builder.mutation<void, { startupId: string; swipeType: SwipeType }>({
      ...swipeMutationConfig,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          feedApi.util.updateQueryData("fetchFeed", undefined, (draft) =>
            draft.filter((s) => s.id !== arg.startupId),
          ),
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

export const { useFetchFeedQuery, useSwipeMutation } = feedApi;
