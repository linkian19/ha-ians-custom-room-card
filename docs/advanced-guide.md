# Advanced Guide

## HA Jinja2 Templates

Fields marked with ✓ in the config reference accept HA Jinja2 templates. A value is treated as a template if it starts with `{{` or `{%`.

Templates are evaluated server-side via WebSocket and update automatically when any referenced entity changes.

### Available variables

Inside any template field, these variables are available:

| Variable | Value |
|---|---|
| `config` | The full card config object |
| `user` | The logged-in user's name |
| `entity` | The `hass.states` entry for `config.entity` (if set) |

### Icon changes with entity state

```yaml
icon: "{{ 'mdi:lightbulb-on' if is_state('light.living_room', 'on') else 'mdi:lightbulb' }}"
icon_color: "{{ '#ffff00' if is_state('light.living_room', 'on') else '#888888' }}"
```

### Title shows entity state

```yaml
title: "{{ states('sensor.living_room_temperature') }}°F"
```

### Background color driven by alarm state

```yaml
background_color: >
  {% if is_state('alarm_control_panel.home', 'armed_away') %}
    rgba(200, 50, 50, 0.85)
  {% elif is_state('alarm_control_panel.home', 'armed_home') %}
    rgba(200, 150, 50, 0.85)
  {% else %}
    rgba(30, 30, 50, 0.85)
  {% endif %}
```

### Badge driven by entity state

```yaml
badge_icon: "{{ 'mdi:alert' if states('binary_sensor.door_open') == 'on' else '' }}"
badge_color: "var(--error-color)"
```

Setting `badge_icon` to an empty string hides the badge.

### Template errors

If a template fails (syntax error, undefined entity), the card shows a red border and a small error indicator in the top-right corner. Check the browser console for details.

---

## Entity-Driven Styling

### Icon and color from entity attributes

```yaml
entity: light.living_room
icon: "{{ state_attr('light.living_room', 'icon') or 'mdi:lightbulb' }}"
icon_color: >
  {% set brightness = state_attr('light.living_room', 'brightness') | int(0) %}
  {% set pct = (brightness / 255 * 100) | int %}
  hsl(45, 100%, {{ [pct, 30] | max }}%)
```

### Multiple entities in one template

```yaml
title: >
  {{ states('sensor.living_room_temperature') }}°F •
  {{ states('sensor.living_room_humidity') }}%
```

---

## State-Based Icon Colors

Instead of templates, you can use `state_based_color: true` to automatically color the icon based on entity state.

```yaml
entity: light.living_room
state_based_color: true
```

When the entity is in an active state (`on`, `open`, `home`, `playing`, `unlocked`, `connected`), the icon gets a domain-appropriate color. The defaults are:

| Domain | Active color |
|---|---|
| `light`, `switch`, `media_player`, `cover`, `binary_sensor` | Yellow (`--state-light-active-color`) |
| `fan` | Teal (`--state-fan-active-color`) |
| `lock` | Green (`--success-color`) |
| `alarm_control_panel` | Red (`--error-color`) |

To override the automatic colors:

```yaml
entity: light.living_room
state_based_color: true
icon_color_on: "#ffcc00"   # color when on
icon_color_off: "#444444"  # color when off (falls back to icon_color if omitted)
```

The same `state_based_color`, `icon_color_on`, and `icon_color_off` fields work per sub-button.

---

## Icon Position

By default the icon sits inline in the card header alongside the title. Set `icon_position` to place it anywhere on the card:

```yaml
icon_position: center       # centered in the card
icon_position: top-right    # absolute top-right corner
icon_position: bottom-left  # absolute bottom-left corner
```

Available values: `top-left`, `top-right`, `bottom-left`, `bottom-right`, `center`, `center-left`, `center-right`, `custom`

For custom placement, provide CSS coordinates using `%` values so the position scales with card size:

```yaml
icon_position: custom
icon_position_x: "25%"
icon_position_y: "30%"
```

> **Tip:** Fixed `px` values for custom positions do not adapt when the card is resized in the sections view. Use `%` values whenever you want the icon to remain proportionally placed.

### Non-square icon containers

```yaml
icon_background_width: 60    # px
icon_background_height: 40   # px
icon_background_border_radius: "8px"
```

Or use a shape preset:

```yaml
icon_background_shape: rounded-rect   # circle | rounded-rect | squircle | square
```

---

## Title Position

By default the title sits inline in the card header. Set `title_position` to place it anywhere:

```yaml
title_position: bottom-left    # absolute bottom-left
title_position: center         # centered in the card
title_position: top-center     # absolute top, horizontally centered
```

