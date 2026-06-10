# Ian's Custom Room Card

A highly customizable room card for Home Assistant dashboards.

**Features:**
- Room icon with configurable shape, size, position, and optional entity-driven badge
- Icon animations — spin, pulse, blink, bounce, shake; state-aware triggering
- State-based icon coloring — auto-color by entity state (on/off/open/playing)
- Configurable background color, opacity, and image (URL or HA area image)
- Sub-buttons with 7 layout presets (bottom-row, top-row, columns, grid, corners, custom)
- **Sub-button groups** — up to 4 independent button groups, each with its own layout, position, and style
- Grid cell layout — vertical (icon above label) or horizontal (icon beside label, pill shape)
- Entity state display with unit of measurement on sub-buttons
- Per-button animations and state-based coloring
- Global tap action that turns the entire card into a navigation target
- Jinja2 template support for icon, colors, badge, title, and icon background
- Full visual editor — no YAML required for basic use; drag-and-drop sub-button reordering
- card-mod compatible (CSS custom properties + `::part()` selectors)

See [README](https://github.com/linkian19/ha-ians-custom-room-card) for full documentation.
