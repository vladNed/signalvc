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

  // ── Mouse handlers ────────────────────────────────────────────────
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

  const resolveSwipe = (state: SwipeState) => {
    const deltaX = state.currentX - state.startX;
    const deltaY = state.currentY - state.startY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    let direction: SwipeType = null;
    if (absY > absX && absY > threshold && deltaY < 0) {
      direction = "portfolio";
    } else if (absX > threshold) {
      direction = deltaX > 0 ? "bull" : "bear";
    }
    return direction;
  };

  const resetState = () => {
    setSwipeState({ isDragging: false, startX: 0, startY: 0, currentX: 0, currentY: 0 });
    onDragStateChange?.(false);
  };

  const handleMouseUp = () => {
    if (!swipeState.isDragging) return;
    const direction = resolveSwipe(swipeState);
    if (direction) onSwipe(direction);
    resetState();
  };

  const handleMouseLeave = () => {
    if (swipeState.isDragging) resetState();
  };

  // ── Touch handlers ────────────────────────────────────────────────
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setSwipeState({
      isDragging: true,
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
    });
    onDragStateChange?.(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swipeState.isDragging) return;
    // Prevent page scroll while dragging the card
    e.preventDefault();
    const touch = e.touches[0];
    setSwipeState((prev) => ({
      ...prev,
      currentX: touch.clientX,
      currentY: touch.clientY,
    }));
  };

  const handleTouchEnd = () => {
    if (!swipeState.isDragging) return;
    const direction = resolveSwipe(swipeState);
    if (direction) onSwipe(direction);
    resetState();
  };

  // ── Derived values ────────────────────────────────────────────────
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
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    isDragging: swipeState.isDragging,
    offset,
    rotation,
  };
};

export default useSwipeGesture;
