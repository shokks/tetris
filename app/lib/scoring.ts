// Classic Nintendo scoring system
export function calculateLineScore(linesCleared: number, level: number): number {
  const baseScores: Record<number, number> = {
    1: 40,
    2: 100,
    3: 300,
    4: 1200,
  };
  return (baseScores[linesCleared] || 0) * (level + 1);
}

export function calculateSoftDropScore(cells: number): number {
  return cells;
}

export function calculateHardDropScore(cells: number): number {
  return cells * 2;
}

export function calculateLevel(totalLinesCleared: number): number {
  return Math.floor(totalLinesCleared / 10);
}

export function calculateDropInterval(level: number): number {
  // Speed increases with level, minimum 100ms
  const baseInterval = 1000;
  const reduction = level * 80;
  return Math.max(100, baseInterval - reduction);
}
