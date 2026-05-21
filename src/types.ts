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
  | "corners"
  | "columns"
  | "grid"
  | "custom";

export interface CardConfig {
  type: string;
  entity?: string;
  title?: string;
  icon?: string;
  icon_color?: string;
  icon_background_color?: string;
  badge_icon?: string;
  badge_color?: string;
  badge_background_color?: string;
  background_color?: string;
  background_opacity?: number;
  background_image?: string;
  border_color?: string;
  border_opacity?: number;
  grid_options?: GridOptions;
  sub_buttons_layout?: SubButtonsLayout;
  sub_buttons?: SubButtonConfig[];
  global_action?: GlobalAction;
}
