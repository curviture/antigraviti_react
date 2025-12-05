# Sidebar UI Schematic - ZenTask

## Layout Structure

```
┌─────────────────────────────────────┐
│         SIDEBAR (300px wide)        │
├─────────────────────────────────────┤
│                                     │
│  ╔═══════════════════════════════╗ │
│  ║         Stats                 ║ │ ← Gradient text (purple→blue)
│  ╚═══════════════════════════════╝ │
│                                     │
│  Today                              │ ← Section title (gray)
│  ┌───────────────────────────────┐ │
│  │  ✓  Tasks Completed           │ │
│  │     5 / 10                    │ │ ← Glass card
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  ⭐ XP Earned                  │ │
│  │     250 XP                    │ │ ← Glass card
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Level Progress               │ │
│  │  ████████░░░░░░░ 60%          │ │ ← Progress bar
│  └───────────────────────────────┘ │
│                                     │
│  Streak                             │ ← Section title
│  ┌───────────────────────────────┐ │
│  │        🔥                      │ │
│  │    7 Day Streak               │ │ ← Glass card
│  │    Best: 12 days              │ │
│  └───────────────────────────────┘ │
│                                     │
│  This Week                          │ ← Section title
│  ┌───────────────────────────────┐ │
│  │  XP Gained                    │ │
│  │  ██                           │ │
│  │  ████                         │ │
│  │  ██████                       │ │ ← Bar chart
│  │  ████                         │ │
│  │  ██████                       │ │
│  │  ████████                     │ │
│  │  ██████████                   │ │
│  │  M  T  W  T  F  S  S          │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

## Component Breakdown

### 1. Sidebar Container
- Width: 300px
- Padding: var(--space-xl)
- Background: transparent (part of grid)
- Overflow: auto (scrollable if needed)

### 2. Stats Title
- Font: var(--text-3xl)
- Color: gradient (purple → blue)
- Margin bottom: var(--space-xl)

### 3. Section
- Repeatable container
- Margin bottom: var(--space-xl)

### 4. Section Title
- Font: var(--text-lg)
- Color: var(--text-secondary)
- Margin bottom: var(--space-md)

### 5. Glass Card (.stat-card)
- Background: rgba(255, 255, 255, 0.05)
- Backdrop filter: blur(10px)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border radius: var(--radius-lg)
- Padding: var(--space-lg)
- Margin bottom: var(--space-md)
- Box shadow: 0 8px 32px rgba(0, 0, 0, 0.37)

### 6. Stat Item
- Display: flex
- Align items: center
- Gap: var(--space-sm)

### 7. Icon
- Font size: var(--text-2xl)
- Opacity: 0.8

### 8. Stat Value
- Font: var(--text-3xl)
- Font weight: 600
- Color: var(--text-primary)

### 9. Stat Label
- Font: var(--text-sm)
- Color: var(--text-secondary)

## Color Scheme

- Background: var(--bg-primary) #0a0a0f
- Card background: rgba(255, 255, 255, 0.05)
- Border: rgba(255, 255, 255, 0.1)
- Primary text: var(--text-primary) #f8fafc
- Secondary text: var(--text-secondary) #cbd5e1
- Accent 1: var(--color-purple) #a855f7
- Accent 2: var(--color-blue) #3b82f6

## Components to Create

1. **Sidebar.jsx** - Main container
2. **StatCard.jsx** - Reusable glass card
3. **StreakCounter.jsx** - Streak display
4. **WeeklyChart.jsx** - Chart.js integration
5. **Sidebar.css** - Component styles

## File Structure

```
src/components/Sidebar/
├── Sidebar.jsx          ← Main component
├── Sidebar.css          ← Styles
├── StatCard.jsx         ← Reusable card
├── StreakCounter.jsx    ← Streak display
└── WeeklyChart.jsx      ← Chart component
```
