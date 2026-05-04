## Goal
Replace the current static "Back to Top" button (sitting in each page footer) with a **floating action button (FAB)** that stays fixed at the bottom-right corner of the viewport and follows the user as they scroll.

## Behavior
- Fixed position at bottom-right (`bottom-6 right-6`, `z-50`), always visible relative to the viewport while scrolling.
- Hidden when the user is near the top (scrollY ≤ 300px), fades/slides in once they scroll down.
- Click → smooth scroll to top (`window.scrollTo({ top: 0, behavior: "smooth" })`).
- Mounted once globally so it appears on every route (Index, Payments, Courses, Booking, NotFound).

## Visual spec
- Circular button, 48×48 (`h-12 w-12 rounded-full`).
- Sakura background (`bg-sakura`), white `ArrowUp` icon centered.
- Soft shadow (`shadow-soft`), subtle hover scale (`hover:scale-110`), smooth transitions.
- `aria-label` from existing `t.backToTop` translation (no new i18n strings needed).

## Changes

### 1. Rewrite `src/components/BackToTop.tsx`
- Add `useState` for `visible` + `useEffect` scroll listener (threshold 300px, cleanup on unmount).
- Render a fixed-position circular icon button with fade/translate transition classes (`opacity-0 translate-y-2 pointer-events-none` when hidden, opposite when visible).

### 2. Mount globally in `src/App.tsx`
- Import `BackToTop` and render it once inside `I18nProvider` (next to `<Toaster />`), so all routes get it.

### 3. Remove old footer instances
- Delete the `<BackToTop />` JSX and its import from:
  - `src/pages/Index.tsx`
  - `src/pages/Payments.tsx`
  - `src/pages/Courses.tsx`
  - `src/pages/Booking.tsx`

## Files touched
- Edit: `src/components/BackToTop.tsx`, `src/App.tsx`, `src/pages/Index.tsx`, `src/pages/Payments.tsx`, `src/pages/Courses.tsx`, `src/pages/Booking.tsx`
