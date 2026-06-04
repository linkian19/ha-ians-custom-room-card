# CSS Customization Reference

This card exposes every visual region via `::part()` selectors and `--ians-*` CSS custom properties. Use [card-mod](https://github.com/thomasloven/lovelace-card-mod) to target them.

---

## Targeting Shadow DOM with card-mod

```yaml
card_mod:
  style: |
    ha-card {
      --ians-icon-color: gold;
    }
```

For `::part()` selectors, target the shadow root of `ha-card`:

```yaml
card_mod:
  style: |
    ha-card::part(icon-container) {
      border-radius: 8px;
    }
```

---

## CSS Custom Properties

All properties are declared on `:host` inside the card's shadow DOM. Set them on the outer `ha-card` element to override.

### Card background & border

| Property | Default | Description |
|---|---|---|
| `--ians-card-background-color` | `var(--card-background-color)` | Card background color layer |
| `--ians-card-background-opacity` | `1` | Opacity of the background color layer (0–1) |
| `--ians-card-border-color` | `var(--divider-color)` | Card border color |
| `--ians-card-border-opacity` | `1` | Opacity of the border (0–1) |
| `--ians-card-border-radius` | `var(--ha-card-border-radius, 12px)` | Card corner radius |

### Icon

| Property | Default | Description |
|---|---|---|
| `--ians-icon-color` | `var(--primary-text-color)` | Main icon color |
| `--ians-icon-size` | `calc(--ians-icon-background-size * 0.6)` | MDI glyph size (defaults to 60% of container) |
| `--ians-icon-opacity` | `1` | Opacity of icon glyph (0–1) |
| `--ians-icon-background-color` | `transparent` | Icon container background color |
| `--ians-icon-background-opacity` | `1` | Opacity of icon container background (0–1) |
| `--ians-icon-background-size` | `40px` | Base size for icon container (controls both width and height) |
| `--ians-icon-background-width` | `var(--ians-icon-background-size)` | Width of icon container |
| `--ians-icon-background-height` | `var(--ians-icon-background-size)` | Height of icon container |
| `--ians-icon-background-border-radius` | `50%` | Border radius of icon container |

### Badge

| Property | Default | Description |
|---|---|---|
| `--ians-badge-color` | `#fff` | Badge icon color |
| `--ians-badge-background-color` | `var(--error-color, #db4437)` | Badge circle background color |
| `--ians-badge-size` | `18px` | Badge circle diameter |
| `--ians-badge-opacity` | `1` | Opacity of badge (0–1) |

### Title

| Property | Default | Description |
|---|---|---|
| `--ians-title-color` | `var(--primary-text-color)` | Title text color |
| `--ians-title-font-size` | `14px` | Title font size |
| `--ians-title-align` | `left` | Title text alignment (`left`, `center`, `right`) |

### Sub-buttons

| Property | Default | Description |
|---|---|---|
| `--ians-sub-button-icon-color` | `var(--primary-text-color)` | Sub-button icon and text color |
| `--ians-sub-button-background-color` | `rgba(255,255,255,0.1)` | Sub-button pill background |
| `--ians-sub-button-size` | `32px` | Sub-button minimum height |
| `--ians-sub-button-gap` | `6px` | Gap between sub-buttons |
| `--ians-sub-button-opacity` | `1` | Opacity of all sub-buttons (0–1) |

---

## `::part()` Selectors

Each visual region is exposed as a CSS part on the `ha-card` element.

| Part | Element | Description |
|---|---|---|
| `card` | Root `ha-card` | Full card container |
| `background` | Background layer div | Color + image background region |
| `header` | Header row div | Contains icon container + title |
| `icon-container` | Icon wrapper div | The icon background shape |
| `icon` | `ha-icon` | The MDI icon |
| `badge` | Badge overlay span | Small corner badge on the icon |
| `badge-icon` | `ha-icon` inside badge | The badge MDI icon |
| `title` | Title span | Room name text |
| `sub-buttons` | Sub-buttons container | Layout wrapper for all sub-buttons |
| `sub-button` | Individual sub-button div | One sub-button pill |
| `sub-button-icon` | `ha-icon` in sub-button | Sub-button icon |
| `sub-button-label` | Label span | Sub-button label text |
| `sub-button-state` | State span | Sub-button entity state text |

---

## CSS Classes

These classes appear on elements inside the shadow DOM. They are set programmatically by the card based on config.

### Card state

| Class | Applied To | When |
|---|---|---|
| `has-template-error` | `ha-card` | A Jinja2 template failed to evaluate |
| `interactive` | `ha-card` | `global_action` is configured |

### Sub-button layouts

| Class | Applied To | When |
|---|---|---|
| `layout-bottom-row` | `.sub-buttons` | `sub_buttons_layout: bottom-row` |
| `layout-top-row` | `.sub-buttons` | `sub_buttons_layout: top-row` |
| `layout-left-column` | `.sub-buttons` | `sub_buttons_layout: left-column` |
| `layout-right-column` | `.sub-buttons` | `sub_buttons_layout: right-column` |
| `layout-corners` | `.sub-buttons` | `sub_buttons_layout: corners` |
| `layout-grid` | `.sub-buttons` | `sub_buttons_layout: grid` |
| `layout-custom` | `.sub-buttons` | `sub_buttons_layout: custom` |

### Sub-button state

| Class | Applied To | When |
|---|---|---|
| `has-background` | `.sub-button` | `background: true` (default) |
| `display-only` | `.sub-button` | `global_action` is set (sub-button is non-interactive) |

### Sub-button custom positions

| Class | Applied To | When |
|---|---|---|
| `pos-top-left` | `.sub-button` | `position: top-left` in custom layout |
| `pos-top-center` | `.sub-button` | `position: top-center` in custom layout |
| `pos-top-right` | `.sub-button` | `position: top-right` in custom layout |
| `pos-bottom-left` | `.sub-button` | `position: bottom-left` in custom layout |
| `pos-bottom-center` | `.sub-button` | `position: bottom-center` in custom layout |
| `pos-bottom-right` | `.sub-button` | `position: bottom-right` in custom layout |

### Icon absolute positions

These classes are added to `.icon-container` when `icon_position` is set to anything other than the default inline placement.

| Class | When |
|---|---|
| `icon-absolute` | Any named or custom `icon_position` |
| `icon-pos-top-left` | `icon_position: top-left` |
| `icon-pos-top-right` | `icon_position: top-right` |
| `icon-pos-bottom-left` | `icon_position: bottom-left` |
| `icon-pos-bottom-right` | `icon_position: bottom-right` |
| `icon-pos-center` | `icon_position: center` |
| `icon-pos-center-left` | `icon_position: center-left` |
| `icon-pos-center-right` | `icon_position: center-right` |

### Badge positions

| Class | Applied To | When |
|---|---|---|
| `badge-pos-top-left` | `.badge` | `badge_position: top-left` |
| `badge-pos-top-right` | `.badge` | `badge_position: top-right` (default) |
| `badge-pos-bottom-left` | `.badge` | `badge_position: bottom-left` |
| `badge-pos-bottom-right` | `.badge` | `badge_position: bottom-right` |

### Title absolute positions

These classes are added to `.card-title-absolute` when `title_position` is set.

| Class | When |
|---|---|
| `card-title-abs-top-left` | `title_position: top-left` |
| `card-title-abs-top-right` | `title_position: top-right` |
| `card-title-abs-top-center` | `title_position: top-center` |
| `card-title-abs-center-left` | `title_position: center-left` |
| `card-title-abs-center` | `title_position: center` |
| `card-title-abs-center-right` | `title_position: center-right` |
| `card-title-abs-bottom-left` | `title_position: bottom-left` |
| `card-title-abs-bottom-right` | `title_position: bottom-right` |
| `card-title-abs-bottom-center` | `title_position: bottom-center` |

---

## Examples

### Frosted glass card

```yaml
card_mod:
  style: |
    ha-card {
      --ians-card-background-color: rgba(255, 255, 255, 0.08);
      --ians-card-background-opacity: 1;
      --ians-card-border-color: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
```

### Custom icon shape and size

```yaml
card_mod:
  style: |
    ha-card {
      --ians-icon-background-size: 56px;
      --ians-icon-background-color: rgba(255, 200, 50, 0.2);
      --ians-icon-background-border-radius: 12px;
      --ians-icon-color: rgb(255, 200, 50);
    }
```

### Rectangular icon container

```yaml
card_mod:
  style: |
    ha-card {
      --ians-icon-background-width: 60px;
      --ians-icon-background-height: 40px;
      --ians-icon-background-border-radius: 8px;
    }
```

### Larger title

```yaml
card_mod:
  style: |
    ha-card {
      --ians-title-font-size: 18px;
      --ians-title-color: var(--accent-color);
    }
```

### Compact sub-buttons

```yaml
card_mod:
  style: |
    ha-card {
      --ians-sub-button-size: 24px;
      --ians-sub-button-gap: 4px;
      --ians-sub-button-background-color: transparent;
    }
```

### Hide border

```yaml
card_mod:
  style: |
    ha-card {
      --ians-card-border-opacity: 0;
    }
```

### Dim sub-buttons globally

```yaml
card_mod:
  style: |
    ha-card {
      --ians-sub-button-opacity: 0.6;
    }
```
