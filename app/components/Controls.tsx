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
      {/* D-Pad on left, Action buttons on right */}
      <div className="controls-wrapper">
        {/* D-Pad */}
        <div className="dpad">
          <button
            className="dpad-btn dpad-up"
            onTouchStart={handleTouch('softDrop')}
            onClick={handleTouch('softDrop')}
            aria-label="Soft Drop"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8l-6 6h12l-6-6z"/>
            </svg>
          </button>
          <button
            className="dpad-btn dpad-left"
            onTouchStart={handleTouch('moveLeft')}
            onClick={handleTouch('moveLeft')}
            aria-label="Move Left"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 7l-5 5 5 5V7z"/>
            </svg>
          </button>
          <div className="dpad-center" />
          <button
            className="dpad-btn dpad-right"
            onTouchStart={handleTouch('moveRight')}
            onClick={handleTouch('moveRight')}
            aria-label="Move Right"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 17l5-5-5-5v10z"/>
            </svg>
          </button>
          <button
            className="dpad-btn dpad-down"
            onTouchStart={handleTouch('hardDrop')}
            onClick={handleTouch('hardDrop')}
            aria-label="Hard Drop"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 16l6-6H6l6 6z"/>
            </svg>
          </button>
        </div>

        {/* Action buttons */}
        <div className="action-buttons">
          <button
            className="action-btn rotate-btn"
            onTouchStart={handleTouch('rotateCW')}
            onClick={handleTouch('rotateCW')}
            aria-label="Rotate"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M23 4v6h-6M1 20v-6h6"/>
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
            </svg>
          </button>
          <span className="action-label">ROTATE</span>
        </div>
      </div>
    </div>
  );
}
