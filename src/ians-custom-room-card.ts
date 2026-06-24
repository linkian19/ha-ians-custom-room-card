import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, HassEntity, CardConfig, GridOptions, IconPosition, BadgePosition, IconBackgroundShape, CardShape, SubButtonGroup, SubButtonsLayout, SubButtonConfig } from "./types";
import { CARD_TYPE, CARD_NAME, CARD_DESCRIPTION } from "./const";
import { cardStyles } from "./utils/styles";
import { resolveAreaImage } from "./utils/area-image";
import { subscribeTemplate, isTemplate } from "./utils/template-manager";
import { attachActionHandler, dispatchAction } from "./utils/action-handler";
import type { ActionHandlerConfig } from "./utils/action-handler";
import "./editor";

// Fields whose values can be HA templates (card-level)
const TEMPLATE_FIELDS = [
  "icon",
  "icon_color",
  "icon_background_color",
  "badge_icon",
  "badge_color",
  "badge_background_color",
  "background_color",
  "border_color",
  "title",
] as const;

type TemplateField = (typeof TEMPLATE_FIELDS)[number];

// Entity states considered "active" for state-based coloring
const ACTIVE_STATES = new Set(["on", "open", "home", "playing", "unlocked", "connected"]);

// Default icon color when entity is in an active state, keyed by domain
const DOMAIN_ACTIVE_COLORS: Record<string, string> = {
  light:               "var(--state-light-active-color, #FDD835)",
  switch:              "var(--state-switch-active-color, #FDD835)",
  fan:                 "var(--state-fan-active-color, #26A69A)",
  media_player:        "var(--state-media_player-active-color, #FDD835)",
  cover:               "var(--state-cover-active-color, #FDD835)",
  lock:                "var(--success-color, #4CAF50)",
  binary_sensor:       "var(--state-binary_sensor-active-color, #FDD835)",
  alarm_control_panel: "var(--error-color, #db4437)",
};

// Default icon per entity domain, used when no icon is configured or found in entity attributes
const DOMAIN_ICONS: Record<string, string> = {
  light: "mdi:lightbulb",
  switch: "mdi:toggle-switch",
  sensor: "mdi:eye",
  binary_sensor: "mdi:radiobox-marked",
  climate: "mdi:thermostat",
  cover: "mdi:garage",
  fan: "mdi:fan",
  media_player: "mdi:cast",
  lock: "mdi:lock",
  vacuum: "mdi:robot-vacuum",
  camera: "mdi:camera",
  person: "mdi:account",
  device_tracker: "mdi:map-marker",
  weather: "mdi:weather-partly-cloudy",
  script: "mdi:script-text",
  automation: "mdi:robot",
  scene: "mdi:palette",
  input_boolean: "mdi:toggle-switch-outline",
  input_number: "mdi:numeric",
  input_select: "mdi:form-select",
  number: "mdi:numeric",
  select: "mdi:form-select",
  button: "mdi:gesture-tap-button",
  water_heater: "mdi:water-boiler",
  alarm_control_panel: "mdi:shield-home",
};

const COLUMN_JUSTIFY_MAP: Record<string, string> = {
  top: "flex-start", center: "center", bottom: "flex-end",
  "space-between": "space-between", "space-around": "space-around",
};

const SHAPE_BORDER_RADIUS: Record<IconBackgroundShape, string> = {
  circle: "50%",
  "rounded-rect": "8px",
  squircle: "30%",
  square: "0",
};

const CARD_SHAPE_BORDER_RADIUS: Record<CardShape, string> = {
  square:       "0",
  "rounded-sm": "8px",
  rounded:      "12px",
  "rounded-lg": "24px",
  pill:         "999px",
};

// Animation durations by type and speed
const ANIM_DURATIONS: Record<string, Record<string, string>> = {
  spin:   { slow: "4s",   normal: "2s",   fast: "0.8s"  },
  pulse:  { slow: "3s",   normal: "1.5s", fast: "0.6s"  },
  blink:  { slow: "2.4s", normal: "1.2s", fast: "0.5s"  },
  bounce: { slow: "1.6s", normal: "0.8s", fast: "0.35s" },
  shake:  { slow: "1.2s", normal: "0.6s", fast: "0.25s" },
};

// Corner positions for the "corners" layout preset (up to 4 buttons)
const CORNER_POSITIONS = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;

