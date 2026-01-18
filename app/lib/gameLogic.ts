import {
  TetrominoType,
  TETROMINO_SHAPES,
  WALL_KICKS,
  WALL_KICKS_I,
} from './tetrominos';

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export type CellValue = 0 | TetrominoType;
export type Board = CellValue[][];

export interface Position {
  x: number;
  y: number;
}

export interface CurrentPiece {
  type: TetrominoType;
  rotation: number;
  position: Position;
}

export function createEmptyBoard(): Board {
  return Array(BOARD_HEIGHT)
    .fill(null)
    .map(() => Array(BOARD_WIDTH).fill(0) as CellValue[]);
}

export function getShape(type: TetrominoType, rotation: number): number[][] {
  return TETROMINO_SHAPES[type][rotation % 4];
}

export function isValidPosition(
  board: Board,
  type: TetrominoType,
  rotation: number,
  position: Position
): boolean {
  const shape = getShape(type, rotation);
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const newX = position.x + col;
        const newY = position.y + row;
        if (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX] !== 0)
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

export function spawnPiece(type: TetrominoType): CurrentPiece {
  const shape = getShape(type, 0);
  const spawnX = Math.floor((BOARD_WIDTH - shape[0].length) / 2);
  return {
    type,
    rotation: 0,
    position: { x: spawnX, y: 0 },
  };
}

export function rotatePiece(
  board: Board,
  piece: CurrentPiece,
  direction: 1 | -1
): CurrentPiece | null {
  const newRotation = (piece.rotation + direction + 4) % 4;
  const kickKey = `${piece.rotation}>${newRotation}`;
  const kicks = piece.type === 'I' ? WALL_KICKS_I[kickKey] : WALL_KICKS[kickKey];

  if (!kicks) return null;

  for (const [dx, dy] of kicks) {
    const newPosition = {
      x: piece.position.x + dx,
      y: piece.position.y - dy,
    };
    if (isValidPosition(board, piece.type, newRotation, newPosition)) {
      return {
        ...piece,
        rotation: newRotation,
        position: newPosition,
      };
    }
  }
  return null;
}

export function movePiece(
  board: Board,
  piece: CurrentPiece,
  dx: number,
  dy: number
): CurrentPiece | null {
  const newPosition = {
    x: piece.position.x + dx,
    y: piece.position.y + dy,
  };
  if (isValidPosition(board, piece.type, piece.rotation, newPosition)) {
    return { ...piece, position: newPosition };
  }
  return null;
}

export function getGhostPosition(board: Board, piece: CurrentPiece): Position {
  let ghostY = piece.position.y;
  while (
    isValidPosition(board, piece.type, piece.rotation, {
      x: piece.position.x,
      y: ghostY + 1,
    })
  ) {
    ghostY++;
  }
  return { x: piece.position.x, y: ghostY };
}

export function lockPiece(board: Board, piece: CurrentPiece): Board {
  const newBoard = board.map((row) => [...row]);
  const shape = getShape(piece.type, piece.rotation);
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const boardY = piece.position.y + row;
        const boardX = piece.position.x + col;
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = piece.type;
        }
      }
    }
  }
  return newBoard;
}

export function clearLines(board: Board): { newBoard: Board; linesCleared: number } {
  const newBoard = board.filter((row) => row.some((cell) => cell === 0));
  const linesCleared = BOARD_HEIGHT - newBoard.length;
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(0) as CellValue[]);
  }
  return { newBoard, linesCleared };
}

export function isGameOver(board: Board, piece: CurrentPiece): boolean {
  return !isValidPosition(board, piece.type, piece.rotation, piece.position);
}

export function hardDrop(board: Board, piece: CurrentPiece): { piece: CurrentPiece; distance: number } {
  const ghostPos = getGhostPosition(board, piece);
  const distance = ghostPos.y - piece.position.y;
  return {
    piece: { ...piece, position: ghostPos },
    distance,
  };
}

export function generateBag(): TetrominoType[] {
  const bag: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }
  return bag;
}
