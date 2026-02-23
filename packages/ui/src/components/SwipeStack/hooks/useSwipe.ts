import type { TypedUseMutation } from "@reduxjs/toolkit/query/react";
import type { SwipeType } from "@signalvc/types";

const useSwipe = (
  setAnimationDirection: React.Dispatch<React.SetStateAction<SwipeType>>,
  useSwipeMutation: TypedUseMutation<void, { startupId: string; swipeType: SwipeType }, any>,
) => {
  const [swipe] = useSwipeMutation();

  const onSwipeHandler = async (startupId: string, swipeType: SwipeType) => {
    // Show overlay + fly-off animation first
    setAnimationDirection(swipeType);

    // Wait for animation to complete before firing the mutation
    await new Promise((resolve) => setTimeout(resolve, 400));
    setAnimationDirection(null);

    // Now remove card from list via optimistic update
    await swipe({ startupId, swipeType });
  };

  return { onSwipeHandler };
};

export default useSwipe;
