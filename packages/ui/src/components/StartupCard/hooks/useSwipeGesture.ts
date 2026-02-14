import { SwipeType } from "@signalvc/types";
import { useState } from "react";

type UseSwipeGestureProps = {
  onSwipe: (direction: SwipeType) => void;
  threshold?: number;
  onDragStateChange?: (isDragging: boolean) => void;
};

type SwipeState = {
  isDragging: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
};

const useSwipeGesture = ({ onSwipe, threshold = 100, onDragStateChange }: UseSwipeGestureProps) => {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    setSwipeState({
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
    });
    onDragStateChange?.(true);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!swipeState.isDragging) return;

    setSwipeState((prev) => ({
      ...prev,
      currentX: e.clientX,
      currentY: e.clientY,
    }));
  };

  const handleMouseUp = () => {
    if (!swipeState.isDragging) return;

    const deltaX = swipeState.currentX - swipeState.startX;
    const deltaY = swipeState.currentY - swipeState.startY;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    let direction: SwipeType = null;

    // Vertical swipe (portfolio) takes priority
    if (absY > absX && absY > threshold && deltaY < 0) {
      direction = "portfolio";
    }
    // Horizontal swipes
    else if (absX > threshold) {
      direction = deltaX > 0 ? "bull" : "bear";
    }

    if (direction) {
      onSwipe(direction);
    }

    setSwipeState({
      isDragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
    });
    onDragStateChange?.(false);
  };

  const handleMouseLeave = () => {
    if (swipeState.isDragging) {
      setSwipeState({
        isDragging: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
      });
      onDragStateChange?.(false);
    }
  };

  const offset = {
    x: swipeState.isDragging ? swipeState.currentX - swipeState.startX : 0,
    y: swipeState.isDragging ? swipeState.currentY - swipeState.startY : 0,
  };

  const rotation = swipeState.isDragging ? offset.x * 0.03 : 0;

  return {
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
    },
    isDragging: swipeState.isDragging,
    offset,
    rotation,
  };
};

export default useSwipeGesture;
