# Ian's Custom Room Card

A customizable room card for Home Assistant's Lovelace dashboard. Combines a room icon, entity-driven badge, configurable title, and sub-buttons into one card with a complete visual editor.

## Features

- **Icon** with optional badge (entity-driven or static)
- **Background** color, opacity, and image (URL or HA area image)
- **Sub-buttons** with 6 layout presets and per-button tap/hold/double-tap actions
- **Global action** — makes the entire card a single tap target (sub-buttons become decorative)
- **HA Jinja2 templates** for icon, colors, badge, and title
- **Full visual editor** — no YAML required for basic use
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

| Field | Type | Default | Template | Description |
|---|---|---|---|---|
| `entity` | string | — | — | Primary entity (used for more-info, area lookup, getStubConfig) |
| `title` | string | — | ✓ | Card title. Set to `"entity"` to use entity friendly_name |
| `icon` | string | — | ✓ | MDI icon string (e.g. `mdi:sofa`) |
| `icon_color` | string | — | ✓ | CSS color for icon |
| `icon_background_color` | string | — | — | CSS color for icon circle background |
| `badge_icon` | string | — | ✓ | MDI icon for small badge on icon; omit to hide |
| `badge_color` | string | — | ✓ | CSS color for badge icon |
| `badge_background_color` | string | `var(--error-color)` | — | CSS color for badge background |
| `background_color` | string | HA card bg | ✓ | CSS color for card background |
| `background_opacity` | float | `1` | — | Opacity of background color layer (0–1) |
| `background_image` | string | — | — | URL string, or `"area"` to use HA area image |
| `border_color` | string | HA divider | ✓ | CSS color for card border |
| `border_opacity` | float | `1` | — | Opacity of border (0–1) |
| `grid_options` | object | see below | — | Native sections-view grid sizing |
| `sub_buttons_layout` | string | `bottom-row` | — | Layout preset for sub-buttons |
| `sub_buttons` | list | `[]` | — | List of sub-button configs (see below) |
| `global_action` | object | — | — | Card-level action; disables all sub-button actions |

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
| `corners` | Up to 4 buttons, one per corner |
| `columns` | Two-column grid |
| `grid` | Auto-fill grid |
| `custom` | Per-button `position` field controls placement |

### Sub-button config

| Field | Type | Default | Description |
|---|---|---|---|
| `entity` | string | — | Entity to drive icon, label, and state |
| `icon` | string | entity icon or `mdi:circle` | MDI icon string or HA template |
| `label` | string | — | Static text, `"entity"` (friendly_name), or HA template |
| `show_icon` | boolean | `true` | Show icon |
| `show_label` | boolean | `false` | Show label text |
| `show_state` | boolean | `false` | Show entity state text |
| `background` | boolean | `true` | Show pill background |
| `position` | string | — | Absolute position when `sub_buttons_layout: custom` |
| `tap_action` | action | `toggle` | |
| `hold_action` | action | `more-info` | |
| `double_tap_action` | action | `none` | |

`position` values: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`

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
