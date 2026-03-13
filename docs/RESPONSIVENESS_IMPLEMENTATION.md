# Mobile Responsiveness Implementation Plan

> **Option A adopted:** Don’t render ThreeCanvas below `lg`; always show list view on mobile for performance and UX.

---

## 1. Overview

This document defines how to make the portfolio site mobile-friendly while keeping code structure and performance in mind. It assumes **Option A** for the 3D map: below `lg` (1024px), the map is never rendered; only the list view is shown.

### Key decisions

- **Breakpoint:** `lg: 1024px` is the cutoff between desktop (split layout + map/list toggle) and mobile (stacked layout + list only).
- **3D map:** Not rendered on mobile. List view is the only project selector on small screens.
- **Touch devices:** Native cursor; no custom cursor. Hover-based behavior is replaced with tap selection.
- **Layout:** Mobile uses a vertical stack; desktop keeps the 50/50 split.

---

## 2. Breakpoint Strategy

| Breakpoint | Width | Usage |
|------------|-------|--------|
| `sm` | 640px | Small tablets, large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | **Layout switch**: below = mobile, above = desktop |
| `xl` | 1280px | Desktops |

Mobile layout applies below `lg`. Desktop layout (split + optional map) applies at `lg` and up.

---

## 3. Implementation Phases

### Phase 1: Foundation

#### 1.1 Constants

Add to `src/constants.js`:

```js
/** Breakpoint for layout switch: below = mobile (stacked, list only), above = desktop (split, map or list) */
export const LAYOUT_BREAKPOINT_PX = 1024;
```

#### 1.2 Touch detection hook

Create `src/hooks/useIsTouchDevice.js`:

```js
import { useState, useEffect } from 'react';

/** Returns true on touch-capable devices. Use to disable custom cursor and enable tap-as-select. */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const check = () =>
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(check());
  }, []);

  return isTouch;
}
```

#### 1.3 Media query hook (optional)

Create `src/hooks/useMediaQuery.js`:

```js
import { useState, useEffect } from 'react';

/** Returns true when viewport width >= query. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
```

Use `useMediaQuery('(min-width: 1024px)')` for `isDesktop` where needed.

---

### Phase 2: Layout and Navigation

#### 2.1 App.jsx

**Layout**

- Below `lg`: `flex-col`, full-width sections, list view only.
- At `lg` and above: `flex-row`, `w-1/2` split, map or list per `viewMode`.

**Main changes**

1. Replace fixed `h-screen` + `flex` row with responsive layout.
2. Below `lg`: always show list (no map).
3. Adjust padding: `p-6 sm:p-12 lg:p-20` for narrative area; `p-6 sm:p-12 lg:p-24` for list.
4. `min-h-screen` on mobile; `h-screen` on desktop.
5. Use `useIsTouchDevice` to conditionally hide `CustomCursor` and avoid `cursor-none`.
6. Wrap `ThreeCanvas` so it only mounts when `lg+` and `viewMode === 'map'`.

**Structure (conceptual)**

```jsx
const isDesktop = useMediaQuery('(min-width: 1024px)');
const isTouch = useIsTouchDevice();

<main className="flex flex-col lg:flex-row min-h-screen lg:h-screen w-full pt-20 lg:pt-24">
  {/* Left: Narrative */}
  <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-20 min-h-[50vh] lg:min-h-0">
    {/* TypewriterIntro / ProjectHUD */}
  </div>

  {/* Right: List (mobile) or Map/List (desktop) */}
  <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-0 lg:h-full relative overflow-hidden">
    {isDesktop && viewMode === 'map' ? (
      <ThreeCanvas ... />
    ) : (
      <ProjectList ... />
    )}
  </div>
</main>
```

#### 2.2 Nav.jsx

**Changes**

- Responsive padding: `px-4 sm:px-6 lg:px-12 pl-4 lg:pl-20 pr-4 lg:pr-12 pt-6 lg:pt-12 pb-6 lg:pb-12`.
- Below `lg`: hide map/list toggle (always list), or show only when relevant.
- Ensure tap targets ≥ 44×44px: `min-h-[44px] min-w-[44px]` or equivalent padding.
- On touch: use `cursor-pointer` or default cursor (no `cursor-none`).

#### 2.3 Custom cursor

- Only render `CustomCursor` when `!isTouch`.
- Apply `cursor-none` on the app root only when `!isTouch`.

---

### Phase 3: List View and Interaction

#### 3.1 List view (mobile)

- On mobile, list is always visible; no map.
- Use tap instead of hover: tap row to select; dot shows project color when selected.
- Existing logic for `activeProject` and dot color works if selection is driven by tap (click) rather than hover.
- On touch, `onMouseEnter`/`onMouseLeave` are unreliable; rely on `onClick` and explicit selection state.

#### 3.2 List row behavior

**Current:** `onMouseEnter` sets `activeProject`, `onMouseLeave` clears after delay.

