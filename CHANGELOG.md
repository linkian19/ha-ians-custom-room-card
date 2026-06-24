# Changelog

All notable changes are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [0.2.4] - 2026-06-24

### Added
- Visual editor support for all v0.2.3 fields: `title_font_weight` (paired with Font Size in a two-column row), `sub_button_state_font_size`, `sub_button_state_font_weight`, `sub_button_text_max_width` (global button style section), and per-sub-button `state_font_size`, `state_font_weight`, `text_max_width` (Text Style sub-group in each button accordion)

## [0.2.3] - 2026-06-24

### Added
- **`title_font_weight`** — CSS font-weight for the card title (`500`, `600`, `700`, `"bold"`, etc.)
- **`sub_button_state_font_size`** — Global font size (px) for all sub-button state text; default `11`
- **`sub_button_state_font_weight`** — Global CSS font-weight for all sub-button state text; default `500`
- **`sub_button_text_max_width`** — Global max-width (px) for label/state text spans; previously hard-capped at `60px`, now defaults to **none** (auto-sizes to content)
- **Per-button `state_font_size`** — Override state text font size (px) on an individual sub-button
- **Per-button `state_font_weight`** — Override state text font-weight on an individual sub-button
- **Per-button `text_max_width`** — Override max-width (px) for label/state spans on an individual sub-button

### Changed
- Sub-button label/state text no longer has a hard-coded `max-width: 60px` — text auto-sizes to content by default

## [0.2.2] - 2026-06-10

### Fixed
- `_setupSubButtonHandlers` no longer re-runs on every entity state update that drives a template — previously fired on every `_subTemplateResults` or `_templateResults` change, causing unnecessary event listener churn on dashboards with many cards. Now only re-runs when `_config` changes.
- Wrong `documentationURL` in card registration (`IanStanek/` → `linkian19/`)
- "Switch to Groups Mode" button now uses outlined styling for correct contrast on all themes

### Changed
- Card description updated: "A highly customizable room card…" across `const.ts`, `package.json`, `info.md`, and `README.md`
- `justifyMap` object extracted to a module-level constant (was recreated on every render)
- Full documentation update: README feature list, sub-button groups reference, grid cell layout field, sub-button animation fields in config table, sub-button groups config table and position reference; CHANGELOG v0.2.0 entry

## [0.2.0] - 2026-06-10

### Added
- **Sub-button groups** (`sub_button_groups`) — up to 4 independent button groups, each with its own layout, position, gap, icon color, background color, and opacity. Groups default to non-overlapping positions derived from their layout; override with any of 14 position presets or full custom X/Y. Backward-compatible: existing `sub_buttons` configs work unchanged. Template key scheme uses `g{n}_sub_{i}_{field}` for group buttons.
- **`SubButtonGroup` config object** — `layout`, `position`, `position_x`, `position_y`, `column_justify`, `gap`, `grid_columns`, `grid_min_width`, `grid_cell_layout`, `icon_color`, `background_color`, `opacity`, `buttons[]`
- **Grid cell layout** — `sub_buttons_grid_cell_layout` (single-group) and per-group `grid_cell_layout`: `vertical` (icon above label, default square) or `horizontal` (icon beside label, pill shape)
- **Unit of measurement on state display** — wherever `show_state: true` renders entity state, the entity's `unit_of_measurement` attribute is appended (e.g. "72 °F", "45 %", "1013 hPa")
- Editor **Switch to Groups Mode** / **Revert to Single Group Mode** — migrate existing config between modes without losing settings
- Per-group button drag-and-drop reordering in the editor
- Move-up / move-down arrows for group reordering in the editor

### Fixed
- `_setupSubButtonHandlers` no longer re-runs on every entity state update — previously fired on every `_subTemplateResults` or `_templateResults` change, causing unnecessary event listener churn on dashboards with many cards

## [0.1.20] - 2026-06-10

