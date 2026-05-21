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

| Property | Default | Description |
|---|---|---|
| `--ians-card-background-color` | `var(--card-background-color)` | Card background color layer |
| `--ians-card-background-opacity` | `1` | Opacity of the background color layer (0–1) |
| `--ians-card-border-color` | `var(--divider-color)` | Card border color |
| `--ians-card-border-opacity` | `1` | Opacity of the border (0–1) |
| `--ians-card-border-radius` | `var(--ha-card-border-radius, 12px)` | Card corner radius |
| `--ians-icon-color` | `var(--primary-text-color)` | Main icon color |
| `--ians-icon-background-color` | `transparent` | Icon circle background color |
| `--ians-icon-size` | `40px` | Icon circle diameter |
| `--ians-badge-color` | `var(--primary-text-color)` | Badge icon color |
| `--ians-badge-background-color` | `var(--error-color)` | Badge circle background color |
| `--ians-badge-size` | `16px` | Badge circle diameter |
| `--ians-title-color` | `var(--primary-text-color)` | Title text color |
| `--ians-title-font-size` | `14px` | Title font size |
| `--ians-sub-button-icon-color` | `var(--primary-text-color)` | Sub-button icon color |
| `--ians-sub-button-background-color` | `rgba(255,255,255,0.1)` | Sub-button pill background |
| `--ians-sub-button-size` | `32px` | Sub-button icon size |
| `--ians-sub-button-gap` | `6px` | Gap between sub-buttons |

---

## `::part()` Selectors

Each visual region is exposed as a CSS part on the `ha-card` element.

| Part | Element | Description |
|---|---|---|
| `card` | Root `ha-card` | Full card container |
| `background` | Background layer div | Color + image background region |
| `header` | Header row div | Contains icon container + title |
| `icon-container` | Icon wrapper div | The circular icon background |
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

| Class | Applied To | When |
|---|---|---|
| `has-template-error` | `ha-card` | A Jinja2 template failed to evaluate |
| `interactive` | `ha-card` | `global_action` is configured |
| `layout-bottom-row` | `.sub-buttons` | `sub_buttons_layout: bottom-row` |
| `layout-top-row` | `.sub-buttons` | `sub_buttons_layout: top-row` |
| `layout-corners` | `.sub-buttons` | `sub_buttons_layout: corners` |
| `layout-columns` | `.sub-buttons` | `sub_buttons_layout: columns` |
| `layout-grid` | `.sub-buttons` | `sub_buttons_layout: grid` |
| `layout-custom` | `.sub-buttons` | `sub_buttons_layout: custom` |
| `display-only` | `.sub-button` | `global_action` is set (sub-buttons non-interactive) |
| `pos-top-left` | `.sub-button` | `position: top-left` in custom layout |
| `pos-top-center` | `.sub-button` | `position: top-center` in custom layout |
| `pos-top-right` | `.sub-button` | `position: top-right` in custom layout |
| `pos-bottom-left` | `.sub-button` | `position: bottom-left` in custom layout |
| `pos-bottom-center` | `.sub-button` | `position: bottom-center` in custom layout |
| `pos-bottom-right` | `.sub-button` | `position: bottom-right` in custom layout |

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

### Custom icon size and shape

```yaml
card_mod:
  style: |
    ha-card {
      --ians-icon-size: 56px;
      --ians-icon-background-color: rgba(255, 200, 50, 0.2);
    }
    ha-card::part(icon-container) {
      border-radius: 8px;
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
