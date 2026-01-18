'use client';

import { useEffect, useRef } from 'react';

interface UseGameLoopProps {
  onTick: () => void;
  interval: number;
  enabled: boolean;
}

export function useGameLoop({ onTick, interval, enabled }: UseGameLoopProps) {
  const lastTickRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const onTickRef = useRef(onTick);
  const intervalRef = useRef(interval);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    intervalRef.current = interval;
  }, [interval]);

  useEffect(() => {
    if (!enabled) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    lastTickRef.current = performance.now();

    const tick = (timestamp: number) => {
      if (timestamp - lastTickRef.current >= intervalRef.current) {
        onTickRef.current();
        lastTickRef.current = timestamp;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled]);
}
