# Tetris - Design Principles

## Overview

This document establishes the design language and principles for the Tetris game, ensuring a cohesive, memorable visual identity that reflects the retro arcade aesthetic while feeling modern and polished.

---

## Core Design Philosophy

**"Neon Arcade Nostalgia"** - A fusion of classic 8-bit gaming with modern visual refinement. The design should evoke the atmosphere of a dimly lit arcade, with glowing screens and the tactile feel of physical controls.

---

## Typography

### Primary Font
- **Press Start 2P** - A pixel-perfect font that captures authentic 8-bit gaming typography
- Used for all game text: titles, scores, labels, buttons

### Usage Guidelines
- Titles: 16-24px
- Score values: 10-12px
- Labels: 6-8px
- Always use uppercase for labels and titles
- Add letter-spacing (1-2px) to labels for improved readability at small sizes

### Why This Choice
Avoids generic sans-serif fonts. Press Start 2P immediately communicates "retro game" and creates strong visual identity.

---

## Color Palette

### CSS Variables
```css
:root {
  --board-bg: #1a1a2e;      /* Deep navy - board background */
  --border-color: #16213e;   /* Darker navy - borders */
  --accent: #00f0f0;         /* Cyan neon - primary accent */
  --game-background: #0f0f23; /* Near black - page background */
}
```

### Tetromino Colors (NES-inspired)
| Piece | Color | Hex |
|-------|-------|-----|
| I | Cyan | #00f0f0 |
| O | Yellow | #f0f000 |
| T | Purple | #a000f0 |
| S | Green | #00f000 |
| Z | Red | #f00000 |
| J | Blue | #0000f0 |
| L | Orange | #f0a000 |

### Color Hierarchy
1. **Accent (Cyan)** - Primary actions, important information, active states
2. **White** - Score values, game pieces
3. **Muted Cyan (40-60% opacity)** - Secondary elements, borders, labels
4. **Deep Navy** - Backgrounds, containers

### What We Avoid
- Purple gradients on white (generic AI look)
- Pale, washed-out colors
- Too many competing accent colors

---

## Visual Depth & Atmosphere

### Backgrounds
- Use layered gradients, not flat colors
- Example: `linear-gradient(145deg, rgba(26, 26, 46, 0.9), rgba(15, 15, 35, 0.9))`
- Subtle inner shadows for inset effects

### Glow Effects
- Primary actions get soft glow: `box-shadow: 0 0 20px rgba(0, 240, 240, 0.15)`
- Active/pressed states intensify glow
- Text shadow on important values: `text-shadow: 0 0 10px rgba(0, 240, 240, 0.3)`

### Borders
- Use semi-transparent accent colors for subtle definition
- Primary elements: `border: 2px solid var(--accent)`
- Secondary elements: `border: 1px solid rgba(0, 240, 240, 0.2)`

---

## Motion & Animation

### Principles
- **Purposeful** - Every animation serves a function (feedback, celebration, guidance)
- **Quick** - Keep animations under 300ms for responsiveness
- **Smooth** - Use ease-out for entries, ease-in for exits

### Key Animations
| Element | Animation | Duration | Purpose |
|---------|-----------|----------|---------|
| Line clear | Flash white → cyan → original | 300ms | Celebration feedback |
| TETRIS! text | Scale up + rotate + fade | 1000ms | Major achievement |
| Score popup | Float up + fade out | 800ms | Points feedback |
| Button press | Scale down to 0.92 | 150ms | Touch feedback |
| Board pulse | Subtle scale 1.02 | 300ms | Impact emphasis |

### CSS Animation Example
```css
@keyframes line-flash {
  0%, 100% { background-color: inherit; }
  25%, 75% { background-color: #fff; }
  50% { background-color: var(--accent); }
}
```

---

## Component Design

### Buttons
```
Primary (Rotate):
- Circular shape (border-radius: 50%)
- Full accent border
- Gradient background with glow
- Largest size in control group

Secondary (Drop):
- Rounded rectangle
- 60% opacity border
- Subtle gradient
- Medium size

Tertiary (Move):
- Rounded rectangle
- 40% opacity border
- Flat background
- Smallest size
```

### Panels (Score, Next Piece)
- Gradient background for depth
- Subtle border (10-20% opacity accent)
- Rounded corners (6px)
- Consistent padding (10-12px)

### Information Hierarchy
1. **Current Score** - Highlighted with accent color, glow effect
2. **Game Board** - Central focus, largest element
3. **Next Piece** - Secondary information, visible but not dominant
4. **Stats (Level, Lines, High)** - Tertiary, muted styling
5. **Controls** - Functional, clear but unobtrusive

---

## Mobile Design

### Touch Controls Layout
```
[  ◀  ] [  ▶  ]     [  ▼▼  ]     [  ↻  ]
   MOVE               DROP        ROTATE
```

### Sizing Hierarchy
- Rotate: 64px (primary action, most used)
- Drop: 54px (secondary)
- Move: 52px each (tertiary)

### Responsive Breakpoints
- Desktop: > 600px - Side panels visible
- Mobile: ≤ 600px - Stacked layout, touch controls
- Small mobile: ≤ 380px - Reduced sizes
- Landscape: Horizontal layout, hide touch controls

---

## What Makes This Design Unique

1. **Not Generic** - Distinctive retro aesthetic vs. bland modern UI
2. **Atmospheric** - Dark theme with glowing accents creates mood
3. **Cohesive** - Single accent color (cyan) used consistently
4. **Functional Beauty** - Every visual choice serves gameplay
5. **Nostalgic Yet Fresh** - Classic inspiration with modern polish

---

## Design Checklist

Before shipping any UI changes, verify:

- [ ] Uses Press Start 2P font (no system fonts)
- [ ] Colors match defined palette
- [ ] Accent color used sparingly for emphasis
- [ ] Backgrounds have depth (gradients, not flat)
- [ ] Interactive elements have feedback animations
- [ ] Visual hierarchy guides user attention
- [ ] Mobile controls are thumb-friendly
- [ ] Glow effects enhance, not overwhelm