Available values mirror `icon_position`: `top-left`, `top-right`, `top-center`, `bottom-left`, `bottom-right`, `bottom-center`, `center-left`, `center`, `center-right`, `custom`

Combined with position, you can also control alignment and size:

```yaml
title_position: bottom-left
title_align: left
title_font_size: 12
title_color: "rgba(255,255,255,0.8)"
```

---

## Sub-Button Layouts

### `bottom-row` (default)

All sub-buttons in a flex row pinned to the card bottom.

```yaml
sub_buttons_layout: bottom-row
```

### `top-row`

Same as `bottom-row` but pinned to the top, below any card content.

```yaml
sub_buttons_layout: top-row
```

### `left-column`

Sub-buttons stacked vertically, pinned to the left side.

```yaml
sub_buttons_layout: left-column
```

### `right-column`

Sub-buttons stacked vertically, pinned to the right side.

```yaml
sub_buttons_layout: right-column
```

### `corners`

Up to 4 buttons, one per corner. Extra buttons beyond 4 are hidden. Buttons are placed top-left → top-right → bottom-left → bottom-right.

```yaml
sub_buttons_layout: corners
sub_buttons:
  - entity: light.ceiling     # top-left
  - entity: switch.fan        # top-right
  - entity: media_player.tv   # bottom-left
  - entity: lock.door         # bottom-right
```

### `grid`

Auto-fill grid. Each button gets equal width; rows wrap automatically.

```yaml
sub_buttons_layout: grid
```

Control column sizing:

```yaml
sub_buttons_layout: grid
sub_buttons_grid_columns: 3          # fixed 3-column grid
# OR
sub_buttons_grid_min_width: 64      # auto-fill; each column at least 64px wide
```

Grid cells stack the icon above the label/state and expand to fill their column.

### `custom`

Each button specifies its own absolute position. Buttons without a `position` field are not rendered.

```yaml
sub_buttons_layout: custom
sub_buttons:
  - entity: light.ceiling
    position: top-right
  - entity: lock.door
    position: bottom-left
```

Valid `position` values: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`

---

## Global Action Override

When `global_action` is set, the entire card surface becomes a single tap target. Sub-buttons become decorative — they display entity state but cannot be tapped.

```yaml
global_action:
  tap_action:
    action: navigate
    navigation_path: /lovelace/living-room
  hold_action:
    action: more-info
    entity: light.living_room
```

> **Warning:** Sub-button `tap_action`, `hold_action`, and `double_tap_action` are completely ignored when `global_action` is set. Sub-buttons become `pointer-events: none` and show slightly dimmed.

To restore sub-button interactivity, remove the `global_action` key entirely.

---

## card-mod CSS Customization

All visual regions expose CSS custom properties and `::part()` selectors. See [css-classes.md](css-classes.md) for the complete reference.

### Setting the card background independently of HA theme

```yaml
card_mod:
  style: |
    ha-card {
      --ians-card-background-color: rgba(10, 20, 40, 0.9);
    }
```

### Frosted glass effect

```yaml
card_mod:
  style: |
    ha-card {
      --ians-card-background-color: rgba(255, 255, 255, 0.06);
      --ians-card-border-color: rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }
```

### Rounded icon with accent background

```yaml
card_mod:
  style: |
    ha-card {
      --ians-icon-background-color: rgba(255, 200, 50, 0.2);
      --ians-icon-background-border-radius: 10px;
      --ians-icon-color: rgb(255, 200, 50);
      --ians-icon-background-size: 48px;
    }
```

### Hide the card border entirely

```yaml
card_mod:
  style: |
    ha-card {
      --ians-card-border-opacity: 0;
    }
```

---

## Background Image

### Static URL

```yaml
background_image: "/local/rooms/living-room.jpg"
```

The image is placed above the background color layer at full opacity. The background color still shows through if the image is transparent or if `background_opacity` dims it.

### Area image from Home Assistant

```yaml
background_image: "area"
entity: light.living_room
```

When set to `"area"`, the card looks up the entity's assigned area and uses that area's picture from HA. If the entity has no area, or the area has no picture, no image is shown (no error).

Area pictures are configured in HA's Area Registry: **Settings → Areas & Zones → [Area] → Edit → Upload image**.

---

## Perform-Action (formerly call-service)

```yaml
tap_action:
  action: perform-action
  perform_action: light.turn_on
  target:
    entity_id: light.living_room
  data:
    brightness_pct: 80
    color_temp: 300
```

The legacy `call-service` action name is accepted as an alias. `service` and `service_data` field names are also normalized automatically for backwards compatibility.
