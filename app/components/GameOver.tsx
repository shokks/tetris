'use client';

interface GameOverProps {
  score: number;
  highScore: number;
  isNewHighScore: boolean;
  onRestart: () => void;
}

export function GameOver({ score, highScore, isNewHighScore, onRestart }: GameOverProps) {
  return (
    <div className="overlay">
      <div className="modal">
        <h2 className="modal-title">GAME OVER</h2>
        {isNewHighScore && <p className="new-high-score">NEW HIGH SCORE!</p>}
        <div className="modal-stats">
          <p>SCORE: {score.toString().padStart(6, '0')}</p>
          <p>HIGH: {highScore.toString().padStart(6, '0')}</p>
        </div>
        <div className="modal-buttons">
          <button className="modal-btn" onClick={onRestart}>
            PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  );
}