### Added
- **Icon animations** — animate the main icon, badge, and any sub-button icon with: `spin`, `pulse` (scale breathe), `blink` (opacity flash), `bounce` (vertical hop), `shake` (horizontal wiggle)
- `icon_animation`, `icon_animation_when`, `icon_animation_speed` card-level fields
- `badge_animation`, `badge_animation_when`, `badge_animation_speed` card-level fields
- `animation`, `animation_when`, `animation_speed` per-sub-button fields
- `animation_when` supports `always`, `active` (on/open/playing/home), and `inactive` — uses same entity-state logic as `state_based_color`
- `animation_speed` supports `slow`, `normal` (default), `fast` — each animation type has tuned natural durations

## [0.1.19] - 2026-06-10

### Added
- **`icon_background_color` now supports Jinja2 templates** (previously static only)
- **Drag-and-drop sub-button reordering** in the visual editor — grip handle on each accordion row
- **`sub_buttons_column_justify`** — vertical alignment for `left-column` / `right-column` layouts: `top` (default), `center`, `bottom`, `space-between`, `space-around`

### Changed
- Sub-button delete button changed from ✕ text to `mdi:delete` trash icon

### Fixed
- `badge_background_color` template was subscribed but not applied in `_applyConfigStyles` — template values now resolve correctly

## [0.1.18] - 2026-06-10

### Added
- `badge_background_color` added to template-capable fields in the editor

### Fixed
- Template button for color fields now always lives inside `.color-row` (was incorrectly placed in a header row in some cases)

## [0.1.17] - 2026-06-10

### Fixed
- Title field in editor replaced with native `<input>` (was `ha-selector text`) — HA's Material text field reserves ~16px for helper text even when empty, pushing the template toggle button below visual center

## [0.1.16] - 2026-06-10

### Fixed
- Template toggle button centering — explicit `align-self: center` on the button and `align-self: flex-start` on `.template-input` to reliably center against input height regardless of `ha-selector` wrapper inflation

## [0.1.15] - 2026-06-10

### Fixed
- Font Size and Title Color fields moved to separate rows (removed incorrect `two-col` pairing)
- `.template-row { align-items: center }` corrected to `align-items: flex-start`

## [0.1.14] - 2026-06-10

### Fixed
- Template button for color fields moved inside `.color-row` (was in `.color-field-header`); aligns correctly with swatch and input via `align-items: center`
- `two-col` grid uses `align-items: end`

## [0.1.13] - 2026-06-10

### Fixed
- Removed duplicate "Icon Color" label
- Section bottom padding adjusted
- Template button redesigned to live in `.color-field-header`

## [0.1.12] - 2026-06-10

### Fixed
- All color fields in editor now use native `<input type="text">` instead of `ha-selector { text: {} }` — HA's Material Design text field reserves ~16–20px for helper text at the bottom even when empty, causing misalignment in color rows

## [0.1.11] - 2026-06-10

### Added
- **Independent icon background position** (`icon_background_position`, `icon_background_position_x/y`) — renders the background shape at a separate location from the icon glyph
- **Independent background width/height** (`icon_background_width`, `icon_background_height`) — non-square icon containers without custom `border-radius`

### Fixed
- Nested card compatibility: `min-height: 64px` on `:host` and `ha-card`; `touch-action: none` scoped to interactive cards only

## [0.1.10] - 2026-06-10

### Added
- **Hover highlight ripple** (`hover_highlight`) — subtle white overlay on mouse-over; enabled by default when `global_action` is set
- **`background_image_position`** — CSS `background-position` value for the background image layer

### Fixed
- Color picker alignment fix in editor

## [0.1.9] - 2026-06-10

### Fixed
- Card action handlers and sub-button handlers now re-attach on DOM reconnect (`connectedCallback`) — previously `global_action` navigation only fired once per mount
- Removed sub-button opacity dimming that incorrectly applied when `global_action` was set

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
