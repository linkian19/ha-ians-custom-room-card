import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, CardConfig, SubButtonConfig, SubButtonsLayout, IconPosition, BadgePosition } from "./types";
import { CARD_TYPE } from "./const";
import { loadHaComponents } from "./utils/loader";
import { isTemplate } from "./utils/template-manager";

const ICON_POSITION_OPTIONS = [
  { value: "",              label: "Default (inline with title)" },
  { value: "top-left",      label: "Top Left" },
  { value: "top-right",     label: "Top Right" },
  { value: "bottom-left",   label: "Bottom Left" },
  { value: "bottom-right",  label: "Bottom Right" },
  { value: "center",        label: "Center" },
  { value: "center-left",   label: "Center Left" },
  { value: "center-right",  label: "Center Right" },
  { value: "custom",        label: "Custom" },
];

const BADGE_POSITION_OPTIONS = [
  { value: "top-right",     label: "Top Right (default)" },
  { value: "top-left",      label: "Top Left" },
  { value: "bottom-left",   label: "Bottom Left" },
  { value: "bottom-right",  label: "Bottom Right" },
  { value: "custom",        label: "Custom" },
];

const SUB_BUTTON_LAYOUT_OPTIONS = [
  { value: "bottom-row", label: "Bottom Row" },
  { value: "top-row", label: "Top Row" },
  { value: "corners", label: "Corners" },
  { value: "columns", label: "Columns" },
  { value: "grid", label: "Grid" },
  { value: "custom", label: "Custom" },
];

const SUB_BUTTON_POSITION_OPTIONS = [
  { value: "top-left", label: "Top Left" },
  { value: "top-center", label: "Top Center" },
  { value: "top-right", label: "Top Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-right", label: "Bottom Right" },
];

const TEMPLATE_CAPABLE_FIELDS = new Set([
  "title", "icon", "icon_color", "badge_icon", "badge_color",
  "background_color", "border_color",
]);

const OPACITY_SCHEMA = (name: string, label: string) => ({
  name, label,
  selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } },
});

