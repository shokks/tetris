'use client';

import { TetrominoType, TETROMINO_COLORS, TETROMINO_SHAPES } from '../lib/tetrominos';

interface NextPieceProps {
  type: TetrominoType | null;
}

export function NextPiece({ type }: NextPieceProps) {
  if (!type) return null;

  const shape = TETROMINO_SHAPES[type][0];
  const color = TETROMINO_COLORS[type];

  // Trim empty rows from shape for better display
  const nonEmptyRows = shape.filter(row => row.some(cell => cell !== 0));
  
  // Trim empty columns for better centering
  const nonEmptyCols: number[] = [];
  if (nonEmptyRows.length > 0) {
    for (let i = 0; i < nonEmptyRows[0].length; i++) {
      if (nonEmptyRows.some(row => row[i] !== 0)) {
        nonEmptyCols.push(i);
      }
    }
  }

  const minCol = Math.min(...nonEmptyCols);
  const maxCol = Math.max(...nonEmptyCols);
  
  const displayShape = nonEmptyRows.map(row => 
    row.slice(minCol, maxCol + 1)
  );


  return (
    <div className="next-piece-container">
      <h3 className="panel-title">NEXT</h3>
      <div className="next-piece-grid">
        {displayShape.map((row, rowIdx) => (
          <div key={rowIdx} className="next-piece-row">
            {row.map((cell, colIdx) => (
              <div
                key={colIdx}
                className="next-piece-cell"
                style={{
                  backgroundColor: cell ? color : 'transparent',
                  boxShadow: cell
                    ? `inset 2px 2px 0 rgba(255,255,255,0.3), inset -2px -2px 0 rgba(0,0,0,0.3)`
                    : undefined,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
