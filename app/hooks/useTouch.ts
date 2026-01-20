'use client';

import { useEffect, useCallback, useRef } from 'react';
import { KeyAction } from './useKeyboard';

interface UseTouchProps {
  onAction: (action: KeyAction) => void;
  enabled: boolean;
}

const SWIPE_THRESHOLD = 30;
const TAP_THRESHOLD = 10;
const DOUBLE_TAP_DELAY = 300;

export function useTouch({ onAction, enabled }: UseTouchProps) {
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastTap = useRef<number>(0);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (!enabled) return;
    
    // Skip if touch originated from control buttons
    const target = event.target as HTMLElement;
    if (target.closest('.touch-controls')) return;
    
    const touch = event.touches[0];
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  }, [enabled]);

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (!enabled || !touchStart.current) return;

      // Skip if touch originated from control buttons
      const target = event.target as HTMLElement;
      if (target.closest('.touch-controls')) return;

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStart.current.x;
      const deltaY = touch.clientY - touchStart.current.y;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      const now = Date.now();

      if (absX < TAP_THRESHOLD && absY < TAP_THRESHOLD) {
        if (now - lastTap.current < DOUBLE_TAP_DELAY) {
          onAction('hardDrop');
          lastTap.current = 0;
        } else {
          onAction('rotateCW');
          lastTap.current = now;
        }
      } else if (absX > absY && absX > SWIPE_THRESHOLD) {
        onAction(deltaX > 0 ? 'moveRight' : 'moveLeft');
      } else if (absY > SWIPE_THRESHOLD) {
        if (deltaY > 0) {
          onAction('softDrop');
        } else {
          onAction('hardDrop');
        }
      }

      touchStart.current = null;
    },
    [onAction, enabled]
  );

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);
}
