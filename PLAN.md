# ians-custom-room-card — Architecture Plan

## Context

Ian uses Bubble Card and Mushroom Cards on a Sections-based Frosted Glass dashboard. Neither is a purpose-built "room card" combining a room icon, title, entity-driven badge, configurable sub-buttons, and a navigable tap action in one card with a complete visual editor. This card fills that gap and is HACS-installable from this repo.

---

## 1. Architecture Decision

### Framework: LitElement + TypeScript

**Choice: LitElement** — used by HA itself, Mushroom, and all major production custom cards. Shadow DOM rendering built-in. Reactive `@property()` / `@state()` decorators handle `hass` updates without manual DOM calls. Vanilla Web Components become unwieldy with sub-button lists, editor elements, and template subscriptions.

### Build Toolchain: Vite + TypeScript

**Choice: Vite** — Mushroom (closest production reference) uses Vite with `es` format output, Terser minification, and `browserslist-to-esbuild` targets. Current (2026) community standard. Simpler than Rollup; Vite handles `.ts` natively. Single file output (`ians-custom-room-card.js`) satisfies HACS naming.

**Uncertain:** Rollup may have slightly better tree-shaking for LitElement. Vite is correct default at this stage.

---

## 2. Repo Structure

```
ha-ians-custom-room-card/
├── src/
│   ├── ians-custom-room-card.ts     # Card class, window.customCards registration, element define
│   ├── editor.ts                     # Config editor element (getConfigElement target)
│   ├── types.ts                      # CardConfig, SubButtonConfig, ActionConfig interfaces
│   ├── const.ts                      # Card type string, version, stub config defaults
│   └── utils/
│       ├── action-handler.ts         # hass-action event dispatch helper
│       ├── template-manager.ts       # subscribeRenderTemplate websocket wrapper
│       ├── loader.ts                 # HA custom element loading helpers
│       ├── area-image.ts             # Resolve "area" keyword to hass.areas picture URL
│       └── styles.ts                 # LitElement css`` tagged template, CSS custom property names
├── dist/
│   └── ians-custom-room-card.js      # Built output (committed for HACS, rebuilt on release)
├── docs/
│   ├── beginner-guide.md             # Step-by-step first card setup
│   ├── advanced-guide.md             # Templates, entity-driven styling, card-mod CSS
│   └── css-classes.md                # Complete CSS class/custom property reference
├── .github/
│   └── workflows/
│       └── release.yml               # On tag push: build → GitHub Release with dist asset
├── hacs.json                         # HACS manifest
├── info.md                           # HACS popup info
├── README.md                         # Install, basic config, full reference table
├── CHANGELOG.md                      # Versioned release notes
├── PLAN.md                           # This file
├── TASKS.md                          # Running checklist
├── package.json                      # npm scripts: dev, build, watch
├── tsconfig.json                     # TypeScript config
└── vite.config.ts                    # Single-file ES module build
```

---

## 3. Config Schema (Full YAML)

```yaml
type: custom:ians-custom-room-card

# ── Primary entity ────────────────────────────────────────────────────────────
entity: light.living_room           # optional; drives default more-info action and state display

# ── Title ─────────────────────────────────────────────────────────────────────
title: "Living Room"                # string, "entity" (uses friendly_name), or HA template

# ── Icon ──────────────────────────────────────────────────────────────────────
icon: mdi:sofa                      # MDI icon string or HA template
icon_color: "rgb(255, 200, 0)"      # CSS color or HA template
icon_background_color: "rgba(255,200,0,0.15)"  # CSS color or HA template

# ── Icon badge (small overlay on icon) ────────────────────────────────────────
badge_icon: mdi:alert               # MDI icon or HA template; omit to hide badge
badge_color: "var(--error-color)"   # CSS color or HA template
badge_background_color: "red"       # CSS color or HA template

# ── Card background ───────────────────────────────────────────────────────────
background_color: "rgba(30,30,50,1)"  # CSS color or HA template
background_opacity: 0.7               # float 0–1, applied as layer opacity
background_image: "/local/room.jpg"   # URL, "area" (use HA area image), or omit

# ── Card border ───────────────────────────────────────────────────────────────
border_color: "rgba(255,255,255,0.15)"
border_opacity: 1.0

# ── Grid sizing (native HA sections view) ─────────────────────────────────────
grid_options:
  columns: 6           # multiples of 3 recommended; max 12
  rows: 2
  min_columns: 3
  min_rows: 2
  max_columns: 12
  max_rows: 6

# ── Sub-buttons ───────────────────────────────────────────────────────────────
sub_buttons_layout: bottom-row
# Presets: corners | top-row | bottom-row | columns | grid | custom

sub_buttons:
  - entity: light.lamp
    icon: mdi:lamp                  # string or HA template
    label: "Lamp"                   # static string, "entity" (friendly_name), or HA template
    show_icon: true
    show_label: false
    show_state: true
    background: true
    position: bottom-left           # used only when sub_buttons_layout: custom
    # Position values: top-left | top-center | top-right
    #                  bottom-left | bottom-center | bottom-right
    tap_action:
      action: toggle
    hold_action:
      action: more-info
    double_tap_action:
      action: none

# ── Global action (overrides ALL sub-button actions) ──────────────────────────
# WARNING: When global_action is set, sub-buttons are display-only decorations.
# The entire card surface becomes a single tap target. Sub-button tap/hold/double-tap
# actions are completely disabled regardless of individual sub-button configuration.
global_action:
  tap_action:
    action: navigate
    navigation_path: /lovelace/living-room
  hold_action:
    action: more-info
  double_tap_action:
    action: none
```