@customElement(CARD_TYPE)
export class IansCustomRoomCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: CardConfig;
  @state() private _templateResults: Partial<Record<TemplateField, string>> = {};
  @state() private _templateErrors: Partial<Record<TemplateField, string>> = {};

  private _templateUnsubs = new Map<TemplateField, () => Promise<void>>();
  private _cardActionCleanup?: () => void;

  // Sub-button template subscriptions — keyed as "sub_{index}_{field}"
  @state() private _subTemplateResults: Record<string, string> = {};
  private _subTemplateUnsubs = new Map<string, () => Promise<void>>();
  private _subButtonCleanups: Array<() => void> = [];

  // ── Static card metadata ───────────────────────────────────────────────────

  static getStubConfig(hass?: HomeAssistant): CardConfig {
    if (hass) {
      const lightKey = Object.keys(hass.states).find((e) =>
        e.startsWith("light.")
      );
      if (lightKey) {
        return {
          type: `custom:${CARD_TYPE}`,
          entity: lightKey,
          title:
            (hass.states[lightKey]?.attributes.friendly_name as string) ??
            "Room",
          icon: "mdi:lightbulb",
        };
      }
    }
    return { type: `custom:${CARD_TYPE}`, title: "Room", icon: "mdi:home" };
  }

  static getGridOptions(config?: CardConfig) {
    const g: GridOptions = config?.grid_options ?? {};
    return {
      columns: g.columns ?? 6,
      rows: g.rows ?? 2,
      min_columns: g.min_columns ?? 3,
      min_rows: g.min_rows ?? 1,
      ...(g.max_columns !== undefined && { max_columns: g.max_columns }),
      ...(g.max_rows !== undefined && { max_rows: g.max_rows }),
    };
  }

  // HA calls getGridOptions() on the element instance (not as static) to drive
  // the resize UI. Delegate to the static implementation.
  getGridOptions() {
    return IansCustomRoomCard.getGridOptions(this._config);
  }

  static getConfigElement(): HTMLElement {
    return document.createElement(`${CARD_TYPE}-editor`);
  }

  // ── Config ─────────────────────────────────────────────────────────────────

  public setConfig(config: CardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    this._config = config;
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  connectedCallback(): void {
    super.connectedCallback();
    if (this._config && this.hass) {
      this._subscribeTemplates();
      this._subscribeSubButtonTemplates();
    }
    if (this._config) {
      this._setupCardActionHandler();
      this._setupSubButtonHandlers();
    }
  }

  protected firstUpdated(): void {
    this._setupCardActionHandler();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsubscribeTemplates();
    this._unsubscribeSubButtonTemplates();
    this._cardActionCleanup?.();
    this._cardActionCleanup = undefined;
    this._cleanupSubButtonHandlers();
  }

  protected updated(changedProps: Map<string, unknown>): void {
    super.updated(changedProps);

    const configChanged = changedProps.has("_config");
    const templateResultsChanged = changedProps.has("_templateResults");
    const hassChanged = changedProps.has("hass");

    if (configChanged) {
      this._subscribeTemplates();
      this._subscribeSubButtonTemplates();
      this._setupCardActionHandler();
    }

    // Re-apply styles on hass change so state-based colors update live
    if (configChanged || templateResultsChanged || changedProps.has("_subTemplateResults") || hassChanged) {
      this._applyConfigStyles();
    }

    if (configChanged) {
      this._setupSubButtonHandlers();
    }
  }

  // ── Template subscriptions ─────────────────────────────────────────────────

  private async _subscribeTemplates(): Promise<void> {
    await this._unsubscribeTemplates();

    const c = this._config;
    if (!c || !this.hass) return;

    const variables: Record<string, unknown> = {
      config: c,
      user: this.hass.user?.name ?? "",
      entity: c.entity ? this.hass.states[c.entity] : undefined,
    };

    const templateErrors: Partial<Record<TemplateField, string>> = {};

    for (const field of TEMPLATE_FIELDS) {
      const value = c[field as keyof CardConfig] as string | undefined;
      if (!value || !isTemplate(value)) continue;

      try {
        const unsub = await subscribeTemplate(
          this.hass,
          value,
          variables,
          (result) => {
            this._templateResults = { ...this._templateResults, [field]: result };
            // Clear any prior error for this field
            const errs = { ...this._templateErrors };
            delete errs[field as TemplateField];
            this._templateErrors = errs;
          },
          (error) => {
            console.warn(`[ians-room-card] Template error in ${field}:`, error);
            this._templateErrors = { ...this._templateErrors, [field]: error };
          }
        );
        this._templateUnsubs.set(field, unsub);
      } catch (e) {
        console.error(`[ians-room-card] Failed to subscribe template for ${field}:`, e);
        templateErrors[field] = String(e);
      }
    }

    if (Object.keys(templateErrors).length > 0) {
      this._templateErrors = { ...this._templateErrors, ...templateErrors };
    }
  }

  private async _unsubscribeTemplates(): Promise<void> {
    for (const unsub of this._templateUnsubs.values()) {
      try {
        await unsub();
      } catch {
        // ignore cleanup errors
      }
    }
    this._templateUnsubs.clear();
    this._templateResults = {};
    this._templateErrors = {};
  }

  private async _subscribeSubButtonTemplates(): Promise<void> {
    await this._unsubscribeSubButtonTemplates();

    const c = this._config;
    if (!this.hass) return;

    const variables: Record<string, unknown> = {
      config: c,
      user: this.hass.user?.name ?? "",
    };

    if (c?.sub_button_groups?.length) {
      // Multi-group mode: keys are "g{g}_sub_{i}_{field}"
      for (const [g, group] of c.sub_button_groups.slice(0, 4).entries()) {
        for (const [i, btn] of (group.buttons ?? []).entries()) {
          const btnVars = { ...variables, entity: btn.entity ? this.hass.states[btn.entity] : undefined };
          for (const field of ["icon", "label"] as const) {
            const value = btn[field];
            if (!value || !isTemplate(value)) continue;
            const key = `g${g}_sub_${i}_${field}`;
            try {
              const unsub = await subscribeTemplate(this.hass, value, btnVars,
                (result) => { this._subTemplateResults = { ...this._subTemplateResults, [key]: result }; }
              );
              this._subTemplateUnsubs.set(key, unsub);
            } catch (e) {
              console.warn(`[ians-room-card] Group button template error (${key}):`, e);
            }
          }
        }
      }
    } else if (c?.sub_buttons) {
      // Single-group mode
      for (const [i, btn] of c.sub_buttons.entries()) {
        const btnVars = { ...variables, entity: btn.entity ? this.hass.states[btn.entity] : undefined };
        for (const field of ["icon", "label"] as const) {
          const value = btn[field];
          if (!value || !isTemplate(value)) continue;
          const key = `sub_${i}_${field}`;
          try {
            const unsub = await subscribeTemplate(this.hass, value, btnVars,
              (result) => { this._subTemplateResults = { ...this._subTemplateResults, [key]: result }; }
            );
            this._subTemplateUnsubs.set(key, unsub);
          } catch (e) {
            console.warn(`[ians-room-card] Sub-button template error (${key}):`, e);
          }
        }
      }
    }
  }

  private async _unsubscribeSubButtonTemplates(): Promise<void> {
    for (const unsub of this._subTemplateUnsubs.values()) {
      try {
        await unsub();
      } catch {
        // ignore
      }
    }
    this._subTemplateUnsubs.clear();
    this._subTemplateResults = {};
  }

  // ── CSS variable application ───────────────────────────────────────────────

  private _applyConfigStyles(): void {
    const c = this._config;
    if (!c) return;

    const resolve = (field: TemplateField, configValue: string | undefined) =>
      this._templateResults[field] ?? configValue;

    this._setCSSVar("--ians-card-margin", c.card_margin !== undefined ? `${c.card_margin}px` : undefined);
    this._setCSSVar("--ians-card-background-color", resolve("background_color", c.background_color));
    this._setCSSVar("--ians-card-background-opacity", c.background_opacity !== undefined ? String(c.background_opacity) : undefined);
    this._setCSSVar("--ians-card-border-color", resolve("border_color", c.border_color));
    this._setCSSVar("--ians-card-border-opacity", c.border_opacity !== undefined ? String(c.border_opacity) : undefined);

    const cardBorderRadius = c.card_border_radius
      || (c.card_shape ? CARD_SHAPE_BORDER_RADIUS[c.card_shape] : undefined);
    this._setCSSVar("--ians-card-border-radius", cardBorderRadius);
    this._setCSSVar("--ha-card-border-radius", cardBorderRadius);

    // State-based icon color: resolves dynamically from entity state when enabled
    let iconColor = resolve("icon_color", c.icon_color);
    if (c.state_based_color && c.entity && this.hass) {
      const es = this.hass.states[c.entity];
      const domain = c.entity.split(".")[0];
      if (es) {
        const isActive = ACTIVE_STATES.has(es.state);
        iconColor = isActive
          ? (c.icon_color_on ?? DOMAIN_ACTIVE_COLORS[domain] ?? iconColor)
          : (c.icon_color_off ?? iconColor);
      }
    }
    this._setCSSVar("--ians-icon-color", iconColor);
    this._setCSSVar("--ians-icon-opacity", c.icon_opacity !== undefined ? String(c.icon_opacity) : undefined);
    this._setCSSVar("--ians-icon-background-color", resolve("icon_background_color", c.icon_background_color));
    this._setCSSVar("--ians-icon-background-opacity", c.icon_background_opacity !== undefined ? String(c.icon_background_opacity) : undefined);
    this._setCSSVar("--ians-icon-background-size", c.icon_background_size !== undefined ? `${c.icon_background_size}px` : undefined);
    this._setCSSVar("--ians-icon-background-width", c.icon_background_width !== undefined ? `${c.icon_background_width}px` : undefined);
    this._setCSSVar("--ians-icon-background-height", c.icon_background_height !== undefined ? `${c.icon_background_height}px` : undefined);
    // Custom border-radius overrides shape preset
    const borderRadius = c.icon_background_border_radius
      || (c.icon_background_shape ? SHAPE_BORDER_RADIUS[c.icon_background_shape] : undefined);
    this._setCSSVar("--ians-icon-background-border-radius", borderRadius);
    this._setCSSVar("--ians-icon-size", c.icon_size !== undefined ? `${c.icon_size}px` : undefined);

    this._setCSSVar("--ians-badge-color", resolve("badge_color", c.badge_color));
    this._setCSSVar("--ians-badge-background-color", resolve("badge_background_color", c.badge_background_color));
    this._setCSSVar("--ians-badge-size", c.badge_size !== undefined ? `${c.badge_size}px` : undefined);
    this._setCSSVar("--ians-badge-opacity", c.badge_opacity !== undefined ? String(c.badge_opacity) : undefined);

    this._setCSSVar("--ians-title-color", c.title_color);
    this._setCSSVar("--ians-title-font-size", c.title_font_size !== undefined ? `${c.title_font_size}px` : undefined);
    this._setCSSVar("--ians-title-font-weight", c.title_font_weight !== undefined ? String(c.title_font_weight) : undefined);
    this._setCSSVar("--ians-title-align", c.title_align);

    this._setCSSVar("--ians-sub-button-icon-color", c.sub_button_icon_color);
    this._setCSSVar("--ians-sub-button-background-color", c.sub_button_background_color);
    this._setCSSVar("--ians-sub-button-opacity", c.sub_button_opacity !== undefined ? String(c.sub_button_opacity) : undefined);
    this._setCSSVar("--ians-sub-button-gap", c.sub_button_gap !== undefined ? `${c.sub_button_gap}px` : undefined);
    this._setCSSVar("--ians-sub-button-state-font-size", c.sub_button_state_font_size !== undefined ? `${c.sub_button_state_font_size}px` : undefined);
    this._setCSSVar("--ians-sub-button-state-font-weight", c.sub_button_state_font_weight !== undefined ? String(c.sub_button_state_font_weight) : undefined);
    this._setCSSVar("--ians-sub-button-text-max-width", c.sub_button_text_max_width !== undefined ? `${c.sub_button_text_max_width}px` : undefined);

    // Grid/column vars — single-group mode only; multi-group sets these per-group via inline style
    if (!c.sub_button_groups?.length) {
      if (c.sub_buttons_layout === "grid") {
        if (c.sub_buttons_grid_columns) {
          this._setCSSVar("--ians-sub-buttons-grid-template-columns", `repeat(${c.sub_buttons_grid_columns}, 1fr)`);
        } else if (c.sub_buttons_grid_min_width) {
          this._setCSSVar("--ians-sub-buttons-grid-template-columns", `repeat(auto-fill, minmax(${c.sub_buttons_grid_min_width}px, 1fr))`);
        } else {
          this.style.removeProperty("--ians-sub-buttons-grid-template-columns");
        }
      } else {
        this.style.removeProperty("--ians-sub-buttons-grid-template-columns");
      }

      if (c.sub_buttons_layout === "left-column" || c.sub_buttons_layout === "right-column") {
        const justify = c.sub_buttons_column_justify ? COLUMN_JUSTIFY_MAP[c.sub_buttons_column_justify] : undefined;
        this._setCSSVar("--ians-sub-buttons-column-justify", justify);
      } else {
        this.style.removeProperty("--ians-sub-buttons-column-justify");
      }
    } else {
      this.style.removeProperty("--ians-sub-buttons-grid-template-columns");
      this.style.removeProperty("--ians-sub-buttons-column-justify");
    }
  }

  // ── Action handlers ────────────────────────────────────────────────────────

  private _setupSubButtonHandlers(): void {
    this._cleanupSubButtonHandlers();

    const c = this._config;
    if (!c || c.global_action) return;

    const isGroupMode = !!(c.sub_button_groups?.length);
    if (!isGroupMode && !c.sub_buttons?.length) return;

    const subBtnEls = this.shadowRoot?.querySelectorAll<HTMLElement>(".sub-button");
    if (!subBtnEls) return;

    subBtnEls.forEach((el, flatIndex) => {
      let btn;
      if (isGroupMode) {
        const g = parseInt(el.dataset.group ?? "0");
        const i = parseInt(el.dataset.index ?? "0");
        btn = c.sub_button_groups?.[g]?.buttons?.[i];
      } else {
        btn = c.sub_buttons?.[flatIndex];
      }
      if (!btn) return;

      const actionConfig: ActionHandlerConfig = {
        entity: btn.entity,
        tap_action: btn.tap_action ?? { action: "more-info" },
        hold_action: btn.hold_action ?? { action: "more-info" },
        double_tap_action: btn.double_tap_action ?? { action: "none" },
      };

      const cleanup = attachActionHandler(el, actionConfig, (action) =>
        dispatchAction(el, actionConfig, action)
      );
      this._subButtonCleanups.push(cleanup);
    });
  }

  private _cleanupSubButtonHandlers(): void {
    for (const cleanup of this._subButtonCleanups) cleanup();
    this._subButtonCleanups = [];
  }

  private _setupCardActionHandler(): void {
    this._cardActionCleanup?.();
    this._cardActionCleanup = undefined;

    const c = this._config;
    if (!c?.global_action) return;

    const haCard = this.shadowRoot?.querySelector("ha-card") as HTMLElement | null;
    if (!haCard) return;

    const actionConfig: ActionHandlerConfig = {
      entity: c.entity,
      tap_action: c.global_action.tap_action,
      hold_action: c.global_action.hold_action,
      double_tap_action: c.global_action.double_tap_action,
    };

    this._cardActionCleanup = attachActionHandler(
      haCard,
      actionConfig,
      (action) => dispatchAction(haCard, actionConfig, action)
    );
  }

  private _getAnimClass(
    animation: string | undefined,
    when: string | undefined,
    entityState: HassEntity | undefined
  ): string {
    if (!animation || animation === "none") return "";
    const whenMode = when ?? "always";
    if (whenMode !== "always" && entityState) {
      const isActive = ACTIVE_STATES.has(entityState.state);
      if (whenMode === "active" && !isActive) return "";
      if (whenMode === "inactive" && isActive) return "";
    }
    return `anim-${animation}`;
  }

  private _getAnimDur(animation: string | undefined, speed: string | undefined): string | undefined {
    if (!animation || animation === "none") return undefined;
    return ANIM_DURATIONS[animation]?.[speed ?? "normal"] ?? "2s";
  }

  private _setCSSVar(prop: string, value: string | undefined): void {
    if (value !== undefined && value !== "") {
      this.style.setProperty(prop, value);
    } else {
      this.style.removeProperty(prop);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  protected render() {
    if (!this._config) return nothing;

    const c = this._config;
    const hasErrors = Object.keys(this._templateErrors).length > 0;
    const isInteractive = !!c.global_action;

    // Resolve values — template results override static config
    const icon = this._templateResults.icon ?? c.icon;
    const badgeIcon = this._templateResults.badge_icon ?? c.badge_icon;
    const title = this._resolveTitle();

    // Resolve background image
    let bgImageUrl: string | undefined;
    if (c.background_image === "area") {
      bgImageUrl = this.hass ? resolveAreaImage(this.hass, c.entity) : undefined;
    } else if (c.background_image) {
      bgImageUrl = c.background_image;
    }
    const bgImageStyle = bgImageUrl
      ? `background-image: url('${bgImageUrl}'); background-position: ${c.background_image_position ?? "center"};`
      : "";

    const iconPosition: IconPosition | undefined = c.icon_position;
    const iconBgPosition: IconPosition | undefined = c.icon_background_position;
    const hasIndependentBg = !!iconBgPosition;
    const badgePosition = c.badge_position ?? "top-right";
    const titlePosition: IconPosition | undefined = c.title_position;
    const showHighlight = isInteractive
      ? c.hover_highlight !== false
      : c.hover_highlight === true;

    // Animation — resolved against card entity state
    const cardEntityState = c.entity ? this.hass?.states[c.entity] : undefined;
    const iconAnimClass = this._getAnimClass(c.icon_animation, c.icon_animation_when, cardEntityState);
    const iconAnimDur = this._getAnimDur(c.icon_animation, c.icon_animation_speed);
    const badgeAnimClass = this._getAnimClass(c.badge_animation, c.badge_animation_when, cardEntityState);
    const badgeAnimDur = this._getAnimDur(c.badge_animation, c.badge_animation_speed);

    // Compose icon container and badge container styles (position + optional animation duration)
    const iconContainerStyle = [
      iconPosition === "custom" ? `top: ${c.icon_position_y ?? "auto"}; left: ${c.icon_position_x ?? "auto"}` : "",
      iconAnimDur ? `--ians-anim-dur: ${iconAnimDur}` : "",
    ].filter(Boolean).join("; ");
    const badgeContainerStyle = [
      badgePosition === "custom" ? `top: ${c.badge_position_y ?? "auto"}; left: ${c.badge_position_x ?? "auto"}` : "",
      badgeAnimDur ? `--ians-anim-dur: ${badgeAnimDur}` : "",
    ].filter(Boolean).join("; ");

    // Badge element (shared between flow and absolute icon renders)
    const badgeEl = badgeIcon
      ? html`
          <div
            part="badge"
            class=${[
              "badge",
              badgePosition !== "custom" ? `badge-pos-${badgePosition}` : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style=${badgeContainerStyle || nothing}
          >
            <ha-icon part="badge-icon" .icon=${badgeIcon} class=${badgeAnimClass || nothing}></ha-icon>
          </div>
        `
      : nothing;

    // Background-only div — rendered when icon_background_position is set independently
    const iconBgOnlyEl = hasIndependentBg
      ? html`
          <div
            class=${[
              "icon-bg-only",
              "icon-absolute",
              iconBgPosition !== "custom" ? `icon-pos-${iconBgPosition}` : "",
            ].filter(Boolean).join(" ")}
            style=${iconBgPosition === "custom"
              ? `top: ${c.icon_background_position_y ?? "auto"}; left: ${c.icon_background_position_x ?? "auto"};`
              : ""}
          ></div>
        `
      : nothing;

    // Icon container — rendered in header flow (default) or absolutely positioned
    const iconEl =
      icon !== undefined
        ? iconPosition
          ? html`
              <div
                part="icon-container"
                class=${[
                  "icon-container",
                  "icon-absolute",
                  hasIndependentBg ? "icon-no-bg" : "",
                  iconPosition !== "custom" ? `icon-pos-${iconPosition}` : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style=${iconContainerStyle || nothing}
              >
                <ha-icon part="icon" .icon=${icon} class=${iconAnimClass || nothing}></ha-icon>
                ${badgeEl}
              </div>
            `
          : html`
              <div
                part="icon-container"
                class=${["icon-container", hasIndependentBg ? "icon-no-bg" : ""].filter(Boolean).join(" ")}
                style=${iconContainerStyle || nothing}
              >
                <ha-icon part="icon" .icon=${icon} class=${iconAnimClass || nothing}></ha-icon>
                ${badgeEl}
              </div>
            `
        : nothing;

    // Title rendered absolutely (outside card-inner flow)
    const titleAbsoluteEl = title && titlePosition
      ? html`
          <span
            part="title"
            class=${[
              "card-title-absolute",
              titlePosition !== "custom" ? `card-title-abs-${titlePosition}` : "",
            ].filter(Boolean).join(" ")}
            style=${titlePosition === "custom"
              ? `top: ${c.title_position_y ?? "auto"}; left: ${c.title_position_x ?? "auto"};`
              : ""}
          >${title}</span>`
      : nothing;

    return html`
      <ha-card
        part="card"
        class=${[
          hasErrors ? "has-template-error" : "",
          isInteractive ? "interactive" : "",
          showHighlight ? "highlight-on-hover" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div part="background" class="card-background-color"></div>
        ${bgImageStyle
          ? html`<div class="card-background-image" style=${bgImageStyle}></div>`
          : nothing}
        ${showHighlight ? html`<div class="hover-ripple"></div>` : nothing}

        <!-- Independent icon background (before card-inner so it's below content) -->
        ${iconBgOnlyEl}

        <!-- Absolutely positioned icon — z-index 2, BEFORE card-inner so card-inner (same z-index, later in DOM) renders on top -->
        ${iconPosition ? iconEl : nothing}

        <div class="card-inner">
          <div part="header" class="card-header">
            ${!iconPosition
              ? iconEl
              : (title && !titlePosition && (iconPosition === "top-left" || iconPosition === "center-left" || iconPosition === "bottom-left")
                  ? html`<div class="icon-spacer"></div>`
                  : nothing)}
            ${title && !titlePosition
              ? html`<span part="title" class="card-title">${title}</span>`
              : nothing}
          </div>

          ${hasErrors
            ? html`
                <div class="template-error">
                  <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                  <span>Template error — check browser console</span>
                </div>
              `
            : nothing}

          ${this._renderSubButtons()}
        </div>

        <!-- Absolute title — rendered after card-inner so it paints on top -->
        ${titleAbsoluteEl}
      </ha-card>
    `;
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  private _renderSubButtons() {
    const c = this._config;
    if (!c) return nothing;

    // Multi-group mode
    if (c.sub_button_groups?.length) {
      return c.sub_button_groups.slice(0, 4).map((group, gIdx) =>
        this._renderGroup(group, gIdx)
      );
    }

    // Single-group mode
    if (!c.sub_buttons?.length) return nothing;

    const layout = (c.sub_buttons_layout ?? "bottom-row") as SubButtonsLayout;
    const isGlobal = !!c.global_action;
    const buttons = c.sub_buttons.map((btn, i) =>
      this._renderSingleButton(btn, i, null, layout, isGlobal)
    );

    const containerClasses = [
      "sub-buttons",
      `layout-${layout}`,
      layout === "grid" && c.sub_buttons_grid_cell_layout === "horizontal" ? "grid-horizontal" : "",
    ].filter(Boolean).join(" ");

    return html`<div part="sub-buttons" class=${containerClasses}>${buttons}</div>`;
  }

  private _deriveGroupPosition(layout: SubButtonsLayout): string {
    switch (layout) {
      case "top-row":     return "top-row";
      case "left-column": return "left-column";
      case "right-column":return "right-column";
      case "corners":
      case "custom":      return "full";
      default:            return "bottom-row";
    }
  }

  private _renderGroup(group: SubButtonGroup, groupIndex: number) {
    const c = this._config!;
    const layout = (group.layout ?? "bottom-row") as SubButtonsLayout;
    const isGlobal = !!c.global_action;
    const isColumn = layout === "left-column" || layout === "right-column";
    const isGrid = layout === "grid";

    const effectivePos = group.position ?? this._deriveGroupPosition(layout);

    const groupStyle = [
      effectivePos === "custom" ? `top: ${group.position_y ?? "auto"}; left: ${group.position_x ?? "auto"}` : "",
      group.gap !== undefined ? `--ians-sub-button-gap: ${group.gap}px` : "",
      group.icon_color ? `--ians-sub-button-icon-color: ${group.icon_color}` : "",
      group.background_color ? `--ians-sub-button-background-color: ${group.background_color}` : "",
      group.opacity !== undefined ? `opacity: ${group.opacity}` : "",
      isColumn && group.column_justify ? `--ians-sub-buttons-column-justify: ${COLUMN_JUSTIFY_MAP[group.column_justify] ?? "flex-start"}` : "",
      isGrid && group.grid_columns ? `--ians-sub-buttons-grid-template-columns: repeat(${group.grid_columns}, 1fr)` :
      isGrid && group.grid_min_width ? `--ians-sub-buttons-grid-template-columns: repeat(auto-fill, minmax(${group.grid_min_width}px, 1fr))` : "",
    ].filter(Boolean).join("; ");

    const containerClass = [
      "sub-button-group",
      `group-pos-${effectivePos}`,
      isGrid ? "group-layout-grid" : "",
      isGrid && group.grid_cell_layout === "horizontal" ? "grid-horizontal" : "",
    ].filter(Boolean).join(" ");

    const buttons = (group.buttons ?? []).map((btn, i) =>
      this._renderSingleButton(btn, i, groupIndex, layout, isGlobal)
    );

    return html`<div class=${containerClass} part="sub-button-group" style=${groupStyle || nothing}>${buttons}</div>`;
  }

  private _renderSingleButton(
    btn: SubButtonConfig,
    btnIndex: number,
    groupIndex: number | null,
    layout: SubButtonsLayout,
    isGlobal: boolean
  ) {
    const entityState = btn.entity ? this.hass?.states[btn.entity] : undefined;
    const domain = btn.entity?.split(".")[0] ?? "";
    const domainIcon = domain ? (DOMAIN_ICONS[domain] ?? "mdi:circle") : "mdi:circle";
    const keyPfx = groupIndex !== null ? `g${groupIndex}_sub_${btnIndex}` : `sub_${btnIndex}`;

    const icon =
      this._subTemplateResults[`${keyPfx}_icon`] ??
      btn.icon ??
      (entityState?.attributes.icon as string | undefined) ??
      domainIcon;

    let label: string | undefined;
    if (btn.label !== undefined) {
      if (btn.label === "entity" && entityState) {
        label = (entityState.attributes.friendly_name as string | undefined) ?? btn.entity;
      } else {
        label = this._subTemplateResults[`${keyPfx}_label`] ?? btn.label;
      }
    }

    let posClass = "";
    if (layout === "corners") {
      posClass = `pos-${CORNER_POSITIONS[btnIndex] ?? "bottom-right"}`;
    } else if (layout === "custom" && btn.position) {
      posClass = `pos-${btn.position}`;
    }

    const classes = [
      "sub-button",
      btn.background !== false ? "has-background" : "",
      isGlobal ? "display-only" : "",
      posClass,
    ].filter(Boolean).join(" ");

    let btnIconColor = btn.icon_color;
    if (btn.state_based_color && entityState) {
      const isActive = ACTIVE_STATES.has(entityState.state);
      btnIconColor = isActive
        ? (btn.icon_color_on ?? DOMAIN_ACTIVE_COLORS[domain] ?? btn.icon_color)
        : (btn.icon_color_off ?? btn.icon_color);
    }

    const btnAnimClass = this._getAnimClass(btn.animation, btn.animation_when, entityState);
    const btnAnimDur = this._getAnimDur(btn.animation, btn.animation_speed);

    const stateDisplay = entityState
      ? `${entityState.state}${entityState.attributes.unit_of_measurement ? ` ${entityState.attributes.unit_of_measurement}` : ""}`
      : "";

    const btnStyle = [
      btnIconColor ? `--ians-sub-button-icon-color: ${btnIconColor}` : "",
      btn.background_color ? `--ians-sub-button-background-color: ${btn.background_color}` : "",
      btn.opacity !== undefined ? `opacity: ${btn.opacity}` : "",
      btnAnimDur ? `--ians-anim-dur: ${btnAnimDur}` : "",
      btn.state_font_size !== undefined ? `--ians-sub-button-state-font-size: ${btn.state_font_size}px` : "",
      btn.state_font_weight !== undefined ? `--ians-sub-button-state-font-weight: ${btn.state_font_weight}` : "",
      btn.text_max_width !== undefined ? `--ians-sub-button-text-max-width: ${btn.text_max_width}px` : "",
    ].filter(Boolean).join("; ");

    return html`
      <div class=${classes} part="sub-button" style=${btnStyle || nothing}
        data-index=${String(btnIndex)}
        data-group=${groupIndex !== null ? String(groupIndex) : nothing}
      >
        ${btn.show_icon !== false
          ? html`<ha-icon part="sub-button-icon" .icon=${icon} class=${btnAnimClass || nothing}></ha-icon>`
          : nothing}
        ${btn.show_label && label
          ? html`<span part="sub-button-label" class="sub-button-label">${label}</span>`
          : nothing}
        ${btn.show_state && entityState
          ? html`<span part="sub-button-state" class="sub-button-state">${stateDisplay}</span>`
          : nothing}
      </div>
    `;
  }

  private _resolveTitle(): string | undefined {
    const c = this._config;
    if (!c) return undefined;

    // Template result takes precedence
    if (this._templateResults.title) return this._templateResults.title;

    if (!c.title) return undefined;
    if (c.title === "entity" && c.entity && this.hass) {
      return (
        (this.hass.states[c.entity]?.attributes.friendly_name as string) ??
        c.entity
      );
    }
    return c.title;
  }

  // ── Styles ─────────────────────────────────────────────────────────────────

  static get styles() {
    return cardStyles;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TYPE,
  name: CARD_NAME,
  description: CARD_DESCRIPTION,
  preview: false,
  documentationURL: "https://github.com/linkian19/ha-ians-custom-room-card",
});

declare global {
  interface Window {
    customCards: Array<{
      type: string;
      name: string;
      description?: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}
