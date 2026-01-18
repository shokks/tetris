const HIGH_SCORE_KEY = 'tetris_high_score';

export function getHighScore(): number {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem(HIGH_SCORE_KEY);
  return stored ? parseInt(stored, 10) : 0;
}

export function setHighScore(score: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(HIGH_SCORE_KEY, score.toString());
}

export function updateHighScoreIfNeeded(currentScore: number): boolean {
  const highScore = getHighScore();
  if (currentScore > highScore) {
    setHighScore(currentScore);
    return true;
  }
  return false;
}
