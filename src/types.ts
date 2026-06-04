// ── Home Assistant types (minimal interface for custom card use) ──────────────

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown> & {
    friendly_name?: string;
    icon?: string;
    unit_of_measurement?: string;
  };
  last_changed: string;
  last_updated: string;
}

export interface HassArea {
  area_id: string;
  name: string;
  picture?: string | null;
}

// Entity registry entry — available via hass.entities in HA 2022+
export interface HassEntityRegistryEntry {
  entity_id: string;
  area_id?: string | null;
  device_id?: string | null;
  name?: string | null;
  icon?: string | null;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  areas: Record<string, HassArea>;
  // Entity registry (may be undefined on older HA versions)
  entities?: Record<string, HassEntityRegistryEntry>;
  connection: {
    subscribeMessage<T>(
      callback: (msg: T) => void,
      subscribeMessage: Record<string, unknown>
    ): Promise<() => Promise<void>>;
  };
  user: {
    id: string;
    name: string;
    is_admin: boolean;
  };
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: {
      entity_id?: string | string[];
      area_id?: string | string[];
      device_id?: string | string[];
    }
  ): Promise<void>;
}

// ── Card config types ─────────────────────────────────────────────────────────

export type ActionType =
  | "navigate"
  | "more-info"
  | "toggle"
  | "perform-action"
  | "call-service"
  | "url"
  | "assist"
  | "none";

export interface ActionConfig {
  action: ActionType;
  // navigate
  navigation_path?: string;
  navigation_replace?: boolean;
  // perform-action (call-service is a legacy alias)
  perform_action?: string;
  service?: string;
  data?: Record<string, unknown>;
  service_data?: Record<string, unknown>;
  target?: {
    entity_id?: string | string[];
    area_id?: string | string[];
    device_id?: string | string[];
  };
  // url
  url_path?: string;
  // assist
  pipeline_id?: string;
  start_listening?: boolean;
  // more-info entity override
  entity?: string;
  // confirmation dialog
  confirmation?:
    | boolean
    | { text?: string; exemptions?: Array<{ user: string }> };
}

export type SubButtonPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface SubButtonConfig {
  entity?: string;
  icon?: string;
  label?: string;
  show_icon?: boolean;
  show_label?: boolean;
  show_state?: boolean;
  background?: boolean;
  icon_color?: string;
  icon_color_on?: string;   // icon color when entity is active (on/open/home/playing)
  icon_color_off?: string;  // icon color when entity is inactive
  state_based_color?: boolean; // auto-color icon by entity state
  background_color?: string;
  opacity?: number;
  position?: SubButtonPosition;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

export interface GridOptions {
  columns?: number;
  rows?: number;
  min_columns?: number;
  min_rows?: number;
  max_columns?: number;
  max_rows?: number;
}

export interface GlobalAction {
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

export type SubButtonsLayout =
  | "bottom-row"
  | "top-row"
  | "left-column"
  | "right-column"
  | "corners"
  | "grid"
  | "custom";

export type IconPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"
  | "center-left"
  | "center-right"
  | "custom";

export type BadgePosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "custom";

export type IconBackgroundShape = "circle" | "rounded-rect" | "squircle" | "square";

export type TitleAlign = "left" | "center" | "right";

export interface CardConfig {
  type: string;
  entity?: string;
  title?: string;
  // Icon
  icon?: string;
  icon_color?: string;
  icon_size?: number;            // MDI glyph size in px
  icon_background_color?: string;
  icon_background_size?: number; // icon container circle size in px
  // Icon position within card
  icon_position?: IconPosition;
  icon_position_x?: string;      // CSS value; used when icon_position: "custom"
  icon_position_y?: string;      // CSS value; used when icon_position: "custom"
  // Badge
  badge_icon?: string;
  badge_color?: string;
  badge_background_color?: string;
  badge_size?: number;           // badge circle size in px
  // Badge position relative to icon
  badge_position?: BadgePosition;
  badge_position_x?: string;     // CSS value; used when badge_position: "custom"
  badge_position_y?: string;     // CSS value; used when badge_position: "custom"
  // Card background & border
  background_color?: string;
  background_opacity?: number;
  background_image?: string;
  border_color?: string;
  border_opacity?: number;
  // Icon shape & dimensions
  icon_background_shape?: IconBackgroundShape;
  icon_background_border_radius?: string; // custom CSS value — overrides shape preset
  icon_background_width?: number;         // px; defaults to icon_background_size
  icon_background_height?: number;        // px; defaults to icon_background_size
  icon_opacity?: number;
  icon_background_opacity?: number;
  // State-based main icon color
  state_based_color?: boolean;
  icon_color_on?: string;
  icon_color_off?: string;
  // Badge
  badge_opacity?: number;
  // Title
  title_align?: TitleAlign;
  title_position?: IconPosition;
  title_position_x?: string;
  title_position_y?: string;
  title_font_size?: number;       // px
  title_color?: string;
  // Sub-button global styles
  sub_button_icon_color?: string;
  sub_button_background_color?: string;
  sub_button_opacity?: number;
  sub_button_gap?: number;              // px between buttons
  // Grid sub-button layout options
  sub_buttons_grid_columns?: number;    // fixed column count for grid layout
  sub_buttons_grid_min_width?: number;  // px min cell width for auto-fill grid
  // Layout
  grid_options?: GridOptions;
  sub_buttons_layout?: SubButtonsLayout;
  sub_buttons?: SubButtonConfig[];
  global_action?: GlobalAction;
}
