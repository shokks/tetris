'use client';

interface PauseMenuProps {
  onResume: () => void;
  onRestart: () => void;
}

export function PauseMenu({ onResume, onRestart }: PauseMenuProps) {
  return (
    <div className="overlay">
      <div className="modal">
        <h2 className="modal-title">PAUSED</h2>
        <div className="modal-buttons">
          <button className="modal-btn" onClick={onResume}>
            RESUME
          </button>
          <button className="modal-btn modal-btn-secondary" onClick={onRestart}>
            RESTART
          </button>
        </div>
      </div>
    </div>
  );
}
