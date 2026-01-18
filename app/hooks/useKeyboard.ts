'use client';

import { useEffect, useCallback } from 'react';

export type KeyAction = 
  | 'moveLeft'
  | 'moveRight'
  | 'softDrop'
  | 'hardDrop'
  | 'rotateCW'
  | 'rotateCCW'
  | 'pause';

interface UseKeyboardProps {
  onAction: (action: KeyAction) => void;
  enabled: boolean;
}

const KEY_MAP: Record<string, KeyAction> = {
  ArrowLeft: 'moveLeft',
  KeyA: 'moveLeft',
  ArrowRight: 'moveRight',
  KeyD: 'moveRight',
  ArrowDown: 'softDrop',
  KeyS: 'softDrop',
  ArrowUp: 'rotateCW',
  KeyW: 'rotateCW',
  KeyZ: 'rotateCCW',
  Space: 'hardDrop',
  KeyP: 'pause',
  Escape: 'pause',
};

export function useKeyboard({ onAction, enabled }: UseKeyboardProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;
      const action = KEY_MAP[event.code];
      if (action) {
        event.preventDefault();
        onAction(action);
      }
    },
    [onAction, enabled]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
