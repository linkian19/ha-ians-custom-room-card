import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
    height: 100%;
    /* ── CSS custom property defaults (all overridable via card-mod or external CSS) ── */
    --ians-card-background-color: var(--ha-card-background, var(--card-background-color, #fff));
    --ians-card-background-opacity: 1;
    --ians-card-border-color: var(--ha-card-border-color, var(--divider-color, rgba(0, 0, 0, 0.12)));
    --ians-card-border-opacity: 1;
    --ians-card-border-radius: var(--ha-card-border-radius, 12px);
    --ians-icon-color: var(--state-icon-color, var(--primary-text-color));
    --ians-icon-background-color: transparent;
    --ians-icon-background-size: 40px;  /* icon container / circle size */
    --ians-icon-size: calc(var(--ians-icon-background-size) * 0.6); /* MDI glyph size */
    --ians-badge-color: #fff;
    --ians-badge-background-color: var(--error-color, #db4437);
    --ians-badge-size: 18px;
    --ians-title-color: var(--primary-text-color);
    --ians-title-font-size: 14px;
    --ians-sub-button-icon-color: var(--primary-text-color);
    --ians-sub-button-background-color: rgba(255, 255, 255, 0.1);
    --ians-sub-button-size: 32px;
    --ians-sub-button-gap: 6px;
  }

  ha-card {
    /* Transparent so our background layer fully controls the card color */
    --ha-card-background: transparent;
    position: relative;
    height: 100%;
    overflow: hidden;
    cursor: default;
    touch-action: none;
    border-color: color-mix(
      in srgb,
      var(--ians-card-border-color) calc(var(--ians-card-border-opacity) * 100%),
      transparent
    );
  }

  /* ── Background layers (absolute, behind content) ────────────────────────── */
  /* Color layer: opacity from background_opacity applies here only */
  .card-background-color {
    position: absolute;
    inset: 0;
    background-color: var(--ians-card-background-color);
    opacity: var(--ians-card-background-opacity);
    border-radius: inherit;
    pointer-events: none;
    z-index: 0;
  }

  /* Image layer: always full opacity, stacked on top of color layer */
  .card-background-image {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: inherit;
    pointer-events: none;
    z-index: 1;
  }

  /* ── Content wrapper (above background layers) ───────────────────────────── */
  .card-inner {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 12px;
    box-sizing: border-box;
    gap: 8px;
  }

  /* ── Header: icon + title ─────────────────────────────────────────────────── */
  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    min-width: 0;
  }

  /* ── Icon ─────────────────────────────────────────────────────────────────── */
  .icon-container {
    position: relative;
    width: var(--ians-icon-background-size);
    height: var(--ians-icon-background-size);
    flex-shrink: 0;
    border-radius: 50%;
    background-color: var(--ians-icon-background-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-container ha-icon {
    --mdc-icon-size: var(--ians-icon-size);
    color: var(--ians-icon-color);
    display: flex;
  }

  /* Absolute positioning — rendered as direct child of ha-card */
  .icon-container.icon-absolute {
    position: absolute;
    z-index: 3;
    flex-shrink: 0;
  }

  .icon-container.icon-pos-top-left    { top: 12px; left: 12px; }
  .icon-container.icon-pos-top-right   { top: 12px; right: 12px; }
  .icon-container.icon-pos-bottom-left { bottom: 12px; left: 12px; }
  .icon-container.icon-pos-bottom-right { bottom: 12px; right: 12px; }
  .icon-container.icon-pos-center      { top: 50%; left: 50%; transform: translate(-50%, -50%); }
  .icon-container.icon-pos-center-left { top: 50%; left: 12px; transform: translateY(-50%); }
  .icon-container.icon-pos-center-right { top: 50%; right: 12px; transform: translateY(-50%); }

  /* ── Icon badge ───────────────────────────────────────────────────────────── */
  .badge {
    position: absolute;
    top: -4px;
    right: -4px;
    width: var(--ians-badge-size);
    height: var(--ians-badge-size);
    border-radius: 50%;
    background-color: var(--ians-badge-background-color);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .badge ha-icon {
    --mdc-icon-size: calc(var(--ians-badge-size) * 0.65);
    color: var(--ians-badge-color);
    display: flex;
  }

  /* Badge position relative to icon-container */
  .badge.badge-pos-top-left    { top: -4px;  left: -4px;  right: auto;  bottom: auto; }
  .badge.badge-pos-top-right   { top: -4px;  right: -4px; left: auto;   bottom: auto; }
  .badge.badge-pos-bottom-left { bottom: -4px; left: -4px;  top: auto; right: auto; }
  .badge.badge-pos-bottom-right { bottom: -4px; right: -4px; top: auto; left: auto; }

  /* ── Title ────────────────────────────────────────────────────────────────── */
  .card-title {
    color: var(--ians-title-color);
    font-size: var(--ians-title-font-size);
    font-weight: 500;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
  }

  /* ── Interactive card (global_action active) ─────────────────────────────── */
  ha-card.interactive {
    cursor: pointer;
  }

  ha-card.interactive:hover .card-inner {
    opacity: 0.9;
  }

  /* ── Sub-buttons ─────────────────────────────────────────────────────────── */
  .sub-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ians-sub-button-gap);
    order: 2; /* default: after header */
  }

  /* Top row: render sub-buttons before the header using flex order */
  .card-header {
    order: 1;
  }

  .sub-buttons.layout-top-row {
    order: 0;
  }

  /* Columns layout */
  .sub-buttons.layout-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  /* Grid layout */
  .sub-buttons.layout-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
  }

  /* Corners and custom: absolute overlay, container doesn't capture pointer events */
  .sub-buttons.layout-corners,
  .sub-buttons.layout-custom {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
  }

  /* ── Individual sub-button ────────────────────────────────────────────────── */
  .sub-button {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: calc(var(--ians-sub-button-size) / 2);
    min-height: var(--ians-sub-button-size);
    cursor: pointer;
    pointer-events: auto;
    user-select: none;
    touch-action: none;
    -webkit-tap-highlight-color: transparent;
    transition: opacity 0.15s;
  }

  .sub-button:hover {
    opacity: 0.85;
  }

  .sub-button:active {
    opacity: 0.65;
  }

  .sub-button.has-background {
    background-color: var(--ians-sub-button-background-color);
  }

  /* display-only: sub-button rendered but non-interactive (global_action active) */
  .sub-button.display-only {
    pointer-events: none;
    cursor: default;
    opacity: 0.65;
  }

  .sub-button ha-icon {
    --mdc-icon-size: calc(var(--ians-sub-button-size) * 0.65);
    color: var(--ians-sub-button-icon-color);
    display: flex;
    flex-shrink: 0;
  }

  .sub-button-label,
  .sub-button-state {
    font-size: 11px;
    font-weight: 500;
    color: var(--ians-sub-button-icon-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 60px;
  }

  .sub-button-state {
    opacity: 0.75;
  }

  /* Absolute positions for corners and custom layouts */
  .sub-button.pos-top-left {
    position: absolute;
    top: 8px;
    left: 8px;
  }

  .sub-button.pos-top-center {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
  }

  .sub-button.pos-top-right {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .sub-button.pos-bottom-left {
    position: absolute;
    bottom: 8px;
    left: 8px;
  }

  .sub-button.pos-bottom-center {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
  }

  .sub-button.pos-bottom-right {
    position: absolute;
    bottom: 8px;
    right: 8px;
  }

  /* ── Template error state ─────────────────────────────────────────────────── */
  ha-card.has-template-error {
    border: 2px solid var(--error-color, #db4437);
  }

  .template-error {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--error-color, #db4437);
    font-size: 11px;
    padding: 2px 0;
  }

  .template-error ha-icon {
    --mdc-icon-size: 14px;
    flex-shrink: 0;
  }
`;
