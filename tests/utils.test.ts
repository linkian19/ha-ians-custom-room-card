import { afterEach, describe, expect, it, vi } from "vitest";

import { attachActionHandler, dispatchAction, normalizeActionConfig } from "../src/utils/action-handler";
import { resolveAreaImage } from "../src/utils/area-image";
import { isTemplate, subscribeTemplate } from "../src/utils/template-manager";
import type { HomeAssistant } from "../src/types";

const asHass = (h: Partial<HomeAssistant>) => h as HomeAssistant;

describe("normalizeActionConfig", () => {
  it("rewrites legacy call-service syntax", () => {
    const out = normalizeActionConfig({
      tap_action: {
        action: "call-service", service: "light.toggle", service_data: { entity_id: "light.den" },
      } as never,
    });
    expect(out.tap_action).toMatchObject({
      action: "perform-action", perform_action: "light.toggle", data: { entity_id: "light.den" },
    });
  });

  it("leaves modern config and missing actions alone", () => {
    const tap = { action: "perform-action", perform_action: "light.on", data: { a: 1 } } as never;
    const out = normalizeActionConfig({ entity: "light.den", tap_action: tap });
    expect(out.tap_action).toEqual(tap);
    expect(out.hold_action).toBeUndefined();
    expect(out.entity).toBe("light.den");
  });
});

describe("dispatchAction", () => {
  it("fires a composed hass-action event with the normalized config", () => {
    const el = document.createElement("div");
    const listener = vi.fn();
    document.body.appendChild(el);
    document.body.addEventListener("hass-action", listener);
    dispatchAction(el, { tap_action: { action: "call-service", service: "x.y" } as never }, "tap");
    const event = listener.mock.calls[0][0];
    expect(event.composed).toBe(true);
    expect(event.detail.action).toBe("tap");
    expect(event.detail.config.tap_action.perform_action).toBe("x.y");
    document.body.removeEventListener("hass-action", listener);
  });
});

describe("attachActionHandler gestures", () => {
  afterEach(() => vi.useRealTimers());

  function setup(config: Parameters<typeof attachActionHandler>[1]) {
    vi.useFakeTimers();
    const el = document.createElement("div");
    document.body.appendChild(el);
    const dispatch = vi.fn();
    const cleanup = attachActionHandler(el, config, dispatch);
    const pointer = (type: string, x = 0, y = 0) =>
      el.dispatchEvent(new PointerEvent(type, { button: 0, clientX: x, clientY: y, bubbles: true }));
    const press = (holdMs = 0) => {
      pointer("pointerdown");
      vi.advanceTimersByTime(holdMs);
      pointer("pointerup");
    };
    return { el, dispatch, cleanup, pointer, press };
  }

  const hold = { action: "more-info" } as never;
  const dbl = { action: "toggle" } as never;

  it("taps immediately when no double-tap is configured", () => {
    const { dispatch, press } = setup({});
    press();
    expect(dispatch.mock.calls).toEqual([["tap"]]);
  });

  it("treats a long press as a tap without a hold action", () => {
    const { dispatch, press } = setup({});
    press(800);
    expect(dispatch.mock.calls).toEqual([["tap"]]);
  });

  it("fires hold after 500 ms and no tap afterwards", () => {
    const { dispatch, press } = setup({ hold_action: hold });
    press(600);
    vi.runAllTimers();
    expect(dispatch.mock.calls).toEqual([["hold"]]);
  });

  it("cancels the hold when the pointer moves", () => {
    const { dispatch, pointer } = setup({ hold_action: hold });
    pointer("pointerdown", 0, 0);
    pointer("pointermove", 20, 0);
    vi.advanceTimersByTime(600);
    pointer("pointerup", 20, 0);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it("waits for a possible second tap when double-tap is configured", () => {
    const { dispatch, press } = setup({ double_tap_action: dbl });
    press();
    expect(dispatch).not.toHaveBeenCalled();
    vi.advanceTimersByTime(350);
    expect(dispatch.mock.calls).toEqual([["tap"]]);
  });

  it("fires double_tap for two quick taps", () => {
    const { dispatch, press } = setup({ double_tap_action: dbl });
    press();
    vi.advanceTimersByTime(100);
    press();
    vi.runAllTimers();
    expect(dispatch.mock.calls).toEqual([["double_tap"]]);
  });

  it("taps on Enter/Space but not on key repeat", () => {
    const { el, dispatch } = setup({});
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    el.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", repeat: true }));
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
    expect(dispatch.mock.calls).toEqual([["tap"], ["tap"]]);
  });

  it("removes its listeners on cleanup", () => {
    const { dispatch, press, cleanup } = setup({});
    cleanup();
    press();
    expect(dispatch).not.toHaveBeenCalled();
  });
});

describe("resolveAreaImage", () => {
  const hass = asHass({
    entities: {
      "light.den": { entity_id: "light.den", area_id: "den" },
      "light.lamp": { entity_id: "light.lamp", device_id: "dev1" },
      "light.bare": { entity_id: "light.bare" },
    },
    devices: { dev1: { id: "dev1", area_id: "office" } },
    areas: {
      den: { area_id: "den", name: "Den", picture: "/den.jpg" },
      office: { area_id: "office", name: "Office", picture: "/office.jpg" },
    },
  });

  it("uses the entity's own area first, then its device's", () => {
    expect(resolveAreaImage(hass, "light.den")).toBe("/den.jpg");
    expect(resolveAreaImage(hass, "light.lamp")).toBe("/office.jpg");
  });

  it("returns undefined when there is no area or picture", () => {
    expect(resolveAreaImage(hass, undefined)).toBeUndefined();
    expect(resolveAreaImage(hass, "light.bare")).toBeUndefined();
    expect(resolveAreaImage(hass, "light.unknown")).toBeUndefined();
  });
});

describe("templates", () => {
  it("detects Jinja2 templates", () => {
    expect(isTemplate("{{ states('light.den') }}")).toBe(true);
    expect(isTemplate("  {% if true %}x{% endif %}")).toBe(true);
    expect(isTemplate("Living Room")).toBe(false);
    expect(isTemplate("Temp {{ x }}")).toBe(false); // must start with a tag
  });

  it("subscribes to render_template and routes results and errors", async () => {
    let push: (msg: unknown) => void = () => {};
    const unsub = vi.fn();
    const subscribeMessage = vi.fn((cb: (msg: unknown) => void) => {
      push = cb;
      return Promise.resolve(unsub);
    });
    const onResult = vi.fn();
    const onError = vi.fn();
    const hass = asHass({ connection: { subscribeMessage } as never });

    const result = await subscribeTemplate(hass, "{{ 1 }}", { entity: "light.den" }, onResult, onError);
    expect(result).toBe(unsub);
    expect(subscribeMessage.mock.calls[0][1]).toEqual({
      type: "render_template", template: "{{ 1 }}", variables: { entity: "light.den" },
      strict: false, report_errors: true,
    });

    push({ result: "1", listeners: {} });
    push({ error: "boom", level: "ERROR" });
    expect(onResult).toHaveBeenCalledWith("1");
    expect(onError).toHaveBeenCalledWith("boom");
  });
});
