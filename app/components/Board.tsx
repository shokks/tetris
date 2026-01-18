'use client';

import React from 'react';
import { TETROMINO_COLORS, TetrominoType } from '../lib/tetrominos';
import {
  Board as BoardType,
  CurrentPiece,
  getShape,
  getGhostPosition,
  BOARD_WIDTH,
  BOARD_HEIGHT,
} from '../lib/gameLogic';

interface BoardProps {
  board: BoardType;
  currentPiece: CurrentPiece | null;
  showGhost?: boolean;
  clearingRows?: number[];
  isTetris?: boolean;
}

export function Board({ board, currentPiece, showGhost = true, clearingRows = [], isTetris = false }: BoardProps) {
  const isClearing = clearingRows.length > 0;
  
  const renderBoard = () => {
    const cells: React.ReactElement[] = [];
    const ghostPosition = currentPiece && showGhost ? getGhostPosition(board, currentPiece) : null;
    const pieceShape = currentPiece ? getShape(currentPiece.type, currentPiece.rotation) : null;

    for (let row = 0; row < BOARD_HEIGHT; row++) {
      const isRowClearing = clearingRows.includes(row);
      
      for (let col = 0; col < BOARD_WIDTH; col++) {
        let cellType: TetrominoType | 0 = board[row][col];
        let isGhost = false;
        let isCurrent = false;

        if (currentPiece && pieceShape) {
          const pieceRow = row - currentPiece.position.y;
          const pieceCol = col - currentPiece.position.x;
          if (
            pieceRow >= 0 &&
            pieceRow < pieceShape.length &&
            pieceCol >= 0 &&
            pieceCol < pieceShape[0].length &&
            pieceShape[pieceRow][pieceCol]
          ) {
            cellType = currentPiece.type;
            isCurrent = true;
          }
        }

        if (ghostPosition && pieceShape && !isCurrent) {
          const ghostRow = row - ghostPosition.y;
          const ghostCol = col - ghostPosition.x;
          if (
            ghostRow >= 0 &&
            ghostRow < pieceShape.length &&
            ghostCol >= 0 &&
            ghostCol < pieceShape[0].length &&
            pieceShape[ghostRow][ghostCol] &&
            cellType === 0
          ) {
            cellType = currentPiece!.type;
            isGhost = true;
          }
        }

        const color = cellType ? TETROMINO_COLORS[cellType] : undefined;

        cells.push(
          <div
            key={`${row}-${col}`}
            className={`cell ${isRowClearing ? 'cell-clearing' : ''}`}
            style={{
              backgroundColor: isGhost ? 'transparent' : (color || '#1a1a2e'),
              borderColor: isGhost ? color : undefined,
              opacity: isGhost ? 0.3 : 1,
              boxShadow: cellType && !isGhost
                ? `inset 2px 2px 0 rgba(255,255,255,0.3), inset -2px -2px 0 rgba(0,0,0,0.3)`
                : undefined,
            }}
          />
        );
      }
    }
    return cells;
  };

  const containerClass = `board-container ${isClearing ? (isTetris ? 'tetris-clear' : 'clearing') : ''}`;

  return (
    <div className={containerClass}>
      <div className="board">
        {renderBoard()}
      </div>
    </div>
  );
}
