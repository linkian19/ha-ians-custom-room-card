/**
 * Loads HA frontend custom elements needed by the card editor.
 *
 * Uses the mushroom-cards indirect loading pattern:
 * calling hui-tile-card.getConfigElement() triggers HA to load ha-form
 * and related editor components without direct bundle imports.
 *
 * RISK: the hui-tile-card indirect pattern is undocumented and may break
 * on HA updates. Monitor after major HA releases.
 */
export async function loadHaComponents(): Promise<void> {
  if (!customElements.get("ha-form")) {
    (customElements.get("hui-tile-card") as any)?.getConfigElement?.();
  }
  // HA lazy-loads its own elements when first rendered; no need to await them.
  // A single microtask tick gives the registry a chance to process the trigger.
  await Promise.resolve();
}
