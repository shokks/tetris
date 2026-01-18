'use client';

import { useState, useCallback, useEffect, useSyncExternalStore } from 'react';
import { Board } from './Board';
import { NextPiece } from './NextPiece';
import { ScorePanel } from './ScorePanel';
import { Controls } from './Controls';
import { PauseMenu } from './PauseMenu';
import { GameOver } from './GameOver';
import { useKeyboard, KeyAction } from '../hooks/useKeyboard';
import { useTouch } from '../hooks/useTouch';
import { useGameLoop } from '../hooks/useGameLoop';
import { TetrominoType } from '../lib/tetrominos';
import {
  Board as BoardType,
  CurrentPiece,
  createEmptyBoard,
  spawnPiece,
  movePiece,
  rotatePiece,
  lockPiece,
  clearLines,
  isGameOver,
  hardDrop,
  generateBag,
} from '../lib/gameLogic';
import {
  calculateLineScore,
  calculateSoftDropScore,
  calculateHardDropScore,
  calculateLevel,
  calculateDropInterval,
} from '../lib/scoring';
import { getHighScore, updateHighScoreIfNeeded } from '../lib/storage';

type GameStatus = 'idle' | 'playing' | 'paused' | 'gameover';

// Hook to safely read localStorage after hydration
function useStoredHighScore() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('storage', callback);
      return () => window.removeEventListener('storage', callback);
    },
    () => getHighScore(),
    () => 0 // Server snapshot
  );
}

interface LineClearCelebration {
  rows: number[];
  score: number;
  isTetris: boolean;
  key: number;
}

