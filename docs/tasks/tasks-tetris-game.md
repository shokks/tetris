# Tasks: Tetris Game Implementation

## Relevant Files

### Core Game Logic (`/app/lib/`)
- `app/lib/tetrominos.ts` - Tetromino type definitions, shapes, colors, SRS wall kick data
- `app/lib/gameLogic.ts` - Board creation, collision detection, line clearing, piece movement
- `app/lib/scoring.ts` - Classic Nintendo scoring calculations, level progression
- `app/lib/storage.ts` - localStorage helpers for high score persistence

### Custom Hooks (`/app/hooks/`)
- `app/hooks/useGameLoop.ts` - requestAnimationFrame-based game loop
- `app/hooks/useKeyboard.ts` - Keyboard input handling
- `app/hooks/useTouch.ts` - Touch gesture handling (swipe, tap, double-tap)

### React Components (`/app/components/`)
- `app/components/Game.tsx` - Main game container, state management, game orchestration
- `app/components/Board.tsx` - 10x20 game board renderer with ghost piece
- `app/components/NextPiece.tsx` - Next piece preview panel
- `app/components/ScorePanel.tsx` - Score, high score, level, lines display
- `app/components/Controls.tsx` - Touch controls overlay (D-pad + buttons)
- `app/components/PauseMenu.tsx` - Pause overlay with Resume/Restart
- `app/components/GameOver.tsx` - Game over modal with final score

### Pages and Styles
- `app/page.tsx` - Main page rendering the Game component
- `app/globals.css` - Global styles, retro theme, responsive breakpoints

### Notes

- This is a frontend-only project (no backend/database)
- Manual testing only - no unit tests required per PRD
- Timeline: 1-2 days (urgent)
- Deploy target: Vercel

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

### Task Completion Requirements

**Before marking any task as complete, you MUST:**

1. **Verify the implementation works** - Test the feature manually in the browser
2. **Run the build** - Ensure no TypeScript/build errors (`npm run build`)
3. **Run lint** - Ensure code quality (`npm run lint`)

**Do NOT move to the next task until:**
- The current task is verified working in the browser
- No build or lint errors
- The task checkbox is marked complete in this file

---

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout branch: `git checkout -b feature/tetris-game`

- [x] 1.0 Set up core game data structures and logic
  - [x] 1.1 Create `app/lib/tetrominos.ts` - Define TetrominoType, shapes for all 4 rotations of each piece, colors (I=Cyan, O=Yellow, T=Purple, S=Green, Z=Red, J=Blue, L=Orange), SRS wall kick tables
  - [x] 1.2 Create `app/lib/gameLogic.ts` - Implement createEmptyBoard (10x20), getShape, isValidPosition (collision detection), spawnPiece, rotatePiece (with wall kicks), movePiece, lockPiece, clearLines, getGhostPosition, hardDrop, generateBag (7-bag randomizer)
  - [x] 1.3 Create `app/lib/scoring.ts` - Implement calculateLineScore (40/100/300/1200 × level+1), calculateSoftDropScore (1pt/cell), calculateHardDropScore (2pt/cell), calculateLevel (lines/10), calculateDropInterval
  - [x] 1.4 Create `app/lib/storage.ts` - Implement getHighScore, setHighScore, updateHighScoreIfNeeded using localStorage
  - [x] 1.5 Verify all TypeScript types compile without errors

- [x] 2.0 Build game board UI and piece rendering
  - [x] 2.1 Create `app/components/Board.tsx` - Render 10x20 CSS Grid, iterate cells, display locked pieces with colors
  - [x] 2.2 Add current piece rendering - Overlay current tetromino at its position on the board
  - [x] 2.3 Add ghost piece rendering - Show semi-transparent piece at landing position
  - [x] 2.4 Style cells with distinct empty/filled states and inner shadow for depth
  - [x] 2.5 Test board renders correctly with mock data in browser

