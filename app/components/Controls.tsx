'use client';

import { KeyAction } from '../hooks/useKeyboard';

interface ControlsProps {
  onAction: (action: KeyAction) => void;
}

export function Controls({ onAction }: ControlsProps) {
  return (
    <div className="touch-controls">
      <div className="controls-row">
        <button
          className="control-btn"
          onTouchStart={(e) => {
            e.preventDefault();
            onAction('rotateCW');
          }}
          onClick={() => onAction('rotateCW')}
        >
          ↻
        </button>
      </div>
      <div className="controls-row">
        <button
          className="control-btn"
          onTouchStart={(e) => {
            e.preventDefault();
            onAction('moveLeft');
          }}
          onClick={() => onAction('moveLeft')}
        >
          ←
        </button>
        <button
          className="control-btn"
          onTouchStart={(e) => {
            e.preventDefault();
            onAction('hardDrop');
          }}
          onClick={() => onAction('hardDrop')}
        >
          ▼▼
        </button>
        <button
          className="control-btn"
          onTouchStart={(e) => {
            e.preventDefault();
            onAction('moveRight');
          }}
          onClick={() => onAction('moveRight')}
        >
          →
        </button>
      </div>
      <div className="controls-row">
        <button
          className="control-btn"
          onTouchStart={(e) => {
            e.preventDefault();
            onAction('softDrop');
          }}
          onClick={() => onAction('softDrop')}
        >
          ▽
        </button>
      </div>
    </div>
  );
}
