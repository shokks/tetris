'use client';

import { useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronsDown, RotateCw } from 'lucide-react';
import { KeyAction } from '../hooks/useKeyboard';

interface ControlsProps {
  onAction: (action: KeyAction) => void;
}

export function Controls({ onAction }: ControlsProps) {
  const touchedRef = useRef<Set<string>>(new Set());

  const handleTouchStart = useCallback((action: KeyAction) => (e: React.TouchEvent) => {
    e.preventDefault();
    touchedRef.current.add(action);
    onAction(action);
  }, [onAction]);

  const handleClick = useCallback((action: KeyAction) => (e: React.MouseEvent) => {
    if (touchedRef.current.has(action)) {
      touchedRef.current.delete(action);
      return;
    }
    e.preventDefault();
    onAction(action);
  }, [onAction]);

  return (
    <div className="touch-controls">
      {/* Left side - D-pad style movement */}
      <div className="control-panel left-panel-controls">
        <button
          className="control-btn dpad-btn dpad-left"
          onTouchStart={handleTouchStart('moveLeft')}
          onClick={handleClick('moveLeft')}
          aria-label="Move Left"
        >
          <ChevronLeft size={28} strokeWidth={3} />
        </button>
        <button
          className="control-btn dpad-btn dpad-down"
          onTouchStart={handleTouchStart('softDrop')}
          onClick={handleClick('softDrop')}
          aria-label="Soft Drop"
        >
          <ChevronDown size={28} strokeWidth={3} />
        </button>
        <button
          className="control-btn dpad-btn dpad-right"
          onTouchStart={handleTouchStart('moveRight')}
          onClick={handleClick('moveRight')}
          aria-label="Move Right"
        >
          <ChevronRight size={28} strokeWidth={3} />
        </button>
      </div>

      {/* Right side - Action buttons */}
      <div className="control-panel right-panel-controls">
        <button
          className="control-btn action-btn drop-btn"
          onTouchStart={handleTouchStart('hardDrop')}
          onClick={handleClick('hardDrop')}
          aria-label="Hard Drop"
        >
          <ChevronsDown size={32} strokeWidth={3} />
        </button>
        <button
          className="control-btn action-btn rotate-btn"
          onTouchStart={handleTouchStart('rotateCW')}
          onClick={handleClick('rotateCW')}
          aria-label="Rotate"
        >
          <RotateCw size={32} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
