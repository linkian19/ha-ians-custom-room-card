# Tasks — ians-custom-room-card

> **How to use this file:** At the start of every work session, update "In Progress" to reflect current state. Move completed items to "Completed". This file is the resume point if work is paused mid-session.

---

## In Progress

_Nothing in progress — current release v0.3.1 (2026-10-28 audit batch: v0.2.12 fixes, v0.3.0 HA best practices, v0.3.1 editor/CI). See CHANGELOG.md for per-version detail._

---

## Completed

- [x] Research: HA custom card API (LitElement, getGridOptions, getConfigElement, getStubConfig, window.customCards)
- [x] Research: HACS plugin requirements (hacs.json schema, GitHub Releases, dist/ structure)
- [x] Research: Action system (hass-action event, supported action types)
- [x] Research: Template API (subscribeRenderTemplate via hass.connection.subscribeMessage)
- [x] Research: card-mod CSS compatibility (shadow DOM targeting, --ians-* variables)
- [x] Research: Build toolchain (Vite + TypeScript confirmed via mushroom-cards)
- [x] Research: HA element loader pattern (customElements.whenDefined + hui-tile-card indirect load)
- [x] Write PLAN.md
- [x] Write TASKS.md

### Phase 1 — Scaffold
- [x] Create project directory structure
- [x] Write `package.json` (deps: lit; devDeps: vite, typescript, terser)
- [x] Write `tsconfig.json`
- [x] Write `vite.config.ts` (single ES module → `dist/ians-custom-room-card.js`)
- [x] Write `src/const.ts` (CARD_TYPE, VERSION)
- [x] Write `src/types.ts` (CardConfig, SubButtonConfig, ActionConfig interfaces)
- [x] Write `src/ians-custom-room-card.ts` (stub class + window.customCards registration)
- [x] Write `hacs.json`
- [x] Write `info.md`
- [x] Verify: `npm run build` succeeds

### Phase 2 — Core Static Appearance
- [x] Write `src/types.ts` full CardConfig interface
- [x] Write `src/utils/styles.ts` with all --ians-* custom properties
- [x] Implement card `render()`: ha-card, background layer, header (icon + badge + title)
- [x] Implement `getGridOptions()` from config.grid_options
- [x] Implement `getStubConfig()` with sensible defaults
- [x] Verify: all --ians-* variables overridable
- [x] Verify: ::part() selectors exported

### Phase 3 — Entity State Binding
- [x] Implement `hass` setter with reactive entity state reads
- [x] Implement `title: "entity"` → friendly_name resolution
- [x] Write `src/utils/area-image.ts` for background_image: "area"
- [x] Verify: entity state change re-renders card

### Phase 4 — Template Engine
- [x] Write `src/utils/template-manager.ts` (subscribeMessage wrapper)
- [x] Wire template subscriptions: icon, icon_color, badge_icon, badge_color, background_color, border_color, title
- [x] Implement template error state (red border + error icon)
- [x] Implement subscription cleanup on disconnectedCallback

### Phase 5 — Action System
- [x] Write `src/utils/action-handler.ts` (pointer gesture detection)
- [x] Implement hass-action event dispatch for all action types
- [x] Handle call-service alias → perform-action normalization
- [x] Tap, hold (500ms), double-tap (350ms) gesture detection
- [x] Mobile context menu prevention

### Phase 6 — Sub-Buttons
- [x] Implement sub-button rendering with entity state
- [x] Implement layout presets: corners, top-row, bottom-row, columns, grid, custom
- [x] Implement custom per-button position
- [x] Wire per-sub-button action dispatch
- [x] Wire per-sub-button template subscriptions (icon, label)

### Phase 7 — Global Action Override
- [x] Implement global_action override logic in card
- [x] Apply pointer-events: none + display-only class to sub-buttons when global_action active
- [x] Card root gets interactive class and action handler when global_action set

### Phase 8 — Background Image
- [x] Implement background image layer (separate z-indexed div from color layer)
- [x] background_opacity applies only to color layer (not image)
- [x] area image fallback when entity has no area: no image, no error

### Phase 9 — Visual Editor
- [x] Write `src/utils/loader.ts` (loadHaComponents via hui-tile-card indirect pattern)
- [x] Write `src/editor.ts` with all controls mapped per PLAN.md §4
- [x] Implement template toggle (picker → textarea transition)
- [x] Implement sub-button list editor (add/remove/reorder/expand)
- [x] Implement global_action section with override warning text
- [x] getConfigElement() returns editor element
- [x] All editor controls fire config-changed correctly

### Phase 10 — Polish, Docs, HACS Release
- [x] Write `README.md` with full config reference table
- [x] Write `docs/beginner-guide.md`
- [x] Write `docs/advanced-guide.md`
- [x] Write `docs/css-classes.md`
- [x] Write `CHANGELOG.md` (v0.1.0 section)
- [x] Write `.github/workflows/release.yml`

---

## Remaining

- [ ] Check on a real phone/tablet: hold and double-tap on iOS/Android, and that swiping on cards now scrolls (`touch-action: manipulation`, v0.3.0)
- [ ] Check keyboard focus ring and Enter/Space in the HA frontend (v0.3.0)
- [ ] Watch `hui-tile-card` editor-loader workaround (`src/utils/loader.ts`) after major HA releases

---

## Resolved Questions

1. **Area picture path** — `hass.areas[id].picture`; area comes from the entity registry entry, falling back to its device's area (fixed v0.2.12)
2. **`fire-dom-event` action** — still omitted; add if card-mod users need it
3. **Entity/icon pickers** — editor uses `ha-selector` (entity/icon selectors) since v0.3.1 instead of the internal picker elements
4. **Release/version drift** — release workflow fails if tag ≠ package.json version or committed dist ≠ build (v0.3.1)
