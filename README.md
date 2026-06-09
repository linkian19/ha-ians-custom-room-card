# Ian's Custom Room Card

A customizable room card for Home Assistant's Lovelace dashboard. Combines a room icon, entity-driven badge, configurable title, and sub-buttons into one card with a complete visual editor.

## Features

- **Icon** with optional badge (entity-driven or static)
- **Icon shapes** — circle, rounded-rect, squircle, square, or custom border-radius
- **Icon positions** — top-left, top-right, bottom-left, bottom-right, center, and more
- **State-based icon colors** — auto-color icon and sub-button icons by entity state
- **Background** color, opacity, and image (URL or HA area image)
- **Title** with configurable position, alignment, size, and color
- **Sub-buttons** with 7 layout presets and per-button tap/hold/double-tap actions
- **Global action** — makes the entire card a single tap target (sub-buttons become decorative)
- **HA Jinja2 templates** for icon, colors, badge, and title
- **Full visual editor** with tabbed UI — no YAML required for basic use
- **card-mod compatible** — CSS custom properties and `::part()` selectors for every region

---

## Installation

### Via HACS (recommended)

1. In HACS → Integrations → ⋮ → Custom Repositories
2. Repository URL: `https://github.com/linkian19/ha-ians-custom-room-card`
3. Category: Dashboard
4. Click Add → search "Ian's Custom Room Card" → Install
5. Restart Home Assistant (or reload Lovelace resources)

### Manual

