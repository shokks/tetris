## Tetris Game Specification

### Tech Stack
- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS 4 with custom CSS for pixel/retro aesthetics
- **State Management**: React hooks (useState, useReducer, useEffect)
- **Storage**: localStorage for high score persistence

---

### File Structure
```
/docs/spec/tetris-spec.md     # This specification
/app/page.tsx                  # Main game page
/app/components/
  ├── Game.tsx                 # Main game container & logic
  ├── Board.tsx                # 10x20 game board renderer
  ├── Tetromino.tsx            # Individual piece component
  ├── NextPiece.tsx            # Next piece preview panel
  ├── ScorePanel.tsx           # Score, level, lines display
  ├── Controls.tsx             # Touch controls overlay (mobile)
  ├── GameOver.tsx             # Game over modal
  └── PauseMenu.tsx            # Pause overlay
/app/lib/
  ├── tetrominos.ts            # Piece definitions & rotations
  ├── gameLogic.ts             # Core game mechanics
  ├── scoring.ts               # Classic Nintendo scoring
  └── storage.ts               # localStorage helpers
/app/hooks/
  ├── useGameLoop.ts           # Main game loop with requestAnimationFrame
  ├── useKeyboard.ts           # Keyboard input handling
  └── useTouch.ts              # Touch/swipe gesture handling
```

---

### Core Game Mechanics

#### Board
- **Dimensions**: 10 columns x 20 rows (standard Tetris)
- **Cell size**: Responsive, pixel-perfect squares

#### Tetrominos (Standard 7)
| Piece | Shape | Color |
|-------|-------|-------|
| I | Line | Cyan |
| O | Square | Yellow |
| T | T-shape | Purple |
| S | S-shape | Green |
| Z | Z-shape | Red |
| J | J-shape | Blue |
| L | L-shape | Orange |

#### Rotation System
- **SRS (Super Rotation System)** with wall kicks
- Clockwise and counter-clockwise rotation

---

### Controls

#### Keyboard
| Key | Action |
|-----|--------|
| ← / A | Move left |
| → / D | Move right |
| ↓ / S | Soft drop |
| ↑ / W | Rotate clockwise |
| Space | Hard drop |
| P / Esc | Pause |

#### Touch/Mobile
- **Swipe left/right**: Move piece
- **Swipe down**: Soft drop
- **Tap**: Rotate
- **Swipe up** or **double-tap**: Hard drop
- **On-screen buttons**: D-pad + rotate button overlay

---

### Scoring (Classic Nintendo)

| Action | Points |
|--------|--------|
| Single (1 line) | 40 × (level + 1) |
| Double (2 lines) | 100 × (level + 1) |
| Triple (3 lines) | 300 × (level + 1) |
| Tetris (4 lines) | 1200 × (level + 1) |
| Soft drop | 1 point per cell |
| Hard drop | 2 points per cell |

---

### Level & Speed Progression

- **Start**: Level 0
- **Level up**: Every 10 lines cleared
- **Speed formula**: Frames per grid cell = max(1, 48 - (level × 5))
- **Max speed**: Reached around level 9-10

---

### Features

1. **Next Piece Preview**: Single piece preview panel
2. **Ghost Piece**: Semi-transparent preview showing landing position
3. **Pause Menu**: Overlay with Resume/Restart options
4. **Game Over Screen**: Final score, high score comparison, restart button
5. **High Score Persistence**: Stored in localStorage
6. **Responsive Design**: Works on desktop and mobile

---

### Visual Style (Retro Pixel)

- **Color palette**: Classic NES-inspired colors
- **Font**: Pixel/bitmap style (e.g., Press Start 2P from Google Fonts)
- **Board border**: 3D beveled effect like classic Game Boy
- **Background**: Dark with subtle grid pattern
- **Pieces**: Solid color blocks with slight inner shadow for depth

---

### State Management

```typescript
interface GameState {
  board: number[][];           // 0 = empty, 1-7 = piece type
  currentPiece: Tetromino;
  nextPiece: Tetromino;
  position: { x: number; y: number };
  score: number;
  level: number;
  lines: number;
  gameStatus: 'idle' | 'playing' | 'paused' | 'gameover';
  highScore: number;
}
```

---

### Future Considerations (Not in MVP)

- Multiplayer support
- Hold piece functionality
- Multiple next piece previews
- T-spin detection and bonuses
- Leaderboards

---

### Implementation Order

1. Set up board and tetromino definitions
2. Implement piece spawning and rendering
3. Add keyboard controls and basic movement
4. Implement collision detection and line clearing
5. Add scoring and level progression
6. Create ghost piece preview
7. Add touch controls for mobile
8. Implement pause and game over screens
9. Add high score persistence
10. Polish retro visual style