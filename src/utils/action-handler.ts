import type { ActionConfig } from "../types";

// ── Gesture detection constants ───────────────────────────────────────────────

const HOLD_DELAY_MS = 500;
const DOUBLE_TAP_DELAY_MS = 350;
const MOVE_THRESHOLD_PX = 10;

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ActionHandlerConfig {
  entity?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

// ── Normalization ─────────────────────────────────────────────────────────────

// Normalizes legacy call-service syntax to modern perform-action.
export function normalizeActionConfig(
  config: ActionHandlerConfig
): ActionHandlerConfig {
  const normalize = (action?: ActionConfig): ActionConfig | undefined => {
    if (!action) return undefined;
    const a = { ...action };
    // call-service → perform-action
    if ((a.action as string) === "call-service") {
      a.action = "perform-action";
    }
    // service → perform_action
    if (a.service && !a.perform_action) {
      a.perform_action = a.service;
    }
    // service_data → data
    if (a.service_data && !a.data) {
      a.data = a.service_data;
    }
    return a;
  };

  return {
    ...config,
    tap_action: normalize(config.tap_action),
    hold_action: normalize(config.hold_action),
    double_tap_action: normalize(config.double_tap_action),
  };
}

// ── Dispatch ──────────────────────────────────────────────────────────────────

export function dispatchAction(
  element: HTMLElement,
  config: ActionHandlerConfig,
  action: "tap" | "hold" | "double_tap"
): void {
  const normalized = normalizeActionConfig(config);
  const event = new Event("hass-action", { bubbles: true, composed: true });
  (event as any).detail = { config: normalized, action };
  element.dispatchEvent(event);
}

// ── Gesture handler ───────────────────────────────────────────────────────────

/**
 * Attaches pointer-event-based gesture detection to an element.
 * Detects tap, hold (500ms), and double-tap (two taps within 350ms).
 * Enter/Space on a focused element fires tap (keyboard accessibility).
 *
 * Hold is only detected when a hold_action other than "none" is configured —
 * otherwise a long press is a normal tap (matches HA's own action handler,
 * and avoids HA's fallback of opening more-info for an unset hold_action).
 *
 * Returns a cleanup function that removes all listeners.
 */
export function attachActionHandler(
  element: HTMLElement,
  config: ActionHandlerConfig,
  dispatch: (action: "tap" | "hold" | "double_tap") => void
): () => void {
  let holdTimeout: ReturnType<typeof setTimeout> | null = null;
  let tapTimeout: ReturnType<typeof setTimeout> | null = null;
  let tapCount = 0;
  let startX = 0;
  let startY = 0;
  let moved = false;
  let holdFired = false;

  // If no double_tap_action (or it's "none"), skip the delay and fire tap immediately
  const hasDoubleTap =
    config.double_tap_action?.action !== undefined &&
    config.double_tap_action.action !== "none";
  const hasHold =
    config.hold_action?.action !== undefined &&
    config.hold_action.action !== "none";

  const clearHold = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout);
      holdTimeout = null;
    }
  };

  const clearTap = () => {
    if (tapTimeout) {
      clearTimeout(tapTimeout);
      tapTimeout = null;
    }
    tapCount = 0;
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.button !== undefined && e.button !== 0 && e.pointerType !== "touch") {
      return;
    }
    startX = e.clientX;
    startY = e.clientY;
    moved = false;
    holdFired = false;

    if (!hasHold) return;
    holdTimeout = setTimeout(() => {
      holdTimeout = null;
      if (!moved) {
        holdFired = true;
        clearTap();
        dispatch("hold");
      }
    }, HOLD_DELAY_MS);
  };

  const onPointerMove = (e: PointerEvent) => {
    const dx = Math.abs(e.clientX - startX);
    const dy = Math.abs(e.clientY - startY);
    if (dx > MOVE_THRESHOLD_PX || dy > MOVE_THRESHOLD_PX) {
      moved = true;
      clearHold();
    }
  };

  const onPointerUp = () => {
    clearHold();
    if (moved || holdFired) return;

    if (!hasDoubleTap) {
      // No double-tap configured — fire tap immediately
      dispatch("tap");
      return;
    }

    tapCount++;
    if (tapCount === 1) {
      tapTimeout = setTimeout(() => {
        tapCount = 0;
        dispatch("tap");
      }, DOUBLE_TAP_DELAY_MS);
    } else {
      clearTap();
      dispatch("double_tap");
    }
  };

  const onPointerCancel = () => {
    clearHold();
    clearTap();
    moved = true;
  };

  // Prevent native context menu from interrupting hold gesture on mobile —
  // only when a hold action exists, so right-click/long-press work otherwise
  const onContextMenu = (e: Event) => {
    if (hasHold) e.preventDefault();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    if (e.target !== element || e.repeat) return;
    e.preventDefault();
    dispatch("tap");
  };

  element.addEventListener("pointerdown", onPointerDown);
  element.addEventListener("pointermove", onPointerMove);
  element.addEventListener("pointerup", onPointerUp);
  element.addEventListener("pointercancel", onPointerCancel);
  element.addEventListener("contextmenu", onContextMenu);
  element.addEventListener("keydown", onKeyDown);

  return () => {
    clearHold();
    clearTap();
    element.removeEventListener("pointerdown", onPointerDown);
    element.removeEventListener("pointermove", onPointerMove);
    element.removeEventListener("pointerup", onPointerUp);
    element.removeEventListener("pointercancel", onPointerCancel);
    element.removeEventListener("contextmenu", onContextMenu);
    element.removeEventListener("keydown", onKeyDown);
  };
}
