'use client';

import { ChevronLeft, ChevronRight, ChevronsDown, RotateCw } from 'lucide-react';
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
        {/* Left side - Movement */}
        <div className="control-group">
          <div className="move-buttons">
            <button
              className="control-btn move-btn"
              onTouchStart={handleTouch('moveLeft')}
              onClick={handleTouch('moveLeft')}
              aria-label="Move Left"
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </button>
            <button
              className="control-btn move-btn"
              onTouchStart={handleTouch('moveRight')}
              onClick={handleTouch('moveRight')}
              aria-label="Move Right"
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </button>
          </div>
          <span className="control-label">MOVE</span>
        </div>

        {/* Center - Hard Drop */}
        <div className="control-group">
          <button
            className="control-btn drop-btn"
            onTouchStart={handleTouch('hardDrop')}
            onClick={handleTouch('hardDrop')}
            aria-label="Hard Drop"
          >
            <ChevronsDown size={28} strokeWidth={3} />
          </button>
          <span className="control-label">DROP</span>
        </div>

        {/* Right side - Rotate (Primary action, larger) */}
        <div className="control-group">
          <button
            className="control-btn rotate-btn"
            onTouchStart={handleTouch('rotateCW')}
            onClick={handleTouch('rotateCW')}
            aria-label="Rotate"
          >
            <RotateCw size={32} strokeWidth={2.5} />
          </button>
          <span className="control-label">ROTATE</span>
        </div>
      </div>
    </div>
  );
}
