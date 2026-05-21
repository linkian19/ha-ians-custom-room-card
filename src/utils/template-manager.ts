import type { HomeAssistant } from "../types";

// ── Types mirroring HA's render_template WebSocket response ──────────────────

interface RenderTemplateResult {
  result: string;
  listeners: {
    all: boolean;
    domains: string[];
    entities: string[];
    time: boolean;
  };
}

interface RenderTemplateError {
  error: string;
  level: "ERROR" | "WARNING";
}

type TemplateMessage = RenderTemplateResult | RenderTemplateError;

// ── Public API ────────────────────────────────────────────────────────────────

/** Returns true if a string value should be treated as a Jinja2 template. */
export function isTemplate(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.startsWith("{{") || trimmed.startsWith("{%");
}

/**
 * Subscribes to HA's render_template WebSocket command.
 * The callback is called immediately with the initial render and again
 * every time a dependent entity changes.
 *
 * Bundles its own subscription logic so we don't need to import from
 * HA's internal src/data/ws-templates module.
 *
 * @returns Promise resolving to an unsubscribe function.
 */
export function subscribeTemplate(
  hass: HomeAssistant,
  template: string,
  variables: Record<string, unknown>,
  onResult: (result: string) => void,
  onError?: (error: string) => void
): Promise<() => Promise<void>> {
  return hass.connection.subscribeMessage<TemplateMessage>(
    (msg) => {
      if ("error" in msg) {
        onError?.(msg.error);
      } else {
        onResult(msg.result);
      }
    },
    {
      type: "render_template",
      template,
      variables,
      strict: false,
      report_errors: true,
    }
  );
}
