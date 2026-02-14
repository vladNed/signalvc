import { TypedUseMutation } from "@reduxjs/toolkit/dist/query/react";
import type { SwipeType } from "@signalvc/types";

const useSwipe = (
  setAnimationDirection: React.Dispatch<React.SetStateAction<SwipeType>>,
  useSwipeBullMutation: TypedUseMutation<void, { startupId: string }, any>,
  useSwipeBearMutation: TypedUseMutation<void, { startupId: string }, any>,
  useSwipePortfolioMutation: TypedUseMutation<void, { startupId: string }, any>,
) => {
  const [swipeBull] = useSwipeBullMutation();
  const [swipeBear] = useSwipeBearMutation();
  const [swipePortfolio] = useSwipePortfolioMutation();
  const handleSwipeAnimation = (direction: SwipeType) => {
    setAnimationDirection(direction);
    setTimeout(() => {
      setAnimationDirection(null);
    }, 300);
  };

  const onBullSwipeHandler = async (startupId: string) => {
    handleSwipeAnimation("bull");
    await swipeBull({ startupId });
  };

  const onBearSwipeHandler = async (startupId: string) => {
    handleSwipeAnimation("bear");
    await swipeBear({ startupId });
  };

  const onPortfolioSwipeHandle = async (startupId: string) => {
    handleSwipeAnimation("portfolio");
    await swipePortfolio({ startupId });
  };

  return {
    handleSwipeAnimation,
    onBullSwipeHandler,
    onBearSwipeHandler,
    onPortfolioSwipeHandle,
  };
};

export default useSwipe;