@customElement(`${CARD_TYPE}-editor`)
export class IansCustomRoomCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: CardConfig;
  @state() private _loaded = false;
  // Track which fields are in template textarea mode
  @state() private _templateMode: Set<string> = new Set();
  // Track which sub-button rows are expanded in the editor
  @state() private _expandedSubButton: number | null = null;

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  connectedCallback(): void {
    super.connectedCallback();
    loadHaComponents().then(() => {
      this._loaded = true;
    });
  }

  public setConfig(config: CardConfig): void {
    this._config = config;
    // Auto-detect which fields are templates and start in template mode
    const templateSet = new Set<string>();
    for (const field of TEMPLATE_CAPABLE_FIELDS) {
      const val = config[field as keyof CardConfig] as string | undefined;
      if (val && isTemplate(val)) {
        templateSet.add(field);
      }
    }
    this._templateMode = templateSet;
  }

  // ── Event helpers ──────────────────────────────────────────────────────────

  private _fireConfigChanged(config: CardConfig): void {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _fieldChanged(field: string, value: unknown): void {
    if (!this._config) return;
    const newConfig = { ...this._config, [field]: value };
    this._fireConfigChanged(newConfig);
  }

  private _gridFieldChanged(field: string, value: unknown): void {
    if (!this._config) return;
    const newConfig = {
      ...this._config,
      grid_options: { ...(this._config.grid_options ?? {}), [field]: value },
    };
    this._fireConfigChanged(newConfig);
  }

  private _globalActionFieldChanged(field: string, value: unknown): void {
    if (!this._config) return;
    const newConfig = {
      ...this._config,
      global_action: { ...(this._config.global_action ?? {}), [field]: value },
    };
    this._fireConfigChanged(newConfig);
  }

  private _subButtonChanged(
    index: number,
    field: string,
    value: unknown
  ): void {
    if (!this._config?.sub_buttons) return;
    const buttons = [...this._config.sub_buttons];
    buttons[index] = { ...buttons[index], [field]: value };
    this._fieldChanged("sub_buttons", buttons);
  }

  private _subButtonActionChanged(
    index: number,
    actionField: string,
    value: unknown
  ): void {
    if (!this._config?.sub_buttons) return;
    const buttons = [...this._config.sub_buttons];
    buttons[index] = { ...buttons[index], [actionField]: value };
    this._fieldChanged("sub_buttons", buttons);
  }

  private _addSubButton(): void {
    const buttons = [...(this._config?.sub_buttons ?? [])];
    buttons.push({
      show_icon: true,
      show_label: false,
      show_state: false,
      background: true,
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
    if (next.has(field)) {
      next.delete(field);
    } else {
      next.add(field);
    }
    this._templateMode = next;
  }

  private _onFormChange(
    handler: (value: Record<string, unknown>) => void,
    ev: CustomEvent
  ): void {
    handler(ev.detail.value);
  }

  // ── Render helpers ─────────────────────────────────────────────────────────

  private _renderTemplateField(
    fieldKey: string,
    label: string,
    renderWidget: () => unknown
  ) {
    const inTemplateMode = this._templateMode.has(fieldKey);
    const currentValue =
      (this._config?.[fieldKey as keyof CardConfig] as string) ?? "";

    return html`
      <div class="field-row">
        <div class="field-label">${label}</div>
        <div class="field-input">
          ${inTemplateMode
            ? html`
                <textarea
                  .value=${currentValue}
                  placeholder="&#123;&#123; states('sensor.example') &#125;&#125;"
                  @change=${(ev: Event) =>
                    this._fieldChanged(
                      fieldKey,
                      (ev.target as HTMLTextAreaElement).value
                    )}
                  @input=${(ev: Event) =>
                    this._fieldChanged(
                      fieldKey,
                      (ev.target as HTMLTextAreaElement).value
                    )}
                ></textarea>
                <div class="template-note">Advanced: HA Template (Jinja2)</div>
              `
            : renderWidget()}
        </div>
        <button
          class="template-toggle ${inTemplateMode ? "active" : ""}"
          title="${inTemplateMode ? "Switch to simple input" : "Use HA template"}"
          @click=${() => this._toggleTemplateMode(fieldKey)}
        >
          T
        </button>
      </div>
    `;
  }

  private _renderColorField(fieldKey: string, label: string) {
    const isTemplate = TEMPLATE_CAPABLE_FIELDS.has(fieldKey);

    const widget = () => html`
      <ha-selector
        .hass=${this.hass}
        .label=${label}
        .selector=${{ text: {} }}
        .value=${(this._config?.[fieldKey as keyof CardConfig] as string) ?? ""}
        @value-changed=${(ev: CustomEvent) =>
          this._fieldChanged(fieldKey, ev.detail.value || undefined)}
      ></ha-selector>
    `;

    if (!isTemplate) return widget();
    return this._renderTemplateField(fieldKey, label, widget);
  }

  // ── Main render ────────────────────────────────────────────────────────────

  protected render() {
    if (!this._loaded || !this._config) {
      return html`<div class="loading">Loading editor…</div>`;
    }

    const c = this._config;

    return html`
      <!-- ── Basic ──────────────────────────────────────────────────────── -->
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

        ${this._renderTemplateField(
          "title",
          "Title",
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
        ${this._renderTemplateField(
          "icon",
          "Icon",
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

      <!-- ── Icon appearance ────────────────────────────────────────────── -->
      <div class="section-header">Icon Appearance</div>
      <div class="section-body">
        ${this._renderColorField("icon_color", "Icon Color")}
        <ha-selector
          .hass=${this.hass}
          .label=${"Icon Background Color"}
          .selector=${{ text: {} }}
          .value=${c.icon_background_color ?? ""}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("icon_background_color", ev.detail.value || undefined)}
        ></ha-selector>
        <div class="two-col">
          <ha-selector
            .hass=${this.hass}
            .label=${"Icon Size (px)"}
            .selector=${{ number: { min: 8, max: 120, step: 2, mode: "box" } }}
            .value=${c.icon_size ?? 24}
            @value-changed=${(ev: CustomEvent) =>
              this._fieldChanged("icon_size", ev.detail.value)}
          ></ha-selector>
          <ha-selector
            .hass=${this.hass}
            .label=${"Background Size (px)"}
            .selector=${{ number: { min: 8, max: 160, step: 2, mode: "box" } }}
            .value=${c.icon_background_size ?? 40}
            @value-changed=${(ev: CustomEvent) =>
              this._fieldChanged("icon_background_size", ev.detail.value)}
          ></ha-selector>
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
              .label=${"Position X (CSS)"}
              .selector=${{ text: {} }}
              .value=${c.icon_position_x ?? ""}
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("icon_position_x", ev.detail.value || undefined)}
            ></ha-selector>
            <ha-selector
              .hass=${this.hass}
              .label=${"Position Y (CSS)"}
              .selector=${{ text: {} }}
              .value=${c.icon_position_y ?? ""}
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("icon_position_y", ev.detail.value || undefined)}
            ></ha-selector>
          </div>
        ` : nothing}
      </div>

      <!-- ── Badge ──────────────────────────────────────────────────────── -->
      <div class="section-header">Icon Badge</div>
      <div class="section-body">
        ${this._renderTemplateField(
          "badge_icon",
          "Badge Icon",
          () => html`
            <ha-icon-picker
              .hass=${this.hass}
              .label=${"Badge Icon (omit to hide)"}
              .value=${c.badge_icon ?? ""}
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("badge_icon", ev.detail.value || undefined)}
            ></ha-icon-picker>
          `
        )}
        ${this._renderColorField("badge_color", "Badge Icon Color")}
        <ha-selector
          .hass=${this.hass}
          .label=${"Badge Background Color"}
          .selector=${{ text: {} }}
          .value=${c.badge_background_color ?? ""}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("badge_background_color", ev.detail.value || undefined)}
        ></ha-selector>
        <ha-selector
          .hass=${this.hass}
          .label=${"Badge Size (px)"}
          .selector=${{ number: { min: 8, max: 48, step: 1, mode: "box" } }}
          .value=${c.badge_size ?? 18}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("badge_size", ev.detail.value)}
        ></ha-selector>
        <ha-selector
          .hass=${this.hass}
          .label=${"Badge Position (relative to icon)"}
          .selector=${{ select: { options: BADGE_POSITION_OPTIONS, mode: "dropdown" } }}
          .value=${c.badge_position ?? "top-right"}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("badge_position", ev.detail.value as BadgePosition || undefined)}
        ></ha-selector>
        ${c.badge_position === "custom" ? html`
          <div class="two-col">
            <ha-selector
              .hass=${this.hass}
              .label=${"Badge X (CSS)"}
              .selector=${{ text: {} }}
              .value=${c.badge_position_x ?? ""}
              @value-changed=${(ev: CustomEvent) =>
                this._fieldChanged("badge_position_x", ev.detail.value || undefined)}
            ></ha-selector>
            <ha-selector
              .hass=${this.hass}
              .label=${"Badge Y (CSS)"}
              .selector=${{ text: {} }}
              .value=${c.badge_position_y ?? ""}
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

        <div class="labeled-slider">
          <label>Background Opacity</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${OPACITY_SCHEMA("background_opacity", "Background Opacity").selector}
            .value=${c.background_opacity ?? 1}
            @value-changed=${(ev: CustomEvent) =>
              this._fieldChanged("background_opacity", ev.detail.value)}
          ></ha-selector>
        </div>

        <ha-selector
          .hass=${this.hass}
          .label=${"Background Image URL (or 'area')"}
          .selector=${{ text: {} }}
          .value=${c.background_image ?? ""}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("background_image", ev.detail.value || undefined)}
        ></ha-selector>

        ${this._renderColorField("border_color", "Border Color")}

        <div class="labeled-slider">
          <label>Border Opacity</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${OPACITY_SCHEMA("border_opacity", "Border Opacity").selector}
            .value=${c.border_opacity ?? 1}
            @value-changed=${(ev: CustomEvent) =>
              this._fieldChanged("border_opacity", ev.detail.value)}
          ></ha-selector>
        </div>
      </div>

      <!-- ── Grid sizing ────────────────────────────────────────────────── -->
      <div class="section-header">Grid Sizing (Sections Dashboard)</div>
      <div class="section-body grid-options">
        <ha-selector
          .hass=${this.hass}
          .label=${"Columns"}
          .selector=${{ number: { min: 1, max: 12, step: 1, mode: "box" } }}
          .value=${c.grid_options?.columns ?? 6}
          @value-changed=${(ev: CustomEvent) =>
            this._gridFieldChanged("columns", ev.detail.value)}
        ></ha-selector>
        <ha-selector
          .hass=${this.hass}
          .label=${"Rows"}
          .selector=${{ number: { min: 1, max: 6, step: 1, mode: "box" } }}
          .value=${c.grid_options?.rows ?? 2}
          @value-changed=${(ev: CustomEvent) =>
            this._gridFieldChanged("rows", ev.detail.value)}
        ></ha-selector>
      </div>

      <!-- ── Sub-buttons ────────────────────────────────────────────────── -->
      <div class="section-header">Sub-Buttons</div>
      <div class="section-body">
        <ha-selector
          .hass=${this.hass}
          .label=${"Layout"}
          .selector=${{
            select: {
              options: SUB_BUTTON_LAYOUT_OPTIONS,
              mode: "dropdown",
            },
          }}
          .value=${c.sub_buttons_layout ?? "bottom-row"}
          @value-changed=${(ev: CustomEvent) =>
            this._fieldChanged("sub_buttons_layout", ev.detail.value as SubButtonsLayout)}
        ></ha-selector>

        ${(c.sub_buttons ?? []).map((btn, i) =>
          this._renderSubButtonRow(btn, i)
        )}

        <button class="add-button" @click=${this._addSubButton}>
          + Add Sub-Button
        </button>
      </div>

      <!-- ── Global action ──────────────────────────────────────────────── -->
      <div class="section-header">Global Action</div>
      <div class="section-body">
        <div class="warning-box">
          ⚠ When Global Action is set, sub-buttons become non-interactive
          decorations. The entire card surface becomes a single tap target.
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
        >
          Clear Global Action
        </button>
      </div>
    `;
  }

  private _renderSubButtonRow(btn: SubButtonConfig, index: number) {
    const isExpanded = this._expandedSubButton === index;
    const label =
      btn.entity ?? btn.label ?? btn.icon ?? `Sub-button ${index + 1}`;
    const showPosition =
      (this._config?.sub_buttons_layout ?? "bottom-row") === "custom";

    return html`
      <div class="sub-button-row">
        <div
          class="sub-button-header"
          @click=${() =>
            (this._expandedSubButton = isExpanded ? null : index)}
        >
          <ha-icon .icon=${btn.icon ?? "mdi:gesture-tap"}></ha-icon>
          <span class="sub-button-label">${label}</span>
          <ha-icon
            .icon=${isExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}
          ></ha-icon>
          <button
            class="delete-button"
            @click=${(ev: Event) => {
              ev.stopPropagation();
              this._deleteSubButton(index);
            }}
          >
            ✕
          </button>
        </div>

        ${isExpanded
          ? html`
              <div class="sub-button-body">
                <ha-entity-picker
                  .hass=${this.hass}
                  .label=${"Entity"}
                  .value=${btn.entity ?? ""}
                  allow-custom-entity
                  @value-changed=${(ev: CustomEvent) =>
                    this._subButtonChanged(
                      index,
                      "entity",
                      ev.detail.value || undefined
                    )}
                ></ha-entity-picker>

                <ha-icon-picker
                  .hass=${this.hass}
                  .label=${"Icon"}
                  .value=${btn.icon ?? ""}
                  @value-changed=${(ev: CustomEvent) =>
                    this._subButtonChanged(
                      index,
                      "icon",
                      ev.detail.value || undefined
                    )}
                ></ha-icon-picker>

                <ha-selector
                  .hass=${this.hass}
                  .label=${"Label (or 'entity')"}
                  .selector=${{ text: {} }}
                  .value=${btn.label ?? ""}
                  @value-changed=${(ev: CustomEvent) =>
                    this._subButtonChanged(index, "label", ev.detail.value || undefined)}
                ></ha-selector>

                <ha-form
                  .hass=${this.hass}
                  .data=${btn}
                  .schema=${[
                    {
                      name: "show_icon",
                      label: "Show Icon",
                      selector: { boolean: {} },
                    },
                    {
                      name: "show_label",
                      label: "Show Label",
                      selector: { boolean: {} },
                    },
                    {
                      name: "show_state",
                      label: "Show State",
                      selector: { boolean: {} },
                    },
                    {
                      name: "background",
                      label: "Show Background",
                      selector: { boolean: {} },
                    },
                  ]}
                  .computeLabel=${(s: any) => s.label}
                  @value-changed=${(ev: CustomEvent) => {
                    if (!this._config?.sub_buttons) return;
                    const buttons = [...this._config.sub_buttons];
                    buttons[index] = {
                      ...buttons[index],
                      show_icon: ev.detail.value.show_icon,
                      show_label: ev.detail.value.show_label,
                      show_state: ev.detail.value.show_state,
                      background: ev.detail.value.background,
                    };
                    this._fieldChanged("sub_buttons", buttons);
                  }}
                ></ha-form>

                ${showPosition
                  ? html`
                      <ha-selector
                        .hass=${this.hass}
                        .label=${"Position"}
                        .selector=${{
                          select: {
                            options: SUB_BUTTON_POSITION_OPTIONS,
                            mode: "dropdown",
                          },
                        }}
                        .value=${btn.position ?? "bottom-left"}
                        @value-changed=${(ev: CustomEvent) =>
                          this._subButtonChanged(
                            index,
                            "position",
                            ev.detail.value
                          )}
                      ></ha-selector>
                    `
                  : nothing}

                <div class="sub-section-label">Actions</div>
                <ha-selector
                  .hass=${this.hass}
                  .label=${"Tap Action"}
                  .selector=${{ ui_action: {} }}
                  .value=${btn.tap_action ?? { action: "toggle" }}
                  @value-changed=${(ev: CustomEvent) =>
                    this._subButtonActionChanged(
                      index,
                      "tap_action",
                      ev.detail.value
                    )}
                ></ha-selector>
                <ha-selector
                  .hass=${this.hass}
                  .label=${"Hold Action"}
                  .selector=${{ ui_action: {} }}
                  .value=${btn.hold_action ?? { action: "more-info" }}
                  @value-changed=${(ev: CustomEvent) =>
                    this._subButtonActionChanged(
                      index,
                      "hold_action",
                      ev.detail.value
                    )}
                ></ha-selector>
                <ha-selector
                  .hass=${this.hass}
                  .label=${"Double-Tap Action"}
                  .selector=${{ ui_action: {} }}
                  .value=${btn.double_tap_action ?? { action: "none" }}
                  @value-changed=${(ev: CustomEvent) =>
                    this._subButtonActionChanged(
                      index,
                      "double_tap_action",
                      ev.detail.value
                    )}
                ></ha-selector>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  // ── Styles ─────────────────────────────────────────────────────────────────

  static get styles() {
    return css`
      :host {
        display: block;
      }

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

      .grid-options {
        flex-direction: row;
        gap: 12px;
      }

      .grid-options ha-selector {
        flex: 1;
      }

      .two-col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .field-row {
        display: flex;
        align-items: flex-start;
        gap: 6px;
      }

      .field-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        min-width: 80px;
        padding-top: 12px;
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

      .template-note {
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

      .labeled-slider label {
        font-size: 12px;
        color: var(--secondary-text-color);
        display: block;
        margin-bottom: 2px;
      }

      .warning-box {
        background: var(--warning-color, #ff9800);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        line-height: 1.4;
      }

      /* Sub-button editor */
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
      }

    `;
  }
}
