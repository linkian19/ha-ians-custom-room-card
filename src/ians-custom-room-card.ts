import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, CardConfig, GridOptions, IconPosition, BadgePosition, IconBackgroundShape } from "./types";
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
  "badge_icon",
  "badge_color",
  "background_color",
  "border_color",
  "title",
] as const;

type TemplateField = (typeof TEMPLATE_FIELDS)[number];

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

const SHAPE_BORDER_RADIUS: Record<IconBackgroundShape, string> = {
  circle: "50%",
  "rounded-rect": "8px",
  squircle: "30%",
  square: "0",
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

    if (configChanged) {
      this._subscribeTemplates();
      this._subscribeSubButtonTemplates();
      this._setupCardActionHandler();
    }

    if (configChanged || templateResultsChanged || changedProps.has("_subTemplateResults")) {
      this._applyConfigStyles();
      // Re-attach sub-button action handlers after re-render
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
    if (!c?.sub_buttons || !this.hass) return;

    const variables: Record<string, unknown> = {
      config: c,
      user: this.hass.user?.name ?? "",
    };

    for (const [i, btn] of c.sub_buttons.entries()) {
      const btnVars = {
        ...variables,
        entity: btn.entity ? this.hass.states[btn.entity] : undefined,
      };

      for (const field of ["icon", "label"] as const) {
        const value = btn[field];
        if (!value || !isTemplate(value)) continue;

        const key = `sub_${i}_${field}`;
        try {
          const unsub = await subscribeTemplate(
            this.hass,
            value,
            btnVars,
            (result) => {
              this._subTemplateResults = { ...this._subTemplateResults, [key]: result };
            }
          );
          this._subTemplateUnsubs.set(key, unsub);
        } catch (e) {
          console.warn(`[ians-room-card] Sub-button template error (${key}):`, e);
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

    this._setCSSVar("--ians-card-background-color", resolve("background_color", c.background_color));
    this._setCSSVar("--ians-card-background-opacity", c.background_opacity !== undefined ? String(c.background_opacity) : undefined);
    this._setCSSVar("--ians-card-border-color", resolve("border_color", c.border_color));
    this._setCSSVar("--ians-card-border-opacity", c.border_opacity !== undefined ? String(c.border_opacity) : undefined);

    this._setCSSVar("--ians-icon-color", resolve("icon_color", c.icon_color));
    this._setCSSVar("--ians-icon-opacity", c.icon_opacity !== undefined ? String(c.icon_opacity) : undefined);
    this._setCSSVar("--ians-icon-background-color", c.icon_background_color);
    this._setCSSVar("--ians-icon-background-opacity", c.icon_background_opacity !== undefined ? String(c.icon_background_opacity) : undefined);
    this._setCSSVar("--ians-icon-background-size", c.icon_background_size !== undefined ? `${c.icon_background_size}px` : undefined);
    this._setCSSVar("--ians-icon-background-border-radius", c.icon_background_shape ? SHAPE_BORDER_RADIUS[c.icon_background_shape] : undefined);
    this._setCSSVar("--ians-icon-size", c.icon_size !== undefined ? `${c.icon_size}px` : undefined);

    this._setCSSVar("--ians-badge-color", resolve("badge_color", c.badge_color));
    this._setCSSVar("--ians-badge-background-color", c.badge_background_color);
    this._setCSSVar("--ians-badge-size", c.badge_size !== undefined ? `${c.badge_size}px` : undefined);
    this._setCSSVar("--ians-badge-opacity", c.badge_opacity !== undefined ? String(c.badge_opacity) : undefined);

    this._setCSSVar("--ians-title-color", c.title_color);
    this._setCSSVar("--ians-title-font-size", c.title_font_size !== undefined ? `${c.title_font_size}px` : undefined);
    this._setCSSVar("--ians-title-align", c.title_align);

    this._setCSSVar("--ians-sub-button-icon-color", c.sub_button_icon_color);
    this._setCSSVar("--ians-sub-button-background-color", c.sub_button_background_color);
    this._setCSSVar("--ians-sub-button-opacity", c.sub_button_opacity !== undefined ? String(c.sub_button_opacity) : undefined);
  }

  // ── Action handlers ────────────────────────────────────────────────────────

  private _setupSubButtonHandlers(): void {
    this._cleanupSubButtonHandlers();

    const c = this._config;
    // When global_action is active, sub-buttons are display-only — no handlers
    if (!c?.sub_buttons || c.global_action) return;

    const subBtnEls =
      this.shadowRoot?.querySelectorAll<HTMLElement>(".sub-button");
    if (!subBtnEls) return;

    subBtnEls.forEach((el, i) => {
      const btn = c.sub_buttons![i];
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
      ? `background-image: url('${bgImageUrl}');`
      : "";

    const iconPosition: IconPosition | undefined = c.icon_position;
    const badgePosition = c.badge_position ?? "top-right";
    const titlePosition: IconPosition | undefined = c.title_position;

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
            style=${badgePosition === "custom"
              ? `top: ${c.badge_position_y ?? "auto"}; left: ${c.badge_position_x ?? "auto"};`
              : ""}
          >
            <ha-icon part="badge-icon" .icon=${badgeIcon}></ha-icon>
          </div>
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
                  iconPosition !== "custom" ? `icon-pos-${iconPosition}` : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style=${iconPosition === "custom"
                  ? `top: ${c.icon_position_y ?? "auto"}; left: ${c.icon_position_x ?? "auto"};`
                  : ""}
              >
                <ha-icon part="icon" .icon=${icon}></ha-icon>
                ${badgeEl}
              </div>
            `
          : html`
              <div part="icon-container" class="icon-container">
                <ha-icon part="icon" .icon=${icon}></ha-icon>
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
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div part="background" class="card-background-color"></div>
        ${bgImageStyle
          ? html`<div class="card-background-image" style=${bgImageStyle}></div>`
          : nothing}

        <!-- Absolutely positioned icon — z-index 2, BEFORE card-inner so card-inner (same z-index, later in DOM) renders on top -->
        ${iconPosition ? iconEl : nothing}

        <div class="card-inner">
          <div part="header" class="card-header">
            ${!iconPosition ? iconEl : nothing}
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
    if (!c?.sub_buttons?.length) return nothing;

    const layout = c.sub_buttons_layout ?? "bottom-row";
    const isAbsolute = layout === "corners" || layout === "custom"
      || layout === "left-column" || layout === "right-column";
    const isGlobal = !!c.global_action;

    const buttons = c.sub_buttons.map((btn, i) => {
      const entityState = btn.entity ? this.hass?.states[btn.entity] : undefined;

      // Resolve icon: template → user override → entity attribute → domain default → fallback
      const domain = btn.entity?.split(".")[0] ?? "";
      const domainIcon = domain ? (DOMAIN_ICONS[domain] ?? "mdi:circle") : "mdi:circle";
      const icon =
        this._subTemplateResults[`sub_${i}_icon`] ??
        btn.icon ??
        (entityState?.attributes.icon as string | undefined) ??
        domainIcon;

      // Resolve label
      let label: string | undefined;
      if (btn.label !== undefined) {
        if (btn.label === "entity" && entityState) {
          label = (entityState.attributes.friendly_name as string | undefined) ?? btn.entity;
        } else {
          label = this._subTemplateResults[`sub_${i}_label`] ?? btn.label;
        }
      }

      // Position class for corners/custom layouts
      let posClass = "";
      if (layout === "corners") {
        posClass = `pos-${CORNER_POSITIONS[i] ?? "bottom-right"}`;
      } else if (layout === "custom" && btn.position) {
        posClass = `pos-${btn.position}`;
      }

      const classes = [
        "sub-button",
        btn.background !== false ? "has-background" : "",
        isGlobal ? "display-only" : "",
        posClass,
      ].filter(Boolean).join(" ");

      // Per-button color overrides via inline style
      const btnStyle = [
        btn.icon_color ? `--ians-sub-button-icon-color: ${btn.icon_color}` : "",
        btn.background_color ? `--ians-sub-button-background-color: ${btn.background_color}` : "",
        btn.opacity !== undefined ? `opacity: ${btn.opacity}` : "",
      ].filter(Boolean).join("; ");

      return html`
        <div class=${classes} part="sub-button" style=${btnStyle || nothing}>
          ${btn.show_icon !== false
            ? html`<ha-icon part="sub-button-icon" .icon=${icon}></ha-icon>`
            : nothing}
          ${btn.show_label && label
            ? html`<span part="sub-button-label" class="sub-button-label">${label}</span>`
            : nothing}
          ${btn.show_state && entityState
            ? html`<span part="sub-button-state" class="sub-button-state">${entityState.state}</span>`
            : nothing}
        </div>
      `;
    });

    const containerClasses = ["sub-buttons", `layout-${layout}`].filter(Boolean).join(" ");

    return html`<div part="sub-buttons" class=${containerClasses}>${buttons}</div>`;
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
  documentationURL: "https://github.com/IanStanek/ha-ians-custom-room-card",
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