### Action object schema

```yaml
action: navigate          # navigate | more-info | toggle | perform-action | url | assist | none
# navigate:
navigation_path: /lovelace/0
navigation_replace: false
# perform-action: (call-service accepted as alias for pre-2024 YAML)
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
# more-info:
entity: light.living_room  # optional override
```

---

## 4. UI Editor Design

Editor is a LitElement custom element returned by `getConfigElement()`. Loads HA UI primitives via `customElements.whenDefined()` + indirect `hui-tile-card.getConfigElement()` loader. Uses `ha-form` for schema sections; custom elements for color pickers and template inputs.

| Config Field | Editor Control | Notes |
|---|---|---|
| `entity` | `ha-entity-picker` | |
| `title` | `ha-textfield` + template toggle | Toggle reveals textarea labeled "Advanced: HA Template" |
| `icon` | `ha-icon-picker` + template toggle | |
| `icon_color` | `ha-colorpicker` | HA native color picker + hex input |
| `icon_background_color` | `ha-colorpicker` | |
| `badge_icon` | `ha-icon-picker` + template toggle | Expandable section |
| `badge_color` | `ha-colorpicker` | |
| `badge_background_color` | `ha-colorpicker` | |
| `background_color` | `ha-colorpicker` | |
| `background_opacity` | `ha-selector` (number, 0–1, step 0.05) | Slider |
| `background_image` | `ha-textfield` + mode dropdown | None / URL / Area Image |
| `border_color` | `ha-colorpicker` | |
| `border_opacity` | `ha-selector` (number, 0–1, step 0.05) | Slider |
| `grid_options.columns` | `ha-selector` (number, 1–12) | |
| `grid_options.rows` | `ha-selector` (number, 1–6) | |
| `sub_buttons_layout` | `ha-selector` (select) | |
| `sub_buttons` | Custom list editor | Add/remove/reorder; expand per-button |
| Sub-button `entity` | `ha-entity-picker` | |
| Sub-button `icon` | `ha-icon-picker` + template toggle | |
| Sub-button `label` | `ha-textfield` + template toggle | |
| Sub-button `show_icon/label/state` | `ha-selector` (boolean) | |
| Sub-button `background` | `ha-selector` (boolean) | |
| Sub-button `position` | `ha-selector` (select) | Only when `sub_buttons_layout: custom` |
| Sub-button actions | `ha-selector` (action type) | Per tap/hold/double-tap |
| `global_action.*` | `ha-selector` (action type) | Collapsible with override warning |

**Template fields:** A toggle chip switches any field from a picker widget to `<textarea>` labeled `Advanced: HA Template (Jinja2)`. Value stored as-is; `{{` or `{%` prefix triggers runtime template subscription.

---

## 5. CSS Class Inventory

card-mod users target via `ha-card $ .class` syntax (`$` = shadow root traversal).

### CSS Parts (`::part()`)

| Part | Element | Purpose |
|---|---|---|
| `card` | Root `ha-card` | Full card; background, border, radius |
| `background` | Background layer div | Color + image layer |
| `header` | Header row div | Icon + title row |
| `icon-container` | Icon wrapper div | Circle background, sizing |
| `icon` | `ha-icon` | MDI icon |
| `badge` | Badge overlay span | Corner badge on icon |
| `badge-icon` | `ha-icon` inside badge | |
| `title` | Title span | Room name |
| `sub-buttons` | Sub-buttons container | Layout wrapper |
| `sub-button` | Individual sub-button div | Pill, sizing |
| `sub-button-icon` | `ha-icon` in sub-button | |
| `sub-button-label` | Label span | |
| `sub-button-state` | State span | |

### CSS Custom Properties

