# Changelog

All notable changes are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [0.1.5] - 2026-05-21

### Added
- **Icon size controls** — independently configure the MDI glyph size (`icon_size`) and the circle background size (`icon_background_size`), both in px
- **Icon position** — place the icon anywhere on the card: top-left (default in-flow), top-right, bottom-left, bottom-right, center, center-left, center-right, or custom (CSS X/Y values). Icon is absolutely positioned on the card when set; title remains in the header
- **Badge size** — configure badge circle diameter in px (`badge_size`)
- **Badge position** — place the badge relative to the icon: top-right (default), top-left, bottom-left, bottom-right, or custom (CSS X/Y). Badge always moves with the icon regardless of icon position

## [0.1.4] - 2026-05-21

### Changed
- Replace all remaining plain `<input>` elements in the editor with `ha-selector` using `{ text: {} }` — all text fields now use native HA-styled inputs consistent with the rest of the editor

## [0.1.3] - 2026-05-21

### Fixed
- Replace `ha-textfield` with native `<input>` elements — text fields (Title, color fields, image URL, sub-button label) were invisible because `ha-textfield` is not auto-loaded in current HA versions
- Change action selectors from `{ action: {} }` to `{ ui_action: {} }` — the correct `ha-selector` type in HA 2024+; previously action selectors rendered blank

## [0.1.2] - 2026-05-21

### Fixed
- Visual editor no longer gets stuck on "Loading editor…" — removed blocking `Promise.all` wait on HA element registration that never resolved in current HA versions

## [0.1.1] - 2026-05-21

### Fixed
- Add `"type": "module"` to package.json to suppress Vite CJS Node API deprecation warning in build output

## [0.1.0] - 2026-05-21

### Added
- Room card with configurable icon, icon badge, and title
- Entity-driven icon, title, and badge (pulls from hass entity state)
- HA Jinja2 template support for: icon, icon_color, badge_icon, badge_color, background_color, border_color, title
- Background color layer with independent opacity control
- Background image layer (URL or `"area"` keyword to use HA area image)
- Border color with independent opacity control
- Native HA grid sizing via `getGridOptions()`
- Sub-buttons with 6 layout presets: bottom-row, top-row, corners, columns, grid, custom
- Per-sub-button entity state, icon, label, state display, and full tap/hold/double-tap actions
- Global action override — entire card becomes a single tap target; sub-buttons become decorative
- Complete visual editor — all options editable without YAML
- card-mod compatible: `--ians-*` CSS custom properties and `::part()` selectors for every visual region
- HACS installable as a custom repository