**Mobile-friendly:** Keep `onClick` to select and navigate. On touch:

- Use `onClick` to set `activeProject` for the tapped row (and update dot).
- Optionally clear `activeProject` when tapping outside the list or after navigation.
- Consider `onTouchEnd` or `onClick` only (no hover) for setting selection on mobile.

#### 3.3 Map/list toggle

- Show toggle only when `isDesktop` (or when `viewMode` is relevant).
- Below `lg`, toggle can be hidden since only list is shown.

---

### Phase 4: Typography and Components

#### 4.1 TypewriterIntro

- Responsive text: e.g. `text-3xl sm:text-4xl md:text-5xl` for the main heading.
- Responsive container padding and max-width.

#### 4.2 ProjectHUD

- Map variant: used only on desktop with map visible.
- List variant: used when list is shown; ensure spacing and font sizes scale on mobile.
- Responsive heading: e.g. `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`.

#### 4.3 ProjectHero (subpages)

- Responsive height: `min-h-[280px] sm:min-h-[360px] md:min-h-[450px] lg:h-[596px]`.
- Keep `clamp(2.5rem, 6vw, 6rem)` for title; verify on small viewports.
- Responsive padding for award badge and overlay text.

#### 4.4 Case study layout

- Already has `md:`, `lg:`, `xl:` in many places.
- Ensure `px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20` for horizontal padding.
- Verify grids collapse to single column on mobile (`grid-cols-1 md:grid-cols-2`).
- TableOfContents: keep `hidden xl:block` on mobile; consider a mobile ToC pattern later if needed.

---

### Phase 5: Performance and UX

#### 5.1 ThreeCanvas

- **Option A:** Do not mount `ThreeCanvas` below `lg`.
- Use conditional rendering: `{isDesktop && viewMode === 'map' && <ThreeCanvas ... />}`.
- WebGL context is never created on mobile, improving performance and battery.

#### 5.2 Safe areas

- Add `pb-safe` or `padding-bottom: env(safe-area-inset-bottom)` if content reaches the bottom on devices with notches.
- Add `viewport-fit=cover` in the viewport meta if using safe areas.

#### 5.3 Touch targets

- All interactive elements (buttons, list rows, nav items) ≥ 44×44px on mobile.
- Adequate spacing between tappable elements to avoid mis-taps.

---

## 4. File-Level Checklist

| File | Changes |
|------|---------|
| `src/constants.js` | Add `LAYOUT_BREAKPOINT_PX` |
| `src/hooks/useIsTouchDevice.js` | **New** – touch device detection |
| `src/hooks/useMediaQuery.js` | **New** (optional) – viewport breakpoint |
| `src/App.jsx` | Responsive layout; conditional cursor; conditional ThreeCanvas |
| `src/components/Nav.jsx` | Responsive padding; hide map/list on mobile; touch-friendly buttons |
| `src/components/CustomCursor.jsx` | No direct edits; parent decides render |
| `src/components/home/TypewriterIntro.jsx` | Responsive typography and spacing |
| `src/components/home/ProjectHUD.jsx` | Responsive typography |
| `src/components/ProjectHero.jsx` | Responsive hero height |
| `src/layouts/case-study/*` | Verify mobile grids and padding |
| `index.html` | Optional: `viewport-fit=cover`, `theme-color` |

---

## 5. Suggested Implementation Order

1. Add hooks: `useIsTouchDevice`, `useMediaQuery` (if used).
2. Add `LAYOUT_BREAKPOINT_PX` to `constants.js`.
3. Update `App.jsx`: responsive layout, conditional ThreeCanvas, conditional cursor.
4. Update `Nav.jsx`: responsive padding, optional toggle visibility.
5. Adjust list view for tap selection on touch.
6. Refine typography and spacing in `TypewriterIntro`, `ProjectHUD`, `ProjectHero`.
7. Review case study layout on narrow viewports.
8. Test across viewports and devices.

---

## 6. Testing Checklist

- [ ] 375×667 (iPhone SE), 390×844 (iPhone 14), 428×926 (iPhone 14 Plus)
- [ ] 768×1024 (iPad), 1024×768 (landscape)
- [ ] Portrait and landscape
- [ ] Tap to select project; dot updates correctly
- [ ] Map toggle hidden below `lg`; list always visible
- [ ] No custom cursor on touch; native cursor/pointer
- [ ] Nav fits and remains usable
- [ ] Project subpages scroll and layout correctly
- [ ] CV link opens PDF in new tab
- [ ] No layout shift or jank during resize

---

## 7. Option A Rationale

**Why not render ThreeCanvas on mobile**

- Reduces complexity (no touch raycasting).
- Improves performance and battery on mobile.
- Avoids WebGL compatibility and stability issues.
- List view is faster and easier to use on small screens.
- Easier to maintain: one clear layout mode per breakpoint.

The 3D map remains a desktop experience; mobile users get a focused list-based navigation.