export function Game() {
  const [board, setBoard] = useState<BoardType>(createEmptyBoard);
  const [currentPiece, setCurrentPiece] = useState<CurrentPiece | null>(null);
  const [bag, setBag] = useState<TetrominoType[]>([]);
  const [nextPiece, setNextPiece] = useState<TetrominoType | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [lines, setLines] = useState(0);
  const storedHighScore = useStoredHighScore();
  const [highScore, setHighScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [celebration, setCelebration] = useState<LineClearCelebration | null>(null);

  // Sync stored high score after hydration
  const displayHighScore = Math.max(highScore, storedHighScore);

  // Clear celebration after animation
  useEffect(() => {
    if (celebration) {
      const timer = setTimeout(() => setCelebration(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [celebration]);

  // Find which rows are complete (for animation before clearing)
  const findCompleteRows = useCallback((boardToCheck: BoardType): number[] => {
    const completeRows: number[] = [];
    for (let row = 0; row < boardToCheck.length; row++) {
      if (boardToCheck[row].every((cell) => cell !== 0)) {
        completeRows.push(row);
      }
    }
    return completeRows;
  }, []);

  // Trigger celebration
  const triggerCelebration = useCallback((rows: number[], lineScore: number) => {
    setCelebration({
      rows,
      score: lineScore,
      isTetris: rows.length === 4,
      key: Date.now(),
    });
  }, []);

  const getNextFromBag = useCallback(() => {
    let currentBag = bag;
    if (currentBag.length < 2) {
      currentBag = [...currentBag, ...generateBag()];
    }
    const next = currentBag[0];
    setBag(currentBag.slice(1));
    return next;
  }, [bag]);

  const spawnNextPiece = useCallback(() => {
    const type = nextPiece || getNextFromBag();
    const newNext = getNextFromBag();
    setNextPiece(newNext);
    const piece = spawnPiece(type);
    if (isGameOver(board, piece)) {
      const newHigh = updateHighScoreIfNeeded(score);
      setIsNewHighScore(newHigh);
      if (newHigh) setHighScore(score);
      setGameStatus('gameover');
      return null;
    }
    return piece;
  }, [board, nextPiece, getNextFromBag, score]);

  const startGame = useCallback(() => {
    const newBag = generateBag();
    setBag(newBag.slice(2));
    setBoard(createEmptyBoard());
    setScore(0);
    setLevel(0);
    setLines(0);
    setIsNewHighScore(false);
    setNextPiece(newBag[1]);
    setCurrentPiece(spawnPiece(newBag[0]));
    setGameStatus('playing');
  }, []);

  const tick = useCallback(() => {
    if (!currentPiece || gameStatus !== 'playing') return;

    const moved = movePiece(board, currentPiece, 0, 1);
    if (moved) {
      setCurrentPiece(moved);
    } else {
      const newBoard = lockPiece(board, currentPiece);
      const completeRows = findCompleteRows(newBoard);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      setBoard(clearedBoard);

      if (linesCleared > 0) {
        const newLines = lines + linesCleared;
        const newLevel = calculateLevel(newLines);
        const lineScore = calculateLineScore(linesCleared, level);
        setLines(newLines);
        setLevel(newLevel);
        setScore((s) => s + lineScore);
        triggerCelebration(completeRows, lineScore);
      }

      const nextP = spawnNextPiece();
      if (nextP) {
        setCurrentPiece(nextP);
      }
    }
  }, [board, currentPiece, gameStatus, level, lines, spawnNextPiece, findCompleteRows, triggerCelebration]);

  const handleAction = useCallback(
    (action: KeyAction) => {
      if (action === 'pause') {
        if (gameStatus === 'playing') {
          setGameStatus('paused');
        } else if (gameStatus === 'paused') {
          setGameStatus('playing');
        }
        return;
      }

      if (gameStatus !== 'playing' || !currentPiece) return;

      switch (action) {
        case 'moveLeft': {
          const moved = movePiece(board, currentPiece, -1, 0);
          if (moved) setCurrentPiece(moved);
          break;
        }
        case 'moveRight': {
          const moved = movePiece(board, currentPiece, 1, 0);
          if (moved) setCurrentPiece(moved);
          break;
        }
        case 'softDrop': {
          const moved = movePiece(board, currentPiece, 0, 1);
          if (moved) {
            setCurrentPiece(moved);
            setScore((s) => s + calculateSoftDropScore(1));
          }
          break;
        }
        case 'hardDrop': {
          const { piece, distance } = hardDrop(board, currentPiece);
          setCurrentPiece(piece);
          setScore((s) => s + calculateHardDropScore(distance));
          const newBoard = lockPiece(board, piece);
          const completeRows = findCompleteRows(newBoard);
          const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
          setBoard(clearedBoard);

          if (linesCleared > 0) {
            const newLines = lines + linesCleared;
            const newLevel = calculateLevel(newLines);
            const lineScore = calculateLineScore(linesCleared, level);
            setLines(newLines);
            setLevel(newLevel);
            setScore((s) => s + lineScore);
            triggerCelebration(completeRows, lineScore);
          }

          const nextP = spawnNextPiece();
          if (nextP) {
            setCurrentPiece(nextP);
          }
          break;
        }
        case 'rotateCW': {
          const rotated = rotatePiece(board, currentPiece, 1);
          if (rotated) setCurrentPiece(rotated);
          break;
        }
        case 'rotateCCW': {
          const rotated = rotatePiece(board, currentPiece, -1);
          if (rotated) setCurrentPiece(rotated);
          break;
        }
      }
    },
    [board, currentPiece, gameStatus, level, lines, spawnNextPiece, findCompleteRows, triggerCelebration]
  );

  useKeyboard({
    onAction: handleAction,
    enabled: gameStatus === 'playing' || gameStatus === 'paused',
  });

  useTouch({
    onAction: handleAction,
    enabled: gameStatus === 'playing',
  });

  useGameLoop({
    onTick: tick,
    interval: calculateDropInterval(level),
    enabled: gameStatus === 'playing',
  });

  return (
    <div className="game-container">
      <div className="game-layout">
        <div className="side-panel left-panel">
          <ScorePanel score={score} level={level} lines={lines} highScore={displayHighScore} />
        </div>
        <div className="board-wrapper">
          <Board 
            board={board} 
            currentPiece={currentPiece} 
            showGhost={gameStatus === 'playing'} 
            clearingRows={celebration?.rows || []}
            isTetris={celebration?.isTetris || false}
          />
          {celebration && (
            <>
              <div key={`score-${celebration.key}`} className="score-popup">
                +{celebration.score}
              </div>
              {celebration.isTetris && (
                <div key={`tetris-${celebration.key}`} className="tetris-text">
                  TETRIS!
                </div>
              )}
            </>
          )}
          {gameStatus === 'idle' && (
            <div className="overlay">
              <div className="modal">
                <h1 className="game-title">TETRIS</h1>
                <button className="modal-btn" onClick={startGame}>
                  START GAME
                </button>
                <div className="controls-help">
                  <p>← → : Move</p>
                  <p>↑ : Rotate</p>
                  <p>↓ : Soft Drop</p>
                  <p>Space : Hard Drop</p>
                  <p>P / Esc : Pause</p>
                </div>
              </div>
            </div>
          )}
          {gameStatus === 'paused' && (
            <PauseMenu onResume={() => setGameStatus('playing')} onRestart={startGame} />
          )}
          {gameStatus === 'gameover' && (
            <GameOver
              score={score}
              highScore={displayHighScore}
              isNewHighScore={isNewHighScore}
              onRestart={startGame}
            />
          )}
        </div>
        <div className="side-panel right-panel">
          <NextPiece type={nextPiece} />
        </div>
      </div>
      <Controls onAction={handleAction} />
    </div>
  );
}
