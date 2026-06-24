# Ian's Custom Room Card

A highly customizable room card for Home Assistant's Lovelace dashboard. Combines a room icon, entity-driven badge, configurable title, and sub-buttons into one card with a complete visual editor — no YAML required for basic use.

## Features

- **Icon** with optional badge (entity-driven or static)
- **Icon shapes** — circle, rounded-rect, squircle, square, or custom border-radius
- **Icon positions** — top-left, top-right, bottom-left, bottom-right, center, and more; or custom X/Y
- **Icon animations** — spin, pulse, blink, bounce, or shake; optionally triggered only when entity is active or inactive
- **State-based icon colors** — auto-color icon and sub-button icons by entity state
- **Background** color, opacity, and image (URL or HA area image)
- **Title** with configurable position, alignment, size, and color
- **Sub-buttons** with 7 layout presets and per-button tap/hold/double-tap actions
- **Sub-button groups** — up to 4 independent groups, each with its own layout, position, and style
- **Grid cell layout** — buttons can be vertical (icon above label) or horizontal (icon beside label, pill shape)
- **Unit of measurement** — entity state display automatically appends the unit (°F, %, hPa, etc.)
- **Sub-button column alignment** — justify left/right-column layouts to top, center, bottom, or spaced
- **Global action** — makes the entire card a single tap target (sub-buttons become decorative)
- **HA Jinja2 templates** for icon, colors, badge, title, and icon background color
- **Full visual editor** with tabbed UI — no YAML required for basic use; drag-and-drop sub-button reordering
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
| `icon_background_color` | string | transparent | ✓ | CSS color for icon container background |
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
| `icon_animation` | string | — | — | Animation for main icon: `spin`, `pulse`, `blink`, `bounce`, `shake` |
| `icon_animation_when` | string | `always` | — | When to animate: `always`, `active` (entity on/open/playing), `inactive` (entity off/closed) |
| `icon_animation_speed` | string | `normal` | — | Animation speed: `slow`, `normal`, `fast` |
| `badge_animation` | string | — | — | Animation for the badge icon; same values as `icon_animation` |
| `badge_animation_when` | string | `always` | — | When to animate the badge; same values as `icon_animation_when` |
| `badge_animation_speed` | string | `normal` | — | Badge animation speed; same values as `icon_animation_speed` |
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
| `title_font_weight` | string/number | `500` | — | CSS font-weight for title text (e.g. `600`, `700`, `"bold"`) |
| `title_position` | string | — | — | Absolute title position within card (see icon_position values); default is inline in header |
| `title_position_x` | string | — | — | CSS offset for `title_position: custom` |
| `title_position_y` | string | — | — | CSS offset for `title_position: custom` |
| `sub_button_icon_color` | string | — | — | Global icon color for all sub-buttons |
| `sub_button_background_color` | string | — | — | Global background color for all sub-buttons |
| `sub_button_opacity` | float | `1` | — | Global opacity for all sub-buttons (0–1) |
| `sub_button_gap` | number | `6` | — | Gap between sub-buttons in px |
| `sub_button_state_font_size` | number | `11` | — | Global font size in px for sub-button state text |
| `sub_button_state_font_weight` | string/number | `500` | — | Global CSS font-weight for sub-button state text |
| `sub_button_text_max_width` | number | — | — | Global max-width in px for label/state text; auto-sizes to content by default |
| `sub_buttons_grid_columns` | number | — | — | Fixed column count for `grid` layout (overrides auto-fill) |
| `sub_buttons_grid_min_width` | number | — | — | Min cell width in px for auto-fill `grid` layout |
| `sub_buttons_grid_cell_layout` | string | `vertical` | — | Grid cell shape: `vertical` (icon above label) or `horizontal` (icon beside label, pill) |
| `sub_buttons_column_justify` | string | `top` | — | Vertical alignment for `left-column` / `right-column` layouts: `top`, `center`, `bottom`, `space-between`, `space-around` |
| `grid_options` | object | see below | — | Native sections-view grid sizing |
| `sub_buttons_layout` | string | `bottom-row` | — | Layout preset for sub-buttons (see below) |
| `sub_buttons` | list | `[]` | — | List of sub-button configs (see below) |
| `sub_button_groups` | list | — | — | Up to 4 independent button groups (see below); supersedes `sub_buttons` when present |
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
| `left-column` | Flex column pinned to the left side (align with `sub_buttons_column_justify`) |
| `right-column` | Flex column pinned to the right side (align with `sub_buttons_column_justify`) |
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
| `animation` | string | — | Animation for this button's icon: `spin`, `pulse`, `blink`, `bounce`, `shake` |
| `animation_when` | string | `always` | When to animate: `always`, `active`, `inactive` (uses button's `entity`) |
| `animation_speed` | string | `normal` | Animation speed: `slow`, `normal`, `fast` |
| `state_font_size` | number | — | Font size in px for this button's state text (overrides global `sub_button_state_font_size`) |
| `state_font_weight` | string/number | — | CSS font-weight for this button's state text (overrides global `sub_button_state_font_weight`) |
| `text_max_width` | number | — | Max-width in px for this button's label/state text (overrides global `sub_button_text_max_width`) |

`position` values (for `sub_buttons_layout: custom`): `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`

### Sub-button groups

`sub_button_groups` lets you place up to 4 independent button sets at different positions on the card, each with its own layout and style. When `sub_button_groups` is present it supersedes `sub_buttons`.

```yaml
sub_button_groups:
  - layout: right-column
    position: top-right      # optional override; auto-derived from layout if omitted
    gap: 8
    icon_color: white
    buttons:
      - entity: light.living_room
        show_icon: true
        tap_action: { action: toggle }
  - layout: grid
    position: bottom-row
    grid_cell_layout: horizontal
    buttons:
      - entity: climate.living_room
        show_icon: true
        show_state: true
```

| Field | Type | Default | Description |
|---|---|---|---|
| `layout` | string | `bottom-row` | Button layout within the group — same values as `sub_buttons_layout` |
| `position` | string | derived | Group anchor on the card (see below); auto-derived from `layout` if omitted |
| `position_x` | string | — | CSS `left` value for `position: custom` (e.g. `10px`, `25%`) |
| `position_y` | string | — | CSS `top` value for `position: custom` |
| `column_justify` | string | `top` | Vertical alignment for column layouts: `top`, `center`, `bottom`, `space-between`, `space-around` |
| `gap` | number | `6` | Gap between buttons in px |
| `grid_columns` | number | — | Fixed column count for `grid` layout |
| `grid_min_width` | number | — | Min cell width in px for auto-fill grid |
| `grid_cell_layout` | string | `vertical` | Grid cell shape: `vertical` or `horizontal` |
| `icon_color` | string | — | Default icon color for all buttons in this group |
| `background_color` | string | — | Default background color for all buttons in this group |
| `opacity` | float | `1` | Overall opacity for the group |
| `label` | string | — | Editor-only label for the group accordion |
| `buttons` | list | `[]` | Sub-button configs (same fields as `sub_buttons` entries) |

**`position` values:**

| Value | Description |
|---|---|
| `bottom-row` | Full width, bottom edge (default for row layouts) |
| `top-row` | Full width, top edge |
| `left-column` | Full height, left side (default for left-column layout) |
| `right-column` | Full height, right side (default for right-column layout) |
| `top-left` | Top-left corner |
| `top-center` | Top, horizontally centered |
| `top-right` | Top-right corner |
| `center-left` | Vertically centered, left side |
| `center` | Centered on card |
| `center-right` | Vertically centered, right side |
| `bottom-left` | Bottom-left corner |
| `bottom-center` | Bottom, horizontally centered |
| `bottom-right` | Bottom-right corner |
| `custom` | Use `position_x` and `position_y` for exact placement |

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
icon_background_color: "{{ 'rgba(255,200,0,0.3)' if is_state('light.living_room', 'on') else 'transparent' }}"
title: "{{ states.light.living_room.attributes.friendly_name }}"
```

Template-capable fields: `title`, `icon`, `icon_color`, `icon_background_color`, `badge_icon`, `badge_color`, `badge_background_color`, `background_color`, `border_color`.

Templates update live when dependent entities change. Template errors show a red border and a console warning.

---

## Animations

The main icon, badge, and each sub-button icon can be independently animated.

```yaml
# Spin the fan icon only when the fan is on
entity: fan.living_room
icon: mdi:fan
icon_animation: spin
icon_animation_when: active    # "always" | "active" | "inactive"
icon_animation_speed: normal   # "slow" | "normal" | "fast"
```

Available animations: `spin`, `pulse` (scale breathe), `blink` (opacity flash), `bounce` (vertical hop), `shake` (horizontal wiggle).

`animation_when: active` triggers when entity state is `on`, `open`, `home`, `playing`, `unlocked`, or `connected`. `animation_when: inactive` triggers on all other states. `always` (default) runs regardless of state.

Sub-buttons each take their own `animation`, `animation_when`, and `animation_speed` fields driven by the button's `entity`.

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
