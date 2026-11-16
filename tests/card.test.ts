/**
 * Render tests: the card is created in a simulated DOM with a fake `hass`
 * whose WebSocket template subscriptions are captured so tests can push results.
 */
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import type { CardConfig, HomeAssistant } from "../src/types";

type Card = HTMLElement & {
  setConfig(config: CardConfig): void;
  hass: HomeAssistant;
  updateComplete: Promise<boolean>;
};

beforeAll(async () => {
  await import("../src/ians-custom-room-card");
});

afterEach(() => {
  document.body.innerHTML = "";
});

function makeHass() {
  const subscriptions: Array<{ template: string; push: (msg: unknown) => void; unsub: ReturnType<typeof vi.fn> }> = [];
  const hass = {
    states: {
      "light.den": {
        entity_id: "light.den", state: "on", attributes: { friendly_name: "Den Lamp" },
        last_changed: "", last_updated: "",
      },
    },
    areas: {},
    entities: {},
    devices: {},
    user: { id: "u1", name: "Ian", is_admin: true },
    connection: {
      subscribeMessage: vi.fn((push: (msg: unknown) => void, msg: Record<string, unknown>) => {
        const unsub = vi.fn().mockResolvedValue(undefined);
        subscriptions.push({ template: msg.template as string, push, unsub });
        return Promise.resolve(unsub);
      }),
    },
    callService: vi.fn(),
  } as unknown as HomeAssistant;
  return { hass, subscriptions };
}

async function render(config: Partial<CardConfig>, hass: HomeAssistant): Promise<Card> {
  const el = document.createElement("ians-custom-room-card") as Card;
  el.setConfig({ type: "custom:ians-custom-room-card", ...config } as CardConfig);
  el.hass = hass;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

const title = (el: Card) => el.shadowRoot!.querySelector(".card-title");

describe("ians-custom-room-card", () => {
  it("rejects a missing config", () => {
    const el = document.createElement("ians-custom-room-card") as Card;
    expect(() => el.setConfig(undefined as never)).toThrow("Invalid configuration");
  });

  it("renders a static title, or the entity's name for title: entity", async () => {
    const { hass } = makeHass();
    let el = await render({ title: "Den" }, hass);
    expect(title(el)?.textContent).toBe("Den");

    el = await render({ title: "entity", entity: "light.den" }, hass);
    expect(title(el)?.textContent).toBe("Den Lamp");
  });

  it("hides a template title until it resolves, then shows live results", async () => {
    const { hass, subscriptions } = makeHass();
    const el = await render({ title: "{{ states('light.den') }}", entity: "light.den" }, hass);
    await vi.waitFor(() => expect(subscriptions).toHaveLength(1));

    // Raw Jinja is never shown while pending
    expect(title(el)?.textContent).toBe("");
    expect(title(el)?.classList.contains("pending")).toBe(true);

    subscriptions[0].push({ result: "on", listeners: {} });
    await el.updateComplete;
    expect(title(el)?.textContent).toBe("on");

    subscriptions[0].push({ result: "off", listeners: {} });
    await el.updateComplete;
    expect(title(el)?.textContent).toBe("off");
  });

  it("shows a template error and unsubscribes when removed", async () => {
    const { hass, subscriptions } = makeHass();
    const el = await render({ title: "{{ bad( }}" }, hass);
    await vi.waitFor(() => expect(subscriptions).toHaveLength(1));

    subscriptions[0].push({ error: "TemplateSyntaxError", level: "ERROR" });
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(".template-error")?.textContent).toContain("Template error");

    el.remove();
    await vi.waitFor(() => expect(subscriptions[0].unsub).toHaveBeenCalled());
  });

  it("builds a stub config from the first light and reports grid defaults", () => {
    const Card = customElements.get("ians-custom-room-card") as unknown as {
      getStubConfig(hass?: HomeAssistant): CardConfig;
      getGridOptions(config?: CardConfig): Record<string, number>;
    };
    expect(Card.getStubConfig(makeHass().hass)).toMatchObject({ entity: "light.den", title: "Den Lamp" });
    expect(Card.getStubConfig()).toMatchObject({ title: "Room", icon: "mdi:home" });
    expect(Card.getGridOptions()).toEqual({ columns: 6, rows: 2, min_columns: 3, min_rows: 1 });
    expect(Card.getGridOptions({ grid_options: { columns: 12, max_rows: 4 } } as CardConfig))
      .toMatchObject({ columns: 12, max_rows: 4 });
  });
});
