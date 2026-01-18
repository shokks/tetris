'use client';

import { KeyAction } from '../hooks/useKeyboard';

interface ControlsProps {
  onAction: (action: KeyAction) => void;
}

export function Controls({ onAction }: ControlsProps) {
  const handleTouch = (action: KeyAction) => (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    onAction(action);
  };

  return (
    <div className="touch-controls">
      <div className="controls-wrapper">
        {/* Left/Right movement buttons */}
        <div className="move-buttons">
          <button
            className="control-btn move-btn"
            onTouchStart={handleTouch('moveLeft')}
            onClick={handleTouch('moveLeft')}
            aria-label="Move Left"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <button
            className="control-btn move-btn"
            onTouchStart={handleTouch('moveRight')}
            onClick={handleTouch('moveRight')}
            aria-label="Move Right"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        </div>

        {/* Drop button - center */}
        <button
          className="control-btn drop-btn"
          onTouchStart={handleTouch('hardDrop')}
          onClick={handleTouch('hardDrop')}
          aria-label="Hard Drop"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
          </svg>
          <svg viewBox="0 0 24 24" fill="currentColor" className="drop-icon-second">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
          </svg>
        </button>

        {/* Rotate button */}
        <button
          className="control-btn rotate-btn"
          onTouchStart={handleTouch('rotateCW')}
          onClick={handleTouch('rotateCW')}
          aria-label="Rotate"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 4v6h6"/>
            <path d="M3.51 15a9 9 0 1014.85-3.36L23 10M1 10l4.64-4.36"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
