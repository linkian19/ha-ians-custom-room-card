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
    --ians-icon-opacity: 1;
    --ians-icon-background-color: transparent;
    --ians-icon-background-opacity: 1;
    --ians-icon-background-size: 40px;
    --ians-icon-background-border-radius: 50%;
    --ians-icon-size: calc(var(--ians-icon-background-size) * 0.6);
    --ians-badge-color: #fff;
    --ians-badge-background-color: var(--error-color, #db4437);
    --ians-badge-size: 18px;
    --ians-badge-opacity: 1;
    --ians-title-color: var(--primary-text-color);
    --ians-title-font-size: 14px;
    --ians-title-align: left;
    --ians-sub-button-icon-color: var(--primary-text-color);
    --ians-sub-button-background-color: rgba(255, 255, 255, 0.1);
    --ians-sub-button-size: 32px;
    --ians-sub-button-gap: 6px;
    --ians-sub-button-opacity: 1;
  }

  ha-card {
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

  /* ── Background layers ───────────────────────────────────────────────────── */
  .card-background-color {
    position: absolute;
    inset: 0;
    background-color: var(--ians-card-background-color);
    opacity: var(--ians-card-background-opacity);
    border-radius: inherit;
    pointer-events: none;
    z-index: 0;
  }

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

  /* ── Content wrapper ─────────────────────────────────────────────────────── */
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

  /* ── Header: icon + title ────────────────────────────────────────────────── */
  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    min-width: 0;
    order: 1;
  }

  /* ── Icon ────────────────────────────────────────────────────────────────── */
  .icon-container {
    position: relative;
    width: var(--ians-icon-background-size);
    height: var(--ians-icon-background-size);
    flex-shrink: 0;
    border-radius: var(--ians-icon-background-border-radius);
    background-color: color-mix(
      in srgb,
      var(--ians-icon-background-color) calc(var(--ians-icon-background-opacity) * 100%),
      transparent
    );
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-container ha-icon {
    --mdc-icon-size: var(--ians-icon-size);
    color: var(--ians-icon-color);
    opacity: var(--ians-icon-opacity);
    display: flex;
  }

  /* Absolute positioning — z-index 2, same as card-inner.
     Rendered BEFORE card-inner in DOM so card-inner (later sibling, same z-index)
     paints on top, keeping sub-buttons above the icon. */
  .icon-container.icon-absolute {
    position: absolute;
    z-index: 2;
    flex-shrink: 0;
  }

  .icon-container.icon-pos-top-left    { top: 12px; left: 12px; }
  .icon-container.icon-pos-top-right   { top: 12px; right: 12px; }
  .icon-container.icon-pos-bottom-left { bottom: 12px; left: 12px; }
  .icon-container.icon-pos-bottom-right { bottom: 12px; right: 12px; }
  .icon-container.icon-pos-center      { top: 50%; left: 50%; transform: translate(-50%, -50%); }
  .icon-container.icon-pos-center-left { top: 50%; left: 12px; transform: translateY(-50%); }
  .icon-container.icon-pos-center-right { top: 50%; right: 12px; transform: translateY(-50%); }

  /* ── Icon badge ──────────────────────────────────────────────────────────── */
  .badge {
    position: absolute;
    top: -4px;
    right: -4px;
    width: var(--ians-badge-size);
    height: var(--ians-badge-size);
    border-radius: 50%;
    background-color: var(--ians-badge-background-color);
    opacity: var(--ians-badge-opacity);
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

  .badge.badge-pos-top-left    { top: -4px;  left: -4px;  right: auto;  bottom: auto; }
  .badge.badge-pos-top-right   { top: -4px;  right: -4px; left: auto;   bottom: auto; }
  .badge.badge-pos-bottom-left { bottom: -4px; left: -4px;  top: auto; right: auto; }
  .badge.badge-pos-bottom-right { bottom: -4px; right: -4px; top: auto; left: auto; }

  /* ── Title ───────────────────────────────────────────────────────────────── */
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
    text-align: var(--ians-title-align);
  }

  /* Title with absolute position — rendered as direct child of ha-card, same
     z-index 2 approach as icon-absolute but placed AFTER card-inner in DOM */
  .card-title-absolute {
    position: absolute;
    z-index: 4;
    color: var(--ians-title-color);
    font-size: var(--ians-title-font-size);
    font-weight: 500;
    line-height: 1.3;
    pointer-events: none;
    max-width: calc(100% - 24px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card-title-abs-top-left     { top: 12px;  left: 12px; }
  .card-title-abs-top-right    { top: 12px;  right: 12px; text-align: right; }
  .card-title-abs-top-center   { top: 12px;  left: 50%; transform: translateX(-50%); }
  .card-title-abs-center-left  { top: 50%;   left: 12px; transform: translateY(-50%); }
  .card-title-abs-center       { top: 50%;   left: 50%; transform: translate(-50%, -50%); text-align: center; }
  .card-title-abs-center-right { top: 50%;   right: 12px; transform: translateY(-50%); text-align: right; }
  .card-title-abs-bottom-left  { bottom: 12px; left: 12px; }
  .card-title-abs-bottom-right { bottom: 12px; right: 12px; text-align: right; }
  .card-title-abs-bottom-center { bottom: 12px; left: 50%; transform: translateX(-50%); }

  /* ── Interactive card ────────────────────────────────────────────────────── */
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
    order: 2;
  }

  .sub-buttons.layout-top-row {
    order: 0;
  }

  .sub-buttons.layout-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--ians-sub-button-size), 1fr));
  }

  /* Corners and custom: absolute overlay */
  .sub-buttons.layout-corners,
  .sub-buttons.layout-custom {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
  }

  /* Column layouts: absolute, stacked vertically on a side */
  .sub-buttons.layout-right-column {
    position: absolute;
    right: 8px;
    top: 8px;
    bottom: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    gap: var(--ians-sub-button-gap);
    z-index: 3;
    pointer-events: none;
  }

  .sub-buttons.layout-left-column {
    position: absolute;
    left: 8px;
    top: 8px;
    bottom: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--ians-sub-button-gap);
    z-index: 3;
    pointer-events: none;
  }

  /* ── Individual sub-button ───────────────────────────────────────────────── */
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
    opacity: var(--ians-sub-button-opacity);
  }

  .sub-button:hover {
    filter: brightness(1.15);
  }

  .sub-button:active {
    filter: brightness(0.85);
  }

  .sub-button.has-background {
    background-color: var(--ians-sub-button-background-color);
  }

  .sub-button.display-only {
    pointer-events: none;
    cursor: default;
    opacity: calc(var(--ians-sub-button-opacity) * 0.65);
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

  /* Absolute positions for corners/custom layouts */
  .sub-button.pos-top-left    { position: absolute; top: 8px;    left: 8px; }
  .sub-button.pos-top-center  { position: absolute; top: 8px;    left: 50%; transform: translateX(-50%); }
  .sub-button.pos-top-right   { position: absolute; top: 8px;    right: 8px; }
  .sub-button.pos-bottom-left  { position: absolute; bottom: 8px; left: 8px; }
  .sub-button.pos-bottom-center { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); }
  .sub-button.pos-bottom-right { position: absolute; bottom: 8px; right: 8px; }

  /* ── Template error state ────────────────────────────────────────────────── */
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