| Property | Default | Applies To |
|---|---|---|
| `--ians-card-background-color` | `var(--card-background-color)` | Background layer |
| `--ians-card-background-opacity` | `1` | Background opacity |
| `--ians-card-border-color` | `var(--divider-color)` | Border |
| `--ians-card-border-opacity` | `1` | Border opacity |
| `--ians-card-border-radius` | `var(--ha-card-border-radius, 12px)` | Corners |
| `--ians-icon-color` | `var(--primary-text-color)` | Icon |
| `--ians-icon-background-color` | `transparent` | Icon circle |
| `--ians-icon-size` | `40px` | Icon diameter |
| `--ians-badge-color` | `var(--primary-text-color)` | Badge icon |
| `--ians-badge-background-color` | `var(--error-color)` | Badge background |
| `--ians-badge-size` | `16px` | Badge diameter |
| `--ians-title-color` | `var(--primary-text-color)` | Title text |
| `--ians-title-font-size` | `14px` | Title size |
| `--ians-sub-button-icon-color` | `var(--primary-text-color)` | Sub-button icon |
| `--ians-sub-button-background-color` | `rgba(255,255,255,0.1)` | Sub-button pill |
| `--ians-sub-button-size` | `32px` | Sub-button icon size |
| `--ians-sub-button-gap` | `6px` | Sub-button spacing |

card-mod example:
```yaml
card_mod:
  style: |
    ha-card {
      --ians-card-background-color: rgba(10,20,40,0.9);
      --ians-icon-color: #ffcc00;
    }
```

---

## 6. Sub-Button Data Model

```typescript
interface SubButtonConfig {
  entity?: string;
  icon?: string;               // MDI string or HA template
  label?: string;              // static, "entity" (friendly_name), or HA template
  show_icon?: boolean;         // default: true
  show_label?: boolean;        // default: false
  show_state?: boolean;        // default: false
  background?: boolean;        // default: true
  position?: SubButtonPosition; // only used when sub_buttons_layout: "custom"
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

type SubButtonPosition =
  | "top-left" | "top-center" | "top-right"
  | "bottom-left" | "bottom-center" | "bottom-right";
```

**Layout presets:**

| Preset | Behavior |
|---|---|
| `bottom-row` | Flex row at card bottom (default) |
| `top-row` | Flex row at card top |
| `corners` | Up to 4 buttons, one per corner |
| `columns` | Two-column grid |
| `grid` | Auto-fill grid |
| `custom` | Per-button `position` field for absolute placement |

When `global_action` is present: sub-buttons render without action listeners and get `pointer-events: none`.

---

## 7. Action System Design

Actions dispatch the standard HA `hass-action` custom event:

```typescript
const event = new Event("hass-action", { bubbles: true, composed: true });
(event as any).detail = {
  config: { entity, tap_action, hold_action, double_tap_action },
  action: "tap" | "hold" | "double_tap"
};
this.dispatchEvent(event);
```

Gesture detection in `action-handler.ts` via pointer events:
- **Tap:** pointerup within 250ms, no move
- **Hold:** pointerdown held 500ms without pointerup
- **Double-tap:** two taps within 350ms

**Global action override logic:**
```
if (config.global_action) {
  // Root ha-card gets action listeners
  // Sub-buttons: no listeners, pointer-events: none, CSS class "display-only"
} else {
  // Each sub-button has its own listeners
  // Root card gets no listeners (unless card has its own tap_action)
}
```

Override is one-way — sub-button actions are bypassed entirely, not merged.

---

## 8. Templating Approach

**API: Bundle `hass.connection.subscribeMessage` wrapper**

Custom cards cannot import from HA's internal `src/data/ws-templates`. `template-manager.ts` bundles a minimal implementation using the `render_template` websocket command directly:

```typescript
function subscribeTemplate(
  hass: HomeAssistant,
  template: string,
  variables: Record<string, unknown>,
  callback: (result: string | { error: string; level: string }) => void
): Promise<() => void>  // returns unsubscribe fn
```

**Template detection:** Value starts with `{{` or `{%` → create WebSocket subscription. Static strings → no subscription, used as-is.

**Why not `evaluateTemplate` (HTTP)?** One-shot; does not update when entities change.

**Lifecycle:**
- `connectedCallback` → `_subscribeTemplates()` — one subscription per template-valued field
- `disconnectedCallback` → `_unsubscribeTemplates()` — awaits all unsubscribes
- `setConfig()` or `hass` change → cancel + re-subscribe

**Template variables:** `config`, `user` (hass.user.name), `entity` (hass.states[config.entity])

---

## 9. HACS Packaging

### hacs.json

```json
{
  "name": "Ian's Custom Room Card",
  "filename": "ians-custom-room-card.js",
  "content_in_root": false,
  "homeassistant": "2024.1.0",
  "hacs": "1.6.0"
}
```

