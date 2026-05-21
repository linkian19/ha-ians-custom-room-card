# Changelog

All notable changes are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

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