1. Download `ians-custom-room-card.js` from the latest [Release](https://github.com/linkian19/ha-ians-custom-room-card/releases)
2. Copy to `/config/www/`
3. In Lovelace → Dashboard Resources → Add `/local/ians-custom-room-card.js` (type: JavaScript module)

---

## Basic Example

```yaml
type: custom:ians-custom-room-card
title: Living Room
icon: mdi:sofa
icon_color: "rgb(255, 200, 50)"
background_color: "rgba(30,30,50,0.85)"
global_action:
  tap_action:
    action: navigate
    navigation_path: /lovelace/living-room
sub_buttons:
  - entity: light.living_room
    icon: mdi:lightbulb
    show_icon: true
    tap_action:
      action: toggle
  - entity: climate.living_room
    icon: mdi:thermostat
    show_icon: true
    show_state: true
    tap_action:
      action: more-info
```

---

## Full Config Reference

### Card fields

| Field | Type | Default | Template | Description |
|---|---|---|---|---|
| `entity` | string | — | — | Primary entity (used for more-info, area lookup, getStubConfig) |
| `title` | string | — | ✓ | Card title. Set to `"entity"` to use entity friendly_name |
| `icon` | string | — | ✓ | MDI icon string (e.g. `mdi:sofa`) |
| `icon_color` | string | — | ✓ | CSS color for the main icon |
| `icon_size` | number | — | — | MDI glyph size in px (overrides CSS default of 60% of container) |
| `icon_background_color` | string | transparent | — | CSS color for icon container background |
| `icon_background_size` | number | `40` | — | Icon container base size in px (sets both width and height) |
| `icon_background_width` | number | — | — | px width of icon container (overrides `icon_background_size`) |
| `icon_background_height` | number | — | — | px height of icon container (overrides `icon_background_size`) |
| `icon_background_shape` | string | `circle` | — | Icon container shape preset: `circle`, `rounded-rect`, `squircle`, `square` |
| `icon_background_border_radius` | string | — | — | Custom CSS border-radius (overrides `icon_background_shape`) |
| `icon_background_position` | string | — | — | Position preset for the background shape, independent of `icon_position`; uses same values as `icon_position` |
| `icon_background_position_x` | string | — | — | CSS offset for `icon_background_position: custom` |
| `icon_background_position_y` | string | — | — | CSS offset for `icon_background_position: custom` |
| `icon_opacity` | float | `1` | — | Opacity of icon glyph (0–1) |
| `icon_background_opacity` | float | `1` | — | Opacity of icon container background (0–1) |
| `state_based_color` | boolean | `false` | — | Auto-color icon based on entity state |
| `icon_color_on` | string | domain color | — | Icon color when entity is active (requires `state_based_color: true`) |
| `icon_color_off` | string | — | — | Icon color when entity is inactive (requires `state_based_color: true`) |
| `icon_position` | string | — | — | Icon position within card (see values below); default is inline in header |
| `icon_position_x` | string | — | — | CSS left/right value for `icon_position: custom` (e.g. `25%`, `50px`) |
| `icon_position_y` | string | — | — | CSS top/bottom value for `icon_position: custom` (e.g. `25%`, `50px`) |
| `badge_icon` | string | — | ✓ | MDI icon for small badge on icon; omit to hide |
| `badge_color` | string | `#fff` | ✓ | CSS color for badge icon |
| `badge_background_color` | string | `var(--error-color)` | ✓ | CSS color for badge background |
| `badge_size` | number | `18` | — | Badge circle size in px |
| `badge_opacity` | float | `1` | — | Opacity of badge (0–1) |
| `badge_position` | string | `top-right` | — | Badge position relative to icon: `top-left`, `top-right`, `bottom-left`, `bottom-right`, `custom` |
| `badge_position_x` | string | — | — | CSS offset value for `badge_position: custom` |
| `badge_position_y` | string | — | — | CSS offset value for `badge_position: custom` |
| `background_color` | string | HA card bg | ✓ | CSS color for card background |
| `background_opacity` | float | `1` | — | Opacity of background color layer (0–1) |
| `background_image` | string | — | — | URL string, or `"area"` to use HA area image |
| `background_image_position` | string | `center` | — | CSS `background-position` value for the background image (e.g. `top right`, `75% 25%`) |
| `border_color` | string | HA divider | ✓ | CSS color for card border |
| `border_opacity` | float | `1` | — | Opacity of border (0–1) |
| `hover_highlight` | boolean | `true`* | — | Show a subtle white ripple overlay on hover (*default `true` when `global_action` is set, `false` otherwise) |
| `title_align` | string | `left` | — | Title text alignment: `left`, `center`, `right` |
| `title_color` | string | — | — | CSS color for title text |
| `title_font_size` | number | `14` | — | Title font size in px |
| `title_position` | string | — | — | Absolute title position within card (see icon_position values); default is inline in header |
| `title_position_x` | string | — | — | CSS offset for `title_position: custom` |
| `title_position_y` | string | — | — | CSS offset for `title_position: custom` |
| `sub_button_icon_color` | string | — | — | Global icon color for all sub-buttons |
| `sub_button_background_color` | string | — | — | Global background color for all sub-buttons |
| `sub_button_opacity` | float | `1` | — | Global opacity for all sub-buttons (0–1) |
| `sub_button_gap` | number | `6` | — | Gap between sub-buttons in px |
| `sub_buttons_grid_columns` | number | — | — | Fixed column count for `grid` layout (overrides auto-fill) |
| `sub_buttons_grid_min_width` | number | — | — | Min cell width in px for auto-fill `grid` layout |
| `grid_options` | object | see below | — | Native sections-view grid sizing |
| `sub_buttons_layout` | string | `bottom-row` | — | Layout preset for sub-buttons (see below) |
| `sub_buttons` | list | `[]` | — | List of sub-button configs (see below) |
| `global_action` | object | — | — | Card-level action; disables all sub-button actions |

### icon_position values

| Value | Description |
|---|---|
| `top-left` | Absolute top-left of card |
| `top-right` | Absolute top-right of card |
| `bottom-left` | Absolute bottom-left of card |
| `bottom-right` | Absolute bottom-right of card |
| `center` | Centered in card |
| `center-left` | Vertically centered, left edge |
| `center-right` | Vertically centered, right edge |
| `custom` | Use `icon_position_x` and `icon_position_y` for exact placement |

> **Tip:** Use `%` values (e.g. `25%`) for `icon_position_x/y` and `title_position_x/y` — these scale with card size. Fixed `px` values do not adapt when the card is resized.

### grid_options

```yaml
grid_options:
  columns: 6         # default (1–12; multiples of 3 recommended)
  rows: 2
  min_columns: 3
  min_rows: 1
  max_columns: 12    # optional
  max_rows: 6        # optional
```

### sub_buttons_layout presets

| Value | Behavior |
|---|---|
| `bottom-row` | Flex row at card bottom (default) |
| `top-row` | Flex row at card top |
| `left-column` | Flex column pinned to the left side |
| `right-column` | Flex column pinned to the right side |
| `corners` | Up to 4 buttons, one per corner |
| `grid` | Auto-fill grid (configure with `sub_buttons_grid_columns` or `sub_buttons_grid_min_width`) |
| `custom` | Per-button `position` field controls placement |

### Sub-button config

| Field | Type | Default | Description |
|---|---|---|---|
| `entity` | string | — | Entity to drive icon, label, and state |
| `icon` | string | entity icon or `mdi:circle` | MDI icon string |
| `label` | string | — | Static text, `"entity"` (friendly_name), or HA template |
| `show_icon` | boolean | `true` | Show icon |
| `show_label` | boolean | `false` | Show label text |
| `show_state` | boolean | `false` | Show entity state text |
| `background` | boolean | `true` | Show pill background |
| `icon_color` | string | — | CSS color for this button's icon |
| `icon_color_on` | string | — | Icon color when entity is active (requires `state_based_color: true`) |
| `icon_color_off` | string | — | Icon color when entity is inactive (requires `state_based_color: true`) |
| `state_based_color` | boolean | `false` | Auto-color icon based on entity state |
| `background_color` | string | — | CSS color for this button's background (overrides global) |
| `opacity` | float | — | Opacity for this button (overrides global `sub_button_opacity`) |
| `position` | string | — | Absolute position when `sub_buttons_layout: custom` |
| `tap_action` | action | `toggle` | Action on tap |
| `hold_action` | action | `more-info` | Action on hold |
| `double_tap_action` | action | `none` | Action on double-tap |

`position` values: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`

### State-based icon color

When `state_based_color: true`, the icon color is automatically set based on entity state:

```yaml
entity: light.living_room
state_based_color: true          # auto-colors icon yellow when light is on
icon_color_on: "#ffcc00"         # optional override for active color
icon_color_off: "#555555"        # optional override for inactive color
```

Active states: `on`, `open`, `home`, `playing`, `unlocked`, `connected`

Domain defaults for active color: `light` → yellow, `fan` → teal, `alarm_control_panel` → red, others → yellow.

### Action config

```yaml
action: navigate          # navigate | more-info | toggle | perform-action | url | assist | none
# navigate:
navigation_path: /lovelace/room
# perform-action: (call-service accepted as legacy alias)
perform_action: light.turn_on
data:
  brightness_pct: 80
target:
  entity_id: light.living_room
# url:
url_path: https://example.com
# assist:
pipeline_id: preferred
start_listening: false
```

### global_action

> **Warning:** When `global_action` is set, all sub-button tap/hold/double-tap actions are completely disabled. Sub-buttons become display-only decorations. The entire card surface is a single tap target.

```yaml
global_action:
  tap_action:
    action: navigate
    navigation_path: /lovelace/room
  hold_action:
    action: more-info
  double_tap_action:
    action: none
```

---

## Template Support

Fields marked ✓ in the reference table accept HA Jinja2 templates:

```yaml
icon: "{{ 'mdi:lightbulb-on' if is_state('light.living_room', 'on') else 'mdi:lightbulb' }}"
icon_color: "{{ '#ffff00' if is_state('light.living_room', 'on') else '#888888' }}"
title: "{{ states.light.living_room.attributes.friendly_name }}"
```

Templates update live when dependent entities change. Template errors show a red border and a console warning.

---

## CSS Customization (card-mod)

All visual regions expose CSS custom properties and `::part()` selectors.

```yaml
card_mod:
  style: |
    ha-card {
      --ians-card-background-color: rgba(10, 20, 40, 0.9);
      --ians-icon-color: #ffcc00;
      --ians-title-font-size: 16px;
    }
```

See [docs/css-classes.md](docs/css-classes.md) for the complete reference.

---

## Attribution

Inspired by [mushroom-cards](https://github.com/piitaya/lovelace-mushroom) and [bubble-card](https://github.com/Clooos/Bubble-Card).

Built with [Claude Code](https://claude.ai/claude-code).
