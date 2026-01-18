'use client';

interface ScorePanelProps {
  score: number;
  level: number;
  lines: number;
  highScore: number;
}

export function ScorePanel({ score, level, lines, highScore }: ScorePanelProps) {
  return (
    <div className="score-panel">
      <div className="score-item">
        <h3 className="panel-title">SCORE</h3>
        <p className="score-value">{score.toString().padStart(6, '0')}</p>
      </div>
      <div className="score-item">
        <h3 className="panel-title">HIGH</h3>
        <p className="score-value">{highScore.toString().padStart(6, '0')}</p>
      </div>
      <div className="score-item">
        <h3 className="panel-title">LEVEL</h3>
        <p className="score-value">{level}</p>
      </div>
      <div className="score-item">
        <h3 className="panel-title">LINES</h3>
        <p className="score-value">{lines}</p>
      </div>
    </div>
  );
}
