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
  { value: "custom",        label: "Custom (% recommended for responsive)" },
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
  { value: "custom",        label: "Custom (% recommended for responsive)" },
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
  { value: "custom",       label: "Custom" },
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
  { value: "grid",         label: "Grid" },
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

type TabId = "basic" | "icon" | "card" | "buttons" | "actions";

// ── Helpers ───────────────────────────────────────────────────────────────────

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
  @state() private _activeTab: TabId = "basic";

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
      state_based_color: false,
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

  /** Color swatch + text input.
   *  Template button lives in the header row next to the label so it aligns with
   *  the label text, not the bottom of the composite field.
   *  Pass showLabel=false when a section-label already provides the same context. */
  private _renderColorField(
    fieldKey: string,
    label: string,
    placeholder = "e.g. red, #ff0000, var(--primary-color)",
    showLabel = true
  ) {
    const isTemplateCapable = TEMPLATE_CAPABLE_FIELDS.has(fieldKey);
    const currentValue = (this._config?.[fieldKey as keyof CardConfig] as string) ?? "";
    const inTemplateMode = isTemplateCapable && this._templateMode.has(fieldKey);

    return html`
      <div class="color-field">
        ${showLabel || isTemplateCapable ? html`
          <div class="color-field-header">
            ${showLabel ? html`<span class="color-field-label">${label}</span>` : nothing}
            ${isTemplateCapable ? html`
              <button
                class="tmpl-btn ${inTemplateMode ? "active" : ""}"
                title="${inTemplateMode
                  ? "Jinja2 template active — click to switch back to simple input"
                  : "Click to enter a Jinja2 template (e.g. {{ states('sensor.temp') }})"}"
                @click=${() => this._toggleTemplateMode(fieldKey)}
              ><ha-icon icon="mdi:code-braces" class="tmpl-icon"></ha-icon></button>
            ` : nothing}
          </div>
        ` : nothing}

        ${inTemplateMode
          ? html`
              <textarea
                .value=${currentValue}
                placeholder="{{ states('sensor.example') }}"
                @change=${(ev: Event) => this._fieldChanged(fieldKey, (ev.target as HTMLTextAreaElement).value)}
                @input=${(ev: Event) => this._fieldChanged(fieldKey, (ev.target as HTMLTextAreaElement).value)}
              ></textarea>
              <div class="hint">HA Jinja2 template</div>
            `
          : html`
              <div class="color-row">
                <label class="color-btn" title="Click to open color picker">
                  <div class="color-checker"></div>
                  <div class="color-fill" style="background: ${currentValue || "transparent"}"></div>
                  <ha-icon icon="mdi:eyedropper-variant" class="color-icon"></ha-icon>
                  <input
                    type="color"
                    class="color-native"
                    .value=${cssToHex(currentValue)}
                    @change=${(ev: Event) =>
                      this._fieldChanged(fieldKey, (ev.target as HTMLInputElement).value || undefined)}
                  />
                </label>
                <input
                  type="text"
                  class="color-text-input"
                  .value=${currentValue}
                  placeholder=${placeholder}
                  @change=${(ev: Event) =>
                    this._fieldChanged(fieldKey, (ev.target as HTMLInputElement).value || undefined)}
                  @input=${(ev: Event) =>
                    this._fieldChanged(fieldKey, (ev.target as HTMLInputElement).value || undefined)}
                />
              </div>
            `}
      </div>
    `;
  }

  /** Same color field but reads from SubButtonConfig (not top-level CardConfig). */
  private _renderSubBtnColorField(
    btn: SubButtonConfig,
    index: number,
    field: "icon_color" | "icon_color_on" | "icon_color_off" | "background_color",
    label: string,
    placeholder = "e.g. #ff9800, var(--primary-color)"
  ) {
    const currentValue = (btn[field] as string | undefined) ?? "";
    return html`
      <div class="color-field">
        <span class="color-field-label">${label}</span>
        <div class="color-row">
          <label class="color-btn" title="Click to open color picker">
            <div class="color-checker"></div>
            <div class="color-fill" style="background: ${currentValue || "transparent"}"></div>
            <ha-icon icon="mdi:eyedropper-variant" class="color-icon"></ha-icon>
            <input
              type="color"
              class="color-native"
              .value=${cssToHex(currentValue)}
              @change=${(ev: Event) =>
                this._subButtonChanged(index, { [field]: (ev.target as HTMLInputElement).value || undefined })}
            />
          </label>
          <input
            type="text"
            class="color-text-input"
            .value=${currentValue}
            placeholder=${placeholder}
            @change=${(ev: Event) =>
              this._subButtonChanged(index, { [field]: (ev.target as HTMLInputElement).value || undefined })}
            @input=${(ev: Event) =>
              this._subButtonChanged(index, { [field]: (ev.target as HTMLInputElement).value || undefined })}
          />
        </div>
      </div>
    `;
  }

  private _renderTemplateField(fieldKey: string, label: string, renderWidget: () => unknown) {
    const inTemplateMode = this._templateMode.has(fieldKey);
    const currentValue = (this._config?.[fieldKey as keyof CardConfig] as string) ?? "";

    return html`
      <div class="template-row">
        <div class="template-input">
          ${inTemplateMode
            ? html`
                <textarea
                  .value=${currentValue}
                  placeholder="{{ states('sensor.example') }}"
                  @change=${(ev: Event) => this._fieldChanged(fieldKey, (ev.target as HTMLTextAreaElement).value)}
                  @input=${(ev: Event) => this._fieldChanged(fieldKey, (ev.target as HTMLTextAreaElement).value)}
                ></textarea>
                <div class="hint">HA Jinja2 template</div>
              `
            : renderWidget()}
        </div>
        <button
          class="tmpl-btn ${inTemplateMode ? "active" : ""}"
          title="${inTemplateMode
            ? "Jinja2 template active — click to switch back to simple input"
            : "Click to enter a Jinja2 template (e.g. {{ states('sensor.temp') }})"}"
          @click=${() => this._toggleTemplateMode(fieldKey)}
        ><ha-icon icon="mdi:code-braces" class="tmpl-icon"></ha-icon></button>
      </div>
    `;
  }

  private _renderOpacityField(fieldKey: string, label: string, defaultVal = 1) {
    const hint = "Use this slider for element opacity. For color transparency, add alpha to the color value instead (e.g. rgba(255,0,0,0.5)).";
    return html`
      <ha-selector
        .hass=${this.hass}
        .label=${label}
        .selector=${OPACITY_SELECTOR}
        .value=${(this._config?.[fieldKey as keyof CardConfig] as number) ?? defaultVal}
        title=${hint}
        @value-changed=${(ev: CustomEvent) => this._fieldChanged(fieldKey, ev.detail.value)}
      ></ha-selector>
    `;
  }

  private _renderNumField(fieldKey: string, label: string, min: number, max: number, step: number, defaultVal: number, suffix = "") {
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

  private _renderCoordFields(
    xKey: keyof CardConfig, yKey: keyof CardConfig,
    xLabel = "X (CSS)", yLabel = "Y (CSS)"
  ) {
    return html`
      <div class="two-col">
        <ha-selector .hass=${this.hass} .label=${xLabel}
          .selector=${{ text: {} }}
          .value=${(this._config?.[xKey] as string) ?? ""}
          .placeholder=${"e.g. 10px, 25%"}
          @value-changed=${(ev: CustomEvent) => this._fieldChanged(xKey as string, ev.detail.value || undefined)}
        ></ha-selector>
        <ha-selector .hass=${this.hass} .label=${yLabel}
          .selector=${{ text: {} }}
          .value=${(this._config?.[yKey] as string) ?? ""}
          .placeholder=${"e.g. 10px, 25%"}
          @value-changed=${(ev: CustomEvent) => this._fieldChanged(yKey as string, ev.detail.value || undefined)}
        ></ha-selector>
      </div>
      <div class="hint">Tip: use <code>%</code> values (e.g. <code>25%</code>) for positions that adapt to card size. Fixed <code>px</code> values stay constant when the card is resized.</div>
    `;
  }

  // ── Tab bar ──────────────────────────────────────────────────────────────────

  private _renderTabBar() {
    const tabs: Array<{ id: TabId; label: string }> = [
      { id: "basic",   label: "Basic" },
      { id: "icon",    label: "Icon" },
      { id: "card",    label: "Card" },
      { id: "buttons", label: "Buttons" },
      { id: "actions", label: "Actions" },
    ];

    return html`
      <div class="tab-bar">
        ${tabs.map(t => html`
          <button
            class="tab ${this._activeTab === t.id ? "active" : ""}"
            @click=${() => { this._activeTab = t.id; }}
          >${t.label}</button>
        `)}
      </div>
    `;
  }

  // ── Tab content ───────────────────────────────────────────────────────────────

  private _renderBasicTab() {
    const c = this._config!;
    return html`
      <div class="section">
        <div class="section-label">Entity</div>
        <ha-entity-picker
          .hass=${this.hass}
          .label=${"Entity (optional)"}
          .value=${c.entity ?? ""}
          allow-custom-entity
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("entity", ev.detail.value || undefined)}
        ></ha-entity-picker>
      </div>

      <div class="section">
        <div class="section-label">Title</div>
        ${this._renderTemplateField("title", "Title",
          () => html`
            <ha-selector .hass=${this.hass} .label=${"Title"}
              .selector=${{ text: {} }}
              .value=${c.title ?? ""}
              .placeholder=${"Room name, or leave blank to hide"}
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("title", ev.detail.value || undefined)}
            ></ha-selector>
          `
        )}

        <ha-selector .hass=${this.hass} .label=${"Position"}
          .selector=${{ select: { options: TITLE_POSITION_OPTIONS, mode: "dropdown" } }}
          .value=${c.title_position ?? ""}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("title_position", ev.detail.value as IconPosition || undefined)}
        ></ha-selector>

        ${c.title_position === "custom"
          ? this._renderCoordFields("title_position_x", "title_position_y", "X offset", "Y offset")
          : nothing}

        ${!c.title_position ? html`
          <ha-selector .hass=${this.hass} .label=${"Text Alignment"}
            .selector=${{ select: { options: TITLE_ALIGN_OPTIONS, mode: "list" } }}
            .value=${c.title_align ?? "left"}
            @value-changed=${(ev: CustomEvent) =>
              this._fieldChanged("title_align", ev.detail.value as TitleAlign || undefined)}
          ></ha-selector>
        ` : nothing}

        <div class="two-col">
          ${this._renderNumField("title_font_size", "Font Size", 8, 48, 1, 14, "px")}
          ${this._renderColorField("title_color", "Title Color", "e.g. white, #ffffff")}
        </div>
      </div>

      <div class="section">
        <div class="section-label">Icon</div>
        ${this._renderTemplateField("icon", "Icon",
          () => html`
            <ha-icon-picker .hass=${this.hass} .label=${"Icon"}
              .value=${c.icon ?? ""}
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("icon", ev.detail.value || undefined)}
            ></ha-icon-picker>
          `
        )}
      </div>
    `;
  }

  private _renderIconTab() {
    const c = this._config!;
    return html`
      <!-- ── Icon color ── -->
      <div class="section">
        <div class="section-label">Icon Color</div>
        ${this._renderColorField("icon_color", "Icon Color", undefined, false)}

        <ha-form
          .hass=${this.hass}
          .data=${{ state_based_color: c.state_based_color ?? false }}
          .schema=${[{ name: "state_based_color", label: "Auto-color by entity state", selector: { boolean: {} } }]}
          .computeLabel=${(s: any) => s.label}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("state_based_color", ev.detail.value.state_based_color)}
        ></ha-form>

        ${c.state_based_color ? html`
          <div class="hint">When active (on/open/playing/home): uses the color below or a domain default (yellow for lights). When inactive: uses the off-color or falls back to Icon Color.</div>
          ${this._renderColorField("icon_color_on",  "Active Color (on/open/playing)", "e.g. #FDD835, yellow")}
          ${this._renderColorField("icon_color_off", "Inactive Color (off/closed)",   "e.g. #888888, grey")}
        ` : nothing}

        <ha-selector .hass=${this.hass} .label=${"Icon Opacity"}
          .selector=${OPACITY_SELECTOR} .value=${c.icon_opacity ?? 1}
          @value-changed=${(ev: CustomEvent) => this._fieldChanged("icon_opacity", ev.detail.value)}
        ></ha-selector>
      </div>

      <!-- ── Icon background ── -->
      <div class="section">
        <div class="section-label">Icon Background</div>
        <ha-selector .hass=${this.hass} .label=${"Shape"}
          .selector=${{ select: { options: ICON_SHAPE_OPTIONS, mode: "dropdown" } }}
          .value=${c.icon_background_shape ?? "circle"}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("icon_background_shape", ev.detail.value as IconBackgroundShape || undefined)}
        ></ha-selector>

        <ha-selector .hass=${this.hass} .label=${"Custom Border Radius (CSS — overrides shape)"}
          .selector=${{ text: {} }}
          .value=${c.icon_background_border_radius ?? ""}
          .placeholder=${"e.g. 10px 20px 30px 40px, 50% 0"}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("icon_background_border_radius", ev.detail.value || undefined)}
        ></ha-selector>

        ${this._renderColorField("icon_background_color", "Background Color")}

        <ha-selector .hass=${this.hass} .label=${"Background Opacity"}
          .selector=${OPACITY_SELECTOR} .value=${c.icon_background_opacity ?? 1}
          @value-changed=${(ev: CustomEvent) => this._fieldChanged("icon_background_opacity", ev.detail.value)}
        ></ha-selector>

        <div class="two-col">
          ${this._renderNumField("icon_size", "Icon Size", 8, 120, 2, 24, "px")}
          ${this._renderNumField("icon_background_size", "Background Size", 8, 160, 2, 40, "px")}
        </div>

        <div class="hint">Width/Height override Background Size for non-square backgrounds.</div>
        <div class="two-col">
          ${this._renderNumField("icon_background_width",  "Width",  8, 200, 2, c.icon_background_size ?? 40, "px")}
          ${this._renderNumField("icon_background_height", "Height", 8, 200, 2, c.icon_background_size ?? 40, "px")}
        </div>

        <ha-selector .hass=${this.hass} .label=${"Background Position (independent of icon)"}
          .selector=${{ select: { options: ICON_POSITION_OPTIONS, mode: "dropdown" } }}
          .value=${c.icon_background_position ?? ""}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("icon_background_position", ev.detail.value as IconPosition || undefined)}
        ></ha-selector>
        ${c.icon_background_position === "custom"
          ? this._renderCoordFields("icon_background_position_x", "icon_background_position_y", "X offset", "Y offset")
          : nothing}
        ${c.icon_background_position ? html`
          <div class="hint">The background shape renders at this position; the icon renders at its own position below with no background behind it.</div>
        ` : nothing}
      </div>

      <!-- ── Icon position ── -->
      <div class="section">
        <div class="section-label">Icon Position</div>
        <ha-selector .hass=${this.hass} .label=${"Position"}
          .selector=${{ select: { options: ICON_POSITION_OPTIONS, mode: "dropdown" } }}
          .value=${c.icon_position ?? ""}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("icon_position", ev.detail.value as IconPosition || undefined)}
        ></ha-selector>
        ${c.icon_position === "custom"
          ? this._renderCoordFields("icon_position_x", "icon_position_y", "X offset", "Y offset")
          : nothing}
        <div class="hint">Size fields accept whole numbers (px applied automatically). Coordinate fields accept any CSS value — use <code>%</code> for responsive positioning or <code>px</code> for fixed.</div>
      </div>

      <!-- ── Badge ── -->
      <div class="section">
        <div class="section-label">Badge</div>
        ${this._renderTemplateField("badge_icon", "Badge Icon",
          () => html`
            <ha-icon-picker .hass=${this.hass} .label=${"Badge Icon (blank to hide)"}
              .value=${c.badge_icon ?? ""}
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("badge_icon", ev.detail.value || undefined)}
            ></ha-icon-picker>
          `
        )}

        ${this._renderColorField("badge_color", "Badge Icon Color")}
        ${this._renderColorField("badge_background_color", "Badge Background Color")}

        <div class="two-col">
          ${this._renderNumField("badge_size", "Badge Size", 8, 48, 1, 18, "px")}
          <ha-selector .hass=${this.hass} .label=${"Opacity"}
            .selector=${OPACITY_SELECTOR} .value=${c.badge_opacity ?? 1}
            @value-changed=${(ev: CustomEvent) => this._fieldChanged("badge_opacity", ev.detail.value)}
          ></ha-selector>
        </div>

        <ha-selector .hass=${this.hass} .label=${"Badge Position"}
          .selector=${{ select: { options: BADGE_POSITION_OPTIONS, mode: "dropdown" } }}
          .value=${c.badge_position ?? "top-right"}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("badge_position", ev.detail.value as BadgePosition || undefined)}
        ></ha-selector>
        ${c.badge_position === "custom" ? html`
          <div class="two-col">
            <ha-selector .hass=${this.hass} .label=${"X (CSS)"} .selector=${{ text: {} }}
              .value=${c.badge_position_x ?? ""} .placeholder=${"e.g. 10px"}
              @value-changed=${(ev: CustomEvent) => this._fieldChanged("badge_position_x", ev.detail.value || undefined)}
            ></ha-selector>
            <ha-selector .hass=${this.hass} .label=${"Y (CSS)"} .selector=${{ text: {} }}
              .value=${c.badge_position_y ?? ""} .placeholder=${"e.g. 10px"}
              @value-changed=${(ev: CustomEvent) => this._fieldChanged("badge_position_y", ev.detail.value || undefined)}
            ></ha-selector>
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _renderCardTab() {
    const c = this._config!;
    return html`
      <!-- ── Background ── -->
      <div class="section">
        <div class="section-label">Background</div>
        ${this._renderColorField("background_color", "Background Color", undefined, false)}
        <ha-selector .hass=${this.hass} .label=${"Opacity"}
          .selector=${OPACITY_SELECTOR} .value=${c.background_opacity ?? 1}
          @value-changed=${(ev: CustomEvent) => this._fieldChanged("background_opacity", ev.detail.value)}
        ></ha-selector>
        <ha-selector .hass=${this.hass} .label=${"Image URL (or type 'area' to use room picture)"}
          .selector=${{ text: {} }} .value=${c.background_image ?? ""}
          .placeholder=${"e.g. /local/room.jpg   or   area"}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("background_image", ev.detail.value || undefined)}
        ></ha-selector>

        ${c.background_image ? html`
          <ha-selector .hass=${this.hass} .label=${"Image Position (CSS background-position)"}
            .selector=${{ text: {} }} .value=${c.background_image_position ?? ""}
            .placeholder=${"e.g. center, top right, 75% 25%"}
            @value-changed=${(ev: CustomEvent) =>
              this._fieldChanged("background_image_position", ev.detail.value || undefined)}
          ></ha-selector>
        ` : nothing}
      </div>

      <!-- ── Hover highlight ── -->
      <div class="section">
        <div class="section-label">Interaction</div>
        <ha-form
          .hass=${this.hass}
          .data=${{ hover_highlight: c.hover_highlight ?? true }}
          .schema=${[{
            name: "hover_highlight",
            label: "Show hover highlight (ripple overlay on mouse-over)",
            selector: { boolean: {} },
          }]}
          .computeLabel=${(s: any) => s.label}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("hover_highlight", ev.detail.value.hover_highlight)}
        ></ha-form>
        <div class="hint">When enabled, a subtle white overlay appears on hover. Enabled by default when a Global Action is configured.</div>
      </div>

      <!-- ── Border ── -->
      <div class="section">
        <div class="section-label">Border</div>
        ${this._renderColorField("border_color", "Border Color", undefined, false)}
        <ha-selector .hass=${this.hass} .label=${"Opacity"}
          .selector=${OPACITY_SELECTOR} .value=${c.border_opacity ?? 1}
          @value-changed=${(ev: CustomEvent) => this._fieldChanged("border_opacity", ev.detail.value)}
        ></ha-selector>
      </div>

      <!-- ── Grid sizing ── -->
      <div class="section">
        <div class="section-label">Grid Sizing (Sections Dashboard)</div>
        <div class="two-col">
          <ha-selector .hass=${this.hass} .label=${"Columns"}
            .selector=${{ number: { min: 1, max: 12, step: 1, mode: "box" } }}
            .value=${c.grid_options?.columns ?? 6}
            @value-changed=${(ev: CustomEvent) => this._gridFieldChanged("columns", ev.detail.value)}
          ></ha-selector>
          <ha-selector .hass=${this.hass} .label=${"Rows"}
            .selector=${{ number: { min: 1, max: 6, step: 1, mode: "box" } }}
            .value=${c.grid_options?.rows ?? 2}
            @value-changed=${(ev: CustomEvent) => this._gridFieldChanged("rows", ev.detail.value)}
          ></ha-selector>
        </div>
      </div>
    `;
  }

  private _renderButtonsTab() {
    const c = this._config!;
    const layout = c.sub_buttons_layout ?? "bottom-row";

    return html`
      <!-- ── Layout ── -->
      <div class="section">
        <div class="section-label">Layout</div>
        <ha-selector .hass=${this.hass} .label=${"Layout"}
          .selector=${{ select: { options: SUB_BUTTON_LAYOUT_OPTIONS, mode: "dropdown" } }}
          .value=${layout}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("sub_buttons_layout", ev.detail.value as SubButtonsLayout)}
        ></ha-selector>

        ${layout === "grid" ? html`
          <div class="two-col">
            <ha-selector .hass=${this.hass} .label=${"Columns (0 = auto-fill)"}
              .selector=${{ number: { min: 0, max: 8, step: 1, mode: "box" } }}
              .value=${c.sub_buttons_grid_columns ?? 0}
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("sub_buttons_grid_columns", ev.detail.value || undefined)}
            ></ha-selector>
            <ha-selector .hass=${this.hass} .label=${"Cell Min Width"}
              .selector=${{ number: { min: 32, max: 200, step: 4, mode: "box", unit_of_measurement: "px" } }}
              .value=${c.sub_buttons_grid_min_width ?? 56}
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("sub_buttons_grid_min_width", ev.detail.value)}
            ></ha-selector>
          </div>
        ` : nothing}
      </div>

      <!-- ── Global style ── -->
      <div class="section">
        <div class="section-label">Global Button Style</div>
        ${this._renderColorField("sub_button_icon_color", "Icon Color (default for all)")}
        ${this._renderColorField("sub_button_background_color", "Background Color (default for all)")}
        <div class="two-col">
          <ha-selector .hass=${this.hass} .label=${"Opacity"}
            .selector=${OPACITY_SELECTOR} .value=${c.sub_button_opacity ?? 1}
            @value-changed=${(ev: CustomEvent) => this._fieldChanged("sub_button_opacity", ev.detail.value)}
          ></ha-selector>
          <ha-selector .hass=${this.hass} .label=${"Button Gap"}
            .selector=${{ number: { min: 0, max: 32, step: 1, mode: "box", unit_of_measurement: "px" } }}
            .value=${c.sub_button_gap ?? 6}
            @value-changed=${(ev: CustomEvent) => this._fieldChanged("sub_button_gap", ev.detail.value)}
          ></ha-selector>
        </div>
      </div>

      <!-- ── Individual buttons ── -->
      <div class="section">
        <div class="section-label">Buttons</div>
        ${(c.sub_buttons ?? []).map((btn, i) => this._renderSubButtonRow(btn, i))}
        <button class="add-btn" @click=${this._addSubButton}>+ Add Button</button>
      </div>
    `;
  }

  private _renderActionsTab() {
    const c = this._config!;
    return html`
      <div class="section">
        <div class="section-label">Global Action</div>
        <div class="warning-box">
          When a global action is set, all sub-button tap/hold/double-tap actions are disabled.
          Sub-buttons become non-interactive decorations and the entire card is a single tap target.
        </div>

        <ha-selector .hass=${this.hass} .label=${"Tap Action"}
          .selector=${{ ui_action: {} }}
          .value=${c.global_action?.tap_action ?? { action: "none" }}
          @value-changed=${(ev: CustomEvent) =>
            this._globalActionFieldChanged("tap_action", ev.detail.value)}
        ></ha-selector>
        <ha-selector .hass=${this.hass} .label=${"Hold Action"}
          .selector=${{ ui_action: {} }}
          .value=${c.global_action?.hold_action ?? { action: "none" }}
          @value-changed=${(ev: CustomEvent) =>
            this._globalActionFieldChanged("hold_action", ev.detail.value)}
        ></ha-selector>
        <ha-selector .hass=${this.hass} .label=${"Double-Tap Action"}
          .selector=${{ ui_action: {} }}
          .value=${c.global_action?.double_tap_action ?? { action: "none" }}
          @value-changed=${(ev: CustomEvent) =>
            this._globalActionFieldChanged("double_tap_action", ev.detail.value)}
        ></ha-selector>

        <button class="clear-btn"
          @click=${() => {
            const cfg = { ...this._config! };
            delete cfg.global_action;
            this._fireConfigChanged(cfg);
          }}
        >Clear Global Action</button>
      </div>
    `;
  }

  // ── Sub-button row ────────────────────────────────────────────────────────────

  private _renderSubButtonRow(btn: SubButtonConfig, index: number) {
    const isExpanded = this._expandedSubButton === index;
    const label = btn.entity ?? btn.label ?? btn.icon ?? `Sub-button ${index + 1}`;
    const layout = this._config?.sub_buttons_layout ?? "bottom-row";
    const showPosition = layout === "custom";

    return html`
      <div class="sub-btn-row">
        <div class="sub-btn-header"
          @click=${() => (this._expandedSubButton = isExpanded ? null : index)}
        >
          <ha-icon .icon=${btn.icon ?? "mdi:gesture-tap"}></ha-icon>
          <span class="sub-btn-label">${label}</span>
          <ha-icon .icon=${isExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
          <button class="del-btn"
            @click=${(ev: Event) => { ev.stopPropagation(); this._deleteSubButton(index); }}
          >✕</button>
        </div>

        ${isExpanded ? html`
          <div class="sub-btn-body">
            <!-- Entity & display -->
            <div class="sub-group-label">Entity &amp; Display</div>

            <ha-entity-picker .hass=${this.hass} .label=${"Entity"}
              .value=${btn.entity ?? ""} allow-custom-entity
              @value-changed=${(ev: CustomEvent) =>
                this._subButtonChanged(index, { entity: ev.detail.value || undefined })}
            ></ha-entity-picker>

            <ha-icon-picker .hass=${this.hass}
              .label=${"Icon (blank = auto-pick from entity domain)"}
              .value=${btn.icon ?? ""}
              @value-changed=${(ev: CustomEvent) =>
                this._subButtonChanged(index, { icon: ev.detail.value || undefined })}
            ></ha-icon-picker>

            <ha-selector .hass=${this.hass}
              .label=${"Label (blank to hide, or type 'entity' for entity name)"}
              .selector=${{ text: {} }} .value=${btn.label ?? ""}
              @value-changed=${(ev: CustomEvent) =>
                this._subButtonChanged(index, { label: ev.detail.value || undefined })}
            ></ha-selector>

            <ha-form .hass=${this.hass} .data=${btn}
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

            <!-- Color & opacity -->
            <div class="sub-group-label">Color &amp; Opacity</div>

            <ha-form .hass=${this.hass}
              .data=${{ state_based_color: btn.state_based_color ?? false }}
              .schema=${[{ name: "state_based_color", label: "Auto-color by entity state", selector: { boolean: {} } }]}
              .computeLabel=${(s: any) => s.label}
              @value-changed=${(ev: CustomEvent) =>
                this._subButtonChanged(index, { state_based_color: ev.detail.value.state_based_color })}
            ></ha-form>

            ${btn.state_based_color ? html`
              <div class="hint">Active when entity is on/open/home/playing. Defaults to domain color (yellow for lights) if left blank.</div>
              ${this._renderSubBtnColorField(btn, index, "icon_color_on",  "Active Icon Color")}
              ${this._renderSubBtnColorField(btn, index, "icon_color_off", "Inactive Icon Color")}
            ` : html`
              ${this._renderSubBtnColorField(btn, index, "icon_color", "Icon Color")}
            `}

            ${this._renderSubBtnColorField(btn, index, "background_color", "Background Color", "e.g. rgba(255,255,255,0.15)")}

            <ha-selector .hass=${this.hass} .label=${"Button Opacity"}
              .selector=${OPACITY_SELECTOR} .value=${btn.opacity ?? 1}
              @value-changed=${(ev: CustomEvent) =>
                this._subButtonChanged(index, { opacity: ev.detail.value })}
            ></ha-selector>

            ${showPosition ? html`
              <div class="sub-group-label">Position</div>
              <ha-selector .hass=${this.hass} .label=${"Position"}
                .selector=${{ select: { options: SUB_BUTTON_POSITION_OPTIONS, mode: "dropdown" } }}
                .value=${btn.position ?? "bottom-left"}
                @value-changed=${(ev: CustomEvent) =>
                  this._subButtonChanged(index, { position: ev.detail.value })}
              ></ha-selector>
            ` : nothing}

            <!-- Actions -->
            <div class="sub-group-label">Actions</div>
            <ha-selector .hass=${this.hass} .label=${"Tap Action"}
              .selector=${{ ui_action: {} }} .value=${btn.tap_action ?? { action: "toggle" }}
              @value-changed=${(ev: CustomEvent) =>
                this._subButtonChanged(index, { tap_action: ev.detail.value })}
            ></ha-selector>
            <ha-selector .hass=${this.hass} .label=${"Hold Action"}
              .selector=${{ ui_action: {} }} .value=${btn.hold_action ?? { action: "more-info" }}
              @value-changed=${(ev: CustomEvent) =>
                this._subButtonChanged(index, { hold_action: ev.detail.value })}
            ></ha-selector>
            <ha-selector .hass=${this.hass} .label=${"Double-Tap Action"}
              .selector=${{ ui_action: {} }} .value=${btn.double_tap_action ?? { action: "none" }}
              @value-changed=${(ev: CustomEvent) =>
                this._subButtonChanged(index, { double_tap_action: ev.detail.value })}
            ></ha-selector>
          </div>
        ` : nothing}
      </div>
    `;
  }

  // ── Main render ───────────────────────────────────────────────────────────────

  protected render() {
    if (!this._loaded || !this._config) {
      return html`<div class="loading">Loading editor…</div>`;
    }

    return html`
      ${this._renderTabBar()}
      <div class="tab-content">
        ${this._activeTab === "basic"   ? this._renderBasicTab()   : nothing}
        ${this._activeTab === "icon"    ? this._renderIconTab()    : nothing}
        ${this._activeTab === "card"    ? this._renderCardTab()    : nothing}
        ${this._activeTab === "buttons" ? this._renderButtonsTab() : nothing}
        ${this._activeTab === "actions" ? this._renderActionsTab() : nothing}
      </div>
    `;
  }

  // ── Styles ────────────────────────────────────────────────────────────────────

  static get styles() {
    return css`
      :host { display: block; }

      .loading { padding: 16px; color: var(--secondary-text-color); }

      /* ── Tab bar ── */
      .tab-bar {
        display: flex;
        overflow-x: auto;
        scrollbar-width: none;
        border-bottom: 2px solid var(--divider-color);
        background: var(--card-background-color, #fff);
        padding: 0 4px;
        position: sticky;
        top: 0;
        z-index: 10;
      }

      .tab-bar::-webkit-scrollbar { display: none; }

      .tab {
        flex-shrink: 0;
        padding: 10px 14px;
        border: none;
        background: transparent;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        color: var(--secondary-text-color);
        border-bottom: 2px solid transparent;
        margin-bottom: -2px;
        white-space: nowrap;
        transition: color 0.15s, border-color 0.15s;
      }

      .tab:hover { color: var(--primary-text-color); }

      .tab.active {
        color: var(--primary-color);
        border-bottom-color: var(--primary-color);
      }

      /* ── Tab content ── */
      .tab-content {
        padding: 0 0 16px;
      }

      /* ── Section ── */
      .section {
        padding: 12px 16px 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        border-top: 1px solid var(--divider-color);
      }

      .section:first-child { border-top: none; }

      .section-label {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--secondary-text-color);
        padding-bottom: 2px;
      }

      /* ── Layout helpers ── */
      .two-col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        align-items: start;
      }

      .hint {
        font-size: 11px;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }

      .hint code {
        font-family: monospace;
        background: var(--secondary-background-color, #f0f0f0);
        padding: 1px 4px;
        border-radius: 3px;
      }

      /* ── Template field ── */
      .template-row {
        display: flex;
        align-items: flex-start;
        gap: 6px;
      }

      .template-input { flex: 1; min-width: 0; }

      .template-input textarea {
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

      .tmpl-btn {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        background: transparent;
        color: var(--secondary-text-color);
        flex-shrink: 0;
        transition: background 0.15s, color 0.15s, border-color 0.15s;
      }

      /* In a plain template-row (non-color fields), align to the bottom of the input */
      .template-row .tmpl-btn {
        align-self: flex-end;
      }

      /* Inside color-field-header, natural flow alignment is correct */
      .color-field-header .tmpl-btn {
        align-self: center;
      }

      .tmpl-btn:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
      }

      .tmpl-btn.active {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }

      .tmpl-icon {
        --mdc-icon-size: 16px;
      }

      /* ── Color field: label above, swatch + native input below ── */
      .color-field {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      /* Header row: label on left, template button on right */
      .color-field-header {
        display: flex;
        align-items: center;
        gap: 8px;
        min-height: 20px;
      }

      .color-field-label {
        flex: 1;
        font-size: 12px;
        color: var(--secondary-text-color);
        padding-left: 2px;
        line-height: 1;
      }

      .color-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      /* Native text input styled to match HA filled-variant text fields */
      .color-text-input {
        flex: 1;
        min-width: 0;
        height: 48px;
        padding: 0 12px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        border-radius: 4px;
        background: var(--input-fill-color, var(--secondary-background-color, rgba(0,0,0,0.06)));
        color: var(--primary-text-color);
        font-family: inherit;
        font-size: 14px;
        box-sizing: border-box;
        outline: none;
        transition: border-color 0.15s;
      }

      .color-text-input:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-color) 20%, transparent);
      }

      .color-text-input::placeholder {
        color: var(--secondary-text-color);
        opacity: 0.6;
      }

      .color-btn {
        position: relative;
        width: 48px;
        height: 48px;
        border-radius: 8px;
        border: 2px solid var(--divider-color);
        cursor: pointer;
        overflow: hidden;
        display: block;
        flex-shrink: 0;
        transition: border-color 0.15s, box-shadow 0.15s;
      }

      .color-btn:hover {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-color) 25%, transparent);
      }

      /* Checkerboard base (shows for transparent/empty) */
      .color-checker {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(45deg, #ccc 25%, transparent 25%),
          linear-gradient(-45deg, #ccc 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #ccc 75%),
          linear-gradient(-45deg, transparent 75%, #ccc 75%);
        background-size: 8px 8px;
        background-position: 0 0, 0 4px, 4px -4px, -4px 0;
        background-color: #fff;
      }

      /* Actual color fill on top of checkerboard */
      .color-fill {
        position: absolute;
        inset: 0;
        z-index: 1;
      }

      /* Eyedropper icon as affordance hint */
      .color-icon {
        position: absolute;
        bottom: 3px;
        right: 3px;
        z-index: 2;
        --mdc-icon-size: 12px;
        color: rgba(255, 255, 255, 0.95);
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8));
        pointer-events: none;
      }

      /* Transparent native color input covers the whole button */
      .color-native {
        position: absolute;
        inset: 0;
        z-index: 3;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        padding: 0;
        border: none;
      }

      /* ── Warning ── */
      .warning-box {
        background: color-mix(in srgb, var(--warning-color, #ff9800) 15%, transparent);
        border: 1px solid var(--warning-color, #ff9800);
        color: var(--primary-text-color);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        line-height: 1.4;
      }

      /* ── Sub-button accordion ── */
      .sub-btn-row {
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        overflow: hidden;
      }

      .sub-btn-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        cursor: pointer;
        background: var(--secondary-background-color, #f5f5f5);
        user-select: none;
      }

      .sub-btn-header:hover { background: var(--primary-background-color, #fff); }

      .sub-btn-label {
        flex: 1;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .sub-btn-body {
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: var(--primary-background-color, #fff);
      }

      .sub-group-label {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--secondary-text-color);
        margin-top: 4px;
        padding-top: 4px;
        border-top: 1px solid var(--divider-color);
      }

      /* ── Buttons ── */
      .del-btn {
        color: var(--error-color, #db4437);
        border: 1px solid var(--error-color, #db4437);
        border-radius: 4px;
        padding: 2px 6px;
        cursor: pointer;
        background: transparent;
        font-size: 12px;
        flex-shrink: 0;
      }

      .add-btn {
        align-self: flex-start;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 6px 12px;
        font-size: 13px;
        cursor: pointer;
      }

      .clear-btn {
        align-self: flex-start;
        background: transparent;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        padding: 6px 12px;
        font-size: 13px;
        cursor: pointer;
        color: var(--primary-text-color);
      }
    `;
  }
}
