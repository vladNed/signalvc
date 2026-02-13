import * as React from "react";
import { useState, useCallback } from "react";

import type { SwipeDirection } from "@signalvc/types";

export const useExample = () => {
  return "Hello from hooks!";
};

interface UseSwipeGestureProps {
  onSwipe: (direction: SwipeDirection) => void;
  threshold?: number;
  onDragStateChange?: (isDragging: boolean) => void;
}

interface SwipeState {
  isDragging: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export function useSwipeGesture({
  onSwipe,
  threshold = 100,
  onDragStateChange,
}: UseSwipeGestureProps) {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setSwipeState({
        isDragging: true,
        startX: e.clientX,
        startY: e.clientY,
        currentX: e.clientX,
        currentY: e.clientY,
      });
      onDragStateChange?.(true);
    },
    [onDragStateChange],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!swipeState.isDragging) return;

      setSwipeState((prev) => ({
        ...prev,
        currentX: e.clientX,
        currentY: e.clientY,
      }));
    },
    [swipeState.isDragging],
  );

  const handleMouseUp = useCallback(() => {
    if (!swipeState.isDragging) return;

    const deltaX = swipeState.currentX - swipeState.startX;
    const deltaY = swipeState.currentY - swipeState.startY;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    let direction: SwipeDirection = null;

    // Vertical swipe (up) takes priority
    if (absY > absX && absY > threshold && deltaY < 0) {
      direction = "up";
    }
    // Horizontal swipes
    else if (absX > threshold) {
      direction = deltaX > 0 ? "right" : "left";
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
  }, [swipeState, threshold, onSwipe, onDragStateChange]);

  const handleMouseLeave = useCallback(() => {
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
  }, [swipeState.isDragging, onDragStateChange]);

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
}
