import type { TypedUseMutation } from "@reduxjs/toolkit/query/react";
import type { SwipeType } from "@signalvc/types";

const useSwipe = (
  setAnimationDirection: React.Dispatch<React.SetStateAction<SwipeType>>,
  useSwipeMutation: TypedUseMutation<void, { startupId: string; swipeType: SwipeType }, any>,
) => {
  const [swipe] = useSwipeMutation();

  const handleSwipeAnimation = (direction: SwipeType) => {
    setAnimationDirection(direction);
    setTimeout(() => {
      setAnimationDirection(null);
    }, 300);
  };

  const onSwipeHandler = async (startupId: string, swipeType: SwipeType) => {
    handleSwipeAnimation(swipeType);
    await swipe({ startupId, swipeType });
  };

  return { handleSwipeAnimation, onSwipeHandler };
};

export default useSwipe;
