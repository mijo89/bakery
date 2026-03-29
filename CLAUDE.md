# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Type-check + production build
npm run lint      # ESLint
npm run preview   # Serve production build locally
```

## Architecture

Single-page React + TypeScript app built with Vite. No router — one page only.

**Data flow:** All bakery data is static, defined in `src/data/bakeries.ts`. No API calls.

**State** lives entirely in `AppLayout` (`src/components/Layout/AppLayout.tsx`):
- `filters` (arrondissement + search query) → drives `filteredBakeries` via `useMemo`
- `selectedBakeryId` + `flyToCoordinates` → shared between Sidebar and MapView so clicking a card pans the map

**Component tree:**
```
App → AppLayout
  ├── Sidebar
  │   ├── FilterBar       (arrondissement dropdown + search input)
  │   ├── BakeryList
  │   │   └── BakeryCard  (click → handleSelectBakery)
  └── MapView (react-leaflet)
      └── BakeryMarker    (click → onBakerySelect)
```

**Key types** (`src/types/index.ts`):
- `Bakery` — id, name, address, arrondissement, coordinates `[lat, lng]`, description, tags, optional website/phone/openingHours
- `FilterState` — arrondissement (`number | null`) + searchQuery (`string`)

**Styling:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin). Utility classes inline; `src/App.css` and `src/index.css` for global resets. `src/lib/utils.ts` exports a `cn()` helper (clsx + tailwind-merge).

**Map:** Leaflet via react-leaflet. `MapView` uses `flyTo` triggered by `flyToCoordinates` prop changing to center the map on a selected bakery.

## Adding bakeries

Add entries to the `bakeries` array in `src/data/bakeries.ts`. The `arrondissements` export (also in that file) drives the filter dropdown — update it if adding a new arrondissement.
