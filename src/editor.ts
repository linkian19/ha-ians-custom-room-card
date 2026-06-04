import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  HomeAssistant, CardConfig, SubButtonConfig,
  SubButtonsLayout, IconPosition, BadgePosition,
  IconBackgroundShape, TitleAlign,
} from "./types";
import { CARD_TYPE } from "./const";
import { loadHaComponents } from "./utils/loader";
import { isTemplate } from "./utils/template-manager";

// ── Option lists ──────────────────────────────────────────────────────────────

const ICON_POSITION_OPTIONS = [
  { value: "",              label: "Default (inline with title)" },
  { value: "top-left",      label: "Top Left" },
  { value: "top-right",     label: "Top Right" },
  { value: "bottom-left",   label: "Bottom Left" },
  { value: "bottom-right",  label: "Bottom Right" },
  { value: "center",        label: "Center" },
  { value: "center-left",   label: "Center Left" },
  { value: "center-right",  label: "Center Right" },
  { value: "custom",        label: "Custom (CSS coordinates)" },
];

const TITLE_POSITION_OPTIONS = [
  { value: "",              label: "Default (inline with icon)" },
  { value: "top-left",      label: "Top Left" },
  { value: "top-center",    label: "Top Center" },
  { value: "top-right",     label: "Top Right" },
  { value: "center-left",   label: "Center Left" },
  { value: "center",        label: "Center" },
  { value: "center-right",  label: "Center Right" },
  { value: "bottom-left",   label: "Bottom Left" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-right",  label: "Bottom Right" },
  { value: "custom",        label: "Custom (CSS coordinates)" },
];

const TITLE_ALIGN_OPTIONS = [
  { value: "left",   label: "Left" },
  { value: "center", label: "Center" },
  { value: "right",  label: "Right" },
];

const BADGE_POSITION_OPTIONS = [
  { value: "top-right",    label: "Top Right (default)" },
  { value: "top-left",     label: "Top Left" },
  { value: "bottom-left",  label: "Bottom Left" },
  { value: "bottom-right", label: "Bottom Right" },
  { value: "custom",       label: "Custom (CSS coordinates)" },
];

const ICON_SHAPE_OPTIONS = [
  { value: "circle",       label: "Circle (default)" },
  { value: "rounded-rect", label: "Rounded Rectangle" },
  { value: "squircle",     label: "Squircle" },
  { value: "square",       label: "Square" },
];

const SUB_BUTTON_LAYOUT_OPTIONS = [
  { value: "bottom-row",   label: "Bottom Row" },
  { value: "top-row",      label: "Top Row" },
  { value: "right-column", label: "Right Column" },
  { value: "left-column",  label: "Left Column" },
  { value: "corners",      label: "Corners (up to 4)" },
  { value: "grid",         label: "Grid (auto-fill)" },
  { value: "custom",       label: "Custom positions" },
];

const SUB_BUTTON_POSITION_OPTIONS = [
  { value: "top-left",      label: "Top Left" },
  { value: "top-center",    label: "Top Center" },
  { value: "top-right",     label: "Top Right" },
  { value: "bottom-left",   label: "Bottom Left" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-right",  label: "Bottom Right" },
];

const TEMPLATE_CAPABLE_FIELDS = new Set([
  "title", "icon", "icon_color", "badge_icon", "badge_color",
  "background_color", "border_color",
]);

const OPACITY_SELECTOR = { number: { min: 0, max: 1, step: 0.05, mode: "slider" } };

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Best-effort: convert a CSS color string to a hex value for <input type="color">.
 *  Returns "#000000" for anything it can't parse (named colors, CSS vars, etc.). */
function cssToHex(value: string): string {
  if (!value) return "#000000";
  if (/^#[0-9a-f]{6}$/i.test(value)) return value.toLowerCase();
  if (/^#[0-9a-f]{3}$/i.test(value)) {
    const [, r, g, b] = value.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i)!;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return "#000000";
}

// ── Editor component ──────────────────────────────────────────────────────────

@customElement(`${CARD_TYPE}-editor`)
export class IansCustomRoomCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: CardConfig;
  @state() private _loaded = false;
  @state() private _templateMode: Set<string> = new Set();
  @state() private _expandedSubButton: number | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    loadHaComponents().then(() => { this._loaded = true; });
  }

  public setConfig(config: CardConfig): void {
    this._config = config;
    const templateSet = new Set<string>();
    for (const field of TEMPLATE_CAPABLE_FIELDS) {
      const val = config[field as keyof CardConfig] as string | undefined;
      if (val && isTemplate(val)) templateSet.add(field);
    }
    this._templateMode = templateSet;
  }

  // ── Event helpers ────────────────────────────────────────────────────────────

  private _fireConfigChanged(config: CardConfig): void {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config }, bubbles: true, composed: true,
    }));
  }

  private _fieldChanged(field: string, value: unknown): void {
    if (!this._config) return;
    this._fireConfigChanged({ ...this._config, [field]: value });
  }

  private _gridFieldChanged(field: string, value: unknown): void {
    if (!this._config) return;
    this._fireConfigChanged({
      ...this._config,
      grid_options: { ...(this._config.grid_options ?? {}), [field]: value },
    });
  }

  private _globalActionFieldChanged(field: string, value: unknown): void {
    if (!this._config) return;
    this._fireConfigChanged({
      ...this._config,
      global_action: { ...(this._config.global_action ?? {}), [field]: value },
    });
  }

  private _subButtonChanged(index: number, patch: Partial<SubButtonConfig>): void {
    if (!this._config?.sub_buttons) return;
    const buttons = [...this._config.sub_buttons];
    buttons[index] = { ...buttons[index], ...patch };
    this._fieldChanged("sub_buttons", buttons);
  }

  private _addSubButton(): void {
    const buttons = [...(this._config?.sub_buttons ?? [])];
    buttons.push({
      show_icon: true, show_label: false, show_state: false, background: true,
      tap_action: { action: "toggle" },
      hold_action: { action: "more-info" },
      double_tap_action: { action: "none" },
    });
    this._fieldChanged("sub_buttons", buttons);
    this._expandedSubButton = buttons.length - 1;
  }

  private _deleteSubButton(index: number): void {
    if (!this._config?.sub_buttons) return;
    const buttons = [...this._config.sub_buttons];
    buttons.splice(index, 1);
    this._fieldChanged("sub_buttons", buttons);
    if (this._expandedSubButton === index) this._expandedSubButton = null;
  }

  private _toggleTemplateMode(field: string): void {
    const next = new Set(this._templateMode);
    next.has(field) ? next.delete(field) : next.add(field);
    this._templateMode = next;
  }

  // ── Render helpers ────────────────────────────────────────────────────────────

  /** Color field with visual swatch + native picker + text input. */
  private _renderColorField(fieldKey: string, label: string) {
    const isTemplateCapable = TEMPLATE_CAPABLE_FIELDS.has(fieldKey);
    const currentValue = (this._config?.[fieldKey as keyof CardConfig] as string) ?? "";

    const colorWidget = () => html`
      <div class="color-input-row">
        <label class="color-swatch" title="Open color picker">
          <div class="color-swatch-preview" style="background: ${currentValue || "transparent"}"></div>
          <input
            type="color"
            class="hidden-color-input"
            .value=${cssToHex(currentValue)}
            @change=${(ev: Event) =>
              this._fieldChanged(fieldKey, (ev.target as HTMLInputElement).value || undefined)}
          />
        </label>
        <ha-selector
          .hass=${this.hass}
          .label=${label}
          .selector=${{ text: {} }}
          .value=${currentValue}
          placeholder="e.g. red, #ff0000, var(--primary-color)"
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged(fieldKey, ev.detail.value || undefined)}
        ></ha-selector>
      </div>
    `;

    if (!isTemplateCapable) return colorWidget();
    return this._renderTemplateField(fieldKey, label, colorWidget);
  }

  private _renderTemplateField(
    fieldKey: string,
    label: string,
    renderWidget: () => unknown
  ) {
    const inTemplateMode = this._templateMode.has(fieldKey);
    const currentValue = (this._config?.[fieldKey as keyof CardConfig] as string) ?? "";

    return html`
      <div class="field-row">
        <div class="field-input">
          ${inTemplateMode
            ? html`
                <textarea
                  .value=${currentValue}
                  placeholder="{{ states('sensor.example') }}"
                  @change=${(ev: Event) => this._fieldChanged(fieldKey, (ev.target as HTMLTextAreaElement).value)}
                  @input=${(ev: Event) => this._fieldChanged(fieldKey, (ev.target as HTMLTextAreaElement).value)}
                ></textarea>
                <div class="helper-text">Advanced: HA Template (Jinja2)</div>
              `
            : renderWidget()}
        </div>
        <button
          class="template-toggle ${inTemplateMode ? "active" : ""}"
          title="${inTemplateMode ? "Switch to simple input" : "Use HA template"}"
          @click=${() => this._toggleTemplateMode(fieldKey)}
        >T</button>
      </div>
    `;
  }

  private _renderOpacityField(fieldKey: string, label: string, defaultVal = 1) {
    return html`
      <ha-selector
        .hass=${this.hass}
        .label=${label}
        .selector=${OPACITY_SELECTOR}
        .value=${(this._config?.[fieldKey as keyof CardConfig] as number) ?? defaultVal}
        @value-changed=${(ev: CustomEvent) => this._fieldChanged(fieldKey, ev.detail.value)}
      ></ha-selector>
    `;
  }

  private _renderNumericField(fieldKey: string, label: string, min: number, max: number, step: number, defaultVal: number, suffix = "") {
    return html`
      <ha-selector
        .hass=${this.hass}
        .label=${label}
        .selector=${{ number: { min, max, step, mode: "box", ...(suffix ? { unit_of_measurement: suffix } : {}) } }}
        .value=${(this._config?.[fieldKey as keyof CardConfig] as number) ?? defaultVal}
        @value-changed=${(ev: CustomEvent) => this._fieldChanged(fieldKey, ev.detail.value)}
      ></ha-selector>
    `;
  }

  // ── Main render ──────────────────────────────────────────────────────────────

  protected render() {
    if (!this._loaded || !this._config) {
      return html`<div class="loading">Loading editor…</div>`;
    }
    const c = this._config;

    return html`
      <!-- ── Basic ─────────────────────────────────────────────────────── -->
      <div class="section-header">Basic</div>
      <div class="section-body">
        <ha-entity-picker
          .hass=${this.hass}
          .label=${"Entity (optional)"}
          .value=${c.entity ?? ""}
          allow-custom-entity
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("entity", ev.detail.value || undefined)}
        ></ha-entity-picker>

        ${this._renderTemplateField("title", "Title",
          () => html`
            <ha-selector
              .hass=${this.hass}
              .label=${"Title"}
              .selector=${{ text: {} }}
              .value=${c.title ?? ""}
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("title", ev.detail.value || undefined)}
            ></ha-selector>
          `
        )}

        ${this._renderTemplateField("icon", "Icon",
          () => html`
            <ha-icon-picker
              .hass=${this.hass}
              .label=${"Icon"}
              .value=${c.icon ?? ""}
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("icon", ev.detail.value || undefined)}
            ></ha-icon-picker>
          `
        )}
      </div>

      <!-- ── Title appearance ──────────────────────────────────────────── -->
      <div class="section-header">Title</div>
      <div class="section-body">
        <ha-selector
          .hass=${this.hass}
          .label=${"Position"}
          .selector=${{ select: { options: TITLE_POSITION_OPTIONS, mode: "dropdown" } }}
          .value=${c.title_position ?? ""}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("title_position", ev.detail.value as IconPosition || undefined)}
        ></ha-selector>

        ${c.title_position === "custom" ? html`
          <div class="two-col">
            <ha-selector
              .hass=${this.hass}
              .label=${"X position (CSS)"}
              .selector=${{ text: {} }}
              .value=${c.title_position_x ?? ""}
              placeholder="e.g. 10px, 50%"
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("title_position_x", ev.detail.value || undefined)}
            ></ha-selector>
            <ha-selector
              .hass=${this.hass}
              .label=${"Y position (CSS)"}
              .selector=${{ text: {} }}
              .value=${c.title_position_y ?? ""}
              placeholder="e.g. 10px, 50%"
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("title_position_y", ev.detail.value || undefined)}
            ></ha-selector>
          </div>
        ` : nothing}

        ${!c.title_position ? html`
          <ha-selector
            .hass=${this.hass}
            .label=${"Alignment (when inline)"}
            .selector=${{ select: { options: TITLE_ALIGN_OPTIONS, mode: "list" } }}
            .value=${c.title_align ?? "left"}
            @value-changed=${(ev: CustomEvent) =>
              this._fieldChanged("title_align", ev.detail.value as TitleAlign || undefined)}
          ></ha-selector>
        ` : nothing}

        <div class="two-col">
          ${this._renderNumericField("title_font_size", "Font Size (px)", 8, 48, 1, 14, "px")}
          ${this._renderColorField("title_color", "Title Color")}
        </div>
      </div>

      <!-- ── Icon appearance ───────────────────────────────────────────── -->
      <div class="section-header">Icon</div>
      <div class="section-body">
        ${this._renderColorField("icon_color", "Icon Color")}
        ${this._renderOpacityField("icon_opacity", "Icon Opacity")}

        <ha-selector
          .hass=${this.hass}
          .label=${"Background Shape"}
          .selector=${{ select: { options: ICON_SHAPE_OPTIONS, mode: "dropdown" } }}
          .value=${c.icon_background_shape ?? "circle"}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("icon_background_shape", ev.detail.value as IconBackgroundShape || undefined)}
        ></ha-selector>

        ${this._renderColorField("icon_background_color", "Background Color")}
        ${this._renderOpacityField("icon_background_opacity", "Background Opacity")}

        <div class="two-col">
          ${this._renderNumericField("icon_size", "Icon Size (px)", 8, 120, 2, 24, "px")}
          ${this._renderNumericField("icon_background_size", "Background Size (px)", 8, 160, 2, 40, "px")}
        </div>

        <ha-selector
          .hass=${this.hass}
          .label=${"Icon Position"}
          .selector=${{ select: { options: ICON_POSITION_OPTIONS, mode: "dropdown" } }}
          .value=${c.icon_position ?? ""}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("icon_position", ev.detail.value as IconPosition || undefined)}
        ></ha-selector>

        ${c.icon_position === "custom" ? html`
          <div class="two-col">
            <ha-selector
              .hass=${this.hass}
              .label=${"X position (CSS)"}
              .selector=${{ text: {} }}
              .value=${c.icon_position_x ?? ""}
              placeholder="e.g. 10px, 50%"
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("icon_position_x", ev.detail.value || undefined)}
            ></ha-selector>
            <ha-selector
              .hass=${this.hass}
              .label=${"Y position (CSS)"}
              .selector=${{ text: {} }}
              .value=${c.icon_position_y ?? ""}
              placeholder="e.g. 10px, 50%"
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("icon_position_y", ev.detail.value || undefined)}
            ></ha-selector>
          </div>
        ` : nothing}
      </div>

      <!-- ── Badge ─────────────────────────────────────────────────────── -->
      <div class="section-header">Icon Badge</div>
      <div class="section-body">
        ${this._renderTemplateField("badge_icon", "Badge Icon",
          () => html`
            <ha-icon-picker
              .hass=${this.hass}
              .label=${"Badge Icon (leave blank to hide)"}
              .value=${c.badge_icon ?? ""}
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("badge_icon", ev.detail.value || undefined)}
            ></ha-icon-picker>
          `
        )}

        ${this._renderColorField("badge_color", "Badge Icon Color")}
        ${this._renderColorField("badge_background_color", "Badge Background Color")}
        ${this._renderOpacityField("badge_opacity", "Badge Opacity")}

        <div class="two-col">
          ${this._renderNumericField("badge_size", "Badge Size (px)", 8, 48, 1, 18, "px")}
          <ha-selector
            .hass=${this.hass}
            .label=${"Badge Position"}
            .selector=${{ select: { options: BADGE_POSITION_OPTIONS, mode: "dropdown" } }}
            .value=${c.badge_position ?? "top-right"}
            @value-changed=${(ev: CustomEvent) =>
              this._fieldChanged("badge_position", ev.detail.value as BadgePosition || undefined)}
          ></ha-selector>
        </div>

        ${c.badge_position === "custom" ? html`
          <div class="two-col">
            <ha-selector
              .hass=${this.hass}
              .label=${"Badge X (CSS)"}
              .selector=${{ text: {} }}
              .value=${c.badge_position_x ?? ""}
              placeholder="e.g. 10px"
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("badge_position_x", ev.detail.value || undefined)}
            ></ha-selector>
            <ha-selector
              .hass=${this.hass}
              .label=${"Badge Y (CSS)"}
              .selector=${{ text: {} }}
              .value=${c.badge_position_y ?? ""}
              placeholder="e.g. 10px"
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("badge_position_y", ev.detail.value || undefined)}
            ></ha-selector>
          </div>
        ` : nothing}
      </div>

      <!-- ── Card background & border ──────────────────────────────────── -->
      <div class="section-header">Card Background &amp; Border</div>
      <div class="section-body">
        ${this._renderColorField("background_color", "Background Color")}
        ${this._renderOpacityField("background_opacity", "Background Opacity")}

        <ha-selector
          .hass=${this.hass}
          .label=${"Background Image URL (or type 'area' to use the room picture)"}
          .selector=${{ text: {} }}
          .value=${c.background_image ?? ""}
          placeholder="e.g. /local/room.jpg  or  area"
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("background_image", ev.detail.value || undefined)}
        ></ha-selector>

        ${this._renderColorField("border_color", "Border Color")}
        ${this._renderOpacityField("border_opacity", "Border Opacity")}
      </div>

      <!-- ── Grid sizing ────────────────────────────────────────────────── -->
      <div class="section-header">Grid Sizing (Sections Dashboard)</div>
      <div class="section-body">
        <div class="two-col">
          <ha-selector
            .hass=${this.hass}
            .label=${"Columns"}
            .selector=${{ number: { min: 1, max: 12, step: 1, mode: "box" } }}
            .value=${c.grid_options?.columns ?? 6}
            @value-changed=${(ev: CustomEvent) => this._gridFieldChanged("columns", ev.detail.value)}
          ></ha-selector>
          <ha-selector
            .hass=${this.hass}
            .label=${"Rows"}
            .selector=${{ number: { min: 1, max: 6, step: 1, mode: "box" } }}
            .value=${c.grid_options?.rows ?? 2}
            @value-changed=${(ev: CustomEvent) => this._gridFieldChanged("rows", ev.detail.value)}
          ></ha-selector>
        </div>
      </div>

      <!-- ── Sub-buttons ───────────────────────────────────────────────── -->
      <div class="section-header">Sub-Buttons</div>
      <div class="section-body">
        <ha-selector
          .hass=${this.hass}
          .label=${"Layout"}
          .selector=${{ select: { options: SUB_BUTTON_LAYOUT_OPTIONS, mode: "dropdown" } }}
          .value=${c.sub_buttons_layout ?? "bottom-row"}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("sub_buttons_layout", ev.detail.value as SubButtonsLayout)}
        ></ha-selector>

        <div class="sub-section-label">Global Sub-Button Style</div>

        ${this._renderColorField("sub_button_icon_color", "Icon Color (global)")}
        ${this._renderColorField("sub_button_background_color", "Background Color (global)")}
        ${this._renderOpacityField("sub_button_opacity", "Opacity (global)")}

        <div class="sub-section-label">Buttons</div>

        ${(c.sub_buttons ?? []).map((btn, i) => this._renderSubButtonRow(btn, i))}

        <button class="add-button" @click=${this._addSubButton}>
          + Add Sub-Button
        </button>
      </div>

      <!-- ── Global action ──────────────────────────────────────────────── -->
      <div class="section-header">Global Action</div>
      <div class="section-body">
        <div class="warning-box">
          When Global Action is set, sub-buttons become non-interactive decorations
          and the entire card surface becomes a single tap target.
        </div>

        <ha-selector
          .hass=${this.hass}
          .label=${"Tap Action"}
          .selector=${{ ui_action: {} }}
          .value=${c.global_action?.tap_action ?? { action: "none" }}
          @value-changed=${(ev: CustomEvent) =>
            this._globalActionFieldChanged("tap_action", ev.detail.value)}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .label=${"Hold Action"}
          .selector=${{ ui_action: {} }}
          .value=${c.global_action?.hold_action ?? { action: "none" }}
          @value-changed=${(ev: CustomEvent) =>
            this._globalActionFieldChanged("hold_action", ev.detail.value)}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .label=${"Double-Tap Action"}
          .selector=${{ ui_action: {} }}
          .value=${c.global_action?.double_tap_action ?? { action: "none" }}
          @value-changed=${(ev: CustomEvent) =>
            this._globalActionFieldChanged("double_tap_action", ev.detail.value)}
        ></ha-selector>

        <button
          class="clear-button"
          @click=${() => {
            const cfg = { ...this._config! };
            delete cfg.global_action;
            this._fireConfigChanged(cfg);
          }}
        >Clear Global Action</button>
      </div>
    `;
  }

  private _renderSubButtonRow(btn: SubButtonConfig, index: number) {
    const isExpanded = this._expandedSubButton === index;
    const label = btn.entity ?? btn.label ?? btn.icon ?? `Sub-button ${index + 1}`;
    const showPosition = (this._config?.sub_buttons_layout ?? "bottom-row") === "custom";

    return html`
      <div class="sub-button-row">
        <div
          class="sub-button-header"
          @click=${() => (this._expandedSubButton = isExpanded ? null : index)}
        >
          <ha-icon .icon=${btn.icon ?? "mdi:gesture-tap"}></ha-icon>
          <span class="sub-button-label">${label}</span>
          <ha-icon .icon=${isExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
          <button
            class="delete-button"
            @click=${(ev: Event) => { ev.stopPropagation(); this._deleteSubButton(index); }}
          >✕</button>
        </div>

        ${isExpanded ? html`
          <div class="sub-button-body">
            <ha-entity-picker
              .hass=${this.hass}
              .label=${"Entity"}
              .value=${btn.entity ?? ""}
              allow-custom-entity
              @value-changed=${(ev: CustomEvent) =>
                this._subButtonChanged(index, { entity: ev.detail.value || undefined })}
            ></ha-entity-picker>

            <ha-icon-picker
              .hass=${this.hass}
              .label=${"Icon (leave blank to auto-pick from entity)"}
              .value=${btn.icon ?? ""}
              @value-changed=${(ev: CustomEvent) =>
                this._subButtonChanged(index, { icon: ev.detail.value || undefined })}
            ></ha-icon-picker>

            <ha-selector
              .hass=${this.hass}
              .label=${"Label (or type 'entity' for the entity name)"}
              .selector=${{ text: {} }}
              .value=${btn.label ?? ""}
              @value-changed=${(ev: CustomEvent) =>
                this._subButtonChanged(index, { label: ev.detail.value || undefined })}
            ></ha-selector>

            <ha-form
              .hass=${this.hass}
              .data=${btn}
              .schema=${[
                { name: "show_icon",  label: "Show Icon",       selector: { boolean: {} } },
                { name: "show_label", label: "Show Label",      selector: { boolean: {} } },
                { name: "show_state", label: "Show State",      selector: { boolean: {} } },
                { name: "background", label: "Show Background", selector: { boolean: {} } },
              ]}
              .computeLabel=${(s: any) => s.label}
              @value-changed=${(ev: CustomEvent) => {
                this._subButtonChanged(index, {
                  show_icon:  ev.detail.value.show_icon,
                  show_label: ev.detail.value.show_label,
                  show_state: ev.detail.value.show_state,
                  background: ev.detail.value.background,
                });
              }}
            ></ha-form>

            <div class="sub-section-label">Colors &amp; Opacity</div>

            <div class="color-input-row">
              <label class="color-swatch" title="Open color picker">
                <div class="color-swatch-preview" style="background: ${btn.icon_color || "transparent"}"></div>
                <input
                  type="color"
                  class="hidden-color-input"
                  .value=${cssToHex(btn.icon_color ?? "")}
                  @change=${(ev: Event) =>
                    this._subButtonChanged(index, { icon_color: (ev.target as HTMLInputElement).value || undefined })}
                />
              </label>
              <ha-selector
                .hass=${this.hass}
                .label=${"Icon Color"}
                .selector=${{ text: {} }}
                .value=${btn.icon_color ?? ""}
                placeholder="e.g. #ff9800, var(--primary-color)"
                @value-changed=${(ev: CustomEvent) =>
                  this._subButtonChanged(index, { icon_color: ev.detail.value || undefined })}
              ></ha-selector>
            </div>

            <div class="color-input-row">
              <label class="color-swatch" title="Open color picker">
                <div class="color-swatch-preview" style="background: ${btn.background_color || "transparent"}"></div>
                <input
                  type="color"
                  class="hidden-color-input"
                  .value=${cssToHex(btn.background_color ?? "")}
                  @change=${(ev: Event) =>
                    this._subButtonChanged(index, { background_color: (ev.target as HTMLInputElement).value || undefined })}
                />
              </label>
              <ha-selector
                .hass=${this.hass}
                .label=${"Background Color"}
                .selector=${{ text: {} }}
                .value=${btn.background_color ?? ""}
                placeholder="e.g. rgba(255,255,255,0.15)"
                @value-changed=${(ev: CustomEvent) =>
                  this._subButtonChanged(index, { background_color: ev.detail.value || undefined })}
              ></ha-selector>
            </div>

            <ha-selector
              .hass=${this.hass}
              .label=${"Button Opacity"}
              .selector=${OPACITY_SELECTOR}
              .value=${btn.opacity ?? 1}
              @value-changed=${(ev: CustomEvent) =>
                this._subButtonChanged(index, { opacity: ev.detail.value })}
            ></ha-selector>

            ${showPosition ? html`
              <div class="sub-section-label">Position</div>
              <ha-selector
                .hass=${this.hass}
                .label=${"Position"}
                .selector=${{ select: { options: SUB_BUTTON_POSITION_OPTIONS, mode: "dropdown" } }}
                .value=${btn.position ?? "bottom-left"}
                @value-changed=${(ev: CustomEvent) =>
                  this._subButtonChanged(index, { position: ev.detail.value })}
              ></ha-selector>
            ` : nothing}

            <div class="sub-section-label">Actions</div>
            <ha-selector
              .hass=${this.hass}
              .label=${"Tap Action"}
              .selector=${{ ui_action: {} }}
              .value=${btn.tap_action ?? { action: "toggle" }}
              @value-changed=${(ev: CustomEvent) =>
                this._subButtonChanged(index, { tap_action: ev.detail.value })}
            ></ha-selector>
            <ha-selector
              .hass=${this.hass}
              .label=${"Hold Action"}
              .selector=${{ ui_action: {} }}
              .value=${btn.hold_action ?? { action: "more-info" }}
              @value-changed=${(ev: CustomEvent) =>
                this._subButtonChanged(index, { hold_action: ev.detail.value })}
            ></ha-selector>
            <ha-selector
              .hass=${this.hass}
              .label=${"Double-Tap Action"}
              .selector=${{ ui_action: {} }}
              .value=${btn.double_tap_action ?? { action: "none" }}
              @value-changed=${(ev: CustomEvent) =>
                this._subButtonChanged(index, { double_tap_action: ev.detail.value })}
            ></ha-selector>
          </div>
        ` : nothing}
      </div>
    `;
  }

  // ── Styles ────────────────────────────────────────────────────────────────────

  static get styles() {
    return css`
      :host { display: block; }

      .loading {
        padding: 16px;
        color: var(--secondary-text-color);
      }

      .section-header {
        font-size: 13px;
        font-weight: 600;
        color: var(--primary-text-color);
        padding: 16px 16px 4px;
        border-top: 1px solid var(--divider-color);
        margin-top: 8px;
      }

      .section-header:first-child {
        border-top: none;
        margin-top: 0;
      }

      .section-body {
        padding: 4px 16px 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .two-col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        align-items: start;
      }

      /* ── Template field row ── */
      .field-row {
        display: flex;
        align-items: flex-start;
        gap: 6px;
      }

      .field-input {
        flex: 1;
        min-width: 0;
      }

      .field-input textarea {
        width: 100%;
        min-height: 56px;
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--secondary-background-color, #f5f5f5);
        color: var(--primary-text-color);
        font-family: monospace;
        font-size: 12px;
        resize: vertical;
        box-sizing: border-box;
      }

      .helper-text {
        font-size: 10px;
        color: var(--secondary-text-color);
        margin-top: 2px;
      }

      .template-toggle {
        margin-top: 8px;
        padding: 2px 6px;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: transparent;
        color: var(--secondary-text-color);
        flex-shrink: 0;
      }

      .template-toggle.active {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }

      /* ── Color swatch + input ── */
      .color-input-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .color-input-row ha-selector {
        flex: 1;
        min-width: 0;
      }

      .color-swatch {
        width: 40px;
        height: 40px;
        border-radius: 6px;
        border: 1px solid var(--divider-color);
        overflow: hidden;
        flex-shrink: 0;
        cursor: pointer;
        display: block;
        position: relative;
      }

      /* Checkerboard behind the swatch so transparent shows clearly */
      .color-swatch::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
                          linear-gradient(-45deg, #ccc 25%, transparent 25%),
                          linear-gradient(45deg, transparent 75%, #ccc 75%),
                          linear-gradient(-45deg, transparent 75%, #ccc 75%);
        background-size: 8px 8px;
        background-position: 0 0, 0 4px, 4px -4px, -4px 0;
        background-color: #fff;
      }

      .color-swatch-preview {
        position: absolute;
        inset: 0;
        z-index: 1;
      }

      .hidden-color-input {
        position: absolute;
        inset: 0;
        z-index: 2;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        padding: 0;
        border: none;
      }

      /* ── Warning ── */
      .warning-box {
        background: color-mix(in srgb, var(--warning-color, #ff9800) 20%, transparent);
        border: 1px solid var(--warning-color, #ff9800);
        color: var(--primary-text-color);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        line-height: 1.4;
      }

      /* ── Sub-button editor ── */
      .sub-button-row {
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        overflow: hidden;
      }

      .sub-button-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        cursor: pointer;
        background: var(--secondary-background-color, #f5f5f5);
      }

      .sub-button-header:hover {
        background: var(--primary-background-color, #fff);
      }

      .sub-button-header .sub-button-label {
        flex: 1;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .sub-button-body {
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: var(--primary-background-color, #fff);
      }

      .sub-section-label {
        font-size: 11px;
        font-weight: 600;
        color: var(--secondary-text-color);
        margin-top: 4px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      /* ── Buttons ── */
      .delete-button,
      .add-button,
      .clear-button {
        cursor: pointer;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        padding: 4px 10px;
        font-size: 12px;
        background: transparent;
        color: var(--primary-text-color);
      }

      .delete-button {
        color: var(--error-color, #db4437);
        border-color: var(--error-color, #db4437);
        padding: 2px 6px;
      }

      .add-button {
        align-self: flex-start;
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }

      .clear-button {
        align-self: flex-start;
      }
    `;
  }
}
