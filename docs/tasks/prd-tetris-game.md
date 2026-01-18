# PRD: Tetris Game

## 1. Introduction/Overview

This document outlines the requirements for building a classic Tetris game as a web application. The game will serve as a portfolio project demonstrating frontend development skills using modern web technologies (Next.js 16, React 19, Tailwind CSS 4).

The game implements the classic Tetris gameplay where players manipulate falling geometric shapes (Tetrominos) to complete horizontal lines, which then clear from the board. The project showcases skills in game loop implementation, state management, responsive design, and retro-style UI aesthetics.

## 2. Goals

| Goal | Description |
|------|-------------|
| **Demonstrate Technical Skills** | Showcase proficiency in React 19, Next.js 16, TypeScript, and game development patterns |
| **Fully Playable Game** | Deliver a complete, bug-free Tetris experience with all standard features |
| **Cross-Platform Support** | Work seamlessly on desktop (keyboard) and mobile (touch controls) |
| **Portfolio Ready** | Deployed on Vercel with clean code suitable for code review |
| **Fast Delivery** | Complete within 1-2 days |

## 3. User Stories

### Core Gameplay
- **US-1**: As a player, I want to start a new game so I can begin playing Tetris.
- **US-2**: As a player, I want to move pieces left/right so I can position them where I want.
- **US-3**: As a player, I want to rotate pieces so I can fit them into gaps.
- **US-4**: As a player, I want to soft drop pieces so I can speed up placement.
- **US-5**: As a player, I want to hard drop pieces so I can instantly place them.
- **US-6**: As a player, I want lines to clear when completed so I can continue playing.

### Game Feedback
- **US-7**: As a player, I want to see a ghost piece so I know where my piece will land.
- **US-8**: As a player, I want to see the next piece so I can plan ahead.
- **US-9**: As a player, I want to see my current score, level, and lines cleared.
- **US-10**: As a player, I want the game to speed up as I level up for increasing challenge.

### Game State
- **US-11**: As a player, I want to pause the game so I can take breaks.
- **US-12**: As a player, I want to see a game over screen with my final score.
- **US-13**: As a player, I want my high score saved so I can try to beat it later.
- **US-14**: As a player, I want to restart the game without refreshing the page.

### Mobile Support
- **US-15**: As a mobile player, I want on-screen controls so I can play without a keyboard.
- **US-16**: As a mobile player, I want touch gestures (swipe, tap) for intuitive control.

## 4. Functional Requirements

### 4.1 Game Board
- **FR-1**: The game board MUST be 10 columns × 20 rows.
- **FR-2**: The board MUST display locked pieces in their respective colors.
- **FR-3**: Empty cells MUST be visually distinct from filled cells.

### 4.2 Tetrominos
- **FR-4**: The game MUST include all 7 standard Tetrominos (I, O, T, S, Z, J, L).
- **FR-5**: Each Tetromino MUST have a distinct color (I=Cyan, O=Yellow, T=Purple, S=Green, Z=Red, J=Blue, L=Orange).
- **FR-6**: Tetrominos MUST spawn at the top-center of the board.
- **FR-7**: The game MUST use the 7-bag randomizer (shuffle all 7 pieces, deal them, repeat).

### 4.3 Movement & Rotation
- **FR-8**: Pieces MUST move left/right by one cell per input.
- **FR-9**: Pieces MUST move down by one cell on soft drop input.
- **FR-10**: Pieces MUST instantly drop to the lowest valid position on hard drop.
- **FR-11**: Pieces MUST rotate clockwise (and optionally counter-clockwise).
- **FR-12**: The game MUST implement SRS (Super Rotation System) with wall kicks.

### 4.4 Collision Detection
- **FR-13**: Pieces MUST NOT move through board boundaries.
- **FR-14**: Pieces MUST NOT overlap with locked pieces.
- **FR-15**: Pieces MUST lock in place when they can no longer move down.

### 4.5 Line Clearing
- **FR-16**: Completed horizontal lines MUST be cleared from the board.
- **FR-17**: Lines above cleared lines MUST fall down to fill the gap.
- **FR-18**: Multiple lines (1-4) MUST be clearable simultaneously.

### 4.6 Scoring (Classic Nintendo)
- **FR-19**: Single line clear = 40 × (level + 1) points.
- **FR-20**: Double line clear = 100 × (level + 1) points.
- **FR-21**: Triple line clear = 300 × (level + 1) points.
- **FR-22**: Tetris (4 lines) = 1200 × (level + 1) points.
- **FR-23**: Soft drop = 1 point per cell dropped.
- **FR-24**: Hard drop = 2 points per cell dropped.