- [x] 3.0 Implement game loop, controls, and game state management
  - [x] 3.1 Create `app/hooks/useGameLoop.ts` - requestAnimationFrame loop with configurable interval
  - [x] 3.2 Create `app/hooks/useKeyboard.ts` - Handle Arrow keys, WASD, Space, P/Escape with action callbacks
  - [x] 3.3 Create `app/components/Game.tsx` - Set up game state (board, currentPiece, nextPiece, score, level, lines, gameStatus)
  - [x] 3.4 Implement piece spawning with 7-bag randomizer and next piece preview
  - [x] 3.5 Implement movement handlers: moveLeft, moveRight, softDrop (with scoring), hardDrop (with scoring)
  - [x] 3.6 Implement rotation with SRS wall kicks
  - [x] 3.7 Implement auto-drop tick: move piece down, lock if can't move, clear lines, spawn next
  - [x] 3.8 Implement game over detection (piece spawns in invalid position)
  - [x] 3.9 Implement pause/resume toggle (P/Escape key)
  - [x] 3.10 Wire useKeyboard and useGameLoop to Game component
  - [x] 3.11 Test keyboard controls work correctly in browser

- [x] 4.0 Build UI panels (Score, Next Piece, Start/Pause/GameOver modals)
  - [x] 4.1 Create `app/components/ScorePanel.tsx` - Display SCORE, HIGH, LEVEL, LINES with formatted values
  - [x] 4.2 Create `app/components/NextPiece.tsx` - Render next tetromino in small preview grid
  - [x] 4.3 Add start screen overlay - Game title, "START GAME" button, keyboard controls help text
  - [x] 4.4 Create `app/components/PauseMenu.tsx` - "PAUSED" title, Resume button, Restart button
  - [x] 4.5 Create `app/components/GameOver.tsx` - "GAME OVER" title, final score, "NEW HIGH SCORE!" indicator, Play Again button
  - [x] 4.6 Integrate high score loading from localStorage on mount
  - [x] 4.7 Integrate high score saving on game over
  - [x] 4.8 Update `app/page.tsx` to render Game component
  - [x] 4.9 Test all game states (idle, playing, paused, gameover) in browser

- [x] 5.0 Add touch/mobile controls and responsive layout
  - [x] 5.1 Create `app/hooks/useTouch.ts` - Detect swipe left/right (move), swipe down (soft drop), swipe up (hard drop), tap (rotate), double-tap (hard drop)
  - [x] 5.2 Create `app/components/Controls.tsx` - On-screen D-pad (←, →, ↓) and rotate button (↻), hard drop button (▼▼)
  - [x] 5.3 Wire touch controls to Game component actions
  - [x] 5.4 Add responsive CSS: hide touch controls on desktop, show on mobile (≤600px)
  - [x] 5.5 Add responsive cell sizes: 24px desktop, 20px tablet, 16px mobile
  - [x] 5.6 Adjust layout for mobile: stack panels vertically
  - [x] 5.7 Test touch controls on mobile device/emulator

- [x] 6.0 Apply retro pixel visual styling
  - [x] 6.1 Import "Press Start 2P" Google Font in globals.css
  - [x] 6.2 Set up CSS variables: --background (#0f0f23), --board-bg (#1a1a2e), --accent (#00f0f0)
  - [x] 6.3 Style board container with 3D beveled border effect and subtle glow
  - [x] 6.4 Style cells with inner shadow/highlight for depth effect
  - [x] 6.5 Style panels (ScorePanel, NextPiece) with consistent dark theme
  - [x] 6.6 Style modal overlays with dark semi-transparent background
  - [x] 6.7 Style buttons with accent color, hover glow effect
  - [x] 6.8 Add blinking animation for "NEW HIGH SCORE" text
  - [x] 6.9 Verify visual consistency across all screens

- [ ] 7.0 Final testing and Vercel deployment
  - [x] 7.1 Run `npm run build` - fix any TypeScript/build errors
  - [x] 7.2 Run `npm run lint` - fix any lint errors
  - [x] 7.3 Manual test on desktop: Chrome, Safari, Firefox - verify all controls and game flow
  - [ ] 7.4 Manual test on mobile: responsive layout, touch controls work
  - [ ] 7.5 Test high score persistence: play game, refresh page, verify high score persists
  - [ ] 7.6 Deploy to Vercel: `vercel` or connect GitHub repo
  - [ ] 7.7 Verify production deployment works correctly
  - [ ] 7.8 Update roadmap.md status to "Deployed"
  - [ ] 7.9 Merge feature branch to main: `git checkout main && git merge feature/tetris-game`
  - [ ] 7.10 Delete feature branch: `git branch -d feature/tetris-game`
