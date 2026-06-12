import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  HomeAssistant, CardConfig, SubButtonConfig, SubButtonGroup,
  SubButtonsLayout, SubButtonGroupPosition, IconPosition, BadgePosition,
  IconBackgroundShape, CardShape, TitleAlign,
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

const CARD_SHAPE_OPTIONS = [
  { value: "",            label: "Default (from theme)" },
  { value: "square",      label: "Square (no rounding)" },
  { value: "rounded-sm",  label: "Rounded Small (8px)" },
  { value: "rounded",     label: "Rounded (12px)" },
  { value: "rounded-lg",  label: "Rounded Large (24px)" },
  { value: "pill",        label: "Pill (999px)" },
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

const ANIMATION_TYPE_OPTIONS = [
  { value: "none",   label: "None" },
  { value: "spin",   label: "Spin (continuous rotation)" },
  { value: "pulse",  label: "Pulse (scale breathe)" },
  { value: "blink",  label: "Blink (opacity flash)" },
  { value: "bounce", label: "Bounce (vertical hop)" },
  { value: "shake",  label: "Shake (horizontal wiggle)" },
];

const ANIMATION_WHEN_OPTIONS = [
  { value: "always",   label: "Always" },
  { value: "active",   label: "When entity is active (on/open/playing)" },
  { value: "inactive", label: "When entity is inactive (off/closed)" },
];

const ANIMATION_SPEED_OPTIONS = [
  { value: "slow",   label: "Slow" },
  { value: "normal", label: "Normal" },
  { value: "fast",   label: "Fast" },
];

const COLUMN_JUSTIFY_OPTIONS = [
  { value: "top",           label: "Top (default)" },
  { value: "center",        label: "Center" },
  { value: "bottom",        label: "Bottom" },
  { value: "space-between", label: "Space Between" },
  { value: "space-around",  label: "Space Around" },
];

const GROUP_POSITION_OPTIONS = [
  { value: "",               label: "Default (derived from layout)" },
  { value: "bottom-row",     label: "Full width — bottom edge" },
  { value: "top-row",        label: "Full width — top edge" },
  { value: "right-column",   label: "Full height — right side" },
  { value: "left-column",    label: "Full height — left side" },
  { value: "top-left",       label: "Top Left corner" },
  { value: "top-center",     label: "Top Center" },
  { value: "top-right",      label: "Top Right corner" },
  { value: "center-left",    label: "Center Left" },
  { value: "center",         label: "Center" },
  { value: "center-right",   label: "Center Right" },
  { value: "bottom-left",    label: "Bottom Left corner" },
  { value: "bottom-center",  label: "Bottom Center" },
  { value: "bottom-right",   label: "Bottom Right corner" },
  { value: "custom",         label: "Custom (X/Y coordinates)" },
];

const GRID_CELL_LAYOUT_OPTIONS = [
  { value: "vertical",   label: "Vertical — icon above label (default)" },
  { value: "horizontal", label: "Horizontal — icon beside label" },
];

const TEMPLATE_CAPABLE_FIELDS = new Set([
  "title", "icon", "icon_color", "icon_background_color",
  "badge_icon", "badge_color", "badge_background_color",
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
  @state() private _dragOverIndex: number | null = null;
  private _dragIndex: number | null = null;
  // Groups mode state
  @state() private _expandedGroup: number | null = null;
  @state() private _expandedGroupButton: Record<number, number | null> = {};
  private _dragGroupContext: number | null = null;

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

  private _onDragHandleMousedown(e: MouseEvent, index: number): void {
    const row = (e.currentTarget as Element).closest(".sub-btn-row") as HTMLElement | null;
    if (row) row.setAttribute("draggable", "true");
    this._dragIndex = index;
  }

  private _onDragStart(e: DragEvent, index: number): void {
    e.dataTransfer?.setData("text/plain", String(index));
    if (e.dataTransfer) e.dataTransfer.effectAllowed = "move";
    this._dragIndex = index;
  }

  private _onDragOver(e: DragEvent, index: number): void {
    if (this._dragIndex === null || this._dragIndex === index) return;
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    if (this._dragOverIndex !== index) this._dragOverIndex = index;
  }

  private _onDragLeave(index: number): void {
    if (this._dragOverIndex === index) this._dragOverIndex = null;
  }

  private _onDrop(e: DragEvent, toIndex: number): void {
    e.preventDefault();
    const fromIndex = this._dragIndex;
    this._dragIndex = null;
    this._dragOverIndex = null;
    if (fromIndex === null || fromIndex === toIndex || !this._config?.sub_buttons) return;
    const buttons = [...this._config.sub_buttons];
    const [moved] = buttons.splice(fromIndex, 1);
    buttons.splice(toIndex, 0, moved);
    this._fieldChanged("sub_buttons", buttons);
    this._expandedSubButton = null;
  }

  private _onDragEnd(e: DragEvent): void {
    (e.currentTarget as HTMLElement).removeAttribute("draggable");
    this._dragIndex = null;
    this._dragOverIndex = null;
  }

  private _toggleTemplateMode(field: string): void {
    const next = new Set(this._templateMode);
    next.has(field) ? next.delete(field) : next.add(field);
    this._templateMode = next;
  }

  // ── Render helpers ────────────────────────────────────────────────────────────

  /** Color swatch + native text input, with optional label and template toggle.
   *
   *  When showLabel=true (default): a header row shows the label, and the
   *  template button (if applicable) sits inline with the label at the right.
   *
   *  When showLabel=false: no header is rendered. If template-capable, the
   *  template button is placed inside the color-row itself (after the text input),
   *  so it's naturally center-aligned by the row's align-items:center. */
  private _renderColorField(
    fieldKey: string,
    label: string,
    placeholder = "e.g. red, #ff0000, var(--primary-color)",
    showLabel = true
  ) {
    const isTemplateCapable = TEMPLATE_CAPABLE_FIELDS.has(fieldKey);
    const currentValue = (this._config?.[fieldKey as keyof CardConfig] as string) ?? "";
    const inTemplateMode = isTemplateCapable && this._templateMode.has(fieldKey);

    const tmplBtn = isTemplateCapable ? html`
      <button
        class="tmpl-btn ${inTemplateMode ? "active" : ""}"
        title="${inTemplateMode
          ? "Jinja2 template active — click to switch back to simple input"
          : "Click to enter a Jinja2 template (e.g. {{ states('sensor.temp') }})"}"
        @click=${() => this._toggleTemplateMode(fieldKey)}
      ><ha-icon icon="mdi:code-braces" class="tmpl-icon"></ha-icon></button>
    ` : nothing;

    // Template-active state: label (optional) + textarea row + hint
    if (inTemplateMode) {
      return html`
        <div class="color-field">
          ${showLabel ? html`<span class="color-field-label">${label}</span>` : nothing}
          <div class="color-tmpl-row">
            <textarea
              .value=${currentValue}
              placeholder="{{ states('sensor.example') }}"
              @change=${(ev: Event) => this._fieldChanged(fieldKey, (ev.target as HTMLTextAreaElement).value)}
              @input=${(ev: Event) => this._fieldChanged(fieldKey, (ev.target as HTMLTextAreaElement).value)}
            ></textarea>
            ${tmplBtn}
          </div>
          <div class="hint">HA Jinja2 template</div>
        </div>
      `;
    }

    // Normal state: the template button always lives INSIDE the color-row so it
    // is vertically centered with the swatch and text input (align-items:center).
    return html`
      <div class="color-field">
        ${showLabel ? html`<span class="color-field-label">${label}</span>` : nothing}
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
          ${tmplBtn}
        </div>
      </div>
    `;
  }

  /** Generic color field with callback. Used by both sub-button and group color fields. */
  private _renderButtonColorField(
    currentValue: string,
    label: string,
    placeholder: string,
    onChange: (v: string | undefined) => void
  ) {
    return html`
      <div class="color-field">
        <span class="color-field-label">${label}</span>
        <div class="color-row">
          <label class="color-btn" title="Click to open color picker">
            <div class="color-checker"></div>
            <div class="color-fill" style="background: ${currentValue || "transparent"}"></div>
            <ha-icon icon="mdi:eyedropper-variant" class="color-icon"></ha-icon>
            <input type="color" class="color-native"
              .value=${cssToHex(currentValue)}
              @change=${(ev: Event) => onChange((ev.target as HTMLInputElement).value || undefined)}
            />
          </label>
          <input type="text" class="color-text-input"
            .value=${currentValue}
            placeholder=${placeholder}
            @change=${(ev: Event) => onChange((ev.target as HTMLInputElement).value || undefined)}
            @input=${(ev: Event) => onChange((ev.target as HTMLInputElement).value || undefined)}
          />
        </div>
      </div>
    `;
  }

  /** Color field bound to a SubButtonConfig field (single-group mode). */
  private _renderSubBtnColorField(
    btn: SubButtonConfig,
    index: number,
    field: "icon_color" | "icon_color_on" | "icon_color_off" | "background_color",
    label: string,
    placeholder = "e.g. #ff9800, var(--primary-color)"
  ) {
    return this._renderButtonColorField(
      (btn[field] as string | undefined) ?? "",
      label,
      placeholder,
      (v) => this._subButtonChanged(index, { [field]: v })
    );
  }

  /** Shared button accordion body used by both single-group and multi-group editors. */
  private _renderButtonBody(
    btn: SubButtonConfig,
    showPosition: boolean,
    onChange: (patch: Partial<SubButtonConfig>) => void,
    onColorChange: (field: "icon_color" | "icon_color_on" | "icon_color_off" | "background_color", value: string | undefined) => void
  ) {
    return html`
      <div class="sub-group-label">Entity &amp; Display</div>

      <ha-entity-picker .hass=${this.hass} .label=${"Entity"}
        .value=${btn.entity ?? ""} allow-custom-entity
        @value-changed=${(ev: CustomEvent) => onChange({ entity: ev.detail.value || undefined })}
      ></ha-entity-picker>

      <ha-icon-picker .hass=${this.hass}
        .label=${"Icon (blank = auto-pick from entity domain)"}
        .value=${btn.icon ?? ""}
        @value-changed=${(ev: CustomEvent) => onChange({ icon: ev.detail.value || undefined })}
      ></ha-icon-picker>

      <ha-selector .hass=${this.hass}
        .label=${"Label (blank to hide, or type 'entity' for entity name)"}
        .selector=${{ text: {} }} .value=${btn.label ?? ""}
        @value-changed=${(ev: CustomEvent) => onChange({ label: ev.detail.value || undefined })}
      ></ha-selector>

      <ha-form .hass=${this.hass} .data=${btn}
        .schema=${[
          { name: "show_icon",  label: "Show Icon",       selector: { boolean: {} } },
          { name: "show_label", label: "Show Label",      selector: { boolean: {} } },
          { name: "show_state", label: "Show State (includes unit of measurement)", selector: { boolean: {} } },
          { name: "background", label: "Show Background", selector: { boolean: {} } },
        ]}
        .computeLabel=${(s: any) => s.label}
        @value-changed=${(ev: CustomEvent) => {
          onChange({
            show_icon:  ev.detail.value.show_icon,
            show_label: ev.detail.value.show_label,
            show_state: ev.detail.value.show_state,
            background: ev.detail.value.background,
          });
        }}
      ></ha-form>

      <div class="sub-group-label">Color &amp; Opacity</div>

      <ha-form .hass=${this.hass}
        .data=${{ state_based_color: btn.state_based_color ?? false }}
        .schema=${[{ name: "state_based_color", label: "Auto-color by entity state", selector: { boolean: {} } }]}
        .computeLabel=${(s: any) => s.label}
        @value-changed=${(ev: CustomEvent) => onChange({ state_based_color: ev.detail.value.state_based_color })}
      ></ha-form>

      ${btn.state_based_color ? html`
        <div class="hint">Active when entity is on/open/home/playing. Defaults to domain color (yellow for lights) if left blank.</div>
        ${this._renderButtonColorField(btn.icon_color_on ?? "", "Active Icon Color",   "e.g. #FDD835, yellow", (v) => onColorChange("icon_color_on",  v))}
        ${this._renderButtonColorField(btn.icon_color_off ?? "", "Inactive Icon Color", "e.g. #888888, grey",   (v) => onColorChange("icon_color_off", v))}
      ` : html`
        ${this._renderButtonColorField(btn.icon_color ?? "", "Icon Color", "e.g. #ff9800, var(--primary-color)", (v) => onColorChange("icon_color", v))}
      `}

      ${this._renderButtonColorField(btn.background_color ?? "", "Background Color", "e.g. rgba(255,255,255,0.15)", (v) => onColorChange("background_color", v))}

      <ha-selector .hass=${this.hass} .label=${"Button Opacity"}
        .selector=${OPACITY_SELECTOR} .value=${btn.opacity ?? 1}
        @value-changed=${(ev: CustomEvent) => onChange({ opacity: ev.detail.value })}
      ></ha-selector>

      <div class="sub-group-label">Animation</div>
      <ha-selector .hass=${this.hass} .label=${"Animation"}
        .selector=${{ select: { options: ANIMATION_TYPE_OPTIONS, mode: "dropdown" } }}
        .value=${btn.animation ?? "none"}
        @value-changed=${(ev: CustomEvent) =>
          onChange({ animation: ev.detail.value === "none" ? undefined : ev.detail.value })}
      ></ha-selector>
      ${btn.animation && btn.animation !== "none" ? html`
        <div class="two-col">
          <ha-selector .hass=${this.hass} .label=${"When"}
            .selector=${{ select: { options: ANIMATION_WHEN_OPTIONS, mode: "dropdown" } }}
            .value=${btn.animation_when ?? "always"}
            @value-changed=${(ev: CustomEvent) => onChange({ animation_when: ev.detail.value || undefined })}
          ></ha-selector>
          <ha-selector .hass=${this.hass} .label=${"Speed"}
            .selector=${{ select: { options: ANIMATION_SPEED_OPTIONS, mode: "dropdown" } }}
            .value=${btn.animation_speed ?? "normal"}
            @value-changed=${(ev: CustomEvent) => onChange({ animation_speed: ev.detail.value || undefined })}
          ></ha-selector>
        </div>
      ` : nothing}

      ${showPosition ? html`
        <div class="sub-group-label">Position</div>
        <ha-selector .hass=${this.hass} .label=${"Position"}
          .selector=${{ select: { options: SUB_BUTTON_POSITION_OPTIONS, mode: "dropdown" } }}
          .value=${btn.position ?? "bottom-left"}
          @value-changed=${(ev: CustomEvent) => onChange({ position: ev.detail.value })}
        ></ha-selector>
      ` : nothing}

      <div class="sub-group-label">Actions</div>
      <ha-selector .hass=${this.hass} .label=${"Tap Action"}
        .selector=${{ ui_action: {} }} .value=${btn.tap_action ?? { action: "toggle" }}
        @value-changed=${(ev: CustomEvent) => onChange({ tap_action: ev.detail.value })}
      ></ha-selector>
      <ha-selector .hass=${this.hass} .label=${"Hold Action"}
        .selector=${{ ui_action: {} }} .value=${btn.hold_action ?? { action: "more-info" }}
        @value-changed=${(ev: CustomEvent) => onChange({ hold_action: ev.detail.value })}
      ></ha-selector>
      <ha-selector .hass=${this.hass} .label=${"Double-Tap Action"}
        .selector=${{ ui_action: {} }} .value=${btn.double_tap_action ?? { action: "none" }}
        @value-changed=${(ev: CustomEvent) => onChange({ double_tap_action: ev.detail.value })}
      ></ha-selector>
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
            <input
              type="text"
              class="color-text-input"
              .value=${c.title ?? ""}
              placeholder="Room name, or leave blank to hide"
              @change=${(ev: Event) =>
                this._fieldChanged("title", (ev.target as HTMLInputElement).value || undefined)}
              @input=${(ev: Event) =>
                this._fieldChanged("title", (ev.target as HTMLInputElement).value || undefined)}
            />
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

        ${this._renderNumField("title_font_size", "Font Size", 8, 48, 1, 14, "px")}
        ${this._renderColorField("title_color", "Title Color", "e.g. white, #ffffff")}
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

      <!-- ── Icon animation ── -->
      <div class="section">
        <div class="section-label">Icon Animation</div>
        <ha-selector .hass=${this.hass} .label=${"Animation"}
          .selector=${{ select: { options: ANIMATION_TYPE_OPTIONS, mode: "dropdown" } }}
          .value=${c.icon_animation ?? "none"}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("icon_animation", ev.detail.value === "none" ? undefined : ev.detail.value)}
        ></ha-selector>
        ${c.icon_animation && c.icon_animation !== "none" ? html`
          <div class="two-col">
            <ha-selector .hass=${this.hass} .label=${"When"}
              .selector=${{ select: { options: ANIMATION_WHEN_OPTIONS, mode: "dropdown" } }}
              .value=${c.icon_animation_when ?? "always"}
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("icon_animation_when", ev.detail.value || undefined)}
            ></ha-selector>
            <ha-selector .hass=${this.hass} .label=${"Speed"}
              .selector=${{ select: { options: ANIMATION_SPEED_OPTIONS, mode: "dropdown" } }}
              .value=${c.icon_animation_speed ?? "normal"}
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("icon_animation_speed", ev.detail.value || undefined)}
            ></ha-selector>
          </div>
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

        <ha-selector .hass=${this.hass} .label=${"Badge Animation"}
          .selector=${{ select: { options: ANIMATION_TYPE_OPTIONS, mode: "dropdown" } }}
          .value=${c.badge_animation ?? "none"}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("badge_animation", ev.detail.value === "none" ? undefined : ev.detail.value)}
        ></ha-selector>
        ${c.badge_animation && c.badge_animation !== "none" ? html`
          <div class="two-col">
            <ha-selector .hass=${this.hass} .label=${"When"}
              .selector=${{ select: { options: ANIMATION_WHEN_OPTIONS, mode: "dropdown" } }}
              .value=${c.badge_animation_when ?? "always"}
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("badge_animation_when", ev.detail.value || undefined)}
            ></ha-selector>
            <ha-selector .hass=${this.hass} .label=${"Speed"}
              .selector=${{ select: { options: ANIMATION_SPEED_OPTIONS, mode: "dropdown" } }}
              .value=${c.badge_animation_speed ?? "normal"}
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("badge_animation_speed", ev.detail.value || undefined)}
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

      <!-- ── Shape ── -->
      <div class="section">
        <div class="section-label">Shape</div>
        <ha-selector .hass=${this.hass} .label=${"Card Shape"}
          .selector=${{ select: { options: CARD_SHAPE_OPTIONS, mode: "dropdown" } }}
          .value=${c.card_shape ?? ""}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("card_shape", ev.detail.value as CardShape || undefined)}
        ></ha-selector>
        <ha-selector .hass=${this.hass} .label=${"Custom Border Radius (CSS — overrides shape)"}
          .selector=${{ text: {} }}
          .value=${c.card_border_radius ?? ""}
          .placeholder=${"e.g. 12px, 50% 0 50% 0, 8px 24px"}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("card_border_radius", ev.detail.value || undefined)}
        ></ha-selector>
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
    const isGroupsMode = !!(c.sub_button_groups?.length);

    if (isGroupsMode) {
      return html`
        <div class="section">
          <div class="section-label">Button Groups</div>
          <div class="hint">Each group is an independent set of buttons with its own layout and position. Max 4 groups.</div>
          ${(c.sub_button_groups ?? []).map((group, i) => this._renderGroupRow(group, i))}
          ${(c.sub_button_groups?.length ?? 0) < 4 ? html`
            <button class="add-btn" @click=${() => this._addGroup()}>+ Add Group</button>
          ` : nothing}
        </div>
        <div class="section">
          <button class="clear-btn"
            @click=${() => {
              if (!confirm("Revert to single-group mode? Only the first group's settings will be kept.")) return;
              this._revertToSingleGroup();
            }}
          >Revert to Single Group Mode</button>
        </div>
      `;
    }

    // ── Single-group mode ──
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
          <ha-selector .hass=${this.hass} .label=${"Cell Layout"}
            .selector=${{ select: { options: GRID_CELL_LAYOUT_OPTIONS, mode: "list" } }}
            .value=${c.sub_buttons_grid_cell_layout ?? "vertical"}
            @value-changed=${(ev: CustomEvent) =>
              this._fieldChanged("sub_buttons_grid_cell_layout", ev.detail.value || undefined)}
          ></ha-selector>
        ` : nothing}

        ${layout === "left-column" || layout === "right-column" ? html`
          <ha-selector .hass=${this.hass} .label=${"Column Alignment"}
            .selector=${{ select: { options: COLUMN_JUSTIFY_OPTIONS, mode: "dropdown" } }}
            .value=${c.sub_buttons_column_justify ?? "top"}
            @value-changed=${(ev: CustomEvent) =>
              this._fieldChanged("sub_buttons_column_justify", ev.detail.value || undefined)}
          ></ha-selector>
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

      <!-- ── Switch to groups mode ── -->
      <div class="section">
        <div class="hint">Groups mode allows multiple independent button groups with different layouts and positions.</div>
        <button class="clear-btn"
          @click=${() => this._switchToGroupsMode()}
        >Switch to Groups Mode</button>
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

  // ── Sub-button row (single-group mode) ───────────────────────────────────────

  private _renderSubButtonRow(btn: SubButtonConfig, index: number) {
    const isExpanded = this._expandedSubButton === index;
    const label = btn.entity ?? btn.label ?? btn.icon ?? `Sub-button ${index + 1}`;
    const layout = this._config?.sub_buttons_layout ?? "bottom-row";
    const showPosition = layout === "custom";

    return html`
      <div class="sub-btn-row ${this._dragOverIndex === index ? "drag-over" : ""}"
        @dragstart=${(e: DragEvent) => this._onDragStart(e, index)}
        @dragover=${(e: DragEvent) => this._onDragOver(e, index)}
        @dragleave=${() => this._onDragLeave(index)}
        @dragend=${(e: DragEvent) => this._onDragEnd(e)}
        @drop=${(e: DragEvent) => this._onDrop(e, index)}
      >
        <div class="sub-btn-header"
          @click=${() => (this._expandedSubButton = isExpanded ? null : index)}
        >
          <ha-icon class="drag-handle" icon="mdi:drag-vertical"
            @mousedown=${(e: MouseEvent) => this._onDragHandleMousedown(e, index)}
          ></ha-icon>
          <ha-icon .icon=${btn.icon ?? "mdi:gesture-tap"}></ha-icon>
          <span class="sub-btn-label">${label}</span>
          <ha-icon .icon=${isExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
          <button class="del-btn"
            @click=${(ev: Event) => { ev.stopPropagation(); this._deleteSubButton(index); }}
          ><ha-icon icon="mdi:delete" class="del-icon"></ha-icon></button>
        </div>

        ${isExpanded ? html`
          <div class="sub-btn-body">
            ${this._renderButtonBody(
              btn,
              showPosition,
              (patch) => this._subButtonChanged(index, patch),
              (field, value) => this._subButtonChanged(index, { [field]: value })
            )}
          </div>
        ` : nothing}
      </div>
    `;
  }

  // ── Group management methods ──────────────────────────────────────────────────

  private _addGroup(): void {
    const groups = [...(this._config?.sub_button_groups ?? [])];
    if (groups.length >= 4) return;
    groups.push({ layout: "bottom-row", buttons: [] });
    this._fieldChanged("sub_button_groups", groups);
    this._expandedGroup = groups.length - 1;
  }

  private _deleteGroup(index: number): void {
    const groups = [...(this._config?.sub_button_groups ?? [])];
    groups.splice(index, 1);
    this._fieldChanged("sub_button_groups", groups.length ? groups : undefined);
    if (this._expandedGroup === index) this._expandedGroup = null;
  }

  private _moveGroupUp(index: number): void {
    if (index === 0) return;
    const groups = [...(this._config?.sub_button_groups ?? [])];
    [groups[index - 1], groups[index]] = [groups[index], groups[index - 1]];
    this._fieldChanged("sub_button_groups", groups);
  }

  private _moveGroupDown(index: number): void {
    const groups = this._config?.sub_button_groups ?? [];
    if (index >= groups.length - 1) return;
    const arr = [...groups];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    this._fieldChanged("sub_button_groups", arr);
  }

  private _groupChanged(groupIndex: number, patch: Partial<SubButtonGroup>): void {
    const groups = [...(this._config?.sub_button_groups ?? [])];
    groups[groupIndex] = { ...groups[groupIndex], ...patch };
    this._fieldChanged("sub_button_groups", groups);
  }

  private _groupButtonChanged(groupIndex: number, btnIndex: number, patch: Partial<SubButtonConfig>): void {
    const groups = [...(this._config?.sub_button_groups ?? [])];
    const buttons = [...(groups[groupIndex]?.buttons ?? [])];
    buttons[btnIndex] = { ...buttons[btnIndex], ...patch };
    groups[groupIndex] = { ...groups[groupIndex], buttons };
    this._fieldChanged("sub_button_groups", groups);
  }

  private _addGroupButton(groupIndex: number): void {
    const groups = [...(this._config?.sub_button_groups ?? [])];
    const buttons = [...(groups[groupIndex]?.buttons ?? [])];
    buttons.push({
      show_icon: true, show_label: false, show_state: false, background: true,
      state_based_color: false,
      tap_action: { action: "toggle" },
      hold_action: { action: "more-info" },
      double_tap_action: { action: "none" },
    });
    groups[groupIndex] = { ...groups[groupIndex], buttons };
    this._fieldChanged("sub_button_groups", groups);
    this._expandedGroupButton = { ...this._expandedGroupButton, [groupIndex]: buttons.length - 1 };
  }

  private _deleteGroupButton(groupIndex: number, btnIndex: number): void {
    const groups = [...(this._config?.sub_button_groups ?? [])];
    const buttons = [...(groups[groupIndex]?.buttons ?? [])];
    buttons.splice(btnIndex, 1);
    groups[groupIndex] = { ...groups[groupIndex], buttons };
    this._fieldChanged("sub_button_groups", groups);
    if (this._expandedGroupButton[groupIndex] === btnIndex) {
      this._expandedGroupButton = { ...this._expandedGroupButton, [groupIndex]: null };
    }
  }

  private _switchToGroupsMode(): void {
    const cfg = { ...this._config! };
    cfg.sub_button_groups = [{
      layout: cfg.sub_buttons_layout ?? "bottom-row",
      gap: cfg.sub_button_gap,
      grid_columns: cfg.sub_buttons_grid_columns,
      grid_min_width: cfg.sub_buttons_grid_min_width,
      grid_cell_layout: cfg.sub_buttons_grid_cell_layout,
      column_justify: cfg.sub_buttons_column_justify,
      icon_color: cfg.sub_button_icon_color,
      background_color: cfg.sub_button_background_color,
      opacity: cfg.sub_button_opacity,
      buttons: cfg.sub_buttons ?? [],
    }];
    delete cfg.sub_buttons;
    delete cfg.sub_buttons_layout;
    delete cfg.sub_button_gap;
    delete cfg.sub_buttons_grid_columns;
    delete cfg.sub_buttons_grid_min_width;
    delete cfg.sub_buttons_grid_cell_layout;
    delete cfg.sub_buttons_column_justify;
    delete cfg.sub_button_icon_color;
    delete cfg.sub_button_background_color;
    delete cfg.sub_button_opacity;
    this._fireConfigChanged(cfg);
    this._expandedGroup = 0;
  }

  private _revertToSingleGroup(): void {
    const firstGroup = this._config?.sub_button_groups?.[0] ?? {};
    const cfg = { ...this._config! };
    cfg.sub_buttons = firstGroup.buttons ?? [];
    if (firstGroup.layout) cfg.sub_buttons_layout = firstGroup.layout as SubButtonsLayout;
    if (firstGroup.gap !== undefined) cfg.sub_button_gap = firstGroup.gap;
    if (firstGroup.grid_columns !== undefined) cfg.sub_buttons_grid_columns = firstGroup.grid_columns;
    if (firstGroup.grid_min_width !== undefined) cfg.sub_buttons_grid_min_width = firstGroup.grid_min_width;
    if (firstGroup.grid_cell_layout) cfg.sub_buttons_grid_cell_layout = firstGroup.grid_cell_layout;
    if (firstGroup.column_justify) cfg.sub_buttons_column_justify = firstGroup.column_justify;
    if (firstGroup.icon_color) cfg.sub_button_icon_color = firstGroup.icon_color;
    if (firstGroup.background_color) cfg.sub_button_background_color = firstGroup.background_color;
    if (firstGroup.opacity !== undefined) cfg.sub_button_opacity = firstGroup.opacity;
    delete cfg.sub_button_groups;
    this._fireConfigChanged(cfg);
  }

  // ── Group button drag-and-drop ────────────────────────────────────────────────

  private _onGroupBtnDragHandleMousedown(e: MouseEvent, groupIndex: number, btnIndex: number): void {
    const row = (e.currentTarget as Element).closest(".sub-btn-row") as HTMLElement | null;
    if (row) row.setAttribute("draggable", "true");
    this._dragGroupContext = groupIndex;
    this._dragIndex = btnIndex;
  }

  private _onGroupBtnDragStart(e: DragEvent, groupIndex: number, btnIndex: number): void {
    e.dataTransfer?.setData("text/plain", String(btnIndex));
    if (e.dataTransfer) e.dataTransfer.effectAllowed = "move";
    this._dragGroupContext = groupIndex;
    this._dragIndex = btnIndex;
  }

  private _onGroupBtnDragOver(e: DragEvent, groupIndex: number, btnIndex: number): void {
    if (this._dragGroupContext !== groupIndex || this._dragIndex === null || this._dragIndex === btnIndex) return;
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    if (this._dragOverIndex !== btnIndex) this._dragOverIndex = btnIndex;
  }

  private _onGroupBtnDrop(e: DragEvent, groupIndex: number, toIndex: number): void {
    e.preventDefault();
    const fromIndex = this._dragIndex;
    this._dragGroupContext = null;
    this._dragIndex = null;
    this._dragOverIndex = null;
    if (fromIndex === null || fromIndex === toIndex) return;
    const groups = [...(this._config?.sub_button_groups ?? [])];
    const buttons = [...(groups[groupIndex]?.buttons ?? [])];
    const [moved] = buttons.splice(fromIndex, 1);
    buttons.splice(toIndex, 0, moved);
    groups[groupIndex] = { ...groups[groupIndex], buttons };
    this._fieldChanged("sub_button_groups", groups);
    this._expandedGroupButton = { ...this._expandedGroupButton, [groupIndex]: null };
  }

  // ── Group button row ──────────────────────────────────────────────────────────

  private _renderGroupButtonRow(btn: SubButtonConfig, btnIndex: number, groupIndex: number, layout: SubButtonsLayout) {
    const isExpanded = this._expandedGroupButton[groupIndex] === btnIndex;
    const label = btn.entity ?? btn.label ?? btn.icon ?? `Button ${btnIndex + 1}`;
    const showPosition = layout === "custom";
    const isDragTarget = this._dragGroupContext === groupIndex && this._dragOverIndex === btnIndex;

    return html`
      <div class="sub-btn-row ${isDragTarget ? "drag-over" : ""}"
        @dragstart=${(e: DragEvent) => this._onGroupBtnDragStart(e, groupIndex, btnIndex)}
        @dragover=${(e: DragEvent) => this._onGroupBtnDragOver(e, groupIndex, btnIndex)}
        @dragleave=${() => { if (this._dragGroupContext === groupIndex && this._dragOverIndex === btnIndex) this._dragOverIndex = null; }}
        @dragend=${(e: DragEvent) => { (e.currentTarget as HTMLElement).removeAttribute("draggable"); this._dragGroupContext = null; this._dragIndex = null; this._dragOverIndex = null; }}
        @drop=${(e: DragEvent) => this._onGroupBtnDrop(e, groupIndex, btnIndex)}
      >
        <div class="sub-btn-header"
          @click=${() => {
            const cur = this._expandedGroupButton[groupIndex];
            this._expandedGroupButton = { ...this._expandedGroupButton, [groupIndex]: cur === btnIndex ? null : btnIndex };
          }}
        >
          <ha-icon class="drag-handle" icon="mdi:drag-vertical"
            @mousedown=${(e: MouseEvent) => this._onGroupBtnDragHandleMousedown(e, groupIndex, btnIndex)}
          ></ha-icon>
          <ha-icon .icon=${btn.icon ?? "mdi:gesture-tap"}></ha-icon>
          <span class="sub-btn-label">${label}</span>
          <ha-icon .icon=${isExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
          <button class="del-btn"
            @click=${(ev: Event) => { ev.stopPropagation(); this._deleteGroupButton(groupIndex, btnIndex); }}
          ><ha-icon icon="mdi:delete" class="del-icon"></ha-icon></button>
        </div>
        ${isExpanded ? html`
          <div class="sub-btn-body">
            ${this._renderButtonBody(
              btn,
              showPosition,
              (patch) => this._groupButtonChanged(groupIndex, btnIndex, patch),
              (field, value) => this._groupButtonChanged(groupIndex, btnIndex, { [field]: value })
            )}
          </div>
        ` : nothing}
      </div>
    `;
  }

  // ── Group row ─────────────────────────────────────────────────────────────────

  private _renderGroupRow(group: SubButtonGroup, groupIndex: number) {
    const c = this._config!;
    const isExpanded = this._expandedGroup === groupIndex;
    const numGroups = c.sub_button_groups?.length ?? 0;
    const groupLabel = group.label ?? `Group ${groupIndex + 1}`;
    const layout = (group.layout ?? "bottom-row") as SubButtonsLayout;
    const isColumn = layout === "left-column" || layout === "right-column";
    const isGrid = layout === "grid";
    const showCustomPos = group.position === "custom";

    return html`
      <div class="sub-btn-row">
        <div class="sub-btn-header" @click=${() => (this._expandedGroup = isExpanded ? null : groupIndex)}>
          <ha-icon icon="mdi:layers" style="--mdc-icon-size:18px; opacity:0.7; flex-shrink:0;"></ha-icon>
          <span class="sub-btn-label">${groupLabel}</span>
          <span class="group-layout-chip">${layout}</span>
          <ha-icon .icon=${isExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
          <div style="display:flex; gap:2px; flex-shrink:0;">
            ${groupIndex > 0 ? html`
              <button class="icon-btn" title="Move up"
                @click=${(e: Event) => { e.stopPropagation(); this._moveGroupUp(groupIndex); }}
              ><ha-icon icon="mdi:arrow-up" style="--mdc-icon-size:14px;"></ha-icon></button>
            ` : nothing}
            ${groupIndex < numGroups - 1 ? html`
              <button class="icon-btn" title="Move down"
                @click=${(e: Event) => { e.stopPropagation(); this._moveGroupDown(groupIndex); }}
              ><ha-icon icon="mdi:arrow-down" style="--mdc-icon-size:14px;"></ha-icon></button>
            ` : nothing}
            <button class="del-btn"
              @click=${(e: Event) => { e.stopPropagation(); this._deleteGroup(groupIndex); }}
            ><ha-icon icon="mdi:delete" class="del-icon"></ha-icon></button>
          </div>
        </div>

        ${isExpanded ? html`
          <div class="sub-btn-body">
            <ha-selector .hass=${this.hass} .label=${"Group Name (editor label only)"}
              .selector=${{ text: {} }} .value=${group.label ?? ""}
              @value-changed=${(ev: CustomEvent) =>
                this._groupChanged(groupIndex, { label: ev.detail.value || undefined })}
            ></ha-selector>

            <div class="sub-group-label">Layout &amp; Position</div>

            <ha-selector .hass=${this.hass} .label=${"Button Layout"}
              .selector=${{ select: { options: SUB_BUTTON_LAYOUT_OPTIONS, mode: "dropdown" } }}
              .value=${layout}
              @value-changed=${(ev: CustomEvent) =>
                this._groupChanged(groupIndex, { layout: ev.detail.value as SubButtonsLayout })}
            ></ha-selector>

            <ha-selector .hass=${this.hass} .label=${"Group Position (overrides layout default)"}
              .selector=${{ select: { options: GROUP_POSITION_OPTIONS, mode: "dropdown" } }}
              .value=${group.position ?? ""}
              @value-changed=${(ev: CustomEvent) =>
                this._groupChanged(groupIndex, { position: (ev.detail.value as SubButtonGroupPosition) || undefined })}
            ></ha-selector>

            ${showCustomPos ? html`
              <div class="two-col">
                <ha-selector .hass=${this.hass} .label=${"X (CSS left)"}
                  .selector=${{ text: {} }} .value=${group.position_x ?? ""}
                  .placeholder=${"e.g. 10px, 25%"}
                  @value-changed=${(ev: CustomEvent) =>
                    this._groupChanged(groupIndex, { position_x: ev.detail.value || undefined })}
                ></ha-selector>
                <ha-selector .hass=${this.hass} .label=${"Y (CSS top)"}
                  .selector=${{ text: {} }} .value=${group.position_y ?? ""}
                  .placeholder=${"e.g. 10px, 25%"}
                  @value-changed=${(ev: CustomEvent) =>
                    this._groupChanged(groupIndex, { position_y: ev.detail.value || undefined })}
                ></ha-selector>
              </div>
            ` : nothing}

            ${isColumn ? html`
              <ha-selector .hass=${this.hass} .label=${"Column Alignment"}
                .selector=${{ select: { options: COLUMN_JUSTIFY_OPTIONS, mode: "dropdown" } }}
                .value=${group.column_justify ?? "top"}
                @value-changed=${(ev: CustomEvent) =>
                  this._groupChanged(groupIndex, { column_justify: ev.detail.value || undefined })}
              ></ha-selector>
            ` : nothing}

            ${isGrid ? html`
              <div class="two-col">
                <ha-selector .hass=${this.hass} .label=${"Columns (0 = auto-fill)"}
                  .selector=${{ number: { min: 0, max: 8, step: 1, mode: "box" } }}
                  .value=${group.grid_columns ?? 0}
                  @value-changed=${(ev: CustomEvent) =>
                    this._groupChanged(groupIndex, { grid_columns: ev.detail.value || undefined })}
                ></ha-selector>
                <ha-selector .hass=${this.hass} .label=${"Cell Min Width"}
                  .selector=${{ number: { min: 32, max: 200, step: 4, mode: "box", unit_of_measurement: "px" } }}
                  .value=${group.grid_min_width ?? 56}
                  @value-changed=${(ev: CustomEvent) =>
                    this._groupChanged(groupIndex, { grid_min_width: ev.detail.value })}
                ></ha-selector>
              </div>
              <ha-selector .hass=${this.hass} .label=${"Cell Layout"}
                .selector=${{ select: { options: GRID_CELL_LAYOUT_OPTIONS, mode: "list" } }}
                .value=${group.grid_cell_layout ?? "vertical"}
                @value-changed=${(ev: CustomEvent) =>
                  this._groupChanged(groupIndex, { grid_cell_layout: ev.detail.value || undefined })}
              ></ha-selector>
            ` : nothing}

            <div class="sub-group-label">Group Style</div>
            <div class="two-col">
              <ha-selector .hass=${this.hass} .label=${"Opacity"}
                .selector=${OPACITY_SELECTOR} .value=${group.opacity ?? 1}
                @value-changed=${(ev: CustomEvent) =>
                  this._groupChanged(groupIndex, { opacity: ev.detail.value })}
              ></ha-selector>
              <ha-selector .hass=${this.hass} .label=${"Button Gap"}
                .selector=${{ number: { min: 0, max: 32, step: 1, mode: "box", unit_of_measurement: "px" } }}
                .value=${group.gap ?? 6}
                @value-changed=${(ev: CustomEvent) =>
                  this._groupChanged(groupIndex, { gap: ev.detail.value })}
              ></ha-selector>
            </div>
            ${this._renderButtonColorField(group.icon_color ?? "", "Icon Color (default for group)",       "e.g. #ff9800",       (v) => this._groupChanged(groupIndex, { icon_color: v }))}
            ${this._renderButtonColorField(group.background_color ?? "", "Background Color (default for group)", "e.g. rgba(255,255,255,0.1)", (v) => this._groupChanged(groupIndex, { background_color: v }))}

            <div class="sub-group-label">Buttons</div>
            ${(group.buttons ?? []).map((btn, i) =>
              this._renderGroupButtonRow(btn, i, groupIndex, layout)
            )}
            <button class="add-btn" @click=${() => this._addGroupButton(groupIndex)}>+ Add Button</button>
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
        align-items: end;
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

      .template-input {
        flex: 1;
        min-width: 0;
        align-self: flex-start; /* shrink to content height; tmpl-btn centers against this */
      }

      /* Center the template toggle button against the input component height */
      .template-row .tmpl-btn {
        align-self: center;
      }

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

      /* Template-active row inside a color-field (textarea + toggle button) */
      .color-tmpl-row {
        display: flex;
        align-items: flex-start;
        gap: 6px;
      }

      .color-tmpl-row textarea {
        flex: 1;
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

      .color-tmpl-row .tmpl-btn {
        align-self: flex-start;
        flex-shrink: 0;
      }

      /* Native text input styled to match HA filled-variant text fields.
         flex:1 handles width in color-row; width:100% handles it elsewhere. */
      .color-text-input {
        flex: 1;
        min-width: 0;
        width: 100%;
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
        transition: border-color 0.15s, box-shadow 0.15s;
      }

      .sub-btn-row.drag-over {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-color) 30%, transparent);
      }

      .sub-btn-row[draggable="true"] {
        opacity: 0.5;
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

      .drag-handle {
        cursor: grab;
        color: var(--secondary-text-color);
        --mdc-icon-size: 18px;
        flex-shrink: 0;
        opacity: 0.6;
      }

      .drag-handle:active { cursor: grabbing; }

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
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        color: var(--error-color, #db4437);
        border: 1px solid var(--error-color, #db4437);
        border-radius: 6px;
        padding: 0;
        cursor: pointer;
        background: transparent;
        flex-shrink: 0;
        transition: background 0.15s;
      }

      .del-btn:hover {
        background: color-mix(in srgb, var(--error-color, #db4437) 15%, transparent);
      }

      .del-icon {
        --mdc-icon-size: 16px;
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

      .icon-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        background: transparent;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        color: var(--secondary-text-color);
        padding: 0;
        flex-shrink: 0;
        transition: background 0.15s;
      }

      .icon-btn:hover {
        background: color-mix(in srgb, var(--primary-color) 12%, transparent);
        color: var(--primary-color);
      }

      .group-layout-chip {
        font-size: 11px;
        background: color-mix(in srgb, var(--primary-color) 15%, transparent);
        color: var(--primary-color);
        border-radius: 10px;
        padding: 2px 7px;
        margin-left: 4px;
        font-weight: 500;
        flex-shrink: 0;
      }
    `;
  }
}