### 4.7 Level Progression
- **FR-25**: The game MUST start at level 0.
- **FR-26**: Level MUST increase by 1 every 10 lines cleared.
- **FR-27**: Drop speed MUST increase with each level.
- **FR-28**: Maximum practical speed MUST be reached around level 9-10.

### 4.8 UI Elements
- **FR-29**: The game MUST display a "Next Piece" preview panel.
- **FR-30**: The game MUST display current score, high score, level, and lines cleared.
- **FR-31**: The game MUST show a ghost piece (semi-transparent landing preview).
- **FR-32**: The game MUST have a start screen with a "Start Game" button.
- **FR-33**: The game MUST have a pause menu with "Resume" and "Restart" options.
- **FR-34**: The game MUST have a game over screen showing final score and "Play Again" option.

### 4.9 Controls - Keyboard
- **FR-35**: Arrow Left / A key = Move left.
- **FR-36**: Arrow Right / D key = Move right.
- **FR-37**: Arrow Down / S key = Soft drop.
- **FR-38**: Arrow Up / W key = Rotate clockwise.
- **FR-39**: Space key = Hard drop.
- **FR-40**: P / Escape key = Pause/Resume.

### 4.10 Controls - Touch/Mobile
- **FR-41**: Swipe left/right = Move piece.
- **FR-42**: Swipe down = Soft drop.
- **FR-43**: Swipe up or double-tap = Hard drop.
- **FR-44**: Single tap = Rotate.
- **FR-45**: On-screen D-pad and rotate button MUST be visible on mobile.

### 4.11 Persistence
- **FR-46**: High score MUST be saved to localStorage.
- **FR-47**: High score MUST persist across browser sessions.
- **FR-48**: New high score MUST be indicated on game over screen.

### 4.12 Visual Style
- **FR-49**: The game MUST use a retro pixel aesthetic.
- **FR-50**: The game MUST use "Press Start 2P" font (or similar pixel font).
- **FR-51**: The game MUST use NES-inspired color palette.
- **FR-52**: Pieces MUST have an inner shadow/bevel effect for depth.

## 5. Non-Goals (Out of Scope)

The following features are explicitly **NOT** included in this version:

- ❌ Sound effects or background music
- ❌ Hold piece functionality
- ❌ Multiple next piece previews (only 1)
- ❌ T-spin detection and bonus scoring
- ❌ Multiplayer mode
- ❌ Leaderboards / online high scores
- ❌ Customizable controls
- ❌ Customizable themes
- ❌ Account system / authentication
- ❌ WCAG accessibility compliance

## 6. Design Considerations

### Visual Reference
- Classic NES Tetris / Game Boy Tetris aesthetic
- Dark background (#0f0f23) with subtle grid pattern
- Board container with 3D beveled border effect
- Cyan accent color (#00f0f0) for UI elements

### Layout
- **Desktop**: Three-column layout (Score Panel | Board | Next Piece)
- **Mobile**: Stacked layout (Board → Next Piece → Score → Touch Controls)

### Responsive Breakpoints
- Desktop: Cell size 24px
- Tablet (≤600px): Cell size 20px, touch controls visible
- Mobile (≤400px): Cell size 16px

## 7. Technical Considerations

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **UI**: React 19
- **Styling**: Tailwind CSS 4 + custom CSS
- **Language**: TypeScript
- **Deployment**: Vercel

### Architecture
```
/app/components/    # React components (Game, Board, etc.)
/app/lib/           # Game logic (tetrominos, scoring, storage)
/app/hooks/         # Custom hooks (useGameLoop, useKeyboard, useTouch)
```

### Key Implementation Notes
- Use `requestAnimationFrame` for smooth game loop
- Use React state for game state (board, piece, score)
- Use `useCallback` and `useRef` to avoid stale closures in game loop
- Use CSS Grid for board rendering
- Use localStorage for high score persistence

## 8. Success Metrics

| Metric | Target |
|--------|--------|
| **Playability** | Game is fully playable without bugs or crashes |
| **Responsiveness** | Works on desktop Chrome, Safari, Firefox + mobile Safari/Chrome |
| **Performance** | Smooth 60fps gameplay with no stuttering |
| **Code Quality** | Clean, readable code suitable for portfolio review |
| **Deployment** | Successfully deployed to Vercel with working URL |
| **Completion Time** | Delivered within 1-2 days |

## 9. Open Questions

| # | Question | Status |
|---|----------|--------|
| 1 | Should DAS (Delayed Auto Shift) be implemented for holding movement keys? | Deferred to future |
| 2 | Should there be a "level select" option at game start? | No - start at level 0 |
| 3 | Should there be visual effects for line clears (flash, animation)? | Nice to have if time permits |

---

**Document Info**
- **Author**: AI Assistant
- **Created**: 2026-01-18
- **Spec Reference**: `/docs/spec/tetris-spec.md`
- **Status**: Ready for Implementation
