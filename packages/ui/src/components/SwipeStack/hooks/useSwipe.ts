import type { SwipeDirection } from "@signalvc/types";

const useSwipe = (
  setAnimationDirection: React.Dispatch<React.SetStateAction<SwipeDirection>>,
  setStartupIndex: React.Dispatch<React.SetStateAction<number>>,
) => {
  const handleSwipeAnimation = (direction: SwipeDirection) => {
    setAnimationDirection(direction);
    setTimeout(() => {
      setStartupIndex((prev) => prev + 1);
      setAnimationDirection(null);
    }, 300);
  };

  const onBullSwipeHandler = (startupId: string) => {
    handleSwipeAnimation("bull");
  };

  const onBearSwipeHandler = (startupId: string) => {
    handleSwipeAnimation("bear");
  };

  const onPortfolioSwipeHandle = (startupId: string) => {
    handleSwipeAnimation("portfolio");
  };

  return {
    handleSwipeAnimation,
    onBullSwipeHandler,
    onBearSwipeHandler,
    onPortfolioSwipeHandle,
  };
};

export default useSwipe;