- `filename` matches `dist/ians-custom-room-card.js`
- HACS searches `dist/` first, then release assets, then repo root
- `dist/` file is committed (not gitignored) so HACS can install from default branch without a release

### Release Workflow

1. Update `CHANGELOG.md`, bump version in `package.json` + `const.ts`
2. `npm run build` → `dist/ians-custom-room-card.js`
3. `git commit -m "chore: bump version to vX.Y.Z"`, `git tag vX.Y.Z`
4. Push tag → GitHub Actions: `npm ci && npm run build` → create Release → attach `dist/ians-custom-room-card.js`

**Versioning:** Semantic versioning (`vMAJOR.MINOR.PATCH`). Breaking config changes → MAJOR.

---

## 10. Documentation Structure

**README.md:** Preview screenshot placeholder · Features · HACS install · Manual install · Basic 5-line config example · Full config reference table (all fields, types, defaults, template-capable column) · Sub-button reference · Action reference · Template quick-start · card-mod examples · Attribution (mushroom-cards, bubble-card) · "Built with Claude Code"

**docs/beginner-guide.md:** Step-by-step screenshots, first room card from zero.

**docs/advanced-guide.md:** Jinja2 primer, entity-driven styling examples, card-mod CSS, custom position layouts.

**docs/css-classes.md:** Full `::part()` table, full `--ians-*` table, card-mod targeting cheat sheet.

**CHANGELOG.md:** Keep a Changelog format, starts with `## [Unreleased]`.

---

## 11. Phase-by-Phase Build Order

### Phase 1 — Scaffold
`package.json`, `tsconfig.json`, `vite.config.ts`, stub card class, `const.ts`, `hacs.json`, `info.md`

**Done when:** `npm run build` produces `dist/ians-custom-room-card.js`; card appears in HA card picker; empty `ha-card` renders without console errors.

### Phase 2 — Core Static Appearance
`types.ts`, `styles.ts`, card `render()` with icon, badge, title, background, border, `getGridOptions()`, `getStubConfig()`

**Done when:** All visual fields render from static config; `--ians-*` properties overridable; `::part()` selectors reachable in DevTools; grid options respected.

### Phase 3 — Entity State Binding
`hass` setter, `area-image.ts`, `title: "entity"` resolution

**Done when:** Entity state changes re-render card; `title: "entity"` shows friendly name; `background_image: "area"` resolves; `getStubConfig(hass)` returns useful defaults.

### Phase 4 — Template Engine
`template-manager.ts`, template detection, error state

**Done when:** `{{ ... }}` strings in any configurable field resolve via HA WebSocket; templates update on entity changes; subscriptions cleaned up on disconnect; errors shown visibly.

### Phase 5 — Action System
`action-handler.ts`, pointer gesture detection, `hass-action` dispatch

**Done when:** Tap/hold/double-tap all dispatch correctly; all action types work; `call-service` alias works; mobile touch events handled.

### Phase 6 — Sub-Buttons
Sub-button render, all layout presets, per-button actions, per-button templates

**Done when:** All layout presets render; custom per-button positions work; each sub-button has working actions; sub-button templates update live.

### Phase 7 — Global Action Override
Global action logic, sub-button disable

**Done when:** `global_action` makes entire card a single tap target; sub-buttons non-interactive; removing `global_action` restores sub-button actions.

### Phase 8 — Background Image
Background image layer, area image resolution

**Done when:** URL image displays at correct opacity; `"area"` keyword pulls from `hass.areas`; graceful fallback when no area image set.

### Phase 9 — Visual Editor
`loader.ts`, `editor.ts`, all controls, template toggles, sub-button list editor

**Done when:** All config options settable without YAML; template toggles work; sub-button list is add/remove/reorder; `config-changed` fires correctly on every edit.

### Phase 10 — Polish, Docs, HACS Release
Docs, `CHANGELOG.md`, `release.yml`, v0.1.0

**Done when:** card-mod can override all visual elements; README has full reference table; GitHub Actions release workflow works; HACS manual install passes; v0.1.0 released.

---

## 12. Open Questions

1. **`hass.areas[id]?.picture` path** — Verify correct property path in HA 2026.x via dev console before Phase 8.
2. **`fire-dom-event` action** — Not in HA official docs but used by card-mod. Include? Decide during Phase 5.
3. **`ha-colorpicker` vs `ha-color-picker`** — Verify exact element name in HA DevTools before Phase 9.
4. **`hui-tile-card` loader stability** — Undocumented workaround; may break on HA updates. Monitor.
5. **Area image for entity without area** — Graceful fallback: no background image shown, no error.
6. **Double-tap on mobile** — Verify hold/double-tap gesture detection on iOS/Android. May need `touch-action: none`.
